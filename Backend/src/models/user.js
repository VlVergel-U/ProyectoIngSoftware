import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const user = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_name: {
      type: DataTypes.STRING(),
      unique: true,
    },
    poswarrd: {
      type: DataTypes.STRING(),
      unique: true,
    },
  },
  {
    timestamps: false,
  }
);
