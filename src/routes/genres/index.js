const { Router } = require('express');
const genresRouter = Router();
const getGenres = require('../../handlers/getGenres');

genresRouter.get('/', getGenres);

module.exports = genresRouter;
