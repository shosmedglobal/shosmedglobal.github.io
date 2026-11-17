/**
 * Chemistry review batch 2, specs for Q21-Q30 (chem-83..chem-92).
 *
 * Q24 reframes its distractor arithmetic as neutralising CAPACITY rather than
 * free H+, so that nothing implies both sulfuric-acid dissociations were
 * already complete in the stock solution.
 * Q26 drops the 159.5 g/mol values and the unrelated FeSO4.7H2O comparison,
 * and gains the missing B feedback.
 */
'use strict';

module.exports = [
  {
    q: 'Q21', id: 'chem-83', key: 'A',
    points: [
      'Convert 500 mL of final solution to 0.500 L.',
      'The required amount is 0.20 mol/L × 0.500 L = 0.10 mol NaOH.',
      'Multiply by 40 g/mol to obtain 4.0 g, then prepare the solution to the stated final volume.'
    ],
    keep: ['Mass = moles x molar mass = 0.10 x 40 = 4.0 g.']
  },

  {
    q: 'Q22', id: 'chem-84', key: 'D',
    edits: [
      ['The ratio = molar mass / empirical formula mass = 180/30 = 6. Multiply each subscript by 6: C<sub>6</sub>H<sub>12</sub>O<sub>6</sub> (glucose).',
       'The ratio = molar mass / empirical formula mass = 180/30 = 6, so multiplying every subscript in CH₂O by six gives C₆H₁₂O₆. The formula alone does not identify a unique compound.']
    ],
    feedback: {
      A: 'C₂H₄O₂ is twice CH₂O and has molar mass 60 g/mol. It has the correct elemental ratio but not the required molar mass of 180 g/mol.',
      B: 'C₃H₆O₃ is three times CH₂O and has molar mass 90 g/mol. The required multiplier is six, not three.',
      C: 'C₄H₈O₄ IS a whole-number multiple of CH₂O: its multiplier is four. It is wrong because its molar mass is 120 g/mol, not 180 g/mol.'
    },
    points: [
      'Divide molecular molar mass by empirical-formula molar mass to find the integer multiplier.',
      'Here 180/30 = 6, giving C₆H₁₂O₆.',
      'Matching the elemental ratio is insufficient; the molecular formula must also match the supplied molar mass.'
    ],
    gone: [
      '(glucose)',
      'Since 180/120 = 1.5, this is not a whole-number multiple of the empirical formula.'
    ],
    keep: ['The molecular formula is always a whole-number multiple of the empirical formula.']
  },

  {
    q: 'Q23', id: 'chem-85', key: 'B',
    edits: [
      ['Combustion of hydrocarbons always produces CO2 and H<sub>2</sub>O and requires significant amounts of oxygen.',
       'Complete combustion of a hydrocarbon produces CO₂ and H₂O. Incomplete combustion can also produce carbon monoxide or soot.']
    ],
    points: [
      'The balanced equation describes complete combustion of ethane.',
      'Its O₂:C₂H₆ mole ratio is 7:2.',
      'Three moles of ethane require 3.0 × 7/2 = 10.5 mol O₂.'
    ],
    gone: ['Combustion of hydrocarbons always produces'],
    keep: ['(3.0 x 7)/2 = 10.5 mol O2']
  },

  {
    q: 'Q24', id: 'chem-86', key: 'C',
    edits: [
      [', supplying 0.050 mol H+ (diprotic acid).', ', which can neutralize 0.050 mol OH-.'],
      ['provides 0.10 mol H<sub>2</sub>SO<sub>4</sub> = 0.20 mol H+. This is twice what is needed to neutralize 0.10 mol NaOH.',
       'provides 0.10 mol H<sub>2</sub>SO<sub>4</sub>, which can neutralize 0.20 mol OH-. This is twice the required 0.100 mol OH-.'],
      ['provides 0.125 mol H<sub>2</sub>SO<sub>4</sub> = 0.25 mol H+, which is 2.5 times the needed amount.',
       'provides 0.125 mol H<sub>2</sub>SO<sub>4</sub>, which can neutralize 0.25 mol OH-, 2.5 times the required 0.100 mol OH-.']
    ],
    points: [
      'Complete neutralization uses two moles of NaOH per mole of H₂SO₄.',
      'The NaOH sample contains 0.100 mol, requiring 0.050 mol H₂SO₄.',
      'At 0.50 mol/L, the required acid volume is 0.100 L = 100 mL.'
    ],
    gone: ['mol H+', '(diprotic acid)'],
    keep: ['Volume = 0.050/0.50 = 0.100 L = 100 mL.', 'Sulfuric acid is diprotic, so one mole neutralizes two moles of NaOH.']
  },

  {
    q: 'Q25', id: 'chem-87', key: 'C',
    points: [
      '4.0 g H₂ corresponds to 2.0 mol H₂ using the supplied molar mass.',
      'H₂ and H₂O have a 1:1 mole ratio in the balanced reaction.',
      'The theoretical water yield is 2.0 × 18 = 36 g; the additional mass comes from oxygen.'
    ],
    keep: ['Mass = 2.0 x 18 = 36 g.']
  },

  {
    q: 'Q26', id: 'chem-88', key: 'C',
    feedback: {
      A: 'Three waters per CuSO₄ would mean 0.300 mol water for 0.100 mol salt, or 5.40 g water. The observed loss is 8.97 g, so x = 3 is too small.',
      B: 'Four waters per CuSO₄ would mean 0.400 mol water for 0.100 mol salt, or 7.20 g water. The observed 8.97 g loss is closer to five waters per salt formula unit.',
      D: 'Seven waters per CuSO₄ would mean 0.700 mol water for 0.100 mol salt, or 12.60 g water. That exceeds the observed 8.97 g loss. The measured mole ratio is about 4.98, which rounds to five.'
    },
    points: [
      'Water lost = 24.97 − 16.00 = 8.97 g, assuming heating removes water without decomposing the salt.',
      'The sample contains 0.100 mol CuSO₄ and about 0.498 mol water.',
      'Divide water moles by salt moles: x ≈ 4.98 ≈ 5, giving CuSO₄·5H₂O.'
    ],
    gone: ['159.5', 'FeSO4.7H', 'iron(II) sulfate heptahydrate'],
    keep: ['Moles CuSO4 = 16.00/160 = 0.100 mol.']
  },

  {
    q: 'Q27', id: 'chem-89', key: 'A',
    points: [
      'Ca₃(PO₄)₂ contains eight oxygen atoms per formula unit.',
      '0.25 mol of the salt therefore contains 2.0 mol oxygen atoms.',
      "Multiplying by Avogadro's constant gives approximately 1.20 × 10²⁴ oxygen atoms."
    ],
    keep: ['0.25 mol x 8 x 6.02 x 10<sup>23</sup> = 1.204 x 10<sup>24</sup>']
  },

  {
    q: 'Q28', id: 'chem-90', key: 'B',
    points: [
      '11.7 g / 58.5 g/mol = 0.20 mol NaCl.',
      'Molarity uses liters of final solution, not liters of solvent added.',
      '0.20 mol / 0.500 L = 0.40 M.'
    ],
    keep: ['Molarity = moles/volume(L) = 0.20/0.500 = 0.40 M.']
  },

  {
    q: 'Q29', id: 'chem-91', key: 'A',
    points: [
      'Molality is solute moles divided by kilograms of solvent.',
      '18.0 g glucose gives 0.10 mol; 500 g water is 0.500 kg.',
      'The molality is 0.20 mol/kg, written 0.20 m, and does not change merely because the solution expands with temperature.'
    ],
    keep: ['Molality = moles of solute / kg of solvent = 0.10/0.500 = 0.20 m.']
  },

  {
    q: 'Q30', id: 'chem-92', key: 'B',
    feedback: {
      C: 'An 8.0% result would use 100 g as the total solution mass, but the actual total is 8.0 + 192 = 200 g. Dividing by solvent mass alone would give about 4.17%, not 8.0%. Mass percent uses total solution mass, giving 4.0%.'
    },
    points: [
      'Solution mass includes both solute and solvent: 8.0 + 192 = 200 g.',
      'Mass percent = solute mass / solution mass × 100%.',
      'The result is 8.0/200 × 100% = 4.0%, not the percentage calculated using solvent mass alone.'
    ],
    gone: ['8.0/100 x 100 = 8.0% if solvent were 100 g'],
    keep: ['(8.0/200) x 100 = 4.0%']
  }
];
