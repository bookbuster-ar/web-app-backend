const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Editorial = sequelize.define(
  'editorial',
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

module.exports = Editorial;
