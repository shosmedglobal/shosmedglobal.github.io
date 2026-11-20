/* Physics FINAL-block edit specs, display Q33-Q41. See phys-b5-edits-a.js for
   the conventions.

   Q34, Q35 and Q37 are the three records in this block that store literal
   Unicode superscripts rather than <sup> markup. Their anchors use \u escapes
   so the stored characters are unambiguous. */
'use strict';
module.exports = [

  { q: 'Q33', id: 'phys-272', key: 'B',
    stemWas: 'What happens when air is cooled below its dew point temperature?',
    stem: 'Moist air at 25 °C has a dew point of 15 °C. If it is cooled at constant pressure to just below 15 °C, what normally happens?',
    headWas: '<p>The <strong>dew point</strong> is the temperature at which the air becomes fully saturated (RH = 100%). Cooling below this temperature causes the excess water vapor to condense into liquid droplets.</p><p>This is why dew forms on grass at night, why glasses fog up when moving from cold to warm air, and why clouds form when moist air rises and cools.</p>',
    head: "<p>The dew point is the temperature at which cooling at constant pressure brings the water vapor to saturation. Under ordinary conditions, cooling this air further causes some water vapor to condense into liquid water. Dew forms when a surface cools below the surrounding air's dew point. Cold glasses brought into warm, humid air can fog because they cool the air next to their surfaces below its dew point.</p>",
    fb: [
      ['A', ' Before condensation begins, cooling raises relative humidity toward 100%. Once condensation proceeds, relative humidity remains near saturation rather than dropping below it.'],
      ['C', ' Condensation removes water from the vapor phase into liquid droplets. It does not create additional water vapor.'],
      ['D', ' The question specifies constant pressure. Condensation is caused here by the decrease in saturation vapor pressure as the temperature falls.']
    ],
    kcWas: 'Below the dew point, the excess moisture condenses, keeping RH at 100%.',
    kc: 'Cooling moist air to its dew point reaches saturation. Further cooling normally causes condensation, keeping relative humidity close to 100% while condensation proceeds.' },

  { q: 'Q34', id: 'phys-273', key: 'A',
    stemWas: 'Two long parallel wires are 0.2 m apart, each carrying a current of 5 A in the same direction. What is the force per unit length between them?',
    stem: 'Two long parallel wires in air are 0.2 m apart and each carries 5 A in the same direction. Neglect end effects and take μ<sub>0</sub> ≈ 4π × 10<sup>−7</sup> N/A<sup>2</sup>. What is the force per unit length between them?',
    fb: [
      ['B', ' The magnitude is correct, but the direction is wrong. Parallel currents in the same direction attract; opposite currents repel.'],
      ['C', ' This is twice the correct force per length. Substitution gives (4π × 10<sup>−7</sup> × 25)/(2π × 0.2) = 2.5 × 10<sup>−5</sup> N/m.'],
      ['D', ' Both the magnitude and the direction are wrong. The stated separation gives 2.5 × 10<sup>−5</sup> N/m, and same-direction currents attract.']
    ] },

  { q: 'Q35', id: 'phys-274', key: 'B',
    headWas: '<p>The ampere was originally defined as: the constant current which, if maintained in two straight parallel conductors of infinite length and negligible cross-section placed <strong>1 meter apart in vacuum</strong>, produces a force of exactly <strong>2 × 10⁻⁷ N per meter</strong> of length between them.</p>',
    head: '<p>The former SI definition, used from 1948 until 2019, related one ampere to the magnetic force between two ideal straight parallel wires. With each wire carrying 1 A, an infinite wire length, negligible cross-section and a separation of 1 m in vacuum, the force per unit length was exactly 2 × 10<sup>−7</sup> N/m by definition. Since 20 May 2019, the ampere has instead been defined by fixing the elementary charge at exactly 1.602176634 × 10<sup>−19</sup> C.</p>',
    fb: [
      ['A', ' The force between stationary charged spheres is electrostatic and relates to electric charge, not the former magnetic wire-force definition of the ampere.'],
      ['C', ' Electron deflection in a magnetic field depends on charge, speed and field strength. It is not the parallel-wire arrangement used in the former SI definition.'],
      ['D', " A changing magnetic flux produces an emf according to Faraday's law. The historical ampere definition instead used the force between steady currents."]
    ],
    kcWas: 'The force per unit length between parallel wires carrying current I is F/L = μ₀I²/(2πd). Setting I = 1 A and d = 1 m gives F/L = 2 × 10⁻⁷ N/m.',
    kc: 'Historically, the ampere was defined through the force between parallel currents. The current SI definition fixes the elementary charge. The old wire-force relationship remains a useful physical law, with μ<sub>0</sub> approximately 4π × 10<sup>−7</sup> N/A<sup>2</sup>.' },

  { q: 'Q36', id: 'phys-275', key: 'B',
    stemWas: 'A straight conductor of length 0.4 m moves at 3 m/s perpendicular to a uniform magnetic field of 0.5 T. What EMF is induced across its ends?',
    stem: 'A straight conducting rod of length 0.4 m moves at 3 m/s in a uniform magnetic field of 0.5 T. The rod, its velocity and the magnetic field are mutually perpendicular. What is the magnitude of the motional emf between its ends?',
    headWas: '<p>When a conductor moves through a magnetic field, the <strong>motional EMF</strong> is:</p><p><strong>EMF = B × L × v</strong> (when motion is perpendicular to B)</p><p>EMF = 0.5 × 0.4 × 3 = <strong>0.6 V</strong></p><p>This is the principle behind electric generators: a conductor moving through a magnetic field generates a voltage.</p>',
    head: '<p>Charges in the moving rod experience the magnetic force qv × B along its length. Charge separation produces an emf of magnitude ε = BLv for the stated mutually perpendicular geometry. Thus ε = 0.5 × 0.4 × 3 = <strong>0.6 V</strong>. If the rod is part of a closed conducting circuit, this emf can drive a current.</p>',
    fb: [
      ['A', ' 0.2 is the numerical product BL, but the speed must also be included. Multiplying by 3 m/s gives 0.6 V.'],
      ['C', ' 1.2 V is twice the correct result. The stated mutually perpendicular arrangement gives ε = 0.5 × 0.4 × 3 = 0.6 V.'],
      ['D', ' 0.15 V does not follow from BLv with the stated quantities. Multiply the field strength, rod length and speed to obtain 0.6 V.']
    ],
    kcWas: "Motional EMF = BLv. This is a special case of Faraday's law where the flux changes because the conductor physically moves.",
    kc: 'Motional emf across a straight rod is BLv when the rod, velocity and magnetic field are mutually perpendicular. For a sliding rod in a closed circuit, the same result follows from the changing magnetic flux.' },

  /* Q37 is the major numerical repair: the stored calculation mixed the
     neutral helium-4 ATOMIC mass with free-nucleon masses. Consistent nuclear
     masses give 28.3 MeV, not 27.4 MeV. */
  { q: 'Q37', id: 'phys-276', key: 'C',
    stemWas: 'The mass of a helium-4 nucleus is 4.0026 u, while the total mass of 2 free protons and 2 free neutrons is 4.0320 u. What does this mass difference represent?',
    stem: 'The mass of a helium-4 nucleus is approximately 4.0015 u, while the combined mass of two free protons and two free neutrons is approximately 4.0319 u. What does the difference between these masses represent?',
    options: [['C', 'Mass converted to nuclear binding energy via E = mc²', 'Energy released when the bound nucleus formed, according to E = Δmc²']],
    headWas: '<p>The mass of a nucleus is always <strong>less</strong> than the sum of its individual nucleons. This <strong>mass defect</strong> (Δm = 0.0294 u) has been converted into binding energy:</p><p>E = Δm × 931.5 MeV/u = 0.0294 × 931.5 = <strong>27.4 MeV</strong></p>',
    head: "<p>A bound helium-4 nucleus has less rest mass than the same two protons and two neutrons separated. Using consistent nuclear masses, Δm = 4.0319 − 4.0015 = 0.0304 u. The corresponding binding energy is E = Δmc<sup>2</sup> ≈ 0.0304 × 931.5 = <strong>28.3 MeV</strong>. That much energy is released when the bound system forms from separated nucleons, and must be supplied to separate it again. The neutral atom's mass also includes its electrons, so it must not be substituted for the nuclear mass in this calculation.</p>",
    fb: [
      ['A', ' This is a real physical mass difference, not measurement error. The bound system has lower total rest energy than the same nucleons separated.'],
      ['B', ' Formation of this bound nucleus releases energy. Energy would have to be supplied to separate it back into free nucleons.'],
      ['D', ' The difference exists because of nuclear binding, not because the measurement caused radiation to escape. Compare the rest masses of the bound and separated systems.']
    ] },

  { q: 'Q38', id: 'phys-277', key: 'C',
    stemWas: 'Which nucleus has the highest binding energy per nucleon and is therefore the most stable?',
    stem: 'Among the following nuclei, which has the greatest binding energy per nucleon?',
    headWas: '<p><strong>Iron-56</strong> sits at the peak of the binding energy per nucleon curve (~8.8 MeV/nucleon), making it the most tightly bound and most stable nucleus.</p><p>Nuclei lighter than iron release energy by <strong>fusion</strong>. Nuclei heavier than iron release energy by <strong>fission</strong>. Both processes move toward the iron peak.</p>',
    head: '<p>Among the listed choices, iron-56 has the greatest binding energy per nucleon, about 8.8 MeV. The curve has a broad maximum near iron and nickel; nickel-62 has a slightly greater value than iron-56. Binding energy per nucleon measures how tightly nucleons are bound on average, but it is not by itself a complete test of radioactive stability. Fusion of suitable light nuclei and fission of suitable heavy nuclei release energy when the products have lower total rest energy, or equivalently greater total binding energy for the same nucleons.</p>',
    fb: [
      ['A', ' Hydrogen-1 is a single proton, so there is no binding energy between nucleons within that nucleus. Its nuclear binding energy in this sense is zero.'],
      ['B', " Helium-4 is tightly bound, but its binding energy per nucleon is about 28.3/4 ≈ 7.1 MeV, below iron-56's approximately 8.8 MeV."],
      ['D', " Uranium-238 has many nucleons and a large total binding energy, but its binding energy per nucleon is lower than iron-56's. Total binding energy and binding energy per nucleon are different comparisons."]
    ],
    kcWas: 'The binding energy curve peaks at iron-56. Both fusion and fission release energy because both move toward more stable configurations near iron.',
    kc: 'Iron-56 is the most tightly bound per nucleon among these choices. The binding-energy curve peaks in the iron–nickel region, with nickel-62 slightly higher. Whether a particular nuclear reaction releases energy depends on its reactants and products.' },

  { q: 'Q39', id: 'phys-278', key: 'B',
    stemWas: 'In a nuclear fission reactor, what is the primary function of the moderator?',
    stem: 'In a thermal-neutron fission reactor using U-235, what is the primary function of the moderator?',
    fb: [
      ['A', " Absorbing neutrons to control the chain reaction is the role of control materials such as control rods. The moderator's primary role is to slow neutrons while retaining enough to sustain fission."],
      ['C', ' Radiation shielding reduces exposure outside the reactor. A moderator is selected primarily to slow neutrons in the core, not to serve as the main gamma shield.'],
      ['D', " Removing heat is the coolant's function. Water can act as both coolant and moderator, but its moderating function specifically means slowing neutrons."]
    ],
    kcWas: 'Moderator = slows neutrons. Control rods = absorb neutrons. The moderator works because neutrons lose the most energy in collisions with particles of similar mass (hydrogen in water).',
    kc: 'Moderation slows neutrons mainly through scattering. Light nuclei transfer energy efficiently; hydrogen is particularly effective per collision, while graphite can slow neutrons through repeated collisions. A useful moderator also avoids absorbing too many neutrons.' },

  { q: 'Q40', id: 'phys-279', key: 'C',
    stemWas: 'Which material is most effective at shielding against neutron radiation?',
    stem: 'Which of the following is especially suitable for slowing fast neutrons by elastic scattering as part of a radiation shield?',
    headWas: '<p><strong>Neutrons</strong> are uncharged, so they pass easily through dense materials like lead. Neutrons are best slowed and absorbed by materials containing <strong>hydrogen</strong> (water, paraffin, concrete).</p><p>This is because energy transfer in a collision is maximized when the target has the same mass as the projectile. A hydrogen nucleus (proton) has nearly the same mass as a neutron.</p>',
    head: '<p>Water and paraffin contain many hydrogen nuclei. Because a proton has nearly the same mass as a neutron, a neutron can transfer a large fraction of its kinetic energy in an elastic collision with hydrogen. Repeated collisions slow the neutrons. Complete shielding may also need neutron-capturing materials, such as boron-containing materials, and protection against photons produced by neutron interactions. The best arrangement depends on neutron energy and shield thickness.</p>',
    fb: [
      ['A', ' Lead is useful for attenuating gamma rays, but its heavy nuclei transfer relatively little energy per elastic collision with a neutron. It is not the best choice here for slowing fast neutrons.'],
      ['B', ' Steel can be part of a shielding system, but its nuclei are much heavier than neutrons. Hydrogen-rich materials transfer more neutron energy per elastic collision.'],
      ['D', ' Aluminum nuclei are also much heavier than neutrons. Water or paraffin provides hydrogen nuclei, which are more effective for the slowing mechanism asked about.']
    ],
    kcWas: 'Lead stops γ rays. Hydrogen-rich materials stop neutrons. Different radiation types require different shielding strategies.',
    kc: 'Hydrogen-rich materials are useful for slowing fast neutrons. Effective shielding also considers neutron capture and secondary photons; there is no single best shield independent of radiation energy and geometry.' },

  { q: 'Q41', id: 'phys-280', key: 'B',
    fb: [
      ['A', ' A nucleon is one constituent of a nucleus: a proton or a neutron. It does not name the whole nuclear species characterized by Z and A.'],
      ['C', ' Isotopes are nuclides of the same element that differ in neutron number. The general name for the specified nuclear species is nuclide; isotope describes its relationship to other nuclides of that element.'],
      ['D', ' A nucleotide is a chemical building block of DNA or RNA, containing a base, sugar and phosphate. It is unrelated to the classification of nuclear species.']
    ] }

];
