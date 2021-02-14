import { v4 as uuidv4 } from 'uuid';

const generatePassword = () => {
  var id = uuidv4();
  console.log(id);
  return id;
}

exports.generatePassword = generatePassword;