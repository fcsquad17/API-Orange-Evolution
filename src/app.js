import express from "express";
import trilhasController from "./controller/trilhas-controller.js";
import usersController from "./controller/users-controller.js";
import UsersDAO from "./DAO/users-DAO.js";
import db from "./database/db-sqlite.js";

const app = express();

app.use(express.json());

const queryTest = async (db) => {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT USUARIOS.NOME_COMPLETO, USUARIO_CONTEUDO.DONE, CONTEUDOS.TITULO FROM USUARIOS INNER JOIN USUARIO_CONTEUDO ON USUARIOS.ID = USUARIO_CONTEUDO.USUARIO_ID INNER JOIN CONTEUDOS ON USUARIO_CONTEUDO.CONTEUDO_ID = CONTEUDOS.ID WHERE USUARIO_CONTEUDO.DONE = 0 AND USUARIO_CONTEUDO.USUARIO_ID = 1 ORDER BY USUARIO_CONTEUDO.DONE;",
      (error, rows) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            conteudos: rows,
            error: false,
          });
        }
      }
    );
  });
};

console.log(await queryTest(db));

trilhasController(app, db);
usersController(app, db);

export default app;
