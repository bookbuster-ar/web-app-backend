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
  handleGetSubgenresByGenre,
  handleGetBooksBySubgenre,
  handleGetBookSubgenres,
} = require('../../handlers/index');

// Middlewares
const { bookValidator, validateImageFile } = require('../../middlewares/index');

bookRouter.get('/genre', handleGetBooksByGenre);
bookRouter.get('/subgenres', handleGetBookSubgenres);
bookRouter.get('/genre/subgenres', handleGetSubgenresByGenre);
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
