const { Router } = require('express');

const genresRouter = Router();
const { handleGetGenres } = require('../../handlers/index');

genresRouter.get('/', handleGetGenres);

module.exports = genresRouter;
