const { Router } = require('express');
const authRouter = Router();

const {
  handleRegisterLocalUser,
  handleVerifyEmail,
  handleSignInWithEmail,
} = require('@handlers');

// Login
authRouter.post('/login/local', handleSignInWithEmail);

authRouter.post('/login/google', (req, res) => {
  res.send('Ruta POST login google authentication');
});

// Signup
authRouter.post('/signup/local', handleRegisterLocalUser);
authRouter.post('/verifyEmail', handleVerifyEmail);

authRouter.post('/signup/google', (req, res) => {
  res.send('Ruta POST signup google authentication');
});

// Logout
authRouter.post('/logout', (req, res) => {
  res.send('Ruta POST logout');
});

module.exports = authRouter;
