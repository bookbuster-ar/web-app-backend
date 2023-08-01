const sequelize = require('./config/database');
const { DataTypes } = require('sequelize');

const userImage = sequelize.define('userImage', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    image:{
        type: DataTypes.BLOB,
    }

}) 

module.exports = userImage;