const { BookFormat, PublishedBookPrice } = require('../../models');

const postPriceFormatBook = async (published_book_id, book_format_id, price) => {
  const idFormat = await BookFormat.findOne({
    where: { id: book_format_id },
  });

  const register = await PublishedBookPrice.findOrCreate({
    where: {
      published_book_id: published_book_id,
      book_format_id: idFormat.id,
      price: price,
    },
  });

  return register;
};

module.exports = postPriceFormatBook;
