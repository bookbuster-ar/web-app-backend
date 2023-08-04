const { Router } = require('express');
const handleGetBookById = require('../../handlers/handleGetBookById');
const bookRouter = Router();
const handleGetBooks = require('../../handlers/handleGetBooks');

// David: Busca libros, también por nombre y autor, y por género
bookRouter.get('/', handleGetBooks);

bookRouter.get('/:id', handleGetBookById);

module.exports = bookRouter;
