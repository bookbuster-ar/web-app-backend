const {
  Review,
  Comment,
  User,
  CommentLike,
  PublishedBook,
} = require('../../models');
const { timeAgo } = require('../../utils');

const getReviewComments = async ({ bookId, reviewId }) => {
  const publishedBook = await PublishedBook.findByPk(bookId);

  const reviewWithComments = await Review.findOne({
    where: { id: reviewId, book_id: publishedBook.book_id },
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
          {
            model: CommentLike,
            as: 'likes',
            include: [
              {
                model: User,
                as: 'user',
                attributes: ['id', 'name', 'last_name'],
                include: ['image'],
              },
            ],
          },
        ],
      },
    ],
  });

  if (!reviewWithComments) {
    return [];
  }

  return [
    ...reviewWithComments?.toJSON().comments?.map((comment) => {
      const { createdAt, updatedAt, ...commentInfo } = comment;
      return {
        ...commentInfo,
        createdAt: timeAgo(createdAt),
        likes: {
          count: comment.likes?.length,
          whoLiked: comment.likes?.map((like) => like.user),
        },
      };
    }),
  ];
};

module.exports = getReviewComments;
