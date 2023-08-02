const sequelize = require('../../config/database');
const { DataTypes } = require('sequelize');

const BookFormatInterm = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = BookFormatInterm;
