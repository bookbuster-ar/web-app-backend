const { Router } = require('express');

const genresRouter = Router();
const { handleGetGenres } = require('../../handlers');

genresRouter.get('/', handleGetGenres);


module.exports = genresRouter;
