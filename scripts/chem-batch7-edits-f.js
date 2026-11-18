/* Chemistry batch 7, display Q51-Q60 (chem-412 .. chem-421).
   Prime marks use the bank's existing ASCII apostrophe convention. */
'use strict';
module.exports = [

{ q: 'Q51', id: 'chem-412', key: 'A',
  main: "A nucleoside contains a nitrogenous base attached to ribose or deoxyribose. A nucleotide is a phosphorylated nucleoside: phosphate is attached through a sugar oxygen, commonly at the 5' position, although other positions occur. In ATP, the first phosphate is linked to the sugar and the additional phosphates are linked to one another. Adenosine is a nucleoside; adenosine 5'-monophosphate (AMP) is a nucleotide.",
  keep: ['Remember: nucleotide = nucleoside + phosphate.',
         'Both nucleosides and nucleotides can contain either ribose (RNA) or deoxyribose (DNA).'],
  gone: ["is a nucleoside with one or more phosphate groups esterified to the 5' carbon of the sugar",
         'adenosine (nucleoside) + phosphate = adenosine monophosphate/AMP (nucleotide)'] },

{ q: 'Q52', id: 'chem-413', key: 'C',
  stemWas: 'The bond connecting a purine or pyrimidine base to the ribose sugar in a nucleoside is called:',
  stem: "In the standard nucleosides of DNA and RNA, what is the bond joining a purine or pyrimidine base to C-1' of the sugar called?",
  main: "In the standard nucleosides of DNA and RNA, the base is linked to the sugar by a β-N-glycosidic bond. It joins N-9 of a purine or N-1 of a pyrimidine to the sugar's anomeric carbon, C-1'. The N indicates attachment through nitrogen, distinguishing it from the O-glycosidic links commonly discussed in carbohydrates. This is a statement of connectivity, not a claim that nucleosides are synthesized in cells simply by eliminating water from a free base and sugar.",
  points: [
    'In standard DNA/RNA nucleosides, purines attach through N-9 and pyrimidines through N-1',
    "The sugar attachment is at C-1', the anomeric carbon",
    'The standard nucleosides in DNA and RNA have β-N-glycosidic base-sugar bonds'
  ],
  keep: ['Phosphodiester bonds link successive nucleotides in the sugar-phosphate backbone',
         'Disulfide bonds (S–S) form between cysteine residues in proteins.',
         "The base-sugar bond in nucleosides is a β-N-glycosidic bond"],
  gone: ['This is a C–N bond formed by a condensation reaction with loss of water.',
         'The N-glycosidic bond is in the β configuration in all natural nucleosides'] },

{ q: 'Q53', id: 'chem-414', key: 'D',
  stemWas: "In the DNA backbone, the bond between the 3'-hydroxyl of one nucleotide and the 5'-phosphate of the next nucleotide is called a:",
  stem: 'What is the most specific name for the phosphate linkage connecting successive sugars in the DNA backbone?',
  options: [[0, 'Phosphoester bond', 'Phosphomonoester bond']],
  fb: {
    A: "A phosphomonoester has phosphate esterified to one alcohol group, as in AMP. In the DNA backbone, a phosphate links the 3' oxygen of one sugar and the 5' oxygen of the next, so the linkage is a phosphodiester."
  },
  keep: ['Because the phosphate forms ester bonds with two different sugar molecules, this linkage is called a <strong>phosphodiester bond</strong>.',
         '"Di" in phosphodiester means the phosphate is esterified to two different sugar molecules',
         'Nucleases cleave phosphodiester bonds'],
  gone: ['Phosphoester bond', 'A phosphoester (phosphomonoester) involves a phosphate bonded to only one alcohol group.',
         "Individual nucleotides like AMP have phosphoester bonds at the 5' position."] },

{ q: 'Q54', id: 'chem-415', key: 'B',
  pointEdits: [
    [1, "Chargaff's rules: %A = %T and %G = %C (in double-stranded DNA only)",
        'In conventional double-stranded DNA, %A = %T and %G = %C because of complementary base pairing'],
    [3, "Chargaff's rules do not apply to single-stranded DNA or RNA",
        'Single-stranded nucleic acids need not satisfy these equalities. Complementary double-stranded RNA instead has A = U and G = C']
  ],
  keep: ['A forms 2 hydrogen bonds with T; G forms 3 hydrogen bonds with C',
         'G + C = 100% − 44% = 56%'],
  gone: ["Chargaff's rules do not apply to single-stranded DNA or RNA", '(in double-stranded DNA only)'] },

{ q: 'Q55', id: 'chem-416', key: 'B',
  mainEdits: [['In DNA base pairing, a large purine always pairs with a smaller pyrimidine to maintain a consistent helix diameter.',
               'In standard Watson-Crick pairing, a purine pairs with a pyrimidine: A with T in DNA, and G with C.']],
  fb: {
    C: 'Adenine and guanine do have two fused rings, but they are purines, not pyrimidines. The error is the category label; the two-ring description of these particular bases is correct.'
  },
  pointEdits: [
    [1, 'Mnemonic: PURines are Pure (A and G) - the word "pure" has fewer letters, but the molecules are bigger (double ring)',
        'Purines are adenine and guanine; each has two fused rings'],
    [3, 'Purine-pyrimidine pairing (A-T, G-C) maintains the constant 2-nm width of the DNA double helix',
        'Standard purine-pyrimidine base pairing helps maintain the approximately 2-nm diameter of the usual B-DNA double helix']
  ],
  bl: 'Purines (A, G) have two fused rings; pyrimidines (C, T, U) have one ring. Standard Watson-Crick pairs combine one purine with one pyrimidine.',
  keep: ['Mnemonic: PYRimidines CUT - Cytosine, Uracil, Thymine (single ring)',
         'Cytosine, thymine, and uracil are pyrimidines (single ring), not purines.',
         'Their ring structures are fundamentally different'],
  gone: ['a large purine always pairs with a smaller pyrimidine',
         'This option reverses both the classification and the ring structure.',
         'the constant 2-nm width of the DNA double helix'] },

{ q: 'Q56', id: 'chem-417', key: 'B',
  fb: {
    A: 'The important effect of rare tautomers here is their altered hydrogen-bonding pattern, which can permit mispairing. The normal double helix is stabilized largely by base stacking and interactions between complementary bases; an overall increase in helix stability is not the lesson being tested.',
    D: "Many replicative DNA polymerases proofread through a 3' → 5' exonuclease activity that removes incorrectly inserted nucleotides. That is a separate enzymatic correction process, not the tautomeric change in a base."
  },
  pointEdits: [
    [1, 'Watson and Crick recognized that tautomerism could cause mutations - this was noted in their original 1953 paper',
        'A tautomeric mispair can become a lasting sequence mutation if it escapes correction and is copied in a later replication step']
  ],
  keep: ['Normal forms: amino (A, C) and keto (G, T); rare forms: imino (A, C) and enol (G, T)',
         'Tautomerism is a proton shift within the same molecule'],
  gone: ['their original 1953 paper',
         'Tautomeric shifts are rare events that do not contribute to overall helix stability.',
         "Proofreading is performed by the 3' → 5' exonuclease activity of DNA polymerase"] },

{ q: 'Q57', id: 'chem-418', key: 'B',
  options: [[1, "The positions on the sugar ring - the 5' carbon bears the phosphate group and the 3' carbon bears the free hydroxyl where the next nucleotide is added",
                "The orientation of the sugar-phosphate backbone from its 5' end toward its 3' end"]],
  main: "The prime marks distinguish sugar-carbon numbering from base-atom numbering. The sugar's five carbons are numbered 1' to 5', but C-5' is outside the five-membered ring, which contains four carbons and one oxygen. A strand's 5' and 3' ends are named for this sugar orientation; the terminal chemical groups can vary. During standard DNA or RNA synthesis, polymerases add nucleotides to the growing strand's free 3'-OH, so synthesis proceeds 5' → 3'.",
  fbEdits: {
    A: [['Base carbons are numbered without the prime symbol (1, 2, 3, etc.).',
         'Atoms in the nitrogenous base are numbered without prime marks; the numbers can refer to nitrogen as well as carbon atoms.']]
  },
  bl: "5' → 3' describes backbone orientation. Polymerases extend a growing strand at its 3'-OH. C-5' is outside the sugar ring, and a 5' end does not invariably carry a phosphate.",
  keep: ["The prime notation (1', 2', 3', 4', 5') is specifically used for sugar carbons to distinguish them from base atom numbering.",
         "DNA polymerase adds nucleotides only to the 3'-OH end (5' → 3' synthesis)",
         'The two strands of DNA run antiparallel',
         "The prime symbol distinguishes sugar carbons (1'–5') from base atom numbering"],
  gone: ["The positions on the sugar ring - the 5' carbon bears the phosphate group",
         "numbered 1' through 5'",
         'Base carbons are numbered without the prime symbol (1, 2, 3, etc.).'] },

{ q: 'Q58', id: 'chem-419', key: 'D',
  mainEdits: [['(α-1,2 linkage)', '(an α(1→2)β linkage: α at glucose C1 and β at fructose C2)']],
  pointEdits: [
    [1, 'A sugar is non-reducing if ALL anomeric carbons are involved in glycosidic bonds',
        'For these disaccharides, a free anomeric hemiacetal permits ring opening and reducing behavior'],
    [2, 'Sucrose has both anomeric carbons engaged (α-1,2), making it non-reducing',
        'Sucrose links both anomeric centers through an α(1→2)β bond and is non-reducing before hydrolysis']
  ],
  keep: ['Since both anomeric carbons are involved in the bond, neither can open to form a free aldehyde or ketone group',
         'Maltose, lactose, and cellobiose each have one free anomeric carbon → reducing sugars'],
  gone: ['(α-1,2 linkage)',
         'A sugar is non-reducing if ALL anomeric carbons are involved in glycosidic bonds',
         'Sucrose has both anomeric carbons engaged (α-1,2), making it non-reducing'] },

{ q: 'Q59', id: 'chem-420', key: 'A', frozen: true },

{ q: 'Q60', id: 'chem-421', key: 'B', pointsOnly: true,
  pointEdits: [
    [3, 'More branch points = more non-reducing ends = faster glucose release by glycogen phosphorylase',
        'More non-reducing ends allow glycogen phosphorylase to release glucose 1-phosphate from many chains simultaneously']
  ],
  keep: ['Glycogen: branching every 8-12 residues (highly branched, compact)',
         'Amylopectin: branching every 24-30 residues (less branched)'],
  gone: ['faster glucose release by glycogen phosphorylase'] }

];
