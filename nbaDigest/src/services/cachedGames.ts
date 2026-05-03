import { db } from '../db/index';
import { CachedGame, DatabaseError } from '../types/index';

export function upsertCachedGames(games: CachedGame[]): void {
  if (games.length === 0) {
    return;
  }

  const upsertStmt = db.prepare(`
    INSERT INTO cached_games (_id, dateTime, externalId)
    VALUES (@_id, @dateTime, @externalId)
    ON CONFLICT(externalId) DO UPDATE SET
      dateTime = excluded.dateTime
  `);

  const transaction = db.transaction((rows: CachedGame[]) => {
    for (const row of rows) {
      upsertStmt.run(row);
    }
  });

  try {
    transaction(games);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    throw new DatabaseError(`Failed to upsert cached games: ${message}`);
  }
}

export function getCachedGamesInWindow(windowStart: Date, windowEnd: Date): CachedGame[] {
  try {
    const stmt = db.prepare(`
      SELECT _id, dateTime, externalId
      FROM cached_games
      WHERE dateTime <= ? AND dateTime > ?
      ORDER BY dateTime ASC
    `);

    return stmt.all(windowEnd.toISOString(), windowStart.toISOString()) as CachedGame[];
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    throw new DatabaseError(`Failed to query cached games: ${message}`);
  }
}

export function deleteCachedGamesBefore(cutoff: Date): number {
  try {
    const stmt = db.prepare(`
      DELETE FROM cached_games
      WHERE dateTime < ?
    `);

    const result = stmt.run(cutoff.toISOString());
    return result.changes;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    throw new DatabaseError(`Failed to delete cached games: ${message}`);
  }
}
