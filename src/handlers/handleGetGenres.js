const { getAllGenres } = require('../controllers');

const handleGetGenres = async (req, res) => {
  try {
    const genres = await getAllGenres();
    res.status(200).json(genres);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = handleGetGenres;
