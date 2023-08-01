const sequelize = require('../config/database');

const { DataTypes } = require('sequelize');

const Session = sequelize.define(
  'session',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    starting_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    last_connection: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    session_duration: {
      type: DataTypes.NUMBER,
    },
    session_status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    session_token: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false, freezeTableName: true }
);
