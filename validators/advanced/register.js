const basicValidators = require('../basic');

const messages = {
  exceptions: {
    EMPTY_FIELDS: 'Fill in all fields',
    PASSWORD_CONTAINS_LOGIN: 'Password cannot contain the username',
    PASSWORDS_NOT_SAME: 'Passwords are not the same',
    SAME_LOGIN_PASSWORD: 'Username and password are the same'
  }
};

const validate = (username, password, passwordRepeat, email) => {
  // check if fields are not empty
  if (username === '' || password === '' || passwordRepeat === '' || email === '') {
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
  // check if passwords and password repeat are the same
  if (password !== passwordRepeat) {
    throw new Error(messages.exceptions.PASSWORDS_NOT_SAME);
  }
  // check username, password and email with basic validators
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
  // email
  try {
    basicValidators.Email.validate(email);
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
