const BookGenre = require('../models/Book/BookGenre');

const getAllGenres = async () => {
  const genres = await BookGenre.findAll();
  return genres;
};

module.exports = getAllGenres;
