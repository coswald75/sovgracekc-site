# Supabase Edge Functions — Providence church backend

All church-facing backend logic runs as **Supabase Edge Functions** in project
**`twbunmbzyqcqzgffdrib`** (region + keys managed in the Supabase dashboard). The
static site (this repo) and the Sermon Steward sermon pages call these functions;
**no backend logic lives in Cloudflare.**

> **Source of truth = Supabase.** Each function is deployed and version-numbered in
> Supabase. This directory vendors source for reference/editing. As of the initial
> consolidation only `sermon-chat/` is checked in (it's the newest, fully self-
> contained, and has no secrets); the rest are inventoried below and can be exported
> from Supabase on demand. **Before checking any function in, strip hardcoded secret
> fallbacks** (see the hygiene note at the bottom) — this repo is public.

## Inventory (all public unless noted)

| Slug | Powers | JWT | Notes |
|---|---|---|---|
| `chat` | Site-wide **ProvBot** (FAQ, sermon search, meeting requests) | none | ⚠️ has a hardcoded Resend key fallback — strip before vendoring. |
| `sermon-chat` | **"Ask this sermon"** per-sermon assistant (page-first → broaden) | none | ✅ vendored here. No secrets. |
| `record-feedback` | ProvBot "how could I help more" feedback | none | |
| `ministry-interest` | Members-wiki Ministry Interest Form → Resend to Chris | none | |
| `marriage-intake` | `/marriage-intake/` counseling intake → Resend | none | |
| `philosophy-of-change` | `/philosophy-of-change/` survey → Resend | none | |
| `guest-connect` | `/seat/hello/` guest connect card | none | |
| `bible-exam` | `/bible-exam/` scoring + study plan | none | |
| `self-sabotage` | `/self-sabotage/` self-assessment | none | |
| `duty-delight` | `/duty-delight/` worksheet | none | |
| `suffering-sheets` | Suffering worksheet resource | none | |
| `worksheet-share` | Emails completed worksheets to Chris | none | |
| `onboarding-notify` | Shepherd's Guild lead notifications (sibling product) | none | not the church site |
| `corpus-query` | Corpus MCP query endpoint | JWT | |
| `preflight-check` | Sermon-pipeline preflight | JWT | lives in the pipeline repo, not here |

## Shared infra these depend on

- **RPCs:** `bot_search_sermons`, `bot_recent_sermons`, `chat_usage`
- **Tables:** `sermons`, `units`, `sermon_artifacts`, `faq_content`, `bot_topics`,
  `chat_sessions`, `chat_messages`, `reference_units` (Pink/Spurgeon/Watson/Morgan
  public-domain corpus), `availability_slots`, `appointment_requests`, `guest_connections`
- **Secrets (Supabase function env):** `ANTHROPIC_API_KEY`, `VOYAGE_API_KEY`,
  `RESEND_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`

## How to export / edit / deploy a function

These functions are managed through the **Supabase MCP** (or the dashboard):

- **Export a function's source:** dashboard → Edge Functions → *slug* → Code, or via
  MCP `get_edge_function(project_id, slug)`. Save to `supabase/functions/<slug>/index.ts`.
- **Deploy after editing:** MCP `deploy_edge_function(project_id, name, files, verify_jwt)`.
  Public functions use `verify_jwt=false` and set CORS `Access-Control-Allow-Origin: *`.
- **Test:** `curl -X POST https://twbunmbzyqcqzgffdrib.supabase.co/functions/v1/<slug> -H 'Content-Type: application/json' -d '{...}'`

## Secret hygiene (this repo is public)

Functions read secrets from `Deno.env.get(...)`. Some older functions ALSO carry a
**hardcoded fallback** (e.g. `Deno.env.get("RESEND_API_KEY") || "re_live_xxx"`). Those
fallbacks are real keys — **remove them before checking a function into this repo**, and
ensure the secret is set in the Supabase function environment instead. The only Supabase
key that may appear in committed *client* code is the **anon** key (public by design).
