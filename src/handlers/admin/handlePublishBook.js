const { publishBook } = require('../../controllers');

const handlePublishBook = async (req, res) => {
  try {
    const bookInfo = {
      id: req.query.bookId ?? null,
      ...req.body,
      images: Object.keys(req.files).length > 0 ? req.files : null,
    };
    const userId = req.query.userId ?? null;
    const publishedBook = await publishBook(bookInfo, userId);
    return res.status(201).json(publishedBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = handlePublishBook;
