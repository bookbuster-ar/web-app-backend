// Books
const handleGetBooks = require('./books/handleGetBooks');
const handleGetBookById = require('./books/handleGetBookById');
const handleGetBooksByGenre = require('./books/handleGetBooksByGenre');

const handleCreateBook = require('./books/handleCreateBook');

// Genres
const handleGetGenres = require('./Genre/handleGetGenres');

// Editorial
const handleGetEditorials = require('./editorial/handleGetEditorials');
const handleGetCollection = require('./editorial/handleGetCollection');

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
};
