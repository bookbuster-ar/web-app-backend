const { PublishedBook, Book, BookGenre } = require('../../models/');

const formatBooks = (books) =>
  books.map((book) => {
    const [cover, ...extra] = book.images.map((image) => image.image);
    return {
      id: book.id,
      images: { cover, extra },
      title: book.title,
      author: book.author,
      publication_year: book.publication_year,
      editorial: book.editorial.name,
      editorial_collection: book.editorial_collection.name,
    };
  });

const getBooksByGenre = async (id) => {
  try {
    const booksOfSpecificGenre = await BookGenre.findByPk(id, {
      include: [{ model: Book, as: 'books' }],
    });

    const publishedBooksByGenre = await PublishedBook.findAll({
      where: {
        book_id: booksOfSpecificGenre.books.map((book) => book.id),
      },
      include: [
        {
          model: Book,
          as: 'book',
          include: ['images', 'editorial', 'editorial_collection'],
        },
      ],
    });

    if (!publishedBooksByGenre) {
      throw new Error('Genre not found');
    }

    return {
      id: booksOfSpecificGenre.id,
      genre: booksOfSpecificGenre.name,
      books: formatBooks(publishedBooksByGenre.map((field) => field.book)),
    };
  } catch (error) {
    throw error;
  }
};

module.exports = getBooksByGenre;
