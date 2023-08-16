const { validate } = require('uuid');
const { getSubgenresByBook } = require('../../controllers');

const handleGetSubgenresByBook = async (req, res) => {
  const bookId = req.query.id;

  try {
    if (bookId && validate(bookId)) {
      const subgenreByBook = await getSubgenresByBook(bookId);
      return res.status(200).json(subgenreByBook);
    }
    return res.status(400).json({
      message: 'Proporcione una identificacion valida (UUID)',
    });
  } catch (error) {}
};

module.exports = handleGetSubgenresByBook;
