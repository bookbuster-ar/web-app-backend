const sequelize = require('../../config/database');

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
    created: {
      type: DataTypes.DATE,
      defaultValue: false,
    },
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = BookShelfCategory;
