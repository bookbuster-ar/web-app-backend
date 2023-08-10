const validateUserRegistration = (req, res, next) => {
  const errorList = [];

  const { name, lastname, email, password } = req.body;

  if (!name || name.trim().length < 2) {
    errorList.push('El nombre debe tener al menos 2 caracteres');
  }

  if (!lastname || lastname.trim().length < 2) {
    errorList.push('El apellido debe tener al menos 2 caracteres');
  }

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!email || !emailRegex.test(email.trim())) {
    errorList.push('El correo electrónico no es válido');
  }

  if (!password || password.trim().length < 6) {
    errorList.push('La contraseña debe tener al menos 6 caracteres');
  }

  if (errorList.length > 0) {
    return res.status(400).json({ error: errorList });
  }

  next();
};

module.exports = validateUserRegistration;
