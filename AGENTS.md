# AGENTS.md — NBA Daily Digest

Read this file in full before touching any file in the project.

---

## What this project does

NBA Daily Digest is a Node.js service that sends an email every time an NBA game day occurs. It fetches that day's results from the balldontlie API, builds an HTML email with scores, and delivers it individually to every active subscriber via Resend.

There is no HTTP server, no frontend, and no user-facing interface in this project.

---

## Stack

| Technology | Role | Notes |
|---|---|---|
| Node.js + TypeScript | Runtime and language | Strict mode, no `any` |
| balldontlie API | NBA data source | Free, no API key required |
| Resend | Email delivery | Official Node SDK |
| SQLite (`better-sqlite3`) | Subscribers storage | Synchronous, no server |
| node-cron | Job scheduling | Runs inside the Node process |
| Railway | Deployment | Persistent 24/7 process |

---

## Project structure

```
nba-digest/
├── src/
│   ├── jobs/
│   │   └── dailyDigest.ts       # Orchestrates the full flow
│   ├── services/
│   │   ├── nba.ts               # balldontlie API calls
│   │   ├── email.ts             # Email composition and sending
│   │   └── subscribers.ts       # Subscriber CRUD against SQLite
│   ├── templates/
│   │   └── digest.html.ts       # HTML email template function
│   ├── db/
│   │   └── index.ts             # SQLite init and migrations
│   └── index.ts                 # Entry point, starts the cron
├── .env
├── tsconfig.json
└── package.json
```

Do not create new top-level folders without explicit discussion.

---

## Job flow

```
Cron fires nightly (23:30 Europe/Madrid)
    │
    ▼
nba.ts → did any games take place today?
    │
    ├── No games → log reason, exit without sending anything
    │
    └── Games found → fetch results and scores
            │
            ▼
        digest.html.ts → build the email HTML
            │
            ▼
        subscribers.ts → get all emails where status = 'active'
            │
            ▼
        email.ts → send one individual email per subscriber via Resend
```

The job sends nothing if no games were played that day. Always log the reason for early exits.

---

## Environment variables

```env
RESEND_API_KEY=        # Resend API key
CRON_SCHEDULE=         # Cron expression (e.g. "30 23 * * *")
TZ=Europe/Madrid       # Process timezone
```

Never hardcode env values in source code. Never commit the `.env` file.

---

## TypeScript conventions

- Strict mode is enabled in `tsconfig.json`. Do not disable any strictness option.
- No `any`. If unavoidable, add an inline comment explaining why.
- Use interfaces for domain models (`Game`, `Subscriber`, `DigestPayload`...). Place them in `src/types/` if they grow beyond a single file.
- Explicit return types on all service functions. Do not rely on inference at the service layer.
- Use typed errors. Never catch and silently swallow exceptions.

---

## Database conventions

- `better-sqlite3` is **synchronous**. Do not mix its calls with async/await.
- Migrations run as SQL statements inside `src/db/index.ts` at startup, guarded by `IF NOT EXISTS` or column checks.
- Current subscriber schema:

```sql
CREATE TABLE IF NOT EXISTS subscribers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'active',  -- 'active' | 'unsubscribed'
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
```

- Never hard-delete rows. Use `status = 'unsubscribed'` for opt-outs.
- Never alter the schema directly. Add columns via versioned `ALTER TABLE` migrations inside `src/db/index.ts`.
- No ORM. Write raw SQL with `better-sqlite3`.

---

## Email conventions

- The template lives in `src/templates/digest.html.ts` and exports a single pure function: `buildDigestHtml(games: Game[]): string`
- Email HTML must be mail-client compatible: use tables, inline styles. No external CSS, no flexbox, no grid.
- Subject line format: `🏀 NBA Digest — {date formatted as "May 2, 2026"}`
- Always send one email per subscriber. Never use BCC for bulk sending.
- During development, only send to your own test email. Never use real subscriber emails for testing.

---

## Error handling

- balldontlie call fails → log the error, abort the job, do not send anything.
- Reading subscribers fails → log the error, abort the job.
- A single email send fails → log the error with the affected address, continue with remaining subscribers.
- The process must never crash due to an error in a single iteration.

---

## Hard rules

- No HTTP server, no Express, no routes of any kind.
- No ORM. Raw SQL only.
- No `console.log` for business flow. Use a minimal logger with levels (`info`, `warn`, `error`). A thin wrapper over `console` is acceptable in early stages.
- Do not modify the cron schedule at runtime. It comes from `.env` only.