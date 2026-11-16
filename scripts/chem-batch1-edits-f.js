/**
 * Chemistry review batch 1, items Q51-Q59 (chem-52 .. chem-60).
 * Spec shape is documented in scripts/chem-batch1-edits-a.js.
 *
 * Q60 (chem-62) is absent from this list: the review keeps it byte-identical,
 * including its existing letter-prefixed "Correct Answer: A. 0.95 atm" heading.
 *
 * Q54 is the review's most extensive rewrite: the question is now explicitly
 * about free glycine, so the explanation can no longer imply that every amino
 * acid is net-neutral at pH 7.4 or that glycine's isoelectric point is 7.4.
 * Q56 keeps its individual five-point block (expectPoints: 5); only point 4 is
 * repaired.
 */
'use strict';

module.exports = [
  {
    q: 'Q51', id: 'chem-52', expectLetter: 'B',
    options: [[1, 'A hydroxyl group (-OH) attached directly to a carbon of a C=C double bond']],
    explanation: [
      ['<h4>Correct Answer: A hydroxyl group attached to a carbon-carbon double bond</h4>',
       '<h4>Correct Answer: A hydroxyl group (-OH) attached directly to a carbon of a C=C double bond</h4>'],
      ['<p>Tautomerism is a rapid equilibrium between the keto form (C=O) and enol form (C=C-OH).</p>',
       '<p>Keto-enol tautomerism interconverts a carbonyl form and an enol form containing C=C-OH. Acid or base ' +
       'commonly catalyzes the interconversion; the rate depends on the conditions.</p>'],
      ['The enol tautomer forms when the alpha-hydrogen of a carbonyl compound migrates to the oxygen, creating C=C and -OH.',
       'In the enol tautomer a proton has moved from the alpha carbon to the oxygen and the double bond has moved from ' +
       'C=O to C=C. That net change is usually brought about by acid or base catalysis rather than a direct ' +
       'intramolecular hydrogen jump.'],
      ['Esters are formed by condensation of acids and alcohols. They are a completely different functional group from the enol form of a carbonyl.</p>',
       'Acid-catalyzed condensation of a carboxylic acid with an alcohol is one common route to an ester. Esters are a ' +
       'completely different functional group from the enol form of a carbonyl.</p>'],
      ["<p class='exp-key'>Bottom Line: Tautomers are constitutional isomers in rapid equilibrium. Keto-enol tautomerism involves migration of a hydrogen atom and rearrangement of a double bond. Unlike resonance structures, tautomers are real, distinct molecules.</p>",
       "<p class='exp-key'>Bottom Line: Tautomers are distinct constitutional isomers that can interconvert. Keto-enol " +
       'tautomerism changes the positions of a proton and a double bond. Resonance drawings instead describe the same ' +
       'molecule, with unchanged atom positions.</p>']
    ],
    points: [
      'An enol has OH attached directly to a carbon of a C=C bond.',
      'Keto and enol forms are distinct compounds that can interconvert, commonly with acid or base catalysis.',
      'Tautomerism changes atom positions; resonance drawings do not describe different compounds.'
    ],
    keepText: ['<td>R-C(OH)=CH-R\'</td>', 'certain compounds (like acetylacetone) have significant enol content'],
    gone: ['Tautomerism is a rapid equilibrium between the keto form',
           'Esters are formed by condensation of acids and alcohols.',
           'tautomers are real, distinct molecules', 'Chemical structure determines chemical properties']
  },

  {
    q: 'Q52', id: 'chem-53', expectLetter: 'B',
    explanation: [
      // the old table implied that simply mixing reactants gives amides and anhydrides
      ["<table class='exp-table'><tr><th>Reaction</th><th>Reactants</th><th>Product</th></tr><tr><td><strong>Esterification</strong></td><td><strong>Acid + alcohol</strong></td><td><strong>Ester + H₂O</strong></td></tr><tr><td>Amide formation</td><td>Acid + amine</td><td>Amide + H₂O</td></tr><tr><td>Anhydride formation</td><td>Acid + acid</td><td>Anhydride + H₂O</td></tr></table>",
       "<table class='exp-table'><tr><th>Reaction</th><th>Starting groups</th><th>Conditions/result</th></tr>" +
       '<tr><td><strong>Fischer esterification</strong></td><td><strong>Carboxylic acid + alcohol</strong></td>' +
       '<td><strong>Acid-catalyzed equilibrium giving ester + water</strong></td></tr>' +
       '<tr><td>Amide formation</td><td>Carboxylic-acid-derived acyl group + ammonia/amine</td>' +
       '<td>Usually requires activation or suitable dehydration conditions</td></tr>' +
       '<tr><td>Anhydride formation</td><td>Two carboxylic-acid-derived groups</td>' +
       '<td>Requires suitable activation or dehydration conditions</td></tr></table>'],
      ['<p>This is Fischer esterification. Esters have fruity smells and are important in fats/oils (triglycerides = glycerol + 3 fatty acids).</p>',
       '<p>This is Fischer esterification. Many small esters have fruity smells, and ester groups are central to fats ' +
       'and oils (triglycerides = glycerol + 3 fatty acids).</p>'],
      ["<p><strong>C. An amide and water:</strong> Amides (R-CO-NHR') are formed when a carboxylic acid (or its derivative) reacts with an amine, not an alcohol. The reaction of an acid with an amine forms a peptide/amide bond -- this is the linkage that joins amino acids in proteins.</p>",
       '<p><strong>C. An amide and water:</strong> Amides contain an acyl group bonded to nitrogen and are commonly ' +
       'prepared using an amine plus an activated carboxylic acid derivative. Simply mixing a carboxylic acid and an ' +
       'amine usually first forms an ammonium carboxylate salt. The nucleophile in this question is an alcohol, ' +
       'giving an ester.</p>'],
      ["<p><strong>D. An anhydride and water:</strong> Acid anhydrides (R-CO-O-CO-R') are formed by the condensation of two carboxylic acid molecules (removing water between two -COOH groups). When one of the reactants is an alcohol instead of a second acid, an ester is formed rather than an anhydride.</p>",
       '<p><strong>D. An anhydride and water:</strong> An acid anhydride joins two acyl groups through oxygen. Its ' +
       'preparation requires suitable activation or dehydration, not simply mixing two acids. The acid-catalyzed ' +
       'reaction of a carboxylic acid with an alcohol instead gives an ester and water.</p>'],
      ["<p class='exp-key'>Bottom Line: Esterification is a condensation reaction (water released) and is reversible. The reverse reaction (ester + water → acid + alcohol) is hydrolysis. Saponification is base-catalyzed ester hydrolysis of fats to produce soap.</p>",
       "<p class='exp-key'>Bottom Line: Fischer esterification is reversible: carboxylic acid + alcohol ⇌ ester + " +
       'water. Acid-catalyzed hydrolysis reverses it. Base-promoted ester hydrolysis consumes hydroxide overall and ' +
       'forms a carboxylate; with fats, this produces soap and glycerol.</p>']
    ],
    points: [
      'Fischer esterification combines a carboxylic acid and an alcohol using an acid catalyst.',
      'Ester and water form in a reversible reaction.',
      'Removing water or using an excess reactant can favor ester formation.'
    ],
    keepText: ["<p>R-COOH + R'-OH &xharr; R-COO-R' + H₂O</p>", '<strong>A. An ether and water:</strong>'],
    gone: ['Esters have fruity smells and are important', 'base-catalyzed ester hydrolysis',
           '<td>Acid + amine</td>', '<td>Acid + acid</td>', 'Blood pH is tightly regulated']
  },

  {
    q: 'Q53', id: 'chem-54', expectLetter: 'B',
    stem: 'Which of the following compounds is the strongest base in aqueous solution?',
    explanation: [
      // ammonia and acetamide are not both amines
      ['<th>Amine</th>', '<th>Compound</th>'],
      ['<h4>Correct Answer: Diethylamine</h4>', '<h4>Correct Answer: Diethylamine ((C₂H₅)₂NH)</h4>'],
      ['<td><strong>Alkyl groups donate electrons to N</strong></td>',
       '<td><strong>Electron-donating alkyl groups, together with the aqueous environment</strong></td>'],
      ['Alkyl groups on nitrogen (as in diethylamine) push electron density toward nitrogen through the inductive effect, making the lone pair more available for proton acceptance.</p>',
       'Alkyl groups on nitrogen, as in diethylamine, push electron density toward nitrogen and, in water, generally ' +
       'make the lone pair more available for proton acceptance. More alkyl groups do not always produce a stronger ' +
       'base; solvent effects matter too.</p>'],
      ["<p class='exp-key'>Bottom Line: Aliphatic amines &gt; ammonia &gt; aromatic amines &gt; amides in basicity. Electron-donating alkyl groups increase basicity; electron-withdrawing groups or resonance delocalization decrease it.</p>",
       "<p class='exp-key'>Bottom Line: For these compounds in water: diethylamine &gt; ammonia &gt; aniline &gt; " +
       'acetamide in basicity. Resonance delocalization reduces the availability of the nitrogen lone pair; solvent ' +
       'effects also matter.</p>']
    ],
    points: [
      'A base accepts a proton; an available nitrogen lone pair commonly provides the binding site.',
      'Resonance delocalization reduces nitrogen basicity in aniline and especially in amides.',
      'Among the listed compounds in water, diethylamine is the strongest base.'
    ],
    // the available-versus-delocalized lone-pair comparison is retained
    keepText: ['<td>Lone pair delocalized into C=O</td>', '<td>Lone pair delocalized into ring</td>',
               'Basicity depends on how available the nitrogen lone pair is'],
    gone: ['<th>Amine</th>', 'Aliphatic amines &gt; ammonia &gt; aromatic amines',
           'through the inductive effect, making the lone pair more available',
           'Chemical structure determines chemical properties']
  },

  {
    q: 'Q54', id: 'chem-55', expectLetter: 'B',
    stem: 'At pH 7.4, free glycine in aqueous solution predominantly exists as:',
    explanation: [
      ['<h4>Correct Answer: Zwitterions with both positive and negative charges</h4>',
       '<h4>Correct Answer: Zwitterions (dipolar ions) with both positive and negative charges</h4>'],
      ['<p>At physiological pH, the amino group is protonated (NH₃⁺) and the carboxyl group is deprotonated (COO⁻), forming an internal salt.</p>',
       '<p>Glycine has an amino group and a carboxyl group, with no ionizable side chain. At pH 7.4 its predominant ' +
       'form is H₃N⁺-CH₂-COO⁻. The amino group is mainly protonated and the carboxyl group mainly deprotonated. This ' +
       'species is a zwitterion: it carries positive and negative formal charges but has zero net charge. Other amino ' +
       'acids may carry additional side-chain charges, so the same net-charge conclusion does not apply to all of ' +
       'them.</p>'],
      ["<table class='exp-table'><tr><th>pH Condition</th><th>Amino Group</th><th>Carboxyl Group</th><th>Net Charge</th></tr><tr><td>Low pH (acidic)</td><td>NH₃⁺</td><td>COOH</td><td>Positive (+)</td></tr><tr><td><strong>Isoelectric point</strong></td><td><strong>NH₃⁺</strong></td><td><strong>COO⁻</strong></td><td><strong>Zero (zwitterion)</strong></td></tr><tr><td>High pH (basic)</td><td>NH₂</td><td>COO⁻</td><td>Negative (-)</td></tr></table>",
       "<table class='exp-table'><tr><th>Condition</th><th>Predominant glycine form</th><th>Charge of that form</th></tr>" +
       '<tr><td>Well below the carboxyl pKₐ (about 2.3)</td><td>H₃N⁺-CH₂-COOH</td><td>+1</td></tr>' +
       '<tr><td><strong>Between the two pKₐ values, including pH 7.4</strong></td>' +
       '<td><strong>H₃N⁺-CH₂-COO⁻</strong></td><td><strong>0</strong></td></tr>' +
       '<tr><td>Well above the ammonium pKₐ (about 9.6)</td><td>H₂N-CH₂-COO⁻</td><td>-1</td></tr></table>'],
      ['<p><strong>A. Uncharged molecules:</strong> Amino acids are almost never completely uncharged in aqueous solution. At physiological pH, the amino group (-NH2) picks up a proton to become -NH3+ and the carboxyl group (-COOH) loses a proton to become -COO-. This creates a zwitterion with both charges simultaneously.</p>',
       '<p><strong>A. Uncharged molecules:</strong> The predominant species is not the completely un-ionized ' +
       'NH₂-CH₂-COOH form. Glycine mainly contains both NH₃⁺ and COO⁻ groups at this pH, even though the predominant ' +
       'species has zero net charge.</p>'],
      ['<p><strong>C. Anions only (negatively charged):</strong> Amino acids exist predominantly as anions only at very high pH (well above the isoelectric point), where the amino group is deprotonated (-NH2) and the carboxyl group is also deprotonated (-COO-). At physiological pH 7.4, most amino acids carry both a positive and negative charge.</p>',
       '<p><strong>C. Anions only (negatively charged):</strong> The glycine species with net charge -1 becomes ' +
       "predominant when pH is raised above the amino group's pKₐ, about 9.6. At pH 7.4 the amino group is still " +
       'mainly NH₃⁺, so the zwitterion predominates.</p>'],
      ['<p><strong>D. Cations only (positively charged):</strong> Amino acids exist predominantly as cations only at very low pH (well below the isoelectric point), where the amino group is protonated (-NH3+) and the carboxyl group is also protonated (-COOH). At physiological pH, both ionizable groups are in their intermediate states.</p>',
       '<p><strong>D. Cations only (positively charged):</strong> The glycine species with net charge +1 predominates ' +
       'at sufficiently low pH, when the carboxyl group is mainly COOH. At pH 7.4 the carboxyl group is mainly COO⁻, ' +
       'balancing the positive amino-group charge.</p>'],
      ["<p class='exp-key'>Bottom Line: The isoelectric point (pI) is the pH at which the amino acid has no net charge. At pI, the amino acid does not migrate in an electric field. This property is used in isoelectric focusing.</p>",
       "<p class='exp-key'>Bottom Line: At pH 7.4, glycine is predominantly H₃N⁺-CH₂-COO⁻. Its isoelectric point is " +
       'about pH 6, where the population\'s average net charge is zero; that is not the same as saying zwitterions ' +
       'occur only at pI. For other amino acids, also consider ionizable side chains.</p>']
    ],
    points: [
      "Glycine's predominant form at pH 7.4 contains both NH₃⁺ and COO⁻ groups.",
      'A zwitterion has opposite formal charges within one species but zero net charge.',
      'Other amino acids can carry additional side-chain charges, so their net charge must be assessed individually.'
    ],
    gone: ['Amino acids are almost never completely uncharged', 'most amino acids carry both a positive and negative charge',
           '<th>pH Condition</th>', '<td>Low pH (acidic)</td>', 'forming an internal salt',
           'The isoelectric point (pI) is the pH at which the amino acid has no net charge',
           'Blood pH is tightly regulated']
  },

  {
    q: 'Q55', id: 'chem-56', expectLetter: 'B',
    stem: 'What makes a typical phospholipid in a human cell membrane amphipathic?',
    explanation: [
      ["<h4>Correct Answer: They have both a hydrophilic phosphate head and hydrophobic fatty acid tails</h4><table class='exp-table'>",
       '<h4>Correct Answer: They have both a hydrophilic phosphate head and hydrophobic fatty acid tails</h4>' +
       "<p>A typical two-tailed membrane phospholipid:</p><table class='exp-table'>"],
      ['<tr><td>Fatty acid tails (2)</td><td>Nonpolar hydrocarbon</td><td>Hydrophobic (faces inward)</td></tr>',
       '<tr><td>Hydrocarbon tails (two, in a typical membrane phospholipid)</td><td>Nonpolar hydrocarbon</td>' +
       '<td>Hydrophobic (faces inward)</td></tr>'],
      ['with heads facing out and tails facing in - the basis of all biological membranes.</p>',
       'with heads facing out and tails facing in, a major basis of the lipid bilayers in human cell membranes.</p>'],
      ['<p><strong>A. They contain only saturated fatty acids:</strong> Phospholipids commonly contain both saturated and unsaturated fatty acids. Having only saturated chains would make the membrane too rigid. The unsaturated chains introduce kinks that maintain membrane fluidity. Amphipathic refers to having both hydrophilic and hydrophobic regions, not fatty acid saturation.</p>',
       '<p><strong>A. They contain only saturated fatty acids:</strong> Phospholipid tails may be saturated or ' +
       'unsaturated. Saturation influences packing and fluidity, but amphipathic describes the coexistence of a ' +
       'hydrophilic region and hydrophobic regions in one molecule.</p>'],
      ['<p><strong>C. They are soluble in both acids and bases:</strong> Solubility in acids and bases describes amphoteric substances (like amino acids or aluminum oxide), not amphipathic ones. Amphipathic means having both a water-loving (hydrophilic) region and a water-fearing (hydrophobic) region within the same molecule.</p>',
       '<p><strong>C. They are soluble in both acids and bases:</strong> Amphoteric means able to react as either an ' +
       'acid or a base; it does not simply mean soluble in both acids and bases. Amphipathic instead describes a ' +
       'molecule with both hydrophilic and hydrophobic regions.</p>'],
      ["<p class='exp-key'>Bottom Line: Amphipathic molecules have both hydrophilic and hydrophobic regions. In water, they spontaneously form bilayers, micelles, or liposomes. This self-assembly is driven by the hydrophobic effect.</p>",
       "<p class='exp-key'>Bottom Line: A typical membrane phospholipid has a polar head and nonpolar tails. In water, " +
       'many two-tailed phospholipids assemble into bilayers with the tails sheltered inside. Other amphipathic ' +
       'molecules may form different structures, such as micelles.</p>']
    ],
    points: [
      'Amphipathic means having both hydrophilic and hydrophobic regions.',
      'A typical membrane phospholipid has a polar head and nonpolar hydrocarbon tails.',
      'Bilayer formation places the heads next to water and shelters the tails inside.'
    ],
    keepText: ['<td>Phosphate head group</td>', '<strong>D. They can be either solid or liquid at room temperature:</strong>'],
    gone: ['the basis of all biological membranes', '<td>Fatty acid tails (2)</td>',
           'they spontaneously form bilayers, micelles, or liposomes',
           'Lipids are hydrophobic molecules that include fats, phospholipids, steroids, and waxes']
  },

  {
    q: 'Q56', id: 'chem-57', expectLetter: 'C', expectPoints: 5,
    explanation: [
      ['<li>It is stored mainly in liver and skeletal muscle, but only liver glycogen can raise blood glucose, because muscle lacks glucose-6-phosphatase.</li>',
       '<li>Glycogen is stored mainly in liver and skeletal muscle. Liver glycogen helps maintain blood glucose, ' +
       'whereas skeletal muscle uses its glycogen locally because it lacks glucose-6-phosphatase.</li>'],
      ["<p class='exp-key'>Bottom Line: Storage polysaccharides use &alpha;-glycosidic bonds (easily hydrolyzed). Structural polysaccharides use &beta;-bonds (resistant to digestion). Humans lack the enzyme to break &beta;-1,4 bonds in cellulose.</p>",
       "<p class='exp-key'>Bottom Line: Glycogen is the main animal storage polysaccharide, with alpha-1,4 chains and " +
       'alpha-1,6 branches. Human enzymes can digest starch and mobilize glycogen, but humans lack cellulase to ' +
       "cleave cellulose's beta-1,4 glucose linkages.</p>"]
    ],
    keepText: ['<li>Glycogen is the storage polysaccharide of animals',
               '<li>Heavy branching creates many non-reducing ends',
               '<li>Cellulose is also a glucose polymer'],
    gone: ['Storage polysaccharides use &alpha;-glycosidic bonds',
           'but only liver glycogen can raise blood glucose']
  },

  {
    q: 'Q57', id: 'chem-58', expectLetter: 'B',
    explanation: [
      ["<p class='exp-key'>Bottom Line: Chargaff's rules (A=T, G=C) apply to double-stranded DNA. They do NOT apply to single-stranded DNA or RNA. GC base pairs have 3 hydrogen bonds; AT pairs have 2.</p>",
       "<p class='exp-key'>Bottom Line: For standard complementary double-stranded DNA, A = T and G = C when both " +
       'strands are counted together. These equalities are not required for an individual strand or a single-stranded ' +
       'genome. A-T pairs have two hydrogen bonds and G-C pairs have three.</p>']
    ],
    points: [
      'In standard complementary double-stranded DNA, A = T and G = C across both strands.',
      'If A is 30%, T is also 30%, leaving 40% for G and C together.',
      'Dividing that remainder equally gives 20% cytosine and 20% guanine.'
    ],
    keepText: ["Chargaff's rules: A = T and G = C", 'each = 40%/2 = <strong>20%</strong>'],
    gone: ['They do NOT apply to single-stranded DNA or RNA', 'Blood pH is tightly regulated']
  },

  {
    q: 'Q58', id: 'chem-59', expectLetter: 'C',
    explanation: [
      ['<tr><td><strong>Pyrrole</strong></td><td>5-membered, 1 N</td><td><strong>Heme (hemoglobin), chlorophyll, vitamin B12</strong></td></tr>',
       '<tr><td><strong>Pyrrole-derived units</strong></td><td>Five-membered, one N; reduction/substitution varies in ' +
       'derivatives</td><td><strong>Heme porphyrin; related tetrapyrrole frameworks in chlorophyll and vitamin ' +
       'B12</strong></td></tr>'],
      ['Pyrrole specifically refers to the five-membered ring with one NH that forms the porphyrin system.</p>',
       'Pyrrole is a five-membered ring with one nitrogen; the porphyrin framework is built from four pyrrole-derived ' +
       'units.</p>'],
      ["<p class='exp-key'>Bottom Line: Porphyrins (4 pyrrole rings) coordinate metal ions: Fe²⁺ in heme (oxygen transport), Mg²⁺ in chlorophyll (photosynthesis), Co³⁺ in vitamin B12.</p>",
       "<p class='exp-key'>Bottom Line: Heme contains iron coordinated by a porphyrin ring. Chlorophyll a and b " +
       'contain magnesium in a related chlorin-type ring, while vitamin B12 contains cobalt in a corrin ring. These ' +
       'are related tetrapyrrole frameworks, not three identical porphyrins.</p>']
    ],
    points: [
      'The heme group contains iron coordinated by a porphyrin framework.',
      'A porphyrin consists of four pyrrole-derived units linked into a larger ring.',
      'Vitamin B12 contains a related but different corrin ring, not a porphyrin.'
    ],
    // the heme explanation and the other three table rows are retained
    keepText: ['made of four pyrrole rings linked by methine bridges, with an iron (Fe²⁺) ion at the center',
               '<td>Fused 5+6 rings</td>', '<td>Pyridine</td>', '<td>Pyrimidine</td>'],
    gone: ['Co³⁺ in vitamin B12', 'the five-membered ring with one NH that forms the porphyrin system',
           '<td>5-membered, 1 N</td>',
           'Important five-membered heterocycles include pyrrole (in heme and chlorophyll)']
  },

  {
    q: 'Q59', id: 'chem-60', expectLetter: 'C',
    explanation: [
      ['<p>Across a period, nuclear charge increases while electrons are added to the same shell, increasing the pull on bonding electrons.</p>',
       '<p>Across a typical main-group period, increasing effective nuclear charge strengthens attraction for bonding ' +
       'electrons, while electrons are added within the same outer shell.</p>'],
      ['<p><strong>D. Number of electron shells:</strong> The number of electron shells remains constant across a period -- that is what defines a period. All elements in period 3, for example, have 3 electron shells. The number of shells increases when moving down a group, not across a period.</p>',
       '<p><strong>D. Number of electron shells:</strong> Across a typical main-group period, electrons are added ' +
       'within the same outer principal shell. Moving down a group introduces a new outer shell. All elements in ' +
       'period 3, for example, have 3 occupied electron shells.</p>']
    ],
    points: [
      "Electronegativity describes an atom's attraction for shared electrons in a bond.",
      'It generally increases from left to right across a main-group period.',
      'Increasing effective nuclear charge helps explain this trend and the usual decrease in atomic radius.'
    ],
    keepText: ['Bottom Line: Electronegativity measures an atom\'s ability to attract shared electrons',
               'Fluorine (3.98) is the most electronegative element', '<td>Ionization energy</td>'],
    gone: ['that is what defines a period', 'Across a period, nuclear charge increases while electrons are added',
           'Atomic structure determines chemical behavior']
  }
];
