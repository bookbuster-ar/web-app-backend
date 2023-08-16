const sequelize = require('../../config/database');
const { DataTypes } = require('sequelize');

const PublishedBookPrice = sequelize.define('published_book_price', {

    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    price:{
        type: DataTypes.FLOAT,
        //allowNull: false
    }

    
},{timestamps: false, freezeTableName: true});

module.exports = PublishedBookPrice;