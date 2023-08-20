const { getBookQuotes } = require('../../controllers');

const handleGetBookQuotes = async (req, res) => {
  const { bookId } = req.params;
  try {
    const bookQuotes = await getBookQuotes(bookId);
    return res.status(200).json(bookQuotes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handleGetBookQuotes;
