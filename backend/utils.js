const uuidv4 = require("uuid").v4;
const fs = require("fs");

const words = JSON.parse(fs.readFileSync(__dirname + "/words.json"));

const generateID = () => {
  return uuidv4();
};

const generatePassword = () => {
  // Although this is a poor quality random generator, we can figure out a new one later if desired
  return(words[Math.floor(Math.random() * words.length)] + words[Math.floor(Math.random() * words.length)]);
};

exports.generateID = generateID;
exports.generatePassword = generatePassword;