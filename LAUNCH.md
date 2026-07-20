# Launch runbook — sovgracekc.org cutover

Target: live by early August 2026. The flip takes ~10 minutes; propagation up to a few hours.

## Before launch day (Chris)
- [ ] DirectNic renewal confirmed + auto-renew ON (account greets "David" — make sure renewal emails reach someone current)
- [ ] Have the DirectNic login handy on launch morning

## Launch day, in order
1. **Attach custom domains to Pages** (Cloudflare dash → Workers & Pages → sovgracekc → Custom domains): add `sovgracekc.org` and `www.sovgracekc.org`. This auto-creates/repoints the zone's root+www records to the Pages project and removes the stale A/AAAA records imported from the old setup.
2. **Flip og:image host**: in `src/layouts/Base.astro`, change both `https://sovgracekc.pages.dev/media/og-share.jpg` → `https://sovgracekc.org/media/og-share.jpg`; build + deploy.
3. **Change nameservers at DirectNic** (directnic.com → Domain Manager → sovgracekc.org → nameservers):
   - Remove: `harleigh.ns.cloudflare.com`, `osmar.ns.cloudflare.com`
   - Add: `eoin.ns.cloudflare.com`, `martha.ns.cloudflare.com`
4. **Wait for the zone to go Active** in Cloudflare (minutes to a few hours). Site + email keep working throughout — MX records are already staged identically.
5. **Verify** (Claude runs these):
   - All 11 pages + /seat/ + /photos/ return 200 on https://sovgracekc.org
   - `/contact/` serves the page; `/vbs/` etc. 301 correctly; `/get-involved/` → /community/
   - `dig MX sovgracekc.org` still shows Google; send/receive a test email
   - `sermons.sovgracekc.org` still resolves (CNAME staged)
   - kcprovidence.org → 301 → sovgracekc.org
   - GA4 realtime (G-HG3RG3C3QB) shows the verification visits
6. **Google Search Console**: open the pending sovgracekc.org property → verification now succeeds via the staged TXT record → submit `https://sovgracekc.org/sitemap.xml`
7. **Google Ads**: confirm conversion tracking status is green (AW-11258142796 config tag is live on the site); rebuild the conversion action trigger if needed for Ad Grant compliance.

## After launch
- Watch Search Console coverage + Cloudflare analytics for 2–4 weeks
- THEN cancel Digital Outreach (they currently host the old WP site + own the old GTM/GA data; ask for GA4 admin access to G-SZ5JHTW7TN for history, as a courtesy request)
- Deploy NFC seat tags + stickers (they point at sovgracekc.org/seat/ — live after flip)
- Chase kcprovidence.org registration (Domain.com/NetSol, expires 2026-10-13)
