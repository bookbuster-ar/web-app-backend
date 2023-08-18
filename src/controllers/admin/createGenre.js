const { BookGenre } = require('../../models');
const createGenre = async (name) => {
  const existingGenre = await BookGenre.findOne({
    where: {
      name,
    },
  });
  if (existingGenre) throw new Error('El género ya existe');

  const newGenre = await BookGenre.create({ name });
  return { msg: 'Género creado', newGenre: newGenre };
};

module.exports = createGenre;
