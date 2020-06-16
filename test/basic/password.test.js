const assert = require('assert');
const expect = require('expect');

const basicValidators = require('../../validators/basic');

const messages = {
  exceptions: {
    TOO_SHORT: 'Password is too short',
    COMMON_PASSWORD: 'Password is on the common password lists',
    PASSWORD_MISSING_CHARS: 'Password must contain minimum 1 capital letter, 1 small letter, 1 digit and 1 special character'
  }
};

const correctDataset = [
  '3asy_To_Remember',
  'jBEur.2012',
  'K@TOm1ceow',
  '@DW1NmXblx',
  'd@rK-w@TT3r',
  'jAnK0M@L$k1',
  '_ABCspLr0A'
];
const incorrectDataset = [
  { input: '', message: messages.exceptions.TOO_SHORT },
  { input: 'Th1_+', message: messages.exceptions.TOO_SHORT },
  { input: 'abcdef', message: messages.exceptions.COMMON_PASSWORD },
  { input: 'admin1', message: messages.exceptions.COMMON_PASSWORD },
  { input: 'dragon', message: messages.exceptions.COMMON_PASSWORD },
  { input: 'TheComplicatedPasswordWithoutSpecialChars', message: messages.exceptions.PASSWORD_MISSING_CHARS },
  { input: '_AnotherComplicatedPasswordsButWithoutDigits', message: messages.exceptions.PASSWORD_MISSING_CHARS },
  { input: '------', message: messages.exceptions.PASSWORD_MISSING_CHARS },
  { input: '09458695486456809', message: messages.exceptions.PASSWORD_MISSING_CHARS }
];

describe('Password validation tests', () => {
  test('Returns true for correct data', () => {
    correctDataset.forEach(data => {
      assert.equal(
        basicValidators.Password.validate(data),
        true,
        `'${data}' password was not validated but it was correct`
      );
    });
  });
  test('Throws the proper error for incorrect data', () => {
    incorrectDataset.forEach(data => {
      expect(() => {
        console.log(data.input)
        basicValidators.Password.validate(data.input)
      }).toThrow(new Error(data.message))
    });
  });
});
