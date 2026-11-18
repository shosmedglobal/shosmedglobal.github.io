/* Chemistry batch 7, display Q1-Q10 (chem-362 .. chem-371).
   Every string is the review's own supplied wording. */
'use strict';
module.exports = [

{ q: 'Q1', id: 'chem-362', key: 'B',
  fbEdits: {
    A: [['Silyl ethers (like TBS, TMS, TIPS) are ideal because they are easily added and cleanly removed under mild conditions.',
         'Silyl ethers are useful because they can mask the hydroxyl group during suitable reactions and later be removed to regenerate the alcohol.']],
    C: [['Silyl ethers fit all three criteria perfectly.',
         'The choice of protecting group depends on which later reactions it must tolerate and how it will be removed.']]
  },
  fb: {
    D: "Tosylates and mesylates are commonly used to turn an alcohol's hydroxyl group into a good leaving group for substitution or elimination. That is activation for further reaction; a silyl ether is the standard hydroxyl-protection choice among these options."
  },
  points: [
    'A protecting group temporarily masks a functional group so it can be restored later.',
    'Silyl ethers protect alcohols under suitable reaction conditions and can often be removed with fluoride.',
    'Tosylates and mesylates are commonly used to activate alcohols as leaving groups.'
  ],
  keep: ['Protection means temporarily masking a group so it can be restored later.',
         'Good protecting groups are easily installed, stable during subsequent reactions, and readily removed when needed.'],
  gone: ['are ideal because they are easily added', 'fit all three criteria perfectly',
         'which is the opposite of protection', 'Thermodynamics tells us whether a reaction CAN occur'] },

{ q: 'Q2', id: 'chem-363', key: 'B',
  main: "Retrosynthesis plans a synthesis by working backward from the target molecule. The arrow ⇒ means 'can be made from' and points toward proposed precursors. A disconnection breaks a bond on paper; a functional-group interconversion can also be a retrosynthetic step. Synthons are idealized fragments used in planning, whereas the reagents actually used are their synthetic equivalents.",
  fb: {
    C: 'Chemical equilibrium is shown by opposing arrows, ⇌. The retrosynthetic arrow ⇒ instead shows a planning relationship between a target and proposed precursors, not an equilibrium between them.'
  },
  points: [
    'Retrosynthesis works backward from a target to possible starting materials.',
    "The arrow ⇒ means 'can be made from'; it does not represent a reaction occurring in reverse.",
    'A proposed disconnection must ultimately correspond to a feasible forward reaction.'
  ],
  gone: ['the mental operation of breaking the target into simpler precursors (synthons)',
         'a conceptual disconnection where you mentally break a bond in the target',
         'Thermodynamics tells us whether a reaction CAN occur'] },

{ q: 'Q3', id: 'chem-364', key: 'B',
  fb: {
    A: 'A chromium trioxide-pyridine complex is a chromium-based alcohol oxidant; its use in dichloromethane is associated with Collins oxidation. It is not the DMSO/oxalyl chloride/base system that defines Swern oxidation.',
    C: 'PCC in dichloromethane can oxidize primary alcohols to aldehydes and secondary alcohols to ketones. It is a different, chromium-containing reagent system. Which oxidation is most suitable depends on the substrate and its other functional groups.'
  },
  points: [
    'Swern oxidation uses activated DMSO followed by a base.',
    'Primary alcohols give aldehydes; secondary alcohols give ketones.',
    'Swern oxidation avoids chromium reagents, but its suitability still depends on the substrate.'
  ],
  keep: ['Jones reagent (CrO₃ in aqueous H₂SO₄/acetone)'],
  gone: ['The Swern oxidation is preferred for sensitive substrates',
         'a gentler, metal-free approach especially suited for complex, acid-sensitive substrates',
         'Thermodynamics tells us whether a reaction CAN occur'] },

{ q: 'Q4', id: 'chem-365', key: 'B',
  stemWas: 'An amide can be converted to an amine with one fewer carbon atom by which named reaction?',
  stem: 'A primary amide, RCONH₂, can be converted to a primary amine with one fewer carbon atom by which named reaction?',
  mainEdits: [['(the carbonyl carbon is lost as CO₂)',
               '(the carbonyl carbon is removed; in the basic reaction mixture it is ultimately captured as carbonate)']],
  fb: {
    A: 'Curtius rearrangement starts from an acyl azide, RCON₃, rather than the primary amide specified here. It can also yield a primary amine with one fewer carbon after formation and hydrolysis of an isocyanate.',
    C: 'Lossen rearrangement starts from an activated hydroxamic acid derivative. It can form an isocyanate and ultimately an amine, but its starting material is not the simple primary amide in the stem.',
    D: 'In the carboxylic-acid version of the Schmidt reaction, a carboxylic acid reacts with hydrazoic acid under acidic conditions to give an amine with one fewer carbon. It is not the rearrangement of a primary amide asked about here.'
  },
  points: [
    'Hofmann rearrangement converts a primary amide into a primary amine with one fewer carbon.',
    'The carbon removed is the original carbonyl carbon.',
    'Related rearrangements can give similar products but begin with different functional groups.'
  ],
  keep: ['The mechanism involves formation of an isocyanate intermediate followed by hydrolysis.'],
  gone: ['is lost as CO₂', 'all involve nitrene or isocyanate intermediates',
         'All four reactions (Hofmann, Curtius, Lossen, Schmidt) achieve the same net transformation',
         'The curtius rearrangement uses acyl azides to achieve a similar result.',
         'Thermodynamics tells us whether a reaction CAN occur'] },

{ q: 'Q5', id: 'chem-366', key: 'B', frozen: true },

{ q: 'Q6', id: 'chem-367', key: 'B',
  mainEdits: [['The International Union of Biochemistry classifies enzymes into six major classes based on the type of reaction they catalyze.',
               'The IUBMB enzyme classification has seven main classes, based on the reactions catalyzed.']],
  tableEdits: [
    ['<tr><td>Lyase</td><td>Non-hydrolytic bond cleavage</td><td>Decarboxylase, aldolase</td></tr>',
     '<tr><td>Lyase</td><td>Bond cleavage without hydrolysis or oxidation, or the reverse addition reaction</td><td>Decarboxylase, aldolase</td></tr>'],
    ['<tr><td>Ligase</td><td>Bond formation using ATP</td><td>DNA ligase, synthetases</td></tr>',
     '<tr><td>Ligase</td><td>Bond formation coupled to an energy-supplying reaction, commonly nucleotide cleavage</td><td>DNA ligase, synthetases</td></tr>' +
     '<tr><td>Translocase</td><td>Movement of ions or molecules across membranes, or their separation within membranes</td><td>Na⁺/K⁺-transporting ATPase</td></tr>']
  ],
  bl: 'The seven EC classes are oxidoreductases, transferases, hydrolases, lyases, isomerases, ligases and translocases. A kinase that transfers a phosphate group from ATP to a substrate is a transferase.',
  keep: ['Kinases are a specific subclass of transferases that transfer phosphate groups from ATP to substrates.',
         '<td>Isomerase</td>', '<td>Oxidoreductase</td>', '<td>Hydrolase</td>'],
  gone: ['six'] },

{ q: 'Q7', id: 'chem-368', key: 'C',
  bl: 'Niacin supplies the nicotinamide part of NAD⁺ and NADP⁺. Severe deficiency causes pellagra. Tryptophan can also contribute to niacin production; the dietary convention is approximately 60 mg tryptophan per 1 mg niacin equivalent. A poorly varied diet dominated by untreated maize can increase risk because its niacin is poorly available and it supplies relatively little tryptophan.',
  keep: ['<table class=\'exp-table\'>', '<td>Thiamine (B1)</td>'],
  gone: ['60 mg tryptophan → 1 mg niacin', 'corn-based diets (low tryptophan) increase pellagra risk'] },

{ q: 'Q8', id: 'chem-369', key: 'B',
  stemWas: 'The citric acid cycle (Krebs cycle) takes place in which cellular compartment?',
  stem: 'In human cells, most enzymes of the citric acid cycle are located in the:',
  main: 'Most citric acid cycle reactions occur in the mitochondrial matrix. The important exception is succinate dehydrogenase, which is embedded in the inner mitochondrial membrane and also functions as Complex II of the electron transport chain. The cycle oxidizes acetyl-CoA, releases CO₂ and transfers electrons to NAD⁺ and enzyme-bound FAD. These electrons can then support oxidative phosphorylation.',
  fb: {
    A: 'Glycolysis takes place in the cytosol. The citric acid cycle is mainly in the mitochondrial matrix, where acetyl-CoA can come from carbohydrate, fatty acid or amino acid metabolism. Entry into the cycle does not always require pyruvate as the source.',
    C: 'The inner mitochondrial membrane contains the electron transport chain and ATP synthase. It also contains succinate dehydrogenase, but most citric acid cycle enzymes are in the matrix, which is what the stem asks.'
  },
  bl: 'Per acetyl-CoA, a turn of the cycle yields 3 NADH, one FAD-linked reduction, 1 GTP or ATP, and 2 CO₂. The FAD is bound to succinate dehydrogenase. Most cycle enzymes are in the matrix; succinate dehydrogenase is the membrane-bound exception.',
  keep: ['The ER is involved in protein folding (rough ER) and lipid synthesis (smooth ER), not in the citric acid cycle.'],
  gone: ['a series of eight enzymatic reactions', 'requires transport of pyruvate into the mitochondria first',
         '3 NADH, 1 FADH₂, 1 GTP, and 2 CO₂'] },

{ q: 'Q9', id: 'chem-370', key: 'C',
  stemWas: 'The majority of ATP produced during aerobic respiration is generated by:',
  stem: 'In human cells carrying out aerobic respiration, the majority of ATP generated from glucose is produced by:',
  main: 'Oxidative phosphorylation supplies about 26-28 ATP out of the approximate 30-32 ATP obtained per glucose in the standard accounting for human cells. The other 4 ATP equivalents are the net 2 ATP from glycolysis and 2 GTP or ATP from the citric acid cycle. Electrons enter the respiratory chain at different points and ultimately reduce oxygen to water. Complexes I, III and IV pump protons across the inner mitochondrial membrane; ATP synthase uses their return flow to make ATP. The yield varies with the shuttle used for cytosolic NADH and with coupling efficiency.',
  bl: 'Most ATP from aerobic glucose oxidation comes from oxidative phosphorylation. Common estimates are about 2.5 ATP per mitochondrial NADH and about 1.5 ATP per electron pair entering the ubiquinone pool while bypassing Complex I. The latter occurs during succinate oxidation by Complex II; its FAD is enzyme-bound, not a free FADH₂ molecule entering the complex.',
  keep: ['Glycolysis produces only 2 net ATP per glucose via substrate-level phosphorylation',
         'The Krebs cycle produces 2 GTP (equivalent to 2 ATP) per glucose',
         'This occurs in chloroplasts during photosynthesis'],
  gone: ['approximately 30-34 of the ~36-38 total ATP molecules',
         'FADH₂ yields ~1.5 ATP (enters ETC at Complex II, bypassing Complex I)',
         '~90% of ATP from aerobic respiration comes from oxidative phosphorylation'] },

{ q: 'Q10', id: 'chem-371', key: 'C',
  stemWas: 'Which nitrogenous base is found in RNA but NOT in DNA?',
  stem: 'Which is one of the four standard bases in RNA but not one of the four standard bases in DNA?',
  tableEdits: [
    ['<td>Double-stranded helix</td>', '<td>Usually a double-stranded helix</td>'],
    ['<td>More stable</td>', '<td>More resistant to alkaline hydrolysis</td>'],
    ["<td>Less stable (2'-OH reactive)</td>", "<td>More susceptible because of the 2'-OH group</td>"]
  ],
  keep: ['Uracil differs from thymine by lacking a methyl group at the C-5 position.',
         '<td>A, U, G, C</td>'],
  gone: ['<td>Double-stranded helix</td>', '<td>More stable</td>', "Less stable (2'-OH reactive)"] }

];
