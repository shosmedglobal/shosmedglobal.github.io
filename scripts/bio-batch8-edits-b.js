/**
 * Biology review batch 8, displayed Q13-Q24
 * (bio-418, bio-419, bio-420, bio-421, bio-422, bio-424 .. bio-430).
 * bio-423 (2,4-dinitrophenol) is not part of the pack.
 */
'use strict';

module.exports = [
  // ---- Q13  bio-418  antimycin A (points 2, 4, 5) ------------------------
  {
    q: 13, id: 'bio-418', expectLetter: 'B',
    explanation: [
      ['<li>Blocking any single complex stops the entire chain, so upstream carriers accumulate in the reduced state and the proton gradient collapses.</li>',
        '<li>The effect of inhibition depends on the target. Blocking Complex I stops NADH entry through that complex, but electrons can still enter through routes such as Complex II.</li>'],
      ['<li>Carriers upstream of a block stay reduced; those downstream become oxidised.</li>',
        '<li>In a blocked electron-transfer pathway, carriers before the block tend to become more reduced and carriers after it more oxidised.</li>'],
      ['<li>Inhibitors differ fundamentally from uncouplers: inhibitors stop electron flow, whereas uncouplers let it continue while wasting the gradient as heat.</li>',
        '<li>Electron-transfer inhibitors block parts of the chain. Oligomycin blocks ATP synthase and can secondarily slow electron transport as the gradient builds. Uncouplers dissipate the gradient, reducing ATP production while electron transport can continue.</li>']
    ],
    gone: ['Blocking any single complex stops the entire chain', 'the proton gradient collapses',
      'Carriers upstream of a block stay reduced']
  },

  // ---- Q14  bio-419  UCP1 (stem replaced) --------------------------------
  {
    q: 14, id: 'bio-419', expectLetter: 'B',
    stemFull: 'Uncoupling protein 1 (UCP1) in brown adipose tissue generates heat by:',
    explanation: [
      ['This is the basis of non-shivering thermogenesis, which is important for heat generation in newborns and hibernating animals.</p>',
        'UCP1 supports nonshivering heat production, which is especially important in newborns and during arousal from hibernation.</p>'],
      ['<p><strong>A. Increasing electron transport chain activity to produce more ATP:</strong> Uncoupling proteins do not increase ATP production; they do the opposite. By allowing protons to leak across the inner mitochondrial membrane through an alternative pathway that bypasses ATP synthase, UCPs dissipate the proton gradient as heat instead of using it to make ATP. This is non-shivering thermogenesis, essential for newborns and hibernating animals.</p>',
        '<p><strong>A. Increasing electron transport chain activity to produce more ATP:</strong> UCP1 does not increase ATP production; it does the opposite. By allowing protons to leak across the inner mitochondrial membrane through an alternative pathway that bypasses ATP synthase, UCP1 dissipates the proton gradient as heat instead of using it to make ATP. This supports nonshivering heat production, which is especially important in newborns and during arousal from hibernation.</p>'],
      ['<p><strong>C. Inhibiting Complex IV to generate heat from electron accumulation:</strong> Inhibiting Complex IV would be lethal, as it would block the entire electron transport chain (this is how cyanide kills). Uncoupling proteins do not inhibit any ETC complex. In fact, when UCPs are active, the ETC runs faster because the proton gradient is dissipated, removing the back-pressure that normally slows electron transport.</p>',
        '<p><strong>C. Inhibiting Complex IV to generate heat from electron accumulation:</strong> Inhibiting Complex IV impairs the reduction of oxygen and the production of ATP by respiration, as cyanide does; it is not how UCP1 releases the energy of the gradient as heat. UCP1 does not inhibit any electron transport chain complex. When UCP1 is active the chain can run faster, because the dissipated gradient no longer provides back-pressure.</p>'],
      ['ATP is not directly converted to heat by uncoupling proteins. UCPs work by providing a channel for protons',
        'ATP is not directly converted to heat by UCP1. UCP1 works by providing a channel for protons'],
      ['<li>This matters most in newborns and hibernating mammals, which cannot rely on shivering.</li>',
        '<li>UCP1 supports nonshivering heat production, which is especially important in newborns and during arousal from hibernation.</li>']
    ],
    keepHeadings: ['<strong>A. Increasing electron transport chain activity to produce more ATP:</strong>',
      '<strong>C. Inhibiting Complex IV to generate heat from electron accumulation:</strong>',
      '<strong>D. Converting ATP directly into thermal energy:</strong>'],
    gone: ['Uncoupling proteins (UCPs) in brown adipose tissue generate heat', 'would be lethal',
      'which cannot rely on shivering', 'essential for newborns and hibernating animals',
      'Uncoupling proteins do not increase ATP production']
  },

  // ---- Q15  bio-420  substrate-level phosphorylation ---------------------
  {
    q: 15, id: 'bio-420', expectLetter: 'B',
    explanation: [
      ['<p>Substrate-level phosphorylation is the direct transfer of a phosphate group from a high-energy substrate to ADP (or GDP), forming ATP (or GTP) without requiring the electron transport chain. In the citric acid cycle, succinyl-CoA synthetase converts succinyl-CoA to succinate while generating GTP (which can be converted to ATP). Other examples include the reactions catalyzed by phosphoglycerate kinase and pyruvate kinase in glycolysis. Complexes I, III, IV, and ATP synthase are involved in oxidative phosphorylation.</p>',
        '<p>Substrate-level phosphorylation produces ATP or GTP by coupling nucleotide phosphorylation to an energy-releasing substrate reaction, without using a membrane proton gradient. Succinyl-CoA synthetase converts succinyl-CoA to succinate; energy from its thioester bond supports the formation of GTP from GDP and inorganic phosphate, or ATP from ADP and inorganic phosphate, depending on the enzyme isoform. In glycolysis, phosphoglycerate kinase and pyruvate kinase transfer phosphate from phosphorylated substrates directly to ADP. Complexes I, III, IV, and ATP synthase are involved in oxidative phosphorylation instead.</p>'],
      ['<p><strong>D. Proton translocation through ATP synthase:</strong> Proton translocation through ATP synthase is the mechanism of oxidative phosphorylation (chemiosmosis), not substrate-level phosphorylation. Substrate-level phosphorylation involves direct transfer of a phosphate group from a high-energy substrate to ADP, as in the succinyl-CoA synthetase reaction, phosphoglycerate kinase step, and pyruvate kinase step.</p>',
        '<p><strong>D. Proton translocation through ATP synthase:</strong> ATP synthase uses a proton gradient to make ATP, so it is part of oxidative phosphorylation in mitochondria. Substrate-level phosphorylation instead couples ATP or GTP formation directly to a substrate reaction.</p>'],
      ['<li>Substrate-level phosphorylation transfers a phosphate directly from a high-energy substrate to ADP or GDP, with no membrane gradient involved.</li>',
        '<li>Substrate-level phosphorylation couples the formation of ATP or GTP directly to an energy-releasing substrate reaction, with no membrane proton gradient involved.</li>'],
      ['<li>In the citric acid cycle it occurs once per turn, at succinyl-CoA synthetase (succinyl-CoA to succinate, generating GTP).</li>',
        '<li>In the citric acid cycle it occurs once per turn, at succinyl-CoA synthetase, which converts succinyl-CoA to succinate and forms GTP or ATP depending on the isoform.</li>'],
      ['<li>Because it needs neither oxygen nor an electron transport chain, it is the only route to ATP under anaerobic conditions.</li>',
        '<li>Human cells deprived of oxygen can still produce ATP by substrate-level phosphorylation in glycolysis, provided NAD⁺ is regenerated.</li>']
    ],
    keepHeadings: ['<strong>D. Proton translocation through ATP synthase:</strong>'],
    gone: ['it is the only route to ATP under anaerobic conditions', 'while generating GTP (which can be converted to ATP)',
      'transfers a phosphate directly from a high-energy substrate to ADP or GDP']
  },

  // ---- Q16  bio-421  terminal oxygen acceptor ----------------------------
  {
    q: 16, id: 'bio-421', expectLetter: 'D',
    explanation: [
      ['This is why aerobic organisms require oxygen; without it, the electron transport chain cannot function, NADH and FADH₂ cannot be reoxidized, and oxidative phosphorylation ceases.</p>',
        'Without oxygen, the aerobic mitochondrial chain cannot continue reoxidizing its electron carriers, and oxidative phosphorylation stops. Human cells can regenerate cytosolic NAD⁺ by converting pyruvate to lactate, allowing glycolysis to continue.</p>'],
      ['<p><strong>A. NAD⁺:</strong> NAD⁺ accepts electrons in the metabolic pathways that feed the chain, becoming NADH. It is therefore an electron carrier delivering electrons to Complex I at the start of the chain, not the acceptor at its end.</p>',
        '<p><strong>A. NAD⁺:</strong> NAD⁺ accepts electrons during reactions such as those in glycolysis and the citric acid cycle, forming NADH. It is the reduced form, NADH, that donates electrons to Complex I. NAD⁺ is not the terminal acceptor at Complex IV.</p>'],
      ['<p><strong>B. FAD:</strong> FAD is likewise a carrier rather than a terminal acceptor. As FADH₂ it hands electrons to ubiquinone at Complex II, entering the chain partway along. Both NAD⁺ and FAD must be regenerated by the chain, which is only possible because oxygen removes the electrons at the far end.</p>',
        '<p><strong>B. FAD:</strong> FAD is an enzyme-associated electron carrier. For example, FAD bound within succinate dehydrogenase accepts electrons during succinate oxidation and passes them toward coenzyme Q. Oxygen is the terminal acceptor of the aerobic mitochondrial chain.</p>'],
      ['<li>Without O₂ the carriers remain reduced, NAD⁺ and FAD cannot be regenerated, and oxidative phosphorylation halts.</li>',
        '<li>Without O₂ the mitochondrial carriers remain reduced and oxidative phosphorylation halts, although cytosolic NAD⁺ can still be regenerated by reducing pyruvate to lactate.</li>'],
      ['<li>Oxygen accepts electrons at the end of the chain; it does not itself supply energy.</li>',
        '<li>Electron transfer to oxygen is part of the energy-releasing process that supports proton pumping. ATP synthase then uses the proton gradient to make ATP.</li>']
    ],
    keepHeadings: ['<strong>A. NAD⁺:</strong>', '<strong>B. FAD:</strong>', '<strong>C. Cytochrome c:</strong>'],
    gone: ['NADH and FADH₂ cannot be reoxidized', 'NAD⁺ and FAD cannot be regenerated',
      'it does not itself supply energy', 'As FADH₂ it hands electrons to ubiquinone at Complex II']
  },

  // ---- Q17  bio-422  ATP synthase rotary mechanism -----------------------
  {
    q: 17, id: 'bio-422', expectLetter: 'A',
    explanation: [
      ['<p><strong>B. Direct phosphorylation of ADP by inorganic phosphate without any proton gradient:</strong> Direct phosphorylation of ADP without a proton gradient describes substrate-level phosphorylation, which occurs in glycolysis (e.g., pyruvate kinase step) and the citric acid cycle (succinyl-CoA synthetase step). ATP synthase absolutely requires the proton-motive force to function. Without the proton gradient, the Fo rotor cannot spin and the conformational changes in F1 that synthesize ATP cannot occur.</p>',
        '<p><strong>B. Direct phosphorylation of ADP by inorganic phosphate without any proton gradient:</strong> Combining ADP and inorganic phosphate requires an energy source. During oxidative phosphorylation, that energy comes from proton flow through ATP synthase. Substrate-level phosphorylation uses an energy-releasing substrate reaction; merely mixing ADP and phosphate without a gradient does not describe that mechanism.</p>'],
      ['<p><strong>D. Hydrolysis of GTP provides energy for ATP formation:</strong> GTP hydrolysis providing energy for ATP formation is not the mechanism of ATP synthase. While GTP is produced by substrate-level phosphorylation in the citric acid cycle (succinyl-CoA synthetase), this is a separate mechanism. ATP synthase is a molecular rotary motor powered exclusively by proton flow through its Fo channel.</p>',
        '<p><strong>D. Hydrolysis of GTP provides energy for ATP formation:</strong> GTP can transfer a phosphate to ADP through a separate enzyme reaction, but that is not ATP synthase\'s mechanism. During oxidative phosphorylation, ATP synthase uses proton flow to drive rotation and ATP production.</p>']
    ],
    keepHeadings: ['<strong>B. Direct phosphorylation of ADP by inorganic phosphate without any proton gradient:</strong>',
      '<strong>D. Hydrolysis of GTP provides energy for ATP formation:</strong>'],
    gone: ['absolutely requires the proton-motive force to function', 'the Fo rotor cannot spin',
      'powered exclusively by proton flow']
  },

  // ---- Q18  bio-424  three NADH per cycle --------------------------------
  {
    q: 18, id: 'bio-424', expectLetter: 'C',
    explanation: [
      ['Additionally, one turn produces 1 FADH₂ (succinate dehydrogenase) and 1 GTP (succinyl-CoA synthetase).',
        'Additionally, one turn produces 1 FADH₂ (succinate dehydrogenase) and 1 ATP or GTP (succinyl-CoA synthetase).'],
      ['<p><strong>D. 4:</strong> Four would be correct only if the FADH₂ step were counted as NADH as well. Succinate dehydrogenase reduces FAD, not NAD⁺, so the per-turn yield is 3 NADH plus 1 FADH₂ and 1 GTP.</p>',
        '<p><strong>D. 4:</strong> The cycle itself produces three NADH per acetyl-CoA. Including the earlier conversion of pyruvate to acetyl-CoA gives four NADH, but that reaction is outside the cycle. The cycle also produces one FAD-linked electron pair, which must not be counted as NADH.</p>'],
      ['<li>One turn of the citric acid cycle yields 3 NADH, 1 FADH₂, 1 GTP, and 2 CO₂.</li>',
        '<li>One turn of the citric acid cycle yields 3 NADH, 1 FADH₂, 1 ATP or GTP, and 2 CO₂.</li>'],
      ['<li>Each glucose produces 2 acetyl-CoA, so the cycle turns twice: 6 NADH, 2 FADH₂, and 2 GTP per glucose.</li>',
        '<li>Each glucose produces 2 acetyl-CoA, so the cycle turns twice: 6 NADH, 2 FADH₂, and 2 ATP/GTP equivalents per glucose.</li>'],
      ['<li>Although it uses no oxygen directly, it stalls without it, because NAD⁺ and FAD are regenerated only by the chain.</li>',
        '<li>The human mitochondrial cycle does not consume oxygen directly, but it normally depends on the aerobic respiratory chain to regenerate oxidised electron carriers.</li>']
    ],
    keepHeadings: ['<strong>D. 4:</strong>'],
    gone: ['and 1 GTP (succinyl-CoA synthetase)', 'and 2 GTP per glucose',
      'because NAD⁺ and FAD are regenerated only by the chain', '1 FADH₂ and 1 GTP.']
  },

  // ---- Q19  bio-425  RNA sugar -------------------------------------------
  {
    q: 19, id: 'bio-425', expectLetter: 'B',
    explanation: [
      ['<p>This seemingly small difference has major implications: the 2\'–OH makes RNA more susceptible to alkaline hydrolysis and contributes to RNA being typically single-stranded. Glucose and fructose are hexose sugars not found in nucleic acid backbones.</p>',
        '<p>The 2\'–OH increases RNA\'s chemical reactivity, including its susceptibility to alkaline hydrolysis, and contributes to its folding and catalytic possibilities. RNA is often single-stranded, but it can also form paired regions and double-stranded molecules. Glucose and fructose are hexose sugars not found in nucleic acid backbones.</p>'],
      ['<p><strong>C. Glucose:</strong> Glucose and fructose are hexose sugars not found in nucleic acid backbones.</p>',
        '<p><strong>C. Glucose:</strong> Glucose is a six-carbon sugar used extensively in energy metabolism. It is not the five-carbon ribose of the RNA backbone.</p>'],
      ['<p><strong>D. Fructose:</strong> Glucose and fructose are hexose sugars not found in nucleic acid backbones.</p>',
        '<p><strong>D. Fructose:</strong> Fructose is another six-carbon sugar, found for example in fruit and in sucrose. It is not the five-carbon ribose of the RNA backbone.</p>'],
      ['<li>That single hydroxyl group accounts for most of the functional difference between the two molecules.</li>',
        '<li>The 2\'-OH is an important chemical difference between RNA and DNA, but their biological roles also depend on their sequences, structures and associated proteins.</li>']
    ],
    keepHeadings: ['<strong>C. Glucose:</strong>', '<strong>D. Fructose:</strong>'],
    gone: ['contributes to RNA being typically single-stranded',
      'accounts for most of the functional difference between the two molecules']
  },

  // ---- Q20  bio-426  uracil (stem replaced) ------------------------------
  {
    q: 20, id: 'bio-426', expectLetter: 'C',
    stemFull: 'Which base is a standard component of RNA but not a standard component of DNA?',
    explanation: [
      ['<th>Base</th><th>Found in DNA</th><th>Found in RNA</th><th>Type</th>',
        '<th>Base</th><th>Standard base in DNA</th><th>Standard base in RNA</th><th>Type</th>'],
      ['<p><strong>A. Adenine:</strong> Both pair with adenine via two hydrogen bonds.</p>',
        '<p><strong>A. Adenine:</strong> Adenine is a standard base in both DNA and RNA. In standard base pairing, it pairs with thymine in DNA and with uracil in RNA.</p>'],
      ['The G-C base pair is held together by three hydrogen bonds, making it stronger and more thermally stable than the A-T (or A-U) pair, which has only two hydrogen bonds.',
        'The G-C base pair is held together by three hydrogen bonds, compared with two in the A-T (or A-U) pair. Hydrogen bonding and base stacking both contribute to the stability of a duplex.'],
      ['<li>DNA uses thymine to aid repair: spontaneous deamination of cytosine yields uracil, so any uracil found in DNA is recognised as damage and excised.</li>',
        '<li>Cytosine can lose an amino group and become uracil. DNA repair systems can recognise and remove this uracil because it is not a standard DNA base.</li>'],
      ['<li>A, G, and C occur in both nucleic acids; only T/U differs between them.</li>',
        '<li>A, G, and C are standard bases in both nucleic acids; only T/U differs between them.</li>']
    ],
    keepHeadings: ['<strong>A. Adenine:</strong>', '<strong>D. Guanine:</strong>'],
    gone: ['found in RNA but NOT in DNA',
      '<strong>A. Adenine:</strong> Both pair with adenine via two hydrogen bonds.</p>',
      'making it stronger and more thermally stable than the A-T']
  },

  // ---- Q21  bio-427  nucleoside ------------------------------------------
  {
    q: 21, id: 'bio-427', expectLetter: 'B',
    explanation: [
      ['The phosphate is esterified to the 5\' carbon of the sugar. Therefore, a nucleotide is a phosphorylated nucleoside.</p>',
        'In common nucleotides such as AMP, phosphate is attached at the sugar\'s 5\' position; the defining distinction is that a nucleotide is a phosphorylated nucleoside.</p>'],
      ['<p><strong>C. A nitrogenous base and a phosphate group only:</strong> A nitrogenous base linked only to a phosphate group (without a sugar) does not exist as a standard biological molecule. The phosphate in nucleotides is always attached to the sugar, not directly to the base. The base connects to the 1\' carbon of the sugar via an N-glycosidic bond, while the phosphate attaches to the 5\' carbon of the sugar.</p>',
        '<p><strong>C. A nitrogenous base and a phosphate group only:</strong> A base and phosphate without a sugar do not make a nucleoside. A nucleoside requires a base bonded to a pentose sugar; in a nucleotide, phosphate is attached to the sugar portion.</p>'],
      ['<p><strong>D. A pentose sugar and a phosphate group only:</strong> A pentose sugar linked only to a phosphate group (without a base) is not a nucleoside. This combination describes part of the nucleic acid backbone but is not a named biochemical entity on its own. Nucleosides are specifically defined as a nitrogenous base covalently bonded to a pentose sugar, with no phosphate group.</p>',
        '<p><strong>D. A pentose sugar and a phosphate group only:</strong> A sugar phosphate lacks the nitrogenous base required for a nucleoside. Sugar phosphates are real biochemical molecules; ribose 5-phosphate is an example, but it is not itself a nucleoside.</p>'],
      ['<li>The base attaches to C-1\' of the sugar by an N-glycosidic bond; phosphate esterifies to C-5\'.</li>',
        '<li>The base attaches to C-1\' of the sugar by an N-glycosidic bond; in common nucleotides the phosphate esterifies to C-5\', although that position is not part of the definition.</li>']
    ],
    keepHeadings: ['<strong>C. A nitrogenous base and a phosphate group only:</strong>',
      '<strong>D. A pentose sugar and a phosphate group only:</strong>'],
    gone: ['is not a named biochemical entity on its own', 'does not exist as a standard biological molecule',
      'The phosphate is esterified to the 5\' carbon of the sugar']
  },

  // ---- Q22  bio-428  A-T hydrogen bonds ----------------------------------
  {
    q: 22, id: 'bio-428', expectLetter: 'B',
    explanation: [
      ['<p>Because G–C pairs have three hydrogen bonds compared to two for A–T pairs, DNA with a higher G–C content has a higher melting temperature (Tₘ) and is more thermally stable. The base pairing follows Chargaff\'s rules: in double-stranded DNA, the amount of A equals T, and the amount of G equals C.</p>',
        '<p>For otherwise comparable DNA duplexes, higher G–C content generally increases melting temperature (Tₘ). Base stacking, sequence, length and solution conditions also affect stability. The base pairing follows Chargaff\'s rules: in double-stranded DNA, the amount of A equals T, and the amount of G equals C.</p>'],
      ['<p><strong>A. One hydrogen bond:</strong> One hydrogen bond is too few for stable base pairing in DNA. The A-T pair has two hydrogen bonds, while the G-C pair has three. Even two hydrogen bonds (as in A-T) make these pairs less thermally stable than G-C pairs, which is why DNA with higher G-C content has a higher melting temperature.</p>',
        '<p><strong>A. One hydrogen bond:</strong> The standard Watson-Crick A–T pair forms two hydrogen bonds, not one. The number follows from the arrangement of hydrogen-bond donors and acceptors on these bases.</p>'],
      ['<p><strong>C. Three hydrogen bonds:</strong> Because G–C pairs have three hydrogen bonds compared to two for A–T pairs, DNA with a higher G–C content has a higher melting temperature (Tm) and is more thermally stable.</p>',
        '<p><strong>C. Three hydrogen bonds:</strong> Three hydrogen bonds characterise the standard G–C pair. The A–T pair has two.</p>'],
      ['<li>Higher G-C content therefore raises the melting temperature and thermal stability of a DNA duplex.</li>',
        '<li>For otherwise comparable duplexes, higher G-C content generally raises the melting temperature; base stacking and solution conditions matter too.</li>'],
      ['<p class=\'exp-key\'>Bottom Line: A–T base pairs have 2 hydrogen bonds; G–C base pairs have 3 hydrogen bonds. More G–C content means higher DNA stability.</p>',
        '<p class=\'exp-key\'>Bottom Line: A–T pairs form two hydrogen bonds; G–C pairs form three. Hydrogen bonding and base stacking both contribute to DNA structure and stability.</p>']
    ],
    keepHeadings: ['<strong>A. One hydrogen bond:</strong>', '<strong>C. Three hydrogen bonds:</strong>'],
    gone: ['One hydrogen bond is too few for stable base pairing', 'More G–C content means higher DNA stability',
      'raises the melting temperature and thermal stability of a DNA duplex', 'and is more thermally stable']
  },

  // ---- Q23  bio-429  purines ---------------------------------------------
  {
    q: 23, id: 'bio-429', expectLetter: 'B',
    explanation: [
      ['<li>Purines are degraded to uric acid, which is why purine metabolism disorders present as gout or as Lesch-Nyhan syndrome.</li>',
        '<li>In humans, purine breakdown produces uric acid. Excess uric acid can contribute to gout, and particular purine-metabolism defects cause other disorders.</li>'],
      ['Purines (A, G) have two rings; pyrimidines (C, T, U) have one ring. Base pairing is always purine–pyrimidine.</p>',
        'Purines (A, G) have two rings; pyrimidines (C, T, U) have one ring. In standard Watson-Crick pairing, a purine pairs with a pyrimidine.</p>']
    ],
    gone: ['purine metabolism disorders present as gout or as Lesch-Nyhan syndrome',
      'Base pairing is always purine–pyrimidine']
  },

  // ---- Q24  bio-430  antiparallel strands --------------------------------
  {
    q: 24, id: 'bio-430', expectLetter: 'B',
    explanation: [
      ['The 5\' end has a free phosphate group, and the 3\' end has a free hydroxyl group on the sugar.</p>',
        'Strand direction is named for the numbered carbons of the sugar. A 5\' end can carry a phosphate or a hydroxyl group; a typical unmodified 3\' end has a free 3\'-OH.</p>'],
      ['<li>The 5\' end carries a free phosphate; the 3\' end carries a free hydroxyl.</li>',
        '<li>A 5\' end can carry a phosphate or a hydroxyl group, while a typical unmodified 3\' end has a free 3\'-OH.</li>']
    ],
    gone: ['The 5\' end has a free phosphate group', 'The 5\' end carries a free phosphate']
  }
];
