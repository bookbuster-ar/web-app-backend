const { Book, BookImage } = require('../../models');

const getWeeklyRecommended = async () => {
  try {
    const recommendedBook = await Book.findAll({
      where: {
        in_recommendation: true,
      },
      attributes: ['id', 'title'],
      include: [
        {
          model: BookImage,
          as: 'images',
          attributes: ['image'],
        },
      ],
    });

    return recommendedBook;
  } catch (error) {
    throw error;
  }
};

module.exports = getWeeklyRecommended;
