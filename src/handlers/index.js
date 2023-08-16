// Books
const handleGetBooks = require('./books/handleGetBooks');
const handleGetBookById = require('./books/handleGetBookById');
const handleGetBooksByGenre = require('./books/handleGetBooksByGenre');
const handleGetBooksBySubgenre = require('./books/handleGetBooksBySubgenre');
const handleGetSubgenresByGenre = require('./books/handleGetSubgenresByGenre');
const handleCreateBook = require('./books/handleCreateBook');
const handleGetBookSubgenres = require('./books/handleGetBookSubgenres');

// Book Categories
const handleGetWeekRecommendations = require('./books/categories/handleGetWeekRecomendations');
const handleGetMostPopular = require('./books/categories/handleGetMostPopular');
const handleGetNewcommers = require('./books/categories/handleGetNewcommers');
const handleGetLatestNews = require('./books/categories/handleGetLatestNews');

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

// User
const handleAddFavoriteGenres = require('./user/handleAddFavoriteGenres');
const handleGetFavoriteGenres = require('./user/handleGetFavoriteGenres');

module.exports = {
  // Books
  handleGetBooks,
  handleGetBookById,
  handleGetBooksByGenre,
  handleCreateBook,
  handleGetBooksBySubgenre,
  handleGetSubgenresByGenre,
  handleGetBookSubgenres,

  // Book Categories
  handleGetWeekRecommendations,
  handleGetMostPopular,
  handleGetNewcommers,
  handleGetLatestNews,

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

  // User
  handleAddFavoriteGenres,
  handleGetFavoriteGenres,
};
