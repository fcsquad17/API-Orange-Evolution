import sqlite3 from "sqlite3";
import { dirname } from "path";
import { fileURLToPath } from "url";
sqlite3.verbose();
const filePath = dirname(fileURLToPath(import.meta.url)) + "/database.db";
const db = new sqlite3.Database(filePath);

const USUARIO_CONTEUDO_SCHEMA = `
CREATE TABLE IF NOT EXISTS "USUARIO_CONTEUDO" (
    "ID" INTEGER PRIMARY KEY AUTOINCREMENT,
    "USUARIO_ID" INTEGER NOT NULL,
    "CONTEUDO_ID" INTEGER NOT NULL,
    "DONE" TINYINT,
    FOREIGN KEY ("USUARIO_ID") REFERENCES "USUARIOS"("ID"),
    FOREIGN KEY ("CONTEUDO_ID") REFERENCES "CONTEUDOS"("ID")
  );`;

const ADD_USUARIO_CONTEUDO_DATA = `
INSERT INTO "USUARIO_CONTEUDO" (USUARIO_ID, CONTEUDO_ID, DONE)
VALUES 
    (1, 1, FALSE),
    (1, 2, FALSE),
    (1, 3, FALSE),
    (2, 1, TRUE),
    (2, 4, FALSE),
    (2, 1, TRUE),
    (2, 2, TRUE),
    (2, 3, TRUE)
`;

function criaTabelaUsrCtd() {
  db.run(USUARIO_CONTEUDO_SCHEMA, (error) => {
    if (error) console.log("Erro ao criar tabela de usuario conteudo");
  });
}

function populaTabelaUsrCtd() {
  db.run(ADD_USUARIO_CONTEUDO_DATA, (error) => {
    if (error) console.log("Erro ao popular tabela de usuario conteudo");
  });
}

db.serialize(() => {
  criaTabelaUsrCtd();
  populaTabelaUsrCtd();
});
