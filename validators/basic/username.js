const lettersRegex = new RegExp(/([A-Za-z])\w+/);
const allowedCharactersRegex = new RegExp(/([A-Za-z0-9._-])\w+/)

const messages = {
  exceptions: {
    TOO_SHORT: 'Username is too short',
    TOO_LONG: 'Username is too long',
    ILLEGAL_CHARACTERS: 'Username contains other character than letters, numbers, underscore, dash or dot',
    NO_LETTERS: 'Username must contain at least one letter'
  }
};

const defaultConfig = { 
  minLength: 3,
  maxLength: 20
};

const validate = (value, config = defaultConfig )=> {
  // check the length
  const length = value.length;
  if (length < config.minLength) {
    throw new Error(messages.exceptions.TOO_SHORT);
  }
  if (length > config.maxLength) {
    throw new Error(messages.exceptions.TOO_LONG);
  }
  // check the string for letters
  if (!lettersRegex.test(value)) {
    throw new Error(messages.exceptions.NO_LETTERS);
  }
  // check the string for correct characters
  if (!allowedCharactersRegex.test(value)) {
    throw new Error(messages.exceptions.ILLEGAL_CHARACTERS);
  }
  // return true after the process
  return true;
};

module.exports = {
  validate
};

