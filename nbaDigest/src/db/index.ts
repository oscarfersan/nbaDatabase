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
} catch (error: any) {
  throw new DatabaseError(`Failed to initialize database: ${error.message}`);
}

export { db };
