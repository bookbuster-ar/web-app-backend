const { Router } = require('express');
const adminRouter = Router();

const { adminValidator, publishedBookValidator } = require('../../middlewares');

const multer = require('multer');

// Multer
const storage = multer.memoryStorage();
const uploadFields = [
  { name: 'cover', maxCount: 1 },
  { name: 'backCover', maxCount: 1 },
  { name: 'spine', maxCount: 1 },
  { name: 'inHalf', maxCount: 1 },
];

const {
  handleMarkBookAsRecommended,
  handleGetUsers,
  handleSearchUser,
  handleBanUser,
  handleCreateSubgenre,
  handleCreateGenre,
  handleAddCredits,
  handleGetTransactionsById,
  handleGetAllTransactions,
  handleSubscription,
  handleBooksSold,
  handleGetRoles,
  handleUpdateUserRole,
  handleGetBannedUsers,
  handlePublishBook,
  handleGetBooksToReview,
} = require('../../handlers');

const { bookValidator, validateImageFile } = require('../../middlewares');

adminRouter.post('/recommend', adminValidator, handleMarkBookAsRecommended);
adminRouter.post('/users/:userId/ban', adminValidator, handleBanUser);
adminRouter.get('/users', adminValidator, handleGetUsers);
adminRouter.get('/users/search', adminValidator, handleSearchUser);
adminRouter.get('/subscriptions', adminValidator, handleSubscription);
adminRouter.get('/books/sold', adminValidator, handleBooksSold);
adminRouter.post('/subgenre', adminValidator, handleCreateSubgenre);
adminRouter.post('/genre', adminValidator, handleCreateGenre);
adminRouter.post('/user/:userId/credits', adminValidator, handleAddCredits);
adminRouter.get('/transactions/:id', adminValidator, handleGetTransactionsById);
adminRouter.get('/transactions', adminValidator, handleGetAllTransactions);
adminRouter.get('/roles', adminValidator, handleGetRoles);
adminRouter.put('/user/:userId/role', adminValidator, handleUpdateUserRole);
adminRouter.get('/banned', adminValidator, handleGetBannedUsers);
adminRouter.get('/booksToReview', handleGetBooksToReview);

// Publish Book
adminRouter.post(
  '/publish/:bookId',
  adminValidator,
  multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } }).fields(
    uploadFields
  ),
  publishedBookValidator,
  validateImageFile,
  handlePublishBook
);

module.exports = adminRouter;
