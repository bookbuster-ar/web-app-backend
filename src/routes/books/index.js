const { Router } = require('express');
const bookRouter = Router();

bookRouter.get('/', (req, res) => {
  res.send('Ruta GET de books');
});

bookRouter.get('/:id', (req, res) => {
  res.send('Ruta GET :id de books detail');
});

module.exports = bookRouter;
