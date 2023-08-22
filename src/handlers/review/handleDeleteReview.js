const { deleteReview } = require('../../controllers');

const handleDeleteReview = async (req, res) => {
  const { reviewId } = req.params;
  try {
    const hasDeleted = await deleteReview(reviewId);
    if (hasDeleted) {
      return res.status(204).end();
    }
    return res.status(400).json({ error: 'No se pudo borrar la review' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handleDeleteReview;
