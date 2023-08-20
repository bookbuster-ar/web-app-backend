const { Transaction, PublishedBook, Book, BookImage } = require('../../models');

const getUserBooks = async (userId) => {
  const userTransactions = await Transaction.findAll({
    where: { user_id: userId },
    attributes: [],
    include: [
      {
        model: PublishedBook,
        as: 'books',
        attributes: ['id'],
        through: {
          attributes: [],
        },
      },
    ],
  });
  const publishedBookIds = userTransactions.flatMap((transaction) => {
    return transaction.books.map((book) => {
      return book.id;
    });
  });

  for (const publishedBookId of publishedBookIds) {
    const books = await PublishedBook.findAll({
      where: { id: publishedBookId },
      include: [
        {
          model: Book,
          as: 'book',
          include: [
            { model: BookImage, as: 'images', attributes: ['image'] },
            'editorial',
            'editorial_collection',
          ],
        },
      ],
    });
    return books.map((book) => {
      return {
        id: book.id,
        title: book.book.title,
        author: book.book.author,
        publication_year: book.book.publication_year,
        editorial: book.book.editorial?.name,
        editorial_collection: book.book.editorial_collection?.name,
        image: book.book.images.image,
      };
    });
  }
};

module.exports = getUserBooks;
