const { logOut } = require('../../controllers/index');

const handleLogOut = async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({
        error: 'Es necesario proporcionar el ID de la sesión para cerrarla',
      });
    }

    const updatedSession = await logOut(sessionId);

    if (updatedSession) {
      return res.status(204).json({
        data: null,
        message: 'La sesión del usuario fue cerrada con éxito',
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handleLogOut;
