const sequelize = require('../../config/database');
const { DataTypes } = require('sequelize');

const PublishedBook = sequelize.define(
  'published_book',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = PublishedBook;
