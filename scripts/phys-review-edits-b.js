/* Physics 60-block edit specs, display Q11-Q20. */
'use strict';
module.exports = [

  { q: 'Q11', id: 'phys-11', key: 'D',
    stemMustContain: 'has the shortest wavelength',
    stem: 'In the usual ordering of the electromagnetic spectrum from long to short wavelengths, which of these categories is placed at the shortest-wavelength end?',
    headEdits: [
      ['<p>Electromagnetic radiation ranges from very long wavelength (radio waves) to very short wavelength (γ rays). Shorter wavelength means higher frequency and higher energy.</p>',
       '<p>The conventional spectrum ordering places gamma rays at the shortest-wavelength end. In vacuum, shorter wavelength means higher frequency and greater energy per photon.</p>'],
      ['<th>Wavelength Range</th><th>Energy</th>', '<th>Approximate conventional wavelength range</th><th>Typical photon energy</th>'],
      ['<tr><td>Radio waves</td><td>> 1 m</td>', '<tr><td>Radio waves excluding the microwave band shown below</td><td>> 1 m</td>'],
      ["</table><div class='exp-diagram'>",
       "</table><p>These bands are a learning guide rather than strict boundaries. X-ray and gamma-ray energies can overlap; the names may also distinguish how the radiation is produced.</p><div class='exp-diagram'>"]
    ],
    fb: [
      ['A', ' Radio waves occupy the long-wavelength, low-frequency end of the electromagnetic spectrum. They do not have the shortest wavelengths among these choices.'],
      ['B', ' Visible wavelengths are roughly 400-700 nm. Ultraviolet and the conventional gamma-ray region lie at shorter wavelengths.'],
      ['C', ' Ultraviolet wavelengths are shorter than visible wavelengths, but the gamma-ray region is conventionally placed at still shorter wavelengths.']
    ] },

  { q: 'Q12', id: 'phys-12', key: 'B',
    headEdits: [
      ['<td><strong>Electron + antineutrino</strong></td>', '<td><strong>Electron + electron antineutrino</strong></td>'],
      ['<td>Positron + neutrino</td>', '<td>Positron + electron neutrino</td>'],
      ['<td>Α particle (<sup>4</sup>He)</td>', '<td>Α particle (<sup>4</sup><sub>2</sub>He)</td>'],
      ['<p><sup>A</sup><sub>Z</sub>X -> <sup>A</sup><sub>Z+1</sub>Y + e<sup>-</sup> + antineutrino</p>',
       '<p><sup>A</sup><sub>Z</sub>X → <sup>A</sup><sub>Z+1</sub>Y + e<sup>-</sup> + ν̄<sub>e</sub></p>'],
      ['<p>Example: <sup>14</sup><sub>6</sub>C -> <sup>14</sup><sub>7</sub>N + e<sup>-</sup> + antineutrino (carbon-14 dating)</p>',
       '<p>Example: <sup>14</sup><sub>6</sub>C → <sup>14</sup><sub>7</sub>N + e<sup>-</sup> + ν̄<sub>e</sub> (carbon-14 dating)</p>']
    ],
    kcMustContain: 'lepton number are conserved',
    kc: 'In beta-minus decay, a neutron becomes a proton, so the daughter has Z increased by 1 and the same A. Total electric charge is conserved when the emitted electron is included. Nuclear-decay equations conserve total energy, not the sum of rest masses.',
    fb: [
      ['A', " An alpha particle contains two protons and two neutrons. Alpha emission reduces the daughter's mass number by 4 and atomic number by 2; that is not beta-minus decay."],
      ['C', ' A positron and an electron neutrino are emitted in beta-plus decay, in which a proton converts to a neutron. Beta-minus decay has the opposite nucleon conversion.'],
      ['D', ' Beta-minus decay converts one neutron into a proton within the nucleus. It does not eject two protons and a neutron as the emitted particles.']
    ] },

  { q: 'Q13', id: 'phys-13', key: 'C',
    stemMustContain: 'What is the power output of the crane',
    stem: "A crane raises a 500 kg load by 10 m in 25 s. What is the average useful power associated with increasing the load's gravitational potential energy? (g = 10 m/s<sup>2</sup>)",
    headEdits: [
      ['<td>Power</td><td>P = W/t = F x v</td>', '<td>Power</td><td>P<sub>average</sub> = W/Δt; instantaneous P = Fv cosθ</td>'],
      ['<td>Potential energy</td><td>PE = mgh</td>', "<td>Potential energy</td><td>PE = mgh, gravitational potential energy near Earth's surface</td>"],
      ['<p>Alternative approach: P = Fv = mg x (h/t) = 500 x 10 x (10/25) = 5000 x 0.4 = 2000 W.</p>',
       '<p>The useful lifting force against gravity is mg = 5000 N. Multiplying it by the average upward speed, 10/25 = 0.4 m/s, also gives the average useful power of 2000 W.</p>']
    ],
    kcMustContain: '1 horsepower (hp) = 746 W',
    kc: 'Average power is work divided by elapsed time; 1 W = 1 J/s. One mechanical horsepower is approximately 746 W. Holding a load stationary does no mechanical work on that load, although supporting muscles still consume metabolic energy.',
    fb: [
      ['A', ' 200 W would supply only 5000 J in 25 s. Raising this load requires mgh = 50,000 J.'],
      ['B', ' The mass is 500 kg, but mass is not power. Divide the 50,000 J increase in gravitational potential energy by 25 s.'],
      ['D', " 5000 N is the load's weight. Power also depends on lifting speed; using the average speed 10/25 = 0.4 m/s gives 2000 W."]
    ] },

  { q: 'Q14', id: 'phys-14', key: 'B',
    stemMustContain: 'collides head-on with a stationary 2000 kg truck',
    stem: 'A 1000 kg car traveling at 20 m/s collides with a stationary 2000 kg truck, and they stick together. Neglect external impulse during the collision. What is their common speed immediately afterward?',
    headEdits: [
      ['<p>v<sub>f</sub> = 20,000 / 3000 = <strong>6.67 m/s</strong></p>',
       "<p>v<sub>f</sub> = 20,000 / 3000 = <strong>6.67 m/s</strong></p><p>They move in the car's original direction.</p>"],
      ["<table class='exp-table'><tr><th>Collision Type</th>",
       "<p>For a system with negligible external impulse:</p><table class='exp-table'><tr><th>Collision Type</th>"],
      ['<td><strong>No (maximum KE loss)</strong></td>', '<td><strong>No; bodies stick together</strong></td>'],
      ['<td>No (some KE lost)</td>', '<td>No; kinetic energy is converted to other forms</td>'],
      ['<p>KE before = 1/2 x 1000 x 20<sup>2</sup> = 200,000 J. KE after = 1/2 x 3000 x 6.67<sup>2</sup> = 66,700 J. About 2/3 of the kinetic energy was converted to heat, sound, and deformation.</p>',
       '<p>KE before = 1/2 x 1000 x 20<sup>2</sup> = 200,000 J. KE after ≈ 6.67 × 10<sup>4</sup> J, calculated from the unrounded final speed. About 2/3 of the kinetic energy was converted to heat, sound, and deformation.</p>']
    ],
    kcMustContain: 'lose the maximum amount of kinetic energy',
    kc: 'Total momentum is conserved when external impulse is negligible. Elastic collisions also conserve total kinetic energy. In a perfectly inelastic collision the bodies stick together; the lost kinetic energy becomes other forms of energy.',
    fb: [
      ['A', ' The final speed follows total initial momentum divided by the combined mass: 20,000/3000 m/s. A speed of 5.0 m/s would give too little final momentum.'],
      ['C', ' 10 m/s can result from averaging 20 and 0 without accounting for the unequal masses. Momentum conservation requires weighting each initial velocity by its mass.'],
      ['D', " 20 m/s would leave the initial car's speed unchanged while adding a stationary truck to the moving mass. That would triple the system's momentum."]
    ] },

  { q: 'Q15', id: 'phys-15', key: 'C',
    headMustContain: 'The cross product means the force is always perpendicular',
    head: "<p>For a moving point charge, the magnetic force is F<sub>B</sub> = q(v × B). When nonzero, it is perpendicular to both v and B. Its magnitude is |F<sub>B</sub>| = |q|vB sinθ, where θ is the angle between v and B.</p><table class='exp-table'><tr><th>Property</th><th>Electric force</th><th>Magnetic force</th></tr><tr><td>Direction</td><td>Along E for a positive charge; opposite E for a negative charge</td><td>Perpendicular to v and B when nonzero</td></tr><tr><td>Acts on a stationary charge?</td><td>Yes, if E is nonzero</td><td>No</td></tr><tr><td>Does work on the charge?</td><td>Can do work</td><td>Does no work</td></tr><tr><td>Changes speed?</td><td>Can change speed</td><td>Does not change speed by itself</td></tr></table><p>The magnetic force is largest for perpendicular motion and zero for parallel or antiparallel motion. With only a uniform, static magnetic field acting, perpendicular motion is circular. Adding a velocity component along the field gives a helix; motion entirely along the field remains straight.</p>",
    kcMustContain: 'The magnetic force never does work',
    kc: 'Magnetic force does no work on a moving point charge and therefore does not change its speed by itself. Use the right-hand rule for v × B for a positive charge; reverse that direction for a negative charge.',
    fb: [
      ['A', " A force parallel to velocity would do positive work and increase the particle's kinetic energy. A magnetic force on a moving point charge is perpendicular to its velocity."],
      ['B', ' A force opposite to velocity would do negative work and reduce kinetic energy. The magnetic part of the Lorentz force does no work.'],
      ['D', ' A nonzero magnetic force is at 90° to velocity, not 45°. Its direction follows the cross product q(v × B).']
    ] },

  { q: 'Q16', id: 'phys-16', key: 'B',
    kcMustContain: 'The three kinematic equations solve all constant-acceleration problems',
    kc: 'For straight-line motion with constant acceleration, v<sup>2</sup> = u<sup>2</sup> + 2as is useful when time is not given. The other standard relations are v = u + at and s = ut + &frac12;at<sup>2</sup>. Use a consistent sign convention.',
    fb: [
      ['A', ' Use the change in squared speed: 30<sup>2</sup> − 10<sup>2</sup> = 800 m<sup>2</sup>/s<sup>2</sup>. Dividing by 2 × 200 m gives 2 m/s<sup>2</sup>, not 1 m/s<sup>2</sup>.'],
      ['C', ' 4 m/s<sup>2</sup> results from dividing v<sup>2</sup> − u<sup>2</sup> by s instead of 2s. The equation is v<sup>2</sup> = u<sup>2</sup> + 2as.'],
      ['D', ' At 5 m/s<sup>2</sup> over 200 m, the final speed would satisfy v<sup>2</sup> = 100 + 2000 = 2100 m<sup>2</sup>/s<sup>2</sup>, exceeding the stated 30 m/s.']
    ] },

  { q: 'Q17', id: 'phys-17', key: 'C',
    stemMustContain: 'As it approaches you at high speed',
    stem: 'An ambulance emits an 800 Hz siren while moving toward you through still air at a speed below the speed of sound. You are stationary relative to the air. What frequency do you perceive?',
    headEdits: [
      ['<td><strong>Higher (blue shift)</strong></td>', '<td><strong>Higher</strong></td>'],
      ['<td>Lower (red shift)</td>', '<td>Lower</td>']
    ],
    kcMustContain: 'redshift of starlight',
    kc: 'For a stationary listener in still air, an approaching subsonic sound source is heard at a higher frequency; a receding source is heard at a lower frequency. Doppler ultrasound uses frequency shifts from moving blood cells to estimate their velocity component along the ultrasound beam.',
    fb: [
      ['A', ' A lower frequency is expected for a source moving away from a stationary listener. An approaching subsonic source sends successive wavefronts closer together.'],
      ['B', ' 800 Hz is the emitted frequency. A stationary listener would hear it unchanged if the source were also stationary relative to the air.'],
      ['D', ' A source steadily approaching the listener does not alternate between approaching and receding. The perceived frequency stays above the emitted frequency while it approaches.']
    ] },

  { q: 'Q18', id: 'phys-18', key: 'B',
    stemMustContain: 'A converging (convex) lens has a focal length of 10 cm',
    stem: 'A thin converging lens in air has a focal length of 10 cm. An object is placed 30 cm from the lens. Where does the image form?',
    fb: [
      ['A', ' The calculated image distance is +15 cm. Under the stated real-is-positive convention, this is a real image on the opposite side of the lens, not a virtual image on the object side.'],
      ['C', ' Equal object and image distances occur when the object is at 2f. Here 2f is 20 cm, while the object is 30 cm away.'],
      ['D', ' An image at infinity is obtained when the object is at the focal point. This object is at 30 cm, not f = 10 cm.']
    ] },

  { q: 'Q19', id: 'phys-19', key: 'B',
    stemMustContain: 'A 12V battery is connected to a 4&Omega; resistor',
    stem: 'An ideal 12 V battery is connected to a 4 &Omega; resistor with negligible wire resistance. What current flows in the circuit?',
    fb: [
      ['A', " 0.33 is approximately R/V, which is the reciprocal of the current expression. Ohm's law gives I = V/R, not R/V."],
      ['C', ' 48 is the product of 12 and 4. Current is found by dividing voltage by resistance, giving 3 A.'],
      ['D', ' Adding 12 V and 4 &Omega; is not a valid operation because their units differ. Use I = V/R.']
    ] },

  { q: 'Q20', id: 'phys-20', key: 'C',
    stemMustContain: 'If you start with 80 g, how much remains after 18 hours',
    stem: 'A radioactive isotope has a half-life of 6 h. Starting with 80 g of that isotope, what mass of the original isotope remains undecayed after 18 h?',
    headEdits: [
      ['<p>General formula: N = N<sub>0</sub> × (1/2)<sup>n</sup> = 80 × (1/2)<sup>3</sup> = 80/8 = 10 g</p>',
       '<p>General formula: m<sub>parent</sub> = m<sub>initial</sub> × (1/2)<sup>3</sup> = 80/8 = 10 g</p><p>The missing parent isotope has decayed; this does not mean that 70 g of material simply disappears.</p>'],
      ['<th>Mass (from 80 g)</th>', '<th>Undecayed parent mass, initially 80 g</th>']
    ],
    kcMustContain: 'After n half-lives, the remaining fraction',
    kc: 'The undecayed parent isotope halves after each half-life: m<sub>parent</sub> = m<sub>initial</sub> × (1/2)<sup>t/T&frac12;</sup>. This tracks the parent isotope, not the mass of all decay products that may remain in the sample.',
    fb: [
      ['A', ' 40 g remains after one half-life, or 6 h. The elapsed time is 18 h, which is three half-lives.'],
      ['B', ' 20 g remains after two half-lives, or 12 h. One further half-life reduces the undecayed isotope to 10 g.'],
      ['D', ' 5 g remains after four half-lives, or 24 h. Only three half-lives have elapsed.']
    ] }
];
