const sequelize = require('../../config/database');
const { DataTypes } = require('sequelize');

const BookImage = sequelize.define(
  'book_image',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    image: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    is_cover: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = BookImage;
