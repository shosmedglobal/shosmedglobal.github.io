/** Chemistry review batch 4, specs for display Q11-Q20 (chem-192 .. chem-201). */
'use strict';
const TABLE = '\u0000TABLE\u0000';

module.exports = [

  { q: 'Q11', id: 'chem-192', key: 'C', unlettered: true,
    stem: 'In the hydrogen-like atomic-orbital model, what is the total number of radial and angular nodes in a 3p orbital?',
    edits: [
      ['These nodes are further divided: angular (or planar) nodes = l, and radial (or spherical) nodes = n − l − 1. For 3p: l=1, so there is 1 angular node and 3−1−1 = 1 radial node, totaling 2 nodes.',
       'For a 3p orbital, n = 3 and l = 1. Radial nodes = n − l − 1 = 1, angular nodes = l = 1, and the total is n − 1 = 2. The angular node of a usual real p orbital is a plane, but that does not make every angular node in every subshell planar.']
    ],
    feedback: {
      B: 'One is the number of radial nodes, and also the number of angular nodes, in a 3p orbital. The question asks for their total, which is 1 + 1 = 2.'
    },
    points: [
      'For a 3p orbital, n = 3 and l = 1.',
      'Radial nodes = n − l − 1 = 1.',
      'Angular nodes = l = 1, so the total is two.'
    ],
    bottom: 'In the hydrogen-like orbital model, total nodes = n − 1. A 3p orbital has one radial node and one angular node, giving two in total.',
    gone: ['angular (or planar) nodes = l'],
    keep: [
      'Only the 1s orbital has zero nodes.',
      'Three total nodes would apply to an orbital with n = 4'
    ] },

  { q: 'Q12', id: 'chem-193', key: 'B', unlettered: true,
    feedback: {
      A: '¹⁴C and ¹⁴N have the same mass number but different atomic numbers: carbon has six protons and nitrogen has seven. They are isobars, not isotopes of one element.',
      C: '²³Na has 11 protons and ²⁴Mg has 12. Although each has 12 neutrons, their different proton numbers make them different elements, not isotopes of one element.',
      D: '⁴⁰Ar and ⁴⁰Ca share mass number 40 but have different proton numbers, 18 and 20. They are isobars, not isotopes of one element.'
    },
    points: [
      'Isotopes of one element share a proton number but differ in neutron number.',
      '¹⁶O and ¹⁸O each have eight protons, with eight and ten neutrons respectively.',
      'Equal mass numbers alone do not establish isotopes; different elements can have the same mass number.'
    ],
    gone: ['potassium-argon dating'],
    keep: ['¹⁶O and ¹⁸O are both oxygen atoms (Z=8).'] },

  { q: 'Q13', id: 'chem-194', key: 'C', unlettered: true,
    stem: 'Which listed element has the highest electronegativity on the Pauling scale?',
    main: [
      'Electronegativity describes an atom\'s attraction for the electrons it shares in a bond. On the Pauling scale it generally increases across a period and generally decreases down a group, and <strong>fluorine</strong> is the highest of all the elements at about 4.0.',
      TABLE
    ],
    feedback: {
      A: 'Oxygen is highly electronegative, about 3.4 on the Pauling scale, but fluorine is higher at about 4.0.',
      B: 'Nitrogen has a Pauling electronegativity of about 3.0. It attracts shared electrons strongly, but less strongly than fluorine.'
    },
    points: [
      'Electronegativity describes an atom\'s attraction for shared bonding electrons.',
      'Fluorine is highest on the Pauling scale, at about 4.0.',
      'Electronegativity and electron affinity are different properties and need not have the same highest-ranked element.'
    ],
    bottom: 'Fluorine has the highest Pauling electronegativity, about 4.0. Electronegativity concerns shared electrons in a bond, not the energy change when an isolated atom gains an electron.',
    gone: [
      'Electronegativity increases going <strong>up and to the right</strong>',
      'located in the top-right corner of the reactive elements'
    ],
    keep: [
      '<tr><td>Fluorine</td><td>4.0</td></tr>',
      'Chlorine has an electronegativity of about 3.16'
    ] },

  { q: 'Q14', id: 'chem-195', key: 'C', unlettered: true,
    stem: 'For main-group elements, which property generally increases down a group?',
    options: [[3, 'Energy released on electron attachment']],
    edits: [
      ['<p>As you move <strong>down a group</strong>, the following trends are observed:</p>',
       '<p>For main-group elements, the following tendencies are generally observed <strong>down a group</strong>:</p>'],
      ['<p>Metallic character increases down a group because valence electrons are farther from the nucleus and more easily lost, a key property of metals.</p>',
       '<p>Metallic character generally increases down a main group because valence electrons lie farther from the nucleus and are more shielded, so an outer electron is easier to lose. Trends of this kind are useful generalizations rather than exceptionless rules.</p>']
    ],
    tableEdits: [
      ['<tr><td>Atomic radius</td><td>Increases</td></tr>', '<tr><td>Atomic radius</td><td>Generally increases</td></tr>'],
      ['<tr><td>Metallic character</td><td>Increases</td></tr>', '<tr><td>Metallic character</td><td>Generally increases</td></tr>'],
      ['<tr><td>Ionization energy</td><td>Decreases</td></tr>', '<tr><td>Ionization energy</td><td>Generally decreases</td></tr>'],
      ['<tr><td>Electronegativity</td><td>Decreases</td></tr>', '<tr><td>Electronegativity</td><td>Generally decreases</td></tr>'],
      ['<tr><td>Electron affinity</td><td>Generally decreases</td></tr>', '<tr><td>Energy released on electron attachment</td><td>Irregular; not a reliable simple down-group trend</td></tr>']
    ],
    feedback: {
      A: 'First ionization energy generally decreases down a main group because the outer electron is farther from the nucleus and more shielded. This is the opposite of the increase asked about.',
      B: 'Electronegativity generally decreases down a main group. An atom\'s attraction for shared bonding electrons becomes weaker as its valence shell lies farther from the nucleus.',
      D: 'The energy released when an isolated atom gains an electron has an irregular pattern, with important exceptions. A general increase down a main group is not the reliable trend tested here.'
    },
    points: [
      'Down a main group, valence electrons generally lie farther from the nucleus and experience more shielding.',
      'Easier loss of outer electrons is associated with greater metallic character.',
      'Periodic trends are useful generalizations, not rules without exceptions.'
    ],
    bottom: 'Metallic character generally increases down a main group as outer electrons become easier to remove. Electron attachment has more exceptions and should not be treated as a simple universal trend.',
    gone: [
      '<td>Electron affinity</td>',
      'Chlorine actually has a more negative electron affinity than fluorine due to electron-electron repulsion',
      'Metallic character increases down a group as valence electrons are held less tightly'
    ],
    keep: ['<td>Energy released on electron attachment</td><td>Irregular; not a reliable simple down-group trend</td>'] },

  { q: 'Q15', id: 'chem-196', key: 'D', unlettered: true,
    edits: [
      ['<p>Noble gases have the highest ionization energies in their respective periods because they have completely filled electron shells, which are exceptionally stable. Among the options, neon (Ne) is a noble gas at the end of Period 2 and has the highest first ionization energy.</p>',
       '<p>Among the listed Period 2 elements, neon has the highest first ionization energy. Its filled 2s² 2p⁶ valence shell and large effective nuclear charge make an electron hard to remove.</p>'],
      ['The completely filled outer shell of a noble gas represents the maximum ionization energy for any given period. Ne requires the most energy to remove an electron among Period 2 elements.',
       'Among the listed Period 2 elements, neon\'s filled outer shell gives it the highest first ionization energy, so Ne requires the most energy to remove an electron.']
    ],
    feedback: {
      A: 'Lithium\'s outer electron occupies 2s and is relatively easy to remove. Removing it leaves the helium configuration, so lithium\'s first ionization energy is much lower than neon\'s.'
    },
    points: [
      'First ionization energy is the energy needed to remove one electron from a gaseous neutral atom.',
      'Neon has the highest first ionization energy among Li, Be, N and Ne.',
      'The general across-period increase has exceptions, including Be/B and N/O.'
    ],
    bottom: 'Neon has the highest first ionization energy among the listed Period 2 elements. Its filled valence shell and strong attraction for its outer electrons make electron removal difficult.',
    gone: [
      'Noble gases have the highest ionization energies in their respective periods',
      'represents the maximum ionization energy for any given period',
      'Noble gases have very high ionization energies due to their stable, fully filled electron configurations'
    ],
    keep: [
      'Beryllium has a higher ionization energy than lithium due to its greater nuclear charge',
      'there are minor exceptions (Be &gt; B and N &gt; O)'
    ] },

  { q: 'Q16', id: 'chem-197', key: 'C', unlettered: true,
    edits: [
      ['<p>Atomic radius <strong>decreases across a period</strong> from left to right. This is because each successive element has one more proton in the nucleus, increasing the effective nuclear charge, which pulls the electron cloud closer.</p>',
       '<p>Atomic radius <strong>generally decreases across a period</strong> from left to right. Each successive element has one more proton, and the added electrons enter the same main shell, so the increase in nuclear charge is not fully offset by shielding. The effective nuclear attraction therefore grows and pulls the electron cloud closer.</p>']
    ],
    feedback: {
      A: 'Na, Mg and Al all have their outer electrons in the third shell. Sodium has the weakest effective nuclear attraction of these three and the largest atomic radius.',
      B: 'Magnesium is smaller than sodium but larger than aluminum in this comparison. Aluminum\'s greater effective nuclear attraction pulls its outer electron cloud more tightly.',
      D: 'Sharing a principal shell does not give atoms identical sizes. In this series, increasing effective nuclear attraction gives the order Na &gt; Mg &gt; Al.'
    },
    points: [
      'Na, Mg and Al have valence electrons in the n = 3 shell.',
      'Increasing nuclear charge across this series is not completely offset by electron shielding.',
      'Aluminum is the smallest of these three atoms.'
    ],
    bottom: 'For Na, Mg and Al, the atomic-radius order is Na &gt; Mg &gt; Al. Increasing effective nuclear attraction across this part of Period 3 contracts the electron cloud.',
    gone: [
      'This produces a clear decrease in atomic radius across a period.',
      'Across a period, increasing nuclear charge draws electrons closer, reducing atomic radius from left to right.'
    ],
    keep: ['Al has the highest nuclear charge of the three and therefore the smallest atomic radius: Na &gt; Mg &gt; Al.'] },

  { q: 'Q17', id: 'chem-198', key: 'D', unlettered: true,
    stem: 'For neutral ground-state atoms of main-group elements in the same group, excluding helium, which number is shared?',
    main: ['Main-group elements in the same group have the same number of <strong>valence electrons</strong>, which helps explain their similar chemical behavior. For example, Group 1 atoms have one valence electron and Group 17 atoms have seven. Helium is a special case: it has two valence electrons, whereas the other Group 18 elements have eight. The simple rule should not be applied without qualification to all transition elements.'],
    feedback: {
      A: 'Neutron number depends on the isotope and is not fixed by an element\'s group. Even isotopes of one element have different neutron numbers.',
      B: 'Elements farther down a group have additional occupied electron shells. Shared group membership does not mean a shared number of shells.',
      C: 'A neutral atom\'s total electron number equals its atomic number. Different elements in a group have different atomic numbers and therefore different total electron counts.'
    },
    points: [
      'Main-group elements in the same group usually share a valence-electron count.',
      'Group 1 atoms have one valence electron; Group 17 atoms have seven.',
      'Helium has two valence electrons, unlike the eight in the other Group 18 atoms.'
    ],
    bottom: 'The same-group valence-electron rule applies to neutral main-group atoms, with helium as the familiar Group 18 exception. Similar valence patterns help explain similar, not identical, chemistry.',
    gone: [
      'Group IA elements (Li, Na, K, Rb, Cs) all have 1 valence electron',
      'Elements in the same group do NOT have the same number of electron shells',
      'Elements in the same group do not have the same number of electron shells',
      'which determines their chemical behavior'
    ] },

  { q: 'Q18', id: 'chem-199', key: 'B', unlettered: true,
    edits: [
      ['<p><strong>Metalloids</strong> (semimetals) are elements that have properties intermediate between metals and nonmetals. They are located along the staircase line in the periodic table.</p>',
       '<p><strong>Metalloids</strong> are elements with a combination of the properties associated with metals and with nonmetals. They are found along the staircase boundary between metals and nonmetals in the periodic table.</p>'],
      ['<p>Silicon (Si) is a well-known metalloid. It has a metallic luster but is a poor conductor of electricity at room temperature (semiconductor). Aluminum is a metal (despite being close to the line), while phosphorus and sulfur are nonmetals.</p>',
       '<p>Silicon (Si) is a well-known metalloid. It has a metallic luster but conducts electricity far less readily than a metal, which makes it a semiconductor; its conductivity can be changed by temperature or by added impurities. Aluminum is a metal, while phosphorus and sulfur are nonmetals.</p>']
    ],
    feedback: {
      A: 'Aluminum is a metal. Its conductivity, metallic bonding and ability to form positive ions distinguish it from the metalloid silicon.',
      C: 'Phosphorus is normally classified as a nonmetal, not a metalloid. Being near the metal/nonmetal boundary does not by itself make every element there a metalloid.',
      D: 'Sulfur is a nonmetal. It does not have the characteristic semiconductor behavior used to identify silicon in this question.'
    },
    points: [
      'Metalloids have a combination of properties associated with metals and nonmetals.',
      'Silicon is a familiar metalloid and semiconductor.',
      'Aluminum is a metal, whereas phosphorus and sulfur are classified as nonmetals.'
    ],
    bottom: 'Silicon is a metalloid and an important semiconductor. It has a combination of properties that differs from both typical metals and typical nonmetals.',
    gone: [
      '(semimetals) are elements that have properties intermediate',
      'Aluminum is a metal (despite being close to the line), while phosphorus and sulfur are nonmetals.',
      'Metalloids lie along the metal-nonmetal boundary in the periodic table and have intermediate properties.'
    ],
    keep: ['Other metalloids include boron (B), germanium (Ge), arsenic (As), antimony (Sb), and tellurium (Te).'] },

  { q: 'Q19', id: 'chem-200', key: 'C', unlettered: true,
    stem: 'For electron attachment X(g) + e− → X−(g), take the energy change as negative when energy is released. Across the main-group elements, this energy change generally becomes more negative when moving:',
    options: [[3, 'from Group 17 to Group 18']],
    main: ['Using the sign convention in the question, a more negative value means that electron attachment releases more energy. Across much of a main-group period, attachment becomes more favorable toward the halogens. This is a general pattern with important exceptions, especially for filled or half-filled subshells and noble gases. Chlorine releases more energy on electron attachment than fluorine, despite fluorine\'s higher electronegativity.'],
    feedback: {
      A: 'Electron-attachment energies do not follow a simple increasingly negative pattern down a group. Changes in size, shielding and electron repulsion produce important exceptions.',
      B: 'The broad across-period tendency toward the halogens runs from left to right. Moving right to left is not the direction of the general trend asked about.',
      D: 'Group 18 atoms already have closed valence shells. Adding an electron is much less favorable than for the neighboring halogens, so this step does not make the attachment energy more negative.'
    },
    points: [
      'Always check the sign convention used for electron affinity or electron-attachment energy.',
      'Across much of a main-group period, electron attachment becomes more favorable toward the halogens.',
      'Chlorine releases more energy than fluorine on electron attachment, showing that electronegativity and electron affinity are not identical rankings.'
    ],
    bottom: 'With negative values defined as energy release, electron attachment generally becomes more favorable toward the halogens across a period. The pattern has significant exceptions and is not a strict step-by-step rule.',
    gone: [
      'with chlorine having the most negative of all elements',
      'From top to bottom in any column',
      'Halogens have the most negative electron affinities.'
    ],
    keep: ['from Group 17 to Group 18'] },

  { q: 'Q20', id: 'chem-201', key: 'B', unlettered: true,
    edits: [
      ['<p>Elements in the <strong>same group</strong> have the most similar chemical properties because they share the same number of valence electrons and similar electron configurations.</p>',
       '<p>Main-group elements in the <strong>same group</strong> have the most similar chemical properties because they share the same number of valence electrons and similar outer-electron configurations. Similar valence configurations do not imply identical physical properties or reactivity.</p>']
    ],
    feedback: {
      A: 'Sodium is a Group 1 metal with one valence electron, whereas chlorine is a Group 17 nonmetal with seven. Their usual chemical behavior is very different.',
      C: 'Nitrogen and oxygen are neighboring elements but belong to different main groups. Nitrogen has five valence electrons and oxygen has six.',
      D: 'Lithium and beryllium share a period, not a group. Lithium has one valence electron and beryllium has two, giving different usual bonding and ion-forming patterns.'
    },
    points: [
      'Oxygen and sulfur belong to Group 16 and have six valence electrons.',
      'Similar outer-electron patterns often produce analogous chemical behavior, such as the formulas H₂O and H₂S.',
      'Shared group membership does not mean identical physical properties or reaction rates.'
    ],
    bottom: 'Oxygen and sulfur are Group 16 main-group elements with six valence electrons. This gives useful similarities in chemistry, although their compounds and reactivities are not identical.',
    gone: [
      '<strong>C. N and O:</strong> N and O are neighbors in the same period.',
      'Elements in the same group share similar chemical properties due to having the same number of valence electrons.'
    ],
    keep: ['Both have 6 valence electrons, form −2 ions, and make similar compounds (e.g., H₂O and H₂S).'] }

];
