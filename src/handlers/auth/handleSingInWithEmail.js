const { singInWithEmail } = require('@controllers');

const handleSingInWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await singInWithEmail({ email, password });
    res.status(200).json({
      data: userData,
      message: 'El usuario tiene una sesión activa',
    });
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
};

module.exports = handleSingInWithEmail;
