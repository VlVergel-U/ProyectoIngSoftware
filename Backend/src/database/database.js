import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('SoloCauchos', 'postgres', '1234', {
    host: 'localhost',
    dialect: 'postgres'
});