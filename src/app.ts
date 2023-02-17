import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import AppError from "./utils/AppError";
import { errorHandler } from "./middlewares/error.handler";

export const initializeApp = () => {
  const app: Application = express();

  app.use(cookieParser());

  app.use(express.json({ limit: "50mb" }));

  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  app.use(morgan("tiny"));

  app.use(cors());

  app.use(helmet());

  app.get("/", (req, res) => {
    return res.status(200).json({
      name: "Testing Docker Container...",
      version: "v1.0,0",
    });
  });

  app.use((req, res, next) => {
    next(
      new AppError(
        "url_not_found",
        `The url ${req.originalUrl} does not exist!`,
        404
      )
    );
  });

  app.use(errorHandler);

  return app;
};
