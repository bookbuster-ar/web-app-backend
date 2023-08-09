const sequelize = require('../../config/database');

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
      type: DataTypes.DATE,
      // allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    last_connection: {
      type: DataTypes.DATE,
      // allowNull: false,
    },
    session_duration: {
      type: DataTypes.INTEGER,
    },
    session_status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    session_token: {
      type: DataTypes.TEXT,
    },
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = Session;
