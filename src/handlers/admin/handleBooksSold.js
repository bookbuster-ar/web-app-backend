const { getBooksSold } = require('../../controllers');

const handleBooksSold = async (req, res) => {
  try {
    const bookSold = await getBooksSold();
    res.status(200).json(bookSold);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = handleBooksSold;
