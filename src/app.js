import express from "express";
import trilhasController from "./controller/trilhas-controller.js";
import usersController from "./controller/users-controller.js";
import dbTrilhas from "./database/db-trilhas.js";
import dbUsers from "./database/db-users.js";

const app = express();

app.use(express.json());

trilhasController(app, dbTrilhas);
usersController(app, dbUsers);

export default app;
