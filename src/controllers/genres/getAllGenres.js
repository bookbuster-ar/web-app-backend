const { BookGenre } = require('../../models/index');

const getAllGenres = async () => await BookGenre.findAll();

module.exports = getAllGenres;
