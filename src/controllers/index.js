// Books
const getAllBooks = require('./books/getAllBooks');
const getBookById = require('./books/getBookById');
const getFilteredBooks = require('./books/getFilteredBooks');
const getAllFormatsAndPrice = require('./books/getAllFormatsAndPrice');

const getWeeklyRecommended = require('./books/getWeeklyRecommended');

const createBook = require('./books/createBook');

//Recommendation
const getRecommendation = require('./books/getRecommendation');

// Categories
const getRecommendedBooks = require('./books/categories/getRecommendedBooks');
const getMostPopularBooks = require('./books/categories/getMostPopularBooks');
const getNewlyArrivedBooks = require('./books/categories/getNewlyArrivedBooks');
const getLatestBooksReleases = require('./books/categories/getLatestBooksReleases');
const getBooksForRent = require('./books/categories/getBooksForRent');

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
const getUserInfo = require('./user/getUserInfo');
const getUserBooks = require('./user/getUserBooks');

// Quote
const createQuote = require('./quotes/createQuote');
const getBookQuotes = require('./quotes/getBookQuotes');
const likeQuote = require('./quotes/likeQuote');
const deleteQuote = require('./quotes/deleteQuote');

// Payment
const createGiftSubscriptionLink = require('./payment/createGiftSubscriptionLink');
const createSubscriptionLink = require('./payment/createSubscriptionLink');
const placeOrder = require('./payment/placeOrder');
const registerSuccessfulPayment = require('./payment/registerSuccessfulPayment');
const registerSuccessfulSubscription = require('./payment/registerSuccessfulSubscription');
const registerSuccessfulGiftSubscription = require('./payment/registerSuccessfulGiftSubscription');

//Shelves
const getShelves = require('./shelves/getShelves');
const addBookToShelf = require('./shelves/addBookToShelf');
const deleteBookFromShelf = require('./shelves/deleteBookFromShelf');
const getBooksOfTheShelf = require('./shelves/getBooksOfTheShelf');
const createNewShelf = require('./shelves/createNewShelf');
const deleteNewShelf = require('./shelves/deleteNewShelf');
const editNameShelf = require('./shelves/editNameShelf');
const getShelfWithBooks = require('./shelves/getShelfWithBooks');

// Admin
const markBookAsRecommended = require('./admin/markBookAsRecommended');
const getUsers = require('./admin/getUsers');
const searchUser = require('./admin/searchUser');
const banUser = require('./admin/banUser');
const createSubgenre = require('./admin/createSubgenre');
const createGenre = require('./admin/createGenre');
const addCredits = require('./admin/addCredits');
const getTransactionsById = require('./admin/getTransactionsById');
const getAllTransaction = require('./admin/getAllTransactions');
const getSubscriptions = require('./admin/getSuscriptions');
const getBooksSold = require('./admin/getBooksSold');
const getRoles = require('./admin/getRoles');
const updateUserRole = require('./admin/updateUserRole');
const getBooksToReview = require('./admin/getBooksToReview');
const publishBook = require('./admin/publishBook');

module.exports = {
  // Books
  getAllBooks,
  getReviewComments,
  getBookById,
  getFilteredBooks,
  createBook,
  getWeeklyRecommended,
  getAllFormatsAndPrice,

  //Recommendation
  getRecommendation,

  // Book Categories
  getRecommendedBooks,
  getMostPopularBooks,
  getNewlyArrivedBooks,
  getLatestBooksReleases,
  getBooksForRent,

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
  getUserInfo,
  getUserBooks,

  //Shelves
  getShelves,
  addBookToShelf,
  deleteBookFromShelf,
  getBooksOfTheShelf,
  createNewShelf,
  deleteNewShelf,
  editNameShelf,
  getShelfWithBooks,

  // Quote
  createQuote,
  getBookQuotes,
  likeQuote,
  deleteQuote,

  // Payment
  createGiftSubscriptionLink,
  createSubscriptionLink,
  placeOrder,
  registerSuccessfulPayment,
  registerSuccessfulSubscription,
  registerSuccessfulGiftSubscription,

  // Admin
  markBookAsRecommended,
  getUsers,
  searchUser,
  banUser,
  createSubgenre,
  createGenre,
  addCredits,
  getRoles,
  getTransactionsById,
  getAllTransaction,
  updateUserRole,
  getSubscriptions,
  getBooksSold,
  getBooksToReview,
  publishBook,
};
