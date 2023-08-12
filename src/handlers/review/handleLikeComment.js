const { likeComment } = require('../../controllers');

const handleLikeComment = async (req, res) => {
  const { commentId, userId } = req.headers;
  try {
    const reviewComment = await likeComment({ commentId, userId });
    if (reviewComment) {
      return res.status(201).json(reviewComment);
    }
    return res
      .status(400)
      .json({ error: 'No fue posible likear el comentario' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = handleLikeComment;
