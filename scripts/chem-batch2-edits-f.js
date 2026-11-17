/**
 * Chemistry review batch 2, specs for Q51-Q60 (chem-113..chem-122).
 *
 * Q53 replaces option D, because the old "14 - pKa" and option B both name the
 * same quantity at 25 °C; the new D is the equivalence-point pH, a genuinely
 * distinct distractor.
 * Q55 is the mislabelled-feedback repair: the single existing paragraph carried
 * the 10⁻¹⁴ explanation under the A label although 10⁻¹⁴ M is option C.
 * Q56 is the major rewrite, recast from "how many equivalence points appear on
 * a real titration curve" to formal complete-neutralisation stoichiometry,
 * for which A = 3 is sound.
 */
'use strict';

module.exports = [
  {
    q: 'Q51', id: 'chem-113', key: 'B',
    stem: 'Which statement best describes the two dissociation steps of H₂SO₄ in dilute aqueous solution?',
    main: [
      'H₂SO₄ is treated as essentially completely dissociated in its first step, producing H⁺ and HSO₄⁻. The second step is an equilibrium: HSO₄⁻ ⇌ H⁺ + SO₄²⁻, with K<sub>a2</sub> about 1.2 × 10⁻² at 25 °C. HSO₄⁻ is therefore classified as a weak acid, although how much of it dissociates depends on concentration.'
    ],
    feedback: {
      A: 'The first step is treated as complete in dilute water, but the second has a finite equilibrium constant and is not generally treated as a second fully dissociated strong-acid step.',
      C: 'The first dissociation of H₂SO₄ is strong in dilute aqueous solution. Only the second step is treated using the weaker HSO₄⁻ equilibrium here.',
      D: 'This reverses the two steps. Removing the first proton from H₂SO₄ is much more favorable than removing the second from HSO₄⁻ under the stated aqueous conditions.'
    },
    bottom: "In dilute water, sulfuric acid's first dissociation is essentially complete; the second is an equilibrium governed by K<sub>a2</sub>. Diprotic does not mean both steps are strong.",
    points: [
      'Diprotic means that two protons can be removed in successive steps.',
      "H₂SO₄'s first dissociation is essentially complete in dilute water.",
      'HSO₄⁻ has a finite second dissociation constant, so its extent of dissociation depends on the solution conditions.'
    ],
    gone: [
      'each successive dissociation is weaker than the previous one',
      'This trend holds for all polyprotic acids.',
      'each successive dissociation constant is smaller (Ka1 > Ka2 > Ka3)'
    ]
  },

  {
    q: 'Q52', id: 'chem-114', key: 'C',
    stem: 'At 25 °C, a buffer contains 0.20 M NH₃ and 0.10 M NH₄Cl. Using the concentration form of the Henderson-Hasselbalch equation, Kb(NH₃) = 1.8 × 10⁻⁵ and Kw = 1.0 × 10⁻¹⁴, what is its approximate pH?',
    edits: [
      ['First find pKa of NH4+: Ka = Kw/Kb = 10<sup>-14</sup>/1.8x10<sup>-5</sup> = 5.56x10<sup>-10</sup>, so pKa = 9.26.',
       'First find pK<sub>a</sub> of NH4+: K<sub>a</sub> = K<sub>w</sub>/K<sub>b</sub> = (1.0 × 10<sup>-14</sup>)/(1.8 × 10<sup>-5</sup>) = 5.6 × 10<sup>-10</sup>, so pK<sub>a</sub> ≈ 9.26.']
    ],
    feedback: {
      A: '4.44 is approximately the pOH: pK<sub>b</sub> + log([NH₄⁺]/[NH₃]) = 4.74 + log(0.5) ≈ 4.44. At 25 °C, subtract this from 14 to obtain pH ≈ 9.56.',
      B: '8.95 results from reversing the ratio in the pH form: 9.26 + log(0.10/0.20). The pH equation uses base/conjugate acid = [NH₃]/[NH₄⁺] = 2.',
      D: '10.26 would add 1.00 to pK<sub>a</sub>, as if the base/acid ratio were 10. The actual ratio is 2 and log 2 ≈ 0.30, so the result is 9.56.'
    },
    points: [
      'At 25 °C, pK<sub>a</sub>(NH₄⁺) = 14 − pK<sub>b</sub>(NH₃) ≈ 9.26.',
      'Use [NH₃]/[NH₄⁺] = 0.20/0.10 = 2 in the pH form of Henderson-Hasselbalch.',
      'pH ≈ 9.26 + 0.30 = 9.56; the corresponding pOH is about 4.44.'
    ],
    gone: ['It might result from adding the log term instead of subtracting.', '10<sup>-14</sup>/1.8x10<sup>-5</sup>'],
    keep: ['pH = 9.26 + log(0.20/0.10) = 9.26 + 0.30 = 9.56.']
  },

  {
    q: 'Q53', id: 'chem-115', key: 'C',
    stem: 'Using the usual buffer approximation, at the half-equivalence point in the titration of a weak monoprotic acid with a strong base, the pH is approximately equal to:',
    options: [[3, 'The pH at the equivalence point']],
    main: [
      'At half-equivalence, half the initial acid has been converted stoichiometrically to its conjugate base. Their concentrations are approximately equal in the usual buffer treatment. Therefore pH ≈ pK<sub>a</sub> + log 1 = pK<sub>a</sub>. This allows an estimate of pK<sub>a</sub> from a titration curve.'
    ],
    feedback: {
      A: "Half-equivalence does not mean neutral pH. The pH is near the acid's pK<sub>a</sub> and would be near 7 only for an acid whose pK<sub>a</sub> is near 7.",
      B: 'pK<sub>b</sub> describes the conjugate base, whereas the acid-buffer pH equation uses pK<sub>a</sub>. At 25 °C they sum to about 14, but they are generally different numbers.',
      D: 'Half-equivalence and equivalence are different stages. At half-equivalence, appreciable acid and conjugate base coexist. At equivalence, the original acid has been neutralized stoichiometrically and conjugate-base hydrolysis determines the pH.'
    },
    bottom: 'For a weak monoprotic acid under the usual buffer approximation, half-equivalence gives [HA] ≈ [A⁻] and pH ≈ pK<sub>a</sub>.',
    points: [
      'Half-equivalence means half the initial acid has been neutralized stoichiometrically.',
      'Acid and conjugate base are approximately equal in the usual buffer treatment.',
      'The logarithmic ratio is approximately zero, so pH ≈ pK<sub>a</sub>, not the equivalence-point pH.'
    ],
    gone: [
      '14 - pKa',
      '14 − pKa',
      'At the half-equivalence point, pH = pKa, full stop.',
      'This makes the half-equivalence point useful for experimentally determining the Ka of an unknown acid.'
    ]
  },

  {
    q: 'Q54', id: 'chem-116', key: 'C',
    feedback: {
      A: 'HCN has the smallest listed K<sub>a</sub>, 6.2 × 10⁻¹⁰. It is the weakest of these acids under the comparison conditions, not the strongest.',
      B: "Acetic acid has K<sub>a</sub> = 1.8 × 10⁻⁵, smaller than HF's 6.8 × 10⁻⁴. Acetic acid is therefore weaker than HF in this comparison.",
      D: 'HClO has K<sub>a</sub> = 3.0 × 10⁻⁸, between the values for HCN and acetic acid. It remains well below HF, which has the largest listed K<sub>a</sub>.'
    },
    bottom: 'At the same temperature and in the same solvent, larger K<sub>a</sub> means stronger acid. Here HF > CH₃COOH > HClO > HCN; strongest among these choices does not mean fully dissociated.',
    points: [
      'Compare K<sub>a</sub> values under the same solvent and temperature conditions.',
      'HF has the largest listed K<sub>a</sub> and is therefore the strongest acid listed.',
      'Acid strength is different from solution concentration; all four listed acids are weak acids in the usual aqueous classification.'
    ],
    gone: ['the active species in bleach solutions', 'the largest Ka wins'],
    keep: ['Note that HF, while the strongest listed, is still a weak acid compared to strong acids like HCl (which fully dissociate).']
  },

  {
    q: 'Q55', id: 'chem-117', key: 'D',
    edits: [
      ['The relationship pH + pOH = 14 always holds at 25 degrees C.',
       'The relationship pH + pOH = 14 is used in this dilute-solution calculation at 25 degrees C.']
    ],
    feedback: {
      A: 'This reverses the sign of the exponent. With pOH = 4, [OH⁻] is approximately 10⁻⁴ M, not 10⁴ M. Use [OH⁻] ≈ 10^(−pOH).',
      B: '10⁻¹⁰ M is approximately the H⁺ concentration for pH 10. The question asks for OH⁻, found from pOH = 14 − 10 = 4.',
      C: '10⁻¹⁴ is the familiar numerical value of K<sub>w</sub> at 25 °C. In the dilute concentration approximation, it is the product [H⁺][OH⁻], not either ion concentration on its own. Dividing by [H⁺] ≈ 10⁻¹⁰ M gives [OH⁻] ≈ 10⁻⁴ M.'
    },
    points: [
      'At 25 °C, pOH ≈ 14 − pH = 4 for this calculation.',
      '[OH⁻] ≈ 10^(−4) M; the exponent is negative.',
      'Do not confuse hydroxide concentration with hydrogen ion concentration or with K<sub>w</sub>.'
    ],
    gone: [
      'always holds',
      'This is the value of Kw itself, not the [OH⁻].',
      'Confusing Kw with [OH⁻] is a common error'
    ],
    keep: ['If pH = 10, then pOH = 14 - 10 = 4.']
  },

  {
    q: 'Q56', id: 'chem-118', key: 'A',
    stem: 'How many moles of NaOH are required by the balanced equation for complete neutralization of 1 mol of H₃PO₄ to Na₃PO₄?',
    main: [
      'Phosphoric acid has three acidic protons. In the formal complete-neutralization equation, each mole of OH⁻ removes one mole of acidic protons, so one mole of H₃PO₄ requires three moles of NaOH: H₃PO₄ + 3NaOH → Na₃PO₄ + 3H₂O.',
      'This stoichiometric ratio does not mean that every aqueous titration curve displays three sharp steps. The third proton is much more weakly acidic, so its transition is not normally resolved clearly in a conventional dilute titration.'
    ],
    feedback: {
      B: 'Two moles of NaOH per mole of H₃PO₄ correspond to removing two protons, giving the formal hydrogen phosphate product Na₂HPO₄. The question specifies complete neutralization to Na₃PO₄.',
      C: 'One mole of NaOH per mole of H₃PO₄ removes one proton, giving the formal dihydrogen phosphate product NaH₂PO₄. Two further proton equivalents remain in the stated full-neutralization calculation.',
      D: 'H₃PO₄ has three acidic protons, so only three moles of NaOH are needed in the balanced complete-neutralization equation. Four moles would supply one mole of excess base.'
    },
    bottom: 'The balanced complete-neutralization equation requires 3 mol NaOH per mol H₃PO₄. It does not guarantee three clearly visible steps on an aqueous titration curve.',
    points: [
      'Triprotic H₃PO₄ has three acidic protons per molecule.',
      'Formal complete neutralization to Na₃PO₄ requires a 1:3 H₃PO₄:NaOH mole ratio.',
      'Stoichiometric proton count and the number of clearly resolved titration steps are different concepts.'
    ],
    gone: [
      'titration with a strong base produces three equivalence points',
      'The number of equivalence points equals the number of dissociable protons',
      'A polyprotic acid with n dissociable protons has n equivalence points in its titration curve.',
      'equivalence points will appear on its titration curve'
    ]
  },

  {
    q: 'Q57', id: 'chem-119', key: 'B',
    stem: 'At 25 °C, 50 mL of 0.10 M HCl is mixed with 50 mL of 0.10 M NaOH. Assuming ideal dilute-solution behavior, what is the resulting pH?',
    edits: [
      ['Moles of HCl = 0.10 x 0.050 = 0.005 mol. Moles of NaOH = 0.10 x 0.050 = 0.005 mol. They completely neutralize each other, leaving only NaCl and water. The solution is neutral with pH = 7.0.',
       'Moles of HCl = 0.10 x 0.050 = 0.005 mol. Moles of NaOH = 0.10 x 0.050 = 0.005 mol.'],
      ['Equal moles of a strong acid and strong base react completely, producing a neutral salt solution.',
       'HCl and NaOH react 1:1, and each sample contains 0.005 mol. Neither is left in stoichiometric excess. The remaining Na⁺ and Cl⁻ have negligible acid-base effects, so the solution is approximately neutral, pH 7 at 25 °C.']
    ],
    feedback: {
      A: 'pH 1 describes approximately 0.10 M HCl before mixing in this concentration model. The equal amount of NaOH neutralizes that acid, so the final solution does not retain its starting acidic pH.',
      C: 'pH 13 describes approximately 0.10 M NaOH before mixing at 25 °C. Its hydroxide is neutralized by the equal amount of HCl, leaving no excess strong base.',
      D: 'pH 0 would correspond to about 1 M H⁺ in the simple concentration approximation. No acid remains in stoichiometric excess here; the mixture is approximately neutral.'
    },
    bottom: 'Equal stoichiometric amounts of HCl and NaOH leave a nearly neutral NaCl solution, with pH about 7 at 25 °C.',
    points: [
      'Calculate moles before deciding whether acid or base remains in excess.',
      'Both samples contain 0.005 mol and react in a 1:1 ratio.',
      'The final solution is approximately neutral at 25 °C; pH 7 is not a temperature-independent definition of neutrality.'
    ],
    gone: [
      'They completely neutralize each other, leaving only NaCl and water.',
      'both neutral species - giving pH = 7.0',
      'Complete neutralization of equal moles of strong acid and strong base gives pH = 7.'
    ]
  },

  {
    q: 'Q58', id: 'chem-120', key: 'A',
    edits: [
      ['NH4+ + H<sub>2</sub>O -> NH3 + H<sub>3</sub>O+', 'NH4+ + H<sub>2</sub>O ⇌ NH3 + H<sub>3</sub>O+'],
      ['Cl- is the conjugate base of strong acid HCl and does not hydrolyze.',
       'Cl- is the conjugate base of the strong acid HCl and its effect on pH is negligible.']
    ],
    feedback: {
      B: 'Na⁺ and Cl⁻ have negligible acid-base effects in water under these conditions, so NaCl gives an approximately neutral solution rather than the acidic solution requested.',
      C: 'K⁺ and NO₃⁻ have negligible acid-base effects in water under these conditions. KNO₃ therefore gives an approximately neutral solution, unlike NH₄Cl.',
      D: 'CO₃²⁻ accepts a proton from water: CO₃²⁻ + H₂O ⇌ HCO₃⁻ + OH⁻. The hydroxide produced makes sodium carbonate solution basic, not acidic.'
    },
    points: [
      'NH₄⁺ is the conjugate acid of the weak base NH₃.',
      'It transfers a proton to water at equilibrium, increasing H₃O⁺ and making the solution acidic.',
      'Salt-solution pH depends on the acid-base behavior of the dissolved ions; carbonate instead produces OH⁻.'
    ],
    gone: ['does not hydrolyze', 'hydrolyses'],
    keep: ['NaCl and KNO3 are neutral salts (strong acid + strong base).']
  },

  {
    q: 'Q59', id: 'chem-121', key: 'C',
    edits: [
      ['At the equivalence point, moles of acid = moles of base.',
       'For this 1:1 HCl/NaOH reaction, the equivalence point is reached when moles of acid = moles of base.']
    ],
    feedback: {
      A: '12.5 mL of 0.20 M NaOH contains 0.00250 mol, only one-quarter of the 0.0100 mol HCl present. It cannot reach equivalence.',
      B: '25.0 mL of 0.20 M NaOH contains 0.00500 mol, only half the HCl amount. The base is half as concentrated as the acid, so twice the acid volume is required.'
    },
    bottom: 'Use the balanced equation to match stoichiometric amounts. HCl and NaOH react 1:1, so 0.010 mol HCl requires 50.0 mL of 0.20 M NaOH.',
    points: [
      'HCl amount = 0.40 mol/L × 0.0250 L = 0.0100 mol.',
      'The 1:1 reaction requires the same amount of NaOH.',
      'Required volume = 0.0100/0.20 = 0.0500 L = 50.0 mL.'
    ],
    keep: ['This volume provides 20.0 mmol of NaOH - double the amount of HCl.']
  },

  {
    q: 'Q60', id: 'chem-122', key: 'B',
    stem: 'A buffer contains 0.30 M CH₃COOH and 0.60 M CH₃COONa. Using the concentration form of the Henderson-Hasselbalch equation with pKa = 4.74, what is its approximate pH?',
    edits: [
      ['When the conjugate base concentration exceeds the acid concentration, the pH is above pKa, making the buffer slightly more basic.',
       'The larger acetate concentration raises the pH above pK<sub>a</sub>, but the estimated pH of 5.04 is still acidic under ordinary aqueous conditions.']
    ],
    feedback: {
      A: '4.44 results from reversing the ratio: 4.74 + log(0.30/0.60). The equation uses conjugate base divided by weak acid, so the required ratio is 2, not 0.5.',
      C: 'pH would be approximately pK<sub>a</sub> = 4.74 if the acid and conjugate base had equal concentrations in this model. Here acetate is twice as concentrated, so the logarithmic term is positive.'
    },
    bottom: 'For the stipulated concentration model, pH ≈ 4.74 + log 2 = 5.04. More conjugate base than acid raises pH above pK<sub>a</sub> without necessarily making the solution alkaline.',
    points: [
      'The Henderson-Hasselbalch ratio is [conjugate base]/[weak acid].',
      'Here the ratio is 2 and log 2 ≈ 0.30, giving pH ≈ 5.04.',
      'This buffer remains acidic; pH above pK<sub>a</sub> is not the same as pH above neutral.'
    ],
    gone: ['making the buffer slightly more basic'],
    keep: ['4.74 + log(0.60/0.30) = 4.74 + log(2) = 4.74 + 0.30 = 5.04.']
  }
];
