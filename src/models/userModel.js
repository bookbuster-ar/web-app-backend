const sequelize = require('./config/database');
const { DataTypes } = require('sequelize');

const user = sequelize.define('user', {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
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
    suscription:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    dateOfRegister:{
        type: DataTypes.DATE,
        allowNull: false
    }

});

module.exports = user;