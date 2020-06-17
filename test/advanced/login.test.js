const assert = require('assert');
const expect = require('expect');

const advancedValidators = require('../../validators/advanced');

const messages = {
  exceptions: {
    PASSWORD_CONTAINS_LOGIN: 'Password cannot contain the username',
    SAME_LOGIN_PASSWORD: 'Username and password are the same'
  }
};

const correctDataset = [
  { username: 'jan.kowalski', password: 'J1_K0w@l' },
  { username: 'tomasz', password: 'b1ah8L@h' }
];
const incorrectDataset = [
  { username: 'jan.kowalski1', password: 'jan.kowalski1', message: messages.exceptions.SAME_LOGIN_PASSWORD },
  { username: 'example', password: 'Th3_example', message: messages.exceptions.PASSWORD_CONTAINS_LOGIN },
  { username: 'ab', password: '' },
  { username: 'abcd', password: 'ab' },
  { username: 'tomasz', password: '123456' },
  { username: 'tomasz', password: 'thisisatest' },
  { username: 'tomasz', password: 'ThisIs@Test' },
  { username: 'tomasz', password: 'Th1sISaTest' },
  { username: '', password: 'ThisI$aT3st' },
];

describe('Login validation tests', () => {
  test('Returns true for correct data', () => {
    correctDataset.forEach(data => {
      assert.equal(
        advancedValidators.Login.validate(data.username, data.password),
        true,
        `The set ${data.username} and ${data.password} is not correct but it should be`
      );
    });
  });
  test('Throws the error for incorrect data', () => {
    incorrectDataset.forEach(data => {
      if (data.message) {
        // catch errors related to main module
        expect(() => {
          advancedValidators.Login.validate(data.username, data.password)
        }).toThrow(new Error(data.message));
      } else {
        // catch errors related to submodules
        expect(() => {
          advancedValidators.Login.validate(data.username, data.password)
        }).toThrow();
      }
    });
  });
});
