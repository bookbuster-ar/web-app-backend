const { createBook } = require('@controllers');

const handleCreateBook = async (req, res) => {
  try {
    const bookDataToCreate = {
      ...req.body,
      images: req.files,
    };
    const { statusCode } = await createBook(bookDataToCreate);

    if (statusCode === 201) {
      return res.sendStatus(statusCode);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = handleCreateBook;
