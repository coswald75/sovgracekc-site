import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// ── Build guard: the members wiki must be in the build ──────────────────────
// The password-gated members wiki lives in public/members/, which is git-ignored
// (it holds real member names + care maps that must never reach the public repo).
// Because it's not in git, it must exist ON DISK at build time so Astro copies it
// into dist/. If a build ever ships without it, the gated /members/ pages 404 in
// production — and only members would notice. This integration fails the build
// when the members wiki is missing or suspiciously small, so the bad deploy is
// blocked before it ships (every deploy path runs `npm run build` first).
//
// If it fires:  python3 scripts/generate_members_wiki.py   then rebuild.
// Escape hatch (rare, intentional members-less build):  SKIP_MEMBERS_GUARD=1
const MIN_MEMBERS_PAGES = Number(process.env.MEMBERS_GUARD_MIN || 10);

function membersWikiGuard() {
  return {
    name: 'members-wiki-guard',
    hooks: {
      'astro:build:done': ({ dir, logger }) => {
        if (process.env.SKIP_MEMBERS_GUARD === '1') {
          logger.warn('members-wiki-guard: SKIPPED via SKIP_MEMBERS_GUARD=1');
          return;
        }
        const membersDir = fileURLToPath(new URL('members/', dir));
        let count = 0;
        const walk = (d) => {
          let entries = [];
          try { entries = fs.readdirSync(d, { withFileTypes: true }); } catch { return; }
          for (const e of entries) {
            const p = path.join(d, e.name);
            if (e.isDirectory()) walk(p);
            else if (e.name === 'index.html') count++;
          }
        };
        walk(membersDir);
        if (count < MIN_MEMBERS_PAGES) {
          throw new Error(
            `members-wiki-guard: only ${count} member wiki page(s) in dist/members/ ` +
            `(expected at least ${MIN_MEMBERS_PAGES}). The gated /members/ wiki would be ` +
            `broken in production, so this build is being refused.\n` +
            `Fix: run  python3 scripts/generate_members_wiki.py  to regenerate ` +
            `public/members/, then rebuild. (Override once with SKIP_MEMBERS_GUARD=1.)`
          );
        }
        logger.info(`members-wiki-guard: ${count} member wiki pages present ✓`);
      },
    },
  };
}

export default defineConfig({
  site: 'https://sovgracekc.org',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [membersWikiGuard()],
});
