const { likeReview } = require('../../controllers');

const handleLikeReview = async (req, res) => {
  const { userid: userId } = req.headers;
  const { reviewId } = req.params;

  try {
    const likedReview = await likeReview({ reviewId, userId });
    if (likedReview) {
      return res.status(201).json(likedReview);
    }
    return res.status(400).json({ error: 'No fue posible likear la review' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = handleLikeReview;
