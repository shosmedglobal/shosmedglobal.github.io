/* Physics second-block edit specs, display Q1-Q10. Every string is the review's
   own supplied wording. Distractor headings are derived from the stored option
   text by the harness, so only the body appears here; bodies keep their leading
   space, matching the convention of phys-226..phys-250.

   The review prints exponents and subscripts as Unicode (10⁻⁹, v₀). This block
   stores them as <sup>/<sub> markup with a U+2212 minus, so the review's wording
   is carried over in the bank's own markup. That is a presentation
   normalization, not a content change. */
'use strict';
module.exports = [

  { q: 'Q1', id: 'phys-61', key: 'B',
    fb: [
      ['A', ' This is ten times the correct diameter: 5 × 10<sup>−7</sup> m equals 500 nm. The prefix nano means 10<sup>−9</sup>, so 50 nm must first be written as 50 × 10<sup>−9</sup> m.'],
      ['C', ' This equals 5 nm, not 50 nm. When 50 × 10<sup>−9</sup> is written with a coefficient of 5, the exponent increases by one to −8.'],
      ['D', ' This equals 5000 nm, or 5 μm. It is 100 times larger than the stated diameter.']
    ] },

  { q: 'Q2', id: 'phys-62', key: 'C',
    fb: [
      ['A', ' Temperature is a scalar: it describes a thermal state without a spatial direction. A temperature gradient has a direction, but temperature itself does not.'],
      ['B', ' Mass is a scalar amount of matter or measure of inertia. A value such as 2 kg does not need a direction.'],
      ['D', ' Speed is the magnitude of velocity and has no direction. Velocity is a vector, but speed alone is a scalar.']
    ] },

  { q: 'Q3', id: 'phys-63', key: 'B',
    kcMustContain: 'have the same units',
    kc: 'A valid physical equation must have matching dimensions on both sides. Dimensional analysis can reject an inconsistent expression, but cannot by itself prove that a formula is correct.',
    fb: [
      ['A', ' Multiplying force by area gives kg·m<sup>3</sup>·s<sup>−2</sup>. Pressure instead divides the normal force by the area over which it acts.'],
      ['C', ' Force multiplied by velocity has dimensions kg·m<sup>2</sup>·s<sup>−3</sup>, the dimensions of power. It does not have the dimensions of pressure.'],
      ['D', ' Energy multiplied by volume has dimensions kg·m<sup>5</sup>·s<sup>−2</sup>. Energy divided by volume would have pressure dimensions, but that is not the operation given here.']
    ] },

  { q: 'Q4', id: 'phys-64', key: 'B',
    fb: [
      ['A', ' This uses a conversion factor of 100 instead of 1000. Milli is 10<sup>−3</sup> and micro is 10<sup>−6</sup>, so one milliliter contains 10<sup>3</sup> microliters.'],
      ['C', ' This is ten times too large. Multiplying 0.25 by 1000 gives 250, not 2500.'],
      ['D', ' A microliter is smaller than a milliliter, so the numerical value increases when the same volume is expressed in microliters.']
    ] },

  { q: 'Q5', id: 'phys-65', key: 'A',
    headMustContain: 'Option B is the Newton',
    head: '<p>For a constant force parallel to a displacement, the work is W = Fd. Therefore 1 J = 1 N·m = (1 kg·m·s<sup>−2</sup>)(1 m) = 1 kg·m<sup>2</sup>·s<sup>−2</sup>. Work transfers energy, so the joule is also the SI unit of energy.</p>',
    fb: [
      ['B', ' This is the newton, the unit of force. Multiplying a force by a distance adds another factor of meters and gives the joule.'],
      ['C', ' This has one fewer factor of inverse seconds than energy. It is the unit of angular momentum or action, equivalent to J·s.'],
      ['D', ' This is the pascal, the unit of pressure: one newton per square meter. Energy and pressure therefore have different dimensions.']
    ] },

  { q: 'Q6', id: 'phys-66', key: 'A',
    kcMustContain: 'not the average of the two speeds',
    kc: 'Average speed is total distance divided by total elapsed time. It is a time-weighted average of the speeds; a simple arithmetic mean is not valid in general.',
    fb: [
      ['B', ' This would result from dividing 200 km by 2 hours, but the journey takes 2.5 hours. Include the full time for both legs.'],
      ['C', ' Both legs have an average speed of 80 km/h: 120/1.5 = 80 and 80/1 = 80. Combining them cannot produce 90 km/h without changing the stated distance or time.'],
      ['D', ' At 75 km/h, covering 200 km would take about 2.67 hours. The stated elapsed time is 2.5 hours, giving 80 km/h.']
    ] },

  { q: 'Q7', id: 'phys-67', key: 'C',
    stemMustContain: 'accelerates uniformly at 4 m/s',
    stem: 'An object starts from rest and moves in a straight line with a constant acceleration of 4 m/s². What is its speed after 5 seconds?',
    fb: [
      ['A', ' This is the average speed during the five seconds, (0 + 20)/2, rather than the final speed. The final speed increases by 4 m/s each second.'],
      ['B', ' A final speed of 15 m/s after 5 s would require an acceleration of 3 m/s² from rest. The stated acceleration is 4 m/s².'],
      ['D', ' A final speed of 25 m/s after 5 s would require 5 m/s² from rest. Use v = at with the stated acceleration.']
    ] },

  { q: 'Q8', id: 'phys-68', key: 'B',
    stemMustContain: 'A ball is dropped from a height of 45 m',
    stem: 'A ball is released from rest 45 m above the ground. Ignoring air resistance, how long does it take to reach the ground? (g = 10 m/s²)',
    fb: [
      ['A', ' In 2 s, a ball released from rest falls only ½ × 10 × 2² = 20 m. It has not yet covered the stated 45 m.'],
      ['C', ' In 4 s, the free-fall distance would be 80 m. Solving 45 = 5t² gives t = 3 s.'],
      ['D', ' Dividing 45 by 10 does not give the fall time: acceleration is not a constant speed. Distance from rest grows with t², so a square root is needed.']
    ] },

  { q: 'Q9', id: 'phys-69', key: 'B',
    stemMustContain: 'What maximum height does it reach?',
    stem: 'A stone is thrown vertically upward at 30 m/s. Ignoring air resistance, what is its maximum rise above the release point? (g = 10 m/s²)',
    kcMustContain: 'At maximum height the velocity is zero',
    kc: 'For a vertical throw without air resistance, the speed is momentarily zero at the highest point. The rise is h = v<sub>0</sub>²/(2g); gravity still acts at the top.',
    fb: [
      ['A', ' The rise is determined by v<sub>0</sub>²/(2g), not by assigning the same numerical value to speed and height. The units and the factor of 2g both matter.'],
      ['C', ' Using an average upward speed of 15 m/s over the 3 s ascent gives 45 m, not 60 m. Gravity steadily reduces the upward speed.'],
      ['D', ' This comes from v<sub>0</sub>²/g and misses the factor of 2. The correct relation is 0 = v<sub>0</sub>² − 2gh.']
    ] },

  { q: 'Q10', id: 'phys-70', key: 'C',
    stemMustContain: 'A projectile is launched at 45° with an initial speed of 40 m/s',
    stem: 'A projectile is launched at 40 m/s, at 45° above the horizontal, and lands at the same height as its launch point. Ignoring air resistance, what is its horizontal range? (g = 10 m/s²)',
    kcMustContain: 'Maximum range occurs at 45°',
    kc: 'For launch and landing at the same height without air resistance, R = v<sub>0</sub>²sin(2θ)/g. At a fixed launch speed, this range is greatest at θ = 45°.',
    fb: [
      ['A', ' This is half the full range and corresponds to the horizontal distance reached at the highest point. The projectile then travels an equal horizontal distance while descending.'],
      ['B', ' The range depends on sin(2θ), which is sin 90° = 1 here. Substitution gives 1600/10 = 160 m.'],
      ['D', ' With the stated speed, 45° already gives the maximum range in this model, 160 m. A range of 200 m would require a larger launch speed.']
    ] },

];
