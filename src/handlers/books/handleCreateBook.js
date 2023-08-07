const { createBook } = require('../../controllers');

const handleCreateBook = async (req, res) => {
  try {
    const {
      title,
      author,
      publication_year,
      editorial,
      editorial_collection,
      genres,
      size,
      pages,
      subgenres,
      synopsis,
    } = req.body;

    const { statusCode } = await createBook({
      title,
      author,
      publication_year,
      editorial,
      editorial_collection,
      genres,
      subgenres,
      pages,
      size,
      synopsis,
      images: req.files,
    });
    if (statusCode === 201) {
      return res.sendStatus(statusCode);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = handleCreateBook;
