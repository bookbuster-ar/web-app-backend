const { verifyUserEmail } = require('@controllers');

const handleVerifyEmail = async (req, res) => {
  const { uid: userId } = req.body;
  try {
    const updatedEmailStatus = await verifyUserEmail(userId);

    if (updatedEmailStatus) {
      res.status(201).send({ message: 'E-mail verificado con éxito' });
    }
  } catch (error) {
    if (error.message === 'Usuario no encontrado') {
      return res.status(404).send({ message: error.message });
    }
    res.status(500).send({ message: 'Error al verificar el correo' });
  }
};

module.exports = handleVerifyEmail;
