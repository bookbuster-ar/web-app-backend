const { Router } = require('express');
const authRouter = Router();

//login
authRouter.post('/login/local', (req, res) => {
  res.send('Ruta POST login local authentication');
});

authRouter.post('/login/google', (req, res) => {
  res.send('Ruta POST login google authentication');
});

//signup
authRouter.post('/signup/local', (req, res) => {
  res.send('Ruta POST signup local authentication');
});

authRouter.post('/signup/google', (req, res) => {
  res.send('Ruta POST signup google authentication');
});

//logout
authRouter.post('/logout', (req, res) => {
  res.send('Ruta POST logout authentication');
});

module.exports = authRouter;
