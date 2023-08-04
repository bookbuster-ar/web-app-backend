const sequelize = require('../../config/database');
const { DataTypes } = require('sequelize');

const UserImage = sequelize.define(
  'user_image',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      // allowNull: false,
    },
    image: {
      type: DataTypes.BLOB,
    },
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = UserImage;
