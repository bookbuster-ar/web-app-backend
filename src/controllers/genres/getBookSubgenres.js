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
            include: [
              {
                model: BookSubgenre,
                as: 'subgenres',
              },
            ],
          },
        ],
      }
    );

    if (!publishedBookWithSubgenres) {
      throw new Error('El libro no tiene ningún subgénero');
    }

    const { book } = publishedBookWithSubgenres;

    const filteredSubgenres = book.subgenres.map((subgenre) => ({
      id: subgenre.id,
      name: subgenre.name,
    }));

    return { subgenres: filteredSubgenres };
  } catch (error) {
    throw error;
  }
};

module.exports = getBookSubgenres;
