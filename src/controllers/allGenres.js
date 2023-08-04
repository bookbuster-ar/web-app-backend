const BookGenre = require('../models/Book/BookGenre');

const allGenres = async () => {
  const genres = await BookGenre.findAll({ attributes: ['name'] });
  const genreNames = genres.map((genre) => genre.dataValues.name);
  return genreNames;
};

module.exports = allGenres;
