const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const InactiveUser = sequelize.define(
  'inactive_user',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = InactiveUser;
