const { PublishedBook, Book } = require('@models');

const getAllBooks = async () => {
  try {
    const allBooks = await PublishedBook.findAll({
      include: {
        model: Book,
        as: 'book',
        include: ['images', 'editorial', 'editorial_collection'],
      },
    });

    return allBooks.map((field) => {
      const [cover, ...extra] = field.book.images.map((image) => image.image);
      return {
        id: field.book.id,
        images: { cover, extra },
        title: field.book.title,
        author: field.book.author,
        publication_year: field.book.publication_year,
        editorial_collection: field.book.editorial_collection.name,
        editorial: field.book.editorial.name,
      };
    });
  } catch (error) {
    throw error;
  }
};

module.exports = getAllBooks;
