const { CommentLike } = require('../../models');

const likeComment = async ({ commentId, userId }) => {
  return await CommentLike.create({
    comment_id: commentId,
    user_id: userId,
  });
};

module.exports = likeComment;
