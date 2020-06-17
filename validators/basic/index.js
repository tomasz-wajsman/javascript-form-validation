const Username = require('./username');
const Password = require('./password');
const Email = require('./email');

const basicValidators = {
  Username,
  Password,
  Email
};

module.exports = basicValidators;
