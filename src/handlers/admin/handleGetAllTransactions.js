const { getAllTransaction } = require('../../controllers');

const handleGetAllTransactions = async (req, res) => {
  try {
    const transactions = await getAllTransaction();
    return res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handleGetAllTransactions;
