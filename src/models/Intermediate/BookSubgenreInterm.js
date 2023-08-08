const sequelize = require('../../config/database');
const { DataTypes } = require('sequelize');

const BookSubgenreInterm = sequelize.define(
    'book_subgenre_interm',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
    }
);

module.exports = BookSubgenreInterm;