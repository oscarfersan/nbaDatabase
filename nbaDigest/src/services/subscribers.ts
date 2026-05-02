import { db } from '../db/index';
import { Subscriber, DatabaseError } from '../types/index';

export function getActiveSubscribers(): Subscriber[] {
  try {
    const stmt = db.prepare(`SELECT * FROM subscribers WHERE status = 'active'`);
    return stmt.all() as Subscriber[];
  } catch (error: any) {
    throw new DatabaseError(`Failed to get active subscribers: ${error.message}`);
  }
}

export function addSubscriber(email: string): void {
  try {
    const stmt = db.prepare(`INSERT INTO subscribers (email) VALUES (?)`);
    stmt.run(email);
  } catch (error: any) {
    // Handle unique constraint if email already exists
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      const updateStmt = db.prepare(`UPDATE subscribers SET status = 'active' WHERE email = ?`);
      updateStmt.run(email);
      return;
    }
    throw new DatabaseError(`Failed to add subscriber: ${error.message}`);
  }
}

export function unsubscribe(email: string): void {
  try {
    const stmt = db.prepare(`UPDATE subscribers SET status = 'unsubscribed' WHERE email = ?`);
    stmt.run(email);
  } catch (error: any) {
    throw new DatabaseError(`Failed to unsubscribe: ${error.message}`);
  }
}
