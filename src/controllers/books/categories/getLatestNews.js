const { Book } = require('../../../models');

const getLatestNews = async () => {
  const mostRecentBooks = await Book.findAll({
    include: ['images', 'editorial', 'editorial_collection'],
    attributes: ['title', 'author', 'publication_year'],
    order: [['publication_year', 'DESC']],
    limit: 10,
  });

  return mostRecentBooks?.map((book) => {
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

module.exports = getLatestNews;
