const { TransactionDetail } = require('../../models/index');

const getBooksSold = async () => {
  const books = await TransactionDetail.findAll();
  const transactions = books.filter((trans) => trans.published_book_id);
  if (!transactions.length) {
    return 'No se han vendido libros';
  }
  return {
    transactionCount: transactions.length,
  };
};

module.exports = getBooksSold;
