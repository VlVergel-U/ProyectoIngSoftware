import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('SoloCuchos', 'postgres', 'hola', {
    host: 'localhost',
    dialect: 'postgres'
});