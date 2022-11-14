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
    ("O inicio", "Aqui é a base de todas as trilhas, para você aprender mais sobre todos os caminhos da tecnologia.", 1),
    ("Conceitos básicos", "Bem vindo a trilha de desenvolvimento full stack! Aqui irá aprender mais sobre os conceitos base da programação e do desenvolvimento web.", 1),
    ("Opcional", "Esse módulo é designado a conteudos opcionais recomendados por nós!", 1),
    ("O inicio", "Aqui é a base de todas as trilhas, para você aprender mais sobre todos os caminhos da tecnologia.", 2),
    ("Fundamentos de UX (User Experience) ", "Bem vindo a trilha de UX/UI! Aqui irá aprender mais sobre os conceitos base da 'User Experience'.", 2),
    ("Fundamentos de UI (User Interface)", "Aqui irá aprender os conceitos base da 'User Interface'.", 2),
    ("Opcional", "Esse módulo é designado a conteudos opcionais recomendados por nós!", 2),
    ("O inicio", "Aqui é a base de todas as trilhas, para você aprender mais sobre todos os caminhos da tecnologia.", 3),
    ("Conceitos básicos", "Bem vindo a trilha de Quality Assurance! Aqui irá aprender mais sobre os conceitos base da programação e do QA.", 3),
    ("Opcional", "Esse módulo é designado a conteudos opcionais recomendados por nós!", 3)
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
