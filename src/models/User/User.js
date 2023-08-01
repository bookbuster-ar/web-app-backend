const sequelize = require('../../config/database');
const { DataTypes } = require('sequelize');

const User = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    suscription: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    date_of_register: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = User;
