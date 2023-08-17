const { Router } = require('express');

const genresRouter = Router();
const { handleGetGenres, handleGetSubgenresByGenre } = require('../../handlers');

genresRouter.get('/', handleGetGenres);
genresRouter.get('/subgenres', handleGetSubgenresByGenre);

module.exports = genresRouter;
