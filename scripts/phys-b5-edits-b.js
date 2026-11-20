/* Physics FINAL-block edit specs, display Q9-Q16. See phys-b5-edits-a.js for
   the conventions. Q12 onward is the third band: one Key Concept, no stored
   feedback, so all three bodies are new. */
'use strict';
module.exports = [

  { q: 'Q9', id: 'phys-248', key: 'C',
    stemWas: 'The activity of a radioactive sample as a function of time follows which mathematical relationship?',
    stem: 'For a sample containing a single radioactive parent isotope with constant decay constant λ and no production of new parent nuclei, the expected activity of that isotope follows which relationship?',
    existingFb: [
      ['A', 'Linear decrease: A(t) = A0 - kt', ' A linear decrease would mean the activity drops by a constant amount per unit time, eventually reaching exactly zero and potentially going negative. In reality, each half-life reduces the activity by half of its current value (not a fixed amount), so the decline slows as fewer nuclei remain. Radioactive decay never follows a straight line.'],
      ['B', 'Quadratic decrease: A(t) = A0 - kt<sup>2</sup>', ' A quadratic decrease would initially be slow, then accelerate -- the opposite of what actually occurs. In radioactive decay, the rate of decrease is fastest at the beginning (when there are the most undecayed nuclei) and progressively slows.'],
      ['D', 'Logarithmic decrease: A(t) = A0 ln(t)', ' This expression is mathematically problematic (it is undefined at t = 0 and increases with time for A0 > 0). Logarithmic functions do not describe the temporal behavior of radioactive decay.']
    ],
    fbKeep: ['B'], fbReplace: ['A', 'D'],
    fb: [
      ['A', ' A linear law removes a fixed amount of activity per unit time. The decay law instead removes a fixed fraction over equal time intervals, giving an exponential curve. A straight line can approximate a very short part of that curve, but is not the general law.'],
      ['D', ' As written, ln(t) is undefined at t = 0 and increases with t, so this expression is not the stated decay law. A logarithm should also have a dimensionless argument. It is ln[A(t)/A<sub>0</sub>], rather than A(t), that varies linearly with time.']
    ],
    epWas: [
      'The <strong>half-life</strong> (t1/2) is related to the decay constant: t1/2 = ln(2)/lambda ≈ 0.693/lambda.',
      'After n half-lives, the remaining activity is: A = A0 x (1/2)<sup>n</sup>.',
      'The exponential nature means radioactive material theoretically never fully decays to zero; it asymptotically approaches zero.',
      'Common medical isotopes: Tc-99m (t1/2 = 6 hours), I-131 (t1/2 = 8 days), Co-60 (t1/2 = 5.27 years).'
    ],
    epEdits: [
      [3, 'The exponential curve describes expected activity for a population of radioactive nuclei. Individual decays are random, and a finite sample can eventually have no parent nuclei left.']
    ] },

  { q: 'Q10', id: 'phys-249', key: 'B',
    existingFb: [
      ['A', '5 days', ' This would require λ = 0.693/5 = 0.1386 per day, which is twice the given value. You might get this if you mistakenly used t1/2 = 0.5/lambda or confused the formula.'],
      ['C', '14.4 days', ' This would correspond to λ = 0.693/14.4 ≈ 0.0481 per day. This error might arise from using 1/lambda instead of ln(2)/lambda. The <strong>mean lifetime</strong> (τ) = 1/lambda = 1/0.0693 = 14.4 days. Mean lifetime and half-life are related but not equal: τ = t1/2/ln(2) ≈ 1.443 x t1/2.'],
      ['D', '69.3 days', ' This results from incorrectly using t1/2 = ln(2) x (1/lambda) x 100 or simply confusing the formula. This value has no physical meaning in this context.']
    ],
    fbKeep: ['C'], fbReplace: ['A', 'D'],
    fb: [
      ['A', ' A half-life of 5 days would require λ = ln(2)/5 ≈ 0.1386 day<sup>−1</sup>, twice the stated decay constant. With λ = 0.0693 day<sup>−1</sup>, the half-life is about 10 days.'],
      ['D', ' A half-life of 69.3 days would require λ ≈ 0.0100 day<sup>−1</sup>. The given value is 0.0693 day<sup>−1</sup>, and 0.693/0.0693 = 10. Keep the units: a dimensionless number divided by day<sup>−1</sup> gives days.']
    ],
    epWas: [
      'Key relationships: t1/2 = ln(2)/lambda = 0.693/lambda. Mean lifetime: τ = 1/lambda = t1/2/0.693.',
      'Do not confuse half-life and mean lifetime. The mean lifetime is always longer than the half-life by a factor of 1/ln(2) ≈ 1.443.',
      'Quick check: after one half-life (10 days), 50% of the original sample remains. After two half-lives (20 days), 25% remains. After three (30 days), 12.5% remains.'
    ],
    epEdits: [] },

  { q: 'Q11', id: 'phys-250', key: 'B',
    stemWas: 'A substance is described as isotropic. This means that its physical properties are:',
    stem: 'A material is described as isotropic with respect to a particular physical property. This means that the values of that property are:',
    options: [['C', 'Dependent on the temperature but not direction', 'The same at all temperatures']],
    headWas: '<p>An <strong>isotropic</strong> substance has physical properties (such as refractive index, thermal conductivity, electrical conductivity, elasticity, and speed of wave propagation) that are <strong>identical in every direction</strong>. The prefix "iso-" means equal, and "tropos" means direction.</p>',
    head: '<p>For the property being considered, isotropic means that its value does not depend on direction. For example, isotropic thermal conductivity is the same whichever direction heat flows. This does not mean the property is independent of temperature, or that every other property of the material is also isotropic.</p>',
    existingFb: [
      ['A', 'Different in different directions', ' This defines an <strong>anisotropic</strong> substance. Anisotropic materials have direction-dependent properties. Examples include many crystals (calcite shows double refraction because its refractive index differs along different crystal axes), wood (stronger along the grain), and skeletal muscle (contracts along one axis).'],
      ['C', 'Dependent on the temperature but not direction', ' While isotropic materials do have properties that change with temperature, temperature dependence is not what defines isotropy. Isotropy specifically refers to <strong>directional uniformity</strong>. Both isotropic and anisotropic materials can have temperature-dependent properties.'],
      ['D', 'Uniform only along one specific crystal axis', ' If properties are uniform along only one axis, the material is <strong>anisotropic</strong> with a specific symmetry (possibly uniaxial). An isotropic material must have the same properties in <strong>all</strong> directions, not just along one axis.']
    ],
    fbKeep: ['A'], fbReplace: ['C', 'D'],
    fb: [
      ['C', ' Isotropy concerns direction, not temperature. An isotropic material can have a property whose value changes when its temperature changes.'],
      ['D', ' Uniformity along a single direction does not establish isotropy. The relevant property must have the same value when measured in all directions.']
    ],
    epWas: [
      'Common isotropic materials: <strong>amorphous solids</strong> (glass), <strong>liquids</strong>, <strong>gases</strong>, and <strong>cubic crystals</strong> (NaCl, diamond) -- these all have the same properties in every direction.',
      'Common anisotropic materials: non-cubic crystals (quartz, calcite), wood, biological tissues (muscle, bone), liquid crystals.',
      'In biophysics, understanding isotropy vs. anisotropy is important for: ultrasound propagation in tissues, diffusion tensor imaging (DTI) in MRI (which maps anisotropic water diffusion in white matter tracts), and mechanical properties of bone.'
    ],
    epBlock: [
      'Ordinary unstressed glass and fluids at rest are often modeled as isotropic. Isotropy should always be tied to the property and conditions being considered.',
      'Cubic crystals can be isotropic for some properties, such as electrical conductivity, while still having direction-dependent elastic properties.',
      'Wood, muscle and bone often have direction-dependent properties. In diffusion tensor MRI, direction-dependent water diffusion helps characterize the organization of white matter.'
    ],
    blWas: 'Isotropic = same properties in all directions ("iso" = equal, "tropos" = direction). Anisotropic = different properties in different directions. Gases, liquids, glass, and cubic crystals are isotropic. Most biological tissues and non-cubic crystals are anisotropic.',
    bl: 'Isotropic means independent of direction for the specified property. It does not mean independent of temperature, and crystal symmetry does not guarantee isotropy for every property.' },

  /* ---------------- third band: Q12 onward ---------------- */

  { q: 'Q12', id: 'phys-251', key: 'C',
    stemWas: 'An ideal gas with adiabatic index γ = 5/3 is compressed adiabatically from volume 8 L to 1 L. If the initial pressure is 100 kPa, what is the final pressure?',
    stem: 'An ideal gas with constant adiabatic index γ = 5/3 is compressed reversibly and adiabatically from 8 L to 1 L. If the initial pressure is 100 kPa, what is the final pressure?',
    headEdits: [['<p>For an adiabatic process: p<sub>1</sub>V<sub>1</sub><sup>&gamma;</sup> = p<sub>2</sub>V<sub>2</sub><sup>&gamma;</sup></p>',
      '<p>For a reversible adiabatic process of an ideal gas with constant γ: p<sub>1</sub>V<sub>1</sub><sup>γ</sup> = p<sub>2</sub>V<sub>2</sub><sup>γ</sup></p>']],
    fb: [
      ['A', ' 800 kPa follows from p<sub>1</sub>V<sub>1</sub> = p<sub>2</sub>V<sub>2</sub>, which describes an isothermal ideal-gas process. This compression is reversible and adiabatic, so use the exponent γ = 5/3.'],
      ['B', ' 1600 kPa is a factor of 16 above the initial pressure. The required factor is 8<sup>5/3</sup> = (8<sup>1/3</sup>)<sup>5</sup> = 2<sup>5</sup> = 32.'],
      ['D', ' 6400 kPa is a factor of 64 above the initial pressure, as if the volume ratio were squared. The given exponent is 5/3, not 2.']
    ],
    kcWas: 'In adiabatic compression, pV<sup>&gamma;</sup> = constant. Since &gamma; > 1, pressure rises faster than in an isothermal process. For monatomic gas, &gamma; = 5/3.',
    kc: 'For a reversible adiabatic ideal-gas process with constant γ, pV<sup>γ</sup> = constant. Compression raises the temperature and makes the pressure rise more steeply than in an isothermal compression. Here γ = 5/3 gives p<sub>2</sub>/p<sub>1</sub> = 8<sup>5/3</sup> = 32.' },

  { q: 'Q13', id: 'phys-252', key: 'B',
    stemWas: 'In an adiabatic expansion of an ideal gas, which of the following is TRUE?',
    stem: 'An ideal gas expands adiabatically against an external pressure and does positive work on its surroundings. With no other energy transfers and negligible changes in bulk kinetic and gravitational energy, which statement is true?',
    headWas: "<p>In an adiabatic process, Q = 0 (no heat exchange). The first law of thermodynamics gives:</p><div class='exp-diagram'><p>&Delta;U = Q − W = 0 − W = −W</p></div><p>During expansion, the gas does positive work (W > 0), so &Delta;U is negative: internal energy <strong>decreases</strong>. Since internal energy is proportional to temperature for an ideal gas, the temperature <strong>falls</strong>.</p><table class='exp-table'><tr><th>Process</th><th>Adiabatic Compression</th><th>Adiabatic Expansion</th></tr><tr><td>Q</td><td>0</td><td>0</td></tr><tr><td>Work on gas</td><td>Positive (compressed)</td><td>Negative (expands)</td></tr><tr><td>&Delta;U</td><td>Increases</td><td>Decreases</td></tr><tr><td>Temperature</td><td>Rises</td><td>Falls</td></tr></table>",
    head: "<p>Adiabatic means Q = 0. With W defined as work done by the gas, the first law is ΔU = Q − W = −W. Here W > 0, so the internal energy decreases. For an ideal gas, internal energy depends on temperature, so the gas cools. Adiabatic free expansion into a vacuum is different: W = 0 as well as Q = 0, so an ideal gas has no temperature change.</p><table class='exp-table'><tr><th>Quantity</th><th>Adiabatic compression with work done on the gas</th><th>Adiabatic expansion with work done by the gas</th></tr><tr><td>Heat Q</td><td>0</td><td>0</td></tr><tr><td>Work done by gas W</td><td>Negative</td><td>Positive</td></tr><tr><td>Change in internal energy ΔU</td><td>Positive</td><td>Negative</td></tr><tr><td>Temperature</td><td>Rises</td><td>Falls</td></tr></table>",
    fb: [
      ['A', ' Adiabatic excludes heat transfer, so the gas does not absorb heat from its surroundings. It cools here because it does work using its internal energy.'],
      ['C', ' No heat transfer does not by itself mean constant temperature. Here the gas does positive work, so ΔU = −W < 0 and its temperature falls.'],
      ['D', ' The gas can lose internal energy through work even when no heat leaves it. Positive work done by the gas reduces its internal energy in this process.']
    ],
    kcWas: 'Adiabatic means Q = 0, NOT &Delta;T = 0. Temperature changes because internal energy is converted to/from work. Adiabatic expansion cools the gas; adiabatic compression heats it.',
    kc: 'Adiabatic means no heat transfer. An ideal gas cools during adiabatic expansion when it does positive work; free expansion into a vacuum has no work and no temperature change.' },

  { q: 'Q14', id: 'phys-253', key: 'B',
    stemWas: 'A 2 kg mass oscillates on a spring with spring constant k = 800 N/m. What is the period of oscillation?',
    stem: "A 2 kg mass oscillates on an ideal massless spring with spring constant k = 800 N/m. The spring obeys Hooke's law and damping is negligible. What is the period?",
    fb: [
      ['A', ' 0.157 s is half the correct period. The factor for a full cycle is 2π, giving T = 2π√(2/800) ≈ 0.314 s.'],
      ['C', ' 0.628 s is twice the correct period. Here √(m/k) = √(2/800) = 0.05 s, so T = 2π × 0.05 s.'],
      ['D', ' 1.257 s is about four times the correct period. The angular frequency is √(k/m) = 20 rad/s, and T = 2π/20 ≈ 0.314 s.']
    ],
    kcWas: 'T = 2&pi;&radic;(m/k) for a spring-mass system. The period does NOT depend on amplitude. Heavier mass = longer period. Stiffer spring (larger k) = shorter period.',
    kc: 'For an ideal undamped mass–spring oscillator, T = 2π√(m/k). In this model the period is independent of amplitude: increasing mass lengthens the period, while increasing stiffness shortens it.' },

  { q: 'Q15', id: 'phys-254', key: 'B',
    stemWas: 'A simple pendulum has a period of 2 seconds on Earth (g = 10 m/s<sup>2</sup>). What is the length of the pendulum?',
    stem: 'A simple pendulum undergoing small-angle oscillations has a period of 2.0 s where g = 10 m/s<sup>2</sup>. What is its approximate length?',
    fb: [
      ['A', ' A length of 0.5 m would give T = 2π√(0.5/10) ≈ 1.4 s. A 2.0 s period requires a longer pendulum.'],
      ['C', ' A length of 1.5 m would give a period of about 2.4 s. Using the stated 2.0 s period gives L = gT<sup>2</sup>/(4π<sup>2</sup>) ≈ 1.0 m.'],
      ['D', ' A length of 2.0 m would give a period of about 2.8 s. The length is proportional to T<sup>2</sup>, so a period of 2.0 s does not mean a length of 2.0 m.']
    ] },

  { q: 'Q16', id: 'phys-255', key: 'B',
    headEdits: [
      ['<p>In SHM, energy continuously converts between kinetic and potential forms:</p>',
        '<p>For ideal undamped SHM, choose the oscillation potential energy to be zero at equilibrium. Energy then continuously converts between kinetic and potential forms:</p>'],
      ['<p>At equilibrium, all energy is kinetic: KE<sub>max</sub> = &frac12;kA<sup>2</sup>. At the extremes, all energy is potential: PE<sub>max</sub> = &frac12;kA<sup>2</sup>. The total mechanical energy E = KE + PE = &frac12;kA<sup>2</sup> is constant throughout.</p>',
        '<p>With this choice of zero, all of the oscillation energy is kinetic at equilibrium: KE<sub>max</sub> = &frac12;kA<sup>2</sup>. At the extremes it is potential: PE<sub>max</sub> = &frac12;kA<sup>2</sup>. The total oscillation energy E = KE + PE = &frac12;kA<sup>2</sup> stays constant.</p>']
    ],
    fb: [
      ['A', ' At maximum displacement the oscillator momentarily stops before reversing direction, so its kinetic energy is zero.'],
      ['C', ' Between the center and a turning point, the oscillator has both kinetic and potential energy. Its speed, and therefore kinetic energy, is greatest at the center.'],
      ['D', ' The total mechanical energy is constant for ideal undamped SHM, but kinetic and potential energy change throughout the cycle.']
    ] }

];
