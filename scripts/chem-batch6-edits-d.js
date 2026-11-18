/* Chemistry batch 6 edits, Q31-Q40 (chem-332..chem-341).
   Q32 is a major explanatory rewrite and also repairs the stored malformed
   '<p><p>' paragraph in chem-333. Q35 is a fairness repair. */
'use strict';
module.exports = [

{ q: 'Q31', id: 'chem-332', key: 'C',
  stemWas: 'Under anaerobic conditions in human muscle, pyruvate is converted to:',
  optionsWere: ['Ethanol', 'Acetyl-CoA', 'Lactate', 'Acetaldehyde'],
  main: 'When oxygen supply is insufficient to support the required respiratory NADH oxidation, lactate dehydrogenase helps regenerate cytosolic NAD⁺ by reducing pyruvate to lactate. This permits glycolysis to continue producing its net two ATP per glucose. Lactate production is not confined to low-oxygen conditions; it also occurs when oxygen is available.',
  feedback: {
    A: 'Yeast can convert pyruvate to acetaldehyde and then ethanol during alcoholic fermentation. Human muscle instead uses lactate dehydrogenase to reduce pyruvate directly to lactate.',
    B: 'Pyruvate dehydrogenase forms acetyl-CoA in mitochondria, but that reaction does not regenerate cytosolic NAD⁺ for glycolysis. Under the conditions in this question, pyruvate reduction to lactate provides that regeneration.'
  },
  points: [
    'Lactate dehydrogenase converts pyruvate and NADH to lactate and NAD⁺.',
    'Regenerated NAD⁺ allows glycolysis to continue; the lactate step itself makes no additional ATP.',
    'Lactate formation can occur even when oxygen is present.'
  ],
  keep: ['Acetaldehyde is an intermediate in alcoholic fermentation (yeast)'],
  gone: ['<p><strong>A. Ethanol:</strong> Ethanol is the product of anaerobic fermentation in yeast, not in human muscle.</p>',
         'Under anaerobic conditions, pyruvate stays in the cytoplasm and is reduced to lactate instead',
         'In the absence of sufficient oxygen, NADH from glycolysis cannot be reoxidized',
         'Chemical structure determines chemical properties - understanding structure allows prediction of reactivity and behavior.'] },

{ q: 'Q32', id: 'chem-333', key: 'C',
  stemWas: 'The total theoretical ATP yield from complete oxidation of one glucose molecule is approximately:',
  optionsWere: ['2 ATP', '12 ATP', '30-32 ATP', '38 ATP'],
  stem: 'Using standard approximate ATP accounting for human cells, with about 2.5 ATP per mitochondrial NADH and 1.5 ATP per FAD-linked electron pair, what is the total yield from complete aerobic oxidation of one glucose?',
  main: 'The usual estimate is 30–32 ATP. Direct substrate-level phosphorylation provides 4 ATP equivalents: 2 net ATP from glycolysis and 2 GTP or ATP from the citric acid cycle. Pyruvate oxidation and the cycle produce 8 mitochondrial NADH, worth about 20 ATP, and the cycle supplies 2 FAD-linked electron pairs, worth about 3 ATP. The 2 cytosolic NADH from glycolysis contribute about 5 ATP through the malate-aspartate shuttle or about 3 through the glycerol-3-phosphate shuttle. Therefore the totals are 4 + 20 + 3 + 5 = 32 or 4 + 20 + 3 + 3 = 30. These shuttles transfer reducing equivalents, not NADH molecules across the inner membrane.',
  feedback: {
    A: 'Two ATP is the net direct ATP yield of glycolysis alone. Complete aerobic oxidation also includes pyruvate oxidation, the citric acid cycle and oxidative phosphorylation.',
    B: 'Twelve ATP does not account for all the products of complete glucose oxidation. The eight mitochondrial NADH alone contribute about 20 ATP under the stated convention, before the other contributions are added.',
    D: 'Thirty-eight ATP is the older result obtained using 3 ATP per NADH and 2 per FAD-linked electron pair without the modern shuttle distinction. Those are not the assumptions specified in this question.'
  },
  points: [
    'Four ATP equivalents come directly from substrate-level phosphorylation per completely oxidized glucose.',
    'Most of the estimated 30–32 ATP comes from oxidative phosphorylation.',
    'The cytosolic NADH shuttle explains the standard 30-versus-32 distinction; actual cellular yields can vary.'
  ],
  gone: ['<p><p><strong>', '10 NADH × 2.5 = 25',
         '<strong>B. 12 ATP:</strong> 2 ATP is the net yield from glycolysis alone',
         'The 2 ATP from glycolysis represents only about 6–7% of the total yield',
         'the energy cost of transporting cytoplasmic NADH into mitochondria',
         'Chemical structure determines chemical properties - understanding structure allows prediction of reactivity and behavior.'] },

{ q: 'Q33', id: 'chem-334', key: 'B',
  stemWas: 'Which enzyme catalyzes the committed (rate-limiting) step of glycolysis?',
  optionsWere: ['Hexokinase', 'Phosphofructokinase-1 (PFK-1)', 'Pyruvate kinase', 'Aldolase'],
  stem: 'Which enzyme catalyzes the first committed step of glycolysis?',
  mainEdits: [
    ['Although hexokinase is also regulated, PFK-1 is considered the primary regulatory enzyme of the pathway.',
     'PFK-1 is an important regulatory enzyme; control of pathway flux can be shared among several steps.']
  ],
  feedback: {
    A: 'Hexokinase forms glucose-6-phosphate. That product can enter glycolysis, glycogen metabolism or the pentose phosphate pathway, so this is not the first step committed specifically to glycolysis.',
    C: "Pyruvate kinase catalyzes a later ATP-producing step, from phosphoenolpyruvate to pyruvate. PFK-1 acts earlier at the first committed glycolytic step. Committed does not mean that fructose-1,6-bisphosphate can never be redirected by another pathway.",
    D: 'Aldolase reversibly splits fructose-1,6-bisphosphate into two three-carbon compounds. It acts after PFK-1 and does not catalyze the first committed step.'
  },
  points: [
    'PFK-1 converts fructose-6-phosphate to fructose-1,6-bisphosphate using ATP.',
    'Glucose-6-phosphate has several possible metabolic destinations, whereas the PFK-1 reaction is the first committed glycolytic step.',
    'AMP and fructose-2,6-bisphosphate activate PFK-1; ATP and citrate can inhibit it.'
  ],
  keep: ['PFK-1 catalyzes the phosphorylation of fructose-6-phosphate to fructose-1,6-bisphosphate'],
  gone: ['Although hexokinase is also regulated, pfk-1 is considered the primary regulatory enzyme of the pathway.',
         'The rate-limiting step must be both irreversible and subject to allosteric regulation',
         'the pathway is irreversibly committed to glycolysis',
         'Chemical structure determines chemical properties - understanding structure allows prediction of reactivity and behavior.'] },

{ q: 'Q34', id: 'chem-335', key: 'C',
  stemWas: 'Ketone bodies are produced from:',
  optionsWere: ['Glucose in the cytoplasm', 'Amino acids in the nucleus', 'Acetyl-CoA in the liver mitochondria', 'Fatty acids in the endoplasmic reticulum'],
  mainEdits: [
    ['They serve as an alternative fuel source for the brain, heart, and skeletal muscle when glucose availability is limited.',
     'Acetoacetate and β-hydroxybutyrate are the principal ketone fuels used by extrahepatic tissues. Acetone is volatile and some is exhaled, but it is not a principal ketone fuel.']
  ],
  feedback: {
    B: 'Some amino acid carbon skeletons can contribute to ketone-body synthesis, but the principal site of ketogenesis is liver mitochondria, not the nucleus.',
    D: 'The endoplasmic reticulum participates in several lipid processes, but it is not the principal site of ketogenesis. In fasting, fatty acid oxidation supplies much of the acetyl-CoA used to form ketone bodies in liver mitochondria.'
  },
  points: [
    'Liver mitochondria convert acetyl-CoA into ketone bodies, especially during fasting or insulin deficiency.',
    'Acetoacetate and β-hydroxybutyrate provide fuel for other tissues.',
    'Acetone is a volatile ketone body; some is exhaled, and it is not a main ketone fuel.'
  ],
  keep: ['Glucose in the cytoplasm undergoes glycolysis to form pyruvate',
         'Ketogenesis occurs in liver mitochondria when excess acetyl-CoA accumulates'],
  gone: ['They serve as an alternative fuel source for the brain, heart, and skeletal muscle when glucose availability is limited.',
         'ketogenesis itself occurs in the mitochondria, not the nucleus. The nucleus houses DNA',
         'Fatty acid synthesis (lipogenesis) occurs in the cytoplasm, not the endoplasmic reticulum',
         'Chemical structure determines chemical properties - understanding structure allows prediction of reactivity and behavior.'] },

{ q: 'Q35', id: 'chem-336', key: 'C',
  stemWas: 'FAD is reduced to FADH₂ in which step of the Krebs cycle?',
  optionsWere: ['Citrate → Isocitrate', 'α-Ketoglutarate → Succinyl-CoA', 'Succinate → Fumarate', 'Malate → Oxaloacetate'],
  stem: 'In standard net energy accounting for the citric acid cycle, which reaction is assigned one FADH₂ equivalent rather than one NADH?',
  main: 'Succinate dehydrogenase oxidizes succinate to fumarate. Its enzyme-bound FAD accepts electrons and passes them through the complex to ubiquinone. This step is conventionally counted as one FADH₂ equivalent, although free FADH₂ is not released. Succinate dehydrogenase is also Complex II in the inner mitochondrial membrane.',
  fbEdits: [
    ['D', 'The only step in the Krebs cycle that reduces FAD to FADH₂ is succinate → fumarate, catalyzed by succinate dehydrogenase (Complex II of the ETC).',
     'This is a net NADH-producing step, whereas succinate oxidation supplies the FAD-linked electron pair used in the standard cycle accounting.']
  ],
  points: [
    'Succinate oxidation is the cycle reaction conventionally credited with one FADH₂ equivalent.',
    'FAD remains bound to the enzyme; electrons ultimately reach ubiquinone through Complex II.',
    'An enzyme complex can use FAD internally while producing NADH overall, as α-ketoglutarate dehydrogenase does.'
  ],
  keep: ['the FAD here is used internally, and NADH is the net reduced product',
         'The citrate → isocitrate step is catalyzed by aconitase',
         'Malate → oxaloacetate is catalyzed by malate dehydrogenase'],
  gone: ['This is the only Krebs cycle enzyme embedded in the inner mitochondrial membrane and the only one using FAD as its coenzyme',
         'The only step in the Krebs cycle that reduces FAD to FADH₂ is succinate → fumarate',
         'Chemical structure determines chemical properties - understanding structure allows prediction of reactivity and behavior.'] },

{ q: 'Q36', id: 'chem-337', key: 'B',
  stemWas: 'Pyrrole is a weaker base than pyridine because:',
  optionsWere: ['Pyrrole has a larger ring', 'The nitrogen lone pair in pyrrole is part of the aromatic π system', 'Pyrrole has fewer nitrogen atoms', 'Pyridine is non-aromatic'],
  main: 'Pyrrole uses the nitrogen lone pair as part of its aromatic six-electron π system. Protonating that nitrogen would remove the pair from the aromatic system, making nitrogen protonation unfavorable. In pyridine, the nitrogen lone pair lies in the plane of the ring and is separate from the aromatic π electrons, so it can accept a proton without destroying aromaticity. This explains the basicity difference.',
  feedback: {
    A: "Pyrrole has a smaller five-membered ring, whereas pyridine has a six-membered ring. The relevant distinction is the lone pair's role in aromaticity, rather than ring size by itself."
  },
  points: [
    'Pyrrole and pyridine are both aromatic nitrogen-containing rings.',
    "Pyrrole's nitrogen lone pair contributes two electrons to its aromatic π system.",
    "Pyridine's nitrogen lone pair is separate from its aromatic π system, making nitrogen protonation more favorable."
  ],
  keep: ['Both pyrrole and pyridine each contain one nitrogen atom', 'Pyridine is aromatic - it has 6 π electrons'],
  gone: ['pKₐ of conjugate acid ≈ −4', 'making it unavailable for protonation',
         'Both pyrrole and pyridine are five- and six-membered heterocycles, respectively, but ring size is not the reason',
         'Heterocyclic compounds contain at least one non-carbon atom (usually N, O, or S) in the ring'] },

{ q: 'Q37', id: 'chem-338', key: 'B',
  stemWas: 'Adenine, a purine base found in DNA and RNA, consists of fused:',
  optionsWere: ['Two pyrimidine rings', 'A pyrimidine ring and an imidazole ring', 'Two furan rings', 'A pyridine ring and a pyrrole ring'],
  feedback: {
    C: "Furan is a five-membered aromatic ring containing oxygen. A furanose sugar has a five-membered oxygen-containing ring but is not the aromatic compound furan. Adenine's fused rings contain nitrogen, not oxygen.",
    D: 'Pyridine and pyrrole each have one ring nitrogen. Purine instead contains a six-membered pyrimidine component and a five-membered imidazole component, each with two ring nitrogens.'
  },
  points: [
    'Purine has a fused six-membered and five-membered ring system.',
    'Its ring components are pyrimidine and imidazole, giving four ring nitrogens in total.',
    'Adenine and guanine are the standard purine bases found in both DNA and RNA.'
  ],
  keep: ['Two fused pyrimidine rings would give a different bicyclic system',
         'The purine ring system is composed of a pyrimidine ring (6-membered, containing N) fused to an imidazole ring'],
  gone: ['found in furanose sugar forms but not in nucleotide bases',
         'the correct terminology for the purine components is pyrimidine + imidazole',
         'Heterocyclic compounds contain at least one non-carbon atom (usually N, O, or S) in the ring'] },

{ q: 'Q38', id: 'chem-339', key: 'B',
  stemWas: 'Which heterocyclic ring is found in the amino acid tryptophan?',
  optionsWere: ['Pyridine', 'Indole', 'Pyrimidine', 'Thiophene'],
  fbEdits: [
    ['C', 'It is not present in any amino acid side chain.', 'It is not a side-chain ring in the standard 20 protein amino acids.'],
    ['D', 'It is found in some pharmaceutical compounds but not in amino acids.',
     'It is found in some pharmaceutical compounds but not in the side chains of the standard 20 protein amino acids.']
  ],
  points: [
    "Tryptophan's side chain contains indole, a fused benzene–pyrrole ring system.",
    "Indole has one ring nitrogen; histidine's imidazole ring has two.",
    'Tryptophan is a biological precursor of serotonin and melatonin.'
  ],
  keep: ['Pyridine is a six-membered ring with one nitrogen, found in niacin (vitamin B3)',
         'Tryptophan contains an indole ring system, which is a benzene ring fused to a pyrrole ring'],
  gone: ['It is not present in any amino acid side chain.', 'but not in amino acids.',
         'Heterocyclic compounds contain at least one non-carbon atom (usually N, O, or S) in the ring'] },

{ q: 'Q39', id: 'chem-340', key: 'B',
  stemWas: 'The pyrimidine bases found in DNA are:',
  optionsWere: ['Adenine and guanine', 'Cytosine and thymine', 'Cytosine and uracil', 'Adenine and cytosine'],
  feedback: {
    A: 'Adenine and guanine are the two standard purines, each with a fused two-ring structure. The question asks for the single-ring pyrimidines in DNA: cytosine and thymine.',
    C: 'Cytosine and uracil are the standard pyrimidines of RNA. The corresponding pair in DNA is cytosine and thymine, so uracil makes this option incorrect.'
  },
  points: [
    'The standard DNA pyrimidines are cytosine and thymine.',
    "RNA's standard pyrimidines are cytosine and uracil.",
    'Pyrimidines have one ring; the purines adenine and guanine have two fused rings.'
  ],
  keep: ['Adenine is a purine, not a pyrimidine, so this pairing mixes the two categories',
         'DNA contains two pyrimidine bases: cytosine (C) and thymine (T)'],
  gone: ['<p><strong>A. Adenine and guanine:</strong> Adenine and guanine are the purine bases (double-ring structures) found in both DNA and RNA.</p>',
         '<strong>C. Cytosine and uracil:</strong> RNA contains cytosine and uracil (u) instead of thymine.',
         'Heterocyclic compounds contain at least one non-carbon atom (usually N, O, or S) in the ring'] },

{ q: 'Q40', id: 'chem-341', key: 'C',
  stemWas: 'Furan, pyrrole, and thiophene are five-membered heterocycles. The heteroatom in thiophene is:',
  optionsWere: ['Nitrogen', 'Oxygen', 'Sulfur', 'Phosphorus'],
  mainEdits: [
    [" Thiophene is the most stable and most aromatic of the three due to the better size match of sulfur's 3p orbitals with carbon 2p orbitals.", '']
  ],
  feedback: {
    D: 'Thiophene contains sulfur, not phosphorus, as shown by its formula C₄H₄S. Furan contains oxygen and pyrrole contains nitrogen; these names identify different ring heteroatoms.'
  },
  points: [
    'Thiophene is a five-membered aromatic ring with one sulfur atom.',
    'Furan and pyrrole are the corresponding oxygen- and nitrogen-containing ring examples.',
    "Thiophene's aromatic π system contains six electrons, including a contribution from a sulfur lone pair."
  ],
  keep: ['Nitrogen is the heteroatom in pyrrole (and pyridine, imidazole, etc.)',
         'Oxygen is the heteroatom in furan, not thiophene',
         'Thiophene (C₄H₄S) is a five-membered aromatic heterocycle containing one sulfur atom'],
  gone: ['Thiophene is the most stable and most aromatic of the three',
         'Phosphorus is not found in common simple heterocyclic aromatic compounds',
         'Heterocyclic compounds contain at least one non-carbon atom (usually N, O, or S) in the ring'] }

];
