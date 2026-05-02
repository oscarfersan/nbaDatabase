import { fetchGamesByExternalIds } from '../services/nba';
import { getActiveSubscribers } from '../services/subscribers';
import { getCachedGamesInWindow } from '../services/cachedGames';
import { sendDigestEmail } from '../services/email';
import { buildDigestHtml } from '../templates/digest.html';

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
