const Database = require('better-sqlite3');

const db = new Database('database.db');

const query = `
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title STRING NOT NULL,
        completed INTEGER DEFAULT 0
    )
`

db.prepare(query).run();

export default db;