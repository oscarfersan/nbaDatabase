import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { v7 as uuidv7 } from 'uuid';
import { DatabaseError } from '../types';

const envDbPath = process.env.SQLITE_PATH?.trim();
const defaultDbPath = path.join(__dirname, '../../../database.sqlite');
const resolvedDbPath = envDbPath
  ? (path.isAbsolute(envDbPath) ? envDbPath : path.join(process.cwd(), envDbPath))
  : defaultDbPath;

const dbPath = resolvedDbPath;
const dbDir = path.dirname(dbPath);

let db: Database.Database;

try {
  fs.mkdirSync(dbDir, { recursive: true });
  db = new Database(dbPath);
  
  db.pragma('journal_mode = WAL');
  
  const subscribersSchemaSql = `
    CREATE TABLE IF NOT EXISTS subscribers (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      status TEXT NOT NULL DEFAULT 'active',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `;

  const subscribersTable = db
    .prepare(`SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'subscribers'`)
    .get() as { name?: string } | undefined;

  if (!subscribersTable) {
    db.exec(subscribersSchemaSql);
  } else {
    const tableInfo = db.prepare(`PRAGMA table_info(subscribers)`).all() as Array<{
      name: string;
      type: string;
    }>;
    const idColumn = tableInfo.find(column => column.name === 'id');
    const idType = idColumn?.type?.toUpperCase() ?? '';

    if (idType !== 'TEXT') {
      db.exec(`ALTER TABLE subscribers RENAME TO subscribers_legacy;`);
      db.exec(subscribersSchemaSql);

      const legacyRows = db
        .prepare(`SELECT email, status, created_at FROM subscribers_legacy`)
        .all() as Array<{ email: string; status: string; created_at: string }>;

      const insertStmt = db.prepare(
        `INSERT INTO subscribers (id, email, status, created_at) VALUES (?, ?, ?, ?)`
      );

      db.transaction(() => {
        for (const row of legacyRows) {
          insertStmt.run(uuidv7(), row.email, row.status, row.created_at);
        }
      })();

      db.exec(`DROP TABLE subscribers_legacy;`);
    }
  }

  db.exec(`
    CREATE TABLE IF NOT EXISTS cached_games (
      _id TEXT PRIMARY KEY,
      dateTime TEXT NOT NULL,
      externalId TEXT NOT NULL UNIQUE
    );
  `);

  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_cached_games_dateTime
    ON cached_games(dateTime);
  `);
} catch (error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  throw new DatabaseError(`Failed to initialize database: ${message}`);
}

export { db };
