// GET /members/scheduler/token
// Hands the scheduler page its members token so it can call the Supabase
// scheduler-api. This route sits under /members/, so functions/members/_middleware.js
// has already verified the member (the page is only reachable when logged in).
// The token equals HMAC(MEMBERS_PASSWORD, "providence-members-v1") — identical to
// the /members/ gate cookie and to what scheduler.config stores server-side.

export async function onRequest(context) {
  const password = (context.env && context.env.MEMBERS_PASSWORD) || "";
  const headers = { "content-type": "application/json", "cache-control": "no-store" };
  if (!password) {
    return new Response(JSON.stringify({ error: "not configured" }), { status: 500, headers });
  }
  const key = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(password),
    { name: "HMAC", hash: "SHA-256" }, false, ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode("providence-members-v1"));
  const token = [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("");
  return new Response(JSON.stringify({ token }), { headers });
}
