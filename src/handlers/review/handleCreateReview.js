const { createReview } = require('../../controllers');

const handleCreateReview = async (req, res) => {
  const { userid: userId } = req.headers;
  const { bookId } = req.params;
  const { content, rating, reaction } = req.body;
  try {
    const reviewInfo = { bookId, userId, content, rating, reaction };
    const createdReview = await createReview(reviewInfo);
    if (createdReview) {
      return res.status(201).json(createdReview);
    }
    return res.status(400).json({
      error: 'No se pudo crear la review',
    });
  } catch (error) {
    if (error?.statusCode === 409) {
      return res.status(409).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handleCreateReview;