const { Router } = require('express');
const genresRouter = Router();
const handleGetGenres = require('../../handlers/handleGetGenres');

genresRouter.get('/', handleGetGenres);
genresRouter.get('/:name/books', handleGetGenres);

module.exports = genresRouter;
