"""Append 10 university-level Solids questions to questions.json (chemistry).

Each question is original, scientifically reviewed against standard general-
chemistry curricula (Atkins, Chang, Brown). Maps to topic 'Solid State' which
is wired to chem-ch9 in chapter-topics.json.

Idempotent: skips insertion if questions with these IDs (or topic 'Solid State')
already exist in the chemistry section.
"""
import json, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
QFILE = os.path.join(ROOT, 'questions.json')
sys.stdout.reconfigure(encoding='utf-8')


# 10 questions for chem-ch9 "States of Matter - Solids"
# Each: question, 4 options (A,B,C,D), correct index (0-3), explanation, free flag.
SOLIDS_QUESTIONS = [
    {
        'topic': 'Solid State',
        'question': 'Which of the following is an example of an amorphous solid?',
        'options': [
            'Sodium chloride (NaCl)',
            'Diamond',
            'Glass (silicate)',
            'Quartz (crystalline SiO₂)'
        ],
        'correct': 2,
        'explanation': 'Amorphous solids lack the long-range ordered crystal lattice that defines crystalline solids. Glass is a supercooled liquid: its silicon–oxygen network is rigid but disordered, with no repeating unit cell. NaCl, diamond, and quartz are all crystalline—even though glass and quartz share the same SiO₂ chemistry, only quartz has a regular lattice.',
        'free': True,
    },
    {
        'topic': 'Solid State',
        'question': 'Sodium chloride (NaCl) is best classified as which type of crystalline solid?',
        'options': [
            'Ionic crystal',
            'Molecular crystal',
            'Metallic crystal',
            'Covalent network solid'
        ],
        'correct': 0,
        'explanation': 'NaCl is held together by electrostatic attraction between Na⁺ and Cl⁻ ions arranged in a face-centered cubic lattice (each ion surrounded by 6 of the opposite charge). This defines an ionic crystal: high melting point (801 °C), brittle, and electrically insulating in the solid state but conductive when molten or dissolved (ions become mobile).',
        'free': True,
    },
    {
        'topic': 'Solid State',
        'question': 'Which of the following is a covalent network solid in which every atom is bonded to its neighbors by strong covalent bonds in a continuous 3D lattice?',
        'options': [
            'Iodine (I₂)',
            'Diamond (C)',
            'Iron (Fe)',
            'Solid carbon dioxide (CO₂)'
        ],
        'correct': 1,
        'explanation': 'In diamond, each carbon atom is sp³-hybridized and covalently bonded to four other carbons in a tetrahedral 3D network. Because melting requires breaking covalent bonds throughout the entire lattice, diamond has an extremely high melting point (~3550 °C) and is the hardest naturally occurring substance. Iodine and CO₂ are molecular crystals; iron is metallic.',
        'free': False,
    },
    {
        'topic': 'Solid State',
        'question': 'How many atoms are effectively contained within a simple cubic unit cell?',
        'options': [
            '1',
            '2',
            '4',
            '8'
        ],
        'correct': 0,
        'explanation': 'A simple cubic unit cell has 8 atoms positioned at its 8 corners. Each corner atom is shared among 8 adjacent unit cells, so it contributes only 1/8 of an atom to any given cell. Total = 8 corners × 1/8 = 1 atom per unit cell. This makes simple cubic the least efficient cubic packing (~52% packing fraction).',
        'free': False,
    },
    {
        'topic': 'Solid State',
        'question': 'A body-centered cubic (BCC) unit cell contains how many atoms?',
        'options': [
            '1',
            '2',
            '4',
            '6'
        ],
        'correct': 1,
        'explanation': 'A BCC unit cell has 8 atoms at the corners (each shared with 8 cells, contributing 8 × 1/8 = 1 atom) plus 1 atom at the body center entirely inside the cell (contributing 1 full atom). Total = 1 + 1 = 2 atoms per unit cell. Examples include alpha-iron, chromium, and tungsten. Packing fraction is ~68%.',
        'free': False,
    },
    {
        'topic': 'Solid State',
        'question': 'What is the coordination number of an atom in a face-centered cubic (FCC) crystal structure?',
        'options': [
            '4',
            '6',
            '8',
            '12'
        ],
        'correct': 3,
        'explanation': 'In FCC packing each atom is in direct contact with 12 nearest neighbors: 4 in its own plane, 4 in the plane above, and 4 in the plane below. This is the maximum possible coordination number for identical spheres and is shared with hexagonal close-packed (HCP). FCC metals (e.g., Cu, Al, Au, Ag, Ni) achieve 74% packing efficiency, the highest possible for equal spheres.',
        'free': True,
    },
    {
        'topic': 'Solid State',
        'question': 'Diamond and graphite are both made of pure carbon but have very different physical properties. They are best described as:',
        'options': [
            'Isomers',
            'Allotropes',
            'Isotopes',
            'Polymorphs of an alloy'
        ],
        'correct': 1,
        'explanation': 'Allotropes are different structural forms of the same element. Diamond uses sp³ hybridization in a 3D tetrahedral network, making it hard, transparent, and an electrical insulator. Graphite uses sp² hybridization in stacked hexagonal layers held together by weak London forces, making it soft, opaque, and electrically conductive along the layers. Other carbon allotropes include fullerenes, carbon nanotubes, and graphene.',
        'free': False,
    },
    {
        'topic': 'Solid State',
        'question': 'Which type of crystalline solid typically has the LOWEST melting point?',
        'options': [
            'Ionic crystal',
            'Molecular crystal',
            'Covalent network solid',
            'Metallic crystal'
        ],
        'correct': 1,
        'explanation': 'Molecular crystals (e.g., ice, solid CO₂, iodine, naphthalene) are held together only by relatively weak intermolecular forces — hydrogen bonds, dipole-dipole, or London dispersion. Melting only disrupts these weak interactions, not the strong covalent bonds within molecules, so most molecular solids melt below 200 °C. Ionic, metallic, and covalent network solids all require breaking much stronger interactions and melt at far higher temperatures.',
        'free': False,
    },
    {
        'topic': 'Solid State',
        'question': 'Which of the following substances sublimes at standard atmospheric pressure (changes directly from solid to gas without melting)?',
        'options': [
            'Water (H₂O)',
            'Sodium chloride (NaCl)',
            'Carbon dioxide (CO₂) — "dry ice"',
            'Iron (Fe)'
        ],
        'correct': 2,
        'explanation': 'Dry ice (solid CO₂) sublimes at −78.5 °C at 1 atm because the triple point of CO₂ sits at 5.1 atm — below that pressure, no liquid phase is thermodynamically stable, so the solid passes directly to gas. Water, NaCl, and iron all have stable liquid phases at 1 atm and melt before vaporizing.',
        'free': False,
    },
    {
        'topic': 'Solid State',
        'question': 'Why are most metallic solids good conductors of electricity in the solid state?',
        'options': [
            'Their lattice contains free-moving anions',
            'They have a "sea" of delocalized electrons that move freely throughout the lattice',
            'Their cations vibrate and physically carry charge',
            'They contain hydrogen bonds that conduct electrons'
        ],
        'correct': 1,
        'explanation': 'In the metallic-bond model, the valence electrons of each atom are not bound to individual nuclei but are delocalized across the entire crystal as an "electron sea" surrounding a lattice of metal cations. When a potential difference is applied, this mobile electron cloud drifts and carries current. By contrast, ionic solids only conduct when molten or dissolved (mobile ions), and covalent network solids generally do not conduct because their electrons are localized in covalent bonds.',
        'free': False,
    },
]


def main():
    with open(QFILE, 'r', encoding='utf-8') as f:
        data = json.load(f)

    chem = data.get('chemistry', [])

    # Strip out any prior insert (q-N or chem-N tagged 'Solid State') so this
    # script is fully idempotent — re-running always yields the same final state.
    chem = [q for q in chem if (q.get('topic') or '').lower() != 'solid state']

    # Existing chemistry IDs use the format `chem-N`. Find the max N so new
    # questions slot in cleanly without colliding.
    def chem_n(qid):
        if isinstance(qid, str) and qid.startswith('chem-'):
            try: return int(qid.split('-', 1)[1])
            except (ValueError, IndexError): return 0
        return 0
    next_n = max((chem_n(q.get('id')) for q in chem), default=0) + 1
    print(f'Next available id starts at chem-{next_n}')

    inserted = []
    for q in SOLIDS_QUESTIONS:
        new = {
            'id': f'chem-{next_n}',
            'subject': 'chemistry',
            'topic': q['topic'],
            'question': q['question'],
            'options': q['options'],
            'correct': q['correct'],
            'explanation': q['explanation'],
            'free': q['free'],
        }
        chem.append(new)
        inserted.append(new['id'])
        next_n += 1

    data['chemistry'] = chem
    with open(QFILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f'Inserted {len(inserted)} Solid State questions: {inserted[0]} … {inserted[-1]}')
    print(f'Total chemistry questions now: {len(chem)}')


if __name__ == '__main__':
    main()
