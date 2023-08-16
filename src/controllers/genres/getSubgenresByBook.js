const { PublishedBook, Book, BookSubgenre } = require('../../models');

const getSubgenresByBook = async (bookId) => {
  try {
    const bookWithSubgenres = await PublishedBook.findByPk(bookId, {
      include: [
        {
          model: Book,
          as: 'book',
          include: [{ model: BookSubgenre, as: 'subgenres' }],
        },
      ],
    });

    if (!bookWithSubgenres) {
      throw new Error('No tiene subgeneros');
    }

    return bookWithSubgenres.book?.subgenres.map((subgenre) => ({
      id: subgenre.id,
      name: subgenre.name,
    }));
  } catch (error) {
    throw error;
  }
};

module.exports = getSubgenresByBook;
