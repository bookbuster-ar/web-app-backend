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
    firebase_id: {
      type: DataTypes.STRING,
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
      unique: true,
      // allowNull: false,
      // unique: true,
    },
    email_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    about: {
      type: DataTypes.TEXT,
    },
    subscription: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      // allowNull: false,
    },
    date_of_register: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
      // allowNull: false,
    },
    is_blocked: {
      type: DataTypes.BOOLEAN,
      // allowNull: false,
      defaultValue: false,
    },
    credit: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      // allowNull: false,
    },
    is_inactive: {
      type: DataTypes.BOOLEAN,
      // allowNull: false,
      defaultValue: false,
    },
    want_notifications: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = User;
