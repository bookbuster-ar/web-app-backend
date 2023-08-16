const { PublishedBook, Book } = require('../../../models');
const sequelize = require('../../../config/database');

const getWeekRecommendations = async () => {
  const rawRecommendations = await PublishedBook.findAll({
    order: [sequelize.fn('RANDOM')],
    limit: 10,
    attributes: ['id'],
    include: [
      {
        model: Book,
        as: 'book',
        include: ['images', 'editorial', 'editorial_collection'],
        attributes: ['title', 'author', 'publication_year'],
      },
    ],
  });

  return rawRecommendations?.map((recommendation) => {
    const cover = recommendation
      .toJSON()
      .book.images.find((image) => image.is_cover === true);
    return {
      id: recommendation.id,
      ...recommendation?.toJSON().book,
      images: { cover: cover?.image ?? null },
      editorial: recommendation?.toJSON().book?.editorial.name,
      editorial_collection:
        recommendation?.toJSON().book?.editorial_collection.name,
    };
  });
};

module.exports = getWeekRecommendations;
