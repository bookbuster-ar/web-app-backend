const sequelize = require('../../config/database');

const { DataTypes } = require('sequelize');

const PaymentMethod = sequelize.define(
  'payment_method',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = PaymentMethod;
