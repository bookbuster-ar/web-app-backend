const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    return sequelize.define(
        "rol",
        {
            id:{
                type:DataTypes.UUID,
                defaultValue:DataTypes.UUIDV4,
                primaryKey:true,
                allowwNull:false
            },
            name:{
                type:DataTypes.STRING,
                allowNull:false
            }
        }
    )

}