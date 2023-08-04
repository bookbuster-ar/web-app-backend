const { Router } = require('express');
const genresRouter = Router();

// Seba: Buscar géneros y devolverlos
genresRouter.get('/', (req, res) => {
  res.send('Ruta GET de genres');
});

module.exports = genresRouter;
