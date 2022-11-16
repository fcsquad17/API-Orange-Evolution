import express from "express";
import cors from "cors";
import trilhasController from "./controller/trilhas-controller.js";
import usersController from "./controller/users-controller.js";
import contentController from "./controller/content-controller.js";
import modulesController from "./controller/modules-controller.js";
import * as dotenv from "dotenv";
import dbSq from "./database/db-sqlite.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

trilhasController(app, dbSq);
contentController(app, dbSq);
usersController(app, dbSq);
modulesController(app, dbSq);

export default app;
