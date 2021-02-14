const utils = require('./utils');

const express = require('express');
const path = require('path');

cors = require("cors");

//const bodyParser = require('body-parser');

/*const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
});
*/
const app = express();
app.use(express.json()); 
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.post('/api/makeMeeting', (req, res) => {
  

  /*pool.query('insert into meetings (meetingID, meetingName, password) values ("meeting1", "Dinner at ike", "1234);', (error, results) => {
    if (error) {
      throw error
    }
  });
  response.status(201).send(`User added with ID: ${}`)
  */
  console.log(req.body);
  //const { meetingName, hostName } = req.body;
  //console.log("Meeting name: " + meetingName);

  console.log('Called endpoint.');
  res.send({
    message: 'Success!!!'
  });
  //const password = utils.generatePassword();

});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`When-2-Not-Meet listening on ${port}`);
console.log(utils.generatePassword());