const { createReview } = require('../../controllers');

const handleCreateReview = async (req, res) => {
  const { bookId, userId } = req.headers;
  const { content, rating } = req.body;
  try {
    const reviewInfo = { bookId, userId, content, rating };
    const createdReview = await createReview(reviewInfo);
    if (createdReview) {
      return res.status(201).json({
        data: createdReview,
        message: 'La review fue creada correctamente',
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = handleCreateReview;
