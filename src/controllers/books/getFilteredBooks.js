const { PublishedBook, Book } = require('../../models/');
const { Op, Sequelize } = require('sequelize');

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

const getFilteredBooks = async ({ title, author }) => {
  try {
    const whereClause = {};

    if (title) {
      whereClause.title = createWhereClause('title', title);
    }

    if (author) {
      whereClause.author = createWhereClause('author', author);
    }

    const filteredBooks = await PublishedBook.findAll({
      where: whereClause,
      include: {
        model: Book,
        as: 'book',
        include: ['images', 'editorial', 'editorial_collection'],
      },
    });

    return filteredBooks.map((field) => {
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

module.exports = getFilteredBooks;
