const sequelize = require('./config/database');
const {DataTypes} = require('sequelize');

const inactiveUser =  sequelize.define('blockUser',{
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        }
    })
    
module.exports = inactiveUser;
