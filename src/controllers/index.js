// Books
const getAllBooks = require('./books/getAllBooks');
const getBookById = require('./books/getBookById');
const getBooksByGenre = require('./books/getBooksByGenre');
const getFilteredBooks = require('./books/getFilteredBooks');

// Genres

const getAllGenres = require('./getAllGenres');

module.exports = {
  // Books
  getAllBooks,
  getBookById,
  getBooksByGenre,
  getFilteredBooks,

  // Genres
  getAllGenres,
};
