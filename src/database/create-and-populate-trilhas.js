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
    ('Desenvolvimento Full-Stack', 'Essa trilha foi montada pensando em quem está começando na área, ou passando por uma migração de carreira e ainda não sabe exatamente o que é esse mundo. Então, aperta o cinto e vem com a gente nessa jornada!'),
    ('UX/UI Design', 'Essa trilha foi montada pensando em quem está começando na área, ou passando por uma migração de carreira e ainda não sabe exatamente o que é esse mundo. Então, aperta o cinto e vem com a gente nessa jornada!'),
    ('Quality Assurance', 'Essa trilha foi montada pensando em quem está começando na área, ou passando por uma migração de carreira e ainda não sabe exatamente o que é esse mundo. Então, aperta o cinto e vem com a gente nessa jornada!')
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
