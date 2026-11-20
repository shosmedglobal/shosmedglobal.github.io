/* Physics FINAL-block edit specs, display Q25-Q32. See phys-b5-edits-a.js for
   the conventions. */
'use strict';
module.exports = [

  { q: 'Q25', id: 'phys-264', key: 'B',
    fb: [
      ['A', ' At 0.5 m, the 60 N weight supplies only 30 N·m of clockwise torque. The other side supplies 60 N·m.'],
      ['C', ' Equal distances would balance equal forces. Here the right-hand force is larger, so it must be closer to the pivot; 1.5 m would give 90 N·m.'],
      ['D', ' At 2.0 m, the right-hand torque would be 60 × 2.0 = 120 N·m, twice the 60 N·m torque on the left.']
    ] },

  { q: 'Q26', id: 'phys-265', key: 'C',
    stemWas: 'A 60 kg adult sits 1.5 m from the fulcrum of a seesaw. At what distance from the fulcrum should a 30 kg child sit to balance the seesaw? (g = 10 m/s<sup>2</sup>)',
    stem: "A 60 kg adult sits 1.5 m from the fulcrum of a horizontal seesaw. The seesaw's own weight produces no net torque about the fulcrum. How far from the fulcrum should a 30 kg child sit on the opposite side to balance it? Use g = 10 m/s<sup>2</sup>.",
    fb: [
      ['A', " At 0.75 m, the child provides only 30 × 10 × 0.75 = 225 N·m, compared with the adult's 900 N·m. The lighter person needs a longer lever arm."],
      ['B', " Equal distances would balance equal masses. At 1.5 m, the child produces only half the adult's torque."],
      ['D', " At 4.5 m, the child produces 1350 N·m, greater than the adult's 900 N·m. The required distance is 900/(30 × 10) = 3.0 m."]
    ] },

  { q: 'Q27', id: 'phys-266', key: 'B',
    stemWas: 'How long must a current of 10 A flow through a solution of AgNO<sub>3</sub> to deposit 5.4 g of silver? (M<sub>Ag</sub> = 108 g/mol, z = 1, F = 96500 C/mol)',
    stem: 'A constant current of 10 A passes through an AgNO<sub>3</sub> solution with 100% current efficiency for silver deposition. Approximately how long is required to deposit 5.4 g of silver? Use M<sub>Ag</sub> = 108 g/mol, z = 1 and F = 96500 C/mol.',
    fb: [
      ['A', ' 241 s is about half the required time and would deposit only about 2.7 g at 10 A. Depositing 5.4 g requires 4825 C.'],
      ['C', ' 965 s is twice the required time. Silver deposition uses one electron per Ag<sup>+</sup> ion, so 0.05 mol of silver requires 0.05 mol of electrons, not 0.10 mol.'],
      ['D', ' 4825 is the required charge in coulombs, not the time in seconds. Divide by the current: t = Q/I = 4825/10 = 482.5 s.']
    ] },

  { q: 'Q28', id: 'phys-267', key: 'B',
    stemWas: 'The same quantity of electric charge is passed through solutions of CuSO<sub>4</sub> and AgNO<sub>3</sub> connected in series. If 2.16 g of silver is deposited, how much copper is deposited? (M<sub>Ag</sub> = 108, z<sub>Ag</sub> = 1; M<sub>Cu</sub> = 64, z<sub>Cu</sub> = 2)',
    stem: 'Two electrolytic cells containing CuSO<sub>4</sub> and AgNO<sub>3</sub> solutions are connected in series, and both deposit their metals with 100% current efficiency. If 2.16 g of silver is deposited, how much copper is deposited? Use molar masses M<sub>Ag</sub> = 108 g/mol and M<sub>Cu</sub> = 64 g/mol; Ag<sup>+</sup> requires one electron and Cu<sup>2+</sup> requires two.',
    headEdits: [['<p>The electrochemical equivalent of Cu (M/z = 64/2 = 32) is less than that of Ag (108/1 = 108), so less copper is deposited for the same charge.</p>',
      '<p>For the same charge and 100% current efficiency, deposited mass is proportional to M/z. Copper has M/z = 32 g per mole of electrons, while silver has 108 g per mole of electrons, so less copper is deposited. The mass deposited per coulomb, called the electrochemical equivalent, is M/(zF).</p>']],
    fb: [
      ['A', ' 0.32 g is half the required copper mass. The factor of two for Cu<sup>2+</sup> is already included in M<sub>Cu</sub>/z<sub>Cu</sub> = 64/2; do not divide by two again.'],
      ['C', ' 1.28 g results from comparing molar masses while ignoring that each Cu<sup>2+</sup> needs two electrons. Including z<sub>Cu</sub> = 2 halves that result to 0.64 g.'],
      ['D', ' Equal charge does not mean equal deposited masses. Silver and copper have different masses deposited per mole of electrons.']
    ],
    kcWas: 'For electrolytes in series (same charge), the ratio of deposited masses equals the ratio of their electrochemical equivalents M/z. Higher valence (z) means less mass deposited per unit charge.',
    kc: "Faraday's law gives m = MQ/(zF) at 100% current efficiency. For the same charge, the deposited-mass ratio is (M<sub>1</sub>/z<sub>1</sub>)/(M<sub>2</sub>/z<sub>2</sub>). Compare both molar mass and electron requirement." },

  { q: 'Q29', id: 'phys-268', key: 'B',
    headEdits: [['<p>This is about 0.6 angstroms, comparable to atomic spacings in crystals. This is why electron diffraction works and why electron microscopes can resolve individual atoms.</p>',
      "<p>The wavelength is about 0.6 angstroms, shorter than typical interatomic spacings. Such short wavelengths make electron diffraction and high-resolution imaging possible, although an electron microscope's resolution also depends on its lenses and other design limits.</p>"]],
    fb: [
      ['A', ' 0.0307 nm is about half the correct wavelength. Since wavelength varies as 1/√V, halving it would require four times the voltage, about 1600 V.'],
      ['C', ' 0.1226 nm would correspond to 100 V using the supplied shortcut. At 400 V, the square root in the denominator is 20, not 10.'],
      ['D', ' 0.245 nm would correspond to approximately 25 V. For the stated 400 V, λ = 1.226/20 = 0.0613 nm.']
    ],
    kcWas: 'For electrons: &lambda;(nm) = 1.226/&radic;V. Higher accelerating voltage = shorter wavelength = better resolution. This is why transmission electron microscopes use voltages of 100-300 kV.',
    kc: 'For electrons accelerated from rest at nonrelativistic speeds, λ(nm) ≈ 1.226/√V when V is in volts. Larger accelerating voltage gives shorter wavelength. At high voltages, such as 100–300 kV, use a relativistic correction; wavelength alone does not determine microscope resolution.' },

  { q: 'Q30', id: 'phys-269', key: 'A',
    fb: [
      ['B', ' 0.062 nm is twice the correct cutoff and would correspond to a tube voltage of about 20 kV. The stated voltage is 40 kV.'],
      ['C', ' 0.124 nm would correspond to 10 kV. Use the provided voltage in kilovolts: 1.240/40 = 0.031 nm.'],
      ['D', ' 0.310 nm would correspond to 4 kV, ten times below the stated voltage. Check the decimal place when dividing by 40.']
    ] },

  { q: 'Q31', id: 'phys-270', key: 'A',
    stemWas: 'A 10 &mu;F capacitor is connected to a 50 Hz AC source with peak voltage V<sub>0</sub> = 100 V. What is the capacitive reactance and the peak current?',
    stem: 'An ideal 10 μF capacitor is connected directly to a 50 Hz sinusoidal AC source with peak voltage V<sub>0</sub> = 100 V. What are its capacitive reactance and peak current?',
    fb: [
      ['B', ' 159 Ω and 0.628 A would fit twice the stated frequency or capacitance. Here X<sub>C</sub> = 1/(2π × 50 × 10<sup>−5</sup>) ≈ 318 Ω.'],
      ['C', ' The reactance is correct, but the peak current is too large. With a 100 V peak, I<sub>0</sub> = V<sub>0</sub>/X<sub>C</sub> = 100/318 ≈ 0.314 A.'],
      ['D', ' The current matches the correct calculation, but the reactance is wrong. At X<sub>C</sub> = 159 Ω, a 100 V peak would imply about 0.628 A, not 0.314 A.']
    ] },

  { q: 'Q32', id: 'phys-271', key: 'C',
    headEdits: [['<p>At 100% RH the air is fully saturated and condensation begins (dew, fog). Comfortable indoor humidity is typically 40-60%.</p>',
      '<p>At 100% RH, the water-vapor pressure equals the saturation vapor pressure at that temperature. Further cooling can cause condensation under ordinary conditions.</p>']],
    fb: [
      ['A', ' The given vapor pressure is about 60% of 3.17 kPa, not 40%. Subtracting 60% from 100% gives the percentage shortfall from saturation, not relative humidity.'],
      ['B', ' 50% would require a vapor pressure of half 3.17 kPa, about 1.59 kPa. The actual vapor pressure is higher, at 1.90 kPa.'],
      ['D', ' 80% would require a vapor pressure of 0.80 × 3.17 ≈ 2.54 kPa. The stated 1.90 kPa gives about 60%.']
    ],
    kcWas: 'Relative humidity compares actual water vapor content to the maximum the air can hold at that temperature. Warm air can hold more moisture than cold air.',
    kc: 'Relative humidity is 100 × actual water-vapor pressure / saturation vapor pressure at the same temperature. Saturation vapor pressure increases with temperature; cooling moist air generally raises its relative humidity until condensation occurs.' }

];
