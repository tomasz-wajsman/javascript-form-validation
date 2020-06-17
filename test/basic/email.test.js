const assert = require('assert');
const expect = require('expect');

const basicValidators = require('../../validators/basic');

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

const correctDataset = [
  'firstname.lastname@example.com',
  'email@subdomain.example.com',
  'firstname+lastname@example.com',
  'email@123.123.123.123',
  '"email"@example.com',
  '1234567890@example.com',
  'email@example-one.com',
  '_______@example.com',
  'email@example.name',
  'email@example.museum',
  'email@example.co.jp',
  'email@muzeum.museum'
];
const incorrectDataset = [
  { input: 'plainaddress', message: messages.exceptions.NO_AT },
  { input: 'email.example.com', message: messages.exceptions.NO_AT },
  { input: '#@%^%#$@#$@#.com', message: messages.exceptions.TOO_MANY_AT },
  { input: '@example.com', message: messages.exceptions.INCORRECT_RECIPIENT },
  { input: 'email@example@example.com', message: messages.exceptions.TOO_MANY_AT },
  { input: '.email@example.com', message: messages.exceptions.INCORRECT_RECIPIENT },
  { input: 'email.@example.com', message: messages.exceptions.INCORRECT_RECIPIENT },
  { input: 'Abc..123@example.com', message: messages.exceptions.INCORRECT_RECIPIENT },
  { input: 'email..email@example.com', message: messages.exceptions.INCORRECT_RECIPIENT },
  { input: 'email@', message: messages.exceptions.INCORRECT_SERVER },
  { input: 'email@example', message: messages.exceptions.INCORRECT_TLD },
  { input: 'email@example.web', message: messages.exceptions.INCORRECT_TLD },
  { input: 'email@111.222.333.44444', message: messages.exceptions.INCORRECT_TLD },
  { input: 'lopadotemachoselachogaleokranioleipsanodrimhypotrimmatosilphioparaomelitokatakechymenokichlepikossyphophattoperisteralektryonoptekephalliokigklopeleiolagoiosiraiobaphetraganopterygon.thisisaverylongemailaddressthatnevershouldbeusedoverinternetbutitisfortesting@subdomain.example.com', message: messages.exceptions.TOO_LONG }
];

describe('Email validation tests', () => {
  test('Returns true for correct data', () => {
    correctDataset.forEach(data => {
      assert.equal(
        basicValidators.Email.validate(data),
        true,
        `'${data}' username was not validated but it was correct`
      );
    });
  });
  test('Throws the proper error for incorrect data', () => {
    incorrectDataset.forEach(data => {
      expect(() => {
        basicValidators.Email.validate(data.input)
      }).toThrow(new Error(data.message))
    });
  });
});
