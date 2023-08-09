
const handlePlaceOrder = async (req, res) => {
  try {
    const items = Array.isArray(req.body) ? req.body : [req.body]; // Cambiar a un array de items
    const response = await placeOrder(items);
    res.status(200).json({response});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handlePlaceOrder;
