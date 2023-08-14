const { Router } = require('express');
const userRouter = Router();

const { handleAddFavoriteGenres } = require('../../handlers');

userRouter.get('/profile', (req, res) => {
  res.send('Ruta GET de usuario');
});

userRouter.post('/preferences/genres', handleAddFavoriteGenres);

module.exports = userRouter;
