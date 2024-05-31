import express from "express";
import cors from "cors";

import productsRoutes from "./routes/products.routes.js";
import userRoutes from "./routes/user.routes.js";
import shoppingRoutes from "./routes/shopping.routes.js";
import detailRoutes from "./routes/detail.routes.js";
import customerRoutes from "./routes/customer.routes.js";

const server = express();

server.use(express.json());
server.use(
  cors({
    origin: "http://localhost:5173",
  })
);

server.use(productsRoutes);
server.use(userRoutes);
server.use(shoppingRoutes);
server.use(detailRoutes);
server.use(customerRoutes);



export default server;
