/* Physics THIRD-block edit specs, display Q21-Q30. See phys-b3-edits-a.js for
   the conventions. */
'use strict';
module.exports = [

  { q: 'Q21', id: 'phys-141', key: 'B',
    stemWas: 'What is the period of a simple pendulum of length 0.25 m? (g = 10 m/s², π² ≈ 10)',
    stem: 'What is the period of an ideal simple pendulum of length 0.25 m oscillating through a small angle? (g = 10 m/s<sup>2</sup>, π<sup>2</sup> ≈ 10)',
    kcWas: 'T = 2π√(L/g). Halving the pendulum length does not halve the period.',
    kc: 'For small-angle pendulum motion, T = 2π√(L/g). Reducing the length to one-quarter halves the period.',
    fb: [
      ['A', ' A length of 0.25 m is one-quarter of 1 m, but the period depends on √L. The 2 s period of the 1 m pendulum therefore halves to 1 s, rather than becoming 0.5 s.'],
      ['C', ' With the stated g and approximation, T ≈ 2√L when L is in meters and T in seconds. Substituting L = 0.25 gives 1 s; 1.5 s would require about 0.5625 m.'],
      ['D', ' This is the period for a 1 m pendulum under the stated approximation. The shorter 0.25 m pendulum has half that period.']
    ] },

  { q: 'Q22', id: 'phys-142', key: 'B',
    fb: [
      ['A', ' This is half the frequency difference. The audible loudness maxima recur at |260 − 256| = 4 times per second, not twice per second.'],
      ['C', ' This is the mean of the two frequencies and describes the rapid oscillation around which the beat pattern is heard. The beat frequency itself is their difference.'],
      ['D', ' This is the sum of the frequencies. Beats come from the slow change between constructive and destructive interference, governed by the frequency difference.']
    ] },

  { q: 'Q23', id: 'phys-143', key: 'B',
    stemWas: 'In simple harmonic motion, the maximum velocity occurs at:',
    stem: 'In simple harmonic motion, the maximum speed occurs at:',
    headWas: '<p>In SHM, velocity is maximum when displacement is zero (at equilibrium) and zero when displacement is maximum (at the turning points). v<sub>max</sub> = ωA.</p>',
    head: '<p>In SHM, the speed is greatest at the equilibrium position, where displacement is zero. It is zero at the turning points, where the magnitude of displacement is the amplitude A. The maximum speed is v<sub>max</sub> = ωA.</p>',
    fb: [
      ['A', ' At maximum displacement the object is at a turning point and momentarily at rest. Its potential energy is greatest and its kinetic energy is zero.'],
      ['C', ' Halfway between equilibrium and a turning point, the speed is nonzero but below its maximum. Some of the mechanical energy is still stored as potential energy.'],
      ['D', ' At either turning point the object reverses direction and its speed is momentarily zero. It reaches its maximum speed when it passes through equilibrium.']
    ] },

  { q: 'Q24', id: 'phys-144', key: 'C',
    stemWas: 'A string under tension vibrates in its second harmonic. How many nodes are there (including the endpoints)?',
    stem: 'A string under tension is fixed at both ends and vibrates in its second harmonic. How many nodes are there, including the endpoints?',
    kcWas: 'The nth harmonic has (n+1) nodes and n antinodes on a fixed string.',
    kc: 'On a string fixed at both ends, the nth harmonic has n antinodes and n + 1 nodes, including the endpoints.',
    fb: [
      ['A', ' There is one internal node in the second harmonic, but the question also counts the two fixed endpoints. The total is three.'],
      ['B', ' This counts only the fixed endpoints. The second harmonic also has a node at the midpoint of the string.'],
      ['D', ' Four nodes would occur in the third harmonic of a string fixed at both ends. The second harmonic has two loops and three nodes.']
    ] },

  { q: 'Q25', id: 'phys-145', key: 'C',
    stemWas: 'A light ray travels from water (n = 1.33) into air (n = 1.00). If the angle of incidence in water is 30°, what is the angle of refraction in air? (sin 30° = 0.5)',
    stem: 'A light ray travels from water (n = 1.33) into air (n = 1.00). Its angle of incidence is 30° to the normal. What is the angle of refraction in air, also measured from the normal? (sin 30° = 0.5)',
    headWas: "<p>By Snell's law: n<sub>1</sub>sin θ<sub>1</sub> = n<sub>2</sub>sin θ<sub>2</sub>. 1.33 × 0.5 = 1.00 × sin θ<sub>2</sub>. sin θ<sub>2</sub> = 0.665 → θ<sub>2</sub> ≈ <strong>41.7°</strong>. Light bends away from the normal going into a less dense medium.</p>",
    head: "<p>Snell's law gives n<sub>1</sub>sinθ<sub>1</sub> = n<sub>2</sub>sinθ<sub>2</sub>. Thus sinθ<sub>2</sub> = 1.33 × 0.5/1.00 = 0.665, so θ<sub>2</sub> ≈ <strong>41.7°</strong>. The ray bends away from the normal because it enters a medium with a lower refractive index.</p>",
    kcWas: "Snell's law: n₁sin θ₁ = n₂sin θ₂.",
    kc: "Snell's law is n<sub>1</sub>sinθ<sub>1</sub> = n<sub>2</sub>sinθ<sub>2</sub>, with both angles measured from the normal. Entering a lower-index medium bends the transmitted ray away from the normal.",
    fb: [
      ['A', ' About 22° would result for the reverse situation: light entering water from air at 30° to the normal. Here the ray leaves water, so its angle increases.'],
      ['B', ' The indices differ and the ray is not normally incident, so its direction changes. An unchanged angle would not satisfy 1.33sin30° = sinθ<sub>2</sub>.'],
      ['D', ' This is close to the water-to-air critical angle, about 48.8° using n = 1.33. The critical angle is an incident angle producing a 90° refracted ray, not the refracted angle for this question.']
    ] },

  { q: 'Q26', id: 'phys-146', key: 'B',
    stemWas: 'An object is placed 30 cm from a converging lens of focal length 10 cm. Where is the image formed?',
    stem: 'A real object is placed 30 cm in front of a thin converging lens of focal length +10 cm in air. What is the distance from the lens to the image?',
    kcWas: 'Thin lens equation: 1/f = 1/d<sub>o</sub> + 1/d<sub>i</sub>.',
    kc: 'For a thin lens, 1/f = 1/d<sub>o</sub> + 1/d<sub>i</sub>. With a real object taken as d<sub>o</sub> > 0, a positive d<sub>i</sub> describes a real image on the opposite side of the lens.',
    fb: [
      ['A', ' This results from adding 1/10 and 1/30 to obtain 1/d<sub>i</sub>. Rearranging the lens equation requires subtraction: 1/d<sub>i</sub> = 1/f − 1/d<sub>o</sub>.'],
      ['C', ' Subtracting the focal length directly from the object distance gives 20 cm, but the lens equation relates reciprocals of distances, not their direct difference.'],
      ['D', ' Equal object and image distances occur when the object is at twice the focal length. Here the object is at 3f, and the real image forms at 1.5f = 15 cm.']
    ] },

  { q: 'Q27', id: 'phys-147', key: 'B',
    fb: [
      ['A', ' A concave mirror gives a virtual, upright, magnified image when a real object is between the mirror and its focus. This object is farther away, at 2f.'],
      ['C', ' A real, inverted, diminished image occurs when the object is beyond the center of curvature. At the center itself, the image and object have equal size.'],
      ['D', ' A plane mirror produces a virtual upright image of the same size. This concave mirror instead forms a real inverted image for an object at its center of curvature.']
    ] },

  { q: 'Q28', id: 'phys-148', key: 'B',
    stemWas: 'A myopic (near-sighted) person needs what type of corrective lens?',
    stem: 'Which lens type corrects blurred distance vision in a person with myopia (nearsightedness) and no astigmatism?',
    headWas: '<p>In <strong>myopia</strong>, the image forms in front of the retina. A diverging (concave) lens spreads the light rays so that they focus correctly on the retina.</p>',
    head: '<p>In an uncorrected myopic eye with accommodation relaxed, light from a distant object focuses in front of the retina. A diverging lens reduces the convergence of the incoming rays so that the eye focuses them on the retina.</p>',
    fb: [
      ['A', ' A converging lens adds positive optical power. The usual correction for myopia requires negative power to move the focus of distant light back onto the retina.'],
      ['C', ' A cylindrical component supplies different optical power in different directions and is used to correct astigmatism. The stem excludes astigmatism.'],
      ['D', ' Bifocal lenses provide separate powers for different viewing distances. They are not required solely because someone has myopia; the distance correction still uses diverging power.']
    ] },

  { q: 'Q29', id: 'phys-149', key: 'B',
    fb: [
      ['A', " Snell's law relates incident and refracted angles when light passes between media with different refractive indices. This question concerns a reflected ray."],
      ['C', " Brewster's law identifies the incidence angle at which the reflected light is fully polarized for an ideal dielectric interface. It is not the name of the equal-angle reflection rule."],
      ['D', " Huygens' principle describes wavefront propagation and can be used to derive reflection and refraction. The specific equal-angle statement is called the law of reflection."]
    ] },

  { q: 'Q30', id: 'phys-150', key: 'A',
    headWas: '<p>Dispersion occurs because the <strong>refractive index depends on wavelength</strong>. Shorter wavelengths (violet) are slowed more and refracted more than longer wavelengths (red).</p>',
    head: '<p>In ordinary transparent glass over the visible range, the refractive index varies with the color of light. Violet light travels more slowly in the glass and is usually bent more than red light by the prism. The white light already contains the colors; the prism separates them.</p>',
    fb: [
      ['B', ' Selective absorption removes colors from a beam. A transparent prism produces a spectrum mainly by refracting its existing colors through different angles.'],
      ['C', " The transmitted spectrum forms mainly by refraction at the prism's surfaces, not by reflecting each color through a different angle."],
      ['D', ' The prism does not create new light frequencies to make the spectrum. Each component keeps its frequency during refraction, although its wavelength changes while it travels in the glass.']
    ] }

];
