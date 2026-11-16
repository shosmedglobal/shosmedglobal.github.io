/**
 * Chemistry review batch 1, items Q31-Q40 (chem-32 .. chem-41).
 * Spec shape is documented in scripts/chem-batch1-edits-a.js.
 *
 * Q36 (chem-37) is absent from this list: the review keeps it byte-identical.
 * Q33 and Q37 keep their individual five-point blocks (expectPoints: 5); Q33's
 * point 4 is repaired and Q37's five points are untouched.
 *
 * Q40 also loses the two em dashes in its retained options C and D feedback.
 * The review did not ask for that; it is recorded as a deviation in
 * scripts/chem-review-batch1-idmap.json. Only 6 em dashes exist across all 485
 * chemistry records and none as an entity, so these were out of step with the
 * bank's own punctuation.
 */
'use strict';

module.exports = [
  {
    q: 'Q31', id: 'chem-32', expectLetter: 'C',
    stem: 'Using molecular prefixes to specify both atom counts, which name describes N₂O₅?',
    options: [[3, 'Dinitrogen tetroxide']],
    explanation: [
      ['<p>For binary covalent compounds (nonmetal + nonmetal), Greek prefixes indicate the number of each atom.</p>',
       '<p>The prefix di- indicates two nitrogen atoms, and pent- in the commonly used name pentoxide indicates five ' +
       'oxygen atoms. N₂O₅ is commonly called dinitrogen pentoxide. The systematic compositional spelling dinitrogen ' +
       'pentaoxide is also valid.</p><p>Common molecular names formed with multiplying prefixes:</p>'],
      ['<p><strong>A. Nitrogen oxide:</strong> "Nitrogen oxide" is ambiguous and incomplete -- it does not specify how many atoms of each element are present. For covalent compounds between two nonmetals, IUPAC requires Greek prefixes (mono-, di-, tri-, tetra-, penta-) to indicate the number of each atom.</p>',
       '<p><strong>A. Nitrogen oxide:</strong> Nitrogen oxide does not specify the 2:5 nitrogen-to-oxygen ratio. ' +
       'Several different nitrogen oxides exist, so a more specific name is required.</p>'],
      ['<p><strong>B. Nitrogen pentoxide:</strong> "Nitrogen pentoxide" is missing the prefix "di-" for the two nitrogen atoms. When a molecule contains more than one atom of the first element, its prefix must be included. Only the prefix "mono-" for the first element is typically omitted.</p>',
       '<p><strong>B. Nitrogen pentoxide:</strong> In the explicit molecular-prefix naming pattern used here, di- ' +
       'identifies the two nitrogen atoms. Dinitrogen pentoxide makes the N₂O₅ composition clear.</p>'],
      // the old option D was pentaoxide, marked wrong by a false vowel-dropping rule
      ['<p><strong>D. Dinitrogen pentaoxide:</strong> The prefix "penta-" drops the terminal "a" before "oxide" in IUPAC naming, giving "pentoxide" not "pentaoxide." The correct name is dinitrogen pentoxide. "Pentaoxide" is incorrect because the prefix "penta-" drops its final vowel when followed by "oxide" (a word starting with a vowel), giving "pentoxide" not "pentaoxide." This vowel-dropping rule applies to avoid awkward pronunciation.</p>',
       '<p><strong>D. Dinitrogen tetroxide:</strong> Dinitrogen tetroxide refers to N₂O₄, with four oxygen atoms. ' +
       'N₂O₅ contains five oxygen atoms and is commonly called dinitrogen pentoxide.</p>'],
      ["<p class='exp-key'>Bottom Line: Greek prefixes are used for covalent (nonmetal-nonmetal) compounds. The Stock system (Roman numerals) is used for ionic compounds with variable-charge metals.</p>",
       "<p class='exp-key'>Bottom Line: Multiplying prefixes communicate composition: di- means two and penta- means " +
       'five. N₂O₅ is commonly called dinitrogen pentoxide; dinitrogen pentaoxide is also a valid systematic ' +
       'compositional form.</p>']
    ],
    points: [
      'Multiplying prefixes can specify how many atoms of each element are present.',
      'Di- identifies two nitrogen atoms in N₂O₅, while penta- identifies five oxygen atoms.',
      'Dinitrogen pentoxide is the common molecular name; dinitrogen pentaoxide is also a valid systematic compositional form.'
    ],
    keepText: ['<td>CO = carbon monoxide</td>', '<td>N₂O₅ = dinitrogen pentoxide</td>'],
    gone: ['"Pentaoxide" is incorrect', 'drops the terminal "a"', 'vowel-dropping rule',
           'The Stock system (Roman numerals) is used for ionic compounds',
           'For binary covalent compounds (nonmetal + nonmetal)',
           'Chemical structure determines chemical properties']
  },

  {
    q: 'Q32', id: 'chem-33', expectLetter: 'B',
    explanation: [
      ["<p class='exp-key'>Bottom Line: Density = mass/volume. Specific gravity is the ratio of a substance's density to that of water (1.00 g/cm³). Objects with density &lt; 1 float in water.</p>",
       "<p class='exp-key'>Bottom Line: Density is mass divided by volume, with units such as g/cm³. Relative density " +
       '(specific gravity) is a unitless ratio to a reference density, commonly water. An object\'s average density ' +
       'relative to the surrounding liquid helps determine whether it floats.</p>']
    ],
    points: [
      'Density equals mass divided by volume.',
      '270 g divided by 100 cm³ gives 2.70 g/cm³, consistent with aluminum.',
      'Density carries units; relative density is a ratio and has no units.'
    ],
    keepText: ['270 g / 100 cm³ = <strong>2.70 g/cm³</strong>', '<td>Gold</td>'],
    gone: ['Objects with density &lt; 1 float in water', 'Blood pH is tightly regulated']
  },

  {
    q: 'Q33', id: 'chem-34', expectLetter: 'B', expectPoints: 5,
    explanation: [
      // the SI mass unit is kg, while this calculation consistently uses grams
      ['<th>SI Unit</th>', '<th>Units used here</th>'],
      ['<p><strong>D. 209,000 J:</strong> This would result from using ΔT = 100 degrees (perhaps using 80 as the change instead of 80-20=60). Always calculate the temperature change carefully: ΔT = T<sub>final</sub> - T<sub>initial</sub> = 80 - 20 = 60 degrees C.</p>',
       '<p><strong>D. 209,000 J:</strong> 209,000 J would result from using a temperature change of 100°C, for example ' +
       'by adding 20 and 80. The required change is final minus initial temperature: 80 - 20 = 60°C.</p>'],
      ['<li>Water\'s specific heat is unusually high because hydrogen bonds must be disrupted before the molecules can move faster.</li>',
       "<li>Water's hydrogen-bond network can absorb energy as its arrangement changes, contributing to water's high " +
       'specific heat capacity.</li>']
    ],
    keepText: ['<li>Heat is calculated as Q = mcΔT', '<li>Only the temperature difference matters',
               '<li>That high specific heat is why water moderates temperature so effectively',
               '= <strong>125,400 J = 125.4 kJ</strong>'],
    gone: ['<th>SI Unit</th>', 'hydrogen bonds must be disrupted before the molecules can move faster',
           'perhaps using 80 as the change instead of 80-20=60']
  },

  {
    q: 'Q34', id: 'chem-35', expectLetter: 'B',
    explanation: [
      ['Iodine deficiency causes goiter.</p>', 'Iodine deficiency can cause goiter.</p>'],
      ['<p><strong>C. Bromine (Br):</strong> Bromine has no known essential biological function in humans. While it is a halogen like iodine, the thyroid gland specifically requires iodine to synthesize T3 (triiodothyronine, with 3 iodine atoms) and T4 (thyroxine, with 4 iodine atoms).</p>',
       '<p><strong>C. Bromine (Br):</strong> Bromide has a biological role in the formation of collagen IV cross-links ' +
       'in basement membranes. It does not replace iodine in T3 and T4, so bromine is not the answer to this ' +
       'question.</p>'],
      ["<p class='exp-key'>Bottom Line: Iodine deficiency is the most common preventable cause of intellectual disability worldwide. Iodized salt programs have largely eliminated endemic goiter in developed countries.</p>",
       "<p class='exp-key'>Bottom Line: Iodine is incorporated into T3 and T4. Deficiency can impair thyroid-hormone " +
       'production and cause goiter; adequate thyroid hormone is especially important for development.</p>']
    ],
    points: [
      'T3 and T4 contain three and four iodine atoms, respectively.',
      'Iodine is therefore required for their synthesis.',
      'Iodine deficiency can impair thyroid-hormone production and contribute to goiter.'
    ],
    keepText: ['<strong>Thyroid hormones (T3, T4)</strong>', '<strong>A. Fluorine (F):</strong>'],
    gone: ['Bromine has no known essential biological function', 'most common preventable cause of intellectual disability',
           'largely eliminated endemic goiter in developed countries', 'Atomic structure determines chemical behavior']
  },

  {
    q: 'Q35', id: 'chem-36', expectLetter: 'C',
    explanation: [
      ['<p>Water forms strong hydrogen bonds (O-H...O) because oxygen is highly electronegative and small. H₂S cannot form H-bonds (S is not electronegative enough).</p>',
       '<p>Water molecules form an extensive hydrogen-bond network through their O-H groups and oxygen lone pairs. ' +
       'Liquid H₂S does not form a comparably strong network, so its molecules separate much more readily on ' +
       'boiling.</p>'],
      // the old table taught a universal weakest-to-strongest ranking
      ["<table class='exp-table'><tr><th>Force Type</th><th>Strength</th><th>Requirement</th></tr><tr><td>London dispersion</td><td>Weakest</td><td>All molecules</td></tr><tr><td>Dipole-dipole</td><td>Moderate</td><td>Polar molecules</td></tr><tr><td><strong>Hydrogen bonds</strong></td><td><strong>Strongest intermolecular</strong></td><td><strong>H bonded to F, O, or N</strong></td></tr></table>",
       "<table class='exp-table'><tr><th>Interaction</th><th>Where it occurs</th><th>Important qualification</th></tr>" +
       '<tr><td>London dispersion</td><td>All atoms and molecules</td><td>Strength increases with polarizability and ' +
       'contact area</td></tr>' +
       '<tr><td>Permanent dipole-dipole</td><td>Polar molecules</td><td>Strength depends on the molecules and their ' +
       'arrangement</td></tr>' +
       '<tr><td><strong>Hydrogen bonding</strong></td><td><strong>Commonly H attached to N, O or F interacting with ' +
       'an acceptor</strong></td><td><strong>Especially important in water; not a universal strongest-force ' +
       'ranking</strong></td></tr></table>'],
      ['<p><strong>A. London dispersion forces:</strong> London dispersion forces (also called van der Waals forces) are the weakest intermolecular forces, arising from temporary fluctuations in electron distribution. They are present in all molecules but are the only intermolecular force in nonpolar molecules like CH4 and noble gases. Water\'s anomalously high boiling point requires a stronger explanation.</p>',
       '<p><strong>A. London dispersion forces:</strong> Both water and H₂S experience dispersion forces. H₂S is more ' +
       'polarizable, so dispersion alone does not explain why water has the much higher boiling point. Water\'s ' +
       'hydrogen-bond network supplies the key distinction.</p>'],
      ['<p><strong>B. Dipole-dipole interactions:</strong> Dipole-dipole interactions occur between polar molecules and are stronger than London forces. Water is indeed polar, but dipole-dipole forces alone cannot explain why water boils at 100 degrees C while similar-sized molecules like H<sub>2</sub>S (also polar) boil at -60 degrees C. The key difference is hydrogen bonding.</p>',
       '<p><strong>B. Dipole-dipole interactions:</strong> Both molecules are polar. Ordinary permanent-dipole ' +
       'attractions alone do not explain the large boiling-point difference; the specific hydrogen-bond network in ' +
       'water is important.</p>'],
      ["<p class='exp-key'>Bottom Line: Hydrogen bonds require H bonded to F, O, or N (small, highly electronegative atoms). They explain water's high boiling point, surface tension, and its role as a universal biological solvent.</p>",
       "<p class='exp-key'>Bottom Line: Water's extensive hydrogen bonding gives it an unusually high boiling point. " +
       'Dispersion and dipole interactions also occur; their strengths cannot be ranked by a universal ' +
       'weakest-to-strongest list.</p>']
    ],
    points: [
      'Water molecules form an extensive hydrogen-bond network.',
      'H₂S lacks a comparable network, helping explain its much lower boiling point.',
      'Dispersion forces occur in both substances; there is no universal strength ranking independent of molecular structure.'
    ],
    // option D's intermolecular/intramolecular distinction is retained
    keepText: ['The distinction between intramolecular bonds (within molecules) and intermolecular forces'],
    gone: ['universal biological solvent', '<td>Weakest</td>', '<strong>Strongest intermolecular</strong>',
           'S is not electronegative enough', 'Hydrogen bonds require H bonded to F, O, or N',
           'nonpolar (<0.4), polar covalent (0.4-1.7), ionic (>1.7)']
  },

  {
    q: 'Q37', id: 'chem-38', expectLetter: 'B', expectPoints: 5,
    explanation: [
      // simple capillary rise alone does not explain transport through tall plants
      ['Capillary action in narrow tubes is essential for water movement in plant xylem.</p>',
       'Adhesion and cohesion contribute to water behavior in plant xylem, but transport to the tops of tall plants ' +
       'is driven mainly by transpiration pull through a continuous water column.</p>']
    ],
    keepText: ['<li>A meniscus forms from competition between adhesion',
               '<li>In mercury, cohesion exceeds adhesion',
               'Water in glass forms a concave meniscus (adhesion &gt; cohesion)'],
    gone: ['Capillary action in narrow tubes is essential for water movement in plant xylem']
  },

  {
    q: 'Q38', id: 'chem-39', expectLetter: 'B',
    stemEdit: [["Henry's law states that the solubility", "At constant temperature, Henry's law states that the solubility"]],
    explanation: [
      ["<p>CO₂ is dissolved under high pressure. When the bottle is opened, pressure drops, and gas solubility decreases (Henry's law), causing bubbles.</p>",
       '<p>CO₂ is dissolved under high pressure. When the bottle is opened, the CO₂ partial pressure above the liquid ' +
       "falls, so the dissolved CO₂ concentration the solution can hold at equilibrium decreases (Henry's law), and " +
       'bubbles form.</p>'],
      ["<tr><td>Henry's law</td><td>C = kH × P</td><td>Gas solubility in liquids</td></tr>",
       "<tr><td>Henry's law</td><td>C = kH × P (dilute solution, constant temperature)</td>" +
       '<td>Dissolved gas concentration vs that gas\'s partial pressure</td></tr>'],
      ['<p><strong>C. Oil and water not mixing:</strong> Oil and water do not mix because of the hydrophobic effect: nonpolar oil molecules cannot form favorable interactions with polar water molecules. This is about liquid-liquid miscibility and polarity, not gas solubility or pressure effects.</p>',
       '<p><strong>C. Oil and water not mixing:</strong> Oil-water separation reflects differences in polarity and ' +
       'intermolecular interactions. This is a question of liquid-liquid miscibility, not the dependence of ' +
       'dissolved-gas concentration on gas partial pressure.</p>'],
      ['<p><strong>D. Salt melting ice on roads:</strong> Salt melting ice demonstrates freezing point depression, a colligative property. Adding solute (salt) lowers the freezing point of water, causing ice to melt at temperatures below 0 degrees C. This is governed by Raoult\'s law, not Henry\'s law.</p>',
       "<p><strong>D. Salt melting ice on roads:</strong> Salt lowers water's freezing point, which can promote " +
       "melting under suitable conditions. This colligative effect is different from Henry's law, which relates " +
       'dissolved gas concentration to gas partial pressure.</p>'],
      ["<p class='exp-key'>Bottom Line: C = kHP where C is gas concentration, kH is Henry's constant, and P is partial pressure. Decompression sickness (the bends) in divers is also explained by Henry's law: dissolved N₂ forms bubbles when pressure drops rapidly.</p>",
       "<p class='exp-key'>Bottom Line: C = kH × P is the dilute-solution equilibrium relation, where C is the " +
       "dissolved gas concentration, P is that gas's partial pressure, and kH is Henry's constant defined in that " +
       'convention and at that temperature. Decompression sickness in divers illustrates the same idea: dissolved N₂ ' +
       'can form bubbles when the surrounding pressure falls rapidly.</p>']
    ],
    points: [
      "At constant temperature, dissolved gas concentration is approximately proportional to its partial pressure above the liquid.",
      'Opening a carbonated drink lowers the CO₂ partial pressure, so dissolved CO₂ escapes as bubbles.',
      "Henry's constant depends on the gas, solvent, temperature and the convention used to define it."
    ],
    keepText: ['<td>Decompression sickness</td>', '<strong>A. Ice floating on water:</strong>'],
    gone: ['pressure drops, and gas solubility decreases', "governed by Raoult's law",
           '<td>Gas solubility in liquids</td>', 'Colligative properties (boiling point elevation']
  },

  {
    q: 'Q39', id: 'chem-40', expectLetter: 'B',
    points: [
      'Convert solute mass to moles before calculating molarity.',
      '4.0 g NaOH divided by 40 g/mol gives 0.10 mol.',
      'Molarity uses final solution volume in liters: 0.10 mol / 0.500 L = 0.20 M.'
    ],
    // the review changes nothing else in this item
    keepText: ['0.1 / 0.5 = <strong>0.2 M</strong>', 'Bottom Line: Molarity = moles/liters',
               '<strong>A. 0.1 M:</strong>', '<strong>C. 0.5 M:</strong>', '<strong>D. 1.0 M:</strong>'],
    gone: ['Osmosis drives water movement from low to high solute concentration across semipermeable membranes']
  },

  {
    q: 'Q40', id: 'chem-41', expectLetter: 'B',
    explanation: [
      ['<p><strong>A. H₂:</strong> The remaining 2 mol H₂ are unreacted.</p>',
       '<p><strong>A. H₂:</strong> The available oxygen reacts with only 2 mol of the 4 mol of H₂. Hydrogen therefore ' +
       'remains after oxygen is exhausted, so H₂ is the excess reactant, not the limiting reagent.</p>'],
      // em dashes in the retained options C and D feedback (deviation, see idmap)
      ['The limiting reagent must be one of the reactants (H₂ or O₂) — it is the reactant that runs out first',
       'The limiting reagent must be one of the reactants (H₂ or O₂): it is the reactant that runs out first'],
      ['the ratio is 4:1 — H₂ is in excess.', 'the ratio is 4:1, so H₂ is in excess.']
    ],
    points: [
      'The limiting reagent determines the maximum amount of product.',
      'One mole of O₂ reacts with two moles of H₂, producing two moles of H₂O.',
      'Starting with four moles of H₂ therefore leaves two moles of H₂ after the oxygen is consumed.'
    ],
    keepText: ['producing 2 mol H₂O', '<strong>Limiting</strong>', '<td>Excess (2 mol left over)</td>'],
    // the same sentence also stands in the main explanation, where it belongs;
    // only the copied option A feedback is superseded
    gone: ['<strong>A. H₂:</strong> The remaining 2 mol H₂ are unreacted.', '—',
           'The mole is the bridge between atomic/molecular scale']
  }
];
