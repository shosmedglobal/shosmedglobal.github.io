/**
 * Chemistry review batch 1, items Q41-Q50 (chem-42 .. chem-51).
 * Spec shape is documented in scripts/chem-batch1-edits-a.js.
 */
'use strict';

module.exports = [
  {
    q: 'Q41', id: 'chem-42', expectLetter: 'B',
    stem: 'What happens when the concentration of a dissolved product is increased at constant temperature and volume, with the other concentrations initially unchanged? Assume the mixture was initially at equilibrium.',
    explanation: [
      ["<p>According to Le Chatelier's principle, adding product shifts equilibrium to consume it, moving toward reactants.</p>",
       "<p>According to Le Chatelier's principle, adding product shifts equilibrium to consume it, moving toward " +
       'reactants.</p><p>For species whose concentrations appear in the equilibrium expression:</p>'],
      ['<p><strong>D. Nothing happens; the system is already at equilibrium:</strong> Adding product disrupts the equilibrium -- the system is no longer at equilibrium because Q is now greater than K. The system must respond by shifting left (reverse reaction) until Q = K is restored. A system at equilibrium will always respond to concentration changes.</p>',
       '<p><strong>D. Nothing happens; the system is already at equilibrium:</strong> Adding product disrupts the ' +
       'equilibrium: the system is no longer at equilibrium because Q is now greater than K. The system responds by ' +
       'net reverse reaction until Q = K is restored.</p>'],
      ["<p class='exp-key'>Bottom Line: Le Chatelier's principle: a system at equilibrium responds to a stress by shifting to partially counteract it. Changes in concentration or pressure shift the position but do NOT change K. Only temperature changes K.</p>",
       "<p class='exp-key'>Bottom Line: Increasing the concentration of a product that appears in the equilibrium " +
       'expression raises Q above K, so net reverse reaction occurs until equilibrium is restored. At fixed ' +
       'temperature, K does not change.</p>']
    ],
    points: [
      'At equilibrium, the reaction quotient Q equals the equilibrium constant K.',
      'Increasing a product concentration in the equilibrium expression raises Q, favoring net reverse reaction.',
      'At fixed temperature, the concentrations adjust while K remains unchanged.'
    ],
    keepText: ['<td>Add product</td>', 'The equilibrium constant K is determined only by temperature'],
    gone: ['A system at equilibrium will always respond to concentration changes',
           "Le Chatelier's principle: a system at equilibrium will shift to counteract any imposed change"]
  },

  {
    q: 'Q42', id: 'chem-43', expectLetter: 'C',
    explanation: [
      ['<p><strong>A. A substance that produces OH⁻ ions in water:</strong> This is the Arrhenius definition of a base, which is more limited than Bronsted-Lowry. The Arrhenius model only works in aqueous solutions, while the Bronsted-Lowry model applies to any solvent. For example, NH3 is a Bronsted-Lowry base (accepts H+) but does not directly produce OH-.</p>',
       '<p><strong>A. A substance that produces OH⁻ ions in water:</strong> Producing or increasing OH⁻ in water ' +
       'describes an Arrhenius base. Br&oslash;nsted-Lowry instead defines a base by proton acceptance. For example, ' +
       'NH₃ accepts H⁺ from water to form NH₄⁺ and OH⁻.</p>']
    ],
    points: [
      'A Br&oslash;nsted-Lowry acid donates a proton; a base accepts one.',
      'NH₃ acts as a base when it accepts H⁺ to form NH₄⁺.',
      'Conjugate acid-base partners differ by one proton.'
    ],
    keepText: ['Bottom Line: Br&oslash;nsted-Lowry theory works in non-aqueous solvents too',
               '<td>Electron pair acceptor</td>'],
    gone: ['but does not directly produce OH-', 'Blood pH is tightly regulated']
  },

  {
    q: 'Q43', id: 'chem-44', expectLetter: 'C',
    explanation: [
      ['<p>[H⁺] = 0.001 M = 10⁻³ M</p><p>pH = -log[H⁺] = -log(10⁻³) = <strong>3</strong></p>',
       '<p>[H⁺] ≈ 0.001 M = 10⁻³ M, because water\'s own contribution is negligible here</p>' +
       '<p>pH ≈ -log₁₀[H⁺] = -log₁₀(10⁻³) = <strong>3</strong></p>'],
      ["</div><table class='exp-table'><tr><th>[H⁺]</th><th>pH</th><th>Character</th></tr>",
       "</div><p>At 25°C:</p><table class='exp-table'><tr><th>[H⁺]</th><th>pH</th><th>Character</th></tr>"],
      ["<p class='exp-key'>Bottom Line: For strong acids, [H⁺] = acid concentration (full dissociation). For weak acids, use Ka to calculate [H⁺]. pH + pOH = 14 at 25°C.</p>",
       "<p class='exp-key'>Bottom Line: For a dilute strong monoprotic acid such as HCl, [H⁺] is approximately the " +
       'acid concentration when water\'s own contribution is negligible. Then pH ≈ -log₁₀[H⁺]. At 25°C, ' +
       'pH + pOH = 14.</p>']
    ],
    points: [
      'Dilute HCl is treated as fully dissociated into hydrogen and chloride ions.',
      'For this solution, [H⁺] ≈ 10⁻³ mol/L, so pH ≈ 3.',
      'A tenfold increase in hydrogen ion concentration lowers pH by one unit.'
    ],
    keepText: ['HCl is a strong acid: HCl → H⁺ + Cl⁻ (100% dissociation)', '<td>Strongly acidic</td>'],
    gone: ['For strong acids, [H⁺] = acid concentration (full dissociation)',
           'pH = -log[H⁺] = -log(10⁻³)', 'Blood pH is tightly regulated']
  },

  {
    q: 'Q44', id: 'chem-45', expectLetter: 'B',
    stem: 'At 25°C, what is the pH at the equivalence point when aqueous HCl is titrated with NaOH? Assume ideal dilute-solution behavior.',
    explanation: [
      ['<p>At the equivalence point, all acid has been neutralized by the base. For strong acid + strong base, the resulting salt (e.g., NaCl) does not hydrolyze, so pH = 7.</p>',
       '<p>At the equivalence point, stoichiometrically matching amounts of acid and base have reacted. For a strong ' +
       'acid and a strong base, the resulting salt (here NaCl) does not hydrolyze appreciably, so in this ideal ' +
       'dilute model the pH is 7.</p><p>At 25°C:</p>'],
      ['<p><strong>D. Depends on the initial concentration:</strong> The equivalence point pH for strong acid-strong base titrations is always 7 regardless of concentrations, because the resulting salt (like NaCl) does not hydrolyze. Initial concentration affects the volume needed to reach equivalence, but not the pH at that point.</p>',
       '<p><strong>D. Depends on the initial concentration:</strong> Under the stated conditions, stoichiometric ' +
       'neutralization leaves a neutral NaCl solution, so pH is 7. Initial concentrations affect the titration ' +
       'volumes and the shape of the titration curve, but do not change this result in the ideal model.</p>'],
      ["<p class='exp-key'>Bottom Line: The equivalence point pH depends on the strength of the acid and base. Use phenolphthalein (pH 8-10) for weak acid/strong base titrations; methyl orange (pH 3-4) for strong acid/weak base.</p>",
       "<p class='exp-key'>Bottom Line: Equivalence means stoichiometrically matching amounts of acid and base have " +
       'reacted. For HCl/NaOH at 25°C the solution is neutral, pH 7. An indicator endpoint should lie within the ' +
       'steep part of the titration curve.</p>']
    ],
    points: [
      'Equivalence occurs when stoichiometrically matching amounts of acid and base have reacted.',
      'For ideal dilute HCl/NaOH solutions at 25°C, the equivalence solution is neutral, with pH 7.',
      'Equivalence-point pH is not always 7: salts of weak acids or bases can alter the pH.'
    ],
    keepText: ['<td>Basic salt (CH₃COONa)</td>', '<td>Acidic salt (NH₄Cl)</td>',
               '<strong>A. Less than 7:</strong>', '<strong>C. Greater than 7:</strong>'],
    gone: ['Use phenolphthalein (pH 8-10) for weak acid/strong base titrations',
           'is always 7 regardless of concentrations', 'Blood pH is tightly regulated']
  },

  {
    q: 'Q45', id: 'chem-46', expectLetter: 'C',
    explanation: [
      ['<p>Catalysts lower the activation energy (Eₐ) without being consumed.</p>',
       '<p>A catalyst participates in the reaction pathway and is regenerated overall, so it is not consumed. The ' +
       'pathway it provides has a lower activation energy (Eₐ).</p>'],
      ['A catalyst does not change reactant concentrations. While higher concentration does increase reaction rate,',
       'A catalyst does not work by adding more reactant. While higher concentration can increase reaction rate,'],
      ['It speeds up both the forward and reverse reactions equally, helping the system reach equilibrium faster without changing the equilibrium position or the equilibrium constant K.</p>',
       'Both the forward and reverse reactions are catalyzed, so the system reaches equilibrium faster while the ' +
       'equilibrium position and the equilibrium constant K stay the same.</p>'],
      ["<p class='exp-key'>Bottom Line: Catalysts speed both forward and reverse reactions equally. Enzymes are biological catalysts that can increase rates by factors of 10⁶ to 10¹².</p>",
       "<p class='exp-key'>Bottom Line: A catalyst provides a faster pathway and is regenerated overall. It speeds the " +
       "approach to equilibrium without changing the reaction's overall ΔG or its equilibrium constant at the same " +
       'temperature.</p>']
    ],
    points: [
      'A catalyst provides an alternative pathway with a lower effective activation barrier.',
      'It participates in reaction steps and is regenerated overall.',
      'It does not change the overall reaction free-energy difference or equilibrium constant at the same temperature.'
    ],
    keepText: ['<td>Activation energy</td>', '<td>&Delta;G of reaction</td>',
               '<strong>A. Increasing the temperature of the reaction:</strong>'],
    gone: ['Catalysts lower the activation energy (Eₐ) without being consumed',
           'reverse reactions equally', 'Chemical equilibrium is dynamic - forward and reverse reactions occur at equal rates']
  },

  {
    q: 'Q46', id: 'chem-47', expectLetter: 'D',
    explanation: [
      ['<tr><td>Sum in compound</td><td>0</td></tr>',
       "<tr><td>Sum in a neutral compound</td><td>0 (in a polyatomic ion, the sum equals the ion's charge)</td></tr>"],
      ['<p><strong>A. +2:</strong> Mn2+ is the oxidation state of manganese in compounds like MnCl2 or MnSO4. In KMnO4, the calculation gives: K(+1) + Mn(x) + 4O(-2) = 0, so x = +7. The +2 state is much more reduced and is actually the product when KMnO4 reacts in acidic solution.</p>',
       '<p><strong>A. +2:</strong> Manganese has oxidation state +2 in compounds such as MnCl₂ or MnSO₄. In KMnO₄, ' +
       'the calculation gives K(+1) + Mn(x) + 4O(-2) = 0, so x = +7. The +2 state is much more reduced; it is ' +
       'commonly the product when permanganate is reduced in acidic solution.</p>'],
      ['<p><strong>B. +4:</strong> Mn4+ is the oxidation state of manganese in MnO2 (manganese dioxide), a common battery material. In KMnO4, the four oxygen atoms contribute -8, and potassium contributes +1, requiring Mn to be +7 to balance to zero.</p>',
       '<p><strong>B. +4:</strong> Manganese has oxidation state +4 in MnO₂ (manganese dioxide), a common battery ' +
       'material. In KMnO₄, the four oxygen atoms contribute -8 and potassium contributes +1, requiring Mn to be +7 ' +
       'to balance to zero.</p>'],
      ["<p class='exp-key'>Bottom Line: KMnO₄ is a strong oxidizing agent because Mn in +7 state readily accepts electrons (gets reduced). The purple color disappears as Mn is reduced.</p>",
       "<p class='exp-key'>Bottom Line: Manganese has oxidation state +7 in permanganate. Permanganate is an " +
       'oxidizing agent; in acidic solution it is commonly reduced to very pale pink Mn²⁺, while other conditions ' +
       'can give different products, such as brown MnO₂.</p>']
    ],
    points: [
      'Oxidation numbers sum to zero in neutral KMnO₄.',
      'Potassium contributes +1 and four oxygens contribute -8, so manganese is +7.',
      'An oxidation number is a bookkeeping assignment; +7 does not mean permanganate contains a free Mn⁷⁺ ion.'
    ],
    keepText: ['x = <strong>+7</strong>', '<strong>C. +5:</strong>'],
    gone: ['<td>Sum in compound</td>', 'Mn2+ is the oxidation state of manganese',
           'Mn4+ is the oxidation state of manganese', 'The purple color disappears as Mn is reduced',
           'Standard electrode potentials (E°) predict spontaneity']
  },

  {
    q: 'Q47', id: 'chem-48', expectLetter: 'C',
    explanation: [
      ['<tr><td>-OH</td><td>Hydroxyl</td><td>Alcohol</td></tr>',
       '<tr><td>-OH on a saturated carbon (R-OH)</td><td>Hydroxyl</td>' +
       '<td>Alcohol; phenols also contain OH but form a separate class</td></tr>'],
      ['<tr><td>-NH₂</td><td>Amino</td><td>Amine</td></tr>',
       '<tr><td>-NH₂</td><td>Amino</td><td>Primary amine when attached to an appropriate carbon group</td></tr>'],
      ['<p><strong>A. -OH (hydroxyl):</strong> The hydroxyl group (-OH) defines alcohols (like ethanol, CH3CH2OH) and phenols (like C<sub>6</sub>H<sub>5</sub>OH). While -OH is part of the carboxyl group, the hydroxyl group alone makes a compound an alcohol, not a carboxylic acid. The carboxyl group combines -OH with C=O.</p>',
       '<p><strong>A. -OH (hydroxyl):</strong> An OH group alone does not identify a carboxylic acid. Alcohols have ' +
       'OH attached to a saturated carbon and phenols have OH attached directly to an aromatic ring. A carboxyl group ' +
       'has OH and C=O on the same carbon.</p>'],
      ["They are reducing agents and give positive Tollens' and Fehling's tests.</p>",
       "Simple aldehydes such as ethanal can reduce Tollens' reagent.</p>"],
      ['When attached to a carbon that also bears a carboxyl group, the molecule is an amino acid -- the building block of proteins.',
       'In an alpha-amino acid, an amino group and a carboxyl group are attached to the same alpha carbon; ' +
       'alpha-amino acids are the building blocks of proteins.']
    ],
    points: [
      'A carboxyl group contains C=O and OH attached to the same carbon.',
      'Removing its acidic proton produces a resonance-stabilized carboxylate ion.',
      'An OH group alone does not identify a carboxylic acid.'
    ],
    keepText: ['combines a carbonyl (C=O) and hydroxyl (-OH) on the same carbon',
               'Bottom Line: Carboxylic acids are weak acids',
               '<td>-CO- (between carbons)</td>'],
    gone: ["give positive Tollens' and Fehling's tests", 'the molecule is an amino acid -- the building block',
           "Organic chemistry centers on carbon's ability"]
  },

  {
    q: 'Q48', id: 'chem-49', expectLetter: 'B',
    explanation: [
      ['Polymerization requires a reactive site -- typically a C=C double bond -- that can open and link monomers together.',
       'Addition polymerization of ethene-type monomers requires a reactive C=C double bond that can open and link ' +
       'monomers together. Other kinds of polymerization work differently.'],
      ["<p class='exp-key'>Bottom Line: Addition polymerization requires monomers with double bonds. No small molecule is lost. In condensation polymerization, a small molecule (usually H₂O) is released (e.g., nylon, polyester).</p>",
       "<p class='exp-key'>Bottom Line: Ethene forms polyethylene when its C=C pi bonds are replaced by new links " +
       'between monomer units; no small molecule is eliminated. Other unsaturated monomers, including some with ' +
       'triple bonds, can also polymerize. Condensation polymerizations commonly release a small molecule such as ' +
       'water.</p>']
    ],
    points: [
      'Ethene is the monomer of polyethylene.',
      "Polymerization converts ethene's C=C pi bonds into new bonds linking the repeating units.",
      "No small molecule is eliminated in ethene's addition polymerization."
    ],
    keepText: ['<td>Vinyl chloride</td>', 'it produces polyacetylene, not polyethylene',
               'n CH₂=CH₂ → [-CH₂-CH₂-]ₙ (polyethylene)'],
    gone: ['Addition polymerization requires monomers with double bonds',
           'Polymerization requires a reactive site', "Organic chemistry centers on carbon's ability"]
  },

  {
    q: 'Q49', id: 'chem-50', expectLetter: 'C',
    explanation: [
      ["Benzene's electron-rich aromatic ring attracts electrophiles, not nucleophiles, making electrophilic aromatic substitution the preferred pathway.</p>",
       "Ordinary benzene also lacks the leaving group those common nucleophilic substitutions require, and its " +
       'electron-rich aromatic ring attracts electrophiles rather than nucleophiles. Appropriately substituted ' +
       'aromatic compounds can undergo aromatic nucleophilic substitution.</p>'],
      ['<p><strong>D. Free radical addition:</strong> Free radical addition occurs in alkenes under UV light or peroxide conditions. While benzene can undergo free radical substitution (e.g., with Cl2 under UV light), its characteristic reaction is electrophilic aromatic substitution using Lewis acid catalysts like AlCl3 or FeBr3.</p>',
       '<p><strong>D. Free radical addition:</strong> Radical addition is not benzene\'s characteristic reaction under ' +
       'ordinary electrophilic aromatic substitution conditions. Benzene can undergo addition under special ' +
       'photochemical conditions, but that is a different reaction pattern from substitution that restores the ' +
       'aromatic ring.</p>']
    ],
    points: [
      "Electrophilic aromatic substitution is benzene's characteristic reaction pattern.",
      'A ring hydrogen is replaced and the aromatic system is restored.',
      'Halogenation, nitration and sulfonation are examples that use different appropriate reagents.'
    ],
    keepText: ['<td>Nitration</td>', '<td>Sulfonation</td>',
               'Bottom Line: Aromaticity (H&uuml;ckel rule: 4n+2 &pi; electrons'],
    gone: ['free radical substitution (e.g., with Cl2 under UV light)',
           'Lewis acid catalysts like AlCl3 or FeBr3',
           'Conservation laws (mass, energy, charge) govern all chemical reactions']
  },

  {
    q: 'Q50', id: 'chem-51', expectLetter: 'C',
    stem: 'On gentle warming under standard alcohol-oxidation test conditions, which reagent can distinguish a simple primary alcohol from a tertiary alcohol?',
    explanation: [
      // the keyed heading was abbreviated relative to the full option text
      ['<h4>Correct Answer: Acidified potassium dichromate</h4>',
       '<h4>Correct Answer: Acidified potassium dichromate (K₂Cr₂O₇)</h4>'],
      ['but tertiary alcohols resist oxidation.</p>', 'but simple tertiary alcohols resist oxidation under these ' +
       'test conditions.</p>'],
      ['<tr><td><strong>Tertiary (R₃COH)</strong></td><td><strong>No reaction</strong></td>',
       '<tr><td><strong>Tertiary (R₃COH)</strong></td><td><strong>No oxidation under these test conditions</strong></td>'],
      ['<p><strong>D. Universal indicator:</strong> Universal indicator, like litmus, measures pH. Since alcohols are nearly neutral with very similar (and negligible) acidities, a pH indicator cannot differentiate between primary and tertiary alcohols.</p>',
       '<p><strong>D. Universal indicator:</strong> A pH indicator does not provide a reliable class test for these ' +
       'alcohols in aqueous solution. Their primary-versus-tertiary classification is tested here by their different ' +
       'behavior toward the oxidizing reagent.</p>'],
      ["<p class='exp-key'>Bottom Line: Tertiary alcohols lack an H on the carbon bearing OH, so they cannot be oxidized. The dichromate color change (Cr⁶⁺ orange → Cr³⁺ green) is the basis of early breathalyzer tests.</p>",
       "<p class='exp-key'>Bottom Line: A primary alcohol reduces acidified dichromate from orange Cr(VI) species to " +
       'green Cr(III) species as the alcohol is oxidized. A simple tertiary alcohol resists this test because its ' +
       'OH-bearing carbon has no hydrogen.</p>']
    ],
    points: [
      'Primary alcohols can be oxidized by acidified dichromate under the test conditions.',
      'Reduction of chromium(VI) to chromium(III) produces the orange-to-green change.',
      'Simple tertiary alcohols resist this test because the OH-bearing carbon has no hydrogen.'
    ],
    keepText: ['<strong>A. Sodium metal:</strong>', '<strong>B. Litmus paper:</strong>',
               '<td>Orange → green</td>'],
    gone: ['Cr⁶⁺ orange', 'so they cannot be oxidized', '<strong>No reaction</strong>',
           'Blood pH is tightly regulated']
  }
];
