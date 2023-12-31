const { ReviewLike, User, Review } = require('../../models');
const sequelize = require('../../config/database');

// const likeReview = async ({ reviewId, userId, reactionType }) => {
//   const transaction = await sequelize.transaction();

//   try {
//     await ReviewLike.destroy({
//       where: {
//         review_id: reviewId,
//         user_id: userId,
//       },
//       transaction,
//     });

//     const createReactionPromise = ReviewLike.create(
//       {
//         review_id: reviewId,
//         user_id: userId,
//         type: reactionType,
//       },
//       { transaction }
//     );

//     const getUserWhoReactedPromise = User.findByPk(userId, {
//       attributes: ['id', 'name', 'last_name'],
//       include: ['image'],
//       transaction,
//     });

//     const getReviewWhereReactsPromise = Review.findByPk(reviewId, {
//       attributes: ['id', 'content'],
//       transaction,
//     });

//     const [updatedReviewLike, userWhoReacted, reviewWhereReacts] =
//       await Promise.all([
//         createReactionPromise,
//         getUserWhoReactedPromise,
//         getReviewWhereReactsPromise,
//       ]);

//     await transaction.commit();

//     return {
//       reacted: updatedReviewLike?.type,
//       by: { ...userWhoReacted.toJSON() },
//       in: { ...reviewWhereReacts.toJSON() },
//     };
//   } catch (error) {
//     await transaction.rollback();
//     throw error;
//   }
// };

// module.exports = likeReview;

const likeReview = async ({ reviewId, userId }) => {
  const transaction = await sequelize.transaction();

  try {
    let existingReaction = await ReviewLike.findOne({
      where: {
        review_id: reviewId,
        user_id: userId,
      },
      transaction,
    });

    if (existingReaction) {
      await existingReaction.destroy({ transaction });
    } else {
      await ReviewLike.create(
        {
          review_id: reviewId,
          user_id: userId,
        },
        { transaction }
      );
    }

    const getUserWhoReactedPromise = User.findByPk(userId, {
      attributes: ['id', 'name', 'last_name'],
      include: ['image'],
      transaction,
    });

    const getReviewWhereReactsPromise = Review.findByPk(reviewId, {
      attributes: ['id', 'content'],
      transaction,
    });

    const [userWhoReacted, reviewWhereReacts] = await Promise.all([
      getUserWhoReactedPromise,
      getReviewWhereReactsPromise,
    ]);

    await transaction.commit();

    return {
      reacted: existingReaction ? 'dislike' : 'like',
      by: { ...userWhoReacted.toJSON() },
      inReview: { ...reviewWhereReacts.toJSON() },
    };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

module.exports = likeReview;
