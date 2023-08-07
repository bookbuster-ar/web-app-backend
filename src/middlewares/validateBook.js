const validateBook = (req, res, next) => {
  const { genres } = req.body;

  const requiredFields = ['title', 'author', 'publication_year', 'editorial'];
  const errorMessages = {};

  requiredFields.forEach((field) => {
    if (!req.body[field] || req.body[field] === '') {
      errorMessages[field] = `Este campo es obligatorio`;
    }
  });

  if (!genres || genres.length === 0) {
    errorMessages.genres = 'Al menos un género requerido';
  }

  const hasErrors = Object.keys(errorMessages).length > 0;

  if (hasErrors) {
    return res.status(400).json({ error: errorMessages });
  }

  next();
};

module.exports = validateBook;
