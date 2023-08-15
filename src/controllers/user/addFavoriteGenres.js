const { User, BookGenre } = require('../../models');
const { Op } = require('sequelize');

const addFavoriteGenres = async (userId, genreIds) => {
  const [favoriteGenres, user] = await Promise.all([
    BookGenre.findAll({ where: { id: { [Op.in]: genreIds } } }),
    User.findByPk(userId, { attributes: ['id'] }),
  ]);

  // Determine which genres are missing from user's favorites.
  const userHasGenrePromises = favoriteGenres.map((genre) =>
    user.hasFavoriteGenre(genre)
  );
  const userHasGenreResults = await Promise.all(userHasGenrePromises);

  const genresToAdd = favoriteGenres.filter(
    (_, index) => !userHasGenreResults[index]
  );

  if (genresToAdd.length > 0) {
    await user.addFavoriteGenres(genresToAdd);
  }

  return [...favoriteGenres];
};

module.exports = addFavoriteGenres;
