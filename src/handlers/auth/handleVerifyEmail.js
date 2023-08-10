const { verifyUserEmail } = require('@controllers');

const handleVerifyEmail = async (req, res) => {
  const { userId } = req.body;
  try {
    if (!userId) {
      return res.status(400).json({
        error:
          'Es necesario proporcionar el ID del usuario para validar su mail',
      });
    }

    const userUpated = await verifyUserEmail(userId);

    if (userUpated) {
      res
        .status(201)
        .json({ data: userUpated, message: 'E-mail verificado con éxito' });
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
