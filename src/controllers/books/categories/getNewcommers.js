const { Book } = require('../../../models');

const getNewcommers = async () => {
  const latestBooks = await Book.findAll({
    limit: 10,
    order: [['createdAt', 'DESC']],
  });

  return latestBooks;
};

module.exports = getNewcommers;
