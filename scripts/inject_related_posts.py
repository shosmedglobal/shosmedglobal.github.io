"""Inject a 'Related articles' block above the footer in every blog post.

Each post links to 3 thematically related posts. Cross-linking strengthens the
internal-link graph — the #1 fix for "Discovered – currently not indexed"
because it tells Google these pages have multiple inbound paths and are part
of a real content cluster, not orphans.

Idempotent: a previous injection (marked by `<!-- related-posts -->`) is
stripped before the fresh block is inserted. Re-run anytime the mapping or
post slugs change:

    python scripts/inject_related_posts.py
"""
import os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BLOG = os.path.join(ROOT, 'blog')
sys.stdout.reconfigure(encoding='utf-8')

MARKER = '<!-- related-posts -->'

# Canonical mapping: each post -> (title, blurb, badge_label, badge_class)
POSTS = {
    'lf3-entrance-exam-what-is-on-it.html': {
        'title': "Charles University LF3 Entrance Exam: What's Actually On It",
        'blurb': 'Topic-by-topic breakdown of format, biology and chemistry tested, and how to prepare.',
        'tag':   ('Entrance Exam', 'amber'),
    },
    'mcat-vs-charles-university-entrance-exam.html': {
        'title': 'MCAT vs. Charles University Entrance Exam',
        'blurb': 'Direct comparison of length, scope, cost, timing, and difficulty.',
        'tag':   ('Comparison', 'blue'),
    },
    'charles-university-tuition-2026-cost-breakdown.html': {
        'title': 'Charles University Tuition & Total Cost in 2026',
        'blurb': 'Honest breakdown of tuition, rent, food, transit, and the 6-year total.',
        'tag':   ('Cost & Logistics', 'green'),
    },
    'czech-student-visa-us-canada-medical-students-2026.html': {
        'title': 'Czech Student Visa (2026 Guide for US/Canadian Students)',
        'blurb': 'Step-by-step: timing, documents, embassy process, residence permit.',
        'tag':   ('Cost & Logistics', 'green'),
    },
    'usmle-step-1-pass-fail-img-2026.html': {
        'title': 'USMLE Step 1 Pass/Fail: What It Means for IMGs in 2026',
        'blurb': 'How residency programs filter applicants now that Step 1 is pass/fail.',
        'tag':   ('USMLE & Match', 'red'),
    },
    'from-acceptance-to-residency.html': {
        'title': 'From Acceptance to Residency: A Year-by-Year Roadmap',
        'blurb': 'USMLE timing, clinical rotations, research, and match strategy.',
        'tag':   ('USMLE & Match', 'red'),
    },
    'applying-to-charles-university.html': {
        'title': '5 Things I Wish I Knew Before Applying to Charles University',
        'blurb': 'Hard-won lessons every applicant should know before submitting.',
        'tag':   ('Applying', 'amber'),
    },
}

# Topic clusters — each post links to its 3 most-related siblings.
RELATED = {
    'lf3-entrance-exam-what-is-on-it.html': [
        'mcat-vs-charles-university-entrance-exam.html',
        'applying-to-charles-university.html',
        'charles-university-tuition-2026-cost-breakdown.html',
    ],
    'mcat-vs-charles-university-entrance-exam.html': [
        'lf3-entrance-exam-what-is-on-it.html',
        'applying-to-charles-university.html',
        'charles-university-tuition-2026-cost-breakdown.html',
    ],
    'charles-university-tuition-2026-cost-breakdown.html': [
        'czech-student-visa-us-canada-medical-students-2026.html',
        'applying-to-charles-university.html',
        'lf3-entrance-exam-what-is-on-it.html',
    ],
    'czech-student-visa-us-canada-medical-students-2026.html': [
        'charles-university-tuition-2026-cost-breakdown.html',
        'applying-to-charles-university.html',
        'from-acceptance-to-residency.html',
    ],
    'usmle-step-1-pass-fail-img-2026.html': [
        'from-acceptance-to-residency.html',
        'applying-to-charles-university.html',
        'mcat-vs-charles-university-entrance-exam.html',
    ],
    'from-acceptance-to-residency.html': [
        'usmle-step-1-pass-fail-img-2026.html',
        'applying-to-charles-university.html',
        'lf3-entrance-exam-what-is-on-it.html',
    ],
    'applying-to-charles-university.html': [
        'lf3-entrance-exam-what-is-on-it.html',
        'charles-university-tuition-2026-cost-breakdown.html',
        'from-acceptance-to-residency.html',
    ],
}

TAG_STYLES = {
    'amber': 'background:#FEF3C7; color:#92400E;',
    'blue':  'background:#DBEAFE; color:#1E40AF;',
    'green': 'background:#DCFCE7; color:#166534;',
    'red':   'background:#FEE2E2; color:#991B1B;',
}


def card_html(slug):
    meta = POSTS[slug]
    tag_label, tag_color = meta['tag']
    tag_css = TAG_STYLES[tag_color]
    return (
        f'      <a href="{slug}" class="related-card" '
        f'style="display:block; padding:20px 22px; background:#fff; '
        f'border:1px solid #E5E7EB; border-radius:12px; text-decoration:none; '
        f'color:inherit; transition:transform 0.18s, box-shadow 0.18s, border-color 0.18s;">'
        f'<span style="display:inline-block; padding:2px 9px; {tag_css} '
        f'border-radius:50px; font-size:0.66rem; font-weight:700; '
        f'letter-spacing:0.5px; text-transform:uppercase;">{tag_label}</span>'
        f'<h3 style="font-size:1.02rem; line-height:1.4; margin:10px 0 8px; '
        f'color:#0F172A; font-weight:700;">{meta["title"]}</h3>'
        f'<p style="font-size:0.86rem; line-height:1.55; color:#475569; '
        f'margin:0;">{meta["blurb"]}</p>'
        f'</a>'
    )


def build_block(current_slug):
    related = RELATED[current_slug]
    cards = '\n'.join(card_html(s) for s in related)
    return (
        f'  {MARKER}\n'
        f'  <aside style="max-width:780px; margin:48px auto 0; padding:0 20px;" '
        f'aria-label="Related articles">\n'
        f'    <h2 style="font-family:\'Playfair Display\',serif; '
        f'font-size:1.5rem; color:#0F172A; margin:0 0 6px;">Related guides</h2>\n'
        f'    <p style="color:#64748B; margin:0 0 22px; font-size:0.92rem;">'
        f'More from the SHOS Med blog on the European → US residency pathway.</p>\n'
        f'    <div style="display:grid; '
        f'grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:16px;">\n'
        f'{cards}\n'
        f'    </div>\n'
        f'    <p style="margin:22px 0 0; text-align:center;">'
        f'<a href="index.html" style="color:#CF5B2E; font-weight:600; '
        f'text-decoration:none;">Browse all articles &rarr;</a></p>\n'
        f'  </aside>\n'
        f'  <script>(function(){{ var c=document.querySelectorAll(".related-card"); '
        f'c.forEach(function(el){{ el.addEventListener("mouseenter",function(){{'
        f'el.style.transform="translateY(-2px)";'
        f'el.style.boxShadow="0 10px 24px rgba(15,23,42,0.08)";'
        f'el.style.borderColor="#CF5B2E";}});'
        f'el.addEventListener("mouseleave",function(){{el.style.transform="";'
        f'el.style.boxShadow="";el.style.borderColor="#E5E7EB";}});}});}})();</script>\n'
    )


# Strip the previously-injected block (marker through end of optional
# trailing <script>...</script>). We DO NOT eat surrounding whitespace
# here — the insert step explicitly normalizes whitespace, which makes
# the pipeline fully idempotent (re-running produces byte-identical output).
STRIP_RE = re.compile(
    re.escape(MARKER) +
    r'[\s\S]*?</aside>(?:[ \t]*\n?[ \t]*<script\b[\s\S]*?</script>)?',
    re.DOTALL,
)

# Anchor: just the comment. We rstrip everything before and prepend our
# own normalized blank-line + indentation, so accumulation can't happen.
INSERT_BEFORE_RE = re.compile(r'<!--\s*Footer\s*-->', re.IGNORECASE)


def main():
    files = sorted(f for f in os.listdir(BLOG)
                   if f.endswith('.html') and f != 'index.html')
    modified = 0
    for f in files:
        path = os.path.join(BLOG, f)
        with open(path, 'r', encoding='utf-8') as fh:
            html = fh.read()
        before = html
        # Step 1: strip prior injection (marker + aside + optional script).
        html = STRIP_RE.sub('', html)
        # Step 2: find the footer anchor.
        match = INSERT_BEFORE_RE.search(html)
        if not match:
            print(f'  SKIP  {f}  (no <!-- Footer --> anchor)')
            continue
        if f not in RELATED:
            print(f'  SKIP  {f}  (not in RELATED mapping)')
            continue
        block = build_block(f)
        # Step 3: normalize whitespace around the insertion point so
        # repeated runs converge to a fixed point (true idempotency).
        head = html[:match.start()].rstrip()
        tail = html[match.start():]
        html = head + '\n\n' + block + '\n  ' + tail
        if html != before:
            with open(path, 'w', encoding='utf-8', newline='\n') as fh:
                fh.write(html)
            modified += 1
            print(f'  OK    {f}')
        else:
            print(f'  same  {f}')
    print(f'\nUpdated {modified} blog post(s).')


if __name__ == '__main__':
    main()
