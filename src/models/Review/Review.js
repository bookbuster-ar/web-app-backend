const sequelize = require('../../config/database');
const { DataTypes } = require('sequelize');

const Review = sequelize.define(
  'review',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      // allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      // allowNull: false,
    },
    reaction: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
  },
  { timestamps: true, freezeTableName: true }
);

module.exports = Review;
