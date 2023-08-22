const {
  BookFormat,
  PublishedBook,
  PublishedBookPrice,
  BookFormatInterm,
} = require('../../models');

const getAllFormatsAndPrice = async (bookId) => {
  const formatAndPrice = await PublishedBook.findOne({
    where: {
      id: bookId,
    },
    attributes: [],
    include: [
      {
        model: BookFormat,
        as: 'formats',
        through: {
          model: PublishedBookPrice,
          as: 'price',
          attributes: ['price'],
          where: {
            published_book_id: bookId,
          },
        },
        attributes: ['name'],
      },
    ],
  });

  return formatAndPrice.toJSON().formats?.map((format) => {
    return {
      ...format,
      price: format.price?.price,
    };
  });
};

module.exports = getAllFormatsAndPrice;
