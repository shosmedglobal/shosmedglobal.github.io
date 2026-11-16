/**
 * Biology review batch 11, edits for File A (A1-A5).
 *
 * Spec shape:
 *   q               display number in its export ("A1")
 *   id              verified bank id
 *   expectLetter    the key the review asserts; the harness refuses to edit a
 *                   record whose stored key differs
 *   stemFull        complete replacement stem (only for the 10 listed items)
 *   optionFull      [[index, text]] complete replacement option texts
 *   explanationFull complete replacement explanation
 *   explanation     [[from, to]] anchored partial replacements, each of which
 *                   must match exactly once
 *   keepHeadings    strings that must survive the edit
 *   gone            superseded strings that must be absent afterwards
 */
'use strict';

const A1_EXPLANATION =
  "<h4>Correct Answer: Phycocyanin and phycoerythrin</h4>" +
  "<p>Phycocyanin and phycoerythrin are light-harvesting pigment-protein complexes called <strong>phycobiliproteins</strong>. " +
  "Phycocyanin is blue and phycoerythrin is red. In many cyanobacteria, phycobiliproteins form antenna structures called " +
  "<strong>phycobilisomes</strong> that transfer absorbed light energy to the photosynthetic machinery.</p>" +
  "<p>These pigments broaden the wavelengths available for photosynthesis, including wavelengths absorbed relatively poorly " +
  "by chlorophyll a. Chlorophyll a and phycocyanin together help produce the familiar blue-green appearance; organisms rich " +
  "in phycoerythrin can appear redder. Pigment composition varies between cyanobacterial groups.</p>" +
  "<h4>Why the other choices are wrong:</h4>" +
  "<p><strong>B. Chlorophyll b and carotenoids:</strong> These are different pigment groups, not phycobiliproteins. Some " +
  "cyanobacteria contain chlorophyll b, and cyanobacteria also contain carotenoids, so their presence cannot be ruled out " +
  "across the whole group.</p>" +
  "<p><strong>C. Xanthophyll and anthocyanin:</strong> Xanthophylls are oxygen-containing carotenoids, and some occur in " +
  "cyanobacteria. Anthocyanins are plant pigments associated with red, purple and blue coloration. Neither belongs to the " +
  "phycobiliprotein group asked about here.</p>" +
  "<p><strong>D. Bacteriochlorophyll and rhodopsin:</strong> Bacteriochlorophylls are associated with anoxygenic " +
  "photosynthetic bacteria. Rhodopsins are retinal-containing light-sensitive proteins, some of which act as light-driven " +
  "ion pumps. These are different systems from phycobiliprotein antennae.</p>" +
  "<h4>Key Educational Points:</h4><ul>" +
  "<li>Phycocyanin and phycoerythrin are phycobiliproteins that help capture light energy</li>" +
  "<li>Many cyanobacteria and red algae use phycobilisomes; these structures are not unique to cyanobacteria</li>" +
  "<li>Pigment composition varies, and some cyanobacteria adjust their pigments to the available light</li>" +
  "</ul>" +
  "<p class='exp-key'>Bottom Line: Phycocyanin and phycoerythrin are accessory phycobiliproteins. Phycocyanin is blue, " +
  "phycoerythrin is red, and their light-harvesting roles should be distinguished from those of chlorophylls and carotenoids.</p>";

const A3_EXPLANATION =
  "<h4>Correct Answer: A plasma membrane surrounding the cell</h4>" +
  "<p>Both prokaryotic and eukaryotic cells have a <strong>plasma membrane</strong> separating their internal contents from " +
  "the environment. The membrane helps control the movement of substances into and out of the cell. Its presence is the " +
  "shared feature. Its lipid composition and arrangement are not identical in every organism: some archaea have membranes " +
  "formed by a lipid monolayer rather than a bilayer.</p>" +
  "<table class='exp-table'>" +
  "<tr><th>Feature</th><th>Typical prokaryotic cell</th><th>Typical eukaryotic cell</th></tr>" +
  "<tr><td>Membrane-bound nucleus</td><td>Absent</td><td>Present</td></tr>" +
  "<tr><td>Ribosomes in the cytosol</td><td>70S</td><td>80S</td></tr>" +
  "<tr><td>Chromosomes</td><td>Usually circular; DNA-packaging proteins vary</td>" +
  "<td>Nuclear chromosomes are usually linear and associated with histones</td></tr>" +
  "<tr><td>Plasma membrane</td><td>Present</td><td>Present</td></tr>" +
  "</table>" +
  "<h4>Why the other choices are wrong:</h4>" +
  "<p><strong>A. Membrane-bound nucleus:</strong> A typical eukaryotic cell has a nucleus enclosed by a nuclear envelope. " +
  "Prokaryotic cells lack this enclosure; their DNA occupies a nucleoid region. A membrane-bound nucleus is therefore not a " +
  "shared feature.</p>" +
  "<p><strong>B. 70S ribosomes free in the cytosol:</strong> Prokaryotic cytosolic ribosomes are 70S, whereas eukaryotic " +
  "cytosolic ribosomes are 80S. Mitochondria and chloroplasts have their own ribosomes, but these are inside organelles and " +
  "are not all the same size.</p>" +
  "<p><strong>D. Linear chromosomes with histone proteins:</strong> This combination is characteristic of eukaryotic nuclear " +
  "chromosomes, not a general feature shared by both cell types. Prokaryotic chromosomes are usually circular, and their " +
  "packaging proteins vary. Many archaea have histones, so \"prokaryotes never have histones\" would be incorrect.</p>" +
  "<h4>Key Educational Points:</h4><ul>" +
  "<li>A plasma membrane is shared by prokaryotic and eukaryotic cells.</li>" +
  "<li>The membrane separates the internal environment from the surroundings and regulates exchange.</li>" +
  "<li>Typical prokaryotic and eukaryotic cytosolic ribosomes are 70S and 80S, respectively.</li>" +
  "<li>A membrane-bound nucleus distinguishes typical eukaryotic cells from prokaryotic cells.</li>" +
  "<li>Prokaryotes include both Bacteria and Archaea; statements about bacterial membranes or DNA packaging should not " +
  "automatically be applied to all archaea.</li>" +
  "</ul>" +
  "<p class='exp-key'>Bottom Line: All cells have a plasma membrane. A phospholipid bilayer, a particular chromosome shape " +
  "and the absence of histones are not universal properties of all prokaryotes.</p>";

const A5_EXPLANATION =
  "<h4>Correct Answer: 8%</h4>" +
  "<p>For a short interval, a map distance of 8 cM corresponds to approximately <strong>8% recombinant gametes</strong>. " +
  "The ab/ab parent contributes only ab gametes, so offspring genotypes reveal which gamete came from the AB/ab parent.</p>" +
  "<p>The parental gametes are AB and ab; the recombinant gametes are Ab and aB. With the stated approximation and equal " +
  "survival of the offspring classes:</p>" +
  "<ul>" +
  "<li>Parental offspring: AaBb, approximately 46%; aabb, approximately 46%.</li>" +
  "<li>Recombinant offspring: Aabb, approximately 4%; aaBb, approximately 4%.</li>" +
  "</ul>" +
  "<p>Thus, approximately 8% are recombinant and 92% are parental.</p>" +
  "<h4>Why the other choices are wrong:</h4>" +
  "<p><strong>A. 50%:</strong> A recombination frequency near 50% means that the loci behave as unlinked in a two-locus " +
  "testcross. These genes are close together, so most offspring retain parental combinations. Widely separated linked loci " +
  "can also approach 50% because multiple crossovers obscure their linkage.</p>" +
  "<p><strong>C. 42%:</strong> Subtracting 8% from 50% does not calculate the recombinant percentage. Approximately 8% are " +
  "recombinant in total. The remaining 92% are parental, giving approximately 46% in each of the two parental classes under " +
  "this model.</p>" +
  "<p><strong>D. 16%:</strong> The 8% already includes both recombinant classes. Each contributes approximately 4%, so they " +
  "add to 8%, not 16%. Counting the two classes does not justify doubling the map distance.</p>" +
  "<h4>Key Educational Points:</h4><ul>" +
  "<li>For closely linked genes, 1 cM corresponds approximately to 1% recombination.</li>" +
  "<li>Genes closer together are less likely to be separated by recombination.</li>" +
  "<li>In a testcross, the recessive parent's known gamete allows offspring genotypes to reveal the heterozygous parent's " +
  "gametes.</li>" +
  "<li>The expected recombination frequency in the standard two-locus model does not exceed 50%.</li>" +
  "<li>Here, AB and ab are parental combinations because the stem explicitly gives the phase as AB/ab.</li>" +
  "<li>Multiple crossovers can go undetected in two-locus offspring counts, so genetic map distance and observed " +
  "recombination percentage diverge over longer intervals.</li>" +
  "</ul>" +
  "<p class='exp-key'>Bottom Line: With AB/ab × ab/ab and the short-distance approximation, 8 cM gives approximately " +
  "8% recombinant offspring: 4% Aabb plus 4% aaBb.</p>";

module.exports = [
  // ---- A1 bio-608: phycobiliproteins. Substantial repair; new stem, full explanation.
  {
    q: 'A1', id: 'bio-608', expectLetter: 'A',
    stemFull: 'Many cyanobacteria use accessory pigments in addition to chlorophyll a. Which pair consists of phycobiliproteins?',
    explanationFull: A1_EXPLANATION,
    gone: [
      'unique accessory pigments',                      // phycobiliproteins are not unique to cyanobacteria
      'orange-red spectrum (500-650 nm)',               // 500-650 nm is not all orange-red
      'not a true photosynthetic pigment',              // rhodopsins dismissed rather than distinguished
      'which only have chlorophyll a',                  // some cyanobacteria do have chlorophyll b
      'Neither is found in cyanobacteria',              // xanthophylls do occur in cyanobacteria
      'the only prokaryotes that perform oxygenic photosynthesis',
      'signature accessory pigments of cyanobacteria',
      'characteristic blue-green color'                 // phycoerythrin is red, not the cause of that color
    ]
  },

  // ---- A2 bio-277: HbS and protein structure. Substantial repair; stem and options kept.
  {
    q: 'A2', id: 'bio-277', expectLetter: 'A',
    explanation: [
      ['<p>The amino acid sequence IS the primary structure. The E6V substitution directly alters primary structure, which then cascades to affect higher-order folding and causes abnormal HbS polymerization and red blood cell sickling.</p>',
        "<p><strong>Primary structure</strong> is the amino acid sequence of a protein. Replacing glutamate with valine at " +
        "position 6 of beta-globin therefore directly changes primary structure. The substitution replaces a charged side " +
        "chain with a hydrophobic one. In deoxygenated HbS, this favors abnormal contacts between hemoglobin molecules, " +
        "allowing them to assemble into fibers that distort red blood cells.</p>"],

      ['<p><strong>B. Secondary structure:</strong> Secondary structure (alpha helices and beta sheets) may be altered as a downstream consequence of the amino acid change, but the mutation first and directly affects primary structure (the amino acid sequence). The E6V substitution replaces a charged, hydrophilic glutamic acid with a nonpolar, hydrophobic valine, which subsequently disrupts higher-order folding.</p>',
        "<p><strong>B. Secondary structure:</strong> Secondary structure refers to local folding patterns such as alpha " +
        "helices and beta sheets. An amino acid substitution directly changes the sequence; it does not automatically " +
        "disrupt these local patterns. The primary-structure change is what this question asks you to identify.</p>"],

      ['<p><strong>C. Tertiary structure:</strong> Tertiary structure (the overall 3D folding of the polypeptide) is indeed affected in sickle cell disease because the valine creates a hydrophobic patch on the protein surface that promotes abnormal polymerization of deoxygenated HbS. However, this is a secondary consequence. The mutation first alters the primary structure, which then cascades to disrupt tertiary and quaternary structure.</p>',
        "<p><strong>C. Tertiary structure:</strong> Tertiary structure is the overall three-dimensional shape of one " +
        "polypeptide chain. The HbS substitution changes the chemistry of a surface site, but its key consequence is " +
        "abnormal association between hemoglobin molecules, rather than wholesale unfolding of beta-globin. The directly " +
        "altered level is the amino acid sequence.</p>"],

      ['<p><strong>D. Quaternary structure:</strong> Quaternary structure is dramatically affected in sickle cell disease because the hydrophobic valine on one HbS tetramer fits into a hydrophobic pocket on an adjacent tetramer, causing polymerization into long rigid fibers. But again, this is a downstream effect. The question asks which level is FIRST affected, and the answer is primary structure (the amino acid sequence itself).</p>',
        "<p><strong>D. Quaternary structure:</strong> Quaternary structure describes the association of protein subunits; " +
        "normal adult hemoglobin contains two alpha and two beta chains. HbS fibers arise from abnormal association of " +
        "hemoglobin tetramers. This is a consequence of the substitution, whereas the substitution itself changes primary " +
        "structure.</p>"],

      ['<li>The general principle: primary structure determines all higher levels, so a single-residue change can cascade into disease.</li>',
        '<li>A single amino acid substitution can alter protein behavior and cause disease without grossly disrupting every level of folding.</li>'],

      ["<p class='exp-key'>Bottom Line: All higher protein structure levels depend on primary structure (amino acid sequence).</p>",
        "<p class='exp-key'>Bottom Line: An amino acid substitution directly changes primary structure. In HbS, the " +
        "glutamate-to-valine substitution promotes abnormal association of deoxygenated hemoglobin molecules into fibers.</p>"]
    ],
    keepHeadings: ['<strong>B. Secondary structure:</strong>', '<strong>C. Tertiary structure:</strong>', '<strong>D. Quaternary structure:</strong>'],
    gone: [
      'which then cascades to affect higher-order folding',
      'may be altered as a downstream consequence',
      'cascades to disrupt tertiary and quaternary structure',
      'is dramatically affected in sickle cell disease',
      'primary structure determines all higher levels',
      'All higher protein structure levels depend on primary structure'
    ]
  },

  // ---- A3 bio-253: shared cell features. MAJOR REWRITE; options B and C renamed.
  {
    q: 'A3', id: 'bio-253', expectLetter: 'C',
    optionFull: [
      [1, '70S ribosomes free in the cytosol'],
      [2, 'A plasma membrane surrounding the cell']
    ],
    explanationFull: A3_EXPLANATION,
    gone: [
      'Plasma membrane composed of a phospholipid bilayer',   // the old keyed option and its heading
      '70S ribosomes in the cytoplasm',                       // the old option B
      'This is a universal feature of all cells',
      'Circular, no histones',                                // the old table cell denying archaeal histones
      '80S (cytoplasm), 70S (mitochondria/chloroplasts)',     // not all mitochondrial ribosomes are 70S
      'histone-like proteins (HU, IHF) but not true histones',
      'phospholipid bilayer plasma membrane is universal',
      'The phospholipid bilayer plasma membrane is a universal feature shared by all living cells'
    ]
  },

  // ---- A4 bio-462: LH surge. Targeted repair of the main explanation only.
  {
    q: 'A4', id: 'bio-462', expectLetter: 'C',
    explanation: [
      ['<p>Around day 14 of the menstrual cycle, a sharp spike in LH secretion from the anterior pituitary (the LH surge) triggers the mature Graafian follicle to rupture and release its oocyte - this is ovulation. The LH surge is itself triggered by rising estrogen levels from the developing follicle reaching a threshold that switches hypothalamic feedback from negative to positive.</p>',
        "<p>In a typical 28-day cycle, ovulation occurs around day 14, although the timing varies between people and " +
        "cycles. A surge of <strong>LH</strong> from the anterior pituitary triggers the mature ovarian follicle to rupture " +
        "and release its oocyte. Sustained high estradiol levels from the dominant follicle produce positive feedback on " +
        "the hypothalamus and anterior pituitary, leading to the LH surge.</p>"]
    ],
    keepHeadings: ['<strong>A. Estrogen:</strong>', '<strong>B. Progesterone:</strong>', '<strong>D. FSH:</strong>'],
    noPointBlock: true,
    gone: [
      'Around day 14 of the menstrual cycle, a sharp spike',
      'mature Graafian follicle',
      'switches hypothalamic feedback from negative to positive'
    ]
  },

  // ---- A5 bio-282: 8 cM testcross. Substantial repair; new stem states the phase.
  {
    q: 'A5', id: 'bio-282', expectLetter: 'B',
    stemFull: 'Two genes are 8 cM apart on the same chromosome. An individual with chromosome arrangement AB/ab is testcrossed with ab/ab. Using the short-distance approximation and ignoring undetected multiple crossovers, approximately what percentage of offspring will be recombinant?',
    explanationFull: A5_EXPLANATION,
    gone: [
      'Map distance is <em>defined</em> by recombination',     // cM is not identical to observed recombinant percentage
      '1 cM corresponds to 1% recombinant gametes',
      'the two combinations the dihybrid parent inherited',    // the old phase invention
      'the map distance <em>is</em> the recombinant percentage, so 8 cM gives 8%, full stop',
      'It is also the hard ceiling: recombination frequency can never exceed 50%',
      'a crossover between the two loci does not make every product of that meiosis recombinant',
      'The maximum observable recombination frequency is 50%',
      '1 cM = 1% recombinants',
      '&mdash;'                                               // this pass clears the last em dashes from biology
    ]
  }
];
