const { Router } = require('express');
const userRouter = Router();

const multer = require('multer');

// Multer
const storage = multer.memoryStorage();
const uploadFields = [{ name: 'image', maxCount: 1 }];

const {
  handleAddFavoriteGenres,
  handleGetFavoriteGenres,
  handleUpdateUserProfile,
  handleGetUserInfo,
} = require('../../handlers');
const { verifySession, validateImageFile } = require('../../middlewares');

userRouter.get('/profile', verifySession, handleGetUserInfo);

userRouter.put(
  '/profile',
  verifySession,
  multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } }).fields(
    uploadFields
  ),
  validateImageFile,
  handleUpdateUserProfile
);

userRouter.get('/preferences/genres', verifySession, handleGetFavoriteGenres);
userRouter.post('/preferences/genres', verifySession, handleAddFavoriteGenres);

module.exports = userRouter;
