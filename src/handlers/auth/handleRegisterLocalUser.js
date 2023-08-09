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
    return res.status(201).json(registeredUser);
  } catch (error) {
    if (error.message === 'Ya existe un usuario con esa dirección de correo') {
      return res.status(409).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handleRegisterLocalUser;
