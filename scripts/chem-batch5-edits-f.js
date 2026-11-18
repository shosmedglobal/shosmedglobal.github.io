/* Chemistry batch 5 edits, Q51-Q60 (chem-292..chem-301).
   Q58 is frozen: the review says keep it completely unchanged.
   Q60 is the review's second major rewrite. */
'use strict';
module.exports = [

{ q: 'Q51', id: 'chem-292', key: 'C',
  stemWas: 'At its isoelectric point, an amino acid exists predominantly as:',
  optionsWere: ['A cation', 'An anion', 'A zwitterion', 'An uncharged molecule'],
  stem: 'At its isoelectric point in aqueous solution, free glycine exists predominantly as:',
  options: [[3, 'A molecule with no charged functional groups']],
  main: 'Near its isoelectric point, about pH 6, free glycine is predominantly ⁺H₃N–CH₂–COO⁻, a zwitterion. It contains both a positive and a negative charge but has zero net charge in this form. At the isoelectric point the population has zero average net charge and no net electrophoretic migration. Zero net charge does not mean that all functional groups are uncharged.',
  feedback: {
    A: 'At sufficiently low pH, glycine is mainly ⁺H₃N–CH₂–COOH and has net charge +1. Near its isoelectric point, loss of the carboxyl proton makes the zwitterion predominant instead.',
    B: 'At sufficiently high pH, glycine is mainly H₂N–CH₂–COO⁻ and has net charge −1. That is above its isoelectric point, not the predominant form at the pI.',
    D: "The structure H₂N–CH₂–COOH has no charged functional groups, but it is not glycine's predominant form at its pI in water. The predominant zwitterion has charged groups whose contributions cancel."
  },
  points: [
    'A zwitterion contains both positive and negative charges within the same molecular species.',
    'Free glycine is predominantly ⁺H₃N–CH₂–COO⁻ near its pI, about pH 6.',
    'The isoelectric point concerns zero average net charge, not absence of all charged groups.'
  ],
  gone: ['good water solubility', 'the amino acid does not migrate in an electric field', 'An "uncharged molecule" would imply', 'high melting points'] },

{ q: 'Q52', id: 'chem-293', key: 'C',
  stemWas: 'The peptide bond between two amino acids is:',
  optionsWere: ['An ester bond', 'A glycosidic bond', 'An amide bond', 'A disulfide bond'],
  main: "A peptide bond is an amide linkage between the carboxyl-derived carbonyl carbon of one amino-acid residue and the amino nitrogen of the next. Resonance gives the C–N bond partial double-bond character, making the peptide unit approximately planar and restricting rotation. The linkage is often written –CO–NH–, but a peptide bond to proline's nitrogen has no N–H hydrogen.",
  feedback: {
    A: 'A carboxylic ester connects an acyl group to an oxygen-containing group, as in the fatty-acid esters of glycerol. A peptide instead contains an acyl carbon–nitrogen linkage. DNA and RNA have phosphodiester links, which are esters of phosphate and are structurally different from carboxylic esters.',
    B: "Glycosidic bonds involve a sugar's anomeric carbon. The common O-glycosidic links between sugars differ from the carbonyl carbon–nitrogen amide linkage in a peptide bond.",
    D: 'A disulfide bond joins two cysteine side chains through an S–S linkage and can stabilize protein structure. It does not replace the peptide bonds connecting successive residues. The backbone also contains the other covalent bonds within each amino-acid residue.'
  },
  points: [
    'Peptide bonds are amide linkages connecting amino-acid residues.',
    'Resonance makes the peptide unit approximately planar and restricts rotation about its C–N bond.',
    'Disulfide bonds connect cysteine side chains, whereas peptide bonds connect residues along the backbone.'
  ],
  gone: ['formed by a condensation reaction between the α-amino group', 'held together exclusively by peptide (amide) bonds', 'It is an acetal-type linkage found in disaccharides'] },

{ q: 'Q53', id: 'chem-294', key: 'B',
  stemWas: 'Treatment of a primary amine with nitrous acid (HNO₂) at 0-5°C gives:',
  optionsWere: ['A secondary amine', 'A diazonium salt', 'A nitrile', 'An amide'],
  stem: 'Treatment of a primary aromatic amine with nitrous acid in hydrochloric acid at 0–5 °C gives a relatively persistent intermediate. Which type of compound is it?',
  feedback: {
    A: 'A secondary amine would require a second carbon-containing group on nitrogen. Nitrous acid does not simply alkylate the starting amine; under the stated conditions it converts the primary aromatic amino group into an arenediazonium group.',
    D: 'Forming an amide from this amine would require an acylating reagent, such as an acid chloride or anhydride. Nitrous acid performs diazotization instead. Acylating a primary amine normally gives an N-substituted amide, not necessarily RCONH₂.'
  },
  points: [
    'Primary aromatic amines form arenediazonium ions with nitrous acid in cold acidic solution.',
    'Low temperature helps preserve the intermediate for subsequent reactions.',
    'Aliphatic diazonium ions are much less persistent and commonly lose N₂ rapidly.'
  ],
  keep: ['can be converted to phenols, halides, nitriles (via Sandmeyer reaction), and azo dyes', 'Primary aliphatic amines also form diazonium salts'],
  gone: ['gives an N-nitrosamine', 'An amide (R-CO-NH2) is formed by reacting an amine with an acyl derivative'] },

{ q: 'Q54', id: 'chem-295', key: 'C',
  stemWas: 'Gabriel synthesis is used to prepare:',
  optionsWere: ['Secondary amines', 'Tertiary amines', 'Primary amines', 'Quaternary ammonium salts'],
  points: [
    'Phthalimide anion substitutes on a suitable primary alkyl halide by SN2.',
    'Cleavage of the resulting N-alkyl phthalimide releases a primary amine.',
    'The method avoids repeated alkylation of a free amine during the substitution step.'
  ],
  keep: ['Gabriel synthesis cannot produce secondary amines', 'Ing-Manske procedure', 'Quaternary ammonium salts (R<sub>4</sub>N+) have four alkyl groups'] },

{ q: 'Q55', id: 'chem-296', key: 'B',
  stemWas: 'Which of the following amino acids contains sulfur?',
  optionsWere: ['Valine', 'Cysteine', 'Tyrosine', 'Histidine'],
  main: 'Cysteine contains a thiol group, –SH, in its side chain. Oxidation can join two cysteine sulfur atoms in a disulfide bond; the disulfide-linked pair is called cystine. Such links can stabilize protein structure. Methionine also contains sulfur, but in a thioether group rather than a free thiol.',
  feedback: {
    D: "Histidine contains an imidazole ring with nitrogen atoms and no sulfur. Among the standard twenty amino acids, cysteine has a thiol and methionine has a thioether. Methionine's side chain does not ordinarily form the disulfide links characteristic of cysteine."
  },
  points: [
    'Cysteine has a sulfur-containing thiol side chain.',
    'Two cysteines can be oxidized to a disulfide-linked pair, cystine.',
    "Methionine's sulfur is in a thioether, which behaves differently from cysteine's thiol."
  ],
  keep: ['Valine is a branched-chain, nonpolar amino acid', 'Tyrosine has an aromatic side chain'],
  gone: ['disulfide bond (–S–S–) called cystine', 'serves as the initiator amino acid in translation'] },

{ q: 'Q56', id: 'chem-297', key: 'B',
  stemWas: 'Hofmann elimination of a quaternary ammonium hydroxide yields primarily:',
  optionsWere: ['The most substituted alkene (Zaitsev product)', 'The least substituted alkene (Hofmann product)', 'An alcohol', 'An amine oxide'],
  stem: 'When a suitable quaternary ammonium hydroxide is heated and more than one alkene position is possible, the usual Hofmann-elimination preference is for:',
  main: 'Hofmann elimination removes a β-hydrogen and a tertiary amine leaving group from a quaternary ammonium ion, forming an alkene on heating. The less substituted alkene is often favored because removal of a less hindered β-hydrogen is easier. The usual exhaustive-methylation route releases trimethylamine, but a general quaternary ammonium salt can release a different tertiary amine. Substrate structure and the required elimination geometry can affect the outcome.',
  feedback: {
    A: 'The more substituted alkene is the usual Zaitsev product. Hofmann elimination often favors the less substituted alternative because of the accessibility of the β-hydrogen, although this is a trend rather than an exceptionless rule.',
    C: 'The elimination produces an alkene, a tertiary amine and water. Hydroxide removes a β-hydrogen rather than replacing the ammonium group with –OH in the reaction described here.'
  },
  fbEdits: [
    ['D', 'heating a quaternary ammonium hydroxide to produce the least substituted alkene', 'heating a quaternary ammonium hydroxide, often favoring the less substituted alkene']
  ],
  points: [
    'Heating a suitable quaternary ammonium hydroxide can give an alkene, a tertiary amine and water.',
    'Hofmann elimination often favors the less substituted alkene.',
    'A β-hydrogen and suitable elimination geometry are required; the preference is not universal.'
  ],
  keep: ['Cope elimination'],
  gone: ['The bulky trimethylammonium leaving group creates steric effects', 'An alcohol is not a product of Hofmann elimination', 'to produce the least substituted alkene'] },

{ q: 'Q57', id: 'chem-298', key: 'B',
  stemWas: 'The Hinsberg test distinguishes between primary, secondary, and tertiary amines using:',
  optionsWere: ['FeCl₃ solution', 'Benzenesulfonyl chloride (C₆H₅SO₂Cl)', "Tollens' reagent", 'Ninhydrin solution'],
  main: 'The Hinsberg test uses benzenesulfonyl chloride in alkaline solution. A primary amine forms a sulfonamide with an N–H proton; deprotonation gives a salt that is soluble in alkali in the standard test. A secondary amine forms a sulfonamide with no N–H proton, so it does not show this base-solubilization behavior. A tertiary amine does not form the diagnostic sulfonamide. The unchanged tertiary amine can be protonated by dilute acid.',
  fbEdits: [
    ['C', 'The Hinsberg test works because primary amines form soluble sulfonamides in NaOH, secondary amines form insoluble ones, and tertiary amines do not react.', 'The Hinsberg comparison instead depends on sulfonamide formation and whether the product can be deprotonated in alkali.']
  ],
  points: [
    'Benzenesulfonyl chloride is the reagent in the Hinsberg test.',
    'A primary-amine sulfonamide retains an N–H proton that allows formation of an alkali-soluble salt.',
    'Secondary-amine sulfonamides lack that proton; tertiary amines do not form the diagnostic sulfonamide.'
  ],
  keep: ['FeCl3 solution is used to test for phenols', 'Ninhydrin solution is used to detect alpha-amino acids'],
  gone: ['Tertiary amines do not react with sulfonyl chloride because they lack an N–H bond', 'secondary amines form insoluble ones, and tertiary amines do not react'] },

{ q: 'Q58', id: 'chem-299', key: 'B',
  stemWas: 'How many structural isomers does C₄H₁₀ have?',
  optionsWere: ['1', '2', '3', '4'],
  frozen: true },

{ q: 'Q59', id: 'chem-300', key: 'B',
  stemWas: 'Cis-trans isomerism in alkenes requires:',
  optionsWere: ['A triple bond', 'Two different substituents on each carbon of the double bond', 'Free rotation about the double bond', 'An asymmetric carbon'],
  stem: 'For an alkene to have distinct E/Z configurations about a C=C bond, which structural requirement must be met?',
  main: 'Each carbon of the double bond must have two different substituents. Restricted rotation about C=C then allows two distinct configurations. E/Z notation compares the higher-priority group on each carbon: together gives Z, opposite gives E. In simple examples such as but-2-ene, cis/trans terminology can also be used. If either carbon has two identical groups, there is no E/Z pair at that bond.',
  feedback: {
    A: 'An ordinary carbon–carbon triple bond is linear and has only one external substituent on each carbon. It therefore does not create the two-sided arrangement required for an E/Z pair.',
    C: 'Free rotation would allow the arrangements to interconvert easily. Rotation about a C=C bond requires disruption of π overlap, which creates the barrier separating its configurations. Ordinary single-bond rotation usually gives conformations rather than a stable alkene E/Z pair.',
    D: 'An alkene can have E/Z configurations without any tetrahedral chiral carbon. A carbon attached to four different groups is one common source of chirality, but it is not required for all enantiomerism either.'
  },
  points: [
    'Each double-bond carbon must have two different substituents for E/Z configurations to exist.',
    'Restricted rotation results from the π interaction between the double-bonded carbons.',
    'E/Z notation compares substituent priorities on the two carbons, not simply their sizes.',
    'Cis/trans terminology works for familiar simple cases, while E/Z notation is more general.',
    'Alkene stereoisomerism does not require a tetrahedral chiral carbon; substituted rings can also show cis/trans relationships.'
  ],
  gone: ['An asymmetric (chiral) carbon is required for enantiomerism', 'Geometric (cis-trans) isomerism occurs when each carbon', 'cis and trans forms would interconvert freely'] },

{ q: 'Q60', id: 'chem-301', key: 'B',
  stemWas: 'A molecule with one chiral center has how many stereoisomers?',
  optionsWere: ['1', '2', '3', '4'],
  stem: 'A molecule has one tetrahedral carbon bonded to four different groups and no other source of stereoisomerism. How many stereoisomers are possible?',
  main: 'The four different groups around this carbon can form two configurations, designated R and S. These are nonsuperimposable mirror images, so they are enantiomers. With one such center and no other source of stereoisomerism, the count is two. The familiar 2ⁿ expression is an upper limit for n tetrahedral chiral centers when these are the only stereogenic elements; symmetry can reduce the count in molecules with multiple centers.',
  feedback: {
    A: 'One would mean only one distinct configuration. Here the four different groups create two nonsuperimposable mirror-image configurations. An achiral molecule still has a mirror image; its mirror image is simply superimposable on it.',
    C: 'The specified single center has only two configurations, R and S, so there is no third configuration. Some molecules with multiple centers have three stereoisomers because of symmetry and a meso form, but that does not apply to this molecule.',
    D: 'Four requires additional independent stereochemical variation, such as a second chiral center or a separate E/Z unit. The stem excludes those possibilities, leaving only two configurations.'
  },
  points: [
    'A tetrahedral carbon attached to four different groups is a common type of chiral center.',
    'One such center, with no other stereogenic element, gives two configurations: R and S.',
    'These two configurations are nonsuperimposable mirror images, called enantiomers.',
    'Pure enantiomers rotate plane-polarized light equally in opposite directions under the same conditions; a racemic mixture has no net rotation.',
    'For molecules whose only stereogenic elements are n tetrahedral chiral centers, 2ⁿ is an upper limit; symmetry can reduce the actual number.'
  ],
  gone: ['A single molecule cannot be its own stereoisomer', '2 raised to any whole number is always even', 'Four stereoisomers (2² = 4) would require two chiral centers', 'A stereocentre is a carbon bearing four different substituents'] }

];
