const assert = require('assert');
const expect = require('expect');

const advancedValidators = require('../../validators/advanced');

const messages = {
  exceptions: {
    EMPTY_FIELDS: 'Fill in all fields',
    PASSWORD_CONTAINS_LOGIN: 'Password cannot contain the username',
    PASSWORDS_NOT_SAME: 'Passwords are not the same',
    SAME_LOGIN_PASSWORD: 'Username and password are the same'
  }
};

const correctDataset = [
  { username: 'jan.kowalski', password: 'J1_K0w@l', passwordRepeat: 'J1_K0w@l', email: 'jan@kowalski.net' },
  { username: 'blahblah', password: 'Pa@d003', passwordRepeat: 'Pa@d003', email: 'blah@test.net' }
];
const incorrectDataset = [
  { username: '', password: '', passwordRepeat: '', email: '', message: messages.exceptions.EMPTY_FIELDS },
  { username: 'test', password: '', passwordRepeat: '', email: '', message: messages.exceptions.EMPTY_FIELDS },
  { username: '', password: 'test', passwordRepeat: '', email: '', message: messages.exceptions.EMPTY_FIELDS },
  { username: '', password: '', passwordRepeat: 'test', email: '', message: messages.exceptions.EMPTY_FIELDS },
  { username: '', password: '', passwordRepeat: '', email: 'test', message: messages.exceptions.EMPTY_FIELDS },
  { username: 'test', password: 'test', passwordRepeat: '', email: '', message: messages.exceptions.EMPTY_FIELDS },
  { username: '', password: 'test', passwordRepeat: 'test', email: '', message: messages.exceptions.EMPTY_FIELDS },
  { username: '', password: '', passwordRepeat: 'test', email: 'test', message: messages.exceptions.EMPTY_FIELDS },
  { username: 'test', password: 'test', passwordRepeat: 'test', email: '', message: messages.exceptions.EMPTY_FIELDS },
  { username: '', password: 'test', passwordRepeat: 'test', email: 'test', message: messages.exceptions.EMPTY_FIELDS },
  { username: 'test', password: '', passwordRepeat: '', email: 'test', message: messages.exceptions.EMPTY_FIELDS },
  { username: '', password: 'test', passwordRepeat: '', email: 'test', message: messages.exceptions.EMPTY_FIELDS },
  { username: 'username', password: 'username', passwordRepeat: 'username', email: 'test@test.com', message: messages.exceptions.SAME_LOGIN_PASSWORD },
  { username: 'username', password: 'contains_username', passwordRepeat: 'contains_username', email: 'username@test.pl', message: messages.exceptions.PASSWORD_CONTAINS_LOGIN },
  { username: 'username', password: 'password1', passwordRepeat: 'password2', email: 'name@example.com' },
  { username: 'un', password: 'passwd01--', passwordRepeat: 'passwd01--', email: 'user@example.com' },
  { username: 'unad', password: 'passwd__', passwordRepeat: 'passwd__', email: 'user@example.com' },
  { username: 'username', password: 'passwd01', passwordRepeat: 'passwd01', email: 'user@.com' },
  { username: 'username', password: 'passwd01', passwordRepeat: 'passwd01', email: '@example.com' },
  { username: 'username', password: 'passwd01', passwordRepeat: 'passwd01', email: '@example' },
  { username: 'testname', password: '123456', passwordRepeat: '123456', email: 'test@example.com' }
];

describe('Login validation tests', () => {
  test('Returns true for correct data', () => {
    correctDataset.forEach(data => {
      assert.equal(
        advancedValidators.Register.validate(data.username, data.password, data.passwordRepeat, data.email),
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
          advancedValidators.Register.validate(data.username, data.password, data.passwordRepeat, data.email)
        }).toThrow(new Error(data.message));
      } else {
        // catch errors related to submodules
        expect(() => {
          advancedValidators.Register.validate(data.username, data.password, data.passwordRepeat, data.email)
        }).toThrow();
      }
    });
  });
});
