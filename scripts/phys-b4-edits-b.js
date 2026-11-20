/* Physics FOURTH-block edit specs, display Q11-Q20. See phys-b4-edits-a.js
   for the conventions. */
'use strict';
module.exports = [

  { q: 'Q11', id: 'phys-191', key: 'B',
    stemWas: 'What is the purpose of immersion oil placed between the specimen slide and the objective lens of a microscope?',
    stem: 'Why is immersion oil placed between the specimen cover glass and an objective lens designed for oil immersion?',
    headWas: "<p>The numerical aperture is NA = n sin(&alpha;), where n is the refractive index of the medium between the specimen and the objective. Air has n = 1.0, but immersion oil has n &asymp; 1.5 (similar to glass).</p><p>By replacing air with oil, the numerical aperture increases by a factor of about 1.5, and the minimum resolvable distance decreases proportionally:</p><div class='exp-diagram'><p>d<sub>min</sub> = 0.61 &lambda; / NA</p><p>Higher NA → smaller d<sub>min</sub> → better resolution</p></div>",
    head: '<p>Immersion oil has a refractive index close to that of glass, about 1.5. Replacing the air gap with the appropriate oil allows more high-angle light to reach an oil-immersion objective. This permits a higher numerical aperture, NA = n sinα, and a smaller diffraction-limited separation, d<sub>min</sub> ≈ 0.61λ/NA. The improvement depends on the objective and its design; simply adding oil to any objective does not guarantee a fixed 1.5-fold gain.</p>',
    existingFb: [
      ['A', 'Reduce brightness', ' Immersion oil does not reduce brightness. In fact, it captures more light by reducing reflection at the glass-air interface.'],
      ['C', 'Magnify before the objective', ' The oil has no magnifying effect. Its role is purely to improve the light-gathering ability.'],
      ['D', 'Protect the lens', ' While physical contact occurs, the purpose is optical, not mechanical.']
    ],
    fbKeep: [], fbReplace: ['A', 'C', 'D'],
    fb: [
      ['A', ' The intended effect is to collect useful high-angle light, not to dim the image. Oil reduces the loss of these rays at the glass-to-air boundary.'],
      ['C', ' Oil is not a separate magnifying lens. Its role here is to improve light collection and numerical aperture with the appropriate objective.'],
      ['D', ' The oil bridges the optical gap; the objective glass should not need to touch the cover glass. Its purpose is improved imaging, not scratch protection.']
    ],
    kcWas: 'Immersion oil has a refractive index close to glass, eliminating the refraction and total internal reflection that would occur at a glass-air boundary. This lets more light enter the objective and increases the effective NA.',
    kc: 'Use the specified immersion medium with an objective designed for it. Oil reduces the refractive-index mismatch with glass, allowing higher numerical aperture and better resolution.' },

  { q: 'Q12', id: 'phys-192', key: 'C',
    stemWas: 'A compound microscope has an objective with focal length 4 mm, an eyepiece with focal length 25 mm, and an optical interval (tube length) of 160 mm. What is the total magnification? (Assume the near point distance D = 250 mm.)',
    stem: 'In an ideal two-lens compound microscope adjusted for relaxed-eye viewing (final image at infinity), the objective focal length is 4 mm and the eyepiece focal length is 25 mm. The optical interval, measured from the objective’s rear focal point to the eyepiece’s front focal point, is 160 mm. Using the conventional reference distance D = 250 mm, what is the magnitude of the total magnification?',
    headWas: "<p>The total magnification of a compound microscope is:</p><div class='exp-diagram'><p>M<sub>total</sub> = M<sub>obj</sub> x M<sub>eye</sub></p><p>M<sub>obj</sub> = d / f<sub>obj</sub> = 160 / 4 = 40</p><p>M<sub>eye</sub> = D / f<sub>eye</sub> = 250 / 25 = 10</p><p>M<sub>total</sub> = 40 x 10 = <strong>400x</strong></p></div>",
    head: '<p>For this optical interval L and relaxed-eye adjustment, the objective magnification has magnitude L/f<sub>o</sub> = 160/4 = 40. The eyepiece angular magnification is D/f<sub>e</sub> = 250/25 = 10. Their product is M = 40 × 10 = <strong>400</strong>. The objective inverts the intermediate image; the question asks for the positive magnitude of magnification.</p>',
    existingFb: [
      ['A', '100x', ' This might be obtained by using only the objective magnification and dividing by something incorrectly.'],
      ['B', '200x', ' Possibly from miscalculating one of the magnifications.'],
      ['D', '40x', ' This is only the objective magnification, ignoring the eyepiece.']
    ],
    fbKeep: [], fbReplace: ['A', 'B', 'D'],
    fb: [
      ['A', ' 100× is one-quarter of the required product. The objective gives 40× and the eyepiece gives 10×, so multiply them to obtain 400×.'],
      ['B', ' 200× is half the required magnification. Both focal-length ratios must be included: (160/4)(250/25) = 400.'],
      ['D', ' 40× is only the objective magnification. The eyepiece provides another factor of 10.']
    ],
    kcWas: 'Total magnification = (optical interval / f<sub>objective</sub>) x (near point distance / f<sub>eyepiece</sub>). The near point distance D = 25 cm is the closest distance at which a healthy young eye can focus.',
    kc: 'For this ideal microscope adjusted to a final image at infinity, the magnification magnitude is M = (L/f<sub>o</sub>)(D/f<sub>e</sub>). L is the optical interval between the specified focal points, and D = 25 cm is the conventional reference distance.' },

  { q: 'Q13', id: 'phys-193', key: 'A',
    options: [['D', 'Collimating lens that makes light rays parallel', 'Lens that forms the first real image directly from the specimen']],
    headWas: "<p>The eyepiece (ocular) acts as a magnifying glass. It takes the real intermediate image produced by the objective and creates a virtual, magnified image that the observer's eye can focus on.</p><p>The intermediate image falls just inside the focal point of the eyepiece, so the eyepiece works exactly like holding a magnifying glass over a small object.</p>",
    head: '<p>The eyepiece acts as a magnifying glass for the intermediate image formed by the objective. If that image is just inside the eyepiece focal plane, the eyepiece forms a magnified virtual image at a finite distance. If it lies in the focal plane, rays from each image point emerge parallel, allowing relaxed-eye viewing with the final image at infinity. Both arrangements use the eyepiece as a magnifier.</p>',
    existingFb: [
      ['B', 'Projector', ' A projector casts real images. The eyepiece creates a virtual image for the eye to view directly.'],
      ['C', 'Wavelength filter', " The eyepiece does not filter light. Separate filters can be added to a microscope for this purpose, but that is not the eyepiece's function."],
      ['D', 'Collimating lens', " A collimator makes light parallel, which is a different function entirely. The eyepiece's job is to magnify."]
    ],
    fbKeep: ['B', 'C'], fbReplace: ['D'],
    fb: [
      ['B', ' A projector casts real images. The eyepiece creates a virtual image for the eye to view directly.'],
      ['C', " The eyepiece does not filter light. Separate filters can be added to a microscope for this purpose, but that is not the eyepiece's function."],
      ['D', " Forming the first real image directly from the specimen is the objective's role. The eyepiece magnifies the intermediate image that has already been formed."]
    ] },

  { q: 'Q14', id: 'phys-194', key: 'B',
    stemWas: 'In a PN junction diode under forward bias, the depletion region:',
    stem: 'In an ordinary PN junction diode under appreciable forward bias, the depletion region:',
    existingFb: [
      ['A', 'Widens / no current', ' This describes reverse bias, where the external voltage pulls carriers away from the junction.'],
      ['C', 'Disappears / superconductor', ' The depletion region narrows but does not vanish entirely. The diode still has a small forward voltage drop (~0.6 V for silicon), so it is not a superconductor.'],
      ['D', 'Same width / leakage', ' This partially describes reverse bias conditions, where only a tiny leakage current flows due to minority carriers.']
    ],
    fbKeep: [], fbReplace: ['A', 'C', 'D'],
    fb: [
      ['A', ' Reverse bias widens the depletion region. Below breakdown it strongly limits current, but a small leakage current can still flow.'],
      ['C', ' Forward bias reduces the barrier and narrows the depletion region; it does not turn the diode into a zero-resistance superconductor. A conducting diode still has a forward voltage drop.'],
      ['D', ' Forward bias changes the depletion width, so it does not stay the same. Small reverse leakage describes a different operating condition.']
    ],
    kcWas: 'Forward bias shrinks the depletion region, allowing current. Reverse bias widens it, blocking current. The diode acts as a one-way valve. The silicon diode begins conducting significantly at about 0.6 V forward bias.',
    kc: 'Forward bias lowers the junction barrier and narrows the depletion region. Current increases continuously and strongly with forward voltage. A 0.6–0.7 V silicon drop is a useful approximate circuit model at some operating currents, not a universal turn-on threshold.' },

  { q: 'Q15', id: 'phys-195', key: 'B',
    existingFb: [
      ['A', '3 valence electrons (boron)', ' This creates P-type, not N-type. Boron accepts an electron, creating a hole.'],
      ['C', 'A metal (copper)', ' Metals do not integrate into the silicon crystal lattice in the same way. Doping uses elements that substitute into the lattice.'],
      ['D', '4 valence electrons (germanium)', ' Germanium has the same number of valence electrons as silicon and would just replace a silicon atom without creating extra carriers.']
    ],
    fbKeep: ['A', 'D'], fbReplace: ['C'],
    fb: [
      ['A', ' This creates P-type, not N-type. Boron accepts an electron, creating a hole.'],
      ['C', ' Copper and gold can occur as impurities in silicon, but they are not the standard shallow donors used to create the N-type material described here. Phosphorus has five valence electrons and supplies the intended extra conduction electron.'],
      ['D', ' Germanium has the same number of valence electrons as silicon and would just replace a silicon atom without creating extra carriers.']
    ] },

  { q: 'Q16', id: 'phys-196', key: 'C',
    stemWas: 'What is the approximate forward voltage drop across a silicon diode when it is conducting?',
    stem: 'In the usual approximate constant-voltage-drop model for an ordinary silicon PN diode at room temperature and moderate forward current, which value is most appropriate?',
    headWas: '<p>A silicon diode has a forward voltage drop of approximately 0.6 to 0.7 V when conducting in forward bias. This voltage is needed to overcome the built-in potential of the PN junction.</p>',
    head: '<p>A value around 0.6–0.7 V is commonly used to approximate the forward drop of an ordinary silicon PN diode at moderate current. Among these choices, <strong>0.6 V</strong> is the best answer. The actual drop depends on the diode, current and temperature; conduction does not suddenly begin at one universal voltage.</p>',
    existingFb: [
      ['A', '0.1 V', ' This is too low for any common diode type.'],
      ['B', '0.3 V', ' This is the approximate forward voltage drop for a germanium diode, not silicon.'],
      ['D', '1.5 V', ' This is the voltage of a typical AA battery, not a silicon diode drop. LEDs can have forward drops of 1.5-3 V depending on color, but standard silicon diodes are about 0.6 V.']
    ],
    fbKeep: [], fbReplace: ['A', 'B', 'D'],
    fb: [
      ['A', ' 0.1 V is below the usual constant-drop approximation for an ordinary silicon PN diode at moderate current. This does not mean that all diode types or all operating currents must have a larger drop.'],
      ['B', ' 0.3 V is often used as an approximate germanium-diode value. It is not the usual model value for the ordinary silicon PN diode specified here.'],
      ['D', ' 1.5 V is too high for the usual single silicon PN-diode approximation under these conditions. Forward drops differ across device types and operating currents.']
    ],
    kcWas: 'Silicon diode: ~0.6 V forward drop. Germanium diode: ~0.3 V forward drop. This forward voltage drop must be accounted for in circuit analysis. In reverse bias, virtually no current flows until the breakdown voltage is reached.',
    kc: 'Use about 0.6–0.7 V only as a simplified silicon PN-diode model under suitable operating conditions. The real forward current–voltage curve is continuous, and the voltage drop depends on current and temperature.' },

  { q: 'Q17', id: 'phys-197', key: 'C',
    stemWas: 'A half-wave rectifier circuit uses a single diode to convert AC to DC. What fraction of the AC input cycle produces output?',
    stem: 'A half-wave rectifier has one ideal diode, a resistive load and no smoothing capacitor. For a sinusoidal AC input, what fraction of each cycle has nonzero load voltage?',
    headWas: '<p>In a half-wave rectifier, a single diode allows current to flow during only one half of the AC cycle (the positive half-cycle, when the diode is forward biased). During the other half (negative half-cycle), the diode blocks current.</p><p>The output is a series of positive pulses separated by gaps where the voltage is zero. The average output voltage is V<sub>peak</sub>/&pi; &asymp; 0.318 x V<sub>peak</sub>.</p>',
    head: '<p>The ideal diode conducts during one half of the sinusoidal cycle and blocks during the other, so the load voltage is nonzero for half the cycle: <strong>50%</strong>. With the diode oriented to pass the positive half, the output is a sequence of positive pulses and its average is V<sub>peak</sub>/π. Reversing the diode passes the negative half instead.</p>',
    existingFb: [
      ['A', 'Full cycle (100%)', ' This would require a full-wave rectifier using four diodes in a bridge configuration.'],
      ['B', 'Three-quarters (75%)', ' No standard rectifier arrangement produces this fraction.'],
      ['D', 'One-quarter (25%)', ' The diode blocks exactly one half-cycle, not three-quarters.']
    ],
    fbKeep: [], fbReplace: ['A', 'B', 'D'],
    fb: [
      ['A', ' Using both half-cycles requires full-wave rectification, such as a four-diode bridge or a suitable two-diode, center-tapped arrangement. One diode in this circuit passes only one half.'],
      ['B', ' The sinusoidal input has equal positive and negative half-cycles. Under the stated ideal conditions, one half conducts and one half is blocked, not a 75%/25% split.'],
      ['D', ' One-quarter would be too short. With an ideal diode and no smoothing capacitor, the conducting half-cycle lasts one-half of the full period.']
    ] },

  { q: 'Q18', id: 'phys-198', key: 'B',
    stemWas: 'In a reverse-biased PN junction, the depletion region acts primarily as:',
    stem: 'In an ordinary reverse-biased PN junction below its breakdown voltage, the depletion region acts primarily as:',
    options: [['B', 'An insulator that blocks current flow', 'An insulating barrier that strongly limits current flow']],
    headWas: '<p>Under reverse bias, the depletion region widens because the external voltage pulls majority carriers away from the junction. This leaves a wider region with no free charge carriers, effectively acting as an insulating barrier.</p><p>Only a tiny <strong>leakage current</strong> flows, carried by minority carriers (thermally generated electrons in the P-side and holes in the N-side).</p>',
    head: '<p>Reverse bias pulls majority carriers away from the junction and widens the depletion region. This region has very few mobile majority carriers and acts as a barrier to their flow. A small reverse leakage current can still arise from thermally generated carriers, including generation in the depletion region.</p>',
    existingFb: [
      ['A', 'Conductor with low resistance', ' This describes forward bias, not reverse bias.'],
      ['C', 'Source of free electrons', ' The depletion region is specifically depleted of free carriers.'],
      ['D', 'High current density', ' Current in reverse bias is negligible (microamperes or less) unless breakdown voltage is exceeded.']
    ],
    fbKeep: [], fbReplace: ['A', 'C', 'D'],
    fb: [
      ['A', ' A reverse-biased junction below breakdown does not provide a low-resistance path. The widened depletion region strongly limits current.'],
      ['C', ' The important feature is the shortage of mobile majority carriers, not an abundant supply of free electrons. Thermal generation can still contribute to the small leakage current.'],
      ['D', ' A large reverse current is not the ordinary behavior below breakdown. Leakage magnitude depends on the device and temperature.']
    ],
    kcWas: 'The depletion region has no free charge carriers. In forward bias it shrinks (allows current), in reverse bias it widens (blocks current). If the reverse voltage is too high, avalanche breakdown occurs and current flows suddenly.',
    kc: 'The depletion region is depleted of mobile majority carriers, not absolutely empty of carriers. Reverse bias widens it and strongly limits current below breakdown; at sufficiently large reverse voltage, Zener or avalanche breakdown can allow much larger current.' },

  { q: 'Q19', id: 'phys-199', key: 'B',
    options: [['C', 'The coil is placed in a uniform, steady magnetic field', 'The coil remains stationary in a uniform, steady magnetic field']],
    existingFb: [
      ['A', 'Constant flux', ' If the flux is constant, d&Phi;/dt = 0, and no EMF is induced.'],
      ['C', 'Uniform, steady field', ' A coil sitting still in a steady, uniform field has constant flux and no induced EMF.'],
      ['D', 'Constant DC current', ' A constant current produces a constant magnetic field, which does not induce an EMF in the same coil (self-inductance only matters when current changes).']
    ],
    fbKeep: ['A', 'C'], fbReplace: ['D'],
    fb: [
      ['A', ' If the flux is constant, d&Phi;/dt = 0, and no EMF is induced.'],
      ['C', ' A coil sitting still in a steady, uniform field has constant flux and no induced EMF.'],
      ['D', " A constant direct current in a fixed-shape coil does not by itself change the coil's self-generated magnetic flux. A changing current would produce a self-induced emf."]
    ],
    kcWas: 'It is the CHANGE in flux that matters, not the flux itself. A very strong but constant magnetic field induces no EMF. Even a weak field, if changing rapidly, can induce a large EMF. This is the basis of generators, transformers, and induction cooktops.',
    kc: 'Magnetic induction depends on changing flux through the coil, not simply on field strength. A stationary, fixed-shape coil in a steady field has no induced emf; motion or rotation can change the flux even when the field itself is steady.' },

  { q: 'Q20', id: 'phys-200', key: 'C', keep: true }

];
