const { likeReview } = require('../../controllers');

const handleLikeReview = async (req, res) => {
  const { reviewId, userId } = req.headers;
  try {
    const updatedReview = await likeReview({ reviewId, userId });
    if (updatedReview) {
      return res.status(201).json({
        data: updatedReview,
        message: 'La reseña fue likeada por <userName>',
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = handleLikeReview;
