-- Scheduler config: small key/value table so the API's expected members token
-- lives in the database (managed via SQL) rather than a Supabase env secret.
-- The `members_token` row holds HMAC(MEMBERS_PASSWORD, 'providence-members-v1')
-- — the same token the /members/ Cloudflare gate issues. Set/rotated via SQL.

create table if not exists scheduler.config (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);
alter table scheduler.config enable row level security;
