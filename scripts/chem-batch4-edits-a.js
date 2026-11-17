/**
 * Chemistry review batch 4, specs for display Q1-Q10 (chem-182 .. chem-191).
 *
 * All student-facing wording comes from the review. The TABLE sentinel marks
 * where the item's own table belongs when the main section is rebuilt.
 *
 * Note on conventions used throughout this pack's new text:
 *   - "<" and ">" are written as &lt; / &gt;, matching the pack's stored style;
 *   - superscript/subscript digits use the bank's Unicode characters;
 *   - main-explanation edits are listed before feedback edits, because the
 *     harness resolves each anchor against the whole explanation and rejects
 *     one that would match twice.
 */
'use strict';
const TABLE = '\u0000TABLE\u0000';

module.exports = [

  { q: 'Q1', id: 'chem-182', key: 'B', unlettered: true,
    feedback: {
      A: 'Neon has 10 electrons. A chloride ion has 17 + 1 = 18 electrons, so its configuration does not match neon.',
      C: 'Krypton has 36 electrons. Chloride has only 18 electrons and therefore matches argon, not krypton.',
      D: 'Helium has only two electrons, with configuration 1s². Chloride has 18 electrons, so it cannot have helium\'s configuration.'
    },
    points: [
      'A negative ion has more electrons than its neutral atom; Cl− has 17 + 1 = 18.',
      'Argon\'s configuration is 1s² 2s² 2p⁶ 3s² 3p⁶, also the configuration of Cl−.',
      'Species with the same number of electrons are isoelectronic, but their nuclear charges and sizes can differ.'
    ],
    bottom: 'Cl− has 18 electrons and the same electron configuration as argon. Count electrons using the atomic number and ionic charge; sharing an electron configuration does not make two species the same element.',
    gone: [
      'achieved only by H⁻ and Li⁺',
      'The isoelectronic noble gas for any ion is typically the nearest noble gas',
      'Anions gain electrons to achieve a noble gas configuration'
    ],
    keep: [
      'When it gains one electron to form Cl−, it has 18 electrons: 1s² 2s² 2p⁶ 3s² 3p⁶.',
      'The Cl− ion is said to be <strong>isoelectronic</strong> with argon.'
    ] },

  { q: 'Q2', id: 'chem-183', key: 'C', unlettered: true,
    feedback: {
      A: 'For a 3d subshell, n = 3 and l = 2. This is allowed because l can take the values 0, 1 and 2 when n = 3.',
      B: 'For a 2p subshell, n = 2 and l = 1. This is allowed because l can be 0 or 1 when n = 2.',
      D: 'For a 4f subshell, n = 4 and l = 3. This is allowed because l can range from 0 to 3 when n = 4.'
    },
    points: [
      'For a given principal quantum number n, l can range from 0 to n − 1.',
      'The labels s, p, d and f correspond to l = 0, 1, 2 and 3.',
      'A d subshell requires n ≥ 3, so 2d is impossible.'
    ],
    gone: [
      '<strong>A. 3d:</strong> All other options are valid',
      '<strong>D. 4f:</strong> All other options are valid',
      '<strong>B. 2p:</strong> For n=2, l can only be 0 or 1'
    ],
    keep: ['The d subshell first appears at n=3.'] },

  { q: 'Q3', id: 'chem-184', key: 'D', unlettered: true,
    feedback: {
      A: 'Electrons in the same orbital have the same principal quantum number n, which identifies their shell. It is their spin quantum numbers that must differ.',
      B: 'Electrons in the same orbital also share the same angular momentum quantum number l, which identifies the subshell. Different l values would place them in different subshells.'
    },
    points: [
      'An electron in an atom is described by four quantum numbers: n, l, mₗ and mₛ.',
      'Two electrons in the same orbital share n, l and mₗ.',
      'An orbital holds at most two electrons, with opposite spin quantum numbers, +½ and −½.'
    ],
    keep: ['The magnetic quantum number (mₗ) specifies which orbital within a subshell an electron occupies.'] },

  { q: 'Q4', id: 'chem-185', key: 'B', unlettered: true,
    feedback: {
      A: 'Iron has atomic number 26, so ⁵⁶Fe contains 26 protons. Its mass number 56 counts protons plus neutrons, not protons alone.',
      C: 'Manganese has atomic number 25, so ⁵⁵Mn contains 25 protons. Nickel has 28 protons and therefore has more than manganese.'
    },
    points: [
      'Atomic number Z equals the number of protons and determines the element.',
      'Mass number A equals protons plus neutrons.',
      'Nickel has 28 protons, more than the listed iron, manganese and cobalt isotopes, regardless of their mass numbers.'
    ],
    keep: [
      'Cobalt (Co) has atomic number 27, giving it 27 protons.',
      '<tr><td>⁵⁸Ni</td><td>Nickel</td><td>28</td></tr>'
    ] },

  { q: 'Q5', id: 'chem-186', key: 'B', unlettered: true,
    stem: 'What is the ground-state electron configuration of a neutral chromium atom (Z = 24)?',
    main: ['Neutral chromium has 24 electrons. Its observed ground-state configuration is [Ar] 3d⁵ 4s¹. The simple filling sequence would suggest [Ar] 3d⁴ 4s², but the 3d and 4s levels are close in energy, and interactions among the electrons favor the observed arrangement. Chromium is therefore a familiar exception to the simplest filling-rule prediction. A half-filled d subshell is a useful pattern to recognize here, not a rule that predicts every atom\'s configuration.'],
    feedback: {
      A: '[Ar] 3d⁴ 4s² is the prediction from the simplest filling sequence, but it is not chromium\'s observed ground-state configuration. Chromium has one 4s electron and five 3d electrons.',
      C: '[Ar] 3d⁶ contains 24 electrons, but the correct electron count alone does not establish the ground state. Neutral chromium\'s ground state also contains one 4s electron.',
      D: 'This configuration places an electron in 4p and does not represent chromium\'s ground state. The observed configuration is [Ar] 3d⁵ 4s¹.'
    },
    points: [
      'Neutral chromium has 24 electrons: 18 in the argon core and six outside it.',
      'Its observed ground-state configuration is [Ar] 3d⁵ 4s¹.',
      'Simple orbital-filling rules are useful guides, but some atoms have exceptions because orbital energies and electron interactions are close in balance.'
    ],
    bottom: 'Neutral chromium\'s ground state is [Ar] 3d⁵ 4s¹. Learn this observed exception to the simple filling sequence; do not apply a universal \'half-filled is always preferred\' rule.',
    gone: [
      'exchange energy associated with electrons having parallel spins',
      'outweighs the cost of leaving 4s half-filled',
      'well-known exceptions to the standard Aufbau filling order',
      'Promoting an electron to the 4p subshell requires significantly more energy',
      'achieving extra stability through half-filled or fully filled d subshells'
    ] },

  { q: 'Q6', id: 'chem-187', key: 'C', unlettered: true,
    points: [
      'An f subshell has l = 3.',
      'A subshell contains 2l + 1 orbitals, so an f subshell contains seven.',
      'Each orbital holds at most two electrons, giving an f subshell a maximum capacity of 14 electrons.'
    ],
    keep: [
      '<h4>Correct Answer: 7</h4>',
      '<tr><td>f</td><td>3</td><td>7</td><td>14</td></tr>',
      'Nine orbitals would correspond to l=4',
      '<p class=\'exp-key\'>Bottom Line: The number of orbitals in a subshell is 2l+1.'
    ] },

  { q: 'Q7', id: 'chem-188', key: 'C', unlettered: true,
    feedback: {
      A: 'Na+ has 10 electrons attracted by 11 protons. Al³⁺ also has 10 electrons but has 13 protons, so its stronger nuclear attraction produces a smaller ion.',
      B: 'Mg²⁺ has the same 10-electron configuration as Al³⁺, but only 12 protons rather than 13. It is therefore larger than Al³⁺.'
    },
    points: [
      'F−, Na+, Mg²⁺ and Al³⁺ each have 10 electrons.',
      'Within this isoelectronic series, increasing nuclear charge pulls the electron cloud more tightly.',
      'Their size order is F− &gt; Na+ &gt; Mg²⁺ &gt; Al³⁺.'
    ],
    keep: [
      'F⁻ has 10 electrons but only 9 protons',
      '<tr><td>Al³⁺</td><td>13</td><td>10</td><td>Smallest</td></tr>'
    ] },

  { q: 'Q8', id: 'chem-189', key: 'B', unlettered: true,
    feedback: {
      A: 'Silicon has 14 electrons and ground-state configuration [Ne] 3s² 3p². The additional 3p electron in the question identifies phosphorus instead.',
      C: 'Sulfur has 16 electrons and configuration [Ne] 3s² 3p⁴. The given configuration contains one fewer electron.',
      D: 'Chlorine has 17 electrons and configuration [Ne] 3s² 3p⁵. The given configuration contains only 15 electrons.'
    },
    points: [
      '[Ne] represents 10 electrons; adding 3s² 3p³ gives 15 in total.',
      'Atomic number 15 identifies phosphorus.',
      'Phosphorus has five valence electrons and belongs to Group 15, also called Group VA in older notation.'
    ],
    gone: ['Silicon (z=14) would be [ne] 3s2 3p2'],
    keep: ['The element with atomic number 15 is <strong>phosphorus (P)</strong>.'] },

  { q: 'Q9', id: 'chem-190', key: 'B', unlettered: true,
    feedback: {
      A: 'Calcium has 20 protons. An atom with mass number 39 and 20 protons would have 19 neutrons, not the 20 stated in the question.',
      C: 'Argon has 18 protons. An argon atom with mass number 39 would have 21 neutrons, which does not match the question.',
      D: 'Scandium has 21 protons. With mass number 39, it would have 18 neutrons rather than 20.'
    },
    points: [
      'Mass number equals the number of protons plus the number of neutrons.',
      'Here, Z = 39 − 20 = 19, identifying potassium.',
      'Because the atom is neutral, it also has 19 electrons.'
    ],
    gone: ['Calcium has z=20, argon has z=18, and scandium has z=21.'],
    keep: ['Given: A = 39 and N = 20, so Z = 39 − 20 = <strong>19 protons</strong>.'] },

  { q: 'Q10', id: 'chem-191', key: 'B', unlettered: true,
    stem: 'In the usual introductory Aufbau (diagonal-rule) filling sequence for neutral atoms, how are the 4s and 3d subshells ordered?',
    main: ['The usual diagonal-rule sequence places 4s before 3d: 3p → 4s → 3d → 4p. In this rule, subshells are ordered by n + l; 4s has n + l = 4, whereas 3d has n + l = 5. This is a useful introductory filling guide. It does not mean that 4s is always lower in energy than 3d in every atom or ion: the relative energies depend on the atom and its electron configuration.'],
    feedback: {
      A: 'The usual diagonal-rule sequence places 4s before 3d, not the reverse. This question asks about that introductory sequence, rather than the orbital-energy ordering in every individual atom or ion.',
      C: 'The introductory filling sequence lists 4s and then 3d as separate steps. It does not describe them as filling simultaneously.',
      D: 'In the usual sequence, 3d comes before 4p. Thus the relevant order is 4s → 3d → 4p.'
    },
    points: [
      'The diagonal rule orders subshells using n + l, with lower n first when those sums are equal.',
      'In that sequence, 4s comes before 3d, and 3d before 4p.',
      'Real orbital energies depend on the atom and its electron configuration, so the filling mnemonic has limits.'
    ],
    bottom: 'The usual introductory filling sequence is 3p → 4s → 3d → 4p. Do not turn that mnemonic into a claim that 4s is always lower in energy than 3d.',
    gone: [
      'The 4s subshell has a slightly lower energy than the 3d subshell',
      'the 4s subshell fills before 3d because it has a lower energy',
      'This is why transition metals (3d elements) come before the p-block in Period 4.'
    ] }

];
