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
const getSubgenresByBook = require('./genres/getSubgenresByBook');
// Editorial

const getEditorials = require('./editorial/getEditorials');
const getCollection = require('./editorial/getCollection');

// Stock

const increaseStock = require('./stock/increaseStock');

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
  getSubgenresByBook,

  // Editorial
  getEditorials,
  getCollection,

  // Stock
  increaseStock,
};
