// Books
const getAllBooks = require('./books/getAllBooks');
const getBookById = require('./books/getBookById');
const getBooksByGenre = require('./books/getBooksByGenre');
const getFilteredBooks = require('./books/getFilteredBooks');

const createBook = require('./books/createBook');

// Genres

const getAllGenres = require('./getAllGenres');

// Editorial

const getEditorials = require('./editorial/getEditorials');
const getCollection = require('./editorial/getCollection');

// Auth

const loginLocal = require('./auth/loginLocal');
const logOut = require('./auth/logOut');

module.exports = {
  // Books
  getAllBooks,
  getBookById,
  getBooksByGenre,
  getFilteredBooks,
  createBook,

  // Genres
  getAllGenres,

  // Editorial
  getEditorials,
  getCollection,

  // Auth
  loginLocal,
  logOut,
};
