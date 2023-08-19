const { Review, User, Book, PublishedBook } = require('../../models');
const sequelize = require('../../config/database');

const { timeAgo } = require('../../utils');

const createReview = async ({ bookId, userId, content, rating, reaction }) => {
  const transaction = await sequelize.transaction();
  try {
    const publishedBook = await PublishedBook.findByPk(bookId);
    const [createdReview, wasCreated] = await Review.findOrCreate({
      where: { user_id: userId, book_id: publishedBook.book_id },
      defaults: { content, rating, reaction },
    });

    if (!wasCreated) {
      const conflictError = new Error(
        'No se pudo crear la review porque el usuario tiene una review vigente en este libro'
      );
      conflictError.statusCode = 409;
      throw conflictError;
    }

    const getReviewCreatorPromise = User.findByPk(userId, {
      attributes: ['id', 'name', 'last_name'],
      include: ['image'],
      transaction,
    });

    const getReviewBookPromise = Book.findByPk(publishedBook.book_id, {
      attributes: ['id', 'title', 'author'],
      transaction,
    });

    const [reviewCreator, reviewBook] = await Promise.all([
      getReviewCreatorPromise,
      getReviewBookPromise,
    ]);

    const { createdAt, updatedAt, user_id, book_id, ...relevantReviewInfo } =
      createdReview.toJSON();

    return {
      ...relevantReviewInfo,
      createdAt: timeAgo(createdAt),
      by: { ...reviewCreator.toJSON() },
      inBook: { ...reviewBook.toJSON(), id: publishedBook.id },
    };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

module.exports = createReview;
