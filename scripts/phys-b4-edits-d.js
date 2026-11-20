/* Physics FOURTH-block edit specs, display Q31-Q40. See phys-b4-edits-a.js
   for the conventions. */
'use strict';
module.exports = [

  { q: 'Q31', id: 'phys-211', key: 'A',
    headWas: "<p>The magnetic force on a moving charge is:</p><div class='exp-diagram'><p>F = qvB sin(&theta;)</p><p>F = (1.6 x 10<sup>-19</sup>)(2 x 10<sup>6</sup>)(0.5) sin(90°)</p><p>F = (1.6 x 10<sup>-19</sup>)(10<sup>6</sup>)</p><p>F = <strong>1.6 x 10<sup>-13</sup> N</strong></p></div><p>Since the velocity is perpendicular to B, sin(90°) = 1.</p>",
    head: '<p>The magnetic-force magnitude is F = |q|vB sinθ. For an electron, |q| = e = 1.6 × 10<sup>-19</sup> C. With θ = 90°, F = (1.6 × 10<sup>-19</sup>)(2 × 10<sup>6</sup>)(0.5) = <strong>1.6 × 10<sup>-13</sup> N</strong>. The negative electron charge changes the force direction, not this positive magnitude.</p>',
    existingFb: [
      ['B', '1.6 x 10<sup>-14</sup>', ' Off by a factor of 10, likely from a calculation error in handling the exponents.'],
      ['C', '3.2 x 10<sup>-13</sup>', ' This doubles the answer, possibly by using 2e instead of e.'],
      ['D', '8 x 10<sup>-14</sup>', ' Another exponent error or using a wrong value for one of the quantities.']
    ],
    fbKeep: ['B'], fbReplace: ['C', 'D'],
    fb: [
      ['B', ' Off by a factor of 10, likely from a calculation error in handling the exponents.'],
      ['C', ' This is the result if the factor B = 0.5 T is omitted. Including it halves 3.2 × 10<sup>-13</sup> N to 1.6 × 10<sup>-13</sup> N.'],
      ['D', ' This is half the correct result. The factor 0.5 from the magnetic field has already been used once; sin90° is 1, not another factor of one-half.']
    ],
    kcWas: 'F = qvB sin(&theta;). Maximum force when v is perpendicular to B (&theta; = 90°). Zero force when v is parallel to B (&theta; = 0). The force is always perpendicular to velocity, so it changes the direction of motion but not the speed.',
    kc: 'Magnetic-force magnitude is F = |q|vB sinθ. It is greatest for perpendicular motion and zero for parallel or antiparallel motion. The magnetic force is perpendicular to velocity and does no work; for an electron its direction is opposite to v × B.' },

  { q: 'Q32', id: 'phys-212', key: 'C',
    stemWas: "A charged particle moves in a circle of radius r in a uniform magnetic field. If the particle's speed is doubled while the field stays the same, the radius of the circular path:",
    stem: "A nonrelativistic charged particle moves perpendicular to a uniform magnetic field in a circle of radius r. If its speed doubles while the field and the particle's mass and charge remain unchanged, and the motion remains nonrelativistic, the radius:",
    headWas: "<p>The radius of circular motion in a magnetic field is:</p><div class='exp-diagram'><p>r = mv / (qB)</p></div><p>Since r is directly proportional to v, doubling the speed doubles the radius.</p>",
    head: '<p>Balancing magnetic and centripetal force gives |q|vB = mv<sup>2</sup>/r, so r = mv/(|q|B). For fixed mass, charge magnitude and field, r is proportional to v. Doubling the speed therefore <strong>doubles</strong> the radius.</p>',
    existingFb: [
      ['A', 'Halved', ' This would be the case if r were inversely proportional to v, but it is directly proportional.'],
      ['B', 'Stays the same', ' The radius depends on speed. Only the period (T = 2&pi;m/qB) is independent of speed.'],
      ['D', 'Quadruples', ' This would require r to be proportional to v<sup>2</sup>, but the relationship is linear.']
    ],
    fbKeep: ['A', 'D'], fbReplace: ['B'],
    fb: [
      ['A', ' This would be the case if r were inversely proportional to v, but it is directly proportional.'],
      ['B', ' In this nonrelativistic model, the period T = 2πm/(|q|B) is independent of speed, but the radius is not. A faster particle covers a larger circle in the same period.'],
      ['D', ' This would require r to be proportional to v<sup>2</sup>, but the relationship is linear.']
    ],
    kcWas: "r = mv/(qB). The radius is proportional to speed (faster particles orbit in larger circles). However, the period T = 2&pi;m/(qB) does NOT depend on speed. This remarkable property is what makes the cyclotron work: the AC frequency stays constant regardless of the particle's speed.",
    kc: 'For nonrelativistic circular motion perpendicular to uniform B, r = mv/(|q|B) and T = 2πm/(|q|B). Radius grows with speed, while the period remains constant in this model.' },

  { q: 'Q33', id: 'phys-213', key: 'C',
    stemWas: 'In a cyclotron, a proton spirals outward as it gains energy. The frequency of the alternating voltage applied to the dees must:',
    stem: 'In a classical cyclotron with a uniform magnetic field, a proton spirals outward while its motion remains nonrelativistic. The frequency of the alternating voltage applied to the dees must:',
    existingFb: [
      ['A', 'Increase', ' A faster proton does travel a larger circle, but it completes each revolution in the same time, so no frequency change is needed.'],
      ['B', 'Decrease', ' Same reasoning. The period is constant.'],
      ['D', 'Alternate between two values', ' The voltage alternates in polarity (positive/negative), but the frequency stays the same.']
    ],
    fbKeep: ['A', 'B', 'D'], fbReplace: [],
    fb: [
      ['A', ' A faster proton does travel a larger circle, but it completes each revolution in the same time, so no frequency change is needed.'],
      ['B', ' Same reasoning. The period is constant.'],
      ['D', ' The voltage alternates in polarity (positive/negative), but the frequency stays the same.']
    ],
    kcWas: 'The cyclotron works because T = 2&pi;m/(qB) is independent of speed and radius. This allows a fixed-frequency oscillator to accelerate the particle at every gap crossing. At very high speeds (relativistic), the mass increases and the cyclotron frequency assumption breaks down, requiring a synchrocyclotron.',
    kc: 'In the nonrelativistic cyclotron model, T = 2πm/(qB) for a proton is independent of speed, so the accelerating voltage can have fixed frequency. At relativistic speeds the orbital period increases even though rest mass is unchanged, so this fixed-frequency model no longer stays synchronized.' },

  /* Q34: the major scenario repair. The stored directions put BOTH forces on
     the electron downward, so the keyed equation could not make them cancel.
     The review reverses E to downward and keeps B into the page, the electron
     moving right, and answer B. */
  { q: 'Q34', id: 'phys-214', key: 'B',
    stemWas: 'An electron enters a region with both an electric field E pointing upward and a magnetic field B pointing into the page. The electron moves to the right. For the electron to travel in a straight line (undeflected), the magnitudes must satisfy:',
    stem: 'An electron enters a region with an electric field E pointing downward and a magnetic field B pointing into the page. The electron moves to the right. For it to travel in a straight line without deflection, the field magnitudes must satisfy:',
    headWas: "<p>For the electron to travel in a straight line, the electric force must exactly cancel the magnetic force:</p><div class='exp-diagram'><p>F<sub>electric</sub> = F<sub>magnetic</sub></p><p>qE = qvB</p><p>E = vB</p></div><p>The charge q cancels out. This arrangement is called a <strong>velocity selector</strong>: only particles with exactly v = E/B pass through undeflected.</p>",
    head: "<p>The electron is negatively charged, so the downward electric field exerts an upward electric force. For motion to the right with B into the page, v × B points upward; the electron's magnetic force therefore points downward. The forces cancel when their magnitudes are equal: eE = evB, giving <strong>E = vB</strong> or v = E/B. Equal magnitudes alone would not be enough if the forces pointed in the same direction.</p>",
    existingFb: [
      ['A', 'E = B', ' This ignores the velocity and has mismatched units (V/m vs T).'],
      ['C', 'E = v/B', ' This inverts the relationship. Rearranging gives v = EB, which is wrong.'],
      ['D', 'E = qvB', ' This keeps the charge in the equation, but it cancels when equating forces (qE = qvB).']
    ],
    fbKeep: ['A', 'C', 'D'], fbReplace: [],
    fb: [
      ['A', ' This ignores the velocity and has mismatched units (V/m vs T).'],
      ['C', ' This inverts the relationship. Rearranging gives v = EB, which is wrong.'],
      ['D', ' This keeps the charge in the equation, but it cancels when equating forces (qE = qvB).']
    ],
    kcWas: 'A velocity selector uses crossed E and B fields. Only particles with v = E/B pass straight through. Faster or slower particles are deflected. This device is used in mass spectrometers and particle physics experiments to select particles of a specific speed.',
    kc: 'A velocity selector requires electric and magnetic forces that are opposite in direction as well as equal in magnitude. With the fields arranged correctly, particles traveling in the selected direction pass undeflected at speed v = E/B.' },

  { q: 'Q35', id: 'phys-215', key: 'B',
    stemWas: "A proton and an α particle (charge 2e, mass 4m<sub>p</sub>) enter the same magnetic field with the same speed. The ratio of the radius of the α particle's path to the proton's path is:",
    stem: "A proton and an α particle (charge 2e, mass 4m<sub>p</sub>) enter the same uniform magnetic field perpendicular to the field, with the same nonrelativistic speed. What is the ratio of the α particle's path radius to the proton's?",
    existingFb: [
      ['A', '1:1', ' This would require the same m/q ratio, but 4m/2e = 2m/e, not m/e.'],
      ['C', '4:1', ' This would be the ratio if only mass mattered and charge were equal.'],
      ['D', '1:2', ' This reverses the ratio. The heavier particle has the larger radius.']
    ],
    fbKeep: ['A', 'C'], fbReplace: ['D'],
    fb: [
      ['A', ' This would require the same m/q ratio, but 4m/2e = 2m/e, not m/e.'],
      ['C', ' This would be the ratio if only mass mattered and charge were equal.'],
      ['D', " This reverses the requested ratio. The α particle's mass-to-charge ratio is (4m<sub>p</sub>)/(2e), twice the proton's m<sub>p</sub>/e, so its radius is twice as large."]
    ] },

  { q: 'Q36', id: 'phys-216', key: 'B',
    stemWas: "According to Wien's displacement law, if the temperature of a black body is doubled, the peak emission wavelength:",
    stem: "According to Wien's displacement law, if a black body's absolute temperature in kelvin doubles, the wavelength at the peak of its emission spectrum:",
    existingFb: [
      ['A', 'Doubles', ' This reverses the inverse relationship.'],
      ['C', 'Stays the same', ' The peak wavelength definitely shifts with temperature.'],
      ['D', 'Quadruples', " No squared relationship exists in Wien's law."]
    ],
    fbKeep: ['A', 'C', 'D'], fbReplace: [],
    fb: [
      ['A', ' This reverses the inverse relationship.'],
      ['C', ' The peak wavelength definitely shifts with temperature.'],
      ['D', " No squared relationship exists in Wien's law."]
    ],
    kcWas: "Wien's law (&lambda;<sub>max</sub> T = 2.898 x 10<sup>-3</sup> m K) tells us that hotter objects emit at shorter wavelengths. Cool stars appear red, hot stars appear blue-white. The Sun (5800 K) peaks in the green-yellow range.",
    kc: 'For the blackbody spectrum expressed per unit wavelength, λ<sub>max</sub>T = 2.898 × 10<sup>-3</sup> m·K. Increasing the absolute temperature shifts the peak to shorter wavelengths. A 5800 K black body peaks near 500 nm, but its overall appearance depends on its broad spectrum, not that wavelength alone.' },

  { q: 'Q37', id: 'phys-217', key: 'D',
    stemWas: 'The total power radiated by a black body is proportional to the fourth power of its absolute temperature (Stefan-Boltzmann law). If the temperature increases from 300 K to 600 K, the radiated power increases by a factor of:',
    stem: "A black body's emitting surface area stays fixed while its temperature rises from 300 K to 600 K. By the Stefan–Boltzmann law, by what factor does its total emitted power increase?",
    existingFb: [
      ['A', '2', ' This would apply if power were proportional to T (first power), not T<sup>4</sup>.'],
      ['B', '4', ' This would apply if power were proportional to T<sup>2</sup>.'],
      ['C', '8', ' This would apply if power were proportional to T<sup>3</sup>.']
    ],
    fbKeep: ['A', 'B', 'C'], fbReplace: [],
    fb: [
      ['A', ' This would apply if power were proportional to T (first power), not T<sup>4</sup>.'],
      ['B', ' This would apply if power were proportional to T<sup>2</sup>.'],
      ['C', ' This would apply if power were proportional to T<sup>3</sup>.']
    ],
    kcWas: 'P = &sigma;AT<sup>4</sup>. The fourth-power dependence means even small temperature increases produce large changes in radiated power. This is why a light bulb filament at 3000 K radiates enormously more than a warm object at 300 K (ratio = 10<sup>4</sup> = 10,000 times).',
    kc: 'A black body emits P = σAT<sup>4</sup>, with T in kelvin. At fixed area, doubling T multiplies emitted power by 16. This is emitted power, not net radiative heat loss, which also depends on radiation absorbed from the surroundings.' },

  { q: 'Q38', id: 'phys-218', key: 'C',
    existingFb: [
      ['A', 'UV causing sunburn', ' This is a biological effect explained by photon energy damaging DNA, not the ultraviolet catastrophe.'],
      ['B', 'Emission at all frequencies', ' Black bodies do emit at all frequencies, and that is not a problem. The problem was the predicted intensity distribution.'],
      ['D', 'UV being invisible', " This is simply because our eyes' photoreceptors are not sensitive to UV wavelengths."]
    ],
    fbKeep: ['A', 'B'], fbReplace: ['D'],
    fb: [
      ['A', ' This is a biological effect explained by photon energy damaging DNA, not the ultraviolet catastrophe.'],
      ['B', ' Black bodies do emit at all frequencies, and that is not a problem. The problem was the predicted intensity distribution.'],
      ['D', ' Ultraviolet light lies outside the usual visible band. The ultraviolet catastrophe concerns the incorrect classical prediction for blackbody radiation, not why a particular wavelength is visible.']
    ],
    kcWas: "The ultraviolet catastrophe was resolved by quantization of energy (E = hf), marking the birth of quantum mechanics. Planck's hypothesis that energy comes in discrete packets was revolutionary and later confirmed by Einstein's explanation of the photoelectric effect.",
    kc: 'Planck resolved the blackbody-radiation problem by quantizing energy exchange in amounts hf. Einstein later used light quanta of energy hf to explain the photoelectric effect. These are related ideas in the development of quantum physics.' },

  { q: 'Q39', id: 'phys-219', key: 'B',
    stemWas: 'A radioactive sample has an initial activity of 800 Bq and a half-life of 4 hours. What is the activity after 12 hours?',
    stem: "A particular radioactive isotope in a sample has an initial activity of 800 Bq and a half-life of 4 hours. Ignoring any activity from daughter products, what is this isotope's activity after 12 hours?",
    existingFb: [
      ['A', '200 Bq', ' This is the activity after 2 half-lives (8 hours), not 3.'],
      ['C', '50 Bq', ' This would be the activity after 4 half-lives (16 hours).'],
      ['D', '400 Bq', ' This is the activity after only 1 half-life (4 hours).']
    ],
    fbKeep: ['A', 'C', 'D'], fbReplace: [],
    fb: [
      ['A', ' This is the activity after 2 half-lives (8 hours), not 3.'],
      ['C', ' This would be the activity after 4 half-lives (16 hours).'],
      ['D', ' This is the activity after only 1 half-life (4 hours).']
    ],
    kcWas: 'After n half-lives, the remaining fraction is (1/2)<sup>n</sup>. This applies equally to the number of atoms, the mass of the radioactive substance, and the activity. Count the number of half-lives first, then apply the formula.',
    kc: 'After n half-lives, 2<sup>-n</sup> of the original radioactive nuclei remain undecayed. Their activity and the mass of that parent isotope decrease by the same factor. This does not mean that the total mass of a sample containing decay products halves each time.' },

  { q: 'Q40', id: 'phys-220', key: 'B',
    headEdits: [['<p>This means that on any given day, each atom has about a 6.9% probability of decaying.</p>',
      '<p>This is the decay rate per surviving nucleus: a larger λ means faster decay. It is not exactly the probability of decay over a full one-day interval.</p>']],
    existingFb: [
      ['A', '0.1 per day', ' This would correspond to a half-life of ln(2)/0.1 = 6.93 days, not 10 days.'],
      ['C', '0.693 per day', ' This uses ln(2) directly without dividing by the half-life. It would correspond to a half-life of 1 day.'],
      ['D', '10 per day', ' This is just the half-life value, not the decay constant.']
    ],
    fbKeep: ['A', 'C', 'D'], fbReplace: [],
    fb: [
      ['A', ' This would correspond to a half-life of ln(2)/0.1 = 6.93 days, not 10 days.'],
      ['C', ' This uses ln(2) directly without dividing by the half-life. It would correspond to a half-life of 1 day.'],
      ['D', ' This is just the half-life value, not the decay constant.']
    ],
    kcWas: '&lambda; = ln(2)/t<sub>1/2</sub> = 0.693/t<sub>1/2</sub>. The decay constant has units of inverse time. It gives the probability per unit time of any single atom decaying. A shorter half-life means a larger decay constant (more rapid decay).',
    kc: 'The decay constant is λ = ln2/t<sub>1/2</sub>, with units of inverse time. Over a sufficiently short interval Δt, a surviving nucleus has decay probability approximately λΔt. A shorter half-life gives a larger λ.' }

];
