// Books
const getAllBooks = require('./books/getAllBooks');
const getBookById = require('./books/getBookById');
const getFilteredBooks = require('./books/getFilteredBooks');

const createBook = require('./books/createBook');

// Genres

const getBooksByGenre = require('./genres/getBooksByGenre');
const getBooksBySubgenre = require('./genres/getBooksBySubgenre');
const getSubgenresByGenre = require('./genres/getSubgenresByGenre');
const getAllGenres = require('./genres/getAllGenres');
const getBookSubgenres = require('./genres/getBookSubgenres');

// Editorial
const getEditorials = require('./editorial/getEditorials');
const getCollection = require('./editorial/getCollection');

// Auth
const registerUserWithEmail = require('./auth/registerUserWithEmail');
const verifyUserEmail = require('./auth/verifyUserEmail');
const signInWithEmail = require('./auth/signInWithEmail');
const logOut = require('./auth/logOut');
const registerUserWithGoogle = require('./auth/registerUserWithGoogle');

module.exports = {
  // Books
  getAllBooks,
  getBookById,
  getFilteredBooks,
  createBook,

  // Genres
  getBooksByGenre,
  getBooksBySubgenre,
  getSubgenresByGenre,
  getAllGenres,
  getBookSubgenres,

  // Editorial
  getEditorials,
  getCollection,

  // Auth
  registerUserWithEmail,
  verifyUserEmail,
  signInWithEmail,
  logOut,
  registerUserWithGoogle,
};
