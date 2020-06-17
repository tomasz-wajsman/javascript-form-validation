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
  if (basicValidators.Username.validate(username) && basicValidators.Password.validate(password)) {
    return true;
  }
};

module.exports = {
  validate
};
