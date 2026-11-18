/* Chemistry batch 5 edits, Q41-Q50 (chem-282..chem-291). */
'use strict';
module.exports = [

{ q: 'Q41', id: 'chem-282', key: 'B',
  stemWas: 'Hydrolysis of ethyl ethanoate (ethyl acetate) with NaOH is called:',
  optionsWere: ['Esterification', 'Saponification', 'Transesterification', 'Decarboxylation'],
  main: 'Saponification is the base-promoted hydrolysis of an ester. Hydroxide attacks the ester carbonyl, ultimately giving a carboxylate salt and an alcohol: CH₃COOCH₂CH₃ + NaOH → CH₃COONa + CH₃CH₂OH. Hydroxide is consumed in the overall reaction. Formation of the carboxylate makes the process strongly product-favored under these alkaline conditions; acidification in a separate step would give the carboxylic acid.',
  fbEdits: [
    ['A', 'saponification (base-catalyzed hydrolysis) breaks them', 'saponification (base-promoted hydrolysis) breaks them']
  ],
  feedback: {
    C: "Transesterification replaces an ester's alkoxy group with that from another alcohol, producing a different ester and an alcohol. Saponification instead converts the ester to a carboxylate salt. Some transesterification methods are base-catalyzed, so the presence of a base alone does not identify the reaction."
  },
  points: [
    'Ester hydrolysis with hydroxide gives a carboxylate and an alcohol.',
    'Hydroxide is consumed overall, so this is base-promoted rather than simply base-catalyzed hydrolysis.',
    'Acidifying the carboxylate afterward gives the corresponding carboxylic acid.'
  ],
  keep: ['Decarboxylation is the loss of CO2 from a carboxylic acid or its derivative'],
  gone: ['Base-catalyzed hydrolysis of an ester is called saponification', 'saponification is irreversible because the carboxylate anion is very stable', 'base-catalyzed hydrolysis) breaks them', 'used industrially to make biodiesel'] },

{ q: 'Q42', id: 'chem-283', key: 'B',
  stemWas: 'Decarboxylation of sodium acetate with soda lime (NaOH/CaO) produces:',
  optionsWere: ['Ethane', 'Methane', 'Ethene', 'Acetone'],
  feedback: {
    A: 'Ethane has two carbon atoms. Here, the carboxyl carbon of two-carbon sodium acetate ends up in carbonate, leaving a one-carbon hydrocarbon product, methane. The balanced equation accounts for both original carbon atoms.',
    C: 'Ethene has two carbons and a C=C bond. Sodium acetate instead gives one-carbon methane in this reaction. The stated reaction replaces the carboxylate group with hydrogen; it does not create an alkene from this substrate.'
  },
  fbEdits: [
    ['D', 'is a straightforward loss of CO2 (as Na<sub>2</sub>CO<sub>3</sub>)', 'removes the carboxyl carbon into Na<sub>2</sub>CO<sub>3</sub>']
  ],
  points: [
    'Heating sodium acetate with soda lime gives methane and sodium carbonate.',
    'The hydrocarbon product has one carbon fewer than the starting acetate ion.',
    'The removed carboxyl carbon remains accounted for in carbonate.'
  ],
  keep: ['Acetone can be formed by dry distillation of calcium acetate', 'CH₃COONa + NaOH → CH₄ + Na₂CO₃'],
  gone: ['straightforward loss of CO2 (as Na<sub>2</sub>CO<sub>3</sub>)', 'No elimination occurs, so unsaturated products do not form'] },

{ q: 'Q43', id: 'chem-284', key: 'C',
  stemWas: 'Which of the following is an anhydride?',
  optionsWere: ['CH₃COOCH₃', 'CH₃CONHCH₃', '(CH₃CO)₂O', 'CH₃COCl'],
  feedback: {
    B: 'CH₃CONHCH₃ is N-methylacetamide, containing a carbonyl carbon bonded to nitrogen. Its N–H group can donate hydrogen bonds, while its carbonyl oxygen can accept them. Its resistance to hydrolysis is mainly explained by amide resonance and poor leaving-group ability, not by the mere presence of an N–H bond.'
  },
  points: [
    'An acid anhydride has two acyl groups connected through an oxygen atom.',
    'Acetic anhydride is CH₃CO–O–COCH₃, often written (CH₃CO)₂O.',
    'Distinguish anhydrides from esters, amides and acid chlorides by the group attached to the acyl carbon.'
  ],
  keep: ['CH3COOCH3 is methyl acetate, an ester', 'CH3COCl is acetyl chloride, an acid chloride'],
  gone: ['The N-H bond in amides gives them high boiling points and makes them resistant to hydrolysis'] },

{ q: 'Q44', id: 'chem-285', key: 'B',
  stemWas: 'Aspirin is produced by the acetylation of salicylic acid with:',
  optionsWere: ['Acetic acid', 'Acetic anhydride', 'Acetaldehyde', 'Acetone'],
  feedback: {
    A: "Acetic acid is much less effective than acetic anhydride for acetylating salicylic acid's phenolic hydroxyl group in the standard laboratory synthesis. Acetic anhydride provides an activated acetyl group and is the intended reagent here.",
    C: 'Acetaldehyde does not transfer an acetyl group in the reaction used to make aspirin. Forming aspirin requires an ester at the phenolic oxygen, which is readily achieved with an activated acetyl donor such as acetic anhydride.'
  },
  points: [
    'Aspirin is acetylsalicylic acid.',
    "Acetylation converts salicylic acid's phenolic hydroxyl group into an ester.",
    'Acetic anhydride supplies the acetyl group; the carboxylic-acid group is retained.'
  ],
  keep: ['Acetone (CH3COCH3) is a ketone that does not serve as an acetylating agent'],
  gone: ['It would react with the -OH group of salicylic acid to form a hemiacetal', 'could theoretically acetylate the -OH group'] },

{ q: 'Q45', id: 'chem-286', key: 'C',
  stemWas: 'Which carboxylic acid derivative has the highest boiling point?',
  optionsWere: ['Ethyl acetate (MW 88)', 'Propionic acid (MW 74)', 'Butanamide (MW 87)', 'Butanoyl chloride (MW 107)'],
  stem: 'Which of the following compounds has the highest normal boiling point at 1 atm?',
  main: 'Butanamide has the highest normal boiling point in this set, about 216 °C. Its primary amide group has N–H hydrogen-bond donors and a carbonyl oxygen that accepts hydrogen bonds, allowing strong intermolecular association. Its large amide dipole also contributes. The result depends on the combined intermolecular interactions and molecular structure, not molecular mass alone or a universal claim that N–H hydrogen bonds exceed O–H hydrogen bonds in strength.',
  feedback: {
    A: "Ethyl acetate boils at about 77 °C. Its oxygen atoms can accept hydrogen bonds, but it has no O–H or N–H group to donate hydrogen bonds between its own molecules, so it lacks butanamide's extensive self-association.",
    B: 'Propionic acid boils at about 141 °C and associates strongly through hydrogen bonding. It nevertheless boils below butanamide in this set. Compare the overall interactions of these compounds rather than assuming that every amide–amide hydrogen bond is stronger than every acid–acid hydrogen bond.',
    D: 'Butanoyl chloride boils at about 102 °C despite its higher molecular mass. It is polar and can participate in interactions with hydrogen-bond donors, but it has no O–H or N–H group for the strong self-association available to butanamide.'
  },
  points: [
    'Boiling points reflect intermolecular attraction as well as molecular size and shape.',
    'In a primary amide, N–H groups donate hydrogen bonds and the carbonyl oxygen accepts them.',
    'Butanamide boils highest in this set; molecular mass alone does not predict the ranking.'
  ],
  gone: ['Carboxylic acids form dimers through H-bonding but have lower MW here', 'amides have even stronger hydrogen bonding due to the N-H bond', 'hydrogen bonding ability trumps molecular weight'] },

{ q: 'Q46', id: 'chem-287', key: 'B',
  stemWas: 'The Hell-Volhard-Zelinsky (HVZ) reaction introduces a bromine at which position of a carboxylic acid?',
  optionsWere: ['The carbonyl carbon', 'The α-carbon', 'The β-carbon', 'The terminal carbon'],
  stem: 'In Hell-Volhard-Zelinsky bromination of butanoic acid, followed by aqueous work-up, which carbon has a hydrogen replaced by bromine in the final acid product?',
  mainEdits: [
    ['The product is an α-bromo carboxylic acid.', 'The substrate must have an α-hydrogen. Aqueous work-up converts the acyl bromide back into a carboxylic acid, so the product is an α-bromo carboxylic acid; butanoic acid gives 2-bromobutanoic acid.']
  ],
  feedback: {
    A: 'An acyl bromide is an intermediate, so bromine is temporarily bonded to the carbonyl carbon. Aqueous work-up restores the carboxylic-acid group. The hydrogen-to-bromine substitution retained in the final product is on the adjacent α-carbon.',
    D: 'In butanoic acid, the terminal methyl carbon is C4, whereas the α-carbon is C2. The reaction brominates C2 through an enol intermediate, not the terminal C4 position.'
  },
  points: [
    'HVZ bromination replaces an α-hydrogen in a suitable carboxylic acid.',
    'An acyl bromide and its enol participate before aqueous work-up restores the acid group.',
    'Butanoic acid gives 2-bromobutanoic acid, distinguishing its α-carbon from its terminal carbon.'
  ],
  keep: ['The β-carbon (two carbons away from the carbonyl) is not the site of bromination'],
  gone: ['Bromine does not substitute at the carbonyl carbon in the HVZ reaction', 'Selective terminal functionalization is quite difficult in organic chemistry'] },

{ q: 'Q47', id: 'chem-288', key: 'B',
  stemWas: 'Reduction of a carboxylic acid with LiAlH₄ produces:',
  optionsWere: ['An aldehyde', 'A primary alcohol', 'A secondary alcohol', 'An alkane'],
  stem: 'After treatment of an alkyl carboxylic acid (RCOOH) with excess LiAlH₄ followed by aqueous work-up, the organic product is:',
  main: 'LiAlH₄ reduces RCOOH to RCH₂OH after aqueous work-up, giving a primary alcohol. Sufficient reagent is needed because the acidic proton also consumes hydride. Reduction proceeds beyond the aldehyde oxidation level, so an aldehyde is not normally isolated. Ordinary NaBH₄ alone does not perform this carboxylic-acid reduction under standard conditions.',
  feedback: {
    A: 'An aldehyde is not normally isolated because the reducing conditions also convert that carbonyl functionality to an alcohol. The product after work-up is RCH₂OH.',
    D: 'An alkane would have lost the oxygen functionality entirely. This carboxylic-acid reduction retains one oxygen as the alcohol group, producing RCH₂OH rather than removing that oxygen to give an alkane.'
  },
  points: [
    'Excess LiAlH₄ followed by aqueous work-up converts an alkyl carboxylic acid to a primary alcohol.',
    'The carboxyl carbon is retained as the alcohol-bearing carbon.',
    'Standard NaBH₄ conditions reduce aldehydes and ketones but not ordinary carboxylic acids.'
  ],
  keep: ['A secondary alcohol has two carbon substituents on the carbon bearing the -OH'],
  gone: ['The reduction proceeds through an aldehyde intermediate, but lialh4 is strong enough', 'Clemmensen or Wolff-Kishner reduction of a ketone or aldehyde'] },

{ q: 'Q48', id: 'chem-289', key: 'B',
  stemWas: 'The correct order of basicity is:',
  optionsWere: ['NH₃ > CH₃NH₂ > (CH₃)₂NH', '(CH₃)₂NH > CH₃NH₂ > NH₃', 'CH₃NH₂ > (CH₃)₂NH > NH₃', '(CH₃)₃N > (CH₃)₂NH > CH₃NH₂'],
  stem: 'Which sequence gives the correct order of base strength in dilute aqueous solution near 25 °C?',
  main: 'In this aqueous comparison, dimethylamine is slightly more basic than methylamine, and both are more basic than ammonia. Alkyl electron donation favors proton acceptance, but water stabilizes the bases and their conjugate acids differently. The observed order therefore depends on both electronic effects and solvation, not simply on counting methyl groups.',
  feedback: {
    A: 'This sequence puts ammonia ahead of the two methyl-substituted amines. In water, methylamine and dimethylamine are stronger bases than ammonia, so that ranking is reversed.',
    C: 'Methylamine and dimethylamine are close in aqueous basicity, but dimethylamine is slightly stronger under the stated conditions. Adding an alkyl group does not provide a universal ranking for every amine in every solvent.',
    D: 'Trimethylamine is less basic than dimethylamine in water; the ordering shown is associated with the gas-phase comparison instead. Trimethylammonium, (CH₃)₃NH⁺, has one N–H bond and can donate a hydrogen bond. Its solvation is less favorable than that of the less substituted ammonium ions; it does not lack N–H bonds altogether.'
  },
  points: [
    'The aqueous order in this comparison is (CH₃)₂NH > CH₃NH₂ > NH₃.',
    'Both electron donation and solvation affect amine basicity.',
    'Protonating trimethylamine gives (CH₃)₃NH⁺, which has one N–H bond; gas-phase and aqueous rankings can differ.'
  ],
  gone: ['has no N-H bonds available for stabilizing hydrogen bonds with water', 'In the gas phase and in general, adding alkyl groups to nitrogen increases basicity', 'due to steric hindrance to solvation despite having three methyl groups'] },

{ q: 'Q49', id: 'chem-290', key: 'B',
  stemWas: 'Aniline is a weaker base than cyclohexylamine because:',
  optionsWere: ['Aniline has a higher molecular weight', 'The nitrogen lone pair in aniline is delocalized into the benzene ring', 'Aniline has more hydrogen atoms', 'Cyclohexylamine has a phenyl group'],
  feedback: {
    A: "Aniline, C₆H₇N, actually has a lower molecular mass than cyclohexylamine, C₆H₁₃N. Molecular mass does not explain the basicity difference. The key structural distinction here is delocalization of aniline's nitrogen lone pair into the aromatic ring."
  },
  points: [
    "Aniline's nitrogen lone pair can delocalize into its aromatic ring.",
    'This reduces its availability for protonation compared with an ordinary alkylamine.',
    'Cyclohexylamine has a saturated ring and lacks this aromatic lone-pair delocalization.'
  ],
  keep: ['Aniline actually has fewer hydrogen atoms than cyclohexylamine', 'This statement has the structures confused'],
  gone: ['This is a purely electronic effect, not related to molecular size', 'Molecular weight has no meaningful effect on basicity'] },

{ q: 'Q50', id: 'chem-291', key: 'C',
  stemWas: 'Which amino acid has a nonpolar, hydrophobic side chain?',
  optionsWere: ['Serine', 'Aspartate', 'Leucine', 'Lysine'],
  mainEdits: [
    ['Serine has a hydroxyl group (polar), aspartate has a carboxyl group (charged), and lysine has an amino group (charged at physiological pH).', 'Serine has a polar hydroxyl group; at physiological pH the side chain of aspartate contains –COO⁻ and that of lysine is predominantly –NH₃⁺.']
  ],
  feedback: {
    A: "Serine's side chain is –CH₂OH. Its hydroxyl group can form hydrogen bonds, making the side chain polar rather than hydrocarbon-like and hydrophobic.",
    B: "Aspartate's side chain is predominantly –CH₂COO⁻ at physiological pH. This negative charge interacts strongly with water, unlike leucine's nonpolar side chain.",
    D: "Lysine's side-chain amino group is predominantly protonated as –NH₃⁺ at physiological pH. That positive charge makes the side chain hydrophilic rather than nonpolar."
  },
  points: [
    "Leucine's side chain is a nonpolar hydrocarbon group.",
    'Serine is polar, while aspartate and lysine have charged side chains near physiological pH.',
    "Classify side chains separately from the amino acid's shared backbone groups."
  ],
  keep: ['Leucine has an isobutyl side chain'],
  gone: ['(charged at physiological ph)', 'aspartate has a carboxyl group (charged)'] }

];
