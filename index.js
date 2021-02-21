require('dotenv').config();
const utils = require('./backend/utils');
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to PostgreSQL DB
const { Client } = require('pg');
const { nextTick } = require('process');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
client.connect();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Create meeting and send back meetCode
app.post("/api/makeMeeting", (req, res) => {
  const defaultDate = '2021-02-20 00:00:00-00';
  const defaultTime = ' 00:00:00-00';
  const meetingID = utils.generateID();
  let { meetingName,
          startDate,
          endDate,
          startTime,
          endTime } = req.body;
  
  // come back to make a more elegant solution
  startDate = startDate === '' ? defaultDate : startDate + defaultTime;
  endDate = endDate === '' ? defaultDate : endDate + defaultTime;
  startTime = startTime === '' ? defaultTime : startTime;
  endTime = endTime === '' ? defaultTime : endDate;
  const password = utils.generatePassword();

  const query =
    `insert into meetings (meetingID, meetingName, password, starttimestamp, endtimestamp, earliesttime, latesttime
      ) values ($1, $2, $3, $4, $5, $6, $7);`;
  client.query(query, [meetingID, meetingName, password, startDate, endDate, startTime, endTime], (err, res) => {
    if (err) throw err;
  });
  console.log('Posted new meeting to db.');

  res.send({
    meetingID: meetingID,
    password: password,
  });
  console.log('Sent back meeting url.');
});

app.get('/api/meeting/:meetingID', (req, res) => {
  const { meetingID } = req.params;
  // Query database for meeting name
  const query = 'select meetingname, starttimestamp, endtimestamp, earliesttime, latesttime from meetings where meetingID = $1';
  client.query(query, [meetingID], (err, resq) => {
    if (err) throw err;
    let response = {
      success: resq.rows.length > 0
    };
    if (response.success) {
      const { meetingname, starttimestamp, endtimestamp, earliesttime, latesttime } = resq.rows[0];
      response = {
        ...response,
        meetingName: meetingname,
        startDate: starttimestamp,
        endDate: endtimestamp,
        startTime: earliesttime,
        endTime: latesttime,
      };
    }
    res.send(response);
  });
});

app.get('/api/meetingLogin', (req, res) => {
  const { meetingID, password } = req.query;

  // Query database for meeting password
  const query = 'select password from meetings where meetingID = $1';
  client.query(query, [meetingID], (err, resq) => {
    if (err) throw err;
    console.log(resq.rows[0]);
    res.send({
      correct: password === resq.rows[0].password,
    });
  });
});

// Placeholder for actual meeting data endpoint
app.get('/api/meeting', (req, res) => {
  const { meetingID, password } = req.query;

  // Query database for meeting data
  const query = `select m.meetingname, m.starttimestamp, m.endtimestamp, m.earliesttime, m.latesttime, u.userid, u.username, t.starttime, t.endtime 
  from meetings m
  inner join users u
  on u.meetingid = m.meetingid
  inner join times t
  on t.userid = u.userid
  where m.meetingid = $1 and m.password = $2;`;

  client.query(query, [meetingID, password], (err, resq) => {
    if (err) throw err;
    console.log(resq.rows);
    const rows = [];
    resq.rows.forEach((row) => {
      const { starttime, endtime } = row;
      rows.push({
        start: starttime,
        end: endtime
      });
    });
    const response = {
      timeInputs: rows
    }
    res.send(response);
  });
});

// Create meeting and send back meetCode
app.post("/api/userInput/:meetingID", (req, res, next) => {
  const userID = utils.generateID(); 
  const { meetingID } = req.params;
  const { password, userName, times } = req.body;

  // flow
  // if it's calling this function, it's making a new user - on frontend, create different api for updating, and different endpoint
  // create a new user
  // input their times

  const response = {
    createUserMessage: 'Did not create user.',
    inputTimesMessage: 'Did not input times.'
  };
  
  const userQuery = 
    `insert into users (userid, username, meetingid) values ($1, $2, $3);`;
  client.query(userQuery, [ userID, userName, meetingID ], (err, resq) => {
    if (err) throw err;
    response.createUserMessage = 'Created user' + userName;
  });

  if (times.length === 0) {
    res.send({
      message: response
    });
    return next();
  }

  const queryValues = [];
  const timesList = [];
  for (let i = 0; i < times.length; i++) {
    const time = times[i];
    timesList.push(time.start);
    timesList.push(time.end);
    const values = `($1, $` + (i * 2 + 2).toString() + `, $` + (i * 2 + 3).toString() + `)`;
    queryValues.push(values);
  }

  const timesQuery = 
    `insert into times (userid, starttime, endtime) values ` + queryValues.join(', ') + `;`; // notation is injection safe because it's not inserting directly
  console.log('timesQuery: ' + timesQuery);
  client.query(timesQuery, [ userID, ...timesList ], (err, resq) => {
    if (err) throw err;
    response.inputTimesMessage = 'Added user times.';
    res.send({
      message: response // for some reason it only works if you send back data in the key 'message'
    });
  });


  
});


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build/index.html'));
});

const port = process.env.PORT || 5000 || '0.0.0.0';
app.listen(port);

console.log(`When-2-Not-Meet listening on ${port}`);
