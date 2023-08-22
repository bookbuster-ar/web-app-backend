const { getBookReviews } = require('../../controllers');

const handleGetBookReviews = async (req, res) => {
  const { bookId } = req.params;
  try {
    const bookReviews = await getBookReviews(bookId);
    return res.status(200).json(bookReviews);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handleGetBookReviews;
