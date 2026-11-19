/* Physics 60-block edit specs, display Q31-Q40.
   Q31 carries the review's single answer-key correction, D -> B. Its keyed
   heading is re-synchronized by the harness from the stored option text, which
   preserves this item's lettered "X) " style. */
'use strict';
module.exports = [

  { q: 'Q31', id: 'phys-31', key: 'D', newKey: 'B',
    stemMustContain: 'rotates in a uniform magnetic field of 0.4 T at 60 revolutions per second',
    stem: "A 50-turn rectangular coil, 20 cm by 10 cm, rotates at 60 revolutions per second in a uniform 0.4 T magnetic field. Its rotation axis lies in the coil's plane and is perpendicular to the field. What is the peak induced EMF?",
    headMustContain: '753.98 V',
    head: '<p>For this generator geometry, ε<sub>peak</sub> = NBAω. The area of each turn is A = 0.20 × 0.10 = 0.020 m<sup>2</sup>. Convert rotations per second to angular speed: ω = 2πf = 2π × 60 ≈ 376.99 rad/s.</p><p>Therefore ε<sub>peak</sub> = 50 × 0.4 × 0.020 × 376.99 = 150.8 V. This is option B. The expression gives the peak voltage, not the RMS voltage.</p>',
    kcMustContain: 'The peak EMF in an AC generator is proportional',
    kc: 'For a coil rotating in the stated generator geometry, ε<sub>peak</sub> = NBAω with ω = 2πf. Convert both lengths to meters before calculating the area.',
    fb: [
      ['A', ' 75.4 V is half the correct peak value. Using 50 turns, 0.020 m<sup>2</sup> area, 0.4 T and ω = 2π × 60 rad/s gives 150.8 V.'],
      ['C', ' 301.6 V is twice the correct peak value. This would require doubling one factor in NBAω, such as the turn count or rotation frequency.'],
      ['D', ' 753.9 V is about five times too large. Recheck the product: 50 × 0.4 × 0.020 = 0.4, and 0.4 × 376.99 = 150.8 V.']
    ] },

  { q: 'Q32', id: 'phys-32', key: 'A',
    stemMustContain: 'For the electron to pass through undeflected, what must its velocity be',
    stem: 'An electron enters crossed electric and magnetic fields of 3000 V/m and 0.01 T. Its velocity is perpendicular to both fields and directed so the electric and magnetic forces oppose each other. What speed allows it to pass undeflected?',
    headMustContain: 'This is the principle of a velocity selector',
    head: '<p>For no deflection, the opposed forces must have equal magnitudes: |q|E = |q|vB. The charge magnitude cancels, giving v = E/B = 3000/0.01 = 3 × 10<sup>5</sup> m/s.</p>',
    kcMustContain: 'A velocity selector uses perpendicular electric and magnetic fields',
    kc: 'A velocity selector transmits particles traveling in the appropriate direction at speed v = E/B. Both force direction and force magnitude must be correct for the net force to be zero.',
    fb: [
      ['B', ' 3 × 10<sup>4</sup> m/s gives a magnetic-force magnitude only one tenth of the electric force. It cannot balance the fields given.'],
      ['C', ' 3 × 10<sup>6</sup> m/s gives a magnetic-force magnitude ten times the electric force. The particle would be deflected.'],
      ['D', ' 3 × 10<sup>7</sup> m/s gives a magnetic-force magnitude one hundred times the electric force. The required speed is E/B = 3 × 10<sup>5</sup> m/s.']
    ] },

  { q: 'Q33', id: 'phys-33', key: 'D',
    stemMustContain: 'A solenoid has 2000 turns per meter',
    stem: 'A long air-core solenoid has 2000 turns per meter and carries 3 A. Neglecting end effects, what is the magnetic field near its center? Use μ<sub>0</sub> ≈ 4π x 10<sup>-7</sup> T·m/A.',
    kcMustContain: "not the solenoid's length or radius",
    kc: 'Inside a sufficiently long air-core solenoid, away from the ends, B ≈ μ<sub>0</sub>nI and the field is approximately uniform. Here n = N/L is turns per unit length, so length still matters if the total number of turns is fixed.',
    fb: [
      ['A', ' 1.88 × 10<sup>-3</sup> T is about one quarter of the correct field. The given product of turns per meter and current is 2000 × 3 = 6000 A/m.'],
      ['B', ' 3.77 × 10<sup>-3</sup> T is about half the correct field. Use the stated 3 A current with all 2000 turns per meter.'],
      ['C', ' 1.51 × 10<sup>-2</sup> T is about twice the correct field. The long-solenoid expression is B ≈ μ<sub>0</sub>nI, without an additional factor of two.']
    ] },

  { q: 'Q34', id: 'phys-34', key: 'D',
    stemMustContain: 'is placed in a magnetic field that increases uniformly',
    stem: 'A stationary single circular loop of radius 8 cm lies perpendicular to a spatially uniform magnetic field. The field increases linearly from 0.2 T to 0.8 T in 0.3 s. What is the magnitude of the induced EMF?',
    headMustContain: "By Faraday's law, EMF = -dPhi/dt",
    head: "<p>The flux through this fixed loop is Φ = BA. Its area is A = π(0.08)<sup>2</sup> ≈ 0.02011 m<sup>2</sup>. The field-change rate is ΔB/Δt = (0.8 − 0.2)/0.3 = 2.0 T/s. Thus |ε| = A|ΔB/Δt| = 0.02011 × 2.0 ≈ 0.040 V. The minus sign in ε = −dΦ/dt describes the induced EMF's direction; it does not make its magnitude negative.</p>",
    kcMustContain: "Faraday's law states that the induced EMF equals the rate of change",
    kc: 'An induced EMF comes from changing magnetic flux. For a single loop, ε = −dΦ/dt; flux can change because of field strength, loop area or orientation. Here only the field strength changes.',
    fb: [
      ['A', ' 0.010 V is about one quarter of the correct EMF. Treating 8 cm as the diameter instead of the stated radius would reduce the area by a factor of four.'],
      ['B', ' 0.020 V is about half the correct result. The field-change rate is (0.8 − 0.2)/0.3 = 2.0 T/s, not 1.0 T/s.'],
      ['C', ' 0.080 V is about twice the correct result. The stem specifies a single loop, so no factor of two for the number of turns is needed.']
    ] },

  { q: 'Q35', id: 'phys-35', key: 'D',
    stemMustContain: 'Two parallel wires separated by 10 cm',
    stem: 'Two long, straight, parallel wires in air are separated by 10 cm and each carries 5 A, in opposite directions. Neglect end effects. What is the force per meter between the wires, and is it attractive or repulsive? Use μ<sub>0</sub> ≈ 4π x 10<sup>-7</sup> T·m/A.',
    fb: [
      ['A', ' The magnitude is correct, but the direction is not. Parallel currents in opposite directions repel; currents in the same direction attract.'],
      ['B', ' The repulsive direction is correct, but the magnitude is twice too large. Use F/L = μ<sub>0</sub>I<sub>1</sub>I<sub>2</sub>/(2πd) with d = 0.10 m.'],
      ['C', ' Both parts are wrong: the magnitude is twice too large, and opposite-direction currents repel rather than attract.']
    ] },

  { q: 'Q36', id: 'phys-36', key: 'D',
    stemMustContain: 'If the input voltage is 220 V AC, what is the output voltage',
    stem: 'An ideal transformer has 500 primary turns and 50 secondary turns. If the primary voltage is 220 V AC RMS, what is the secondary RMS voltage?',
    fb: [
      ['A', ' 2.2 V is a hundredfold reduction. The secondary has one tenth as many turns as the primary, so the voltage falls by a factor of ten.'],
      ['B', ' 2200 V reverses the turns ratio. A secondary with fewer turns makes this a step-down transformer.'],
      ['C', ' 440 V would double the primary voltage. The given secondary winding has fewer turns, so its voltage is lower than 220 V.']
    ] },

  { q: 'Q37', id: 'phys-37', key: 'D',
    fb: [
      ['A', ' The photon supplies about 3.1 eV. After paying the 2.0 eV work function, the maximum remaining kinetic energy is about 1.1 eV.'],
      ['B', ' 3.1 eV is the incident photon energy. Not all of it becomes electron kinetic energy because 2.0 eV is needed to release an electron from the metal.'],
      ['C', " 2.0 eV is the work function, the minimum energy needed for release. It is not the outgoing electron's maximum kinetic energy."]
    ] },

  { q: 'Q38', id: 'phys-38', key: 'D',
    stemMustContain: 'What is the de Broglie wavelength of an electron',
    stem: 'An electron initially at rest is accelerated through a potential difference of 100 V. What is its de Broglie wavelength? Use m = 9.11 x 10<sup>-31</sup> kg, h = 6.63 x 10<sup>-34</sup> J·s and e = 1.6 x 10<sup>-19</sup> C.',
    fb: [
      ['A', ' 0.0123 nm is ten times too small. Because λ = h/sqrt(2meV), a tenfold decrease in wavelength would require a hundredfold increase in accelerating voltage.'],
      ['B', ' 0.0388 nm is approximately the result for 1000 V. The stated 100 V gives a wavelength larger by a factor of sqrt(10).'],
      ['C', ' 0.388 nm is approximately the result for 10 V. The stated 100 V gives a wavelength smaller by a factor of sqrt(10).']
    ] },

  { q: 'Q39', id: 'phys-39', key: 'D',
    stemMustContain: 'scatters off an electron at an angle of 90 degrees',
    stem: 'An X-ray photon of wavelength 0.071 nm scatters from a free electron initially at rest. The photon is deflected by 90° from its original direction. What is its wavelength shift? Use an electron Compton wavelength of 0.00243 nm.',
    fb: [
      ['A', ' A shift of 0.00122 nm is about half the Compton wavelength and corresponds to a photon scattering angle of 60°, not 90°.'],
      ['B', ' 0.00729 nm is three times the electron Compton wavelength. It exceeds the maximum shift of twice that wavelength in the stated free-electron model.'],
      ['C', ' 0.00486 nm is the maximum shift, obtained at 180° backscattering. At 90°, the shift equals one electron Compton wavelength.']
    ] },

  { q: 'Q40', id: 'phys-40', key: 'D',
    fb: [
      ['A', ' 328 nm would require about twice the actual 1.9 eV energy difference. Use the change between the two levels, not twice that change.'],
      ['B', ' 490 nm corresponds to about 2.54 eV. The stated transition releases only 1.9 eV, so its wavelength is longer.'],
      ['C', ' 980 nm corresponds to about 1.27 eV. The stated transition releases 1.9 eV, giving a shorter wavelength of about 654 nm.']
    ] }
];
