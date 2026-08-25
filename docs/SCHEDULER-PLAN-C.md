# Volunteer Scheduler — Plan C (native Cloudflare + Supabase)

The volunteer scheduler is being built to live inside the church stack — static
frontend under `sovgracekc.org/members/`, data + logic on **Supabase**, gated by
the existing `/members/` password. Planning Center is imported once and then
retired; Basecamp is a publish target + data source, not the source of truth.

A working prototype (FastAPI + SQLite on Railway) proved the whole loop —
PCO import → generate a 4‑month Sunday calendar → auto‑fill Children's from
Cassie's roster → per‑leader filtered view → publish to Basecamp. Plan C ports
that onto this stack.

## Architecture

| Layer | Choice |
| --- | --- |
| Data | Supabase Postgres, isolated `scheduler` schema (not Data‑API exposed; Edge Functions use the service role; RLS on as defense in depth) |
| API | Supabase Edge Functions (Deno/TS), consistent with the church's other backends |
| Frontend | Static pages under `/members/scheduler/` on Cloudflare Pages |
| Access | The existing `/members/` password gate (`functions/members/_middleware.js`) — members already sign in there, so the scheduler needs no separate login |
| Basecamp | Only for publishing the finished roster + as a data source (matches the `/seat/` bulletin already reading Josh's Basecamp email) |

## Data model (`scheduler` schema)

- `ministries` — the teams (Worship, A/V, Children's, Greeters, Security, Communion, Coffee)
- `roles` — positions within a ministry, with `needed_count` (target per service) and `required`
- `people` — the directory imported from Planning Center; `bc_person_id` filled in only for publish; free‑text volunteers allowed
- `services` — one Sunday per date
- `assignments` — one row per slot (`slot_index`), linked to a `person`

See `supabase/migrations/20260825170000_scheduler_schema_init.sql`.

## Status

- [x] `scheduler` schema created in project `twbunmbzyqcqzgffdrib`
- [x] Structure loaded: 7 ministries, 13 roles (23 slots/service), 17 Sundays (Aug 30 – Dec 20 2026)
- [x] Data loaded & verified: **364 people** (359 PCO + 5 free‑text), **412 assignment slots**,
      **157 filled** (Cassie's Children's roster + Josh as Worship Leader on all 17 Sundays).
      FK integrity confirmed via join (service 1 Children's slots match Cassie's roster).
- [ ] Edge Functions: directory / services / assignments / assign (gated by the members cookie)
- [ ] Static scheduler UI under `/members/scheduler/`
- [ ] Basecamp publish Edge Function + OAuth token storage
- [ ] Wire the members gate + deploy
- [ ] (nice‑to‑have) A re‑sync Edge Function that pulls people fresh from Planning Center

> Initial data was ported from the validated prototype into the `scheduler` schema
> via the Supabase MCP. Ongoing PCO re‑sync will be an Edge Function later.

## Notes

- The scheduler tables live in a dedicated schema so they never touch the church's
  `public` tables and aren't served by the anon Data API.
- Migration SQL is vendored here (unlike most church DB objects) so the schema is
  recoverable and reviewable — see architecture doc gap #3.
