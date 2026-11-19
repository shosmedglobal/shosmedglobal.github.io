/* Physics second-block edit specs, display Q21-Q30. See phys-b2-edits-a.js for
   the conventions. */
'use strict';
module.exports = [

  { q: 'Q21', id: 'phys-81', key: 'B',
    options: [['A', 'Cancel each other out', 'Cancel each other on the same object']],
    headMustContain: 'They do not cancel because they are not applied to the same body',
    head: "<p>The two forces in a Newton's third-law pair act on <strong>different objects</strong>. The force of A on B acts on B, while the equal and opposite force of B on A acts on A. They therefore do not balance each other in the force diagram for either object alone. If A and B are treated as one combined system, however, the pair consists of internal forces and cancels in the total force sum.</p>",
    kcMustContain: 'thus cannot cancel each other',
    kc: 'Third-law pairs act on different objects. They do not cancel on either object separately, but they cancel as internal forces when both objects are included in one system.',
    fb: [
      ['A', " The two forces do not act on the same object, so they cannot cancel in that object's individual force diagram. Cancellation as internal forces applies only when both objects are included in the system."],
      ['C', " Each object can accelerate because its net force includes all forces acting on it. Equal and opposite forces on different objects do not require either object's acceleration to be zero."],
      ['D', ' Third-law pairs also occur for noncontact interactions, such as the gravitational attraction between Earth and the Moon. Contact is not required.']
    ] },

  { q: 'Q22', id: 'phys-82', key: 'B',
    stemMustContain: 'pulled by a force of 25 N on a frictionless surface',
    stem: 'A 2 kg block and a 3 kg block are joined by a taut, massless, inextensible string on a frictionless horizontal surface. A horizontal force of 25 N acts on the 3 kg block, pulling it away from the 2 kg block. What is the tension in the string?',
    fb: [
      ['A', " The number 5 is the common acceleration in m/s², not the tension in newtons. Multiply this acceleration by the 2 kg block's mass to find the force accelerating that block."],
      ['C', ' The value 15 N is the net force on the 3 kg block, 25 − T. It would be the tension in a different arrangement where the external force pulled the 2 kg block instead.'],
      ['D', ' A 20 N tension would accelerate the 2 kg block at 10 m/s², inconsistent with the common acceleration of 25/(2 + 3) = 5 m/s².']
    ] },

  { q: 'Q23', id: 'phys-83', key: 'B',
    stemMustContain: 'A 4 kg object on a frictionless incline at 30° slides down',
    stem: 'A 4 kg object slides down a fixed, frictionless incline at 30° to the horizontal. Only gravity and the normal force act on it. What is its acceleration along the incline? (g = 10 m/s²)',
    fb: [
      ['A', ' The downhill acceleration is g sin 30° = 5 m/s². There is no extra factor of one-half after using sin 30° = 0.5.'],
      ['C', ' The component of gravity along the incline is mg sin 30°. Dividing by the mass gives 5 m/s², not 7.5 m/s².'],
      ['D', ' An acceleration of g would describe vertical free fall. The incline constrains the motion, so only the downhill component of gravity causes acceleration along the surface.']
    ] },

  { q: 'Q24', id: 'phys-84', key: 'C',
    stemMustContain: 'A box is pushed across a floor with a horizontal force of 50 N',
    stem: 'A box slides across a level horizontal floor while being pushed horizontally with a force of 50 N. If it moves at constant velocity and weighs 200 N, what is the coefficient of kinetic friction?',
    fb: [
      ['A', ' This coefficient would give friction of 0.15 × 200 = 30 N, smaller than the push. The box would accelerate.'],
      ['B', ' This coefficient would give 40 N of friction. Constant velocity instead requires friction to equal the full 50 N push.'],
      ['D', ' This coefficient would give 60 N of friction, larger than the push. The required ratio is 50 N/200 N = 0.25.']
    ] },

  { q: 'Q25', id: 'phys-85', key: 'B',
    stemMustContain: 'A 1000 kg car brakes from 20 m/s to rest in 4 s',
    stem: 'A 1000 kg car moving in a straight line slows from 20 m/s to rest in 4 s. What is the magnitude of the average net force during this interval?',
    headMustContain: 'Braking force: F = ma',
    head: '<p>Take the initial direction of motion as positive. The average acceleration is (0 − 20)/4 = −5 m/s². Therefore the average net force is mΔv/Δt = 1000 × (−5) = −5000 N. Its magnitude is <strong>5000 N</strong>, and its direction is opposite the initial motion.</p>',
    kcMustContain: 'The braking force equals mass times deceleration',
    kc: 'For constant mass, average net force = mΔv/Δt. A force opposite the direction of motion reduces speed; use the magnitude if the question asks for a positive force value.',
    fb: [
      ['A', " A 2500 N average opposing force would change this car's speed by only 10 m/s in 4 s. The required change is 20 m/s."],
      ['C', ' A 7500 N average opposing force corresponds to an acceleration magnitude of 7.5 m/s². The stated velocity change and time give 5 m/s².'],
      ['D', ' A 10000 N average force would correspond to a 40 m/s velocity change over 4 s. It is twice the required magnitude.']
    ] },

  { q: 'Q26', id: 'phys-86', key: 'C',
    headMustContain: 'maintains its state of rest or uniform motion',
    head: "<p>Newton's first law, the <strong>law of inertia</strong>, states that an object remains at rest or moves with constant velocity in a straight line unless a net external force acts on it. A nonzero net force changes velocity, which can mean changing speed, direction, or both.</p>",
    fb: [
      ['A', " Newton's second law gives the quantitative relation between net force and acceleration, F = ma. Its zero-force case is consistent with this statement, but the named law of inertia is Newton's first law."],
      ['B', " Newton's third law describes equal and opposite interaction forces acting on different objects. The stem instead describes how an object moves when its net force is zero."],
      ['D', " Momentum conservation concerns the total momentum of a system with no net external force. It is related to this idea, but the familiar statement about remaining at rest is Newton's first law."]
    ] },

  { q: 'Q27', id: 'phys-87', key: 'B',
    stemMustContain: 'pulls a sled 10 m along the ground at an angle of 60° above the horizontal',
    stem: 'A constant force of 40 N acts at 60° above the horizontal while pulling a sled through a horizontal displacement of 10 m. What work does this force do?',
    kcMustContain: 'Only the component of force along the displacement does work',
    kc: 'For a constant force, W = Fd cos θ, where θ is the angle between force and displacement. Only the component of force along the displacement contributes to the work.',
    fb: [
      ['A', ' The horizontal force component is 40 cos 60° = 20 N. Acting through 10 m, it does 200 J, without any additional factor of one-half.'],
      ['C', ' This uses sin 60° and the vertical force component. Because the displacement is horizontal, the relevant component is F cos 60°.'],
      ['D', ' The value Fd = 400 J would apply if force and displacement were parallel. Here only half the force magnitude acts along the displacement.']
    ] },

  { q: 'Q28', id: 'phys-88', key: 'C',
    fb: [
      ['A', ' This is the numerical product mv = 24 kg·m/s, which is momentum, not energy. Kinetic energy uses one-half the mass times speed squared.'],
      ['B', ' This is half the correct result. The factor of one-half is already included in ½ × 3 × 8² = 96 J.'],
      ['D', ' This is mv² and omits the factor of one-half in kinetic energy. The correct expression is KE = ½mv².']
    ] },

  { q: 'Q29', id: 'phys-89', key: 'C',
    headMustContain: 'PE = mgh = 2 × 10 × 15',
    head: "<p>Near Earth's surface, with g treated as constant, the increase in gravitational potential energy is ΔU = mgΔh = 2 × 10 × 15 = <strong>300 J</strong>. The result depends on the height gained, not on where the zero of potential energy is chosen.</p>",
    kcMustContain: 'Gravitational potential energy PE = mgh',
    kc: "For a height change near Earth's surface, ΔU = mgΔh. Raising an object increases its gravitational potential energy; lowering it decreases that energy.",
    fb: [
      ['A', ' This is gΔh without the factor of mass. The given 2 kg mass doubles the value from 150 J to 300 J.'],
      ['B', ' For this mass, a 200 J increase would correspond to a 10 m rise. The stated rise is 15 m.'],
      ['D', ' The product mΔh is 30 kg·m, not an energy. Multiplying by g supplies both the required factor of 10 and the correct units.']
    ] },

  { q: 'Q30', id: 'phys-90', key: 'C',
    kcMustContain: 'potential energy converts fully to kinetic energy',
    kc: 'For this drop without air resistance, the loss of gravitational potential energy equals the gain in kinetic energy. Released from rest through height h, the ball satisfies mgh = ½mv².',
    fb: [
      ['A', ' A speed of 10 m/s corresponds to a fall of v²/(2g) = 5 m from rest. The actual drop is 20 m.'],
      ['B', ' A speed of 15 m/s corresponds to a drop of 11.25 m in this model. Use the full 20 m height in v = √(2gh).'],
      ['D', " A speed of 25 m/s would require a drop of 31.25 m from rest. The given drop produces 20 m/s, regardless of the ball's mass."]
    ] },

];
