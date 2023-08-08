const { Router } = require('express');
const authRouter = Router();

const { handleRegisterLocalUser } = require('@handlers');

// Login
authRouter.post('/login/local', (req, res) => {
  res.send('Ruta POST login local authentication');
});

authRouter.post('/login/google', (req, res) => {
  res.send('Ruta POST login google authentication');
});

// Signup
authRouter.post('/signup/local', handleRegisterLocalUser);

authRouter.post('/signup/google', (req, res) => {
  res.send('Ruta POST signup google authentication');
});

// Logout
authRouter.post('/logout', (req, res) => {
  res.send('Ruta POST logout authentication');
});

module.exports = authRouter;
