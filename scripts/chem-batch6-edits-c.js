/* Chemistry batch 6 edits, Q21-Q30 (chem-322..chem-331).
   Q22 is one of the review's three major explanatory rewrites.
   Q24 is points-only. Q28 has its missing option B paragraph restored. */
'use strict';
module.exports = [

{ q: 'Q21', id: 'chem-322', key: 'B',
  stemWas: 'Oleic acid (C18:1) has the molecular formula C₁₇H₃₃COOH. It is described as:',
  optionsWere: ['A saturated fatty acid with 18 carbons', 'A monounsaturated fatty acid with 18 carbons', 'A polyunsaturated fatty acid with 18 carbons', 'A saturated fatty acid with 17 carbons'],
  mainEdits: [
    ['It is the most abundant fatty acid in human adipose tissue and is found in high concentrations in olive oil.',
     'Oleic acid is common in human adipose tissue and abundant in olive oil.']
  ],
  fbEdits: [
    ['C', 'linolenic acid (C18:3, omega-3)', 'α-linolenic acid (C18:3, omega-3)']
  ],
  points: [
    'C18:1 means 18 total carbons and one carbon-carbon double bond.',
    'The carboxyl carbon counts toward the total carbon number.',
    'Oleic acid is monounsaturated; stearic acid, C18:0, is its saturated 18-carbon comparison.'
  ],
  keep: ['The notation C18:1 means 18 carbon atoms and 1 double bond', 'Stearic acid (C18:0) is the saturated counterpart'],
  gone: ['It is the most abundant fatty acid in human adipose tissue', 'and linolenic acid (C18:3, omega-3).',
         'Lipids are hydrophobic molecules that include fats, phospholipids, steroids, and waxes'] },

{ q: 'Q22', id: 'chem-323', key: 'B',
  stemWas: 'Trans fats are harmful because they:',
  optionsWere: ['Are shorter than natural fats', 'Behave more like saturated fats, increasing cardiovascular risk', 'Cannot be metabolized at all', 'Contain more calories than cis fats'],
  stem: 'Why is a high intake of industrially produced trans fats a cardiovascular concern?',
  options: [[1, 'They raise LDL cholesterol and increase cardiovascular risk']],
  main: 'Industrially produced trans fats raise LDL cholesterol and increase cardiovascular risk. Partial hydrogenation of oils has been an important source. Trans double bonds have a different geometry from cis bonds, but their health effects should not be explained simply as tighter chain packing. Small amounts of trans fats also occur naturally in ruminant meat and dairy products.',
  feedback: {
    A: 'Trans describes the arrangement around a double bond, not a shorter chain. Cis and trans fatty acids can have the same carbon number and molecular formula.',
    C: 'Trans fatty acids can be absorbed and metabolized. Their cardiovascular risk does not mean that the body is unable to process them.',
    D: 'The concern is not an extra calorie content unique to trans fats. Like other dietary fats, they supply approximately 9 kcal per gram; their adverse effects on blood lipids are a separate issue.'
  },
  points: [
    'Cis/trans describes double-bond geometry, not carbon-chain length or calorie content.',
    'Partial hydrogenation can generate industrial trans fats; some trans fats also occur naturally.',
    'Raising LDL cholesterol and cardiovascular risk is the key health lesson; molecular packing alone is not a sufficient explanation.'
  ],
  gone: ['This allows tighter molecular packing, raising melting points and LDL cholesterol levels',
         'Trans fats can be metabolized, but they are processed differently from cis fats',
         'the trans geometry creates a straight chain that packs like a saturated fat',
         'Behave more like saturated fats, increasing cardiovascular risk',
         'Lipids are hydrophobic molecules that include fats, phospholipids, steroids, and waxes'] },

{ q: 'Q23', id: 'chem-324', key: 'B',
  stemWas: 'The iodine number of a fat measures:',
  optionsWere: ['The percentage of iodine in the fat', 'The degree of unsaturation', 'The molecular weight of the fat', 'The acidity of the fat'],
  main: "Iodine value expresses the amount of halogen consumed by a fat's double bonds as grams of iodine equivalent per 100 g of fat. A higher value generally indicates greater unsaturation per unit mass. A common method uses iodine monochloride (Wijs reagent); the reported value is still expressed in iodine equivalents.",
  feedback: {
    A: 'The measurement concerns reagent consumed during the test, not iodine already present in the original fat. More reactive C=C bonds per unit mass generally give a higher iodine value.',
    C: 'Iodine value is not a direct molecular-mass measurement. It reports unsaturation per 100 g, so it depends on both the double bonds present and the amount of material represented by that mass.',
    D: 'Acid value measures the milligrams of KOH needed to neutralize free fatty acids in 1 g of fat. Iodine value instead measures unsaturation, so the two tests answer different questions.'
  },
  points: [
    'Iodine value is reported as grams of iodine equivalent per 100 g of fat.',
    'Greater unsaturation per unit mass usually gives a higher iodine value.',
    'Iodine value concerns C=C bonds; acid value concerns free fatty acids.'
  ],
  gone: ['I₂ adds across C=C double bonds', 'Each double bond adds two iodine atoms across it',
         'The acidity of a fat is measured by its acid number', 'butter has an iodine number around 25–40',
         'Lipids are hydrophobic molecules that include fats, phospholipids, steroids, and waxes'] },

{ q: 'Q24', id: 'chem-325', key: 'B',
  stemWas: 'Sphingomyelin is a membrane lipid that contains:',
  optionsWere: ['Glycerol, two fatty acids, and a phosphate group', 'Sphingosine, a fatty acid, and a phosphocholine head group', 'Three fatty acids and glycerol', 'Cholesterol and a phosphate group'],
  pointsOnly: true,
  points: [
    'Sphingomyelin uses a sphingosine-based backbone rather than glycerol.',
    'Sphingosine plus an amide-linked fatty acid forms ceramide.',
    'Adding phosphocholine gives the common sphingomyelin structure found in membranes, including myelin.'
  ],
  keep: ['Sphingomyelin belongs to the sphingolipid family', 'forming lipid rafts'],
  gone: ['Lipids are hydrophobic molecules that include fats, phospholipids, steroids, and waxes'] },

{ q: 'Q25', id: 'chem-326', key: 'C',
  stemWas: 'Which omega-3 fatty acid is commonly found in fish oil?',
  optionsWere: ['Oleic acid', 'Palmitic acid', 'Eicosapentaenoic acid (EPA)', 'Stearic acid'],
  main: 'EPA, eicosapentaenoic acid, is a 20-carbon fatty acid with five double bonds, written 20:5 n-3. The first double bond counted from the methyl end is at carbon 3, which makes it an omega-3 fatty acid. Oleic acid is omega-9; palmitic and stearic acids have no C=C bonds.',
  points: [
    'Omega numbering starts at the methyl end, not the carboxyl end.',
    'EPA is 20:5 n-3: 20 carbons, five double bonds and an omega-3 first double bond.',
    'A saturated fatty acid has no double bond to assign an omega position to.'
  ],
  keep: ['Oleic acid is an omega-9 monounsaturated fatty acid', 'Palmitic acid (C16:0) is a fully saturated fatty acid',
         'Stearic acid (C18:0) is a saturated fatty acid with 18 carbons'],
  gone: ['EPA has anti-inflammatory properties and is associated with cardiovascular benefits',
         'Lipids are hydrophobic molecules that include fats, phospholipids, steroids, and waxes'] },

{ q: 'Q26', id: 'chem-327', key: 'B',
  stemWas: 'Glycolysis converts one molecule of glucose into:',
  optionsWere: ['1 pyruvate + 2 ATP', '2 pyruvate + 2 ATP + 2 NADH', '2 pyruvate + 4 ATP + 2 NADH', '1 pyruvate + 4 ATP + 1 NADH'],
  stem: 'For one glucose molecule converted to pyruvate by glycolysis, which option gives the products using the NET ATP yield?',
  feedback: {
    D: 'One six-carbon glucose gives two three-carbon pyruvates. Glycolysis also produces two NADH and a net two ATP, because four ATP are made but two are invested earlier.'
  },
  points: [
    'Glycolysis converts one glucose into two pyruvate molecules in the cytosol.',
    'Four ATP are produced and two are consumed, giving a net gain of two ATP.',
    'Two NADH are also produced and must be reoxidized for continued glycolysis.'
  ],
  keep: ['The net yield is 2 ATP (4 produced − 2 consumed in the investment phase) and 2 NADH',
         'Glycolysis produces 2 pyruvate molecules, not 1',
         'While 4 ATP molecules are produced in total during the payoff phase'],
  gone: ['This answer gets every detail wrong',
         'Chemical structure determines chemical properties - understanding structure allows prediction of reactivity and behavior.'] },

{ q: 'Q27', id: 'chem-328', key: 'B',
  stemWas: 'The Krebs cycle (citric acid cycle) takes place in:',
  optionsWere: ['The cytoplasm', 'The mitochondrial matrix', 'The inner mitochondrial membrane', 'The endoplasmic reticulum'],
  stem: 'In a human cell, where are most citric acid cycle enzymes located?',
  main: 'Most citric acid cycle enzymes are in the mitochondrial matrix. Succinate dehydrogenase is the exception: it is embedded in the inner mitochondrial membrane. Each turn combines acetyl-CoA with oxaloacetate and regenerates oxaloacetate, releasing two CO₂ and producing three NADH, one FAD-linked electron pair (counted as one FADH₂ equivalent), and one GTP or ATP.',
  feedback: {
    A: 'Glycolysis occurs in the cytosol. Pyruvate crosses the inner mitochondrial membrane through the mitochondrial pyruvate carrier; after entry, pyruvate dehydrogenase converts it to acetyl-CoA. The transporter and enzyme complex have different jobs.'
  },
  fbEdits: [
    ['D', 'The Krebs cycle is confined to the mitochondrial matrix, where its eight enzymes sequentially oxidize acetyl-CoA.',
     "The cycle's enzymes are mainly in the mitochondrial matrix, with succinate dehydrogenase associated with the inner membrane."]
  ],
  points: [
    'Glycolysis is cytosolic; most human citric acid cycle reactions occur in the mitochondrial matrix.',
    'Succinate dehydrogenase is both a cycle enzyme and respiratory Complex II in the inner membrane.',
    'The pyruvate carrier transports pyruvate; pyruvate dehydrogenase then converts it to acetyl-CoA.'
  ],
  keep: ['except succinate dehydrogenase, which is embedded in the inner membrane',
         'The endoplasmic reticulum handles protein synthesis and folding'],
  gone: ['must be actively transported into the mitochondrial matrix (via the pyruvate dehydrogenase complex)',
         'where its eight enzymes sequentially oxidize acetyl-CoA',
         'Chemical structure determines chemical properties - understanding structure allows prediction of reactivity and behavior.'] },

{ q: 'Q28', id: 'chem-329', key: 'C',
  stemWas: 'How many ATP equivalents are produced per molecule of NADH in oxidative phosphorylation?',
  optionsWere: ['1.5', '2', '2.5', '3'],
  stem: 'Using the usual approximate ATP accounting for human mitochondria, how many ATP equivalents are obtained when one mitochondrial NADH supplies electrons through Complex I?',
  main: 'The usual estimate is about 2.5 ATP per mitochondrial NADH. Electron transfer through Complexes I, III and IV supports proton pumping, and ATP synthase uses the resulting gradient. The value is an approximate yield used for calculations, not an exact output in every cell or condition.',
  feedback: {
    A: 'About 1.5 ATP is used for an electron pair entering the ubiquinone pool while bypassing Complex I, as in succinate oxidation through Complex II. Its FAD is enzyme-bound; a free FADH₂ molecule does not enter Complex II.',
    D: 'Three ATP per NADH is an older textbook accounting value. The convention specified here uses approximately 2.5, so three is not the best answer for this question.'
  },
  fbInsert: {
    B: 'Two ATP is not the usual estimate for mitochondrial NADH entering through Complex I. The standard calculation uses approximately 2.5 ATP, while recognizing that actual yields depend on coupling and cellular conditions.'
  },
  points: [
    'Mitochondrial NADH supplies electrons to Complex I.',
    'The usual estimates are about 2.5 ATP for NADH and 1.5 for an electron pair that bypasses Complex I.',
    'These are approximate energy-accounting values, not guaranteed fixed yields.'
  ],
  gone: ['1.5 ATP per molecule is the yield from FADH₂, not NADH. FADH₂ enters the electron transport chain at Complex II',
         '3 ATP per NADH is the older textbook value based on the P/O ratio',
         'Chemical structure determines chemical properties - understanding structure allows prediction of reactivity and behavior.'] },

{ q: 'Q29', id: 'chem-330', key: 'B',
  stemWas: 'In β-oxidation of fatty acids, each cycle removes how many carbon atoms?',
  optionsWere: ['1', '2', '3', '4'],
  mainEdits: [
    ['A C16 fatty acid (palmitate) undergoes 7 cycles, producing 8 acetyl-CoA, 7 NADH, and 7 FADH₂.',
     'Palmitoyl-CoA, with 16 carbons, undergoes seven cycles to yield eight acetyl-CoA, seven NADH and seven FAD-linked electron pairs, often written as seven FADH₂ equivalents. The final four-carbon intermediate splits into two acetyl-CoA.']
  ],
  feedback: {
    C: 'The chain is normally shortened by a two-carbon acetyl unit, not three carbons. Seven cleavage cycles convert palmitoyl-CoA into eight acetyl-CoA because the final four-carbon intermediate supplies two of those units.',
    D: 'Four is the number of reaction stages in a typical cycle, not the number of carbons removed: oxidation, hydration, a second oxidation and thiolysis shorten the chain by a two-carbon unit.'
  },
  points: [
    'A typical beta-oxidation cycle shortens a fatty acyl chain by two carbons.',
    'An even-chain saturated C16 acyl-CoA gives eight acetyl-CoA after seven cycles.',
    'Each cycle also supplies NADH and FAD-linked reducing equivalents for energy metabolism.'
  ],
  keep: ['β-Oxidation is a cyclic process that cleaves two carbon atoms at a time',
         'One carbon at a time is removed in decarboxylation reactions'],
  gone: ['A C16 fatty acid (palmitate) undergoes 7 cycles, producing 8 acetyl-CoA, 7 NADH, and 7 FADH₂.',
         'Three carbons are not removed per cycle', 'Four carbons would mean each cycle removes nearly a quarter',
         'Chemical structure determines chemical properties - understanding structure allows prediction of reactivity and behavior.'] },

{ q: 'Q30', id: 'chem-331', key: 'B',
  stemWas: 'Pyruvate dehydrogenase converts pyruvate to:',
  optionsWere: ['Lactate', 'Acetyl-CoA + CO₂', 'Oxaloacetate', 'Citrate'],
  mainEdits: [
    ['pyruvate + CoA + NAD⁺ → acetyl-CoA + CO₂ + NADH.', 'Pyruvate + CoA-SH + NAD⁺ → acetyl-CoA + CO₂ + NADH + H⁺.'],
    ['TPP (thiamine)', 'TPP (thiamine pyrophosphate, derived from vitamin B1)']
  ],
  feedback: {
    A: 'Lactate dehydrogenase reduces pyruvate to lactate while regenerating NAD⁺ from NADH. This can occur with or without oxygen. Pyruvate dehydrogenase instead performs oxidative decarboxylation to form acetyl-CoA and CO₂.'
  },
  points: [
    'Pyruvate dehydrogenase links glycolysis to acetyl-CoA formation.',
    'One carbon is released as CO₂ and NAD⁺ is reduced to NADH.',
    'TPP is a vitamin B1-derived coenzyme; it is one of several cofactors used by the complex.'
  ],
  keep: ['Oxaloacetate is produced from pyruvate by pyruvate carboxylase', 'Citrate is the first product of the Krebs cycle',
         'This irreversible reaction links glycolysis to the Krebs cycle'],
  gone: ['pyruvate + CoA + NAD⁺ → acetyl-CoA + CO₂ + NADH.', 'TPP (thiamine),',
         'Pyruvate is converted to lactate by lactate dehydrogenase under anaerobic conditions',
         'Chemical structure determines chemical properties - understanding structure allows prediction of reactivity and behavior.'] }

];
