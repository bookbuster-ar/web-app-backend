const { validate } = require('uuid');
const { getBookSubgenres } = require('../../controllers/index');

const handleGetSubgenresByBook = async (req, res) => {
  const bookId = req.query.id;

  try {
    if (bookId && validate(bookId)) {
      const subgenres = await getBookSubgenres(bookId);
      return res.status(200).json(subgenres);
    }
    return res.status(400).json({
      message: 'Proporcione una identificación de libro válida (UUID)',
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handleGetSubgenresByBook;
