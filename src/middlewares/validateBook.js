const { validate } = require('uuid');

const validateBook = (req, res, next) => {
  const { genres, editorial_id, editorial_name } = req.body;
  console.log(req.body);

  const requiredFields = [
    'title',
    'author',
    'publication_year',
    'synopsis',
    'language',
    'size',
    'pages',
  ];
  const errorMessages = {};

  requiredFields.forEach((field) => {
    if (!req.body[field] || req.body[field] === '') {
      errorMessages[field] = `Este campo es obligatorio`;
    }
  });

  if (!genres || genres.length === 0) {
    errorMessages.genres = 'Al menos un género requerido';
  }

  if (!validate(editorial_id) && editorial_name?.length === 0) {
    console.log('Entré en el if del editorial');
    errorMessages.editorial = 'Este campo es obligatorio';
  }

  const hasErrors = Object.keys(errorMessages).length > 0;

  if (hasErrors) {
    return res.status(400).json({ error: errorMessages });
  }

  next();
};

module.exports = validateBook;
