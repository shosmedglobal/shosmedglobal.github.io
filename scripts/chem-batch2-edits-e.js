/**
 * Chemistry review batch 2, specs for Q41-Q50 (chem-103..chem-112).
 *
 * Q41 is the numerical correction: the ideal-model vapour-pressure DECREASE is
 * 26.4 mmHg, so option B, the keyed heading and the whole calculation change;
 * the remaining pressure of about 733.6 mmHg is named explicitly so the two
 * quantities cannot be confused again.
 * Q42 replaces all four options with parallel ratios, because "three times
 * more" can be read as four times as much.
 */
'use strict';

module.exports = [
  {
    q: 'Q41', id: 'chem-103', key: 'B',
    stem: 'Assume an ideal solution. If 2.0 mol of a nonvolatile, non-electrolyte solute is dissolved in 1000 g of water, by approximately how much is the vapor pressure lowered at 100 °C? (Water molar mass = 18.0 g/mol; pure-water vapor pressure = 760 mmHg)',
    options: [[1, '26.4 mmHg']],
    main: [
      "For an ideal solution with a nonvolatile solute, Raoult's law gives P<sub>solution</sub> = X<sub>water</sub> × P<sub>pure</sub>. Therefore the lowering is ΔP = X<sub>solute</sub> × P<sub>pure</sub>. Water amount = 1000/18.0 ≈ 55.56 mol. The solute mole fraction is 2.0/(55.56 + 2.0) ≈ 0.03475. Thus ΔP ≈ 0.03475 × 760 = 26.4 mmHg. The solution's vapor pressure is about 760 − 26.4 = 733.6 mmHg; the question asks for the decrease, not this remaining pressure."
    ],
    feedback: {
      A: 'A lowering of 7.6 mmHg would correspond to X<sub>solute</sub> = 7.6/760 = 0.010. The actual mole fraction is about 0.03475, so the predicted lowering is larger.',
      C: 'A lowering of 13.5 mmHg corresponds to X<sub>solute</sub> ≈ 0.0178, roughly half the required fraction. Use both 2.0 mol solute and 55.56 mol water in the denominator to obtain 26.4 mmHg.',
      D: 'A lowering of 38.0 mmHg would require X<sub>solute</sub> = 38.0/760 = 0.050. The actual value is about 0.03475, giving a smaller decrease of 26.4 mmHg.'
    },
    bottom: 'For the stated ideal solution, ΔP = X<sub>solute</sub>P<sub>pure</sub> ≈ 26.4 mmHg. The mole-fraction denominator includes both solute and solvent.',
    points: [
      'Convert solvent mass to moles before calculating mole fraction.',
      'X<sub>solute</sub> = 2.0/(2.0 + 55.56), not 2.0/55.56.',
      'The vapor-pressure decrease is approximately 26.4 mmHg; the remaining vapor pressure is approximately 733.6 mmHg.'
    ],
    gone: ['27.0', '55.5 mol', '2.0/57.5'],
    keep: ['733.6 mmHg']
  },

  {
    q: 'Q42', id: 'chem-104', key: 'D',
    stem: "In a simplified Henry's-law model, a diver breathes the same air mixture at 4 atm rather than 1 atm. At the same temperature and after equilibration, how does the dissolved nitrogen concentration compare with its surface value?",
    options: [
      [0, 'Twice as much'],
      [1, 'Three times as much'],
      [2, 'Sixteen times as much'],
      [3, 'Four times as much']
    ],
    main: [
      "With the nitrogen fraction held constant, nitrogen's partial pressure increases in the same ratio as total pressure: 4/1 = 4. At constant temperature, the model C = k<sub>H</sub>P<sub>N₂</sub> therefore predicts four times the equilibrium dissolved nitrogen concentration. This is an equilibrium comparison; actual uptake depends on time and physiological conditions. A rapid pressure reduction can allow dissolved nitrogen to form bubbles, contributing to decompression sickness."
    ],
    feedback: {
      A: 'Twice as much would follow from a twofold rise in nitrogen partial pressure. The stated pressure ratio is four, and the gas mixture is unchanged.',
      B: 'Three times as much would require a threefold partial-pressure ratio. Here the ratio is 4/1, so the final equilibrium concentration is four times its starting value.',
      C: "Sixteen times as much incorrectly squares the pressure ratio. Henry's law is directly proportional to gas partial pressure at constant temperature, so the factor is four."
    },
    bottom: 'With unchanged temperature and gas composition, a fourfold pressure rise gives four times the equilibrium dissolved nitrogen concentration in this simplified model.',
    points: [
      "Henry's law uses nitrogen partial pressure, not total pressure without regard to gas composition.",
      'With the same air mixture, raising total pressure from 1 to 4 atm also raises nitrogen partial pressure fourfold.',
      'The predicted fourfold concentration is an equilibrium value, not an instantaneous measure of nitrogen uptake.'
    ],
    gone: [
      'times more',
      'This is why divers must ascend slowly',
      'This is a key distinction from relationships like the ideal gas law for volume-pressure.'
    ]
  },

  {
    q: 'Q43', id: 'chem-105', key: 'B',
    feedback: {
      A: 'A proton acceptor is a Brønsted-Lowry base. An acid has the opposite role: it donates H⁺ to a base.',
      C: 'An electron-pair donor is a Lewis base. That is a different definition from the proton-donor definition of a Brønsted-Lowry acid.'
    },
    points: [
      'A Brønsted-Lowry acid donates H⁺; a base accepts H⁺.',
      'After donating a proton, an acid becomes its conjugate base.',
      'This proton-transfer definition can be used beyond aqueous solutions.'
    ],
    keep: ['An electron pair acceptor is the Lewis definition of an acid.']
  },

  {
    q: 'Q44', id: 'chem-106', key: 'D',
    stem: 'Which of the following acts as a Lewis acid because its central atom has an incomplete octet?',
    edits: [
      ['The Lewis definition is the broadest acid-base concept and includes species without protons.',
       'The Lewis definition is broader than the Brønsted-Lowry definition because it also covers electron-pair acceptance without proton transfer, and it includes species without protons.']
    ],
    feedback: {
      A: 'NH₃ has a complete octet around nitrogen and a lone pair it can donate to BF₃. In that reaction, ammonia is the Lewis base, not the electron-deficient acceptor.',
      B: "Water's oxygen has a complete octet and lone pairs that can be donated when water acts as a ligand. It is not the incomplete-octet species requested in this question."
    },
    points: [
      'A Lewis acid accepts an electron pair; a Lewis base donates one.',
      'Boron in BF₃ has only six electrons in its valence shell and can accept a lone pair.',
      'Formation of a donor-acceptor bond, such as NH₃→BF₃, need not involve proton transfer.'
    ],
    gone: ['the broadest acid-base concept'],
    keep: ['BF3 has an incomplete octet on boron (only 6 electrons)',
           'The hydroxide ion is a strong Lewis base and a strong Bronsted-Lowry base.']
  },

  {
    q: 'Q45', id: 'chem-107', key: 'D',
    stem: 'At 25 °C, what is the approximate pH of a 0.010 M aqueous NaOH solution, treating it as ideal?',
    edits: [
      ['Strong bases fully dissociate, so [OH-] equals the base concentration. Use pH + pOH = 14 to convert.',
       'NaOH supplies one OH⁻ per formula unit, so [OH⁻] ≈ 0.010 M here. At 25 °C, pH + pOH ≈ 14. Other hydroxide bases may supply a different number of OH⁻ ions per formula unit.']
    ],
    feedback: {
      C: 'In the concentration approximation at 25 °C, pH 14 corresponds to [OH⁻] about 1 M, a hundredfold larger than the given value. Here pOH = 2 and pH ≈ 12. The pH scale does not have universal limits of 0 and 14.'
    },
    bottom: 'For this dilute NaOH solution at 25 °C, [OH⁻] ≈ 0.010 M, pOH ≈ 2 and pH ≈ 12.',
    points: [
      'Dissolved NaOH supplies one OH⁻ per formula unit.',
      '[OH⁻] ≈ 10⁻² M gives pOH ≈ 2.',
      'At 25 °C, pH ≈ 14 − 2 = 12; the value 14 in this relation depends on temperature.'
    ],
    gone: ['Strong bases fully dissociate, so [OH-] equals the base concentration.',
           'A 0.01 M strong base is alkaline but nowhere near the top of the scale.'],
    keep: ['pH = 14 - pOH = 14 - 2 = 12.']
  },

  {
    q: 'Q46', id: 'chem-108', key: 'A',
    feedback: {
      B: 'pH 1 would follow from treating the 0.10 M acid as fully dissociated. HA is weak, so its hydrogen ion concentration must instead be found from K<sub>a</sub>.',
      C: '5.0 is pK<sub>a</sub> = −log(10⁻⁵), not the pH of this acid-only solution. The concentration also enters: [H⁺] ≈ sqrt(K<sub>a</sub>C) = 10⁻³ M.',
      D: 'The calculation gives about 10⁻³ M H⁺, so this solution is acidic with pH about 3, not neutral at pH 7. Weak does not mean that an acid has no effect on pH.'
    },
    points: [
      'For HA alone in water, K<sub>a</sub> ≈ x²/(C − x), with x approximately the H⁺ concentration.',
      'Here x ≈ sqrt(10⁻⁵ × 0.10) = 10⁻³ M, giving pH ≈ 3.0.',
      'x/C is about 1%, so replacing C − x by C is justified for this estimate.'
    ],
    gone: ['Any acid solution, even a very weak one, will have a pH below 7.'],
    keep: ['The 5% approximation is valid here since 10<sup>-3</sup> / 0.10 = 1%, well under 5%.']
  },

  {
    q: 'Q47', id: 'chem-109', key: 'A',
    feedback: {
      B: 'H₃PO₄ is obtained when H₂PO₄⁻ GAINS a proton, so it is the conjugate acid. The question asks for the species after one proton is lost.',
      C: 'PO₄³⁻ would require removal of two protons from H₂PO₄⁻. A conjugate acid-base pair differs by just one H⁺, giving HPO₄²⁻ here.'
    },
    points: [
      'A conjugate base is formed by removing one H⁺.',
      'H₂PO₄⁻ loses H⁺ to give HPO₄²⁻, with one fewer hydrogen and one more negative charge.',
      'Gaining H⁺ instead would form H₃PO₄, its conjugate acid.'
    ],
    keep: ['A conjugate acid-base pair always differs by exactly one proton (H⁺).',
           'H2PO4- is amphoteric']
  },

  {
    q: 'Q48', id: 'chem-110', key: 'C',
    stem: 'A buffer contains 0.10 M acetic acid and 0.10 M sodium acetate. Using the concentration form of the Henderson-Hasselbalch equation and Ka = 1.8 × 10⁻⁵, what is its approximate pH?',
    edits: [
      ['When the concentrations of weak acid and conjugate base are equal, the pH equals the pKa of the acid.',
       'When the concentrations of weak acid and conjugate base are equal, the pH is approximately equal to the pK<sub>a</sub> of the acid in this concentration treatment.']
    ],
    feedback: {
      A: "9.26 is the approximate pK<sub>b</sub> of acetate at 25 °C, not this buffer's pH. The equal acetic-acid/acetate ratio gives pH ≈ pK<sub>a</sub> ≈ 4.74.",
      B: "Equal amounts of a weak acid and its conjugate base do not necessarily give pH 7. Their buffer pH is near the acid's pK<sub>a</sub>, which here is 4.74.",
      D: 'A pH near 2.87 is the weak-acid estimate for 0.10 M acetic acid WITHOUT the added acetate: [H⁺] ≈ sqrt(1.8 × 10⁻⁵ × 0.10). The buffer contains substantial acetate, so the equal-ratio buffer calculation gives pH ≈ 4.74.'
    },
    points: [
      'Henderson-Hasselbalch uses pH ≈ pK<sub>a</sub> + log([A⁻]/[HA]) in this concentration model.',
      'Equal acid and conjugate-base concentrations make the logarithm zero.',
      'pK<sub>a</sub> = −log(1.8 × 10⁻⁵) ≈ 4.74, so the buffer pH is approximately 4.74.'
    ],
    gone: ['This value is approximately half of the pKa'],
    keep: ['4.74 + 0 = 4.74']
  },

  {
    q: 'Q49', id: 'chem-111', key: 'C',
    main: [
      "Choose an indicator whose transition range falls within the steep pH change near equivalence. With the stated equivalence pH around 8.7, phenolphthalein's 8.2-10.0 range is the best match among these choices. The observed color-change endpoint approximates the stoichiometric equivalence point; the two are not definitions of the same event."
    ],
    feedback: {
      A: 'Methyl orange changes at pH 3.1-4.4, an acidic range far below the supplied equivalence pH of about 8.7. It is a poor match to this titration.',
      B: "Bromothymol blue changes around neutral pH, 6.0-7.6. Phenolphthalein's basic range is a better match to the given equivalence pH of 8.7.",
      D: 'Methyl red changes at pH 4.4-6.2, below the supplied basic equivalence pH. The useful criterion is a transition within the steep region near equivalence, not a universal requirement that every suitable indicator range contain the exact equivalence pH.'
    },
    bottom: 'Select an indicator whose transition occurs within the steep part of the titration curve near equivalence; phenolphthalein is the best match to the stated pH of about 8.7.',
    points: [
      'The equivalence point is determined by reaction stoichiometry; the endpoint is the observed indicator change.',
      'An indicator should change within the steep part of the curve near equivalence.',
      "Of the listed ranges, phenolphthalein's 8.2-10.0 best matches the supplied basic equivalence pH."
    ],
    gone: [
      'Choosing the wrong indicator leads to endpoint errors in the titration.',
      'Choosing an indicator whose transition range includes the equivalence point pH is essential for accurate endpoint detection.'
    ]
  },

  {
    q: 'Q50', id: 'chem-112', key: 'C',
    edits: [
      ['A strong acid has a weak conjugate base (small Kb) and vice versa. This inverse relationship always holds.',
       'For a conjugate pair in water at a fixed temperature, K<sub>a</sub>K<sub>b</sub> = K<sub>w</sub>; a larger K<sub>a</sub> corresponds to a smaller K<sub>b</sub>.']
    ],
    feedback: {
      A: 'Using K<sub>a</sub> = 2.5 × 10⁻⁴ would give K<sub>a</sub>K<sub>b</sub> = 6.25 × 10⁻¹⁴, not the supplied 1.0 × 10⁻¹⁴. Divide K<sub>w</sub> by K<sub>b</sub> rather than carrying over the 2.5 coefficient.',
      B: 'Using 1.0 × 10⁻⁴ would give a product of 2.5 × 10⁻¹⁴. The coefficient must also be divided: (1.0/2.5) × 10⁻⁴ = 4.0 × 10⁻⁵.',
      D: '4.0 × 10⁻⁴ is ten times too large. Multiplying it by 2.5 × 10⁻¹⁰ gives 1.0 × 10⁻¹³; the required product is 1.0 × 10⁻¹⁴.'
    },
    points: [
      'K<sub>a</sub> and K<sub>b</sub> must refer to a conjugate acid-base pair in the same solvent and at the same temperature.',
      'Here K<sub>a</sub> = K<sub>w</sub>/K<sub>b</sub> = 4.0 × 10⁻⁵.',
      'Multiplication checks the answer: (4.0 × 10⁻⁵)(2.5 × 10⁻¹⁰) = 1.0 × 10⁻¹⁴.'
    ],
    gone: ['This inverse relationship always holds.', 'Ka should be moderate but still well below 1'],
    keep: ['Ka = Kw/Kb = (1.0 x 10<sup>-14</sup>)/(2.5 x 10<sup>-10</sup>) = 4.0 x 10<sup>-5</sup>']
  }
];
