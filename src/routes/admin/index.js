const { Router } = require('express');
const adminRouter = Router();

const { adminValidator, publishedBookValidator } = require('../../middlewares');

const multer = require('multer');

// Multer
const storage = multer.memoryStorage();
const uploadFields = [
  { name: 'cover', maxCount: 1 },
  { name: 'extra', maxCount: 3 },
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
  handleSuscription,
  handleBooksSold,
  handlePublishBook,
} = require('../../handlers');

const { bookValidator, validateImageFile } = require('../../middlewares');

adminRouter.post('/recommend', adminValidator, handleMarkBookAsRecommended);
adminRouter.post('/users/:userId/ban', adminValidator, handleBanUser);
adminRouter.get('/users', adminValidator, handleGetUsers);
adminRouter.get('/users/search', adminValidator, handleSearchUser);
adminRouter.get('/subscriptions', adminValidator, handleSuscription);
adminRouter.get('/books/sold', adminValidator, handleBooksSold);
adminRouter.post('/subgenre', adminValidator, handleCreateSubgenre);
adminRouter.post('/genre', adminValidator, handleCreateGenre);
adminRouter.post('/user/:userId/credits', adminValidator, handleAddCredits);
adminRouter.get('/transactions/:id', adminValidator, handleGetTransactionsById);
adminRouter.get('/transactions', adminValidator, handleGetAllTransactions);

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
