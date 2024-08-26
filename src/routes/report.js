import { Router } from "express";
import {
  getSalesInfo,
  getNewCustomers,
} from "../controllers/report.controller.js";

const router = Router();

// Route for getting sales information
router.get("/sales", getSalesInfo);

// Route for getting information about new customers
router.get("/new-customers", getNewCustomers);

export default router;
