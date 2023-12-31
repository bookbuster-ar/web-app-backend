const { Book, BookImage, BookGenre, PublishedBook } = require('../../models');

const getWeeklyRecommended = async (genreId) => {
  try {
    const recommendedBook = await Book.findAll({
      where: {
        in_recommendation: true,
      },

      include: [
        {
          model: BookImage,
          as: 'images',
          attributes: ['image'],
        },
        {
          model: PublishedBook,
          as: 'published_book',
          attributes: ['id'],
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

    return recommendedBook.map((book) => {
      return {
        id: book.published_book.id,
        images: book.images.map((image) => image.image)[0],
        author: book.author,
        title: book.title,
      };
    });
  } catch (error) {
    throw error;
  }
};

module.exports = getWeeklyRecommended;
