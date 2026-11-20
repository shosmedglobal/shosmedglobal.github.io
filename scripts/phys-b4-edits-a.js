/* Physics FOURTH-block edit specs, display Q1-Q10.
 *
 * Every string is the review's own supplied wording. Conventions:
 *
 *  - `keep: true` marks the four items the review requires to stay
 *    byte-identical in every field (Q3, Q8, Q20, Q23). The harness refuses to
 *    touch them, heading synchronization included.
 *  - `existingFb` records the three distractor bodies AS STORED, in stored
 *    order, as [letter, lead-in, body]. Q1-Q45 store them as a <ul> of <li>
 *    items whose lead-in is an abbreviation of the option rather than the
 *    option text; Q46-Q60 already store lettered paragraphs. The harness
 *    reconstructs the stored block byte for byte before touching it.
 *  - `fbKeep` / `fbReplace` name which bodies the review retains and which it
 *    replaces, so a silently mismatched body cannot pass as either.
 *  - `fb` is the final set of three bodies, in option order, each keeping the
 *    single leading space of the bank convention. Headings are derived from
 *    the item's own stored option text with its A/B/C/D label.
 *
 * Notation in NEW text: indices and powers use <sub>/<sup> markup, which is
 * what all 60 of these records already use, with the ASCII hyphen this block
 * stores inside an exponent (10<sup>-12</sup>). Greek letters are written as
 * literal characters, which render identically to the named entities the
 * older passages use. Retained passages keep whatever they already store.
 */
'use strict';
module.exports = [

  { q: 'Q1', id: 'phys-181', key: 'C',
    headWas: "<p>The speed of sound depends on the medium. In general, sound is fastest in solids, slower in liquids, and slowest in gases:</p><table class='exp-table'><tr><th>Medium</th><th>Approximate Speed</th></tr><tr><td>Steel</td><td>~5000 m/s</td></tr><tr><td>Water</td><td>~1480 m/s</td></tr><tr><td>Air (20°C)</td><td>~343 m/s</td></tr><tr><td>Vacuum</td><td>0 m/s (no sound)</td></tr></table>",
    head: "<p>Among these choices, longitudinal sound travels fastest in steel. Sound speed depends on both the material's elastic stiffness and its density; density alone does not determine the speed.</p><table class='exp-table'><tr><th>Medium</th><th>Approximate sound speed</th></tr><tr><td>Steel</td><td>About 5000–6000 m/s for longitudinal sound, depending on the steel and wave mode</td></tr><tr><td>Water at room temperature</td><td>About 1480 m/s</td></tr><tr><td>Air at 20 °C</td><td>About 343 m/s</td></tr><tr><td>Vacuum</td><td>Not applicable: sound cannot propagate</td></tr></table>",
    existingFb: [
      ['A', 'Air', ' Sound in air (~343 m/s) is much slower than in steel or water.'],
      ['B', 'Water', ' Faster than air but slower than steel. The molecules in water are closer than in air but less rigidly bonded than in steel.'],
      ['D', 'Vacuum', ' Sound is a mechanical wave and requires a medium. It cannot travel through a vacuum at all.']
    ],
    fbKeep: ['A', 'D'], fbReplace: ['B'],
    fb: [
      ['A', ' Sound in air (~343 m/s) is much slower than in steel or water.'],
      ['B', ' Water transmits sound faster than air but slower than the longitudinal sound considered here in steel. Compare elastic stiffness relative to density, rather than particle spacing alone.'],
      ['D', ' Sound is a mechanical wave and requires a medium. It cannot travel through a vacuum at all.']
    ],
    kcWas: 'Sound needs a medium to propagate. Speed depends on the stiffness and density of the medium: v = &radic;(elastic modulus / density). Solids are stiff, so sound is fastest in them despite their higher density.',
    kc: 'Sound requires a material medium. Its speed depends on elastic stiffness relative to density. For these examples, longitudinal sound is fastest in steel, then water, then air; sound cannot propagate in a vacuum.' },

  { q: 'Q2', id: 'phys-182', key: 'A',
    stemWas: 'The threshold of human hearing is defined as a sound intensity of 10<sup>-12</sup> W/m<sup>2</sup>. What is the sound level in decibels (dB) at this threshold?',
    stem: 'Using the reference intensity I<sub>0</sub> = 10<sup>-12</sup> W/m<sup>2</sup>, what is the sound intensity level of a sound whose intensity is also 10<sup>-12</sup> W/m<sup>2</sup>?',
    headWas: "<p>The sound level in decibels is calculated as:</p><div class='exp-diagram'><p>L = 10 log<sub>10</sub>(I / I<sub>0</sub>)</p><p>At the threshold: I = I<sub>0</sub> = 10<sup>-12</sup> W/m<sup>2</sup></p><p>L = 10 log<sub>10</sub>(10<sup>-12</sup> / 10<sup>-12</sup>) = 10 log<sub>10</sub>(1) = 10 x 0 = <strong>0 dB</strong></p></div>",
    head: '<p>The sound intensity level is L = 10 log<sub>10</sub>(I/I<sub>0</sub>). Here I/I<sub>0</sub> = 1, so L = 10 log<sub>10</sub>(1) = <strong>0 dB</strong>. This means the intensity equals the chosen reference, not that there is no sound. Actual hearing sensitivity depends on frequency and the listener.</p>',
    existingFb: [
      ['B', '1 dB', ' There is no reason to get 1; log(1) = 0, not 0.1.'],
      ['C', '10 dB', ' 10 dB corresponds to an intensity 10 times the threshold.'],
      ['D', '-12 dB', ' This confuses the exponent in I<sub>0</sub> = 10<sup>-12</sup> with the decibel level.']
    ],
    fbKeep: [], fbReplace: ['B', 'C', 'D'],
    fb: [
      ['B', ' A level of 1 dB would require I/I<sub>0</sub> = 10<sup>0.1</sup>, about 1.26. Here the ratio is exactly 1, whose logarithm is zero.'],
      ['C', ' A level of 10 dB corresponds to an intensity ten times the reference. Here the intensity equals the reference.'],
      ['D', ' The −12 is the exponent in the reference intensity, not its decibel level. Divide I by I<sub>0</sub> before taking the logarithm.']
    ],
    kcWas: 'The decibel scale is logarithmic and relative to the threshold of hearing. 0 dB = threshold of hearing, 120 dB = threshold of pain. Each 10 dB increase represents a tenfold increase in intensity. Each 3 dB increase roughly doubles the intensity.',
    kc: 'Sound intensity level compares I with a reference: L = 10 log<sub>10</sub>(I/I<sub>0</sub>). An intensity equal to I<sub>0</sub> gives 0 dB. Increasing intensity tenfold adds 10 dB; doubling it adds about 3 dB.' },

  { q: 'Q3', id: 'phys-183', key: 'C', keep: true },

  { q: 'Q4', id: 'phys-184', key: 'B',
    options: [['B', 'Sound with frequency below 20 Hz, inaudible to humans', 'Sound with a frequency below 20 Hz, below the usual human hearing range']],
    headWas: "<p>Human hearing spans approximately 20 Hz to 20,000 Hz (20 kHz):</p><table class='exp-table'><tr><th>Category</th><th>Frequency Range</th><th>Examples</th></tr><tr><td>Infrasound</td><td>Below 20 Hz</td><td>Earthquakes, elephants, wind turbines</td></tr><tr><td>Audible sound</td><td>20 Hz – 20,000 Hz</td><td>Speech, music, everyday sounds</td></tr><tr><td>Ultrasound</td><td>Above 20,000 Hz</td><td>Medical imaging, bat echolocation, cleaning</td></tr></table>",
    head: "<p>Infrasound means sound with a frequency below 20 Hz. It is below the usual human hearing range, although sufficiently intense infrasound can be perceived.</p><table class='exp-table'><tr><th>Type</th><th>Conventional frequency range</th><th>Examples</th></tr><tr><td>Infrasound</td><td>Below 20 Hz</td><td>Earthquakes, elephants, wind turbines</td></tr><tr><td>Audible sound</td><td>Approximately 20 Hz–20 kHz for a typical young listener</td><td>Speech and music</td></tr><tr><td>Ultrasound</td><td>Above 20 kHz</td><td>Medical imaging, bats, ultrasonic cleaning</td></tr></table>",
    existingFb: [
      ['A', 'Above 20,000 Hz / medical imaging', ' That describes ultrasound, not infrasound.'],
      ['C', 'Threshold of pain at 120 dB', ' This describes a loudness level, not a frequency category.'],
      ['D', 'Only travels through solids', ' Sound of any frequency can travel through gases, liquids, and solids.']
    ],
    fbKeep: ['A'], fbReplace: ['C', 'D'],
    fb: [
      ['A', ' That describes ultrasound, not infrasound.'],
      ['C', ' This describes a sound level rather than a frequency range. Infrasound is defined by frequency, regardless of whether the sound is faint or intense.'],
      ['D', ' Infrasound is not restricted to solids. It can also propagate through media such as air and water.']
    ],
    kcWas: "Infra- means 'below' (below audible frequency). Ultra- means 'beyond' (above audible frequency). These labels refer to frequency ranges, not to loudness or medium.",
    kc: 'Infrasound is below 20 Hz and ultrasound is above 20 kHz. These are conventional frequency categories; an individual listener does not have an exact, universal hearing cutoff.' },

  { q: 'Q5', id: 'phys-185', key: 'B',
    stemWas: 'An ambulance siren emits sound at 600 Hz and approaches a stationary observer at 40 m/s. If the speed of sound is 340 m/s, what frequency does the observer hear?',
    stem: 'A siren emits sound at 600 Hz while moving directly toward an observer at 40 m/s. The observer is stationary relative to still air, where sound travels at 340 m/s. What frequency does the observer hear?',
    existingFb: [
      ['A', '548 Hz', ' This would be obtained by using (v + v<sub>source</sub>) in the denominator, as if the source were moving away (600 x 340/380 &asymp; 537 Hz, close to this).'],
      ['C', '600 Hz', ' The frequency would only remain at 600 Hz if there were no relative motion.'],
      ['D', '706 Hz', ' This might come from using an incorrect speed for the source in the formula.']
    ],
    fbKeep: [], fbReplace: ['A', 'C', 'D'],
    fb: [
      ['A', ' An approaching source raises the received frequency, so 548 Hz is too low. A source receding at 40 m/s would instead give 600 × 340/(340 + 40) ≈ 537 Hz, not 548 Hz.'],
      ['C', ' 600 Hz is the emitted frequency. The approaching source compresses the wavefront spacing ahead of it, so the stationary observer receives a higher frequency.'],
      ['D', ' Substitute the stated speeds into 600 × 340/(340 − 40). The denominator is 300 m/s and the result is 680 Hz, not 706 Hz.']
    ],
    kcWas: 'When a sound source approaches, the observed frequency increases (higher pitch). When it recedes, frequency decreases (lower pitch). The Doppler formula has (v - v<sub>source</sub>) for approach and (v + v<sub>source</sub>) for recession in the denominator.',
    kc: "For a source moving directly toward a stationary observer through still air, f' = fv/(v − v<sub>s</sub>). For direct recession, use v + v<sub>s</sub> in the denominator. The observer and sound speed are defined relative to the air." },

  { q: 'Q6', id: 'phys-186', key: 'A',
    stemWas: 'A car horn sounds at 400 Hz. The car moves away from a stationary observer at 20 m/s. The speed of sound is 340 m/s. What frequency does the observer hear?',
    stem: 'A source emits sound at 400 Hz while moving directly away from an observer at 20 m/s. The observer is stationary relative to still air, where sound travels at 340 m/s. Approximately what frequency does the observer hear?',
    headWas: "<p>When the source moves <strong>away</strong>, we use the Doppler formula with addition in the denominator:</p><div class='exp-diagram'><p>f<sub>obs</sub> = f<sub>source</sub> x v<sub>sound</sub> / (v<sub>sound</sub> + v<sub>source</sub>)</p><p>f<sub>obs</sub> = 400 x 340 / (340 + 20)</p><p>f<sub>obs</sub> = 136,000 / 360 = <strong>378 Hz</strong></p></div><p>The observed frequency decreases when the source moves away, consistent with the Doppler effect.</p>",
    head: "<p>For a source receding directly from a stationary observer, f' = fv/(v + v<sub>s</sub>). Thus f' = 400 × 340/(340 + 20) = 136000/360 ≈ 377.8 Hz, which rounds to <strong>378 Hz</strong>. The receding source increases the wavefront spacing reaching the observer.</p>",
    existingFb: [
      ['B', '400 Hz', ' This would be the case if the car were stationary.'],
      ['C', '424 Hz', ' This is what you would get if the car were approaching rather than receding.'],
      ['D', '422 Hz', ' Also corresponds to an approaching scenario with slightly different parameters.']
    ],
    fbKeep: [], fbReplace: ['B', 'C', 'D'],
    fb: [
      ['B', ' 400 Hz is the emitted frequency. Direct recession makes the received frequency lower.'],
      ['C', ' 424 Hz is higher than the emitted frequency, so it has the wrong direction of change. If the source were approaching at 20 m/s, the calculation would give 400 × 340/(340 − 20) = 425 Hz, not 424 Hz.'],
      ['D', ' 422 Hz is also an increase, whereas this source is receding. Use the larger denominator 340 + 20 = 360 m/s, giving about 378 Hz.']
    ],
    kcWas: 'Source moving away = lower pitch (denominator gets larger, so the fraction gets smaller). Source approaching = higher pitch (denominator gets smaller, so the fraction gets larger). The actual frequency emitted does not change; only the observed frequency changes.',
    kc: "A source receding directly from an observer stationary in still air gives f' = fv/(v + v<sub>s</sub>), so the observed frequency is lower than the emitted frequency." },

  { q: 'Q7', id: 'phys-187', key: 'B',
    existingFb: [
      ['A', 'f = T', ' This would mean a wave with period 0.5 seconds has frequency 0.5 Hz, but it actually has frequency 2 Hz.'],
      ['C', 'f = 2&pi;T', ' The factor 2&pi; relates angular frequency (&omega;) to regular frequency, not period to frequency.'],
      ['D', 'f = T<sup>2</sup>', ' There is no squared relationship between frequency and period.']
    ],
    fbKeep: ['A', 'D'], fbReplace: ['C'],
    fb: [
      ['A', ' This would mean a wave with period 0.5 seconds has frequency 0.5 Hz, but it actually has frequency 2 Hz.'],
      ['C', ' The factor 2π appears in angular frequency: ω = 2πf = 2π/T. It does not give f = 2πT; ordinary frequency is the reciprocal of period.'],
      ['D', ' There is no squared relationship between frequency and period.']
    ] },

  { q: 'Q8', id: 'phys-188', key: 'B', keep: true },

  { q: 'Q9', id: 'phys-189', key: 'B',
    stemWas: 'In a compound microscope, the objective lens creates:',
    stem: 'In the standard two-converging-lens model of a compound microscope, the specimen is just beyond the objective focal point. The objective lens creates:',
    headEdits: [['<p>A compound microscope has two converging lenses working in series:</p>',
      '<p>In this simplified compound-microscope model, two converging lenses work in series:</p>']],
    existingFb: [
      ['A', 'Virtual, upright, magnified', ' This describes the image from a simple magnifying glass, not from the objective of a compound microscope.'],
      ['C', 'Virtual, inverted, reduced', ' Virtual images from a single converging lens are always upright, not inverted.'],
      ['D', 'Real, upright, reduced', ' A converging lens only produces upright images when the object is inside the focal length, and those images are virtual.']
    ],
    fbKeep: ['A'], fbReplace: ['C', 'D'],
    fb: [
      ['A', ' This describes the image from a simple magnifying glass, not from the objective of a compound microscope.'],
      ['C', ' For the real specimen in this setup, the objective forms a real, inverted, enlarged image. A virtual image produced by a single converging lens viewing a real object inside its focal length would be upright.'],
      ['D', ' With this real specimen just beyond its focal point, the objective forms an inverted, enlarged image. It does not form an upright, reduced real image.']
    ] },

  { q: 'Q10', id: 'phys-190', key: 'C',
    stemWas: 'The resolving power of a light microscope is ultimately limited by:',
    stem: 'For a conventional light microscope with a fixed numerical aperture, which quantity sets the diffraction-limited separation of two points that can be resolved?',
    headWas: "<p>The minimum distance between two points that can be distinguished as separate is given by:</p><div class='exp-diagram'><p>d<sub>min</sub> = 0.61 &lambda; / NA</p></div><p>where NA = n sin(&alpha;) is the numerical aperture. The wavelength &lambda; sets the fundamental limit. For visible light (&lambda; &asymp; 400-700 nm), the best possible resolution is about 200 nm.</p>",
    head: '<p>A common estimate for the diffraction-limited separation is d<sub>min</sub> ≈ 0.61λ/NA. Here λ is the wavelength in vacuum, and NA = n sinα, where n is the refractive index of the imaging medium and α is the collection half-angle. At fixed NA, shorter wavelengths allow smaller separations to be resolved. With visible light and a high-NA objective, this separation is roughly a few tenths of a micrometer; it is not a universal limit for every microscopy technique.</p>',
    existingFb: [
      ['A', 'Magnification of eyepiece', " Higher magnification beyond the resolution limit only produces larger but blurrier images ('empty magnification'). It does not reveal finer detail."],
      ['B', 'Thickness of glass lenses', ' While lens quality matters, the fundamental limit is diffraction, which depends on wavelength.'],
      ['D', 'Brightness of light source', ' Brightness affects visibility and contrast but does not improve the ability to resolve fine details.']
    ],
    fbKeep: ['A', 'B'], fbReplace: ['D'],
    fb: [
      ['A', " Higher magnification beyond the resolution limit only produces larger but blurrier images ('empty magnification'). It does not reveal finer detail."],
      ['B', ' While lens quality matters, the fundamental limit is diffraction, which depends on wavelength.'],
      ['D', ' Adequate illumination helps make details visible. However, increasing brightness alone does not change the diffraction limit at fixed wavelength and numerical aperture.']
    ],
    kcWas: 'Resolution is limited by diffraction, which depends on wavelength. This is why electron microscopes (using electrons with very short de Broglie wavelength) achieve much finer resolution than light microscopes. Using shorter-wavelength light (blue/UV) or immersion oil also improves resolution.',
    kc: 'Resolution distinguishes nearby details; magnification only enlarges the image. In the conventional diffraction-limited model, shorter wavelength or higher numerical aperture reduces the minimum resolvable separation.' }

];
