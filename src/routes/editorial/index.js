const { Router } = require('express');

const editorialRouter = Router();
const { handleGetEditorials, handleGetCollection } = require('../../handlers');

editorialRouter.get('/', handleGetEditorials);
editorialRouter.get('/collection', handleGetCollection);

module.exports = editorialRouter;
