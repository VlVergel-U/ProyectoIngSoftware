import{Router} from "express"
import { createProducts, getProducts } from "../controllers/products.controller.js"

const router = Router()

router.get("/products", createProducts)
router.post("/products", getProducts)
router.put("/products/:id")
router.delete("/products/:id")
router.get("/products/:id")

export default router