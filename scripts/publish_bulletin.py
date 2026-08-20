#!/usr/local/bin/python3
"""
publish_bulletin.py — Build + deploy the /seat/ weekly bulletin, then email Chris.

This is the *publish* half of the weekly seat-bulletin workflow. The *gather* and
*draft* halves are done by Claude (read Josh's Basecamp music email + the
announcements Google Doc, then write sovgracekc-site/src/data/bulletin.json).
Once that data file is reviewed and approved, run this to make it live:

    /usr/local/bin/python3 "publish_bulletin.py"

Mirrors update_church_sermons.py: same site, same Cloudflare Pages deploy
(MUST pass --branch=main or it publishes a throwaway preview), same Resend
notify. Idempotent-ish: pass --check to build only (no deploy) for review.

Data file shape (src/data/bulletin.json):
    {
      "week_of": "August 2, 2026",
      "service_order": {
        "band":  [ { "name": "...", "role": "..." }, ... ],
        "songs": [ { "title": "...", "note": "Communion|Closing|" }, ... ],
        "playlist_url": "https://open.spotify.com/playlist/..."
      },
      "announcements": [ { "title": "...", "body": "...", "when": "...", "link": "" }, ... ]
    }
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
DATA_FILE = SITE_DIR / "src" / "data" / "bulletin.json"
DEPLOY_ENV = dict(os.environ, PATH="/usr/local/bin:/usr/bin:/bin")
SEAT_URL = "https://sovgracekc.org/seat/"


def log(msg):
    ts = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{ts}] {msg}", flush=True)


def load_bulletin():
    if not DATA_FILE.exists():
        log(f"ERROR: {DATA_FILE} not found. Draft the bulletin first.")
        sys.exit(1)
    try:
        data = json.loads(DATA_FILE.read_text(encoding="utf-8"))
    except Exception as e:
        log(f"ERROR: bulletin.json is not valid JSON: {e}")
        sys.exit(1)
    if not data.get("week_of"):
        log("ERROR: bulletin.json is missing 'week_of'. Refusing to publish.")
        sys.exit(1)
    return data


def build():
    subprocess.run(["npm", "run", "build"], cwd=SITE_DIR, env=DEPLOY_ENV, check=True)


def deploy():
    subprocess.run(["wrangler", "pages", "deploy", "dist",
                    "--project-name=sovgracekc", "--branch=main", "--commit-dirty=true"],
                   cwd=SITE_DIR, env=DEPLOY_ENV, check=True)


def notify(data):
    """Best-effort email so Chris knows the seat bulletin went live. Never fails the job."""
    try:
        import requests
        key = os.environ.get("RESEND_API_KEY")
        frm = os.environ.get("RESEND_FROM")
        if not key or not frm:
            return
        order = data.get("service_order") or {}
        songs = order.get("songs") or []
        anns = data.get("announcements") or []
        song_list = "".join(
            f"<li>{s.get('title','')}{(' — ' + s['note']) if s.get('note') else ''}</li>"
            for s in songs
        )
        ann_list = "".join(f"<li>{a.get('title','')}</li>" for a in anns) or "<li><i>none this week</i></li>"
        html = (
            f"<p>The seat bulletin for <b>{data['week_of']}</b> is now live.</p>"
            f"<p><b>Worship set ({len(songs)} songs):</b></p><ul>{song_list}</ul>"
            f"<p><b>Announcements ({len(anns)}):</b></p><ul>{ann_list}</ul>"
            f"<p>Live at <a href='{SEAT_URL}'>{SEAT_URL}</a> "
            f"(order of service &amp; announcements cards).</p>"
        )
        requests.post(
            "https://api.resend.com/emails",
            headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"},
            json={"from": frm, "to": ["chris@sovgracekc.org"],
                  "subject": f"Seat bulletin published — {data['week_of']}", "html": html},
            timeout=20,
        )
        log("Notification email sent.")
    except Exception as e:
        log(f"(notify skipped: {e})")


def main():
    load_dotenv(dotenv_path=PIPELINE_DIR / ".env", override=True)
    check_only = "--check" in sys.argv

    data = load_bulletin()
    log(f"Bulletin for '{data['week_of']}' — building the site…")
    build()

    if check_only:
        log("Build OK (--check). Not deploying. Review dist/ or the local preview, "
            "then run again without --check to publish.")
        return

    log("Deploying to Cloudflare Pages (branch=main)…")
    deploy()
    log(f"Deploy complete — live at {SEAT_URL}")
    notify(data)


if __name__ == "__main__":
    main()
