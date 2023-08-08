const sequelize = require('../../config/database');
const { DataTypes } = require('sequelize');


const BookSubgenre = sequelize.define(
    'book_subgenre',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
);

module.exports = BookSubgenre;