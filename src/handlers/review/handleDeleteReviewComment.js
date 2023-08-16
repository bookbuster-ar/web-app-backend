const { deleteReviewComment } = require('../../controllers');

const handleDeleteReviewComment = async (req, res) => {
  const { commentId } = req.params;
  try {
    const hasDeleted = await deleteReviewComment(commentId);
    if (hasDeleted) {
      return res.status(204).end();
    }
    return res.status(400).json({ error: 'No se pudo borrar el comentario' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handleDeleteReviewComment;
