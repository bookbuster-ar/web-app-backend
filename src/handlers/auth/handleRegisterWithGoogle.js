const { registerUserWithGoogle } = require('../../controllers/index');
const handleRegisterWithGoogle = async (req, res) => {
  try {
    const { token } = req.body;
    const register = registerUserWithGoogle(token);
    res.status(200).json(register);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = handleRegisterWithGoogle;
