const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('blockUser', {
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
};
