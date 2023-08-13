const { getBooksBySubgenre } = require('../../controllers');
const { validate } = require('uuid');

const handleGetBooksBySubgenre = async (req, res) => {
  const subgenreId = req.query.id;
  try {
    if (subgenreId && validate(subgenreId)) {
      const books = await getBooksBySubgenre(req,subgenreId);
      return res.status(200).json(books);
    }
    return res.status(200).json({
      message: 'Proporcione una identificación válida (UUID)',
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handleGetBooksBySubgenre;
