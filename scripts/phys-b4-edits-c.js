/* Physics FOURTH-block edit specs, display Q21-Q30. See phys-b4-edits-a.js
   for the conventions. */
'use strict';
module.exports = [

  { q: 'Q21', id: 'phys-201', key: 'C',
    stemWas: 'A coil with 200 turns experiences a change in magnetic flux from 0.05 Wb to 0.01 Wb in 0.02 seconds. What is the magnitude of the induced EMF?',
    stem: 'The magnetic flux through each turn of a 200-turn coil changes from 0.05 Wb to 0.01 Wb in 0.02 s. What is the magnitude of the average induced emf?',
    existingFb: [
      ['A', '4 V', ' This ignores the number of turns (divides by 200 instead of multiplying).'],
      ['B', '40 V', ' This might come from an error in the time calculation or forgetting a factor.'],
      ['D', '0.4 V', ' This divides by the number of turns and mishandles the flux change.']
    ],
    fbKeep: [], fbReplace: ['A', 'B', 'D'],
    fb: [
      ['A', ' 4 V is 100 times too small. The flux-change rate per turn has magnitude 0.04/0.02 = 2 Wb/s, giving 2 V per turn and 400 V for 200 turns.'],
      ['B', ' 40 V would result from using 20 turns rather than 200. The stated coil has 200 turns, so the 2 V contribution from each turn adds to 400 V.'],
      ['D', ' 0.4 V is 1000 times too small. Multiply the per-turn flux-change rate by 200; do not divide by the number of turns.']
    ],
    kcWas: 'Each turn of the coil contributes the same induced EMF, and they add up (series connection). More turns = more EMF. Faster flux change = more EMF. This is why transformers have many turns of wire.',
    kc: 'The magnitude of the average induced emf is N|ΔΦ|/Δt when each of the N turns has the same flux change. The instantaneous form is |ε| = N|dΦ/dt|; the average equals the instantaneous magnitude if the rate is constant.' },

  /* Q22: scientific change confined to the stem; the heading synchronization
     rule still applies, so its three stored bodies are carried over unchanged
     under lettered headings. */
  { q: 'Q22', id: 'phys-202', key: 'C',
    stemWas: 'A transformer has 100 primary turns and 2000 secondary turns. If the primary voltage is 12 V, what is the secondary voltage?',
    stem: 'An ideal transformer has 100 primary turns and 2000 secondary turns. If the primary AC voltage is 12 V RMS, what is the secondary RMS voltage?',
    existingFb: [
      ['A', '0.6 V', ' This uses the inverse ratio (N<sub>p</sub>/N<sub>s</sub>), as if it were stepping down.'],
      ['B', '24 V', ' This only doubles the voltage, not multiplying by the turns ratio of 20.'],
      ['D', '2400 V', ' This multiplies by 200 instead of 20, confusing the turns ratio.']
    ],
    fbKeep: ['A', 'B', 'D'], fbReplace: [],
    fb: [
      ['A', ' This uses the inverse ratio (N<sub>p</sub>/N<sub>s</sub>), as if it were stepping down.'],
      ['B', ' This only doubles the voltage, not multiplying by the turns ratio of 20.'],
      ['D', ' This multiplies by 200 instead of 20, confusing the turns ratio.']
    ] },

  { q: 'Q23', id: 'phys-203', key: 'B', keep: true },

  { q: 'Q24', id: 'phys-204', key: 'B',
    stemWas: 'In a series RLC circuit, the impedance is given by Z = &radic;(R<sup>2</sup> + (X<sub>L</sub> - X<sub>C</sub>)<sup>2</sup>). At resonance (X<sub>L</sub> = X<sub>C</sub>), the impedance equals:',
    stem: 'For a series RLC circuit in sinusoidal steady state with R > 0, the impedance magnitude is Z = √[R<sup>2</sup> + (X<sub>L</sub> − X<sub>C</sub>)<sup>2</sup>]. At resonance (X<sub>L</sub> = X<sub>C</sub>), Z equals:',
    existingFb: [
      ['A', 'Zero', ' Impedance would only be zero if R were also zero (a theoretical superconducting circuit).'],
      ['C', 'X<sub>L</sub> + X<sub>C</sub>', ' The formula uses the difference (X<sub>L</sub> - X<sub>C</sub>), not the sum. At resonance, this difference is zero.'],
      ['D', 'Infinity', ' At resonance, impedance is at its minimum, not maximum. Current is maximum at resonance.']
    ],
    fbKeep: ['C'], fbReplace: ['A', 'D'],
    fb: [
      ['A', ' The reactances cancel, but the stated resistance is positive. The remaining impedance magnitude is R, not zero.'],
      ['C', ' The formula uses the difference (X<sub>L</sub> - X<sub>C</sub>), not the sum. At resonance, this difference is zero.'],
      ['D', ' The impedance magnitude is at its minimum, R. For a fixed source voltage and resistance, this gives the maximum current.']
    ],
    kcWas: 'At resonance, the inductor and capacitor effects cancel perfectly. The circuit behaves as if only the resistor were present. Current is maximum (I = V/R), and the circuit draws maximum power. This is the principle behind radio tuning circuits.',
    kc: 'At series resonance, the inductive and capacitive reactances cancel at the input, leaving Z = R and source voltage in phase with current. For fixed source RMS voltage and R, current and average power are greatest. The inductor and capacitor still store and exchange energy.' },

  { q: 'Q25', id: 'phys-205', key: 'B',
    existingFb: [
      ['A', 'Doubles', ' This would be true for inductive reactance (X<sub>L</sub> = &omega;L), which is directly proportional to frequency.'],
      ['C', 'Quadruples', ' No squared relationship exists here.'],
      ['D', 'Stays the same', ' Reactance depends on frequency. Only pure resistance is frequency-independent.']
    ],
    fbKeep: ['A', 'C'], fbReplace: ['D'],
    fb: [
      ['A', ' This would be true for inductive reactance (X<sub>L</sub> = &omega;L), which is directly proportional to frequency.'],
      ['C', ' No squared relationship exists here.'],
      ['D', " An ideal capacitor's reactance depends on frequency, so it cannot stay the same here. With C fixed, doubling f halves 1/(2πfC)."]
    ],
    kcWas: 'X<sub>C</sub> = 1/(&omega;C) decreases with frequency. X<sub>L</sub> = &omega;L increases with frequency. This is why capacitors block DC (infinite reactance at f=0) but pass AC, while inductors pass DC but block high-frequency AC.',
    kc: 'For ideal components of fixed C and L, X<sub>C</sub> = 1/(2πfC) decreases with frequency and X<sub>L</sub> = 2πfL increases. An ideal capacitor carries no steady DC current; an ideal inductor has no voltage drop when its current is constant.' },

  { q: 'Q26', id: 'phys-206', key: 'C',
    stemWas: 'In an AC circuit with only an ideal inductor (no resistance), the current:',
    stem: 'In sinusoidal steady state, an AC circuit contains only an ideal inductor, with no resistance or DC current component. The current:',
    existingFb: [
      ['A', 'In phase', ' This only occurs in a purely resistive circuit.'],
      ['B', 'Current leads voltage', ' This describes a capacitive circuit, not an inductive one.'],
      ['D', 'Lags by 180 degrees', ' 180 degrees would mean the current is exactly opposite (anti-phase), which does not occur in a simple inductor.']
    ],
    fbKeep: ['B', 'D'], fbReplace: ['A'],
    fb: [
      ['A', ' In-phase source voltage and current indicate zero net reactance, as in an ideal resistor or a series RLC circuit at resonance. An ideal inductor alone has a 90° phase difference.'],
      ['B', ' This describes a capacitive circuit, not an inductive one.'],
      ['D', ' 180 degrees would mean the current is exactly opposite (anti-phase), which does not occur in a simple inductor.']
    ],
    kcWas: 'In L: voltage leads current by 90°. In C: current leads voltage by 90°. In R: voltage and current are in phase. These phase relationships are fundamental to understanding AC power and impedance.',
    kc: 'For sinusoidal steady-state signals: in an ideal inductor, voltage leads current by 90°; in an ideal capacitor, current leads voltage by 90°; in an ideal resistor, they are in phase.' },

  { q: 'Q27', id: 'phys-207', key: 'C',
    existingFb: [
      ['A', '16 Hz', ' Likely from a calculation error involving incorrect unit conversion of the capacitance.'],
      ['B', '50 Hz', ' This is the mains frequency in many countries, but it is not the resonant frequency here.'],
      ['D', '1000 Hz', ' Off by a factor, possibly from converting micro to milli incorrectly.']
    ],
    fbKeep: ['A', 'B'], fbReplace: ['D'],
    fb: [
      ['A', ' Likely from a calculation error involving incorrect unit conversion of the capacitance.'],
      ['B', ' This is the mains frequency in many countries, but it is not the resonant frequency here.'],
      ['D', ' 1/√(LC) = 1000 is the angular resonant frequency in rad/s. Divide by 2π to obtain the ordinary frequency, about 159 Hz.']
    ],
    kcWas: 'f<sub>0</sub> = 1/(2&pi;&radic;(LC)). At this frequency, X<sub>L</sub> = X<sub>C</sub>, impedance is minimum, and current is maximum. Always convert &mu;F to F (multiply by 10<sup>-6</sup>) before calculating.',
    kc: 'For the ideal series RLC model, f<sub>0</sub> = 1/(2π√LC). At this frequency X<sub>L</sub> = X<sub>C</sub>; with fixed R > 0 and source voltage, impedance magnitude is smallest and current is largest. Convert 10 μF to 10 × 10<sup>-6</sup> F before substituting.' },

  { q: 'Q28', id: 'phys-208', key: 'D',
    stemWas: 'The average power dissipated in an AC circuit is P = V<sub>rms</sub> I<sub>rms</sub> cos(&phi;). What is the power factor cos(&phi;) for a purely resistive circuit?',
    stem: 'For sinusoidal voltage and current, the average power is P = V<sub>rms</sub>I<sub>rms</sub> cosφ. What is the power factor cosφ for an ideal resistor?',
    existingFb: [
      ['A', '0', ' cos(&phi;) = 0 means &phi; = 90°, which occurs in a purely reactive circuit (only inductor or only capacitor). No power is dissipated in that case.'],
      ['B', '0.5', ' cos(&phi;) = 0.5 means &phi; = 60°, which would be a specific RLC combination but not a pure resistor.'],
      ['C', '0.707', ' cos(&phi;) = 0.707 means &phi; = 45°, occurring when R = |X<sub>L</sub> - X<sub>C</sub>|.']
    ],
    fbKeep: ['A', 'B', 'C'], fbReplace: [],
    fb: [
      ['A', ' cos(&phi;) = 0 means &phi; = 90°, which occurs in a purely reactive circuit (only inductor or only capacitor). No power is dissipated in that case.'],
      ['B', ' cos(&phi;) = 0.5 means &phi; = 60°, which would be a specific RLC combination but not a pure resistor.'],
      ['C', ' cos(&phi;) = 0.707 means &phi; = 45°, occurring when R = |X<sub>L</sub> - X<sub>C</sub>|.']
    ],
    kcWas: 'The power factor cos(&phi;) ranges from 0 to 1. It equals 1 for a pure resistor, 0 for a pure inductor or pure capacitor. Only the resistive component dissipates real power. Inductors and capacitors store and return energy without net dissipation.',
    kc: 'For sinusoidal steady-state operation of a passive RLC circuit, cosφ ranges from 0 to 1. It is 1 for an ideal resistor and 0 for an ideal inductor or capacitor alone. Ideal reactive components store and return energy without net dissipation over a cycle.' },

  { q: 'Q29', id: 'phys-209', key: 'D',
    stemWas: 'The relationship V<sub>rms</sub> = V<sub>peak</sub> / &radic;2 means that for European mains voltage of 230 V (rms), the peak voltage is approximately:',
    stem: 'A sinusoidal AC supply at 50 Hz has an RMS voltage of 230 V. Using V<sub>rms</sub> = V<sub>peak</sub>/√2, what is its approximate peak voltage?',
    existingFb: [
      ['A', '115 V', ' This is 230/2, which would be dividing by 2 instead of multiplying by &radic;2.'],
      ['B', '163 V', ' This is 230/&radic;2, which would give a lower value, not higher. RMS is always less than peak, so peak must be larger than 230 V.'],
      ['C', '230 V', ' This is the RMS value itself, not the peak.']
    ],
    fbKeep: ['A', 'C'], fbReplace: ['B'],
    fb: [
      ['A', ' This is 230/2, which would be dividing by 2 instead of multiplying by &radic;2.'],
      ['B', ' This divides 230 by √2. For this sinusoidal waveform, peak voltage is greater than RMS voltage, so multiply by √2 instead.'],
      ['C', ' This is the RMS value itself, not the peak.']
    ],
    kcWas: "V<sub>rms</sub> = V<sub>peak</sub>/&radic;2. The RMS value is what's quoted for household power and what's used in power calculations. Peak voltage is always &radic;2 &asymp; 1.414 times larger than RMS. When someone says '230 V outlet,' they mean 230 V RMS.",
    kc: 'For a sine wave, V<sub>rms</sub> = V<sub>peak</sub>/√2. Thus 230 V RMS corresponds to a peak magnitude of about 325 V. Other waveforms can have different peak-to-RMS ratios.' },

  { q: 'Q30', id: 'phys-210', key: 'B',
    stemWas: 'An inductor with reactance X<sub>L</sub> = 100 &Omega; and a capacitor with reactance X<sub>C</sub> = 60 &Omega; are connected in series with a resistor R = 30 &Omega;. What is the total impedance of the circuit?',
    stem: "At the operating frequency of a sinusoidal source, an inductor has reactance X<sub>L</sub> = 100 Ω and a capacitor has reactance X<sub>C</sub> = 60 Ω. They are in series with R = 30 Ω. What is the circuit's impedance magnitude?",
    existingFb: [
      ['A', '190 &Omega;', ' This adds all three values (R + X<sub>L</sub> + X<sub>C</sub>), ignoring that reactances partially cancel and that impedance is calculated using the Pythagorean theorem.'],
      ['C', '70 &Omega;', ' This adds R + (X<sub>L</sub> - X<sub>C</sub>) directly instead of using the square root of the sum of squares.'],
      ['D', '110 &Omega;', ' This adds R + X<sub>L</sub> - X<sub>C</sub>/2 or some other incorrect combination.']
    ],
    fbKeep: ['A', 'C'], fbReplace: ['D'],
    fb: [
      ['A', ' This adds all three values (R + X<sub>L</sub> + X<sub>C</sub>), ignoring that reactances partially cancel and that impedance is calculated using the Pythagorean theorem.'],
      ['C', ' This adds R + (X<sub>L</sub> - X<sub>C</sub>) directly instead of using the square root of the sum of squares.'],
      ['D', ' The net reactance is 100 − 60 = 40 Ω. Combine this with 30 Ω resistance as √(30<sup>2</sup> + 40<sup>2</sup>) = 50 Ω. A value of 110 Ω does not follow from the series-impedance formula.']
    ] }

];
