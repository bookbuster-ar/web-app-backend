const sequelize = require('../../config/database');
const { DataTypes } = require('sequelize');

const User = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    suscription: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    date_of_register: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    is_blocked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    credit: {
      type: DataTypes.FLOAT,
<<<<<<< HEAD
      allowNull: false,
    },
    is_inactive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
=======
      allowNull: false
    },
    is_inactive:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
>>>>>>> b88f9d414d669a4a178b96fe5175d49d673b881c
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = User;
