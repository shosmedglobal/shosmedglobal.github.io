/**
 * Chemistry review batch 2, specs for Q1-Q10 (chem-63..chem-72).
 * Q9 (chem-71) is absent: the review orders it kept byte-identical.
 * These items carry five educational points each, so only the specified
 * in-place point repairs are made and expectPoints stays 5.
 *
 * Spec shape is documented at the top of scripts/apply-chem-review-batch2.js.
 */
'use strict';

module.exports = [
  {
    q: 'Q1', id: 'chem-63', key: 'D', expectPoints: 5,
    stem: 'At the same temperature and pressure, O₂ (M = 32 g/mol) and He (M = 4 g/mol) effuse separately through identical tiny openings into a vacuum. Which gas effuses faster, and by what factor?',
    edits: [
      ['Equal rates would only occur for gases with equal molar masses.',
       'Under the same temperature, pressure and opening conditions, equal effusion rates would require equal molar masses.']
    ],
    pointEdits: [
      [3, 'At a given temperature, ideal gas particles have the same average translational kinetic energy, so lighter particles move faster on average.'],
      [5, 'Effusion is escape through a tiny opening; diffusion is spreading through space or another gas. Diffusion also depends on collisions and concentration gradients, so the simple effusion formula is not a universal diffusion-rate equation.']
    ],
    gone: [
      'Equal rates would only occur for gases with equal molar masses.',
      'both follow the same inverse-square-root mass dependence',
      'all gases share the same average kinetic energy'
    ],
    keep: ["Graham's law states rate1/rate2 = sqrt(M2/M1)", 'sqrt(8) = 2.83']
  },

  {
    q: 'Q2', id: 'chem-64', key: 'C', expectPoints: 5,
    edits: [
      ['For water, this occurs at 273.16 K and 611.73 Pa.',
       'For water, this occurs at approximately 273.16 K and 611 Pa.'],
      ['This point is used as a fundamental fixed point for the Kelvin temperature scale.',
       'The water triple point historically defined the kelvin and remains useful for temperature calibration. Since 2019, the kelvin has been defined using a fixed value of the Boltzmann constant.']
    ],
    gone: ['611.73', 'a fundamental fixed point for the Kelvin temperature scale'],
    keep: ['the triple point of water was long used to define the kelvin', 'Boltzmann constant']
  },

  {
    q: 'Q3', id: 'chem-65', key: 'A', expectPoints: 5,
    stem: 'A fixed amount of ideal gas occupies 5.0 L at 0 °C and 1 atm. Approximately what volume will it occupy at 2.0 atm and 273 °C?',
    main: [
      'Use P<sub>1</sub>V<sub>1</sub>/T<sub>1</sub> = P<sub>2</sub>V<sub>2</sub>/T<sub>2</sub> with temperatures in kelvin. T<sub>1</sub> = 273.15 K and T<sub>2</sub> = 546.15 K, so V<sub>2</sub> = (1 × 5.0 × 546.15)/(2.0 × 273.15) ≈ 5.0 L. The absolute temperature approximately doubles while the pressure doubles, so the effects nearly cancel.'
    ],
    feedback: {
      B: 'Halving the volume to 2.5 L would account for doubling pressure while ignoring the temperature rise. The absolute temperature also approximately doubles, so the final volume is about 5.0 L.'
    },
    edits: [
      ['Both changes must be considered: doubling T tends to double V, but doubling P tends to halve V, so net effect is V stays at 5.0 L.',
       'Both changes must be considered: the absolute temperature approximately doubles, which tends to double V, while doubling P tends to halve V, so the two effects nearly cancel and V stays at about 5.0 L.'],
      ['The correct answer accounts for both effects simultaneously.',
       'The correct answer accounts for both effects simultaneously; because the absolute temperature only approximately doubles, the volume returns to about 5.0 L.']
    ],
    pointEdits: [
      [2, 'Use kelvin: 0 °C = 273.15 K and 273 °C = 546.15 K.'],
      [3, 'The absolute temperature approximately doubles and the pressure doubles, so their opposing effects nearly cancel; the answer rounds to 5.0 L.'],
      [5, 'Celsius temperatures cannot be used in gas-law ratios. Here the initial 0 °C would even cause division by zero.']
    ],
    gone: [
      '2730/546',
      'Temperatures must be absolute: 0 °C is 273 K and 273 °C is 546 K.',
      'the two effects cancel exactly',
      'Using Celsius would imply a far larger temperature ratio',
      'Since T2 = 546K = 2 x 273K'
    ],
    keep: [
      'The combined gas law P₁V₁/T₁ = P₂V₂/T₂ handles simultaneous changes in pressure and temperature.',
      'Spotting that competing changes cancel is faster and safer than grinding through the arithmetic.'
    ]
  },

  {
    q: 'Q4', id: 'chem-66', key: 'B', expectPoints: 5,
    stem: 'For an ideal gas, what happens to the average translational kinetic energy per particle when the absolute temperature is doubled?',
    edits: [
      ['The average kinetic energy of gas molecules is given by KE<sub>avg</sub> = (3/2)kT',
       'The average translational kinetic energy per particle is given by KE<sub>avg</sub> = (3/2)kT'],
      ['Since KE is directly proportional to T, doubling T doubles KE.',
       'Since this energy is directly proportional to T, doubling T doubles it.'],
      ['This relationship holds for all ideal gases regardless of their identity or molar mass.',
       'This relationship for the average translational kinetic energy holds for all ideal gases regardless of their identity or molar mass.'],
      ['Average kinetic energy of gas molecules is directly proportional to absolute temperature (KE<sub>avg</sub> = 3/2 kT). If temperature changes, kinetic energy must change proportionally.',
       'Average translational kinetic energy is directly proportional to absolute temperature (KE<sub>avg</sub> = 3/2 kT). If temperature changes, this energy must change proportionally.'],
      ['Kinetic energy is directly (linearly) proportional to absolute temperature, not to the square of temperature. Doubling absolute temperature doubles kinetic energy.',
       'Translational kinetic energy is directly (linearly) proportional to absolute temperature, not to the square of temperature. Doubling absolute temperature doubles this energy.'],
      ['1.41 (which is the square root of 2) relates to molecular speed, not kinetic energy.',
       '1.41 (which is the square root of 2) relates to molecular speed, not to translational kinetic energy.'],
      ['But kinetic energy, being proportional to v-squared, doubles.',
       'But the average translational kinetic energy, being proportional to v², doubles.']
    ],
    pointEdits: [
      [3, 'The mean translational kinetic energy depends on temperature, not on particle identity or molar mass.']
    ],
    bottom: 'The average translational kinetic energy per ideal-gas particle is (3/2)kT, so doubling kelvin temperature doubles this energy.',
    gone: [
      'temperature is, in effect, a measure of average molecular kinetic energy',
      'Average kinetic energy of gas molecules is directly proportional to absolute temperature'
    ],
    keep: ['v<sub>rms</sub> = sqrt(3RT/M)', 'The temperature must be absolute - going from 10 °C to 20 °C is nowhere near a doubling.']
  },

  {
    q: 'Q5', id: 'chem-67', key: 'D', expectPoints: 5,
    feedback: {
      B: 'The stem gives no freezing-point information for this liquid. Comparing its vapor pressure with external pressure tells us whether it is at its boiling point, not whether it is freezing.',
      C: 'The critical point is the endpoint of liquid-vapor coexistence, where the two phases become indistinguishable. The supplied pressures instead show that this liquid has not reached its boiling point under the stated external pressure.'
    },
    pointEdits: [
      [5, 'Evaporation can occur at the surface below the boiling point. Boiling involves vapor bubbles forming throughout the liquid when its vapor pressure reaches the surrounding pressure.']
    ],
    gone: [
      'At 80 degrees C, the liquid is far above freezing and very much in the liquid state.',
      'has nothing to do with comparing vapor pressure to external pressure at an arbitrary temperature',
      'Evaporation happens from the surface at any temperature'
    ],
    keep: ['A liquid boils when its vapor pressure equals the external (atmospheric) pressure.']
  },

  {
    q: 'Q6', id: 'chem-68', key: 'A', expectPoints: 5,
    stem: 'Assuming ideal-gas behavior, how many moles of gas are in an 8.21 L container at 2.0 atm and 200 K? (R = 0.0821 L·atm·mol⁻¹·K⁻¹)',
    feedback: {
      C: 'At the given volume and temperature, 2.0 mol would exert 4.0 atm, twice the stated pressure. Using n = PV/(RT) with 2.0 atm gives 1.0 mol.',
      D: 'At the given volume and temperature, 4.0 mol would exert 8.0 atm, not 2.0 atm. Both the numerator and denominator here equal 16.42, giving n = 1.0 mol.'
    },
    pointEdits: [
      [5, 'For a fixed amount of ideal gas, holding temperature, pressure or volume constant gives the familiar individual gas laws.']
    ],
    gone: [
      'Getting 2.0 might result from forgetting to divide by temperature',
      'might arise from multiplying pressure and volume but forgetting to divide by RT entirely',
      "Boyle's, Charles's, and Gay-Lussac's laws are all special cases"
    ],
    keep: ['n = PV/(RT) = (2.0 x 8.21)/(0.0821 x 200) = 16.42/16.42 = 1.0 mol']
  },

  {
    q: 'Q7', id: 'chem-69', key: 'B', expectPoints: 5,
    feedback: {
      C: 'High temperature reduces the relative importance of attractive forces, but high pressure can still produce substantial deviations because particles occupy space. The size of the deviation depends on the gas and the actual conditions.',
      D: 'Low temperature increases the relative importance of attractions, but low pressure keeps particles farther apart. The combination of low temperature and high pressure more strongly challenges the ideal model; no fixed degree of deviation follows from these labels alone.'
    },
    pointEdits: [
      [3, 'At lower temperature, attractive interactions are more important relative to translational kinetic energy. Attractions can lower pressure below the ideal prediction, while short-range repulsion and excluded volume can dominate under strong compression.']
    ],
    gone: [
      'resulting in moderate deviation',
      'These competing effects result in moderate deviation.',
      'intermolecular attractions have time to act'
    ],
    keep: [
      'Real gases deviate most from ideal behaviour at low temperature and high pressure.',
      'Gases behave most ideally at high temperature and low pressure, where molecules are fast-moving and far apart.'
    ]
  },

  {
    q: 'Q8', id: 'chem-70', key: 'D', expectPoints: 5,
    edits: [
      ['0.70 atm is the mole fraction, not the partial pressure.',
       '0.70 is the dimensionless mole fraction; it is not itself a pressure of 0.70 atm.']
    ],
    gone: ['0.70 atm is the mole fraction, not the partial pressure.'],
    keep: ['A mole fraction is always between 0 and 1 and has no units']
  },

  {
    q: 'Q10', id: 'chem-72', key: 'A', expectPoints: 5,
    stem: 'Assuming ideal-gas behavior, what is the density of CO₂ (M = 44 g/mol) at 1 atm and 273 K? (R = 0.0821 L·atm·mol⁻¹·K⁻¹)',
    feedback: {
      B: 'The density is 44/(0.0821 × 273) ≈ 1.96 g/L. A density of 0.96 g/L under these conditions would correspond to a molar mass of about 21.5 g/mol, not the given 44 g/mol.'
    },
    edits: [
      ['At STP, one mole of any ideal gas occupies 22.4 L, so the density equals the molar mass divided by 22.4 L/mol.',
       'An ideal gas occupies approximately 22.4 L/mol at 1 atm and 273 K, so the density equals the molar mass divided by 22.4 L/mol.'],
      ['with molar mass about 66 g/mol at STP.', 'with molar mass about 66 g/mol at 1 atm and 273 K.'],
      ['C(12) + 2O(32) = 44.', '12 + 2(16) = 44 g/mol.'],
      ['At STP (1 atm, 273 K), one mole of ideal gas occupies 22.4 L, not 10 L.',
       'At 1 atm and 273 K, one mole of an ideal gas occupies approximately 22.4 L, not 10 L.']
    ],
    pointEdits: [
      [3, 'An ideal gas occupies approximately 22.4 L/mol at 1 atm and 273 K, so its density is the molar mass divided by 22.4.']
    ],
    gone: [
      'At STP, any gas occupies 22.4 L/mol',
      'At STP one mole of any ideal gas occupies 22.4 L',
      'C(12) + 2O(32)'
    ],
    keep: ['d = PM/(RT) = (1.0 x 44)/(0.0821 x 273) = 44/22.4 = 1.96 g/L']
  }
];
