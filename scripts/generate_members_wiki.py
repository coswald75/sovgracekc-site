#!/usr/local/bin/python3
"""
generate_members_wiki.py — Providence members wiki generator.

Reads the ministry markdown from the Obsidian folder, converts Obsidian bits
([[wikilinks]], > [!callouts], tables) to web, and writes each page as static
HTML under sovgracekc-site/public/members/ in a branded, sidebar-navigated
"Providence — Members" layout.

This is the repeatable PUBLISH step: edit the notes in Obsidian, re-run this,
then build + deploy the site. (Gate for /members/* is added separately.)

    /usr/local/bin/python3 generate_members_wiki.py
"""
import os
import re
import html
import pathlib
import markdown

SRC = pathlib.Path.home() / "Obsidian" / "Sermon_Vault" / "Providence 2627"
OUT = pathlib.Path.home() / "shepherds-guild" / "sovgracekc-site" / "public" / "members"

INDEX_NAME = "Providence Ministries — Index"

# Sidebar grouping + friendly labels (by source filename, no extension)
HUBS = [
    ("Providence Ministries — Index", "Ministry Manifest"),
    ("Sunday at Providence", "Sunday Mornings"),
    ("Community Groups", "Community Groups"),
    ("Providence Ministry Meetings", "Master Calendar"),
    ("Setting Up Basecamp", "Basecamp"),
]
RESOURCES = [
    ("Sermons Online", "Sermons Online"),
    ("PCC Library Charter", "The Church Library"),
    ("Renting the Gym", "Renting the Gym"),
    ("ProvBot", "ProvBot"),
]
LEADERS = [
    ("Shepherding Guide", "Shepherding Guide"),
    ("Ideal Leader Profile", "Ideal Leader Profile"),
    ("The DRIVER Framework", "DRIVER Framework"),
    ("Conversation Guide", "Conversation Guide"),
    ("Community Group Leaders", "Community Group Leaders"),
    ("Eldership at Providence", "Eldership Explained"),
    ("Ongoing Member Care Map", "Ongoing Care Map"),
    ("Acute Care Map", "Acute Care Map"),
    ("Discerning or Earning?", "Discerning or Earning?"),
]

# ---- Standalone HTML resources (self-contained docs, not markdown notes) ----
# Each is a designed, self-contained page dropped into /members/<slug>/ verbatim
# (its own styling + a back-link to the members home). Kept in members_assets/
# so the pipeline stays repeatable. (name, url, source filename)
STANDALONE_DIR = pathlib.Path(__file__).parent / "members_assets"
STANDALONE = [
    ("Discerning or Earning?", "/members/discerning-or-earning/", "discerning-or-earning.html"),
]
# Everything else is a ministry; nicer labels for a few:
MINISTRY_LABELS = {
    "His Kids (Children's Ministry)": "His Kids (Children's)",
    "Jos1.89 Parent-Youth Ministry": "Jos1.89 (Parent-Youth)",
    "AV Team": "A/V Team",
    "Greeter Team Vision": "Greeter Team",
    "PCC Library Charter": "The Church Library",
    "Pre-Service Prayer Meeting": "Pre-Service Prayer",
}

# ---- Start Serving: the Ministry Interest Form -----------------------------
# A virtual page (not a markdown note) generated into /members/ministry-interest-form/.
FORM_NAME = "Ministry Interest Form"
FORM_URL = "/members/ministry-interest-form/"
FORM_API = "https://twbunmbzyqcqzgffdrib.supabase.co/functions/v1/ministry-interest"

# Check-all-that-apply serving opportunities: (label, what it does, how often).
# Excluded on purpose (we don't solicit volunteers): Community Group Leaders,
# Security Team, Eldership.
MINISTRY_OPTIONS = [
    ("Greeter Team", "Welcome people at the door and help newcomers connect.", "Sundays · 4-week rotation"),
    ("Coffee Ministry", "Brew and set out coffee before and after the service.", "Sundays · on a rotation"),
    ("Potluck Volunteers", "Help coordinate sign-ups, setup, and cleanup for our shared meals.", "Several times a year"),
    ("A/V Team", "Run sound, build slides, or operate the livestream.", "Sundays · on a rotation"),
    ("Worship Ministry", "Play an instrument or sing on the worship team.", "Thursday practice + Sundays · on a rotation"),
    ("Communion Ministry", "Prepare and serve the Lord's Supper.", "Sundays"),
    ("His Kids (Children's Ministry)", "Teach or assist a two-person team during the service.", "Sundays · seasonal rotation"),
    ("Pre-Service Prayer", "Gather to pray together before the service.", "Sundays · 9:15 AM"),
    ("Jos1.89 (Parent-Youth Ministry)", "Teach, lead a small group, or bring a meal at the monthly gathering.", "One Saturday a month"),
    ("Women's Ministry", "Help plan or host Women's Nights, events, and Mom University.", "Monthly + seasonal"),
    ("Men's Ministry", "Help with men's nights, fire pits, and the men's conference.", "Monthly + seasonal"),
    ("Biblical Counseling", "Join the ACBC equipping cohort to grow in caring for others biblically.", "Twice monthly · set season"),
    ("Care Couple Ministry (forming)", "Mature couples who walk alongside others through hard seasons.", "In formation"),
    ("Marriage Mentoring (forming)", "Mentor engaged or newly married couples through a set curriculum.", "As matched"),
]


def slugify(name):
    s = name.lower().replace("—", "-").replace("–", "-").replace("&", "and")
    s = re.sub(r"['’`]", "", s)
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return re.sub(r"-+", "-", s).strip("-")


def url_for(name):
    return "/members/" if name == INDEX_NAME else f"/members/{slugify(name)}/"


def out_path(name):
    return OUT / "index.html" if name == INDEX_NAME else OUT / slugify(name) / "index.html"


# ---- transforms -----------------------------------------------------------
WIKILINK = re.compile(r"\[\[([^\]|\\]+)(?:\\?\|([^\]]+))?\]\]")


def convert_wikilinks(text, name_to_url):
    def repl(m):
        target = m.group(1).strip()
        alias = (m.group(2) or target).strip()
        u = name_to_url.get(target)
        if u:
            return f"[{alias}]({u})"
        return alias  # unresolved link -> plain text (logged by caller)
    return WIKILINK.sub(repl, text)


CALLOUT_OPEN = re.compile(r"^>\s*\[!(\w+)\]\s*(.*)$")


def convert_callouts(text, md):
    """Replace Obsidian > [!type] callouts with styled HTML divs."""
    lines = text.split("\n")
    out, i = [], 0
    while i < len(lines):
        m = CALLOUT_OPEN.match(lines[i])
        if not m:
            out.append(lines[i]); i += 1; continue
        ctype, title = m.group(1).lower(), m.group(2).strip()
        body = []
        i += 1
        while i < len(lines) and lines[i].lstrip().startswith(">"):
            body.append(re.sub(r"^>\s?", "", lines[i]))
            i += 1
        body_html = md.reset().convert("\n".join(body).strip())
        title_html = f'<p class="callout-title">{html.escape(title)}</p>' if title else ""
        out.append(f'\n<div class="callout callout-{ctype}">{title_html}{body_html}</div>\n')
    return "\n".join(out)


def strip_frontmatter(text):
    if text.startswith("---"):
        end = text.find("\n---", 3)
        if end != -1:
            return text[end + 4:].lstrip("\n")
    return text


def first_h1(text):
    m = re.search(r"^#\s+(.+)$", text, re.MULTILINE)
    return m.group(1).strip() if m else None


# ---- layout ---------------------------------------------------------------
CSS = """
:root{--ink:#262626;--gray:#6b6b63;--line:#e2dfd8;--paper:#fff;--greige:#b9a898;
--greige-light:#ede8e2;--accent:#075c2e;--serif:'Newsreader',Georgia,serif;
--sans:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif}
*{box-sizing:border-box}
body{margin:0;background:var(--paper);color:var(--ink);font-family:var(--serif);
font-size:18px;line-height:1.6;-webkit-font-smoothing:antialiased}
a{color:var(--accent);text-decoration:none}a:hover{text-decoration:underline}
.topbar{border-bottom:1px solid var(--line);background:#fff;position:sticky;top:0;z-index:10}
.topbar .in{max-width:1120px;margin:0 auto;padding:12px 20px;display:flex;align-items:center;gap:12px}
.topbar img{height:34px;width:auto;filter:grayscale(1) brightness(.35)}
.topbar b{font-family:var(--serif);font-size:1.05rem}
.topbar .tag{font-family:var(--sans);font-size:.72rem;letter-spacing:.12em;text-transform:uppercase;color:var(--gray);margin-left:auto}
.wrap{max-width:1120px;margin:0 auto;padding:0 20px}
.layout{display:grid;grid-template-columns:250px 1fr;gap:44px;align-items:start}
.side{position:sticky;top:66px;font-family:var(--sans);font-size:.9rem;padding:28px 0;max-height:calc(100vh - 66px);overflow-y:auto}
.menu-btn{display:none;place-items:center;appearance:none;border:1px solid var(--line);background:#fff;border-radius:8px;width:40px;height:34px;cursor:pointer;color:var(--ink);padding:0}
.menu-btn svg{width:20px;height:20px;display:block}
.backdrop{display:none;position:fixed;inset:0;background:rgba(20,18,14,.42);opacity:0;pointer-events:none;transition:opacity .22s;z-index:19}
.backdrop.show{opacity:1;pointer-events:auto}
.side .drawer-head{display:none}
.navsearch{display:none}
.navsearch input{width:100%;font-family:var(--sans);font-size:1rem;padding:11px 12px;border:1px solid var(--line);border-radius:10px;background:var(--greige-light);color:var(--ink)}
.side .grp{font-family:var(--sans);font-size:.7rem;letter-spacing:.13em;text-transform:uppercase;color:var(--gray);font-weight:700;margin:20px 0 8px}
.side a{display:block;color:var(--ink);padding:5px 10px;border-radius:7px;line-height:1.35}
.side a:hover{background:var(--greige-light);text-decoration:none}
.side a.active{background:var(--accent);color:#fff}
.content{padding:34px 0 90px;min-width:0}
.content h1{font-weight:600;font-size:2.3rem;line-height:1.1;margin:.1em 0 .35em}
.content h2{font-weight:600;font-size:1.5rem;margin:1.5em 0 .5em;padding-top:.4em;border-top:1px solid var(--line)}
.content h3{font-weight:600;font-size:1.2rem;margin:1.4em 0 .4em}
.content h4{font-weight:600;font-size:1.02rem;margin:1.2em 0 .3em}
.content p{margin:.7em 0}
.content ul,.content ol{padding-left:1.3em}.content li{margin:.3em 0}
.content strong{color:var(--ink)}
.content hr{border:0;border-top:1px solid var(--line);margin:2em 0}
.content blockquote{border-left:3px solid var(--greige);margin:1em 0;padding:.2em 0 .2em 1.1em;color:var(--gray)}
.tablewrap{overflow-x:auto;margin:1.1em 0;border:1px solid var(--line);border-radius:10px}
table{border-collapse:collapse;width:100%;font-size:.94rem;font-family:var(--sans)}
th,td{text-align:left;padding:9px 13px;border-bottom:1px solid var(--line);vertical-align:top}
th{background:var(--greige-light);font-weight:700;font-size:.8rem;letter-spacing:.02em;white-space:nowrap}
tr:last-child td{border-bottom:0}
.callout{border:1px solid var(--line);border-left:3px solid var(--accent);background:var(--greige-light);
border-radius:0 10px 10px 0;padding:14px 18px;margin:1.3em 0;font-family:var(--sans);font-size:.92rem;line-height:1.6}
.callout p{margin:.4em 0}.callout .callout-title{font-weight:700;margin:0 0 .3em;color:var(--ink)}
.crumb{font-family:var(--sans);font-size:.8rem;color:var(--gray);margin-bottom:6px}
.crumb a{color:var(--gray)}
.dir{list-style:none;padding-left:0;margin:.3em 0 1.6em}
.dir li{margin:.4em 0;line-height:1.45}
.dir li a{font-weight:600}
.dir-d{color:var(--gray)}
.dir-intro{font-family:var(--sans);font-size:.92rem;color:var(--gray);margin:.2em 0 1.3em}
@media (max-width:820px){
.menu-btn{display:grid}
.backdrop{display:block}
.layout{grid-template-columns:1fr;gap:0}
.side{position:fixed;top:0;left:0;bottom:0;width:84%;max-width:320px;z-index:20;background:#fff;
margin:0;padding:0 0 24px;max-height:none;overflow-y:auto;transform:translateX(-102%);
transition:transform .24s cubic-bezier(.3,.7,.3,1);box-shadow:2px 0 30px rgba(0,0,0,.18)}
.side.open{transform:translateX(0)}
.side .drawer-head{display:flex;align-items:center;gap:8px;position:sticky;top:0;background:#fff;
padding:14px 14px 8px;border-bottom:1px solid var(--line);z-index:1}
.side .drawer-head b{font-family:var(--sans);font-weight:700;font-size:.95rem;flex:1}
.drawer-close{appearance:none;border:1px solid var(--line);background:#fff;border-radius:8px;width:34px;height:32px;display:grid;place-items:center;cursor:pointer;color:var(--ink);padding:0}
.drawer-close svg{width:18px;height:18px}
.navsearch{display:block;padding:12px 12px 4px}
.side .navlinks{padding:4px 12px}
.side .grp{margin-top:14px}
.side a{padding:11px 12px;font-size:1rem}
.content{padding-top:22px}
.tablewrap{overflow-x:visible;border:0;border-radius:0;margin:1em 0}
.tablewrap table,.tablewrap tbody,.tablewrap tr,.tablewrap td{display:block;width:auto}
.tablewrap thead{display:none}
.tablewrap tr{border:1px solid var(--line);border-radius:11px;background:#fff;padding:10px 14px;margin:0 0 12px}
.tablewrap td{border:0;padding:6px 0;font-size:.96rem;white-space:normal}
.tablewrap td::before{content:attr(data-label);display:block;font-family:var(--sans);font-weight:700;font-size:.66rem;letter-spacing:.05em;text-transform:uppercase;color:var(--gray);margin-bottom:1px}
.tablewrap td[data-label=""]{font-family:var(--serif);font-weight:700;font-size:1.06rem;padding:2px 0 4px}
.tablewrap td[data-label=""]::before{display:none}
.tablewrap td:empty{display:none}
}
"""

PAGE = """<!doctype html><html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>__TITLE__ | Providence Members</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&display=swap" rel="stylesheet">
<style>__CSS__</style></head><body>
<div class="topbar"><div class="in">
<button class="menu-btn" id="menuBtn" aria-label="Browse pages" aria-expanded="false" aria-controls="side">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
<img src="/wp-content/uploads/providence-tree-mark-navy.png" alt="">
<b>Providence</b>
<span class="tag">Members</span>
</div></div>
<div class="backdrop" id="backdrop"></div>
<div class="wrap"><div class="layout">
<aside class="side" id="side">
<div class="drawer-head"><b>Browse</b><button class="drawer-close" id="drawerClose" aria-label="Close menu">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>
<div class="navsearch"><input id="navSearch" type="search" placeholder="Search pages…" aria-label="Search pages"></div>
<nav class="navlinks">__NAV__</nav>
</aside>
<main class="content">__CRUMB____BODY__</main>
</div></div>
<script>
(function(){
var side=document.getElementById('side'),bd=document.getElementById('backdrop'),
btn=document.getElementById('menuBtn'),cl=document.getElementById('drawerClose'),sr=document.getElementById('navSearch');
function openM(){side.classList.add('open');bd.classList.add('show');btn.setAttribute('aria-expanded','true');}
function closeM(){side.classList.remove('open');bd.classList.remove('show');btn.setAttribute('aria-expanded','false');}
if(btn)btn.addEventListener('click',openM);
if(cl)cl.addEventListener('click',closeM);
if(bd)bd.addEventListener('click',closeM);
side.addEventListener('click',function(e){if(e.target.closest('a'))closeM();});
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeM();});
if(sr)sr.addEventListener('input',function(){
var q=this.value.trim().toLowerCase();
side.querySelectorAll('.navlinks a').forEach(function(a){
a.style.display=(!q||a.textContent.toLowerCase().indexOf(q)>-1)?'':'none';});
side.querySelectorAll('.navlinks .grp').forEach(function(g){
var vis=false,n=g.nextElementSibling;
while(n&&!n.classList.contains('grp')){if(n.tagName==='A'&&n.style.display!=='none'){vis=true;break;}n=n.nextElementSibling;}
g.style.display=vis?'':'none';});
});
})();
</script>
</body></html>"""


# One-line blurb per page for the auto-generated Manifest directory. The Manifest mirrors
# the sidebar, so EVERY page must have an entry here — main() warns if any is missing.
DESCRIPTIONS = {
    # Start Here
    "Providence Ministries — Index": "This page — the full directory, plus the rhythms of our life together.",
    "Sunday at Providence": "The Sunday morning timeline, hour by hour, and the teams that serve.",
    "Community Groups": "The church's small groups — biblical fellowship in a more intimate setting.",
    "Providence Ministry Meetings": "The master calendar of every gathering, with upcoming dates.",
    "Setting Up Basecamp": "How we stay connected through the week — and how to get on it.",
    # Ministries
    "AV Team": "Sound, slides, and livestream for the Sunday service.",
    "Coffee Ministry": "Coffee before and after the service — simple, welcoming hospitality.",
    "Potluck Coordination": "Ladies who help with the logistics of our occasional shared meals.",
    "Worship Ministry": "Leading the congregation in singing — musicians and vocalists.",
    "Communion Ministry": "Preparing and serving the Lord's Supper.",
    "Greeter Team Vision": "The front door — welcoming people and helping newcomers connect.",
    "His Kids (Children's Ministry)": "Sunday children's ministry — lesson, songs, craft, and games.",
    "Pre-Service Prayer Meeting": "A brief prayer meeting before the service — open to anyone.",
    "Security Team": "Physical safety oversight for the gathering and church events.",
    "Huddles": "Small same-gender groups of 2–4 for fellowship and discipleship.",
    "Jos1.89 Parent-Youth Ministry": "Monthly gatherings for kids 7–12 and their parents, together.",
    "Mom University": "A short winter course for mothers, taught by women in the church.",
    "Biblical Counseling Ministry": "Equipping members to care for one another with Scripture (ACBC).",
    "Child Dedication": "Parents dedicating their children to the Lord — held each Father's Day.",
    "Care Couple Ministry": "A proposed team of mature couples walking alongside others in need.",
    "Marriage Ministry": "Premarital and early-marriage mentoring (a standing team is forming).",
    "Addiction Recovery Ministry": "A vision in the works — we need people to help start it.",
    # Start Serving
    "Ministry Interest Form": "Tell us how you'd like to serve, and we'll follow up.",
    # Resources
    "Sermons Online": "Every sermon, hosted with study tools — plus the podcast.",
    "PCC Library Charter": "A refreshed collection of books, free to borrow.",
    "Renting the Gym": "Our recreation space — free for members; reserve it for events.",
    "ProvBot": "The website assistant — ask a question or find a sermon.",
    # For Leaders
    "Shepherding Guide": "The philosophy of care: Know • Care • Lead.",
    "Ideal Leader Profile": "The qualities we look for in every leader.",
    "The DRIVER Framework": "A memorable tool for helping someone in a season of need.",
    "Conversation Guide": "Rhythms, repairs, and reaches — a guide for intentional conversations.",
    "Community Group Leaders": "The CG leader role: know, care, lead, and when to escalate.",
    "Eldership at Providence": "How eldership is defined and maintained at Providence.",
    "Ongoing Member Care Map": "How ordinary, everyday member care is owned and reviewed.",
    "Acute Care Map": "How care is coordinated in a crisis or hard season.",
    "Discerning or Earning?": "On the scrupulous conscience — telling true conviction from a works-driven, earning spirit, and caring for those who suffer it.",
}


def group_items(name_to_url):
    """The sidebar groups in display order: (group_title, [(name, label), ...])."""
    ministry_names = sorted(
        n for n in name_to_url
        if n not in dict(HUBS) and n not in dict(LEADERS) and n not in dict(RESOURCES)
        and n != FORM_NAME
    )
    return [
        ("Start Here", [(n, l) for n, l in HUBS]),
        ("Ministries", [(n, MINISTRY_LABELS.get(n, n)) for n in ministry_names]),
        ("Start Serving", [(FORM_NAME, FORM_NAME)]),
        ("Resources", [(n, l) for n, l in RESOURCES]),
        ("For Leaders", [(n, l) for n, l in LEADERS]),
    ]


def build_nav(active_name, name_to_url):
    parts = []
    for title, items in group_items(name_to_url):
        parts.append(f'<div class="grp">{html.escape(title)}</div>')
        for name, label in items:
            cls = "active" if name == active_name else ""
            parts.append(f'<a class="{cls}" href="{name_to_url[name]}">{html.escape(label)}</a>')
    return "\n".join(parts)


def build_directory(name_to_url):
    """The complete on-page directory that mirrors the sidebar, one line per page."""
    out = ['<h1>The Full Directory</h1>',
           '<p class="dir-intro">Everything in the members area, section by section — the same '
           'list as the sidebar, with a line on each.</p>']
    for title, items in group_items(name_to_url):
        out.append(f'<h2>{html.escape(title)}</h2>')
        out.append('<ul class="dir">')
        for name, label in items:
            desc = DESCRIPTIONS.get(name, "")
            d = f' <span class="dir-d">— {html.escape(desc)}</span>' if desc else ""
            out.append(f'<li><a href="{name_to_url[name]}">{html.escape(label)}</a>{d}</li>')
        out.append('</ul>')
    return "\n".join(out)


def build_form_body():
    """The Ministry Interest Form body (fields + ministry checklist + submit JS)."""
    checks = "\n".join(
        f'<label class="mopt"><input type="checkbox" name="ministry" value="{html.escape(lbl)}">'
        f'<span><b>{html.escape(lbl)}</b> — {html.escape(desc)}<em>{html.escape(freq)}</em></span></label>'
        for lbl, desc, freq in MINISTRY_OPTIONS
    )
    form_css = """
<style>
#mif .row{margin:0 0 22px}
#mif .row>label:first-child{display:block;font-family:var(--sans);font-weight:600;font-size:.95rem;margin-bottom:7px}
#mif input[type=text],#mif input[type=email],#mif input[type=tel],#mif input[type=date],#mif textarea{
width:100%;max-width:440px;padding:10px 12px;border:1px solid var(--line);border-radius:8px;
font-family:var(--sans);font-size:1rem;background:#fff;color:var(--ink)}
#mif textarea{max-width:100%}
#mif input:focus,#mif textarea:focus{outline:2px solid var(--accent);outline-offset:1px}
#mif .radios{display:flex;gap:22px;font-family:var(--sans)}
#mif .ropt{display:flex;align-items:center;gap:7px;cursor:pointer;font-weight:400}
#mif .help{font-family:var(--sans);font-size:.85rem;color:var(--gray);margin:9px 0 0;max-width:540px}
#mif .help-inline{font-weight:400;color:var(--gray);font-size:.85rem}
#mif .mopts{display:grid;gap:8px;margin-top:2px}
#mif .mopt{display:flex;gap:11px;align-items:flex-start;padding:12px 13px;border:1px solid var(--line);
border-radius:9px;cursor:pointer;font-family:var(--sans);font-size:.93rem;line-height:1.45;font-weight:400}
#mif .mopt:hover{background:var(--greige-light)}
#mif .mopt input{margin-top:3px;flex:none}
#mif .mopt em{color:var(--gray);font-style:normal;display:block;font-size:.83rem;margin-top:2px}
#mif button{margin-top:4px;padding:12px 28px;border:none;border-radius:9px;background:var(--accent);
color:#fff;font-family:var(--sans);font-weight:600;font-size:1rem;cursor:pointer}
#mif button:disabled{opacity:.6;cursor:default}
.mif-err{color:#9c2b21;font-family:var(--sans);font-size:.9rem;margin-top:14px}
.mif-done{padding:6px 0}
.mif-hidden{display:none}
</style>"""
    form_js = """
<script>
(function(){
  var API="__API__";
  var f=document.getElementById("mif"),err=document.getElementById("mif_err"),
      done=document.getElementById("mif_done"),btn=document.getElementById("mif_submit");
  function g(id){return document.getElementById(id);}
  function fail(m){err.textContent=m;err.classList.remove("mif-hidden");}
  f.addEventListener("submit",async function(e){
    e.preventDefault();err.classList.add("mif-hidden");
    var ministries=[].slice.call(f.querySelectorAll('input[name="ministry"]:checked')).map(function(c){return c.value;});
    var mem=f.querySelector('input[name="member"]:checked');
    var payload={name:g("f_name").value.trim(),email:g("f_email").value.trim(),phone:g("f_phone").value.trim(),
      birthdate:g("f_dob").value.trim(),member:mem?mem.value:"",ministries:ministries,note:g("f_note").value.trim()};
    if(!payload.name)return fail("Please enter your name.");
    if(!payload.email)return fail("Please enter your email address.");
    if(!payload.phone)return fail("Please enter your phone number.");
    if(!payload.birthdate)return fail("Please enter your birth date.");
    if(!payload.member)return fail("Please tell us whether you're a member.");
    if(!ministries.length)return fail("Please check at least one ministry you're interested in.");
    btn.disabled=true;btn.textContent="Sending…";
    try{
      var r=await fetch(API,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
      var j=await r.json().catch(function(){return{error:"Bad response"};});
      if(!r.ok)throw new Error(j.error||("HTTP "+r.status));
      f.classList.add("mif-hidden");done.classList.remove("mif-hidden");
      window.scrollTo({top:0,behavior:"smooth"});
    }catch(ex){fail(ex.message);btn.disabled=false;btn.textContent="Submit";}
  });
})();
</script>""".replace("__API__", FORM_API)
    return f"""{form_css}
<h1>Ministry Interest Form</h1>
<p class="crumb-lede" style="color:var(--gray);font-family:var(--sans);margin:.1em 0 1.5em;max-width:600px">
There's a place for you to serve at Providence. Tell us a little about yourself and check the
ministries you'd like to learn more about — someone will follow up with you.</p>
<form id="mif" novalidate>
  <div class="row"><label for="f_name">Name</label><input id="f_name" type="text" autocomplete="name" required></div>
  <div class="row"><label for="f_email">Email</label><input id="f_email" type="email" autocomplete="email" required></div>
  <div class="row"><label for="f_phone">Phone number</label><input id="f_phone" type="tel" autocomplete="tel" required></div>
  <div class="row"><label for="f_dob">Birth date</label><input id="f_dob" type="date" required></div>
  <div class="row">
    <label>Are you an official member of Providence Community Church?</label>
    <div class="radios">
      <label class="ropt"><input type="radio" name="member" value="Yes"> Yes</label>
      <label class="ropt"><input type="radio" name="member" value="No"> No</label>
    </div>
    <p class="help">We have some ministry needs that are available to non-members and some that
    are restricted to members only.</p>
  </div>
  <div class="row">
    <label>Which ministries are you interested in? <span class="help-inline">Check all that apply.</span></label>
    <div class="mopts">
{checks}
    </div>
  </div>
  <div class="row"><label for="f_note">Anything else we should know? <span class="help-inline">(optional)</span></label>
    <textarea id="f_note" rows="4"></textarea></div>
  <button type="submit" id="mif_submit">Submit</button>
  <p id="mif_err" class="mif-err mif-hidden"></p>
</form>
<div id="mif_done" class="mif-done mif-hidden">
  <h2>Thank you!</h2>
  <p>We've received your interest, and someone will follow up with you soon. In the meantime,
  you're welcome to write to <a href="mailto:info@kcprovidence.org">info@kcprovidence.org</a>.</p>
</div>
{form_js}"""


def label_tables(html):
    """Tag each <td> with its column header as data-label, for mobile stacked cards."""
    def do(m):
        tbl = m.group(0)
        th = re.search(r"<thead>(.*?)</thead>", tbl, re.S)
        tb = re.search(r"<tbody>.*?</tbody>", tbl, re.S)
        if not th or not tb:
            return tbl
        heads = [re.sub(r"<[^>]+>", "", h).strip().replace('"', "&quot;")
                 for h in re.findall(r"<th[^>]*>(.*?)</th>", th.group(1), re.S)]
        def row(rm):
            i = [0]
            def cell(cm):
                lbl = heads[i[0]] if i[0] < len(heads) else ""
                i[0] += 1
                return f'<td data-label="{lbl}"{cm.group(1)}>'
            return re.sub(r"<td([^>]*)>", cell, rm.group(0))
        newtb = re.sub(r"<tr>.*?</tr>", row, tb.group(0), flags=re.S)
        return tbl.replace(tb.group(0), newtb)
    return re.sub(r"<table>.*?</table>", do, html, flags=re.S)


def main():
    files = sorted(SRC.glob("*.md"))
    names = [f.stem for f in files]
    name_to_url = {n: url_for(n) for n in names}
    name_to_url[FORM_NAME] = FORM_URL  # virtual "Start Serving" page for the sidebar
    for s_name, s_url, _s_file in STANDALONE:  # self-contained HTML resources
        name_to_url[s_name] = s_url

    # Drift guard: the Manifest's directory mirrors the sidebar, so every page needs a blurb.
    missing = [n for n in name_to_url if n not in DESCRIPTIONS]
    if missing:
        print("WARNING — pages missing a directory description (add to DESCRIPTIONS):")
        for n in sorted(missing):
            print("  -", n)
    directory_html = build_directory(name_to_url)

    md = markdown.Markdown(extensions=["tables", "attr_list", "fenced_code", "sane_lists"])
    OUT.mkdir(parents=True, exist_ok=True)

    unresolved = set()
    written = 0
    for f in files:
        name = f.stem
        raw = strip_frontmatter(f.read_text(encoding="utf-8"))
        title = first_h1(raw) or name

        # log unresolved wikilinks
        for m in WIKILINK.finditer(raw):
            if m.group(1).strip() not in name_to_url:
                unresolved.add(m.group(1).strip())

        body_md = convert_wikilinks(raw, name_to_url)
        body_md = convert_callouts(body_md, md)
        body_html = md.reset().convert(body_md)
        # wrap tables for horizontal scroll on mobile
        body_html = label_tables(body_html)
        body_html = body_html.replace("<table>", '<div class="tablewrap"><table>').replace("</table>", "</table></div>")
        # inject the auto directory into the Manifest (the only page carrying the marker)
        body_html = (body_html
                     .replace("<p><!-- AUTO_DIRECTORY --></p>", directory_html)
                     .replace("<!-- AUTO_DIRECTORY -->", directory_html))

        crumb = ""
        if name != INDEX_NAME:
            crumb = '<p class="crumb"><a href="/members/">← Ministry Manifest</a></p>'

        page = (PAGE
                .replace("__CSS__", CSS)
                .replace("__TITLE__", html.escape(title))
                .replace("__NAV__", build_nav(name, name_to_url))
                .replace("__CRUMB__", crumb)
                .replace("__BODY__", body_html))
        p = out_path(name)
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_text(page, encoding="utf-8")
        written += 1

    # The Ministry Interest Form (a generated page, not a markdown note)
    form_page = (PAGE
                 .replace("__CSS__", CSS)
                 .replace("__TITLE__", html.escape(FORM_NAME))
                 .replace("__NAV__", build_nav(FORM_NAME, name_to_url))
                 .replace("__CRUMB__", '<p class="crumb"><a href="/members/">← Ministry Manifest</a></p>')
                 .replace("__BODY__", build_form_body()))
    fp = OUT / "ministry-interest-form" / "index.html"
    fp.parent.mkdir(parents=True, exist_ok=True)
    fp.write_text(form_page, encoding="utf-8")
    written += 1

    # Standalone HTML resources — copied verbatim into /members/<slug>/ (each is a
    # self-contained designed page with its own back-link; not wrapped in PAGE).
    for s_name, s_url, s_file in STANDALONE:
        slug = s_url.strip("/").split("/")[-1]
        src = STANDALONE_DIR / s_file
        dest = OUT / slug / "index.html"
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(src.read_text(encoding="utf-8"), encoding="utf-8")
        written += 1

    print(f"Wrote {written} member pages to {OUT}")
    if unresolved:
        print("Unresolved wikilinks (rendered as plain text):")
        for u in sorted(unresolved):
            print("  -", u)


if __name__ == "__main__":
    main()
