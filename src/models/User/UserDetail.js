const sequelize = require('../../config/database');
const { DataTypes } = require('sequelize');

const UserDetail = sequelize.define(
  'user_detail',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    about: {
      type: DataTypes.TEXT,
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
    postal_code: {
      type: DataTypes.INTEGER,
    },
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = UserDetail;
