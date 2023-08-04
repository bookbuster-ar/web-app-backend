const sequelize = require('../../config/database');

const { DataTypes } = require('sequelize');

const BookDetail = sequelize.define(
  'book_detail',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    synopsis: {
      type: DataTypes.TEXT,
      // allowNull: false,
    },
    pages: {
      type: DataTypes.INTEGER,
      // allowNull: false,
    },
    isbn: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    language: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    size: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      // allowNull: false,
    },
    subgenre: {
      type: DataTypes.JSON,
      // allowNull: false,
    },
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = BookDetail;
