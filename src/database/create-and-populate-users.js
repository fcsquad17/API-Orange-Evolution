import sqlite3 from "sqlite3";
import { dirname } from "path";
import { fileURLToPath } from "url";
sqlite3.verbose();
const filePath = dirname(fileURLToPath(import.meta.url)) + "/database-users.db";
const db = new sqlite3.Database(filePath);

const USUARIOS_SCHEMA = `
CREATE TABLE IF NOT EXISTS "USUARIOS" (
    "ID" INTEGER PRIMARY KEY AUTOINCREMENT,
    "NOME_COMPLETO" VARCHAR(100),
    "EMAIL" VARCHAR(100),
    "SENHA" VARCHAR(100),
    "ID_TRILHAS" INTEGER,
    FOREIGN KEY (ID_TRILHAS) REFERENCES TRILHAS(ID_TRILHA)
  );`;

const ADD_USUARIOS_DATA = `
INSERT INTO "USUARIOS" (NOME_COMPLETO, EMAIL, SENHA, ID_TRILHAS)
VALUES 
    ('Carlos Alberto Albuquerque', 'carlos.alb12@gmail.com' , '@12345679', 1),
    ('Olívia Ribeiro Ferreira', 'olivia.rib1@outlook.com' , '@12345679', 2),
    ('Luiz Rodrigo Lima Mendes', 'luiz.rodrigo223@gmail.com' , '@12345679', 3)
`;

function criaTabelaUsr() {
  db.run(USUARIOS_SCHEMA, (error) => {
    if (error) console.log("Erro ao criar tabela de usuários");
  });
}

function populaTabelaUsr() {
  db.run(ADD_USUARIOS_DATA, (error) => {
    if (error) console.log("Erro ao popular tabela de usuários");
  });
}

db.serialize(() => {
  criaTabelaUsr();
  populaTabelaUsr();
});