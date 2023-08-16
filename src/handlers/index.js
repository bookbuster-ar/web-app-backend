// Books
const handleGetBooks = require('./books/handleGetBooks');
const handleGetBookById = require('./books/handleGetBookById');
const handleGetBooksByGenre = require('./books/handleGetBooksByGenre');
const handleGetBooksBySubgenre = require('./books/handleGetBooksBySubgenre');
const handleGetSubgenresByGenre = require('./books/handleGetSubgenresByGenre');
const handleCreateBook = require('./books/handleCreateBook');
const handleGetBookSubgenres = require('./books/handleGetBookSubgenres');
const handleGetSubgenresByBook = require('./books/handleGetSubgenresByBook');

//Pages
const handleGetBooksByPages = require('./books/handleGetBooksByPages');

//Format
const handleGetBooksByFormat = require('./books/handleGetBooksByFormat');

//Price
const handleGetPriceByFormat = require('./books/handleGetPriceByFormat');

// Review
const handleGetBookReviews = require('./review/handleGetBookReviews');
const handleGetReviewComments = require('./review/handleGetReviewComments');

const handleDeleteReview = require('./review/handleDeleteReview');
const handleDeleteReviewComment = require('./review/handleDeleteReviewComment');

const handleCreateReview = require('./review/handleCreateReview');
const handleCreateReviewComment = require('./review/handleCreateReviewComment');

// Review-Comment Like
const handleLikeReview = require('./review/handleLikeReview');
const handleLikeComment = require('./review/handleLikeComment');

// Genres
const handleGetGenres = require('./genres/handleGetGenres');

// Editorial
const handleGetEditorials = require('./editorial/handleGetEditorials');
const handleGetCollection = require('./editorial/handleGetCollection');

// Auth
const handleRegisterLocalUser = require('./auth/handleRegisterLocalUser');
const handleVerifyEmail = require('./auth/handleVerifyEmail');
const handleSignInWithEmail = require('./auth/handleSignInWithEmail');
const handleLogOut = require('./auth/handleLogOut');
const handleRegisterWithGoogle = require('./auth/handleRegisterWithGoogle');

// User
const handleAddFavoriteGenres = require('./user/handleAddFavoriteGenres');
const handleGetFavoriteGenres = require('./user/handleGetFavoriteGenres');

//Payment
const handlePlaceOrder = require('./payment/handlePlaceOrder');
const handleSuccessfulPayment = require('./payment/handleSuccessfulPayment');
const handleFailurePayment = require('./payment/handleFailurePayment');
const handlePendingPayment = require('./payment/handlePendingPayment');
const handleSubscriptionLink = require('./payment/handleSubscriptionLink');
const handleSuccessfulSubscription = require('./payment/handleSuccessfulSubscription');

// Stock
const handleIncreaseStock = require('./stock/handleIncreaseStock');
const handleRegisterFormat = require('./stock/handleRegisterFormat');

// Quote
const handleCreateQuote = require('./quotes/handleCreateQuote');
const handleGetBookQuotes = require('./quotes/handleGetBookQuotes');
const handleLikeQuote = require('./quotes/handleLikeQuote');
const handleDeleteQuote = require('./quotes/handleDeleteQuote');

module.exports = {
  // Books
  handleGetBooks,
  handleGetBookById,
  handleGetBooksByGenre,
  handleCreateBook,
  handleGetBooksBySubgenre,
  handleGetSubgenresByGenre,
  handleGetBookSubgenres,
  handleGetSubgenresByBook,

  //Pages
  handleGetBooksByPages,

  //Format
  handleGetBooksByFormat,

  //Price
  handleGetPriceByFormat,

  // Review
  handleGetBookReviews,
  handleGetReviewComments,
  handleCreateReview,
  handleCreateReviewComment,

  handleDeleteReview,
  handleDeleteReviewComment,

  // Review-Comment Like
  handleLikeReview,
  handleLikeComment,

  // Genres
  handleGetGenres,

  // Editorial
  handleGetEditorials,
  handleGetCollection,

  // Auth
  handleRegisterLocalUser,
  handleVerifyEmail,
  handleSignInWithEmail,
  handleLogOut,
  handleRegisterWithGoogle,

  // User
  handleAddFavoriteGenres,
  handleGetFavoriteGenres,

  //Payment
  handlePlaceOrder,
  handleSuccessfulPayment,
  handleFailurePayment,
  handlePendingPayment,
  handleSubscriptionLink,
  handleSuccessfulSubscription,

  // Stock
  handleIncreaseStock,
  handleRegisterFormat,

  // Quote
  handleCreateQuote,
  handleGetBookQuotes,
  handleLikeQuote,
  handleDeleteQuote,
};
