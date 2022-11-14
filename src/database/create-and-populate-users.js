import sqlite3 from "sqlite3";
import { dirname } from "path";
import { fileURLToPath } from "url";
import UsersDAO from "../DAO/users-DAO.js";
import dbSq from "./db-sqlite.js";
const usersDAO = new UsersDAO(dbSq);
sqlite3.verbose();
const filePath = dirname(fileURLToPath(import.meta.url)) + "/database.db";
const db = new sqlite3.Database(filePath);

await usersDAO.activeForeignKeys();

const USUARIOS_SCHEMA = `
CREATE TABLE IF NOT EXISTS "USUARIOS" (
    "ID" INTEGER PRIMARY KEY AUTOINCREMENT,
    "NOME_COMPLETO" VARCHAR(100),
    "EMAIL" VARCHAR(100),
    "SENHA" VARCHAR(100),
    "ADMIN" TINYINT
  );`;

const ADD_USUARIOS_DATA = `
INSERT INTO "USUARIOS" (NOME_COMPLETO, EMAIL, SENHA, ADMIN)
VALUES 
    ('Carlos Alberto Albuquerque', 'carlos.alb12@gmail.com' , '@12345679', FALSE),
    ('Olívia Ribeiro Ferreira', 'olivia.rib1@outlook.com' , '@12345679', FALSE),
    ('admin', 'admin@admin.com' , 'admin', TRUE)
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
