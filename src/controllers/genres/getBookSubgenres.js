const { Book } = require('@models');

const getBookSubgenres = async (bookId) => {
  try {
    const bookWithSubgenres = await Book.findByPk(bookId, {
      include: ['subgenres'],
    });

    if (!bookWithSubgenres) {
      throw new Error('El libro no tiene ningún subgénero');
    }

    return {
      id: bookWithSubgenres.id,
      title: bookWithSubgenres.title,
      subgenres: bookWithSubgenres.subgenres?.map((subgenre) => ({
        id: subgenre.id,
        name: subgenre.name,
      })),
    };
  } catch (error) {
    throw error;
  }
};

module.exports = getBookSubgenres;
