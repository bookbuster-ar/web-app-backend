const { Router } = require('express');
const multer = require('multer');

// Multer

const storage = multer.memoryStorage();
const uploadFields = [
  { name: 'cover', maxCount: 1 },
  { name: 'extra', maxCount: 3 },
];

// Book Router
const bookRouter = Router();

// Handlers
const {
  // Book
  handleGetBooks,
  handleCreateBook,

  //Price
  handleGetPriceByFormat,

  // Book Detail
  handleGetBookById,

  // Book Genre
  handleGetBooksByGenre,
  handleGetBooksBySubgenre,
  handleGetSubgenresByBook,

  // Book Review
  handleGetBookReviews,
  handleGetReviewComments,
  handleCreateReview,
  handleLikeReview,
  handleCreateReviewComment,
  handleLikeComment,
  handleDeleteReview,
  handleDeleteReviewComment,

  // Book Review Comment
  handleCreateReviewComment,
  handleGetReviewComments,
  handleLikeComment,

  // Categories
  handleGetWeekRecommendations,
  handleGetMostPopular,
  handleGetNewcommers,
  handleGetLatestNews,
  // Book Quote
  handleCreateQuote,
  handleGetBookQuotes,
  handleLikeQuote,
  handleDeleteQuote,
} = require('../../handlers');

// Middlewares
const {
  bookValidator,
  validateImageFile,
  verifySession,
  reviewValidator,
<<<<<<< HEAD
} = require('../../middlewares');
=======
} = require('../../middlewares/index');
>>>>>>> 6e424413049be5ff6a164cbfabef582b4d54e707

// Genre
bookRouter.get('/genre', handleGetBooksByGenre);
bookRouter.get('/subgenres', handleGetSubgenresByBook);
bookRouter.get('/subgenre', handleGetBooksBySubgenre);

//Price
bookRouter.get('/price', handleGetPriceByFormat);

// Detail
bookRouter.get('/:id', handleGetBookById);

// Review
bookRouter.get('/:bookId/reviews', handleGetBookReviews);
bookRouter.get('/:bookId/reviews/:reviewId/comments', handleGetReviewComments);

bookRouter.post(
  '/:bookId/reviews',
  verifySession,
  reviewValidator,
  handleCreateReview
);
bookRouter.post(
  '/:bookId/reviews/:reviewId/like',
  verifySession,
  handleLikeReview
);

bookRouter.post(
  '/:bookId/reviews/:reviewId/comments',
  verifySession,
  handleCreateReviewComment
);
bookRouter.post(
  '/:id/reviews/:reviewId/comments/:commentId/like',
  verifySession,
  handleLikeComment
);

bookRouter.delete(
  '/:bookId/reviews/:reviewId/',
  verifySession,
  handleDeleteReview
);
bookRouter.delete(
  '/:bookId/reviews/:reviewId/comments/:commentId/',
  verifySession,
  handleDeleteReviewComment
);

//* Quote
bookRouter.post('/:bookId/quotes', verifySession, handleCreateQuote);

bookRouter.get('/:bookId/quotes', handleGetBookQuotes);

bookRouter.post(
  '/:bookId/quotes/:quoteId/like',
  verifySession,
  handleLikeQuote
);

bookRouter.delete('/:bookId/quotes/:quoteId', verifySession, handleDeleteQuote);

bookRouter.get('/', handleGetBooks);

// Categories
bookRouter.get(
  '/categories/week-recommendations',
  handleGetWeekRecommendations
);
bookRouter.get('/categories/most-popular', handleGetMostPopular);
bookRouter.get('/categories/newcommers', handleGetNewcommers);
bookRouter.get('/categories/latest-news', handleGetLatestNews);

// Create
bookRouter.post(
  '/',
  multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } }).fields(
    uploadFields
  ),
  bookValidator,
  validateImageFile,
  handleCreateBook
);

module.exports = bookRouter;
