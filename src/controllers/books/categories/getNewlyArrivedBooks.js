const { Book, PublishedBook } = require('../../../models');

const getNewlyArrivedBooks = async () => {
  const latestBooks = await PublishedBook.findAll({
    attributes: ['createdAt'],
    include: [
      {
        model: Book,
        as: 'book',
        include: ['images', 'editorial', 'editorial_collection'],
        attributes: ['title', 'author', 'publication_year'],
      },
    ],
    limit: 10,
    order: [['createdAt', 'DESC']],
  });

  return latestBooks?.map((field) => {
    const { createdAt, ...relevantInfo } = field.toJSON();
    return {
      ...relevantInfo.book,
      images: {
        cover:
          relevantInfo.book.images.find((image) => image.is_cover === true)
            ?.image ?? null,
      },
      editorial: relevantInfo.book.editorial.name,
      editorial_collection: relevantInfo.book.editorial_collection.name,
    };
  });
};

module.exports = getNewlyArrivedBooks;
