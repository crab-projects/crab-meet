//import { v4 as uuidv4 } from 'uuid';
const uuidv4 = require("uuid").v4;
const fs = require("fs");

const generatePassword = () => {
  var id = uuidv4();
  console.log(id);
  return id;
};

exports.generatePassword = generatePassword;

const loadWords = () => {
  const json_string = fs.readFileSync("./four_letter.json");
};
