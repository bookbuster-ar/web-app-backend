const { validate } = require('uuid');
const { getSubgenresByBook } = require('../../controllers');

const handleGetSubgenresByBook = async (req, res) => {
  const bookId = req.query.bookId;

  try {
    if (bookId && validate(bookId)) {
      const subgenreByBook = await getSubgenresByBook(bookId);
      return res.status(200).json(subgenreByBook);
    }
    return res.status(400).json({
      message: 'Proporcione una identificacion valida (UUID)',
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handleGetSubgenresByBook;
