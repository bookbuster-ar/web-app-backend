const { PublishedBook, Book } = require('../../models/');
const getPaginationData = require('../../utils/pagination');

const getAllBooks = async (req) => {
  try {
    //GET /api/books?page=1
    //Metodo LIMIT-OFFSET

    const { limit, offset, page } = getPaginationData(req, 15);

    const allBooks = await PublishedBook.findAll({
      limit: limit,
      offset: offset,
      include: {
        model: Book,
        as: 'book',
        include: ['images', 'editorial', 'editorial_collection'],
      },
    });

    const totalBooks = await PublishedBook.count();

    const booksData = allBooks.map((field) => {
      const [cover, ...extra] = field.book?.images.map((image) => image.image);
      return {
        id: field.id, //published_book_id
        images: { cover, extra },
        title: field.book.title,
        author: field.book.author,
        publication_year: field.book.publication_year,
        editorial_collection: field.book.editorial_collection.name,
        editorial: field.book.editorial.name,
      };
    });

    return {
      data: booksData,
      paginated: {
        currentPage: page,
        itemsPerPage: limit,
        totalItems: totalBooks,
        totalPages: Math.ceil(totalBooks / limit),
      },
    };
  } catch (error) {
    throw error;
  }
};

module.exports = getAllBooks;
