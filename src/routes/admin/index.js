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
  // handleGetTransactions,
} = require('../../handlers');

adminRouter.post('/recommend', adminValidator, handleMarkBookAsRecommended);
adminRouter.post('/users/:userId/ban', adminValidator, handleBanUser);
adminRouter.get('/users', adminValidator, handleGetUsers);
adminRouter.get('/users/search', adminValidator, handleSearchUser);
adminRouter.post('/subgenre', adminValidator, handleCreateSubgenre);
adminRouter.post('/genre', adminValidator, handleCreateGenre);
adminRouter.post('/user/:userId/credits', adminValidator, handleAddCredits);
// adminRouter.get('/transactions', adminValidator, handleGetTransactions);

module.exports = adminRouter;