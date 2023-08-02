const sequelize = require('../../config/database');
const { DataTypes } = require('sequelize');

const BookFormat = sequelize.define(
  'book_format',
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
  { timestamps: false, freezeTableName: true }
);

module.exports = BookFormat;
