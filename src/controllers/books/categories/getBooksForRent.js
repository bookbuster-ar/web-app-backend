const { Book, BookFormat, PublishedBook } = require('../../../models');
const getPaginationData = require('../../../utils/pagination');

const getBooksForRent = async (req) => {
  const { limit, offset, page } = getPaginationData(req, 15);

  const booksForRent = await Book.findAll({
    limit: limit,
    offset: offset,
    include: [
      'images',
      'editorial',
      'editorial_collection',
      {
        model: BookFormat,
        where: { name: 'Alquiler' },
        as: 'formats',
      },
      {
        model: PublishedBook,
        as: 'published_book',
        attributes: ['id'],
      },
    ],
  });

  const totalBooks = await Book.count({
    include: [
      {
        model: BookFormat,
        where: { name: 'Alquiler' },
        as: 'formats',
      },
    ],
  });

  const books = booksForRent.map((book) => {
    const [cover, ...extra] = book.images?.map((image) => image.image) || [];
    return {
      id: book.published_book.id,
      images: { cover, extra },
      title: book.title,
      author: book.author,
      author_nationality: book.author_nationality,
      publication_year: book.publication_year,
      editorial_collection: book.editorial_collection.name,
      editorial: book.editorial.name,
      formats: book.formats.map((format) => ({
        id: format.id,
        name: format.name,
      })),
    };
  });

  return {
    data: books,
    paginated: {
      currentPage: page,
      itemsPerPage: limit,
      totalItems: totalBooks,
      totalPages: Math.ceil(totalBooks / limit),
    },
  };
};

module.exports = getBooksForRent;
