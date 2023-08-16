const sequelize = require('../../config/database');
const { DataTypes } = require('sequelize');

const QuoteLike = sequelize.define(
  'quote_like',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = QuoteLike;
