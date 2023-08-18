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
} = require('../../handlers');
const { verifySession } = require('../../middlewares');

userRouter.put(
  '/profile',
  verifySession,
  multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } }).fields(
    uploadFields
  ),
  handleUpdateUserProfile
);

userRouter.get('/preferences/genres', verifySession, handleGetFavoriteGenres);
userRouter.post('/preferences/genres', verifySession, handleAddFavoriteGenres);

module.exports = userRouter;
