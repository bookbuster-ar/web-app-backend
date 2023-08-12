const { Review, Comment, User, CommentLike } = require('../../models');

const getReviewComments = async ({ bookId, reviewId }) => {
  const reviewWithComments = await Review.findOne({
    where: { id: reviewId, book_id: bookId },
    attributes: { exclude: ['user_id', 'book_id'] },
    include: [
      {
        model: Comment,
        as: 'comments',
        attributes: { exclude: ['user_id', 'review_id'] },
        include: [
          {
            model: User,
            as: 'by',
            attributes: ['id', 'name', 'last_name'],
            include: ['image'],
          },
          { model: CommentLike, as: 'likes' },
        ],
      },
    ],
  });

  return {
    ...reviewWithComments.toJSON(),
    comments: reviewWithComments?.comments?.map((comment) => ({
      ...comment.toJSON(),
      likes: comment.likes.length,
    })),
  };
};

module.exports = getReviewComments;
