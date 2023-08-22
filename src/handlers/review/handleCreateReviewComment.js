const { createReviewComment } = require('../../controllers');

const handleCreateReviewComment = async (req, res) => {
  const { userid: userId } = req.headers;
  const { reviewId } = req.params;
  const { comment } = req.body;

  try {
    if (!comment) {
      const badRequestError = new Error('El comentario no puede estar vacío');
      badRequestError.statusCode = 400;
      throw badRequestError;
    }

    const createdComment = await createReviewComment({
      reviewId,
      userId,
      comment,
    });

    if (createdComment) {
      return res.status(201).json(createdComment);
    }
    return res
      .status(400)
      .json({ error: 'No fue posible crear el comentario' });
  } catch (error) {
    console.error(error);
    if (error?.statusCode === 400) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handleCreateReviewComment;
