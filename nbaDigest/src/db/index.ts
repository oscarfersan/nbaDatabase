import Database from 'better-sqlite3';
import path from 'path';
import { DatabaseError } from '../types';

// Points to nbaDatabase/database.sqlite (root of the monorepo)
const dbPath = path.join(__dirname, '../../../database.sqlite');

let db: Database.Database;

try {
  db = new Database(dbPath);
  
  db.pragma('journal_mode = WAL');
  
  // Initial migration
  db.exec(`
    CREATE TABLE IF NOT EXISTS subscribers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      status TEXT NOT NULL DEFAULT 'active',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

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
