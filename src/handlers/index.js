// Books
const handleGetBooks = require('./books/handleGetBooks');
const handleGetBookById = require('./books/handleGetBookById');
const handleGetBooksByGenre = require('./books/handleGetBooksByGenre');

const handleCreateBook = require('./books/handleCreateBook');

// Genres
const handleGetGenres = require('./handleGetGenres');

module.exports = {
  // Books
  handleGetBooks,
  handleGetBookById,
  handleGetBooksByGenre,
  handleCreateBook,

  // Genres
  handleGetGenres,
};
