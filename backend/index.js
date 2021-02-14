const utils = require('./utils');

const express = require('express');
const path = require('path');

const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
});

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('/api/makeMeeting', (req, res) => {
  

  pool.query('insert into meetings (meetingID, meetingName, password) values ("meeting1", "Dinner at ike", "1234);', (error, results) => {
    if (error) {
      throw error
    }
  });
  response.status(201).send(`User added with ID: ${}`)

  //const password = utils.generatePassword();

});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`When-2-Not-Meet listeningutils. on ${port}`);
console.log(utils.generatePassword());