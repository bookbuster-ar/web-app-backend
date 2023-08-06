const { Router } = require('express');
const handleGetBookById = require('../../handlers/handleGetBookById');
const bookRouter = Router();
const handleGetBooks = require('../../handlers/handleGetBooks');
const handleGetBooksByGenre = require('../../handlers/handleGetBooksByGenre');

bookRouter.get('/genre', handleGetBooksByGenre);
bookRouter.get('/:id', handleGetBookById);
bookRouter.get('/', handleGetBooks);

module.exports = bookRouter;
