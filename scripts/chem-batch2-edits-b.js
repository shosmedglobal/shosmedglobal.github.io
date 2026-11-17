/**
 * Chemistry review batch 2, specs for Q13-Q20 (chem-75..chem-82).
 * Q11 (chem-73) and Q12 (chem-74) are absent: the review orders them kept
 * byte-identical. From Q13 onward every item carries a repeated three-point
 * block, replaced here with the review's question-specific set.
 */
'use strict';

module.exports = [
  {
    q: 'Q13', id: 'chem-75', key: 'C',
    edits: [
      ["Avogadro's number (6.022 x 10<sup>23</sup>) is the number of entities per mole and applies to atoms, molecules, ions, or any particles.",
       'One mole contains approximately 6.022 × 10²³ specified entities, such as molecules, atoms or ions.']
    ],
    feedback: {
      B: '6.02 × 10²³ molecules corresponds to 1.0 mol of glucose. The sample contains 0.50 mol, so it contains half that number: 3.01 × 10²³ molecules.'
    },
    points: [
      "Multiply moles by Avogadro's constant to count the specified entities.",
      'Here the entities are glucose molecules: 0.50 × 6.02 × 10²³ = 3.01 × 10²³.',
      'Counting atoms instead would require an additional factor for the atoms in each molecule.'
    ],
    gone: [
      'is the number of entities per mole and applies to atoms, molecules, ions, or any particles',
      'is the number of molecules in exactly 1.0 mole of any substance'
    ]
  },

  {
    q: 'Q14', id: 'chem-76', key: 'C',
    feedback: {
      B: '58 g/mol results from 40 + 16 + 2(1), which counts only one oxygen. Ca(OH)₂ contains two oxygens and two hydrogens, so the correct total is 40 + 2(16) + 2(1) = 74 g/mol.'
    },
    points: [
      'A subscript outside parentheses multiplies every atom inside them.',
      'Ca(OH)₂ contains one Ca, two O and two H atoms per formula unit.',
      'Its molar mass is 40 + 2(16) + 2(1) = 74 g/mol using the supplied values.'
    ],
    gone: ['58 g/mol is the molar mass of NaCl'],
    keep: ['Molar mass = 40 + 2(16) + 2(1) = 40 + 32 + 2 = 74 g/mol']
  },

  {
    q: 'Q15', id: 'chem-77', key: 'B',
    points: [
      'Convert aluminum mass to amount: 5.4 g / 27 g/mol = 0.20 mol.',
      'The coefficients 2 Al and 2 AlCl₃ give a 1:1 mole ratio.',
      'With chlorine in excess, the theoretical amount of AlCl₃ is 0.20 mol.'
    ],
    keep: ['Moles of Al = 5.4/27 = 0.20 mol.']
  },

  {
    q: 'Q16', id: 'chem-78', key: 'D',
    points: [
      'CaCO₃ produces CaO and CO₂ in a 1:1:1 mole ratio.',
      '10.0 g CaCO₃ corresponds to 0.10 mol, producing 0.10 mol CO₂.',
      'The CO₂ mass is 4.4 g; the remaining 5.6 g is CaO, conserving the initial 10.0 g.'
    ],
    keep: ['Mass of CO2 = 0.10 x 44 = 4.4 g.']
  },

  {
    q: 'Q17', id: 'chem-79', key: 'A',
    edits: [
      ['The limiting reagent is completely consumed first and determines the maximum amount of product formed.',
       'In the complete-reaction stoichiometric model, the limiting reactant determines the maximum product amount; actual conversion may be lower.'],
      ['while 1/3 mol N2 remains unused.', 'while 1/3 mol N2 would remain after complete consumption of H2.'],
      ['the reaction produces 2 x (2/3) = 4/3 mol NH3.', 'the theoretical maximum is 4/3 mol NH3.']
    ],
    points: [
      'Compare available amounts with the balanced ratio N₂:H₂ = 1:3.',
      'Two moles of H₂ require only 2/3 mol N₂, so H₂ is limiting.',
      'The theoretical maximum is 4/3 mol NH₃, with 1/3 mol N₂ left if H₂ is fully consumed.'
    ],
    gone: ['remains unused', 'the reaction produces 2 x (2/3) = 4/3 mol NH3'],
    keep: ['Since H2 is insufficient, it is the limiting reagent.']
  },

  {
    q: 'Q18', id: 'chem-80', key: 'A',
    edits: [
      ['Percent yield is always 100% or less in practice due to side reactions, incomplete reactions, and losses during purification.',
       'Actual recovery of pure product is often below the theoretical yield because of incomplete reaction, side reactions or handling losses. An apparent measured yield above 100% can result from retained solvent, impurities or measurement/calculation errors.']
    ],
    feedback: {
      D: '117.6% comes from reversing the required ratio: 50.0/42.5 × 100. Here the correct ratio is actual/theoretical = 42.5/50.0. An apparent experimental yield above 100% would prompt a check of purity, drying and measurements; it does not demonstrate creation of matter.'
    },
    points: [
      'Percent yield = actual yield / theoretical yield × 100%.',
      '42.5/50.0 × 100% = 85.0%.',
      'An apparent yield above 100% suggests extra material or an error in measurement or calculation.'
    ],
    gone: [
      'Percent yield is always 100% or less in practice',
      'A yield over 100% would imply creating mass from nothing, which violates conservation of mass.'
    ],
    keep: ['(42.5 / 50.0) x 100 = 85.0%']
  },

  {
    q: 'Q19', id: 'chem-81', key: 'B',
    edits: [
      ['Note that C<sub>2</sub>H<sub>4</sub>O<sub>2</sub> has the same ratio but is a molecular formula (a multiple of the empirical formula).',
       'C₂H₄O₂ and C₃H₆O₃ have the same elemental ratio, but neither is reduced to the simplest whole-number ratio. The data establish CH₂O as the empirical formula, not a unique molecular formula.']
    ],
    feedback: {
      C: 'C₂H₄O₂ reduces to CH₂O when every subscript is divided by two. It matches the elemental ratio but is not the simplest ratio requested. A molar mass would be needed to determine a molecular formula.',
      D: 'C₃H₆O₃ reduces to CH₂O when every subscript is divided by three. An empirical formula must use the smallest whole-number ratio, so this unreduced formula is not the answer.'
    },
    points: [
      "For percentage data, assume a 100 g sample and convert each element's mass to moles.",
      'The mole amounts are approximately 3.33 C, 6.7 H and 3.33 O, giving a 1:2:1 ratio.',
      'The empirical formula is CH₂O; molecular size cannot be determined from percentages alone.'
    ],
    gone: ['Note that c2h4o2 has the same ratio but is a molecular formula'],
    keep: ['Dividing by the smallest (3.33): C:H:O = 1:2:1, giving CH2O.']
  },

  {
    q: 'Q20', id: 'chem-82', key: 'C',
    edits: [
      ['36.0 M would result from multiplying molarity by volume (6.0 x 6), which is not how dilution works.',
       '36.0 M results from multiplying 6.0 M by the volume ratio 150/25 = 6 instead of dividing by that ratio.']
    ],
    points: [
      'Dilution preserves solute amount: M₁V₁ = M₂V₂.',
      'The final volume is 150.0 mL, six times the initial 25.0 mL.',
      "The final concentration is therefore 6.0/6 = 1.0 M; 'diluted to' means final solution volume."
    ],
    gone: ['which is not how dilution works'],
    keep: ['Dilution always decreases concentration since you are adding more solvent to the same amount of solute.']
  }
];
