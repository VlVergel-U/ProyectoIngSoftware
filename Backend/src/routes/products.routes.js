import{Router} from "express"
import { createProducts, getProducts, getProduct, updateProduct } from "../controllers/products.controller.js"

const router = Router()

router.get("/viewProduct", getProducts )
router.post("/addProduct", createProducts)
router.put("/updateProduct/:id", updateProduct)
router.delete("/products/:id")
router.get("/viewProduct/:id", getProduct)

export default router