const { Book, BookGenre } = require('../../models/');

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
    const genreMatched = await BookGenre.findByPk(id, {
      include: [
        {
          model: Book,
          as: 'books',
          include: ['images', 'editorial', 'editorial_collection'],
        },
      ],
    });

    if (!genreMatched) {
      throw new Error('Genre not found');
    }

    return {
      id: genreMatched.id,
      genre: genreMatched.name,
      books: formatBooks(genreMatched.books),
    };
  } catch (error) {
    throw error;
  }
};

module.exports = getBooksByGenre;
