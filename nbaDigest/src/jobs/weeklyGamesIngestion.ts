import { v7 as uuidv7 } from 'uuid';
import { fetchGamesForDates } from '../services/nba';
import { deleteCachedGamesBefore, upsertCachedGames } from '../services/cachedGames';
import { CachedGame } from '../types/index';

function toIsoDate(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getCurrentWeekDatesUtc(): string[] {
  const now = new Date();
  const currentDay = now.getUTCDay();
  const daysFromMonday = (currentDay + 6) % 7;

  const monday = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() - daysFromMonday,
    0,
    0,
    0,
    0
  ));

  const dates: string[] = [];
  for (let i = 0; i < 7; i++) {
    const current = new Date(monday);
    current.setUTCDate(monday.getUTCDate() + i);
    dates.push(toIsoDate(current));
  }

  return dates;
}

function mapToCachedGames(rawGames: { id: number; datetime: string }[]): CachedGame[] {
  return rawGames.map(game => ({
    _id: uuidv7(),
    dateTime: new Date(game.datetime).toISOString(),
    externalId: String(game.id),
  }));
}

function resolveCachedGamesTtlDays(): number {
  const rawTtl = process.env.CACHED_GAMES_TTL_DAYS;
  if (!rawTtl) {
    return 30;
  }

  const parsed = Number.parseInt(rawTtl, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    console.warn(
      `[Weekly Job] Invalid CACHED_GAMES_TTL_DAYS value "${rawTtl}", falling back to 30 days.`
    );
    return 30;
  }

  return parsed;
}

export async function runWeeklyGamesIngestion(): Promise<void> {
  const weekDates = getCurrentWeekDatesUtc();
  const weekStart = `${weekDates[0]}T00:00:00.000Z`;
  const weekEnd = `${weekDates[weekDates.length - 1]}T23:59:59.999Z`;

  console.info(`[Weekly Job] Starting NBA weekly ingestion for ${weekStart} -> ${weekEnd}`);

  try {
    const ttlDays = resolveCachedGamesTtlDays();
    const cutoff = new Date(Date.now() - (ttlDays * 24 * 60 * 60 * 1000));
    const deletedCount = deleteCachedGamesBefore(cutoff);
    if (deletedCount > 0) {
      console.info(
        `[Weekly Job] Deleted ${deletedCount} cached games older than ${ttlDays} days.`
      );
    }

    const games = await fetchGamesForDates(weekDates);

    if (games.length === 0) {
      console.info(`[Weekly Job] No games returned for current week. Exiting.`);
      return;
    }

    const cachedGames = mapToCachedGames(games);
    upsertCachedGames(cachedGames);
    console.info(`[Weekly Job] Upserted ${cachedGames.length} games into cache.`);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[Weekly Job Error] Failed to ingest weekly games:`, message);
  }
}
