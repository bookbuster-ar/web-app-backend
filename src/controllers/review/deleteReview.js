const { Review } = require('../../models');

const deleteReview = async (reviewId) => {
  const deleteCount = await Review.destroy({
    where: {
      id: reviewId,
    },
    hooks: true,
  });
  return deleteCount > 0;
};

module.exports = deleteReview;
