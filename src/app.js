import express from "express";
import trilhasController from "./controller/trilhas-controller.js";
import dbTrilhas from "./database/db-trilhas.js";

const app = express();

app.use(express.json());

trilhasController(app, dbTrilhas);

export default app;
