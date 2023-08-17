const bookValidator = require('./bookValidator');
const validateImageFile = require('./validateImageFile');
const validateUserRegistration = require('./validateUserRegistration');

// Session
const verifySession = require('./verifySession');

// Review
const reviewValidator = require('./reviewValidator');

// Admin
const adminValidator = require('./adminValidator');

module.exports = {
  bookValidator,
  validateImageFile,
  validateUserRegistration,
  verifySession,
  reviewValidator,
  adminValidator,
};
