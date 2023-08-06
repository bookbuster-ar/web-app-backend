const { isValidUUID } = require('../utils/index');
const getBooksByGenre = require('../controllers/books/getBooksByGenre');

const handleGetBooksByGenre = async (req, res) => {
  const genreId = req.query.id;
  try {
    if (genreId && isValidUUID(genreId)) {
      const booksByGenre = await getBooksByGenre(genreId);
      return res.status(200).json(booksByGenre);
    }
    return res.status(200).json({
      message: 'Provide a valid id (UUID)',
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handleGetBooksByGenre;
