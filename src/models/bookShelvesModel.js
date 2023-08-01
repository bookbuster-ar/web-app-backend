const sequelize = require('./config/database');
const { DataTypes } = require('sequelize');

const bookShelves = sequelize.define('bookShelve', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    }
})

module.exports = bookShelves;