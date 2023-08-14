const { Router } = require('express');
const userRouter = Router();

userRouter.get('/profile', (req, res) => {
  res.send('Ruta GET de usuario');
});

userRouter.post('/preferences/genres', (req, res) => {});

module.exports = userRouter;
