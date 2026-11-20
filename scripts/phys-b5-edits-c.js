/* Physics FINAL-block edit specs, display Q17-Q24. See phys-b5-edits-a.js for
   the conventions. */
'use strict';
module.exports = [

  { q: 'Q17', id: 'phys-256', key: 'C',
    fb: [
      ['A', ' 0.8 Pa results from σ/r. A soap bubble has two closely spaced surfaces, so the appropriate pressure difference is 4σ/r.'],
      ['B', ' 1.6 Pa is the result of 2σ/r for one spherical interface, such as a liquid droplet. A soap film has two surfaces, giving twice that value.'],
      ['D', ' 6.4 Pa is twice the correct value. The factor 4 in Δp = 4σ/r already accounts for both surfaces; do not double it again.']
    ] },

  { q: 'Q18', id: 'phys-257', key: 'B',
    fb: [
      ['A', ' 0.24 mm is about half the correct radius and follows from omitting the factor 2 in r = 2σcosθ/(ρgh).'],
      ['C', ' With θ = 0°, cosθ = 1. Substitution gives r = 0.146/300 m ≈ 0.49 mm, not 0.73 mm.'],
      ['D', ' A radius of 1.46 mm would give a rise of about 1 cm under these conditions. The stated rise is 3 cm, requiring a radius three times smaller.']
    ] },

  { q: 'Q19', id: 'phys-258', key: 'C',
    stemWas: 'A solenoid has 2000 turns wound uniformly over a length of 0.4 m and carries a current of 3 A. What is the magnetic field inside the solenoid? (&mu;<sub>0</sub> = 4&pi; × 10<sup>−7</sup> T·m/A)',
    stem: 'A long air-core solenoid has 2000 turns wound uniformly over 0.4 m and carries a current of 3 A. Neglecting end effects, what is the magnetic field inside near its center? Use μ<sub>0</sub> ≈ 4π × 10<sup>−7</sup> T·m/A.',
    /* Post-review correction, 20 November 2026: the stored derivation carried
       four intermediate lines that substituted 3.14 for pi. The scientific
       review asked for the substitution and the result alone. */
    headEdits: [['<p>B = 4&pi; × 10<sup>−7</sup> × 5000 × 3</p><p>B = 4 × 3.14 × 10<sup>−7</sup> × 15000</p><p>B = 12.56 × 10<sup>−7</sup> × 15000</p><p>B = 188400 × 10<sup>−7</sup></p><p>B = 1.884 × 10<sup>−2</sup> T = <strong>18.85 mT</strong></p>',
      '<p>B = (4&pi; × 10<sup>−7</sup>) × 5000 × 3</p><p>B ≈ 0.01885 T = <strong>18.85 mT</strong></p>']],
    fb: [
      ['A', ' 1.88 mT is about ten times too small. The turn density is 2000/0.4 = 5000 m<sup>−1</sup>, and B ≈ 0.01885 T = 18.85 mT.'],
      ['B', ' 6.28 mT is approximately the field this solenoid would produce at 1 A. The stated current is 3 A, so the field is three times as large.'],
      ['D', ' 62.8 mT is too large for the given current and turn density. Use N/L = 5000 m<sup>−1</sup> and I = 3 A in μ<sub>0</sub>(N/L)I.']
    ],
    kcWas: 'B = &mu;<sub>0</sub>nI inside a solenoid. The key factor is turns per unit length (n = N/L), not total turns alone. Doubling the current doubles B. Inserting an iron core can increase B by a factor of 1000 or more.',
    kc: 'For a long air-core solenoid away from its ends, B ≈ μ<sub>0</sub>(N/L)I. Turns per unit length and current determine the field. A magnetic core changes the result, and its response need not remain proportional to current.' },

  { q: 'Q20', id: 'phys-259', key: 'C',
    stemWas: 'A solenoid produces a magnetic field of 10 mT when carrying 2 A. If the current is increased to 5 A (with no other changes), the magnetic field becomes:',
    stem: 'An air-core solenoid produces a magnetic field of 10 mT at a fixed point when carrying 2 A. If its current is increased to 5 A with the geometry unchanged, what is the field at that point?',
    headEdits: [['<p>The field scales linearly with current because &mu;<sub>0</sub> and n are constants of the solenoid geometry.</p>',
      '<p>With an air core and fixed geometry, the field is proportional to the current.</p>']],
    fb: [
      ['A', ' 4 mT comes from reversing the current ratio, 10 × 2/5. Increasing the current must increase the field here.'],
      ['B', ' 10 mT would mean no change in field despite an increase in current. The field scales by the same factor as the current.'],
      ['D', ' 50 mT multiplies the original field by 5 rather than by the ratio 5/2. The current rises from 2 A to 5 A, a factor of 2.5.']
    ],
    kcWas: 'The solenoid field B = &mu;<sub>0</sub>nI is directly proportional to current. If you double I, you double B. This linear relationship makes solenoids useful as controllable electromagnets.',
    kc: 'At a fixed point, the field of an air-core solenoid with unchanged geometry is proportional to its current. Here multiplying the current by 5/2 also multiplies the field by 5/2.' },

  { q: 'Q21', id: 'phys-260', key: 'B',
    fb: [
      ['A', ' 0.5 eV is too small. The photon has energy 1240/310 = 4.0 eV, leaving 1.0 eV after the 3.0 eV work function is supplied.'],
      ['C', ' 2.0 eV would require a photon energy of 5.0 eV for this metal. The supplied wavelength corresponds to only 4.0 eV.'],
      ['D', ' 4.0 eV is the photon energy before subtracting the work function. The electron must use 3.0 eV to escape the metal.']
    ],
    kcWas: 'KE<sub>max</sub> = hf − W. Use the shortcut E(eV) = 1240/&lambda;(nm) for fast calculations. If E<sub>photon</sub> < W, no electrons are emitted regardless of intensity.',
    kc: 'In the single-photon photoelectric model, KE<sub>max</sub> = hf − W. Use E(eV) = 1240/λ(nm). A photon must supply at least the work function; raising the number of subthreshold photons does not change their individual energies in this model.' },

  { q: 'Q22', id: 'phys-261', key: 'B',
    stemWas: 'In the photoelectric effect, if the intensity of light (above threshold frequency) is doubled while keeping the frequency unchanged, what happens?',
    stem: 'In the single-photon photoelectric regime, light above the threshold frequency illuminates the same metal area. Assume the emission yield per incident photon stays constant and there is no saturation. If the intensity doubles at unchanged frequency, what happens over the same time interval?',
    headWas: "<p>This is a key insight of the quantum (photon) model of light:</p><table class='exp-table'><tr><th>Change</th><th>Effect on Number of Electrons</th><th>Effect on KE<sub>max</sub></th></tr><tr><td>Increase intensity (same f)</td><td>Increases (more photons)</td><td>No change</td></tr><tr><td>Increase frequency (same intensity)</td><td>Decreases slightly</td><td>Increases</td></tr></table><p>Doubling intensity means doubling the number of photons hitting the surface per second. Each photon still has the same energy (hf), so each electron still gets the same maximum kinetic energy. But twice as many photons eject twice as many electrons, doubling the photocurrent.</p>",
    head: "<p>At fixed frequency, each photon has the same energy hf. Doubling the intensity on the same area doubles the number of incident photons per second. Under the stated constant-yield conditions, twice as many electrons are emitted in the same time, but their maximum kinetic energy stays KE<sub>max</sub> = hf − W.</p><table class='exp-table'><tr><th>Change</th><th>Effect on photon arrival rate for the same area</th><th>Effect on KE<sub>max</sub> for the same metal</th></tr><tr><td>Double intensity at fixed frequency</td><td>Doubles; electron emission also doubles under the stated assumptions</td><td>No change</td></tr><tr><td>Increase frequency at fixed intensity</td><td>Decreases because each photon carries more energy; electron emission also depends on the yield</td><td>Increases while the frequency is above threshold</td></tr></table>",
    fb: [
      ['A', ' Each photon still has energy hf, so doubling intensity does not change the maximum energy available to an individual emitted electron.'],
      ['C', ' More electrons are emitted under the stated assumptions, but their maximum kinetic energy does not double. Increasing photon number is different from increasing photon energy.'],
      ['D', ' The frequency is above threshold and the yield is unchanged. More incident photons therefore produce more emitted electrons in the same time interval.']
    ],
    kcWas: 'Intensity = number of photons. Frequency = energy per photon. KE<sub>max</sub> depends ONLY on frequency (via hf − W). The number of emitted electrons depends on intensity. This is why classical wave theory fails.',
    kc: 'Intensity is energy delivered per unit area per unit time. At fixed frequency, higher intensity means more photons per second. For the same metal in the single-photon model, frequency determines KE<sub>max</sub>; emission rate also depends on photon arrival rate and emission yield.' },

  { q: 'Q23', id: 'phys-262', key: 'C',
    fb: [
      ['A', ' 1.2 μs comes from multiplying by √(1 − 0.6<sup>2</sup>) = 0.8. Time dilation requires dividing the rest-frame interval by 0.8.'],
      ['B', ' 1.5 μs is the given half-life in the muon rest frame. An Earth observer measures a longer half-life because the muons are moving relative to Earth.'],
      ['D', ' 2.5 μs is too long. At 0.6c the Lorentz factor is 1.25, not 2.5/1.5, so the observed half-life is 1.875 μs.']
    ],
    kcWas: "Time dilation: t = &gamma;t<sub>0</sub>. Moving clocks run SLOW as seen by a stationary observer. The proper time t<sub>0</sub> is always the shortest time (measured in the object's own rest frame).",
    kc: 'For a sample moving at constant speed relative to an observer, the observed half-life is γ times its rest-frame half-life, where γ = 1/√(1 − v<sup>2</sup>/c<sup>2</sup>). Here γ = 1.25, so 1.5 μs becomes 1.875 μs.' },

  { q: 'Q24', id: 'phys-263', key: 'B',
    fb: [
      ['A', ' 9 × 10<sup>10</sup> J is 1000 times too small; it is the rest energy of 1 mg. The given 1 g is 10<sup>−3</sup> kg, not 10<sup>−6</sup> kg.'],
      ['C', ' The speed of light must be squared in E = mc<sup>2</sup>. With 1 g = 10<sup>−3</sup> kg and c<sup>2</sup> = 9 × 10<sup>16</sup> m<sup>2</sup>/s<sup>2</sup>, the result is 9 × 10<sup>13</sup> J.'],
      ['D', ' This misses the squared numerical factor: (3 × 10<sup>8</sup>)<sup>2</sup> = 9 × 10<sup>16</sup>, not 3 × 10<sup>16</sup>. Multiplying by 10<sup>−3</sup> kg gives 9 × 10<sup>13</sup> J.']
    ] }

];
