/**
 * Chemistry review batch 1, items Q21-Q30 (chem-22 .. chem-31).
 * Spec shape is documented in scripts/chem-batch1-edits-a.js.
 *
 * Q26 keeps its individual five-point block; only its points 1 and 4 are
 * repaired, so it carries expectPoints: 5.
 *
 * Q30: the review asks that powers in every distractor configuration render as
 * superscripts. The stem already uses literal superscripts (1s² 2s² 2p⁶ 3s² 3p⁴)
 * but the three distractor paragraphs stored flattened forms (1s2 2s2 2p6 ...),
 * so the distractors are brought into the stem's convention. This is the bank's
 * own typography, not a change of content.
 */
'use strict';

module.exports = [
  {
    q: 'Q21', id: 'chem-22', expectLetter: 'B',
    options: [[3, 'The ethoxide ion is more resonance-stabilized than the phenoxide ion']],
    explanation: [
      ['<tr><td>Conjugate base stability</td><td>Resonance-stabilized</td><td>Not stabilized</td></tr>',
       '<tr><td>Conjugate base stability</td><td>Resonance-delocalized into the ring</td>' +
       '<td>Not resonance-delocalized into a ring</td></tr>'],
      ['<tr><td>Reacts with NaOH?</td><td>Yes (forms sodium phenoxide)</td><td>Yes (weakly)</td></tr>',
       '<tr><td>Appreciably deprotonated by dilute aqueous NaOH?</td><td>Yes (forms sodium phenoxide)</td>' +
       '<td>No, only a small fraction</td></tr>'],
      // the old distractor invoked a real bond-energy difference and its feedback
      // wrongly equated homolytic bond strength with aqueous proton loss
      ['<p><strong>D. Ethanol has stronger O-H bonds than phenol:</strong> The O-H bond dissociation energies of phenol and ethanol are actually quite similar. The difference in acidity is not primarily about bond strength but about conjugate base stability. The phenoxide ion delocalizes its negative charge into the aromatic ring through resonance, making it far more stable than the ethoxide ion.</p>',
       '<p><strong>D. The ethoxide ion is more resonance-stabilized than the phenoxide ion:</strong> The comparison is ' +
       'reversed. Phenoxide can delocalize its negative charge into the aromatic ring; ethoxide cannot. The greater ' +
       'stabilization of phenoxide helps make phenol more acidic.</p>']
    ],
    points: [
      'Acidity is assessed by the equilibrium for proton loss in the specified environment.',
      'Phenoxide is resonance-stabilized; ethoxide lacks comparable delocalization into an aromatic ring.',
      'Phenol is therefore much more acidic than ethanol and is appreciably deprotonated by dilute aqueous NaOH.'
    ],
    // the central conjugate-base explanation and the NaHCO3 comparison are retained
    keepText: ['the negative charge is delocalized across the aromatic ring through resonance',
               '<tr><td>Reacts with NaHCO₃?</td>', 'but not with NaHCO₃'],
    gone: ['O-H bond dissociation energies of phenol and ethanol are actually quite similar',
           '<td>Not stabilized</td>', '<td>Reacts with NaOH?</td>', 'Blood pH is tightly regulated']
  },

  {
    q: 'Q22', id: 'chem-23', expectLetter: 'B',
    stem: 'Which test distinguishes ethanal (CH₃CHO) from propanone (CH₃COCH₃)?',
    explanation: [
      ["<p>Tollens' reagent (ammoniacal silver nitrate, [Ag(NH₃)₂]⁺) is selectively reduced by aldehydes but not by ketones. The reaction produces a silver mirror on the test tube wall.</p>",
       "<p>Tollens' reagent (ammoniacal silver nitrate, [Ag(NH₃)₂]⁺) is reduced by ethanal, which is itself oxidized " +
       'to a carboxylate. The silver produced deposits as a mirror on the test tube wall. Propanone gives a negative ' +
       'result under the standard test conditions.</p>'],
      ['<th>Aldehyde Result</th><th>Ketone Result</th>', '<th>Ethanal (aldehyde)</th><th>Propanone (ketone)</th>'],
      ['</table><div class=\'exp-diagram\'><p><strong>Tollens\' test reaction:</strong></p>',
       "</table><p>Some other compounds, including reducing sugars, can also give positive results in these oxidation " +
       "tests.</p><div class='exp-diagram'><p><strong>Tollens' test reaction:</strong></p>"],
      // the old equation balanced neither hydrogen nor charge
      ['<p>R-CHO + 2[Ag(NH₃)₂]⁺ + 2OH⁻ -> R-COO⁻ + 2Ag(s) + 4NH₃ + H₂O</p>',
       '<p>R-CHO + 2[Ag(NH₃)₂]⁺ + 3OH⁻ → R-COO⁻ + 2Ag(s) + 4NH₃ + 2H₂O</p>'],
      ['<p>The aldehyde is oxidized to a carboxylate; Ag⁺ is reduced to metallic silver.</p>',
       '<p>Ethanal is oxidized to a carboxylate; Ag⁺ is reduced to metallic silver. Both sides of this equation carry ' +
       'a net charge of -1.</p>'],
      ['It is not a general test for distinguishing all aldehydes from all ketones.</p>',
       'It is not a general discriminator between aldehydes and ketones: the iodoform test can also be positive with ' +
       'ethanal and with ethanol. For the pair named here, both ethanal and propanone can give a positive iodoform ' +
       'result, so it would not separate them.</p>'],
      ["<p class='exp-key'>Bottom Line: Aldehydes are easily oxidized (they have an H atom on the carbonyl carbon), while ketones resist oxidation. This difference in reducibility is the basis for all aldehyde-specific tests (Tollens', Fehling's, Benedict's).</p>",
       "<p class='exp-key'>Bottom Line: Ethanal reduces Tollens' reagent to metallic silver as it is oxidized to a " +
       "carboxylate. Propanone does not under the standard test conditions. This compares ease of oxidation, not " +
       "'reducibility' of the carbonyl compounds.</p>"]
    ],
    points: [
      "Ethanal is oxidized to a carboxylate by alkaline Tollens' reagent.",
      'Silver(I) is reduced to metallic silver, producing the positive test.',
      'Propanone does not react under the same conditions, although some other carbonyl compounds can give positive oxidation tests.'
    ],
    // options A and C keep their feedback
    keepText: ['<strong>A. Litmus test:</strong> Litmus paper detects whether a solution is acidic or basic',
               '<strong>C. Flame test:</strong> The flame test identifies metal ions',
               "<td>Fehling's test</td>", "<td>Benedict's test</td>"],
    gone: ['+ 2OH⁻ -> R-COO⁻ + 2Ag(s) + 4NH₃ + H₂O', '<th>Aldehyde Result</th>',
           'This difference in reducibility is the basis for all aldehyde-specific tests',
           'selectively reduced by aldehydes but not by ketones',
           'Conservation laws (mass, energy, charge) govern all chemical reactions']
  },

  {
    q: 'Q23', id: 'chem-24', expectLetter: 'B',
    explanation: [
      ['<p>Formic acid (from Latin "formica" = ant) is the simplest carboxylic acid. It was first isolated from red ants and is responsible for the sting of ant bites.</p>',
       '<p>Formic acid is the common name of methanoic acid, HCOOH, the simplest carboxylic acid. Its name comes from ' +
       'the Latin word for ant, and it occurs in the defensive secretions of some ants.</p>'],
      ['<td>HCOOH</td><td>Ant venom</td>', '<td>HCOOH</td><td>Secretions of some ants</td>'],
      ['It is the main component of vinegar.', 'It is the main acid in vinegar.'],
      ["<p class='exp-key'>Bottom Line: Carboxylic acids (-COOH) are weak acids but stronger than alcohols and phenols. Their acidity comes from resonance stabilization of the carboxylate ion (COO⁻), where the negative charge is delocalized over both oxygen atoms equally.</p>",
       "<p class='exp-key'>Bottom Line: Methanoic acid is formic acid, HCOOH. Ethanoic acid is acetic acid, " +
       'CH₃COOH. Both contain the carboxyl group, -COOH.</p>']
    ],
    points: [
      'Methanoic acid, HCOOH, has the common name formic acid.',
      'Ethanoic acid, CH₃COOH, has the common name acetic acid.',
      'The carboxyl group, -COOH, defines this class of compounds.'
    ],
    keepText: ['<td>Oxalic acid</td>', '<td>Citric acid</td>',
               'named by replacing the -e of the parent alkane with -oic acid'],
    gone: ['responsible for the sting of ant bites', '<td>Ant venom</td>',
           'main component of vinegar', 'Blood pH is tightly regulated']
  },

  {
    q: 'Q24', id: 'chem-25', expectLetter: 'B',
    explanation: [
      ['<p>Denaturation disrupts the secondary, tertiary, and quaternary structure of a protein by breaking non-covalent interactions, but leaves the primary structure (peptide bonds and amino acid sequence) intact.</p>',
       "<p>Denaturation disrupts a protein's native folding or subunit assembly while leaving its peptide-bond sequence " +
       'intact. Heat and pH changes commonly disturb noncovalent interactions; some denaturing treatments can also ' +
       'disrupt disulfide bonds.</p>'],
      ['<tr><td>Secondary (α-helix, β-sheet)</td><td>Hydrogen bonds</td><td>Yes (disrupted)</td></tr>',
       '<tr><td>Secondary (α-helix, β-sheet)</td><td>Hydrogen bonds</td><td>Can be disrupted</td></tr>'],
      ['<tr><td>Tertiary (3D folding)</td><td>H-bonds, disulfide bridges, hydrophobic, ionic</td><td>Yes (disrupted)</td></tr>',
       '<tr><td>Tertiary (3D folding)</td><td>H-bonds, disulfide bridges, hydrophobic, ionic</td>' +
       '<td>Can be disrupted; disulfide bonds may be affected depending on treatment</td></tr>'],
      ['<tr><td>Quaternary (subunit assembly)</td><td>Non-covalent interactions</td><td>Yes (disrupted)</td></tr>',
       '<tr><td>Quaternary (subunit assembly)</td><td>Noncovalent interactions, and sometimes interchain disulfides</td>' +
       '<td>Can be disrupted</td></tr>'],
      ['<p><strong>A. Hydrolysis:</strong> Hydrolysis = breaking peptide bonds (irreversible).</p>',
       '<p><strong>A. Hydrolysis:</strong> Hydrolysis breaks peptide bonds by reaction with water, splitting a ' +
       'polypeptide into shorter fragments or amino acids. Denaturation changes folding without cleaving the peptide ' +
       'backbone.</p>'],
      ['<p><strong>D. Saponification:</strong> Saponification is the base-catalyzed hydrolysis of fats or oils (esters) to produce glycerol and soap (fatty acid salts). It is a reaction specific to lipids, not proteins, and involves actual bond breaking, unlike denaturation which disrupts only non-covalent interactions.</p>',
       '<p><strong>D. Saponification:</strong> Saponification is alkaline ester hydrolysis. For fats, it produces ' +
       'glycerol and fatty-acid salts (soap). This is chemically different from unfolding a protein.</p>'],
      ["<p class='exp-key'>Bottom Line: Denaturation = loss of shape and function, but primary structure intact. Hydrolysis = breaking peptide bonds (irreversible). A familiar example: cooking an egg denatures albumin protein (the white becomes opaque and solid).</p>",
       "<p class='exp-key'>Bottom Line: Denaturation changes folding and usually impairs function; peptide-bond " +
       'hydrolysis cuts the chain. Some denatured proteins can refold, whereas others aggregate and do not recover ' +
       'under the original conditions.</p>']
    ],
    points: [
      'Denaturation disrupts native folding or subunit organization without cleaving the peptide backbone.',
      'Heat, extreme pH and several chemicals can destabilize protein structure.',
      'Peptide-bond hydrolysis cuts the chain; it is a different process from denaturation.'
    ],
    keepText: ['Denaturing agents include: heat, extreme pH', '<strong>C. Polymerization:</strong>',
               '<td>No (preserved)</td>'],
    gone: ['base-catalyzed', 'Yes (disrupted)', 'breaking peptide bonds (irreversible)',
           'disrupts only non-covalent interactions', 'Blood pH is tightly regulated']
  },

  {
    q: 'Q25', id: 'chem-26', expectLetter: 'B',
    explanation: [
      ['<p>The presence of C=C double bonds in unsaturated fatty acids creates kinks in the hydrocarbon chain, preventing tight packing and lowering the melting point.</p>',
       '<p>Unsaturated fatty acids contain at least one C=C bond. Cis double bonds introduce bends that usually reduce ' +
       'packing and lower melting point compared with otherwise similar saturated chains; trans double bonds do not ' +
       'produce the same bend.</p>' +
       '<p>The comparisons below are typical ones for similar long-chain fatty acids. Saturation alone does not prove ' +
       'whether a substance is solid or liquid at room temperature.</p>'],
      ['<tr><td>Chain shape</td><td>Straight</td><td>Kinked (cis configuration)</td></tr>',
       '<tr><td>Typical chain shape</td><td>Straight</td><td>Bent where a cis double bond occurs</td></tr>'],
      ['<tr><td>Packing</td><td>Tight (solid at RT)</td><td>Loose (liquid/oil at RT)</td></tr>',
       '<tr><td>Typical packing</td><td>Tighter</td><td>Looser, especially for cis-unsaturated chains</td></tr>'],
      ['<p><strong>D. Unsaturated fatty acids contain nitrogen atoms:</strong> Fatty acids are composed only of carbon, hydrogen, and oxygen. They do not contain nitrogen. Nitrogen is found in amino acids, nucleotides, and amines, but not in the structure of fatty acids.</p>',
       '<p><strong>D. Unsaturated fatty acids contain nitrogen atoms:</strong> The common fatty acids discussed here ' +
       'contain carbon, hydrogen and oxygen. Nitrogen is not what defines unsaturation; a C=C bond does.</p>'],
      ["<p class='exp-key'>Bottom Line: Degree of unsaturation affects physical properties. More double bonds = lower melting point = more liquid. Cell membranes contain both saturated and unsaturated fatty acids in phospholipids, which controls membrane fluidity.</p>",
       "<p class='exp-key'>Bottom Line: Unsaturated means at least one C=C bond. Cis geometry usually reduces packing; " +
       'melting point also depends on chain length, double-bond position and geometry. Unsaturated does not ' +
       'automatically mean liquid.</p>']
    ],
    points: [
      'Saturated fatty acids contain no C=C bonds; unsaturated fatty acids contain at least one.',
      'Cis double bonds introduce bends and usually reduce packing compared with similar saturated chains.',
      'Melting point also depends on chain length and double-bond geometry, so saturation is not the sole determinant.'
    ],
    keepText: ['<td>Palmitic (C16:0), Stearic (C18:0)</td>', 'Trans fatty acids have the hydrogen atoms on opposite sides'],
    gone: ['Tight (solid at RT)', 'Loose (liquid/oil at RT)',
           'Fatty acids are composed only of carbon, hydrogen, and oxygen',
           'unsaturated fatty acids have one or more C=C bonds (liquid at room temperature)']
  },

  {
    q: 'Q26', id: 'chem-27', expectLetter: 'B', expectPoints: 5,
    explanation: [
      ['<td>alpha(1->2)</td>', '<td>α(1→2)β</td>'],
      ['<li>Sucrose is glucose joined to fructose through an α-1,2-glycosidic bond.</li>',
       '<li>Sucrose joins C1 of alpha-glucose to C2 of beta-fructose, written α(1→2)β, so both anomeric ' +
       'configurations are specified.</li>'],
      // the human intestinal enzyme is not invertase
      ['<li>Sucrase (invertase) at the intestinal brush border hydrolyses sucrose before its monosaccharides can be absorbed.</li>',
       '<li>At the human intestinal brush border, the sucrase part of sucrase-isomaltase hydrolyzes sucrose so glucose ' +
       'and fructose can be absorbed.</li>'],
      ['<p><strong>D. Fructose + Galactose:</strong> No common naturally occurring disaccharide is formed from fructose and galactose. The three most important disaccharides to know are sucrose (glucose + fructose), lactose (glucose + galactose), and maltose (glucose + glucose).</p>',
       '<p><strong>D. Fructose + Galactose:</strong> Galactose and fructose are not the components of sucrose. ' +
       'For example, lactulose contains galactose and fructose, whereas sucrose contains glucose and fructose.</p>'],
      ["<p class='exp-key'>Bottom Line: Sucrose is non-reducing because both anomeric carbons are involved in the glycosidic bond, leaving no free hemiacetal group to act as a reducing agent. This is why sucrose gives a negative result with Benedict's and Fehling's tests.</p>",
       "<p class='exp-key'>Bottom Line: Sucrose is non-reducing because both anomeric carbons are locked in the " +
       'glycosidic bond, so neither unit has a free anomeric group that can open to a carbonyl. Hydrolysis releases ' +
       'glucose and fructose, which are reducing sugars.</p>']
    ],
    keepText: ['<li>That bond ties up the anomeric carbons of both sugars',
               '<li>Compare the other common disaccharides: lactose is galactose + glucose',
               '<li>The hydrolysis is called inversion because'],
    gone: ['Sucrase (invertase)', '<td>alpha(1->2)</td>',
           'No common naturally occurring disaccharide is formed from fructose and galactose']
  },

  {
    q: 'Q27', id: 'chem-28', expectLetter: 'C',
    stem: 'Which base is one of the four standard bases of RNA, taking the place of thymine in the standard DNA base set?',
    explanation: [
      ['<p>RNA contains uracil (U) in place of thymine (T), which is found in DNA. Uracil pairs with adenine, just as thymine does.</p>',
       '<p>RNA contains uracil (U) in place of thymine (T), which is found in DNA. Uracil pairs with adenine, just as ' +
       'thymine does.</p><p>The table compares typical cellular DNA and RNA:</p>'],
      ['<tr><td>Structure</td><td>Double-stranded helix</td><td>Usually single-stranded</td></tr>',
       '<tr><td>Structure</td><td>Usually double-stranded</td><td>Usually single-stranded</td></tr>'],
      ['Base pairing: A=T (or A=U) with 2 hydrogen bonds; G triple-bond C with 3 hydrogen bonds.',
       'Base pairing: A-T (or A-U) pairs form 2 hydrogen bonds; G-C pairs form 3 hydrogen bonds.'],
      ['It always pairs with cytosine (G-C, 3 hydrogen bonds) in both types of nucleic acid.',
       'It pairs with cytosine in standard Watson-Crick base pairing (G-C, 3 hydrogen bonds) in both types of nucleic acid.'],
      ['The only base that differs between DNA and RNA is thymine (DNA only) vs. uracil (RNA only).</p>',
       'In the standard base sets, DNA uses thymine where RNA uses uracil.</p>']
    ],
    points: [
      'The standard RNA bases are A, G, C and U; standard DNA uses T in place of U.',
      'Purines are adenine and guanine; cytosine, thymine and uracil are pyrimidines.',
      'Base-pair hydrogen bonds are different from the covalent bonds of the sugar-phosphate backbone.'
    ],
    keepText: ['Bottom Line: A nucleoside = base + sugar', '<td>Deoxyribose</td>'],
    gone: ['G triple-bond C', '<td>Double-stranded helix</td>', 'thymine (DNA only) vs. uracil (RNA only)',
           'Blood pH is tightly regulated']
  },

  {
    q: 'Q28', id: 'chem-29', expectLetter: 'B',
    explanation: [
      ['<p><strong>C. Pyrroles:</strong> Pyrrole is a five-membered aromatic ring containing one nitrogen atom. While pyrrole rings are important building blocks (four pyrrole units form the porphyrin ring in hemoglobin and chlorophyll), they are not the class that adenine and guanine belong to.</p>',
       '<p><strong>C. Pyrroles:</strong> Pyrrole is a five-membered aromatic ring containing one nitrogen atom. ' +
       "Pyrrole-derived units occur in heme's porphyrin ring and the related ring system of chlorophyll. Adenine and " +
       'guanine instead contain the fused purine system.</p>'],
      ['It has no structural relationship to the nucleic acid bases.</p>',
       'It is not the fused aromatic purine framework found in adenine and guanine.</p>'],
      ['In DNA base pairing, a purine always pairs with a pyrimidine, keeping the helix width constant.',
       'In standard Watson-Crick DNA base pairing, a purine pairs with a pyrimidine, keeping the helix width constant.']
    ],
    points: [
      'A heterocycle contains at least one non-carbon atom within its ring.',
      'Purine is a fused five-plus-six-membered ring system, not a single six-membered ring.',
      'Adenine and guanine are purines; cytosine, thymine and uracil are pyrimidines.'
    ],
    // the two-ring table is already correct and is retained
    keepText: ['<td>Two fused rings (9 atoms)</td>', '<td>One ring (6 atoms)</td>',
               'CUT the PYrimidines'],
    gone: ['has no structural relationship to the nucleic acid bases', 'a purine always pairs',
           'four pyrrole units form the porphyrin ring in hemoglobin and chlorophyll',
           'purine (adenine, guanine).</li>']
  },

  {
    q: 'Q29', id: 'chem-30', expectLetter: 'B',
    explanation: [
      ['<p>All amines are basic due to the lone pair on nitrogen, which can accept a proton. Amines are generally more basic than water but less basic than hydroxide.</p>',
       '<p>Amines generally act as bases because the nitrogen lone pair can accept a proton; their basicity varies ' +
       'with structure and solvent. Amines are generally more basic than water but less basic than hydroxide.</p>']
    ],
    points: [
      'Primary, secondary and tertiary amines have one, two or three carbon groups attached directly to nitrogen.',
      'A nitrogen with four carbon groups is a quaternary ammonium ion, with a positive charge.',
      'Amine classification concerns nitrogen substitution; alcohol classification concerns the carbon bearing OH.'
    ],
    keepText: ['<td>Quaternary ammonium</td>', 'Bottom Line: Do not confuse amine classification with alcohol classification'],
    gone: ['All amines are basic due to the lone pair', 'Chemical structure determines chemical properties']
  },

  {
    q: 'Q30', id: 'chem-31', expectLetter: 'B',
    explanation: [
      ['Silicon (Z=14) has the electron configuration 1s2 2s2 2p6 3s2 3p2, with only 2 electrons in the 3p subshell. The question describes a configuration ending in 3p4 (16 electrons total), which corresponds to sulfur, not silicon.',
       'Silicon (Z=14) has the electron configuration 1s² 2s² 2p⁶ 3s² 3p², with only 2 electrons in the 3p subshell. ' +
       'The question describes a configuration ending in 3p⁴ (16 electrons total), which corresponds to sulfur, ' +
       'not silicon.'],
      ['Phosphorus (Z=15) has configuration 1s2 2s2 2p6 3s2 3p3, with 3 unpaired electrons in the half-filled 3p subshell. The question describes an atom with 3p4 (16 electrons), giving sulfur with 2 unpaired electrons.',
       'Phosphorus (Z=15) has configuration 1s² 2s² 2p⁶ 3s² 3p³, with 3 unpaired electrons in the half-filled 3p ' +
       'subshell. The question describes an atom with 3p⁴ (16 electrons), giving sulfur with 2 unpaired electrons.'],
      ['Chlorine (Z=17) has configuration 1s2 2s2 2p6 3s2 3p5, with only 1 unpaired electron. The question describes 3p4 (16 electrons = sulfur).',
       'Chlorine (Z=17) has configuration 1s² 2s² 2p⁶ 3s² 3p⁵, with only 1 unpaired electron. The question describes ' +
       '3p⁴ (16 electrons = sulfur).']
    ],
    points: [
      'The configuration contains 16 electrons, identifying the neutral atom as sulfur.',
      'Four 3p electrons occupy three orbitals as one pair and two single electrons in the ground state.',
      'The two unpaired electrons make an isolated ground-state sulfur atom paramagnetic.'
    ],
    keepText: ['Total electrons = 2+2+6+2+4 = 16 = Sulfur (S)', '&uarr;&darr;',
               'Bottom Line: To find unpaired electrons, fill orbitals singly'],
    gone: ['1s2 2s2 2p6 3s2 3p2', '1s2 2s2 2p6 3s2 3p3', '1s2 2s2 2p6 3s2 3p5',
           'Atomic structure determines chemical behavior']
  }
];
