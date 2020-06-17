const Utilities = require('../../util');

const atRegex = new RegExp(/@/g);
const manyDotsRegex = new RegExp(/[^.]{1,}[.]{2,}[^]{1,}/);

const ipRegex = new RegExp(/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/);

const at = '@';
const dot = '.';

const messages = {
  exceptions: {
    TOO_LONG: 'E-mail address is too long',
    NO_AT: 'There is no @ symbol in e-mail address',
    TOO_MANY_AT: 'There are more than 1 @ symbols in e-mail address',
    INCORRECT_RECIPIENT: 'Missing or incorrect recipient',
    INCORRECT_SERVER: 'Missing or incorrect target server',
    INCORRECT_TLD: 'Missing or incorrect e-mail domain type',
    INCORRECT_IP: 'Incorrect IP address'
  }
};

const defaultConfig = {
  maxLength: 254
};

const validate = (value, config = defaultConfig) => {
  // check the length
  const length = value.length;
  if (length > config.maxLength) {
    throw new Error(messages.exceptions.TOO_LONG);
  }
  // count how many @ symbols are there
  const count = (value.match(atRegex) || []).length;
  if (count == 0) {
    // no @ symbols
    throw new Error(messages.exceptions.NO_AT);
  }
  if (count > 1) {
    // more than 1 @ symbol
    throw new Error(messages.exceptions.TOO_MANY_AT);
  }
  // check the email contents
  const contents = value.split(at);
  const recipient = contents[0];
  const target = contents[1];
  // check recipient
  if (recipient === '') {
    // missing recipient
    throw new Error(messages.exceptions.INCORRECT_RECIPIENT);
  }
  if (recipient[0] === dot || recipient[recipient.length - 1] === dot) {
    // dot on beginning or end of the recipient
    throw new Error(messages.exceptions.INCORRECT_RECIPIENT);
  }
  if (manyDotsRegex.test(recipient)) {
    // two or more dots
    throw new Error(messages.exceptions.INCORRECT_RECIPIENT);
  }
  // check target
  if (target === '') {
    // missing target
    throw new Error(messages.exceptions.INCORRECT_SERVER);
  }
  if (!ipRegex.test(target)) {
    // the target is a domain, check TLD
    const targetContents = String(target).split(dot);
    if (targetContents.length === 1) {
      // there is no domain
      throw new Error(messages.exceptions.INCORRECT_TLD);
    }
    const tld = targetContents[targetContents.length - 1];
    if (!Utilities.Email.isDomainCorrect(String(tld))) {
      // domain is incorrect
      throw new Error(messages.exceptions.INCORRECT_TLD);
    }
  }
  // return true after the process is done - email is correct
  return true;
};

module.exports = {
  validate
};

