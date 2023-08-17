const { Router } = require('express');
const userRouter = Router();

const {
  handleAddFavoriteGenres,
  handleGetFavoriteGenres,
  handleUpdateUserProfile,
} = require('../../handlers');
const { verifySession } = require('../../middlewares');

userRouter.put('/profile', verifySession, handleUpdateUserProfile);

userRouter.get('/preferences/genres', verifySession, handleGetFavoriteGenres);
userRouter.post('/preferences/genres', verifySession, handleAddFavoriteGenres);

module.exports = userRouter;
