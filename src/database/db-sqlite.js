import sqlite3 from "sqlite3";
import { dirname } from "path";
import { fileURLToPath } from "url";
sqlite3.verbose();
const filePath = dirname(fileURLToPath(import.meta.url)) + "/database.db";
const dbSq = new sqlite3.Database(filePath);

process.on("SIGINT", () =>
  dbSq.close(() => {
    console.log("BD encerrado!");
    process.exit(0);
  })
);

export default dbSq;
