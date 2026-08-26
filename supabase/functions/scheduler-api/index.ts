// Scheduler API (Plan C) — Supabase Edge Function.
//
// Serves the volunteer scheduler under the church's members area. Talks to the
// isolated `scheduler` schema over a DIRECT Postgres connection (SUPABASE_DB_URL),
// so the schema never has to be exposed to the Data API.
//
// Auth: every data action requires the members token in `x-members-token`,
// which equals HMAC-SHA256(MEMBERS_PASSWORD, "providence-members-v1") — the same
// token the /members/ Cloudflare gate issues. The expected token is stored in the
// scheduler.config table (no Supabase env secret needed); fails CLOSED if absent.
// `action=health` is the only ungated action and returns no member data.
// `action=publish` writes one Sunday roster to the HQ Basecamp schedule.
//
// Deploy: MCP deploy_edge_function (verify_jwt=false; auth is the members token).

import postgres from "https://deno.land/x/postgresjs@v3.4.4/mod.js";

const sql = postgres(Deno.env.get("SUPABASE_DB_URL")!, { prepare: false });

// Allow the church site plus localhost for local development. Access is gated by
// the members token regardless of origin, so this only controls browser CORS.
function corsFor(req: Request): Record<string, string> {
  const origin = req.headers.get("Origin") ?? "";
  const allowed = origin === "https://sovgracekc.org" || /^http:\/\/localhost(:\d+)?$/.test(origin);
  return {
    "Access-Control-Allow-Origin": allowed ? origin : "https://sovgracekc.org",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "content-type, x-members-token",
    "Vary": "Origin",
  };
}

function json(body: unknown, status: number, req: Request): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", ...corsFor(req) },
  });
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

// The expected members token lives in scheduler.config (managed via the DB), so
// no Supabase env secret is needed. It equals HMAC(MEMBERS_PASSWORD,
// "providence-members-v1") — the same token the /members/ Cloudflare gate issues.
// Fails CLOSED if the config row is absent.
async function isMember(req: Request): Promise<boolean> {
  const provided = req.headers.get("x-members-token") ?? "";
  if (!provided) return false;
  const rows = await sql`select value from scheduler.config where key = 'members_token'`;
  if (!rows.length) return false;
  return timingSafeEqual(provided, rows[0].value as string);
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );
}

function iso(value: unknown): string {
  if (value instanceof Date) return value.toISOString();
  const raw = String(value ?? "");
  const d = new Date(raw);
  if (!Number.isNaN(d.getTime())) return d.toISOString();
  return raw;
}

async function loadConfig(): Promise<Record<string, string>> {
  const rows = await sql`select key, value from scheduler.config`;
  return Object.fromEntries(rows.map((r) => [r.key as string, r.value as string]));
}

async function refreshBasecampToken(cfg: Record<string, string>): Promise<Record<string, string>> {
  const expiresAt = cfg.basecamp_token_expires_at;
  const needsRefresh = expiresAt
    ? Date.now() > new Date(expiresAt).getTime() - 5 * 60 * 1000
    : false;
  if (!needsRefresh) return cfg;
  if (!cfg.basecamp_client_id || !cfg.basecamp_client_secret || !cfg.basecamp_refresh_token) {
    throw new Error("Basecamp token expired and refresh credentials are not in scheduler.config");
  }
  const body = new URLSearchParams({
    type: "refresh",
    refresh_token: cfg.basecamp_refresh_token,
    client_id: cfg.basecamp_client_id,
    client_secret: cfg.basecamp_client_secret,
  });
  const resp = await fetch("https://launchpad.37signals.com/authorization/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!resp.ok) throw new Error(`Basecamp token refresh failed (${resp.status})`);
  const data = await resp.json();
  const nextExpires = new Date(Date.now() + (data.expires_in ?? 1209600) * 1000).toISOString();
  const nextRefresh = data.refresh_token ?? cfg.basecamp_refresh_token;
  await sql`
    insert into scheduler.config (key, value) values
      ('basecamp_access_token', ${data.access_token}),
      ('basecamp_refresh_token', ${nextRefresh}),
      ('basecamp_token_expires_at', ${nextExpires})
    on conflict (key) do update set value = excluded.value, updated_at = now()`;
  return {
    ...cfg,
    basecamp_access_token: data.access_token,
    basecamp_refresh_token: nextRefresh,
    basecamp_token_expires_at: nextExpires,
  };
}

async function basecamp(
  cfg: Record<string, string>,
  method: string,
  path: string,
  jsonBody?: unknown,
): Promise<{ status: number; data: Record<string, unknown> }> {
  const url = `${cfg.basecamp_api_url.replace(/\/$/, "")}${path}`;
  const resp = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${cfg.basecamp_access_token}`,
      "User-Agent": cfg.basecamp_user_agent || "BasecampScheduler (chris@sovgracekc.org)",
      "Content-Type": "application/json",
    },
    body: jsonBody === undefined ? undefined : JSON.stringify(jsonBody),
  });
  const text = await resp.text();
  let data: Record<string, unknown> = {};
  if (text) {
    try { data = JSON.parse(text); } catch { data = { raw: text.slice(0, 300) }; }
  }
  if (!resp.ok) {
    throw new Error(`Basecamp ${method} ${path} failed (${resp.status})`);
  }
  return { status: resp.status, data };
}

type JsonFn = (body: unknown, status?: number) => Response;

async function publishService(req: Request, j: JsonFn): Promise<Response> {
  const body = await req.json();
  const serviceId = Number(body.service_id);
  const dryRun = body.dry_run === true;
  const notify = body.notify === true;
  if (!serviceId) return j({ error: "service_id required" }, 400);

  let cfg = await loadConfig();
  const missing = [
    "basecamp_access_token",
    "basecamp_api_url",
    "basecamp_hq_schedule_id",
  ].filter((k) => !cfg[k]);
  if (missing.length) return j({ error: "Basecamp is not configured", missing }, 400);

  const [service] = await sql`
    select id, title, starts_at, ends_at, status, bc_schedule_entry_id
    from scheduler.services where id = ${serviceId}`;
  if (!service) return j({ error: "Service not found" }, 404);

  const slots = await sql`
    select m.name as ministry_name, r.name as role_name, a.slot_index,
           trim(coalesce(p.first_name,'') || ' ' || coalesce(p.last_name,'')) as person_name,
           p.bc_person_id
    from scheduler.assignments a
    join scheduler.roles r on a.role_id = r.id
    join scheduler.ministries m on r.ministry_id = m.id
    left join scheduler.people p on a.person_id = p.id
    where a.service_id = ${serviceId}
    order by m.name, r.sort_order, r.name, a.slot_index`;

  const teams = new Map<string, string[]>();
  const participantIds: number[] = [];
  let filled = 0;
  for (const slot of slots) {
    const team = String(slot.ministry_name);
    const person = String(slot.person_name || "").trim() || "TBD";
    if (person !== "TBD") filled++;
    if (!teams.has(team)) teams.set(team, []);
    teams.get(team)!.push(`${slot.role_name}: ${person}`);
    if (slot.bc_person_id) participantIds.push(Number(slot.bc_person_id));
  }

  const desc: string[] = [];
  for (const [team, roles] of teams) {
    desc.push(`<h3>${escapeHtml(team)}</h3><ul>`);
    for (const line of roles) desc.push(`<li>${escapeHtml(line)}</li>`);
    desc.push("</ul>");
  }

  const payload = {
    summary: service.title as string,
    starts_at: iso(service.starts_at),
    ends_at: iso(service.ends_at),
    description: desc.join("\n"),
    participant_ids: [...new Set(participantIds)],
    notify,
  };

  if (dryRun) {
    return j({
      ok: true,
      dry_run: true,
      service_id: serviceId,
      hq_project: cfg.basecamp_hq_project_name || "Providence Community Church HQ",
      filled,
      slots: slots.length,
      already_published: Boolean(service.bc_schedule_entry_id),
      payload: { ...payload, description_chars: payload.description.length, description: undefined },
    });
  }

  cfg = await refreshBasecampToken(cfg);
  const scheduleId = cfg.basecamp_hq_schedule_id;
  let entryId = service.bc_schedule_entry_id ? Number(service.bc_schedule_entry_id) : null;
  let result: Record<string, unknown>;
  if (entryId) {
    ({ data: result } = await basecamp(cfg, "PUT", `/schedule_entries/${entryId}.json`, payload));
  } else {
    ({ data: result } = await basecamp(cfg, "POST", `/schedules/${scheduleId}/entries.json`, payload));
    entryId = Number(result.id);
  }

  await sql`
    update scheduler.services
    set bc_schedule_entry_id = ${entryId}, status = 'published'
    where id = ${serviceId}`;

  return j({
    ok: true,
    dry_run: false,
    service_id: serviceId,
    entry_id: entryId,
    app_url: typeof result.app_url === "string" ? result.app_url : null,
    filled,
    slots: slots.length,
  });
}

Deno.serve(async (req) => {
  const j = (body: unknown, status = 200) => json(body, status, req);
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsFor(req) });

  const url = new URL(req.url);
  const action = url.searchParams.get("action") ?? "health";

  try {
    // Ungated health check — DB connectivity only, no member data.
    if (action === "health") {
      const [{ count }] = await sql`select count(*)::int as count from scheduler.services`;
      return j({ ok: true, services: count });
    }

    // Everything else requires a valid members token.
    if (!(await isMember(req))) return j({ error: "Not authenticated" }, 401);

    if (action === "directory") {
      const rows = await sql`
        select id, trim(coalesce(first_name,'') || ' ' || coalesce(last_name,'')) as name,
               is_free_text
        from scheduler.people order by first_name, last_name`;
      return j({ people: rows });
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
      return j({ ministries: rows });
    }

    if (action === "schedule") {
      const teamId = url.searchParams.get("ministry_id");
      const rows = await sql`
        select s.id as service_id, s.service_date, s.title, s.status,
               s.bc_schedule_entry_id,
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
      return j({ rows });
    }

    if (action === "assign" && req.method === "POST") {
      const body = await req.json();
      const assignmentId = Number(body.assignment_id);
      const personId = body.person_id === null || body.person_id === undefined
        ? null : Number(body.person_id);
      
      if (!assignmentId) return j({ error: "assignment_id required" }, 400);
      await sql`update scheduler.assignments
                set person_id = ${personId}, status = 'pending'
                where id = ${assignmentId}`;
      return j({ ok: true });
    }

    if (action === "publish" && req.method === "POST") {
      return await publishService(req, j);
    }

    return j({ error: "unknown action" }, 400);
  } catch (e) {
    return j({ error: "server error", detail: String(e) }, 500);
  }
});
