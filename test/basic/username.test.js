const assert = require('assert');
const expect = require('expect');

const basicValidators = require('../../validators/basic');

const messages = {
  exceptions: {
    TOO_SHORT: 'Username is too short',
    TOO_LONG: 'Username is too long',
    ILLEGAL_CHARACTERS: 'Username contains other character than letters, numbers, underscore, dash or dot',
    NO_LETTERS: 'Username must contain at least one letter',
    NOT_STRING: 'Username should be in a string format'
  }
};

const correctDataset = [
  'Armin',
  'euro_2012',
  'bitcoin',
  'LastPass',
  'dark-matter',
  'jan.kowalski',
  '_abc'
];
const incorrectDataset = [
  { input: 'a', message: messages.exceptions.TOO_SHORT },
  { input: 'aa', message: messages.exceptions.TOO_SHORT },
  { input: 'aaaaaaaaaaaaaaaaaaaaa', message: messages.exceptions.TOO_LONG },
  { input: 'a?', message: messages.exceptions.ILLEGAL_CHARACTERS },
  { input: '#a', message: messages.exceptions.ILLEGAL_CHARACTERS },
  { input: '---', message: messages.exceptions.NO_LETTERS },
  { input: '123456', message: messages.exceptions.NO_LETTERS }
];

describe('Username validation tests', () => {
  test('Returns true for correct data', () => {
    correctDataset.forEach(data => {
      assert.equal(
        basicValidators.Username.validate(data),
        true,
        `'${data}' username was not validated but it was correct`
      );
    });
  });
});
