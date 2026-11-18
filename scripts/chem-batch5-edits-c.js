/* Chemistry batch 5 edits, Q21-Q30 (chem-262..chem-271).
   Q30 is one of the review's two major rewrites. */
'use strict';
module.exports = [

{ q: 'Q21', id: 'chem-262', key: 'C',
  stemWas: 'Which reagent selectively oxidizes a primary alcohol to an aldehyde without further oxidation?',
  optionsWere: ['KMnO₄ (acidic)', 'K₂Cr₂O₇/H⁺', 'PCC (pyridinium chlorochromate)', 'Concentrated HNO₃'],
  stem: 'Which reagent is commonly used in anhydrous dichloromethane to convert a primary alcohol into an aldehyde while limiting further oxidation?',
  main: 'PCC is used under anhydrous conditions to oxidize a primary alcohol to an aldehyde. In contrast, heating a primary alcohol with excess aqueous acidified dichromate or permanganate commonly gives a carboxylic acid. The conditions matter: an aldehyde can also be obtained with acidified dichromate by carefully controlling the oxidation and distilling the aldehyde away as it forms.',
  feedback: {
    A: 'Acidified permanganate commonly oxidizes a primary alcohol beyond the aldehyde stage under aqueous oxidation conditions. It is not the standard selective reagent in anhydrous dichloromethane described here.',
    B: 'Acidified dichromate can give an aldehyde if the product is removed by controlled distillation. With excess oxidant under aqueous reflux, further oxidation gives the carboxylic acid. PCC is the reagent associated with the anhydrous method in this stem.'
  },
  points: [
    'PCC in anhydrous conditions commonly converts a primary alcohol into an aldehyde.',
    'Excess aqueous oxidant and reflux can favor further oxidation to a carboxylic acid.',
    'Removing an aldehyde by distillation can limit further oxidation even when dichromate is used.'
  ],
  keep: ['Concentrated HNO3 is a strong oxidizing acid'],
  gone: ['It cannot stop at the aldehyde stage', 'Baeyer test', 'converts primary alcohols to carboxylic acids, not aldehydes', 'Strong oxidants like KMnO₄ and K₂Cr₂O₇ would push the oxidation'] },

{ q: 'Q22', id: 'chem-263', key: 'B',
  stemWas: 'Williamson ether synthesis involves the reaction of:',
  optionsWere: ['An alcohol with an alcohol using H₂SO₄', 'An alkoxide ion with a primary alkyl halide', 'A Grignard reagent with an epoxide', 'An alcohol with a carboxylic acid'],
  main: 'Williamson synthesis forms an ether when an alkoxide ion attacks a suitable alkyl halide by an SN2 reaction: RO⁻ + R′X → ROR′ + X⁻. Methyl and unhindered primary halides are especially useful. Secondary halides often give competing elimination, and tertiary halides are unsuitable for this SN2 route. The method can make both symmetrical and unsymmetrical ethers.',
  feedback: {
    A: 'Acid-catalyzed dehydration of a suitable alcohol can form an ether, but that is a different method. For example, ethanol can give diethyl ether under controlled heating with sulfuric acid. The required conditions and competing alkene formation depend on the alcohol.',
    C: 'A Grignard reagent opens an epoxide to form a magnesium alkoxide, which gives an alcohol after aqueous work-up. That carbon–carbon bond-forming reaction is different from an alkoxide forming an ether by SN2 substitution.'
  },
  points: [
    'An alkoxide is the nucleophile in Williamson ether synthesis.',
    'Methyl or unhindered primary alkyl halides favor the required SN2 reaction.',
    'With a hindered halide, elimination can compete with or replace ether formation.'
  ],
  keep: ['An alcohol reacting with a carboxylic acid produces an ester'],
  gone: ['especially symmetrical ethers at ~140 degrees C', 'Secondary and tertiary halides favor elimination (E2) instead', 'produce a longer carbon chain through ring-opening'] },

{ q: 'Q23', id: 'chem-264', key: 'B',
  stemWas: 'When ethanol reacts with sodium metal, the products are:',
  optionsWere: ['Sodium ethanoate and H₂', 'Sodium ethoxide and H₂', 'Sodium ethoxide and H₂O', 'Ethane and NaOH'],
  main: 'Sodium reacts with ethanol to produce sodium ethoxide and hydrogen gas: 2CH₃CH₂OH + 2Na → 2CH₃CH₂ONa + H₂. Sodium is oxidized to Na⁺, and hydrogen from the O–H groups is reduced to H₂. Ethanol often reacts less vigorously than water, but reaction speed alone does not establish relative acid strength.',
  feedback: {
    A: 'Sodium ethanoate is the salt of ethanoic acid, not ethanol. Ethanoic acid with sodium metal can give sodium ethanoate and H₂; ethanol gives ethoxide because its carbon framework is not oxidized into a carboxyl group in this reaction.',
    D: "Forming ethane would require removal of ethanol's oxygen-containing group. In this reaction the C–O bond remains intact: the O–H hydrogen is replaced by sodium to form ethoxide, and H₂ is released."
  },
  points: [
    'Sodium metal reacts with ethanol to give sodium ethoxide and H₂.',
    'Two alcohol molecules supply the two hydrogen atoms in one H₂ molecule.',
    'Reaction rate and acid strength are different concepts; visible vigor alone does not measure acidity.'
  ],
  keep: ['the reaction produces H2 gas, not water', 'but the reaction with ethanol is less vigorous'],
  gone: ['confirming that alcohols are weaker acids than water', 'It would form if acetic acid (not ethanol) reacted with NaOH', 'Breaking a C-H bond would require much more energy'] },

{ q: 'Q24', id: 'chem-265', key: 'C',
  stemWas: 'Which of the following gives a positive result with FeCl₃ solution (violet/green coloration)?',
  optionsWere: ['Ethanol', 'Diethyl ether', 'Phenol', 'Methanol'],
  main: 'Phenol gives a characteristic colored complex with Fe³⁺ under the usual ferric chloride test conditions, commonly a violet color for phenol itself. The exact color depends on the compound and conditions. The test is useful for phenols, but some enols and other suitable ligands also give positive reactions, so it is not absolutely specific for a phenolic aromatic ring.',
  feedback: {
    A: 'Ethanol does not give the characteristic positive phenol-test color under these conditions. Its ordinary aliphatic hydroxyl group behaves differently from the phenolic group in phenol. A positive ferric chloride test is not, however, restricted to aromatic compounds.',
    B: 'Diethyl ether does not give the characteristic phenol-test color. Its oxygen can donate a lone pair to a Lewis acid, so the absence of –OH does not mean that ethers are incapable of coordination; that is different from the colored reaction tested here.',
    D: 'Methanol is an aliphatic alcohol and does not give the characteristic positive test under these conditions. Phenol does, but the test is not exclusive to phenols because some enols also form colored iron complexes.'
  },
  points: [
    'Phenol can form a colored coordination complex with Fe³⁺.',
    'Ethanol, methanol and diethyl ether do not give the characteristic positive test here.',
    'Some enols also test positive, so the result supports rather than uniquely proves a phenol identification.'
  ],
  gone: ['Ethanol lacks the aromatic ring needed for this coordination', 'The FeCl3 test requires a phenolic hydroxyl that can chelate with the iron ion', 'Only compounds with a phenolic -OH group directly attached to an aromatic ring produce', 'Ethers are generally quite unreactive'] },

{ q: 'Q25', id: 'chem-266', key: 'B',
  stemWas: 'The order of acidity among the following is:',
  optionsWere: ['Water > Ethanol > Phenol', 'Phenol > Water > Ethanol', 'Ethanol > Phenol > Water', 'Ethanol > Water > Phenol'],
  stem: 'In the usual aqueous comparison, which sequence lists these compounds from strongest to weakest acid?',
  main: 'The standard aqueous comparison is phenol > water > ethanol. Phenol is much more acidic because phenoxide is stabilized by resonance. Water and ethanol are much closer in acidity; the usual introductory comparison places water ahead of ethanol. Alkyl electron donation and solvation both affect the stability of ethoxide. Approximate aqueous pKₐ values of 10 for phenol and 16 for ethanol show the much larger separation between those two acids.',
  feedback: {
    A: 'This sequence incorrectly places phenol last. Resonance stabilization of phenoxide makes phenol much more acidic than water or ethanol in the comparison used here.',
    C: "This sequence incorrectly places ethanol first. Ethoxide lacks phenoxide's resonance stabilization, so ethanol is much less acidic than phenol and is placed below water in this aqueous comparison.",
    D: 'This sequence reverses the intended trend by putting ethanol first and phenol last. Compare conjugate-base stabilization and the stated aqueous conditions, rather than molecular mass.'
  },
  points: [
    'The standard aqueous order used here is phenol > water > ethanol.',
    'Resonance stabilization makes phenoxide much more stable than a comparable localized alkoxide ion.',
    'Acidity comparisons depend on the solvent; numerical pKₐ values must use compatible conventions.'
  ],
  gone: ['15.7', 'Remember the pKa values'] },

{ q: 'Q26', id: 'chem-267', key: 'A',
  stemWas: 'Acid-catalyzed ring opening of an epoxide by water produces:',
  optionsWere: ['A diol (1,2-diol)', 'An aldehyde', 'A ketone', 'An ether'],
  main: 'An epoxide contains a strained three-membered ring with one oxygen atom. In acid-catalyzed hydrolysis, protonation makes the ring more susceptible to attack by water. One ring C–O bond breaks as a new bond forms between a ring carbon and the oxygen of water. Proton transfers give a 1,2-diol, with –OH groups on adjacent carbons.',
  feedback: {
    B: 'The reaction specified is hydrolysis to a diol, not formation of an aldehyde. Some epoxides can rearrange to carbonyl compounds under other conditions without breaking a C–C bond, so oxidative cleavage is not a universal requirement.',
    D: 'Water opening an epoxide gives a diol. An alcohol nucleophile can instead give a hydroxy ether. In either case, nucleophilic attack forms a new C–O bond; the identity of the nucleophile determines the group introduced.'
  },
  points: [
    'Epoxides are strained three-membered cyclic ethers.',
    'Acid-catalyzed attack by water opens the ring and gives adjacent hydroxyl groups.',
    'One hydroxyl oxygen comes from the epoxide and the other from water.'
  ],
  keep: ['Ketones can be formed from epoxides through different reagents'],
  gone: ['Markovnikov-like regioselectivity', 'would require oxidative cleavage of a C-C bond', 'both new bonds formed are O-H bonds'] },

{ q: 'Q27', id: 'chem-268', key: 'C',
  stemWas: 'Glycerol (propane-1,2,3-triol) is classified as:',
  optionsWere: ['A monohydric primary alcohol', 'A dihydric secondary alcohol', 'A trihydric alcohol', 'A phenol'],
  mainEdits: [
    ['Glycerol is an important biological molecule as the backbone of triglycerides and phospholipids.', 'Glycerol forms the backbone of triacylglycerols and glycerophospholipids.']
  ],
  fbEdits: [
    ['A', '(like ethanol or methanol)', '(like ethanol)']
  ],
  points: [
    'Glycerol contains three alcohol groups and is therefore a triol.',
    'Its two terminal alcohol sites are primary and its middle alcohol site is secondary.',
    'Glycerol is the backbone of triacylglycerols and glycerophospholipids, not all phospholipids.'
  ],
  keep: ['A dihydric alcohol (diol) has two -OH groups', 'A phenol has an -OH group directly bonded to a benzene ring'],
  gone: ['the backbone of triglycerides and phospholipids', 'like ethanol or methanol'] },

{ q: 'Q28', id: 'chem-269', key: 'B',
  stemWas: "Which reagent is used in the Tollens' test to distinguish aldehydes from ketones?",
  optionsWere: ["Fehling's solution", 'Ammoniacal silver nitrate (Ag(NH₃)₂⁺)', "Benedict's solution", 'Iodine in NaOH'],
  main: "Tollens' reagent contains the diamminesilver(I) ion, [Ag(NH₃)₂]⁺, in an alkaline solution. An aldehyde is oxidized to a carboxylate while silver(I) is reduced to metallic silver, often forming a silver mirror. Ordinary simple ketones are negative, but some α-hydroxy ketones and reducing sugars can also give a positive result. The test is therefore not an absolute aldehyde-versus-every-ketone distinction.",
  feedback: {
    D: "Iodine in NaOH is used for the iodoform test, which gives a yellow CHI₃ precipitate with suitable methyl ketones. Ethanal, ethanol and alcohols of the form CH₃CH(OH)R also give the test under suitable conditions. This is different from the silver-deposition reaction of Tollens' reagent."
  },
  points: [
    "Tollens' reagent contains [Ag(NH₃)₂]⁺ and can deposit metallic silver.",
    'Aldehydes are oxidized to carboxylates under the alkaline test conditions.',
    'Simple ketones are usually negative, but α-hydroxy ketones and reducing sugars prevent an absolute rule.'
  ],
  keep: ["Fehling's solution (Cu2+ in alkaline tartrate)", "Benedict's solution is similar to Fehling's"],
  gone: ['Ketones do not react because they cannot be easily oxidized without breaking C–C bonds', 'This test does not specifically distinguish aldehydes from ketones the way'] },

{ q: 'Q29', id: 'chem-270', key: 'B',
  stemWas: 'The reaction of a ketone with hydroxylamine (NH₂OH) produces:',
  optionsWere: ['An imine (Schiff base)', 'An oxime', 'A hydrazone', 'A semicarbazone'],
  points: [
    'Hydroxylamine reacts with an aldehyde or ketone to give an oxime, containing C=N–OH.',
    'Formation of the oxime is a condensation reaction that releases water.',
    'Different nitrogen reagents give different derivatives: hydroxylamine gives an oxime, hydrazine a hydrazone and semicarbazide a semicarbazone.'
  ],
  keep: ['An imine (Schiff base) is formed when a ketone or aldehyde reacts with a primary amine', "Brady's reagent", 'A semicarbazone is formed when a ketone or aldehyde reacts with semicarbazide', '<div style="text-align:center;margin:12px 0"></div>'] },

{ q: 'Q30', id: 'chem-271', key: 'B',
  stemWas: 'Aldol condensation of acetaldehyde produces:',
  optionsWere: ['Acetone', '3-hydroxybutanal', 'Acetic acid', 'Crotonaldehyde directly'],
  stem: 'What is the initial aldol addition product when two molecules of acetaldehyde (ethanal) react in cold dilute aqueous NaOH, before dehydration?',
  options: [[3, 'Crotonaldehyde (but-2-enal)']],
  main: 'Base removes an α-hydrogen from one ethanal molecule to form an enolate. This attacks the carbonyl carbon of a second ethanal molecule, forming a new C–C bond. Protonation gives CH₃CH(OH)CH₂CHO, 3-hydroxybutanal, a β-hydroxy aldehyde. This initial step is aldol addition. Subsequent loss of water gives but-2-enal; the addition followed by dehydration is commonly called aldol condensation.',
  feedback: {
    A: 'Acetone is a three-carbon ketone. The addition joins two two-carbon ethanal molecules to give a four-carbon β-hydroxy aldehyde, so acetone does not match the carbon count or functional groups.',
    C: 'Ethanoic acid would result from oxidation of ethanal. The reaction here forms a new carbon–carbon bond between two ethanal molecules and gives a β-hydroxy aldehyde.',
    D: 'But-2-enal is produced when 3-hydroxybutanal loses water. It is the later dehydration product, whereas the question asks for the initial addition product before dehydration.'
  },
  points: [
    'Aldol addition uses an enolate nucleophile to form a new C–C bond with a carbonyl compound.',
    'Two ethanal molecules give the four-carbon β-hydroxy aldehyde 3-hydroxybutanal.',
    'Dehydration gives but-2-enal; distinguish this later condensation product from the initial aldol addition product.'
  ],
  gone: ['No oxidation state change occurs at the carbonyl carbon', 'Crotonaldehyde directly', 'Subsequent heating causes dehydration'] }

];
