import express from "express";
import productsRoutes from "./routes/products.routes.js"
import { createCategory } from "./libs/initialSetUp.js";

const server=express();
createCategory();

server.use(express.json())

server.use(productsRoutes)

export default server;