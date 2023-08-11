const { Review, Comment } = require('../../models');

const getBookReviews = async (bookId) => {
  await Review.findAll({
    where: { book_id: bookId },
    include: [
      'review_likes',
      { model: Comment, as: 'comments', include: ['comment_likes'] },
    ],
  });
};

module.exports = getBookReviews;
