"""(Re)inject the 'Practice this chapter' CTA at top + bottom of every
bio/chem/phys study chapter. Skips research chapters (no QBank coverage).

Idempotent — strips any existing CTA blocks (marked by the HTML comment
<!-- chapter-quiz-cta -->) before re-inserting fresh ones. Re-run anytime
chapter-topics.json changes (e.g. after re-mapping or adding questions).
"""
import json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STUDY = os.path.join(ROOT, 'study')
sys.stdout.reconfigure(encoding='utf-8')

with open(os.path.join(ROOT, 'chapter-topics.json'), encoding='utf-8') as f:
    mapping = json.load(f)

CTA_MARKER = '<!-- chapter-quiz-cta -->'

# Strips an existing CTA block (marker -> first </a> closer)
CTA_STRIP_RE = re.compile(
    re.escape(CTA_MARKER) + r'\s*\n\s*<a[^>]*>.*?</a>\s*',
    re.DOTALL | re.IGNORECASE
)


def cta_html(chapter_id, position, has_questions):
    href = f"qbank.html?chapter={chapter_id}"
    if has_questions:
        if position == 'top':
            heading = "Practice this chapter"
            sub = "Test yourself with chapter-specific questions →"
        else:
            heading = "Ready to practice?"
            sub = "Test yourself on this chapter →"
    else:
        heading = "Chapter quiz coming soon"
        sub = "Questions for this chapter are being curated"

    margin = "10px 0 26px" if position == "top" else "30px 0 16px"
    bg = ("linear-gradient(135deg,#FFF7ED,#FEF3C7)" if has_questions
          else "linear-gradient(135deg,#F5F5F4,#E7E5E4)")
    border_color = "#F59E0B" if has_questions else "#A8A29E"
    text_color = "#92400E" if has_questions else "#57534E"
    cursor = "pointer" if has_questions else "default"
    icon = "&#129504;"   # brain emoji entity (no encoding surprises)

    if has_questions:
        attrs = (
            f'href="{href}" target="_blank" rel="noopener" '
            f'onmouseover="this.style.transform=\'translateY(-1px)\';'
            f'this.style.boxShadow=\'0 6px 16px rgba(245,158,11,0.22)\';" '
            f'onmouseout="this.style.transform=\'\';this.style.boxShadow=\'\';"'
        )
    else:
        attrs = (
            'aria-disabled="true" '
            'onclick="event.preventDefault();return false;" '
            'href="#"'
        )

    return (
        f'{CTA_MARKER}\n'
        f'<a {attrs} '
        f'style="display:flex;align-items:center;gap:14px;'
        f'background:{bg};border:1px solid {border_color};border-radius:10px;'
        f'padding:14px 18px;margin:{margin};text-decoration:none;color:{text_color};'
        f'transition:transform 0.18s ease, box-shadow 0.18s ease;cursor:{cursor};">'
        f'<span style="font-size:1.55rem;flex-shrink:0;line-height:1;">{icon}</span>'
        f'<span style="display:flex;flex-direction:column;line-height:1.3;">'
        f'<strong style="font-size:0.97rem;">{heading}</strong>'
        f'<small style="font-size:0.82rem;opacity:0.85;margin-top:3px;">{sub}</small>'
        f'</span>'
        f'</a>'
    )


def main():
    files = [f for f in os.listdir(STUDY)
             if f.endswith('.html')
             and (f.startswith('bio-ch') or f.startswith('chem-ch') or f.startswith('phys-ch'))]

    modified = 0
    for f in sorted(files):
        path = os.path.join(STUDY, f)
        cid = f.replace('.html', '')
        info = mapping.get(cid, {})
        has_q = info.get('questionCount', 0) > 0

        with open(path, 'r', encoding='utf-8') as fh:
            html = fh.read()

        before = html

        # Strip ALL existing CTA blocks
        html_clean = CTA_STRIP_RE.sub('', html)

        top_cta = cta_html(cid, 'top', has_q)
        bot_cta = cta_html(cid, 'bottom', has_q)

        # Insert top CTA after first <h2>
        h2 = re.search(r'(<h2[^>]*>.*?</h2>)', html_clean, re.DOTALL | re.IGNORECASE)
        if not h2:
            print(f'  WARN no <h2> in {f}, skipping')
            continue
        pos = h2.end()
        html_with_top = html_clean[:pos] + '\n\n' + top_cta + '\n' + html_clean[pos:]

        # Insert bottom CTA before <div class="test-yourself">, else append
        ty = re.search(r'<div\s+class\s*=\s*["\']test-yourself["\']', html_with_top)
        if ty:
            pos = ty.start()
            html_final = html_with_top[:pos] + bot_cta + '\n\n' + html_with_top[pos:]
        else:
            html_final = html_with_top.rstrip() + '\n\n' + bot_cta + '\n'

        if html_final != before:
            with open(path, 'w', encoding='utf-8', newline='\n') as fh:
                fh.write(html_final)
            modified += 1

    print(f'Updated CTAs on {modified} chapter files.')


if __name__ == '__main__':
    main()
