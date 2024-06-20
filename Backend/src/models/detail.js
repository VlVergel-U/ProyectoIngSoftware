import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { products } from "./products.js";
import { shopping } from "./shopping.js";

export const detail = sequelize.define(
  "detail",
  {
    amount: {
      type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.DOUBLE(10, 2),
    },
  },
  {
    timestamps: false,
  }
);

products.belongsToMany(shopping, { through: detail });
shopping.belongsToMany(products, { through: detail });
