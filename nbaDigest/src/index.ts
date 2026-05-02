import * as dotenv from 'dotenv';
// Load environment variables early
dotenv.config();

import express from 'express';
import cron from 'node-cron';
import { runDailyDigest } from './jobs/dailyDigest';
import { runWeeklyGamesIngestion } from './jobs/weeklyGamesIngestion';
import { registerSubscriberEndpoints } from './endpoints/subscriber';

const cronSchedule = process.env.CRON_SCHEDULE || '0 6 * * *';
const timezone = process.env.TZ || 'UTC';
const weeklyGamesCronSchedule = process.env.WEEKLY_GAMES_CRON_SCHEDULE || '0 0 * * 0';
let port = process.env.PORT ? Number(process.env.PORT) : 3000;

if (!Number.isFinite(port)) {
  console.warn(`[Process] Invalid PORT value "${process.env.PORT}", falling back to 3000`);
  port = 3000;
}

console.info(`[Process] Starting NBA Daily Digest Process...`);
console.info(`[Process] Configured with CRON: "${cronSchedule}" and TZ: "${timezone}"`);
console.info(`[Process] Configured WEEKLY_GAMES_CRON_SCHEDULE: "${weeklyGamesCronSchedule}" (UTC)`);

const app = express();
app.use(express.json());
registerSubscriberEndpoints(app);
app.listen(port, () => {
  console.info(`[Process] Admin API listening on port ${port}`);
});

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
