const { createReviewComment } = require('../../controllers');

const handleCreateReviewComment = async (req, res) => {
  const { reviewId, userId } = req.headers;
  const { comment } = req.body;
  try {
    const createdComment = await createReviewComment({
      reviewId,
      userId,
      comment,
    });

    if (createdComment) {
      return res.status(201).json({
        data: createdComment,
        message: 'El comentario fue creado correctamente',
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = handleCreateReviewComment;
