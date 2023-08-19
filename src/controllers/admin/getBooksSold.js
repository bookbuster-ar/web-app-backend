const {
  TransactionDetail,
  PublishedBook,
  Book,
} = require('../../models/index');

const getBooksSold = async () => {
  const transactionDetails = await TransactionDetail.findAll();

  const bookSoldCount = {};

  transactionDetails.forEach((transactionDetail) => {
    const publishedBookId = transactionDetail.published_book_id;
    if (publishedBookId) {
      if (bookSoldCount[publishedBookId]) {
        bookSoldCount[publishedBookId] += transactionDetail.quantity;
      } else {
        bookSoldCount[publishedBookId] = transactionDetail.quantity;
      }
    }
  });

  const formattedTransaction = await Promise.all(
    Object.keys(bookSoldCount).map(async (publishedBookId) => {
      const book = await PublishedBook.findByPk(publishedBookId, {
        include: [
          {
            model: Book,
            as: 'book',
            attributes: ['title'],
            include: ['editorial', 'formats'],
          },
        ],
      });
      return {
        book: book.book.title,
        total_sold: bookSoldCount[publishedBookId],
      };
    })
  );
  return formattedTransaction;
};

module.exports = getBooksSold;
