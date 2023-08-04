const allGenres = require('../controllers/allGenres');

const getGenres = async (req, res) => {
  try {
    const genres = await allGenres();
    res.status(200).json(genres);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = getGenres;
