const { Comment } = require('../../models');

const createReviewComment = async ({ reviewId, userId, comment }) => {
  return await Comment.create({
    review_id: reviewId,
    user_id: userId,
    content: comment,
  });
};

module.exports = createReviewComment;
