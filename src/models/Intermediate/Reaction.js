const sequelize = require('../../config/database');
const { DataTypes } = require('sequelize');

const Reaction = sequelize.define(
  'reaction',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = Reaction;
