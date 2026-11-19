/* Physics second-block edit specs, display Q31-Q40. See phys-b2-edits-a.js for
   the conventions. Q34 is the review's major rewrite: stem, all four options,
   main explanation and Key Concept are replaced, and the key stays B. */
'use strict';
module.exports = [

  { q: 'Q31', id: 'phys-91', key: 'B',
    stemMustContain: 'A motor lifts a 200 kg load 10 m in 5 seconds',
    stem: "A motor raises a 200 kg load by 10 m in 5 seconds. What is the average useful power associated with the increase in the load's gravitational potential energy? (g = 10 m/s²)",
    headMustContain: 'Work done = mgh',
    head: "<p>The load gains gravitational potential energy ΔU = mgΔh = 200 × 10 × 10 = 20,000 J. Dividing by the elapsed time gives average useful power = 20,000/5 = <strong>4000 W</strong>. This is the rate of energy delivery into the stated height gain, not the motor's electrical input power.</p>",
    kcMustContain: 'Power = Work/time = Force × velocity',
    kc: 'Average power is energy transferred divided by elapsed time. One watt is one joule per second.',
    fb: [
      ['A', ' At 2000 W, transferring 20,000 J would take 10 s. The lift takes 5 s, so twice that average power is needed.'],
      ['C', ' This is ten times too small. The energy gain is 20,000 J, and dividing by 5 s gives 4000 J/s.'],
      ['D', ' At 1000 W, only 5000 J would be transferred in 5 s. The given height gain requires 20,000 J.']
    ] },

  { q: 'Q32', id: 'phys-92', key: 'C',
    stemMustContain: 'A lever has an effort arm of 2 m and a load arm of 0.5 m',
    stem: "An ideal lever is in equilibrium. The perpendicular distance from the pivot to the effort force's line of action is 2 m, and that to the load force's line of action is 0.5 m. What is its mechanical advantage, defined as load force divided by effort force?",
    kcMustContain: 'MA of a lever = effort arm / load arm',
    kc: 'For an ideal lever in equilibrium, effort force × effort moment arm = load force × load moment arm. Mechanical advantage is the effort moment arm divided by the load moment arm.',
    fb: [
      ['A', ' This reverses the requested ratio. The load force is four times the effort force, so load/effort is 4 rather than 0.25.'],
      ['B', ' Adding the two arm lengths gives 2.5 m, a length rather than a dimensionless mechanical advantage. Use their ratio.'],
      ['D', ' A mechanical advantage of 1 would require equal moment arms. Here the effort arm is four times as long as the load arm.']
    ] },

  { q: 'Q33', id: 'phys-93', key: 'A',
    headMustContain: 'Energy was lost to heat/sound',
    head: '<p>Initial kinetic energy = ½ × 4 × 5² = 50 J. Final kinetic energy = ½ × 4 × 3² = 18 J. Thus ΔKE = 18 − 50 = <strong>−32 J</strong>. The ball loses 32 J of kinetic energy, transferred into other forms such as deformation, thermal energy and sound. Reversing direction does not itself make kinetic energy negative, because speed is squared.</p>',
    kcMustContain: 'negative means energy was lost',
    kc: 'Change in kinetic energy is final minus initial kinetic energy. A negative value means kinetic energy decreased, not that total energy was destroyed.',
    fb: [
      ['B', ' This would mean the ball lost all of its initial 50 J and stopped. It rebounds at 3 m/s and retains 18 J of kinetic energy.'],
      ['C', ' This reverses the subtraction. The final kinetic energy is smaller, so final minus initial is −32 J.'],
      ['D', ' The magnitude 18 J is the final kinetic energy, not its change. Subtract the initial 50 J to find the change.']
    ] },

  { q: 'Q34', id: 'phys-94', key: 'B',
    stemMustContain: 'An object is in stable equilibrium when its center of gravity is:',
    stem: 'A rigid body is initially in static equilibrium. Which response after a small tilt and release from rest indicates stable equilibrium?',
    options: [
      ['A', 'As high as possible', 'It experiences a torque that increases the tilt'],
      ['B', 'As low as possible', 'It experiences a torque that tends to restore its original orientation'],
      ['C', 'Moving upward', 'It remains in the new orientation without a restoring torque'],
      ['D', 'Outside the base of support', 'It continues rotating with constant angular velocity']
    ],
    headMustContain: 'as low as possible',
    head: '<p>Stable equilibrium means that a small displacement produces a <strong>restoring force or torque</strong>. After a small tilt, a restoring torque tends to return the body toward its original orientation; without damping, it may oscillate rather than stop there immediately. In gravity-based examples, the equilibrium can correspond to a local minimum of gravitational potential energy. A low center of gravity and a wide base can help a standing object resist tipping, but they are not the general definition of stable equilibrium.</p>',
    kcMustContain: 'Lower center of gravity and wider base of support increase stability',
    kc: 'Stable equilibrium has a restoring tendency after a small displacement. Unstable equilibrium has a tendency to move farther away, while neutral equilibrium has no restoring tendency.',
    fb: [
      ['A', ' A torque that increases the tilt drives the body farther from its original orientation. That is the characteristic response of unstable equilibrium.'],
      ['C', ' Remaining in the displaced position without a restoring torque describes neutral equilibrium for this displacement, rather than stable equilibrium.'],
      ['D', ' Constant angular velocity does not describe a restoring response toward the equilibrium orientation. The defining feature of stability is a torque opposing the small displacement, not continued uniform rotation.']
    ] },

  { q: 'Q35', id: 'phys-95', key: 'B',
    stemMustContain: 'The motor has an efficiency of 75%',
    stem: "A crane raises a 500 kg beam by 12 m in 20 s. In this lift, 75% of the electrical energy input becomes the beam's gravitational potential energy. What is the average electrical input power? (g = 10 m/s²)",
    kcMustContain: 'Efficiency = useful power output / total power input',
    kc: 'Efficiency is useful energy output divided by energy input, or useful average output power divided by average input power over the same interval. Input power exceeds useful output power when efficiency is below 100%.',
    fb: [
      ['A', ' This is the useful output power, mgΔh/t = 3000 W. At 75% efficiency, the electrical input power must be larger.'],
      ['C', ' This does not give the stated efficiency: 3000/4500 is about 67%. Divide the 3000 W useful output by 0.75.'],
      ['D', ' This would mean 50% efficiency, because 3000/6000 = 0.5. The given efficiency is 75%, requiring 4000 W input.']
    ] },

  { q: 'Q36', id: 'phys-96', key: 'A',
    stemMustContain: 'is compressed by 0.3 m. How much elastic potential energy is stored?',
    stem: "A spring obeys Hooke's law with spring constant k = 200 N/m. It is compressed by 0.3 m from its natural length. How much elastic potential energy is stored relative to its uncompressed state?",
    kcMustContain: 'Elastic potential energy = ½kx²',
    kc: "For a spring obeying Hooke's law, elastic potential energy relative to its natural length is ½kx². The factor of one-half reflects the force increasing from zero as the spring is deformed.",
    fb: [
      ['B', ' This is kx² and omits the factor of one-half. The spring force rises during compression, so it is not equal to its final value throughout the displacement.'],
      ['C', ' The numerical value 30 is the average force in newtons during this compression, (0 + 60)/2. Energy is that average force multiplied by the 0.3 m displacement.'],
      ['D', ' The product kx = 60 N is the final spring force, not its stored energy. Energy requires integrating the changing force over displacement, giving ½kx².']
    ] },

  { q: 'Q37', id: 'phys-97', key: 'B',
    stemMustContain: 'A force of 600 N is applied to a piston of area 0.02 m²',
    stem: 'A normal force of 600 N acts on a piston face of area 0.02 m². What average pressure is exerted by this force?',
    kcMustContain: 'Pressure = Force / Area (Pa = N/m²)',
    kc: 'Average pressure is normal force divided by area: P = F<sub>n</sub>/A. One pascal equals one newton per square meter.',
    fb: [
      ['A', ' The required operation is 600/0.02. A pressure of 12,000 Pa acting over this area would produce only 240 N.'],
      ['C', ' This is ten times too small. Dividing by 0.02 is equivalent to multiplying by 50, giving 30,000 Pa.'],
      ['D', ' Pressure is force divided by area, not a small fraction of the force value. The stated force over this small area gives 30 kPa.']
    ] },

  { q: 'Q38', id: 'phys-98', key: 'B',
    stemMustContain: 'What is the hydrostatic pressure at the bottom',
    stem: 'What is the gauge pressure due to the water at the bottom of a 5 m deep swimming pool open to the atmosphere? (ρ<sub>water</sub> = 1000 kg/m³, g = 10 m/s²)',
    headMustContain: 'P = ρgh = 1000 × 10 × 5',
    head: '<p>The gauge pressure is the pressure above atmospheric pressure: P<sub>gauge</sub> = ρgh = 1000 × 10 × 5 = <strong>50,000 Pa</strong> = 50 kPa. The absolute pressure would be atmospheric pressure plus this value.</p>',
    kcMustContain: 'Hydrostatic pressure P = ρgh, proportional to depth',
    kc: 'In a stationary liquid of constant density, pressure increases by ρgh over depth h. For a surface open to the atmosphere, P<sub>gauge</sub> = ρgh and P<sub>absolute</sub> = P<sub>atmosphere</sub> + ρgh.',
    fb: [
      ['A', ' This omits the numerical factor of g = 10 m/s². The product ρh alone does not have pressure units.'],
      ['C', ' This is 100 times too small. A 5 m column of water produces 50,000 Pa of gauge pressure with the stated density and g.'],
      ['D', ' This is ten times too large and would correspond to a depth of 50 m. Gauge pressure is proportional to depth in this model.']
    ] },

  { q: 'Q39', id: 'phys-99', key: 'C',
    stemMustContain: 'is placed in water. What fraction of the cube is submerged?',
    stem: 'A solid cube of side 0.1 m and density 600 kg/m³ floats at rest in water of density 1000 kg/m³. Neglect air buoyancy and surface-tension effects. What fraction of its volume is submerged?',
    kcMustContain: 'For floating objects, fraction submerged',
    kc: "For an object floating in equilibrium, displaced-water weight equals object weight. The submerged volume fraction is the object's average density divided by the fluid density, neglecting other supporting forces.",
    fb: [
      ['A', ' This is the fraction above the surface: 1 − 0.6 = 0.4. The question asks for the submerged fraction.'],
      ['B', " Half-submergence would balance an object with half the water's density, 500 kg/m³. This cube is denser than that."],
      ['D', ' An 80% submerged fraction would correspond to an average object density of 800 kg/m³. The stated density is 600 kg/m³.']
    ] },

  { q: 'Q40', id: 'phys-100', key: 'C',
    stemMustContain: 'An object weighs 80 N in air and 50 N when fully submerged in water',
    stem: 'A stationary object suspended from a spring balance reads 80 N in air and 50 N when fully submerged in water without touching the container. Neglect air buoyancy. What is the buoyant force in water?',
    headMustContain: 'Buoyant force = weight in air',
    head: '<p>In water, the upward support force T and buoyant force F<sub>b</sub> balance the downward weight W: T + F<sub>b</sub> = W. Thus F<sub>b</sub> = 80 − 50 = <strong>30 N</strong>. The gravitational weight is essentially unchanged; buoyancy reduces the support force measured by the balance.</p>',
    kcMustContain: 'Buoyant force equals the difference between the real weight and apparent weight',
    kc: "Archimedes' principle states that buoyant force equals the weight of displaced fluid. For a stationary supported object, apparent weight is reduced by that buoyant force.",
    fb: [
      ['A', ' Adding the two readings is not the force balance. The underwater support force and buoyancy together equal the 80 N downward weight.'],
      ['B', ' The 50 N reading is the support force supplied by the balance. Water supplies the remaining 30 N of upward force.'],
      ['D', ' Buoyancy would equal the full 80 N weight if the object floated freely with no supporting tension. Here the balance still supplies 50 N.']
    ] },

];
