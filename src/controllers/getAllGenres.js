const { BookGenre } = require('../models');

const getAllGenres = async () => await BookGenre.findAll();

module.exports = getAllGenres;
