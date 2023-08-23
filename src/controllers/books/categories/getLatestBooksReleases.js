const { Book, PublishedBook } = require('../../../models');

const getLatestBooksReleases = async () => {
  const lastestBooks = await Book.findAll({
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
    attributes: ['title', 'author', 'publication_year'],
    order: [['publication_year', 'DESC']],
    limit: 10,
  });

  return lastestBooks?.map((book) => {
    const { published_book, ...bookInfo } = book.toJSON();
    return {
      ...bookInfo,
      id: published_book.id,
      images: {
        cover:
          book.images.find((image) => image.is_cover === true)?.image ?? null,
      },
      editorial: book.editorial.name,
      editorial_collection: book.editorial_collection.name,
    };
  });
};

module.exports = getLatestBooksReleases;
