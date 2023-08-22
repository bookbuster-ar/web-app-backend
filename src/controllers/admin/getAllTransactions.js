const {
  User,
  Transaction,
  TransactionDetail,
  PublishedBook,
  Book,
} = require('../../models');

const getAllTransactions = async () => {
  const transactions = await Transaction.findAll({
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

  const formattedTransactions = transactions.map(async (transaction) => {
    const formattedTransaction = {
      user: {
        user_name: transaction.user?.name,
        user_last_name: transaction.user?.last_name,
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
        formattedTransaction.books.push({
          id: bookTransaction.id,
          title: book.title,
          quantity: bookTransaction.transactions.quantity,
          unit_price: bookTransaction.transactions.unit_price,
        });
      }
    }
    return formattedTransaction;
  });
  return Promise.all(formattedTransactions);
};

module.exports = getAllTransactions;
