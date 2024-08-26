import { Router } from "express";
import { celebrate, Segments } from "celebrate";
import {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employees.controller.js";
import authenticateToken from "../middleware/auth.js";
import checkRolePermission from "../middleware/roles.js";
import {
  employeeSchema,
  updateEmployeeSchema,
} from "../validation/validation.js";

const router = Router();

router.use(authenticateToken);

router
  .route("/")
  .get(checkRolePermission("employee", "read"), getAllEmployees)
  .post(
    checkRolePermission("employee", "create"),
    celebrate({ [Segments.BODY]: employeeSchema }, { abortEarly: false }),
    createEmployee
  );

router
  .route("/:id")
  .get(checkRolePermission("employee", "read"), getEmployeeById)
  .put(
    checkRolePermission("employee", "update"),
    (req, res, next) => {
      console.log("Request Body:", req.body);
      next();
    },
    celebrate({ [Segments.BODY]: updateEmployeeSchema }, { abortEarly: false }),
    updateEmployee
  )
  .delete(checkRolePermission("employee", "delete"), deleteEmployee); // Only President can delete

export default router;
