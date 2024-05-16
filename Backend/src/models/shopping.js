import {DataTypes} from 'sequelize'
import{sequelize} from "../database/database.js"


export const shopping = sequelize.define("shopping",{
    id_shopping:{
        type:DataTypes.INTEGER,
        primaryKey:true,   
    },
    final_price:{
        type:DataTypes.STRING(40),
        allowNull: false
    },
    unit_price:{
        type:DataTypes.STRING(10),
        allowNull: false
    },
    date_shopping:{
        type:DataTypes.DATE,
        allowNull: false
    },
    payment_metod:{
        type:DataTypes.TEXT,
        allowNull: false
    }
},{
    timestamps: false,
})