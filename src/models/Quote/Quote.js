const sequelize = require('../../config/database');
const { DataTypes } = require('sequelize');

const Quote = sequelize.define(
  'quote',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    content: {
      type: DataTypes.TEXT,
    },
  },
  { timestamps: true, freezeTableName: true }
);

module.exports = Quote;
