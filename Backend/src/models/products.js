import {DataTypes} from 'sequelize'
import{sequelize} from "../database/database.js"
import { detail } from './detail.js'

export const products = sequelize.define("products",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    name:{
        type:DataTypes.STRING(40),
    },
    shopping_price:{
        type:DataTypes.BOOLEAN(10,2),
    },
    sale_price:{
        type:DataTypes.BOOLEAN(10,2),
    },
    stock:{
        type:DataTypes.INTEGER(10),
    },
    trademark:{
        type:DataTypes.STRING(20),
    },
    
},
{
    timestamps: false,
},)

detail.belongsTo(products,{
    foreignKey:"porducts_id",
    targetId:"id"
})