/* Physics THIRD-block edit specs, display Q11-Q20. See phys-b3-edits-a.js for
   the conventions. */
'use strict';
module.exports = [

  { q: 'Q11', id: 'phys-131', key: 'B',
    fb: [
      ['A', ' This is half the correct energy. The factor of ½ in E = ½CV<sup>2</sup> is used only once.'],
      ['C', ' This is CV<sup>2</sup> = 0.25 J without the required factor of ½. The voltage rises as the capacitor charges, so the stored energy is ½CV<sup>2</sup>.'],
      ['D', ' This is twenty times too large. Convert 100 μF to 1 × 10<sup>−4</sup> F, square 50 V, and include the factor of ½.']
    ] },

  { q: 'Q12', id: 'phys-132', key: 'B',
    fb: [
      ['A', ' The algebraic sum of potential differences around a closed circuit loop is the voltage rule. The junction rule concerns charge flow into and out of a junction.'],
      ['C', " Resistance is a circuit property, not a quantity conserved at a junction. Kirchhoff's junction rule follows from conservation of electric charge."],
      ['D', ' Power balance concerns energy conservation. It is not the statement of the junction rule, which equates incoming and outgoing currents.']
    ] },

  { q: 'Q13', id: 'phys-133', key: 'D',
    stemWas: 'A 60 W light bulb operates at 120 V. What is the resistance of the filament?',
    stem: 'An incandescent light bulb is rated 60 W at 120 V. What is the resistance of its filament at normal operating temperature?',
    kcWas: 'P = V²/R can be rearranged to find resistance.',
    kc: 'For a resistive filament at its operating condition, R = V<sup>2</sup>/P. The filament resistance changes with temperature, so its cold resistance can differ.',
    fb: [
      ['A', ' The numerical ratio 120/60 is 2, but V/P has units of inverse current, not resistance. The required ratio is V<sup>2</sup>/P.'],
      ['B', ' This repeats the power rating as a resistance. Watts and ohms measure different quantities; use both the voltage and the power.'],
      ['C', ' This repeats the voltage as a resistance. Squaring 120 V and dividing by 60 W gives 240 Ω.']
    ] },

  { q: 'Q14', id: 'phys-134', key: 'C',
    kcWas: 'Combine series resistances first, then parallel, step by step.',
    kc: 'Identify which components actually form series or parallel groups. Here each series pair gives 16 Ω, and the two equal parallel branches give 8 Ω.',
    fb: [
      ['A', ' Four 8 Ω resistors all in parallel would give 2 Ω. Here they are arranged as two series pairs, so that shortcut does not apply.'],
      ['B', ' Two individual 8 Ω resistors in parallel would give 4 Ω. Each branch in this circuit contains two resistors in series and therefore has 16 Ω.'],
      ['D', ' This is the resistance of one series branch. Adding an identical parallel branch halves that equivalent resistance to 8 Ω.']
    ] },

  { q: 'Q15', id: 'phys-135', key: 'B',
    fb: [
      ['A', " This copies the period's numerical value into the frequency. Period is seconds per cycle, while frequency is cycles per second, so they are reciprocals."],
      ['C', ' Four oscillations per second would have a period of 0.25 s. A period of 0.4 s gives 1/0.4 = 2.5 oscillations per second.'],
      ['D', ' This would be correct for a period of 0.04 s. The stated period is ten times longer, so the frequency is ten times smaller.']
    ] },

  { q: 'Q16', id: 'phys-136', key: 'B',
    stemWas: 'A simple pendulum has a length of 1 m. What is its period? (g = 10 m/s², π² ≈ 10)',
    stem: 'An ideal simple pendulum of length 1 m oscillates through a small angle. What is its period? (g = 10 m/s<sup>2</sup>, π<sup>2</sup> ≈ 10)',
    kcWas: 'Pendulum period T = 2π√(L/g); depends on length and g, not mass.',
    kc: "For small-angle oscillations of an ideal simple pendulum, T = 2π√(L/g). It depends on length and g, but not on the bob's mass.",
    fb: [
      ['A', ' This is half the full period. It is the time to travel from one extreme to the other, not to return to the same position and direction of motion.'],
      ['C', ' Use the full factor √(L/g). With L/g = 1/10 and π<sup>2</sup> ≈ 10, the π factors cancel to give about 2 s.'],
      ['D', ' This is one-quarter of the period, the time from equilibrium to one extreme in the small-angle model. A full oscillation takes four such intervals.']
    ] },

  { q: 'Q17', id: 'phys-137', key: 'B',
    headWas: '<p>v = fλ = 500 × 0.68 = <strong>340 m/s</strong>. This is the speed of sound in air at room temperature.</p>',
    head: '<p>The speed is v = fλ = 500 × 0.68 = <strong>340 m/s</strong>. This is approximately the speed of sound in air at ordinary temperatures.</p>',
    fb: [
      ['A', ' This halves fλ without justification. In one period, the wave pattern advances one full wavelength, so v = fλ.'],
      ['C', ' This repeats the frequency as a speed. Frequency has units of s<sup>−1</sup>; multiplying it by wavelength in meters gives m/s.'],
      ['D', ' This is approximately 500/0.68. Dividing frequency by wavelength does not have the units of speed; multiply them instead.']
    ] },

  { q: 'Q18', id: 'phys-138', key: 'D',
    stemWas: 'An ambulance siren emits sound at 800 Hz. As the ambulance approaches you at 34 m/s, what frequency do you hear? (v<sub>sound</sub> = 340 m/s)',
    stem: 'An ambulance travels at 34 m/s directly toward an observer who is stationary relative to still air. Its siren emits sound at 800 Hz. What frequency does the observer hear? (Speed of sound in the air = 340 m/s)',
    kcWas: "Doppler effect: approaching source → higher frequency; f' = f·v/(v − v<sub>s</sub>).",
    kc: "For a source approaching a stationary observer through still air, f' = fv/(v − v<sub>s</sub>). The shorter arriving wavelength gives a higher observed frequency.",
    fb: [
      ['A', ' An approaching source raises the observed frequency, so 720 Hz is too low. This value would arise for an observer moving away at 34 m/s from a stationary 800 Hz source.'],
      ['B', ' This is the emitted frequency. The moving source compresses the wavefront spacing ahead of it, so a stationary observer in front hears a higher frequency.'],
      ['C', ' This uses 800(340 + 34)/340, the formula for an observer moving toward a stationary source. Here the source moves, so use 800 × 340/(340 − 34).']
    ] },

  { q: 'Q19', id: 'phys-139', key: 'B',
    stemWas: 'Resonance occurs when:',
    stem: 'A lightly damped mechanical oscillator is driven periodically. A large resonant response occurs when:',
    options: [['B', 'The driving frequency equals the natural frequency', 'The driving frequency is close to the natural frequency']],
    headWas: '<p><strong>Resonance</strong> occurs when the frequency of an external driving force matches the natural frequency of a system, causing maximum amplitude oscillations.</p>',
    head: '<p>A lightly damped oscillator responds strongly when the driving frequency is close to its natural frequency. Repeated pushes then sustain a large oscillation amplitude. Damping removes energy and limits the response; resonance does not mean unlimited growth in a real system.</p>',
    kcWas: 'Resonance = maximum energy transfer when driving frequency equals natural frequency.',
    kc: 'A lightly damped oscillator shows a large response when driven near its natural frequency. Damping limits the amplitude.',
    fb: [
      ['A', ' Heavy damping removes energy rapidly and suppresses the large amplitude associated with a sharp resonance. It is not the condition that produces resonance.'],
      ['C', ' Cancellation of overlapping waves is destructive interference. Resonance concerns the response of an oscillator to a periodic driving force.'],
      ['D', ' Zero amplitude means no oscillation. A large resonant response has substantial amplitude; passing through zero displacement is not the same as having zero amplitude.']
    ] },

  { q: 'Q20', id: 'phys-140', key: 'B',
    stemWas: 'Two waves of the same frequency and amplitude travel in opposite directions in a string. The result is:',
    stem: 'Two sinusoidal waves of the same frequency and amplitude travel in opposite directions along the same string, with their transverse displacements in the same plane. Their superposition produces:',
    fb: [
      ['A', ' The two equal opposite-traveling waves form a stationary pattern of nodes and antinodes. The amplitude is doubled at antinodes, but the resulting pattern is not one traveling wave.'],
      ['C', ' Destructive interference fixes the nodes at zero displacement, but other points oscillate. At antinodes the two waves can reinforce to give twice the amplitude of either wave.'],
      ['D', ' The points between nodes oscillate at the original wave frequency. Superposition changes the spatial amplitude pattern, not the frequency to half its value.']
    ] }

];
