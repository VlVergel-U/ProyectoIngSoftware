import {DataTypes} from 'sequelize'
import{sequelize} from "../database/database.js"
import { shopping } from './shopping.js'

export const customer = sequelize.define("custmoer",{
    id_customer:{
        type:DataTypes.INTEGER,
        primaryKey:true
    },
    document:{
        type:DataTypes.STRING(10),
        unique: true,
        allowNull: false
    },
    name:{
        type:DataTypes.STRING(20),
        allowNull: false
    },
    last_name:{
        type:DataTypes.STRING(20),
        allowNull: false
    },
    addres:{
        type:DataTypes.STRING(50),
        allowNull: false
    },
    phone:{
        type:DataTypes.STRING(10),
        unique: true
    },
    email:{
        type:DataTypes.STRING(50),
        unique: true
    }
},{
    timestamps: false,
})
customer.hasMany(shopping,{
    foreignKey:"id_customer",
    sourceKey:"id_customer"
})