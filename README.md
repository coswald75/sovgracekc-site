# sovgracekc — Providence Community Church website

The website and church-specific tooling for **Providence Community Church**
(sovgracekc.org). Astro static site + Cloudflare Pages, with the members wiki,
the weekly bulletin, ProvBot, forms, and the Isaiah series.

> **Full architecture & operations:** see [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).
> It documents every surface, how each is built and deployed, the backend, the
> automation, and a procedures index. Start there.

## Repo layout

```
.
├── src/                      # Astro site (pages, layouts; Base.astro = primary menu)
├── public/                   # static assets served as-is
│   ├── chat-widget.js        #   site-wide ProvBot widget
│   └── members/              #   GENERATED members wiki — git-ignored (real member data)
├── functions/                # Cloudflare Pages Functions
│   └── members/_middleware.js#   the /members/ password gate (password = Cloudflare secret MEMBERS_PASSWORD)
├── scripts/                  # church-specific build tooling (moved here from the pipeline repo)
│   ├── generate_members_wiki.py   # Obsidian ministry notes → public/members/
│   ├── members_assets/            #   standalone member HTML docs (e.g. Discerning or Earning?)
│   ├── publish_bulletin.py        # build + deploy the /seat/ weekly bulletin
│   ├── update_church_sermons.py   # refresh the /sermons/ list from Supabase (weekly cron)
│   ├── .env                       #   real keys — GIT-IGNORED
│   └── .env.example               #   the keys the scripts need (no values)
├── supabase/functions/       # backend edge-function source (see its README for the full inventory)
└── docs/                     # ARCHITECTURE.md, FORMS.md, PROVBOT-SPEC.md
```

## Build & deploy the site

```bash
npm install
npm run build
npx wrangler pages deploy dist --project-name=sovgracekc --branch=main --commit-dirty=true
```
Deploy also compiles `./functions` (the members gate). `--branch=main` is required —
without it, wrangler publishes a throwaway preview instead of production.

## Common tasks

| Task | Command |
|---|---|
| Regenerate the members wiki | `python3 scripts/generate_members_wiki.py` → build + deploy |
| Publish this week's bulletin | draft `src/data/bulletin.json` → `python3 scripts/publish_bulletin.py` |
| Refresh the sermons list | `python3 scripts/update_church_sermons.py` (also runs Mon 12:00 via launchd) |
| Rotate the members password | `wrangler pages secret put MEMBERS_PASSWORD --project-name=sovgracekc` |

## What lives elsewhere (not in this repo)

- **Backend** = Supabase project `twbunmbzyqcqzgffdrib` (edge functions + DB). See `supabase/functions/README.md`.
- **Sermon pages** (sermonsteward.com) + the shared multi-church rendering engine = the
  `shepherds-guild-pipeline` repo. Providence's sermon pages are hosted on Sermon Steward,
  linked from `/sermons/`.
- **Members wiki source content** = the Obsidian vault `~/Obsidian/Sermon_Vault/Providence 2627/`
  (private). `public/members/` is generated from it and intentionally not committed.

## Secrets

No secret values live in this repo. Keys live in `scripts/.env` (git-ignored),
Cloudflare Pages secrets (`MEMBERS_PASSWORD`), and Supabase function env. The only
key in committed client code is the Supabase **anon** key (public by design, RLS-protected).
