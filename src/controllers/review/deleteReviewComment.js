const { Comment } = require('../../models');

const deleteReviewComment = async (commentId) => {
  const deleteCount = await Comment.destroy({
    where: {
      id: commentId,
    },
  });
  return deleteCount > 0;
};

module.exports = deleteReviewComment;
