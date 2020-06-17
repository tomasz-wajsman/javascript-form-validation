const Utilities = require('../../util');

const capitalLettersRegex = new RegExp(/([A-Z])/);
const smallLettersRegex = new RegExp(/([a-z])/);
const digitsRegex = new RegExp(/([0-9])\w+/);
const specialCharactersRegex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
const passwordRegex = /"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"/

const messages = {
  exceptions: {
    TOO_SHORT: 'Password is too short',
    COMMON_PASSWORD: 'Password is on the common password lists',
    PASSWORD_MISSING_CHARS: 'Password must contain minimum 1 capital letter, 1 small letter, 1 digit and 1 special character'
  }
};

const defaultConfig = { 
  minLength: 6
};

const validate = (value, config = defaultConfig) => {
  // check if password is not the common one
  if (Utilities.Password.isCommon(value)) {
    throw new Error(messages.exceptions.COMMON_PASSWORD);
  }
  // check the length
  const length = value.length;
  if (length < config.minLength) {
    throw new Error(messages.exceptions.TOO_SHORT);
  }
  // check the capital letters
  if (
    !capitalLettersRegex.test(value)
    || !smallLettersRegex.test(value)
    || !digitsRegex.test(value)
    || !specialCharactersRegex.test(value)
  ) {
    throw new Error(messages.exceptions.PASSWORD_MISSING_CHARS);
  }
  // return true after the process is done - password is correct
  return true;
};

module.exports = {
  validate
};

