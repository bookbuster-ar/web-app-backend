const {
  PublishedBook,
  Book,
  BookGenre,
  BookSubgenre,
} = require('../../models');

const formatBooks = (books) =>
  books?.map((book) => {
    const [cover, ...extra] = book.images?.map((image) => image.image);
    return {
      id: book.id,
      images: { cover, extra },
      title: book.title,
      author: book.author,
      publication_year: book.publication_year,
      editorial: book.editorial?.name,
      editorial_collection: book.editorial_collection?.name,
    };
  });

const getBooksBySubgenre = async (subgenreId) => {
  try {
    const subgenre = await BookSubgenre.findByPk(subgenreId, {
      include: [
        {
          model: Book,
          as: 'books',
          include: ['images', 'editorial', 'editorial_collection'],
        },
      ],
    });

    if (!subgenre) {
      throw new Error('Subgenre not found');
    }

    const publishedBooksBySubgenre = await PublishedBook.findAll({
      where: {
        book_id: subgenre.books?.map((book) => book.id),
      },
      include: [
        {
          model: Book,
          as: 'book',
          include: ['images', 'editorial', 'editorial_collection'],
        },
      ],
    });
    console.log(publishedBooksBySubgenre);

    return {
      id: subgenre.id,
      subgenre: subgenre.name,
      books: formatBooks(publishedBooksBySubgenre.book),
    };
  } catch (error) {
    throw error;
  }
};

module.exports = getBooksBySubgenre;
