const { validate: uuidValidate } = require('uuid');

const bookValidator = (req, res, next) => {
  const { editorialId, editorialName } = req.body;

  const validator = {
    title: (value) =>
      !!value && typeof value === 'string' && value.trim() !== '',
    author: (value) =>
      !!value && typeof value === 'string' && value.trim() !== '',
    publicationYear: (value) =>
      !!value && typeof value === 'string' && value.trim() !== '',
  };

  const fieldErrorMessage = {};

  Object.keys(validator).forEach((field) => {
    if (!validator[field](req.body[field])) {
      fieldErrorMessage[field] = `Este campo no tiene un formato válido`;
    }
  });

  if (editorialId && editorialName) {
    fieldErrorMessage.editorial = `Solo se debe proporcionar 'editorialId' para referenciar a una editorial o el 'editorialName' para crear una, no ambos`;
  } else if (editorialId && !uuidValidate(editorialId)) {
    fieldErrorMessage.editorial = `El 'editorialId' proporcionado no es válido`;
  } else if (
    !editorialId &&
    (!editorialName || editorialName.trim().length === 0)
  ) {
    fieldErrorMessage.editorial = `Debe proporcionar un 'editorialId' válido o un 'editorialName'`;
  }

  const someInvalidField = Object.keys(fieldErrorMessage).length > 0;

  if (someInvalidField) {
    return res.status(400).json({ error: fieldErrorMessage });
  }

  next();
};

module.exports = bookValidator;
