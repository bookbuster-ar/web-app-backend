const sequelize = require('./config/database');
const { DataTypes } = require('sequelize');

const blockUser =  sequelize.define('blockUser', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    blockDate: {
      type: DataTypes.DATE,
    },
  });

module.exports = blockUser;
