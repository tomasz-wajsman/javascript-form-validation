const commonPasswords = require('../config/common-passwords.json');

const isCommon = password => {
  // check if password is common
  let result = false;
  let index = 0;
  do {
    if (password === commonPasswords[index]) {
      result = true;
      break;
    }
    index++;
  } while (!result && index < commonPasswords.length);
  return result;
};

module.exports = {
  isCommon
};
