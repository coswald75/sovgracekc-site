// Shared helpers for the church forms (community group, huddle, child dedication, potluck).
// Pattern = functions/api/sunday-visit.js: validate → store → email via Resend.
// Emails are plain text (no HTML), so there is nothing to HTML-escape; subjects are stripped of line breaks.
// Storage = Supabase REST with the service-role key; every table has RLS ON and NO policies,
// so only the server (service role) can read/write. Browsers never see a key.
//
// Cloudflare Pages secrets (values are never committed; this repo is public):
//   RESEND_API_KEY, RESEND_FROM            — same as the /visit/ form
//   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
//   FORMS_ROUTING  — JSON with leader emails (each value may be a string or a list), e.g.
//     {"dov":"…","potluck":"…",
//      "cc":["…","…"]}            ← "cc" is copied on EVERY form notification
//   (kept out of the repo so personal emails are not public)

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

export function s(v, max = 500) {
  return String(v == null ? "" : v).trim().slice(0, max);
}

export const oneLine = (v) => String(v == null ? "" : v).replace(/[\u0000-\u001f\u007f\u2028\u2029]+/g, " ").trim();

// Cheap request guard for POSTs: same-origin only (when the browser sends Origin) and a body-size cap.
export function guard(request) {
  const origin = request.headers.get("origin");
  if (origin) {
    let ok = false;
    try { ok = new URL(origin).host === new URL(request.url).host; } catch {}
    if (!ok) return json(403, { error: "forbidden" });
  }
  const len = Number(request.headers.get("content-length") || 0);
  if (len > 30000) return json(413, { error: "That submission is too large." });
  return null;
}

// Flood cap (no KV/rate-limit binding on Pages): refuse when `max` rows already landed in `minutes`.
// Fails open if Supabase can't be queried, so a hiccup never blocks a real submission.
export async function throttled(env, table, max = 20, minutes = 10) {
  try {
    const since = new Date(Date.now() - minutes * 60000).toISOString();
    const rows = await sbSelect(env, `${table}?created_at=gte.${encodeURIComponent(since)}&select=id&limit=${max}`);
    return rows.length >= max;
  } catch { return false; }
}
export const TOO_MANY = "We're getting a lot of submissions right now. Please try again in a few minutes, or email info@kcprovidence.org.";

export async function readBody(request) {
  const ctype = (request.headers.get("content-type") || "").toLowerCase();
  if (ctype.includes("application/json")) {
    const d = await request.json();
    return d && typeof d === "object" ? d : {};
  }
  const fd = await request.formData();
  const d = {};
  for (const [k, v] of fd.entries()) d[k] = typeof v === "string" ? v : "";
  return d;
}

export function honeypot(input) {
  return !!s(input.website || input.company || input.fax);
}

export function routing(env) {
  try { return JSON.parse((env && env.FORMS_ROUTING) || "{}"); } catch { return {}; }
}

export function configured(env) {
  return !!(env && env.RESEND_API_KEY && env.RESEND_FROM && env.SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY);
}

// Server-side only. Legacy service_role JWTs go in both headers; new sb_secret_ keys are not JWTs, so apikey only.
function sbHeaders(env, extra = {}) {
  const k = env.SUPABASE_SERVICE_ROLE_KEY;
  const h = { apikey: k, ...extra };
  if (!k.startsWith("sb_")) h.Authorization = `Bearer ${k}`;
  return h;
}

export async function sbInsert(env, table, row, returning = false) {
  const res = await fetch(`${env.SUPABASE_URL}/rest/v1/${table}`, {
    method: "POST",
    headers: sbHeaders(env, { "Content-Type": "application/json", Prefer: returning ? "return=representation" : "return=minimal" }),
    body: JSON.stringify(row),
  });
  if (!res.ok) throw new Error(`supabase ${res.status}`);
  return returning ? res.json() : null;
}

export async function sbDelete(env, pathAndQuery) {
  const res = await fetch(`${env.SUPABASE_URL}/rest/v1/${pathAndQuery}`, { method: "DELETE", headers: sbHeaders(env) });
  if (!res.ok) throw new Error(`supabase ${res.status}`);
}

export async function sbSelect(env, pathAndQuery) {
  const res = await fetch(`${env.SUPABASE_URL}/rest/v1/${pathAndQuery}`, { headers: sbHeaders(env) });
  if (!res.ok) throw new Error(`supabase ${res.status}`);
  return res.json();
}

const flat = (v) => [].concat(v || []).flat(Infinity).map((x) => String(x || "").trim()).filter((x) => EMAIL_RE.test(x));

export async function sendEmail(env, { to, replyTo, subject, text }) {
  const list = [...new Set(flat(to))];
  const cc = [...new Set(flat(routing(env).cc))].filter((x) => !list.includes(x));
  if (!list.length && !cc.length) return false;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: env.RESEND_FROM, to: list.length ? list : cc, cc: list.length && cc.length ? cc : undefined, reply_to: replyTo || undefined, subject: oneLine(subject).slice(0, 200), text }),
  });
  return res.ok;
}

export const NOT_CONFIGURED = "This form isn't switched on yet. Please email info@kcprovidence.org.";
