const sequelize = require('../../config/database');
const { DataTypes } = require('sequelize');

const Book = sequelize.define(
  'book',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    author_nationality:{
      type: DataTypes.STRING,
      // allowNull: false,
    },
    publication_year: {
      type: DataTypes.INTEGER,
      // allowNull: false,
    },
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = Book;
