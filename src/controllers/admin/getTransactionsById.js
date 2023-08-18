const {
  Transaction,
  TransactionDetail,
  User,
  PublishedBook,
  Book,
} = require('../../models');

const getTransactionsById = async (transactionId) => {
  const transaction = await Transaction.findOne({
    where: { id: transactionId },
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['name', 'last_name'],
      },
      {
        model: PublishedBook,
        as: 'books',
        through: {
          model: TransactionDetail,
          as: 'transactions',
        },
      },
    ],
  });

  const formatedTransaction = {
    user: {
      user_name: transaction.user.name,
      user_last_name: transaction.user.last_name,
    },
    transaction: {
      mercado_pago_transaction_id: transaction.mercadopago_transaction_id,
      transaction_date: transaction.transaction_date,
      total_amount: transaction.total_amount,
      transaction_status: transaction.transaction_status,
    },
    books: [],
  };
  for (const bookTransaction of transaction.books) {
    const book = await Book.findByPk(bookTransaction.book_id);
    if (book) {
      formatedTransaction.books.push({
        id: bookTransaction.id,
        title: book.title,
        quantity: bookTransaction.transactions.quantity,
        unit_price: bookTransaction.transactions.unit_price,
      });
    }
  }
  return formatedTransaction;
};

module.exports = getTransactionsById;
