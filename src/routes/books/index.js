const { Router } = require('express');
const bookRouter = Router();
const handleGetBooks = require('../../handlers/handleGetBooks');

// David: Busca libros, también por nombre y autor, y por género
bookRouter.get('/', handleGetBooks);

// Caro: Buscar detail del libro
bookRouter.get('/:id', (req, res) => {
  res.send('Ruta GET :id de books detail');
});

module.exports = bookRouter;
