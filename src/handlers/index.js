// Books
const handleGetBooks = require('./books/handleGetBooks');
const handleGetBookById = require('./books/handleGetBookById');
const handleGetBooksByGenre = require('./books/handleGetBooksByGenre');

// Genres
const handleGetGenres = require('./handleGetGenres');

module.exports = {
  // Books
  handleGetBooks,
  handleGetBookById,
  handleGetBooksByGenre,

  // Genres
  handleGetGenres,
};
