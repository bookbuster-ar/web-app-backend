const { Router } = require('express');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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

bookRouter.post(
  '/',
  upload.any(),
  validateBook,
  validateImageFile,
  handleCreateBook
);

module.exports = bookRouter;
