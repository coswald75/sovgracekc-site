# Porting ALL the forms to the church website

**For:** the agent building the Providence / Sovereign Grace KC church website
(sovgracekc.org).
**Goal:** give each of Chris's existing forms its own URL on the church site.

This is the same job as the Marriage Counseling Intake port (see
`MARRIAGE-INTAKE-PORT.md`) — just repeated for every form. **Read that note first
for the full method; this one is the roster + the per-form specifics.**

The one-line method, again: **every form is a self-contained page that calls a
PUBLIC Supabase Edge Function (`verify_jwt=false`, `Access-Control-Allow-Origin: *`).
So a working copy on the church site usually means copying the page file(s) and
changing nothing on the backend.** All backends live in Supabase project
**`twbunmbzyqcqzgffdrib`** — none of this logic is in Cloudflare; Cloudflare only
serves the static pages.

---

## The roster

| Form | Current URL | Supabase function | Files to copy | What the backend does |
|---|---|---|---|---|
| **Bible Knowledge Exam** | chrisoswald.org/bible-exam/ | `bible-exam` | `index.html` only | Stores attempts + scores in table `exam_attempts` (email login). Graded/shown online. **No email.** |
| **Integrity Tests** (a.k.a. Self-Sabotage Stopper) | chrisoswald.org/self-sabotage/ | `self-sabotage` | `index.html` only | Stateless. **Answers never stored** — only category risk numbers land in `integrity_scores`. Guidance shown online. **No email.** |
| **Marriage Counseling Intake** | chrisoswald.org/marriage-intake/ | `marriage-intake` | `index.html` only | Email+password drafts in `intake_forms`; emailed on submit, then answers wiped. **Emails chris@sovgracekc.org.** (Covered in the other note.) |
| **Suffering Sheets** | chrisoswald.org/suffering-sheets/ | `suffering-sheets` | **`index.html` + `sheets.js`** (both!) | Stateless. Nothing stored. **Emails chris@sovgracekc.org** (the completed sheet). |
| **When Silence is Sin** (counseling worksheet) | chrisoswald.org/when-silence-is-sin/ | `worksheet-share` (generic) | `index.html` (+ see notes) | Stateless. Nothing stored. **Emails chris@sovgracekc.org.** |

Source on disk for every page:
`~/shepherds-guild/chrisoswald-site/<slug>/` (e.g. `.../bible-exam/index.html`).
Backend source for every function:
`~/shepherds-guild/pipeline copy 2/bible-exam/supabase/functions/<function-name>/`.

There is also a **hub page** at chrisoswald.org/quizzes/ that links all five. If
the church wants a matching hub, copy `quizzes/index.html` too — but it is NOT
self-contained (see below).

---

## Option A — reuse the same backends (recommended, fast)

For each form: copy its file(s) to the church site at whatever path you want,
leave the `API` constant pointing at the existing
`…twbunmbzyqcqzgffdrib.supabase.co/functions/v1/<name>` endpoint, and update only
the `<title>` / page branding. Because CORS is `*`, they work from the church
domain immediately. The email-based ones keep emailing `chris@sovgracekc.org`.

**Shared-backend caveat (same as before):** the three that store data
(`bible-exam` → `exam_attempts`, `self-sabotage` → `integrity_scores`,
`marriage-intake` → `intake_forms`) are keyed by **email**, not by site. Same
email on both sites = same stored record/history. Fine for one pastor + one
person; choose Option B if you want the church data isolated.

## Option B — stand up independent copies (full isolation / church branding)

Same steps as the marriage-intake note, per function: redeploy the function under
a new name (or on a separate Supabase project) with `verify_jwt=false`, repoint
the copied page's `API` constant, and for the email ones set `COUNSELOR_EMAIL` +
a Resend-verified `RESEND_FROM`. Create whatever table that function expects
(the two stateless email forms — Suffering Sheets, When Silence is Sin — need
**no table at all**):

```sql
-- Bible Knowledge Exam
create table if not exists public.exam_attempts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  status text not null default 'in_progress',
  answers jsonb not null default '{}'::jsonb,
  current_section text default 'A',
  score jsonb,
  study_plan text,
  quiz text not null default 'bible-exam',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Integrity Tests / Self-Sabotage (stores only scores, never answers)
create table if not exists public.integrity_scores (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  name text not null,
  test text not null,
  overall integer not null,
  band text not null,
  categories jsonb not null,
  created_at timestamptz not null default now()
);

-- Marriage Counseling Intake table DDL is in MARRIAGE-INTAKE-PORT.md.
```

---

## Per-form gotchas — read before copying

- **Suffering Sheets needs TWO files.** `index.html` **and** `sheets.js` must be
  copied together into the same folder, or the page renders blank. It's the only
  multi-file form.
- **When Silence is Sin has stray local references.** Its `index.html` links to
  `/favicon-32.png`, `/favicon-180.png`, and a `/quizzes/` back-link. On the
  church site either (a) also provide favicons at those paths, or (b) update those
  `href`s. Repoint or remove the `/quizzes/` link so it doesn't dead-end.
- **The quizzes hub page is not self-contained.** `quizzes/index.html` pulls in
  `/detail.css`, the favicons, has a hardcoded canonical `https://chrisoswald.org/quizzes/`,
  and links to `/bible-exam/`, `/self-sabotage/`, etc. If you build a church hub,
  update the canonical, bring `detail.css` along (or restyle), and fix every
  internal link to the church's chosen paths.
- **Bible Exam & Integrity Tests don't email** — results are shown online (and, for
  those two, stored). The other three email the completed form to
  `chris@sovgracekc.org` and store nothing (Suffering Sheets / When Silence is Sin
  keep no copy at all; Marriage Intake wipes after send).
- **Two of the email senders** (`suffering-sheets`, `worksheet-share`) also
  hardcode a "Sent from chrisoswald.org…" line in their email template. Cosmetic;
  edit + redeploy only if you want it re-branded (that's an Option-B change).
- **Field/question definitions are duplicated** (embedded in the page for
  rendering, and in the function's source for validation/email). If a form's
  content ever changes, both sides must change together. Don't edit one copy on
  the church site and expect the shared backend to match.

---

## Decision for Chris (not the bot)

For each stored form, do you want the church site sharing Chris's existing data
(Option A) or keeping its own (Option B)? Default to **A** everywhere unless you
want a form on the church site to email someone other than Chris, or to keep its
records separate — then that form goes **B**.
