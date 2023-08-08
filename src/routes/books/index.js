const { Router } = require('express');
const multer = require('multer');

// Multer
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limitar a 5MB
});

// Book Router
const bookRouter = Router();

// Handlers
const {
  handleGetBooks,
  handleGetBookById,
  handleGetBooksByGenre,
  handleCreateBook,
} = require('../../handlers');

// Middlewares
const { bookValidator, validateImageFile } = require('@middlewares');

bookRouter.get('/genre', handleGetBooksByGenre);
bookRouter.get('/:id', handleGetBookById);
bookRouter.get('/', handleGetBooks);

bookRouter.post(
  '/',
  upload.array('images', 4),
  bookValidator,
  validateImageFile,
  handleCreateBook
);

module.exports = bookRouter;
