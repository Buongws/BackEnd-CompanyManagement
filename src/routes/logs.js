// routes/logRoutes.js
import express from "express";
import authenticateToken from "../middleware/auth.js";
import { changeLogLevel, fetchLogs } from "../controllers/logs.controller.js";

const router = express.Router();

router.use(authenticateToken);

router.get("/", fetchLogs);
router.put("/:id/level", changeLogLevel);

export default router;
