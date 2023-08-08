const { createBook } = require('@controllers');
const { validate: validateUUID } = require('uuid');

const handleCreateBook = async (req, res) => {
  try {
    const bookDataToCreate = {
      ...req.body,
      images: req.files,
    };
    const { id } = await createBook(bookDataToCreate);
    if (id && validateUUID(id)) {
      return res
        .status(201)
        .json({ created: { id }, message: 'El libro fue creado con éxito' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = handleCreateBook;
