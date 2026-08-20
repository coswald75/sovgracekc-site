# Providence Church Website — Architecture, Build & Operations

> **Consolidation note (2026-08-20):** the church-specific build scripts described
> below (members wiki, bulletin, sermons-list updater) have since been **moved into
> this repo under `scripts/`** — they no longer live in the `pipeline copy 2` folder.
> Paths that read `pipeline copy 2/<script>.py` now mean `scripts/<script>.py` here.
> The shared multi-church sermon-rendering engine stays in the pipeline repo.

> **What this is.** The single reference for everything we've built on and around
> the Providence Community Church website (**sovgracekc.org**): what the surfaces
> are, how each one is built and deployed, where it's connected (DNS, backend,
> email, analytics), the recurring automation, and — importantly — **what is and
> isn't version-controlled in GitHub.**
>
> **Companion docs (already in this repo):**
> - [`OPERATIONS.md`](OPERATIONS.md) — the sermon *ingestion pipeline* (audio → decomposed sermon page). This doc is the church-*website* counterpart.
> - [`CHURCH-FORMS-PORT.md`](CHURCH-FORMS-PORT.md) — the method + roster for porting Chris's forms to the site.
> - [`sgkc-bot-spec.md`](sgkc-bot-spec.md) — the original ProvBot product spec.
>
> **Security note.** No secret values live in any repo. Keys live in a git-ignored
> local `.env`, in Cloudflare Worker/Pages secrets, or in Supabase function
> secrets. This document names keys but never prints them. The only key that
> appears in committed client code is the Supabase **anon** key (public by design,
> protected by RLS).
>
> _Last written: 2026-08-20._

---

## 0. TL;DR — is it all "connected into the pipeline repo on GitHub"?

**Not fully. Here is the honest state.**

| Thing | Lives in | On GitHub? |
|---|---|---|
| **Church website** (`sovgracekc-site`, the Astro app) | Local git repo `~/shepherds-guild/sovgracekc-site` | **NO — 0 remotes.** Local git history only. Deployed straight to Cloudflare via `wrangler`. |
| **Sermon pages host** (`sermon-steward`) | `~/shepherds-guild/sermon-steward` | **Yes** → `github.com/coswald75/sermon-steward` |
| **Pipeline + church build scripts** | `~/shepherds-guild/pipeline copy 2` | **Yes** → `github.com/coswald75/shepherds-guild-pipeline` — **but several church scripts are UNTRACKED** (see below). |
| **Backend** (Supabase Edge Functions) | Supabase project `twbunmbzyqcqzgffdrib` | **NO** — only `preflight-check` source is in a repo. The ~12 church-facing functions exist only as deployed code. |

**Untracked church scripts in the pipeline repo** (present on disk, not committed → not on GitHub):
`generate_members_wiki.py`, `publish_bulletin.py`, `update_church_sermons.py`,
`members_assets/` (the standalone member docs), `wire_nations.py` (lives in a scratchpad, not the repo at all), plus assorted planning docs.

**What this means:** if this Mac died, the church website source and the members-wiki/bulletin generators would be recoverable only from this machine's local disk (Time Machine / Dropbox), **not** from GitHub. See [§10 Gaps & Recommended Fixes](#10-gaps--risks--recommended-fixes).

> ⚠️ **Canonical working copy = `~/shepherds-guild/pipeline copy 2`.** There are also
> stale `pipeline/` and `pipeline copy/` folders. Every live cron and every command
> in this doc uses **`pipeline copy 2`**. Ignore the others.

---

## 1. The surfaces (what we've built)

Everything below is reachable from **sovgracekc.org** or is the church's own tooling.

### 1a. The main website — `sovgracekc.org`
- **Stack:** Astro 5 static site → Cloudflare Pages (project **`sovgracekc`**).
- **Repo:** `~/shepherds-guild/sovgracekc-site` (local git only).
- **Config:** `trailingSlash: 'always'`, `build.format: 'directory'`. Base layout `src/layouts/Base.astro` (primary menu lives here).
- **Primary pages:** Home, Visit, About, Beliefs, Sermons, Resources, Community, Photos, Leadership, Missions, ProvBot, **Members**, Contact.
- **Feature pages / landings:** `/topical-resources/`, `/bible-exam/`, `/self-sabotage/`, `/duty-delight/`, `/when-silence-is-sin/`, `/marriage-intake/`, `/philosophy-of-change/`, `/biblical-counseling/`, `/membership/` (20-lesson course), `/seat/` (NFC bulletin landing), `/isaiah/**` (fall sermon-series site).
- **Current provider being replaced:** Digital Outreach hosted the old site; DNS is already on Cloudflare.

### 1b. The members-only wiki — `sovgracekc.org/members/`
- Password-gated internal ministry wiki (SOPs, care maps, leader resources, ministry manifest).
- **Generated** from Obsidian markdown by `generate_members_wiki.py` → static HTML in `sovgracekc-site/public/members/`.
- **Gate:** a Cloudflare **Pages Function** at `sovgracekc-site/functions/members/_middleware.js` (HMAC-signed HttpOnly cookie). Shared password — value lives **only** in the `MEMBERS_PASSWORD` Cloudflare Pages secret (never printed in this public repo).
- See [§4](#4-the-members-wiki-pipeline) for the full build/deploy.

### 1c. Sermon pages — `sermonsteward.com/ProvidenceLenexa/sermons/<slug>`
- Every Providence sermon has its own rich page (audio, transcript, 6 discussion questions, 5-day reading plan, family + couples prompts, memory verse, cross-references, share card).
- **Hosted on Sermon Steward**, not the church site, but linked from `sovgracekc.org/sermons/` and from ProvBot.
- **Built** by `generate_sermon_pages.py` (template `templates/sermon_page.html.j2`), **deployed** by `scripts/deploy_sermon_pages.py` into the `sermon-steward` repo/Worker. See [§5](#5-the-sermon-page-pipeline).

### 1d. ProvBot — the AI assistants
Two distinct assistants, both backed by Supabase functions (Haiku 4.5 + Voyage embeddings):
1. **Site-wide ProvBot** (`chat` function) — concierge on the church site: church FAQ, sermon search, "meet a leader" requests. Widget: `sovgracekc-site/public/chat-widget.js`. *Concierge, not counselor.*
2. **"Ask this sermon"** (`sermon-chat` function) — per-sermon assistant embedded on each Sermon Steward sermon page. Answers **page-first** from that one sermon's content, then offers to broaden into the wider corpus + public-domain voices (Pink/Spurgeon/Watson/Morgan). Widget is **inlined in `templates/sermon_page.html.j2`**, gated to Providence pages.

### 1e. Forms & self-guided tools
Each is a static page calling a **public** Supabase Edge Function (`verify_jwt=false`, CORS `*`). Backends never live in Cloudflare. See [§7](#7-backend--supabase-edge-functions) and `CHURCH-FORMS-PORT.md`.

### 1f. The weekly bulletin — `sovgracekc.org/seat/`
- NFC/QR "seat-sticker" landing page showing this Sunday's Order of Service, Announcements, Sermon Outline, a guest "say hello" form, and Give.
- Built via the **`weekly-bulletin` skill** + `scripts/publish_bulletin.py`, all rendered from `src/data/bulletin.json`; sources = **Josh's Basecamp music email** + **Dov Cohen's announcements email** (both Gmail) + **Chris's sermon title/outline**. **Full workflow → [§6](#6-the-seat-weekly-bulletin-pipeline).**

---

## 2. Where it's connected (the wiring)

| Layer | Service | Detail |
|---|---|---|
| **DNS + CDN** | Cloudflare | `sovgracekc.org` DNS on Cloudflare; site served by Cloudflare Pages project `sovgracekc`. |
| **Static host** | Cloudflare Pages | `sovgracekc` project. Deploy = `wrangler pages deploy dist`. Also compiles `./functions` (the members gate). |
| **Sermon host** | Cloudflare Worker | `sermon-steward` Worker serves `sermonsteward.com`. `git push` ≠ deploy; deploy = eleventy build + `wrangler deploy`. |
| **Backend / DB** | Supabase | Project **`twbunmbzyqcqzgffdrib`**. Postgres + ~15 Edge Functions. Source of truth for sermons, chat, forms. |
| **Email** | Resend | Transactional email from `reports@sermonsteward.com` (forms, ProvBot meeting requests, lead notifications). |
| **AI** | Anthropic (Haiku 4.5) + Voyage AI (voyage-3.5, 1024-dim) | Chat/sermon-chat inference + embeddings. Keys are Supabase function secrets. |
| **Audio** | Cloudflare R2 | `sermons-cdn` — R2-hosted MP3 mirror (stable URLs), fronted by a Worker. |
| **Analytics** | GA4 | Property `392798619`, tag **`G-HG3RG3C3QB`**; also Google Ads `AW-11258142796`. Outbound-click tracking on. |
| **Source content** | Obsidian vault | `~/Obsidian/Sermon_Vault/Providence 2627/` feeds the members wiki. |

---

## 3. Repos & directories (the map)

```
~/shepherds-guild/
├── sovgracekc-site/          # THE CHURCH WEBSITE (Astro) — local git, NO GitHub remote
│   ├── src/                  #   pages, layouts (Base.astro = menu)
│   ├── public/               #   static assets, incl. members/ (generated), chat-widget.js
│   ├── functions/members/    #   _middleware.js — the password gate (Cloudflare Pages Function)
│   └── dist/                 #   build output that wrangler deploys
├── sermon-steward/           # Sermon page host (Cloudflare Worker) — GitHub: coswald75/sermon-steward
└── pipeline copy 2/          # THE PIPELINE REPO — GitHub: coswald75/shepherds-guild-pipeline
    ├── generate_sermon_pages.py     # (tracked) render sermon rows → HTML
    ├── templates/sermon_page.html.j2# (tracked) sermon page template (+ inlined Ask-this-sermon widget)
    ├── scripts/deploy_sermon_pages.py# (tracked) push+build+deploy sermon pages to sermon-steward
    ├── generate_members_wiki.py     # (UNTRACKED) members wiki generator
    ├── members_assets/              # (UNTRACKED) standalone member docs (e.g. discerning-or-earning.html)
    ├── publish_bulletin.py          # (UNTRACKED) /seat/ bulletin publisher
    ├── update_church_sermons.py     # (UNTRACKED) refresh sovgracekc.org/sermons/ list
    ├── weekly_ingest.py             # (tracked) weekly sermon ingest orchestration
    └── supabase/functions/          # only preflight-check is here; church fns are NOT
```

**Remotes:**
- pipeline → `https://github.com/coswald75/shepherds-guild-pipeline.git` (currently on branch `claude/sproul-ligonier-ingest`)
- sermon-steward → `https://github.com/coswald75/sermon-steward.git` (main)
- sovgracekc-site → **none**

---

## 4. The members-wiki pipeline

**Source:** Obsidian markdown in `~/Obsidian/Sermon_Vault/Providence 2627/` (interlinked `[[wikilinks]]`, `> [!callouts]`, tables) + standalone HTML in `members_assets/`.

**Generator:** `generate_members_wiki.py` (needs `pip install markdown`).
- Reads the Obsidian folder → writes ~36 branded static pages to `sovgracekc-site/public/members/<slug>/index.html` (Index → `/members/`).
- Sidebar groups: **Start Here / Ministries / Start Serving / Resources / For Leaders**. Groups are defined by the `HUBS`, `RESOURCES`, `LEADERS` lists; everything else is a ministry.
- **Virtual pages** (not markdown notes): the **Ministry Interest Form** (`build_form_body()`) and **standalone HTML resources** (the `STANDALONE` list → copied verbatim from `members_assets/` into `/members/<slug>/`, each keeping its own design + a `← Providence Members` back-link).
- **Drift guard:** every page needs a one-line blurb in the `DESCRIPTIONS` dict, or `main()` prints a WARNING. The Manifest's "Full Directory" auto-mirrors the sidebar from the same `group_items()` source, so adding a page updates both.
- Mobile = content-first slide-in drawer with search; wide tables reflow to stacked cards (`label_tables()`).

**The gate:** `sovgracekc-site/functions/members/_middleware.js` (scoped to `/members/*`).
- No cookie → branded login screen. Correct password → HMAC-signed HttpOnly `pcc_members` cookie (30-day).
- **Password** — set in the Pages env var `MEMBERS_PASSWORD` (the literal value is **not** stored in this public repo; retrieve/rotate it via `wrangler pages secret`). Compare is forgiving (whitespace/case-insensitive); token still derives from the canonical password.
- Canonical login form: action `/members/?__login=1`, hidden stable `username` field + guarded `next` field (so password managers behave and there's no open redirect).

**To publish (repeatable):**
```bash
cd "~/shepherds-guild/pipeline copy 2"
python3 generate_members_wiki.py                       # regenerate public/members/
cd ~/shepherds-guild/sovgracekc-site
npm run build                                          # Astro build (also stages functions)
npx wrangler pages deploy dist --project-name=sovgracekc --branch=main --commit-dirty=true
```
> The Functions bundle (`Uploading Functions bundle`) promotes a few seconds after
> static assets on the custom domain — a login POST in that window may briefly 405,
> then settles. New static pages can 404 for ~30–60s until the custom domain promotes.

**To add a standalone member doc** (like "Discerning or Earning?"):
1. Drop the self-contained HTML in `members_assets/`.
2. Add it to `STANDALONE`, to the right sidebar group list (`LEADERS`/`RESOURCES`), and to `DESCRIPTIONS`.
3. Regenerate + build + deploy (above).

---

## 5. The sermon-page pipeline

**Render:** `generate_sermon_pages.py` turns a Supabase sermon row into HTML using
`templates/sermon_page.html.j2` (via `sermon_page_renderer/{queries,composer,template_engine}.py`).
Re-rendering costs $0 (no Anthropic call). Also generates the Open Graph share card.

```bash
python3 generate_sermon_pages.py render <sermon_id>          # one
python3 generate_sermon_pages.py render-all --church <id>    # a whole church (Providence)
python3 generate_sermon_pages.py render-stale                # anything changed since last render
```
Output → `output/sermon-pages/<church-slug>/<year>/<month>/<slug>.html`.

**Deploy:** `scripts/deploy_sermon_pages.py` copies rendered HTML into the
`sermon-steward` repo, rebuilds church index pages, commits + pushes, then
**eleventy build + `wrangler deploy`** (this is what makes pages live).
```bash
python3 scripts/deploy_sermon_pages.py --sermon-ids <id>     # a specific page
python3 scripts/deploy_sermon_pages.py --all-stale           # anything newer on disk than deployed
python3 scripts/deploy_sermon_pages.py --since-last-commit   # rendered since SS repo HEAD
```
> The page URL is flat: `<ChurchDir>/sermons/<slug>.html`. The canonical URL is the
> extensionless form; the `.html` path 307-redirects to it. (Note: `curl` without a
> browser User-Agent hits that 307 and looks empty — use a browser UA + `-L`.)

**"Ask this sermon" widget:** inlined at the bottom of `sermon_page.html.j2`, gated
`{% if church.url_slug == 'ProvidenceLenexa' %}`, slug injected via
`window.__sermonSlug`. Ships with every rendered Providence page — no separate JS asset.
Backend = the `sermon-chat` edge function. **Rollout status:** live on the template;
as of 2026-08-20 deployed to the test page `do-eden-anyway-work-2026-08-16`; the other
~484 Providence pages get it on the next `render-all --church` + deploy.

---

## 6. The `/seat` weekly-bulletin pipeline

**What it is.** `sovgracekc.org/seat/` is the **NFC/QR "seat-sticker" landing page** —
congregants scan a sticker on their seat Sunday morning and land here. It's a mobile
card hub for *this Sunday*, **refreshed every week (draft → review → publish,
human-in-the-loop** because it names people and events).

**Page structure** — all Astro pages under `src/pages/seat/`, every one rendered from a
single data file `src/data/bulletin.json`:

| Page | Card | Renders |
|---|---|---|
| `seat/index.astro` | hub ("This Sunday · Week of …") | cards, in order: **New here? Say hello · Order of service · Announcements · Sermon Outline · Give** |
| `seat/order.astro` | Order of service | the liturgy `flow` + split worship set + band + Spotify link |
| `seat/announcements.astro` | Announcements | the week's announcement cards |
| `seat/outline.astro` | Sermon Outline | points, full-ESV texts, quotes (auto-adds the ESV® notice); "posted Sunday morning" when empty |
| `seat/hello.astro` | New here? Say hello | guest connect form → `guest-connect` fn (see §7) |
| — | Give | **external** link `churchofficegiving.com/app/giving/prov1011279` (an on-site iframe embed was tried and abandoned — their giving SPA renders blank when framed) |

**Publisher:** `scripts/publish_bulletin.py` — validates `bulletin.json`, `npm run build`,
`wrangler pages deploy dist … --branch=main`, then a Resend confirmation email. `--check`
builds without deploying (for review).

**Weekly workflow — run the `weekly-bulletin` skill** (its `SKILL.md`, in the pipeline repo's `.claude/skills/weekly-bulletin/`, is the full step-by-step). Summary:

1. **Gather** (all read from Chris's logged-in Chrome via the browser tools — no tokens):
   - **Worship set** ← Josh Luffman's Basecamp email in Gmail, subject *"(Corporate Worship - Music) Sunday Worship MM/DD/YYYY"*. Read the **first** message: band, songs (mapped to liturgy sections), Spotify playlist (strip `?si=…`). Josh usually **interleaves a Scripture Reading** between the first two and next two opening songs.
   - **Announcements** ← **Dov Cohen's** Gmail email, subject *"Announcements M/D/YYYY"*. It's just **titles + dates**; real detail lives in the slides he uploads (image-only `.pptx` — extract by unzipping `ppt/media/*` and *reading the images*) or Chris supplies it at review. **Don't invent** times/places/sign-up links. Carry over still-upcoming events (retreats, etc.) per Chris.
   - **Sermon** ← Chris gives the **title + passage**; the **outline** he hands over Sunday morning as a manuscript, which you *reduce* to headings + full-ESV scriptures + memorable quotes (his three rules: main headings suffice, Scriptures in full ESV, include quotes).
2. **Draft** → overwrite `bulletin.json` (`week_of` = the coming Sunday).
3. **Review** → `python3 scripts/publish_bulletin.py --check`, start the `sovgracekc` preview, screenshot `/seat/`, `/seat/order/`, `/seat/announcements/`, `/seat/outline/` at mobile width, and get Chris's **explicit yes**.
4. **Publish** → `python3 scripts/publish_bulletin.py`.

**`bulletin.json` shape:**
```json
{
  "week_of": "August 16, 2026",
  "service_order": {
    "flow": [ /* ordered liturgy: {type:"element"|"songs"|"sermon", label, section?, detail?} */ ],
    "sermon": { "title": "…", "text": "…", "thesis": "…", "outline": [ /* blocks */ ] },
    "band":  [ { "name": "…", "role": "…" } ],
    "songs": [ { "title": "…", "section": "opening|opening2|communion|final" } ],
    "playlist_url": "https://open.spotify.com/playlist/…"
  },
  "announcements": [ { "title": "…", "body": "…", "when": "…", "link": "…", "bullets": ["…"] } ]
}
```
- **`flow`** renders top-to-bottom. Standard order: Welcome · Call to Worship · Songs (`opening`) · Scripture Reading (`{type:"element", detail}`) · Songs (`opening2`) · Kids Dismissal · Sermon · Communion (`{type:"songs", section:"communion"}`) · Final Songs (`final`) · Benediction. The worship set is **split** — a `{type:"songs", section}` step shows only the songs whose `section` matches (opening set before kids dismissal; communion + final after the sermon).
- **`sermon.outline`** block types: `{type:"heading", text}`, `{type:"text", body}`, `{type:"scripture", ref, body}` (full ESV; the page auto-appends the ESV® copyright notice when any scripture block exists), `{type:"quote", body, cite?}`. Empty `outline` → the page shows the sermon title + "posted Sunday morning".
- **announcement** `bullets:[]` renders a `<ul>`; empty `body`/`when`/`link` render gracefully (title-only cards are fine).

**Analytics.** GA4 (property `392798619`) — launch data: ~98% **Direct** traffic (sticker scans), ~83% mobile, Sunday-morning peak. **Outbound-click tracking is on** (Give/RSVP/Spotify taps; forward-only from 2026-08-09). A **Looker Studio** report *"Providence — Seat Page Traffic"* (owned by chris@sovgracekc.org, id `d74d264b-00dc-4ba5-a639-2495e440e38b`) **emails Chris a `/seat/` summary every Monday** — cloud-delivered, no stored keys.

---

## 7. Backend — Supabase Edge Functions

Project **`twbunmbzyqcqzgffdrib`**. Public functions are `verify_jwt=false` + CORS `*`.
Manage via the Supabase MCP (`list_edge_functions`, `get_edge_function`, `deploy_edge_function`).

| Function | Powers | Public? |
|---|---|---|
| `chat` (v17) | Site-wide **ProvBot** (FAQ, sermon search, meeting requests) | yes |
| `sermon-chat` (v1) | **"Ask this sermon"** per-sermon assistant (page-first, then broaden) | yes |
| `record-feedback` | ProvBot "how could I help more" feedback | yes |
| `ministry-interest` | Members-wiki **Ministry Interest Form** → Resend to Chris | yes |
| `marriage-intake` | `/marriage-intake/` counseling intake | yes |
| `philosophy-of-change` | `/philosophy-of-change/` survey | yes |
| `guest-connect` | `/seat/hello/` guest connect-card | yes |
| `bible-exam` | `/bible-exam/` scoring + study plan | yes |
| `self-sabotage` | `/self-sabotage/` self-assessment | yes |
| `duty-delight` | `/duty-delight/` worksheet | yes |
| `suffering-sheets` | Suffering worksheet resource | yes |
| `worksheet-share` | Emails completed worksheets (e.g. "When Silence Is Sin") to Chris | yes |
| `corpus-query` (JWT) | Corpus MCP query endpoint | no (JWT) |
| `preflight-check` (JWT) | Pipeline preflight (the one fn whose source IS in this repo) | no (JWT) |
| `onboarding-notify` | Shepherd's Guild lead notifications (sibling product, not the church site) | yes |

**Shared infra used by chat/sermon-chat:** RPCs `bot_search_sermons`, `bot_recent_sermons`,
`chat_usage`; tables `sermons`, `units`, `sermon_artifacts`, `faq_content`, `bot_topics`,
`chat_sessions`, `chat_messages`, `reference_units` (Pink/Spurgeon/Watson/Morgan corpus),
`availability_slots`, `appointment_requests`, `guest_connections`.

> ⚠️ Three tables have **RLS disabled**: `self_serve_jobs`, `bot_topics`, `reference_units`.
> They're readable/writable with the anon key. Intentional for now, but worth revisiting.

---

## 8. Automation (launchd crons on this Mac)

All run from `~/shepherds-guild/pipeline copy 2/`.

| Job (plist) | Runs | Schedule | Purpose |
|---|---|---|---|
| `org.sovgracekc.churchsermons` | `update_church_sermons.py` | Mon 12:00 | Refresh the `sovgracekc.org/sermons/` list (writes `src/data/recent-sermons.json`; Supabase = source of truth). |
| `org.sovgracekc.sermonextract` | `YoutubeExtractfiles/run_weekly.sh` | Mon 07:00 | Weekly YouTube extract step. |
| `com.shepherdsguild.weekly` | `weekly_ingest.py weekly` | Sun 19:00 | Weekly sermon ingest (discover → transcribe → decompose → render → deploy). |
| `com.shepherdsguild.cogwatch` | `scripts/watch_cog_and_process.py` | 16:00 / 18:00 / 20:00 daily | Auto-process Cross of Grace uploads. |
| `com.shepherdsguild.catchup` | catch-up ingest | — | Backfill missed ingests. |
| `com.shepherdsguild.selfserve` | self-serve job poller | — | The public "drop MP3 → emailed report" queue. |

---

## 9. Procedures index (quick reference)

| I want to… | Do this |
|---|---|
| Deploy a church-site content change | edit `sovgracekc-site/src/**` → `npm run build` → `wrangler pages deploy dist --project-name=sovgracekc --branch=main --commit-dirty=true` |
| Update the members wiki | edit Obsidian notes / `members_assets/` → `python3 generate_members_wiki.py` → build + deploy site |
| Rotate the members password | set Pages env var `MEMBERS_PASSWORD` (or edit `DEFAULT_PASSWORD` in `_middleware.js`) → redeploy |
| Re-render one sermon page | `generate_sermon_pages.py render <id>` → `deploy_sermon_pages.py --sermon-ids <id>` |
| Roll the Ask-this-sermon widget to all Providence pages | `generate_sermon_pages.py render-all --church <providence_id>` → `deploy_sermon_pages.py --all-stale` |
| Change an edge function | edit source → `deploy_edge_function` (Supabase MCP) → curl-test |
| Publish this week's `/seat/` bulletin | run the `weekly-bulletin` skill (gather → draft `bulletin.json` → review → `scripts/publish_bulletin.py`) — full workflow in [§6](#6-the-seat-weekly-bulletin-pipeline) |
| Add an Isaiah-series page | drop HTML in the series, add to `ORDER` in `wire_nations.py`, re-run, build + deploy |

---

## 10. Gaps / risks / recommended fixes

1. **`sovgracekc-site` has no GitHub remote.** The church website's source exists only
   in local git on this Mac. **Fix:** create a private `coswald75/sovgracekc-site` repo
   and push. (Confirm `.gitignore` excludes `.env`, `dist/`, `node_modules/` first.)
2. **Church build scripts are untracked in the pipeline repo** (`generate_members_wiki.py`,
   `publish_bulletin.py`, `update_church_sermons.py`, `members_assets/`, and `wire_nations.py`
   which lives only in a scratchpad). **Fix:** review and `git add` the real tooling (not
   scratch/one-off files), commit, push. Do **not** bulk-add all 109 untracked files.
3. **Edge-function source isn't in any repo.** The ~12 church functions live only as deployed
   Supabase code. **Fix:** vendor each function's `index.ts` into `pipeline copy 2/supabase/functions/<slug>/`
   so they're recoverable and diffable.
4. **Pipeline repo is on a feature branch** (`claude/sproul-ligonier-ingest`), not `main`.
   Worth merging/PRing so `main` reflects reality.
5. **Secrets hygiene:** confirm no `.env` is ever staged; all keys stay in Cloudflare/Supabase secrets.

> These are recommendations, not done. Committing/pushing and creating remotes are
> outward-facing actions — do them only on Chris's go-ahead.
