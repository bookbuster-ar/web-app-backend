const { Router } = require('express');
const adminRouter = Router();

const { adminValidator } = require('../../middlewares');
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
} = require('../../handlers');

adminRouter.post('/recommend', adminValidator, handleMarkBookAsRecommended);
adminRouter.post('/users/:userId/ban', adminValidator, handleBanUser);
adminRouter.get('/users', adminValidator, handleGetUsers);
adminRouter.get('/users/search', adminValidator, handleSearchUser);
adminRouter.post('/subgenre', adminValidator, handleCreateSubgenre);
adminRouter.post('/genre', adminValidator, handleCreateGenre);
adminRouter.post('/user/:userId/credits', adminValidator, handleAddCredits);
adminRouter.get('/transactions/:id', adminValidator, handleGetTransactionsById);
adminRouter.get('/transactions', adminValidator, handleGetAllTransactions);

module.exports = adminRouter;
