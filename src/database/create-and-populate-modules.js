import sqlite3 from "sqlite3";
import { dirname } from "path";
import { fileURLToPath } from "url";
sqlite3.verbose();
const filePath = dirname(fileURLToPath(import.meta.url)) + "/database.db";
const db = new sqlite3.Database(filePath);

const MODULOS_SCHEMA = `
CREATE TABLE IF NOT EXISTS "MODULOS" (
    "ID" INTEGER PRIMARY KEY AUTOINCREMENT,
    "TITULO" VARCHAR(100),
    "DESCRICAO" TEXT,
    "TRILHA_ID" NOT NULL,
    FOREIGN KEY ("TRILHA_ID") REFERENCES "TRILHAS"("ID")

  );`;

const ADD_MODULOS_DATA = `
INSERT INTO "MODULOS" (TITULO, DESCRICAO, TRILHA_ID)
VALUES 
    ("O inicio", "a", 1),
    ("Conceitos básicos", "a", 1),
    ("Opcional", "a", 1),
    ("O inicio", "a", 2),
    ("Conceitos básicos", "a", 2),
    ("Opcional", "a", 2),
    ("O inicio", "a", 3),
    ("Conceitos básicos", "a", 3),
    ("Opcional", "a", 3)
`;

function criaTabelaMdl() {
  db.run(MODULOS_SCHEMA, (error) => {
    if (error) console.log("Erro ao criar tabela de modulos");
  });
}

function populaTabelaMdl() {
  db.run(ADD_MODULOS_DATA, (error) => {
    if (error) console.log("Erro ao popular tabela de modulos");
  });
}

db.serialize(() => {
  criaTabelaMdl();
  populaTabelaMdl();
});
