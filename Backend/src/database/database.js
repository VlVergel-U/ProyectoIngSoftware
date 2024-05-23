import { Sequelize } from "sequelize";
import 'dotenv/config'

const passwordDataBase = process.env.passwordDataBase;

export const sequelize = new Sequelize('SoloCauchos', 'postgres', passwordDataBase, {
    host: 'localhost',
    dialect: 'postgres'
});