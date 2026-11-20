/* Physics FOURTH-block edit specs, display Q51-Q60. See phys-b4-edits-a.js
   and phys-b4-edits-e.js for the conventions.

   Q59 and Q60 carry a four-bullet mechanism/result list inside their main
   explanation. The review replaces only the fourth bullet in each, so those
   two edits are expressed as anchored `headEdits` and the other three bullets
   are untouched. */
'use strict';
module.exports = [

  { q: 'Q51', id: 'phys-231', key: 'C',
    stemWas: 'When an AC voltage is applied to a purely capacitive circuit, which statement about the current is correct?',
    stem: 'In sinusoidal steady state, an ideal capacitor is connected to an AC voltage source. Which statement about its current is correct?',
    headWas: '<p>In a purely capacitive circuit, the current <strong>leads the voltage by 90 degrees</strong>. This occurs because current must flow to charge the capacitor before a voltage can build up across its plates. Mathematically, I = C dV/dt, so current is maximum when voltage is changing most rapidly (at zero crossing), and current is zero when voltage is at its peak (not changing).</p>',
    head: '<p>For an ideal capacitor, i = C(dv/dt). Differentiating a sine-wave voltage gives a current one-quarter cycle ahead, so current leads voltage by 90°. Current magnitude is greatest when voltage crosses zero, where the voltage changes most rapidly. Current is zero at either the positive or negative voltage peak.</p>',
    existingFb: [
      ['A', 'The current lags the voltage by 90 degrees', ' This describes the behavior of a <strong>purely inductive circuit</strong>, where voltage leads current. In a capacitor, the relationship is reversed: current leads voltage. Confusing the two is a very common exam error.'],
      ['B', 'The current is in phase with the voltage', ' In-phase behavior occurs only in a <strong>purely resistive circuit</strong> (or at resonance in an RLC circuit). Capacitors always introduce a phase shift between voltage and current.'],
      ['D', 'The current leads the voltage by 45 degrees', ' A 45-degree phase angle occurs in a circuit where the <strong>resistance equals the capacitive reactance</strong> (R = XC), not in a purely capacitive circuit. The 45-degree case represents equal resistive and reactive components in a series RC circuit.']
    ],
    fbKeep: ['A', 'D'], fbReplace: ['B'],
    fb: [['B', ' An ideal resistor has in-phase voltage and current. An ideal capacitor alone instead has the 90° phase difference set by i = C(dv/dt). A complete RLC circuit can have in-phase source voltage and current when its net reactance is zero.']],
    epWas: [
      'Recall <strong>"ICE"</strong>: I (current) leads E (voltage) in a Capacitor. Combined with "ELI": E leads I in an Inductor.',
      'Since current leads voltage by 90 degrees, and instantaneous power = VI, the average power over a full cycle is zero. The capacitor alternately stores and returns energy to the circuit.',
      'This 90-degree lead can be visualized: imagine applying a sine wave voltage. At t=0, V=0 but dV/dt is maximum, so I = C(dV/dt) is maximum. When V reaches its peak, dV/dt = 0, so I = 0.'
    ],
    epEdits: [],
    blWas: 'In a capacitor, current leads voltage by 90 degrees (ICE). Current is maximum when voltage is at zero (changing fastest) and zero when voltage is at its peak (momentarily not changing).',
    bl: 'For sinusoidal signals in an ideal capacitor, current leads voltage by 90° (ICE). Current magnitude is greatest at voltage zero crossings and current is zero at voltage extrema.' },

  { q: 'Q52', id: 'phys-232', key: 'C',
    stemWas: "In an AC circuit, the generalized form of Ohm's law relates the peak (or RMS) voltage and current through:",
    stem: "In sinusoidal steady state in a linear circuit, let V and I be either both peak amplitudes or both RMS values, and let Z denote impedance magnitude. Which expression is the generalized form of Ohm's law?",
    headWas: "<p>The generalized Ohm's law for AC circuits replaces resistance (R) with <strong>impedance (Z)</strong>:</p><p style='text-align:center'><strong>V = IZ</strong></p><p>where V and I are either both peak values or both RMS values. Impedance Z accounts for <strong>all opposition to current flow</strong>: resistance (energy dissipation), inductive reactance (magnetic field energy storage), and capacitive reactance (electric field energy storage).</p>",
    head: '<p>The amplitude relationship is <strong>V = IZ</strong> when Z denotes the impedance magnitude. V and I must use the same convention: both peak or both RMS. For a series RLC circuit, Z = √[R<sup>2</sup> + (X<sub>L</sub> − X<sub>C</sub>)<sup>2</sup>]. This combines resistance with net reactance; the voltage and current need not be in phase.</p>',
    existingFb: [
      ['A', 'V = IR, where R is the resistance only', " This is the DC form of Ohm's law and applies only to the <strong>resistive component</strong> of an AC circuit. It gives the voltage across the resistor but not the total source voltage, which must also account for the voltages across inductors and capacitors."],
      ['B', 'V = I x XL, where XL is the inductive reactance only', ' This gives only the voltage across the <strong>inductor</strong>. It ignores the resistor and capacitor contributions. While VL = I x XL is correct for the inductor alone, it does not represent the total circuit relationship.'],
      ['D', 'V = I/(XL - XC)', ' This expression is dimensionally incorrect. V/I should equal impedance (ohms), but I/(XL-XC) has units of amperes/ohms = siemens, which is the unit of conductance, not voltage. The correct relationship involving reactance difference is Z = sqrt(R<sup>2</sup> + (XL-XC)<sup>2</sup>).']
    ],
    fbKeep: [], fbReplace: ['A', 'B', 'D'],
    fb: [
      ['A', ' V = IR is valid across an ideal resistor in AC as well as DC. It also describes a circuit whose total impedance is purely resistive, but resistance alone does not cover a general circuit with net reactance.'],
      ['B', ' V<sub>L</sub> = IX<sub>L</sub> gives the voltage amplitude across an ideal inductor at the specified frequency. For a more general circuit, use its total impedance magnitude.'],
      ['D', ' I/(X<sub>L</sub> − X<sub>C</sub>) has units A/Ω, not volts and not siemens. Voltage is current multiplied by impedance. In the series RLC case, that magnitude is √[R<sup>2</sup> + (X<sub>L</sub> − X<sub>C</sub>)<sup>2</sup>].']
    ],
    epWas: [
      'The RMS (root mean square) values are used for practical AC measurements: VRMS = Vpeak/sqrt(2) and IRMS = Ipeak/sqrt(2).',
      'Average power in AC: P = VRMS x IRMS x cos(φ), where cos(φ) is the power factor. Only the resistive component dissipates power.',
      'V = IZ is valid for the entire circuit; for individual components: VR = IR, VL = IXL, VC = IXC.'
    ],
    epBlock: [
      'For a sine wave, V<sub>rms</sub> = V<sub>peak</sub>/√2 and I<sub>rms</sub> = I<sub>peak</sub>/√2. Keep the voltage and current conventions consistent.',
      'For sinusoidal signals in a passive RLC circuit, average power is V<sub>rms</sub>I<sub>rms</sub> cosφ. Ideal inductors and capacitors return their stored energy; resistance dissipates energy.',
      'In a series RLC circuit, the same current passes through all three elements: V<sub>R</sub> = IR, V<sub>L</sub> = IX<sub>L</sub> and V<sub>C</sub> = IX<sub>C</sub>. Their voltage amplitudes cannot simply be added because their phases differ.'
    ],
    blWas: "The AC generalization of Ohm's law is V = IZ, where Z (impedance) replaces R. Impedance combines resistance and reactance: Z = sqrt(R<sup>2</sup> + (XL - XC)<sup>2</sup>). Use RMS values for practical calculations.",
    bl: 'For sinusoidal steady-state amplitudes, V = IZ with Z the impedance magnitude. For a series RLC circuit specifically, Z = √[R<sup>2</sup> + (X<sub>L</sub> − X<sub>C</sub>)<sup>2</sup>]. Use both peak quantities or both RMS quantities.' },

  { q: 'Q53', id: 'phys-233', key: 'C',
    stemWas: 'The threshold of hearing for a healthy young human ear corresponds to approximately 0 dB. The threshold of pain corresponds to approximately:',
    stem: 'Which of the following is a commonly quoted approximate sound level for the threshold of pain in introductory physics?',
    headWas: '<p>The <strong>threshold of hearing</strong> (the quietest sound a healthy young ear can detect at 1 kHz) is defined as <strong>0 dB</strong>, corresponding to a sound intensity of <strong>I0 = 10<sup>-12</sup> W/m<sup>2</sup></strong>. The <strong>threshold of pain</strong>, where sound becomes physically painful, is approximately <strong>120 dB</strong>, corresponding to an intensity of <strong>1 W/m<sup>2</sup></strong>.</p><p>Since the decibel scale is logarithmic (dB = 10 log10(I/I0)), the range from threshold of hearing to threshold of pain spans <strong>12 orders of magnitude</strong> in intensity (10<sup>-12</sup> to 10<sup>0</sup> W/m<sup>2</sup>).</p>',
    head: '<p>About <strong>120 dB</strong> is commonly used as an approximate textbook value for the threshold of pain. It is not a fixed boundary for every listener or sound: discomfort and pain depend on factors such as frequency and the individual. Using I<sub>0</sub> = 10<sup>-12</sup> W/m<sup>2</sup>, a sound intensity level of 120 dB corresponds to I/I<sub>0</sub> = 10<sup>12</sup>, so I = 1 W/m<sup>2</sup>. The 0 dB reference is not a universal hearing threshold, and sound can harm hearing before it becomes painful.</p>',
    existingFb: [
      ['A', '60 dB', ' This corresponds to normal conversational speech at about 1 meter distance. While clearly audible, it is far from painful. 60 dB represents an intensity of 10<sup>-6</sup> W/m<sup>2</sup>, one million times the hearing threshold but one million times below the pain threshold.'],
      ['B', '90 dB', ' This is the approximate level of a lawnmower or heavy traffic. Prolonged exposure at 90 dB can cause hearing damage (OSHA limits occupational exposure to 8 hours at this level), but it is not the threshold of pain. There is a 30 dB (1000-fold intensity) difference between 90 dB and the pain threshold.'],
      ['D', '160 dB', ' This level (10<sup>4</sup> W/m<sup>2</sup>) is well beyond the pain threshold and approaches levels that can cause immediate, permanent hearing damage or even eardrum rupture. Levels around 160-180 dB are produced near jet engines or explosions.']
    ],
    fbKeep: [], fbReplace: ['A', 'B', 'D'],
    fb: [
      ['A', ' 60 dB corresponds to I/I<sub>0</sub> = 10<sup>6</sup>, or I = 10<sup>-6</sup> W/m<sup>2</sup> with the stated reference. It is well below the conventional approximate 120 dB value asked for here.'],
      ['B', ' 90 dB is 30 dB below 120 dB, meaning one-thousandth of its intensity. It is not the conventional approximate pain-threshold value; absence of pain does not mean a sound cannot damage hearing.'],
      ['D', ' 160 dB is 40 dB above 120 dB, corresponding to 10,000 times its intensity. It is far above the conventional approximate value, not the best answer.']
    ],
    epWas: [
      'Each 10 dB increase represents a <strong>10-fold increase</strong> in sound intensity. Each 20 dB increase represents a <strong>10-fold increase</strong> in sound pressure.',
      'The human ear can perceive sounds across an enormous dynamic range: 12 orders of magnitude in intensity (0 to 120 dB).',
      'Common reference levels: whisper ~20 dB, conversation ~60 dB, vacuum cleaner ~70 dB, rock concert ~110 dB, jet engine ~140 dB.'
    ],
    epBlock: [
      'Sound intensity level is L = 10 log<sub>10</sub>(I/I<sub>0</sub>); each additional 10 dB means ten times the intensity.',
      'With I<sub>0</sub> = 10<sup>-12</sup> W/m<sup>2</sup>, 120 dB corresponds to 1 W/m<sup>2</sup>, a factor of 10<sup>12</sup> above the reference.',
      "The reference level, a person's hearing threshold, a pain threshold and the risk of hearing damage are different concepts. Biological thresholds vary."
    ],
    blWas: 'Threshold of hearing = 0 dB (10<sup>-12</sup> W/m<sup>2</sup>). Threshold of pain = 120 dB (1 W/m<sup>2</sup>). The 120 dB range spans 12 orders of magnitude in intensity, demonstrating the extraordinary sensitivity range of human hearing.',
    bl: 'For this introductory question, 120 dB is the conventional approximate pain-threshold answer. It is not a universal biological cutoff or a boundary below which sound is necessarily harmless.' },

  { q: 'Q54', id: 'phys-234', key: 'C',
    headWas: "<p>Sound travels fastest in <strong>solids</strong>, followed by liquids, then gases. Approximate values at room temperature:</p><table class='exp-table'><tr><th>Medium</th><th>Speed of Sound</th></tr><tr><td>Steel</td><td>~5,960 m/s</td></tr><tr><td>Water</td><td>~1,480 m/s</td></tr><tr><td>Air</td><td>~343 m/s</td></tr><tr><td>Vacuum</td><td>0 m/s (no sound)</td></tr></table><p>Sound is a <strong>mechanical wave</strong> that requires a medium to propagate. In solids, atoms are tightly packed and strongly bonded, allowing vibrations to transfer rapidly from one atom to the next.</p>",
    head: "<p>Among the listed media, longitudinal sound travels fastest in steel. Speed depends on elastic stiffness relative to density, not on density alone.</p><table class='exp-table'><tr><th>Medium</th><th>Approximate sound speed</th></tr><tr><td>Steel</td><td>About 5000–6000 m/s for longitudinal sound, depending on the steel and wave mode</td></tr><tr><td>Water at room temperature</td><td>About 1480 m/s</td></tr><tr><td>Air at 20 °C</td><td>About 343 m/s</td></tr><tr><td>Vacuum</td><td>Not applicable: sound cannot propagate</td></tr></table><p>Steel's large elastic stiffness allows longitudinal disturbances to travel faster than in water or air. A vacuum cannot support an ordinary sound wave because it has no material medium.</p>",
    existingFb: [
      ['A', 'Air at room temperature', ' Air has the lowest density and weakest intermolecular interactions among the options, so sound propagates slowest here (~343 m/s). The molecules are far apart and collisions are the primary mechanism of energy transfer.'],
      ['B', 'Distilled water at room temperature', ' Water transmits sound faster than air (~1,480 m/s) because it is denser and relatively incompressible compared to gases. However, it is still much slower than steel because liquid molecules are less rigidly bound than those in a solid.'],
      ['D', 'A vacuum', ' Sound <strong>cannot propagate through a vacuum</strong> because there are no particles to vibrate and transmit the mechanical wave. This is why space is silent. Only electromagnetic waves (like light) can travel through a vacuum.']
    ],
    fbKeep: [], fbReplace: ['A', 'B', 'D'],
    fb: [
      ['A', ' Air has much lower elastic stiffness than steel. Considering stiffness together with density gives a sound speed around 343 m/s at 20 °C, well below the longitudinal speed in steel. Low density alone is not an explanation for a low speed.'],
      ['B', ' Water is much less compressible than air. Its stiffness relative to density gives a speed around 1480 m/s at room temperature, faster than air but slower than longitudinal sound in steel.'],
      ['D', ' A vacuum has no material medium to carry sound. Its sound speed is therefore not assigned a value of zero; sound does not propagate there. Light can cross a vacuum because it is an electromagnetic wave.']
    ],
    epWas: [
      "General rule: v(solid) > v(liquid) > v(gas). Speed depends on the medium's <strong>elasticity</strong> (stiffness) and <strong>density</strong>: v = sqrt(elastic modulus/density). Solids have much higher elastic moduli despite also being denser.",
      'In air, the speed of sound increases with temperature: v ≈ 331 + 0.6T m/s (where T is in degrees Celsius).',
      'This principle explains why you can hear a distant train by placing your ear on the rail long before the sound through air reaches you.'
    ],
    epBlock: [
      'For the listed examples, longitudinal sound travels faster in steel than in water or air. This is not a universal ordering for every solid, liquid, gas and wave mode.',
      'Near ordinary temperatures, the speed of sound in air is approximately v = 331 + 0.6T m/s, where T is in degrees Celsius.',
      'If sound travels equal distances through a steel rail and through air, the longitudinal disturbance in the rail arrives sooner because its speed is greater.'
    ],
    blWas: 'Sound travels fastest in solids (steel ~5,960 m/s), intermediate in liquids (water ~1,480 m/s), slowest in gases (air ~343 m/s), and not at all in a vacuum. Sound requires a material medium for propagation.',
    bl: 'For these examples: longitudinal sound in steel is faster than sound in water, which is faster than sound in air. Sound needs a material medium and cannot propagate in a vacuum.' },

  { q: 'Q55', id: 'phys-235', key: 'C',
    headEdits: [
      ['<p>The frequency spectrum of sound is divided into three ranges based on human hearing:</p>',
        '<p>The conventional frequency categories use the approximate hearing range of a typical young listener:</p>'],
      ['<td>20 Hz - 20 kHz</td>', '<td>Approximately 20 Hz–20 kHz</td>']
    ],
    existingFb: [
      ['A', 'Below 20 Hz', ' This defines <strong>infrasound</strong>, not ultrasound. Infrasonic waves are produced by phenomena like earthquakes, volcanic eruptions, and ocean waves. Some animals (elephants, whales) communicate using infrasound because these low-frequency waves travel long distances with little attenuation.'],
      ['B', 'Between 20 Hz and 20,000 Hz', ' This is the range of <strong>audible sound</strong> for a healthy young human ear. The upper limit decreases with age (presbycusis), and many adults cannot hear above 15-16 kHz.'],
      ['D', 'Above 1,000,000 Hz (1 MHz) only', ' While medical diagnostic ultrasound typically uses frequencies in the 1-20 MHz range, ultrasound by definition begins at 20 kHz (0.02 MHz). Frequencies between 20 kHz and 1 MHz are also ultrasound and are used in applications like industrial cleaning, sonar, and pest deterrent devices.']
    ],
    fbKeep: ['A', 'D'], fbReplace: ['B'],
    fb: [['B', ' Approximately 20 Hz to 20 kHz is the conventional audible band for a typical young listener. Individual limits vary, and the upper limit commonly decreases with age.']],
    epWas: [
      'Medical ultrasound uses high frequencies (1-20 MHz) because higher frequency means <strong>shorter wavelength</strong> and <strong>better resolution</strong>, though at the cost of reduced penetration depth.',
      'Bats use ultrasound echolocation (20-200 kHz) to navigate and hunt insects in darkness.',
      'The Doppler effect in ultrasound is used to measure blood flow velocity in clinical settings.'
    ],
    epEdits: [],
    blWas: 'Infrasound < 20 Hz; audible sound 20 Hz - 20 kHz; ultrasound > 20 kHz. Medical ultrasound typically uses 1-20 MHz for imaging. The boundary between audible and ultrasound is the upper limit of human hearing (20 kHz).',
    bl: "Conventionally, infrasound is below 20 Hz and ultrasound is above 20 kHz. The intervening band approximates typical young human hearing; 20 kHz is not every person's exact hearing limit." },

  { q: 'Q56', id: 'phys-236', key: 'C',
    stemWas: 'An ambulance is approaching a stationary observer with its siren blaring. The observer perceives the siren frequency as:',
    stem: 'An ambulance travels directly toward an observer who is stationary relative to still air. Its speed is less than the speed of sound, and its siren emits a constant frequency. The observer hears a frequency that is:',
    existingFb: [
      ['A', 'Lower than the actual frequency', ' A lower perceived frequency (redshift in sound) occurs when the source is moving <strong>away</strong> from the observer. As the ambulance passes and recedes, the observer would then perceive a drop in frequency. This explains the familiar pitch change as an ambulance drives by.'],
      ['B', 'Equal to the actual frequency', ' The perceived frequency equals the emitted frequency only when there is <strong>no relative motion</strong> between source and observer along the line connecting them (or when the source moves perpendicular to that line at the closest approach).'],
      ['D', 'Alternating between higher and lower', ' The frequency does not alternate. It is consistently higher while approaching and consistently lower while receding. The abrupt apparent change in pitch occurs at the moment the ambulance passes the observer, but at any given instant, the frequency is either higher or lower than the true value -- never oscillating.']
    ],
    fbKeep: ['A'], fbReplace: ['B', 'D'],
    fb: [
      ['B', ' For a source and observer both stationary in the air, the received and emitted frequencies would match. Here the approaching source compresses the spacing between arriving wavefronts, so the received frequency is higher.'],
      ['D', ' During the stated direct approach, the received frequency stays above the emitted frequency. Nothing in the question describes repeated changes between approaching and receding motion.']
    ],
    epWas: [
      'The Doppler effect applies to all waves, not just sound. In light, approaching sources appear <strong>blueshifted</strong> (higher frequency) and receding sources appear <strong>redshifted</strong> (lower frequency).',
      'In medicine, Doppler ultrasound uses this principle to measure blood flow velocity: blood flowing toward the transducer reflects higher-frequency echoes.',
      'The Doppler shift does not change the speed of the wave in the medium, only the perceived frequency and wavelength.'
    ],
    epEdits: [[3, 'The moving source changes the wavefront spacing in the air. The sound speed relative to that air remains set by the medium, while the stationary observer receives a higher frequency during approach.']] },

  { q: 'Q57', id: 'phys-237', key: 'B',
    existingFb: [
      ['A', 'The period doubles', ' This would require a <strong>direct</strong> proportionality between frequency and period, which contradicts their inverse relationship. If frequency increases, period must decrease. Doubling the period would actually require <strong>halving</strong> the frequency.'],
      ['C', 'The period remains unchanged', ' Period and frequency are fundamentally linked; changing one necessarily changes the other. They can only remain unchanged simultaneously. This answer might be confused with the behavior of wavelength in a different context (e.g., standing waves in a fixed medium).'],
      ['D', 'The period is quadrupled', ' This would imply T is proportional to f<sup>2</sup>, which is not the case. The inverse relationship means if f is multiplied by any factor n, T is divided by the same factor n.']
    ],
    fbKeep: ['A', 'D'], fbReplace: ['C'],
    fb: [['C', ' Period and frequency are reciprocals. If frequency changes from f to 2f, the period must change from 1/f to 1/(2f), so it cannot remain unchanged.']],
    epWas: [
      'Period is the time for one complete oscillation (measured in seconds). Frequency is the number of complete oscillations per second (measured in hertz, Hz).',
      'The wave equation connects frequency, wavelength, and speed: <strong>v = f x λ</strong>. If frequency doubles in the same medium (constant v), the wavelength is halved.',
      'This inverse relationship applies to all periodic phenomena: sound waves, electromagnetic waves, pendulums, and any oscillatory motion.'
    ],
    epEdits: [] },

  { q: 'Q58', id: 'phys-238', key: 'B',
    existingFb: [
      ['A', 'Group IIIA (e.g., boron, gallium)', ' Group IIIA elements have only 3 valence electrons. When they substitute for silicon, they create an electron <strong>deficiency</strong> (a "hole") in the crystal lattice. This produces a <strong>P-type</strong> semiconductor, where the majority charge carriers are positive holes. These dopants are called <strong>acceptors</strong> because they accept electrons from neighboring bonds.'],
      ['C', 'Group IA (e.g., sodium, potassium)', ' Alkali metals with 1 valence electron are not used as semiconductor dopants. They do not substitute properly into the silicon crystal lattice (wrong size and bonding characteristics) and would disrupt the tetrahedral crystal structure rather than creating controlled n-type or p-type regions.'],
      ['D', 'Group VIIA (e.g., chlorine, bromine)', ' Halogens with 7 valence electrons are not standard semiconductor dopants. They are highly electronegative and reactive, and they do not integrate into the silicon lattice in the controlled manner needed for semiconductor doping.']
    ],
    fbKeep: ['A'], fbReplace: ['C', 'D'],
    fb: [
      ['C', ' Sodium and potassium are not the standard substitutional donor dopants used to make the N-type silicon described here. The intended mechanism uses a five-valence-electron atom such as phosphorus, with four electrons involved in bonding and one available as a donor electron.'],
      ['D', ' Chlorine and bromine are not the standard donor dopants for this silicon question. Phosphorus and arsenic provide the required five-valence-electron substitutional donor mechanism.']
    ],
    epWas: [
      '<strong>N-type:</strong> Group VA dopant (donor) → extra electron → majority carriers are electrons.',
      '<strong>P-type:</strong> Group IIIA dopant (acceptor) → electron hole → majority carriers are holes.',
      'The dopant concentrations are extremely small (about 1 dopant per 10<sup>6</sup> to 10<sup>8</sup> silicon atoms), yet they dramatically change the conductivity.',
      'Combining N-type and P-type regions creates a <strong>PN junction</strong>, the basis for diodes, transistors, and all modern electronics.'
    ],
    epEdits: [
      [3, 'Doping changes the concentration of mobile carriers. N-type and P-type describe the majority carrier, not a net bulk charge: the semiconductor remains electrically neutral overall.'],
      [4, 'Joining N-type and P-type regions forms a PN junction, used in junction diodes and bipolar transistors.']
    ] },

  { q: 'Q59', id: 'phys-239', key: 'C',
    stemWas: 'When a PN junction diode is connected in forward bias, which of the following occurs?',
    stem: 'An ordinary PN junction diode is given enough forward bias to carry appreciable current. Which of the following occurs?',
    headEdits: [['<li>Allows <strong>large current</strong> to flow once the threshold voltage is exceeded (~0.7 V for silicon, ~0.3 V for germanium)</li>',
      '<li>Allows forward current to increase continuously and strongly with applied voltage; the actual current depends on the diode, temperature and external circuit</li>']],
    existingFb: [
      ['A', 'The depletion region widens and current flow is negligible', ' This describes <strong>reverse bias</strong>, not forward bias. In reverse bias, the external voltage reinforces the built-in potential, widening the depletion region and preventing significant current flow (only a tiny leakage current passes).'],
      ['B', 'The diode has high resistance and blocks current flow', " Again, this is the behavior under <strong>reverse bias</strong>. In forward bias, the diode's effective resistance drops dramatically once the threshold voltage is reached, allowing substantial current flow."],
      ['D', 'Only holes can cross the junction while electrons are blocked', ' In forward bias, <strong>both</strong> charge carriers contribute to current flow. Holes move from P to N across the junction, while electrons simultaneously move from N to P. The conventional current direction is from P to N (anode to cathode).']
    ],
    fbKeep: ['D'], fbReplace: ['A', 'B'],
    fb: [
      ['A', ' Reverse bias widens the depletion region and strongly limits current below breakdown. Forward bias instead lowers the barrier and narrows the depletion region.'],
      ['B', ' Forward current rises strongly as the forward voltage increases. There is no abrupt universal threshold at which a previously perfect insulator switches on; a constant forward drop is a simplified circuit model.']
    ],
    epWas: [
      'Forward bias: external voltage opposes the built-in potential → depletion region shrinks → low resistance → large current.',
      'Reverse bias: external voltage reinforces the built-in potential → depletion region expands → high resistance → negligible current.',
      'The diode acts as a one-way valve for current: it conducts easily in forward bias and blocks in reverse bias. This property is used for rectification (converting AC to DC).'
    ],
    epEdits: [
      [1, 'Forward bias reduces the junction barrier and depletion width, allowing appreciable forward current under suitable bias.'],
      [2, 'Reverse bias widens the depletion region. Below breakdown, only a relatively small leakage current flows.'],
      [3, 'A diode preferentially conducts in one direction under ordinary operating conditions, which makes it useful for rectification. Reverse leakage and breakdown are limits to the ideal one-way-valve model.']
    ],
    blWas: 'Forward bias (P to +, N to -) narrows the depletion region, reduces resistance, and allows large current flow. Reverse bias does the opposite. The threshold voltage for silicon diodes is approximately 0.7 V.',
    bl: 'Forward bias connects P to + and N to −, lowering the barrier and narrowing the depletion region. A silicon drop around 0.6–0.7 V is an approximate operating model, not a universal threshold; current also depends on temperature and the circuit.' },

  { q: 'Q60', id: 'phys-240', key: 'C',
    stemWas: 'A PN junction diode under reverse bias exhibits:',
    stem: 'An ordinary PN junction diode under reverse bias, below its breakdown voltage, exhibits:',
    headEdits: [['<li>Only a tiny <strong>reverse saturation current</strong> (leakage current) flows, due to thermally generated minority carriers</li>',
      '<li>Only a small leakage current flows, associated with thermally generated carriers; its magnitude depends on the device and temperature</li>']],
    existingFb: [
      ['A', 'Low resistance and large forward current', ' This describes <strong>forward bias</strong> behavior. Under reverse bias, the resistance is very high (megaohms or higher) and the current is negligible (typically nanoamperes to microamperes for silicon diodes).'],
      ['B', 'A narrowed depletion region and increased conductivity', ' The depletion region <strong>widens</strong> under reverse bias, not narrows. The widened depletion region acts as an insulating layer, decreasing conductivity rather than increasing it.'],
      ['D', 'Zero resistance due to quantum tunneling effects', ' Quantum tunneling does occur in heavily doped PN junctions (Zener diodes) at specific reverse voltages (Zener breakdown), but this is a specialized case, not the general behavior. Normal reverse-biased diodes have very high resistance, not zero resistance.']
    ],
    fbKeep: ['B'], fbReplace: ['A', 'D'],
    fb: [
      ['A', ' Large forward current requires forward bias. Under the stated reverse bias below breakdown, the junction instead strongly limits current.'],
      ['D', ' Tunneling can contribute to Zener breakdown in a sufficiently reverse-biased, heavily doped junction, but that does not make the junction a zero-resistance conductor. This question specifies operation below breakdown.']
    ],
    epWas: [
      'If the reverse voltage exceeds the <strong>breakdown voltage</strong>, the diode can conduct heavily in reverse (avalanche or Zener breakdown). This is destructive for normal diodes but is the operating principle of Zener diodes (used for voltage regulation).',
      'The reverse leakage current approximately <strong>doubles for every 10 degrees C</strong> increase in temperature, since it depends on thermally generated minority carriers.',
      "The widened depletion region under reverse bias increases the diode's capacitance area, which is exploited in varactor (varicap) diodes for tuning circuits."
    ],
    epBlock: [
      'Above the reverse breakdown voltage, Zener or avalanche mechanisms can allow a much larger reverse current. Excess current or power can damage a diode; devices intended for breakdown operation still require suitable current and power limits.',
      'Reverse leakage generally increases as temperature rises, but a fixed doubling for every 10 °C is not a universal law for all diodes and operating conditions.',
      'Increasing reverse bias widens the depletion layer and lowers junction capacitance. Approximately, C<sub>j</sub> = εA/W: a larger depletion width W gives smaller capacitance. Varactor diodes use this voltage-dependent capacitance for tuning.'
    ],
    blWas: 'Reverse bias widens the depletion region, creates high resistance, and allows only a tiny leakage current. The diode effectively blocks current in this configuration, which is the basis for its rectifying behavior.',
    bl: 'Below breakdown, reverse bias widens the depletion region and strongly limits current, while allowing some leakage. The wider depletion layer also reduces junction capacitance.' }

];
