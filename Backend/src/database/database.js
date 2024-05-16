import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('SoloCauchos', 'postgres', 'hola', {
    host: 'localhost',
    dialect: 'postgres'
});