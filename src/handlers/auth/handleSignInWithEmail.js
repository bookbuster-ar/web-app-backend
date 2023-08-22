const { signInWithEmail } = require('../../controllers/index');

const handleSignInWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await signInWithEmail({ email, password });
    res.status(200).json({
      data,
      message: 'El usuario ahora tiene una sesión activa',
    });
  } catch (error) {
    console.error(error);
    if (error.message === 'El usuario tiene ya una sesión activa') {
      return res.status(409).json({ error: error.message });
    }
    return res.status(401).send({ error: error.message });
  }
};

module.exports = handleSignInWithEmail;
