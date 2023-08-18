const { banUser } = require('../../controllers');

const handleBanUser = async (req, res) => {
  const { userId } = req.params;
  const { duration, reason } = req.body;
  try {
    const success = await banUser(userId, duration, reason);
    if (success)
      return res
        .status(200)
        .json({ message: 'Usuario bloqueado exitosamente' });
    else return res.status(400).json({ error: 'Error al bloquear el usuario' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handleBanUser;
