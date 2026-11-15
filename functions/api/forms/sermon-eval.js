// POST /api/forms/sermon-eval — ANONYMOUS sermon listening feedback (/eval/, unlisted).
// Store first (public.form_sermon_eval, service role, RLS on / no policies), then email Chris ONLY via Resend.
// Anonymous by design: no name/email fields, and NO IP, user-agent or other request metadata is stored or emailed.
// Deliberately does NOT use sendEmail() from _lib/forms.js, because that copies the FORMS_ROUTING "cc" list.
// Spam: honeypot field + minimum time-to-submit + flood cap.
import { json, s, readBody, honeypot, configured, guard, throttled, TOO_MANY, sbInsert, NOT_CONFIGURED } from "../../_lib/forms.js";

const TO = "chris@sovgracekc.org";
const FORM = "dov-2026-11-15";
const SUBJECT = "Sermon feedback — Dov Nov 15";
const MIN_MS = 8000; // a real listener can't finish in under 8 seconds

export const QUESTIONS = [
  ["The text", 1, "The sermon explained what the parable actually says and means in Jesus' setting."],
  ["The text", 2, "The main point came from the passage itself, not just from a topic laid on top of it."],
  ["The text", 3, "I could tell why the third servant was judged, and the sermon handled that hard part honestly."],
  ["The gospel", 4, "Jesus Christ and his work were clearly at the center, not only a moral lesson about effort."],
  ["The gospel", 5, "I heard both the call to faithfulness and the grace that makes faithfulness possible."],
  ["Clarity", 6, "I could say the main point in one sentence."],
  ["Clarity", 7, "The sermon was easy to follow from start to finish."],
  ["Application", 8, "I know what faithfulness with what God has given me looks like this week."],
  ["Application", 9, "The application was backed by Scripture, not just good advice."],
  ["Application", 10, "It spoke to my heart and motives, not only my behavior."],
  ["Delivery", 11, "Dov spoke with warmth and conviction, and I wanted to keep listening."],
  ["Engaging", 12, "Compared with other sermons I've listened to, I found it easy to stay locked in on the speaker."],
];
export const TEXTS = [
  ["helped", "What helped you most?"],
  ["stronger", "One thing that would make it even clearer or stronger."],
  ["unclear", "Anything that seemed unclear or off from the text?"],
];
const scaleNote = (n) => (n === 12 ? "1 = harder than usual, 3 = about the same, 5 = much easier" : "1 = not really, 3 = somewhat, 5 = clearly yes");

export function validate(i) {
  if (honeypot(i)) return { ok: false, spam: true };
  const elapsed = Number(i.elapsed_ms);
  if (!Number.isFinite(elapsed) || elapsed < MIN_MS) return { ok: false, status: 400, error: "That was quick! Please take a moment with the questions, then press Submit again." };
  const ratings = {};
  for (const [, n] of QUESTIONS) {
    const v = s(i[`q${n}`], 2);
    if (v === "") continue;
    const k = Number(v);
    if (!Number.isInteger(k) || k < 1 || k > 5) return { ok: false, status: 400, error: "invalid" };
    ratings[`q${n}`] = k;
  }
  const out = { ratings, main_point: s(i.main_point, 500) };
  for (const [k] of TEXTS) out[k] = s(i[k], 4000);
  const any = Object.keys(ratings).length || out.main_point || TEXTS.some(([k]) => out[k]);
  if (!any) return { ok: false, status: 400, error: "Please answer at least one question before you submit." };
  out.is_test = [out.main_point, ...TEXTS.map(([k]) => out[k])].some((t) => t && t.startsWith("TEST"));
  return { ok: true, ...out };
}

function sbHeaders(env, extra = {}) {
  const k = env.SUPABASE_SERVICE_ROLE_KEY;
  const h = { apikey: k, ...extra };
  if (!k.startsWith("sb_")) h.Authorization = `Bearer ${k}`;
  return h;
}

export function emailText(p, when) {
  const L = [];
  if (p.is_test) L.push("*** TEST SUBMISSION — not a real listener ***", "");
  L.push("Anonymous sermon listening feedback", "Dov · Sunday, Nov 15, 2026 · Matthew 25:14–30, the parable of the talents", `Received: ${when}`, "");
  let sec = "";
  for (const [section, n, q] of QUESTIONS) {
    if (section !== sec) { sec = section; L.push(`— ${section} —`); }
    const r = p.ratings[`q${n}`];
    L.push(`${n}. ${q}`, `   Rating: ${r ? `${r} / 5` : "(no answer)"}   [${scaleNote(n)}]`);
    if (n === 6) L.push(`   Main point in one sentence: ${p.main_point || "(no answer)"}`);
    L.push("");
  }
  L.push("— In your own words —");
  for (const [k, q] of TEXTS) L.push(q, `   ${p[k] || "(no answer)"}`, "");
  L.push("(No name, email, IP address or device details were collected.)");
  return L.join("\n");
}

export async function onRequest({ request, env }) {
  if (request.method !== "POST") return json(405, { error: "method not allowed" });
  { const g = guard(request); if (g) return g; }
  let p; try { p = validate(await readBody(request)); } catch { return json(400, { error: "invalid" }); }
  if (p.spam) return json(200, { ok: true }); // honeypot: pretend success, store nothing
  if (!p.ok) return json(p.status, { error: p.error });
  if (!configured(env)) return json(500, { error: NOT_CONFIGURED });
  if (await throttled(env, "form_sermon_eval", 30, 10)) return json(429, { error: TOO_MANY });

  let row;
  try {
    [row] = await sbInsert(env, "form_sermon_eval", {
      form: FORM, ratings: p.ratings, main_point: p.main_point || null,
      helped: p.helped || null, stronger: p.stronger || null, unclear: p.unclear || null, is_test: p.is_test,
    }, true);
  } catch { return json(502, { error: "Sorry, we couldn't save your answers. Please try again in a minute." }); }

  const when = new Date().toLocaleString("en-US", { timeZone: "America/Chicago", dateStyle: "medium", timeStyle: "short" }) + " CT";
  let sent = false;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: env.RESEND_FROM, to: [TO], subject: SUBJECT, text: emailText(p, when) }),
    });
    sent = res.ok;
  } catch {}
  if (sent && row && row.id) {
    try {
      await fetch(`${env.SUPABASE_URL}/rest/v1/form_sermon_eval?id=eq.${row.id}`, {
        method: "PATCH", headers: sbHeaders(env, { "Content-Type": "application/json", Prefer: "return=minimal" }),
        body: JSON.stringify({ emailed: true }),
      });
    } catch {}
  }
  return json(200, { ok: true }); // saved either way; the email is a convenience copy
}
