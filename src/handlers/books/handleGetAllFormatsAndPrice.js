const { getAllFormatsAndPrice } = require('../../controllers');

const handleGetAllFormatsAndPrice = async (req, res) => {
  const bookId = req.params.id;
  try {
    const formatsAndPrice = await getAllFormatsAndPrice(bookId);
    return res.status(200).json(formatsAndPrice);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handleGetAllFormatsAndPrice;
