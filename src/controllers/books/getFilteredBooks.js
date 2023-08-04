const { Book } = require('../../models/');
const { Op, Sequelize } = require('sequelize');

const getFilteredBooks = async ({ title, author }) => {
  try {
    const whereClause = {};

    if (title) {
      whereClause.title = Sequelize.where(
        Sequelize.fn('unaccent', Sequelize.fn('lower', Sequelize.col('title'))),
        {
          [Op.iLike]: `%${title
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()}%`,
        }
      );
    }

    if (author) {
      whereClause.author = Sequelize.where(
        Sequelize.fn(
          'unaccent',
          Sequelize.fn('lower', Sequelize.col('author'))
        ),
        {
          [Op.iLike]: `%${author
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()}%`,
        }
      );
    }

    const filteredBooks = await Book.findAll({
      where: whereClause,
      include: ['editorial_collection', 'editorial'],
    });

    return filteredBooks.map((book) => ({
      id: book.id,
      title: book.title,
      author: book.author,
      publication_year: book.publication_year,
      editorial_collection: book.editorial_collection.name,
      editorial: book.editorial.name,
    }));
  } catch (error) {
    throw error;
  }
};

module.exports = getFilteredBooks;
