const { getRecommendedBooks } = require('../../../controllers');

const handleGetRecommendedBooks = async (req, res) => {
  try {
    const recommendedBooks = await getRecommendedBooks();
    return res.status(200).json(recommendedBooks);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handleGetRecommendedBooks;
