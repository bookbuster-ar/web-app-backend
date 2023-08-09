// Books
const handleGetBooks = require('./books/handleGetBooks');
const handleGetBookById = require('./books/handleGetBookById');
const handleGetBooksByGenre = require('./books/handleGetBooksByGenre');

const handleCreateBook = require('./books/handleCreateBook');

// Genres
const handleGetGenres = require('./handleGetGenres');

// Editorial
const handleGetEditorials = require('./editorial/handleGetEditorials');
const handleGetCollection = require('./editorial/handleGetCollection');

// Auth
const handleRegisterLocalUser = require('./auth/handleRegisterLocalUser');
const handleVerifyEmail = require('./auth/handleVerifyEmail');
const handleLoginLocal = require('./auth/handleLoginLocal');

module.exports = {
  // Books
  handleGetBooks,
  handleGetBookById,
  handleGetBooksByGenre,
  handleCreateBook,

  // Genres
  handleGetGenres,

  // Editorial
  handleGetEditorials,
  handleGetCollection,

  // Auth
  handleRegisterLocalUser,
  handleVerifyEmail,
  handleLoginLocal,
};
