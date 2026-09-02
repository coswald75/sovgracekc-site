// POST /api/sunday-visit
// "I'm coming this Sunday" form on /visit/ → email chris@sovgracekc.org via Resend.
//
// Cloudflare Pages secrets (never commit values; this repo is public):
//   wrangler pages secret put RESEND_API_KEY --project-name=sovgracekc
//   wrangler pages secret put RESEND_FROM --project-name=sovgracekc
// RESEND_FROM must be a verified sender, e.g.
//   Providence Community Church <reports@sermonsteward.com>
// Same variable names are listed in scripts/.env.example.

const TO = "chris@sovgracekc.org";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_RE = /^(\d{4})-(\d{2})-(\d{2})$/;

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

function asString(value) {
  return String(value == null ? "" : value).trim();
}

function isSundayYmd(ymd) {
  const m = DATE_RE.exec(ymd);
  if (!m) return false;
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  const dt = new Date(Date.UTC(y, mo - 1, d));
  return dt.getUTCFullYear() === y && dt.getUTCMonth() === mo - 1 && dt.getUTCDate() === d && dt.getUTCDay() === 0;
}

function formatSunday(ymd) {
  const m = DATE_RE.exec(ymd);
  if (!m) return ymd;
  const dt = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
  return dt.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

export function validateVisit(input) {
  const honeypot = asString(input.website || input.company || input.fax);
  if (honeypot) return { ok: false, status: 400, error: "invalid", honeypot: true };

  const name = asString(input.name);
  const email = asString(input.email).toLowerCase();
  const sunday = asString(input.sunday);
  const kidsRaw = asString(input.kids).toLowerCase();

  if (!name || name.length > 120) return { ok: false, status: 400, error: "Please enter your name." };
  if (!EMAIL_RE.test(email) || email.length > 200) return { ok: false, status: 400, error: "Please enter a valid email address." };
  if (!isSundayYmd(sunday)) return { ok: false, status: 400, error: "Please choose a Sunday." };
  if (kidsRaw !== "yes" && kidsRaw !== "no") return { ok: false, status: 400, error: "Please tell us if kids are coming." };

  return { ok: true, name, email, sunday, kids: kidsRaw };
}

async function readBody(request) {
  const ctype = (request.headers.get("content-type") || "").toLowerCase();
  if (ctype.includes("application/json")) {
    const data = await request.json();
    return data && typeof data === "object" ? data : {};
  }
  const fd = await request.formData();
  const data = {};
  for (const [k, v] of fd.entries()) data[k] = typeof v === "string" ? v : "";
  return data;
}

export async function onRequest(context) {
  const { request, env } = context;
  if (request.method !== "POST") return json(405, { error: "method not allowed" });

  let parsed;
  try {
    parsed = validateVisit(await readBody(request));
  } catch {
    return json(400, { error: "invalid" });
  }
  if (!parsed.ok) return json(parsed.status, { error: parsed.error });

  const apiKey = env && env.RESEND_API_KEY;
  const from = env && env.RESEND_FROM;
  if (!apiKey || !from) {
    return json(500, { error: "Visit form is not configured yet. Please email chris@sovgracekc.org." });
  }

  const sundayLabel = formatSunday(parsed.sunday);
  const kidsLabel = parsed.kids === "yes" ? "Yes" : "No";
  const subject = `Sunday visit: ${parsed.name} — ${parsed.sunday}`;
  const text = [
    "Someone is planning a Sunday visit at Providence Community Church, Lenexa.",
    "",
    `Name: ${parsed.name}`,
    `Email: ${parsed.email}`,
    `Sunday: ${sundayLabel} (${parsed.sunday})`,
    `Kids coming: ${kidsLabel}`,
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [TO],
      reply_to: parsed.email,
      subject,
      text,
    }),
  });

  if (!res.ok) {
    return json(502, { error: "Could not send your note. Please try again or email chris@sovgracekc.org." });
  }

  return json(200, { ok: true });
}
