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

  // Book Detail
  handleGetBookById,

  // Book Genre
  handleGetBooksByGenre,
  handleGetSubgenresByGenre,

  // Book Subgenre
  handleGetBooksBySubgenre,
  handleGetBookSubgenres,

  // Book Review
  handleGetBookReviews,
  handleCreateReview,
  handleLikeReview,

  handleDeleteReview,
  handleDeleteReviewComment,

  // Book Review Comment
  handleCreateReviewComment,
  handleGetReviewComments,
  handleLikeComment,
} = require('../../handlers/index');

// Middlewares
const {
  bookValidator,
  validateImageFile,
  verifySession,
  reviewValidator,
  reviewLikeValidator,
} = require('../../middlewares/index');

// Genre
bookRouter.get('/genre', handleGetBooksByGenre);

// Subgenre
bookRouter.get('/subgenres', handleGetBookSubgenres);
bookRouter.get('/genre/subgenres', handleGetSubgenresByGenre);
bookRouter.get('/subgenre', handleGetBooksBySubgenre);

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
  // reviewLikeValidator,
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

// All
bookRouter.get('/', handleGetBooks);

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
