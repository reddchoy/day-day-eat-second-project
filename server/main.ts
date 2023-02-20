import dotenv from "dotenv";
dotenv.config();

import express from "express";
import expressSession from "express-session";
import path from "path";
import { logger } from "./utils/logger";
import { isLoggedInStatic } from "./utils/guard";

import Knex from "knex";
import knexConfig from "./knexfile";
import fs from "fs";

//////////////////////////// setup ////////////////////////////
export const knex = Knex(knexConfig[process.env.NODE_ENV ?? "development"]);

const app = express();

app.use(express.json());

const uploadDir = "uploads";
fs.mkdirSync(uploadDir, { recursive: true });

app.use(
  expressSession({
    secret: Math.random().toString(32).slice(2),
    resave: true,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  logger.debug(`Path: ${req.path},,, Method: ${req.method}`);
  next();
});

declare module "express-session" {
  interface SessionData {
    user: {
      userId: number;
    };
  }
}

import { routes } from "./routes";
app.use(routes);

//////////////////////////// statics ////////////////////////////
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "images")));
app.use(express.static(path.join(__dirname, "uploads")));

app.use(isLoggedInStatic, express.static(path.join(__dirname, "private")));

// 404 Not Found
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "404.html"));
});

//////////////////////////// listening port ////////////////////////////
const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => logger.info(`App running on http://localhost:${PORT}`));
