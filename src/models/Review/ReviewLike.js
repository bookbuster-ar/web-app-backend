const sequelize = require('../../config/database');
const { DataTypes } = require('sequelize');

const ReviewLike = sequelize.define(
  'review_like',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    type: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = ReviewLike;
