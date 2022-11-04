import sqlite3 from "sqlite3";
import { dirname } from "path";
import { fileURLToPath } from "url";
sqlite3.verbose();
const filePath = dirname(fileURLToPath(import.meta.url)) + "/database.db";
const db = new sqlite3.Database(filePath);

const CONTEUDOS_SCHEMA = `
CREATE TABLE IF NOT EXISTS "CONTEUDOS" (
    "ID" INTEGER PRIMARY KEY AUTOINCREMENT,
    "TITULO" TEXT,
    "TIPO" VARCHAR(40),
    "DURACAO" INTEGER,
    "FONTE" TEXT,
    "DESCRICAO" TEXT,
    "TAG" VARCHAR(30),
    "MODULO_ID" INTEGER,
    FOREIGN KEY ("MODULO_ID") REFERENCES "MODULOS"("ID")
  );`;

const ADD_CONTEUDOS_DATA = `
INSERT INTO "CONTEUDOS" (TITULO, TIPO, DURACAO, FONTE, DESCRICAO, TAG, MODULO_ID)
VALUES 
  ('Guia definitivo de como migrar para ux design em 5 passos', 'Artigo', '360', 'https://medium.com/orangejuicefc/guia-definitivo-de-como-migrar-para-ux-design-5-passos-para-virar-um-ux-1675f71796b4', 'a', 'migração', 1),
  ('Design Thinking e carreira: como migrei de Psicologia para UX Design', 'Artigo', '300', 'https://medium.com/orangejuicefc/design-thinking-e-carreira-como-migrei-de-psicologia-para-ux-design-cb79e8b47df5', 'a', 'migração', 1),
  ('De advogada a desenvolvedora: um relato sobre minha migração de carreira e dicas para quem pretende seguir o mesmo caminho', 'Artigo', '360', 'https://medium.com/orangejuicefc/de-advogada-a-desenvolvedora-um-relato-sobre-minha-migração-de-carreira-e-dicas-para-quem-pretende-45ad5df833b5', 'a', 'migração', 2),
  ('Dev Júnior', 'Artigo', '3.029', 'https://medium.com/orangejuicefc/de-advogada-a-desenvolvedora-um-relato-sobre-minha-migração-de-carreira-e-dicas-para-quem-pretende-45ad5df833b5', 'a', 'migração', 4),
  ('Dev Júnior', 'Artigo', '3.029', 'https://medium.com/orangejuicefc/de-advogada-a-desenvolvedora-um-relato-sobre-minha-migração-de-carreira-e-dicas-para-quem-pretende-45ad5df833b5', 'a', 'migração', 7)
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
