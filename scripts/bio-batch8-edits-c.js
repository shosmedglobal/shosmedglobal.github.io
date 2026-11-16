/**
 * Biology review batch 8, displayed Q25-Q36
 * (bio-431 .. bio-439, bio-442, bio-443, bio-444).
 * Q28 (bio-434) and Q29 (bio-435) are KEEP UNCHANGED per the review and so are
 * absent from this module by design. bio-440 and bio-441 are not in the pack.
 */
'use strict';

module.exports = [
  // ---- Q25  bio-431  direction of DNA synthesis --------------------------
  {
    q: 25, id: 'bio-431', expectLetter: 'B',
    explanation: [
      ['<p>The template strand is read in the 3\' → 5\' direction. This directionality means that on the lagging strand (oriented 3\' → 5\' at the replication fork), synthesis must occur in short discontinuous fragments (Okazaki fragments), each initiated by an RNA primer.</p>',
        '<p>The template strand is read in the 3\' → 5\' direction. Both new strands are synthesized 5\' → 3\'. The leading strand extends in the direction of fork movement, while the lagging strand is made as Okazaki fragments that extend away from the fork, each initiated by an RNA primer.</p>'],
      ['<p><strong>A. 3\' → 5\':</strong> The template strand is read in the 3\' → 5\' direction.</p>',
        '<p><strong>A. 3\' → 5\':</strong> DNA polymerase does not build a strand in this direction. It adds each nucleotide to the free 3\'-OH of the growing chain, so the new strand grows 5\' → 3\'. It is the template that is read 3\' → 5\'.</p>'],
      ['<li>Energy comes from cleaving the incoming dNTP\'s two terminal phosphates, not from ATP.</li>',
        '<li>The incoming deoxyribonucleoside triphosphate supplies the energy for incorporation. Adding it to the growing strand releases pyrophosphate, whose subsequent hydrolysis helps drive the reaction forward.</li>']
    ],
    keepHeadings: ['<strong>A. 3\' → 5\':</strong>'],
    gone: ['oriented 3\' → 5\' at the replication fork', 'cleaving the incoming dNTP\'s two terminal phosphates']
  },

  // ---- Q26  bio-432  Chargaff calculation --------------------------------
  {
    q: 26, id: 'bio-432', expectLetter: 'B',
    explanation: [[
      '<li>The rules fail for single-stranded nucleic acids, where there is no complementary partner to enforce equality.</li>',
      '<li>These equalities follow from complementary pairing in double-stranded DNA. They are not required for a single-stranded nucleic acid.</li>'
    ]],
    gone: ['The rules fail for single-stranded nucleic acids']
  },

  // ---- Q27  bio-433  base-sugar bond (duplicated B and D feedback) -------
  {
    q: 27, id: 'bio-433', expectLetter: 'C',
    explanation: [
      ['<p><strong>B. Peptide bond:</strong> Peptide bonds join amino acids, and hydrogen bonds hold complementary base pairs together.</p>',
        '<p><strong>B. Peptide bond:</strong> Peptide bonds join amino acids in proteins. They do not attach a nitrogenous base to the sugar in a nucleotide.</p>'],
      ['<p><strong>D. Hydrogen bond:</strong> Peptide bonds join amino acids, and hydrogen bonds hold complementary base pairs together.</p>',
        '<p><strong>D. Hydrogen bond:</strong> Hydrogen bonds help pair complementary bases across nucleic-acid strands. The bond attaching a base to its own sugar is a covalent N-glycosidic bond.</p>']
    ],
    keepHeadings: ['<strong>B. Peptide bond:</strong>', '<strong>D. Hydrogen bond:</strong>'],
    gone: ['<strong>B. Peptide bond:</strong> Peptide bonds join amino acids, and hydrogen bonds hold complementary base pairs together.']
  },

  // ---- Q30  bio-436  phosphodiester bond ---------------------------------
  {
    q: 30, id: 'bio-436', expectLetter: 'B',
    explanation: [
      ['<p><strong>D. The 2\' carbon of one sugar to the 3\' carbon of the next:</strong> The 2\' carbon is not involved in phosphodiester bond formation. In DNA, the 2\' carbon lacks a hydroxyl group (deoxyribose). In RNA, the 2\' carbon has a hydroxyl group that makes RNA more susceptible to hydrolysis but is still not involved in backbone linkages. The backbone connections are always 3\' to 5\'.</p>',
        '<p><strong>D. The 2\' carbon of one sugar to the 3\' carbon of the next:</strong> The usual DNA backbone links the 3\' oxygen of one sugar to the 5\' oxygen of the next through phosphate. Deoxyribose has no 2\'-OH, so a 2\' linkage is not the normal DNA backbone connection.</p>'],
      ['<li>That uniform negative charge is what makes nucleic acids migrate toward the anode in gel electrophoresis, separating strictly by size.</li>',
        '<li>DNA\'s phosphate backbone is negatively charged. In a standard agarose gel, linear double-stranded DNA fragments are separated mainly by size; molecular shape also affects migration.</li>']
    ],
    keepHeadings: ['<strong>D. The 2\' carbon of one sugar to the 3\' carbon of the next:</strong>'],
    gone: ['is still not involved in backbone linkages', 'separating strictly by size']
  },

  // ---- Q31  bio-437  transcription sequence ------------------------------
  {
    q: 31, id: 'bio-437', expectLetter: 'A',
    explanation: [
      ['<p><strong>C. 3\'-AUGCCU-5\':</strong> 3\'-AUGCCU-5\' has the correct bases but is written in the wrong direction. mRNA is synthesized in the 5\' to 3\' direction and is conventionally written 5\' to 3\'. The sequence 3\'-AUGCCU-5\' is the same sequence as 5\'-UCCGUA-3\', which would be the complement, not the transcript, of the template.</p>',
        '<p><strong>C. 3\'-AUGCCU-5\':</strong> The end labels are reversed for this base order. Read in the standard 5\' → 3\' direction, option C is 5\'-UCCGUA-3\', which is a different RNA sequence and is not the correct transcript of the given template. The required sequence is 5\'-AUGCCU-3\'.</p>'],
      ['<p><strong>D. 5\'-UACGGA-3\':</strong> 5\'-UACGGA-3\' would be the RNA complement read in the wrong direction. This sequence represents what you would get by simply replacing each DNA base with its RNA complement without considering directionality. Proper transcription reads the template strand 3\' to 5\' and synthesizes mRNA 5\' to 3\', giving 5\'-AUGCCU-3\'.</p>',
        '<p><strong>D. 5\'-UACGGA-3\':</strong> This option copies the template\'s displayed base order and replaces T with U; it does not apply complementary base pairing. Reading the given DNA template 3\' → 5\' produces the complementary RNA 5\'-AUGCCU-3\'.</p>']
    ],
    keepHeadings: ['<strong>C. 3\'-AUGCCU-5\':</strong>', '<strong>D. 5\'-UACGGA-3\':</strong>'],
    gone: ['would be the RNA complement read in the wrong direction', 'has the correct bases but is written in the wrong direction']
  },

  // ---- Q32  bio-438  semiconservative replication ------------------------
  {
    q: 32, id: 'bio-438', expectLetter: 'B',
    explanation: [[
      '<p><strong>D. Both strands are completely newly synthesized:</strong> If both strands were completely new, this would describe dispersive or de novo synthesis without a template, which would be extraordinarily error-prone. In reality, each new strand is synthesized using the old strand as a template, ensuring accuracy. The Meselson-Stahl experiment (1958) using 15N density labeling elegantly proved the semiconservative model over the conservative and dispersive alternatives.</p>',
      '<p><strong>D. Both strands are completely newly synthesized:</strong> A double helix made entirely of new strands would be one product predicted by the conservative model, which leaves the original two strands together in the other molecule. The dispersive model instead predicts mixtures of old and new DNA segments within each strand. Actual semiconservative replication gives each daughter molecule one original strand and one new strand, as the Meselson-Stahl experiment (1958) showed using 15N density labeling.</p>'
    ]],
    keepHeadings: ['<strong>D. Both strands are completely newly synthesized:</strong>'],
    gone: ['this would describe dispersive or de novo synthesis without a template']
  },

  // ---- Q33  bio-439  nucleotide versus nucleoside ------------------------
  {
    q: 33, id: 'bio-439', expectLetter: 'C',
    explanation: [
      ['The addition of one or more phosphate groups to the 5\' carbon of the sugar converts a nucleoside into a nucleotide.</p>',
        'The addition of one or more phosphate groups to the sugar, commonly at the 5\' carbon, converts a nucleoside into a nucleotide.</p>'],
      ['<p>For example: adenosine (nucleoside) → adenosine 5\'-monophosphate/AMP (nucleotide) → ADP → ATP.',
        '<p>For example, adenosine itself has no phosphate, while AMP has one, ADP two and ATP three.'],
      ['<p><strong>A. A nitrogenous base:</strong> A nucleoside contains only a nitrogenous base and a pentose sugar.</p>',
        '<p><strong>A. A nitrogenous base:</strong> The base is present in both a nucleoside and a nucleotide, so it does not distinguish them.</p>'],
      ['<p><strong>B. A pentose sugar:</strong> A nucleoside contains only a nitrogenous base and a pentose sugar.</p>',
        '<p><strong>B. A pentose sugar:</strong> The pentose sugar is also present in both; adding phosphate to a nucleoside is what produces a nucleotide.</p>'],
      ['<li>Phosphate attaches at the 5\' carbon, and further phosphates give the mono-, di-, and triphosphate series: adenosine, AMP, ADP, ATP.</li>',
        '<li>Phosphate commonly attaches at the 5\' carbon; adenosine carries none, while AMP, ADP and ATP carry one, two and three.</li>']
    ],
    keepHeadings: ['<strong>A. A nitrogenous base:</strong>', '<strong>B. A pentose sugar:</strong>'],
    gone: ['<p><strong>A. A nitrogenous base:</strong> A nucleoside contains only a nitrogenous base and a pentose sugar.</p>',
      'phosphate groups to the 5\' carbon of the sugar converts a nucleoside']
  },

  // ---- Q34  bio-442  xylem transpiration pull ----------------------------
  {
    q: 34, id: 'bio-442', expectLetter: 'C',
    explanation: [
      ['As water evaporates from leaf stomata during transpiration, it creates a negative pressure (tension) that pulls a continuous column of water upward through the xylem.',
        'Water evaporates from the moist cell-wall surfaces inside the leaf, and the water vapour leaves through the stomata. This creates a negative pressure (tension) that pulls a continuous column of water upward through the xylem.'],
      ['<p><strong>B. Capillary action:</strong> Capillary action helps in narrow tubes but alone cannot raise water more than about 1 meter - far short of what tall trees require.</p>',
        '<p><strong>B. Capillary action:</strong> Capillary action depends on the radius and surface properties of the tube, but capillarity alone does not explain water transport to the tops of tall trees. Transpiration generates tension that pulls the continuous water column upward.</p>']
    ],
    keepHeadings: ['<strong>B. Capillary action:</strong>'],
    gone: ['cannot raise water more than about 1 meter', 'As water evaporates from leaf stomata during transpiration']
  },

  // ---- Q35  bio-443  nitrogen fixation (stem replaced) -------------------
  {
    q: 35, id: 'bio-443', expectLetter: 'C',
    stemFull: 'In the nitrogen cycle, which biological process converts atmospheric N₂ into ammonia that can be incorporated into organic compounds?',
    explanation: [
      ['Nitrogen fixation is carried out by specialized prokaryotes - free-living soil bacteria (such as Azotobacter) and symbiotic bacteria (such as Rhizobium in legume root nodules) - which use the enzyme nitrogenase to reduce N₂ to NH₃.</p>',
        'Certain bacteria and archaea use nitrogenase to convert N₂ to ammonia, which is mainly present as ammonium under typical cellular conditions. This supplies nitrogen that can enter amino acids and other organic molecules. Biological nitrogen fixation is carried out by free-living soil bacteria (such as Azotobacter) and by symbiotic bacteria (such as Rhizobium in legume root nodules). Nitrogen also reaches the soil by nonbiological routes, including lightning and industrial fertiliser manufacture.</p>'],
      ['<p><strong>B. Denitrification:</strong> Returns nitrogen to the atmosphere by converting nitrate back to N₂ gas - the reverse of fixation.</p>',
        '<p><strong>B. Denitrification:</strong> Denitrification returns fixed nitrogen to the atmosphere by reducing nitrate through a series of intermediates to gases such as N₂.</p>'],
      ['<p class=\'exp-key\'>Bottom Line: Nitrogen fixation (N₂ → NH₃) is the entry point for atmospheric nitrogen into biological systems. It requires nitrogenase, an enzyme inhibited by oxygen, which is why nitrogen-fixing bacteria often inhabit low-oxygen environments like root nodules.</p>',
        '<p class=\'exp-key\'>Bottom Line: Biological nitrogen fixation (N₂ → NH₃) is the entry point for atmospheric nitrogen into biological systems. It requires nitrogenase, which is inhibited by oxygen, so nitrogen-fixing organisms need ways to protect the enzyme, such as the low-oxygen environment inside a root nodule.</p>']
    ],
    keepHeadings: ['<strong>B. Denitrification:</strong>'],
    gone: ['which process converts atmospheric N₂ gas into ammonia (NH₃) that plants can use',
      'the reverse of fixation', 'nitrogen-fixing bacteria often inhabit low-oxygen environments',
      'carried out by specialized prokaryotes']
  },

  // ---- Q36  bio-444  logistic growth -------------------------------------
  {
    q: 36, id: 'bio-444', expectLetter: 'B',
    explanation: [
      ['<p><strong>C. Linear growth:</strong> Would mean the population adds the same fixed number each generation regardless of conditions - this is not how biological populations behave.</p>',
        '<p><strong>C. Linear growth:</strong> Linear growth adds a roughly constant number of individuals per unit time. The stem instead describes growth that changes as the population approaches carrying capacity.</p>'],
      ['<p><strong>D. Boom-and-bust cycle:</strong> Describes populations that overshoot carrying capacity and then crash dramatically, often seen in organisms with high reproductive rates and no density-dependent regulation.</p>',
        '<p><strong>D. Boom-and-bust cycle:</strong> A boom-and-bust pattern involves a large rise followed by a crash, often after resources are depleted. Delayed density-dependent effects can contribute to it. The stem describes slowing toward carrying capacity rather than a crash.</p>']
    ],
    keepHeadings: ['<strong>C. Linear growth:</strong>', '<strong>D. Boom-and-bust cycle:</strong>'],
    gone: ['this is not how biological populations behave', 'no density-dependent regulation']
  }
];
