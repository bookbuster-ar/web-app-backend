const { Router } = require('express');
const authRouter = Router();

const {
  handleRegisterLocalUser,
  handleVerifyEmail,
  handleSignInWithEmail,
  handleLogOut,
  handleLoginLocal,
  handleRegisterWithGoogle,
} = require('../../handlers/index');

const { validateUserRegistration } = require('../../middlewares/index');

// Login
authRouter.post('/login/local', handleSignInWithEmail);

authRouter.post('/login/google', (req, res) => {
  res.send('Ruta POST login google authentication');
});

// Signup
authRouter.post(
  '/signup/local',
  validateUserRegistration,
  handleRegisterLocalUser
);
authRouter.post('/verifyEmail', handleVerifyEmail);

authRouter.post('/signup/google', handleRegisterWithGoogle);

// Logout
authRouter.post('/logout', handleLogOut);

module.exports = authRouter;
