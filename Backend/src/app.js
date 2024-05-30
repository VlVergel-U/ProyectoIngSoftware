import express from "express";
import cors from "cors";
import productsRoutes from "./routes/products.routes.js";
import userRoutes from "./routes/user.routes.js";
import { createCategory, createAdmin } from "./libs/initialSetUp.js";

const server = express();

server.use(express.json());
server.use(
  cors({
    origin: "http://localhost:5173",
  })
);

server.use(productsRoutes);
server.use(userRoutes);

export default server;
