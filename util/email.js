const tlds = require('../config/tlds.json');

const isDomainCorrect = domain => {
  // check if password is common
  const domainUpper = domain.toUpperCase();
  let result = false;
  let index = 0;
  do {
    if (domainUpper === tlds[index]) {
      result = true;
      break;
    }
    index++;
  } while (!result && index < tlds.length);
  return result;
};

module.exports = {
  isDomainCorrect
};
