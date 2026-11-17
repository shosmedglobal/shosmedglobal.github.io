/**
 * Chemistry review batch 2, specs for Q31-Q40 (chem-93..chem-102).
 *
 * This run carries most of the "state the model" repairs: ppm as an
 * approximation under a stated density (Q31), explicit ideal van't Hoff
 * factors (Q32, Q33, Q37), solubility GUIDELINES rather than absolutes
 * (Q35, Q40), and the replacement of Q38's three copied distractor
 * paragraphs and Q40's three copied/mangled ones.
 *
 * Edits that touch the main explanation are listed before edits that touch
 * feedback, because the harness resolves each anchor against the section it
 * currently lives in and rejects one that would match in two sections.
 */
'use strict';

module.exports = [
  {
    q: 'Q31', id: 'chem-93', key: 'C',
    stem: 'A dilute water sample, with density approximately 1.0 g/mL, contains 5 mg of fluoride ion per liter of solution. Approximately what is its concentration in ppm by mass?',
    edits: [
      ['For dilute aqueous solutions, 1 L of water weighs approximately 1,000,000 mg (1 kg = 10<sup>6</sup> mg). Therefore ppm = mg solute / L solution = 5/1 = 5 ppm.',
       'Mass-based ppm means milligrams of solute per kilogram of solution. With the stated density, one liter of solution has a mass of about one kilogram, so 5 mg/L corresponds to approximately 5 mg/kg = 5 ppm.'],
      ['For dilute aqueous solutions, 1 ppm = 1 mg/L (since water density is approximately 1 g/mL). With 5 mg/L of fluoride, the concentration is 5 ppm, not 0.5. You would get 0.5 ppm if the concentration were 0.5 mg/L.',
       'For dilute aqueous solutions with density close to 1 g/mL, 1 mg/L corresponds to approximately 1 ppm by mass. With 5 mg/L of fluoride, the concentration is about 5 ppm, not 0.5. You would get about 0.5 ppm if the concentration were 0.5 mg/L.'],
      ['50 ppm would mean 50 mg/L, which is 10 times the actual concentration. The direct conversion for dilute aqueous solutions is 1 mg/L = 1 ppm, making 5 mg/L = 5 ppm.',
       '50 ppm would correspond to about 50 mg/L, ten times the actual concentration. Under the stated density assumption 1 mg/L is approximately 1 ppm by mass, so 5 mg/L is about 5 ppm.'],
      ['At 5 mg/L, the concentration is simply 5 ppm. Remember: for water, ppm and mg/L are interchangeable.',
       'At 5 mg/L, the concentration is approximately 5 ppm. The numerical equivalence of mg/L and mass-based ppm is an approximation for dilute aqueous solutions with density close to 1 kg/L.']
    ],
    points: [
      'One ppm by mass equals one milligram of solute per kilogram of solution.',
      'For this dilute aqueous sample, one liter of solution weighs approximately one kilogram.',
      'Thus 5 mg/L is approximately 5 ppm; mg/L and ppm are not universally interchangeable.'
    ],
    gone: ['ppm and mg/L are interchangeable', '1 mg/L = 1 ppm'],
    keep: ['Parts per million is commonly used for very low concentrations in environmental and water chemistry.']
  },

  {
    q: 'Q32', id: 'chem-94', key: 'C',
    stem: 'At 1 atm, an aqueous solution of a nonvolatile, non-electrolyte solute boils at 100.52 °C. Using the ideal dilute-solution approximation and Kb = 0.52 °C·kg/mol, what is its molality?',
    edits: [
      ['Boiling point elevation is a colligative property that depends only on the number of solute particles, not their identity.',
       'In this approximation, ΔT<sub>b</sub> = iK<sub>b</sub>m. The non-electrolyte has i = 1, so m = 0.52/0.52 = 1.0 mol/kg.']
    ],
    bottom: "For this nonvolatile non-electrolyte in the ideal dilute model, ΔT<sub>b</sub> = K<sub>b</sub>m. Electrolytes require an appropriate van't Hoff factor.",
    points: [
      'At 1 atm, the elevation above pure water is 100.52 − 100.00 = 0.52 °C.',
      'A non-electrolyte has ideal particle factor i = 1.',
      'Molality = ΔT<sub>b</sub>/K<sub>b</sub> = 1.0 mol/kg for the stated model.'
    ],
    gone: ['depends only on the number of solute particles, not their identity'],
    keep: ['m = ΔT<sub>b</sub> / Kb = 0.52 / 0.52 = 1.0 m.']
  },

  {
    q: 'Q33', id: 'chem-95', key: 'D',
    stem: 'Using ideal particle counts, and assuming complete salt dissociation without further reaction, which of the following aqueous solutions would have the lowest freezing point?',
    edits: [
      ['giving i=4 and the greatest depression.', 'giving an ideal i = 4 and the greatest depression.'],
      ['NaCl gives i=2, CaCl2 gives i=3, glucose gives i=1. More particles means a lower freezing point.',
       'In this ideal model NaCl gives i = 2, CaCl2 gives i = 3 and glucose gives i = 1. More particles means a lower freezing point. Real electrolyte solutions need not have these exact effective particle factors because ions interact.'],
      ["Glucose does not dissociate (van't Hoff factor i = 1)", "Glucose does not dissociate (ideal van't Hoff factor i = 1)"],
      ['NaCl dissociates into Na+ and Cl- (i = 2)', 'NaCl dissociates into Na+ and Cl- (ideal i = 2)'],
      ['CaCl2 dissociates into Ca2+ and 2 Cl- (i = 3)', 'CaCl2 dissociates into Ca2+ and 2 Cl- (ideal i = 3)'],
      ['AlCl3 produces even more particles (i = 4)', 'AlCl3 produces even more particles (ideal i = 4)']
    ],
    bottom: 'At equal molality in the stated ideal model, the solute giving the most particles produces the greatest freezing-point depression.',
    points: [
      'The ideal freezing-point depression is ΔT<sub>f</sub> = iK<sub>f</sub>m.',
      'The stipulated particle factors are 1 for glucose, 2 for NaCl, 3 for CaCl₂ and 4 for AlCl₃.',
      'At equal molality, ideal AlCl₃ has the largest i × m and therefore the lowest freezing point.'
    ],
    keep: ['Real electrolyte solutions need not have these exact effective particle factors because ions interact.']
  },

  {
    q: 'Q34', id: 'chem-96', key: 'D',
    stem: 'Using the ideal-solution approximation, what is the osmotic pressure of a 0.30 M glucose solution at 25 °C (298 K)? (R = 0.0821 L·atm·mol⁻¹·K⁻¹)',
    feedback: {
      C: '14.7 atm is approximately twice the calculated value. It would result from using i = 2, but dissolved glucose remains as molecules and uses i = 1 in this model. Therefore Π = 0.30 × 0.0821 × 298 ≈ 7.34 atm.'
    },
    bottom: 'For an ideal non-electrolyte solution, Π = MRT, with temperature in kelvin and units consistent with R.',
    points: [
      'Osmotic pressure is the opposing pressure needed to prevent net solvent flow through a suitable semipermeable membrane.',
      'In the ideal model, Π = iMRT; glucose uses i = 1.',
      'Substitution gives Π ≈ 7.34 atm; molarity uses liters of solution.'
    ],
    gone: ['approximately 1 atmosphere in kPa converted incorrectly'],
    keep: ['pi = MRT = 0.30 x 0.0821 x 298 = 7.34 atm.']
  },

  {
    q: 'Q35', id: 'chem-97', key: 'C',
    edits: [
      ['Most sulfates are soluble, but BaSO4, PbSO4, and SrSO4 are notable exceptions. Sodium, potassium, and ammonium salts are always soluble.',
       'BaSO₄ is very sparingly soluble in water. It is a familiar exception to the general solubility of many sulfates; PbSO₄ and SrSO₄ are other examples. The sodium, potassium and ammonium salts listed here are soluble.']
    ],
    feedback: {
      A: 'NaCl dissolves readily in water. Sodium salts are generally classified as soluble in the introductory solubility guidelines, and NaCl is not one of the poorly soluble chloride exceptions.',
      B: 'KNO₃ is soluble in water. Both the usual potassium-salt guideline and the nitrate-salt guideline identify it as a soluble salt.',
      D: 'NH₄Cl is soluble in water. Common ammonium salts are generally soluble, and this chloride does not behave like the poorly soluble chlorides of silver or lead.'
    },
    bottom: 'BaSO₄ is very sparingly soluble; many other sulfates are soluble. Solubility guidelines describe common patterns, and "insoluble" does not mean absolutely no dissolution.',
    points: [
      'BaSO₄ is a common sparingly soluble sulfate.',
      'NaCl, KNO₃ and NH₄Cl are soluble under the usual aqueous conditions used in this question.',
      'Qualitative solubility rules help predict precipitation; poorly soluble salts still dissolve to a limited extent.'
    ],
    gone: [
      'are always soluble',
      'all nitrate (NO3-) salts are soluble without exception',
      'All potassium (K+) salts are soluble'
    ],
    keep: ['BaSO4 is so insoluble that it is used as a contrast agent in medical imaging of the gastrointestinal tract.']
  },

  {
    q: 'Q36', id: 'chem-98', key: 'A',
    stem: "At constant temperature, Henry's law states that the equilibrium solubility of a gas in a liquid is:",
    edits: [
      ["Henry's law states C = kH x P, where C is the concentration of dissolved gas, kH is Henry's law constant, and P is the partial pressure of the gas. Higher pressure forces more gas molecules into solution.",
       "At a fixed temperature, Henry's law can be written C = k<sub>H</sub> × P for a sufficiently dilute dissolved gas, where P is that gas's partial pressure above the liquid. The constant depends on the gas, solvent and temperature. Raising that partial pressure raises the equilibrium dissolved concentration."],
      ['When you increase the pressure of a gas above a liquid, more gas dissolves.',
       "Raising the gas's partial pressure at unchanged temperature dissolves more gas."],
      ["Henry's law states that solubility is directly proportional to partial pressure: S = kH x P. Higher pressure forces more gas molecules into solution.",
       "Henry's law states that solubility is directly proportional to the gas's partial pressure at unchanged temperature: C = k<sub>H</sub> × P. Raising that partial pressure forces more gas molecules into solution."]
    ],
    feedback: {
      B: "Many gases become less soluble as temperature rises, but this does not establish a universal 1/T law. Henry's proportionality concerns gas partial pressure while temperature is held constant."
    },
    bottom: "At fixed temperature, C = k<sub>H</sub>P relates equilibrium dissolved-gas concentration to that gas's partial pressure; the constant must be defined consistently.",
    points: [
      "Henry's law is an equilibrium relationship at a specified temperature.",
      "In the C = k<sub>H</sub>P convention, dissolved concentration is proportional to the gas's own partial pressure.",
      'The constant depends on the gas, solvent and temperature; temperature changes require separate consideration.'
    ],
    gone: ['S = kH x P', 'Higher pressure forces more gas molecules into solution'],
    keep: ['This principle explains why carbonated beverages release CO2 when opened (pressure decreases).']
  },

  {
    q: 'Q37', id: 'chem-99', key: 'C',
    stem: "Using an ideal van't Hoff factor i = 2, what boiling-point change is predicted when 1.0 mol NaCl is dissolved in 1.0 kg water? (Kb = 0.52 °C·kg/mol)",
    edits: [
      ["NaCl dissociates into Na+ and Cl- ions, so the van't Hoff factor i = 2.",
       "NaCl dissociates into Na+ and Cl- ions, so the stipulated ideal van't Hoff factor is i = 2."],
      ["For electrolytes, you must account for dissociation by multiplying by the van't Hoff factor.",
       "For electrolytes, you must account for dissociation by multiplying by the van't Hoff factor. This is a model prediction; a real 1 m electrolyte solution need not have exactly i = 2."],
      ['But NaCl dissociates into Na+ and Cl- (i = 2), doubling the effective particle concentration.',
       'But with the stipulated ideal factor i = 2 for NaCl, the effective particle concentration is doubled.']
    ],
    feedback: {
      B: 'For the nonvolatile NaCl solute in this model, the boiling point increases rather than decreases. At a given temperature, the solvent vapor pressure is lower, so a higher temperature is needed to reach the same external pressure.',
      D: 'With m = 1.0 mol/kg and the stipulated i = 2, the predicted elevation is 2 × 0.52 × 1.0 = 1.04 °C. An unchanged boiling point does not follow from this model.'
    },
    bottom: "The ideal estimate is ΔT<sub>b</sub> = iK<sub>b</sub>m = 1.04 °C. The effective van't Hoff factor of a real electrolyte solution can differ from the simple ion count.",
    points: [
      'The salt molality is 1.0 mol/kg.',
      'The question stipulates ideal i = 2, representing one Na⁺ and one Cl⁻ per formula unit.',
      'The predicted boiling-point elevation is 1.04 °C; nonvolatile solute lowers solvent vapor pressure in this model.'
    ],
    gone: [
      'Adding any solute to water increases the boiling point, never decreases it.',
      'Dissolving any solute in water always changes the boiling point'
    ],
    keep: ['2 x 0.52 x 1.0 = 1.04 degrees C']
  },

  {
    q: 'Q38', id: 'chem-100', key: 'D',
    main: [
      'In the ideal dilute-solution treatment, colligative effects depend on dissolved-particle concentration or mole fraction rather than on the particles\' chemical identity. These effects include boiling-point elevation, freezing-point depression, solvent vapor-pressure lowering and osmotic pressure. Color instead depends on which species absorb visible light. Its intensity can also change with concentration, so "depends on concentration" does not by itself make a property colligative.'
    ],
    feedback: {
      A: 'Boiling-point elevation is colligative. In the dilute model, ΔT<sub>b</sub> = iK<sub>b</sub>m relates it to the concentration of dissolved particles for a given solvent.',
      B: 'Freezing-point depression is colligative. In the dilute model, ΔT<sub>f</sub> = iK<sub>f</sub>m, so the particle concentration determines the predicted change for a given solvent.',
      C: 'Osmotic pressure is colligative. For an ideal dilute solution, Π = iMRT depends on dissolved-particle concentration and temperature.'
    },
    bottom: 'Color depends on the absorbing species and can also depend on concentration. Colligative properties are the specific particle-count effects described by the ideal solution model.',
    points: [
      'The standard colligative effects are vapor-pressure lowering, boiling-point elevation, freezing-point depression and osmotic pressure.',
      'Their simple formulas describe ideal or sufficiently dilute solutions.',
      'Color depends on the identity of light-absorbing species; concentration can affect its intensity without making it colligative.'
    ],
    gone: [
      'These include boiling point elevation, freezing point depression, vapor pressure lowering, and osmotic pressure.',
      'Color depends on the specific identity of the solute (its electronic transitions), not on the number of particles.'
    ]
  },

  {
    q: 'Q39', id: 'chem-101', key: 'D',
    stem: "Using the ideal dilute-solution approximation, estimate the freezing point after 6.0 g of urea (M = 60 g/mol, non-electrolyte) is dissolved in 250 g of water. Take pure water's freezing point as 0 °C and Kf = 1.86 °C·kg/mol.",
    edits: [
      ['Urea is a non-electrolyte so i = 1 and no correction is needed.',
       'Urea is a non-electrolyte so the ideal particle factor is i = 1.'],
      ['This is exactly half of the correct answer.', 'This is approximately half of the correct answer.']
    ],
    feedback: {
      A: 'A depression of 3.72 °C would require 2.0 mol/kg for a non-electrolyte. Here the molality is only (6.0/60)/0.250 = 0.40 mol/kg, giving a depression of 0.744 °C.',
      B: 'A freezing point near −1.49 °C results from using i = 2 with the correct molality. Urea is a non-electrolyte and uses i = 1 in this model, so the predicted freezing point is −0.74 °C.'
    },
    bottom: 'Using i = 1, ΔT<sub>f</sub> = K<sub>f</sub>m = 0.744 °C. Subtracting this depression from 0 °C gives approximately −0.74 °C.',
    points: [
      'The solution contains 0.10 mol urea in 0.250 kg water, so m = 0.40 mol/kg.',
      'Urea uses ideal i = 1, giving ΔT<sub>f</sub> = 1.86 × 0.40 = 0.744 °C.',
      'Freezing-point depression is subtracted from the pure-solvent freezing point, giving approximately −0.74 °C.'
    ],
    gone: ['no correction is needed', 'This is exactly half of the correct answer.'],
    keep: ['Freezing point depression = Kf x m = 1.86 x 0.40 = 0.744 degrees C.']
  },

  {
    q: 'Q40', id: 'chem-102', key: 'A',
    stem: 'According to standard qualitative solubility guidelines for water at room temperature, which of the following salts is classified as soluble?',
    edits: [
      ['Sodium salts are always soluble regardless of the anion. PbCl2 and AgCl are among the exceptions to the general solubility of chlorides. CaCO3 is insoluble as most carbonates are insoluble (except those of Group 1 and ammonium).',
       'Na₂S is classified as soluble under the usual guideline for common sodium salts. AgCl and PbCl₂ are poorly soluble chloride exceptions at room temperature, while CaCO₃ is a poorly soluble carbonate. These classifications are useful approximations, not statements of absolutely zero solubility.']
    ],
    feedback: {
      B: 'AgCl is very sparingly soluble in water and is a familiar exception to the general solubility of chlorides. It therefore is not the salt classified as soluble here.',
      C: 'PbCl₂ is sparingly soluble in cold or room-temperature water and is listed as a chloride exception. Its solubility increases substantially on heating, which is why the temperature context matters.',
      D: 'CaCO₃ is poorly soluble in water under the stated conditions. Common carbonates other than the usual Group 1 and ammonium examples are generally classified as poorly soluble.'
    },
    bottom: 'Na₂S follows the usual soluble-sodium-salt guideline. AgCl, PbCl₂ and CaCO₃ are classified as poorly soluble under the stated conditions.',
    points: [
      'Common sodium salts such as Na₂S are generally soluble in water.',
      'AgCl and PbCl₂ are familiar chloride exceptions, while CaCO₃ is a poorly soluble carbonate.',
      'Solubility depends on conditions, including temperature; the guidelines do not mean that poorly soluble salts never dissolve.'
    ],
    gone: [
      'Sodium salts are always soluble regardless of the anion.',
      'Pbcl2 and agcl are among the exceptions',
      'Caco3 is insoluble as most carbonates are insoluble',
      'All sodium, potassium, and ammonium salts are soluble in water.'
    ],
    keep: ['The solubility rules are essential for predicting whether a precipitate forms in a double replacement reaction.']
  }
];
