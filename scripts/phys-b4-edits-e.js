/* Physics FOURTH-block edit specs, display Q41-Q50. See phys-b4-edits-a.js
   for the conventions.
 *
 * Q46 onward is the second presentation band: its feedback is already stored
 * as lettered paragraphs, and each item carries an educational-point block and
 * a Bottom Line instead of a Key Concept. For those items `existingFb` records
 * [letter, stored heading, stored body] of the paragraph form, `epWas` the
 * stored educational points in order, and `epEdits` the numbered points the
 * review replaces.
 *
 * From here on `fb` lists ONLY the bodies the review replaces. A retained body
 * is carried over from `existingFb` by the harness, so it is transcribed once
 * rather than twice.
 */
'use strict';
module.exports = [

  { q: 'Q41', id: 'phys-221', key: 'A',
    existingFb: [
      ['B', 'Radium-234 (Z=88)', ' This would mean losing 4 protons instead of 2, which does not happen in α decay.'],
      ['C', 'Protactinium-234 (Z=91)', ' Z=91 means losing only 1 proton, which is β-plus decay, not α.'],
      ['D', 'Thorium-236 (Z=90, A=236)', ' The mass number should decrease by 4 (from 238), giving 234, not 236.']
    ],
    fbKeep: ['B', 'D'], fbReplace: ['C'],
    fb: [['C', ' Alpha decay lowers Z by 2 and A by 4, giving Z = 90 and A = 234. Protactinium has Z = 91, so Pa-234 is not the direct alpha-decay daughter. Beta-plus decay would lower Z by 1 but leave A unchanged, so it would not give this option either.']],
    kcWas: 'Α decay: Z decreases by 2, A decreases by 4. Β-minus: Z increases by 1, A unchanged. Β-plus: Z decreases by 1, A unchanged. Γ: no change in Z or A. Always check that both Z and A balance in nuclear equations.',
    kc: 'In α decay, the daughter has Z lower by 2 and A lower by 4. In β<sup>-</sup> decay, Z increases by 1; in β<sup>+</sup> decay, Z decreases by 1; A is unchanged in both. Gamma emission changes neither. Balance total charge and nucleon number across the complete nuclear equation, including emitted particles.' },

  { q: 'Q42', id: 'phys-222', key: 'C',
    stemWas: 'A radioactive sample initially contains 6.4 x 10<sup>8</sup> atoms. After 5 half-lives, how many atoms remain?',
    stem: 'A sample initially contains 6.4 × 10<sup>8</sup> nuclei of a radioactive isotope. After five half-lives, approximately how many of these original nuclei remain undecayed?',
    existingFb: [
      ['A', '1.28 x 10<sup>8</sup>', ' This is 6.4 x 10<sup>8</sup> / 5, dividing by the number of half-lives instead of by 2<sup>5</sup> = 32.'],
      ['B', '3.2 x 10<sup>7</sup>', ' This is 6.4 x 10<sup>8</sup> / 20, not dividing by the correct power of 2.'],
      ['D', '6.4 x 10<sup>3</sup>', ' This divides by 10<sup>5</sup> instead of 2<sup>5</sup>.']
    ],
    fbKeep: ['A', 'B', 'D'], fbReplace: [] },

  { q: 'Q43', id: 'phys-223', key: 'C',
    stemWas: 'When a dielectric material is placed between the plates of a parallel-plate capacitor, the capacitance:',
    stem: 'An ordinary insulating dielectric with static dielectric constant κ > 1 completely fills the vacuum gap of a parallel-plate capacitor. The plate area and separation stay fixed. Neglecting edge effects, the capacitance:',
    headWas: "<p>Inserting a dielectric with dielectric constant &kappa; increases the capacitance by that factor:</p><div class='exp-diagram'><p>C = &kappa; x C<sub>0</sub> = &kappa; x &epsilon;<sub>0</sub> A / d</p></div><p>Since &kappa; > 1 for all real dielectrics, the capacitance always increases.</p><p>The dielectric's polarized molecules create an internal field opposing the external field, which effectively reduces the voltage across the plates (for a given charge), meaning more charge can be stored at the same voltage.</p>",
    head: '<p>For this parallel-plate model, C = κε<sub>0</sub>A/d = κC<sub>0</sub>. Because the specified κ is greater than 1, capacitance <strong>increases</strong>. Polarization reduces the field and voltage for a fixed free charge on the plates. If a battery instead holds the voltage fixed, more charge flows onto the plates; the voltage does not decrease.</p>',
    existingFb: [
      ['A', 'Decreases', ' The dielectric reduces the effective electric field, which increases (not decreases) the capacitance.'],
      ['B', 'Stays the same', ' Only a vacuum (or air, approximately) between the plates gives the base capacitance.'],
      ['D', 'Becomes zero', ' The capacitor still works with a dielectric. In fact, it works better.']
    ],
    fbKeep: [], fbReplace: ['A', 'B', 'D'],
    fb: [
      ['A', ' At fixed plate charge, polarization lowers the voltage. Since C = Q/V, that means greater capacitance, not smaller capacitance.'],
      ['B', ' The capacitance would stay at C<sub>0</sub> if the gap retained κ = 1. The question specifies a replacement dielectric with κ > 1.'],
      ['D', ' In this model κ, ε<sub>0</sub>, A and d are positive, so C = κε<sub>0</sub>A/d is positive. Inserting the specified insulator does not make it zero.']
    ],
    kcWas: 'Dielectrics increase capacitance because their polarization partially cancels the internal electric field. C = &kappa;&epsilon;<sub>0</sub>A/d. Common values: paper (&kappa; &asymp; 3), glass (&kappa; &asymp; 5-10), water (&kappa; &asymp; 80). This is why capacitors contain insulating materials between their plates.',
    kc: 'At fixed parallel-plate geometry, filling the vacuum gap with the specified dielectric gives C = κC<sub>0</sub>. At fixed Q, voltage falls; at fixed V, charge rises. Do not claim that the voltage falls while a battery keeps it fixed.' },

  { q: 'Q44', id: 'phys-224', key: 'B',
    stemWas: 'Which of the following best explains why water has a very high dielectric constant (~80)?',
    stem: 'Which statement best explains the large static dielectric constant of liquid water, about 80 near room temperature?',
    headWas: '<p>Water (H<sub>2</sub>O) has a permanent electric dipole moment due to its bent molecular shape and the electronegativity difference between oxygen and hydrogen. In an electric field, these polar molecules rotate to align with the field, creating a strong internal polarization that significantly reduces the net field inside the material.</p>',
    head: "<p>A water molecule has a permanent electric dipole because of its bent shape and unequal sharing of electrons between oxygen and hydrogen. An applied electric field biases the orientation of these dipoles, producing strong polarization. Thermal motion prevents perfect alignment. This response accounts for much of water's large static dielectric constant; the value also depends on temperature and frequency.</p>",
    existingFb: [
      ['A', 'Nonpolar and easily deformed', ' Water is strongly polar, not nonpolar. Nonpolar molecules have much lower dielectric constants.'],
      ['C', 'Excellent conductor', ' Pure water is actually a poor conductor. A high dielectric constant and electrical conductivity are different properties.'],
      ['D', 'Very large molecules', ' Water molecules are actually quite small (molecular weight 18). The high dielectric constant comes from polarity, not size.']
    ],
    fbKeep: ['C', 'D'], fbReplace: ['A'],
    fb: [['A', " Water is polar, so this option starts with the wrong description. Induced polarization can occur in nonpolar molecules, but water's permanent dipoles are central to the explanation here."]],
    kcWas: "The dielectric constant depends on how strongly a material's molecules respond to an electric field. Polar molecules (like water) rotate to align, producing large dielectric constants. Nonpolar molecules only develop weak induced dipoles, giving smaller dielectric constants.",
    kc: "A dielectric constant describes a material's polarization response. In liquid water, partial orientation of permanent molecular dipoles strongly contributes to the large low-frequency value. Dielectric constant and electrical conductivity are different properties." },

  { q: 'Q45', id: 'phys-225', key: 'D',
    existingFb: [
      ['A', '1.25 &mu;F', ' This divides by &kappa; instead of multiplying. The dielectric increases capacitance, not decreases it.'],
      ['B', '5 &mu;F', ' This ignores the dielectric entirely.'],
      ['C', '9 &mu;F', ' This adds &kappa; to C<sub>0</sub> (5 + 4 = 9) instead of multiplying.']
    ],
    fbKeep: ['A', 'B', 'C'], fbReplace: [],
    kcWas: 'C = &kappa; C<sub>0</sub>. The dielectric constant &kappa; is always a multiplicative factor. A &kappa; = 4 dielectric quadruples the capacitance. This allows capacitors to store more charge and energy in the same physical size, which is why practical capacitors always contain dielectric materials.',
    kc: 'With unchanged geometry and complete filling of the gap, C = κC<sub>0</sub>, so κ = 4 changes 5 μF to 20 μF. At fixed voltage, both stored charge and energy increase fourfold. At fixed charge instead, U = Q<sup>2</sup>/(2C) decreases to one-quarter.' },

  /* ---------------- second presentation band: Q46 onward ---------------- */

  { q: 'Q46', id: 'phys-226', key: 'B',
    stemWas: 'The inductive reactance (XL) of a coil with inductance L in an AC circuit of angular frequency w is given by:',
    stem: 'In sinusoidal steady state, the inductive reactance of an ideal inductor with inductance L at angular frequency w is:',
    existingFb: [
      ['A', 'XL = 1/(wL)', ' This is the formula for <strong>capacitive reactance</strong> (XC = 1/(wC)), not inductive reactance. If you see an inverse relationship with frequency, think capacitor. If you see a direct relationship, think inductor.'],
      ['C', 'XL = w<sup>2</sup> L', ' This has the wrong power dependence on frequency. Reactance depends on the first power of w, not w squared. There is no standard circuit element with w<sup>2</sup> dependence in its reactance formula.'],
      ['D', 'XL = L/w', ' This inverts the frequency dependence. It would imply that higher frequencies lead to lower reactance, which is the opposite of how inductors behave. Inductors resist rapid changes in current, so higher frequencies mean greater opposition.']
    ],
    fbKeep: ['D'], fbReplace: ['A', 'C'],
    fb: [
      ['A', ' This is the reciprocal of the inductive reactance and has units of siemens, not ohms. Capacitive reactance is 1/(wC), with capacitance C rather than inductance L.'],
      ['C', ' Inductive reactance is proportional to w, not w<sup>2</sup>. The expression w<sup>2</sup>L also has the wrong units for reactance.']
    ],
    epWas: [
      'At DC (w = 0), XL = 0, meaning an ideal inductor behaves like a short circuit (zero resistance to steady current).',
      'At very high frequencies, XL becomes very large, and the inductor effectively blocks AC current (acts like an open circuit).',
      'An inductor stores energy in its <strong>magnetic field</strong>: E = (1/2)LI<sup>2</sup>.'
    ],
    epEdits: [[2, 'In the ideal-inductor model, increasing frequency increases reactance. At the same applied voltage amplitude, the AC current amplitude is therefore smaller.']],
    blWas: 'XL = wL. Inductive reactance increases linearly with both frequency and inductance. Inductors pass DC freely but increasingly block higher-frequency AC signals.',
    bl: 'For an ideal inductor in sinusoidal steady state, X<sub>L</sub> = wL = 2πfL. Increasing frequency or inductance increases its reactance.' },

  { q: 'Q47', id: 'phys-227', key: 'C',
    stemWas: 'In an AC circuit, a capacitor with capacitance C is connected to a source of angular frequency w. The capacitive reactance (XC) is:',
    stem: 'In sinusoidal steady state, the capacitive reactance of an ideal capacitor with capacitance C at angular frequency w is:',
    headWas: "<p>Capacitive reactance is the opposition to current flow offered by a capacitor in an AC circuit. It is <strong>inversely proportional</strong> to both the angular frequency and the capacitance:</p><p style='text-align:center'><strong>XC = 1/(wC) = 1/(2 π f C)</strong></p><p>The unit is the <strong>ohm</strong>. Unlike inductive reactance, capacitive reactance <strong>decreases</strong> as frequency increases, because a rapidly alternating voltage can charge and discharge the capacitor more effectively.</p>",
    head: '<p>Capacitive reactance is X<sub>C</sub> = 1/(wC) = 1/(2πfC). The current satisfies i = C(dv/dt). At the same sinusoidal voltage amplitude, a higher frequency changes the voltage more rapidly and produces a larger current amplitude, so the voltage-to-current ratio X<sub>C</sub> is smaller.</p>',
    existingFb: [
      ['A', 'XC = wC', ' This incorrectly shows a direct proportionality between reactance and frequency. That relationship (XL = wL) applies to <strong>inductors</strong>, not capacitors. Capacitors behave oppositely: they pass high frequencies easily.'],
      ['B', 'XC = w/C', ' This shows reactance increasing with frequency, which is wrong for a capacitor. Additionally, the dimensional analysis fails: (rad/s)/F does not yield ohms.'],
      ['D', 'XC = C/w', ' This has the correct inverse relationship with w but incorrectly places C in the numerator. Larger capacitance should mean <strong>lower</strong> reactance (easier for current to flow), so C must be in the denominator.']
    ],
    fbKeep: ['B', 'D'], fbReplace: ['A'],
    fb: [['A', ' wC is the reciprocal of capacitive reactance and has units of siemens. The requested reactance is 1/(wC), in ohms.']],
    epWas: [
      'At DC (w = 0), XC approaches infinity, meaning a capacitor blocks DC completely (acts as an open circuit after fully charging).',
      'At very high frequencies, XC approaches zero, and the capacitor behaves like a short circuit (passes high-frequency signals freely).',
      'A capacitor stores energy in its <strong>electric field</strong>: E = (1/2)CV<sup>2</sup>.',
      'The contrasting behavior of inductors (block high f) and capacitors (block low f) is the basis for electronic filters.'
    ],
    epEdits: [[2, 'In the ideal-capacitor model, X<sub>C</sub> approaches zero as frequency increases without limit. This is an ideal-model limit, not a universal statement about real capacitors at every frequency.']],
    blWas: 'XC = 1/(wC). Capacitive reactance decreases with increasing frequency and capacitance. Capacitors block DC but pass high-frequency AC -- the opposite behavior of inductors.',
    bl: 'For an ideal capacitor in sinusoidal steady state, X<sub>C</sub> = 1/(wC). At fixed C, higher frequency means lower reactance; after a DC charging transient, an ideal capacitor carries no steady current.' },

  { q: 'Q48', id: 'phys-228', key: 'B',
    stemWas: 'The total impedance Z of a series RLC circuit is given by:',
    stem: 'For a series circuit containing ideal R, L and C in sinusoidal steady state, with R > 0, which expression gives the impedance magnitude Z in terms of R, X<sub>L</sub> and X<sub>C</sub>?',
    existingFb: [
      ['A', 'Z = R + XL + XC', ' Simple arithmetic addition is incorrect because R, XL, and XC are not in phase with each other. The voltage across the inductor leads the current by 90 degrees, the voltage across the capacitor lags by 90 degrees, and the voltage across the resistor is in phase. They must be combined as <strong>phasors</strong>, not scalars.'],
      ['C', 'Z = sqrt(R<sup>2</sup> + (XL + XC)<sup>2</sup>)', ' The reactances of L and C should be <strong>subtracted</strong>, not added. Since the inductor voltage leads by +90 degrees and the capacitor voltage lags by -90 degrees, they are 180 degrees apart and partially cancel each other. The net reactance is their difference.'],
      ['D', 'Z = R + (XL - XC)', ' While (XL - XC) correctly represents the net reactance, you cannot simply add it arithmetically to R because they are perpendicular in the impedance phasor diagram. The Pythagorean theorem (vector addition) must be used.']
    ],
    fbKeep: ['A', 'C', 'D'], fbReplace: [],
    epWas: [
      'The phase angle between voltage and current: tan(φ) = (XL - XC)/R. If XL > XC, the circuit is inductive (voltage leads current). If XC > XL, the circuit is capacitive (current leads voltage).',
      'At resonance, XL = XC, and Z = R (minimum impedance, maximum current).',
      'Impedance is measured in ohms and can be represented as a complex number: Z = R + j(XL - XC).'
    ],
    epEdits: [
      [2, 'At series resonance, X<sub>L</sub> = X<sub>C</sub> and the impedance magnitude is R. For fixed source voltage and R > 0, current is then greatest.'],
      [3, 'Complex impedance is R + j(X<sub>L</sub> − X<sub>C</sub>), where j<sup>2</sup> = −1. The square-root expression in this question is its magnitude, not the complex impedance itself.']
    ] },

  { q: 'Q49', id: 'phys-229', key: 'B',
    stemWas: 'In a series RLC circuit, resonance occurs when:',
    stem: 'For a series circuit of ideal R, L and C driven by a sinusoidal source of fixed voltage amplitude, with R > 0, electrical resonance occurs when:',
    existingFb: [
      ['A', 'The resistance equals the total reactance (R = XL + XC)', ' This condition has no special physical significance in RLC circuit theory. Resonance is defined by the cancellation of inductive and capacitive reactances, not by any relationship between R and the sum of reactances.'],
      ['C', 'The current and voltage are 90 degrees out of phase', ' At resonance, current and voltage are <strong>in phase</strong> (phase angle = 0), not 90 degrees out of phase. A 90-degree phase difference occurs in purely reactive circuits (containing only an inductor or only a capacitor), not at resonance.'],
      ['D', 'The impedance reaches its maximum value', ' This is the opposite of what happens. At resonance in a series RLC circuit, impedance is at its <strong>minimum</strong> (Z = R), and current is at its maximum. Note: in a parallel RLC circuit, resonance does produce maximum impedance, which may cause confusion.']
    ],
    fbKeep: ['C'], fbReplace: ['A', 'D'],
    fb: [
      ['A', ' The resonance condition is cancellation of inductive and capacitive reactance: X<sub>L</sub> = X<sub>C</sub>. It does not require R to equal their sum.'],
      ['D', ' In this series circuit, resonance gives minimum impedance magnitude, Z = R. The familiar high-impedance resonance belongs to an appropriate parallel-resonant circuit instead.']
    ],
    epWas: [
      'The resonant frequency f0 = 1/(2 π sqrt(LC)) depends only on L and C, <strong>not on R</strong>.',
      'The quality factor Q = w0L/R = 1/(w0CR) measures the sharpness of the resonance peak. Higher Q means a narrower, taller peak.',
      'At resonance, the voltages across L and C can individually be much larger than the source voltage (voltage magnification), but they are equal and opposite and cancel each other.',
      'Resonance is exploited in radio tuning circuits to select specific frequencies.'
    ],
    epEdits: [[2, 'For a series RLC circuit, Q = w<sub>0</sub>L/R = 1/(w<sub>0</sub>CR). A higher Q means a narrower resonance relative to its resonant frequency. Peak current is V/R, so its height also depends on source voltage and resistance.']],
    blWas: 'Series RLC resonance occurs when XL = XC (at w0 = 1/sqrt(LC)). At resonance: impedance is minimum (Z = R), current is maximum, and voltage and current are in phase.',
    bl: 'Series resonance occurs at X<sub>L</sub> = X<sub>C</sub>, or f<sub>0</sub> = 1/(2π√LC). The input is then purely resistive. With fixed source voltage and resistance, current is greatest and voltage and current are in phase.' },

  { q: 'Q50', id: 'phys-230', key: 'B',
    stemWas: 'In a purely inductive AC circuit, the phase relationship between voltage and current is:',
    stem: 'In sinusoidal steady state for an ideal inductor, what is the phase relationship between its voltage and current?',
    headWas: '<p>In a purely inductive circuit, the voltage across the inductor <strong>leads the current by 90 degrees</strong> (π/2 radians). This is because the voltage across an inductor is proportional to the rate of change of current (V = L di/dt). The current must change before the voltage responds, meaning the voltage waveform peaks one-quarter cycle (90 degrees) before the current waveform.</p>',
    head: '<p>The voltage across an ideal inductor is v = L(di/dt). For a sinusoidal current, its rate of change is one-quarter cycle ahead of the current itself. Thus voltage leads current by 90°. The positive voltage peak occurs as current crosses zero while increasing; current reaches its positive peak one-quarter cycle later, when voltage is zero.</p>',
    existingFb: [
      ['A', 'Voltage and current are in phase', ' This describes a <strong>purely resistive</strong> circuit. In a resistor, V = IR at every instant, so voltage and current rise and fall together with zero phase difference.'],
      ['C', 'Current leads voltage by 90 degrees', ' This describes a <strong>purely capacitive</strong> circuit, not an inductive one. In a capacitor, current flows in response to voltage changes (I = C dV/dt), so current peaks before voltage. The mnemonic is "ELI the ICE man": E (voltage) Leads I (current) in an Inductor; I (current) leads E (voltage) in a Capacitor.'],
      ['D', 'Voltage leads current by 180 degrees', ' A 180-degree phase difference would mean voltage and current are exactly opposite (when one is maximum positive, the other is maximum negative). This does not occur in any single ideal circuit element; it would require a negative resistance, which is not physically standard.']
    ],
    fbKeep: ['A', 'C'], fbReplace: ['D'],
    fb: [['D', ' A 180° difference would make the two sinusoids opposite in sign at corresponding times. The derivative relation for an ideal inductor gives a quarter-cycle, or 90°, difference instead.']],
    epWas: [
      'Mnemonic: <strong>"ELI the ICE man"</strong> -- In an inductor (L), E leads I. In a capacitor (C), I leads E.',
      "The 90-degree phase difference means that in a pure inductor, the average power dissipated is <strong>zero</strong> (reactive power only). Energy oscillates between the circuit and the inductor's magnetic field.",
      'In real circuits, inductors have some resistance (wire resistance), so the phase angle is less than 90 degrees.'
    ],
    epEdits: [[3, 'A real coil has winding resistance. In the simple series R–L model, its current lags the total applied voltage by an angle between 0° and 90°, rather than exactly 90°.']],
    blWas: 'In an inductor, voltage leads current by 90 degrees (ELI). In a capacitor, current leads voltage by 90 degrees (ICE). In a resistor, they are in phase. Remember: ELI the ICE man.',
    bl: 'For an ideal inductor with sinusoidal current, voltage leads current by 90° because v = L(di/dt). Remember ELI: E (voltage) leads I (current) in L (an inductor).' }

];
