const { Book, BookImage, BookGenre } = require('../../models');

const getWeeklyRecommended = async (genreId) => {
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
        {
          model: BookGenre,
          as: 'genres',
          where: {
            id: genreId,
          },
        },
      ],
    });

    return recommendedBook;
  } catch (error) {
    throw error;
  }
};

module.exports = getWeeklyRecommended;
