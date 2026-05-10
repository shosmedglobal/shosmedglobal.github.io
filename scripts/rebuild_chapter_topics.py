"""Expert subject-knowledge rebuild of chapter-topics.json.

Each chapter is manually mapped (by subject expertise) to the topic strings
that semantically belong to that chapter's curriculum — not fuzzy-matched.
Reviewed against the actual question topic list dumped from questions.json
+ questions-physics.json. Run once when topics or chapters change.
"""
import json, re, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.stdout.reconfigure(encoding='utf-8')

with open(os.path.join(ROOT, 'questions.json'), encoding='utf-8') as f:
    main = json.load(f)
with open(os.path.join(ROOT, 'questions-physics.json'), encoding='utf-8') as f:
    phys = json.load(f)

def chapter_title(path):
    with open(path, encoding='utf-8') as fh:
        html = fh.read()
    m = re.search(r'<h2[^>]*>(.*?)</h2>', html, re.DOTALL | re.IGNORECASE)
    return re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', '', m.group(1))).strip() if m else '?'


# ============================================================================
# EXPERT MAPPING - biology (40 chapters)
# ============================================================================
BIO = {
    'bio-ch1':  ['Bioenergetics', 'Cellular respiration', 'Fermentation and ATP',
                 'Photosynthesis', 'Photosynthesis and Respiration', 'Enzymes',
                 'Cell Signaling', 'Biochemistry', 'Scientific Method',
                 'Milestones in Biology'],
    'bio-ch2':  ['Prokaryotic Organisms', 'Bacterial structure', 'Bacterial classification',
                 'Bacterial reproduction', 'Bacterial genetics', 'Antibiotics',
                 'Microbiology', 'Cyanobacteria'],
    'bio-ch3':  ['Eukaryotic Cell', 'Cell organelles', 'Cell membrane and transport',
                 'Cell Biology', 'Endosymbiotic theory', 'Prokaryotic vs eukaryotic cells'],
    'bio-ch4':  ['Virology', 'Viral cycles', 'Virus structure', 'HIV'],
    'bio-ch5':  ['Nucleic Acids', 'DNA replication', 'DNA structure', 'Molecular Biology'],
    'bio-ch6':  ['Gene Expression', 'Transcription', 'Translation', 'Genetic code',
                 'RNA types', 'Protein structure', 'Gene regulation',
                 'Molecular Genetics Advanced', 'Mutagenicity Testing',
                 'Oncogenes', 'Tumor suppressors'],
    'bio-ch7':  ['Mitosis', 'Mitosis and Cell Cycle', 'Cell Division',
                 'Cell cycle', 'Cell cycle regulation'],
    'bio-ch8':  ['Meiosis', 'Gametogenesis', 'Oogenesis', 'Karyotype and sex determination'],
    'bio-ch9':  ['Origin of Life', 'Origin of life'],
    'bio-ch10': ['Evolution', 'Lamarck vs Darwin', 'Natural selection',
                 'Classification and Taxonomy', 'Taxonomy', 'Zoological Classification',
                 'Arthropod Classification', 'Plant Biology'],
    'bio-ch11': ['Prokaryotic Genetics', 'Bacterial genetics'],
    'bio-ch12': ['Mendelian Genetics', 'Mendelian genetics', 'Dihybrid cross',
                 'Codominance', 'Incomplete dominance', 'Gene linkage'],
    'bio-ch13': ['Human Genetics', 'X-linked inheritance', 'Autosomal inheritance', 'Genetics'],
    'bio-ch14': ['Cytogenetics', 'Barr bodies'],
    'bio-ch15': ['Single-gene disorders', 'Single-Gene Disorders', 'Genetics of Disease'],
    'bio-ch16': ['Chromosome Disorders', 'Chromosome disorders'],
    'bio-ch17': ['Genetic Counseling'],
    'bio-ch18': ['Biotechnology and DNA Technology', 'DNA Technology', 'DNA technology'],
    'bio-ch19': ['Population Genetics', 'Hardy-Weinberg', 'Genetic drift'],
    'bio-ch20': ['Evolution of Populations'],
    'bio-ch21': ['Developmental Biology', 'Germ layers', 'Morphogenesis',
                 'Differentiation', 'Stem Cells'],
    'bio-ch22': ['Tissues', 'Histology', 'Connective tissue', 'Connective tissue subtypes',
                 'Epithelial tissue', 'Muscle tissue', 'Nervous tissue'],
    'bio-ch23': ['Skeletal System', 'Skeletal and Muscular System'],
    'bio-ch24': ['Skeletal and Muscular System'],
    'bio-ch25': ['Circulatory System', 'Cardiovascular System'],
    'bio-ch26': ['Respiratory System'],
    'bio-ch27': ['Digestive System', 'Digestion'],
    'bio-ch28': ['Excretory System', 'Excretory System (Kidney/Nephron)',
                 'Renal Physiology', 'Nitrogen Waste Products'],
    'bio-ch29': ['Integumentary/Skin + Nutrition/Vitamins'],
    'bio-ch30': ['Reproductive System', 'Cnidarian Reproduction'],
    'bio-ch31': ['Endocrine System'],
    'bio-ch32': ['Nervous System', 'Nervous System (CNS + PNS + Autonomic)'],
    'bio-ch33': ['Nervous System (CNS + PNS + Autonomic)'],
    'bio-ch34': ['Internal Environment', 'Human Physiology', 'Human Anatomy'],
    'bio-ch35': ['Sense Organs', 'Sensory Organs', 'Sensory Organs (Eye, Ear)'],
    'bio-ch36': ['Blood'],
    'bio-ch37': ['Immune System'],
    'bio-ch38': ['Nutrition', 'Nutrition and Metabolism', 'Integumentary/Skin + Nutrition/Vitamins'],
    'bio-ch39': ['Human Evolution', 'Human evolution'],
    'bio-ch40': ['Ecology', 'Ecology and Sustainability', 'Ecosystem ecology',
                 'Eutrophication', 'Greenhouse effect', 'Ozone depletion', 'Ethology',
                 'Medical Mycology', 'Medical Parasitology - Helminths',
                 'Medical Parasitology - Protozoa', 'Parasitology', 'Arthropod Vectors'],
}

# ============================================================================
# EXPERT MAPPING - chemistry (33 chapters)
# ============================================================================
CHEM = {
    'chem-ch1':  ['Atomic Structure', 'Electron Configuration',
                  'Nuclear Chemistry & Radioactivity'],
    'chem-ch2':  ['Inorganic Nomenclature', 'Naming and Nomenclature', 'Nomenclature',
                  'Biochemistry Nomenclature', 'Descriptive Inorganic Chemistry',
                  'Ionic Hydrides', 'Carbide Chemistry'],
    'chem-ch3':  ['Physical Quantities', 'Calculation Problems'],
    'chem-ch4':  ['Energy', 'Thermochemistry'],
    'chem-ch5':  ['Periodic Table', 'Noble Gases'],
    'chem-ch6':  ['Chemical Bonding', 'Chemical Bonds'],
    'chem-ch7':  ['Gas Laws', 'States of Matter & Gas Laws', 'States of Matter'],
    'chem-ch8':  ['Liquid State'],
    'chem-ch9':  [],
    'chem-ch10': ['Solutions', 'Solutions & Concentration', 'Concentration',
                  'Concentration Calculations'],
    'chem-ch11': ['Stoichiometry', 'Stoichiometry & Moles'],
    'chem-ch12': ['Chemical Equilibrium', 'Chemical Equilibrium & Kinetics'],
    'chem-ch13': ['Acids and Bases', 'Acids, Bases & pH'],
    'chem-ch14': ['Buffers and Titration', 'Salt Hydrolysis',
                  'Salt Hydrolysis Calculation', 'Solutions and pH'],
    'chem-ch15': ['Reaction Kinetics'],
    'chem-ch16': ['Redox Reactions', 'Redox Reactions & Electrochemistry'],
    'chem-ch17': ['Organic Chemistry', 'Functional Group Reactions'],
    'chem-ch18': ['Isomerism'],
    'chem-ch19': ['Polymers & Reaction Mechanisms'],
    'chem-ch20': ['Hydrocarbons (Alkanes, Alkenes, Alkynes)', 'Alkanes, Alkenes, Alkynes'],
    'chem-ch21': ['Aromatic Compounds', 'Arenes'],
    'chem-ch22': ['Alcohols and Phenols', 'Alcohols, Phenols & Ethers'],
    'chem-ch23': ['Alcohols, Phenols & Ethers'],
    'chem-ch24': ['Aldehydes & Ketones', 'Carbonyl Compounds'],
    'chem-ch25': ['Carboxylic Acids', 'Carboxylic Acids & Derivatives'],
    'chem-ch26': ['Carboxylic Acids & Derivatives'],
    'chem-ch27': ['Sulfonic Acids and Carbonic Derivatives'],
    'chem-ch28': ['Amines', 'Nitrogen Compounds'],
    'chem-ch29': ['Heterocyclic Compounds'],
    'chem-ch30': ['Nucleic Acids'],
    'chem-ch31': ['Amino Acids and Proteins', 'Enzyme Classification', 'Enzymes'],
    'chem-ch32': ['Lipids', 'Porphin, Steroids, Vitamins', 'Vitamins'],
    'chem-ch33': ['Saccharides', 'Metabolic Biochemistry', 'Biochemistry',
                  'Nitrogen Waste Products'],
}

# ============================================================================
# EXPERT MAPPING - physics (23 chapters)
# ============================================================================
PHYS = {
    'phys-ch1':  ['SI System & Units', 'Units and Measurements', 'Material Properties - Isotropy'],
    'phys-ch2':  ['Kinematics', 'Mechanics'],
    'phys-ch3':  ['Dynamics', 'Momentum and Collisions'],
    'phys-ch4':  ['Work, Energy & Power', 'Work and Power'],
    'phys-ch5':  ['Fluids', 'Fluid Mechanics', 'Fluid Dynamics Advanced',
                  "Bernoulli's Equation", 'Fluid Dynamics - Bernoulli Equation', 'Pressure'],
    'phys-ch6':  ['Heat & Thermodynamics', 'Thermodynamics', 'Thermodynamics Advanced'],
    'phys-ch7':  ['Gravitation'],
    'phys-ch8':  ['Electricity & DC Circuits', 'Electricity'],
    'phys-ch9':  ['Magnetism', 'Magnetic Fields', 'Lorentz Force',
                  'Electromagnetism', 'Electromagnetism - Lorentz Force'],
    'phys-ch10': ['AC Electricity & Magnetism', 'AC Circuits', 'AC Circuits - Capacitive Reactance',
                  'AC Circuits - Capacitor', 'AC Circuits - Capacitor Phase',
                  'AC Circuits - Inductive Reactance', 'AC Circuits - Inductor Phase',
                  "AC Circuits - Ohm's Law", 'AC Circuits - Resonance',
                  'AC Circuits - Series RLC Impedance', 'Electromagnetic Induction'],
    'phys-ch11': ['Vibrations, Waves & Sound', 'Waves and Sound', 'Acoustics',
                  'Acoustics - Doppler Effect', 'Acoustics - Frequency and Period',
                  'Acoustics - Frequency Ranges', 'Acoustics - Hearing Thresholds',
                  'Acoustics - Sound Velocity', 'Doppler Effect'],
    'phys-ch12': ['Light & Optics', 'Optics', 'Geometric Optics Advanced',
                  'Microscope Optics', 'Polarization of Dielectrics',
                  'Electromagnetic Radiation', 'Medical Physics Applications',
                  'Black Body Radiation', 'Thermal Radiation - Black Body',
                  "Thermal Radiation - Wien's Law"],
    'phys-ch13': ['Nuclear Physics', 'Nuclear Physics - Half-Life Calculation',
                  'Nuclear Physics - Radioactive Decay', 'Radioactive Decay',
                  'Modern Physics', 'Particle Accelerators - Cyclotron',
                  'Semiconductor Diodes', 'Semiconductors - Depletion Region',
                  'Semiconductors - Doping', 'Semiconductors - Forward Bias',
                  'Semiconductors - Half-Wave Rectifier', 'Semiconductors - Reverse Bias'],
    'phys-ch14': ['Adiabatic Processes'],
    'phys-ch15': ['Harmonic Oscillation'],
    'phys-ch16': ['Surface Tension'],
    'phys-ch17': ['Solenoid Magnetic Field'],
    'phys-ch18': ['Photoelectric Effect'],
    'phys-ch19': ['Theory of Relativity'],
    'phys-ch20': ['Torque'],
    'phys-ch21': ["Faraday's Law of Electrolysis"],
    'phys-ch22': ['De Broglie Waves'],
    'phys-ch23': ['Compton Scattering and X-rays'],
}


def question_pool(prefix):
    if prefix == 'bio':  return main['biology']
    if prefix == 'chem': return main['chemistry']
    if prefix == 'phys': return phys['physics']
    return []


def main_run():
    ALL = {**BIO, **CHEM, **PHYS}
    mapping = {}
    for cid, topics in ALL.items():
        prefix = cid.split('-')[0]
        qs = question_pool(prefix)
        topic_set = set(t.lower() for t in topics)
        q_count = sum(1 for q in qs if (q.get('topic') or '').lower() in topic_set)
        title = chapter_title(os.path.join(ROOT, 'study', cid + '.html'))
        mapping[cid] = {'title': title, 'topics': topics, 'questionCount': q_count}

    with open(os.path.join(ROOT, 'chapter-topics.json'), 'w', encoding='utf-8') as f:
        json.dump(mapping, f, indent=2, ensure_ascii=False)

    total = len(mapping)
    covered = sum(1 for v in mapping.values() if v['questionCount'] > 0)
    total_qs = sum(v['questionCount'] for v in mapping.values())
    print(f'Wrote chapter-topics.json: {total} chapters, {covered} covered, {total_qs} total mapped questions')
    print()
    for prefix in ('bio', 'chem', 'phys'):
        chs = {k: v for k, v in mapping.items() if k.startswith(prefix)}
        cov = sum(1 for v in chs.values() if v['questionCount'] > 0)
        qs = sum(v['questionCount'] for v in chs.values())
        print(f'  {prefix}: {cov}/{len(chs)} chapters covered, {qs} questions mapped')
    print()
    print('=== Empty chapters ===')
    for cid, v in mapping.items():
        if v['questionCount'] == 0:
            print(f'  {cid}: "{v["title"]}" (topics={v["topics"]})')


if __name__ == '__main__':
    main_run()
