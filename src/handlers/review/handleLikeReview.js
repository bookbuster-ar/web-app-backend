const { likeReview } = require('../../controllers');

const handleLikeReview = async (req, res) => {
  const { userid: userId } = req.headers;
  const { reviewId } = req.params;
  const { reactionType } = req.body;

  try {
    const reviewReaction = await likeReview({ reviewId, userId, reactionType });
    if (reviewReaction) {
      return res.status(201).json(reviewReaction);
    }
    return res.status(400).json({ error: 'No fue posible crear la reacción' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = handleLikeReview;
