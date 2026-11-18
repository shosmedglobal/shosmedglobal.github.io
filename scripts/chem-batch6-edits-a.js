/* Chemistry batch 6 edits, Q1-Q10 (chem-302..chem-311).
 *
 * `stemWas` and `optionsWere` are the review's own ORIGINAL identification
 * signatures, asserted here so the harness refuses to edit a record that is not
 * the one the review reviewed. Formula typography follows the pack's Unicode
 * subscripts, superscripts, Greek letters and arrows. Main explanations stay a
 * single paragraph, as stored.
 */
'use strict';
module.exports = [

{ q: 'Q1', id: 'chem-302', key: 'B',
  stemWas: 'Which molecule can exhibit optical activity?',
  optionsWere: ['Propan-2-ol', 'Butan-2-ol', '2-methylpropan-2-ol', 'Methanol'],
  mainEdits: [
    ['This asymmetry allows it to rotate plane-polarized light.',
     'A sample containing more of one enantiomer than the other can rotate plane-polarized light; an equal mixture of the two enantiomers has no net rotation.']
  ],
  fbEdits: [
    ['D', 'A carbon must have four different substituents to be a stereocenter.',
     'For a tetrahedral carbon to be a chirality center, its four attached groups must be different.']
  ],
  pointEdits: [
    [1, 'Chirality means that a molecule is not superimposable on its mirror image. A pure enantiomer can show optical activity, whereas a racemate has no net rotation.'],
    [3, 'For these alcohols, inspect each tetrahedral carbon for four different attached groups.'],
    [4, 'Check the whole structure as well: a molecule with stereocenters can still be achiral, as in a meso compound.']
  ],
  keep: ['Propan-2-ol (CH₃CH(OH)CH₃) has a central carbon bonded to –OH', '2-Methylpropan-2-ol ((CH₃)₃COH) is a tertiary alcohol',
         '<li>In butan-2-ol, C2 carries H, OH, CH₃, and C₂H₅ - four different groups, so it is a stereocentre.</li>',
         '<li>A racemic mixture of equal enantiomers also shows no net rotation, even though each molecule in it is chiral.</li>'],
  gone: ['This asymmetry allows it to rotate plane-polarized light.', 'A carbon must have four different substituents to be a stereocenter.',
         '<li>A molecule is optically active only if it is chiral'] },

{ q: 'Q2', id: 'chem-303', key: 'B',
  stemWas: 'Meso compounds are optically inactive despite having chiral centers because they:',
  optionsWere: ['Have no chiral centers at all', 'Possess an internal plane of symmetry', 'Are racemic mixtures', 'Contain only one chiral center'],
  stem: 'Meso-tartaric acid has two stereocenters but is optically inactive. Which feature explains its overall achirality?',
  main: 'Meso-tartaric acid has an internal mirror plane in an appropriate conformation, making the molecule superimposable on its mirror image. It is therefore achiral despite having two stereocenters. A meso compound is a single achiral substance, whereas a racemate is an equal mixture of two different enantiomers.',
  feedback: {
    A: 'Meso-tartaric acid does have two stereocenters. The presence of stereocenters alone does not establish that the whole molecule is chiral; its overall symmetry also matters.',
    C: 'A racemate contains equal amounts of two enantiomers whose optical rotations cancel in the sample. Meso-tartaric acid is one achiral compound, so its lack of optical rotation does not require an enantiomer mixture.',
    D: 'Meso-tartaric acid has two stereocenters, not one. Its achirality follows from the relationship between the two halves of the molecule, rather than from an absence of stereocenters.'
  },
  points: [
    'A meso compound has stereocenters but is achiral as a whole.',
    'Meso-tartaric acid illustrates how an internal mirror plane can make a structure superimposable on its mirror image.',
    'A meso substance and a racemate are different: one is achiral, while the other contains two enantiomers in equal amounts.',
    'Separating a racemate can give its individual enantiomers; a meso compound cannot be separated into an enantiomeric pair.',
    'For a structure whose only stereogenic features are n tetrahedral centers, 2ⁿ is an upper bound; symmetry can reduce the number of distinct stereoisomers.'
  ],
  gone: ['The optical rotation from one chiral center is exactly cancelled by the other.',
         'the rotation caused by one chiral center is exactly canceled by its mirror-image counterpart within the same molecule',
         'meso = one molecule canceling itself', 'resulting in internal cancellation of optical rotation',
         'The rotation contributed by one half of the molecule is cancelled exactly by the other half'] },

{ q: 'Q3', id: 'chem-304', key: 'B',
  stemWas: 'In the Cahn-Ingold-Prelog (CIP) system, substituent priority is determined by:',
  optionsWere: ['Molecular weight of the entire group', 'Atomic number of the atom directly bonded to the chiral center', 'Electronegativity of the substituent', 'Number of bonds in the substituent'],
  stem: 'When the atoms directly attached to a stereocenter are different elements, what determines their initial priority in the Cahn-Ingold-Prelog (CIP) system?',
  main: 'Compare the directly attached atoms first: the element with the higher atomic number has higher priority. For isotopes of the same element, the higher mass number takes priority, such as ²H over ¹H. If the directly attached atoms tie, compare the next sets of attached atoms in descending priority order and use the first difference.',
  feedback: {
    A: 'The total molecular mass of a substituent is not the criterion. Compare atoms in sequence: for –CH₂OH and –CH₂CH₃, the first atoms are both carbon, but the next comparison includes oxygen versus carbon, so –CH₂OH ranks higher.',
    C: 'Electronegativity describes attraction for bonding electrons. It is not the ranking rule here: the initial comparison of different elements uses atomic number.'
  },
  fbEdits: [
    ['D', 'The number of bonds in a substituent is not used to assign CIP priority. The system works by comparing atomic numbers at each successive point of difference, outward from the chiral center.',
     'Simply counting bonds does not assign priority. Multiple bonds are represented using duplicate atoms when applying the comparison rules.']
  ],
  pointEdits: [
    [1, 'For directly attached atoms of different elements, higher atomic number means higher priority.'],
    [2, 'When directly attached atoms tie, compare the next attached atoms in descending priority order and stop at the first difference.'],
    [4, 'Isotopes are an important exception to a simple atomic-number comparison: the isotope with the higher mass number ranks higher.']
  ],
  keep: ['Double and triple bonds are handled by the phantom atom rule',
         '<li>A double bond is treated as though the atom were duplicated.</li>',
         '<li>With the lowest-priority group pointing away from you, 1 to 2 to 3 clockwise is R and anticlockwise is S.</li>'],
  gone: ['atoms directly attached to the chiral center are ranked by atomic number (higher atomic number = higher priority)',
         'The molecular weight of the entire substituent group is irrelevant',
         'CIP priority is based on atomic number (number of protons), not electronegativity',
         'Priority depends on atomic number alone - not on group size, mass, or electronegativity'] },

{ q: 'Q4', id: 'chem-305', key: 'B',
  stemWas: 'A compound with the configuration (R)-2-bromobutane and its mirror image (S)-2-bromobutane are:',
  optionsWere: ['Identical', 'Enantiomers', 'Diastereomers', 'Constitutional isomers'],
  mainEdits: [
    ['They have identical physical properties except for the direction of optical rotation and their interaction with other chiral molecules.',
     'Enantiomers have the same ordinary physical properties in achiral environments, but opposite optical rotations under the same measurement conditions; they can interact differently with chiral substances.']
  ],
  feedback: {
    A: 'The two structures have the same connectivity, but they cannot be superimposed: the four groups around C2 have opposite three-dimensional arrangements. They are different stereoisomers, rather than two drawings of the same configuration.',
    C: 'Diastereomers are stereoisomers that are not mirror images. Examples include E/Z alkene pairs and compounds differing at some, but not all, of several stereocenters. These two bromobutanes are instead a non-superimposable mirror-image pair.'
  },
  pointEdits: [
    [3, 'In achiral environments, enantiomers share ordinary physical properties; they can behave differently toward chiral molecules.'],
    [4, 'Diastereomers are not mirror images and generally have different physical properties, which can help separate them.']
  ],
  keep: ['Constitutional (structural) isomers have the same molecular formula but different atom connectivity',
         '<li>Two molecules that are non-superimposable mirror images are enantiomers.</li>'],
  gone: ['<p><strong>A. Identical:</strong> They have identical physical properties except for the direction of optical rotation',
         '<li>Enantiomers share all ordinary physical properties, differing only in the direction of optical rotation'] },

{ q: 'Q5', id: 'chem-306', key: 'C',
  stemWas: 'Which statement about diastereomers is correct?',
  optionsWere: ['They are mirror images of each other', 'They have identical physical properties', 'They are stereoisomers that are NOT mirror images', 'They always have opposite optical rotations'],
  main: 'Diastereomers are stereoisomers that are not mirror images. They may differ at some of several stereocenters, or they may be E/Z alkene isomers. Their physical properties generally differ, so methods such as crystallization or chromatography can often separate them.',
  feedback: {
    B: 'Diastereomers are not required to have identical physical properties. Differences in properties such as melting point or solubility often allow separation by ordinary methods; this does not mean that every property must differ.'
  },
  fbEdits: [
    ['D', 'Enantiomers always rotate plane-polarized light by equal amounts in opposite directions.',
     'Pure enantiomers have equal and opposite optical rotations when measured under the same conditions.']
  ],
  pointEdits: [
    [2, 'Examples include structures differing at some of several stereocenters and E/Z alkene pairs.'],
    [3, 'Differences in physical properties often make diastereomers separable by ordinary laboratory methods.'],
    [4, 'Enantiomers are non-superimposable mirror images and have the same ordinary physical properties in achiral environments.']
  ],
  keep: ['Stereoisomers that are mirror images are called enantiomers, not diastereomers',
         'their optical rotations can differ in both magnitude and sign',
         '<li>Diastereomers are stereoisomers that are not mirror images of one another.</li>'],
  gone: ['They differ at some but not all stereocenters. Unlike enantiomers, diastereomers have different physical properties',
         'Unlike enantiomers (which share nearly all physical properties except optical rotation direction)',
         '<li>They arise when a molecule has two or more stereocentres and only some of them are inverted.</li>'] },

{ q: 'Q6', id: 'chem-307', key: 'B',
  stemWas: 'The E/Z system for naming geometric isomers uses which priority rule?',
  optionsWere: ['Alphabetical order of substituents', 'Cahn-Ingold-Prelog priority rules', 'Molecular weight of substituents', 'Size of substituents'],
  mainEdits: [
    ['using CIP rules (based on atomic number)', 'using CIP rules, including atomic-number comparisons and the mass-number rule for isotopes']
  ],
  feedback: {
    A: 'Alphabetical order does not determine E/Z priority. Apply the CIP rules separately at each alkene carbon, then compare the positions of the two higher-priority groups.',
    C: 'The total molecular mass of a substituent does not determine E/Z priority. CIP compares atoms in sequence; when comparing isotopes of the same element, however, the higher mass number does give higher priority.',
    D: 'Bulk alone does not set priority. For example, bromine outranks a group directly attached through carbon because Br has the higher atomic number, even if that carbon-containing group is much larger.'
  },
  pointEdits: [
    [5, 'CIP first compares atomic numbers, uses mass numbers to distinguish isotopes, and works outward to resolve remaining ties.']
  ],
  keep: ['<li>Z (zusammen, together) means the two higher-priority groups are on the same side', 'zusammen, German for'],
  gone: ['using CIP rules (based on atomic number)', 'Alphabetical ordering is not used in any IUPAC stereochemical naming system',
         'Physical size (van der Waals radius) of substituents has no role',
         '<li>As with R/S, priority is decided by atomic number, working outward to the first point of difference.</li>'] },

{ q: 'Q7', id: 'chem-308', key: 'B',
  stemWas: 'How many stereoisomers exist for 2,3-dibromobutane?',
  optionsWere: ['2', '3', '4', '5'],
  frozen: true },

{ q: 'Q8', id: 'chem-309', key: 'D',
  stemWas: 'Glucose is classified as:',
  optionsWere: ['A ketopentose', 'An aldopentose', 'A ketohexose', 'An aldohexose'],
  main: 'Glucose is an aldohexose: it has six carbon atoms, and its open-chain form has an aldehyde at C1. In water it exists mainly as cyclic hemiacetals, but its classification still refers to the open-chain structure. Fructose is a ketohexose because its open-chain carbonyl is a ketone.',
  fbEdits: [
    ['A', 'Glucose has 6 carbons and an aldehyde group', 'Open-chain glucose has 6 carbons and an aldehyde group'],
    ['B', 'Glucose has the right functional group (aldehyde)', 'The open-chain form of glucose has an aldehyde']
  ],
  feedback: {
    C: 'A ketohexose has six carbons and a ketone in its open-chain structure, as in fructose. Open-chain glucose instead has an aldehyde at C1, so glucose is an aldohexose.'
  },
  pointEdits: [
    [1, 'Monosaccharides are classified by carbon count and by the carbonyl group in their open-chain form.'],
    [2, 'Open-chain glucose has six carbons and an aldehyde at C1, giving the name aldohexose.'],
    [3, 'Open-chain fructose has six carbons and a ketone at C2, giving the name ketohexose.']
  ],
  keep: ['Ribulose is an example', 'Ribose (found in RNA) is a classic example',
         '<li>Aldoses are reducing sugars because the aldehyde can be oxidised',
         '<div style="text-align:center;margin:12px 0"></div>'],
  gone: ['Fructose, by contrast, is a ketohexose (6 carbons with a ketone group at c2)',
         'Glucose (C₆H₁₂O₆) has 6 carbon atoms (hexose) and an aldehyde functional group at C1 (aldo-)',
         '<li>Monosaccharides are named by carbon count and carbonyl type'] },

{ q: 'Q9', id: 'chem-310', key: 'C',
  stemWas: 'The α and β anomers of D-glucose differ in the configuration at:',
  optionsWere: ['C-2', 'C-4', 'C-1 (the anomeric carbon)', 'C-6'],
  mainEdits: [
    ['In a Haworth projection the α-anomer has the C1 –OH pointing down (trans to the C6 CH₂OH group) and the β-anomer has it pointing up (cis to CH₂OH). In the chair conformation these correspond to axial and equatorial positions respectively - axial and equatorial describe the chair, while up and down describe the Haworth drawing.',
     'In the usual Haworth drawing of D-glucopyranose, the α-OH is down and trans to the C6 CH₂OH group; the β-OH is up and cis to it. In the preferred ⁴C₁ chair, these hydroxyls are axial and equatorial, respectively; a chair flip exchanges axial and equatorial positions without changing α into β.']
  ],
  fbEdits: [
    ['D', 'Anomers arise from the two possible orientations of the –OH group at C-1 when the open chain cyclizes: axial (α) or equatorial (β) in the chair conformation.',
     'The anomers differ at C1: their OH groups are trans or cis to the C6 CH₂OH group, respectively, in α- and β-D-glucopyranose.']
  ],
  pointEdits: [
    [3, "In the preferred ⁴C₁ chair of D-glucopyranose, the β-anomer's OH is equatorial; axial/equatorial is a conformation label, not the definition of α/β."],
    [5, "Humans digest starch's α-linked glucose chains but lack cellulase for the β(1→4) linkages in cellulose."]
  ],
  keep: ['C-2 is the carbon whose configuration distinguishes epimers like glucose and mannose',
         'C-4 configuration distinguishes glucose from galactose',
         '<li>Anomers are diastereomers rather than enantiomers'],
  gone: ['axial and equatorial describe the chair, while up and down describe the Haworth drawing',
         'axial (α) or equatorial (β) in the chair conformation',
         'α-1,4 linkages give digestible starch, while β-1,4 linkages give indigestible cellulose'] },

{ q: 'Q10', id: 'chem-311', key: 'B',
  stemWas: 'Cellulose differs from starch primarily in:',
  optionsWere: ['The monosaccharide units used', 'The type of glycosidic linkage (α vs. β)', 'The number of carbon atoms per unit', 'The molecular weight'],
  mainEdits: [
    ['This seemingly small difference has huge consequences: humans can digest starch (via α-amylase) but cannot digest cellulose because we lack the enzyme cellulase to cleave β-linkages.',
     "Human amylases hydrolyze starch's α(1→4) linkages, and other digestive enzymes finish digestion, including at branch points. Humans lack cellulase for cellulose's β(1→4) linkages."]
  ],
  feedback: {
    D: 'Both polymers have variable chain lengths and molecular masses. Their defining difference is linkage: starch contains α-linked glucose, whereas cellulose contains β(1→4)-linked glucose. The linkage changes chain shape and how enzymes recognize the polymer.'
  },
  pointEdits: [
    [4, 'Human amylase acts on α(1→4) linkages in starch; cellulose requires cellulase, which humans do not produce.'],
    [5, 'Ruminants obtain cellulose digestion from gut microbes. Termites are not a valid example of animals universally lacking cellulase: they can use both their own enzymes and microbial enzymes.']
  ],
  keep: ['Both cellulose and starch are polymers of the same monosaccharide: D-glucose',
         'Both cellulose and starch are built from glucose, which has 6 carbon atoms per unit',
         '<li>Starch and cellulose are both polymers of D-glucose - they differ in the linkage, not in the monomer.</li>'],
  gone: ['cannot digest cellulose because we lack the enzyme cellulase to cleave β-linkages',
         'While cellulose molecules tend to be longer than individual amylose or amylopectin chains',
         'Ruminants and termites digest cellulose only through symbiotic microbes'] }

];
