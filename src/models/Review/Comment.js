const sequelize = require('../../config/database');
const { DataTypes } = require('sequelize');

const Comment = sequelize.define(
  'comment',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      // allowNull: false,
    },
  },
  { timestamps: true, freezeTableName: true }
);

module.exports = Comment;
