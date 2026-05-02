import { v7 as uuidv7 } from 'uuid';
import { db } from '../db/index';
import { Subscriber, DatabaseError } from '../types/index';

function isSqliteUniqueConstraint(error: unknown): boolean {
  if (typeof error !== 'object' || error === null) {
    return false;
  }

  const candidate = error as { code?: string };
  return candidate.code === 'SQLITE_CONSTRAINT_UNIQUE';
}

export function getAllSubscribers(): Subscriber[] {
  try {
    const stmt = db.prepare(`SELECT * FROM subscribers ORDER BY created_at DESC`);
    return stmt.all() as Subscriber[];
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    throw new DatabaseError(`Failed to get subscribers: ${message}`);
  }
}

export function getActiveSubscribers(): Subscriber[] {
  try {
    const stmt = db.prepare(`SELECT * FROM subscribers WHERE status = 'active'`);
    return stmt.all() as Subscriber[];
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    throw new DatabaseError(`Failed to get active subscribers: ${message}`);
  }
}

function getSubscriberByEmail(email: string): Subscriber | null {
  const stmt = db.prepare(`SELECT * FROM subscribers WHERE email = ?`);
  const row = stmt.get(email);
  return (row ?? null) as Subscriber | null;
}

export function addSubscriber(email: string): Subscriber {
  const subscriberId = uuidv7();
  try {
    const stmt = db.prepare(`INSERT INTO subscribers (id, email) VALUES (?, ?)`);
    stmt.run(subscriberId, email);

    const created = getSubscriberByEmail(email);
    if (!created) {
      throw new DatabaseError(`Subscriber created but not found: ${email}`);
    }

    return created;
  } catch (error: unknown) {
    if (isSqliteUniqueConstraint(error)) {
      const updateStmt = db.prepare(`UPDATE subscribers SET status = 'active' WHERE email = ?`);
      updateStmt.run(email);

      const existing = getSubscriberByEmail(email);
      if (!existing) {
        throw new DatabaseError(`Subscriber reactivated but not found: ${email}`);
      }

      return existing;
    }

    const message = error instanceof Error ? error.message : String(error);
    throw new DatabaseError(`Failed to add subscriber: ${message}`);
  }
}

export function unsubscribe(email: string): void {
  try {
    const stmt = db.prepare(`UPDATE subscribers SET status = 'unsubscribed' WHERE email = ?`);
    stmt.run(email);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    throw new DatabaseError(`Failed to unsubscribe: ${message}`);
  }
}
