const { PublishedBook, Book } = require('../../../models');

const getRecommendedBooks = async () => {
  const rawRecommendations = await Book.findAll({
    where: { weekly_recommended: true },
    attributes: ['title', 'author', 'publication_year'],
    include: [
      'images',
      'editorial',
      'editorial_collection',
      {
        model: PublishedBook,
        as: 'published_book',
        attributes: ['id'],
      },
    ],
    limit: 10,
  });

  return rawRecommendations?.map((book) => {
    const { published_book, ...bookInfo } = book.toJSON();
    return {
      id: published_book?.id,
      ...bookInfo,
      images: {
        cover:
          bookInfo.images.find((image) => image.is_cover === true)?.image ??
          null,
      },
      editorial: bookInfo.editorial.name,
      editorial_collection: bookInfo.editorial_collection.name,
    };
  });
};

module.exports = getRecommendedBooks;
