// Books
const handleGetBooks = require('./books/handleGetBooks');
const handleGetBookById = require('./books/handleGetBookById');
const handleGetBooksByGenre = require('./books/handleGetBooksByGenre');
const handleGetBooksBySubgenre = require('./books/handleGetBooksBySubgenre');
const handleGetSubgenresByGenre = require('./books/handleGetSubgenresByGenre');
const handleCreateBook = require('./books/handleCreateBook');
const handleGetBookSubgenres = require('./books/handleGetBookSubgenres');
const handleGetSubgenresByBook = require('./books/handleGetSubgenresByBook');
const handleGetWeeklyRecommended = require('./books/handleGetWeeklyRecommended');

// Recommendation
const handleRecommendation = require('./books/handleRecommendation');

//Price
const handleGetPriceByFormat = require('./books/handleGetPriceByFormat');

// Book Categories
const handleGetMostPopularBooks = require('./books/categories/handleGetMostPopularBooks');
const handleGetNewlyArrivedBooks = require('./books/categories/handleGetNewlyArrivedBooks');
const handleGetLatestBooksReleases = require('./books/categories/handleGetLatestBooksReleases');

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
const handleUpdateUserProfile = require('./user/handleUpdateUserProfile');
const handleGetUserInfo = require('./user/handleGetUserInfo');

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
const handlePostPriceAndFormat = require('./stock/handlePostPriceAndFormat');

// Quote
const handleCreateQuote = require('./quotes/handleCreateQuote');
const handleGetBookQuotes = require('./quotes/handleGetBookQuotes');
const handleLikeQuote = require('./quotes/handleLikeQuote');
const handleDeleteQuote = require('./quotes/handleDeleteQuote');

// Admin
const handleMarkBookAsRecommended = require('./admin/handleMarkBookAsRecommended');
const handleGetUsers = require('./admin/handleGetUsers');
const handleSearchUser = require('./admin/handleSearchUser');
const handleBanUser = require('./admin/handleBanUser');
const handleCreateSubgenre = require('./admin/handleCreateSubgenre');
const handleCreateGenre = require('./admin/handleCreateGenre');
const handleAddCredits = require('./admin/handleAddCredits');
// const handleGetTransactions = require('./admin/handleGetTransactions');

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
  handleGetWeeklyRecommended,

  //Price
  handleGetPriceByFormat,

  // Recommendation
  handleRecommendation,

  // Book Categories
  handleGetMostPopularBooks,
  handleGetNewlyArrivedBooks,
  handleGetLatestBooksReleases,

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
  handleUpdateUserProfile,
  handleGetUserInfo,

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
  handlePostPriceAndFormat,

  // Quote
  handleCreateQuote,
  handleGetBookQuotes,
  handleLikeQuote,
  handleDeleteQuote,

  // Admin
  handleMarkBookAsRecommended,
  handleGetUsers,
  handleSearchUser,
  handleBanUser,
  handleCreateSubgenre,
  handleCreateGenre,
  handleAddCredits,
  // handleGetTransactions,
};
