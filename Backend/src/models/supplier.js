import {DataTypes} from 'sequelize'
import{sequelize} from "../database/database.js"

export const supplier = sequelize.define({
    NIT:{
        type:DataTypes.INTEGER
    },
    name:{
        type:DataTypes.STRING(10)
    },
    address:{
        type:DataTypes.STRING(20)
    },
    phone:{
        type:DataTypes.NUMBER(10)
    },
    Email:{
        type:DataTypes.STRING(20)    
    }
},{
    timestamps: false,
})