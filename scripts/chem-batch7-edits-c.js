/* Chemistry batch 7, display Q21-Q30 (chem-382 .. chem-391). */
'use strict';
module.exports = [

{ q: 'Q21', id: 'chem-382', key: 'C',
  fb: {
    A: 'Enantiomers are non-superimposable mirror-image stereoisomers. They have the same connectivity but differ in spatial arrangement, whereas the molecules described in the stem differ in connectivity.'
  },
  keep: ['These differ in arrangement around a rigid structure (double bond or ring)',
         'Enantiomers are particularly important in pharmacology'],
  gone: ['different spatial arrangement around a chiral center (a type of stereoisomer)'] },

{ q: 'Q22', id: 'chem-383', key: 'C',
  stemWas: 'A radioactive isotope has a half-life of 8 days. If you start with 100 g, how much remains after 24 days?',
  stem: 'A radioactive isotope has a half-life of 8 days. Starting with 100 g of that isotope, what mass of the original undecayed isotope remains after 24 days?',
  mainEdits: [['After each half-life, exactly half of the remaining radioactive atoms decay.',
               'For a macroscopic sample, the amount of undecayed parent isotope falls to approximately half after each half-life.']],
  blEdits: [['original material remains', 'original parent isotope remains']],
  keep: ['there are 24/8 = 3 half-lives', 'after 3 half-lives (24 days) → 12.5 g',
         'remaining = initial × (1/2)<sup>n</sup>'],
  gone: ['exactly half of the remaining radioactive atoms decay', 'original material remains'] },

{ q: 'Q23', id: 'chem-384', key: 'B',
  blEdits: [['Chlorophyll (Mg-porphyrin) is the key photosynthetic pigment.',
             'Chlorophyll a and b contain magnesium in a related chlorin ring, a partially reduced porphyrin-type system.']],
  keep: ['Vitamin B12 (Co-corrin) has a related ring structure.',
         'Porphyrins are tetrapyrrole macrocycles that coordinate metal ions.'],
  gone: ['Chlorophyll (Mg-porphyrin) is the key photosynthetic pigment.'] },

{ q: 'Q24', id: 'chem-385', key: 'B',
  stemWas: 'A reaction that releases heat to the surroundings is classified as:',
  stem: 'At constant pressure, a reaction that releases heat to its surroundings is classified as:',
  main: 'An exothermic reaction releases heat to its surroundings. At constant pressure, when only pressure-volume work is involved, the heat transferred equals the enthalpy change, so ΔH < 0. The products have lower enthalpy than the reactants under the stated conditions. The surroundings may warm, but they need not do so if their temperature is controlled. Combustion and strong-acid/strong-base neutralization are familiar examples.',
  fb: {
    D: 'Adiabatic means there is no heat transfer between the system and its surroundings (q = 0). Its temperature may change, but a temperature change is not part of the definition. It does not describe a reaction releasing heat to the surroundings.'
  },
  blEdits: [['products lower energy', 'products lower enthalpy'],
            ['products higher energy', 'products higher enthalpy']],
  keep: ['Whether a reaction is spontaneous depends on Gibbs free energy (ΔG = ΔH − TΔS), not enthalpy alone.',
         'Isothermal means occurring at constant temperature'],
  gone: ['The products have lower energy than the reactants, and the temperature of the surroundings increases.',
         'products lower energy', 'products higher energy'] },

{ q: 'Q25', id: 'chem-386', key: 'D',
  blEdits: [['Most electronegative: F > O > N > Cl.',
             'For these four elements on the Pauling scale: F > O > Cl > N (3.98, 3.44, 3.16, 3.04).']],
  keep: ['Noble gases are generally not assigned electronegativity values.',
         '<table class=\'exp-table\'>', '<td><strong>3.98</strong></td>'],
  gone: ['F > O > N > Cl'] },

{ q: 'Q26', id: 'chem-387', key: 'B',
  mainEdits: [["Esterification is a condensation reaction in which the -OH group from the carboxylic acid combines with the -H from the alcohol's hydroxyl group, releasing water (H₂O). The remaining fragments join via an ester bond (C-O-C=O).",
               "In the net reaction between a carboxylic acid and an alcohol, an ester and water are formed: R–C(=O)–OH + HO–R' ⇌ R–C(=O)–O–R' + H₂O. The ester linkage is –C(=O)–O–."],
              ['the reverse process (hydrolysis)', 'the acid-catalyzed reverse process (hydrolysis)']],
  fb: {
    C: 'Hydrogen gas is not the small-molecule product of this esterification. For example, H₂ can be released when a reactive metal reacts with an acid; here the eliminated small molecule is water.'
  },
  keep: ['This reaction is typically acid-catalyzed and reversible',
         "R-COOH + R'-OH ⇌ R-COOR' + H₂O (acid-catalyzed)",
         'CO₂ is produced in decarboxylation reactions, not esterification.'],
  gone: ['Esterification is a condensation reaction in which the -OH group',
         'H₂ is released in reactions involving active metals with acids or in certain reduction processes'] },

{ q: 'Q27', id: 'chem-388', key: 'C',
  stemWas: 'Which of the following vitamins is water-soluble and therefore NOT stored in significant quantities in the body?',
  stem: 'Which of the following vitamins is water-soluble?',
  main: 'Vitamin C and the B vitamins are water-soluble; vitamins A, D, E and K are fat-soluble. Many water-soluble vitamins require regular dietary intake because their reserves are limited, but storage differs between vitamins. Vitamin B12 is an important exception, with substantial stores that can last for years. Vitamin C also has a body pool, so it should not be described as completely unstored. Excess water-soluble vitamins are often excreted in urine, but high intakes of some can still be harmful.',
  table: "<table class='exp-table'><tr><th>Category</th><th>Vitamins</th><th>Storage</th><th>Toxicity Risk</th></tr>" +
         '<tr><td>Fat-soluble</td><td>A, D, E, K</td><td>Storage varies; A and D can accumulate, while K has relatively small stores</td><td>Excess A or D can be toxic</td></tr>' +
         '<tr><td><strong>Water-soluble</strong></td><td><strong>C, B-complex</strong></td><td><strong>Many have limited reserves; B12 is a major storage exception</strong></td><td><strong>High doses of some, such as B6 or niacin, can be harmful</strong></td></tr></table>',
  fb: {
    D: 'Vitamin K is fat-soluble and is needed to activate several clotting proteins. Its tissue stores are relatively small compared with those of other fat-soluble vitamins, so storage alone is not a reliable way to classify vitamins.'
  },
  bl: 'Vitamin C is water-soluble; A, D, E and K are fat-soluble. Solubility class helps explain handling in the body, but does not by itself determine storage or safety at high intake.',
  keep: ['Fat-soluble; stored in the liver. Excess can cause hypervitaminosis A',
         'Fat-soluble; stored in adipose tissue and liver. Excess causes hypercalcemia.'],
  gone: ['therefore NOT stored in significant quantities in the body',
         'are readily excreted by the kidneys when in excess',
         '<td><strong>Minimal (excreted)</strong></td>',
         'All Dogs Eat Kibble'] },

{ q: 'Q28', id: 'chem-389', key: 'B',
  stemWas: 'The oxidation of a primary alcohol first produces which functional group?',
  stem: 'Under controlled oxidation conditions that avoid further oxidation, a primary alcohol is converted to which functional group?',
  fb: {
    C: 'With conditions that allow further oxidation, a primary alcohol can give a carboxylic acid. The stem specifically asks about controlled conditions that stop at the aldehyde.',
    D: 'Ethers can be prepared by substitution reactions or by dehydration of suitable alcohols. Those are different transformations from the controlled oxidation described here.'
  },
  bl: 'Controlled oxidation of a primary alcohol gives an aldehyde; suitable further oxidation gives a carboxylic acid. Under standard alcohol-oxidation conditions, secondary alcohols give ketones, while tertiary alcohols resist oxidation because they lack an H on the carbon bearing OH.',
  keep: ['Ketones are produced by oxidation of secondary alcohols (R₂CHOH → R₂C=O), not primary alcohols.',
         'the -CH₂OH group is converted to a -CHO (aldehyde) group'],
  gone: ['cannot be further oxidized without breaking C-C bonds',
         'Ethers are formed by dehydration (condensation) of two alcohol molecules, not by oxidation.',
         'This is the product of FURTHER oxidation of the aldehyde.'] },

{ q: 'Q29', id: 'chem-390', key: 'B',
  stemWas: 'Proteins, nucleic acids, and polysaccharides are all examples of biological macromolecules formed by which type of polymerization reaction?',
  stem: 'A polymer is formed by repeatedly joining monomers that have two reactive functional groups, with water eliminated during each bond-forming step. How is this polymerization classified?',
  main: 'This is condensation polymerization: monomers join while a small molecule is eliminated. In the reaction described, that molecule is water, so it is also called dehydration. For example, a diol and a dicarboxylic acid can form a polyester with loss of water. Other condensation polymerizations can eliminate different small molecules. Cellular synthesis of proteins and nucleic acids uses activated precursors and should not be described as simple repeated water loss from free monomers.',
  fb: {
    A: 'In the familiar addition polymerization of an alkene such as ethene, monomers join without eliminating a small molecule at each linking step. The repeated water elimination in the stem instead identifies condensation polymerization.',
    C: 'Free-radical polymerization describes a mechanism initiated by radicals, commonly used for alkene monomers such as styrene. The defining feature given here is elimination of water as functional groups link.',
    D: 'Ring-opening polymerization begins with cyclic monomers whose rings open as the chain grows. The stem instead describes reaction between functional groups with elimination of water.'
  },
  bl: 'Condensation polymerization joins monomers while eliminating a small molecule, which is water in this example. Hydrolysis consumes water to cleave suitable linkages. Actual biosynthetic pathways must be described using their activated substrates and real leaving groups.',
  gone: ['nucleotides link via phosphodiester bonds (releasing H₂O)',
         'All three major biological polymers (proteins, nucleic acids, polysaccharides) are built and broken down by these complementary reactions.',
         'not the mechanism for biological macromolecules'] },

{ q: 'Q30', id: 'chem-391', key: 'B', frozen: true }

];
