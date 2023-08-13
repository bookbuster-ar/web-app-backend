const { Review, User, ReviewLike } = require('../../models');
const { timeAgo } = require('../../utils');

// const getBookReviews = async (bookId) => {
//   const rawReviews = await Review.findAll({
//     where: { book_id: bookId },
//     attributes: { exclude: ['user_id', 'book_id'] },
//     include: [
//       {
//         model: User,
//         as: 'creator',
//         attributes: ['id', 'name', 'last_name'],
//         include: ['image'],
//       },
//       {
//         model: ReviewLike,
//         as: 'reactions',
//         attributes: ['type'],
//         include: [
//           {
//             model: User,
//             as: 'user',
//             attributes: ['id', 'name', 'last_name'],
//             include: ['image'],
//           },
//         ],
//       },
//     ],
//   });

//   return rawReviews.map((review) => {
//     const { createdAt, updatedAt, ...relevantReviewInfo } = review.toJSON();
//     return {
//       ...relevantReviewInfo,
//       createdAt: timeAgo(createdAt),
//       reactions: formatReactions(review.reactions),
//     };
//   });
// };

// const formatReactions = (reactions = []) => {
//   const reactionData = {};

//   reactions.forEach((reaction) => {
//     if (!reactionData[reaction.type]) {
//       reactionData[reaction.type] = {
//         count: 0,
//         who_reacted: [],
//         reactedUserIds: new Set(),
//       };
//     }

//     reactionData[reaction.type].count += 1;

//     if (
//       reaction.user &&
//       !reactionData[reaction.type].reactedUserIds.has(reaction.user.id)
//     ) {
//       reactionData[reaction.type].who_reacted.push(reaction.user);
//       reactionData[reaction.type].reactedUserIds.add(reaction.user.id);
//     }
//   });

//   for (const type in reactionData) {
//     delete reactionData[type].reactedUserIds;
//   }

//   return reactionData;
// };

const getBookReviews = async (bookId, userId = null) => {
  const rawReviews = await Review.findAll({
    where: { book_id: bookId },
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
