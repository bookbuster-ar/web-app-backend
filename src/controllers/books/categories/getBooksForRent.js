const { Book, BookFormat, PublishedBook } = require('../../../models');
const getPaginationData = require('../../../utils/pagination');

const getBooksForRent = async (req) => {
  const { limit, offset, page } = getPaginationData(req, 15);

  const booksForRent = await Book.findAll({
    limit: limit,
    offset: offset,
    include: [
      {
        model: BookFormat,
        where: { name: 'Alquiler' },
        as: 'formats',
        include: [
          {
            model: PublishedBook,
            as: 'published_books',
          },
        ],
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
    const [cover, ...extra] =
      book.book?.images?.map((image) => image.image) || [];
    return {
      id: book.id,
      images: { cover, extra },
      title: book.title,
      author: book.author,
      author_nationality: book.author_nationality,
      publication_year: book.publication_year,
      editorial_collection_id: book.editorial_collection_id,
      editorial_id: book.editorial_id,
      formats: book.formats.map((format) => ({
        id: format.id,
        name: format.name,
      })),
      published_book: book.published_book,
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
