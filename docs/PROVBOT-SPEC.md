# Product Spec: SGKC Website Assistant ("the Bot")

**Owner:** Chris (chris@sovgracekc.org)
**Version:** 1.0 — July 2026
**Status:** Ready to build

---

## 1. Overview

A congregation-facing chat widget embedded on the Sovereign Grace KC website. It answers questions about the church, connects visitors to existing teaching resources stored in Supabase, and books appointments with the pastor against a short-term availability list that Chris manages through his Claude Cowork assistant.

**Design principle:** the bot is a *concierge, not a counselor*. It routes, retrieves, and books. The theological substance lives in the Supabase resource database; the pastoral substance lives with the pastor. The bot never freelances on either.

## 2. Goals

1. Visitors get instant, accurate answers to common church questions (service times, location, beliefs, ministries, what to expect).
2. Visitors find relevant sermons/articles/resources from the existing Supabase theological database, with links.
3. Visitors can book a time with Chris from real, current availability — no email back-and-forth.
4. Chris manages the whole system conversationally through Cowork (availability, booking review, content updates) — no admin UI required in v1.
5. Total run cost stays in the "tens of dollars per year" range.

## 3. Non-Goals (v1)

- No open-ended theological reasoning or pastoral counseling by the model.
- No user accounts or login.
- No SMS/phone channel (website only).
- No admin dashboard (Cowork *is* the admin interface).
- No multi-staff calendars (Chris only).

## 4. Architecture

```
┌─────────────────────┐
│  Static website      │
│  (plain HTML/JS)     │
│  ┌───────────────┐   │
│  │ chat-widget.js │──┼──── POST /functions/v1/chat ────┐
│  └───────────────┘   │                                  │
└─────────────────────┘                                  ▼
                                            ┌──────────────────────────┐
                                            │  Supabase Edge Function   │
                                            │  "chat" (Deno/TS)         │
                                            │  - session handling       │
                                            │  - rate limiting          │
                                            │  - tool loop w/ Claude    │
                                            └───────┬──────────┬───────┘
                                                    │          │
                                     Anthropic API  │          │  Supabase (Postgres + pgvector)
                                     (Haiku 4.5)    │          │  - resources (existing)
                                                    │          │  - availability_slots
                                                    │          │  - appointment_requests
                                                    │          │  - chat_sessions / chat_messages
                                                    │          │  - faq_content
                                                    ▼          ▼

                    Chris ⇄ Claude Cowork  ──── reads/writes the same tables
                    (sets availability, reviews bookings, updates FAQ content)
```

Key decisions:

- **Backend = one Supabase Edge Function.** The Anthropic API key lives server-side only; the widget never talks to Anthropic directly. Everything stays inside the Supabase project Chris already has.
- **The database is the contract between the bot and Cowork.** The website bot and Chris's Cowork assistant never talk to each other directly — they share tables. Cowork writes availability; the bot reads it. The bot writes appointment requests; Cowork reads them and puts confirmed ones on Chris's Google Calendar.
- **The widget is a single drop-in file.** `<script src="/chat-widget.js" defer></script>` plus one `<div>`. No framework dependency, works on a plain HTML site.

## 5. Model & Cost

| Item | Choice |
|---|---|
| Model | `claude-haiku-4-5` (verify exact model ID string against current docs at build time) |
| Max output tokens | 500 per turn |
| Conversation cap | 12 turns, then the bot offers contact info / booking and winds down |
| Prompt caching | Cache the system prompt + tool definitions (5-min cache; the cache stays warm during active conversations) |
| History strategy | Send last 8 turns verbatim; drop older turns (no summarization needed at this scale) |

Rationale: all three jobs (FAQ, retrieval, booking) are grounded tool-use tasks — Haiku-class work. Escalation to a bigger model is explicitly *not* wanted; hard questions route to a human (§8).

**Cost guardrails (required):**

- Per-IP rate limit: 20 messages/hour, 60/day (enforced in the edge function; store counters in Postgres or use Supabase's built-in rate limiting).
- Global daily budget check: if total messages today > 2,000, return a friendly "high demand, please email us" message.
- Set a monthly spend alert in the Anthropic Console (e.g., $20) as the backstop.

Expected cost at ~300 conversations/month: **$3–10/month** with caching.

## 6. Data Model

The existing theological/resource database is assumed present (referred to as `resources`, with pgvector embeddings — adapt names to actual schema at build time). New tables:

```sql
-- Short-term availability, managed by Chris via Cowork
create table availability_slots (
  id uuid primary key default gen_random_uuid(),
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  slot_type text not null default 'general',   -- 'general' | 'pastoral' | 'newcomer'
  status text not null default 'open',          -- 'open' | 'held' | 'booked' | 'expired'
  created_at timestamptz default now()
);

-- Booking requests written by the bot
create table appointment_requests (
  id uuid primary key default gen_random_uuid(),
  slot_id uuid references availability_slots(id),
  requester_name text not null,
  requester_email text not null,
  requester_phone text,
  topic text,                                   -- short free-text, what they want to talk about
  status text not null default 'pending',       -- 'pending' | 'confirmed' | 'declined' | 'cancelled'
  created_at timestamptz default now()
);

-- FAQ / church-info content the bot answers from (editable via Cowork)
create table faq_content (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,                    -- 'service-times', 'what-we-believe', 'kids-ministry', ...
  title text not null,
  body text not null,                           -- markdown
  updated_at timestamptz default now()
);

-- Lightweight conversation logging (for review + abuse monitoring)
create table chat_sessions (
  id uuid primary key default gen_random_uuid(),
  ip_hash text,                                  -- hashed, never raw IP
  started_at timestamptz default now()
);

create table chat_messages (
  id bigint generated always as identity primary key,
  session_id uuid references chat_sessions(id),
  role text not null,                            -- 'user' | 'assistant'
  content text not null,
  created_at timestamptz default now()
);
```

**RLS:** enable row-level security on all tables; the edge function uses the service-role key. The anon key gets **no** direct table access — everything goes through the function.

**Slot booking must be race-safe:** booking = a single `update availability_slots set status='held' where id = $1 and status='open' returning id`. If zero rows return, the slot was just taken — the bot apologizes and re-offers.

## 7. Bot Capabilities (tools exposed to the model)

The edge function runs a standard Anthropic tool-use loop with these tools:

1. **`search_resources(query, limit=4)`** — embedding + keyword search over the existing resource database. Returns title, snippet, URL. The bot must cite/link what it returns and must not answer resource-type questions without calling this first.
2. **`get_faq(topic)`** — fetch relevant `faq_content` entries. Church-info answers come *only* from this content. If nothing matches, the bot says it doesn't have that information and gives contact info — it does not guess.
3. **`list_open_slots(slot_type?, within_days=14)`** — returns open availability, formatted in Central Time.
4. **`book_slot(slot_id, name, email, phone?, topic?)`** — atomically holds the slot and creates a `pending` appointment request. The bot tells the visitor: *"Requested — Chris will confirm by email."* (Bookings are requests, not instant confirmations; Chris confirms via Cowork.)

Note on embeddings: Anthropic doesn't provide an embeddings API — use whatever the existing resource database already uses (e.g., Voyage or an open-source model via Supabase's built-in `gte-small`). If the existing corpus already has embeddings, match that model.

## 8. Persona, Guardrails & Escalation

**System prompt requirements** (the actual prompt is written at build time, but must encode):

- Identity: a helpful assistant for Sovereign Grace Church of Kansas City. It states clearly that it's an AI assistant if asked, and the widget UI labels it as one at all times (see §9).
- Warm, plain-spoken, brief. No preachiness, no emoji.
- **Grounding rule:** church facts come only from `get_faq`; resource answers only from `search_resources`; never invent service times, addresses, staff names, or doctrinal positions. "I don't have that — here's how to reach us" is always an acceptable answer.
- **Theology boundary:** for substantive doctrinal or personal-spiritual questions, the bot may point to relevant resources (via search) but does not compose its own theological answers. It offers the church's contact info and, where fitting, an appointment.
- **Sensitive/pastoral escalation (per Chris's decision — contact info only):** if a conversation turns to crisis, grief, abuse, marriage breakdown, self-harm, or anything requiring a human, the bot immediately and warmly provides church contact info (phone + chris@sovgracekc.org) and stops trying to help with the substance. For self-harm specifically, it also includes the 988 Suicide & Crisis Lifeline. It does not probe, assess, or counsel.
- Refuses off-topic use (homework, general chatbot use, prompt-extraction games) with one friendly line redirecting to church topics.

## 9. Widget (frontend)

- Single self-contained `chat-widget.js` (~vanilla JS, no dependencies) + inline CSS. Floating button bottom-right → opens a chat panel.
- Panel header: church name + a persistent "AI assistant" label. First message discloses: *"Hi! I'm SGKC's automated assistant. I can answer questions about the church, point you to sermons and resources, or help you set up a time to meet with Pastor Chris."*
- Streams responses (SSE from the edge function) for responsiveness.
- Session ID generated client-side (crypto.randomUUID), held in a JS variable for the page visit. No cookies, no localStorage → no cookie banner implications.
- Graceful failure: if the function errors or rate-limit hits, show contact info instead of a broken chat.
- Accessible: keyboard navigable, proper aria roles, respects prefers-reduced-motion.

## 10. Cowork Integration (the "admin" side)

These are conversational workflows Chris runs with Cowork against the same Supabase project — no code needed beyond the tables above:

1. **Set availability:** "Open up Tuesday 1–3 and Thursday morning for appointments next week" → Cowork inserts `availability_slots` rows (checking Google Calendar for conflicts first).
2. **Review bookings:** "Any appointment requests?" → Cowork reads `pending` rows, Chris confirms/declines → Cowork updates status, creates the Google Calendar event, and drafts the confirmation email from chris@sovgracekc.org.
3. **Update FAQ:** "Update the service time to 10:30" → Cowork edits `faq_content`.
4. **Weekly digest (scheduled task):** every Monday, Cowork summarizes last week's conversations (top questions, unanswered topics, any concerning exchanges) and flags FAQ gaps.
5. **Expire stale slots:** a Postgres cron (`pg_cron`) marks past-dated slots `expired` nightly.

## 11. Privacy & Ops

- Chat logs stored with hashed IPs only; retention 90 days, then purge (pg_cron).
- Visitor email/phone collected only when booking, used only for that appointment.
- A one-line privacy note in the widget footer linking to the site's privacy page.
- Env vars in the edge function: `ANTHROPIC_API_KEY`, service-role key (auto-available). Never in client code.
- Logging: log token usage per session to `chat_sessions` for cost visibility.

## 12. Build Checklist (suggested order)

1. Migrations: create the five new tables + RLS + pg_cron jobs.
2. Seed `faq_content` (service times, location, beliefs summary, ministries, contact, what-to-expect).
3. Edge function `chat`: tool loop, rate limiting, streaming, prompt caching.
4. `chat-widget.js` + embed on a test page.
5. System prompt tuning against a written test set (≥20 questions: FAQ hits, resource lookups, booking flow, sensitive-topic redirects, off-topic refusals, prompt-injection attempts).
6. Set Anthropic Console spend alert; deploy; add widget to the live site.

## 13. Success Criteria

- FAQ answers match `faq_content` verbatim in substance (spot-check 20 questions).
- Booking flow completes end-to-end: slot opened via Cowork → booked on the site → confirmed via Cowork → lands on Google Calendar.
- Sensitive-topic test prompts always produce contact info and never advice.
- Monthly cost under $15 at expected traffic.

## 14. v2 Ideas (explicitly out of scope now)

- Sermon-corpus deep Q&A (grounded quotes with citations from the sermon database).
- Email/SMS reminders for confirmed appointments.
- Multi-staff availability.
- Spanish-language support.
