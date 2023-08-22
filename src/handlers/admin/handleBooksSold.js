const { getBooksSold } = require('../../controllers');

const handleBooksSold = async (req, res) => {
  try {
    const bookSold = await getBooksSold();
    return res.status(200).json(bookSold);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handleBooksSold;
