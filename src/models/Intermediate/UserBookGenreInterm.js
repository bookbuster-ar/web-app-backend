const sequelize = require('../../config/database');
const { DataTypes } = require('sequelize');

const UserBookGenreInterm = sequelize.define(
  'user_book_genre_interm',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = UserBookGenreInterm;
