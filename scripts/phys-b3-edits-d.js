/* Physics THIRD-block edit specs, display Q31-Q40. See phys-b3-edits-a.js for
   the conventions. */
'use strict';
module.exports = [

  { q: 'Q31', id: 'phys-151', key: 'A',
    stemWas: 'An object is placed 15 cm from a diverging lens of focal length −30 cm. What is the image distance?',
    stem: 'A real object is placed 15 cm in front of a thin diverging lens of focal length −30 cm in air. What is the image distance, taking a virtual image on the object side as negative?',
    kcWas: 'Diverging lenses always produce virtual, upright, diminished images.',
    kc: 'For a real object in front of a single thin diverging lens in air, the image is virtual, upright and diminished, on the same side as the object.',
    fb: [
      ['B', ' The virtual image approaches the focal point for a very distant object. With the object only 15 cm away, the lens equation instead gives −10 cm.'],
      ['C', ' The magnitude is correct, but the positive sign would describe a real image on the other side. The image here is virtual and on the object side.'],
      ['D', ' This has both the wrong distance and the wrong sign. Using f = −30 cm and d<sub>o</sub> = +15 cm gives 1/d<sub>i</sub> = −1/10 cm<sup>−1</sup>.']
    ] },

  { q: 'Q32', id: 'phys-152', key: 'C',
    stemWas: 'The power of a lens with focal length 0.25 m is:',
    stem: 'The optical power of a lens with focal length +0.25 m is:',
    fb: [
      ['A', ' This repeats the focal length as the power. Power in diopters is the reciprocal of focal length in meters, not the same numerical value.'],
      ['B', ' A power of 2.5 D corresponds to a focal length of 0.4 m. The stated focal length is 0.25 m, whose reciprocal is 4 D.'],
      ['D', ' This would correspond to a focal length of 0.04 m. Do not confuse the focal length of 25 cm with a power of 25 diopters.']
    ] },

  { q: 'Q33', id: 'phys-153', key: 'B',
    headWas: '<p><strong>Diffraction</strong> is the bending of waves around obstacles or through openings. It can only be explained by the wave model of light. The photoelectric effect and Compton scattering demonstrate the particle nature.</p>',
    head: '<p>Diffraction is the spreading of light at an opening or around an obstacle. A narrow slit produces a pattern explained by interference of light waves. This demonstrates wave behavior; the photoelectric effect and Compton scattering instead provide evidence for quantized light energy and momentum.</p>',
    fb: [
      ['A', ' The photoelectric effect reveals that light transfers energy in quanta, with photon energy hf. Its threshold-frequency behavior is not explained by a purely classical wave model.'],
      ['C', ' Compton scattering is explained by energy and momentum transfer between photons and electrons. It is evidence for photon momentum rather than the slit-interference behavior asked about here.'],
      ['D', ' The spectrum of blackbody radiation led to the introduction of energy quantization. Diffraction is the more direct demonstration of spatial wave interference among these choices.']
    ] },

  { q: 'Q34', id: 'phys-154', key: 'B',
    headWas: '<p>The visible spectrum extends from about <strong>400 nm</strong> (violet) to <strong>700 nm</strong> (red). Below 400 nm is ultraviolet; above 700 nm is infrared.</p>',
    head: '<p>A common rounded range for visible light is about 400 nm at the violet end to 700 nm at the red end. The limits are not sharp and depend on viewing conditions. Shorter wavelengths lie toward the ultraviolet region and longer wavelengths toward the infrared region.</p>',
    fb: [
      ['A', ' This interval is mainly ultraviolet. Its upper end approaches visible violet, but it omits almost the whole visible range.'],
      ['C', ' This interval begins near the red edge of visibility and extends into the near infrared. It omits the shorter visible wavelengths.'],
      ['D', ' This interval is infrared, well beyond the usual visible red limit. It is not the range normally detected as visible light by the human eye.']
    ] },

  { q: 'Q35', id: 'phys-155', key: 'B',
    stemWas: 'An AC voltage source has a peak voltage of 170 V. What is the RMS (effective) voltage?',
    stem: 'A sinusoidal AC voltage has a peak value of 170 V. What is its RMS (effective) voltage?',
    kcWas: 'V<sub>RMS</sub> = V<sub>peak</sub>/√2 ≈ 0.707 × V<sub>peak</sub>.',
    kc: 'For a sinusoidal voltage, V<sub>rms</sub> = V<sub>peak</sub>/√2 ≈ 0.707V<sub>peak</sub>. Other waveforms can have different peak-to-RMS relationships.',
    fb: [
      ['A', ' This divides the peak by 2. For a sinusoid, the mean of the squared voltage is V<sub>peak</sub><sup>2</sup>/2, so taking the square root divides the peak by √2.'],
      ['C', ' This is the peak voltage itself. The sinusoidal voltage is below its peak magnitude during most of each cycle, so its RMS value is smaller.'],
      ['D', ' This multiplies the peak by √2 instead of dividing. That operation converts RMS to peak for a sinusoid, not peak to RMS.']
    ] },

  { q: 'Q36', id: 'phys-156', key: 'C',
    stemWas: 'A magnetic field of 0.5 T acts on a wire carrying 4 A of current. If the wire is 2 m long and perpendicular to the field, what is the force on the wire?',
    stem: 'A straight 2 m length of wire carrying 4 A lies entirely in a uniform magnetic field of 0.5 T, perpendicular to the field. What is the magnitude of the magnetic force on that length?',
    kcWas: 'Force on a current-carrying wire in a magnetic field: F = BIL sin θ.',
    kc: 'For a straight wire segment in a uniform magnetic field, the force magnitude is F = BILsinθ, where θ is the angle between the current direction and the field.',
    fb: [
      ['A', ' This is one-quarter of the correct force. All three factors are required: 0.5 T × 4 A × 2 m = 4 N.'],
      ['B', ' This would be the force on a 1 m segment under the same conditions. The stated segment is 2 m long, so its force is twice as large.'],
      ['D', ' This would result if B were 1 T. The given field is 0.5 T, so multiplying I by L alone overstates the result by a factor of two.']
    ] },

  { q: 'Q37', id: 'phys-157', key: 'C',
    headWas: "<p>Faraday's law: EMF = −dΦ/dt. The induced EMF depends on how quickly the <strong>magnetic flux</strong> (Φ = BA cos θ) changes, not on the static field value.</p>",
    head: "<p>Faraday's law for one loop is ε = −dΦ/dt: the induced emf depends on how quickly magnetic flux changes. For a flat loop in a uniform field, Φ = BAcosθ, with θ measured between the field and the normal to the loop. Flux can change because the field, area or orientation changes.</p>",
    kcWas: "Faraday's law: EMF = −N(ΔΦ/Δt); no change in flux = no EMF.",
    kc: "For N turns with the same flux per turn, average induced emf is ε<sub>av</sub> = −NΔΦ/Δt. The minus sign represents Lenz's law. Constant flux produces no emf by this induction mechanism.",
    fb: [
      ['A', ' A field can be strong yet produce no induced emf if the flux remains constant. Changing the field is one way to change flux, but its strength alone does not determine the emf.'],
      ['B', ' Area affects magnetic flux, but a fixed area alone does not generate an emf. What matters is the rate of change of the flux through the loop.'],
      ['D', " Resistance affects the current that flows in a closed circuit for a given induced emf. Faraday's law determines the emf from the changing flux, not from resistance."]
    ] },

  { q: 'Q38', id: 'phys-158', key: 'A',
    stemWas: 'A proton (charge = 1.6 × 10<sup>−19</sup> C) moves at 2 × 10<sup>6</sup> m/s perpendicular to a magnetic field of 0.5 T. What is the magnetic force on it?',
    stem: 'A proton (charge = +1.6 × 10<sup>−19</sup> C) moves at 2 × 10<sup>6</sup> m/s perpendicular to a magnetic field of 0.5 T. What is the magnitude of the magnetic force on it?',
    kcWas: 'Magnetic force on a moving charge: F = qvB sin θ.',
    kc: 'The magnetic-force magnitude on a moving charge is F = |q|vBsinθ. It is largest for perpendicular motion and zero for motion parallel to the field.',
    fb: [
      ['B', ' This is qv for the given numerical values without the factor of 0.5 T. Including the field strength halves that numerical result.'],
      ['C', ' This is ten times too small. The powers of ten give 10<sup>−19</sup> × 10<sup>6</sup> = 10<sup>−13</sup>, and the coefficient is 1.6 × 2 × 0.5 = 1.6.'],
      ['D', ' This combines an incorrect power of ten with omission of the factor 0.5. Use every factor in |q|vB, with sin90° = 1.']
    ] },

  { q: 'Q39', id: 'phys-159', key: 'C',
    options: [['C', 'Strong attraction to magnetic fields and permanent magnetization', 'Strong magnetization in an applied field, with the ability to retain magnetization']],
    headWas: '<p><strong>Ferromagnetic</strong> materials (iron, nickel, cobalt) are strongly attracted to magnets and can retain magnetization. Paramagnetic materials are weakly attracted; diamagnetic materials are weakly repelled.</p>',
    head: '<p>Ferromagnetic materials such as iron, nickel and cobalt at room temperature can become strongly magnetized in an applied field. Their magnetic domains become more aligned. Some alignment can remain after the field is removed, but the retained magnetization depends on the material and its magnetic history. An unmagnetized piece can still be ferromagnetic.</p>',
    kcWas: 'Ferro = strong attraction + permanent; para = weak attraction; dia = weak repulsion.',
    kc: 'Ferromagnets respond strongly and can retain magnetization. Paramagnets have a weak positive response; diamagnets have a weak opposing response.',
    fb: [
      ['A', ' Weak repulsion is characteristic of diamagnetic behavior. An initially unmagnetized ferromagnetic specimen is typically strongly attracted toward a stronger applied field.'],
      ['B', ' Ferromagnetic materials respond strongly to an applied magnetic field. Lack of a net magnetization before applying the field does not mean there is no response.'],
      ['D', ' This describes ordinary paramagnetic behavior. Ferromagnetic behavior is much stronger and can leave retained magnetization after removal of the applied field.']
    ] },

  { q: 'Q40', id: 'phys-160', key: 'B',
    stemWas: 'In a purely capacitive AC circuit, the current:',
    stem: 'For an ideal capacitor connected to a sinusoidal AC voltage source in steady operation, the current:',
    kcWas: 'Capacitor: I leads V by 90°. Inductor: I lags V by 90°. Mnemonic: ICE / ELI.',
    kc: 'With sinusoidal AC, current leads voltage by 90° in an ideal capacitor and lags voltage by 90° in an ideal inductor. Mnemonics: ICE and ELI.',
    fb: [
      ['A', ' Current and voltage are in phase for a pure resistor. In a capacitor, current depends on how quickly the voltage changes, producing a quarter-cycle phase difference.'],
      ['C', ' A 90° current lag describes an ideal inductor. For an ideal capacitor, current leads the voltage by 90°.'],
      ['D', ' A 180° shift would mean opposite signs at corresponding phases. A capacitor instead gives a 90° lead, with current maximal when the sinusoidal voltage is rising most rapidly.']
    ] }

];
