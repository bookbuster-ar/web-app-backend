const { publishBook } = require('../../controllers');

const handlePublishBook = async (req, res) => {
  try {
    const bookInfo = {
      id: req.params.bookId,
      ...req.body.data,
      images: [req.files.cover, req.files.extra],
    };
    const publishedBook = await publishBook(bookInfo);
    return res.status(201).json(publishedBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = handlePublishBook;
