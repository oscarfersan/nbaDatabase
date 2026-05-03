import { fetchGamesByExternalIds } from '../services/nba';
import { getActiveSubscribers } from '../services/subscribers';
import { deleteCachedGamesBefore, getCachedGamesInWindow } from '../services/cachedGames';
import { sendDigestEmail } from '../services/email';
import { buildDigestHtml } from '../templates/digest.html';

function resolveCachedGamesTtlDays(): number {
  const rawTtl = process.env.CACHED_GAMES_TTL_DAYS;
  if (!rawTtl) {
    return 30;
  }

  const parsed = Number.parseInt(rawTtl, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    console.warn(
      `[Job] Invalid CACHED_GAMES_TTL_DAYS value "${rawTtl}", falling back to 30 days.`
    );
    return 30;
  }

  return parsed;
}

export async function runDailyDigest(): Promise<void> {
  const now = new Date();
  const windowStart = new Date(now.getTime() - (24 * 60 * 60 * 1000));
  const windowEnd = now;
  const digestReferenceDate = windowStart;

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(digestReferenceDate);

  console.info(
    `[Job] Starting NBA Daily Digest for window ${windowStart.toISOString()} -> ${windowEnd.toISOString()}`
  );

  try {
    const ttlDays = resolveCachedGamesTtlDays();
    const cutoff = new Date(now.getTime() - (ttlDays * 24 * 60 * 60 * 1000));
    const deletedCount = deleteCachedGamesBefore(cutoff);
    if (deletedCount > 0) {
      console.info(`[Job] Deleted ${deletedCount} cached games older than ${ttlDays} days.`);
    }

    const cachedGames = getCachedGamesInWindow(windowStart, windowEnd);

    if (cachedGames.length === 0) {
      console.info(
        `[Job] No cached games found in the window ${windowStart.toISOString()} -> ${windowEnd.toISOString()}. Exiting.`
      );
      return;
    }

    const externalIds = cachedGames.map(game => game.externalId);
    const games = await fetchGamesByExternalIds(externalIds);
    if (games.length === 0) {
      console.info(`[Job] Cached games exist but API returned no details. Exiting.`);
      return;
    }

    console.info(`[Job] Found ${games.length} games. Building email...`);
    const htmlContent = buildDigestHtml(games);
  
    const subscribers = getActiveSubscribers();
    if (subscribers.length === 0) {
      console.info(`[Job] No active subscribers found. Exiting.`);
      return;
    }

    console.info(`[Job] Sending digest to ${subscribers.length} active subscribers...`);

    let sentCount = 0;
    for (const sub of subscribers) {
      await sendDigestEmail(sub, htmlContent, formattedDate);
      sentCount++;
    }

    console.info(`[Job] Completed. Sent ${sentCount} emails.`);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[Job Error] Failed to run daily digest:`, message);
  }
}
