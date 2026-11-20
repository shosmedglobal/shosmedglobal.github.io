/* Physics THIRD-block edit specs, display Q1-Q10. Every string is the review's
   own supplied wording. Distractor headings are derived from the stored option
   text by the harness, so only the body appears here; bodies keep their leading
   space, matching the convention of phys-61..phys-120.

   The review prints exponents and indices as Unicode (10⁻⁶, q₁, ε₀). They are
   carried over here as <sup>/<sub> markup, which is the form the block's own
   stems already use (Q2, Q3, Q5, Q8) and the form the approved scoped CSS
   renders. That is a presentation normalization, not a content change. */
'use strict';
module.exports = [

  { q: 'Q1', id: 'phys-121', key: 'A',
    fb: [
      ['B', ' Doubling the mass alone would double the gravitational acceleration, but the radius also doubles. Its square appears in the denominator, giving an overall factor of 2/4.'],
      ['C', ' This includes the doubled mass but ignores the doubled radius. Use both changes in g = GM/R<sup>2</sup>.'],
      ['D', ' This is the factor by which R<sup>2</sup> increases. It belongs in the denominator, so it reduces the effect of the increased mass rather than multiplying it.']
    ] },

  { q: 'Q2', id: 'phys-122', key: 'C',
    headWas: '<p>F = kq<sub>1</sub>q<sub>2</sub>/r² = 9×10<sup>9</sup> × 3×10<sup>−6</sup> × 6×10<sup>−6</sup> / (0.3)² = 9×10<sup>9</sup> × 18×10<sup>−12</sup> / 0.09 = 0.162/0.09 = <strong>1.8 N</strong>.</p>',
    head: '<p>The magnitude is F = k|q<sub>1</sub>q<sub>2</sub>|/r<sup>2</sup> = (9 × 10<sup>9</sup>)(3 × 10<sup>−6</sup>)(6 × 10<sup>−6</sup>)/(0.3)<sup>2</sup> = 0.162/0.09 = <strong>1.8 N</strong>. The force is attractive because the charges have opposite signs.</p>',
    kcWas: "Coulomb's law: F = kq₁q₂/r².",
    kc: 'Coulomb force magnitude is F = k|q<sub>1</sub>q<sub>2</sub>|/r<sup>2</sup>. Like charges repel and opposite charges attract.',
    fb: [
      ['A', ' This is one-third of the correct force. The numerator k|q<sub>1</sub>q<sub>2</sub>| is 0.162 N·m<sup>2</sup>, and dividing by r<sup>2</sup> = 0.09 m<sup>2</sup> gives 1.8 N.'],
      ['B', ' At the stated separation, 1.2 N would result if the second charge had magnitude 4 μC. Its actual magnitude is 6 μC, giving 1.8 N.'],
      ['D', ' This is three times the correct force. Multiply the charge magnitudes once and divide by the squared separation; no additional factor of 3 is needed.']
    ] },

  { q: 'Q3', id: 'phys-123', key: 'C',
    stemWas: 'What is the electric field at a distance of 0.5 m from a point charge of 2 × 10<sup>−6</sup> C? (k = 9 × 10<sup>9</sup> N·m²/C²)',
    stem: 'What is the magnitude of the electric field 0.5 m from a point charge of +2 × 10<sup>−6</sup> C? (k = 9 × 10<sup>9</sup> N·m<sup>2</sup>/C<sup>2</sup>)',
    headWas: '<p>E = kq/r² = 9×10<sup>9</sup> × 2×10<sup>−6</sup> / (0.5)² = 18,000 / 0.25 = <strong>72,000 N/C</strong>.</p>',
    head: '<p>The field magnitude is E = k|q|/r<sup>2</sup> = (9 × 10<sup>9</sup>)(2 × 10<sup>−6</sup>)/(0.5)<sup>2</sup> = 18,000/0.25 = <strong>72,000 N/C</strong>. The field points radially away from this positive charge.</p>',
    kcWas: 'Electric field from a point charge: E = kq/r².',
    kc: 'A point charge produces a field of magnitude E = k|q|/r<sup>2</sup>, directed away from a positive charge and toward a negative charge.',
    fb: [
      ['A', ' This is the field at 1 m from the same charge. At 0.5 m, the inverse-square relationship makes the field four times larger.'],
      ['B', ' This comes from dividing 18,000 by 0.5 rather than by (0.5)<sup>2</sup>. Electric field from a point charge varies as 1/r<sup>2</sup>, not 1/r.'],
      ['D', ' This is twice the correct field. The distance contributes a factor of four relative to 1 m, giving 72,000 N/C, not a factor of eight.']
    ] },

  { q: 'Q4', id: 'phys-124', key: 'B',
    fb: [
      ['A', ' The reciprocal sum is 1 Ω<sup>−1</sup>, whose reciprocal is 1 Ω. A resistance of 0.5 Ω would require a total conductance of 2 Ω<sup>−1</sup>.'],
      ['C', ' This is approximately the arithmetic mean of 2, 3 and 6 Ω. Parallel resistance is found by adding reciprocals, and must be less than the smallest branch resistance.'],
      ['D', ' This is 2 + 3 + 6 Ω, the equivalent resistance of the three resistors in series. The question specifies parallel branches.']
    ] },

  { q: 'Q5', id: 'phys-125', key: 'A',
    stemWas: 'A parallel plate capacitor has plates of area 0.02 m² separated by 0.001 m. What is its capacitance? (ε<sub>0</sub> = 8.85 × 10<sup>−12</sup> F/m)',
    stem: 'An ideal parallel-plate capacitor has vacuum between plates of area 0.02 m<sup>2</sup> separated by 0.001 m. Neglecting edge effects, what is its capacitance? (ε<sub>0</sub> = 8.85 × 10<sup>−12</sup> F/m)',
    kcWas: 'Parallel plate capacitance: C = ε₀A/d.',
    kc: 'For a parallel-plate capacitor with vacuum between the plates and negligible edge effects, C = ε<sub>0</sub>A/d. Larger area increases capacitance; larger separation decreases it.',
    fb: [
      ['B', ' This is five times the correct capacitance. The geometric factor is A/d = 0.02/0.001 = 20 m, not 100 m.'],
      ['C', ' This is ten times too small. Dividing the plate area by the separation gives 20 m, so multiplying by 8.85 × 10<sup>−12</sup> F/m gives 1.77 × 10<sup>−10</sup> F.'],
      ['D', ' This is half the correct capacitance. The parallel-plate formula has no factor of ½; that factor appears in the capacitor energy formula, ½CV<sup>2</sup>.']
    ] },

  { q: 'Q6', id: 'phys-126', key: 'A',
    fb: [
      ['B', ' This is the arithmetic mean of 4 and 6 μF. For series capacitors, add reciprocal capacitances rather than averaging them.'],
      ['C', ' Adding the capacitances gives 10 μF for a parallel connection. In series, the equivalent capacitance is smaller than either individual capacitance.'],
      ['D', ' This is half of the correct result. The reciprocal sum is 5/12 μF<sup>−1</sup>, so its reciprocal is 12/5 = 2.4 μF, with no further division by two.']
    ] },

  { q: 'Q7', id: 'phys-127', key: 'B',
    fb: [
      ['A', ' The product IR is 30 V, the voltage across the resistor. Power requires another factor of current: P = I(IR) = 90 W.'],
      ['C', ' This value would correspond to a larger current, about √(300/10) = 5.48 A. With the stated 3 A, I<sup>2</sup>R gives 90 W.'],
      ['D', ' This is the numerical value of 3<sup>2</sup>, but the resistance still has to be included. Multiply 9 A<sup>2</sup> by 10 Ω to obtain 90 W.']
    ] },

  { q: 'Q8', id: 'phys-128', key: 'B',
    fb: [
      ['A', ' This is the resistance of a 1 m length of the same wire. The actual length is 10 m, so the resistance is ten times larger.'],
      ['C', ' This is ten times too large. The powers of ten give 10<sup>−8</sup> × 10<sup>1</sup>/10<sup>−6</sup> = 10<sup>−1</sup>, so the result is 1.7 × 10<sup>−1</sup> Ω.'],
      ['D', ' This is 100 times too large. Keep the cross-sectional area in square meters and use R = ρL/A without an extra area conversion.']
    ] },

  { q: 'Q9', id: 'phys-129', key: 'C',
    stemWas: 'In a series circuit with a 12 V battery and two resistors (3 Ω and 6 Ω), what is the voltage across the 6 Ω resistor?',
    stem: 'Two resistors of 3 Ω and 6 Ω are connected in series across an ideal 12 V battery. What is the voltage across the 6 Ω resistor?',
    fb: [
      ['A', ' This is the voltage across the 3 Ω resistor: (12/9) × 3 = 4 V. The 6 Ω resistor takes twice that voltage because the same current passes through both.'],
      ['B', ' An equal 6 V split would require equal resistances. In series, voltage divides in proportion to resistance, here in a 1:2 ratio.'],
      ['D', ' The full 12 V is across both resistors together. Only a resistor directly across the battery terminals would have that entire voltage across it.']
    ] },

  { q: 'Q10', id: 'phys-130', key: 'C',
    stemWas: 'How much work is done in moving a charge of 5 C through a potential difference of 24 V?',
    stem: 'A positive charge of +5 C is moved to a point whose electric potential is 24 V higher. What is the increase in its electric potential energy?',
    headWas: '<p>W = qV = 5 × 24 = <strong>120 J</strong>.</p>',
    head: '<p>The change in electric potential energy is ΔU = qΔV = (5 C)(24 V) = <strong>120 J</strong>. A positive charge gains potential energy when moved to a higher potential. The electric field does −120 J of work during this displacement.</p>',
    kcWas: 'Work done on a charge: W = qV (voltage is energy per unit charge).',
    kc: 'Electric potential difference is potential-energy change per unit charge: ΔU = qΔV. Work done by the electric field is −ΔU.',
    fb: [
      ['A', ' Dividing 24 by 5 gives 4.8, but voltage is already energy per unit charge. Multiply the potential difference by the charge to obtain an energy.'],
      ['B', ' This adds 5 and 24. Charge and voltage have different units and cannot be added; their product has units of joules.'],
      ['D', ' This is approximately 5/24. Dividing charge by voltage has units of capacitance, not energy; the required operation is qΔV.']
    ] }

];
