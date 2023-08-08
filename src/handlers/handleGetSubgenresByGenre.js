const getSubgenresByGenre = require('../controllers/genres/getSubgenresByGenre');
const { validate } = require('uuid');

const handleGetSubgenresByGenre = async (req, res) => {
  const genreId = req.query.id;
  try {
    if (genreId && validate(genreId)) {
      const subgenres = await getSubgenresByGenre(genreId);
      return res.status(200).json(subgenres);
    } else return res.status(404).json({ message: 'Género no encontrado' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handleGetSubgenresByGenre;
