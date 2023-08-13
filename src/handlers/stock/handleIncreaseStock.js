const { increaseStock } = require('../../controllers');

const handleIncreaseStock = async (req, res) => {
  try {
    const { bookId, quantity } = req.body[0];
    const result = await increaseStock(bookId, quantity);
    if (result.success) return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handleIncreaseStock;
