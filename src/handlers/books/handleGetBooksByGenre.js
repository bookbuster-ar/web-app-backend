const { validate } = require('uuid');
const getBooksBySubgenre = require('../../controllers/genres/getBooksBySubgenre');
const getBooksByGenreWithSubgenres = require('../../controllers/genres/getBooksByGenreWithSubgenres');

const handleGetBooksByGenre = async (req, res) => {
  const { genreId, subgenreId } = req.query;
  try {
    let booksByGenre;
    if (subgenreId && validate(subgenreId)) {
      booksByGenre = await getBooksBySubgenre(genreId, subgenreId);
    } else booksByGenre = await getBooksByGenreWithSubgenres(genreId);

    return res.status(200).json({
      booksByGenre,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handleGetBooksByGenre;
