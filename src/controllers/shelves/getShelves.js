const { BookShelves, BookShelfCategory } = require('../../models');

const getShelves = async (userId) => {

  const shelveAndShelfs = await BookShelves.findOne({
    where: {
      user_id: userId,
    },
    include: [
      {
        model: BookShelfCategory,
        as: 'book_shelf_categories',
      },
    ],
  });

  return shelveAndShelfs;

};

module.exports = getShelves;
