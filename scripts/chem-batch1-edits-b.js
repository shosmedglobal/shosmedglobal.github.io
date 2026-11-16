/**
 * Chemistry review batch 1, items Q11-Q20 (chem-11 .. chem-21).
 * Spec shape is documented in scripts/chem-batch1-edits-a.js.
 *
 * Q13 keeps its individual five-point block; only its point 3 is repaired, so it
 * carries expectPoints: 5 rather than a three-point replacement.
 */
'use strict';

module.exports = [
  {
    q: 'Q11', id: 'chem-11', expectLetter: 'C',
    explanation: [
      ["<p class='exp-key'>Bottom Line: Hund's rule maximizes total spin, which minimizes electron-electron repulsion by keeping electrons in separate orbitals as long as possible. This is why nitrogen's half-filled 2p subshell is exceptionally stable.</p>",
       "<p class='exp-key'>Bottom Line: In the ground state, electrons occupy equal-energy orbitals singly with " +
       "parallel spins before pairing. Nitrogen's three 2p electrons therefore occupy three different orbitals.</p>"]
    ],
    points: [
      "Hund's rule concerns electrons occupying orbitals of equal energy in the ground state.",
      'Electrons occupy those orbitals singly with parallel spins before pairing.',
      "Nitrogen's 2p³ arrangement therefore has three unpaired electrons."
    ],
    keepText: ['rule of maximum multiplicity', '<strong>Nitrogen (Z=7): 1s² 2s² 2p³</strong>',
               'Aufbau principle', 'Pauli exclusion principle'],
    gone: ["Hund's rule maximizes total spin, which minimizes electron-electron repulsion",
           'Atomic structure determines chemical behavior']
  },

  {
    q: 'Q12', id: 'chem-12', expectLetter: 'C',
    stem: 'What is the Stock-system name for Fe₂O₃?',
    explanation: [
      ['<th>IUPAC Name</th>', '<th>Stock-system name</th>'],
      // the old paragraph wrongly restricted prefix names to nonmetal/nonmetal compounds
      ['<p>For transition metals with variable oxidation states, the Stock system uses Roman numerals in parentheses. The prefix system (diiron trioxide) is used for covalent (nonmetal-nonmetal) compounds.</p>',
       "<p>The Stock system uses a Roman numeral to specify the metal's oxidation state. Fe₂O₃ therefore has the Stock " +
       'name iron(III) oxide. Compositional nomenclature can instead describe atom ratios, giving diiron trioxide.</p>'],
      ['<p><strong>A. Iron oxide:</strong> "Iron oxide" is a common (not IUPAC) name that is ambiguous because iron can form multiple oxides: FeO, Fe<sub>2</sub>O<sub>3</sub>, and Fe<sub>3</sub>O<sub>4</sub>. The IUPAC Stock system requires a Roman numeral to specify the oxidation state of the metal when it has variable oxidation states.</p>',
       '<p><strong>A. Iron oxide:</strong> Iron oxide does not identify which oxide is meant. The Stock name ' +
       'distinguishes iron(II) oxide, FeO, from iron(III) oxide, Fe₂O₃.</p>'],
      ['<p><strong>D. Diiron trioxide:</strong> The prefix system (diiron trioxide) is used for covalent (nonmetal-nonmetal) compounds.</p>',
       '<p><strong>D. Diiron trioxide:</strong> Diiron trioxide is a valid compositional name describing the 2:3 atom ' +
       "ratio. It is not the Stock-system name requested, which specifies iron's +3 oxidation state as " +
       'iron(III) oxide.</p>'],
      ["<p class='exp-key'>Bottom Line: For ionic compounds with metals that have multiple oxidation states, use the Stock system: metal name + (Roman numeral) + nonmetal root + -ide. For covalent compounds between nonmetals, use Greek prefixes (mono-, di-, tri-, etc.).</p>",
       "<p class='exp-key'>Bottom Line: In Stock nomenclature, the Roman numeral gives oxidation state, not the number " +
       'of atoms. Fe₂O₃ contains iron in oxidation state +3, so its Stock name is iron(III) oxide.</p>']
    ],
    points: [
      'The sum of oxidation numbers in a neutral compound is zero.',
      'In Fe₂O₃, three oxygens contribute -6, so each of the two irons has oxidation state +3.',
      'Stock nomenclature expresses that oxidation state as iron(III), giving iron(III) oxide.'
    ],
    // option B's arithmetic explanation and the oxidation-number working are retained
    keepText: ['<strong>B. Iron(II) oxide:</strong> Iron(II) oxide is the IUPAC name for FeO',
               'x = +3, so iron is in the +3 oxidation state', '<td>Iron(II,III) oxide</td>'],
    gone: ['<th>IUPAC Name</th>', 'is used for covalent (nonmetal-nonmetal) compounds',
           'use Greek prefixes (mono-, di-, tri-, etc.)', 'Chemical structure determines chemical properties']
  },

  {
    q: 'Q13', id: 'chem-13', expectLetter: 'B', expectPoints: 5,
    stem: 'For a fixed amount of ideal gas at constant temperature, what happens to the pressure if the volume is halved?',
    explanation: [
      // point 3 only: total wall-collision frequency need not exactly double for
      // every change in container geometry
      ['<li>The molecular reason is collision frequency: the same number of molecules confined in half the space strike the walls twice as often.</li>',
       '<li>At the same temperature, molecular speeds are unchanged on average. Compression increases collisions with ' +
       'each unit area of the container wall, increasing pressure.</li>']
    ],
    keepText: ["<li>Boyle's law: at constant temperature and amount of gas, pressure and volume are inversely proportional",
               '<li>Halving the volume therefore doubles the pressure.</li>',
               '<li>Because the relationship is inverse, a P-V graph is a curve (hyperbola), not a straight line.</li>',
               '<li>The law holds only while temperature and amount of gas are held constant',
               'P₂ = 2P₁'],
    gone: ['strike the walls twice as often']
  },

  {
    q: 'Q14', id: 'chem-14', expectLetter: 'B',
    stem: 'A membrane permeable to water but not to Na⁺ or Cl⁻ separates 0.5 M and 0.1 M NaCl solutions at the same temperature and initially equal hydrostatic pressure. In which direction is the initial NET movement of water?',
    explanation: [
      ['<p>Osmosis is the movement of water across a semipermeable membrane from a region of <strong>lower solute concentration</strong> (higher water concentration) to a region of <strong>higher solute concentration</strong> (lower water concentration).</p>',
       '<p>Water crosses this membrane in both directions. With equal initial hydrostatic pressures, the initial net ' +
       'movement is from the <strong>0.1 M solution</strong> toward the <strong>0.5 M solution</strong>. The ' +
       'concentration comparison is valid here because the same nonpenetrating solute is present on both sides.</p>' +
       '<p>Initial comparison at equal hydrostatic pressure:</p>'],
      ['<td>Water leaves</td>', '<td>Net water leaves</td>'],
      ['<td>Water enters</td>', '<td>Net water enters</td>'],
      ["<p>Osmotic pressure can be calculated using: Pi = iMRT, where i is the van't Hoff factor (for NaCl, i = 2 because it dissociates into Na⁺ and Cl⁻).</p>",
       '<p>For an ideal dilute solution, osmotic pressure is approximated by Π = iMRT, where i is the ' +
       "van't Hoff factor. For ideally dissociated NaCl, i ≈ 2, because each formula unit gives Na⁺ and Cl⁻. " +
       'At 0.5 M the effective value is somewhat below 2, so this is an approximation rather than an exact figure. ' +
       'No numerical osmotic-pressure calculation is needed here.</p>'],
      ['<p><strong>A. From the 0.5 M solution to the 0.1 M solution:</strong> This describes water moving from the more concentrated to the less concentrated solution, which is the reverse of osmosis. Water naturally moves to dilute the more concentrated solution, not to concentrate the dilute one. Think of it as water flowing "downhill" in terms of its own concentration gradient.</p>',
       '<p><strong>A. From the 0.5 M solution to the 0.1 M solution:</strong> This is opposite to the initial net ' +
       'movement under the stated conditions. The more concentrated NaCl solution has the greater osmotic tendency to ' +
       'draw water across this membrane.</p>'],
      ['<p><strong>C. Equally in both directions:</strong> Equal water movement in both directions would only occur if the two solutions had the same solute concentration (isotonic). With different concentrations, there is always a net flow of water toward the hypertonic side until equilibrium is reached.</p>',
       '<p><strong>C. Equally in both directions:</strong> Water crosses both ways, but the initial rates are unequal, ' +
       'so there is a net transfer toward 0.5 M NaCl. Later, a hydrostatic-pressure difference can balance the osmotic ' +
       'effect even if the solute concentrations remain unequal.</p>'],
      ['<p><strong>D. Water will not move across the membrane:</strong> A semipermeable membrane allows water to pass but blocks solute. Whenever a concentration gradient exists across such a membrane, osmotic pressure drives water from the dilute to the concentrated side. Only when both sides are isotonic is there no net water movement.</p>',
       '<p><strong>D. Water will not move across the membrane:</strong> The membrane allows water to cross. At the ' +
       'initially equal hydrostatic pressures, the concentration difference produces a net movement toward the more ' +
       'concentrated solution.</p>'],
      ["<p class='exp-key'>Bottom Line: Water moves from hypotonic to hypertonic by osmosis. This is crucial in biology: red blood cells in hypotonic solution swell and lyse; in hypertonic solution they shrink (crenation). IV fluids must be isotonic (0.9% NaCl).</p>",
       "<p class='exp-key'>Bottom Line: With a nonpenetrating solute and equal initial hydrostatic pressures, water " +
       'moves net toward the more concentrated solution. Net movement stops when the opposing effects balance; the ' +
       'concentrations need not become equal.</p>']
    ],
    points: [
      'Osmosis involves water crossing a membrane selectively permeable to water.',
      'With equal initial hydrostatic pressures, net water moves toward the more concentrated nonpenetrating solute.',
      'An opposing pressure difference can stop net osmosis before the solute concentrations become equal.'
    ],
    keepText: ['<td>Hypotonic (0.1 M)</td>', '<td>Hypertonic (0.5 M)</td>'],
    gone: ['IV fluids must be isotonic (0.9% NaCl)', 'i = 2 because it dissociates',
           'there is always a net flow of water toward the hypertonic side until equilibrium is reached',
           'Colligative properties (boiling point elevation, freezing point depression, osmotic pressure) depend on']
  },

  {
    q: 'Q15', id: 'chem-15', expectLetter: 'C',
    stem: 'Assuming volumes are additive, what volume of water must be added to 100 mL of a 2 M solution to prepare a 0.5 M solution?',
    explanation: [
      ['<p>Note: The question asks for water <em>added</em>, not total volume. This is a common source of error.</p>',
       '<p>Note: The question asks for water <em>added</em>, not total volume. This is a common source of error. ' +
       'In laboratory preparation, add water until the total solution volume reaches 400 mL; solution and water ' +
       'volumes are not always exactly additive.</p>']
    ],
    points: [
      'Dilution conserves the amount of dissolved solute: M₁V₁ = M₂V₂.',
      'Here the final solution volume must be 400 mL.',
      'Under the volume-additivity assumption, the water added is 400 - 100 = 300 mL.'
    ],
    keepText: ['400 - 100 = <strong>300 mL</strong>', 'Bottom Line: The dilution equation M₁V₁ = M₂V₂',
               '<td>Molarity (M)</td>'],
    gone: ['Osmosis drives water movement from low to high solute concentration across semipermeable membranes']
  },

  {
    q: 'Q16', id: 'chem-16', expectLetter: 'C',
    stem: 'For the exothermic gas reaction 2SO₂(g) + O₂(g) ⇌ 2SO₃(g), which change speeds up the approach to equilibrium without changing the equilibrium composition? Assume pressure changes are made by changing the vessel volume.',
    explanation: [
      ["<table class='exp-table'><tr><th>Factor</th><th>Effect on Rate</th><th>Effect on Equilibrium</th></tr><tr><td>Temperature increase</td><td>Increases rate</td><td>Shifts equilibrium (changes K)</td></tr><tr><td>Concentration increase</td><td>Increases rate</td><td>Shifts equilibrium (Q changes)</td></tr><tr><td><strong>Catalyst</strong></td><td><strong>Increases rate</strong></td><td><strong>No change</strong></td></tr><tr><td>Pressure increase</td><td>Increases rate (gases)</td><td>May shift equilibrium</td></tr></table>",
       "<table class='exp-table'><tr><th>Change</th><th>Equilibrium effect for this reaction</th></tr>" +
       '<tr><td>Increase temperature</td><td>Favors reactants; K changes</td></tr>' +
       '<tr><td>Add a reactant at fixed temperature and volume</td><td>Favors products; K is unchanged</td></tr>' +
       '<tr><td><strong>Add a catalyst at unchanged temperature</strong></td><td><strong>No change in equilibrium ' +
       'composition or K</strong></td></tr>' +
       '<tr><td>Compress the gases at fixed temperature</td><td>Favors products, the side with fewer gas particles</td></tr></table>'],
      ['<p>According to the Guldberg-Waage law of mass action, the rate of reaction is proportional to the product of concentrations of reactants raised to their stoichiometric powers: rate = k[A]a[B]b.</p>',
       '<p>Reaction rates and equilibrium are different questions. An overall rate law is determined experimentally; ' +
       'its concentration exponents cannot generally be read from the balanced equation. Stoichiometric coefficients ' +
       'determine the rate-law powers only for an appropriate elementary reaction step.</p>'],
      ['<p><strong>A. Increasing the temperature:</strong> Increasing temperature does increase reaction rate (molecules have more kinetic energy and more frequent successful collisions), but it also changes the equilibrium constant K. For exothermic reactions, higher temperature shifts equilibrium toward reactants; for endothermic, toward products.</p>',
       '<p><strong>A. Increasing the temperature:</strong> Increasing temperature changes K. Because this forward ' +
       'reaction is exothermic, the equilibrium shifts toward reactants, so the equilibrium composition is not ' +
       'preserved.</p>'],
      ['<p><strong>B. Increasing the concentration of reactants:</strong> Increasing reactant concentration does increase the reaction rate (more molecules means more collisions), but it also disturbs the equilibrium position -- the system shifts toward products to re-establish equilibrium. The equilibrium constant K itself does not change, but the position of equilibrium shifts.</p>',
       '<p><strong>B. Increasing the concentration of reactants:</strong> Adding a reactant changes the reaction ' +
       'quotient and causes this mixture to form more product as equilibrium is restored. It does not change K at ' +
       'fixed temperature, but it does change the equilibrium composition.</p>'],
      ['<p><strong>D. Increasing the pressure:</strong> Increasing pressure (for gaseous reactions) increases the rate by bringing molecules closer together. However, it also shifts the equilibrium position toward the side with fewer moles of gas, according to Le Chatelier\'s principle.</p>',
       '<p><strong>D. Increasing the pressure:</strong> Compressing this mixture raises its partial pressures and ' +
       'favors SO₃ formation because the product side has fewer gas particles. Thus the equilibrium composition ' +
       'changes. For other gas reactions with equal gas coefficients on both sides, compression need not shift ' +
       'equilibrium.</p>'],
      ["<p class='exp-key'>Bottom Line: A catalyst speeds up both the forward and reverse reactions equally by lowering the activation energy. It helps the system reach equilibrium faster but does not change where the equilibrium lies. Enzymes are biological catalysts.</p>",
       "<p class='exp-key'>Bottom Line: A catalyst supplies a faster reaction pathway while leaving the equilibrium " +
       'constant and final equilibrium composition unchanged at the same temperature.</p>']
    ],
    points: [
      'Catalysts alter the reaction pathway and help equilibrium be reached faster.',
      'At the same temperature, a catalyst does not change K or the final equilibrium composition.',
      "An overall reaction's rate-law powers generally require experimental determination, not just its balanced equation."
    ],
    // the catalyst mechanism paragraph is retained
    keepText: ['providing an alternative pathway with a <strong>lower activation energy</strong>'],
    gone: ['Guldberg-Waage law of mass action', 'rate = k[A]a[B]b', '<th>Effect on Rate</th>',
           'forward and reverse reactions equally by lowering the activation energy',
           "Le Chatelier's principle: a system at equilibrium will shift to counteract any imposed change"]
  },

  {
    q: 'Q17', id: 'chem-17', expectLetter: 'A',
    explanation: [
      ['Spectator ions appear on both sides of the net ionic equation and can be removed.</p>',
       'Spectator ions appear unchanged on both sides of the complete ionic equation and are cancelled when writing ' +
       'the net ionic equation.</p>']
    ],
    points: [
      'Oxidation is electron loss; reduction is electron gain.',
      'The reducing agent donates electrons and is itself oxidized.',
      'Here Zn loses two electrons, while Cu²⁺ gains them; sulfate is a spectator ion.'
    ],
    keepText: ['<strong>Memory aid (OIL RIG):</strong>', 'Zn -> Zn²⁺ + 2e⁻',
               'Bottom Line: The activity series predicts which metals will displace others'],
    gone: ['appear on both sides of the net ionic equation and can be removed',
           'Standard electrode potentials (E°) predict spontaneity']
  },

  {
    q: 'Q18', id: 'chem-18', expectLetter: 'B',
    explanation: [
      ['<tr><td>Maximum capacity</td><td>When [acid] = [conjugate base] (pH = pKₐ)</td></tr>',
       '<tr><td>Greatest resistance to small additions</td><td>For a given total buffer concentration, resistance to ' +
       'small acid/base additions is greatest near equal acid and conjugate-base amounts (pH = pKₐ)</td></tr>'],
      ['<p><strong>C. 7.0:</strong> pH 7.0 is the pH of pure water, not a buffer. A buffer made from a weak acid (acetic acid) and its conjugate base will have a pH near the pKa of the acid. Since acetic acid\'s pKa is 4.76, the buffer is acidic, not neutral.</p>',
       '<p><strong>C. 7.0:</strong> Buffers can have pH 7 if an appropriate acid-base pair is chosen. This particular ' +
       "pair works best near acetic acid's pKa of 4.76; pH 7 is well outside its usual effective range.</p>"],
      // pKa + pKb = 14 holds at 25 C, and the stem never specified equal concentrations
      ['pKa + pKb = 14 for a conjugate acid-base pair (14 - 4.76 = 9.24).',
       'pKa + pKb = 14 for a conjugate acid-base pair at 25°C (14 - 4.76 = 9.24).'],
      ['and its conjugate base has pH = pKa, not pKb.</p>',
       'and its conjugate base has pH = pKa, not pKb. Equal concentrations were not specified in this stem; they ' +
       'describe the optimal ratio, not the only mixture that can act as a buffer.</p>'],
      ["<p class='exp-key'>Bottom Line: Buffers maintain stable pH by containing both a proton donor (weak acid) and a proton acceptor (conjugate base). Blood pH (7.4) is maintained by the carbonic acid/bicarbonate buffer system (H₂CO₃/HCO₃⁻).</p>",
       "<p class='exp-key'>Bottom Line: Choose a weak acid/conjugate-base pair with a pKₐ near the target pH. For " +
       'acetate, the useful range is roughly pH 3.76-5.76, and greater total buffer concentration generally gives ' +
       'greater capacity.</p>']
    ],
    points: [
      'A weak acid and its conjugate base can buffer added acid or base.',
      'For acetate, buffering is most effective near pKₐ = 4.76, with a useful range roughly one pH unit either side.',
      'Buffer capacity depends on the amounts of both components, not just the pH.'
    ],
    keepText: ['<strong>Henderson-Hasselbalch equation:</strong>', '<td>Effective range</td>'],
    gone: ['<td>Maximum capacity</td>', 'pH 7.0 is the pH of pure water, not a buffer',
           'Blood pH is tightly regulated']
  },

  {
    q: 'Q19', id: 'chem-20', expectLetter: 'B',
    stem: 'At room temperature and away from UV light, which reagent provides a visible test to distinguish a simple alkene from an alkane?',
    explanation: [
      ['<tr><td>Alkane</td><td>CₙH₂ₙ₊₂</td><td>No reaction (at room temp)</td><td>Stays orange-brown</td></tr>',
       '<tr><td>Acyclic alkane</td><td>CₙH₂ₙ₊₂</td><td>No rapid reaction under these test conditions</td>' +
       '<td>Stays orange-brown</td></tr>'],
      ['<tr><td><strong>Alkene</strong></td><td>CₙH₂ₙ</td>',
       '<tr><td><strong>Acyclic monoalkene</strong></td><td>CₙH₂ₙ</td>'],
      ['<tr><td>Alkyne</td><td>CₙH₂ₙ₋₂</td>', '<tr><td>Acyclic monoalkyne</td><td>CₙH₂ₙ₋₂</td>'],
      // the dibromoethane equation is wrong as the sole product of a reaction run in water
      ["<div class='exp-diagram'><p><strong>Reaction:</strong></p><p>CH₂=CH₂ + Br₂ -> CH₂Br-CH₂Br (1,2-dibromoethane)</p><p>This is an electrophilic addition reaction.</p></div>",
       "<div class='exp-diagram'><p><strong>What the test observes:</strong></p><p>The alkene consumes bromine by " +
       'addition at its C=C bond, removing the orange-brown color. In water, bromohydrin products can form; in a ' +
       'nonaqueous, non-nucleophilic solvent, a vicinal dibromide is the usual product. The test here depends on ' +
       'decolorization, not identification of one specific product.</p></div>'],
      ['It cannot serve as a distinguishing reagent for any organic functional group test.</p>',
       'Water alone does not give a distinctive reaction that separates these two simple hydrocarbons under the test ' +
       'conditions.</p>'],
      ["<p class='exp-key'>Bottom Line: Alkenes undergo addition reactions (Br₂, HBr, H₂O, H₂) due to the electron-rich π bond. Alkanes undergo substitution reactions (halogenation) only under UV light or high temperature. This difference in reactivity is the basis for distinguishing them.</p>",
       "<p class='exp-key'>Bottom Line: A simple alkene rapidly decolorizes bromine water by addition at C=C. A simple " +
       'alkane does not under the same conditions without radical initiation. Other reactive compounds can also ' +
       'decolorize bromine, so this is not a universal identification test for every unknown organic compound.</p>']
    ],
    points: [
      "An alkene's C=C bond can react by addition with bromine.",
      'Consumption of bromine removes its orange-brown color.',
      'A simple alkane does not rapidly decolorize bromine water under the same conditions away from UV light.'
    ],
    keepText: ['classic test for unsaturation', '<strong>Decolorizes</strong>'],
    gone: ['CH₂Br-CH₂Br (1,2-dibromoethane)', 'No reaction (at room temp)',
           'any organic functional group test', "Organic chemistry centers on carbon's ability"]
  },

  {
    q: 'Q20', id: 'chem-21', expectLetter: 'B',
    options: [[3, "Addition preserves benzene's aromatic pi system"]],
    explanation: [
      ['<p>Benzene\'s six pi electrons are delocalized in a ring, giving it exceptional stability (resonance energy ~150 kJ/mol). Addition reactions would destroy this aromatic system, making them energetically unfavorable.</p>',
       "<p>Benzene's aromatic pi system stabilizes the ring. Electrophilic substitution temporarily disrupts this " +
       'system, but loss of H⁺ restores aromaticity in the product. Addition across the ring would remove aromaticity ' +
       'from that product, so ordinary alkene-like addition is not benzene\'s characteristic reaction.</p>'],
      ["<table class='exp-table'><tr><th>Reaction Type</th><th>Aromatic Ring After Reaction</th><th>Favorable?</th></tr><tr><td><strong>Substitution</strong></td><td>Preserved (still aromatic)</td><td><strong>Yes</strong></td></tr><tr><td>Addition</td><td>Destroyed (loses aromaticity)</td><td>No (high energy cost)</td></tr></table>",
       "<table class='exp-table'><tr><th>Reaction type</th><th>Aromaticity in the final product</th></tr>" +
       '<tr><td><strong>Substitution</strong></td><td><strong>Restored</strong></td></tr>' +
       '<tr><td>Addition</td><td>Lost</td></tr></table>'],
      ['<p><strong>C. Benzene is sterically hindered and cannot undergo addition:</strong> Benzene is actually a flat, planar molecule with no steric hindrance. It can undergo addition reactions under forcing conditions (e.g., catalytic hydrogenation at high pressure gives cyclohexane). It simply prefers substitution because addition would destroy the thermodynamically favorable aromatic ring.</p>',
       '<p><strong>C. Benzene is sterically hindered and cannot undergo addition:</strong> Benzene is a small planar ' +
       'molecule, so steric crowding does not explain its characteristic reactivity. It can undergo addition, such as ' +
       'catalytic hydrogenation, under suitable conditions.</p>'],
      ['<p><strong>D. Addition products of benzene are thermodynamically more stable:</strong> This is the opposite of the truth. The aromatic system of benzene is exceptionally stable due to the delocalization of six pi electrons across the ring. Addition products (like cyclohexadiene) lack this aromatic stabilization and are therefore less stable, not more.</p>',
       "<p><strong>D. Addition preserves benzene's aromatic pi system:</strong> Addition to the aromatic ring disrupts " +
       'its continuous pi system. Electrophilic aromatic substitution instead replaces a ring hydrogen and restores ' +
       'aromaticity after the intermediate forms.</p>']
    ],
    points: [
      'Benzene has a stabilized aromatic system of six pi electrons.',
      'Electrophilic aromatic substitution replaces a ring hydrogen and restores aromaticity in the product.',
      'Benzene can undergo addition under suitable conditions, but ordinary alkene-like addition is not its characteristic reaction.'
    ],
    // the reaction examples and the Huckel-rule Bottom Line are retained
    keepText: ['Halogenation: C₆H₆ + Br₂ (FeBr₃) -> C₆H₅Br + HBr',
               "Bottom Line: Aromaticity (Huckel's rule: 4n+2 pi electrons"],
    gone: ['Addition products of benzene are thermodynamically more stable:</strong> This is the opposite',
           'No (high energy cost)', 'making them energetically unfavorable',
           'Conservation laws (mass, energy, charge) govern all chemical reactions']
  }
];
