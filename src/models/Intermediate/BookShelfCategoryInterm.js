const sequelize = require('../../config/database');

const { DataTypes } = require('sequelize');

const BookShelfCategoryInterm = sequelize.define(
  'book_shelf_category_interm',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = BookShelfCategoryInterm;
