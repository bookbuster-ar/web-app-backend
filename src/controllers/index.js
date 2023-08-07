// Books
const getAllBooks = require('./books/getAllBooks');
const getBookById = require('./books/getBookById');
const getBooksByGenre = require('./books/getBooksByGenre');
const getFilteredBooks = require('./books/getFilteredBooks');

const createBook = require('./books/createBook');

// Genres

const getAllGenres = require('./getAllGenres');

module.exports = {
  // Books
  getAllBooks,
  getBookById,
  getBooksByGenre,
  getFilteredBooks,
  createBook,

  // Genres
  getAllGenres,
};
