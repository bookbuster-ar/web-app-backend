const sequelize = require('../../config/database');
const { DataTypes } = require('sequelize');

const UserAddress = sequelize.define(
  'user_address',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    country: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    province: {
      type: DataTypes.STRING,
    },
    postal_code: {
      type: DataTypes.INTEGER,
    },
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = UserAddress;
