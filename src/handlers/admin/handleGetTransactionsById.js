const { getTransactionsById } = require('../../controllers');

const handleGetTransactionsById = async (req, res) => {
  const transactionId = req.params.id;
  console.log(transactionId);
  try {
    const transactions = await getTransactionsById(transactionId);
    return res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handleGetTransactionsById;
