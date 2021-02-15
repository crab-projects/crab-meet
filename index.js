require("dotenv").config();
const utils = require("./backend/utils");
const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());


// Connect to PostgreSQL DB
const { Client } = require("pg");
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
client.connect();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "frontend/build")));

// Create meeting and send back meetCode
app.post("/api/makeMeeting", (req, res) => {
  const meetingID = utils.generatePassword();
  const { meetingName } = req.body;
  const password = '1234'; // Temporary fixed value

  const query = "insert into meetings (meetingID, meetingName, password) values ($1, $2, $3);";
  client.query(
    query,
    [ meetingID, meetingName, password ],
    (err, res) => {
      if (err) throw err;
      client.end();
    }
  );
  console.log("Posted new meeting to db.");

  res.send({
    meetingID: meetingID,
    password: password,
  });
  console.log("Sent back meeting url.");

});

app.get('/api/:meetCode', (req, res) => {
  const meetCode = req.params.meetCode;
  res.send({
    message: 'meetCode: ' + meetCode
  });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build/index.html"));
});

const port = process.env.PORT || 5000 || "0.0.0.0";
app.listen(port);

console.log(`When-2-Not-Meet listening on ${port}`);
//console.log(utils.generatePassword());
