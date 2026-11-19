/* Physics second-block edit specs, display Q41-Q50. See phys-b2-edits-a.js for
   the conventions. */
'use strict';
module.exports = [

  { q: 'Q41', id: 'phys-101', key: 'C',
    stemMustContain: 'Water flows through a pipe that narrows from a cross-sectional area',
    stem: 'Water flows steadily through an unbranched pipe that narrows from a cross-sectional area of 0.04 m² to 0.01 m². Treat the water as incompressible. If the mean speed in the wider section is 2 m/s, what is the mean speed in the narrower section?',
    kcMustContain: 'Equation of continuity',
    kc: 'For steady incompressible flow through an unbranched pipe, volume flow rate Q = Av is the same at each cross-section. Here v is the mean speed across the section.',
    fb: [
      ['A', ' The area falls to one-quarter, not one-half, so the speed must increase fourfold rather than twofold to maintain the same volume flow rate.'],
      ['B', ' A speed of 6 m/s through 0.01 m² gives 0.06 m³/s, less than the entering 0.04 × 2 = 0.08 m³/s. Steady incompressible flow requires these rates to match.'],
      ['D', ' This reverses the area ratio. A narrower section requires a higher speed to carry the same volume per second, not a lower speed.']
    ] },

  { q: 'Q42', id: 'phys-102', key: 'B',
    stemMustContain: "According to Bernoulli's principle, as the speed of a fluid increases",
    stem: "For steady, incompressible flow with negligible viscous losses, compare two points at the same height along a streamline. According to Bernoulli's equation, where the fluid speed is higher, the pressure:",
    kcMustContain: "Bernoulli's principle",
    kc: 'Along a streamline in steady incompressible flow with negligible viscous losses, P + ½ρv² + ρgh is constant. At equal heights, a larger speed corresponds to a lower pressure.',
    fb: [
      ['A', ' At equal heights, the pressure term must decrease when the kinetic term ½ρv² increases. Both cannot increase while their sum stays constant in the stated model.'],
      ['C', ' An unchanged pressure with a higher speed would increase the Bernoulli sum at the same height. That is inconsistent with the assumptions given.'],
      ['D', ' A decrease does not imply that pressure becomes negative. Its actual value depends on the starting conditions and on whether absolute or gauge pressure is being reported.']
    ] },

  { q: 'Q43', id: 'phys-103', key: 'A',
    fb: [
      ['B', ' This is approximately volume divided by mass, 200/540, the reciprocal of density. Density is mass divided by volume.'],
      ['C', ' The value 2700 is correct in kg/m³, not in g/cm³. Changing units changes the numerical value: 2.7 g/cm³ = 2700 kg/m³.'],
      ['D', ' This is ten times too large. Dividing 540 g by 200 cm³ gives 2.7 g/cm³.']
    ] },

  { q: 'Q44', id: 'phys-104', key: 'B',
    headMustContain: 'Standard atmospheric pressure = 101,325 Pa',
    head: '<p>One standard atmosphere is defined as exactly 101,325 Pa, which is approximately <strong>1.01 × 10<sup>5</sup> Pa</strong>. It is also approximately 760 mmHg. Standard atmospheric pressure is a reference value; actual atmospheric pressure varies with conditions such as altitude and weather.</p>',
    kcMustContain: '760 mmHg',
    kc: '1 atm = 101,325 Pa exactly, approximately 1.01 × 10<sup>5</sup> Pa. Standard atmospheric pressure is a defined reference, not the pressure measured everywhere.',
    fb: [
      ['A', ' This is about 1 kPa, roughly one-hundredth of standard atmospheric pressure. The correct power of ten is 10<sup>5</sup> Pa.'],
      ['C', ' This is about 10 MPa, roughly 100 atmospheres. It is much larger than the standard atmospheric reference.'],
      ['D', ' This is about 10 kPa, roughly one-tenth of standard atmospheric pressure. Check the exponent as well as the coefficient.']
    ] },

  { q: 'Q45', id: 'phys-105', key: 'C',
    stemMustContain: 'Laminar flow transitions to turbulent flow when the Reynolds number exceeds',
    stem: 'For flow of a Newtonian fluid in a long, straight circular pipe, which listed Reynolds number is closest to the commonly used approximate onset of transition away from laminar flow?',
    headMustContain: 'the critical Reynolds number is approximately',
    head: '<p>For circular-pipe flow, a Reynolds number around <strong>2000</strong> is commonly used as an approximate lower boundary of the transition region. Thus 2000 is the best listed answer. Transition is not an abrupt universal switch: it also depends on disturbances and conditions in the pipe. A value just above 2000 does not prove that the flow is fully turbulent.</p>',
    kcMustContain: 'indicates turbulent flow in a pipe',
    kc: 'For a circular pipe, Re = ρvD/η, where ρ is fluid density, v mean speed, D pipe diameter and η dynamic viscosity. It compares inertial and viscous effects; the onset of turbulence also depends on geometry and disturbances.',
    fb: [
      ['A', ' A Reynolds number of 500 is well within the usual laminar range for the stated pipe model. It is below the conventional onset of transition.'],
      ['B', ' A Reynolds number of 1000 is also below the commonly used transition-onset range for circular pipes. The closest listed onset value is 2000.'],
      ['D', ' A Reynolds number of 5000 is beyond the usual transition-onset range and often corresponds to turbulent pipe flow. It is not the closest value for the beginning of transition.']
    ] },

  { q: 'Q46', id: 'phys-106', key: 'C',
    stemMustContain: 'Convert 37°C (normal body temperature) to Kelvin.',
    stem: 'Convert 37°C to kelvin, rounding to the nearest kelvin.',
    headMustContain: 'T(K) = T(°C) + 273 = 37 + 273',
    head: '<p>The conversion is T(K) = t(°C) + 273.15. Thus 37°C corresponds to 310.15 K, which rounds to <strong>310 K</strong>. Kelvin is an absolute temperature scale and its unit symbol is K, without a degree sign.</p>',
    kcMustContain: 'K = °C + 273.',
    kc: 'T(K) = t(°C) + 273.15. Using 273 instead of 273.15 is a rounded approximation, suitable when the answer is required to the nearest kelvin here.',
    fb: [
      ['A', ' This results from subtracting 37 from about 273. To convert from Celsius to kelvin, add 273.15 to the Celsius value.'],
      ['B', ' Approximately 273 K corresponds to 0°C, not 37°C. Include the full 37-degree offset above that reference.'],
      ['D', ' Approximately 373 K corresponds to 100°C. The given 37°C is 310.15 K, which rounds to 310 K.']
    ] },

  { q: 'Q47', id: 'phys-107', key: 'B',
    fb: [
      ['A', ' This is the heat required for 1 kg of water over the same 50°C rise. The problem contains 2 kg, so twice as much heat is needed.'],
      ['C', ' This doubles the correct result. The temperature change is 70 − 20 = 50°C, giving 2 × 4200 × 50 J.'],
      ['D', ' This uses the initial temperature, 20°C, instead of the temperature change. Sensible heating depends on ΔT, not on the starting temperature alone.']
    ] },

  { q: 'Q48', id: 'phys-108', key: 'C',
    stemMustContain: 'An iron rod of length 2 m is heated from 20°C to 120°C',
    stem: 'An iron rod is 2 m long at 20°C and is free to expand when heated to 120°C. Taking its coefficient of linear expansion as a constant 12 × 10<sup>−6</sup> /°C, what is the increase in length?',
    headMustContain: 'ΔL = αLΔT = 12×10',
    head: '<p>The temperature rise is ΔT = 120 − 20 = 100°C. Using the initial length L<sub>0</sub> = 2 m, ΔL = αL<sub>0</sub>ΔT = 12 × 10<sup>−6</sup> × 2 × 100 = 2.4 × 10<sup>−3</sup> m = <strong>2.4 mm</strong>.</p>',
    kcMustContain: 'Linear thermal expansion: ΔL = αLΔT.',
    kc: 'For a small fractional length change and approximately constant expansion coefficient, ΔL = αL<sub>0</sub>ΔT. Use the initial length and the temperature change.',
    fb: [
      ['A', ' This is ten times too small. The temperature change is 100°C, giving a length increase of 0.0024 m or 2.4 mm.'],
      ['B', ' This is the increase for a 1 m rod under the same conditions. The given rod is 2 m long, so its increase is twice as large.'],
      ['D', ' The coefficient 12 × 10<sup>−6</sup> /°C is a fractional change per degree, not an increase of 12 mm. Multiply it by both the initial length and ΔT.']
    ] },

  { q: 'Q49', id: 'phys-109', key: 'C',
    fb: [
      ['A', ' Conduction transfers thermal energy through interactions within matter. A vacuum provides no material path for conduction across the gap.'],
      ['B', ' Convection carries energy through bulk motion of a fluid. A vacuum contains no fluid to circulate.'],
      ['D', ' Both conduction and convection require matter. Electromagnetic radiation can cross the vacuum and transfer energy between separated objects.']
    ] },

  { q: 'Q50', id: 'phys-110', key: 'C',
    kcMustContain: 'Ideal gas law PV = nRT',
    kc: 'For an ideal gas, PV = nRT uses absolute pressure and temperature in kelvin. With R in J/(mol·K), use V in m³ and n in mol to obtain P in pascals.',
    fb: [
      ['A', ' This is the result for one mole under the same conditions. The given three moles produce three times that pressure.'],
      ['B', ' This is the result for two moles. Use the stated n = 3 mol in P = nRT/V.'],
      ['D', ' This is the result for four moles. The stated values instead give 3 × 8.3 × 300/0.1 = 74,700 Pa.']
    ] },

];
