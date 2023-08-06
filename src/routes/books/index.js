const { Router } = require('express');

const bookRouter = Router();
const {
  handleGetBooks,
  handleGetBookById,
  handleGetBooksByGenre,
  handleCreateBook,
} = require('../../handlers');

const { validateBook, validateImageFile } = require('../../middlewares');

bookRouter.get('/genre', handleGetBooksByGenre);
bookRouter.get('/:id', handleGetBookById);
bookRouter.get('/', handleGetBooks);

bookRouter.post('/', validateBook, handleCreateBook);

module.exports = bookRouter;
