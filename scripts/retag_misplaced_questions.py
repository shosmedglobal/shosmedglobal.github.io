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

    # ---- ITERATION 2 (post-deep-audit) ----

    # ---- bio: 'Cell Division' is broad. A meiosis question (bio-4) was
    # placed in bio-ch7 (Mitosis) because of its tag. Move to bio-ch8.
    {
        'subject': 'biology',
        'old_topic_lc': 'cell division',
        'content_re': re.compile(r'meiosis', re.I),
        'new_topic': 'Meiosis',
        'reason': 'meiosis content -> bio-ch8 (Meiosis)',
    },

    # ---- bio: endosymbiotic theory questions tagged 'Evolution' belong in
    # bio-ch3 (Eukaryotic Cell, which has 'Endosymbiotic theory' topic).
    {
        'subject': 'biology',
        'old_topic_lc': 'evolution',
        'content_re': re.compile(r'endosymbiotic theory|mitochondria.{0,40}originate', re.I),
        'new_topic': 'Endosymbiotic theory',
        'reason': 'endosymbiotic-theory content -> bio-ch3 (Eukaryotic Cell)',
    },

    # ---- bio: photosynthesis-specific questions tagged 'Plant Biology'
    # belong in bio-ch1 (which has the Photosynthesis topic). The remaining
    # plant biology questions (hormones, transport, etc.) stay tagged
    # 'Plant Biology' but that topic itself was moved from bio-ch10 to bio-ch1
    # so they all now live in bio-ch1.
    {
        'subject': 'biology',
        'old_topic_lc': 'plant biology',
        'content_re': re.compile(r'photosynthesis|Calvin cycle|RuBisCO|light[- ]dependent reaction|light reactions of photosynthesis|Photosystem|photorespirat|C4 plant|C3 plant|CAM plant', re.I),
        'new_topic': 'Photosynthesis',
        'reason': 'photosynthesis content -> bio-ch1 (Photosynthesis)',
    },

    # ---- chem: kinetics questions tagged 'Chemical Equilibrium & Kinetics'
    # belong in chem-ch15 (Reaction Kinetics), not chem-ch12 (Equilibrium).
    # Identifying signatures: half-life, rate law, activation energy, Arrhenius,
    # mechanism, reaction order, intermediate, Ea comparison.
    {
        'subject': 'chemistry',
        'old_topic_lc': 'chemical equilibrium & kinetics',
        'content_re': re.compile(r'half[- ]?life|rate law|rate constant|activation energy|Arrhenius|reaction mechanism|first[- ]?order|second[- ]?order|zero[- ]?order|order .{0,20}with respect|overall order|intermediate|catalyst .{0,30}lowers? Ea|Ea\s*=|order of (the )?reaction|rate of (a )?reaction|the rate of', re.I),
        'new_topic': 'Reaction Kinetics',
        'reason': 'kinetics content -> chem-ch15 (Reaction Kinetics)',
    },

    # ---- chem: ether / epoxide questions tagged 'Alcohols, Phenols & Ethers'
    # actually belong in chem-ch23 (Ethers, Epoxides, Thiols, Sulfides).
    {
        'subject': 'chemistry',
        'old_topic_lc': 'alcohols, phenols & ethers',
        'content_re': re.compile(r'Williamson ether|epoxide|ring opening of an epoxide', re.I),
        'new_topic': 'Ethers and Epoxides',
        'reason': 'ether/epoxide content -> chem-ch23 (Ethers, Epoxides)',
    },

    # ---- chem: amino-acid-specific questions tagged 'Nitrogen Compounds'
    # in chem-ch28 (Amines) belong in chem-ch31 (Proteins/Amino Acids).
    {
        'subject': 'chemistry',
        'old_topic_lc': 'nitrogen compounds',
        'content_re': re.compile(r'amino acid|isoelectric point|peptide bond|amino acids? (contains?|has)', re.I),
        'new_topic': 'Amino Acids and Proteins',
        'reason': 'amino-acid content -> chem-ch31 (Amino Acids and Proteins)',
    },

    # ---- chem: lipid-metabolism questions (β-oxidation, ketone bodies, fatty
    # acid catabolism) tagged 'Metabolic Biochemistry' currently live in
    # chem-ch33 (Saccharides). Move to chem-ch32 (Lipids) where the actual
    # answer lives.
    {
        'subject': 'chemistry',
        'old_topic_lc': 'metabolic biochemistry',
        'content_re': re.compile(r'β[- ]?oxidation|beta[- ]?oxidation|ketone bod(y|ies)|fatty acid', re.I),
        'new_topic': 'Lipid Metabolism',
        'reason': 'lipid-metabolism content -> chem-ch32 (Lipids)',
    },

    # ---- phys: Newton's-law / dynamics questions tagged broad 'Mechanics'
    # currently fall in phys-ch2 (Kinematics). Re-tag to 'Dynamics' so they
    # land in phys-ch3 (Dynamics & Momentum).
    {
        'subject': 'physics',
        'old_topic_lc': 'mechanics',
        'content_re': re.compile(r"Newton's third law|Newton's second law|Newton's first law|push(es|ed)? against a wall.{0,30}force", re.I),
        'new_topic': 'Dynamics',
        'reason': "Newton's-law content -> phys-ch3 (Dynamics)",
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
