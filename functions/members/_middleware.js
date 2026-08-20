// Shared-password gate for /members/*  (Providence members wiki).
// A branded password screen sets a signed cookie; correct password lets you in.
// The password is read ONLY from the Cloudflare Pages env var MEMBERS_PASSWORD
// (set via `wrangler pages secret put MEMBERS_PASSWORD --project-name=sovgracekc`).
// No password is hardcoded here — this repo is public. If the env var is ever
// unset the gate fails CLOSED (denies everyone) rather than exposing the wiki.
const COOKIE = "pcc_members";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

async function token(password) {
  // deterministic per-password HMAC; changing the password invalidates old cookies
  const key = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(password),
    { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode("providence-members-v1"));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function loginPage(pathname, error) {
  const err = error
    ? '<p style="color:#9c2b21;font-size:.9rem;margin:0 0 12px">That password wasn’t right. Try again.</p>'
    : "";
  const nextVal = String(pathname || "/members/").replace(/"/g, "&quot;");
  const body = `<!doctype html><html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex"><title>Members — Providence Community Church</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400;6..72,600&display=swap" rel="stylesheet">
<style>
:root{--ink:#262626;--gray:#6b6b63;--line:#e2dfd8;--greige-light:#ede8e2;--accent:#075c2e;
--serif:'Newsreader',Georgia,serif;--sans:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif}
*{box-sizing:border-box}body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;
background:var(--greige-light);color:var(--ink);font-family:var(--serif);padding:24px}
.card{background:#fff;border:1px solid var(--line);border-radius:16px;padding:40px 34px;max-width:400px;width:100%;text-align:center;
box-shadow:0 12px 40px rgba(0,0,0,.06)}
img{height:56px;width:auto;filter:grayscale(1) brightness(.35);margin-bottom:14px}
h1{font-weight:600;font-size:1.5rem;margin:0 0 4px}
.sub{font-family:var(--sans);font-size:.85rem;color:var(--gray);margin:0 0 22px}
input{width:100%;padding:12px 14px;border:1px solid var(--line);border-radius:10px;font-family:var(--sans);
font-size:1rem;background:#faf9f5;margin-bottom:12px;text-align:center}
input:focus{outline:2px solid var(--accent);outline-offset:1px}
button{width:100%;padding:12px 20px;border:none;border-radius:10px;background:var(--accent);color:#fff;
font-family:var(--sans);font-weight:600;font-size:1rem;cursor:pointer}
.note{font-family:var(--sans);font-size:.78rem;color:var(--gray);margin-top:16px;line-height:1.5}
.note a{color:var(--accent)}
</style></head><body>
<form class="card" method="POST" action="/members/?__login=1" autocomplete="on">
<img src="/wp-content/uploads/providence-tree-mark-navy.png" alt="">
<h1>Providence Members</h1>
<p class="sub">This area is for members of Providence Community Church.</p>
${err}
<input type="text" name="username" value="Providence Member" autocomplete="username" tabindex="-1" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0">
<input type="hidden" name="next" value="${nextVal}">
<input type="password" name="password" placeholder="Members password" autocomplete="current-password" autocapitalize="none" autocorrect="off" spellcheck="false" required>
<button type="submit">Enter</button>
<p class="note">Don’t have the password? Email <a href="mailto:info@kcprovidence.org">info@kcprovidence.org</a>.</p>
</form></body></html>`;
  return new Response(body, { status: error ? 401 : 200, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } });
}

export async function onRequest(context) {
  const { request, env, next } = context;
  const password = (env && env.MEMBERS_PASSWORD) || "";  // no hardcoded fallback (public repo)
  const url = new URL(request.url);
  const good = await token(password);

  // login submission
  if (request.method === "POST" && url.searchParams.get("__login") === "1") {
    let pw = "", nxt = "/members/";
    try {
      const fd = await request.formData();
      pw = String(fd.get("password") || "");
      nxt = String(fd.get("next") || "/members/");
    } catch (e) {}
    // Only ever redirect back inside /members/ (no open redirect).
    if (!/^\/members\//.test(nxt) || nxt.indexOf("..") !== -1) nxt = "/members/";
    // Forgiving compare: members on phones often add a trailing space or mis-case.
    // The password is a low-security shared key, so normalize whitespace + case.
    const norm = (s) => String(s || "").replace(/\s+/g, "").toLowerCase();
    // Fail closed: never accept when no password is configured (empty === empty).
    if (password && norm(pw) === norm(password)) {
      const headers = new Headers({ "Location": nxt });
      headers.append("Set-Cookie",
        `${COOKIE}=${good}; Path=/members/; HttpOnly; Secure; SameSite=Lax; Max-Age=${MAX_AGE}`);
      return new Response(null, { status: 302, headers });
    }
    return loginPage(nxt, true);
  }

  // already authorized?
  const cookie = request.headers.get("Cookie") || "";
  const m = cookie.match(new RegExp(`(?:^|;\\s*)${COOKIE}=([a-f0-9]+)`));
  if (m && m[1] === good) return next();

  return loginPage(url.pathname, false);
}
