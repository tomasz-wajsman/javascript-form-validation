const basicValidators = require('../basic');

const messages = {
  exceptions: {
    EMPTY_FIELDS: 'Fill in all fields',
    PASSWORD_CONTAINS_LOGIN: 'Password cannot contain the username',
    SAME_LOGIN_PASSWORD: 'Username and password are the same'
  }
};

const validate = (username, password) => {
  // check if fields are not empty
  if (username === '' || password === '') {
    throw new Error(messages.exceptions.EMPTY_FIELDS);
  }
  // check if username is the same like password
  if (username === password) {
    throw new Error(messages.exceptions.SAME_LOGIN_PASSWORD);
  }
  // check if password contains username
  if (password.includes(username)) {
    throw new Error(messages.exceptions.PASSWORD_CONTAINS_LOGIN);
  }
  // check username and password with basic validators
  const errors = [];
  // username
  try {
    basicValidators.Username.validate(username);
  } catch (e) {
    errors.push(e);
  }
  // password
  try {
    basicValidators.Password.validate(password);
  } catch (e) {
    errors.push(e);
  }
  // check how many errors were caught
  if (errors.length > 0) {
    // there were errors
    throw errors;
  }
  // return true in the end, this means the success
  return true;
};

module.exports = {
  validate
};
