import { Router } from "express";
import { celebrate, Segments } from "celebrate";
import {
  getAllCustomers,
  getCustomersById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customers.controller.js";
import authenticateToken from "../middleware/auth.js";
import checkRolePermission from "../middleware/roles.js";
import {
  customerSchema,
  updateCustomerSchema,
} from "../validation/validation.js";

const router = Router();

router.use(authenticateToken);

router
  .route("/")
  .get(checkRolePermission("customer", "read"), getAllCustomers)
  .post(
    checkRolePermission("customer", "create"),
    celebrate({ [Segments.BODY]: customerSchema }, { abortEarly: false }),
    createCustomer
  );

router
  .route("/:id")
  .get(checkRolePermission("customer", "read"), getCustomersById)
  .put(
    checkRolePermission("customer", "update"),
    celebrate({ [Segments.BODY]: updateCustomerSchema }, { abortEarly: false }),
    updateCustomer
  )
  .delete(checkRolePermission("customer", "delete"), deleteCustomer);

export default router;
