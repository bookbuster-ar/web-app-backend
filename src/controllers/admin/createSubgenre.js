const { BookGenre, BookSubgenre } = require('../../models');

const createSubgenre = async (genreId, name) => {
  try {
    const genre = await BookGenre.findByPk(genreId);
    const newSubgenre = await BookSubgenre.create({
      name: name,
      genre_id: genreId,
    });
  } catch (error) {}
};
