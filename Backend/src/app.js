import express from "express";
import productsRoutes from "./routes/products.routes.js"
import { createCategory, createAdmin } from "./libs/initialSetUp.js";

const server=express();
createCategory();
createAdmin();

server.use(express.json())

server.use(productsRoutes)

export default server;