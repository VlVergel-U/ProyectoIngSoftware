import { Router } from "express";
import {
  createShopping,
  getShoppings,
  getShopping
} from "../controllers/shopping.controller.js";

const router = Router();

router.get("/viewShopping",getShoppings);
router.post("/addShopping", createShopping);
router.put("/updateShopping/id");
router.delete("/deleteShopping/id");
router.get("/viewShopping/:id_shopping",getShopping);

export default router;
