"""Reorder the top navigation so Charles Uni LF3 sits between Med School
and Residency.

Old order:  Med School · Residency · Mentors · Charles Uni LF3 · Community
New order:  Med School · Charles Uni LF3 · Residency · Mentors · Community

The nav block lives in every HTML page, with `class="active"` sometimes
present on different items per page. We match each <li>...</li> as a
whole so the active state moves with its link.

Idempotent: re-running on already-reordered files is a no-op because
the matcher requires the OLD order (applicants → students → mentors → lf3).
"""
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.stdout.reconfigure(encoding='utf-8')

# Pages that have the nav block at the top of /shos-med-global.
TOP = ['index.html', 'applicants.html', 'students.html', 'mentors.html',
       'lf3.html', 'community.html', 'terms.html', 'success.html',
       'privacy.html', 'login.html', 'signup.html']
# Blog posts live in /blog and use ../ paths.
BLOG = ['blog/' + f for f in os.listdir(os.path.join(ROOT, 'blog'))
        if f.endswith('.html')]

FILES = TOP + BLOG

# Match each nav <li>. Allow the href prefix to be "" or "../" so the
# same regex works for top-level pages and the blog subdir. The whole
# <li>...</li> is captured so we can move it intact (including
# class="active" if present on this page).
def li_re(href_basename, label):
    return re.compile(
        r'(\s*<li><a href="(?:\.\./)?' + re.escape(href_basename) +
        r'"[^>]*>\s*' + re.escape(label) + r'\s*</a></li>)'
    )

PATTERN_APPLICANTS = li_re('applicants.html', 'Med School')
PATTERN_STUDENTS   = li_re('students.html',   'Residency')
PATTERN_MENTORS    = li_re('mentors.html',    'Mentors')
PATTERN_LF3        = li_re('lf3.html',        'Charles Uni LF3')

# A single multi-line match of the four <li>s in OLD order. Whitespace
# between is captured so we can preserve indentation on re-emit.
OLD_BLOCK = re.compile(
    r'(\s*<li><a href="(?:\.\./)?applicants\.html"[^>]*>\s*Med School\s*</a></li>)'
    r'(\s*<li><a href="(?:\.\./)?students\.html"[^>]*>\s*Residency\s*</a></li>)'
    r'(\s*<li><a href="(?:\.\./)?mentors\.html"[^>]*>\s*Mentors\s*</a></li>)'
    r'(\s*<li><a href="(?:\.\./)?lf3\.html"[^>]*>\s*Charles Uni LF3\s*</a></li>)'
)

def reorder_one(src):
    """Reorder the nav block in `src`. Returns (new_src, n_replacements)."""
    def swap(m):
        applicants, students, mentors, lf3 = m.group(1), m.group(2), m.group(3), m.group(4)
        # New: applicants, lf3, students, mentors
        return applicants + lf3 + students + mentors
    return OLD_BLOCK.subn(swap, src)


def run():
    touched = 0
    skipped = 0
    for rel in FILES:
        path = os.path.join(ROOT, rel)
        if not os.path.isfile(path):
            print(f'  skip (missing): {rel}')
            continue
        with open(path, encoding='utf-8') as f:
            src = f.read()
        new_src, n = reorder_one(src)
        if n == 0:
            skipped += 1
            print(f'  no-op (already reordered or no nav): {rel}')
            continue
        with open(path, 'w', encoding='utf-8', newline='\n') as f:
            f.write(new_src)
        touched += 1
        print(f'  reordered: {rel}')
    print(f'\nDone. Touched {touched} files. {skipped} no-ops.')


if __name__ == '__main__':
    run()
