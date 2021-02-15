require("dotenv").config();

const utils = require("./backend/utils");

const express = require("express");
const path = require("path");

cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

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

app.post("/api/makeMeeting", (req, res) => {
  const query =
    "insert into meetings (meetingID, meetingName, password) values ('meeting', 'Dinner at ike', 1234);";
  client.query(
    query,
    (err, res) => {
      if (err) throw err;
      for (let row of res.rows) {
        console.log(JSON.stringify(row));
      }
      client.end();
    }
  );

  console.log(req.body);

  console.log("Called endpoint.");
  res.send({
    message: "Success!!!",
  });
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
