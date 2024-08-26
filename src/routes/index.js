import { Router } from "express";
import users from "./users.js";
import employeesRoutes from "./employees.js";
import customersRoutes from "./customers.js";
import logRouters from "./logs.js";
import { loggingMiddleware } from "../middleware/loggingMiddleware.js";
import performanceMiddleware from "../middleware/performanceMiddleware.js";
import reportRoutes from "./report.js";

const apiRoute = Router();

apiRoute.use("/users", users);

apiRoute.use(loggingMiddleware);
apiRoute.use(performanceMiddleware);

apiRoute.use("/employees", employeesRoutes);
apiRoute.use("/customers", customersRoutes);
apiRoute.use("/logs", logRouters);

apiRoute.use("/report", reportRoutes);

export default apiRoute;
