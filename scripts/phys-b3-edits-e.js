/* Physics THIRD-block edit specs, display Q41-Q50. See phys-b3-edits-a.js for
   the conventions.

   Q48's stored option and explanation text uses the UPPERCASE Greek letters
   U+0391 ALPHA, U+0392 BETA and U+0393 GAMMA where the lower-case particle
   symbols are meant. Those code points are written as escapes below so the
   anchors are unambiguous, and the review's option replacements put the
   lower-case symbols in their place. */
'use strict';
module.exports = [

  { q: 'Q41', id: 'phys-161', key: 'C',
    stemWas: 'The capacitive reactance of a 10 μF capacitor at a frequency of 50 Hz is approximately:',
    stem: 'What is the capacitive reactance of an ideal 10 μF capacitor at a sinusoidal AC frequency of 50 Hz, approximately?',
    fb: [
      ['A', ' This is ten times too small. At 50 Hz, 31.8 Ω would correspond to 100 μF, whereas the stated capacitance is 10 μF.'],
      ['B', ' Substitution gives 1/(π × 10<sup>−3</sup>), not 100 Ω. Taking the reciprocal gives 1000/π ≈ 318 Ω.'],
      ['D', ' This is ten times too large. At 50 Hz it would correspond to 1 μF; use 10 μF = 10 × 10<sup>−6</sup> F.']
    ] },

  { q: 'Q42', id: 'phys-162', key: 'C',
    stemWas: 'An LC circuit has L = 0.1 H and C = 10 μF. What is the natural oscillation frequency? (π² ≈ 10)',
    stem: 'An ideal LC circuit with negligible resistance has L = 0.1 H and C = 10 μF. What is its natural oscillation frequency? (Use π ≈ 3.14)',
    kcWas: 'LC oscillation frequency f = 1/(2π√(LC)).',
    kc: "An ideal LC circuit exchanges energy between the capacitor's electric field and the inductor's magnetic field, at frequency f = 1/(2π√(LC)).",
    fb: [
      ['A', ' This is too low for the given components. Their product is LC = 10<sup>−6</sup> s<sup>2</sup>, so √(LC) = 10<sup>−3</sup> s and f ≈ 159 Hz.'],
      ['B', ' A frequency of 100 Hz would require a larger LC product. Substituting the given values gives 1/(2π × 0.001 s), about 159 Hz.'],
      ['D', ' This omits π from the denominator: 1/(2 × 0.001) = 500. The frequency formula contains 2π, not just 2.']
    ] },

  { q: 'Q43', id: 'phys-163', key: 'C',
    stemWas: 'In an RLC series circuit, at resonance:',
    stem: 'In a series RLC circuit with R > 0, driven by a sinusoidal voltage of fixed amplitude, what is true at resonance in steady operation?',
    headWas: '<p>At resonance in an RLC series circuit, X<sub>L</sub> = X<sub>C</sub>, so they cancel. The impedance Z = √(R² + (X<sub>L</sub>−X<sub>C</sub>)²) = R. Current is <strong>maximum</strong> and impedance is <strong>minimum</strong>.</p>',
    head: '<p>At series resonance, the inductive and capacitive reactances are equal: X<sub>L</sub> = X<sub>C</sub>. Their opposite phase contributions cancel, so the impedance magnitude is Z = √[R<sup>2</sup> + (X<sub>L</sub> − X<sub>C</sub>)<sup>2</sup>] = R. With the source voltage amplitude fixed, the current amplitude is greatest at this frequency.</p>',
    kcWas: 'At resonance: X<sub>L</sub> = X<sub>C</sub>, Z = R (minimum), I = V/R (maximum).',
    kc: 'For an ideal series RLC circuit at resonance, X<sub>L</sub> = X<sub>C</sub> and Z = R. The current is in phase with the source voltage and is maximal for a fixed source voltage amplitude.',
    fb: [
      ['A', ' In a series RLC circuit, cancellation of the reactances makes the impedance magnitude minimum, equal to R. A maximum-impedance resonance belongs to a different circuit arrangement.'],
      ['B', ' With source voltage amplitude fixed, I = V/Z is greatest when Z is smallest. At series resonance it is R, not a large reactance, that limits the current.'],
      ['D', ' The inductive and capacitive contributions cancel at resonance. The overall circuit is purely resistive at that frequency, although both the inductor and capacitor are still present.']
    ] },

  { q: 'Q44', id: 'phys-164', key: 'C',
    stemWas: 'A magnetic flux through a coil of 200 turns changes by 0.05 Wb in 0.1 s. What is the induced EMF?',
    stem: 'The magnetic flux through each turn of a 200-turn coil changes by 0.05 Wb in 0.1 s. What is the magnitude of the average induced emf?',
    kcWas: "Faraday's law: EMF = N(ΔΦ/Δt).",
    kc: 'If each of N turns experiences the same flux change, the magnitude of the average induced emf is N|ΔΦ|/Δt. Here Φ is flux per turn, not total flux linkage.',
    fb: [
      ['A', ' This is ten times too small. The flux-change rate is 0.05/0.1 = 0.5 Wb/s per turn, which is multiplied by 200 turns.'],
      ['B', ' This would correspond to 100 turns with the same flux change and time. The coil has 200 turns, giving twice that emf.'],
      ['D', ' This is ten times too large. Dividing 0.05 Wb by 0.1 s gives 0.5 Wb/s, not 5 Wb/s.']
    ] },

  { q: 'Q45', id: 'phys-165', key: 'B',
    fb: [
      ['A', ' The neutron number is A − Z. It can vary between isotopes of the same element without changing the atomic number.'],
      ['C', ' The total number of protons and neutrons is the mass number A. Atomic number Z counts only the protons.'],
      ['D', ' Outer-shell electrons influence chemical bonding, but they do not define atomic number. Z is the proton count in the nucleus, even for an ion.']
    ] },

  { q: 'Q46', id: 'phys-166', key: 'B',
    stemWas: 'In α (α) decay, the parent nucleus emits:',
    stem: 'In alpha (α) decay, the parent nucleus emits:',
    fb: [
      ['A', ' An electron is emitted in beta-minus decay. Alpha decay instead emits a composite nucleus containing two protons and two neutrons.'],
      ['C', ' A photon is emitted in gamma decay. Gamma emission changes the nuclear energy state without changing the proton or nucleon count.'],
      ['D', ' A neutron contains neither the two protons nor the two neutrons of an alpha particle. Neutron emission reduces mass number by one and leaves atomic number unchanged.']
    ] },

  { q: 'Q47', id: 'phys-167', key: 'C',
    stemWas: 'A radioactive sample has a half-life of 6 hours. If the initial activity is 800 Bq, what is the activity after 18 hours?',
    stem: 'A radioactive isotope has a half-life of 6 hours and an initial activity of 800 Bq. What is the activity of this isotope after 18 hours?',
    fb: [
      ['A', ' This is the activity after one half-life, or 6 hours. Eighteen hours contains three half-lives.'],
      ['B', ' This is the activity after two half-lives, or 12 hours. One more half-life reduces it to 100 Bq.'],
      ['D', ' This is the activity after four half-lives, or 24 hours. Only three half-lives have passed.']
    ] },

  { q: 'Q48', id: 'phys-168', key: 'C',
    stemWas: 'Which type of radiation has the highest penetrating power?',
    stem: 'Which listed type of radiation consists of high-energy photons, for which thick lead or concrete is commonly used to reduce exposure?',
    options: [
      ['A', 'Α particles', 'α particles'],
      ['B', 'Β particles', 'β particles'],
      ['C', 'Γ rays', 'γ rays']
    ],
    headWas: '<p><strong>Γ rays</strong> are electromagnetic radiation with no charge and high energy, giving them the greatest penetrating power. They can pass through several cm of lead. Α is stopped by paper; β by aluminum.</p>',
    head: '<p>Gamma rays are photons with no electric charge and zero rest mass. They can penetrate barriers that stop many alpha and beta particles, so dense or thick shielding is used to reduce their intensity. Penetration depends on photon energy and the material; there is no universal statement that every gamma ray penetrates farther than every charged particle.</p>',
    kcWas: 'Penetrating power: γ > β > α. Ionizing power: α > β > γ.',
    kc: 'Gamma rays are uncharged photons. Shielding reduces their intensity, with the reduction depending on energy, material and thickness.',
    fb: [
      ['A', ' Alpha particles are helium-4 nuclei with charge +2. They produce dense ionization over a short path and are not photons.'],
      ['B', ' Beta particles are electrons or positrons. They have nonzero rest mass and electric charge, unlike gamma photons.'],
      ['D', ' Protons are positively charged massive particles, not photons. Their range depends strongly on their energy and the material, so they cannot be ranked against all gamma rays without further information.']
    ] },

  { q: 'Q49', id: 'phys-169', key: 'A',
    fb: [
      ['B', ' This does not conserve electric charge for neutron decay: a proton and positron together have charge +2, while a neutron is neutral. Positron emission instead involves a proton converting to a neutron, with a neutrino also emitted.'],
      ['C', ' This would increase the nucleon count from one to two and leave a net positive charge. In beta-minus decay, one neutron becomes one proton, with an electron and electron antineutrino emitted.'],
      ['D', ' A neutron plus a photon is not the beta-minus transformation. In beta-minus decay the neutron changes into a proton, and the emitted beta particle is an electron.']
    ] },

  { q: 'Q50', id: 'phys-170', key: 'C',
    headWas: '<p><strong>Iron-56</strong> has the highest binding energy per nucleon (~8.8 MeV), making it the most stable nucleus. Lighter elements can release energy by fusion; heavier elements by fission.</p>',
    head: '<p>The binding-energy-per-nucleon curve reaches its highest region among iron and nickel nuclei, at about 8.8 MeV per nucleon. Iron-56 is therefore the correct nearby choice in this list, although nickel-62 has a slightly higher value. Fusion of suitable light nuclei and fission of suitable heavy nuclei can release energy by producing more tightly bound products.</p>',
    kcWas: 'Iron-56 is at the peak of the binding energy curve - most stable nucleus.',
    kc: 'Binding energy per nucleon peaks in the iron-nickel region. Fe-56 is near the peak; Ni-62 has the highest value.',
    fb: [
      ['A', ' A hydrogen-1 nucleus is a single proton and has no binding between nucleons. Suitable fusion reactions involving hydrogen can release energy by forming more tightly bound nuclei.'],
      ['B', ' Helium-4 is tightly bound for a light nucleus, but its binding energy per nucleon is lower than that of nuclei in the iron-nickel peak region.'],
      ['D', ' Uranium nuclei are heavy and have lower binding energy per nucleon than the peak region. Their fission can release energy when the products are more tightly bound per nucleon.']
    ] }

];
