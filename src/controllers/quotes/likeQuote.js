const { QuoteLike, User, Quote } = require('../../models');
const sequelize = require('../../config/database');

const likeQuote = async ({ quoteId, userId }) => {
  const transaction = await sequelize.transaction();
  try {
    const existingReaction = await QuoteLike.findOne({
      where: {
        quote_id: quoteId,
        user_id: userId,
      },
      transaction,
    });

    if (existingReaction) {
      await existingReaction.destroy({ transaction });
    } else {
      await QuoteLike.create(
        {
          quote_id: quoteId,
          user_id: userId,
        },
        { transaction }
      );
    }

    const getUserWhoReacted = await User.findByPk(userId, {
      attributes: ['id', 'name', 'last_name'],
      include: ['image'],
      transaction,
    });

    const getQuoteReacts = await Quote.findByPk(quoteId, {
      attributes: ['id', 'content'],
      transaction,
    });

    await transaction.commit();

    return {
      reacted: existingReaction ? 'dislike' : 'like',
      by: { ...getUserWhoReacted.toJSON() },
      inQuote: { ...getQuoteReacts.toJSON() },
    };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

module.exports = likeQuote;
