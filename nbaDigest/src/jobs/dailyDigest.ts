import { fetchGamesForDate } from '../services/nba';
import { getActiveSubscribers } from '../services/subscribers';
import { sendDigestEmail } from '../services/email';
import { buildDigestHtml } from '../templates/digest.html';

function getYesterdayUtc(): Date {
  const now = new Date();
  return new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() - 1,
  ));
}

function toIsoDate(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export async function runDailyDigest(): Promise<void> {
  const digestDate = getYesterdayUtc();
  const dateStr = toIsoDate(digestDate);

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(digestDate);

  console.info(`[Job] Starting NBA Daily Digest for ${dateStr}`);

  try {
    const games = await fetchGamesForDate(dateStr);

    if (games.length === 0) {
      console.info(`[Job] No games found for ${dateStr}. Exiting.`);
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
