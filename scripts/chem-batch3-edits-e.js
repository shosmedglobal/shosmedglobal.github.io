/**
 * Chemistry review batch 3, display Q42-Q50 (chem-163..chem-171).
 * Q41 (chem-162) is kept byte-identical per the review and has no spec here.
 * Q42 is the major rewrite: new stem, new option D, and a complete replacement
 * of its explanation, feedback, five points and Bottom Line.
 */
'use strict';

module.exports = [

{ q: 'Q42', id: 'chem-163', key: 'D', expectPoints: 5,
  stem: 'Which of the following increases the entropy of the substance undergoing the process? Assume each process occurs at constant temperature and treat any gas as ideal.',
  options: [[3, 'An ideal gas expanding into a larger volume']],
  main: [
    'At constant temperature, an ideal gas has greater entropy when it occupies a larger volume. More positions and arrangements are available to its particles. The temperature condition matters: changing temperature as well as volume would require considering both effects. Freezing and condensation decrease the entropy of the substance, while isothermal compression decreases the entropy of an ideal gas.'
  ],
  feedback: {
    A: 'Freezing changes liquid water into ice and decreases the water\'s entropy at the phase-transition temperature. The surroundings can gain entropy from released heat, but the question asks about the substance itself.',
    B: 'Compressing an ideal gas at constant temperature reduces the space available to its particles and decreases its entropy. Expansion gives the opposite sign.',
    C: 'Condensation changes vapor into liquid and decreases the entropy of the condensing substance at the transition temperature. The entropy change of the surroundings is a separate quantity.'
  },
  points: [
    'Entropy is related to the number of accessible microscopic arrangements, not simply visible disorder.',
    'Isothermal expansion increases the entropy of an ideal gas; isothermal compression decreases it.',
    'Freezing and condensation decrease the entropy of the substance undergoing the phase change.',
    'Distinguish the entropy change of the system from that of its surroundings.',
    'Dissolving an ionic solid is not automatically an entropy increase: changes in solvent organization also contribute.'
  ],
  bottom: 'At constant temperature, an ideal gas gains entropy on expansion. The sign of an entropy change must be assessed for the specified system and conditions.',
  gone: ['Solid dissolving in water to form ions',
         'Dissolving an ionic solid converts one ordered lattice into many independently moving ions, so the entropy change is positive.',
         'Reducing the volume available to a gas reduces the positions its molecules can occupy, so entropy falls.',
         'Physical state is a reliable guide']
},

{ q: 'Q43', id: 'chem-164', key: 'B', expectPoints: 5,
  stem: 'Treat ΔH = +50 kJ and ΔS = +100 J/K as temperature-independent. What is the threshold temperature above which ΔG = ΔH − TΔS becomes negative?',
  edits: [
    ['Above 500 K, the reaction becomes spontaneous.</p>',
     'Above 500 K, the reaction becomes spontaneous. At exactly 500 K, ΔG = 0; the forward process has ΔG < 0 only above 500 K.</p>']
  ],
  feedback: {
    C: 'At 250 K, ΔG = 50 kJ − 250 K × 0.100 kJ/K = +25 kJ, so the forward process is still unfavorable. The threshold follows from ΔG = 0 and is 500 K.'
  },
  bottom: 'With these positive, temperature-independent values, ΔG = 0 at 500 K and ΔG < 0 above 500 K.',
  gone: ['250 K would follow from a unit slip - for example dividing 50 kJ by 100 J/K without first converting the enthalpy change to joules.'],
  keep: ['T > ΔH/ΔS = 50,000 J / 100 J/K = 500 K',
         'Find it by setting ΔG = 0, which gives T = ΔH/ΔS.']
},

{ q: 'Q44', id: 'chem-165', key: 'D', expectPoints: 5,
  stem: 'In a constant-pressure calorimeter, 200 mL of 1.0 M HCl is mixed with 200 mL of 1.0 M NaOH, raising the solution temperature by 6.8 °C. Neglect heat loss and the calorimeter\'s heat capacity, and assume volumes are additive. Estimate the reaction enthalpy per mole of water formed. (Solution density = 1.0 g/mL; specific heat = 4.18 J·g⁻¹·°C⁻¹)',
  main: [
    'Total mass = 400 g. q_solution = mcΔT = 400 × 4.18 × 6.8 ≈ +11,370 J = +11.37 kJ, so q_reaction ≈ −11.37 kJ. The reaction forms 0.200 mol water, giving ΔH ≈ −11.37/0.200 = −56.8 kJ/mol.',
    'Dilute aqueous strong-acid/strong-base neutralizations commonly release about 57 kJ per mole of water formed because their net reaction is H⁺ + OH⁻ → H₂O. Actual measured values also depend on conditions, including dilution and heat losses.'
  ],
  pointEdits: [
    [1, 'First calculate heat absorbed by the combined solution: q_solution = mcΔT, with total mass 400 g.'],
    [2, 'q_solution ≈ +11.37 kJ; neglecting other heat transfers, q_reaction ≈ −11.37 kJ.'],
    [3, 'The 1:1 HCl/NaOH reaction forms 0.200 mol water, giving approximately −56.8 kJ per mole of water.'],
    [5, 'The approximately −57 kJ/mol benchmark applies to dilute aqueous strong-acid/strong-base neutralization per mole of water, not every acid/base mixture under all conditions.']
  ],
  bottom: 'Calculate the solution\'s heat gain, reverse its sign for the reaction under the stated assumptions, then divide by moles of water formed.',
  gone: ['The standard enthalpy of neutralization for strong acid + strong base is approximately -57 kJ/mol.',
         'Any strong acid with any strong base gives close to −57 kJ/mol'],
  keep: ['This is a factor of ten too small',
         'The value is negative because the solution warmed, meaning the reaction released heat to it.']
},

{ q: 'Q45', id: 'chem-166', key: 'C', expectPoints: 5,
  pointEdits: [
    [3, 'The third law provides an absolute reference for entropy; tabulated enthalpies instead use a chosen reference convention.'],
    [4, 'The zero-entropy statement refers to a perfect crystal. Frozen-in disorder can lead to residual entropy, so real samples need not satisfy that idealization.']
  ],
  gone: ['whereas enthalpies are only ever quoted as changes',
         'real crystals with defects or disorder retain some residual entropy at 0 K'],
  keep: ['It also explains why absolute zero can be approached but never actually reached.',
         'Bottom Line: Third law of thermodynamics: S = 0 for a perfect crystal at T = 0 K.']
},

{ q: 'Q46', id: 'chem-167', key: 'B', expectPoints: 5,
  edits: [
    ['<p>Alpha particles are the heaviest and least penetrating form of radiation, stopped by a sheet of paper.</p>',
     '<p>Among the usual alpha, beta and gamma decay emissions, alpha particles have the largest rest mass and a short penetration range. They can be stopped by paper or the outer dead layer of intact skin, but alpha-emitting material can be damaging if it enters the body.</p>'],
    ['Gamma emission releases a high-energy photon with neither mass nor charge, so it changes neither the mass number nor the atomic number.',
     'Gamma emission releases a high-energy photon with zero rest mass and no charge, so it changes neither the mass number nor the atomic number.']
  ],
  feedback: {
    D: 'A positron is the electron\'s antiparticle, with a small but nonzero rest mass and charge +1. An alpha particle instead contains two protons and two neutrons and has charge +2.'
  },
  pointEdits: [
    [3, 'Alpha particles have charge +2 and produce dense ionization along a short path, so their penetration is low.'],
    [4, 'The outer dead layer of intact skin usually blocks alpha particles; inhaled or ingested alpha emitters can irradiate living tissue directly.'],
    [5, 'Beta particles are electrons or positrons with smaller rest mass; gamma photons have zero rest mass. Penetration and shielding also depend on radiation energy and the material.']
  ],
  gone: ['Alpha particles are the heaviest and least penetrating form of radiation',
         'That combination makes external alpha sources relatively harmless',
         'Positron emission releases the antimatter counterpart of an electron: negligible mass, charge +1.'],
  keep: ['An alpha particle is a helium-4 nucleus: two protons and two neutrons.',
         'Bottom Line: Alpha particle = He-4 nucleus (2p + 2n); reduces mass number by 4 and atomic number by 2.']
},

{ q: 'Q47', id: 'chem-168', key: 'A', expectPoints: 5,
  feedback: {
    C: 'Two protons and one electron would have net charge +1, whereas the neutron is uncharged. Beta-minus decay instead gives one proton, one electron and an electron antineutrino, with total charge zero.',
    D: 'A positron and an electron neutrino are emitted in beta-plus decay, in which a proton in a suitable nucleus changes into a neutron. The full process also includes that neutron. Beta-minus decay instead emits an electron and an electron antineutrino as a neutron changes into a proton.'
  },
  gone: ['This would not conserve charge or mass.',
         'Beta-minus decay runs the other way, converting a neutron into a proton and emitting an electron with an antineutrino.'],
  keep: ['An alpha particle contains two protons and two neutrons - far more mass than a single neutron holds.',
         'Bottom Line: Beta-minus decay: n -> p + e- + antineutrino; atomic number increases by 1, mass number unchanged.']
},

{ q: 'Q48', id: 'chem-169', key: 'B', expectPoints: 5,
  main: [
    'Gamma rays are high-energy photons with zero rest mass and no electric charge. They often carry away excitation energy after alpha or beta decay. Emitting a gamma photon changes the nucleus\'s energy but not its mass number or atomic number. Gamma radiation is generally more penetrating than typical alpha or beta radiation; shielding such as lead or concrete reduces its intensity.'
  ],
  feedback: {
    D: 'A sheet of paper readily stops typical alpha particles, but it is ineffective as substantial gamma shielding. Gamma intensity is reduced using sufficient thickness of suitable material, often lead or concrete; the reduction depends on photon energy and the shield.'
  },
  points: [
    'Gamma radiation consists of photons with zero rest mass and no charge.',
    'A photon is emitted, but no proton or neutron is removed; mass number and atomic number stay unchanged.',
    'Gamma emission lowers the nucleus\'s excitation energy and often follows another radioactive decay.',
    'Gamma photons can produce ionization indirectly by transferring energy to charged particles such as electrons.',
    'Shielding attenuates gamma radiation; penetration depends on photon energy and material, so the simple alpha/beta/gamma ranking is a general comparison rather than a universal inverse law.'
  ],
  bottom: 'Gamma emission releases a photon and lowers nuclear excitation energy without changing mass number or atomic number.',
  gone: ['Because no particle leaves the nucleus',
         'Ionising power and penetrating power run opposite to one another',
         'Gamma rays have the highest penetrating power and require thick lead or concrete shielding.',
         'Paper stops alpha particles, because their large mass and double charge make them lose energy very quickly.'],
  keep: ['Alpha particles carry the positive charge, at +2.',
         'Alpha particles are the most massive of the three radiations, at four atomic mass units.']
},

{ q: 'Q49', id: 'chem-170', key: 'A', expectPoints: 5,
  edits: [
    ['<p>After each half-life, exactly half of the remaining radioactive material decays. After 3 half-lives, 1/8 of the original remains.</p>',
     '<p>The decay law predicts that, on average, half the undecayed nuclei remain after each half-life. For a macroscopic sample, this gives 64 → 32 → 16 → 8 g of the original isotope over three half-lives.</p>']
  ],
  pointEdits: [
    [4, 'Decay is exponential rather than linear: each half-life halves the expected amount still present as the original isotope. Individual nuclei decay at random times.'],
    [5, 'For ordinary laboratory conditions, the isotope\'s half-life is usually treated as constant; ordinary changes in temperature or pressure do not appreciably change most radioactive decay rates.']
  ],
  gone: ['exactly half of the remaining radioactive material decays',
         'so the amount approaches but never reaches zero',
         'is unaffected by temperature, pressure, or chemical combination'],
  keep: ['Number of half-lives = 24/8 = 3',
         'Bottom Line: After n half-lives, the remaining amount = initial amount x (1/2)<sup>n</sup>.']
},

{ q: 'Q50', id: 'chem-171', key: 'D', expectPoints: 5,
  edits: [
    ['The emitted particle has mass 4 and charge +2, which is an α particle (He-4).',
     'The emitted particle has mass number 4 and charge +2, which is an α particle (He-4).'],
    ['<p>Conservation of mass number and atomic number must hold in all nuclear equations.</p>',
     '<p>Balance total nucleon number and total electric charge, including the emitted particles, on the two sides of a nuclear equation.</p>'],
    ['A beta particle has essentially no mass number and a charge of −1, so emitting one raises the atomic number by 1 while leaving the mass number unchanged.',
     'An electron has mass number zero, despite having a small nonzero rest mass, and charge −1; beta-minus emission raises the daughter\'s atomic number by one without changing its mass number.']
  ],
  feedback: {
    C: 'A neutron has mass number 1 and charge zero. If U-238 emitted one neutron, the daughter would be U-237, with atomic number still 92, not thorium. The stated daughter Th-234 requires a loss of four nucleons and two units of nuclear charge, identifying an alpha particle.'
  },
  pointEdits: [
    [1, 'Nuclear equations balance total nucleon number and electric charge, including electrons or positrons when present.']
  ],
  bottom: 'Balance nucleon number and charge: U-238 → Th-234 requires emission of a helium-4 nucleus, an alpha particle.',
  gone: ['Emitting one would give thorium-237',
         'Conservation of mass number and atomic number must hold in all nuclear equations.',
         'Nuclear equations must conserve both mass number and atomic number.'],
  keep: ['Mass number: 238 = 234 + 4. Atomic number: 92 (U) = 90 (Th) + 2.',
         'Here the mass number falls by 4.']
}

];
