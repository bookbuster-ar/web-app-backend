const { ReviewLike } = require('../../models');

const likeReview = async ({ reviewId, userId }) => {
  return await ReviewLike.create({
    review_id: reviewId,
    user_id: userId,
  });
};

module.exports = likeReview;
