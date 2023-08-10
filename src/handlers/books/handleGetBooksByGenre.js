const { validate } = require('uuid');
const { getBooksByGenre } = require('../../controllers/index');

const handleGetBooksByGenre = async (req, res) => {
  const genreId = req.query.id;
  try {
    if (genreId && validate(genreId)) {
      const booksByGenre = await getBooksByGenre(genreId);
      return res.status(200).json(booksByGenre);
    }
    return res.status(400).json({
      message: 'Proporcione una identificacion valida (UUID)',
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handleGetBooksByGenre;
