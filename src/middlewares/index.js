const validateImageFile = require('./validateImageFile');
const validateUserRegistration = require('./validateUserRegistration');
const bookValidator = require('./bookValidator');

// Session
const verifySession = require('./verifySession');

// Review
const reviewValidator = require('./reviewValidator');

// Admin
const adminValidator = require('./adminValidator');
const publishedBookValidator = require('./publishedBookValidator');

module.exports = {
  bookValidator,
  validateImageFile,
  validateUserRegistration,
  verifySession,
  reviewValidator,
  adminValidator,
  publishedBookValidator,
};
