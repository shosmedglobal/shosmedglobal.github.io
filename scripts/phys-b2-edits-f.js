/* Physics second-block edit specs, display Q51-Q60. See phys-b2-edits-a.js for
   the conventions. Q54 C and Q56 C change text while keeping the answer letter,
   so the harness re-synchronizes both keyed headings. */
'use strict';
module.exports = [

  { q: 'Q51', id: 'phys-111', key: 'C',
    headMustContain: 'First law: ΔU = Q − W = 500 − 200',
    head: '<p>Use ΔU = Q − W<sub>by</sub>, where Q is positive for heat added to the gas and W<sub>by</sub> is positive for work done by the gas. Here Q = 500 J and W<sub>by</sub> = 200 J, so ΔU = 500 − 200 = <strong>300 J</strong>. Part of the incoming energy leaves as work; the remainder increases internal energy.</p>',
    kcMustContain: 'First law of thermodynamics: ΔU = Q − W (energy conservation)',
    kc: 'With Q positive into the system and W<sub>by</sub> positive for work done by it, the first law is ΔU = Q − W<sub>by</sub>. Always identify the work sign convention before substituting.',
    fb: [
      ['A', ' Adding 500 and 200 would be appropriate if 200 J of work were done on the gas. Here the gas does the work, transferring that energy out.'],
      ['B', ' This ignores the 200 J transferred out as work. Only 300 J of the supplied heat remains as an increase in internal energy.'],
      ['D', ' This is the work done by the gas, not its internal-energy change. Apply the complete energy balance, 500 − 200.']
    ] },

  { q: 'Q52', id: 'phys-112', key: 'B',
    stemMustContain: 'How much heat is required to melt 0.5 kg of ice at 0°C?',
    stem: 'How much heat is required to melt 0.5 kg of pure ice at 0°C completely into water at 0°C at 1 atm? (Latent heat of fusion of ice = 3.34 × 10<sup>5</sup> J/kg)',
    kcMustContain: 'Q = mL for phase changes',
    kc: 'During melting of a pure substance at its equilibrium melting temperature and fixed pressure, added heat changes phase without raising temperature: Q = mL<sub>f</sub>.',
    fb: [
      ['A', ' This is the heat needed to melt 0.25 kg of ice at its melting point. For the stated 0.5 kg, twice this amount is required.'],
      ['C', ' This is the heat needed for 1 kg. Multiply the latent heat per kilogram by the given mass of 0.5 kg.'],
      ['D', ' This is the heat needed for 2 kg of ice, four times the stated mass. No additional heating above 0°C is requested.']
    ] },

  { q: 'Q53', id: 'phys-113', key: 'C',
    stemMustContain: 'In an isothermal process for an ideal gas:',
    stem: 'In an isothermal process for a fixed amount of an ideal gas:',
    headMustContain: 'By the first law, Q = W.',
    head: '<p><strong>Isothermal</strong> means constant temperature. For a fixed amount of an ideal gas, internal energy depends only on temperature, so ΔU = 0. This does not mean that no heat is transferred: when the gas does work, an equal amount of heat must enter to maintain constant temperature, using ΔU = Q − W<sub>by</sub>.</p>',
    kcMustContain: 'Isothermal = constant temperature',
    kc: 'For a fixed amount of ideal gas, constant temperature means constant internal energy. An isothermal process is not necessarily adiabatic.',
    fb: [
      ['A', ' Isothermal means that temperature stays constant. Constant volume is called isochoric and does not by itself prevent temperature from changing.'],
      ['B', ' Constant pressure is called isobaric. In an isothermal change for a fixed amount of ideal gas, pressure changes inversely with volume.'],
      ['D', ' No heat exchange defines an adiabatic process. An isothermal gas can exchange heat to balance the work it does or receives.']
    ] },

  { q: 'Q54', id: 'phys-114', key: 'C',
    stemMustContain: 'The second law of thermodynamics implies that:',
    stem: 'Which statement most directly expresses the second law of thermodynamics for an isolated macroscopic system?',
    options: [['C', 'The entropy of an isolated system tends to increase', 'The entropy of an isolated system cannot decrease']],
    headMustContain: 'entropy tends to increase or remain the same',
    head: '<p>The <strong>second law</strong> states that the entropy of an isolated macroscopic system cannot decrease. It increases in irreversible processes and remains constant in the reversible idealization. Spontaneous heat transfer from a hotter object to a colder one is consistent with this law; transferring heat in the opposite direction requires an additional process, such as work supplied to a refrigerator.</p>',
    kcMustContain: 'entropy of an isolated system never decreases',
    kc: 'The entropy of an isolated system cannot decrease: it increases for irreversible processes and is unchanged for reversible ones. Heat does not flow spontaneously from cold to hot.',
    fb: [
      ['A', ' Creation of energy in an isolated system would violate the first law, which expresses energy conservation. The second law additionally restricts which energy transfers can occur spontaneously.'],
      ['B', ' Heat does not spontaneously flow from a colder object to a hotter one. Refrigerators move heat in this direction by using work and producing a compensating entropy increase elsewhere.'],
      ['D', ' This is a true consequence of the first law, because a perpetual-motion machine of the first kind would create energy. It is not the direct second-law statement requested here.']
    ] },

  { q: 'Q55', id: 'phys-115', key: 'B',
    stemMustContain: 'An ideal gas at 200 kPa occupies 3 L.',
    stem: 'An ideal gas expands from 3 L to 5 L against a constant external pressure of 200 kPa. How much work does the gas do on its surroundings?',
    headMustContain: 'For an isobaric process: W = PΔV',
    head: '<p>Work done by the gas against a constant external pressure is W<sub>by</sub> = P<sub>external</sub>ΔV. Here ΔV = (5 − 3) L = 0.002 m³, so W<sub>by</sub> = 200,000 × 0.002 = <strong>400 J</strong>. The work is positive because the gas expands and transfers energy to its surroundings.</p>',
    kcMustContain: 'Isobaric (constant pressure) work: W = PΔV.',
    kc: 'Against a constant external pressure, expansion work done by a gas is W<sub>by</sub> = P<sub>external</sub>(V<sub>final</sub> − V<sub>initial</sub>). Use the volume change, not either volume alone.',
    fb: [
      ['A', ' This would correspond to a volume increase of only 1 L at 200 kPa. The stated increase is 2 L.'],
      ['C', ' This uses the initial volume of 3 L rather than the volume change. Boundary work depends on the 2 L increase.'],
      ['D', ' This uses the final volume of 5 L rather than the volume change. Subtract the initial 3 L before multiplying by pressure.']
    ] },

  { q: 'Q56', id: 'phys-116', key: 'C',
    stemMustContain: 'What is the equilibrium temperature approximately?',
    stem: 'A 200 g aluminum block (c = 900 J/(kg·°C)) at 100°C is placed in 500 g of water (c = 4200 J/(kg·°C)) at 20°C. The container is insulated and has negligible heat capacity; neglect evaporation. What is the final equilibrium temperature, to the nearest 0.1°C?',
    options: [['C', '27.0°C', '26.3°C']],
    headMustContain: '26.3°C ≈ 27°C',
    head: "<p>Because the container is insulated and absorbs negligible heat, heat lost by the aluminum equals heat gained by the water. With masses in kilograms, 0.2 × 900 × (100 − T) = 0.5 × 4200 × (T − 20). Thus 180(100 − T) = 2100(T − 20), giving 60,000 = 2280T and T = 26.3158°C, or <strong>26.3°C</strong>. The final temperature is closer to the water's starting temperature because the water has the larger heat capacity, mc.</p>",
    kcMustContain: 'At thermal equilibrium, heat lost = heat gained (calorimetry)',
    kc: "For two bodies exchanging heat in an insulated container of negligible heat capacity, set their heat losses and gains equal. With constant specific heats and no phase change, the final temperature is weighted by each body's heat capacity mc.",
    fb: [
      ['A', ' At 22.7°C, the aluminum would lose about 13,914 J while the water gained only 5670 J. These are not equal, so this is not the equilibrium temperature in the insulated model.'],
      ['B', ' At 25.4°C, the aluminum would lose 13,428 J while the water gained 11,340 J. Equilibrium requires those two energy transfers to match.'],
      ['D', ' At 30.2°C, the water would need 21,420 J while the aluminum would release only 12,564 J. The stated hot block cannot supply that energy in this model.']
    ] },

  { q: 'Q57', id: 'phys-117', key: 'B',
    headMustContain: 'Compression raises temperature; expansion lowers it.',
    head: '<p><strong>Adiabatic</strong> means that no heat crosses the system boundary, so Q = 0. For a closed gas exchanging energy only as heat and work, ΔU = −W<sub>by</sub>. If an ideal gas expands and does work, its internal energy and temperature fall; if work is done on it in compression, they rise. However, an ideal gas expanding freely into a vacuum does no work, so in an adiabatic free expansion its temperature stays unchanged.</p>',
    kcMustContain: 'Adiabatic = Q = 0; all work changes internal energy.',
    kc: 'Adiabatic means no heat transfer, not constant temperature or no work. For an ideal gas, the temperature change depends on the work exchanged.',
    fb: [
      ['A', " An adiabatic process has no heat exchange. Work can still cross the boundary and change the gas's internal energy."],
      ['C', ' Constant temperature defines an isothermal process. Some adiabatic processes keep temperature constant, but many do not; constant temperature is not the defining condition.'],
      ['D', ' Constant volume defines an isochoric process. Adiabatic expansion and compression can both occur, so volume need not remain fixed.']
    ] },

  { q: 'Q58', id: 'phys-118', key: 'A',
    stemMustContain: 'Two masses of 4 kg and 9 kg are separated by 3 m.',
    stem: 'Two point masses of 4 kg and 9 kg are separated by 3 m. What is the gravitational force between them? (G = 6.67 × 10<sup>−11</sup> N·m²/kg²)',
    kcMustContain: 'law of gravitation',
    kc: "For two point masses separated by r, Newton's gravitational force has magnitude F = Gm<sub>1</sub>m<sub>2</sub>/r². The force is attractive.",
    fb: [
      ['B', ' This is approximately the result of dividing by r instead of r². The denominator is (3 m)² = 9 m².'],
      ['C', ' This is approximately Gm<sub>1</sub>m<sub>2</sub> before division by the separation squared. Dividing by 9 gives 2.67 × 10<sup>−10</sup> N.'],
      ['D', ' The mass product is 4 × 9 = 36 kg². After division by 3², the numerical factor multiplying G is 4, not approximately 1.2.']
    ] },

  { q: 'Q59', id: 'phys-119', key: 'B',
    stemMustContain: 'does the gravitational acceleration become g/4?',
    stem: "Treat Earth as spherically symmetric and neglect its rotation. At what height above its surface is the gravitational acceleration one-quarter of its surface value g? (R = Earth's radius)",
    kcMustContain: 'g at height h:',
    kc: 'At height h above a spherical Earth, distance from the center is R + h and g(h) = g[R/(R + h)]². Reducing g to one-quarter requires doubling the center-to-object distance, so h = R.',
    fb: [
      ['A', " At h = R/2, the distance from Earth's center is 1.5R and the acceleration is g/(1.5)² = 4g/9, not g/4."],
      ['C', " At h = 2R, the distance from Earth's center is 3R, giving g/9. The required distance from the center is 2R, which means height R."],
      ['D', ' At h = 4R, the center-to-object distance is 5R, giving g/25. Do not confuse height above the surface with distance from the center.']
    ] },

  { q: 'Q60', id: 'phys-120', key: 'C',
    stemMustContain: 'If the distance between two objects is doubled, the gravitational force between them:',
    stem: 'If the separation between two point masses is doubled while their masses remain unchanged, the magnitude of the gravitational force between them:',
    fb: [
      ['A', ' Halving the force would describe an inverse-first-power dependence on distance. Gravity between point masses follows an inverse-square dependence.'],
      ['B', ' Increasing separation makes the gravitational attraction weaker, not stronger. The force is proportional to 1/r².'],
      ['D', ' The force becomes four times as large when separation is halved, not doubled. Doubling r multiplies the denominator r² by four.']
    ] },

];
