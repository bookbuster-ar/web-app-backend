const { Router } = require('express');
const userRouter = Router();

const {
  handleAddFavoriteGenres,
  handleGetFavoriteGenres,
} = require('../../handlers');
const { verifySession } = require('../../middlewares');

userRouter.get('/profile', (req, res) => {
  res.send('Ruta GET de usuario');
});

userRouter.get('/preferences/genres', verifySession, handleGetFavoriteGenres);
userRouter.post('/preferences/genres', verifySession, handleAddFavoriteGenres);

module.exports = userRouter;
