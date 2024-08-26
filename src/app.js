import express from "express";
import cors from "cors";
import swaggerSetup from "./swagger.js";
import pkg from "body-parser";
import apiRoute from "./routes/index.js";
import { errors } from "celebrate";

import connectDB from "./mongodb.js";

import "./config/config.js";
import customErrorHandler from "./utils/customErrorHandler.js";
import { errorLoggingMiddleware } from "./middleware/loggingMiddleware.js";

connectDB();

const { json } = pkg;

const app = express();

app.use(cors());

app.use(json());

app.use("/api", apiRoute);

swaggerSetup(app);

app.use(customErrorHandler);
app.use(errorLoggingMiddleware);

app.use(errors());

export default app;
