const sequelize = require('../../config/database');
const { DataTypes } = require('sequelize');

const SaleStock = sequelize.define(
  'sale_stock',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = SaleStock;
