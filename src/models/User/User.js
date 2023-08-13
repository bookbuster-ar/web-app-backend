const sequelize = require('../../config/database');
const { DataTypes } = require('sequelize');

const User = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      // allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      // allowNull: false,
      // unique: true,
    },
    password: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    suscription: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      // allowNull: false,
    },
    date_of_register: {
      type: DataTypes.DATEONLY,
      // allowNull: false,
    },
    is_blocked: {
      type: DataTypes.BOOLEAN,
      // allowNull: false,
      defaultValue: false,
    },
    credit: {
      type: DataTypes.FLOAT,
      // allowNull: false,
    },
    is_inactive: {
      type: DataTypes.BOOLEAN,
      // allowNull: false,
      defaultValue: false,
    },
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = User;
