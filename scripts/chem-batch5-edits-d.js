/* Chemistry batch 5 edits, Q31-Q40 (chem-272..chem-281). */
'use strict';
module.exports = [

{ q: 'Q31', id: 'chem-272', key: 'C',
  stemWas: 'Which of the following carbonyl compounds does NOT undergo the iodoform reaction?',
  optionsWere: ['Acetaldehyde', 'Acetone', 'Benzaldehyde', 'Methyl ethyl ketone'],
  main: 'Benzaldehyde lacks the CH₃CO– arrangement needed for this carbonyl comparison and gives a negative iodoform test. Acetone and butan-2-one are methyl ketones and are positive. Ethanal is also positive even though it is an aldehyde. Suitable alcohols can be positive after oxidation; ethanol is the important primary-alcohol example.',
  feedback: {
    A: 'Ethanal, CH₃CHO, gives a positive iodoform test. It is the usual aldehyde exception to the shorthand description of this as a methyl-ketone test.',
    B: 'Acetone, CH₃COCH₃, is a methyl ketone. Under the test conditions it gives the characteristic yellow iodoform precipitate.',
    D: 'Methyl ethyl ketone is butan-2-one, CH₃COCH₂CH₃. It contains a methyl group directly attached to the carbonyl carbon and therefore gives a positive iodoform test.'
  },
  points: [
    'Methyl ketones contain CH₃CO– and ordinarily give a positive iodoform test.',
    'Ethanal and ethanol are important positive examples outside the methyl-ketone class.',
    'Benzaldehyde lacks the required methyl-carbonyl arrangement and is negative.'
  ],
  gone: ['all have this feature', 'The iodoform reaction requires a methyl group adjacent to the carbonyl'] },

{ q: 'Q32', id: 'chem-273', key: 'B',
  stemWas: 'The product of Grignard reaction between CH₃MgBr and formaldehyde (HCHO), after hydrolysis, is:',
  optionsWere: ['Methanol', 'Ethanol', 'Propan-1-ol', 'Propan-2-ol'],
  feedback: {
    C: 'Propan-1-ol can be prepared by adding ethylmagnesium bromide to formaldehyde, followed by aqueous work-up. The reagent in this question is methylmagnesium bromide, so the product has only two carbons and is ethanol.',
    D: 'Propan-2-ol would result from CH₃MgBr adding to ethanal, followed by aqueous work-up. Adding CH₃MgBr to acetone instead gives the tertiary alcohol 2-methylpropan-2-ol. The formaldehyde used here gives a primary alcohol.'
  },
  points: [
    'Grignard addition forms a C–C bond; aqueous work-up protonates the resulting alkoxide.',
    'Formaldehyde gives a primary alcohol, other ordinary aldehydes a secondary alcohol and ketones a tertiary alcohol.',
    'CH₃MgBr supplies one carbon and formaldehyde supplies one carbon, giving two-carbon ethanol.'
  ],
  keep: ['Methanol (CH3OH) has only one carbon'],
  gone: ['would form if CH3MgBr reacted with acetaldehyde', 'ketones also give secondary (or tertiary with excess) alcohols'] },

{ q: 'Q33', id: 'chem-274', key: 'B',
  stemWas: 'Cannizzaro reaction is characteristic of aldehydes that:',
  optionsWere: ['Have α-hydrogens', 'Lack α-hydrogens', 'Are unsaturated', 'Contain a methyl group'],
  stem: 'The classic Cannizzaro reaction in concentrated aqueous alkali is characteristic of aldehydes that:',
  mainEdits: [
    ['Aldehydes with α-hydrogens undergo aldol condensation instead.', 'Aldehydes with readily enolizable α-hydrogens generally favor competing aldol chemistry under basic conditions.']
  ],
  fbEdits: [
    ['A', 'Aldehydes with alpha-hydrogens preferentially undergo', 'Aldehydes with readily enolizable alpha-hydrogens preferentially undergo']
  ],
  feedback: {
    C: 'The presence of another double or triple bond is not the defining criterion. The classic examples are non-enolizable aldehydes such as benzaldehyde and formaldehyde, which lack α-hydrogens and can undergo disproportionation in concentrated alkali.'
  },
  points: [
    'Classic Cannizzaro substrates include formaldehyde and benzaldehyde, which have no α-hydrogens.',
    'One aldehyde molecule is oxidized to a carboxylate while another is reduced to an alcohol.',
    'Aldehydes with readily enolizable α-hydrogens commonly undergo competing aldol reactions in base.'
  ],
  keep: ['One molecule is oxidized to a carboxylate and the other is reduced to an alcohol (disproportionation)', 'Containing a methyl group is not relevant to the Cannizzaro reaction'],
  gone: ['cinnamaldehyde', 'Aldehydes with α-hydrogens undergo aldol condensation instead'] },

{ q: 'Q34', id: 'chem-275', key: 'B',
  stemWas: 'Reduction of a ketone with NaBH₄ produces:',
  optionsWere: ['A primary alcohol', 'A secondary alcohol', 'A tertiary alcohol', 'An alkane'],
  mainEdits: [
    ['Aldehyde reduction gives a primary alcohol.', 'Most aldehydes give primary alcohols on reduction; formaldehyde gives methanol.']
  ],
  feedback: {
    A: 'Reducing an aldehyde such as ethanal gives a primary alcohol. A ketone already has two carbon groups attached to its carbonyl carbon; those two groups remain attached after reduction, so the new alcohol site is secondary.'
  },
  points: [
    "NaBH₄ reduces a ketone's carbonyl group to an alcohol after protonation.",
    'The alcohol-bearing carbon retains two carbon substituents, making the product secondary.',
    'This reduction adds hydrogen without adding a carbon substituent or removing the oxygen atom.'
  ],
  keep: ['A tertiary alcohol has three carbon groups attached', 'Clemmensen reduction'],
  gone: ['<p><strong>A. A primary alcohol:</strong> Aldehyde reduction gives a primary alcohol.</p>'] },

{ q: 'Q35', id: 'chem-276', key: 'B',
  stemWas: 'Which of the following is the correct order of reactivity toward nucleophilic addition?',
  optionsWere: ['Acetone > Formaldehyde > Acetaldehyde', 'Formaldehyde > Acetaldehyde > Acetone', 'Acetaldehyde > Formaldehyde > Acetone', 'Acetone > Acetaldehyde > Formaldehyde'],
  fbEdits: [
    ['A', 'is the reverse of the correct trend', 'incorrectly places acetone first']
  ],
  points: [
    'Formaldehyde is least hindered and has no electron-donating alkyl substituents on its carbonyl carbon.',
    'Alkyl substituents both hinder nucleophilic approach and reduce carbonyl electrophilicity.',
    'The usual comparison is formaldehyde > ethanal > acetone for nucleophilic addition.'
  ],
  keep: ['incorrectly places acetaldehyde as most reactive', 'is exactly backwards'],
  gone: ['Acetone > Formaldehyde > Acetaldehyde is the reverse of the correct trend'] },

{ q: 'Q36', id: 'chem-277', key: 'A',
  stemWas: 'The reaction of acetone with HCN produces:',
  optionsWere: ['Acetone cyanohydrin', 'Acetonitrile', 'Lactic acid', 'Acrylonitrile'],
  feedback: {
    C: "Hydrolysis of acetone cyanohydrin's nitrile group gives 2-hydroxy-2-methylpropanoic acid, (CH₃)₂C(OH)COOH, after acidic work-up. It does not give lactic acid. Lactic acid has three carbons and can instead be obtained by hydrolyzing the cyanohydrin of ethanal. The immediate product asked for here is acetone cyanohydrin."
  },
  points: [
    'Cyanide attacks the carbonyl carbon, and protonation gives a cyanohydrin.',
    'The original carbonyl carbon ends up bonded to both –OH and –CN.',
    "Cyanohydrin formation adds one carbon; acetone's three carbons become four in its cyanohydrin."
  ],
  keep: ['Acetonitrile (CH3CN) is a nitrile', 'Acrylonitrile (CH2=CHCN) is an unsaturated nitrile', '<div style="text-align:center;margin:12px 0"></div>'],
  gone: ['Lactic acid (2-hydroxypropanoic acid) would require hydrolysis of the cyanohydrin', 'So lactic acid could be a downstream product'] },

{ q: 'Q37', id: 'chem-278', key: 'B',
  stemWas: 'Treatment of an aldehyde with excess alcohol in the presence of acid catalyst gives:',
  optionsWere: ['A hemiacetal', 'An acetal', 'An ester', 'An enol ether'],
  stem: 'An aldehyde is treated with excess alcohol and an acid catalyst while water is removed. Which product is favored?',
  main: 'An alcohol first adds to the aldehyde to form a hemiacetal, with –OH and –OR on the same carbon. Further reaction with alcohol under acid catalysis can give an acetal, with two –OR groups on that carbon, plus water. The reaction is reversible: excess alcohol and removal of water favor acetal formation, whereas aqueous acid favors hydrolysis. Some cyclic hemiacetals, including those in sugars, are stable and abundant.',
  feedback: {
    A: 'A hemiacetal has one –OH and one –OR group on the former carbonyl carbon. Under the stated conditions, further reaction and removal of water favor the acetal. Hemiacetals are not universally unstable; cyclic sugar forms are important examples.',
    D: 'An enol ether has an alkoxy group attached to a C=C bond. The favored product here instead has two –OR groups on the former aldehyde carbon and no carbonyl-derived C=C bond.'
  },
  points: [
    'A hemiacetal has –OH and –OR on one carbon; an acetal has two –OR groups there.',
    'Excess alcohol and removal of water favor acetal formation in this reversible reaction.',
    'Acetals can protect carbonyl groups and can be hydrolyzed with aqueous acid.'
  ],
  keep: ["An ester (R-COOR') is formed by the reaction of a carboxylic acid"],
  gone: ['unstable intermediate with –OH and –OR on the same carbon', 'Hemiacetals are unstable intermediates on the way to acetals', 'forming a stable acetal'] },

{ q: 'Q38', id: 'chem-279', key: 'D',
  stemWas: 'Which of the following carboxylic acids is the strongest?',
  optionsWere: ['CH₃COOH', 'ClCH₂COOH', 'Cl₂CHCOOH', 'Cl₃CCOOH'],
  points: [
    'Chlorine substituents withdraw electron density through the inductive effect.',
    "Stabilizing the carboxylate conjugate base increases the acid's strength.",
    'In this series, acidity increases from acetic acid to mono-, di- and trichloroacetic acid.'
  ],
  keep: ['Acetic acid (CH3COOH, pKa 4.76) is the weakest acid in this series', 'Chloroacetic acid (ClCH2COOH, pKa 2.86)', 'Dichloroacetic acid'] },

{ q: 'Q39', id: 'chem-280', key: 'B',
  stemWas: 'Fischer esterification involves the reaction of a carboxylic acid with an alcohol in the presence of:',
  optionsWere: ['A base catalyst', 'An acid catalyst (e.g., H₂SO₄)', 'NaOH', 'LiAlH₄'],
  mainEdits: [
    ['so excess alcohol or removal of water drives it to completion.', 'so excess alcohol or removal of water shifts the equilibrium toward ester formation.']
  ],
  feedback: {
    A: 'A base mainly deprotonates the starting carboxylic acid to form a carboxylate salt, rather than catalyzing Fischer esterification. This reaction uses acid to make the carbonyl more susceptible to attack by the alcohol.',
    D: 'LiAlH₄ is a reducing reagent, not a Fischer esterification catalyst. With sufficient reagent under suitable anhydrous conditions, a carboxylic acid can be reduced to a primary alcohol after aqueous work-up. The acidic proton consumes some hydride, but it does not make carboxylic-acid reduction impossible. Reducing one carboxylic-acid molecule does not generate the two alcohol molecules obtained by reducing an ester.'
  },
  points: [
    'Fischer esterification combines a carboxylic acid and an alcohol to give an ester and water.',
    "Acid catalysis increases the carbonyl's susceptibility to nucleophilic attack.",
    'Removing water or using excess alcohol shifts the equilibrium toward the ester.'
  ],
  keep: ['NaOH is a strong base that would deprotonate the carboxylic acid to form a carboxylate salt'],
  gone: ['drives it to completion', 'A base catalyst would actually promote hydrolysis of an ester', 'would give two alcohol molecules, not an ester', 'LiAlH4 reductions must be carried out in anhydrous ether'] },

{ q: 'Q40', id: 'chem-281', key: 'B',
  stemWas: 'The correct order of reactivity of carboxylic acid derivatives toward nucleophilic acyl substitution is:',
  optionsWere: ['Ester > Amide > Acid chloride > Anhydride', 'Acid chloride > Anhydride > Ester > Amide', 'Amide > Ester > Anhydride > Acid chloride', 'Anhydride > Acid chloride > Amide > Ester'],
  mainEdits: [
    ['and –NH₂ is a poor leaving group.', 'and NH₂⁻ is a poor leaving group.']
  ],
  fbEdits: [
    ['C', 'stabilizing the C=O and making it resistant', 'stabilizing the amide group and making it resistant']
  ],
  feedback: {
    A: 'This order incorrectly places esters and amides above acid chlorides and anhydrides. The usual relative leaving-group ability is Cl⁻ > RCOO⁻ > RO⁻ > NH₂⁻. Chloride and carboxylate leave more readily; alkoxide and especially amide anions are poor leaving groups. Resonance donation into the acyl group also affects reactivity.'
  },
  points: [
    'The usual order is acid chloride > anhydride > ester > amide.',
    'Better leaving groups generally make nucleophilic acyl substitution easier.',
    'Nitrogen-to-carbonyl resonance donation makes ordinary amides especially resistant to this reaction.'
  ],
  keep: ['peptide bonds (amide bonds) are kinetically stable in proteins', 'incorrectly places anhydrides above acid chlorides'],
  gone: ['and –NH₂ is a poor leaving group', 'stabilizing the C=O and making it resistant', 'is essentially the reverse of the correct order'] }

];
