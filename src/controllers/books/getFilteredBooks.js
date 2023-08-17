const { PublishedBook, Book } = require('../../models/index');
const { Op, Sequelize } = require('sequelize');
const getPaginationData = require('../../utils/pagination');

const normalizeAndLowerCase = (input) => {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
};

const createWhereClause = (columnName, value) => {
  return Sequelize.where(
    Sequelize.fn('unaccent', Sequelize.fn('lower', Sequelize.col(columnName))),
    {
      [Op.iLike]: `%${normalizeAndLowerCase(value)}%`,
    }
  );
};

const getFilteredBooks = async (req, { title, author, search }) => {
  try {
    const { limit, offset, page } = getPaginationData(req, 15);

    const whereClause = {};

    if (search) {
      whereClause[Op.or] = [
        createWhereClause('title', search),
        createWhereClause('author', search),
      ];
    } else {
      if (title) {
        whereClause.title = createWhereClause('title', title);
      }

      if (author) {
        whereClause.author = createWhereClause('author', author);
      }
    }

    const filteredBooks = await PublishedBook.findAll({
      limit: limit,
      offset: offset,
      include: {
        model: Book,
        as: 'book',
        where: whereClause,
        include: ['images', 'editorial', 'editorial_collection'],
      },
    });

    const totalFilteredBooks = await Book.count({
      include: [
        {
          model: PublishedBook,
          as: 'published_book',
        },
      ],
      where: whereClause,
    });

    const filteredData = filteredBooks.map((field) => {
      const [cover, ...extra] = field.book?.images.map((image) => image.image);
      return {
        id: field.id,
        images: { cover: cover ?? null },
        title: field.book.title,
        author: field.book.author,
        publication_year: field.book.publication_year,
        editorial_collection: field.book.editorial_collection.name,
        editorial: field.book.editorial.name,
      };
    });

    return {
      data: filteredData,
      paginated: {
        currentPage: page,
        itemsPerPage: limit,
        totalItems: totalFilteredBooks,
        totalPages: Math.ceil(totalFilteredBooks / limit),
      },
    };
  } catch (error) {
    throw error;
  }
};

module.exports = getFilteredBooks;
