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
    ('Desenvolvimento Full-Stack', 'Se você chegou até aqui, é porque quer aprender mais sobre tecnologia, especialmente sobre Desenvolvimento Full Stack!

    O Orange Evolution consiste em trilhas totalmente gratuitas para que você possa iniciar a sua carreira na tecnologia. Você terá acesso a vídeos, lives, artigos, apostilas e até cursos gratuitos, além desses conteúdos serem da Orange Juice, de parceiros e empresas que confiamos. 
    
    Essa trilha foi montada pensando em quem está começando na área, ou passando por uma migração de carreira e ainda não sabe exatamente o que é esse mundo. Então, aperta o cinto e vem com a gente nessa jornada!'),
    ('UX Design', 'Se você chegou até aqui, é porque quer aprender mais sobre tecnologia, especialmente sobre UX/UI Design!

    O Orange Evolution consiste em trilhas totalmente gratuitas para que você possa iniciar a sua carreira na tecnologia. Você terá acesso a vídeos, lives, artigos, apostilas e até cursos gratuitos, além desses conteúdos serem da Orange Juice, de parceiros e empresas que confiamos. 
    
    Essa trilha foi montada pensando em quem está começando na área, ou passando por uma migração de carreira e ainda não sabe exatamente o que é esse mundo. Então, aperta o cinto e vem com a gente nessa jornada!'),
    ('Quality Assurance', 'Se você chegou até aqui, é porque quer aprender mais sobre tecnologia, especialmente sobre QA!

    O Orange Evolution consiste em trilhas totalmente gratuitas para que você possa iniciar a sua carreira na tecnologia. Você terá acesso a vídeos, lives, artigos, apostilas e até cursos gratuitos, além desses conteúdos serem da Orange Juice, de parceiros e empresas que confiamos. 
    
    Essa trilha foi montada pensando em quem está começando na área, ou passando por uma migração de carreira e ainda não sabe exatamente o que é esse mundo. Então, aperta o cinto e vem com a gente nessa jornada!')
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
