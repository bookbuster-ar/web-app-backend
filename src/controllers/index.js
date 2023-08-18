// Books
const getAllBooks = require('./books/getAllBooks');
const getBookById = require('./books/getBookById');
const getFilteredBooks = require('./books/getFilteredBooks');
const createBook = require('./books/createBook');


//Recommendation
const getRecommendation = require('./books/getRecommendation');

// Categories
const getRecommendedBooks = require('./books/categories/getRecommendedBooks');
const getMostPopularBooks = require('./books/categories/getMostPopularBooks');
const getNewlyArrivedBooks = require('./books/categories/getNewlyArrivedBooks');
const getLatestBooksReleases = require('./books/categories/getLatestBooksReleases');


//Price
const getPriceByFormat = require('./books/getPriceByFormat');

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
const getSubgenresByBook = require('./genres/getSubgenresByBook');
const getBookSubgenres = require('./genres/getBookSubgenres');

// Editorial
const getEditorials = require('./editorial/getEditorials');
const getCollection = require('./editorial/getCollection');

// Stock

const increaseStock = require('./stock/increaseStock');
const registerBookFormat = require('./stock/registerBookFormat');
const postPriceFormatBook = require('./stock/postPriceFormatBook');

// Auth

const signInWithEmail = require('./auth/signInWithEmail');
const registerUserWithEmail = require('./auth/registerUserWithEmail');
const registerUserWithGoogle = require('./auth/registerUserWithGoogle');
const logOut = require('./auth/logOut');
const verifyUserEmail = require('./auth/verifyUserEmail');

// User
const addFavoriteGenres = require('./user/addFavoriteGenres');
const getFavoriteGenres = require('./user/getFavoriteGenres');
const updateUserProfile = require('./user/updateUserProfile');

// Quote
const createQuote = require('./quotes/createQuote');
const getBookQuotes = require('./quotes/getBookQuotes');
const likeQuote = require('./quotes/likeQuote');
const deleteQuote = require('./quotes/deleteQuote');

module.exports = {
  // Books
  getAllBooks,
  getReviewComments,
  getBookById,
  getFilteredBooks,
  createBook,


  //Recommendation
  getRecommendation,

  // Book Categories
  getRecommendedBooks,
  getMostPopularBooks,
  getNewlyArrivedBooks,
  getLatestBooksReleases,


  //Price
  getPriceByFormat,

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
  getSubgenresByBook,
  getBookSubgenres,

  // Editorial
  getEditorials,
  getCollection,

  // Stock
  increaseStock,
  registerBookFormat,
  postPriceFormatBook,

  // Auth
  signInWithEmail,
  registerUserWithEmail,
  logOut,
  verifyUserEmail,

  // User
  addFavoriteGenres,
  getFavoriteGenres,
  registerUserWithGoogle,
  updateUserProfile,

  // Quote
  createQuote,
  getBookQuotes,
  likeQuote,
  deleteQuote,
};
