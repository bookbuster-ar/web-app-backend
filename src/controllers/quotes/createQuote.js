const { Quote, User, Book } = require('../../models');
const sequelize = require('../../config/database');

const { timeAgo } = require('../../utils');

const createQuote = async ({ bookId, userId, content }) => {
  const transaction = await sequelize.transaction();
  try {
    const [createdQuote, wasCreated] = await Quote.findOrCreate({
      where: { user_id: userId, book_id: bookId },
      defaults: { content },
    });
    if (!wasCreated) {
      const conflictError = new Error(
        'No se pudo crear la cita porque el usuario tiene una cita vigente en este libro'
      );
      conflictError.statusCode = 409;
      throw conflictError;
    }

    const getQuoteCreatorPromise = await User.findByPk(userId, {
      attributes: ['id', 'name', 'last_name'],
      include: ['image'],
      transaction,
    });

    const getQuoteBookPromise = await Book.findByPk(bookId, {
      attributes: ['id', 'title', 'author'],
      transaction,
    });

    const { createdAt, updatedAt, user_id, book_id, ...relevantQuoteInfo } =
      createdQuote.toJSON();

    return {
      ...relevantQuoteInfo,
      createdAt: timeAgo(createdAt),
      by: { ...getQuoteCreatorPromise.toJSON() },
      inBook: { ...getQuoteBookPromise.toJSON() },
    };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

module.exports = createQuote;
