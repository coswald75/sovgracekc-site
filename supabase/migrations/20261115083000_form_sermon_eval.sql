-- Anonymous sermon listening feedback from sovgracekc.org/eval/ (Chris, Nov 15 2026). Applied to twbunmbzyqcqzgffdrib on Nov 15.
-- No names, emails, IPs or user agents are stored. Written only by functions/api/forms/sermon-eval.js (service role).
create table if not exists public.form_sermon_eval (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  form text not null default 'dov-2026-11-15',
  ratings jsonb not null default '{}'::jsonb,   -- {"q1":1..5, ... "q12":1..5}, unanswered keys omitted
  main_point text,                              -- Q6 "Write it here"
  helped text,
  stronger text,
  unclear text,
  emailed boolean not null default false,       -- true once Resend accepted the email to chris@
  is_test boolean not null default false        -- set when a text answer starts with "TEST"
);
alter table public.form_sermon_eval enable row level security;
revoke all on public.form_sermon_eval from anon, authenticated;
create index if not exists form_sermon_eval_created on public.form_sermon_eval (created_at);
