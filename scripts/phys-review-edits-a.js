/* Physics 60-block edit specs, display Q1-Q10. Every string is the review's own
   supplied wording. Distractor headings are derived from the stored option text
   by the harness, so only the body appears here; bodies keep their leading
   space, matching the convention of phys-226..phys-250. */
'use strict';
module.exports = [

  { q: 'Q1', id: 'phys-1', key: 'B',
    headEdits: [
      ['<p>The SI system has exactly <strong>7 base units</strong>. All other units are derived from these:</p>',
       '<p>The SI has seven base units. Other SI units are derived from them.</p>'],
      ['<tr><td>Kelvin</td><td>K</td><td>Temperature</td></tr>',
       '<tr><td>Kelvin</td><td>K</td><td>Thermodynamic temperature</td></tr>']
    ],
    kcMustContain: 'Any unit not in this list',
    kc: 'The seven SI base units are m, kg, s, A, K, mol and cd. Derived SI units are formed from products of powers of these units. Non-SI units, such as the minute, form a separate category.',
    fb: [
      ['A', ' The kilogram and candela are SI base units, but the volt is derived: V = kg·m<sup>2</sup>·s<sup>-3</sup>·A<sup>-1</sup>. A group must contain only base units to satisfy the question.'],
      ['C', ' The meter and ampere are base units. The joule is the derived SI unit of energy, equivalent to kg·m<sup>2</sup>·s<sup>-2</sup>.'],
      ['D', ' The second and mole are base units. The newton is the derived SI unit of force, equivalent to kg·m·s<sup>-2</sup>.']
    ] },

  { q: 'Q2', id: 'phys-2', key: 'B',
    fb: [
      ['A', ' In 1 s, a ball dropped from rest falls 1/2 x 10 x 1<sup>2</sup> = 5 m. It has not yet covered the 20 m to the ground.'],
      ['C', ' In 4 s of uninterrupted free fall from rest, the distance would be 1/2 x 10 x 4<sup>2</sup> = 80 m. This ball reaches the ground sooner.'],
      ['D', ' Dividing height by acceleration does not give a time: its units are s<sup>2</sup>. Use t = sqrt(2h/g), which gives 2 s.']
    ] },

  { q: 'Q3', id: 'phys-3', key: 'A',
    fb: [
      ['B', ' The 3 ohm branch already provides a path for current. Adding a second positive-resistance branch in parallel increases total current at the same voltage, so the equivalent resistance is below 3 ohms.'],
      ['C', ' 4.5 ohms is the arithmetic mean of 6 ohms and 3 ohms. Parallel resistance is found by adding conductances, 1/R, rather than averaging the resistances.'],
      ['D', ' 9 ohms is the series result, 6 + 3. In parallel, both resistors have the same voltage across them and their currents add.']
    ] },

  { q: 'Q4', id: 'phys-4', key: 'B',
    stemMustContain: 'a denser medium',
    stem: 'When light passes from air into water, which has a higher refractive index, what happens to its speed and wavelength?',
    headMustContain: 'When light enters a denser medium (higher refractive index), it slows down.',
    head: "<p>At a stationary boundary, light keeps the same frequency. Water has a higher refractive index than air, so the speed falls. The relation v = fλ then shows that the wavelength also falls.</p><table class='exp-table'><tr><th>Property</th><th>In air (n<sub>air</sub> ≈ 1)</th><th>In water (n<sub>water</sub> ≈ 1.33)</th><th>Change</th></tr><tr><td>Speed</td><td>v<sub>air</sub> ≈ c = 3.0 × 10<sup>8</sup> m/s</td><td>v<sub>water</sub> = c/n<sub>water</sub> ≈ 2.26 × 10<sup>8</sup> m/s</td><td>Decreases</td></tr><tr><td>Frequency</td><td>f</td><td>f</td><td>Unchanged</td></tr><tr><td>Wavelength</td><td>λ<sub>air</sub></td><td>λ<sub>air</sub> × n<sub>air</sub>/n<sub>water</sub> ≈ λ<sub>air</sub>/1.33</td><td>Decreases</td></tr></table>",
    kcMustContain: 'lambda<sub>medium</sub>',
    kc: "Refractive index is n = c/v = λ<sub>vacuum</sub>/λ<sub>medium</sub>. Entering a higher-index medium reduces speed and wavelength while frequency stays unchanged. At oblique incidence, the ray bends toward the normal according to Snell's law; at normal incidence, its direction does not change.",
    fb: [
      ['A', ' Water has a higher refractive index than air, so light travels more slowly in water. With frequency unchanged, its wavelength also becomes shorter.'],
      ['C', ' Frequency remains unchanged at the stationary boundary. Because v = fλ, a lower speed at the same frequency requires a shorter wavelength, not a longer one.'],
      ['D', ' At unchanged frequency, speed and wavelength change in the same proportion. Light entering water from air slows down and its wavelength decreases.']
    ] },

  { q: 'Q5', id: 'phys-5', key: 'B',
    stemMustContain: 'What is the temperature in Kelvin',
    stem: 'What is −73 °C in kelvins, rounded to the nearest kelvin?',
    headMustContain: 'T(K) = T(C) + 273',
    head: "<p>Convert Celsius temperature t to absolute temperature T using T(K) = t(°C) + 273.15. Thus T = −73 + 273.15 = 200.15 K, which rounds to 200 K.</p><table class='exp-table'><tr><th>Reference point</th><th>Celsius</th><th>Kelvin</th></tr><tr><td>Absolute zero</td><td>−273.15 °C</td><td>0 K</td></tr><tr><td>Water freezes, approximately at 1 atm</td><td>0 °C</td><td>273.15 K</td></tr><tr><td>Example body temperature</td><td>37 °C</td><td>310.15 K</td></tr><tr><td>Water boils, approximately at 1 atm</td><td>100 °C</td><td>373.15 K</td></tr></table><p>One kelvin is the same temperature interval as one degree Celsius. The kelvin scale starts at absolute zero; this does not mean that all microscopic motion disappears.</p>",
    kcMustContain: 'The Kelvin scale has no negative values',
    kc: 'Use T(K) = t(°C) + 273.15, or +273 when that rounding is appropriate. Gas-law and thermodynamic temperature ratios require absolute temperatures in kelvins. Write the unit as K, without a degree sign.',
    fb: [
      ['A', ' 100 K corresponds to −173.15 °C. Converting −73 °C requires adding 273.15, giving 200.15 K before rounding.'],
      ['C', ' 346 K would be about +72.85 °C. This answer can result from dropping the minus sign on the given Celsius temperature.'],
      ['D', ' 373 K is about 100 °C, close to the boiling point of water at 1 atm. It is not the conversion of −73 °C.']
    ] },

  { q: 'Q6', id: 'phys-6', key: 'C',
    headEdits: [
      ['<td>First Law (Inertia)</td><td>Object at rest stays at rest; object in motion stays in motion (unless acted on by external force)</td>',
       '<td>First Law (Inertia)</td><td>When the net external force is zero, a body remains at rest or moves at constant velocity in a straight line.</td>'],
      ['<td>Second Law</td><td>F = ma (force equals mass times acceleration)</td>',
       '<td>Second Law</td><td>F<sub>net</sub> = ma for a constant-mass body.</td>'],
      ['<td><strong>F<sub>AB</sub> = -F<sub>BA</sub> (equal magnitude, opposite direction)</strong></td>',
       '<td><strong>F<sub>AB</sub> = −F<sub>BA</sub>: equal magnitude, opposite direction, different bodies.</strong></td>'],
      ["<p>Important: The action-reaction forces act on <strong>different objects</strong>. Your push acts on the wall; the wall's push acts on you. They don't cancel out because they're on different objects.</p>",
       "<p>Your push acts on the wall; the wall's push acts on you. Only one member of the pair acts on each body, so the pair does not cancel in that body's force balance.</p>"]
    ],
    kcMustContain: 'They never cancel each other',
    kc: 'Third-law forces have equal magnitudes and opposite directions and act on different bodies. They do not cancel in the force balance for one body. If both bodies are included in one system, the pair cancels as internal forces.',
    fb: [
      ['A', ' The wall can exert a force even though it does not move. Lack of acceleration means its forces balance; it does not mean that each individual force is zero.'],
      ['B', ' A third-law pair has equal magnitudes. The wall does not return only half of your 50 N push.'],
      ['D', ' The 50 N force on the wall and the 50 N force on you act on different bodies. Adding their magnitudes does not make the force on you 100 N.']
    ] },

  { q: 'Q7', id: 'phys-7', key: 'A',
    headEdits: [['<th>Human Range</th>', '<th>Typical value or range</th>']],
    kcMustContain: 'Sound travels faster in denser media',
    kc: "For a wave, v = f x λ. Sound in air is a longitudinal pressure wave. Sound speed depends on the medium's elastic properties and density, and in gases on temperature; greater density alone does not imply greater speed.",
    fb: [
      ['B', ' 440/340 gives frequency divided by speed, the reciprocal of wavelength. Wavelength is v/f = 340/440 ≈ 0.77 m.'],
      ['C', ' 149,600 is the product of speed and frequency. From v = fλ, wavelength is found by division; multiplying does not give units of length.'],
      ['D', ' 340 m/s is the wave speed, not its wavelength. In one second, 440 cycles pass, so each cycle occupies about 340/440 m.']
    ] },

  { q: 'Q8', id: 'phys-8', key: 'B',
    headEdits: [["<p>When an object floats, the buoyant force equals its weight (Archimedes' principle). The fraction submerged equals the ratio of the object's density to the fluid's density:</p>",
                 "<p>For an unsupported object floating at rest, buoyant force balances weight. Neglecting air buoyancy and surface tension, the submerged volume fraction equals the object's average density divided by the water density.</p>"]],
    kcMustContain: 'Fraction submerged = object density / fluid density',
    kc: 'For an unsupported object floating at rest, neglecting air buoyancy and surface tension, V<sub>submerged</sub>/V<sub>total</sub> = ρ<sub>object,average</sub>/ρ<sub>fluid</sub>. A lower average density permits floating; equal density gives neutral buoyancy when fully submerged.',
    fb: [
      ['A', ' 300 kg/m<sup>3</sup> uses the 30% above water. Buoyant force depends on the displaced water, so use the 70% submerged fraction.'],
      ['C', ' An object with the same average density as water can be neutrally buoyant when fully submerged. The stated object floats with part of its volume above the surface.'],
      ['D', ' An unsupported object with average density 1400 kg/m<sup>3</sup> is denser than water and would sink under this model, rather than float with 70% submerged.']
    ] },

  { q: 'Q9', id: 'phys-9', key: 'D',
    stemMustContain: 'thrown upward with an initial velocity',
    stem: 'A 2 kg ball is thrown vertically upward with an initial speed of 10 m/s. What is its kinetic energy at the moment of release? (Ignore air resistance.)',
    headEdits: [
      ['<p>At the highest point, all kinetic energy converts to potential energy: PE = mgh. So the maximum height is h = KE/(mg) = 100/(2x10) = 5 meters.</p>',
       '<p>For the subsequent vertical flight, take g = 10 m/s<sup>2</sup> and gravitational potential energy to be zero at release. At the highest point the speed is zero, so the 100 J has become gravitational potential energy. The rise above release is h = 100/(2 × 10) = 5 m.</p>'],
      ['<td>Halfway up</td>', '<td>Halfway to the maximum height</td>']
    ],
    kcMustContain: 'Conservation of energy: KE + PE = constant',
    kc: 'Kinetic energy is 1/2mv<sup>2</sup>, so doubling speed quadruples kinetic energy. During this vertical flight under gravity alone, kinetic energy plus gravitational potential energy stays constant.',
    fb: [
      ['A', ' 10 is the speed in m/s, not the kinetic energy in joules. Energy requires both mass and the square of speed: 1/2mv<sup>2</sup>.'],
      ['B', ' 20 is the numerical value of mv, which is momentum in kg·m/s. Kinetic energy uses 1/2mv<sup>2</sup> and is 100 J.'],
      ['C', ' 50 J would be the kinetic energy of a 1 kg object at 10 m/s. The given ball has mass 2 kg.']
    ] },

  { q: 'Q10', id: 'phys-10', key: 'D',
    stemMustContain: 'A hydraulic press has a small piston',
    stem: 'An ideal hydraulic press has piston areas of 5 cm<sup>2</sup> and 100 cm<sup>2</sup>. Neglect friction, piston weights and the height difference between the pistons. If 20 N is applied to the small piston, what output force does the large piston exert?',
    headMustContain: "Pascal's law states that pressure applied to an enclosed fluid",
    head: "<p>Pascal's principle states that an applied pressure increase is transmitted undiminished through a confined fluid. The pressure increase is ΔP = F<sub>1</sub>/A<sub>1</sub>, so F<sub>2</sub> = F<sub>1</sub>(A<sub>2</sub>/A<sub>1</sub>) = 20 × (100/5) = 400 N.</p><p>Both areas are in the same units, so their ratio is dimensionless. If pressure itself is calculated in pascals, 5 cm<sup>2</sup> = 5 × 10<sup>-4</sup> m<sup>2</sup> and ΔP = 20/(5 × 10<sup>-4</sup>) = 4.0 × 10<sup>4</sup> Pa.</p><p>For an incompressible fluid, A<sub>1</sub>d<sub>1</sub> = A<sub>2</sub>d<sub>2</sub>. The larger piston therefore moves only one-twentieth as far. In this ideal, lossless press, F<sub>1</sub>d<sub>1</sub> = F<sub>2</sub>d<sub>2</sub>.</p>",
    kcMustContain: 'Hydraulic press: F<sub>1</sub>/A<sub>1</sub>',
    kc: 'An ideal hydraulic press multiplies force by the piston-area ratio: F<sub>2</sub>/F<sub>1</sub> = A<sub>2</sub>/A<sub>1</sub>. The output displacement decreases by the same factor, so the machine does not multiply energy.',
    fb: [
      ['A', ' 1 N results from reversing the area ratio. The larger piston has 20 times the area, so the same pressure increase produces 20 times the force.'],
      ['B', ' 20 N would be the output if the piston areas were equal. The larger output area multiplies the applied force.'],
      ['C', ' The force ratio equals 100/5 = 20, not 5. Multiplying the 20 N input by 20 gives 400 N.']
    ] }
];
