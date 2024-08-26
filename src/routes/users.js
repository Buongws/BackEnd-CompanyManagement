import { Router } from "express";
import { celebrate, Segments } from "celebrate";
import { register, login } from "../controllers/users.controller.js";

import { registerSchema, loginSchema } from "../validation/validation.js";

const router = Router();

router.post(
  "/register",
  celebrate({ [Segments.BODY]: registerSchema }),
  register
);

router.post("/login", celebrate({ [Segments.BODY]: loginSchema }), login);

export default router;
