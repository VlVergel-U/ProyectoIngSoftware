import { Router } from "express";
import { getDetails, getDetail } from "../controllers/detail.controller.js";

const router = Router();

router.get("/viewDetails", getDetails)
router.post("/addDetail",)
router.put("/updateDetail/:id",)
router.delete("/deleteDetail/id",)
router.get("/viewDetail/:id", getDetail)

export default router;