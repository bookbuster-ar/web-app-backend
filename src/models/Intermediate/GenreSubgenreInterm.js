const sequelize = require('../../config/database');
const { DataTypes } = require('sequelize');

const GenreSubgenreInterm = sequelize.define(
  'genre_subgenre_interm',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = GenreSubgenreInterm;
