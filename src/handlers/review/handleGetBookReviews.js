const { getBookReviews } = require('../../controllers');

const handleGetBookReviews = async (req, res) => {
  const { bookId } = req.params;
  const { userId } = req.headers;
  try {
    const bookReviews = await getBookReviews(bookId, userId);
    return res.status(200).json(bookReviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = handleGetBookReviews;
