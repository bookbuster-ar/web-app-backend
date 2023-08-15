const { BookGenre, BookSubgenre } = require('../../models/index');

const getSubgenresByGenre = async (genreId) => {
  try {
    const genre = await BookGenre.findByPk(genreId, {
      include: [{ model: BookSubgenre, as: 'subgenres' }],
    });

    if (!genre) {
      throw new Error('Género no encontrado');
    }

    return {
      id: genre.id,
      name: genre.name,
      subgenres: genre.subgenres?.map((subgenre) => ({
        id: subgenre.id,
        name: subgenre.name,
      })),
    };
  } catch (error) {
    throw {
      message: 'No se encontraron los subgéneros para el género dado',
    };
  }
};

module.exports = getSubgenresByGenre;
