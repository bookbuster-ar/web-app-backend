const { Router } = require('express');
const authRouter = Router();

const {
  handleRegisterLocalUser,
  handleVerifyEmail,
  handleSignInWithEmail,
  handleLogOut,
  handleRegisterWithGoogle,
} = require('../../handlers/index');

const { validateUserRegistration } = require('../../middlewares/index');

// Login
authRouter.post('/login/local', handleSignInWithEmail);

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
