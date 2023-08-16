const sequelize = require('../../config/database');

const { DataTypes } = require('sequelize');

const TransactionDetail = sequelize.define(
  'transaction_detail',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    quantity: {
      type: DataTypes.INTEGER,
      // allowNull: false,
    },
    unit_price: {
      type: DataTypes.FLOAT,
      // allowNull: false,
    },
    total_price: {
      type: DataTypes.FLOAT,
      // allowNull: false,
    },
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = TransactionDetail;
