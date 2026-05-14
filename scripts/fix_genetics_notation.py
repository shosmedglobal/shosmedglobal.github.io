"""Fix genetics genotype notation + LaTeX-style subscripts in QBank data.

Two categories of fixes:

  A) Biology — Mendelian genetics wildcards (the bug the user reported)
     -----------------------------------------------------------------
     Authors used either a literal underscore (`A_B_`) for "any allele"
     or — worse — wrapped doubled lowercase letters in <sub> (e.g.
     `A<sub>bb</sub>` meaning "A wildcard, bb homozygous", which renders
     as the letter A with subscript bb — completely wrong).

     Fix: convert to italic genotype letters + non-breaking hyphen for
     the wildcard, matching textbook convention:
        A_         → <i>A</i>&#8209;
        A_B_       → <i>A</i>&#8209;<i>B</i>&#8209;
        aaB_       → aa<i>B</i>&#8209;
        A<sub>bb</sub> → <i>A</i>&#8209;bb

  B) Chemistry / Physics — LaTeX-style subscripts that never got HTML'd
     -----------------------------------------------------------------
     Patterns like `DeltaT_b`, `rate_He`, `hf_0`, `mL_v` are LaTeX-style
     subscript notation that authors wrote expecting Markdown/LaTeX
     rendering. Since the QBank is plain-HTML, they show as literal
     underscores in browser. Convert to real <sub>...</sub>.

This script is idempotent: re-running on already-fixed data is a no-op
because the regexes only match the broken patterns.

Run:
    python scripts/fix_genetics_notation.py
"""
import os, json, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.stdout.reconfigure(encoding='utf-8')

QUESTIONS_BIO_CHEM = os.path.join(ROOT, 'questions.json')
QUESTIONS_PHYS    = os.path.join(ROOT, 'questions-physics.json')

NBHY = '&#8209;'  # non-breaking hyphen — keeps genotypes from line-wrapping


# ===== Pattern A: broken-genetics <sub> ======================================
# A<sub>bb</sub> → <i>A</i>‑bb  (intent was "A wildcard, bb homozygous")
# E<sub>cc</sub> → <i>E</i>‑cc  etc.
# Doubled-lowercase inside <sub> after a single letter is the reliable signal
# this is a busted genetics genotype, NOT a legit physics subscript like
# K<sub>m</sub> (single letter) or V<sub>max</sub> (a word).
BUSTED_GENO_SUB_RE = re.compile(
    r'\b([A-Z])<sub>([a-z])\2</sub>'
)

def fix_busted_geno_sub(text):
    return BUSTED_GENO_SUB_RE.sub(
        lambda m: f'<i>{m.group(1)}</i>{NBHY}{m.group(2)}{m.group(2)}',
        text,
    )


# ===== Pattern B: genetics wildcard underscores (bio only) ===================
# These are matched in a single sweep that recognizes "genotype tokens".
# A genotype token is 1-4 letters where:
#   - each letter is A-Z or a-z (case-sensitive matters in genetics)
#   - terminated by an underscore (the wildcard)
# Examples that should match: A_, aaB_, eeB_, E_, EE_, AaBb_ ...
# Examples that should NOT match (these are math vars in chem/phys):
#   rate_He   ← "rate" is >4 letters AND followed by [A-Z][a-z]+ which is
#               a chemical-element-style subscript, not a wildcard
#   DeltaT_b  ← starts with Greek name
#   H_2       ← followed by a digit
# We require the token to be ≤4 chars and NOT followed by a letter or digit
# (i.e. the `_` is terminal in this token — a wildcard, not a subscript).
GENO_TOKEN_RE = re.compile(
    r'(?<![A-Za-z0-9_])'           # left boundary: not preceded by alnum/underscore
    r'([A-Za-z]{1,4})_'            # the genotype letters + the wildcard underscore
    r'(?![A-Za-z0-9])'             # right boundary: NOT followed by alnum (so `rate_He` is excluded)
)

def fix_geno_wildcards(text):
    def repl(m):
        letters = m.group(1)
        # Only convert if it looks plausibly like a genotype (mix of cases
        # OR a real Mendelian pattern). Reject single uppercase letters
        # that could be variables (E_ in `E_total = ...`) by demanding the
        # surrounding text mentions genetics OR the pattern has at least
        # 2 letters. Single-letter wildcards (E_, A_, B_) are common in
        # Mendelian text so we keep them; the outer caller restricts this
        # function to biology questions only.
        return f'<i>{letters}</i>{NBHY}'
    return GENO_TOKEN_RE.sub(repl, text)


# ===== Pattern C: LaTeX-style subscripts in chem / physics ==================
# Convert `name_sub` → `name<sub>sub</sub>` where:
#   name = identifier-like (letters/Greek prefix), length 1-6
#   sub  = digits, single letter, or word like "He", "max", "rms"
# We intentionally do NOT touch any pattern already inside an <i>...</i>
# or that's been converted by Pattern A/B.
#
# Common cases to fix:
#   DeltaT_b  → ΔT<sub>b</sub>   (Greek prefix Delta → &Delta;)
#   rate_He   → rate<sub>He</sub>
#   rate_O2   → rate<sub>O₂</sub>  (handled via post-processing for digit-trailing element subs)
#   hf_0      → hf<sub>0</sub>
#   mL_v      → mL<sub>v</sub>
#   H_2       → H<sub>2</sub>     (chemistry: hydrogen molecule)
#   K_eq      → K<sub>eq</sub>
#
# Heuristic: identifier + underscore + (digits | 1-4 letters), only when
# both sides aren't already HTML-formatted.
LATEX_SUB_RE = re.compile(
    r'(?<![<>/])'                       # not following an HTML tag opener/closer
    r'([A-Za-z]{1,6})'                  # identifier (Greek words like Delta, math vars like rate, K, V, hf)
    r'_'
    r'([A-Za-z0-9]{1,5})'               # subscript: 1-5 alnum chars
    r'(?![A-Za-z0-9])'                  # not followed by another alnum
)

# Common Greek prefixes that should become HTML entities
GREEK_PREFIXES = {
    'Delta':   '&Delta;',
    'delta':   '&delta;',
    'Sigma':   '&Sigma;',
    'sigma':   '&sigma;',
    'Omega':   '&Omega;',
    'omega':   '&omega;',
    'alpha':   '&alpha;',
    'beta':    '&beta;',
    'gamma':   '&gamma;',
    'lambda':  '&lambda;',
    'mu':      '&mu;',
    'pi':      '&pi;',
    'phi':     '&phi;',
    'theta':   '&theta;',
}

def fix_latex_subs(text):
    def repl(m):
        ident, sub = m.group(1), m.group(2)
        # If `ident` starts with a known Greek prefix, split it.
        # e.g. DeltaT → Δ + T
        for prefix, entity in GREEK_PREFIXES.items():
            if ident.startswith(prefix) and len(ident) > len(prefix):
                rest = ident[len(prefix):]
                return f'{entity}{rest}<sub>{sub}</sub>'
            if ident == prefix:
                return f'{entity}<sub>{sub}</sub>'
        return f'{ident}<sub>{sub}</sub>'
    return LATEX_SUB_RE.sub(repl, text)


# Trailing-digit element subscripts inside an already-converted sub:
# Convert `rate<sub>O2</sub>` → `rate<sub>O<sub>2</sub></sub>` — but nested
# <sub> renders weirdly. Better to use the Unicode subscript char or just
# leave O2 as-is. We'll leave it for now (chemists read O2 fine).


# ===== Driver ================================================================
def fix_text(text, subject):
    if not text or '<' not in text and '_' not in text:
        return text
    out = text
    if subject == 'biology':
        out = fix_busted_geno_sub(out)
        out = fix_geno_wildcards(out)
    if subject in ('chemistry', 'physics'):
        out = fix_latex_subs(out)
    return out


def run():
    total_changes = 0
    per_field = {'question': 0, 'explanation': 0}

    for path in [QUESTIONS_BIO_CHEM, QUESTIONS_PHYS]:
        with open(path, encoding='utf-8') as f:
            data = json.load(f)
        for subject_key, qs in data.items():
            if subject_key not in ('biology', 'chemistry', 'physics'):
                continue
            for q in qs:
                for field in ('question', 'explanation'):
                    orig = q.get(field) or ''
                    new = fix_text(orig, subject_key)
                    if new != orig:
                        per_field[field] += 1
                        total_changes += 1
                        q[field] = new
        # Preserve the existing 2-space indentation Python uses by default.
        with open(path, 'w', encoding='utf-8', newline='\n') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
            f.write('\n')

    print(f'Modified {total_changes} fields total')
    for k, v in per_field.items():
        print(f'  {k}: {v}')


if __name__ == '__main__':
    run()
