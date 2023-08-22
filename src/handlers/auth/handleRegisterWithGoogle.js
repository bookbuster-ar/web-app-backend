const { registerUserWithGoogle } = require('../../controllers/index');
const handleRegisterWithGoogle = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ error: 'Invalid Token' });
    }
    const register = await registerUserWithGoogle(token);
    res.status(200).json(register);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = handleRegisterWithGoogle;
