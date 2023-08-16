const { User } = require('../../models');

const getFavoriteGenres = async (userId) => {
  const user = await User.findByPk(userId, {
    attributes: ['id', 'name', 'last_name'],
    include: ['image'],
  });
  const favoriteGenres = await user.getFavoriteGenres();

  return {
    ...user.toJSON(),
    favoriteGenres: favoriteGenres.map((genre) => ({
      id: genre.id,
      name: genre.name,
    })),
  };
};

module.exports = getFavoriteGenres;
