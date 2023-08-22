const sequelize = require('../../config/database');
const { DataTypes } = require('sequelize');

const BookToReview = sequelize.define(
  'book_to_review',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    review_status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { timestamps: true, freezeTableName: true }
);

module.exports = BookToReview;
