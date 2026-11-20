/* Physics FINAL-block edit specs, display Q1-Q8.
 *
 * The block has three bands, confirmed in storage rather than assumed:
 *   Q1       phys-214, a content-exact repeat of approved batch 4 Q34. KEEP:
 *            frozen in every field, heading normalization included.
 *   Q2-Q11   phys-241..phys-250. Educational points plus a Bottom Line, no Key
 *            Concept, and three lettered feedback paragraphs already stored.
 *   Q12-Q41  phys-251..phys-280. One Key Concept, no feedback at all; the
 *            harness adds three lettered paragraphs before that Key Concept.
 *
 * Conventions, as in the earlier physics blocks:
 *   - `existingFb` records the stored [letter, heading, body] triples so the
 *     harness can rebuild the stored block byte for byte before touching it.
 *     `fbKeep` / `fbReplace` name which bodies the review retains or replaces,
 *     and `fb` carries only the replacements.
 *   - `fb` alone, with no `existingFb`, means the item stores no feedback and
 *     all three bodies are new.
 *   - `epWas` is the stored educational-point list; `epEdits` replaces numbered
 *     points and `epBlock` replaces the whole list at its original count.
 *
 * Notation in NEW text uses <sup>/<sub> markup with the U+2212 minus this
 * block prefers inside an exponent (23 of its 27 stored exponent minus signs),
 * and literal Greek characters, which render identically to the named entities
 * the older passages use. Retained passages keep whatever they already store.
 */
'use strict';
module.exports = [

  { q: 'Q1', id: 'phys-214', key: 'B', keep: true },

  { q: 'Q2', id: 'phys-241', key: 'B',
    stemWas: 'A half-wave rectifier converts an AC input into a DC output by:',
    stem: 'In a circuit with one ideal diode, a resistive load and no smoothing capacitor, a half-wave rectifier converts a sinusoidal AC input to a pulsating DC output by:',
    existingFb: [
      ['A', 'Allowing both positive and negative half-cycles to pass through', ' If both half-cycles passed, the output would still be AC, not DC. Allowing both half-cycles (by inverting one) describes a <strong>full-wave rectifier</strong>, which uses either a center-tapped transformer with two diodes or a bridge of four diodes to utilize both halves of the AC cycle.'],
      ['C', 'Doubling the frequency of the input signal', ' A half-wave rectifier does not change the frequency. The output pulses have the <strong>same frequency</strong> as the input AC. It is the <strong>full-wave rectifier</strong> whose output pulses at twice the input frequency (because it converts both half-cycles into positive pulses).'],
      ['D', 'Inverting the negative half-cycle to produce a smooth constant voltage', ' A half-wave rectifier does not invert the blocked half-cycle; it simply eliminates it (output = 0 during that time). Producing a smooth constant voltage requires additional <strong>filtering</strong> (typically a capacitor) after rectification. Even then, some ripple remains.']
    ],
    fbKeep: ['A', 'C', 'D'], fbReplace: [],
    epWas: [
      'Half-wave rectifier efficiency is lower than full-wave because it uses only 50% of the input waveform. The output has higher ripple and lower average voltage.',
      'The average DC output voltage of an ideal half-wave rectifier: V<sub>DC</sub> = V<sub>peak</sub> / π ≈ 0.318 x V<sub>peak</sub>.',
      'A smoothing capacitor placed in parallel with the load reduces ripple by charging during the pulse and discharging during the blocked half-cycle.'
    ],
    epEdits: [
      [1, 'A half-wave rectifier uses one half-cycle. For the same sinusoidal input peak, its average output magnitude is lower and its ripple is greater than for an ideal full-wave rectifier.'],
      [2, 'Without smoothing, the magnitude of the average output is V<sub>DC</sub> = V<sub>peak</sub>/π ≈ 0.318 × V<sub>peak</sub>. The diode orientation determines whether the pulses are positive or negative.']
    ],
    blWas: 'A half-wave rectifier passes one half of the AC cycle and blocks the other using a single diode. The output is pulsating DC (not smooth). Full-wave rectifiers are more efficient because they use both halves of the AC cycle.',
    bl: 'A half-wave rectifier passes one half-cycle and blocks the other. Its unfiltered output is unidirectional but pulsating; a smoothing capacitor can reduce the ripple.' },

  { q: 'Q3', id: 'phys-242', key: 'B',
    existingFb: [
      ['A', 'External voltage is applied to the junction', ' The depletion region forms <strong>spontaneously</strong> when the PN junction is created, without any external voltage. In fact, external voltage modifies the already-existing depletion region (forward bias narrows it, reverse bias widens it), but it does not create it.'],
      ['C', 'Photons are absorbed at the junction, creating electron-hole pairs', ' Photon absorption creates electron-hole pairs in <strong>solar cells</strong> and photodiodes, but this is not the mechanism that forms the depletion region. The depletion region exists in the dark, formed purely by carrier diffusion and the resulting charge imbalance.'],
      ['D', 'The temperature gradient across the junction drives carriers apart', ' There is no inherent temperature gradient across a PN junction that forms the depletion region. Temperature affects carrier mobility and generation rates uniformly. While the thermoelectric (Seebeck) effect can create voltage from temperature gradients, this is a different phenomenon entirely.']
    ],
    fbKeep: ['A', 'C'], fbReplace: ['D'],
    fb: [['D', ' A temperature gradient is not needed: a junction at uniform temperature still develops a depletion region. The initial carrier concentration difference drives diffusion, and the resulting fixed charges create the built-in electric field.']],
    epWas: [
      'The built-in potential (contact potential) across the depletion region is about <strong>0.7 V for silicon</strong> and <strong>0.3 V for germanium</strong> at room temperature.',
      'The depletion region width is typically on the order of <strong>0.1 to 1 micrometer</strong>.',
      'Equilibrium is reached when the <strong>drift current</strong> (due to the electric field) exactly balances the <strong>diffusion current</strong> (due to the concentration gradient).'
    ],
    epEdits: [
      [1, 'The built-in potential depends on the semiconductor, doping levels and temperature; it is not a universal 0.7 V or 0.3 V value.'],
      [2, 'The depletion region has very few mobile majority carriers, rather than being completely empty. Its width depends on doping and applied bias: forward bias narrows it and reverse bias widens it.']
    ] },

  { q: 'Q4', id: 'phys-243', key: 'B',
    stemWas: 'The Bernoulli equation for an ideal fluid flowing in a horizontal pipe states that the sum of which quantities remains constant along a streamline?',
    stem: 'For steady flow of an incompressible, nonviscous fluid in a horizontal pipe, with no pump or turbine adding or removing energy, which sum is constant along a streamline?',
    options: [['B', 'Static pressure, dynamic pressure (1/2 ρ v<sup>2</sup>), and hydrostatic pressure (ρ g h)',
      'Static pressure, kinetic energy per unit volume (½ρv<sup>2</sup>), and gravitational potential energy per unit volume (ρgh)']],
    headWas: "<p>The Bernoulli equation expresses conservation of energy per unit volume along a streamline for an ideal (inviscid, incompressible) fluid:</p><p style='text-align:center'><strong>P + (1/2) ρ v<sup>2</sup> + ρ g h = constant</strong></p><p>where:</p><ul><li><strong>P</strong> = static pressure (pressure energy per unit volume)</li><li><strong>(1/2) ρ v<sup>2</sup></strong> = dynamic pressure (kinetic energy per unit volume)</li><li><strong>ρ g h</strong> = hydrostatic pressure (gravitational potential energy per unit volume)</li></ul>",
    head: "<p>Bernoulli's equation is P + ½ρv<sup>2</sup> + ρgh = constant along a streamline under the stated conditions. Each term is energy per unit volume and has units of pressure: P is the pressure term, ½ρv<sup>2</sup> is the kinetic term (often called dynamic pressure), and ρgh is the gravitational potential-energy term. In a horizontal pipe, h is constant, so P + ½ρv<sup>2</sup> is constant. Where the speed is greater, the static pressure is lower in this ideal model.</p>",
    existingFb: [
      ['A', 'Pressure energy, kinetic energy, and thermal energy', " Bernoulli's equation applies to <strong>ideal fluids</strong> with no viscosity. Thermal energy (internal energy) is not included because there is no friction converting mechanical energy to heat. The equation is a statement of mechanical energy conservation only."],
      ['C', 'Pressure, velocity, and viscous shear stress', " Bernoulli's equation explicitly assumes <strong>zero viscosity</strong> (ideal fluid). Viscous shear stress is not a term in the Bernoulli equation. When viscosity is important, the Navier-Stokes equations must be used instead."],
      ['D', 'Gravitational potential energy, surface tension energy, and kinetic energy', " Surface tension is not a term in the Bernoulli equation. Surface tension effects are relevant at free surfaces and interfaces (capillarity, droplet formation) but are not part of the energy balance expressed by Bernoulli's principle."]
    ],
    fbKeep: [], fbReplace: ['A', 'C', 'D'],
    fb: [
      ['A', ' The standard Bernoulli equation here describes mechanical energy per unit volume, including gravitational potential energy. It does not include a separate thermal-energy term; conversion of mechanical energy into heat through friction is excluded by the ideal model.'],
      ['C', ' Pressure, velocity and shear stress cannot simply be added: velocity has different units from pressure and stress. The kinetic term is ½ρv<sup>2</sup>. For real viscous flow, an extended energy equation can include losses.'],
      ['D', ' The equation includes pressure, kinetic and gravitational terms. Surface tension can affect pressure differences across curved interfaces, but it is not a separate term in this standard pipe-flow equation.']
    ],
    epWas: [
      'The Bernoulli equation explains why fluid velocity increases through a constriction (and pressure decreases) -- this is the <strong>Venturi effect</strong>, used in medical nebulizers and Venturi masks.',
      'Assumptions required: incompressible fluid, steady (non-turbulent) flow, no viscosity, flow along a streamline.',
      'Clinical applications: arterial stenosis increases blood velocity and decreases lateral pressure (contributing to vessel collapse in severe stenosis); airplane wing lift; Pitot tubes for measuring fluid velocity.'
    ],
    epBlock: [
      'For steady incompressible flow, continuity gives Av = constant. A narrower section therefore has higher speed; Bernoulli then predicts lower static pressure at the same height in the ideal model.',
      'Use Bernoulli along a streamline for steady, incompressible, nonviscous flow with no added or removed mechanical energy.',
      'Venturi devices and Pitot tubes use pressure–speed relationships. Real blood flow and other viscous flows can also involve energy losses, so the ideal equation has limits.'
    ],
    blWas: "Bernoulli equation: P + (1/2)ρ v<sup>2</sup> + ρ g h = constant. The three terms are static pressure, dynamic pressure, and hydrostatic pressure. Higher velocity means lower pressure -- this is the core of Bernoulli's principle.",
    bl: 'Bernoulli: P + ½ρv<sup>2</sup> + ρgh = constant along a streamline under the stated ideal conditions. At equal height, increased speed corresponds to decreased static pressure.' },

  { q: 'Q5', id: 'phys-244', key: 'B',
    stemWas: 'A cyclotron cannot accelerate neutrons because:',
    stem: 'Why can a conventional cyclotron not directly accelerate neutrons using its electric-field gaps and magnetic bending field?',
    options: [['B', 'Neutrons have no electric charge and cannot be deflected by magnetic or accelerated by electric fields',
      'Neutrons have no net electric charge, so the accelerating electric field does not exert the qE force on them']],
    headWas: '<p>A cyclotron operates by using a <strong>magnetic field</strong> to bend charged particles into circular paths and an <strong>oscillating electric field</strong> between two D-shaped electrodes ("dees") to accelerate them at each half-revolution. Both mechanisms require the particle to carry an <strong>electric charge</strong>:</p><ul><li>The <strong>magnetic Lorentz force</strong> (F = qvB) depends on charge q; if q = 0, there is no force.</li><li>The <strong>electric force</strong> (F = qE) in the accelerating gap also depends on charge q.</li></ul><p>Since neutrons are electrically neutral (q = 0), neither force acts on them, making cyclotron acceleration impossible.</p>',
    head: '<p>A conventional cyclotron accelerates charged particles with an electric field across the gap between its electrodes and bends their paths with a magnetic field. These charge-dependent forces are F<sub>E</sub> = qE and F<sub>B</sub> = qv × B. A neutron has q = 0, so it cannot be accelerated and bent by this mechanism. Neutrons do have magnetic moments and can interact with nonuniform magnetic fields; that is a different mechanism.</p>',
    existingFb: [
      ['A', 'Neutrons are too heavy to reach relativistic speeds', ' The neutron mass (1.675 x 10<sup>-27</sup> kg) is very similar to the proton mass (1.673 x 10<sup>-27</sup> kg), and protons are routinely accelerated in cyclotrons. Mass is not the limiting factor; the absence of charge is.'],
      ['C', 'Neutrons decay too quickly to complete a full revolution', ' Free neutrons do undergo β decay, but their half-life is approximately <strong>10 minutes</strong>, which is vastly longer than the microseconds needed for cyclotron revolutions. Decay is not the reason cyclotrons cannot accelerate neutrons.'],
      ['D', 'The magnetic field of a cyclotron repels neutral particles', ' Magnetic fields exert <strong>no force</strong> on neutral particles, neither attraction nor repulsion. The Lorentz force is F = qv x B; with q = 0, there is zero force. Magnetic fields do not repel neutral particles.']
    ],
    fbKeep: ['A'], fbReplace: ['C', 'D'],
    fb: [
      ['C', ' Free neutrons have a half-life of about 10 minutes, far longer than the timescale of motion in a cyclotron. Their decay is not the obstacle; the conventional cyclotron mechanism requires electric charge.'],
      ['D', ' Neutral particles are not automatically repelled by a magnetic field. A neutron has a magnetic moment and can be manipulated in a suitable nonuniform magnetic field, but it does not undergo the charge-dependent cyclotron motion.']
    ],
    epWas: [
      'Cyclotrons can accelerate protons, deuterons, α particles, and other charged ions.',
      "The cyclotron frequency (f = qB/(2 π m)) is independent of the particle's speed and radius (in the non-relativistic limit), which is what makes the cyclotron work with a fixed-frequency oscillator.",
      'Neutrons are accelerated indirectly: protons are accelerated and then directed at a target to produce neutron beams via nuclear reactions.'
    ],
    epEdits: [
      [2, 'For nonrelativistic motion, the cyclotron frequency is f = |q|B/(2πm). At fixed B and particle mass, it is independent of speed and orbit radius.'],
      [3, 'Accelerators can produce neutron beams by sending accelerated charged particles into a target, where nuclear reactions release neutrons.']
    ],
    blWas: 'Cyclotrons require charged particles because both the magnetic force (for circular motion) and the electric force (for acceleration) are proportional to charge. Neutrons (q = 0) experience neither force and cannot be accelerated or steered.',
    bl: 'A conventional cyclotron directly accelerates charged particles. Neutrons have no net electric charge, so this acceleration mechanism does not work for them.' },

  { q: 'Q6', id: 'phys-245', key: 'C',
    stemWas: 'A positive charge moves to the right in a magnetic field directed into the page. The Lorentz force on the charge is directed:',
    stem: 'A positive charge moves to the right in a magnetic field directed into the page. The magnetic force on the charge is directed:',
    existingFb: [
      ['A', 'Into the page', ' The force must be perpendicular to both v and B. Since v is to the right (in the plane of the page) and B is into the page, the force must be in the plane of the page (either up or down), not into or out of the page.'],
      ['B', 'Out of the page', ' Same reasoning as above. The force lies in the plane of the page for this geometry. "Out of the page" is parallel to B, but the cross product v x B is always perpendicular to B.'],
      ['D', 'Downward', ' This would be the direction if the charge were <strong>negative</strong>. For a negative charge, the force is opposite to v x B. This is a critical distinction: the sign of the charge reverses the direction of the magnetic force. Electrons moving to the right in this field would be deflected downward.']
    ],
    fbKeep: ['A', 'D'], fbReplace: ['B'],
    fb: [['B', ' Out of the page is opposite to the magnetic-field direction, so it is still along the field axis. The magnetic force is perpendicular to both the velocity and the field; here it points upward in the plane of the page.']],
    epWas: [
      'The Lorentz force is always <strong>perpendicular</strong> to the velocity, so it changes the direction of motion but does no work (cannot change the particle\'s speed or kinetic energy).',
      'For a <strong>negative charge</strong>, the force direction is reversed: F = qv x B with q < 0 gives the opposite direction to the right-hand rule result.',
      'This principle underlies many technologies: mass spectrometers (separating ions by mass), cyclotrons, cathode ray tubes, and the Hall effect.'
    ],
    epEdits: [
      [1, "The magnetic part of the Lorentz force is perpendicular to velocity. It can change the direction of motion but does no work and does not change the particle's kinetic energy."]
    ] },

  { q: 'Q7', id: 'phys-246', key: 'B',
    existingFb: [
      ['A', 'Absorbs all incident radiation but emits none', ' This is the most common misconception about black bodies. A perfect absorber that emitted nothing would violate thermodynamics -- its temperature would increase without limit. In fact, a black body at temperature T radiates energy at a rate given by the <strong>Stefan-Boltzmann law</strong>: P = σ A T<sup>4</sup>. A black body is both the perfect absorber AND the most powerful emitter at any given temperature.'],
      ['C', 'Reflects all incident radiation perfectly', ' This describes a <strong>perfect mirror</strong> (or perfect reflector), which is the exact opposite of a black body. A perfect reflector has zero absorptivity and zero emissivity, while a black body has maximum absorptivity and maximum emissivity.'],
      ['D', 'Emits radiation only at a single specific wavelength', " A black body emits a <strong>continuous spectrum</strong> of radiation across all wavelengths, with the intensity distribution described by <strong>Planck's law</strong>. The peak wavelength depends on temperature (Wien's law), but emission occurs at all wavelengths. A single-wavelength emitter would be a laser or a spectral line source."]
    ],
    fbKeep: ['C'], fbReplace: ['A', 'D'],
    fb: [
      ['A', ' A black body at a temperature above absolute zero emits thermal radiation as well as absorbing it. Its emitted power is P = σAT<sup>4</sup>, so a perfect absorber is not an object that never emits.'],
      ['D', ' A black body emits a continuous thermal spectrum with a temperature-dependent peak. A narrow spectral line or laser emission is different from that broad black-body spectrum.']
    ],
    epWas: [
      'The black body spectrum (Planck curve) resolved the "ultraviolet catastrophe" of classical physics and was one of the foundations of quantum mechanics.',
      'Total radiated power: P = σ A T<sup>4</sup> (Stefan-Boltzmann law), where σ = 5.67 x 10<sup>-8</sup> W/(m<sup>2</sup> K<sup>4</sup>).',
      'Real objects approximate black bodies to varying degrees. Stars, ovens, and the cosmic microwave background are good approximations.'
    ],
    epEdits: [
      [3, 'Radiation escaping through a small opening in a heated cavity is a good laboratory approximation to black-body radiation. Stellar spectra are approximate examples; the cosmic microwave background is a close example.']
    ],
    blWas: 'A black body absorbs ALL incident radiation AND radiates more energy than any other object at the same temperature. Good absorbers are good emitters -- this is Kirchhoff\'s law. The common misconception that black bodies only absorb is wrong.',
    bl: "A black body absorbs all incident radiation and has the maximum thermal emission per unit area at a given temperature in this model. Good absorbers are good emitters, as expressed by Kirchhoff's law." },

  { q: 'Q8', id: 'phys-247', key: 'C',
    stemWas: "According to Wien's displacement law, as the temperature of a black body increases, the wavelength at which it emits maximum radiation:",
    stem: "For a black body's emission spectrum plotted per unit wavelength, how does the peak wavelength change as its absolute temperature increases?",
    existingFb: [
      ['A', 'Increases (shifts toward longer wavelengths)', ' This is backwards. Cooler objects emit predominantly at longer wavelengths (infrared), while hotter objects emit at shorter wavelengths (visible, ultraviolet). A red-hot iron bar (shorter peak wavelength) is hotter than a warm radiator (infrared peak).'],
      ['B', 'Remains constant regardless of temperature', " The peak wavelength is strongly temperature-dependent. This would violate Wien's law and our everyday observation that heated objects change color (dark red → orange → yellow → white → blue-white) as they get hotter."],
      ['D', 'First increases then decreases', " The relationship is strictly monotonic (always decreasing with increasing temperature). There is no turning point or non-monotonic behavior in Wien's law."]
    ],
    fbKeep: ['B', 'D'], fbReplace: ['A'],
    fb: [['A', " Wien's law gives λ<sub>max</sub> = b/T, so higher absolute temperature gives a shorter peak wavelength. A red-hot bar has a shorter peak wavelength than a warm radiator, although both peaks can still lie in the infrared."]],
    epWas: [
      'Examples: The Sun (T ≈ 5,800 K) has λ<sub>max</sub> ≈ 500 nm (green/yellow visible light). The human body (T ≈ 310 K) has λ<sub>max</sub> ≈ 9,400 nm (infrared). A very hot blue star (T ≈ 30,000 K) peaks at ~97 nm (ultraviolet).',
      'This law explains why hotter stars appear blue-white and cooler stars appear red-orange.',
      'Infrared thermometry (fever scanners, thermal cameras) works because body temperature determines the peak infrared emission wavelength.'
    ],
    epEdits: [
      [1, "Approximate wavelength-spectrum peaks: 5800 K gives 500 nm, in the green region of visible light; 310 K gives 9.35 μm, in the infrared; 30000 K gives 97 nm, in the ultraviolet. The Sun's broad spectrum does not make it look green."],
      [3, 'Infrared thermometers estimate temperature from detected infrared radiation in their measurement band, with calibration and emissivity assumptions. They do not generally locate the emission peak directly.']
    ] }

];
