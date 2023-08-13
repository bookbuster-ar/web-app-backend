const bookValidator = require('./bookValidator');
const validateImageFile = require('./validateImageFile');
const validateUserRegistration = require('./validateUserRegistration');

// Session
const verifySession = require('./verifySession');

// Review
const reviewValidator = require('./reviewValidator');

module.exports = {
  bookValidator,
  validateImageFile,
  validateUserRegistration,
  verifySession,
  reviewValidator,
};
