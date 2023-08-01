const sequelize = require('../../config/database');
const { DataTypes } = require('sequelize');

const BlockUser = sequelize.define(
  'block_user',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    block_date: {
      type: DataTypes.DATE,
    },
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = BlockUser;
