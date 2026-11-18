/* Chemistry batch 7, display Q41-Q50 (chem-402 .. chem-411). */
'use strict';
module.exports = [

{ q: 'Q41', id: 'chem-402', key: 'C',
  fb: {
    A: "CuCl is the correct formula for cuprous chloride, but the name 'copper(II)' is wrong. Cuprous means copper(I), so the correct pairing is copper(I) chloride, CuCl."
  },
  keep: ['While copper(I) is correct for cuprous, the formula CuCl₂ is wrong.',
         'Classical naming: -ous = lower oxidation state, -ic = higher oxidation state'],
  gone: ['Both parts are incorrect - cuprous is not Cu²⁺'] },

{ q: 'Q42', id: 'chem-403', key: 'A',
  fb: {
    C: "'Tricarbonate' would indicate three carbonate groups, but this formula contains one. The conventional name is ammonium carbonate. The two ammonium ions are required to balance carbonate's −2 charge."
  },
  keep: ['The ammonium ion (NH₄⁺) is a recognized polyatomic ion with its own name.',
         'Carbide (C⁴− or C₂²−) is a completely different ion from carbonate'],
  gone: ['Greek prefixes are not used in ionic nomenclature.'] },

{ q: 'Q43', id: 'chem-404', key: 'D',
  options: [[3, 'The sulfonic acid group has sulfur bonded to three oxygen atoms, making it a much stronger acid',
                'A sulfonic acid group has sulfur bonded to three oxygens; a carboxyl group has carbon bonded to two']],
  main: 'A sulfonic acid group is commonly drawn as R–S(=O)₂–OH, whereas a carboxylic acid group is R–C(=O)–OH. Simple sulfonic acids such as methanesulfonic acid are usually much stronger in water than ordinary carboxylic acids such as acetic acid. Their conjugate bases are stabilized by charge delocalization and electron-withdrawing effects. The strength is not predicted by counting oxygen atoms alone.',
  fb: {
    B: "For common examples such as methanesulfonic acid and acetic acid, the sulfonic acid is stronger. Acid strength depends on the complete structure and solvent, so 'always' is not a sound rule for every substituted acid.",
    C: 'Simple sulfonic acids ionize extensively in dilute water. Their solubility also depends on the rest of the molecule; a sulfonic acid group does not guarantee that every compound containing it is highly water-soluble.'
  },
  points: [
    'A sulfonic acid group contains sulfur and three oxygens; a carboxyl group contains carbon and two oxygens',
    'Charge delocalization and electron-withdrawing effects stabilize sulfonate conjugate bases',
    'Methanesulfonic acid and p-toluenesulfonic acid are common laboratory sulfonic acids'
  ],
  bl: 'Sulfonic and carboxylic acids differ in their central atom and oxygen connectivity. Typical simple sulfonic acids are stronger in water than typical simple carboxylic acids because of differences in conjugate-base stabilization.',
  keep: ['It is sulfonamides (–SO₂NH₂) that contain nitrogen'],
  gone: ['comparable in strength to sulfuric acid',
         'roughly a million times stronger than typical carboxylic acids',
         'Their excellent water solubility and complete dissociation make them useful in detergents and pharmaceuticals.',
         'The pKₐ of sulfonic acids is typically negative, indicating complete ionization in water'] },

{ q: 'Q44', id: 'chem-405', key: 'C',
  options: [[2, 'Were the first effective oral antibiotics used to treat bacterial infections',
                'Were among the first widely used systemic antibacterial drugs']],
  main: 'Sulfonamide antibacterials became widely used in the 1930s, before widespread clinical use of penicillin. They mimic para-aminobenzoic acid (PABA) and inhibit dihydropteroate synthase in bacterial folate synthesis. Humans obtain folate from the diet and lack that enzyme, which helps explain selective antibacterial action. These drugs contain a sulfonamide linkage; sulfanilamide itself contains –SO₂NH₂.',
  fb: {
    D: 'Sulfanilamide contains a sulfonamide group, –SO₂NH₂, rather than a sulfonic acid group, –SO₃H. Its antibacterial action is due to interference with bacterial folate synthesis, not acidification of the infection site. Other sulfonamide drugs can have substituents on the sulfonamide nitrogen.'
  },
  pointEdits: [
    [1, "Sulfonamides were the first systemic antibiotics, predating penicillin's widespread clinical use",
        'Sulfonamides helped establish systemic antibacterial treatment before widespread penicillin use'],
    [3, 'The sulfonamide functional group (–SO₂NH₂) is distinct from sulfonic acid (–SO₃H)',
        'A sulfonamide contains an S(=O)₂–N linkage, whereas a sulfonic acid contains S(=O)₂–OH']
  ],
  bl: 'Sulfonamide antibacterials block bacterial folate synthesis. They were historically important early systemic antibacterial drugs; they were not the first effective antibacterial treatment of every kind.',
  keep: ['They work by structural mimicry of PABA, blocking bacterial folate biosynthesis',
         'Sulfonamides are antibacterial, not antiviral.',
         'Sulfonamides are selectively toxic to bacteria precisely because they target a pathway'],
  gone: ['the <strong>first broadly effective antibacterial agents</strong>',
         'Sulfonamides were the first systemic antibiotics',
         'Sulfonamides were the first effective antibacterial drugs',
         'first effective oral antibiotics'] },

{ q: 'Q45', id: 'chem-406', key: 'D',
  stemWas: 'Household detergents often contain sodium alkylbenzenesulfonate. Why are sulfonates effective as surfactants?',
  stem: 'Household detergents often contain sodium alkylbenzenesulfonates. Why are these molecules effective surfactants?',
  main: 'Sodium alkylbenzenesulfonates have a nonpolar hydrocarbon region and a charged, hydrophilic sulfonate head. They collect at oil-water interfaces and lower surface tension, helping water wet greasy surfaces and disperse oil. Above a suitable concentration they also form micelles that can solubilize oily molecules. A surfactant-coated oil droplet and a micelle are related cleaning structures, but they are not the same thing.',
  fb: {
    A: 'These detergent molecules remove grease through their behavior at interfaces and through aggregation, not by acting as strong oxidants. Oxidizing bleaches use different chemistry.',
    C: 'Saponification is base-promoted hydrolysis of fats, producing glycerol and fatty acid salts; hydroxide is consumed overall. It is used to make soap. The detergent action asked about here disperses and solubilizes grease without requiring this chemical conversion.'
  },
  pointEdits: [
    [2, 'The sulfonate head group (–SO₃−) remains ionized even in hard water, giving detergents an advantage over traditional soaps',
        'Many sulfonate detergents work better than soaps in hard water because their calcium and magnesium salts remain more soluble'],
    [3, 'Micelle formation is a physical process - the nonpolar tails face inward around grease droplets while polar heads face the water',
        'Surfactants stabilize oil-water interfaces and can form micelles with nonpolar regions inside and polar heads facing water']
  ],
  bl: 'Alkylbenzenesulfonate detergents combine a hydrophobic region with an ionic head, allowing wetting, dispersion and solubilization of greasy material. The sulfonate group alone does not make every small sulfonate molecule an effective detergent.',
  keep: ["Surfactants lower the surface tension of water, not its boiling point.",
         'Surfactants reduce water\'s surface tension, allowing better wetting of surfaces'],
  gone: ['base-catalyzed hydrolysis of fats', 'remains ionized even in hard water',
         'They physically emulsify grease through micelle formation rather than chemically decomposing it through oxidation.'] },

{ q: 'Q46', id: 'chem-407', key: 'A',
  options: [[3, 'Urea was the first organic compound synthesized but has no modern industrial use',
                'Urea has no modern industrial uses']],
  mainEdits: [['Its structure consists of a carbonyl group (C=O) flanked by two amine groups (–NH₂), making it a <strong>diamide of carbonic acid</strong>.',
               'Its carbonyl carbon is bonded directly to two –NH₂ groups, making urea a diamide of carbonic acid; these are amide nitrogens, not ordinary amine groups.']],
  fb: {
    C: 'Urea is not a strong acid in water. Delocalization of the nitrogen lone pairs into the carbonyl system makes its nitrogen groups much less basic than ordinary amines. Concentrated urea solutions are used to denature proteins, not as strong acids or bases.',
    D: "Urea is manufactured on a large scale for nitrogen fertilizer and other industrial applications. Wöhler's preparation of urea from ammonium cyanate in 1828 was historically important, but it does not support the claim that urea has no modern uses."
  },
  pointEdits: [
    [2, "Wöhler's synthesis disproved vitalism - the idea that organic compounds could only come from living organisms",
        "Wöhler's 1828 preparation showed that a compound associated with living organisms could be made from inorganic starting material, helping undermine vitalist ideas"]
  ],
  keep: ['Urea is a diamide of carbonic acid: (NH₂)₂CO',
         "Urea's molecular formula is CH₄N₂O",
         'Urea is synthesized in the liver via the <strong>urea cycle</strong>'],
  gone: ['over 180 million tonnes per year', "Wöhler's synthesis disproved vitalism",
         'flanked by two amine groups'] },

{ q: 'Q47', id: 'chem-408', key: 'B',
  fb: {
    D: 'Phosgene does not simply detonate on contact with water. Hydrolysis gives CO₂ and HCl. Its major inhalation danger is chemical lung injury, and serious pulmonary edema can develop after a delay.'
  },
  pointEdits: [
    [1, 'Phosgene is the diacyl chloride of carbonic acid: replacing both –OH groups in (HO)₂CO with –Cl gives COCl₂',
        'Phosgene is carbonyl dichloride, the acid dichloride of carbonic acid: replacing both OH groups in (HO)₂CO with Cl gives COCl₂']
  ],
  keep: ['Its high electrophilicity allows it to acylate biological nucleophiles',
         'Despite its toxicity, phosgene is used industrially in the production of polycarbonates and polyurethanes',
         'Phosgene is not an oxidizing agent and does not spontaneously ignite.'],
  gone: ['diacyl chloride',
         'The hydrolysis is relatively slow, which actually increases its danger because inhaled phosgene persists in the lungs.'] },

{ q: 'Q48', id: 'chem-409', key: 'A',
  stemWas: 'Guanidine [HN=C(NH₂)₂] is one of the strongest organic bases known. Why is its conjugate acid (guanidinium ion) so stable?',
  stem: 'Guanidine [HN=C(NH₂)₂] is a strong organic base in water. Why is its conjugate acid, the guanidinium ion, especially stable?',
  fb: {
    D: "Guanidine contains no oxygen and therefore no carbonyl group. Guanidinium is stabilized by charge delocalization, not hydrogen bonding to a carbonyl. Arginine's guanidinium-containing side chain also has no carbonyl group."
  },
  pointEdits: [
    [1, "Guanidine's pKₐ ≈ 13.6 makes it nearly as strong a base as hydroxide",
        "The pKa of guanidinium, guanidine's conjugate acid, is about 13.6 in water, consistent with guanidine being a strong organic base"]
  ],
  keep: ['the positive charge is delocalized equally across <strong>three equivalent nitrogen atoms</strong> through resonance',
         'Guanidine has no aromatic ring.',
         'The guanidinium group is found in the amino acid arginine'],
  gone: ['one of the strongest organic bases known', 'nearly as strong a base as hydroxide'] },

{ q: 'Q49', id: 'chem-410', key: 'C',
  stemWas: 'Carbamic acid (H₂N–COOH) is unstable and decomposes spontaneously. What are its decomposition products?',
  stem: 'Which pair of small molecules is formed by the simple dissociation of carbamic acid (H₂N–COOH)?',
  main: 'The simple dissociation is H₂NCOOH ⇌ NH₃ + CO₂. This equation conserves all atoms and is the transformation asked about here. The stability and lifetime of free carbamic acid depend on conditions, so it should not be described as incapable of existing under any conditions. Many carbamate salts and esters can be isolated and have important biological or practical uses.',
  fb: {
    A: 'Water and urea are not the products of the simple one-molecule dissociation asked about here. Urea contains two nitrogens, so forming it requires additional chemistry involving a source of the second nitrogen; it is not the NH₃/CO₂ dissociation.',
    D: 'Nitrogen gas and formic acid are not the products of the simple dissociation. The balanced equation gives NH₃ and CO₂; the proposed pair does not account for the atoms in that transformation.'
  },
  pointEdits: [
    [2, 'While free carbamic acid is unstable, its salts (carbamates) and esters are stable and biologically important',
        'Many carbamate salts and esters are more persistent than free carbamic acid and are useful in biology and chemistry']
  ],
  bl: 'Carbamic acid can dissociate into ammonia and carbon dioxide. Its stability depends on the environment, and many carbamate derivatives are useful compounds.',
  keep: ['Carbamic acid is the half-amide of carbonic acid: one –OH replaced by –NH₂',
         'CO₂ transport in blood involves carbaminohemoglobin',
         'Decomposition into CO and H₂O would leave the nitrogen unaccounted for.'],
  gone: ['Free carbamic acid is extremely unstable in its unsubstituted form.',
         'which is thermodynamically favorable but kinetically not what occurs',
         'Carbamic acid cannot produce urea by decomposition alone.'] },

{ q: 'Q50', id: 'chem-411', key: 'A',
  stemWas: 'Which of the following correctly ranks the acid strength of these compounds from strongest to weakest?',
  stem: 'In water, which ranking places these compounds from strongest acid to weakest acid?',
  main: 'The approximate aqueous pKa values are −1.9 for methanesulfonic acid, 4.75 for acetic acid and 16 for ethanol. Lower pKa means a stronger acid, so the order is methanesulfonic acid > acetic acid > ethanol. Charge delocalization and electron-withdrawing effects help stabilize methanesulfonate; acetate is also resonance-stabilized, whereas ethoxide lacks comparable resonance delocalization. The complete structure and solvent matter, not simply a count of oxygen atoms or resonance drawings.',
  fb: {
    B: 'Methanesulfonic acid has a much lower aqueous pKa than acetic acid and is therefore stronger in water. Reversing them gives the wrong order. Both conjugate bases are resonance-stabilized, but that does not make their acid strengths equal.'
  },
  points: [
    'When comparing acids in the same solvent, a lower pKa means a stronger acid',
    'For these compounds in water: methanesulfonic acid > acetic acid > ethanol',
    'Conjugate-base stabilization depends on resonance, electron-withdrawing effects and solvation, not oxygen counting alone'
  ],
  bl: 'Use the aqueous pKa values to rank this set: methanesulfonic acid is strongest, acetic acid is intermediate and ethanol is weakest. Conjugate-base stabilization explains the trend.',
  keep: ['Ethanol is the weakest acid of the three, not the strongest.',
         'Methanesulfonic acid is by far the strongest acid in this group.'],
  gone: ['delocalizes the negative charge over three oxygen atoms',
         'More oxygen atoms for resonance stabilization of the conjugate base = stronger acid',
         'The number of equivalent resonance structures stabilizing the conjugate base is a key predictor of acid strength'] }

];
