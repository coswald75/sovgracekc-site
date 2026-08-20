#!/usr/local/bin/python3
"""
update_church_sermons.py — Refresh the "Recent Sermons" list on sovgracekc.org.

Pulls the most recent Providence Community Church sermons from Supabase, writes
them to the church site's data file (src/data/recent-sermons.json), and — only if
something actually changed — rebuilds and deploys the static Astro site to
Cloudflare Pages. Idempotent: a run with no new sermons deploys nothing.

Runs weekly via launchd (org.sovgracekc.churchsermons, Mondays ~noon), but is
safe to run by hand any time:  /usr/local/bin/python3 update_church_sermons.py
"""
import os
import sys
import json
import subprocess
import datetime
import pathlib

from dotenv import load_dotenv

PIPELINE_DIR = pathlib.Path(__file__).resolve().parent
SITE_DIR = pathlib.Path.home() / "shepherds-guild" / "sovgracekc-site"
DATA_FILE = SITE_DIR / "src" / "data" / "recent-sermons.json"

COUNT = 6                                   # how many "Recent Sermons" to show
CDN_MATCH = "providence-community-church"   # identifies Providence sermons
PAGE_BASE = "https://sermonsteward.com/ProvidenceLenexa/sermons/"
DEPLOY_ENV = dict(os.environ, PATH="/usr/local/bin:/usr/bin:/bin")


def log(msg):
    ts = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{ts}] {msg}", flush=True)


def fetch_recent():
    from supabase import create_client
    load_dotenv(dotenv_path=PIPELINE_DIR / ".env", override=True)
    url = os.environ.get("SUPABASE_URL")
    key = os.environ.get("SUPABASE_KEY")
    if not url or not key:
        log("ERROR: SUPABASE_URL / SUPABASE_KEY missing in env")
        sys.exit(1)
    sb = create_client(url, key)
    res = (sb.table("sermons")
             .select("title,date,primary_text,main_thesis,slug,hosted_audio_url,id")
             .ilike("hosted_audio_url", f"%{CDN_MATCH}%")
             .order("date", desc=True)
             .limit(40)
             .execute())
    rows = res.data or []
    # Deterministic order (date desc, then id asc) so same-date duplicate rows
    # never thrash the output between runs.
    rows.sort(key=lambda r: str(r.get("id") or ""))
    rows.sort(key=lambda r: str(r.get("date") or ""), reverse=True)

    seen, out = set(), []
    for r in rows:
        slug = (r.get("slug") or "").strip()
        audio = (r.get("hosted_audio_url") or "").strip()
        thesis = (r.get("main_thesis") or "").strip()
        passage = (r.get("primary_text") or "").strip()
        title = (r.get("title") or "").strip()
        d = r.get("date")
        if not (slug and audio and thesis and title and d):
            continue
        if slug in seen:
            continue
        seen.add(slug)
        try:
            dt = datetime.date.fromisoformat(str(d))
            date_str = f"{dt.strftime('%B')} {dt.day}, {dt.year}"  # "August 2, 2026"
        except Exception:
            date_str = str(d)
        out.append({
            "title": title,
            "date": date_str,
            "passage": passage,
            "audio": audio,
            "page": PAGE_BASE + slug,
            "thesis": thesis,
        })
        if len(out) >= COUNT:
            break
    return out


def deploy():
    subprocess.run(["npm", "run", "build"], cwd=SITE_DIR, env=DEPLOY_ENV, check=True)
    subprocess.run(["wrangler", "pages", "deploy", "dist",
                    "--project-name=sovgracekc", "--branch=main", "--commit-dirty=true"],
                   cwd=SITE_DIR, env=DEPLOY_ENV, check=True)


def notify(sermons):
    """Best-effort email so Chris knows the site refreshed. Never fails the job."""
    try:
        import requests
        key = os.environ.get("RESEND_API_KEY")
        frm = os.environ.get("RESEND_FROM")
        if not key or not frm:
            return
        top = sermons[0]
        listing = "".join(f"<li>{s['title']} &mdash; {s['date']}</li>" for s in sermons)
        html = (
            "<p>The Providence sermons page was just refreshed automatically.</p>"
            f"<p><b>Newest:</b> {top['title']} &mdash; {top['date']} ({top['passage']})</p>"
            f"<p>Now showing:</p><ul>{listing}</ul>"
            "<p>Live at <a href='https://sovgracekc.org/sermons/'>sovgracekc.org/sermons</a>.</p>"
        )
        requests.post(
            "https://api.resend.com/emails",
            headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"},
            json={"from": frm, "to": ["chris@sovgracekc.org"],
                  "subject": f"Sermons page updated — {top['title']}", "html": html},
            timeout=20,
        )
        log("Notification email sent.")
    except Exception as e:
        log(f"(notify skipped: {e})")


def main():
    sermons = fetch_recent()
    if not sermons:
        log("ERROR: no Providence sermons returned; leaving site unchanged.")
        sys.exit(1)

    new_json = json.dumps(sermons, indent=2, ensure_ascii=False) + "\n"
    old_json = DATA_FILE.read_text(encoding="utf-8") if DATA_FILE.exists() else ""

    if new_json == old_json:
        log(f"No change — newest is '{sermons[0]['title']}' ({sermons[0]['date']}). Nothing to deploy.")
        return

    DATA_FILE.write_text(new_json, encoding="utf-8")
    log(f"Data updated — newest is '{sermons[0]['title']}' ({sermons[0]['date']}). Building + deploying…")
    deploy()
    log("Deploy complete.")
    notify(sermons)


if __name__ == "__main__":
    main()
