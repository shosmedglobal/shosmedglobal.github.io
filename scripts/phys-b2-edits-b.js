/* Physics second-block edit specs, display Q11-Q20. See phys-b2-edits-a.js for
   the conventions. */
'use strict';
module.exports = [

  { q: 'Q11', id: 'phys-71', key: 'B',
    fb: [
      ['A', ' A period of 0.01 s means 100 revolutions per second, or 6000 rpm. The stated wheel rotates at one tenth of that frequency.'],
      ['C', ' A period of 0.5 s means 2 revolutions per second, or 120 rpm. Convert 600 rpm to 10 Hz before taking its reciprocal.'],
      ['D', ' A period of 1 s means 1 revolution per second, or 60 rpm. At 600 rpm, each revolution lasts only 0.1 s.']
    ] },

  { q: 'Q12', id: 'phys-72', key: 'C',
    fb: [
      ['A', ' Dividing v by r gives 3 s<sup>−1</sup>, the angular speed, not an acceleration. Centripetal acceleration requires v²/r.'],
      ['B', ' Multiplying speed by radius gives 12 m²/s, which does not have acceleration units. Square the speed and divide by the radius instead.'],
      ['D', ' This is the numerical value of v² before division by r. Dividing 36 m²/s² by 2 m gives 18 m/s².']
    ] },

  { q: 'Q13', id: 'phys-73', key: 'C',
    stemMustContain: 'from a cliff 80 m high with an initial speed of 15 m/s',
    stem: 'A projectile is launched horizontally at 15 m/s from a cliff 80 m above level ground. Ignoring air resistance, how far horizontally from the point directly below the launch does it land? (g = 10 m/s²)',
    kcMustContain: 'vertical and horizontal motions are independent',
    kc: 'Without air resistance, horizontal velocity remains constant while vertical velocity changes under gravity. Find the fall time from the vertical motion, then use that same time in x = v<sub>x</sub>t.',
    fb: [
      ['A', ' This would require a flight time of 2 s. A fall from rest through 80 m takes 4 s, so the projectile travels twice as far horizontally.'],
      ['B', ' This would require a flight time of 3 s, during which the vertical drop would be only 45 m. Use the full 80 m drop to find the time.'],
      ['D', ' This corresponds to a 5 s flight, but in 5 s the vertical drop would be 125 m. The projectile reaches the ground after 4 s.']
    ] },

  { q: 'Q14', id: 'phys-74', key: 'B',
    headMustContain: 'Distance in the nth second',
    head: '<p>The third second is the interval from t = 2 s to t = 3 s. From rest with constant acceleration, x(t) = ½at². Therefore x(3 s) − x(2 s) = ½a[(3 s)² − (2 s)²] = (2.5 s²)a = 20 m, so a = <strong>8 m/s²</strong>. This is the distance during the third second, not the total distance during the first three seconds.</p>',
    kcMustContain: 'Distance covered in the nth second',
    kc: 'Displacement during a time interval is final position minus initial position. If motion stays in one direction, the magnitude of that displacement is the distance traveled. The third second runs from 2 s to 3 s.',
    fb: [
      ['A', ' With a = 6 m/s², the distance during the third second would be (2.5 s²)(6 m/s²) = 15 m, rather than 20 m.'],
      ['C', ' With a = 10 m/s², the third-second distance would be 25 m. Calculate the difference between the positions at 3 s and 2 s.'],
      ['D', ' With a = 12 m/s², the third-second distance would be 30 m. The required acceleration is 20 m divided by 2.5 s².']
    ] },

  { q: 'Q15', id: 'phys-75', key: 'B',
    fb: [
      ['A', ' One revolution per second corresponds to 2π rad/s. The disc turns through 4π radians each second, equivalent to two complete revolutions.'],
      ['C', ' This divides the angular speed by π instead of 2π. A full revolution contains 2π radians.'],
      ['D', ' The value 0.5 s is the period of this rotation, not its frequency. Frequency is the reciprocal of period, giving 2 Hz.']
    ] },

  { q: 'Q16', id: 'phys-76', key: 'C',
    stemMustContain: 'What is the total time it spends in the air?',
    stem: 'A ball is thrown vertically upward at 20 m/s and returns to its release height. Ignoring air resistance, what is the total flight time? (g = 10 m/s²)',
    kcMustContain: 'Total flight time for vertical throw',
    kc: 'For a vertical throw returning to its release height without air resistance, ascent and descent take equal times: total flight time = 2v<sub>0</sub>/g.',
    fb: [
      ['A', ' Two seconds is only the time to reach the highest point. The return to the original height takes another 2 s.'],
      ['B', ' At t = 3 s, the height above release is 20(3) − ½(10)(3²) = 15 m. The ball has not yet returned.'],
      ['D', ' The ball first returns at 4 s. Continuing the motion equation to 5 s would place it below the release height, beyond the flight interval asked about.']
    ] },

  { q: 'Q17', id: 'phys-77', key: 'B',
    fb: [
      ['A', ' Adding the numerical values of mass and acceleration gives 8, but these quantities have different units and cannot be added to obtain a force.'],
      ['C', " Dividing mass by acceleration gives about 1.67 but not the dimensions of force. Newton's second law requires multiplication: F = ma."],
      ['D', ' A net force of 20 N on 5 kg would produce an acceleration of 4 m/s². The stated acceleration is 3 m/s², requiring 15 N.']
    ] },

  { q: 'Q18', id: 'phys-78', key: 'B',
    headMustContain: 'When accelerating upward, the normal force exceeds the true weight',
    head: "<p>Take upward as positive. The forces on the person are the upward normal force N and the downward gravitational force mg. Newton's second law gives N − mg = ma, so N = 60(10 + 2) = <strong>720 N</strong>. The gravitational weight remains 600 N; the larger normal force is the apparent weight measured by a scale.</p>",
    kcMustContain: 'apparent weight = m(g ± a)',
    kc: 'With upward defined as positive, N = m(g + a). Apparent weight depends on the direction of acceleration, not simply on whether the elevator is moving up or down.',
    fb: [
      ['A', ' This is mg, the gravitational weight. It would also equal the apparent weight if the elevator had zero acceleration, but here an extra upward net force is required.'],
      ['C', ' This is m(g − 2), the apparent weight for a downward acceleration of 2 m/s². The question specifies upward acceleration.'],
      ['D', ' This would give a net upward force of only 60 N and an acceleration of 1 m/s². The stated 2 m/s² requires a net force of 120 N.']
    ] },

  { q: 'Q19', id: 'phys-79', key: 'C',
    stemMustContain: 'What horizontal force is needed to move it at constant velocity?',
    stem: 'A 10 kg block slides on a level horizontal surface with coefficient of kinetic friction μ<sub>k</sub> = 0.3. What horizontal pulling force maintains a constant velocity? Ignore other resistance. (g = 10 m/s²)',
    kcMustContain: 'applied force equals friction',
    kc: 'Constant velocity requires zero net force. Here the horizontal pull balances kinetic friction, and the normal force is mg because there is no vertical acceleration or vertical component of the pull.',
    fb: [
      ['A', ' The kinetic friction is 0.3 × 100 = 30 N. A 10 N pull would leave a net force opposite the motion and slow the block.'],
      ['B', ' A 20 N pull is smaller than the 30 N kinetic friction. The block would slow rather than maintain its velocity.'],
      ['D', ' A 40 N pull exceeds friction by 10 N, so the 10 kg block would accelerate at 1 m/s² in the pulling direction.']
    ] },

  { q: 'Q20', id: 'phys-80', key: 'B',
    fb: [
      ['A', ' The difference 4 − 3 = 1 N would apply to two forces along the same line in opposite directions. These forces are perpendicular.'],
      ['C', ' The sum 3 + 4 = 7 N would apply if both forces pointed in the same direction. Perpendicular components combine by the Pythagorean theorem.'],
      ['D', ' Multiplying force magnitudes does not give a resultant force; it would have units of N². Add the vectors, not their product.']
    ] },

];
