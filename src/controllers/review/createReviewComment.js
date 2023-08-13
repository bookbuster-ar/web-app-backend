const { Comment, User, Review } = require('../../models');
const { timeAgo } = require('../../utils');

const createReviewComment = async ({ reviewId, userId, comment }) => {
  const createCommentPromise = Comment.create({
    review_id: reviewId,
    user_id: userId,
    content: comment,
  });

  const getUserWhoCommentedPromise = User.findByPk(userId, {
    attributes: ['id', 'name', 'last_name'],
    include: ['image'],
  });

  const getReviewWhereCommentedPromise = Review.findByPk(reviewId, {
    attributes: ['id', 'content'],
  });

  const [createdComment, userWhoCommented, reviewWhereCommented] =
    await Promise.all([
      createCommentPromise,
      getUserWhoCommentedPromise,
      getReviewWhereCommentedPromise,
    ]);

  const { createdAt, updatedAt, ...relevantCommentInfo } =
    createdComment.toJSON();

  return {
    id: createdComment.id,
    commented: relevantCommentInfo?.content,
    createdAt: timeAgo(createdAt),
    by: { ...userWhoCommented.toJSON() },
    inReview: { ...reviewWhereCommented.toJSON() },
  };
};

module.exports = createReviewComment;
