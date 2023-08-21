const {
  BookToReview,
  Book,
  Editorial,
  User,
  BookImage,
} = require('../../models');
const { timeAgo, convertKeysToCamelCase } = require('../../utils');

const getBooksToReview = async () => {
  const booksToReview = await BookToReview.findAll({
    include: [
      {
        model: Book,
        as: 'book',
        attributes: ['id', 'title', 'author', 'publication_year'],
        include: [
          {
            model: BookImage,
            where: { is_cover: true },
            as: 'images',
            attributes: ['image'],
          },
        ],
      },
      {
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'last_name'],
      },
    ],
    attributes: ['createdAt'],
  });

  return booksToReview.map((review) => {
    return {
      book: {
        ...convertKeysToCamelCase(review.book.toJSON()),
        images: review.book.images.map((image) => image.image)[0],
      },
      user: {
        ...convertKeysToCamelCase(review.user.toJSON()),
      },
      createdAt: timeAgo(review.createdAt),
    };
  });
};

module.exports = getBooksToReview;
