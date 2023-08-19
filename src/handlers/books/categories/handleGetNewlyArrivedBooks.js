const { getNewlyArrivedBooks } = require('../../../controllers');
const handleGetNewlyArrivedBooks = async (req, res) => {
  try {
    const newlyArrivedBooks = await getNewlyArrivedBooks();
    return res.status(200).json(newlyArrivedBooks);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handleGetNewlyArrivedBooks;
