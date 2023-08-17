const { Router } = require('express');
const adminRouter = Router();

const { adminValidator } = require('../../middlewares');
const {
  handleMarkBookAsRecommended,
  handleGetUsers,
  handleSearchUser,
  handleBanUser,
} = require('../../handlers');

adminRouter.post('/recommend', adminValidator, handleMarkBookAsRecommended);
adminRouter.post('/users/:userId/ban', adminValidator, handleBanUser);
adminRouter.get('/users', adminValidator, handleGetUsers);
adminRouter.get('/users/search', adminValidator, handleSearchUser);

module.exports = adminRouter;
