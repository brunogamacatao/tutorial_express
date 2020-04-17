const sqlite3 = require('sqlite3');

const DB_URL = process.env.SQLITE_DATABASE_URL;
const CREATE_DATABASE_SCHEMA = `
  CREATE TABLE LIVRO (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    NOME TEXT, 
    AUTOR TEXT
  )
`;

let db = new sqlite3.Database(DB_URL, () => {
  console.log('Conectado ao SQLite');
  db.run(CREATE_DATABASE_SCHEMA, (err) => {});
});

module.exports = db;
