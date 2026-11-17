/**
 * Chemistry review batch 3, display Q51-Q60 (chem-172..chem-181).
 * Q51-Q55 carry five educational points; Q56-Q60 carry three and store their
 * keyed heading without a letter prefix, which the review requires be kept.
 */
'use strict';

module.exports = [

{ q: 'Q51', id: 'chem-172', key: 'D', expectPoints: 5,
  pointEdits: [
    [1, 'Fission is the splitting of a heavy nucleus into lighter nuclei, usually releasing neutrons and, for heavy fuel nuclei such as U-235, a large amount of energy.']
  ],
  bottom: 'Fission splits a nucleus; fusion combines nuclei. Fission of heavy fuel nuclei and suitable fusion reactions of light nuclei release energy when their products are more tightly bound overall.',
  gone: ['Bottom Line: Fission = splitting heavy nuclei; fusion = combining light nuclei. Both release enormous energy.'],
  keep: ['Uranium-235 and plutonium-239 are the standard fissile fuels.',
         'That describes fusion, the opposite process.']
},

{ q: 'Q52', id: 'chem-173', key: 'C', expectPoints: 5,
  main: [
    'In energy-releasing fusion, light nuclei combine to form more tightly bound products. Fusion of hydrogen into helium is the energy source of the Sun. Common reactions considered for fusion power, such as deuterium-tritium fusion, can release more energy per unit fuel mass than uranium fission. This comparison is not a universal rule for every fusion reaction. Thermal fusion requires very high temperatures to achieve useful reaction rates despite repulsion between positively charged nuclei.'
  ],
  feedback: {
    A: 'Splitting a heavy nucleus is fission, not fusion. Energy can be released in either process when the products have greater total binding energy than the starting nuclei.',
    B: 'Beta decay changes the neutron-to-proton balance within a nucleus; it does not combine two nuclei. Its energy release depends on the particular decay, so no blanket energy ranking is needed to reject this answer.',
    D: 'Neutron absorption by uranium is neutron capture. It can induce fission, especially in U-235, but absorption is not always followed by splitting; it may instead produce a heavier isotope. It is not the light-nucleus fusion process asked about.'
  },
  points: [
    'Fusion combines nuclei; energy release requires products that are more tightly bound overall.',
    'The Sun\'s energy comes from reactions that ultimately convert hydrogen into helium.',
    'In thermal fusion, high temperature helps nuclei approach despite their electrostatic repulsion.',
    'Some important light-nucleus fusion reactions release more energy per unit fuel mass than uranium fission; this is a comparison of particular reactions, not a definition of fusion.',
    'Fission and fusion energy release can both be understood through changes in nuclear binding energy and mass-energy.'
  ],
  bottom: 'Suitable fusion reactions combine light nuclei into more tightly bound products and release energy; hydrogen fusion powers the Sun.',
  gone: ['Neutron absorption by uranium triggers fission, not fusion.',
         'It releases far less energy than fusion and does not combine nuclei.',
         'Fusion produces more energy per unit mass than fission but requires extremely high temperatures to overcome electrostatic repulsion.',
         'which is why it is such an attractive potential energy source']
},

{ q: 'Q53', id: 'chem-174', key: 'D', expectPoints: 5,
  main: [
    'Binding energy per nucleon reaches a broad maximum in the iron-nickel region, at about 8.8 MeV per nucleon. Fe-56 lies close to this peak, so iron is the best answer among the listed choices. Ni-62, not Fe-56, has the highest binding energy per nucleon. Light-nucleus fusion and heavy-nucleus fission can release energy when they lead to more tightly bound products.',
    'Massive stars can build iron-group cores through successive burning stages. Further fusion beyond this region does not provide the sustained net energy that supported the earlier stages.'
  ],
  feedback: {
    A: 'Hydrogen-1 contains a single proton, so there are no separate nucleons bound together within that nucleus. Its nuclear binding energy is zero, well below the iron-nickel region.',
    B: 'Helium-4 is tightly bound for a light nucleus, at about 7.1 MeV per nucleon. That is still below the roughly 8.8 MeV per nucleon reached in the iron-nickel region.',
    C: 'Uranium has roughly 7.6 MeV of binding energy per nucleon, lower than the iron-nickel region. Fission into more tightly bound fragments can therefore release energy.'
  },
  points: [
    'The binding-energy-per-nucleon curve has a broad maximum in the iron-nickel region.',
    'Fe-56 is near that maximum; Ni-62 has the highest value per nucleon.',
    'Fission or fusion can release energy when its products are more tightly bound overall.',
    'Favorable light-nucleus fusion and heavy-nucleus fission illustrate movement toward more tightly bound products.',
    'Nuclear binding energy is the energy required to separate a nucleus into its nucleons; it corresponds to a mass defect through E = Δmc².'
  ],
  bottom: 'The peak is in the iron-nickel region. Fe-56 is the correct nearby example among these options, while Ni-62 has the highest binding energy per nucleon.',
  gone: ['making it the most stable nucleus',
         'Binding energy per nucleon peaks at iron-56, making it the most stable arrangement of nucleons.',
         'Nuclei lighter than iron release energy by fusing; nuclei heavier than iron release energy by splitting.',
         'This is why iron is the end product of stellar nucleosynthesis in massive stars.',
         'Elements lighter than iron can release energy by fusion; elements heavier than iron can release energy by fission.']
},

{ q: 'Q54', id: 'chem-175', key: 'C', expectPoints: 5,
  main: [
    'Living organisms acquire carbon from their environment. After a sample stops exchanging carbon, often at death, its remaining C-14 decays with a half-life of about 5,730 years. Measuring its C-14 content can estimate the time since that exchange stopped, provided later contamination and the initial carbon composition are accounted for. Past atmospheric C-14 levels have varied, so radiocarbon ages are calibrated rather than assuming one universally constant starting ratio. The method is commonly useful for organic material up to roughly 50,000 years old.'
  ],
  feedback: {
    A: 'A half-life of 5 million years would produce much less decay over typical archaeological timescales. C-14 instead has a half-life of about 5,730 years, appropriate for studying relatively recent carbon-containing material.',
    D: 'C-14 forms in the atmosphere and enters the carbon cycle, including living organisms. It is not confined to rocks or minerals. Radiocarbon dating is mainly associated with organic remains, but it can also be applied to some inorganic carbon, such as dissolved carbon in groundwater, with suitable corrections.'
  },
  points: [
    'Living organisms acquire carbon with an isotopic composition related to their environmental carbon source.',
    'Once exchange stops, the remaining C-14 decreases by radioactive decay if the sample stays closed to later carbon exchange.',
    'Dating requires an estimate of the initial C-14 composition and calibration for its past variation.',
    'A common useful range for dating organic remains extends to roughly 50,000 years.',
    'Radiocarbon is not a universal clock for rock formation; specialized applications to inorganic carbon also exist.'
  ],
  bottom: 'C-14 dating estimates time since carbon exchange stopped, using radioactive decay, an appropriate starting composition and calibration.',
  gone: ['maintaining a constant C-14/C-12 ratio',
         'holds a roughly constant C-14 to C-12 ratio',
         'It only works on once-living material',
         'Because dating depends on an organism exchanging carbon and then ceasing to do so at death, the method applies to once-living material rather than to rocks.'],
  keep: ['C-14 is radioactive - that is the entire basis of the method.']
},

{ q: 'Q55', id: 'chem-176', key: 'B', expectPoints: 5,
  stem: 'The activity of a single radioactive isotope falls from 800 Bq to 100 Bq in 30 minutes. What is its half-life?',
  pointEdits: [
    [4, 'Use the final-to-initial activity ratio together with elapsed time. No sample mass is needed, but both activity readings are needed unless their ratio is already supplied.']
  ],
  gone: ['the actual initial activity is not needed to find the half-life'],
  keep: ['Activity ratio: 100/800 = 1/8 = (1/2)<sup>n</sup>, so n = 3 half-lives.',
         'Bottom Line: Activity decreases by half each half-life; use the ratio of final to initial activity to find the number of half-lives elapsed.']
},

{ q: 'Q56', id: 'chem-177', key: 'B', unlettered: true,
  main: [
    'The allowed values are n = 1, 2, 3, …; integer l = 0 to n−1; integer mₗ = −l to +l; and mₛ = +½ or −½. In option B, n = 3 permits l = 2, mₗ = −1 lies within −2 to +2, and mₛ = −½ is allowed. It is a valid set for an electron in a 3d orbital.'
  ],
  feedback: {
    A: 'For n = 2, l can only be 0 or 1. The proposed l = 2 is therefore invalid even though its mₗ and mₛ values would be allowed for an l = 2 subshell.',
    C: 'For n = 1, the only allowed l value is 0. A 1p subshell with l = 1 does not exist, so this set is invalid.'
  },
  points: [
    'n is a positive integer and l is an integer from 0 through n−1.',
    'For each l, mₗ takes the 2l+1 integer values from −l through +l; mₛ is ±½.',
    'The set n = 3, l = 2, mₗ = −1, mₛ = −½ satisfies every restriction.'
  ],
  gone: ['Option A: n=2, l=2 is invalid because l must be less than n.',
         'Option B satisfies all rules'],
  keep: ['The magnetic quantum number mₗ must be in the range −l to +l.',
         'Bottom Line: The angular momentum quantum number l must be less than the principal quantum number n, and mₗ must be between −l and +l.']
},

{ q: 'Q57', id: 'chem-178', key: 'C', unlettered: true,
  edits: [
    ['By <strong>Hund\'s rule</strong>, electrons fill each orbital singly before pairing up.',
     'By <strong>Hund\'s rule</strong>, electrons occupy each of the three equal-energy 2p orbitals singly before pairing up.']
  ],
  points: [
    'Ground-state nitrogen has configuration 1s² 2s² 2p³.',
    'The three equal-energy 2p orbitals each receive one electron with parallel spins before pairing.',
    'Nitrogen has three unpaired electrons, although it has five valence electrons in total.'
  ],
  gone: ['electrons fill each orbital singly before pairing up'],
  keep: ['Bottom Line: Hund\'s rule states that electrons occupy degenerate orbitals singly with parallel spins before any pairing occurs.']
},

{ q: 'Q58', id: 'chem-179', key: 'D', unlettered: true,
  edits: [
    ['and decreases going <strong>across a period</strong> (greater nuclear charge pulls electrons closer).',
     'and generally decreases going <strong>across a period</strong>, as the increasing effective nuclear charge draws the outer electrons closer.']
  ],
  feedback: {
    A: 'Na and K are in Group 1, but K has its outer electron in the next principal shell. K is therefore larger than Na in this comparison.',
    B: 'Mg is in the same period as Na and is smaller because its valence electrons experience a greater effective nuclear attraction. K also has an additional principal shell, making it the largest listed atom.',
    C: 'Al is farther across Period 3 than Na and Mg and is smaller in this comparison. K lies in Period 4, Group 1, with a larger outer-electron distribution.'
  },
  points: [
    'Moving down Group 1 adds an occupied principal shell, making K larger than Na.',
    'Across Period 3, the listed radii decrease from Na to Mg to Al.',
    'The resulting order is K > Na > Mg > Al, so K is largest.'
  ],
  gone: ['Na, mg, and al are all in period 3, with atomic radius decreasing in that order: na &gt; mg &gt; al.'],
  keep: ['Na, Mg, and Al are all in Period 3, with atomic radius decreasing in that order: Na &gt; Mg &gt; Al.',
         'Bottom Line: Atomic radius increases down a group due to additional electron shells and decreases across a period due to increasing effective nuclear charge.']
},

{ q: 'Q59', id: 'chem-180', key: 'C', unlettered: true,
  feedback: {
    A: 'Both are chlorine, so both have atomic number 17 and 17 protons. Changing the proton number would change the element, not merely its isotope.',
    B: 'Neutral atoms of both isotopes have 17 electrons. The different mass numbers come from neutron counts, not from changing the neutral-atom electron count.',
    D: 'Both neutral isotopes have the same ground-state electron configuration and seven valence electrons, so their chemical behavior is very similar. Their different masses can nevertheless produce isotope effects, such as small differences in reaction rates; their chemistry is not required to be exactly identical.'
  },
  points: [
    'Isotopes have the same proton number but different neutron numbers.',
    'Cl-35 has 18 neutrons and Cl-37 has 20, since both have 17 protons.',
    'Their neutral electron configurations match; differing masses can still lead to isotope effects.'
  ],
  bottom: 'Cl-35 and Cl-37 differ in neutron number: 18 versus 20. They have the same proton number and very similar chemical behavior.',
  gone: ['Their differences (mass, nuclear stability) are physical, not chemical.',
         'they exhibit essentially identical chemical behavior'],
  keep: ['17 protons and 35−17 = 18 neutrons']
},

{ q: 'Q60', id: 'chem-181', key: 'B', unlettered: true,
  feedback: {
    D: 'Nine is the number of orbitals in the n = 3 shell: n² = 9. Each orbital can hold two electrons with opposite spin, so the maximum is 2 × 9 = 18 electrons.'
  },
  points: [
    'A shell with principal quantum number n has n² orbitals and capacity 2n² electrons.',
    'The n = 3 shell contains 3s, 3p and 3d, with capacities 2, 6 and 10.',
    'These add to 18 electrons; shell capacity is different from the order in which subshells are filled.'
  ],
  bottom: 'The n = 3 shell holds at most 18 electrons: 2 in 3s, 6 in 3p and 10 in 3d.',
  gone: ['This might come from n² = 9, forgetting to multiply by 2.',
         'distributed among s, p, d, and f subshells'],
  keep: ['For n=3: 2(3)² = 2 × 9 = <strong>18 electrons</strong>.',
         'This is the maximum for the fourth shell (n=4)']
}

];
