const sequelize = require('../config/database');

const { DataTypes } = require('sequelize');

const TransactionDetail = sequelize.define(
  'transaction_detail',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    quiantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unitPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = TransactionDetail;
