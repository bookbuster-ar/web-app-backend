const {
  PublishedBook,
  Book,
  BookGenre,
  BookSubgenre,
} = require('../../models');

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

const getBooksBySubgenre = async (subgenreId) => {
  try {
    const subgenre = await BookSubgenre.findByPk(subgenreId, {
      include: [
        {
          model: BookGenre,
          as: 'genres',
          include: [{ model: Book, as: 'books' }],
        },
      ],
    });
    if (!subgenre || !subgenre.genres.length) {
      throw new Error('Subgénero no encontrado o sin géneros asociados');
    }
    const publishedBooksBySubgenre = await PublishedBook.findAll({
      where: {
        book_id: subgenre.genres[0].books.map((book) => book.id),
      },
      include: [
        {
          model: Book,
          as: 'book',
          include: ['images', 'editorial', 'editorial_collection'],
        },
      ],
    });
    return {
      id: subgenre.id,
      subgenre: subgenre.name,
      books: formatBooks(publishedBooksBySubgenre.map((field) => field.book)),
    };
  } catch (error) {
    throw error;
  }
};

module.exports = getBooksBySubgenre;
