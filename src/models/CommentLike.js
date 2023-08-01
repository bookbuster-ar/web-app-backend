const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const CommentLike = sequelize.define(
  'comment_like',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = CommentLike;
