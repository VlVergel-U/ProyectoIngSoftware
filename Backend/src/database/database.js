import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('SoloCauchos', 'postgres', 'admin', {
    host: 'localhost',
    dialect: 'postgres'
});