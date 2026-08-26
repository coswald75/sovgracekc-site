// Scheduler API (Plan C) — Supabase Edge Function.
//
// Serves the volunteer scheduler under the church's members area. Talks to the
// isolated `scheduler` schema over a DIRECT Postgres connection (SUPABASE_DB_URL),
// so the schema never has to be exposed to the Data API.
//
// Auth: every data action requires the members token in `x-members-token`,
// which equals HMAC-SHA256(MEMBERS_PASSWORD, "providence-members-v1") — the same
// token the /members/ Cloudflare gate issues. MEMBERS_PASSWORD must be set as a
// Supabase function secret. Fails CLOSED if it is unset. `action=health` is the
// only ungated action and returns no member data.
//
// Deploy: MCP deploy_edge_function (verify_jwt=false; auth is the members token).

import postgres from "https://deno.land/x/postgresjs@v3.4.4/mod.js";

const sql = postgres(Deno.env.get("SUPABASE_DB_URL")!, { prepare: false });

const ALLOW_ORIGIN = "https://sovgracekc.org";
const cors = {
  "Access-Control-Allow-Origin": ALLOW_ORIGIN,
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "content-type, x-members-token",
  "Access-Control-Allow-Credentials": "true",
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", ...cors },
  });
}

async function membersToken(password: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(password),
    { name: "HMAC", hash: "SHA-256" }, false, ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode("providence-members-v1"));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

async function isMember(req: Request): Promise<boolean> {
  const password = Deno.env.get("MEMBERS_PASSWORD");
  if (!password) return false; // fail closed if the shared secret isn't configured
  const provided = req.headers.get("x-members-token") ?? "";
  if (!provided) return false;
  return timingSafeEqual(provided, await membersToken(password));
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });

  const url = new URL(req.url);
  const action = url.searchParams.get("action") ?? "health";

  try {
    // Ungated health check — DB connectivity only, no member data.
    if (action === "health") {
      const [{ count }] = await sql`select count(*)::int as count from scheduler.services`;
      return json({ ok: true, services: count });
    }

    // Everything else requires a valid members token.
    if (!(await isMember(req))) return json({ error: "Not authenticated" }, 401);

    if (action === "directory") {
      const rows = await sql`
        select id, trim(coalesce(first_name,'') || ' ' || coalesce(last_name,'')) as name,
               is_free_text
        from scheduler.people order by first_name, last_name`;
      return json({ people: rows });
    }

    if (action === "ministries") {
      const rows = await sql`
        select m.id, m.name,
               coalesce(json_agg(json_build_object('id', r.id, 'name', r.name,
                 'needed_count', r.needed_count, 'required', r.required)
                 order by r.sort_order, r.name) filter (where r.id is not null), '[]') as roles
        from scheduler.ministries m
        left join scheduler.roles r on r.ministry_id = m.id
        group by m.id order by m.name`;
      return json({ ministries: rows });
    }

    if (action === "schedule") {
      const teamId = url.searchParams.get("ministry_id");
      const rows = await sql`
        select s.id as service_id, s.service_date, s.title, s.status,
               a.id as assignment_id, a.slot_index, a.status as assignment_status,
               r.id as role_id, r.name as role_name, r.required, r.needed_count,
               m.id as ministry_id, m.name as ministry_name,
               a.person_id,
               trim(coalesce(p.first_name,'') || ' ' || coalesce(p.last_name,'')) as person_name
        from scheduler.services s
        join scheduler.assignments a on a.service_id = s.id
        join scheduler.roles r on a.role_id = r.id
        join scheduler.ministries m on r.ministry_id = m.id
        left join scheduler.people p on a.person_id = p.id
        ${teamId ? sql`where m.id = ${Number(teamId)}` : sql``}
        order by s.service_date, m.name, r.sort_order, r.name, a.slot_index`;
      return json({ rows });
    }

    if (action === "assign" && req.method === "POST") {
      const body = await req.json();
      const assignmentId = Number(body.assignment_id);
      const personId = body.person_id === null || body.person_id === undefined
        ? null : Number(body.person_id);
      const status = personId ? "pending" : "pending";
      if (!assignmentId) return json({ error: "assignment_id required" }, 400);
      await sql`update scheduler.assignments
                set person_id = ${personId}, status = ${status}
                where id = ${assignmentId}`;
      return json({ ok: true });
    }

    return json({ error: "unknown action" }, 400);
  } catch (e) {
    return json({ error: "server error", detail: String(e) }, 500);
  }
});
