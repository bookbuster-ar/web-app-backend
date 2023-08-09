const { registerUserWithEmail } = require('@controllers');

const handleRegisterLocalUser = async (req, res) => {
  try {
    const { name, lastname, email, password } = req.body;
    const registeredUser = await registerUserWithEmail({
      name,
      lastname,
      email,
      password,
    });
    return res.status(201).json({
      data: registeredUser,
      message: 'El usuario fue registrado correctamente',
    });
  } catch (error) {
    if (error.message === 'Ya existe un usuario con esa dirección de correo') {
      return res.status(409).json({ error: 'Error de registro' });
    }
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = handleRegisterLocalUser;
