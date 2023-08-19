const { BookGenre, BookSubgenre } = require('../../models');

const createSubgenre = async (genreId, subgenreName) => {
  try {
    const genre = await BookGenre.findByPk(genreId);

    const existingSubgenre = await BookSubgenre.findOne({
      where: {
        name: subgenreName,
      },
    });

    if (existingSubgenre) throw new Error('Subgénero ya existe');

    const newSubgenre = await BookSubgenre.create({ name: subgenreName });

    await genre.addSubgenre(newSubgenre);

    return { msg: 'Subgénero creado', newSubgenre: newSubgenre };
  } catch (error) {
    throw error;
  }
};

module.exports = createSubgenre;
