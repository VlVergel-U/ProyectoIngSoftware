import { Router } from "express";
import {
  getCustomer,
  getCustomers,
  createCustomers,
  updateCustomer
} from "../controllers/customer.controller.js";

const router = Router();

router.get("/viewCustomer", getCustomers);
router.post("/addCustomer", createCustomers);
router.put("/updateCustomer/id",updateCustomer);
router.delete("/deleteCustomer/id");
router.get("/viewCustomer/:id_customer",getCustomer);
router.get("/viewCustomer/document/:document", getCustomer)

export default router;
