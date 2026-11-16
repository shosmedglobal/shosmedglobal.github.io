/**
 * Chemistry review batch 1, items Q1-Q10 (chem-1 .. chem-10).
 *
 * Spec fields, used by scripts/apply-chem-review-batch1.js:
 *   q              display number in the supplied export (NOT a bank id)
 *   id             verified bank id
 *   expectLetter   the answer letter the review preserves; asserted before editing
 *   stem           complete replacement stem
 *   stemEdit       [[from, to]] for a stem that only gains a stated condition
 *   options        [[index, replacement text]]
 *   explanation    [[from, to]] anchored replacements, applied in order
 *   points         the replacement educational points (replaces the whole list)
 *   keepText       strings that must still be present afterwards
 *   gone           strings that must be absent afterwards
 *   expectPoints   point count after editing (defaults to 3)
 *   noTable        true where the item has no table and must not gain one
 *
 * Every anchor must match exactly once or the whole run fails and nothing is
 * written. Replacement wording is the review's; typography follows the bank's
 * own conventions (literal Unicode subscripts, superscripts and arrows, straight
 * quotes, no em dash, no trailing period on option texts).
 */
'use strict';

module.exports = [
  {
    q: 'Q1', id: 'chem-1', expectLetter: 'B',
    explanation: [
      // option A had no feedback at all; the review supplies it
      ['<h4>Why the other choices are wrong:</h4><p><strong>C. 6:</strong>',
       '<h4>Why the other choices are wrong:</h4><p><strong>A. 1:</strong> One electron can occupy an orbital, ' +
       'but this is not its maximum capacity. A second electron can occupy the same orbital if it has the opposite spin.</p>\n' +
       '<p><strong>C. 6:</strong>'],
      // option C's feedback was a verbatim copy of a main-explanation sentence
      ['<p><strong>C. 6:</strong> A p subshell has 3 orbitals (dumbbell shapes along x, y, z axes), holding up to 6 total.</p>',
       '<p><strong>C. 6:</strong> Six is the capacity of an entire p subshell, which contains three orbitals. ' +
       'Each individual p orbital, like an s orbital, holds at most two electrons.</p>'],
      ['<th>Orbital Type</th>', '<th>Subshell</th>'],
      ['<th>Max Electrons Total</th>', '<th>Max Electrons per Subshell</th>']
    ],
    points: [
      'One orbital can hold at most two electrons, with opposite spins.',
      'An s subshell contains one orbital; a p subshell contains three.',
      'Subshell capacities are s: 2, p: 6, d: 10 and f: 14 electrons.'
    ],
    keepHeadings: ['<strong>A. 1:</strong>', '<strong>C. 6:</strong>', '<strong>D. 10:</strong>'],
    keepText: ['Pauli exclusion principle'],
    gone: ['<th>Orbital Type</th>', 'Max Electrons Total', 'Atomic structure determines chemical behavior']
  },

  {
    q: 'Q2', id: 'chem-2', expectLetter: 'D',
    stem: 'At 25°C, a dilute aqueous solution has a pH of 4. Approximately how many times greater is its hydrogen ion concentration than that of pure water at pH 7?',
    explanation: [
      ['<p>The pH scale is <strong>logarithmic</strong>. Each unit decrease in pH represents a 10-fold increase in H⁺ concentration.</p>',
       '<p>The pH scale is <strong>logarithmic</strong>. For a dilute aqueous solution, pH ≈ -log₁₀[H⁺], so each one-unit ' +
       'decrease in pH corresponds to about ten times the hydrogen ion concentration.</p>'],
      ['<p>Difference = 10⁻⁴ / 10⁻⁷ = 10³ = <strong>1000 times more acidic</strong></p>',
       '<p>Ratio = 10⁻⁴ / 10⁻⁷ = 10³ = <strong>1,000 times the hydrogen ion concentration</strong></p>'],
      ['<p><strong>B. 30 times:</strong> 30 times would imply a pH difference of about 1.48 units (since 10<sup>1</sup>.48 is roughly 30). The actual difference here is 3 full pH units (7 minus 4), which corresponds to 10<sup>3</sup> = 1000 times.</p>',
       '<p><strong>B. 30 times:</strong> A 30-fold difference is not the result of a three-unit pH change. ' +
       'Multiply by 10 for each unit: 10 × 10 × 10 = 1,000.</p>'],
      ['<p><strong>C. 300 times:</strong> 300 times would correspond to a pH difference of about 2.48 units (since 10<sup>2</sup>.48 is roughly 300). With a 3-unit pH difference, the factor is exactly 10<sup>3</sup> = 1000.</p>',
       '<p><strong>C. 300 times:</strong> A three-unit pH difference gives 10<sup>3</sup> = 1,000, not 300. ' +
       'The three is an exponent, not a multiplier applied to 100.</p>'],
      ["<p class='exp-key'>Bottom Line: pH = -log[H⁺]. Because it's logarithmic, a pH difference of 3 units means 10³ = 1000-fold difference in acidity. This is why small pH changes can have large biological effects.</p>",
       "<p class='exp-key'>Bottom Line: A decrease of three pH units corresponds to about a 1,000-fold increase in " +
       'hydrogen ion concentration in dilute aqueous solutions. Neutral water has pH 7 at 25°C.</p>']
    ],
    points: [
      'In dilute aqueous solutions, pH ≈ -log₁₀[H⁺].',
      'Each one-unit fall in pH corresponds to about ten times the hydrogen ion concentration.',
      'From pH 7 to pH 4, the concentration ratio is 10<sup>3</sup> = 1,000.'
    ],
    // option A's logarithmic-versus-linear distinction is retained
    keepText: ['This is a common mistake from treating the pH scale as linear'],
    gone: ['10<sup>1</sup>.48', '10<sup>2</sup>.48', '1000 times more acidic',
           '1000-fold difference in acidity', 'Blood pH is tightly regulated']
  },

  {
    q: 'Q3', id: 'chem-3', expectLetter: 'C',
    explanation: [
      ['<p>Na is a metal (electronegativity ~0.9) and Cl is a nonmetal (electronegativity ~3.0). The large electronegativity difference (2.1) leads to electron transfer rather than sharing.</p>',
       '<p>Sodium chloride is an ionic solid made of Na⁺ and Cl⁻ ions in a crystal lattice. Sodium readily loses one ' +
       'electron, while chlorine readily gains one. Attraction between the oppositely charged ions holds the lattice ' +
       'together. The large electronegativity difference supports this ionic description, but numerical ' +
       'electronegativity cutoffs are only guides, not universal rules.</p>'],
      // the old table taught numerical cutoffs as hard boundaries
      ["<table class='exp-table'><tr><th>Electronegativity Difference</th><th>Bond Type</th><th>Example</th></tr><tr><td>0 - 0.4</td><td>Nonpolar covalent</td><td>H-H, Cl-Cl</td></tr><tr><td>0.4 - 1.7</td><td>Polar covalent</td><td>H-Cl, H-O</td></tr><tr><td>&gt; 1.7</td><td>Ionic</td><td>Na-Cl, K-F</td></tr></table>",
       "<table class='exp-table'><tr><th>Bonding description</th><th>Electron distribution</th><th>Example</th></tr>" +
       '<tr><td>Nonpolar covalent</td><td>Shared approximately equally</td><td>H-H</td></tr>' +
       '<tr><td>Polar covalent</td><td>Shared unequally</td><td>H-Cl</td></tr>' +
       '<tr><td>Ionic</td><td>Attraction between oppositely charged ions</td><td>NaCl</td></tr></table>'],
      ['<p><strong>A. Nonpolar covalent bond:</strong> A nonpolar covalent bond forms when two atoms share electrons equally, which occurs when their electronegativity difference is very small (less than 0.4). Examples include H-H, Cl-Cl, and O=O. Na and Cl have an electronegativity difference of 2.1, far too large for any type of covalent bond.</p>',
       '<p><strong>A. Nonpolar covalent bond:</strong> Nonpolar covalent bonding involves approximately equal sharing, ' +
       'as in H₂ or Cl₂. Sodium chloride instead forms a lattice of positively and negatively charged ions.</p>'],
      ['<p><strong>B. Polar covalent bond:</strong> A polar covalent bond involves unequal sharing of electrons between atoms with a moderate electronegativity difference (0.4 to 1.7), such as H-Cl or H-O. Na and Cl differ by 2.1 in electronegativity, which exceeds the threshold for covalent bonding and instead results in full electron transfer (ionic bond).</p>',
       '<p><strong>B. Polar covalent bond:</strong> Polar covalent bonds involve unequal sharing within a covalent bond, ' +
       'as in HCl. Solid NaCl is described as an ionic lattice. Electronegativity difference alone is not an absolute ' +
       'test separating all ionic and covalent compounds.</p>'],
      ["<p class='exp-key'>Bottom Line: Ionic bonds form between metals and nonmetals (large electronegativity difference). Covalent bonds form between nonmetals. The electronegativity difference determines whether a covalent bond is polar or nonpolar.</p>",
       "<p class='exp-key'>Bottom Line: NaCl is held together by attraction between Na⁺ and Cl⁻ ions. " +
       'Electronegativity differences help predict bonding, but bonding lies on a continuum and numerical cutoffs ' +
       'have exceptions.</p>']
    ],
    points: [
      'Sodium chloride contains Na⁺ and Cl⁻ ions arranged in an ionic lattice.',
      'Ionic bonding is electrostatic attraction between oppositely charged ions.',
      'Electronegativity differences guide bonding predictions, but numerical cutoffs have exceptions.'
    ],
    // option D's metallic-lattice explanation is retained
    keepText: ['the "electron sea" model', 'Na loses 1 electron to become Na⁺'],
    gone: ['&gt; 1.7', '0.4 - 1.7', 'far too large for any type of covalent bond',
           'exceeds the threshold for covalent bonding', 'nonpolar (<0.4), polar covalent (0.4-1.7), ionic (>1.7)']
  },

  {
    q: 'Q4', id: 'chem-4', expectLetter: 'C', noTable: true,
    explanation: [
      ['<p><strong>B. 84 g/mol:</strong> 84 g/mol is actually the molar mass of NaHCO3 (sodium bicarbonate, or baking soda): 23 + 1 + 12 + 3(16) = 84. For CaCO3, the calculation gives 40 + 12 + 48 = 100 g/mol.</p>',
       '<p><strong>B. 84 g/mol:</strong> 84 g/mol results from counting only two oxygen atoms: 40 + 12 + 2(16) = 84. ' +
       'CaCO₃ contains three oxygen atoms, so their contribution is 48 g/mol.</p>'],
      ['<p><strong>D. 116 g/mol:</strong> If you got 116, you may have added an extra oxygen atom or miscounted the atoms. Double-check: CaCO3 has 1 Ca (40) + 1 C (12) + 3 O (48) = 100 g/mol. The number 116 does not correspond to any standard error in this calculation.</p>',
       '<p><strong>D. 116 g/mol:</strong> 116 g/mol results from counting four oxygen atoms: 40 + 12 + 4(16) = 116. ' +
       'The formula has three oxygen atoms, giving 100 g/mol.</p>']
    ],
    points: [
      "A formula's subscripts specify the numbers of atoms to include in its molar mass.",
      'In CaCO₃, the oxygen contribution is 3 × 16 = 48 g/mol.',
      'Adding the contributions gives 40 + 12 + 48 = 100 g/mol.'
    ],
    // option A's feedback, the main calculation and the Bottom Line are retained
    keepText: ['forgetting to multiply oxygen by 3', '= <strong>100 g/mol</strong>',
               "Bottom Line: To find molar mass, multiply the atomic mass of each element"],
    gone: ['molar mass of NaHCO3', 'does not correspond to any standard error',
           'The mole is the bridge between atomic/molecular scale']
  },

  {
    q: 'Q5', id: 'chem-5', expectLetter: 'B', noTable: true,
    stem: 'Under controlled oxidation conditions that prevent further oxidation of the initial carbonyl product, which functional group is formed from a primary alcohol?',
    explanation: [
      ['<p>Cannot be easily oxidized (no H on the carbon bearing OH)</p>',
       '<p>Resistant to these ordinary oxidation conditions (no H on the carbon bearing OH)</p>'],
      ['<p>One step of oxidation of a primary alcohol produces an aldehyde. A second oxidation step would yield a carboxylic acid.</p>',
       '<p>Under the controlled conditions described, oxidation of a primary alcohol stops at the aldehyde. Further ' +
       'oxidation would give a carboxylic acid, so the reagents and conditions chosen decide whether the aldehyde is ' +
       'isolated or oxidized further.</p>'],
      ['<p><strong>A. Ketone:</strong> Secondary alcohol -> ketone (one step, cannot be further oxidized).</p>',
       '<p><strong>A. Ketone:</strong> A ketone is the usual product of oxidizing a secondary alcohol. A primary ' +
       'alcohol produces an aldehyde when oxidation is stopped at the first carbonyl product. Ketones resist the mild ' +
       'oxidizing conditions used for this test; stronger conditions can cleave carbon-carbon bonds.</p>'],
      ['<p><strong>C. Carboxylic acid:</strong> A second oxidation step would yield a carboxylic acid.</p>',
       '<p><strong>C. Carboxylic acid:</strong> A carboxylic acid forms if the aldehyde is oxidized further. ' +
       'The conditions in the stem are chosen to prevent that further oxidation.</p>'],
      ["<p><strong>D. Ester:</strong> An ester (R-COO-R') is formed by a condensation reaction between a carboxylic acid and an alcohol, not by simple oxidation. This reaction is called esterification and requires an acid catalyst. Esters are responsible for many fruity and floral aromas in nature.</p>",
       "<p><strong>D. Ester:</strong> An ester (R-COO-R') is not formed by oxidation. Acid-catalyzed reaction of a " +
       'carboxylic acid with an alcohol is one common esterification route, not the only possible way to make an ' +
       'ester. Many small esters have fruity and floral aromas.</p>'],
      ["<p class='exp-key'>Bottom Line: Primary alcohol -> aldehyde -> carboxylic acid (two-step oxidation). Secondary alcohol -> ketone (one step, cannot be further oxidized). Tertiary alcohol -> resistant to oxidation.</p>",
       "<p class='exp-key'>Bottom Line: Controlled oxidation: primary alcohol → aldehyde; further oxidation → " +
       'carboxylic acid. Secondary alcohols usually give ketones. Tertiary alcohols resist these ordinary oxidation ' +
       'conditions.</p>']
    ],
    points: [
      'A primary alcohol can be oxidized to an aldehyde and then to a carboxylic acid.',
      'Reagents and conditions determine whether the aldehyde is isolated or oxidized further.',
      'Secondary alcohols usually give ketones; tertiary alcohols resist ordinary alcohol-oxidation conditions.'
    ],
    keepText: ['Primary alcohol (R-CH₂OH) -> Aldehyde (R-CHO) -> Carboxylic acid (R-COOH)'],
    gone: ['cannot be further oxidized', 'Cannot be easily oxidized',
           "Organic chemistry centers on carbon's ability to form four stable bonds"]
  },

  {
    q: 'Q6', id: 'chem-6', expectLetter: 'D',
    explanation: [
      ['<p>The halogens are found in Group VIIA (or Group 17 in modern IUPAC notation):</p>',
       '<p>The halogens are found in Group VIIA, which is Group 17 in modern IUPAC notation. Common halogens at room ' +
       'temperature:</p>'],
      ['<th>Symbol</th>', '<th>Elemental Form</th>'],
      ['<tr><td>Fluorine</td><td>F</td><td>Gas (pale yellow)</td></tr>',
       '<tr><td>Fluorine</td><td>F₂</td><td>Gas (pale yellow)</td></tr>'],
      ['<tr><td>Chlorine</td><td>Cl</td><td>Gas (green-yellow)</td></tr>',
       '<tr><td>Chlorine</td><td>Cl₂</td><td>Gas (green-yellow)</td></tr>'],
      ['<tr><td>Bromine</td><td>Br</td><td>Liquid (red-brown)</td></tr>',
       '<tr><td>Bromine</td><td>Br₂</td><td>Liquid (red-brown)</td></tr>'],
      // astatine's bulk state is predicted, not a measured classroom example
      ['<tr><td>Iodine</td><td>I</td><td>Solid (purple-black)</td></tr><tr><td>Astatine</td><td>At</td><td>Solid (radioactive)</td></tr>',
       '<tr><td>Iodine</td><td>I₂</td><td>Solid (purple-black)</td></tr>'],
      ['<p>Halogens have 7 valence electrons and tend to gain 1 electron to form -1 ions. They are highly reactive nonmetals. Reactivity decreases going down the group (F > Cl > Br > I).</p>',
       '<p>Group 17 also includes astatine and tennessine, which are radioactive. The common halogens have seven ' +
       'valence electrons and readily form -1 halide ions. Their oxidizing strength generally decreases from fluorine ' +
       'to iodine.</p>'],
      ['<p><strong>A. Group IA (1):</strong> Group IA (Group 1) contains the alkali metals: Li, Na, K, Rb, Cs, and Fr. These elements have 1 valence electron and are highly reactive metals that readily lose that electron to form +1 ions. They react vigorously with water to produce hydrogen gas and a strong base.</p>',
       '<p><strong>A. Group IA (1):</strong> Group 1 contains hydrogen and the alkali metals. The alkali metals, such ' +
       'as lithium and sodium, have one outer-shell electron and commonly form +1 ions. They react vigorously with ' +
       'water to produce hydrogen gas and a strong base.</p>'],
      ['<p><strong>C. Group VIA (16):</strong> Group VIA (Group 16) contains the chalcogens: O, S, Se, Te, and Po. These elements have 6 valence electrons and tend to gain 2 electrons to form -2 ions. Oxygen and sulfur are the most important members, both essential for biological processes.</p>',
       '<p><strong>C. Group VIA (16):</strong> Group VIA (Group 16) contains the chalcogens. Oxygen, sulfur, selenium, ' +
       'tellurium and polonium are examples, and Group 16 also includes livermorium. Several members have six valence ' +
       'electrons and can form -2 ions, but the group does not behave as a single uniform set of nonmetals. Oxygen and ' +
       'sulfur are the most important members biologically.</p>'],
      // the Bottom Line must not imply hydrogen is an alkali metal either
      ['Group IA = alkali metals (1 valence e⁻, lose 1).',
       'Group IA (Group 1) = hydrogen plus the alkali metals; the alkali metals have 1 valence e⁻ and lose it.']
    ],
    points: [
      'The halogens occupy Group 17, also called Group VIIA in older notation.',
      'Familiar halogens include fluorine, chlorine, bromine and iodine.',
      'These elements have seven valence electrons and commonly gain one electron to form halide ions.'
    ],
    keepText: ['Group VIIA = halogens', 'alkaline earth metals'],
    gone: ['<td>Astatine</td>', 'contains the alkali metals: Li, Na, K, Rb, Cs, and Fr',
           'contains the chalcogens: O, S, Se, Te, and Po', 'Reactivity decreases going down the group']
  },

  {
    q: 'Q7', id: 'chem-7', expectLetter: 'C',
    stemEdit: [['when dissolved in water, will produce a basic (alkaline) solution?',
                'when dissolved in water at 25°C, will produce a basic (alkaline) solution?']],
    explanation: [
      ['<tr><td>NaCl</td><td>HCl (strong)</td><td>NaOH (strong)</td><td>Neutral (7)</td></tr>',
       '<tr><td>NaCl</td><td>HCl (strong)</td><td>NaOH (strong)</td><td>Approximately neutral (about 7)</td></tr>'],
      ['<tr><td>KNO₃</td><td>HNO₃ (strong)</td><td>KOH (strong)</td><td>Neutral (7)</td></tr>',
       '<tr><td>KNO₃</td><td>HNO₃ (strong)</td><td>KOH (strong)</td><td>Approximately neutral (about 7)</td></tr>'],
      ['The acetate ion (CH₃COO⁻) acts as a base in water, accepting a proton to form CH₃COOH, producing OH⁻ ions.</p>',
       'The acetate ion (CH₃COO⁻) acts as a base in water, accepting a proton to form CH₃COOH, producing OH⁻ ions:</p>' +
       '<p>CH₃COO⁻ + H₂O ⇌ CH₃COOH + OH⁻</p>'],
      ['All nitrates and all Group IA salts are soluble and form neutral solutions when both parent acid and base are strong.</p>',
       'K⁺ and NO₃⁻ have negligible acid-base effects in water, so this solution is approximately neutral at 25°C.</p>']
    ],
    points: [
      "A dissolved salt's ions can act as acids, bases or spectators in water.",
      'Acetate accepts a proton from water, producing OH⁻ and making the solution basic.',
      'Ammonium instead donates a proton to water, making an NH₄Cl solution acidic.'
    ],
    keepText: ['weak acid</strong> (acetic acid)', 'Salt of weak acid + strong base = basic'],
    gone: ['All nitrates and all Group IA salts are soluble',
           '<td>Neutral (7)</td>', 'Blood pH is tightly regulated']
  },

  {
    q: 'Q8', id: 'chem-8', expectLetter: 'C',
    explanation: [
      ['<p>Despite containing carbon, CO₂ is classified as an <strong>inorganic compound</strong> because it lacks carbon-hydrogen (C-H) bonds and carbon-carbon (C-C) bonds.</p>',
       '<p>Carbon dioxide is conventionally classified as an <strong>inorganic carbon compound</strong>. Carbon ' +
       'monoxide, carbonates and bicarbonates are other familiar examples. Organic/inorganic classification is partly ' +
       'conventional; it cannot be decided solely by asking whether C-H or C-C bonds are present.</p>'],
      ['<th>Has C-H bonds?</th>', '<th>Compound type</th>'],
      ['<tr><td>Ethanol</td><td>Yes</td><td>Organic</td></tr><tr><td>Glucose</td><td>Yes</td><td>Organic</td></tr><tr><td><strong>CO₂</strong></td><td><strong>No</strong></td><td><strong>Inorganic</strong></td></tr><tr><td>Acetic acid</td><td>Yes</td><td>Organic</td></tr>',
       '<tr><td>Ethanol</td><td>Alcohol</td><td>Organic</td></tr>' +
       '<tr><td>Glucose</td><td>Carbohydrate</td><td>Organic</td></tr>' +
       '<tr><td><strong>CO₂</strong></td><td><strong>Simple carbon oxide</strong></td><td><strong>Inorganic</strong></td></tr>' +
       '<tr><td>Acetic acid</td><td>Carboxylic acid</td><td>Organic</td></tr>'],
      ['<p>Other inorganic carbon compounds include: carbonates (CaCO₃), bicarbonates (NaHCO₃), carbon monoxide (CO), and cyanides (HCN - debated).</p>',
       '<p>Other inorganic carbon compounds include carbonates (CaCO₃), bicarbonates (NaHCO₃) and carbon monoxide (CO).</p>'],
      ['serves as the primary energy source for cells', 'is an important fuel for many cells'],
      ["<p class='exp-key'>Bottom Line: Organic compounds contain carbon bonded to hydrogen (and often O, N, S, P). Simple carbon compounds like CO₂, CO, carbonates, and bicarbonates are considered inorganic despite containing carbon.</p>",
       "<p class='exp-key'>Bottom Line: CO₂, CO, carbonates and bicarbonates are conventionally inorganic. Many carbon " +
       'compounds are organic, but the presence or absence of a C-H bond is not a universal classification rule.</p>']
    ],
    points: [
      'Carbon dioxide is conventionally classified as inorganic despite containing carbon.',
      'Carbon monoxide, carbonates and bicarbonates are other inorganic carbon compounds.',
      'A C-H bond is common in organic compounds but is not a universal requirement for that classification.'
    ],
    // the useful ethanol and acetic acid descriptions stay
    keepText: ['the alcohol found in alcoholic beverages', 'gives vinegar its sour taste'],
    gone: ['cyanides (HCN - debated)', 'Has C-H bonds?', 'primary energy source for cells',
           'because it lacks carbon-hydrogen (C-H) bonds']
  },

  {
    q: 'Q9', id: 'chem-9', expectLetter: 'C',
    explanation: [
      ['<tr><td>Decrease pressure</td><td>LEFT (more moles of gas)</td><td>3 moles reactant gas vs 2 moles product gas</td></tr>',
       '<tr><td>Decrease pressure by expanding the vessel at constant temperature</td><td>LEFT (more moles of gas)</td>' +
       '<td>3 moles reactant gas vs 2 moles product gas</td></tr>'],
      ['<tr><td>Add catalyst</td><td>No shift</td><td>Catalyst speeds both directions equally</td></tr>',
       '<tr><td>Add catalyst</td><td>No shift</td><td>Speeds up approach to equilibrium without changing K or the ' +
       'equilibrium composition</td></tr>'],
      ['<p><strong>B. Decreasing the pressure:</strong> Decreasing pressure favors the side with more moles of gas. In this reaction, there are 3 moles of gas on the left (2 SO2 + 1 O2) but only 2 moles on the right (2 SO3). So decreasing pressure shifts equilibrium LEFT, toward the side with more gas molecules.</p>',
       '<p><strong>B. Decreasing the pressure:</strong> Here the pressure is decreased by expanding the vessel at ' +
       'constant temperature, which favors the side with more moles of gas. There are 3 moles of gas on the left ' +
       '(2 SO₂ + 1 O₂) but only 2 on the right (2 SO₃), so expanding the vessel shifts equilibrium LEFT. A change in ' +
       'total pressure caused by adding or removing an inert gas is not automatically equivalent.</p>'],
      ['<p><strong>D. Adding a catalyst:</strong> A catalyst speeds up both the forward and reverse reactions equally by lowering the activation energy. It helps the system reach equilibrium faster but does not change the position of equilibrium or the value of the equilibrium constant K.</p>',
       '<p><strong>D. Adding a catalyst:</strong> A catalyst speeds up the approach to equilibrium by providing a ' +
       'lower-activation-energy pathway, without changing K or the equilibrium composition at the same temperature.</p>'],
      ["<p class='exp-key'>Bottom Line: Removing a product always shifts equilibrium toward products (right). Adding a reactant also shifts right. A catalyst does NOT shift equilibrium - it only helps the system reach equilibrium faster.</p>",
       "<p class='exp-key'>Bottom Line: For this gas equilibrium, removing SO₃ favors further SO₃ formation. " +
       'Expanding the vessel favors the side with more gas particles. A catalyst helps equilibrium be reached faster ' +
       'but does not change its position.</p>']
    ],
    points: [
      'Removing SO₃ from this equilibrium favors further formation of SO₃.',
      'Expanding this gas mixture at constant temperature favors the side with more gas particles.',
      'A catalyst changes the speed of reaching equilibrium, not its position at the same temperature.'
    ],
    keepText: ["Le Chatelier's principle states", 'heat is a "product"'],
    gone: ['Removing a product always shifts equilibrium toward products',
           'Catalyst speeds both directions equally', 'reactions equally by lowering the activation energy']
  },

  {
    q: 'Q10', id: 'chem-10', expectLetter: 'B', noTable: true,
    points: [
      'Balance a neutralization equation before comparing amounts of acid and base.',
      'HCl and NaOH react in a 1:1 mole ratio, so 0.400 mol HCl needs 0.400 mol NaOH.',
      'At 4 mol/L, 0.400 mol NaOH occupies 0.100 L, or 100 mL.'
    ],
    // the review changes nothing else in this item
    keepText: ['= 0.400 mol', '0.400 mol / 4M = 0.100 L = <strong>100 mL</strong>',
               'Bottom Line: For neutralization, moles of acid = moles of base',
               '<strong>A. 50 mL:</strong>', '<strong>C. 200 mL:</strong>', '<strong>D. 400 mL:</strong>'],
    gone: ['The mole is the bridge between atomic/molecular scale']
  }
];
