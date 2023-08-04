const { Router } = require('express');
const handleGetBookById = require('../../handlers/handleGetBookById');
const bookRouter = Router();

// David: Busca libros, también por nombre y autor, y por género
bookRouter.get('/', (req, res) => {
  res.send('Ruta GET de books');
});

// Caro: Buscar detail del libro
bookRouter.get('/:id', handleGetBookById);

module.exports = bookRouter;
