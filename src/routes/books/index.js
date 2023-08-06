const { Router } = require('express');

const bookRouter = Router();
const {
  handleGetBooks,
  handleGetBookById,
  handleGetBooksByGenre,
} = require('../../handlers');

bookRouter.get('/genre', handleGetBooksByGenre);
bookRouter.get('/:id', handleGetBookById);
bookRouter.get('/', handleGetBooks);

module.exports = bookRouter;
