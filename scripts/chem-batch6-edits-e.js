/* Chemistry batch 6 edits, Q41-Q50 (chem-342..chem-351).
   Q47 and Q48 are points-only. Q50 is a fairness repair. */
'use strict';
module.exports = [

{ q: 'Q41', id: 'chem-342', key: 'C',
  stemWas: 'Histidine contains which heterocyclic ring in its side chain?',
  optionsWere: ['Pyrrole', 'Pyridine', 'Imidazole', 'Indole'],
  mainEdits: [
    ['This gives histidine a pKₐ near physiological pH (~6.0), making it an important catalytic residue in many enzymes.',
     'The imidazolium side chain of free histidine has a pKa of about 6; this value can shift in a protein. Its ability to gain or lose a proton helps histidine participate in enzyme acid-base catalysis.']
  ],
  fbEdits: [
    ['A', 'This second nitrogen gives histidine its ability to act as both a proton donor and acceptor near physiological pH (pKa ~6.0 for the imidazole side chain), making it crucial in enzyme active sites.',
     'One imidazole nitrogen can accept a proton, and the protonated group can donate it; the surrounding protein influences this acid-base behavior.'],
    ['B', 'The imidazole ring’s pKa (~6.0) is close to physiological pH, allowing histidine to participate in acid-base catalysis in many enzymes.',
     'The side-chain pKa is about 6 for free histidine and can differ in an enzyme active site, helping explain its role in proton transfer.']
  ],
  points: [
    "Histidine's side chain contains a five-membered imidazole ring with two nitrogens.",
    "The side chain has its own acid-base equilibrium, distinct from histidine's amino and carboxyl groups.",
    'Protein surroundings can change its pKa and support proton donation or acceptance during catalysis.'
  ],
  keep: ['Histidine has an imidazole ring (C₃H₄N₂) in its side chain', 'Indole is the fused bicyclic ring (benzene + pyrrole) found in tryptophan'],
  gone: ['This gives histidine a pKₐ near physiological pH (~6.0), making it an important catalytic residue in many enzymes.',
         'making it crucial in enzyme active sites', 'is close to physiological pH, allowing histidine to participate in acid-base catalysis in many enzymes',
         'Heterocyclic compounds contain at least one non-carbon atom (usually N, O, or S) in the ring'] },

{ q: 'Q42', id: 'chem-343', key: 'B',
  stemWas: 'How many nitrogen atoms does the pyrimidine ring contain?',
  optionsWere: ['1', '2', '3', '4'],
  fbEdits: [
    ['A', 'Think of it as pyridine with an extra nitrogen inserted.',
     'Relative to pyridine, replacing the ring carbon at position 3 with nitrogen gives the pyrimidine pattern.'],
    ['C', 'Three nitrogen atoms in a six-membered ring describes triazine (1,3,5-triazine).',
     'A six-membered aromatic ring with three nitrogen atoms is a triazine; 1,3,5-triazine is one example.']
  ],
  feedback: {
    D: 'Pyrimidine has two ring nitrogens and four ring carbons. The fused purine ring system has four ring nitrogens; adenine and guanine each have an additional nitrogen in an amino group outside the rings, giving five total.'
  },
  points: [
    'Pyrimidine is a six-membered ring with nitrogens at positions 1 and 3.',
    'Cytosine, thymine and uracil are pyrimidine derivatives.',
    'Count ring atoms separately from atoms in attached groups; purine ring nitrogen count is not the total nitrogen count of adenine or guanine.'
  ],
  keep: ['One nitrogen in a six-membered ring describes pyridine, not pyrimidine',
         'Pyrimidine is a six-membered heterocyclic ring containing two nitrogen atoms at positions 1 and 3'],
  gone: ['Think of it as pyridine with an extra nitrogen inserted.',
         'Purine bases (adenine, guanine) contain 4 total nitrogens but across a bicyclic (9-atom) ring system',
         'Heterocyclic compounds contain at least one non-carbon atom (usually N, O, or S) in the ring'] },

{ q: 'Q43', id: 'chem-344', key: 'B',
  stemWas: 'Which of the following is a six-membered heterocycle containing nitrogen, found as a component of NAD⁺ and NADH?',
  optionsWere: ['Pyrrole', 'Nicotinamide (pyridine derivative)', 'Furan', 'Thiophene'],
  main: 'The nicotinamide portion of NAD⁺ contains a six-membered pyridinium ring derived from vitamin B3. Accepting a hydride at C4 reduces this ring to the dihydropyridine form in NADH. The nitrogen-containing six-membered ring remains, but its oxidation state and aromaticity change.',
  feedback: {
    A: 'Pyrrole is a five-membered aromatic ring, so it is not the six-membered nicotinamide ring in NAD⁺. Proline contains the saturated ring pyrrolidine, which should not be confused with pyrrole.',
    C: 'Furan is a five-membered aromatic oxygen-containing ring. A sugar furanose ring is not aromatic furan, and neither describes the nitrogen-containing redox-active nicotinamide ring.',
    D: 'Thiophene is a five-membered sulfur-containing ring. NAD⁺ instead accepts a hydride at its six-membered nicotinamide ring to form NADH.'
  },
  points: [
    'Nicotinamide is the vitamin B3-derived redox-active part of NAD⁺/NADH.',
    'NAD⁺ accepts a hydride, equivalent to a proton plus two electrons, to form NADH.',
    'The nicotinamide ring is pyridinium in NAD⁺ and a reduced dihydropyridine in NADH.'
  ],
  gone: ['It is found in porphyrins (heme, chlorophyll) and in the amino acid proline (as pyrrolidine)',
         'It is found in furanose sugar forms (like the ribose in RNA)',
         'It is not found in NAD⁺ or any standard coenzyme',
         'Heterocyclic compounds contain at least one non-carbon atom (usually N, O, or S) in the ring'] },

{ q: 'Q44', id: 'chem-345', key: 'B',
  stemWas: 'Electrophilic aromatic substitution on pyrrole preferentially occurs at which position?',
  optionsWere: ['C-1 (nitrogen)', 'C-2 (α-position)', 'C-3 (β-position)', 'Equally at all positions'],
  stem: 'At which carbon position does ordinary electrophilic aromatic substitution of unsubstituted pyrrole usually occur preferentially?',
  options: [[0, 'N-1 (the ring nitrogen)']],
  mainEdits: [
    ['than attack at C-3 (β-position).', 'than attack at C-3 (β-position). In unsubstituted pyrrole, C2 and C5 are equivalent α positions.']
  ],
  feedback: {
    A: 'Position 1 is nitrogen and is labeled N-1, not C-1. The question asks about substitution at a ring carbon. Replacing the N–H hydrogen with a group, as in N-methylpyrrole, need not destroy aromaticity; that is different from using the nitrogen lone pair to bind an additional proton.'
  },
  points: [
    "Pyrrole's ring nitrogen is N-1; the adjacent carbons are the α positions, C2 and C5.",
    'Electrophilic carbon substitution usually favors an α position because the intermediate is better resonance-stabilized.',
    'Ordinary N-substitution and nitrogen protonation are different changes and should not be given the same aromaticity explanation.'
  ],
  keep: ['The C-3 (β-position) is less favored for electrophilic attack',
         'Electrophilic substitution does not occur equally at all positions',
         'Pyrrole is an electron-rich heterocycle'],
  gone: ['C-1 (nitrogen)', 'Substitution at nitrogen would disrupt the aromatic π system',
         'Heterocyclic compounds contain at least one non-carbon atom (usually N, O, or S) in the ring'] },

{ q: 'Q45', id: 'chem-346', key: 'B',
  stemWas: 'Caffeine is a derivative of which heterocyclic ring system?',
  optionsWere: ['Pyrimidine', 'Purine (xanthine)', 'Indole', 'Piperidine'],
  stem: "Which complete fused heterocyclic ring system underlies caffeine's xanthine structure?",
  feedback: {
    A: 'A pyrimidine component is present within the fused system, but it does not name the whole structure. Caffeine is a methylated xanthine, a derivative of the purine ring system.',
    D: 'Piperidine is a saturated six-membered ring with one nitrogen. Caffeine instead has a fused nitrogen-containing xanthine structure, so piperidine does not describe its ring system.'
  },
  points: [
    'Caffeine is 1,3,7-trimethylxanthine.',
    'Xanthine belongs to the purine family, with a fused two-ring framework.',
    'A ring within a fused structure is not necessarily the name of the complete ring system.'
  ],
  keep: ['Caffeine (1,3,7-trimethylxanthine) is a methylated derivative of xanthine',
         'Indole (benzene fused to pyrrole) is the ring system found in tryptophan and serotonin'],
  gone: ['<p><strong>A. Pyrimidine:</strong> The purine ring system consists of fused pyrimidine and imidazole rings.</p>',
         'which is why it can block adenosine receptors in the brain',
         'Heterocyclic compounds contain at least one non-carbon atom (usually N, O, or S) in the ring'] },

{ q: 'Q46', id: 'chem-347', key: 'B',
  stemWas: 'Polyethylene is formed by which type of polymerization?',
  optionsWere: ['Condensation polymerization', 'Addition (chain-growth) polymerization', 'Ring-opening polymerization', 'Step-growth polymerization with elimination of water'],
  mainEdits: [
    ['This is initiated by free radicals, cations, or anions, or by coordination catalysts (Ziegler-Natta).',
     'Common routes use free-radical initiation or coordination catalysts, such as Ziegler-Natta catalysts.']
  ],
  fbEdits: [
    ['D', 'Step-growth polymerization with water elimination is another name for condensation polymerization.',
     'Step-growth polymerization with water elimination is a condensation process; it is not the mechanism used to make polyethylene from ethene.']
  ],
  points: [
    'Ethene units add to a growing polyethylene chain without losing a small molecule.',
    'The repeat unit is –CH₂–CH₂–, derived from the two carbons of ethene.',
    'Common polyethylene production routes use radical or coordination chemistry; not every alkene uses the same initiation mechanism.'
  ],
  keep: ['Condensation polymerization involves the loss of a small molecule (usually water) when monomers join',
         'Ring-opening polymerization involves breaking open cyclic monomers'],
  gone: ['This is initiated by free radicals, cations, or anions, or by coordination catalysts (Ziegler-Natta).',
         'is another name for condensation polymerization',
         'Chemical structure determines chemical properties - understanding structure allows prediction of reactivity and behavior.'] },

{ q: 'Q47', id: 'chem-348', key: 'B',
  stemWas: 'Nylon-6,6 is produced by condensation polymerization of:',
  optionsWere: ['Ethylene glycol and terephthalic acid', 'Hexamethylenediamine and adipic acid', 'Caprolactam', 'Styrene and butadiene'],
  pointsOnly: true,
  points: [
    'Nylon-6,6 is formed from a six-carbon diamine and a six-carbon dicarboxylic acid.',
    'Amine and carboxyl groups form amide linkages, making nylon-6,6 a polyamide.',
    'Nylon-6 is a different polymer associated with caprolactam; do not confuse its name with nylon-6,6.'
  ],
  keep: ['Nylon-6,6 is a polyamide formed by the condensation of hexamethylenediamine', 'Caprolactam is the monomer for nylon-6'],
  gone: ['Chemical structure determines chemical properties - understanding structure allows prediction of reactivity and behavior.'] },

{ q: 'Q48', id: 'chem-349', key: 'C',
  stemWas: 'In an SN2 reaction, the rate depends on the concentration of:',
  optionsWere: ['Only the substrate', 'Only the nucleophile', 'Both the substrate and the nucleophile', 'Neither - it is zero order'],
  pointsOnly: true,
  points: [
    'The elementary SN2 rate law is rate = k[substrate][nucleophile].',
    'Doubling either concentration doubles the rate; doubling both gives a fourfold increase at the same temperature.',
    'Backside attack and leaving-group departure occur together; at a stereogenic reacting carbon this inverts the arrangement of its bonds.'
  ],
  keep: ['SN2 (bimolecular nucleophilic substitution) follows second-order kinetics', 'Walden inversion'],
  gone: ['Chemical structure determines chemical properties - understanding structure allows prediction of reactivity and behavior.'] },

{ q: 'Q49', id: 'chem-350', key: 'B',
  stemWas: 'SN1 reactions are favored by:',
  optionsWere: ['Primary substrates and strong nucleophiles', 'Tertiary substrates and polar protic solvents', 'Primary substrates and polar aprotic solvents', 'Methyl substrates and weak nucleophiles'],
  stem: 'For ordinary saturated alkyl halides without allylic or benzylic stabilization, which combination generally favors an SN1 pathway?',
  main: 'SN1 involves ionization to a carbocation. Among comparable ordinary alkyl substrates, tertiary carbocations are more stable than secondary or primary ones. Polar protic solvents can stabilize the developing ions and favor this pathway. In the simple SN1 rate law, the slow ionization step depends on substrate concentration rather than nucleophile concentration.',
  feedback: {
    A: 'Ordinary primary alkyl halides do not readily form primary carbocations. An unhindered primary substrate with a suitable strong nucleophile usually favors direct SN2 attack instead.',
    C: 'An unhindered primary substrate and a polar aprotic solvent often favor SN2. Such solvents generally hydrogen-bond to anionic nucleophiles less strongly than protic solvents; they do not leave the anions completely unsolvated.'
  },
  points: [
    'SN1 begins with ionization to a carbocation, so carbocation stability matters.',
    'Tertiary substrates are favored over ordinary primary substrates under suitable ionizing conditions.',
    'Polar protic solvents commonly favor SN1, but solvent labels alone do not determine a mechanism.'
  ],
  keep: ['Methyl substrates cannot form stable carbocations at all'],
  gone: ['Tertiary substrates form the most stable carbocations',
         'Polar aprotic solvents (like DMSO, DMF, acetone) enhance nucleophile reactivity by not solvating anions',
         'Chemical structure determines chemical properties - understanding structure allows prediction of reactivity and behavior.'] },

{ q: 'Q50', id: 'chem-351', key: 'B',
  stemWas: 'E2 elimination requires which geometric relationship between the leaving group and the β-hydrogen?',
  optionsWere: ['Syn-periplanar', 'Anti-periplanar (trans-diaxial)', 'Gauche', 'Any geometry is acceptable'],
  stem: 'When rotation about the relevant carbon-carbon single bond is possible, which relationship between a β-hydrogen and the leaving group is usually favored for E2 elimination?',
  options: [[1, 'Anti-periplanar']],
  main: 'The anti-periplanar arrangement places the β-hydrogen and leaving group about 180° apart. It gives suitable orbital alignment in a staggered conformation, making it generally preferable to an eclipsed syn-periplanar arrangement. For a cyclohexane chair, the usual anti geometry corresponds to a trans-diaxial hydrogen and leaving group.',
  feedback: {
    A: 'Syn-periplanar geometry can permit E2 elimination in some constrained cases. When both arrangements are accessible, the anti arrangement is usually favored because it avoids the eclipsing associated with syn geometry.',
    C: 'A gauche arrangement places the groups about 60° apart and lacks the usual periplanar alignment for concerted C–H and C–leaving-group bond cleavage.',
    D: 'Geometry matters because the breaking bonds must align with the developing π bond. For the freely rotating case in the stem, anti-periplanar is the usual favorable arrangement.'
  },
  points: [
    'E2 removes a β-hydrogen as the leaving group departs and the C=C bond forms.',
    'Anti-periplanar geometry is generally favored when accessible; syn elimination is not universally impossible.',
    'Trans-diaxial is the usual cyclohexane-chair expression of the anti-periplanar arrangement.'
  ],
  gone: ['E2 elimination is a concerted, one-step process that requires an anti-periplanar arrangement',
         'In cyclohexane rings, both groups must be axial and trans to each other',
         'Anti-periplanar (trans-diaxial)',
         'E2 is highly geometry-dependent - not any arrangement will work',
         'Chemical structure determines chemical properties - understanding structure allows prediction of reactivity and behavior.'] }

];
