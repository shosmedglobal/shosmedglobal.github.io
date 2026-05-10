"""Inject the footer social-icon row into every page that has a SHOS footer.

Looks for the brand description paragraph inside `<div class="footer-brand">`
and inserts a horizontal row of LinkedIn / Instagram / YouTube / Facebook
icon links right after it. Idempotent — re-running won't create duplicates.

Run after edits to URLs or icon set:
    python scripts/inject_social_icons.py
"""
import os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.stdout.reconfigure(encoding='utf-8')

# Marker so we can detect / strip prior injections (idempotent re-run).
MARKER = '<!-- footer-social-icons -->'

# Order chosen by audience priority for SHOS:
#   LinkedIn (admissions / alumni / recruiters)
#   Instagram (Gen-Z applicants / visual content)
#   YouTube (interview prep / virtual tours)
#   Facebook (parents / int'l student groups)
SOCIAL = [
    {
        'name': 'LinkedIn',
        'url': 'https://www.linkedin.com/company/shos-med/',
        'svg': '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    },
    {
        'name': 'Instagram',
        'url': 'https://www.instagram.com/shos.med/',
        'svg': '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>',
    },
    {
        'name': 'YouTube',
        'url': 'https://www.youtube.com/channel/UCii62AIgB49YY9F5dhY28mw',
        'svg': '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
    },
    {
        'name': 'Facebook',
        'url': 'https://www.facebook.com/profile.php?id=61589040164816',
        'svg': '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/></svg>',
    },
]


def build_block():
    parts = [f'  {MARKER}', '  <div class="footer-social" aria-label="Follow SHOS Med">']
    for s in SOCIAL:
        parts.append(
            f'    <a href="{s["url"]}" target="_blank" rel="noopener" '
            f'aria-label="SHOS Med on {s["name"]}" title="{s["name"]}">{s["svg"]}</a>'
        )
    parts.append('  </div>')
    return '\n'.join(parts)


# Strip a previously-injected block (marker + the immediately following
# <div class="footer-social">...</div>). DOTALL so we cross newlines.
STRIP_RE = re.compile(
    r'\s*' + re.escape(MARKER) + r'\s*\n\s*<div class="footer-social"[^>]*>.*?</div>',
    re.DOTALL,
)

# Match the brand description paragraph end so we can insert right after it.
# Generic enough to handle minor whitespace variations across pages.
INSERT_AFTER_RE = re.compile(
    r'(<div class="footer-brand">.*?<p>.*?</p>)',
    re.DOTALL,
)


def find_footer_pages():
    pages = []
    for root, _dirs, files in os.walk(ROOT):
        # Skip node_modules, .git, etc.
        if any(seg in root for seg in ('node_modules', '.git', '.firebase')):
            continue
        for f in files:
            if not f.endswith('.html'):
                continue
            path = os.path.join(root, f)
            with open(path, 'r', encoding='utf-8') as fh:
                html = fh.read()
            if 'footer-brand' in html:
                pages.append(path)
    return sorted(pages)


def main():
    block = build_block()
    pages = find_footer_pages()
    print(f'Found {len(pages)} page(s) with footer-brand:\n')

    modified = 0
    for path in pages:
        rel = os.path.relpath(path, ROOT)
        with open(path, 'r', encoding='utf-8') as f:
            html = f.read()
        original = html

        # Idempotent: strip any prior injection first.
        html = STRIP_RE.sub('', html)

        # Insert fresh block after the brand <p>...</p>.
        match = INSERT_AFTER_RE.search(html)
        if not match:
            print(f'  SKIP  {rel}  (no <div class="footer-brand"> ... <p> ... </p> found)')
            continue
        insert_at = match.end()
        new_html = html[:insert_at] + '\n  ' + block + html[insert_at:]

        if new_html != original:
            with open(path, 'w', encoding='utf-8', newline='\n') as f:
                f.write(new_html)
            modified += 1
            print(f'  OK    {rel}')
        else:
            print(f'  same  {rel}')

    print(f'\nUpdated {modified} page(s).')


if __name__ == '__main__':
    main()
