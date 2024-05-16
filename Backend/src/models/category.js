import {DataTypes} from 'sequelize'
import{sequelize} from "../database/database.js"
import { products } from './products.js'

export const category = sequelize.define("category",{
    id_Category:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true,
    },
    Trademark:{
        type:DataTypes.STRING(20),
        unique: true
    }
},{
    timestamps: false,
})

category.hasMany(products,{
    foreignKey:"category_Type",
    sourceKey:"id_Category"
})
products.belongsTo(category,{
    foreignKey:"category_Type",
    targetId:"id_Category"
})
