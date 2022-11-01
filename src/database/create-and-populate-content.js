import sqlite3 from "sqlite3";
import { dirname } from "path";
import { fileURLToPath } from "url";
sqlite3.verbose();
const filePath =
  dirname(fileURLToPath(import.meta.url)) + "/database-content.db";
const db = new sqlite3.Database(filePath);

const CONTEUDOS_SCHEMA = `
CREATE TABLE IF NOT EXISTS "CONTEUDOS" (
    "ID" INTEGER PRIMARY KEY AUTOINCREMENT,
    "TITULO" VARCHAR(100),
    "TIPO" VARCHAR(40),
    "DURACAO" TEXT,
    "FONTE" VARCHAR(200),
    "DESCRICAO" VARCHAR(200),
    "ANOTACOES" TEXT,
    "TAG" TEXT,
    "ID_TRILHAS" INTEGER,
    FOREIGN KEY (ID_TRILHAS) REFERENCES TRILHAS(ID_TRILHA)

  );`;

const ADD_CONTEUDOS_DATA = `
INSERT INTO "CONTEUDOS" (TITULO, TIPO, DURACAO, FONTE, DESCRICAO, ANOTACOES, TAG, ID_TRILHAS)
VALUES 
  ('Guia definitivo de como migrar para ux design em 5 passos', 'Artigo', '6 minutos', 'https://medium.com/orangejuicefc/guia-definitivo-de-como-migrar-para-ux-design-5-passos-para-virar-um-ux-1675f71796b4', 'a', 'a', 'migração', 1),
  ('Design Thinking e carreira: como migrei de Psicologia para UX Design', 'Artigo', '5 minutos', 'https://medium.com/orangejuicefc/design-thinking-e-carreira-como-migrei-de-psicologia-para-ux-design-cb79e8b47df5', 'a', 'a', 'migração', 1)
`;

function criaTabelaCtd() {
  db.run(CONTEUDOS_SCHEMA, (error) => {
    if (error) console.log("Erro ao criar tabela de conteudos");
  });
}

function populaTabelaCtd() {
  db.run(ADD_CONTEUDOS_DATA, (error) => {
    if (error) console.log("Erro ao popular tabela de conteudos");
  });
}

db.serialize(() => {
  criaTabelaCtd();
  populaTabelaCtd();
});
