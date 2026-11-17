/** Chemistry review batch 4, specs for display Q41-Q50 (chem-222 .. chem-231). */
'use strict';
const TABLE = '\u0000TABLE\u0000';

module.exports = [

  { q: 'Q41', id: 'chem-222', key: 'A', unlettered: true,
    stem: 'In the overall condensation representation of peptide formation from free amino acids, which two functional groups are linked?',
    main: ['The carboxyl group of one amino acid and the amino group of another are linked through an amide bond, called a <strong>peptide bond</strong>. In the overall condensation equation from free amino acids, one water molecule is removed for each bond formed. Cells make peptide bonds using activated amino acids attached to tRNA; the simple condensation equation is a net chemical representation, not a step-by-step description of ribosomal synthesis. Partial double-bond character makes the peptide unit approximately planar and restricts rotation about its C–N bond.'],
    feedback: {
      C: 'Two amino groups alone do not form the peptide linkage. In the overall condensation representation, the peptide bond is formed from one amino group (-NH2) and one carboxyl group (-COOH), with loss of water.'
    },
    points: [
      'A peptide bond is an amide linkage between a carboxyl carbon and an amino nitrogen.',
      'The overall condensation equation from free amino acids removes one water molecule per peptide bond.',
      'Partial double-bond character restricts rotation about the peptide C–N bond; neighboring backbone bonds provide much of the chain\'s flexibility.'
    ],
    bottom: 'A peptide bond links a carboxyl carbon to an amino nitrogen. The overall equation from free amino acids is a condensation, while cellular synthesis uses activated amino acids.',
    gone: [
      'An ester bond (not a peptide bond) forms between a hydroxyl and carboxyl group.',
      'does not readily occur under biological conditions',
      'Peptide bonds form via condensation between the amino group of one amino acid and the carboxyl group of another, releasing water.'
    ],
    keep: [
      'would form an acid anhydride (R-CO-O-CO-R), not a peptide bond',
      'forms an ester bond (R-CO-O-R), not a peptide bond',
      '<div style="text-align:center;margin:12px 0"></div>'
    ] },

  { q: 'Q42', id: 'chem-223', key: 'C', unlettered: true,
    edits: [
      ['<p><strong>Tryptophan</strong> (Trp, W) contains an indole ring system in its side chain, making it one of the three aromatic amino acids. The other two aromatic amino acids are <strong>phenylalanine</strong> (benzyl group) and <strong>tyrosine</strong> (hydroxybenzyl group).</p>',
       '<p><strong>Tryptophan</strong> (Trp, W) contains an aromatic indole ring system in its side chain. <strong>Phenylalanine</strong> (benzyl group) and <strong>tyrosine</strong> (hydroxybenzyl group) are other familiar amino acids with aromatic side chains, and histidine\'s imidazole ring is also aromatic.</p>'],
      ['Tryptophan\'s large indole ring makes it the amino acid with the largest side chain and gives it strong UV absorbance at 280 nm.',
       'Tryptophan\'s indole ring gives it strong UV absorbance near 280 nm.']
    ],
    feedback: {
      A: 'Valine has a branched aliphatic side chain, –CH(CH₃)₂. It contains no aromatic ring.',
      B: 'Leucine has a branched aliphatic side chain, –CH₂CH(CH₃)₂. Its branching does not make it aromatic.',
      D: 'Alanine\'s side chain is a methyl group, –CH₃. It contains no ring and is not aromatic.'
    },
    points: [
      'Tryptophan contains an indole group with aromatic rings.',
      'Valine, leucine and alanine have aliphatic side chains without aromatic rings.',
      'Aromaticity describes a ring\'s electronic structure; it is not the same property as an amino acid\'s charge or acid–base behavior.'
    ],
    bottom: 'Tryptophan has an aromatic indole side chain. The other listed side chains are aliphatic and contain no aromatic ring.',
    gone: [
      'making it one of the three aromatic amino acids',
      'the amino acid with the largest side chain',
      'The three aromatic amino acids are phenylalanine, tyrosine, and tryptophan.'
    ],
    keep: ['Valine has an isopropyl group, leucine has an isobutyl group, and alanine has a simple methyl group.'] },

  { q: 'Q43', id: 'chem-224', key: 'C', unlettered: true,
    main: ['<strong>Denaturation</strong> is loss of a protein\'s native three-dimensional structure, often with loss of function. Heat, pH changes or denaturing chemicals can disturb the interactions that maintain its fold. Denaturation usually leaves the peptide backbone and amino-acid sequence intact; peptide-bond hydrolysis is a separate process. Different treatments disrupt different interactions, and reduction of disulfide bonds is not required for every instance of denaturation. Some proteins can refold, whereas others aggregate or fail to recover their original structure.'],
    feedback: {
      A: 'Breaking peptide bonds would cut the polypeptide backbone. That is hydrolysis or another chemical cleavage process, not a necessary part of denaturation.',
      B: 'Primary structure is the amino-acid sequence, which is usually retained during denaturation. The native fold can be lost without changing the sequence.',
      D: 'The amino-acid sequence ordinarily remains the same when a protein unfolds. Changes to that sequence require separate chemical cleavage or modification, not merely loss of the native conformation.'
    },
    points: [
      'Denaturation concerns loss of native three-dimensional structure.',
      'Peptide bonds and amino-acid sequence are usually preserved.',
      'Refolding depends on the protein and conditions; aggregation can prevent recovery.'
    ],
    bottom: 'Denaturation disrupts the native fold, usually without cleaving the peptide backbone. Recovery of the fold is possible for some proteins but is not guaranteed.',
    gone: [
      'Anfinsen\'s classic ribonuclease experiment',
      'Critically, denaturation does not break peptide bonds',
      'Denaturation destroys a protein\'s higher-order structure'
    ] },

  { q: 'Q44', id: 'chem-225', key: 'B', unlettered: true,
    edits: [
      ['All other 19 standard amino acids have four different substituents on the α-carbon, making them optically active.',
       'All other 19 standard amino acids have four different substituents on the α-carbon, giving each of them a chiral α-carbon.'],
      ['The amino acids with positively charged side chains at pH 7 are lysine (pKa ~10.5), arginine (pKa ~12.5), and to some extent histidine (pKa ~6.0).',
       'Near pH 7, lysine (pKa ~10.5) and arginine (pKa ~12.5) have predominantly positive side chains, while histidine (pKa ~6.0) is mostly neutral with a smaller protonated fraction.']
    ],
    points: [
      'Glycine has H as its side chain.',
      'Its α-carbon therefore carries two identical hydrogens and is achiral.',
      'The other 19 standard amino acids have chiral α-carbons; chirality should not be confused with the optical rotation of every possible sample.'
    ],
    bottom: 'Glycine\'s α-carbon has two identical hydrogen substituents, so it is not a chiral center.',
    gone: [
      'making them optically active',
      'and to some extent histidine (pKa ~6.0)',
      'Glycine is the only achiral standard amino acid because its R group is simply a hydrogen atom, making the α-carbon symmetric.'
    ],
    keep: [
      'The largest standard amino acid is tryptophan',
      'The sulfur-containing amino acids are cysteine (with a thiol -SH group) and methionine'
    ] },

  { q: 'Q45', id: 'chem-226', key: 'C', unlettered: true,
    stem: 'Which listed amino acid has a side-chain pKa closest to physiological pH (about 7.4), making it commonly useful in acid–base catalysis?',
    main: ['<strong>Histidine</strong>\'s imidazole side chain has a typical aqueous pKa of about 6, closer to 7.4 than the other listed ionizable side chains. Most free histidine side chains are unprotonated at pH 7.4, but proton exchange is accessible, and an enzyme\'s local environment can shift the pKa. Histidine is therefore common in catalytic proton transfer. This does not mean that lysine, aspartate or other residues cannot act as catalytic acids or bases.'],
    feedback: {
      A: 'Lysine\'s side-chain pKa is typically about 10.5, so it is mostly protonated at pH 7.4. Lysine can participate in catalysis, but its typical pKa is farther from 7.4 than histidine\'s.',
      B: 'Aspartate\'s side-chain pKa is typically about 3.7, so it is mostly deprotonated at pH 7.4. It can serve in acid–base catalysis, but its usual pKa is farther from 7.4 than histidine\'s.',
      D: 'Proline does not have a separate imidazole-like ionizable side chain. Its ring connects back to the backbone nitrogen, so it does not supply the side-chain acid–base group described here.'
    },
    points: [
      'Histidine\'s imidazole side chain has a typical aqueous pKa near 6.',
      'Protonated histidine can donate a proton, while its unprotonated form can accept one.',
      'Protein environments can change side-chain pKa values, allowing several kinds of residues to participate in acid–base catalysis.'
    ],
    bottom: 'Histidine\'s side-chain pKa is relatively close to physiological pH, making it a common participant in proton transfer. Catalytic acid–base roles are not exclusive to histidine.',
    gone: [
      'has no acid-base catalytic role',
      'exists in both protonated and deprotonated forms under cellular conditions',
      'making it crucial for enzyme catalysis',
      'making it an excellent catalytic residue in enzyme active sites'
    ] },

  { q: 'Q46', id: 'chem-227', key: 'B', unlettered: true,
    feedback: {
      C: 'A heterodimer contains two different polypeptide subunits. Here the two subunits are identical, so the assembly is a homodimer. The usual adult hemoglobin molecule has four subunits, not just one alpha and one beta chain.'
    },
    points: [
      'A dimer contains two subunits; a homodimer contains two identical subunits.',
      'The arrangement of multiple polypeptide subunits is quaternary structure.',
      'Each subunit can also have its own secondary and tertiary structure.'
    ],
    gone: [
      'for example, hemoglobin alpha and beta chains',
      'The distinction between homo- and hetero-oligomers is important in biochemistry.'
    ],
    keep: [
      '<p class=\'exp-key\'>Bottom Line: Quaternary structure arises from the association of multiple polypeptide subunits.',
      'A monomer is a single polypeptide chain. A protein with only one chain has tertiary structure'
    ] },

  { q: 'Q47', id: 'chem-228', key: 'B', unlettered: true,
    stem: 'Which effect favors burying nonpolar side chains during the folding of a soluble globular protein in water?',
    main: ['The <strong>hydrophobic effect</strong> favors reducing the exposure of nonpolar side chains to water. In many soluble globular proteins, these side chains become buried in the interior, changing the organization of surrounding water and contributing to favorable folding free energy. Folding reflects several interacting contributions, including hydrogen bonds, close packing, electrostatic interactions and sometimes disulfide bonds; one contribution should not be declared universally dominant for every protein and condition.'],
    feedback: {
      A: 'Peptide bonds connect the amino-acid residues in the backbone. They define the chain\'s connectivity but do not explain why nonpolar side chains tend to become buried away from water.',
      C: 'Disulfide bonds covalently connect cysteine residues and can form or rearrange during folding. They can stabilize a protein, but they do not explain the general burial of nonpolar side chains.',
      D: 'Attractions between oppositely charged side chains can contribute to folding and stability. Their importance depends on the surroundings; they are not the effect that specifically favors burying nonpolar groups.'
    },
    points: [
      'Exposed nonpolar surfaces interact unfavorably with water compared with their burial in many folded proteins.',
      'The hydrophobic effect is not a new covalent bond between nonpolar side chains.',
      'Hydrogen bonds, packing, electrostatic interactions and disulfides can also contribute to protein structure and stability.'
    ],
    bottom: 'The hydrophobic effect favors burial of nonpolar side chains in soluble globular proteins. Overall folding also depends on several other interactions.',
    gone: [
      'typically formed after folding',
      'contribute relatively little to the driving force of folding',
      'the dominant force driving protein folding',
      'hydrophobic interactions provide the largest thermodynamic contribution'
    ] },

  { q: 'Q48', id: 'chem-229', key: 'B', unlettered: true,
    main: ['<strong>Proline</strong>\'s side chain loops back and bonds to its backbone nitrogen, forming a saturated five-membered ring. In free proline, the unprotonated nitrogen is a secondary amine, not an imine. In an internal peptide-bonded proline residue, the backbone nitrogen has no N–H bond and cannot donate the usual backbone hydrogen bond. The ring also restricts backbone rotation. These properties often make proline unfavorable within a regular alpha helix or introduce a kink, but proline is not absolutely excluded from helices.'],
    feedback: {
      C: 'Proline\'s ring is saturated and is not aromatic. Its unusual property is the connection back to the backbone nitrogen, not aromaticity.',
      D: 'Proline\'s charge depends on pH and whether it is free or incorporated into a peptide. Its ring is not a side chain that remains positively charged at every pH.'
    },
    points: [
      'Proline\'s saturated ring connects the side chain to the backbone nitrogen.',
      'This ring restricts backbone flexibility.',
      'Internal peptide-bonded proline has no backbone N–H donor and can interrupt regular helix hydrogen bonding, without being completely absent from helices.'
    ],
    bottom: 'Proline\'s ring connects its side chain to the backbone nitrogen. This restricts rotation, and an internal proline residue lacks an N–H donor, often producing a bend or kink.',
    gone: [
      'imino acid',
      'incompatible with the interior of',
      'helix breaker',
      'restricting backbone rotation and often causing turns or kinks in protein structure'
    ],
    keep: ['Amino acids with carboxyl groups in their side chains are aspartate and glutamate (the acidic amino acids).'] },

  { q: 'Q49', id: 'chem-230', key: 'B', unlettered: true,
    stem: 'In the overall condensation equation for forming one linear peptide from 15 free amino acids, how many water molecules are produced?',
    main: ['A linear chain of <strong>n</strong> amino-acid residues has <strong>n − 1</strong> peptide links. In the overall condensation equation starting from free amino acids, each link corresponds to loss of one water molecule. Thus 15 amino acids give 15 − 1 = <strong>14</strong> links and 14 water molecules in that equation. This is net stoichiometry; ribosomal synthesis uses activated amino acids attached to tRNA rather than direct dehydration of free amino acids.'],
    feedback: {
      A: 'Thirteen peptide links connect 14 residues in a linear chain. A chain of 15 residues needs one more link, giving 14 waters in the overall condensation equation.',
      C: 'There is no peptide link beyond each end of the linear chain. The number of links is one fewer than the number of residues, so 15 residues give 14 waters in the stated equation.',
      D: 'Sixteen links would connect 17 residues in a linear chain. For 15 residues, n − 1 gives 14, not 16.'
    },
    points: [
      'A linear chain of n residues contains n − 1 peptide links.',
      'In the overall condensation equation from free amino acids, one water is produced per link.',
      'For 15 residues, the calculation is 15 − 1 = 14; this net equation is not the detailed ribosomal mechanism.'
    ],
    bottom: 'A linear 15-residue peptide has 14 peptide links. Its overall condensation equation from free amino acids produces 14 H₂O.',
    gone: [
      'Fifteen water molecules would require 16 amino acids',
      'water molecules released during synthesis',
      'releases (n − 1) water molecules during synthesis'
    ] },

  { q: 'Q50', id: 'chem-231', key: 'B', unlettered: true,
    stem: 'Using typical aqueous side-chain pKa values, which pair has predominantly negatively charged side chains at pH 7.4?',
    edits: [
      ['Both are fully deprotonated at physiological pH.', 'Both are predominantly deprotonated at physiological pH.'],
      ['they are uncharged at physiological pH.', 'they are predominantly uncharged at physiological pH.']
    ],
    tableEdits: [
      ['<th>Charge at pH 7.4</th>', '<th>Predominant side-chain charge at pH 7.4</th>']
    ],
    feedback: {
      C: 'Histidine\'s side chain is mostly neutral at pH 7.4, with a smaller positively charged fraction. Cysteine\'s thiol is also mostly neutral at this pH, although a minority is deprotonated to a negative thiolate. Neither has a predominantly negative side chain under the stated typical aqueous conditions.',
      D: 'Asparagine and glutamine have side-chain amides, –CONH₂, rather than the carboxyl groups of aspartate and glutamate. These amide side chains are predominantly uncharged near physiological pH.'
    },
    points: [
      'Aspartate and glutamate have side-chain carboxyl groups that are mostly deprotonated at pH 7.4.',
      'Lysine and arginine side chains are predominantly positive at this pH.',
      'Histidine is mostly neutral under typical aqueous conditions at pH 7.4, but can gain a proton; protein environments can alter these ionization patterns.'
    ],
    bottom: 'Aspartate and glutamate have predominantly –COO− side chains at pH 7.4. Ionization depends on pH relative to pKa, so \'predominantly\' is more accurate than \'always\' or \'completely\'.',
    gone: [
      'giving it a partial positive charge',
      'Both are fully deprotonated',
      'they are uncharged at physiological pH.',
      'lysine, arginine, and histidine are the basic (positively charged) ones'
    ],
    keep: [
      '<th>Predominant side-chain charge at pH 7.4</th>',
      'Lysine (pKa ~10.5) and arginine (pKa ~12.5) both have positively charged side chains at physiological pH'
    ] }

];
