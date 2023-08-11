const { likeComment } = require('../../controllers');

const handleLikeComment = async (req, res) => {
  const { commentId, userId } = req.headers;
  try {
    const updatedComment = await likeComment({ commentId, userId });
    if (updatedComment) {
      return res.status(201).json({
        data: updatedComment,
        message: 'El comentario fue likeado por <userName>',
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = handleLikeComment;
