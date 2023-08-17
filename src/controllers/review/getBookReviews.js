const { Review, User, ReviewLike, PublishedBook } = require('../../models');
const { timeAgo } = require('../../utils');

const getBookReviews = async (bookId) => {
  const publishedBookId = await PublishedBook.findByPk(bookId);

  const rawReviews = await Review.findAll({
    where: { book_id: publishedBookId.book_id },
    attributes: { exclude: ['user_id', 'book_id'] },
    include: [
      {
        model: User,
        as: 'creator',
        attributes: ['id', 'name', 'last_name'],
        include: ['image'],
      },
      {
        model: ReviewLike,
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
  });

  if (!rawReviews) {
    return [];
  }

  return rawReviews.map((review) => {
    const { createdAt, updatedAt, ...relevantReviewInfo } = review.toJSON();
    return {
      ...relevantReviewInfo,
      createdAt: timeAgo(createdAt),
      likes: {
        count: relevantReviewInfo.likes.length,
        whoLiked: relevantReviewInfo.likes.map((like) => like.user),
      },
    };
  });
};

module.exports = getBookReviews;
