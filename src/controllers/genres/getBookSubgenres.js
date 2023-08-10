const { PublishedBook, Book, BookSubgenre } = require('@models');

const getBookSubgenres = async (bookId) => {
  try {
    const publishedBooksWithSubgenres = await PublishedBook.findByPk(bookId, {
      include: [
        {
          model: Book,
          as: 'book',
          include: [{ model: BookSubgenre, as: 'subgenres' }],
        },
      ],
    });

    if (!publishedBooksWithSubgenres) {
      throw new Error('El libro no tiene ningún subgénero');
    }

    const { subgenres } = publishedBooksWithSubgenres;

    return subgenres;
  } catch (error) {
    throw error;
  }
};

module.exports = getBookSubgenres;
