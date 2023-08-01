const sequelize = require('./config/database');
const { DataTypes } = require('sequelize');

const rol = sequelize.define('rol', {
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
  });


  module.exports = rol;
