"""Surgical re-tagging of questions that were placed in the wrong chapter
because their `topic` field was too broad. Each rule below was identified
during the expert subject-knowledge audit (bio + chem + phys teacher).

Rules apply by question-text keyword match. Idempotent: re-running doesn't
double-tag because the rules look at content, and once retagged a question
won't match the OLD-topic predicate anymore.

Run after questions.json changes:
    python scripts/retag_misplaced_questions.py
"""
import json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
QFILE = os.path.join(ROOT, 'questions.json')
sys.stdout.reconfigure(encoding='utf-8')

# ---------------------------------------------------------------------------
# RULES — each rule = (subject, current_topic_match, content_keyword_regex,
#                       new_topic, reason)
# A question matches if its subject == subject AND its current topic matches
# AND its question text matches the regex. Then its topic is changed to new_topic.
# ---------------------------------------------------------------------------
RULES = [
    # ---- bio: "Molecular Biology" tag is too broad. Re-tag based on content. ----
    # Protein-synthesis questions belong in bio-ch6 (Gene Expression), not bio-ch5 (DNA).
    {
        'subject': 'biology',
        'old_topic_lc': 'molecular biology',
        'content_re': re.compile(r'protein synthesis|tRNA|amino acids? to the ribosome|carries amino', re.I),
        'new_topic': 'Translation',
        'reason': 'protein-synthesis content -> bio-ch6 (Translation)',
    },
    # Genetic-code / codon questions also belong in bio-ch6 (Genetic code is in ch6).
    {
        'subject': 'biology',
        'old_topic_lc': 'molecular biology',
        'content_re': re.compile(r'genetic code|codon|degenerate|reading frame', re.I),
        'new_topic': 'Genetic code',
        'reason': 'genetic-code content -> bio-ch6 (Genetic code)',
    },
    # Lagging-strand / Okazaki / DNA polymerase / replication-mechanics questions
    # are correctly in bio-ch5 — re-tag from the broad "Molecular Biology" to the
    # specific "DNA replication" so the chapter mapping stays clean.
    {
        'subject': 'biology',
        'old_topic_lc': 'molecular biology',
        'content_re': re.compile(r'okazaki|lagging strand|DNA polymerase|replication fork|primase|helicase', re.I),
        'new_topic': 'DNA replication',
        'reason': 'replication-mechanics content -> bio-ch5 (DNA replication)',
    },

    # ---- bio: "Evolution" tag absorbs Hardy-Weinberg and genetic-drift questions
    # that actually belong in bio-ch19 (Population Genetics). Re-tag explicitly. ----
    {
        'subject': 'biology',
        'old_topic_lc': 'evolution',
        'content_re': re.compile(r'Hardy[- ]?Weinberg|allele frequenc(y|ies) to remain|p\^?2 ?\+ ?2pq', re.I),
        'new_topic': 'Hardy-Weinberg',
        'reason': 'Hardy-Weinberg content -> bio-ch19 (Population Genetics)',
    },
    {
        'subject': 'biology',
        'old_topic_lc': 'evolution',
        'content_re': re.compile(r'genetic drift|bottleneck effect|founder effect', re.I),
        'new_topic': 'Genetic drift',
        'reason': 'genetic-drift content -> bio-ch19 (Population Genetics)',
    },

    # ---- chem: inorganic-carbon question mistagged as "Biochemistry" in saccharides ----
    {
        'subject': 'chemistry',
        'old_topic_lc': 'biochemistry',
        'content_re': re.compile(r'inorganic carbon|CO2|CO_2|carbonate|carbon monoxide|cyanide', re.I),
        'new_topic': 'Descriptive Inorganic Chemistry',
        'reason': 'inorganic-carbon content -> chem-ch2 (Descriptive Inorganic Chemistry)',
    },

    # ---- phys: pure magnetism/Lorentz/ferromagnetism questions tagged "AC
    # Electricity & Magnetism" actually belong in phys-ch9 (Magnetism). ----
    {
        'subject': 'physics',
        'old_topic_lc': 'ac electricity & magnetism',
        'content_re': re.compile(r'ferromagnetic|paramagnetic|diamagnetic|magnetic domain', re.I),
        'new_topic': 'Magnetism',
        'reason': 'ferromagnetism content -> phys-ch9 (Magnetism)',
    },
    {
        'subject': 'physics',
        'old_topic_lc': 'ac electricity & magnetism',
        'content_re': re.compile(r'Lorentz force|charge .{0,30}perpendicular .{0,30}magnetic field|F\s*=\s*qvB|moves at .{0,30}m/s perpendicular to a magnetic', re.I),
        'new_topic': 'Lorentz Force',
        'reason': 'Lorentz-force content -> phys-ch9 (Magnetism)',
    },
    {
        'subject': 'physics',
        'old_topic_lc': 'ac electricity & magnetism',
        'content_re': re.compile(r'magnetic field of .{0,30}T acts on a wire|wire carrying .{0,30}current.{0,40}magnetic field|F\s*=\s*BIL', re.I),
        'new_topic': 'Magnetism',
        'reason': 'force-on-current-wire content -> phys-ch9 (Magnetism)',
    },
]


def load_questions(subject_path):
    if subject_path == 'physics':
        with open(os.path.join(ROOT, 'questions-physics.json'), 'r', encoding='utf-8') as f:
            return json.load(f), 'physics'
    else:
        with open(QFILE, 'r', encoding='utf-8') as f:
            return json.load(f), subject_path


def save_questions(data, key):
    if key == 'physics':
        path = os.path.join(ROOT, 'questions-physics.json')
    else:
        path = QFILE
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def main():
    # Load both files once
    with open(QFILE, 'r', encoding='utf-8') as f:
        main_data = json.load(f)
    with open(os.path.join(ROOT, 'questions-physics.json'), 'r', encoding='utf-8') as f:
        phys_data = json.load(f)

    pools = {
        'biology':   main_data['biology'],
        'chemistry': main_data['chemistry'],
        'physics':   phys_data['physics'],
    }

    changes = []
    for rule in RULES:
        pool = pools[rule['subject']]
        for q in pool:
            cur = (q.get('topic') or '').lower()
            if cur != rule['old_topic_lc']:
                continue
            text = q.get('question') or ''
            if not rule['content_re'].search(text):
                continue
            old_topic = q.get('topic')
            q['topic'] = rule['new_topic']
            changes.append({
                'id': q.get('id'),
                'subject': rule['subject'],
                'from': old_topic,
                'to': rule['new_topic'],
                'reason': rule['reason'],
                'snippet': text[:80],
            })

    # Persist
    main_data['biology']   = pools['biology']
    main_data['chemistry'] = pools['chemistry']
    phys_data['physics']   = pools['physics']
    save_questions(main_data, 'main')
    save_questions(phys_data, 'physics')

    print(f'\n{len(changes)} question(s) re-tagged:\n')
    for c in changes:
        print(f"  {c['subject']:9} {c['id']:>10}  {c['from']!r:>30}  ->  {c['to']!r}")
        print(f"             {c['reason']}")
        print(f"             {c['snippet']}...")
        print()


if __name__ == '__main__':
    main()
