const sequelize = require('../config/database');

const { DataTypes } = require('sequelize');

const BookShelfCategory = sequelize.define(
  'book_shelf_category',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = BookShelfCategory;
