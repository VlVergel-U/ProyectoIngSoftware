import { Router } from "express";
import {
  getDetails,
  getDetail,
  getBilling,
} from "../controllers/detail.controller.js";

const router = Router();

router.get("/viewDetails", getDetails);
router.post("/addDetail");
router.put("/updateDetail/:id");
router.delete("/deleteDetail/id");
router.get("/viewDetail/:id", getDetail);
router.get("/billing/:shoppingIdShopping", getBilling);

export default router;
