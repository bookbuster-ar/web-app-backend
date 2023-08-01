const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Rol = sequelize.define(
  'rol',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowwNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = Rol;
