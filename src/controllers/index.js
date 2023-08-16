// Books
const getAllBooks = require('./books/getAllBooks');
const getBookById = require('./books/getBookById');
const getFilteredBooks = require('./books/getFilteredBooks');
const createBook = require('./books/createBook');

// Categories
const getWeekRecommendations = require('./books/categories/getWeekRecommendations');
const getMostPopular = require('./books/categories/getMostPopular');
const getNewcommers = require('./books/categories/getNewcommers');
const getLatestNews = require('./books/categories/getLatestNews');

// Review
const getBookReviews = require('./review/getBookReviews');
const getReviewComments = require('./review/getReviewComments');

const deleteReview = require('./review/deleteReview');
const deleteReviewComment = require('./review/deleteReviewComment');

const createReview = require('./review/createReview');
const createReviewComment = require('./review/createReviewComment');

// Review-Comment Like
const likeReview = require('./review/likeReview');
const likeComment = require('./review/likeComment');

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

// User
const addFavoriteGenres = require('./user/addFavoriteGenres');
const getFavoriteGenres = require('./user/getFavoriteGenres');

module.exports = {
  // Books
  getAllBooks,
  getReviewComments,
  getBookById,
  getFilteredBooks,
  createBook,

  // Book Categories
  getWeekRecommendations,
  getMostPopular,
  getNewcommers,
  getLatestNews,

  // Review
  getBookReviews,
  createReview,
  createReviewComment,

  deleteReview,
  deleteReviewComment,

  // Review-Comment Like
  likeReview,
  likeComment,

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

  // User
  addFavoriteGenres,
  getFavoriteGenres,
};
