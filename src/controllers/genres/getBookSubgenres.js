const { PublishedBook, Book, BookSubgenre } = require('@models');

const getBookSubgenres = async (publishedBookId) => {
  try {
    const publishedBookWithSubgenres = await PublishedBook.findByPk(
      publishedBookId,
      {
        include: [
          {
            model: Book,
            as: 'book',
            include: [{ model: BookSubgenre, as: 'subgenres' }],
          },
        ],
      }
    );

    if (!publishedBookWithSubgenres) {
      throw new Error('El libro no tiene ningún subgénero');
    }

    const { book } = publishedBookWithSubgenres;

    return { subgenres: book.subgenres };
  } catch (error) {
    throw error;
  }
};

module.exports = getBookSubgenres;
