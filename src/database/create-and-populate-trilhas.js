import sqlite3 from "sqlite3";
import { dirname } from "path";
import { fileURLToPath } from "url";
sqlite3.verbose();
const filePath = dirname(fileURLToPath(import.meta.url)) + "/database.db";
const db = new sqlite3.Database(filePath);

const TRILHAS_SCHEMA = `
CREATE TABLE IF NOT EXISTS "TRILHAS" (
    "ID" INTEGER PRIMARY KEY AUTOINCREMENT,
    "TITULO" VARCHAR(50),
    "DESCRICAO" TEXT
  );`;

const ADD_TRILHAS_DATA = `
INSERT INTO "TRILHAS" (TITULO, DESCRICAO)
VALUES 
    ('Desenvolvimento Full-Stack', ''),
    ('UX Design', ''),
    ('Quality Assurance', '')
`;

function criaTabelaTri() {
  db.run(TRILHAS_SCHEMA, (error) => {
    if (error) console.log("Erro ao criar tabela de trilhas");
  });
}

function populaTabelaTri() {
  db.run(ADD_TRILHAS_DATA, (error) => {
    if (error) console.log("Erro ao popular tabela de trilhas");
  });
}

db.serialize(() => {
  criaTabelaTri();
  populaTabelaTri();
});
