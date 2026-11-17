/** Chemistry review batch 4, specs for display Q21-Q30 (chem-202 .. chem-211). */
'use strict';
const TABLE = '\u0000TABLE\u0000';

module.exports = [

  { q: 'Q21', id: 'chem-202', key: 'B', unlettered: true,
    edits: [
      ['Option C lists them in decreasing order.',
       'Option C is not an increasing sequence. For those four atoms, the correct increasing order is C &lt; O &lt; N &lt; F. Nitrogen has a higher first ionization energy than oxygen, an important exception to the broad across-period trend.']
    ],
    feedback: {
      C: 'The correct increasing order for these atoms is C &lt; O &lt; N &lt; F. Oxygen has a paired electron in its 2p⁴ configuration; removing that electron reduces electron repulsion. Nitrogen\'s 2p³ configuration is half-filled, so removing an electron requires more energy than it does from oxygen.'
    },
    points: [
      'First ionization energy decreases from Li to Na to K as the outer electron becomes farther from the nucleus and more shielded.',
      'Helium holds its electrons especially strongly, so K &lt; Na &lt; Li &lt; He is correct.',
      'Subshell occupancy matters: Mg has a higher first ionization energy than Al, and N has a higher value than O.'
    ],
    bottom: 'K &lt; Na &lt; Li &lt; He is an increasing first-ionization-energy sequence. Across-period trends have exceptions: Mg &gt; Al and N &gt; O.',
    gone: [
      'Option C lists them in decreasing order.',
      'ionization energy generally increases left to right (C &lt; N &lt; O &lt; F)',
      'Minor exceptions occur at half-filled and fully filled subshells.'
    ],
    keep: [
      'The actual order in Period 3 is Na &lt; Al &lt; Mg &lt; Si &lt; P',
      'The correct order within a group would be Cl > Br > I > At.'
    ] },

  { q: 'Q22', id: 'chem-203', key: 'C', unlettered: true,
    main: [
      'Transition elements are associated with the <strong>d-block</strong> in the center of the periodic table. In the strict definition, a transition element has an incomplete d subshell in its atom or can form a cation with an incomplete d subshell. Thus \'d-block element\' and \'transition element\' are not perfectly interchangeable terms. For example, zinc and its usual Zn²⁺ ion both have filled d¹⁰ subshells. Variable oxidation states and colored complexes are common among transition elements, but not universal properties of every element or compound.',
      TABLE
    ],
    tableHtml: "<table class='exp-table'><tr><th>Block</th><th>Location/examples</th><th>Useful distinction</th></tr>" +
      '<tr><td>s</td><td>Groups 1 and 2, plus helium</td><td>Includes the nonmetals hydrogen and helium as well as metals</td></tr>' +
      '<tr><td>p</td><td>Groups 13-18, except helium</td><td>Contains metals, metalloids and nonmetals</td></tr>' +
      '<tr><td>d</td><td>Central block, Groups 3-12</td><td>Contains the transition elements; strict definitions require attention to d occupancy</td></tr>' +
      '<tr><td>f</td><td>Rows associated with the lanthanides and actinides</td><td>Commonly called the inner-transition region</td></tr></table>',
    feedback: {
      A: 'The s-block includes Groups 1 and 2 and helium. It is not the block containing the transition metals, and it is not made entirely of reactive metals because hydrogen and helium are nonmetals.',
      B: 'The p-block contains Groups 13-18 except helium. It includes many familiar nonmetals, metalloids and some metals, rather than the central transition-metal block.',
      D: 'The f-block region is associated with the lanthanides and actinides, often called inner-transition elements. The question asks about the transition metals in the central d-block. All actinides are radioactive.'
    },
    points: [
      'The d-block occupies the central part of the periodic table.',
      'A transition element has an incomplete d subshell in its atom or can form a cation with one.',
      'Block assignment follows electron configuration: helium is in the s-block even though it belongs to Group 18.'
    ],
    bottom: 'The transition elements are found in the d-block. The strict definition involves an incomplete d subshell in the atom or a cation, so the two labels are not exact synonyms.',
    gone: [
      'rare earth elements',
      '<td>IIIB–IIB (3–12)</td>',
      'Lanthanides & Actinides',
      'The periodic table is divided into blocks based on which subshell is being filled',
      'the ability to form colored compounds and complexes'
    ] },

  { q: 'Q23', id: 'chem-204', key: 'C', unlettered: true,
    stem: 'Which listed element, in its usual elemental form, is the strongest oxidizing agent under standard conditions?',
    main: ['Fluorine in its elemental form, F₂, is an exceptionally strong oxidizing agent. An oxidizing agent accepts electrons from another substance. This question compares a specific kind of reactivity, oxidizing ability, rather than claiming that one simple periodic trend ranks every possible reaction.'],
    feedback: {
      A: 'Elemental nitrogen is N₂. Its strong N≡N bond makes many reactions slow under ordinary conditions; nitrogen\'s position in the periodic table alone does not make it the strongest oxidizing agent.',
      B: 'Elemental oxygen, O₂, is an important oxidizing agent, but F₂ is the stronger oxidizing agent in this comparison.',
      D: 'Neon has a closed valence shell and is very unreactive under ordinary conditions. It does not readily accept electrons as a strong oxidizing agent.'
    },
    points: [
      'An oxidizing agent accepts electrons and causes another substance to be oxidized.',
      'Elemental fluorine is F₂ and is an exceptionally strong oxidizing agent.',
      'Reaction behavior also depends on bonding and conditions; the strong N≡N bond helps explain N₂\'s limited reactivity in many ordinary situations.'
    ],
    bottom: 'F₂ is the strongest oxidizing agent among these choices. Oxidizing ability is a specific property; reactivity without a named reaction is too broad for a universal ranking.',
    gone: [
      'by lightning, bacteria, or industrial processes',
      'Nonmetal reactivity increases <strong>up and to the right</strong>',
      'Fluorine is the most reactive nonmetal due to its extreme electronegativity and small size.',
      'It reacts with nearly all elements, including some noble gases.'
    ] },

  { q: 'Q24', id: 'chem-205', key: 'C', unlettered: true,
    stem: 'Which listed element is an essential trace element in humans?',
    main: ['Iron is essential in small amounts compared with major body elements such as carbon, oxygen and calcium. It is part of heme in hemoglobin and also supports electron-transfer proteins such as cytochromes. \'Trace\' refers to the small quantity required or present, not to a small biological importance. Not every element detected in trace amounts is necessarily an essential nutrient.'],
    feedback: {
      A: 'Carbon is essential, but it is a major constituent of organic molecules throughout the body. It is not classified as a trace element in this comparison.',
      B: 'Calcium is essential for bones, signaling and other functions, but it is required in much larger amounts than trace elements such as iron.',
      D: 'Oxygen is a major constituent of water and many biological molecules. Its abundance distinguishes it from an essential trace element such as iron.'
    },
    points: [
      'Essential trace elements are needed in small quantities, but their functions are important.',
      'Iron is present in hemoglobin\'s heme groups and in electron-transfer proteins.',
      'Carbon, oxygen and calcium are essential major elements rather than trace elements.'
    ],
    bottom: 'Iron is an essential trace element: only a small amount is required, but it has important roles in oxygen transport and electron transfer.',
    gone: [
      'Carbon, oxygen, and calcium are all <strong>macroelements</strong>',
      'Carbon, oxygen, and calcium are all macroelements',
      'Macroelements like C, O, N, Ca are present in larger amounts.'
    ] },

  { q: 'Q25', id: 'chem-206', key: 'B', unlettered: true,
    feedback: {
      D: 'Sodium has one stable isotope, ²³Na, but radioactive sodium isotopes also exist. Isotope count does not explain the large ionization-energy jump; removing an electron from the inner closed shell does.'
    },
    points: [
      'Neutral sodium has configuration [Ne] 3s¹.',
      'Removing the 3s electron gives Na+ with a closed neon-like shell.',
      'The second ionization removes an inner-shell electron, explaining the large energy jump.'
    ],
    bottom: 'The first electron removed from Na is the outer 3s electron. The second comes from the closed inner shell of Na+, so much more energy is required.',
    gone: [
      'it has one stable isotope, Na-23) is completely unrelated to ionization energy',
      'A large jump in successive ionization energies indicates that the next electron must be removed from a stable noble gas core.'
    ],
    keep: [
      'While it is true that sodium is a metal, simply being a metal does not explain the large jump',
      'This is actually backwards. The second electron to be removed from Na comes from a lower energy level (2p)'
    ] },

  { q: 'Q26', id: 'chem-207', key: 'C', unlettered: true,
    stem: 'Which listed halogen is liquid at 25 °C and 1 bar?',
    edits: [
      ['<p>The halogens (Group VIIA) exist in all three states of matter at room temperature:</p>',
       '<p>At 25 °C and 1 bar, the halogens listed here occur in all three states of matter:</p>'],
      ['<p>Bromine is one of only two elements that are liquid at standard conditions (the other being mercury). As you go down Group VIIA, the increasing molecular size leads to stronger London dispersion forces and higher boiling points.</p>',
       '<p>Bromine and mercury are the two elements that are liquid at 25 °C and 1 bar. Down Group VIIA, larger and more polarizable electron clouds give stronger London dispersion attractions and higher melting and boiling temperatures.</p>'],
      ['Like fluorine, its relatively low molecular mass means London dispersion forces are insufficient to make it liquid at standard conditions.',
       'Like fluorine, its relatively low molecular mass means London dispersion forces are insufficient to make it liquid at 25 °C and 1 bar.']
    ],
    tableEdits: [
      ['<th>State at room temperature</th>', '<th>State at 25 °C and 1 bar</th>']
    ],
    points: [
      'Bromine is a liquid at 25 °C and 1 bar.',
      'The listed halogens occur as diatomic molecules: F₂, Cl₂, Br₂ and I₂.',
      'Increasing polarizability down this series strengthens dispersion attractions and helps explain the changes in melting and boiling temperatures.'
    ],
    bottom: 'At 25 °C and 1 bar, F₂ and Cl₂ are gases, Br₂ is a liquid and I₂ is a solid. Larger, more polarizable electron clouds give stronger dispersion attractions in this series.',
    gone: [
      'Physical state increases (gas → liquid → solid) going down the group',
      'liquid at standard conditions',
      'Bromine is the only halogen that is liquid at room temperature.'
    ],
    keep: [
      '<tr><td>Bromine (Br₂)</td><td>Liquid (reddish-brown)</td></tr>',
      'Iodine (I2) is a shiny, dark purple-black solid at room temperature'
    ] },

  { q: 'Q27', id: 'chem-208', key: 'C', unlettered: true,
    stem: 'Which listed gaseous atom releases the most energy when it gains one electron?',
    main: ['Chlorine releases the most energy among these choices when an isolated gaseous atom gains an electron. Cl changes from [Ne] 3s² 3p⁵ to the closed-shell configuration [Ne] 3s² 3p⁶ in Cl−. Electron attachment must be evaluated for the stated gaseous atom; it is not the same question as which ion is usually formed in a compound.'],
    feedback: {
      A: 'A neutral sodium atom has configuration [Ne] 3s¹. An added electron enters the same 3s subshell, giving [Ne] 3s², not a new subshell. This attachment can release energy, but much less than electron attachment to chlorine.',
      B: 'Phosphorus has a half-filled 3p³ subshell. Adding an electron produces 3p⁴ and requires pairing within a p orbital, making the attachment less favorable than completing chlorine\'s 3p subshell.',
      D: 'Argon already has a closed valence shell. An additional electron would have to occupy a higher shell, and formation of a stable ground-state Ar− ion by simple attachment is unfavorable. Do not interpret a rounded or omitted tabulated value as a literal zero-energy process.'
    },
    points: [
      'Chlorine gains an electron into 3p, completing its valence shell.',
      'Electron attachment to sodium gives 3s², not a new subshell.',
      'Energy changes for isolated gaseous atoms must be distinguished from the ions favored in compounds.'
    ],
    bottom: 'Cl releases the most energy on electron attachment among Na, P, Cl and Ar. For sodium, an added electron enters 3s; for argon, the closed valence shell makes attachment unfavorable.',
    gone: [
      'adding an electron would begin filling a new subshell',
      'has essentially zero electron affinity',
      'Noble gases have near-zero electron affinity due to their stable, filled configurations.',
      'sodium strongly prefers to lose its single 3s electron to form Na+'
    ] },

  { q: 'Q28', id: 'chem-209', key: 'B', unlettered: true,
    stem: 'Which compound forms a predominantly ionic lattice in the solid state?',
    main: ['Solid NaCl consists of an extended arrangement of Na+ and Cl− ions held together mainly by <strong>electrostatic attraction</strong>. Electron transfer is a useful way to account for the ions, but the ionic bond itself is the attraction between opposite charges. Bonding has degrees of ionic and covalent character, so \'only ionic bonds\' is too absolute. A metal plus a nonmetal is a useful introductory pattern, not a requirement for every ionic compound.'],
    feedback: {
      A: 'Water consists of molecules with polar covalent O–H bonds. Hydrogen bonding between water molecules does not turn the substance into a NaCl-like ionic lattice.',
      C: 'Carbon dioxide consists of molecules with covalent C=O bonds. The whole molecule is nonpolar because its equal bond dipoles cancel in the linear geometry.',
      D: 'Ammonia consists of molecules with polar covalent N–H bonds. Its classification follows its bonding and structure, not a universal rule that ionic substances must contain a metal.'
    },
    points: [
      'Ionic bonding is electrostatic attraction between oppositely charged ions.',
      'Solid NaCl contains an extended lattice of Na+ and Cl−, not separate NaCl molecules.',
      'Metal/nonmetal combinations are a common guide, but the actual ions and structure determine whether a solid is ionic.'
    ],
    bottom: 'NaCl forms a predominantly ionic solid: oppositely charged ions attract throughout an extended lattice. Ionic and covalent bonding are useful models, not perfectly separated categories.',
    gone: [
      'Ionic bonding requires a metal to hand electrons to a nonmetal',
      'nonpolar (<0.4), polar covalent (0.4-1.7), ionic (>1.7)',
      'Ionic bonds form between metals and nonmetals with large electronegativity differences.',
      'The metal transfers electrons to the nonmetal.'
    ] },

  { q: 'Q29', id: 'chem-210', key: 'C', unlettered: true,
    edits: [
      ['<p>The carbon in methane is <strong>sp³ hybridized</strong>: one s orbital and three p orbitals combine to form four equivalent sp³ hybrid orbitals directed toward the corners of a tetrahedron.</p>',
       '<p>The usual valence-bond description of the same geometry calls the carbon <strong>sp³ hybridized</strong>: one s orbital and three p orbitals are combined into four equivalent sp³ hybrid orbitals directed toward the corners of a tetrahedron. This is a bonding model for the observed shape, not an extra step required by VSEPR.</p>'],
      ['A linear geometry (180 degree bond angle) occurs when a central atom has two bonding regions and no lone pairs, as in CO2 or BeCl2.',
       'In the simple examples used here, a linear geometry (180 degree bond angle) arises when a central atom has two bonding regions and no lone pairs, as in CO2 or the gaseous BeCl2 monomer.']
    ],
    points: [
      'Methane\'s central carbon has four bonding electron groups and no lone pairs.',
      'VSEPR places those four groups tetrahedrally, with H–C–H angles of about 109.5°.',
      'The usual valence-bond description of carbon in methane uses sp³ hybrid orbitals.'
    ],
    gone: ['A linear geometry (180 degree bond angle) occurs when a central atom has two bonding regions'],
    keep: [
      '<p class=\'exp-key\'>Bottom Line: Four electron groups around a central atom (with no lone pairs) produce tetrahedral molecular geometry with 109.5° bond angles.</p>',
      'Trigonal pyramidal geometry occurs when there are four electron regions but one is a lone pair'
    ] },

  { q: 'Q30', id: 'chem-211', key: 'C', unlettered: true,
    feedback: {
      A: 'Water has polar O–H bonds and a bent shape. Its bond dipoles do not cancel, so the molecule has a net dipole.',
      B: 'Ammonia has a trigonal pyramidal shape. Its N–H bond dipoles do not cancel in this arrangement, so NH₃ is polar.',
      D: 'HF is a diatomic molecule with one strongly polar H–F bond. There is no second bond dipole to cancel it, so HF is polar.'
    },
    points: [
      'Molecular polarity depends on both bond polarity and molecular geometry.',
      'In linear CO₂, the two equal C=O bond dipoles cancel.',
      'The dipoles do not cancel in bent H₂O, pyramidal NH₃ or diatomic HF.'
    ],
    bottom: 'CO₂ contains polar bonds but has no net molecular dipole: the equal C=O bond dipoles point in opposite directions and cancel.',
    gone: [
      'one of the most polar common molecules',
      '5°) and nh3 (trigonal pyramidal)',
      'Hf has only one polar bond',
      'Symmetric molecules like CO₂, CCl₄, and BF₃ are nonpolar despite having polar bonds.'
    ],
    keep: ['The two C=O bond dipoles point in exactly opposite directions and cancel out, making the molecule nonpolar.'] }

];
