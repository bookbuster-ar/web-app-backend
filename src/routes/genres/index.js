const { Router } = require('express');
const genresRouter = Router();

genresRouter.get('/', (req, res) => {
  res.send('Ruta GET de genres');
});

module.exports = genresRouter;
