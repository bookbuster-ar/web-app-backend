const { Book } = require('../../models/');

const getAllBooks = async () => {
  try {
    const allBooks = await Book.findAll({
      include: ['editorial_collection', 'editorial'],
    });

    return allBooks.map((book) => ({
      id: book.id,
      title: book.title,
      author: book.author,
      publication_year: book.publication_year,
      editorial_collection: book.editorial_collection.name,
      editorial: book.editorial.name,
    }));
  } catch (error) {
    throw error;
  }
};

module.exports = getAllBooks;
