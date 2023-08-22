const { getAllGenres } = require('../../controllers/index');

const handleGetGenres = async (req, res) => {
  try {
    const genres = await getAllGenres();
    return res.status(200).json(genres);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

module.exports = handleGetGenres;
