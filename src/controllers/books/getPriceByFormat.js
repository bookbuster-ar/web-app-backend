const { BookFormat, PublishedBookPrice } = require('../../models');
const { Op } = require('sequelize');

const getPriceByFormat = async (id, format) => {
  const formatResult = await BookFormat.findOne({
    where: {
      name: {
        [Op.iLike]: `%${format}%`,
      },
    },
  });

  if (!formatResult) return null;

  const priceResult = await PublishedBookPrice.findOne({
    where: {
      published_book_id: id,
      book_format_id: formatResult.id,
    },
  });

  if (priceResult) {
    return {
      format: format,
      price: priceResult.price,
    };
  } else {
    return null;
  }
};

module.exports = getPriceByFormat;
