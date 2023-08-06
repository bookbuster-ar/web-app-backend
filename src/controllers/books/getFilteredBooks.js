const { Book } = require('../../models/');
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

const getFilteredBooks = async ({ title, author, search }) => {
  try {
    const whereClause = {};
     console.log("title:",title, "author:",author, "search:",search);
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

    const filteredBooks = await Book.findAll({
      where: whereClause,
      include: ['images', 'editorial_collection', 'editorial'],
    });

    return filteredBooks.map((book) => {
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
  } catch (error) {
    throw error;
  }
};


module.exports = getFilteredBooks;
