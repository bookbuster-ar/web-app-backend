const { getBooksToReview } = require('../../controllers');

const handleGetBooksToReview = async (req, res) => {
  try {
    const books = await getBooksToReview();
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handleGetBooksToReview;
