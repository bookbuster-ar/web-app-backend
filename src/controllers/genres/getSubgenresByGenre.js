const { BookGenre, BookSubgenre } = require('@models');

const getSubgenresByGenre = async (genreId) => {
  try {
    const genre = await BookGenre.findByPk(genreId, {
      include: [{ model: BookSubgenre, as: 'subgenres' }],
    });

    if (!genre) {
      throw new Error('Género no encontrado');
    }

    return genre.subgenres;
  } catch (error) {
    throw {
      message: 'No se encontraron los subgéneros para el género dado',
    };
  }
};

module.exports = getSubgenresByGenre;
