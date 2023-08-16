const { addFavoriteGenres } = require('../../controllers');

const handleAddFavoriteGenres = async (req, res) => {
  const { genreIds } = req.body;
  const { userid: userId } = req.headers;
  try {
    const favoriteGenresAdded = await addFavoriteGenres(userId, genreIds);

    if (favoriteGenresAdded) {
      return res.status(201).json(favoriteGenresAdded);
    }
    return res.status(400).json({
      error: 'No se pudo agregar los géneros favoritos del usuario',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = handleAddFavoriteGenres;
