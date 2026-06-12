# sovgracekc.org — Providence Community Church

Static replacement for the Digital Outreach WordPress site. Built with Astro, deploys to Cloudflare Pages. Every URL from the old site is preserved (see `archive/seo-map.md` for the captured titles/descriptions).

## Commands

- `npm run dev` — local preview at http://localhost:4321
- `npm run build` — production build into `dist/`

## How the site is organized

- `src/pages/*.astro` — one file per page, same slug as its URL (`about.astro` → `/about/`)
- `src/layouts/Base.astro` — header, nav, footer, fonts, GTM, SEO tags
- `src/styles/global.css` — the whole design system (colors, type, buttons, cards)
- `src/content/statement-of-faith.html` — the full Statement of Faith body (generated from the old site, edit carefully)
- `public/wp-content/uploads/` — all images, at their original WordPress URLs (do not move; preserves image SEO)
- `public/_redirects` — Cloudflare Pages redirects for retired landing-page URLs
- `public/sitemap.xml`, `public/robots.txt`

## Design tokens (KC-local language, Park Church structure)

- Cream field `#f6f2ec`, panel `#f1ece3`, cocoa text `#533d31`, muted `#6b5a4e`, hairline `#e2dcd2`, coral accent `#d85a30`
- Fraunces (display serif) · Inter (body) · Barlow Condensed (eyebrow labels) — all Google Fonts

## Still to do before cutover

1. Replace the `/sermons/` link-out with the Sermon Steward sermon section for Providence
2. Decide on a contact-form backend (currently a mailto link); thank-you pages already exist
3. Create the Cloudflare Pages project, connect this repo, verify at the *.pages.dev preview URL
4. Point sovgracekc.org DNS at Pages (DNS is already on Cloudflare), watch Search Console 2–4 weeks, then cancel Digital Outreach
