const { Book } = require('../../models/');

const getAllBooks = async () => {
  try {
    const allBooks = await Book.findAll({
      include: ['images', 'editorial', 'editorial_collection'],
    });

    return allBooks.map((book) => {
      const [cover, ...extra] = book.images.map((image) => image.image);
      return {
        id: book.id,
        images: { cover, extra },
        title: book.title,
        author: book.author,
        publication_year: book.publication_year,
        editorial_collection: book.editorial_collection.name,
        editorial: book.editorial.name,
      };
    });
  } catch (error) {
    throw error;
  }
};

module.exports = getAllBooks;
