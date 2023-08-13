const { getBookById } = require('../../controllers/index');

const handleGetBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const bookDetail = await getBookById(id);
    if (!bookDetail) return res.status(404).json({ message: 'Book not found' });

    return res.status(200).json(bookDetail);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = handleGetBookById;
