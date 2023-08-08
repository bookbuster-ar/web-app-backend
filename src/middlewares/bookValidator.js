const { validate: uuidValidate } = require('uuid');

const bookValidator = (req, res, next) => {
  const { editorial_id, editorial_name } = req.body;

  const validator = {
    title: (value) =>
      !!value && typeof value === 'string' && value.trim() !== '',
    author: (value) =>
      !!value && typeof value === 'string' && value.trim() !== '',
    publication_year: (value) =>
      !!value && typeof value === 'string' && value.trim() !== '',
  };

  const fieldErrorMessage = {};

  Object.keys(validator).forEach((field) => {
    if (!validator[field](req.body[field])) {
      fieldErrorMessage[field] = `Este campo no tiene un formato válido`;
    }
  });

  if (editorial_id && editorial_name) {
    fieldErrorMessage.editorial = `Solo se debe proporcionar 'editorial_id' para referenciar a una editorial o el 'editorial_name' para crear una, no ambos`;
  } else if (editorial_id && !uuidValidate(editorial_id)) {
    fieldErrorMessage.editorial = `El 'editorial_id' proporcionado no es válido`;
  } else if (
    !editorial_id &&
    (!editorial_name || editorial_name.trim().length === 0)
  ) {
    fieldErrorMessage.editorial = `Debe proporcionar un 'editorial_id' válido o un 'editorial_name'`;
  }

  const someInvalidField = Object.keys(fieldErrorMessage).length > 0;

  if (someInvalidField) {
    return res.status(400).json({ error: fieldErrorMessage });
  }

  next();
};

module.exports = bookValidator;
