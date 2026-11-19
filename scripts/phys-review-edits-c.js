/* Physics 60-block edit specs, display Q21-Q30.
   Q28 is the review's conditional formatting check: the stored markup already
   holds "2<sup>2</sup> = 4", so the flattened "22" in the export was an export
   artifact and nothing is changed there. It therefore gains feedback only. */
'use strict';
module.exports = [

  { q: 'Q21', id: 'phys-21', key: 'D',
    stemMustContain: 'the detector array has 1000 elements',
    stem: 'A CT scanner acquires 1000 angular projections during each full rotation of its X-ray tube. Each rotation takes 0.5 s. What is the average acquisition rate in projections per second?',
    headMustContain: 'With 1000 detector elements sampling per rotation',
    head: '<p>The rate is the number of angular projections divided by the acquisition time: 1000/0.5 = 2000 projections/s. Equivalently, two rotations per second × 1000 projections per rotation gives 2000 projections/s.</p><p>An angular projection, or view, contains measurements taken at one angular position. It can include readings from many detector elements. The number of detector elements alone therefore does not tell us how many angular projections are acquired per second.</p>',
    kcMustContain: 'CT imaging relies on acquiring multiple angular projections',
    kc: 'CT combines X-ray measurements from many viewing angles. Projection rate is the number of angular views acquired per unit time, rather than simply the number of detector elements.',
    fb: [
      ['A', ' 500 projections/s would mean acquiring 1000 projections in 2 s. The stated acquisition takes only 0.5 s.'],
      ['B', ' 1000 is the number acquired per rotation, not per second. The scanner completes two rotations each second.'],
      ['C', ' The rate is 1000 divided by 0.5, which is 2000 projections/s. A rate of 5000 would require more projections per rotation or a shorter rotation time.']
    ] },

  { q: 'Q22', id: 'phys-22', key: 'D',
    stemMustContain: 'The gyromagnetic ratio of hydrogen protons is 42.58 MHz/T',
    stem: 'An MRI scanner has a magnetic field of 3.0 T. For hydrogen protons, use γ/(2π) = 42.58 MHz/T. What is their Larmor precession frequency f?',
    headMustContain: 'The Larmor frequency is calculated as f = γ x B',
    head: '<p>The Larmor frequency in cycles per second is f = [γ/(2π)]B. Using the supplied value, f = 42.58 MHz/T × 3.0 T = 127.74 MHz. The angular-frequency form is ω = γB; the factor 2π distinguishes angular frequency from frequency in hertz.</p>',
    kcMustContain: 'The Larmor frequency determines the radiofrequency pulse',
    kc: 'For a given nucleus, Larmor frequency increases in proportion to magnetic field strength. MRI excitation uses radiofrequency pulses near this resonance frequency.',
    fb: [
      ['A', ' 63.87 MHz is the result at 1.5 T using the stated frequency-to-field ratio. The scanner in this question operates at 3.0 T.'],
      ['B', ' 85.16 MHz is the result at 2.0 T. Multiplying 42.58 MHz/T by the given 3.0 T gives 127.74 MHz.'],
      ['C', ' 170.32 MHz corresponds to 4.0 T. Larmor frequency is proportional to the field strength for the same nucleus.']
    ] },

  { q: 'Q23', id: 'phys-23', key: 'A',
    fb: [
      ['B', ' 1.0 cm would halve the travel distance twice. The measured time covers one outward and one return trip, so divide vt by 2 only once.'],
      ['C', ' 4.0 cm is the total round-trip path length. The reflecting structure is only halfway along that path.'],
      ['D', ' 8.0 cm doubles the round-trip distance rather than halving it. Depth is vt/2, approximately 2.0 cm.']
    ] },

  { q: 'Q24', id: 'phys-24', key: 'A',
    stemMustContain: 'a patient receives a prescribed dose of 2 Gy',
    stem: 'A tumor of mass 0.5 kg receives a mean absorbed radiation dose of 2 Gy. How much energy is deposited in the tumor?',
    fb: [
      ['B', ' 0.5 is the mass in kilograms. Energy is dose multiplied by mass: 2 J/kg × 0.5 kg = 1.0 J.'],
      ['C', ' 2 Gy is 2 J per kilogram, not a total of 2 J for every mass. The tumor has a mass of only 0.5 kg.'],
      ['D', ' Dividing dose by mass gives neither the required value nor energy units. Rearranging D = E/m gives E = Dm.']
    ] },

  { q: 'Q25', id: 'phys-25', key: 'A',
    fb: [
      ['B', ' 0.0311 nm is about twice the cutoff wavelength and would correspond to half the maximum photon energy. It is not the minimum wavelength at 80 kV.'],
      ['C', ' 0.155 nm is ten times too large. Convert 80 kV to 80,000 V before using λ<sub>min</sub> = hc/(eV).'],
      ['D', ' 0.311 nm is twenty times the minimum wavelength. The maximum photon energy is the full 80 keV gained by an electron across the tube voltage.']
    ] },

  { q: 'Q26', id: 'phys-26', key: 'D',
    kcMustContain: 'Higher frequency ultrasound gives better resolution',
    kc: 'At a fixed sound speed, higher frequency means shorter wavelength. With comparable pulse and beam design, this can improve resolution, but higher-frequency ultrasound generally attenuates more strongly in soft tissue, limiting penetration.',
    fb: [
      ['A', ' 0.077 mm is approximately the wavelength at 20 MHz in this tissue. The given frequency is four times lower, so the wavelength is four times longer.'],
      ['B', ' 0.154 mm corresponds to 10 MHz. At 5 MHz, wavelength is twice as long because λ = v/f.'],
      ['C', ' 0.616 mm corresponds to 2.5 MHz. The stated 5 MHz frequency gives half that wavelength.']
    ] },

  { q: 'Q27', id: 'phys-27', key: 'A',
    stemMustContain: 'After an initial 90-degree RF pulse',
    stem: 'A tissue starts at equilibrium longitudinal magnetization M₀ and receives an ideal 90° RF pulse, making its longitudinal magnetization zero. If T1 = 800 ms and no further RF pulses are applied, approximately what percentage of M₀ has recovered after 1600 ms?',
    headMustContain: 'T1 recovery follows M(t) = M<sub>0</sub>(1 - e^(-t/T1))',
    head: '<p>Longitudinal recovery from zero follows M<sub>z</sub>(t) = M₀[1 − exp(−t/T1)]. Here t/T1 = 1600/800 = 2, so M<sub>z</sub>/M₀ = 1 − e<sup>-2</sup> ≈ 0.8647, or about 86%.</p>',
    kcMustContain: 'After two T1 time constants',
    kc: 'After an ideal 90° pulse from equilibrium, longitudinal magnetization recovers toward M₀ with time constant T1. At one T1 it has recovered about 63%; at two T1, about 86%.',
    fb: [
      ['B', ' About 63% recovery occurs after one T1 time constant. Here 1600 ms is twice the 800 ms T1.'],
      ['C', ' About 95% recovery occurs after three T1 time constants. This question allows only two.'],
      ['D', ' About 98% recovery occurs after four T1 time constants. At two time constants, about 13.5% remains unrecovered.']
    ] },

  { q: 'Q28', id: 'phys-28', key: 'A',
    fb: [
      ['B', ' 200 TBq is the activity after one half-life, 5.27 years. The elapsed time is two half-lives.'],
      ['C', ' 50 TBq would follow three half-lives. At two half-lives, the source retains one quarter of its initial activity.'],
      ['D', ' 25 TBq would follow four half-lives. The activity halves twice here: 400 → 200 → 100 TBq.']
    ] },

  { q: 'Q29', id: 'phys-29', key: 'A',
    stemMustContain: 'A straight wire carries a current of 10 A',
    stem: "A long straight wire in air carries a current of 10 A. Far from the wire's ends, what is the magnetic field magnitude 5 cm from the wire? Use μ<sub>0</sub> ≈ 4π x 10<sup>-7</sup> T·m/A.",
    fb: [
      ['B', ' For this current, 2 × 10<sup>-5</sup> T would be the field at 10 cm. At the stated 5 cm, the field is twice as large.'],
      ['C', ' 8 × 10<sup>-5</sup> T would occur at 2.5 cm for this current. The field varies inversely with distance from a long straight wire.'],
      ['D', ' 2 × 10<sup>-4</sup> T would occur at 1 cm. Convert the stated 5 cm to 0.05 m before substitution.']
    ] },

  { q: 'Q30', id: 'phys-30', key: 'A',
    kcMustContain: 'A charged particle in a uniform magnetic field follows a circular path',
    kc: 'When velocity is perpendicular to a uniform magnetic field and only the magnetic force acts, the path is circular with r = p/(|q|B). A velocity component along the field adds motion along the field, producing a helix.',
    fb: [
      ['B', ' 2.09 cm is half the calculated radius. From r = mv/(|q|B), it would require half the momentum or twice the magnetic field.'],
      ['C', ' 8.35 cm is twice the calculated radius. The stated values instead give 0.04175 m, or 4.18 cm.'],
      ['D', ' 16.7 cm is four times the calculated radius. Use the given 0.5 T field and convert the resulting radius from meters to centimeters.']
    ] }
];
