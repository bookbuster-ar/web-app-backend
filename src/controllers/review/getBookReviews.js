const { Review, User, ReviewLike } = require('../../models');

const getBookReviews = async (bookId) => {
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
        as: 'reactions',
        attributes: ['type'],
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

  return rawReviews.map((review) => ({
    ...review.toJSON(),
    reactions: formatReactions(review.reactions),
  }));
};

const formatReactions = (reactions = []) => {
  const reactionData = {};

  reactions.forEach((reaction) => {
    if (!reactionData[reaction.type]) {
      reactionData[reaction.type] = {
        count: 0,
        who_reacted: [],
        reactedUserIds: new Set(),
      };
    }

    reactionData[reaction.type].count += 1;

    if (
      reaction.user &&
      !reactionData[reaction.type].reactedUserIds.has(reaction.user.id)
    ) {
      reactionData[reaction.type].who_reacted.push(reaction.user);
      reactionData[reaction.type].reactedUserIds.add(reaction.user.id);
    }
  });

  for (const type in reactionData) {
    delete reactionData[type].reactedUserIds;
  }

  return reactionData;
};

module.exports = getBookReviews;
