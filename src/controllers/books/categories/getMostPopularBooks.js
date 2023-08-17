const { Book, Review, ReviewLike } = require('../../../models');
const sequelize = require('../../../config/database');

const { Op } = require('sequelize');

const getMostPopularBooks = async () => {
  const rawMostPopularBooks = await Book.findAll({
    attributes: [
      'id',
      [sequelize.fn('COUNT', sequelize.col('reviews.id')), 'reviewCount'],
      [sequelize.fn('COUNT', sequelize.col('reviews->likes.id')), 'likeCount'],
      [sequelize.fn('AVG', sequelize.col('reviews.rating')), 'averageRating'],
    ],
    include: [
      {
        model: Review,
        as: 'reviews',
        attributes: [],
        duplicating: false,
        include: [
          {
            model: ReviewLike,
            as: 'likes',
            attributes: [],
            duplicating: false,
          },
        ],
      },
    ],
    group: ['book.id'],
    order: [
      [sequelize.literal('"averageRating"'), 'ASC'],
      [sequelize.literal('"likeCount"'), 'ASC'],
      [sequelize.literal('"reviewCount"'), 'ASC'],
    ],
    limit: 10,
  });
  idsOfMostPopularBooks = rawMostPopularBooks.map((book) => book.id);

  const mostPopularBooks = await Book.findAll({
    where: {
      id: {
        [Op.in]: idsOfMostPopularBooks,
      },
    },
    include: ['images', 'editorial', 'editorial_collection'],
    attributes: ['title', 'author', 'publication_year'],
  });

  return mostPopularBooks?.map((book) => {
    return {
      ...book.toJSON(),
      images: {
        cover:
          book.images.find((image) => image.is_cover === true)?.image ?? null,
      },
      editorial: book.editorial.name,
      editorial_collection: book.editorial_collection.name,
    };
  });
};

module.exports = getMostPopularBooks;
