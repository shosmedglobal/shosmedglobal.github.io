/* Physics 60-block edit specs, display Q51-Q60. */
'use strict';
module.exports = [

  { q: 'Q51', id: 'phys-51', key: 'B',
    headMustContain: '1 x 2260000 / 373 = 6057 J/K',
    head: "<p>Calculate the water's entropy change using a reversible phase-change path at the stated boiling temperature: ΔS = Q<sub>rev</sub>/T = mL<sub>v</sub>/T. Here T = 100 + 273.15 = 373.15 K, so ΔS = (1 × 2,260,000)/373.15 ≈ 6056.5 J/K, closest to 6060 J/K.</p>",
    kcMustContain: 'because the disorder of the system greatly increases',
    kc: "Vaporization increases the water's entropy. At the phase-change temperature, ΔS = mL<sub>v</sub>/T, with T in kelvins. The vapor has many more accessible molecular arrangements than the liquid.",
    fb: [
      ['A', ' 3050 J/K is roughly half the required entropy change. The question vaporizes the full 1 kg, requiring the supplied 2.26 × 10<sup>6</sup> J.'],
      ['C', ' 8480 J/K does not follow from the given heat and temperature. Divide 2.26 × 10<sup>6</sup> J by 373.15 K.'],
      ['D', ' 22,600 J/K results from dividing by 100, the Celsius temperature. Entropy calculations require absolute temperature in kelvins.']
    ] },

  { q: 'Q52', id: 'phys-52', key: 'C',
    stemMustContain: 'An ideal gas undergoes an adiabatic process where the volume is compressed',
    stem: 'A monatomic ideal gas is compressed reversibly and adiabatically to one-eighth of its original volume. Its initial temperature is 300 K and γ = 5/3 is constant. What is its final temperature?',
    headMustContain: 'For an adiabatic process: T<sub>1</sub> V<sub>1</sub>^(γ-1)',
    head: '<p>For a reversible adiabatic ideal-gas process with constant γ, T<sub>1</sub>V<sub>1</sub><sup>γ−1</sup> = T<sub>2</sub>V<sub>2</sub><sup>γ−1</sup>. Thus T<sub>2</sub> = 300 × 8<sup>2/3</sup> = 300 × 4 = 1200 K. The temperature rises because work is done on the gas without heat transfer.</p>',
    kcMustContain: 'In an adiabatic compression, the temperature rises',
    kc: "Adiabatic means no heat transfer. For a reversible adiabatic ideal-gas process with constant γ, TV<sup>γ−1</sup> stays constant. Compression raises the temperature because work increases the gas's internal energy.",
    fb: [
      ['A', ' 600 K is only a twofold temperature increase. The volume ratio 8 is raised to γ − 1 = 2/3, giving a factor of four.'],
      ['B', ' 900 K is a threefold increase. Evaluate 8<sup>2/3</sup> as the square of the cube root of 8: 2<sup>2</sup> = 4.'],
      ['D', ' 2400 K multiplies temperature by the full volume ratio 8. The temperature relation instead uses that ratio raised to the power 2/3.']
    ] },

  { q: 'Q53', id: 'phys-53', key: 'C',
    stemMustContain: 'At the triple point of water (273.16 K, 611.73 Pa)',
    stem: 'At the solid–liquid–vapor triple point of water, approximately 273.16 K and 611.7 Pa, which statement is correct?',
    headMustContain: 'By definition, the triple point is the unique temperature and pressure',
    head: '<p>At this triple point of water, ice, liquid water and water vapor can coexist in thermodynamic equilibrium at the same temperature and pressure. It is where the boundaries separating these three phases meet on the phase diagram.</p>',
    fb: [
      ['A', ' Ice and liquid water can coexist along a melting boundary, but the stated triple point also permits water vapor in equilibrium.'],
      ['B', ' Liquid water and vapor can coexist along a boiling boundary, but the triple point also includes ice.'],
      ['D', ' The defining feature is coexistence of all three stated phases. Water is not restricted to the liquid phase at this point.']
    ] },

  { q: 'Q54', id: 'phys-54', key: 'A',
    stemMustContain: 'forms an image of an object placed 30 cm from the lens',
    stem: 'A thin converging lens in air has a focal length of 20 cm. An object is placed 30 cm from the lens. What are the image distance v and lateral magnification m?',
    headMustContain: '(with sign convention u = -30 cm)',
    head: "<p>Use the real-is-positive convention: u = +30 cm for the real object, f = +20 cm for the converging lens, and v > 0 for a real image. Then 1/f = 1/u + 1/v gives 1/v = 1/20 − 1/30 = 1/60, so v = +60 cm on the opposite side of the lens. The lateral magnification is m = −v/u = −60/30 = −2. The image is inverted and twice the object's height.</p>",
    fb: [
      ['B', ' At an object distance of 30 cm, the lens equation gives an image distance of 60 cm. Equal-size imaging, m = −1, would occur at object distance 2f = 40 cm.'],
      ['C', ' The image distance and magnification magnitude are correct, but the sign is not. A real image from this converging lens is inverted, so m is negative.'],
      ['D', ' The image distance is incorrect and the pair is inconsistent: with u = 30 cm and v = 40 cm, m would be −40/30, not −2.']
    ] },

  { q: 'Q55', id: 'phys-55', key: 'C',
    stemMustContain: 'An object is placed 15 cm from the mirror',
    stem: 'A concave spherical mirror has a radius of curvature of 40 cm. An object is on its axis, 15 cm in front of the mirror. Using the paraxial approximation, where is the image formed?',
    headMustContain: 'f = -20 cm (concave)',
    head: '<p>Use the real-is-positive convention for mirrors: the real object has u = +15 cm, and this concave mirror has f = R/2 = +20 cm. The mirror equation gives 1/v = 1/f − 1/u = 1/20 − 1/15 = −1/60, so v = −60 cm. A negative image distance in this convention means a virtual image behind the mirror. Its magnification is m = −v/u = +4, so it is upright and enlarged.</p>',
    fb: [
      ['A', " 60 cm is the correct distance magnitude, but the side is wrong. An object inside a concave mirror's focal length produces a virtual image behind the mirror."],
      ['B', ' The image is behind the mirror, but its distance is 60 cm, found from 1/v = 1/20 − 1/15 = −1/60.'],
      ['D', ' Both the side and distance are incorrect. Since the object lies inside f = 20 cm, the image is virtual and behind the mirror, at 60 cm.']
    ] },

  { q: 'Q56', id: 'phys-56', key: 'B',
    fb: [
      ['A', " Adding the magnitudes of the two lens powers would give 1/6 cm<sup>-1</sup>, but the second lens is diverging and has negative power. Its sign must be retained."],
      ['C', " The magnitude is correct but the sign is wrong. The +10 cm lens has greater positive power than the magnitude of the −15 cm lens's negative power."],
      ['D', ' The combination has positive, not negative, power. Add 1/10 and −1/15 to obtain +1/30 cm<sup>-1</sup>.']
    ] },

  { q: 'Q57', id: 'phys-57', key: 'C',
    stemMustContain: 'If the tube length (distance between lenses) is 160 mm',
    stem: "A compound microscope uses a 5 mm focal-length objective and a 25 mm focal-length eyepiece. It is adjusted for a final image at infinity, so the eye is relaxed. The optical tube length L, measured from the objective's rear focal plane to the eyepiece's front focal plane, is 160 mm. Using a reference near-point distance D = 250 mm, what is the magnitude of its total angular magnification?",
    headMustContain: 'where L is the tube length, D is the near point distance',
    head: "<p>For this thin-lens, relaxed-eye model, the magnitude of the objective's linear magnification is L/f<sub>obj</sub> = 160/5 = 32. The eyepiece's angular magnification is D/f<sub>eye</sub> = 250/25 = 10. Their product gives |M| = 32 × 10 = 320.</p><p>L here is the stated focal-plane separation, not the physical distance between the lenses. The 250 mm near point is the reference distance for comparison with unaided viewing; the final image in this question is at infinity.</p>",
    kcMustContain: 'A compound microscope achieves high magnification through two stages',
    kc: 'A compound microscope magnifies in two stages: the objective forms an enlarged, inverted real intermediate image, and the eyepiece provides angular magnification. For the stated relaxed-eye arrangement, |M| = (L/f<sub>obj</sub>)(D/f<sub>eye</sub>).',
    fb: [
      ['A', ' 100× does not follow from either stage of this microscope. The objective gives a magnitude of 160/5 = 32, and the eyepiece gives 250/25 = 10.'],
      ['B', ' 200× would require a different objective or eyepiece magnification. The given values produce 32 × 10 = 320.'],
      ['D', " 640× is twice the magnification. No additional factor of two appears when multiplying the objective magnification by the eyepiece's angular magnification."]
    ] },

  { q: 'Q58', id: 'phys-58', key: 'B',
    stemMustContain: 'from air at an angle of incidence of 30 degrees',
    stem: 'A ray passes from air (n ≈ 1.0) into a glass slab (n = 1.5) at an incidence angle of 30° measured from the normal. What is the refraction angle inside the glass?',
    kcMustContain: 'with light bending toward the normal when entering a denser medium',
    kc: "Snell's law is n<sub>1</sub>sinθ<sub>1</sub> = n<sub>2</sub>sinθ<sub>2</sub>, with both angles measured from the normal. At oblique incidence, light bends toward the normal when it enters a higher-refractive-index medium.",
    fb: [
      ['A', ' 14.5° is too small: 1.5 sin(14.5°) is about 0.376, not the required sin(30°) = 0.5.'],
      ['C', " 22.0° gives 1.5 sin(22.0°) ≈ 0.562. Snell's law requires this product to equal 0.5."],
      ['D', ' 33.3° would bend the ray away from the normal. Entering higher-index glass from air bends this obliquely incident ray toward the normal.']
    ] },

  { q: 'Q59', id: 'phys-59', key: 'C',
    stemMustContain: 'The critical angle for total internal reflection at a glass-air interface is 42 degrees',
    stem: 'For light traveling from glass into air (n<sub>air</sub> ≈ 1.0), the critical angle measured from the normal is 42°. What is the refractive index of the glass?',
    kcMustContain: 'which is used in fiber optics and endoscopy',
    kc: 'Total internal reflection requires light to travel from higher to lower refractive index with incidence angle greater than θ<sub>c</sub>. The critical angle satisfies sinθ<sub>c</sub> = n<sub>lower</sub>/n<sub>higher</sub>. This principle is used in optical fibers.',
    fb: [
      ['A', ' A refractive index of 1.33 would give a critical angle of about 48.8° for transmission into air, rather than 42°.'],
      ['B', ' A refractive index of 1.41 would give a critical angle of about 45.2°. The stated 42° requires a larger index.'],
      ['D', ' A refractive index of 1.62 would give a critical angle of about 38.1°. Use n<sub>glass</sub> = 1/sin42° ≈ 1.49.']
    ] },

  { q: 'Q60', id: 'phys-60', key: 'C',
    kcMustContain: 'cannot be expressed in terms of other SI units',
    kc: 'The SI classifies the ampere as a base unit for electric current. The seven base units are m, kg, s, A, K, mol and cd; derived SI units are formed from their products and powers.',
    fb: [
      ['A', ' The newton is the derived SI unit of force: 1 N = 1 kg·m·s<sup>-2</sup>. It is not one of the seven base units.'],
      ['B', ' The joule is the derived SI unit of energy: 1 J = 1 kg·m<sup>2</sup>·s<sup>-2</sup>.'],
      ['D', ' The watt is the derived SI unit of power: 1 W = 1 J/s = 1 kg·m<sup>2</sup>·s<sup>-3</sup>.']
    ] }
];
