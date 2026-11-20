/* Physics THIRD-block edit specs, display Q51-Q60. See phys-b3-edits-a.js for
   the conventions.

   Q56-Q60 ALREADY carry distractor feedback, stored as
   "<p><strong>Why the other answers are wrong:</strong></p><ul><li>lead-in:
   body</li>...</ul>" at the end of the main explanation, with option-text
   lead-ins and no option letters. Those five items therefore carry an
   `existingFb` block: the heading plus the exact stored lead-in and body of
   each <li>, in stored order. The harness reconstructs that block byte for
   byte, refuses to proceed unless it is exactly what is stored, strips it, and
   rebuilds the feedback in the block's paragraph form with the option letters
   added. `fbKeep` names the bodies the review retains verbatim (their markup
   included, which the plain-text review flattened) and `fbReplace` the bodies
   it replaces, so a silently mismatched body cannot pass as either. */
'use strict';
module.exports = [

  { q: 'Q51', id: 'phys-171', key: 'C',
    headWas: '<p><strong>Isotopes</strong> have the same atomic number (Z) but different mass numbers (A). C-12 has 6p + 6n; C-14 has 6p + 8n. They have the same chemical properties.</p>',
    head: '<p>Isotopes have the same atomic number Z but different mass numbers A. Carbon-12 has 6 protons and 6 neutrons; carbon-14 has 6 protons and 8 neutrons. Their electron arrangements and chemical behavior are very similar, although their masses and nuclear stability differ.</p>',
    fb: [
      ['A', ' Changing the proton number changes the element. Both carbon isotopes have six protons.'],
      ['B', ' Their mass numbers are different, 12 and 14. The shared quantity is atomic number, not mass number.'],
      ['D', ' A difference in chemical properties is not the definition of isotopes. Isotopes have the same proton count and usually very similar chemistry; mass-related isotope effects can cause small differences.']
    ] },

  { q: 'Q52', id: 'phys-172', key: 'C',
    stemWas: 'A radioactive isotope has a half-life of 10 days. What fraction of the original sample remains after 30 days?',
    stem: 'A radioactive isotope has a half-life of 10 days. What fraction of its original nuclei remains undecayed after 30 days?',
    fb: [
      ['A', ' One-half remains after one half-life, or 10 days. Thirty days represents three half-lives.'],
      ['B', ' One-quarter remains after two half-lives, or 20 days. A third half-life reduces that fraction to one-eighth.'],
      ['D', ' One-sixteenth remains after four half-lives, or 40 days. The stated time is only 30 days.']
    ] },

  { q: 'Q53', id: 'phys-173', key: 'C',
    kcWas: 'In nuclear reactions, both mass number (A) and atomic number (Z) are conserved.',
    kc: 'Balance nucleon number and electric charge in a nuclear equation. Here 236 nucleons become 141 + 92 + 3, and proton numbers balance as 92 = 56 + 36.',
    fb: [
      ['A', ' One neutron would give 141 + 92 + 1 = 234 nucleons on the product side. The reactants contain 235 + 1 = 236.'],
      ['B', ' Two neutrons would give 235 nucleons in the products. Remember that the incident neutron adds one nucleon to the original uranium-235 nucleus.'],
      ['D', ' An emitted proton would add positive charge, even though 56 + 36 already equals the original 92 protons. It would also fail to supply the three missing nucleons.']
    ] },

  { q: 'Q54', id: 'phys-174', key: 'B',
    headWas: "<p>The <strong>mass defect</strong> (Δm) is the difference between the total mass of separated nucleons and the mass of the bound nucleus. This 'missing' mass is converted to binding energy via E = Δmc².</p>",
    head: '<p>The mass defect Δm is the total mass of the separated protons and neutrons minus the mass of the bound nucleus. The bound state has lower rest energy by Δmc<sup>2</sup>. This is the binding energy released when that nucleus forms from separated nucleons, and the energy required to separate it again.</p>',
    kcWas: "Mass defect Δm → binding energy E = Δmc² (Einstein's mass-energy equivalence).",
    kc: 'Nuclear binding energy is E<sub>b</sub> = Δmc<sup>2</sup>, where Δm is the mass of separated nucleons minus the mass of the bound nucleus.',
    fb: [
      ['A', ' Electron masses are not what nuclear mass defect measures. Compare the nucleus with the same number of separate protons and neutrons.'],
      ['C', ' Neutron masses contribute to the mass of the separated nucleons, but the mass defect is the difference between that total and the actual nuclear mass.'],
      ['D', ' A stable bound nucleus generally has a positive mass defect. Its lower rest energy is evidence of binding, not an error or instability.']
    ] },

  { q: 'Q55', id: 'phys-175', key: 'B',
    kcWas: 'Stellar energy comes from fusion; light nuclei combine releasing energy (mass defect).',
    kc: 'The Sun is powered mainly by hydrogen fusion into helium. The products have less total rest mass than the reactants, and the difference supplies released energy.',
    fb: [
      ['A', " Fission splits heavy nuclei. The Sun's main energy source is fusion involving light hydrogen nuclei, not uranium fission."],
      ['C', " Combustion is a chemical reaction involving electrons and bonds. It releases far less energy per unit mass than nuclear fusion and cannot explain the Sun's sustained output."],
      ['D', " Radioactive decay can release energy, but decay of heavy elements is not the Sun's main source. The dominant process in its core is hydrogen fusion."]
    ] },

  { q: 'Q56', id: 'phys-176', key: 'B',
    stemWas: 'Water flows through a horizontal pipe that narrows from a cross-sectional area of 0.04 m<sup>2</sup> to 0.01 m<sup>2</sup>. If the speed of the water in the wider section is 2 m/s, what is the speed in the narrower section?',
    stem: 'Water flows steadily through a pipe with no leaks, narrowing from a cross-sectional area of 0.04 m<sup>2</sup> to 0.01 m<sup>2</sup>. Treat water as incompressible. If the average speed in the wider section is 2 m/s, what is the average speed in the narrower section?',
    kcWas: 'The continuity equation (A<sub>1</sub>v<sub>1</sub> = A<sub>2</sub>v<sub>2</sub>) is conservation of mass for fluids. Where the pipe narrows, the fluid must speed up proportionally. The product Av = Q is the volume flow rate and stays constant.',
    kc: 'For steady incompressible flow with no leaks, A<sub>1</sub>v<sub>1</sub> = A<sub>2</sub>v<sub>2</sub>. Here v is the average speed across each section, and Av is the constant volume flow rate.',
    existingFb: [
      ['A', '4 m/s', ' This would be the result if the area halved (ratio of 2), but the area decreased by a factor of 4.'],
      ['C', '0.5 m/s', ' This reverses the relationship. When the area decreases, speed increases, not decreases.'],
      ['D', '16 m/s', ' This incorrectly squares the area ratio.']
    ],
    fbKeep: ['A', 'C'],
    fbReplace: ['D'],
    fb: [
      ['A', ' This would be the result if the area halved (ratio of 2), but the area decreased by a factor of 4.'],
      ['C', ' This reverses the relationship. When the area decreases, speed increases, not decreases.'],
      ['D', ' This is twice the correct speed. The area ratio is 0.04/0.01 = 4, so the speed is 4 × 2 = 8 m/s. Squaring that ratio would give 32 m/s, not this option.']
    ] },

  { q: 'Q57', id: 'phys-177', key: 'B',
    stemWas: "According to Bernoulli's principle, when the speed of a fluid increases in a horizontal pipe, what happens to the pressure?",
    stem: 'An incompressible fluid flows steadily along a horizontal pipe. Neglect friction and assume no pump or turbine lies between the two points considered. Along the same streamline, if the speed is higher at the second point, how does its static pressure compare?',
    headWas: "<p>Bernoulli's equation for a horizontal pipe (same height h at both points) simplifies to:</p><div class='exp-diagram'><p>P + 1/2 &rho;v<sup>2</sup> = constant</p></div><p>If v increases, then P must decrease to keep the sum constant. This is the core insight of Bernoulli's principle.</p>",
    head: "<p>Under the stated assumptions, Bernoulli's equation along a horizontal streamline is P + ½ρv<sup>2</sup> = constant. The faster point has a larger kinetic-energy term per unit volume, so its static pressure P is lower. This comparison depends on the stated flow conditions; it is not a rule for every pair of points in every moving fluid.</p>",
    kcWas: "Bernoulli's principle is conservation of energy per unit volume for flowing fluid. Higher kinetic energy (faster speed) means lower pressure energy. This explains why airplane wings generate lift and why shower curtains blow inward.",
    kc: 'For steady, incompressible flow with negligible friction and no added or extracted mechanical energy, P + ½ρv<sup>2</sup> + ρgh is constant along a streamline. At equal height, higher speed then means lower static pressure.',
    existingFb: [
      ['A', 'Pressure increases', " This contradicts Bernoulli's equation. Many students assume faster flow means 'more force' and thus more pressure, but it is the opposite."],
      ['C', 'Pressure stays the same', ' Pressure only stays the same if speed stays the same. Changing speed requires a pressure change.'],
      ['D', 'First increases then decreases', ' There is no such two-stage behavior in Bernoulli flow through a constriction.']
    ],
    fbKeep: ['A', 'C'],
    fbReplace: ['D'],
    fb: [
      ['A', " This contradicts Bernoulli's equation. Many students assume faster flow means 'more force' and thus more pressure, but it is the opposite."],
      ['C', ' Pressure only stays the same if speed stays the same. Changing speed requires a pressure change.'],
      ['D', ' The question compares two locations under the stated conditions, not a compulsory two-stage process. The location with greater speed has lower static pressure.']
    ] },

  { q: 'Q58', id: 'phys-178', key: 'A',
    stemWas: 'Water flows horizontally. At point A, the pressure is 200,000 Pa and the velocity is 1 m/s. At point B, the velocity is 3 m/s. What is the pressure at point B? (density of water = 1000 kg/m<sup>3</sup>)',
    stem: 'Water of density 1000 kg/m<sup>3</sup> flows steadily along a horizontal pipe. Neglect friction and assume no pump or turbine between two points on the same streamline. At A the pressure is 200,000 Pa and speed is 1 m/s; at B the speed is 3 m/s. What is the pressure at B?',
    kcWas: "Always calculate the full kinetic energy term (1/2&rho;v<sup>2</sup>) at each point separately, then apply Bernoulli's equation. Do not just use the velocity difference.",
    kc: 'In this horizontal Bernoulli comparison, P<sub>B</sub> = P<sub>A</sub> − ½ρ(v<sub>B</sub><sup>2</sup> − v<sub>A</sub><sup>2</sup>). Use the difference of the squared speeds, not the square of their difference.',
    existingFb: [
      ['B', '198,000 Pa', ' This subtracts only the velocity difference (not the kinetic energy difference).'],
      ['C', '204,000 Pa', " This adds the pressure difference instead of subtracting it, contradicting Bernoulli's principle."],
      ['D', '192,000 Pa', ' This doubles the pressure drop, possibly by forgetting the factor of 1/2 in 1/2&rho;v<sup>2</sup>.']
    ],
    fbKeep: ['C', 'D'],
    fbReplace: ['B'],
    fb: [
      ['B', ' This gives a 2000 Pa drop, which would result from ½ρ(v<sub>B</sub> − v<sub>A</sub>)<sup>2</sup> = ½(1000)(3 − 1)<sup>2</sup>. The required difference is ½ρ(v<sub>B</sub><sup>2</sup> − v<sub>A</sub><sup>2</sup>) = ½(1000)(9 − 1) = 4000 Pa.'],
      ['C', " This adds the pressure difference instead of subtracting it, contradicting Bernoulli's principle."],
      ['D', ' This doubles the pressure drop, possibly by forgetting the factor of 1/2 in 1/2&rho;v<sup>2</sup>.']
    ] },

  { q: 'Q59', id: 'phys-179', key: 'B',
    stemWas: 'A tank of water has a small hole near the bottom, 5 m below the water surface. Assuming the surface area of the tank is very large compared to the hole, what is the speed of water exiting the hole? (g = 10 m/s<sup>2</sup>)',
    stem: "A large open tank contains water. A small hole is 5 m below the water surface and discharges into the same atmospheric pressure as the surface. Neglect frictional losses and the speed of the falling water surface. What is the water's exit speed? (g = 10 m/s<sup>2</sup>)",
    kcWas: "Torricelli's theorem (v = &radic;(2gh)) is equivalent to converting potential energy to kinetic energy: mgh = 1/2mv<sup>2</sup>. The exit speed equals the speed of free fall from the same height.",
    kc: 'For a large open tank discharging to the same atmospheric pressure, negligible surface speed and negligible losses give v = √(2gh). Under these conditions the exit speed equals the free-fall speed from height h.',
    existingFb: [
      ['A', '5 m/s', ' This uses v = &radic;(gh) instead of &radic;(2gh), forgetting the factor of 2.'],
      ['C', '50 m/s', ' This uses v = 2gh instead of &radic;(2gh), forgetting the square root.'],
      ['D', '100 m/s', ' This uses v = 2gh directly (2 x 10 x 5 = 100) without the square root.']
    ],
    fbKeep: ['D'],
    fbReplace: ['A', 'C'],
    fb: [
      ['A', ' An exit speed of 5 m/s would correspond to a depth v<sup>2</sup>/(2g) = 25/20 = 1.25 m under this model. The stated depth is 5 m, giving 10 m/s.'],
      ['C', ' The product gh is 50 m<sup>2</sup>/s<sup>2</sup>, which is not a speed. Use v = √(2gh) = √100 = 10 m/s.'],
      ['D', ' This uses v = 2gh directly (2 x 10 x 5 = 100) without the square root.']
    ] },

  { q: 'Q60', id: 'phys-180', key: 'B',
    stemWas: "An airplane wing is designed so that air flows faster over the top surface than the bottom. According to Bernoulli's principle, which statement correctly explains the resulting lift force?",
    stem: 'In a simplified model of steady airflow around a wing at low speed, assume constant density, negligible friction and the same total pressure on both sides. At comparable heights, air flows faster over the upper surface. Which statement describes the resulting pressure contribution to lift?',
    headWas: "<p>The wing is shaped (or tilted) so that air travels faster over the top surface. By Bernoulli's principle, faster-moving air has lower pressure. The higher pressure below the wing and the lower pressure above it creates a net upward force called <strong>lift</strong>.</p>",
    head: "<p>In this model, total pressure is P + ½ρv<sup>2</sup>. Faster flow above the wing therefore corresponds to lower static pressure P there. The pressure distribution over the wing produces a net upward force. The wing also turns airflow downward, consistent with momentum conservation. Bernoulli's equation relates a known flow pattern to pressure; it does not by itself determine that pattern or require air parcels above and below the wing to meet at the trailing edge.</p>",
    kcWas: "Bernoulli's principle states that where fluid speed is higher, pressure is lower. This applies to airplane wings, carburetors, perfume atomizers, and the Venturi effect. The pressure difference between the top and bottom of a wing creates lift.",
    kc: 'Lift is associated with the pressure distribution over a wing and the downward turning of airflow. In the stated Bernoulli model, faster upper-surface flow corresponds to lower static pressure.',
    existingFb: [
      ['A', 'Pressure is higher above', ' This reverses the relationship. Faster air = lower pressure, so pressure is lower above, not higher.'],
      ['C', 'Air above is denser', ' Density differences are negligible at typical flight speeds. The effect is about pressure, not density.'],
      ['D', 'Air below moves faster', ' The air below actually moves slower. The wing shape ensures faster flow on top.']
    ],
    fbKeep: [],
    fbReplace: ['A', 'C', 'D'],
    fb: [
      ['A', ' Higher pressure above would contribute a downward force. In the stated model, the faster upper flow instead has lower static pressure.'],
      ['C', ' Density is approximately constant in this model. The force is explained by the pressure distribution, not by a denser layer of air above the wing.'],
      ['D', ' The stem specifies faster flow above, not below. It also uses a model in which, at the same height and total pressure, greater speed corresponds to lower static pressure.']
    ] }

];
