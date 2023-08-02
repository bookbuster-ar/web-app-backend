const sequelize = require('../../config/database');
const { DataTypes } = require('sequelize');

const Book = sequelize.define(
  'book',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
<<<<<<< HEAD
      allowNull: false,
    },
=======
    }
>>>>>>> b88f9d414d669a4a178b96fe5175d49d673b881c
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = Book;
