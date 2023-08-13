const { getReviewComments } = require('../../controllers');

const handleGetReviewComments = async (req, res) => {
  const { bookId, reviewId } = req.params;
  try {
    const comments = await getReviewComments({ bookId, reviewId });
    return res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = handleGetReviewComments;
