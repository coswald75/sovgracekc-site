#!/bin/zsh
# publish_seat.sh — auto-publish the weekly /seat/ page once the seat-bot pushes it.
#
# The seat-bot commits the new bulletin to origin/main but CANNOT deploy (a fresh-clone
# deploy ships a members-less site and the build guard blocks it). Only this Mac can do a
# complete, safe deploy — it has the Obsidian vault to regenerate the members wiki. So this
# script runs here (launchd, Saturday evening + Sunday morning), detects a NEW seat/bulletin
# commit on origin, fast-forwards, and publishes live via publish_bulletin.py.
#
# Idempotent: publishes only when origin/main has seat/bulletin commits this Mac hasn't
# taken yet; once fast-forwarded, later runs find nothing and exit. Chris clears the content
# with the bot, so this publishes straight to live.

export PATH="/usr/local/bin:/usr/bin:/bin"
REPO="$HOME/shepherds-guild/sovgracekc-site"
LOG="$HOME/Library/Logs/sovgracekc-seatpublish.log"
ts() { date "+%Y-%m-%d %H:%M:%S"; }
cd "$REPO" || { echo "[$(ts)] repo missing" >> "$LOG"; exit 1; }

git fetch origin -q 2>>"$LOG" || { echo "[$(ts)] fetch failed" >> "$LOG"; exit 1; }

NEW=$(git rev-list HEAD..origin/main -- src/data/bulletin.json src/pages/seat 2>/dev/null | wc -l | tr -d ' ')
if [ "${NEW:-0}" = "0" ]; then
  echo "[$(ts)] no new seat content on origin — nothing to publish" >> "$LOG"
  exit 0
fi
echo "[$(ts)] $NEW new seat/bulletin commit(s) on origin — publishing" >> "$LOG"

# Stash the perpetual recent-sermons.json working-tree churn so the fast-forward is clean.
git stash push -q -m seatpublish-wip -- src/data/recent-sermons.json 2>/dev/null

if git merge --ff-only origin/main >>"$LOG" 2>&1; then
  git stash pop -q 2>/dev/null
  # publish_bulletin.py: regenerates the members wiki, builds (guard), deploys, emails Chris.
  if python3 scripts/publish_bulletin.py >>"$LOG" 2>&1; then
    echo "[$(ts)] published live OK" >> "$LOG"
  else
    echo "[$(ts)] publish_bulletin.py FAILED — needs manual publish" >> "$LOG"
    exit 1
  fi
else
  echo "[$(ts)] ff-merge failed (local diverged from origin) — needs manual publish" >> "$LOG"
  git stash pop -q 2>/dev/null
  exit 1
fi
