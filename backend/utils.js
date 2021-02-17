//import { v4 as uuidv4 } from 'uuid';
const uuidv4 = require('uuid').v4;

const generatePassword = () => {
  var id = uuidv4();
  console.log(id);
  return id;
};

exports.generatePassword = generatePassword;
