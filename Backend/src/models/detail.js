import {DataTypes} from 'sequelize'
import{sequelize} from "../database/database.js"


export const detail = sequelize.define("detail",{
    amount:{
        type:DataTypes.INTEGER
    },
    price:{
        type:DataTypes.INTEGER
    }
    

},{
    timestamps: false,
})

