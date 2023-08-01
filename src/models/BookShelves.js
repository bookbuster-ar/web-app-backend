const sequelize = require('./config/database');
const { DataTypes } = require('sequelize');

const BookShelves = sequelize.define(
  'book_shelves',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = BookShelves;
