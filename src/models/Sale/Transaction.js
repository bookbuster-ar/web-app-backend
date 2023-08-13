const sequelize = require('../../config/database');

const { DataTypes } = require('sequelize');

const Transaction = sequelize.define(
  'transaction',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    mercadopago_transaction_id: {
      type: DataTypes.BIGINT,
      // allowNull: false,
    },
    transaction_date: {
      type: DataTypes.DATEONLY,
      // allowNull: false,
    },
    total_amount: {
      type: DataTypes.FLOAT,
      // allowNull: false,
    },
    transaction_status: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = Transaction;
