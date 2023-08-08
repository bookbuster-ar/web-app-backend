// Books
const getAllBooks = require('./books/getAllBooks');
const getBookById = require('./books/getBookById');
const getFilteredBooks = require('./books/getFilteredBooks');

const createBook = require('./books/createBook');

// Genres

const getAllGenres = require('./genres/getAllGenres');

// Editorial

const getEditorials = require('./editorial/getEditorials');
const getCollection = require('./editorial/getCollection');

module.exports = {
  // Books
  getAllBooks,
  getBookById,
  getBooksByGenreWithSubgenres,
  getFilteredBooks,
  createBook,

  // Genres
  getAllGenres,

  // Editorial
  getEditorials,
  getCollection,
};
