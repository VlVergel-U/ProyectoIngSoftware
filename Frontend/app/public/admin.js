import express from "express";
import productController from "../controllers/product.controller.js";

const router = express.Router();

// Rutas para la gestión de productos
router.get('/products', productController.getAllProducts);
router.post('/products', productController.createProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);
export default router;
