/* Final review pack edit specs: the last ten unreviewed chemistry questions
   (A1-A8, B1, B2) and three supplied biology questions (B3-B5).
   Every string here is the brief's own supplied wording. Feedback bodies keep
   their leading space. A rebuild item's main explanation is either taken from
   the stored prose (headFromStored) or replaced in full, in which case
   headMustContain pins the stored text being replaced. */
'use strict';
module.exports = [

  /* ---------- A1-A8: explanations rebuilt from bare stored prose ---------- */

  { k: 'A1', id: 'chem-478', subject: 'chemistry', key: 'B',
    rebuild: {
      keyed: 'Diamond (C)',
      headMustContain: '~3550 °C',
      head: "<p>Diamond is a covalent network solid. Each carbon atom is sp³-hybridized and covalently bonded to four neighboring carbon atoms in a tetrahedral arrangement. These strong bonds extend through a continuous three-dimensional network rather than forming separate molecules. This structure explains diamond's great hardness.</p>",
      fb: [
        ['A', ' Iodine consists of separate I₂ molecules. Each molecule contains a covalent I–I bond, but neighboring molecules are held together mainly by London dispersion forces. It is a molecular solid, not a continuous covalent network.'],
        ['C', ' Iron is a metallic solid. Its bonding involves positive atomic cores and delocalized electrons rather than the tetrahedral carbon-carbon network found in diamond.'],
        ['D', ' Solid carbon dioxide contains separate CO₂ molecules. The bonds within each molecule are covalent, but the attractions between molecules do not form a continuous covalent network.']
      ]
    } },

  { k: 'A2', id: 'chem-479', subject: 'chemistry', key: 'A',
    rebuild: {
      keyed: '1',
      headFromStored: true,
      headEdits: [['This makes simple cubic the least efficient cubic packing (~52% packing fraction).',
                   'Among the simple cubic, BCC and FCC models for identical spheres, simple cubic has the lowest packing fraction, about 52%.']],
      fb: [
        ['B', ' Two atoms per conventional cell is the BCC count: one from the shared corners plus one at the body center. A simple cubic cell has no body-center atom.'],
        ['C', ' Four atoms per conventional cell is the FCC count. A simple cubic cell has only corner atoms, whose shared contributions total one atom.'],
        ['D', ' Eight counts the corner positions without accounting for sharing. Each corner contributes only one-eighth to this cell, so eight corners contribute one atom in total.']
      ]
    } },

  { k: 'A3', id: 'chem-480', subject: 'chemistry', key: 'B',
    rebuild: {
      keyed: '2',
      headFromStored: true,
      fb: [
        ['A', ' One counts the combined contribution of the corners but omits the atom entirely inside the body center.'],
        ['C', ' Four is the atom count for a conventional FCC cell. In BCC, the shared corners contribute one atom and the body center contributes one, giving two.'],
        ['D', ' Six is the coordination number of simple cubic packing, not the number of atoms in a BCC cell. BCC contains two atoms per conventional unit cell.']
      ]
    } },

  { k: 'A4', id: 'chem-481', subject: 'chemistry', key: 'D',
    rebuild: {
      keyed: '12',
      headFromStored: true,
      fb: [
        ['A', ' Four is the number of atoms effectively contained in a conventional FCC unit cell. Coordination number instead counts the nearest neighbors of one atom, which is twelve.'],
        ['B', ' Six is the coordination number of simple cubic packing. FCC packing places twelve nearest neighbors around each atom.'],
        ['C', ' Eight is the coordination number of BCC packing. FCC has twelve nearest neighbors, so its coordination number is larger.']
      ]
    } },

  { k: 'A5', id: 'chem-482', subject: 'chemistry', key: 'B',
    rebuild: {
      keyed: 'Allotropes',
      headFromStored: true,
      fb: [
        ['A', ' Isomers have the same molecular formula but different structures. For the distinct structural forms of elemental carbon described here, the appropriate term is allotropes.'],
        ['C', ' Isotopes are atoms of the same element with different numbers of neutrons. Diamond and graphite differ in bonding and crystal structure, not in the defining neutron count of their carbon atoms.'],
        ['D', ' An alloy is a metallic material containing two or more elements. Diamond and graphite are forms of pure carbon. They can also be described as different crystalline forms of carbon, but they are not polymorphs of an alloy.']
      ]
    } },

  { k: 'A6', id: 'chem-483', subject: 'chemistry', key: 'B',
    rebuild: {
      keyed: 'Molecular crystal',
      headMustContain: 'most molecular solids melt below 200 °C',
      head: '<p>Molecular crystals contain separate molecules held together by intermolecular attractions such as London dispersion forces, dipole-dipole interactions or hydrogen bonds. Melting disrupts their ordered arrangement without normally breaking the covalent bonds within the molecules. Molecular solids therefore often have relatively low melting points. This is a general trend, not an absolute ranking: metallic melting points vary widely, and some metals melt near or below room temperature.</p>',
      fb: [
        ['A', ' Ionic crystals are held together by electrostatic attractions between oppositely charged ions. These attractions often give them relatively high melting points compared with molecular solids.'],
        ['C', ' Covalent network solids have strong covalent bonds extending through their structures. Disrupting such a network generally requires substantial energy; they are not the class typically associated with low melting points.'],
        ['D', ' Metallic solids have a wide range of melting points because metallic bonding varies between substances. Low-melting metals are exceptions to a simple ranking, but molecular solids are the intended general trend in this question.']
      ]
    } },

  { k: 'A7', id: 'chem-484', subject: 'chemistry', key: 'C',
    stemWas: 'Which of the following substances sublimes at standard atmospheric pressure (changes directly from solid to gas without melting)?',
    stem: 'Which of the following substances has no stable liquid phase at 1 atm and therefore passes directly from solid to gas when heated at that pressure?',
    rebuild: {
      keyedFromOption: true,
      headMustContain: 'triple point of CO₂ sits at 5.1 atm',
      head: '<p>Solid CO₂, or dry ice, sublimes at about −78.5 °C at 1 atm. Its triple-point pressure is about 5.1 atm, so liquid CO₂ is not a stable phase at 1 atm. Other solids, including ice, can also lose material by sublimation. The decisive distinction in this question is the absence of a stable liquid phase at the stated pressure.</p>',
      fb: [
        ['A', ' Ice can sublime into sufficiently dry air, including at atmospheric pressure. However, water also has a stable liquid phase at 1 atm, so it does not satisfy the condition in the stem.'],
        ['B', " Sodium chloride has a stable liquid phase at 1 atm and can melt when heated sufficiently. It does not share CO₂'s absence of a stable liquid phase at this pressure."],
        ['D', ' Iron can form a stable liquid at 1 atm when heated to a sufficiently high temperature. The question asks for a substance that cannot form a stable liquid at that pressure.']
      ]
    } },

  { k: 'A8', id: 'chem-485', subject: 'chemistry', key: 'B',
    rebuild: {
      keyedFromOption: true,
      headMustContain: 'electron sea',
      head: '<p>In the metallic-bond model, positive atomic cores are surrounded by delocalized valence electrons. An applied electric field produces a net drift of these electrons through the solid, carrying current without requiring the atomic cores to move through the crystal. In an ordinary ionic crystal such as NaCl, the ions are not freely mobile; they carry current when the salt is molten or dissolved in water. Conductivity depends on available mobile charge carriers, so graphite can also conduct despite being a covalent network material.</p>',
      fb: [
        ['A', ' The mobile charge carriers in an ordinary metal are delocalized electrons, not free-moving negative ions. A metal does not contain the alternating cation-anion lattice found in an ionic salt.'],
        ['C', ' Positive atomic cores vibrate about their lattice positions. These vibrations are not the sustained movement of charge responsible for ordinary metallic electrical conduction.'],
        ['D', ' Hydrogen bonding does not explain metallic conductivity. The relevant feature is the presence of mobile, delocalized electrons within the metallic structure.']
      ]
    } },

  /* ---------- B1-B5 ---------- */

  { k: 'B1', id: 'chem-61', subject: 'chemistry', key: 'B', keep: true },

  { k: 'B2', id: 'chem-19', subject: 'chemistry', key: 'C',
    headEdits: [
      ['Enantiomers rotate plane-polarized light by equal amounts in opposite directions, labelled (+) for dextrorotatory and (−) for levorotatory.',
       'Pure enantiomers rotate plane-polarized light by equal amounts in opposite directions when measured under the same conditions. The signs (+) and (−) indicate the experimentally measured direction of rotation.'],
      ['<td>Same connectivity, different spatial arrangement around double bond</td>',
       '<td>Same connectivity, different arrangement around a double bond or within a ring</td>'],
      ['<td>Dynamic equilibrium between structural isomers</td>',
       '<td>Interconversion of constitutional isomers, commonly involving proton transfer and a change in double-bond position</td>']
    ],
    fb: {
      B: ' Cis/trans isomerism describes relative arrangements around a double bond or within a ring. A pair such as cis-2-butene and trans-2-butene consists of diastereomers, not enantiomers. However, molecules with geometric isomerism can also be chiral, so geometric isomerism does not imply that a molecule is superimposable on its mirror image.',
      D: ' Tautomers are constitutional isomers that interconvert, commonly by proton transfer and a change in double-bond position, as in keto-enol tautomerism. Their bonding patterns differ. Enantiomers retain the same connectivity and differ in three-dimensional arrangement.'
    },
    pointEdits: [[2,
      'Enantiomers have identical melting point, boiling point, and solubility; they differ only in the direction they rotate plane-polarised light and in how they interact with other chiral molecules.',
      'Under the same achiral conditions, pure enantiomers have matching melting points, boiling points and solubilities. They rotate plane-polarized light in opposite directions and can interact differently with chiral molecules.']],
    bl: 'Enantiomers are non-superimposable mirror-image stereoisomers. Their properties match under the same achiral conditions, but their interactions with chiral biological molecules can differ. D/L describes configuration; (+)/(−) describes measured optical rotation.' },

  { k: 'B3', id: 'bio-12', subject: 'biology', key: 'B',
    stemWas: 'During the lysogenic cycle of a bacteriophage, what happens to the viral DNA?',
    stem: 'During establishment of lysogeny by bacteriophage λ (lambda) in E. coli, what typically happens to the phage DNA?',
    headEdits: [
      ['<p>Bacteriophages can follow two distinct life cycles after infecting a bacterial cell:</p>',
       '<p>Lambda is a temperate phage: it can undergo lytic growth or establish lysogeny. During lysogeny, lambda DNA integrates into the bacterial chromosome as a prophage and is copied with the host chromosome. Genes driving lytic growth are normally repressed, but the prophage is not necessarily completely transcriptionally silent.</p>'],
      ["<table class='exp-table'><tr><th>Feature</th><th>Lytic Cycle</th><th>Lysogenic Cycle</th></tr><tr><td>Viral DNA fate</td><td>Replicates independently</td><td>Integrates into host chromosome</td></tr><tr><td>Host cell fate</td><td>Lysed (destroyed)</td><td>Survives and divides</td></tr><tr><td>Viral term</td><td>Virulent phage</td><td>Temperate phage</td></tr><tr><td>Integrated DNA name</td><td>N/A</td><td><strong>Prophage</strong></td></tr></table>",
       "<table class='exp-table'><tr><th>Feature</th><th>Lytic growth</th><th>Lysogeny in lambda</th></tr><tr><td>Viral DNA fate</td><td>Replicated to produce new phages</td><td>Integrated into the host chromosome</td></tr><tr><td>Host cell fate</td><td>Lysed after new phages are produced</td><td>Survives and can divide</td></tr><tr><td>Phage type</td><td>Virulent or temperate phages</td><td>Temperate phage</td></tr><tr><td>Production of new virions</td><td>Active</td><td>Normally repressed</td></tr></table>"],
      ['<p>Phage infects cell -> Viral DNA integrates into host DNA (prophage) -> Host cell replicates normally, copying prophage with each division -> Environmental stress can trigger switch to lytic cycle</p>',
       '<p>Lambda establishes lysogeny → prophage is copied during host division → DNA damage can trigger induction → phage replication and assembly → host-cell lysis</p>']
    ],
    fb: {
      A: ' During lytic growth, phage genomes and particles are produced before the host is lysed; destruction is not instantaneous. Successful lambda lysogeny instead maintains the phage genome without immediate lysis.',
      C: ' Some temperate phages, such as P1, persist as plasmid prophages. Integration is therefore not required for all lysogeny. Lambda, the phage specified here, normally establishes lysogeny by integrating into the bacterial chromosome.',
      D: ' Restriction enzymes can destroy incoming foreign DNA as part of bacterial defense. Destruction of the phage genome would prevent successful establishment of the prophage; it is not its normal fate during lambda lysogeny.'
    },
    points: [
      'Temperate phages can enter lytic growth or establish lysogeny; virulent phages do not establish lysogeny.',
      'Lambda prophage DNA is integrated into the host chromosome and inherited during cell division.',
      'Some other prophages, including P1, are maintained as plasmids rather than integrated into the chromosome.'
    ],
    bl: 'Lambda lysogeny maintains phage DNA as a chromosomal prophage. DNA damage can induce a switch to lytic growth, but lysogeny does not inevitably end in lysis.' },

  { k: 'B4', id: 'bio-518', subject: 'biology', key: 'D', keep: true },

  { k: 'B5', id: 'bio-346', subject: 'biology', key: 'C',
    fb: {
      A: " Simple squamous epithelium consists of one layer of flat cells. Examples include the alveolar lining, vascular endothelium and the parietal layer of Bowman's capsule. Unlike urothelium, it does not have multiple cell layers and a specialized umbrella-cell barrier.",
      B: ' Stratified squamous epithelium has several cell layers, with flattened cells at the surface and more cuboidal or columnar cells near the base. It protects sites such as the skin, mouth, esophagus and vagina against abrasion. The bladder instead uses urothelium, whose specialized umbrella cells accommodate filling while maintaining a urine barrier.'
    },
    pointEdits: [
      [2, 'Tight junctions between umbrella cells, together with those plaques, form the blood-urine barrier that stops hypertonic, acidic urine leaking back into the tissue.',
          'Tight junctions and the specialized apical membrane of umbrella cells form a low-permeability barrier that limits movement of water and urinary solutes into the underlying tissue.'],
      [4, 'The layers appear to change in number as the bladder fills, which is where the name transitional came from, but no cells are actually gained or lost.',
          'During normal bladder filling, the epithelium becomes thinner as cells change shape and rearrange; this does not require cells to be added or lost.']
    ] }
];
