/** Chemistry review batch 4, specs for display Q51-Q60 (chem-232 .. chem-241). */
'use strict';
const TABLE = '\u0000TABLE\u0000';

module.exports = [

  { q: 'Q51', id: 'chem-232', key: 'C', unlettered: true,
    main: ['The <strong>isoelectric point</strong>, pI, is the pH at which an amino acid or protein has zero average net electrical charge. Positive and negative charged groups can still be present: zero net charge does not mean that every group is uncharged. For a simple amino acid without an ionizable side chain, the zwitterion predominates near the pI, and pI = (pKa₁ + pKa₂)/2. Zero average charge also explains the absence of net charge-driven migration in an ideal electrophoresis experiment at the pI.'],
    feedback: {
      A: 'Below its pI, an amino acid has a positive average net charge because more of its ionizable groups are protonated. At the pI itself, the average positive and negative charges balance.',
      B: 'Above its pI, an amino acid has a negative average net charge because more groups are deprotonated. This differs from the zero average net charge at the pI.',
      D: 'Charged groups remain present at the pI. For example, the predominant glycine zwitterion has –NH₃+ and –COO− groups whose charges cancel; neither group is uncharged.'
    },
    points: [
      'At the pI, positive and negative charges balance on average.',
      'A zwitterion can contain charged groups while having zero net formal charge.',
      'For an amino acid with no ionizable side chain, pI is the average of the carboxyl and ammonium pKa values.'
    ],
    bottom: 'pI is the pH of zero average net charge, not the pH at which every functional group is uncharged.',
    gone: [
      'the molecule does not migrate in an electric field',
      'the amino group loses its proton (-NH2), resulting in an overall negative charge',
      'The molecule is still a zwitterion with balanced positive and negative charges.'
    ] },

  { q: 'Q52', id: 'chem-233', key: 'C', unlettered: true,
    stem: 'Which type of bond links successive amino acid residues along a protein\'s polypeptide backbone?',
    edits: [
      ['<p>The <strong>primary structure</strong> of a protein is defined as the linear sequence of amino acids, connected by <strong>peptide bonds</strong>. The peptide bond is a covalent amide linkage (–CO–NH–) formed between the α-carboxyl group of one amino acid and the α-amino group of the next.</p>',
       '<p>Successive residues along a polypeptide backbone are joined by <strong>peptide bonds</strong>. A peptide bond is a covalent amide linkage running from the carbonyl carbon of one residue to the nitrogen of the next, formed between the α-carboxyl group of one amino acid and the α-amino group of the following one. Most peptide links are written –CO–NH–, but an internal proline residue has no N–H at that nitrogen.</p>'],
      ['van der Waals forces contribute to tertiary structure. Disulfide bonds are covalent but link cysteine side chains to stabilize tertiary/quaternary structure - they are not part of the primary backbone sequence.',
       'van der Waals forces contribute to tertiary structure. Disulfide bonds are covalent but link cysteine side chains rather than joining successive backbone residues.']
    ],
    feedback: {
      A: 'Hydrogen bonds help stabilize structures such as alpha helices and beta sheets. They are not the covalent C–N links that connect successive residues along the backbone.',
      B: 'Attractions between charged side chains can stabilize protein structure, but they are not the amide bonds joining successive backbone residues.',
      D: 'Disulfide bonds connect the sulfur atoms of cysteine side chains. They can cross-link parts of a protein, but they are not the regular links between successive residues in the polypeptide backbone.'
    },
    points: [
      'A peptide bond joins a carbonyl carbon to the nitrogen of the next residue.',
      'These bonds form the continuous polypeptide backbone.',
      'Disulfide bonds link cysteine side chains rather than supplying the usual residue-to-residue backbone connection.'
    ],
    bottom: 'Successive amino-acid residues are joined along the backbone by peptide bonds, which are covalent amide C–N links.',
    gone: [
      'they are not part of the primary backbone sequence',
      'Primary protein structure = amino acid sequence connected by peptide (amide) bonds'
    ],
    keep: ['Ionic bonds, hydrophobic interactions, and van der Waals forces contribute to tertiary structure.'] },

  { q: 'Q53', id: 'chem-234', key: 'B', unlettered: true,
    stem: 'In a Fischer projection of a chiral α-amino acid drawn with COOH at the top and side chain R at the bottom, where is NH₂ for the L configuration?',
    main: ['With COOH at the top and the side chain at the bottom of this <strong>Fischer projection</strong>, an L-amino acid has NH₂ on the left and H on the right. The D configuration has those horizontal positions reversed. The stated orientation is essential: \'left\' alone does not identify configuration in an arbitrarily drawn projection. D/L describes configuration relative to a reference convention, not the sign of optical rotation. Glycine is achiral and is neither D nor L.'],
    feedback: {
      A: 'With the stated top and bottom groups, placing NH₂ on the right gives the D configuration. D does not mean that the molecule must rotate light to the right.',
      C: 'The top position is occupied by COOH in the projection specified in the stem. Placing NH₂ there would change the drawing convention, so the simple left/right rule would no longer apply as stated.',
      D: 'The bottom position is occupied by the side chain R in the specified projection. It is not the NH₂ position for the L configuration.'
    },
    points: [
      'Use a defined Fischer orientation: COOH at the top and side chain R at the bottom.',
      'In that orientation, NH₂ on the left gives L; NH₂ on the right gives D.',
      'D/L does not specify the sign of optical rotation, and achiral glycine has no D/L designation.'
    ],
    bottom: 'With COOH at the top and R at the bottom of the Fischer projection, NH₂ on the left identifies L. The orientation must be stated.',
    gone: [
      'D-amino acids are rare in nature but are found in some bacterial cell walls',
      'the groups above and below the α-carbon are the amino group (top) or carboxyl group (top, by convention)',
      'Nearly all amino acids found in proteins are in the <strong>L-configuration</strong>',
      'Virtually all biological proteins consist of L-amino acids.'
    ] },

  { q: 'Q54', id: 'chem-235', key: 'B', unlettered: true,
    stem: 'An ideal α-helix has approximately how many amino acid residues per complete turn?',
    edits: [
      ['<p>The <strong>α-helix</strong> is a right-handed helical structure in which the polypeptide backbone coils around a central axis. Each complete turn contains <strong>3.6 amino acid residues</strong> and has a pitch (rise per turn) of 0.54 nm. Each residue contributes a rise of 0.15 nm along the helix axis.</p>',
       '<p>The usual protein <strong>α-helix</strong> is a right-handed helical structure in which the polypeptide backbone coils around a central axis. Each complete turn of the ideal helix contains approximately <strong>3.6 amino acid residues</strong>, with a pitch (rise per turn) of about 0.54 nm and a rise of about 0.15 nm per residue.</p>'],
      ['The helix is stabilized by hydrogen bonds between the C=O group of residue <em>i</em> and the N–H group of residue <em>i+4</em>. The side chains project outward from the helix backbone. Proline and glycine tend to disrupt α-helices - proline due to its rigid ring and glycine due to its excessive conformational flexibility.',
       'The helix is stabilized by a regular pattern of hydrogen bonds between the C=O group of residue <em>i</em> and the N–H group of residue <em>i+4</em>. The side chains project outward from the helix backbone. Proline and glycine tend to disfavor regular α-helical structure, proline because of its ring and glycine because of its conformational flexibility.']
    ],
    feedback: {
      A: 'A value of 2.5 residues per turn does not describe the ideal alpha helix. Its approximate geometry is 3.6 residues per turn and a pitch of 0.54 nm.',
      C: 'Five residues per turn is not the standard alpha-helical value. Use approximately 3.6 residues per turn; actual protein helices can be distorted from the ideal geometry.',
      D: 'About 7.2 residues span two turns of an ideal alpha helix, not one. The one-turn value is approximately 3.6.'
    },
    points: [
      'An ideal alpha helix has approximately 3.6 residues per turn.',
      'About 0.15 nm rise per residue gives a pitch of about 0.54 nm per turn.',
      'Internal backbone C=O groups hydrogen-bond to N–H groups four residues farther along the chain.'
    ],
    bottom: 'An ideal alpha helix has about 3.6 residues per turn and a regular i → i+4 backbone hydrogen-bond pattern.',
    gone: [
      'has exactly 3.6 residues per turn',
      'does not correspond to any known protein helix',
      'the 310-helix',
      'tend to disrupt α-helices',
      'The α-helix has 3.6 residues per turn, stabilized by i → i+4 hydrogen bonds between backbone atoms.'
    ] },

  { q: 'Q55', id: 'chem-236', key: 'B', unlettered: true,
    stem: 'Among the 20 standard amino acids in their free forms, which has a secondary α-amino group?',
    main: [
      'In the unprotonated structure of free <strong>proline</strong>, the alpha-amino nitrogen is bonded to two carbon atoms and one hydrogen, making it a secondary amine. Its saturated ring joins the side chain back to that nitrogen. A secondary amine is not an imine, so \'imino group\' is misleading here. When proline is an internal residue of a peptide, its nitrogen is part of a tertiary amide and has no N–H hydrogen-bond donor.',
      'The ring restricts backbone rotation. Peptide bonds preceding proline have a higher cis proportion than most other peptide bonds, but most are still trans. Proline can introduce bends or kinks rather than necessarily destroying every regular secondary structure.'
    ],
    feedback: {
      A: 'Glycine is unique for having the simplest side chain (just a hydrogen atom), making it the smallest amino acid with no chirality at the α-carbon. However, free glycine has a standard primary alpha-amino group (-NH2), not a secondary one.',
      C: 'Tryptophan contains a large aromatic indole ring system. Free tryptophan has a primary alpha-amino group like most standard amino acids, and its indole nitrogen belongs to that aromatic ring rather than to the alpha-amino group.',
      D: 'Histidine contains an imidazole ring in its side chain, which has important acid-base properties (pKa ~6.0). Its imidazole nitrogens are part of that ring; free histidine\'s alpha-amino group is a standard primary amine. Only proline has a side chain that connects back to the alpha-amino nitrogen.'
    },
    points: [
      'Free proline\'s unprotonated alpha-amino nitrogen is attached to two carbons, so it is a secondary amine.',
      'The ring connecting its side chain to that nitrogen restricts backbone rotation.',
      'Once proline is an internal peptide residue, its nitrogen has no N–H bond for the usual backbone hydrogen-bond donation.'
    ],
    bottom: 'Free proline has a secondary alpha-amino group, not an imino group. Internal peptide-bonded proline has a tertiary amide nitrogen with no N–H donor.',
    gone: [
      '(an imino group)',
      'This is why proline disrupts regular secondary structures.',
      'secondary (imino) nitrogen',
      'is the largest of the standard amino acids'
    ] },

  { q: 'Q56', id: 'chem-237', key: 'C', unlettered: true,
    stem: 'In the regular triple-helical regions of fibrillar collagen, which amino acid occurs at every third position?',
    main: [
      '<strong>Fibrillar collagen</strong> has a triple-helical structure of three polypeptide chains wound around each other. In its regular triple-helical regions the repeating motif is <strong>Gly–X–Y</strong>, with glycine at every third position. X is often proline and Y is often hydroxyproline; these are common occupants of those positions rather than requirements at every one.',
      'Glycine occupies every third position of these regions because its side chain is only a hydrogen atom. At the tightly packed core of the triple helix there is room for little more, and a larger side chain would cause steric clashes. Certain glycine substitutions in type I collagen can disrupt the triple helix and cause osteogenesis imperfecta.'
    ],
    feedback: {
      B: 'Proline often occupies the X position in the Gly-X-Y sequence, while hydroxyproline is common at Y. Glycine, rather than proline, is required at every third position in the regular triple-helical pattern.'
    },
    points: [
      'The regular collagen triple helix contains a repeating Gly-X-Y sequence.',
      'Glycine occurs every third position and fits into the tightly packed core because its side chain is only H.',
      'Proline and hydroxyproline are common at X and Y positions, respectively.'
    ],
    bottom: 'Regular triple-helical regions of fibrillar collagen follow a Gly-X-Y repeat. Glycine\'s small side chain allows close packing at the helix core.',
    gone: [
      'Mutations replacing glycine in collagen cause diseases like osteogenesis imperfecta',
      '<strong>B. Proline:</strong> X is frequently proline',
      'Glycine must occupy every third position because it is the <strong>smallest amino acid</strong>',
      'requires glycine at every third position due to spatial constraints in the triple helix interior'
    ],
    keep: [
      'Alanine is a small, nonpolar amino acid but is not the one required at every third position in collagen.',
      'Leucine is a large, branched, hydrophobic amino acid'
    ] },

  { q: 'Q57', id: 'chem-238', key: 'C', unlettered: true,
    edits: [
      ['<p>Enzymes that cleave peptide bonds using water are classified as <strong>hydrolases</strong>, specifically <strong>proteases</strong> (also called peptidases or proteinases). Hydrolases (EC class 3) catalyze bond cleavage by the addition of water.</p>',
       '<p>Enzymes that cleave peptide bonds are classified as <strong>hydrolases</strong>, specifically <strong>proteases</strong> (also called peptidases or proteinases). Hydrolases (EC class 3) catalyze bond cleavage in which water is consumed in the overall reaction.</p>']
    ],
    tableHtml: "<table class='exp-table'><tr><th>Enzyme class</th><th>Main reaction type</th><th>Example</th></tr>" +
      '<tr><td>Oxidoreductases (EC 1)</td><td>Oxidation–reduction</td><td>Lactate dehydrogenase</td></tr>' +
      '<tr><td>Transferases (EC 2)</td><td>Functional-group transfer</td><td>Kinases</td></tr>' +
      '<tr><td>Hydrolases (EC 3)</td><td>Hydrolytic bond cleavage</td><td>Proteases, lipases</td></tr>' +
      '<tr><td>Lyases (EC 4)</td><td>Nonhydrolytic cleavage or addition across double bonds</td><td>Decarboxylases</td></tr>' +
      '<tr><td>Isomerases (EC 5)</td><td>Rearrangement within a molecule</td><td>Phosphoglucose isomerase</td></tr>' +
      '<tr><td>Ligases (EC 6)</td><td>Energy-coupled bond formation, often using ATP</td><td>DNA ligase</td></tr>' +
      '<tr><td>Translocases (EC 7)</td><td>Catalyzed movement of ions or molecules across membranes</td><td>H+-transporting ATPase</td></tr></table>',
    feedback: {
      A: 'Ligases join molecules through energy-coupled bond formation, often using ATP. The reaction in the question instead cleaves a peptide bond by hydrolysis, so it belongs to the hydrolases.',
      B: 'Transferases are classified by transfer of a functional group from a donor to an acceptor. The overall reaction here is hydrolytic cleavage of a peptide bond, which places the enzyme among hydrolases.',
      D: 'Lyases catalyze nonhydrolytic bond cleavage or addition across double bonds. Some lyases can add or remove water, but that is different from hydrolyzing a peptide bond.'
    },
    points: [
      'Proteases, also called peptidases, are hydrolases in EC class 3.',
      'Peptide-bond hydrolysis consumes water in the overall cleavage reaction.',
      'The current enzyme classification has seven main classes, including translocases as EC 7.'
    ],
    gone: [
      'at the cost of hydrolysing ATP',
      'water is the attacking species',
      '<td>Bond formation with ATP</td>',
      'cleave peptide bonds using water are classified'
    ],
    keep: [
      '<tr><td>Translocases (EC 7)</td><td>Catalyzed movement of ions or molecules across membranes</td><td>H+-transporting ATPase</td></tr>',
      '<p class=\'exp-key\'>Bottom Line: Proteases are hydrolases that cleave peptide bonds by adding water across the bond.</p>'
    ] },

  { q: 'Q58', id: 'chem-239', key: 'A',
    stem: 'What is the systematic IUPAC name of CH₃CH(CH₃)CH₂CH₃?',
    edits: [
      ['Numbering from the end nearest the branch gives the substituent the lowest locant, yielding 2-methylbutane.',
       'For this singly substituted alkane, numbering from the end nearest the branch gives the substituent the lowest locant, yielding 2-methylbutane.']
    ],
    feedback: {
      B: 'For this singly substituted butane chain, number from the end that gives the methyl group the lower locant. That gives position 2 rather than 3.',
      D: 'Isopentane is a common name for the same compound. The question specifically asks for the systematic name, which is 2-methylbutane.'
    },
    points: [
      'The molecule has five carbons in total, but its longest continuous chain contains four.',
      'A methyl group on carbon 2 gives the systematic name 2-methylbutane.',
      'Isopentane refers to the same compound by its common name.'
    ],
    gone: [
      'violates the IUPAC rule that numbering must start from the end nearest to the branch point',
      'is a common (trivial) name, not the IUPAC systematic name',
      'Always number from the end that gives the lowest locant to the substituent.',
      'IUPAC nomenclature is the preferred system in chemistry'
    ],
    keep: ['2-methylpentane would have a total of 6 carbons'] },

  { q: 'Q59', id: 'chem-240', key: 'B',
    stem: 'Which reagent is decolorized by ethene but not ethane at room temperature in the absence of ultraviolet light?',
    main: ['<strong>Bromine water</strong> loses its orange-brown color when bromine is consumed in reaction with ethene\'s C=C bond. Ethane does not produce this decolorization under the stated room-temperature conditions without ultraviolet light. This gives a visible distinction between these two hydrocarbons. Bromine decolorization is not uniquely specific to alkenes in every possible sample: other substances can also consume bromine.'],
    feedback: {
      A: 'Dilute aqueous NaOH does not provide this color-change test for ethene versus ethane. NaOH is a strong base even when its solution is dilute; base strength and concentration are different properties.',
      C: 'Concentrated sulfuric acid can react with ethene, so it could help distinguish this pair in a differently worded test. However, it is not the colored reagent that is decolorized in the reaction asked about here.',
      D: 'Anhydrous AlCl₃ is a Lewis acid catalyst in reactions such as Friedel–Crafts chemistry. It does not provide the bromine color change described in the question.'
    },
    points: [
      'Ethene consumes bromine and decolorizes bromine water through reaction at its C=C bond.',
      'Ethane does not produce the same change at room temperature without ultraviolet light.',
      'A test\'s meaning depends on the substances and conditions: bromine can also react with compounds other than alkenes.'
    ],
    gone: [
      'Dilute NaOH is a weak base',
      'specific and unambiguous for unsaturation',
      'electrophilic addition across the double bond',
      'This is a standard test for unsaturation.'
    ] },

  { q: 'Q60', id: 'chem-241', key: 'B',
    stem: 'In the absence of peroxides, addition of HBr to propene produces mainly:',
    options: [[3, '2,2-dibromopropane']],
    feedback: {
      C: '1,2-Dibromopropane is the product expected when Br₂ adds across propene\'s double bond under suitable nonaqueous conditions. Adding HBr supplies one H and one Br, not two Br atoms.',
      D: '2,2-Dibromopropane contains two bromine atoms on the central carbon. A single HBr addition across propene\'s one double bond introduces only one bromine atom, giving mainly 2-bromopropane.'
    },
    points: [
      'Under ordinary ionic conditions, H adds to propene\'s terminal double-bond carbon and Br mainly to the middle carbon.',
      'The major product is 2-bromopropane, consistent with formation of the more stable secondary carbocation intermediate.',
      'Peroxides can change the mechanism and orientation of HBr addition, which is why the reaction conditions are stated.'
    ],
    gone: [
      'is the same as 1-bromopropane',
      'would result from the addition of Br2 (molecular bromine)',
      '3-bromopropane'
    ],
    keep: [
      '1-bromopropane would be the anti-Markovnikov product',
      'the more stable secondary carbocation intermediate leads to 2-bromopropane as the major product'
    ] }

];
