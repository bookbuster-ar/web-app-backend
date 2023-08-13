const { Router } = require('express');
const authRouter = Router();

const {
  handleLoginLocal,
  handleRegisterWithGoogle,
} = require('../../handlers/index');

// Login
authRouter.post('/login/local', handleLoginLocal);

authRouter.post('/login/google', (req, res) => {
  res.send('Ruta POST login google authentication');
});

// Signup
authRouter.post('/signup/local', (req, res) => {
  res.send('Ruta POST signup local authentication');
});

authRouter.post('/signup/google', handleRegisterWithGoogle);

// Logout
authRouter.post('/logout', handleLogOut);

module.exports = authRouter;
