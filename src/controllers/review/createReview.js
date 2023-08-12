const { Review, User, Book } = require('../../models');
const sequelize = require('../../config/database');

const moment = require('moment');
require('moment-duration-format');
require('moment-timezone');

const createReview = async ({ bookId, userId, content, rating }) => {
  const transaction = await sequelize.transaction();
  try {
    const [createdReview, wasCreated] = await Review.findOrCreate({
      where: { user_id: userId, book_id: bookId },
      defaults: { content, rating },
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

    const getReviewBookPromise = Book.findByPk(bookId, {
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
      at: timeAgo(createdAt),
      by: { ...reviewCreator.toJSON() },
      in: { ...reviewBook.toJSON() },
    };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const timeAgo = (dateString) => {
  const date = moment(dateString).tz('UTC'); // Asumiendo que la fecha es UTC
  const now = moment().tz('UTC');
  const duration = moment.duration(now.diff(date));

  // Establece las reglas para mostrar el mensaje
  if (duration.asMinutes() < 1) {
    return 'hace un momento';
  } else if (duration.asMinutes() < 60) {
    return duration.format('hace [ ]m[ minutos]');
  } else if (duration.asHours() < 24) {
    return duration.format('hace [ ]h[ horas]');
  } else if (duration.asDays() < 30) {
    return duration.format('hace [ ]d[ días]');
  } else {
    return `el ${date.format('DD/MM/YYYY')}`;
  }
};

module.exports = createReview;
