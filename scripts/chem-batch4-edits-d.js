/** Chemistry review batch 4, specs for display Q31-Q40 (chem-212 .. chem-221). */
'use strict';
const TABLE = '\u0000TABLE\u0000';

module.exports = [

  { q: 'Q31', id: 'chem-212', key: 'C', unlettered: true,
    stem: 'Which pure substance forms strong, conventional hydrogen bonds between its molecules?',
    main: ['HF molecules form strong <strong>hydrogen bonds</strong>: a hydrogen covalently bonded to fluorine interacts with a lone pair on fluorine in another molecule. The familiar strong examples generally involve hydrogen attached to N, O or F. This is a useful introductory guide, not an exhaustive definition of every possible hydrogen bond.'],
    feedback: {
      A: 'Methane\'s C–H bonds do not provide the strongly polarized hydrogen donors needed for the conventional strong hydrogen-bond network tested here. Its intermolecular attractions are mainly dispersion forces.',
      B: 'H₂S does not form the strong intermolecular hydrogen-bond network characteristic of HF. The familiar strong-hydrogen-bond pattern uses the much more strongly polarizing atoms N, O and F.',
      D: 'Cl₂ contains no hydrogen atoms, so it cannot donate a hydrogen bond. Attractions between its nonpolar molecules are mainly dispersion forces.'
    },
    points: [
      'Familiar strong hydrogen bonds usually involve H bonded to N, O or F and a suitable electron-pair acceptor.',
      'HF molecules can act as both hydrogen-bond donors and acceptors.',
      'An intermolecular H...F hydrogen bond is distinct from the covalent H–F bond within an HF molecule.'
    ],
    bottom: 'HF forms strong intermolecular hydrogen bonds. The familiar N/O/F rule identifies the usual strong examples, without defining every possible hydrogen-bond interaction.',
    gone: [
      'specifically <strong>F, O, or N</strong>',
      'H₂S cannot form hydrogen bonds because sulfur is not electronegative enough',
      'Hydrogen bonding requires H bonded directly to F, O, or N',
      'which is not electronegative enough for hydrogen bonding'
    ] },

  { q: 'Q32', id: 'chem-213', key: 'B', unlettered: true,
    stem: 'Using the usual valence-bond model, what is the hybridization of each carbon atom in ethene (C₂H₄)?',
    main: [
      'Each carbon in ethene forms three sigma bonds: two C–H bonds and the sigma component of the C=C double bond. Three <strong>sp²</strong> hybrid orbitals describe these bonds in a roughly trigonal planar arrangement. The remaining unhybridized p orbital on each carbon overlaps sideways to form the pi component of the double bond.',
      TABLE
    ],
    feedback: {
      D: 'The sp³d label describes a five-orbital hybridization model, not the three sigma-bonding directions around each carbon in ethene. The appropriate model for ethene is sp², with a remaining p orbital used for pi bonding.'
    },
    points: [
      'A C=C double bond contains one sigma component and one pi component.',
      'Each carbon in ethene has three sigma-bonding directions, described by sp² hybridization.',
      'Sideways overlap of the remaining p orbitals forms the pi bond and restricts free rotation about C=C.'
    ],
    bottom: 'Each carbon in ethene is described as sp²: three sigma bonds lie approximately in a plane, and an unhybridized p orbital contributes to the pi bond.',
    gone: [
      'they have accessible d orbitals',
      'This expanded octet is only possible for elements in Period 3 or below',
      'Double bonds involve sp² hybridization with one σ bond and one π bond.'
    ],
    keep: [
      '<tr><td>sp²</td><td>3</td><td>Trigonal planar</td><td>C₂H₄</td></tr>',
      'sp3 hybridization occurs when a carbon forms four σ bonds with no π bonds'
    ] },

  { q: 'Q33', id: 'chem-214', key: 'C', unlettered: true,
    edits: [
      ['<p>BeCl₂ and CO₂ are both <strong>linear</strong> (180°). BF₃ is <strong>trigonal planar</strong> (120°).</p>',
       '<p>The gaseous BeCl₂ monomer and CO₂ are both <strong>linear</strong> (180°). BF₃ is <strong>trigonal planar</strong> (120°).</p>']
    ],
    feedback: {
      A: 'The gaseous BeCl₂ monomer has two bonding directions around Be and is linear in the simple VSEPR description. This does not describe the extended bonding in solid BeCl₂.',
      B: 'CO₂ has two electron-group directions around its central carbon. Each double bond counts as one group, giving a linear rather than bent molecule.',
      D: 'BF₃ has three bonding groups and no lone pair on boron in its Lewis structure. Its molecular geometry is trigonal planar, not bent.'
    },
    points: [
      'Oxygen in H₂O has two bonding pairs and two lone pairs.',
      'Four electron groups give a tetrahedral electron-group arrangement.',
      'Considering only the atom positions gives a bent molecule with an angle of about 104.5°.'
    ],
    bottom: 'Water has four electron groups around oxygen, but only two are bonds. Its electron-group arrangement is tetrahedral while its molecular shape is bent.',
    gone: [
      '<strong>A. BeCl₂:</strong> BeCl₂ and CO₂ are both linear',
      'Lone pairs reduce bond angles and change molecular geometry.'
    ],
    keep: ['The oxygen atom has 4 electron groups: 2 bonding pairs (to H atoms) and 2 lone pairs.'] },

  { q: 'Q34', id: 'chem-215', key: 'C', unlettered: true,
    edits: [
      ['<p>Water molecules experience all three types of intermolecular forces, but <strong>hydrogen bonding</strong> is by far the strongest and most significant.</p>',
       '<p>Water molecules experience several kinds of intermolecular attraction, and <strong>hydrogen bonding</strong> is the strongest and most distinctive of them in liquid water.</p>'],
      ['<p>Note: Ionic bonding is an intramolecular (within compounds) force, not an intermolecular force. It does not apply to water molecules interacting with each other.</p>',
       '<p>Note: an ionic lattice is an extended structure of oppositely charged ions. Ionic attraction is not the interaction between the neutral molecules of liquid water.</p>']
    ],
    feedback: {
      A: 'Dispersion forces occur between water molecules, but hydrogen bonding is the stronger distinctive interaction in liquid water. Dispersion forces are not universally weak in all substances; they become substantial for larger, more polarizable particles.',
      B: 'Water is polar and has dipole interactions. Hydrogen bonding is the more specific, strongly directional interaction identified in this question, involving an O–H hydrogen and an oxygen lone pair on another molecule.',
      D: 'An ionic lattice is held together by attraction between positive and negative ions. Liquid water consists mainly of neutral H₂O molecules with covalent O–H bonds and hydrogen bonds between molecules.'
    },
    points: [
      'Water molecules are polar and can both donate and accept hydrogen bonds.',
      'Hydrogen bonding helps explain water\'s relatively high boiling point for such a small molecule.',
      'Dispersion and ordinary dipole interactions are also present; naming hydrogen bonding does not exclude them.'
    ],
    bottom: 'Hydrogen bonding is the strongest characteristic intermolecular interaction in liquid water. Do not use this comparison as a universal ranking of forces in every substance.',
    gone: [
      'are the weakest intermolecular forces',
      'Ionic bonding is an intramolecular (within compounds) force',
      'stronger than London forces but weaker than hydrogen bonds',
      'It requires H bonded to F, O, or N and explains water\'s anomalously high boiling point.'
    ],
    keep: ['Each water molecule can form up to 4 hydrogen bonds.'] },

  { q: 'Q35', id: 'chem-216', key: 'C', unlettered: true,
    edits: [
      ['<p>In <strong>metallic bonding</strong>, metal atoms release their valence electrons into a shared "sea of electrons" (also called an electron cloud). These electrons are <strong>delocalized</strong> - they are not associated with any particular atom but move freely throughout the metallic lattice.</p>',
       '<p>In <strong>metallic bonding</strong>, the valence electrons are <strong>delocalized</strong> over the whole lattice: they are not associated with any particular atom but move freely through the metal. The bonding is the attraction between the positive ion cores and this shared "sea of electrons".</p>']
    ],
    tableEdits: [
      ['<td>Free electrons carry charge</td>', '<td>Mobile, delocalized electrons carry charge through the metal.</td>'],
      ['<td>Free electrons transfer kinetic energy</td>', '<td>Mobile electrons and lattice vibrations transfer energy.</td>'],
      ['<td>Layers of atoms can slide without breaking bonds</td>', '<td>Atomic layers can shift while metallic attraction is maintained.</td>'],
      ['<td>Free electrons absorb and re-emit light</td>', '<td>Electrons respond to incident light, producing strong reflection.</td>']
    ],
    points: [
      'Valence electrons in a metal are delocalized over many atoms.',
      'Their mobility enables electrical conduction.',
      'Metallic attraction can persist as atomic layers shift, helping explain malleability and ductility.'
    ],
    bottom: 'Metallic bonding involves attraction between positive ion cores and delocalized electrons. Electron mobility helps explain conductivity, while the bonding arrangement allows layers to shift without the solid simply separating.',
    gone: [
      'metal atoms release their valence electrons',
      'Layers of atoms can slide without breaking bonds',
      'Free electrons absorb and re-emit light',
      'Metallic bonding features a "sea of delocalized electrons" shared among all metal atoms'
    ],
    keep: [
      '<td>Malleability/ductility</td><td>Atomic layers can shift while metallic attraction is maintained.</td>',
      '<td>Metallic luster</td><td>Electrons respond to incident light, producing strong reflection.</td>',
      'Electron transfer from one atom to another describes ionic bonding'
    ] },

  { q: 'Q36', id: 'chem-217', key: 'B', unlettered: true,
    feedback: {
      A: 'NH₃ has eight valence electrons in total: five from nitrogen and three from hydrogen. Three N–H bonds use six electrons, leaving two as one lone pair. Zero lone pairs would not account for all eight electrons.',
      C: 'Two lone pairs would use four electrons in addition to the six in the three N–H bonds. That would require ten valence electrons, but neutral NH₃ has only eight.',
      D: 'Three lone pairs plus three N–H bonds would require twelve valence electrons. Neutral NH₃ has eight, so only one lone pair remains after forming its three bonds.'
    },
    points: [
      'Neutral NH₃ contains eight valence electrons.',
      'Three N–H bonds use six electrons; the remaining two form one lone pair on nitrogen.',
      'Three bonds and one lone pair give ammonia a trigonal pyramidal shape.'
    ],
    gone: [
      'This would require five bonds, as in PF5',
      'can only form a maximum of four bonds'
    ],
    keep: ['<p class=\'exp-key\'>Bottom Line: Nitrogen in NH₃ has one lone pair, giving a trigonal pyramidal shape.'] },

  { q: 'Q37', id: 'chem-218', key: 'A', unlettered: true,
    main: [
      'NaCl has the highest melting point of these choices. Melting its crystal requires overcoming the strong electrostatic attractions that hold Na⁺ and Cl− in an ordered <strong>ionic lattice</strong>; it does not require separating the solid into isolated gas-phase ions.',
      'NaCl melts at about 801 °C. For comparison:',
      TABLE,
      'The molecular solids listed here (CH₄, CO₂, H₂O) change state at much lower temperatures because only the weaker attractions between whole molecules have to be overcome, not the covalent bonds inside them.'
    ],
    tableHtml: "<table class='exp-table'><tr><th>Substance</th><th>Solid type/main attractions</th><th>Melting behavior at 1 atm</th></tr>" +
      '<tr><td>NaCl</td><td>Ionic lattice</td><td>Melts at about 801 °C</td></tr>' +
      '<tr><td>H₂O</td><td>Molecular solid; hydrogen bonding</td><td>Melts at about 0 °C</td></tr>' +
      '<tr><td>CO₂</td><td>Molecular solid; dispersion attractions</td><td>Does not melt at 1 atm; sublimes at about −78.5 °C</td></tr>' +
      '<tr><td>CH₄</td><td>Molecular solid; dispersion attractions</td><td>Melts at about −182.5 °C</td></tr></table>',
    feedback: {
      B: 'Methane (CH4) is a nonpolar molecule held together only by weak London dispersion forces, giving it a melting point of about -182.5 degrees C. Those weak attractions are far easier to overcome than the ionic attractions holding NaCl\'s lattice together.',
      D: 'At 1 atm, solid CO₂ changes directly to gas at about −78.5 °C rather than melting. Its molecules are held together mainly by dispersion attractions; the strong covalent C=O bonds within each molecule are not broken during sublimation.'
    },
    points: [
      'NaCl melts at about 801 °C, much higher than the listed molecular solids.',
      'A phase change disrupts the solid\'s arrangement and intermolecular or ionic attractions; it does not normally break the covalent bonds within intact molecules.',
      'CO₂ sublimes rather than melts at 1 atm, so its sublimation temperature must not be labelled a melting point.'
    ],
    bottom: 'NaCl has the highest melting point among these choices because of its strong ionic lattice attractions. CO₂\'s −78.5 °C value at 1 atm is a sublimation temperature, not a melting point.',
    gone: [
      'always have much lower melting points than ionic compounds',
      '<td>−78°C (sublimes)</td>',
      '<td>Covalent (London forces)</td>',
      'Ionic compounds have much higher melting points than molecular compounds because ionic bonds are much stronger than intermolecular forces.',
      'It has a very low sublimation point of -78.5 degrees C and does not even melt at standard pressure.'
    ],
    keep: ['Water (H<sub>2</sub>O) has relatively strong hydrogen bonds, giving it a melting point of 0 degrees C'] },

  { q: 'Q38', id: 'chem-219', key: 'B', unlettered: true,
    edits: [
      ['<p><strong>sp³ hybridization</strong> produces four equivalent hybrid orbitals directed toward the corners of a tetrahedron, with bond angles of approximately <strong>109.5°</strong>.</p>',
       '<p>In the ideal tetrahedral model, <strong>sp³ hybridization</strong> gives four equivalent bonding directions toward the corners of a tetrahedron, with bond angles of approximately <strong>109.5°</strong>.</p>'],
      ['<p>If lone pairs are present on the sp³ hybridized atom, the bond angles are compressed below 109.5° (e.g., NH₃ ≈ 107°, H₂O ≈ 104.5°).</p>',
       '<p>In familiar examples with lone pairs on the sp³ atom, the bond angle is reduced below 109.5°: NH₃ ≈ 107° and H₂O ≈ 104.5°.</p>']
    ],
    feedback: {
      C: 'An angle of 120° belongs to an ideal trigonal planar arrangement with three directions. Four equivalent bonding directions without lone pairs form a tetrahedron, with angles of about 109.5°.'
    },
    points: [
      'Four bonding electron groups with no lone pairs favor a tetrahedral arrangement.',
      'The ideal tetrahedral angle is about 109.5°.',
      'In familiar examples such as NH₃ and H₂O, lone pairs change the molecular shape and reduce the bond angle from the ideal tetrahedral value.'
    ],
    bottom: 'In the ideal tetrahedral model, four equivalent bonds and no central lone pairs give angles of about 109.5°.',
    gone: [
      '120 degrees is the bond angle for sp2-hybridized atoms with trigonal planar geometry',
      'If lone pairs are present on the sp³ hybridized atom, the bond angles are compressed below 109.5°',
      'sp³ hybridization with no lone pairs gives tetrahedral geometry and 109.5° bond angles. Lone pairs reduce these angles.'
    ],
    keep: [
      '<tr><td>sp³</td><td>Tetrahedral</td><td>109.5°</td></tr>',
      '90 degree bond angles are found in octahedral geometry'
    ] },

  { q: 'Q39', id: 'chem-220', key: 'B', unlettered: true,
    edits: [
      ['Two cysteine residues can undergo oxidation to form a <strong>disulfide bond</strong> (–S–S–), creating a cystine residue. These disulfide bridges are covalent bonds that stabilize the tertiary and quaternary structure of proteins.',
       'Oxidation of two cysteine thiol groups forms an S–S link between the two cysteine residues. The corresponding linked pair of free cysteine molecules is called <strong>cystine</strong>. A disulfide can link two parts of one polypeptide or connect different polypeptide chains.']
    ],
    feedback: {
      A: 'Methionine contains sulfur in a thioether, not a free thiol group. It does not form the ordinary cysteine-type disulfide bridge by oxidation of two –SH groups.',
      C: 'Serine\'s side chain is –CH₂OH. It contains a hydroxyl group rather than sulfur, so it cannot form the S–S bridge described here.',
      D: 'Threonine\'s side chain is –CH(OH)CH₃. Like serine, it has a hydroxyl group rather than a thiol and cannot form this disulfide link.'
    },
    points: [
      'Cysteine has a side-chain thiol, –SH.',
      'Oxidation links two cysteine sulfur atoms through an S–S bond.',
      'Disulfide bridges can stabilize a folded chain or a multi-chain protein assembly.'
    ],
    bottom: 'Two cysteine thiols can be oxidized to form a covalent disulfide bridge. The bridge may connect regions of one chain or connect different chains.',
    gone: [
      'creating a cystine residue',
      '(–s–ch3)',
      '(–oh) groups, not thiol groups',
      'a critical covalent interaction in protein folding and stability'
    ],
    keep: ['Cysteine is the only standard amino acid whose side chain contains a free thiol (–SH) group.'] },

  { q: 'Q40', id: 'chem-221', key: 'B', unlettered: true,
    stem: 'At pH 7.4 in aqueous solution, which form of free alanine predominates?',
    main: ['Free alanine has a carboxyl-group pKa of about 2.3 and an ammonium-group pKa of about 9.7. At pH 7.4, the carboxyl group is predominantly –COO−, while the amino group is predominantly –NH₃+. The major form is therefore a <strong>zwitterion</strong>: it has both a positive and a negative formal charge, with zero net formal charge. This conclusion concerns free alanine; amino acids with ionizable side chains can have different overall charges.'],
    feedback: {
      A: 'The uncharged –NH₂/–COOH form is not the predominant form of alanine in water at pH 7.4. Internal acid–base transfer favors the charged –NH₃+/–COO− zwitterion.',
      C: 'The –NH₂/–COO− anion becomes predominant above the ammonium-group pKa, about 9.7. At pH 7.4, most amino groups are still protonated.',
      D: 'The –NH₃+/–COOH cation predominates at sufficiently acidic pH, below the carboxyl-group pKa of about 2.3. At pH 7.4, the carboxyl group is mostly deprotonated.'
    },
    points: [
      'Above a group\'s pKa, its deprotonated form is favored; below it, its protonated form is favored.',
      'At pH 7.4, alanine\'s carboxyl is mainly –COO− and its amino group mainly –NH₃+.',
      'The predominant alanine zwitterion has zero net formal charge despite containing two charged groups.'
    ],
    bottom: 'At pH 7.4, free alanine is predominantly –NH₃+/–COO−. A zwitterion has opposite charges within one species; zero net charge does not mean no charged groups.',
    gone: [
      'both ionization events have occurred',
      'amino acids never exist in this fully protonated/deprotonated neutral form',
      'The fully protonated form exists only at very low pH',
      'At physiological pH, amino acids exist as zwitterions with a protonated amino group and a deprotonated carboxyl group.'
    ] }

];
