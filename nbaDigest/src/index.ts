import * as dotenv from 'dotenv';
// Load environment variables early
dotenv.config();

import cron from 'node-cron';
import { runDailyDigest } from './jobs/dailyDigest';
import { runWeeklyGamesIngestion } from './jobs/weeklyGamesIngestion';

const cronSchedule = process.env.CRON_SCHEDULE || '0 6 * * *';
const timezone = process.env.TZ || 'UTC';
const weeklyGamesCronSchedule = process.env.WEEKLY_GAMES_CRON_SCHEDULE || '0 0 * * 0';

console.info(`[Process] Starting NBA Daily Digest Process...`);
console.info(`[Process] Configured with CRON: "${cronSchedule}" and TZ: "${timezone}"`);
console.info(`[Process] Configured WEEKLY_GAMES_CRON_SCHEDULE: "${weeklyGamesCronSchedule}" (UTC)`);

// Daily digest schedule
cron.schedule(cronSchedule, () => {
  console.info(`[Cron] Triggered digest job at ${new Date().toISOString()}`);
  runDailyDigest().catch(error => {
    console.error(`[Process] Unhandled error during cron job:`, error);
  });
}, {
  timezone: timezone,
});

// Weekly cache ingestion schedule (always UTC)
cron.schedule(weeklyGamesCronSchedule, () => {
  console.info(`[Cron] Triggered weekly games ingestion at ${new Date().toISOString()}`);
  runWeeklyGamesIngestion().catch(error => {
    console.error(`[Process] Unhandled error during weekly cron job:`, error);
  });
}, {
  timezone: 'UTC',
});

console.info(`[Process] Cron jobs scheduled successfully. Waiting for next execution.`);
