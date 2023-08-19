const { TransactionDetail, PublishedBook } = require('../../models/index');

const getBooksSold = async () => {
  const books = await TransactionDetail.findAll();
  const transactions = books.filter((trans) => trans.published_book_id);
  if (!transactions.length) {
    return 'No se han vendido libros';
  }
  const formattedTransaction = PublishedBook.findByPk(transactions);
  return {
    transactionCount: transactions,
  };
};

module.exports = getBooksSold;
