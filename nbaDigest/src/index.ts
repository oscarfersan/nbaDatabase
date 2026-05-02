import * as dotenv from 'dotenv';
// Load environment variables early
dotenv.config();

import cron from 'node-cron';
import { runDailyDigest } from './jobs/dailyDigest';

const cronSchedule = process.env.CRON_SCHEDULE || '0 6 * * *';
const timezone = process.env.TZ || 'UTC';

console.info(`[Process] Starting NBA Daily Digest Process...`);
console.info(`[Process] Configured with CRON: "${cronSchedule}" and TZ: "${timezone}"`);

// Schedule the task
cron.schedule(cronSchedule, () => {
  console.info(`[Cron] Triggered digest job at ${new Date().toISOString()}`);
  runDailyDigest().catch(error => {
    console.error(`[Process] Unhandled error during cron job:`, error);
  });
}, {
  timezone: timezone,
});

console.info(`[Process] Cron job scheduled successfully. Waiting for next execution.`);
