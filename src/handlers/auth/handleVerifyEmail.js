const { verifyUserEmail } = require('@controllers');

const handleVerifyEmail = async (req, res) => {
  const { firebaseId } = req.body;
  try {
    const updatedEmailStatus = await verifyUserEmail(firebaseId);

    if (updatedEmailStatus) {
      res
        .status(201)
        .json({ data: null, message: 'E-mail verificado con éxito' });
    }
  } catch (error) {
    let statusCode = 500;

    if (error.message === 'Usuario no encontrado') {
      statusCode = 404;
    }
    if (error.message === 'El mail del usuario ya fue verificado') {
      statusCode = 409;
    }
    res.status(statusCode).json({ message: error.message });
  }
};

module.exports = handleVerifyEmail;
