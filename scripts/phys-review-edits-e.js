/* Physics 60-block edit specs, display Q41-Q50. */
'use strict';
module.exports = [

  { q: 'Q41', id: 'phys-41', key: 'A',
    stemMustContain: 'if the position of an electron is measured with an uncertainty of 0.1 nm',
    stem: "An electron's position along the x-axis has a quantum uncertainty Δx = 0.1 nm. Treat uncertainty as the standard deviation, or spread, of possible measurement results. What is the smallest momentum uncertainty Δp<sub>x</sub> allowed by the Heisenberg relation? Use ħ = 1.055 x 10<sup>-34</sup> J·s.",
    headMustContain: 'h-bar/2',
    head: '<p>For position and momentum along the same axis, ΔxΔp<sub>x</sub> ≥ ħ/2. Since 0.1 nm = 1.0 × 10<sup>-10</sup> m, the lower bound is Δp<sub>x</sub> = ħ/(2Δx) = (1.055 × 10<sup>-34</sup>)/(2 × 10<sup>-10</sup>) ≈ 5.28 × 10<sup>-25</sup> kg·m/s.</p>',
    kcMustContain: 'sets a fundamental limit on the precision of simultaneous measurements',
    kc: 'A quantum state cannot have arbitrarily small spreads in both position and the corresponding momentum component. The relation ΔxΔp<sub>x</sub> ≥ ħ/2 is intrinsic to quantum states, not simply a defect in measuring instruments.',
    fb: [
      ['B', ' This result omits the factor of 2 in the denominator. The relation is ΔxΔp<sub>x</sub> ≥ ħ/2, not ΔxΔp<sub>x</sub> ≥ ħ.'],
      ['C', ' This is ten times the minimum bound. Convert 0.1 nm to 1.0 × 10<sup>-10</sup> m before dividing ħ by 2Δx.'],
      ['D', ' This is twenty times the minimum bound. The denominator is 2 × 10<sup>-10</sup> m, and the numerator is 1.055 × 10<sup>-34</sup> J·s.']
    ] },

  { q: 'Q42', id: 'phys-42', key: 'B',
    fb: [
      ['A', ' 1.04 eV is about half the correct result. The threshold relation is φ = hf<sub>0</sub>; no factor of 1/2 is included.'],
      ['C', ' The intermediate result is 3.315 × 10<sup>-19</sup> J. To express it in electron volts, divide by 1.6 × 10<sup>-19</sup> J/eV, giving 2.07 eV.'],
      ['D', ' 4.14 eV is twice the correct work function. One threshold-frequency photon supplies hf<sub>0</sub>, not 2hf<sub>0</sub>.']
    ] },

  { q: 'Q43', id: 'phys-43', key: 'D',
    stemMustContain: 'due to plaque buildup',
    stem: 'Assume steady, incompressible blood flow through an unbranched artery. Where its radius is 4 mm, the mean speed across the cross-section is 0.3 m/s. What is the mean speed where the radius narrows to 2 mm?',
    kcMustContain: 'which is clinically relevant in arterial stenosis',
    kc: 'For steady incompressible flow through an unbranched vessel, volume flow rate Q = Av is the same at each cross-section, where v is the mean speed. A smaller area therefore requires a higher mean speed for that same flow rate.',
    fb: [
      ['A', ' 0.6 m/s doubles speed when radius halves. Area depends on radius squared, so halving radius reduces area to one quarter and increases mean speed fourfold.'],
      ['B', ' The area ratio is 4<sup>2</sup>/2<sup>2</sup> = 4, not 3. Multiplying 0.3 m/s by 4 gives 1.2 m/s.'],
      ['C', ' 2.4 m/s is an eightfold increase. Continuity here gives a fourfold increase because cross-sectional area, rather than volume, determines the speed ratio.']
    ] },

  { q: 'Q44', id: 'phys-44', key: 'A',
    stemMustContain: 'Water flows through a horizontal pipe that narrows from a cross-section of 40 cm',
    stem: 'Water flows steadily through a horizontal pipe that narrows from 40 cm<sup>2</sup> to 10 cm<sup>2</sup>. Treat the water as incompressible and neglect viscous losses. If the pressure and speed in the wide section are 200 kPa and 2 m/s, what is the pressure in the narrow section? Use ρ = 1000 kg/m<sup>3</sup>.',
    kcMustContain: "Bernoulli's principle states that in a flowing fluid",
    kc: "For steady incompressible flow with negligible viscous losses, Bernoulli's equation relates pressure, speed and height along a streamline. At equal height, an increase in speed is accompanied by a decrease in pressure under these assumptions.",
    fb: [
      ['B', ' 176 kPa is not obtained from the stated areas and speeds. Continuity gives v<sub>2</sub> = 8 m/s, and Bernoulli gives a pressure decrease of 30 kPa.'],
      ['C', ' 185 kPa uses only half the required pressure decrease. Evaluate 1/2ρ(8<sup>2</sup> − 2<sup>2</sup>) = 30,000 Pa.'],
      ['D', " 188 kPa uses too small a pressure change. Bernoulli's kinetic term depends on speed squared, so use 8<sup>2</sup> − 2<sup>2</sup> rather than a simple speed difference."]
    ] },

  { q: 'Q45', id: 'phys-45', key: 'C',
    stemMustContain: 'A fluid with viscosity 0.004 Pa-s flows through a tube',
    stem: "A Newtonian fluid of viscosity 0.004 Pa·s has steady, fully developed laminar flow through a rigid circular tube of radius 3 mm and length 0.5 m. The pressure difference is 800 Pa. What volume flow rate does Poiseuille's law predict?",
    kcMustContain: 'making small changes in vessel diameter critically important',
    kc: 'For the stated laminar-flow model, Q = πr⁴ΔP/(8ηL). Holding pressure difference, viscosity and length fixed, doubling radius increases flow sixteenfold. Real blood vessels may require more complex models.',
    fb: [
      ['A', ' This is ten times below the calculated flow rate. In SI units, r⁴ = (0.003)⁴ = 8.1 × 10⁻¹¹ m⁴; take care with the exponent.'],
      ['B', ' Substitution gives numerator π × 6.48 × 10⁻⁸ and denominator 0.016. Their quotient is 1.27 × 10⁻⁵ m³/s, not 5.09 × 10⁻⁶ m³/s.'],
      ['D', " This is four times the correct flow rate. Poiseuille's denominator is 8ηL; omitting part of that factor overestimates the flow."]
    ] },

  { q: 'Q46', id: 'phys-46', key: 'D',
    stemMustContain: 'falls through glycerin (density 1260 kg/m',
    stem: "A steel sphere of density 7800 kg/m<sup>3</sup> and radius 1 mm falls through a wide column of glycerin with density 1260 kg/m<sup>3</sup> and viscosity 1.5 Pa·s. Use Stokes' drag law and neglect wall effects. What is its terminal speed? Use g = 10 m/s<sup>2</sup>.",
    kcMustContain: 'Terminal velocity in a viscous fluid is reached',
    kc: 'At terminal speed, acceleration is zero and weight equals buoyancy plus drag. In the low-Reynolds-number regime for a sphere, Stokes drag is 6πηrv, giving v<sub>t</sub> = 2r<sup>2</sup>(ρ<sub>s</sub> − ρ<sub>f</sub>)g/(9η).',
    fb: [
      ['A', ' 0.97 mm/s is ten times too small. After calculating v<sub>t</sub> ≈ 9.69 × 10<sup>-3</sup> m/s, multiply by 1000 to express it in mm/s.'],
      ['B', ' 4.84 mm/s is about half the correct value. The terminal-speed formula includes the numerator factor 2: v<sub>t</sub> = 2r<sup>2</sup>(ρ<sub>s</sub> − ρ<sub>f</sub>)g/(9η).'],
      ['C', " 19.4 mm/s is about twice the correct value. Balance the sphere's weight minus buoyancy against Stokes drag, without an additional factor of two."]
    ] },

  { q: 'Q47', id: 'phys-47', key: 'B',
    kcMustContain: 'Blood flow in the aorta is near the critical transition point',
    kc: 'Reynolds number compares inertial and viscous effects. Common laminar/transition/turbulent thresholds are guides for steady flow in straight pipes; aortic flow is pulsatile, so its behavior cannot be classified from those thresholds alone.',
    fb: [
      ['A', ' 0.13 m/s is about half the stated-model result. Use the given diameter D = 0.025 m in v = Re·η/(ρD).'],
      ['C', ' 0.53 m/s results approximately from using the radius instead of the diameter in this definition of Reynolds number. Here D is the full 2.5 cm diameter.'],
      ['D', ' 1.06 m/s is about four times the required speed. With the given density, viscosity and diameter, Re = 2000 gives v ≈ 0.264 m/s.']
    ] },

  { q: 'Q48', id: 'phys-48', key: 'C',
    stemMustContain: "A manometer connected to a patient's artery reads a gauge pressure of 120 mmHg",
    stem: 'A mercury manometer has a vertical height difference of 120 mm between its mercury levels. Estimate the pressure difference using ρ<sub>mercury</sub> = 13,600 kg/m<sup>3</sup> and the rounded value g = 10 m/s<sup>2</sup>.',
    headMustContain: '(Note: 120 mmHg = 0.120 m of mercury.)',
    head: '<p>The pressure difference is ΔP = ρgh. Convert the height: 120 mm = 0.120 m. Using the stipulated rounded values gives ΔP = 13,600 × 10 × 0.120 = 16,320 Pa. This is a column-pressure estimate using the supplied g. For a conventional unit conversion, 1 mmHg ≈ 133.322 Pa, so 120 mmHg ≈ 16,000 Pa.</p>',
    kcMustContain: 'Blood pressure is traditionally measured in mmHg',
    kc: 'Hydrostatic pressure difference is ΔP = ρgh. Use meters for the height when calculating in SI units. Distinguish a calculation with rounded physical values from conversion of the conventional pressure unit mmHg.',
    fb: [
      ['A', ' 8160 Pa is half the result. The full mercury-level difference is 0.120 m, so no factor of 1/2 belongs in ΔP = ρgh.'],
      ['B', ' 12,000 Pa does not use the supplied mercury density. Substitute 13,600 kg/m<sup>3</sup>, 10 m/s<sup>2</sup> and 0.120 m.'],
      ['D', ' 24,000 Pa is not the product of the supplied values. Pressure difference is proportional to column height, with proportionality factor ρg.']
    ] },

  { q: 'Q49', id: 'phys-49', key: 'C',
    fb: [
      ['A', ' 25% is too low for this Carnot engine. Substituting the reservoir temperatures gives 1 − 300/600 = 0.5.'],
      ['B', ' 33% can result from dividing the temperature difference by the sum of temperatures. Carnot efficiency divides by the hot-reservoir temperature only.'],
      ['D', ' 67% does not follow the given temperature ratio. A Carnot engine between 600 K and 300 K has efficiency 50%.']
    ] },

  { q: 'Q50', id: 'phys-50', key: 'B',
    stemMustContain: 'During an isothermal expansion of an ideal gas at 400 K',
    stem: 'Two moles of an ideal gas expand reversibly and isothermally at 400 K until their volume doubles. How much work is done by the gas? Use R = 8.314 J/(mol·K) and ln 2 = 0.693.',
    headMustContain: 'For isothermal expansion: W = nRT ln(V<sub>2</sub>/V<sub>1</sub>)',
    head: '<p>For reversible isothermal expansion of an ideal gas, W<sub>by</sub> = nRT ln(V<sub>2</sub>/V<sub>1</sub>). Therefore W<sub>by</sub> = 2 × 8.314 × 400 × 0.693 = 4609.3 J ≈ 4610 J. The work done by the expanding gas is positive under this convention.</p>',
    kcMustContain: 'In an isothermal process for an ideal gas',
    kc: 'The formula W<sub>by</sub> = nRT ln(V<sub>2</sub>/V<sub>1</sub>) requires reversible isothermal expansion or compression of an ideal gas. An ideal gas has no internal-energy change at constant temperature; work still depends on the process followed.',
    fb: [
      ['A', ' 2310 J is approximately the work for one mole under the same conditions. The question specifies two moles.'],
      ['C', ' 6920 J is approximately the result for three moles. Work is proportional to the given amount of gas, which is two moles.'],
      ['D', ' 9240 J is approximately twice the correct result. The volume ratio enters as ln(2), not as an extra factor of two.']
    ] }
];
