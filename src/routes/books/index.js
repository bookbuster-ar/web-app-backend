const { Router } = require('express');
const multer = require('multer');

// Multer
const storage = multer.memoryStorage();
const uploadFields = [
  { name: 'cover', maxCount: 1 },
  { name: 'extra', maxCount: 3 },
];

// Book Router
const bookRouter = Router();

// Handlers
const {
  handleGetBooks,
  handleGetBookById,
  handleGetBooksByGenre,
  handleCreateBook,
  handleGetBooksBySubgenre,
  handleGetSubgenresByBook
} = require('../../handlers');

// Middlewares
const { bookValidator, validateImageFile } = require('@middlewares');

bookRouter.get('/genre', handleGetBooksByGenre);
bookRouter.get('/subgenres', handleGetSubgenresByBook )
bookRouter.get('/subgenre', handleGetBooksBySubgenre);
bookRouter.get('/:id', handleGetBookById);
bookRouter.get('/', handleGetBooks);

bookRouter.post(
  '/',
  multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } }).fields(
    uploadFields
  ),
  bookValidator,
  validateImageFile,
  handleCreateBook
);

module.exports = bookRouter;
