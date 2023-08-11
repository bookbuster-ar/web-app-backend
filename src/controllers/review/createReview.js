const { Review } = require('../../models');

const createReview = async ({ bookId, userId, content, rating }) => {
  return await Review.create({
    user_id: userId,
    book_id: bookId,
    content,
    rating,
  });
};

module.exports = createReview;
