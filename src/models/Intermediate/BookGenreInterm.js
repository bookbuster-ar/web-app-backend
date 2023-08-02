const sequelize = require('../../config/database');
const { DataTypes } = require('sequelize');

const BookGenreInterm = sequelize.define(
  'book_genre_interm',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = BookGenreInterm;
