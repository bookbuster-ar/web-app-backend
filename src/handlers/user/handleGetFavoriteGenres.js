const { getFavoriteGenres } = require('../../controllers');

const handleGetFavoriteGenres = async (req, res) => {
  const { userid: userId } = req.headers;
  try {
    const favoriteGenres = await getFavoriteGenres(userId);
    return res.status(200).json(favoriteGenres);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handleGetFavoriteGenres;
