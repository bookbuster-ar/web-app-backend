const { validate: uuidValidate } = require('uuid');

const publishedBookValidator = (req, res, next) => {
  const { editorialId, editorialName, collectionId, collectionName } =
    req.body.data;

  const validator = {
    title: (value) =>
      !!value && typeof value === 'string' && value.trim() !== '',
    author: (value) =>
      !!value && typeof value === 'string' && value.trim() !== '',
    authorNationality: (value) =>
      !!value && typeof value === 'string' && value.trim() !== '',
    publicationYear: (value) =>
      !!value && typeof value === 'string' && value.trim() !== '',
    synopsis: (value) =>
      !!value && typeof value === 'string' && value.trim() !== '',
    pages: (value) => !!value && typeof value === 'number' && value > 0,
    language: (value) =>
      !!value && typeof value === 'string' && value.trim() !== '',
    size: (value) =>
      !!value && typeof value === 'string' && value.trim() !== '',
    price: (value) => !!value && typeof value === 'number' && value > 0,
  };

  const fieldErrorMessage = {};

  Object.keys(validator).forEach((field) => {
    if (!validator[field](req.body.data[field])) {
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

  if (collectionId && collectionName) {
    fieldErrorMessage.collection = `Solo se debe proporcionar 'collectionId' para referenciar a una colección de editorial o el 'collectionName' para crear una, no ambos`;
  } else if (collectionId && !uuidValidate(collectionId)) {
    fieldErrorMessage.editorial = `El 'collectionId' proporcionado no es válido`;
  } else if (
    !collectionId &&
    (!collectionName || collectionName.trim().length === 0)
  ) {
    fieldErrorMessage.editorial = `Debe proporcionar un 'collectionId' válido o un 'collectionName'`;
  }

  const someInvalidField = Object.keys(fieldErrorMessage).length > 0;

  if (someInvalidField) {
    return res.status(400).json(fieldErrorMessage);
  }

  next();
};

module.exports = publishedBookValidator;
