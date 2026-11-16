/**
 * Biology review batch 8, displayed Q49-Q60
 * (bio-459, bio-460, bio-461, bio-463 .. bio-465, bio-468 .. bio-472).
 * Q55 (bio-467, RuBisCO) is KEEP UNCHANGED per the review and so is absent
 * from this module by design. bio-462 and bio-466 are not in the pack.
 *
 * Q59 (bio-471) is the second substantial rewrite of this pack, with a new
 * stem, a renamed option B and replacement feedback, points and Bottom Line.
 */
'use strict';

const Q59_POINTS =
  '<h4>Key Educational Points:</h4>' +
  '<ul><li>Coacervates are droplets formed by separation into different liquid phases; their contents can differ from the surrounding solution.</li>' +
  '<li>Lipid vesicles enclose an aqueous interior within a lipid membrane and are useful models of compartment formation.</li>' +
  '<li>Proteinoid microspheres are another laboratory model of cell-like organization; none of these structures alone establishes how life actually began.</li></ul>';

const Q60_POINTS =
  '<h4>Key Educational Points:</h4>' +
  '<ul><li>Proteinoids are heterogeneous protein-like polymers made by chemical reactions, rather than proteins synthesized from a genetic template.</li>' +
  '<li>Proteinoid microspheres demonstrate cell-like assembly under laboratory conditions; their boundaries are not lipid bilayers.</li>' +
  '<li>A cell-like shape or boundary is not enough to establish life, heredity or the actual historical origin of cells.</li></ul>';

module.exports = [
  // ---- Q49  bio-459  scurvy ----------------------------------------------
  {
    q: 49, id: 'bio-459', expectLetter: 'C',
    explanation: [[
      '<p><strong>A. Vitamin A:</strong> Deficiency causes night blindness and xerophthalmia (dry eyes), not bleeding gums or poor wound healing.</p>',
      '<p><strong>A. Vitamin A:</strong> Vitamin A deficiency is classically associated with night blindness and xerophthalmia. Although vitamin A also contributes to tissue repair, the combination of bleeding gums and impaired collagen formation in scurvy points to vitamin C deficiency.</p>'
    ]],
    keepHeadings: ['<strong>A. Vitamin A:</strong>'],
    gone: ['not bleeding gums or poor wound healing']
  },

  // ---- Q50  bio-460  chiasmata (stem replaced) ---------------------------
  {
    q: 50, id: 'bio-460', expectLetter: 'C',
    stemFull: 'Visible connections between homologous chromosomes resulting from crossing over during meiosis are called:',
    explanation: [
      ['<p><strong>B. Telomeres:</strong> Telomeres are protective repetitive DNA sequences at chromosome ends that prevent degradation; they do not participate in recombination.</p>',
        '<p><strong>B. Telomeres:</strong> Telomeres are protective repetitive DNA sequences at chromosome ends that prevent degradation. They are not the name for the connections formed by crossing over between homologues.</p>'],
      ['<p class=\'exp-key\'>Bottom Line: Crossing over at chiasmata is a major source of genetic variation. Along with independent assortment and random fertilization, it ensures that each gamete - and therefore each offspring - is genetically unique.</p>',
        '<p class=\'exp-key\'>Bottom Line: Crossing over at chiasmata is a major source of genetic variation. Crossing over and independent assortment increase variation among gametes, and random fertilization adds further variation among offspring.</p>']
    ],
    keepHeadings: ['<strong>B. Telomeres:</strong>'],
    gone: ['Crossing over between homologous chromosomes during meiosis I occurs at structures called',
      'they do not participate in recombination', 'is genetically unique']
  },

  // ---- Q51  bio-461  conjugation pilus (stem replaced) -------------------
  {
    q: 51, id: 'bio-461', expectLetter: 'B',
    stemFull: 'During F-plasmid-mediated conjugation in E. coli, which structure helps establish contact between a donor and a recipient cell?',
    explanation: [
      ['<p>The sex pilus (also called F-pilus or conjugation pilus) is a hollow protein appendage that extends from a donor bacterium (F⁺) to a recipient (F⁻), forming a conjugation bridge. Through this bridge, the donor transfers a copy of its F-plasmid (or sometimes chromosomal DNA in Hfr strains), enabling horizontal gene transfer. This is a major mechanism for spreading antibiotic resistance genes among bacterial populations.</p>',
        '<p>The F pilus extends from a donor cell and helps establish contact with a recipient. The conjugation machinery transfers a DNA strand, which can be copied to form double-stranded DNA in the recipient. An F⁺ cell carries a free F plasmid; in an Hfr cell, the F factor is integrated into the chromosome, allowing adjacent chromosomal DNA to be transferred. Conjugation is one route by which antibiotic resistance genes spread among bacterial populations.</p>'],
      ['<p><strong>A. Flagellum:</strong> Flagella are locomotion structures that rotate like propellers to move bacteria through liquid environments; they have no role in gene transfer.</p>',
        '<p><strong>A. Flagellum:</strong> Flagella are locomotion structures that rotate like propellers to move bacteria through liquid environments. A flagellum is not the appendage that establishes the conjugative contact tested here.</p>'],
      ['<p><strong>C. Capsule:</strong> The capsule is a polysaccharide layer outside the cell wall that protects against phagocytosis and desiccation; it does not mediate genetic exchange.</p>',
        '<p><strong>C. Capsule:</strong> The capsule is a usually polysaccharide layer outside the cell wall that protects against phagocytosis and desiccation; it does not mediate genetic exchange.</p>'],
      ['<p class=\'exp-key\'>Bottom Line: Bacteria exchange genes by three mechanisms: conjugation (pilus, direct contact), transformation (uptake of free DNA from environment), and transduction (bacteriophage-mediated transfer). Conjugation via sex pili is the most efficient method for spreading resistance genes.</p>',
        '<p class=\'exp-key\'>Bottom Line: Three major routes of horizontal gene transfer are conjugation, transformation and transduction. Conjugation transfers DNA through contact between donor and recipient and can spread antibiotic resistance genes.</p>']
    ],
    keepHeadings: ['<strong>A. Flagellum:</strong>', '<strong>C. Capsule:</strong>'],
    gone: ['Which structure allows bacteria to transfer genetic material directly',
      'they have no role in gene transfer', 'is the most efficient method for spreading resistance genes',
      'a hollow protein appendage']
  },

  // ---- Q52  bio-463  neurulation (substantial repair) --------------------
  {
    q: 52, id: 'bio-463', expectLetter: 'C',
    explanation: [
      ['<p>Neurulation follows gastrulation and involves the folding of the dorsal ectoderm to form the neural plate, which then invaginates along the midline, elevates as neural folds, and closes to form the neural tube. The neural tube is the embryonic precursor of the entire central nervous system - the anterior portion becomes the brain, and the posterior portion becomes the spinal cord.</p>',
        '<p>During neurulation, a region of ectoderm thickens to form the neural plate. The plate bends, its edges rise as neural folds, and the folds fuse to form the neural tube. The anterior tube develops into the brain and the more posterior portion into the spinal cord.</p>'],
      ['<p><strong>A. Cleavage:</strong> Cleavage is the series of rapid mitotic divisions after fertilization that converts the zygote into a ball of cells (morula, then blastocyst); no differentiation or organ formation occurs.</p>',
        '<p><strong>A. Cleavage:</strong> Cleavage consists of early mitotic divisions that increase cell number without a comparable increase in the embryo\'s overall size. It produces the early multicellular embryo; neural-plate folding is a later process.</p>'],
      ['<p><strong>B. Gastrulation:</strong> Gastrulation establishes the three germ layers (ectoderm, mesoderm, endoderm) but does not form the neural tube - that happens next.</p>',
        '<p><strong>B. Gastrulation:</strong> Gastrulation establishes the three germ layers (ectoderm, mesoderm, endoderm). Neural tube formation from specialized ectoderm is called neurulation, although these developmental processes can overlap in time.</p>'],
      ['<p><strong>D. Implantation:</strong> Implantation is the embedding of the blastocyst into the uterine endometrium; it is a prerequisite for further development but is not a morphogenic process.</p>',
        '<p><strong>D. Implantation:</strong> Implantation is the attachment and embedding of the blastocyst in the uterine lining. It is not the process by which the neural plate folds into a neural tube.</p>']
    ],
    keepHeadings: ['<strong>A. Cleavage:</strong>', '<strong>B. Gastrulation:</strong>', '<strong>D. Implantation:</strong>'],
    gone: ['involves the folding of the dorsal ectoderm to form the neural plate',
      'no differentiation or organ formation occurs', 'is not a morphogenic process']
  },

  // ---- Q53  bio-464  HIV target cells ------------------------------------
  {
    q: 53, id: 'bio-464', expectLetter: 'C',
    explanation: [
      ['The virus integrates its genome into the host DNA using reverse transcriptase and integrase, hijacking the cell\'s machinery to produce new virions. Progressive destruction of CD4+ T cells leads to severe immunodeficiency (AIDS), leaving the patient vulnerable to opportunistic infections and cancers.</p>',
        'Reverse transcriptase copies the viral RNA into DNA. Integrase then inserts this viral DNA into host-cell DNA, and the cell\'s machinery is used to produce new virions. Without effective treatment, progressive loss of CD4+ T cells can lead to AIDS, leaving the patient vulnerable to opportunistic infections and cancers.</p>'],
      ['As CD4+ count drops below 200 cells/μL (normal: 500-1500), the patient is diagnosed with AIDS.',
        'In an adult with HIV, AIDS is diagnosed when the CD4 count falls below 200 cells/μL (normal: 500-1500) or an AIDS-defining illness develops, even if the count is higher.']
    ],
    gone: ['integrates its genome into the host DNA using reverse transcriptase and integrase',
      'Progressive destruction of CD4+ T cells leads to severe immunodeficiency']
  },

  // ---- Q54  bio-465  ADH -------------------------------------------------
  {
    q: 54, id: 'bio-465', expectLetter: 'D',
    explanation: [[
      '<p class=\'exp-key\'>Bottom Line: ADH acts on the collecting duct via aquaporin-2 channels. High ADH → concentrated urine (water retention). Low/absent ADH → dilute, high-volume urine (diabetes insipidus). Alcohol inhibits ADH release, explaining its diuretic effect.</p>',
      '<p class=\'exp-key\'>Bottom Line: ADH increases collecting-duct water permeability by promoting aquaporin-2 insertion. More ADH generally conserves water and concentrates urine; less ADH allows more dilute urine. Pathological ADH deficiency or kidney resistance to ADH can cause diabetes insipidus. Alcohol inhibits ADH release, explaining its diuretic effect.</p>'
    ]],
    gone: ['dilute, high-volume urine (diabetes insipidus)']
  },

  // ---- Q56  bio-468  Oparin-Haldane energy -------------------------------
  {
    q: 56, id: 'bio-468', expectLetter: 'A',
    explanation: [
      ['<p>The Oparin-Haldane hypothesis proposes that the early Earth\'s atmosphere was a reducing atmosphere (rich in CH₄, NH₃, H₂O, H₂) and that energy from ultraviolet radiation and lightning drove chemical reactions that produced simple organic molecules (amino acids, sugars, nucleotide bases) from inorganic precursors. This was experimentally supported by the Miller-Urey experiment in 1953.</p>',
        '<p>In the classic Oparin-Haldane model, energy from sources such as ultraviolet radiation and lightning drives reactions that produce organic molecules from simpler starting materials. The model envisaged a reducing early atmosphere, rich in CH₄, NH₃, H₂O and H₂. Miller\'s 1953 experiment demonstrated amino-acid formation under selected laboratory conditions inspired by this idea; it did not establish the exact composition of Earth\'s early atmosphere or produce life.</p>'],
      ['<p><strong>B. Geothermal heat from mid-ocean ridges only:</strong> While deep-sea hydrothermal vents are a competing hypothesis for the origin of life (the "iron-sulfur world" model), the Oparin-Haldane hypothesis specifically emphasizes atmospheric energy sources such as UV radiation and electrical discharge, not exclusively geothermal energy.</p>',
        '<p><strong>B. Geothermal heat from mid-ocean ridges only:</strong> Geothermal energy and hydrothermal settings are investigated in other origin-of-life models. Restricting the energy source to mid-ocean-ridge heat does not match the atmospheric UV and electrical-discharge scenario being tested.</p>'],
      ['<p><strong>C. Radioactive decay of carbon-14:</strong> Carbon-14 is a naturally occurring radioisotope but has a half-life of only ~5,730 years and produces minimal energy. It was not a significant energy source for prebiotic chemistry. Higher-energy radiation sources were far more relevant.</p>',
        '<p><strong>C. Radioactive decay of carbon-14:</strong> Carbon-14 decay is not the energy source proposed in the classic scenario tested here. The relevant proposed sources are UV radiation and electrical discharges.</p>'],
      ['<p><strong>D. Photosynthesis by primitive cyanobacteria:</strong> Cyanobacteria evolved approximately 2.7 billion years ago, well after the origin of life (~3.8 billion years ago). Photosynthesis is a biological process that requires already-existing life forms, so it cannot explain the abiotic origin of organic molecules.</p>',
        '<p><strong>D. Photosynthesis by primitive cyanobacteria:</strong> Photosynthesis by cyanobacteria requires living cells. It therefore does not explain the prebiotic synthesis proposed to occur before life existed.</p>'],
      ['<li>Energy sources included UV radiation, lightning, and volcanic activity</li>',
        '<li>The model\'s proposed energy sources included UV radiation, lightning, and volcanic activity</li>'],
      ['<li>The Miller-Urey experiment (1953) simulated these conditions and produced amino acids</li>',
        '<li>Miller\'s 1953 experiment produced amino acids under simulated conditions, supporting the possibility of abiotic synthesis</li>'],
      ['the energy for abiotic synthesis of organic molecules in Earth\'s early reducing atmosphere.</p>',
        'the energy for abiotic synthesis of organic molecules in the model\'s proposed reducing atmosphere.</p>']
    ],
    keepHeadings: ['<strong>B. Geothermal heat from mid-ocean ridges only:</strong>',
      '<strong>C. Radioactive decay of carbon-14:</strong>', '<strong>D. Photosynthesis by primitive cyanobacteria:</strong>'],
    gone: ['2.7 billion years ago', '3.8 billion years ago', '5,730 years',
      'in Earth\'s early reducing atmosphere', 'iron-sulfur world']
  },

  // ---- Q57  bio-469  Miller gas mixture ----------------------------------
  {
    q: 57, id: 'bio-469', expectLetter: 'D',
    explanation: [
      ['<p><strong>A. O₂, N₂, CO₂, and H₂O:</strong> This resembles Earth\'s current oxidizing atmosphere. Free oxygen (O₂) was essentially absent from the early atmosphere - it accumulated only after cyanobacteria began photosynthesis during the Great Oxidation Event (~2.4 billion years ago). An oxidizing atmosphere would break down organic molecules rather than allow their accumulation.</p>',
        '<p><strong>A. O₂, N₂, CO₂, and H₂O:</strong> This was not the gas mixture used in the classic experiment, which did not include added O₂. Earth\'s atmospheric oxygen accumulated later following oxygenic photosynthesis; photosynthesis began before the Great Oxidation Event rather than precisely at that event.</p>'],
      ['<p><strong>B. N₂, SO₂, CO, and O₃:</strong> Ozone (O₃) requires free oxygen and did not exist in the early atmosphere. While some models include volcanic gases like SO₂ and CO, this particular combination with ozone is inaccurate and was not used in the experiment.</p>',
        '<p><strong>B. N₂, SO₂, CO, and O₃:</strong> This mixture was not used in the experiment either. Ozone (O₃) forms from free oxygen, which was scarce in the early atmosphere, and although some models include volcanic gases such as SO₂ and CO, this combination is not what Miller used.</p>'],
      ['<p><strong>C. CO₂, O₂, CH₄, and N₂:</strong> The inclusion of O₂ makes this incorrect. Molecular oxygen is a strong oxidizer that would have prevented the stable accumulation of the organic precursors needed for chemical evolution.</p>',
        '<p><strong>C. CO₂, O₂, CH₄, and N₂:</strong> This mixture also differs from the actual experiment: it includes O₂ and omits ammonia and hydrogen. The question asks which gases Miller used, not whether every other mixture could ever support organic chemistry.</p>'],
      ['<ul><li>The early atmosphere was reducing (no free O₂), favoring organic molecule synthesis</li>' +
        '<li>The Miller-Urey experiment produced over 20 amino acids and other organic compounds</li>' +
        '<li>Modern hypotheses suggest the early atmosphere may have been less reducing (more CO₂ and N₂), but organic synthesis is still possible under those conditions near hydrothermal vents</li></ul>',
        '<ul><li>The classic experiment used methane, ammonia, hydrogen and water vapor, with electric sparks as an energy source</li>' +
        '<li>The 1953 report identified amino acids including glycine and alanine; later analyses of archived experiments revealed a wider range of products</li>' +
        '<li>The experiment demonstrated abiotic organic synthesis under its laboratory conditions. It did not prove that the whole early atmosphere had that gas composition</li></ul>']
    ],
    keepHeadings: ['<strong>A. O₂, N₂, CO₂, and H₂O:</strong>', '<strong>B. N₂, SO₂, CO, and O₃:</strong>',
      '<strong>C. CO₂, O₂, CH₄, and N₂:</strong>'],
    gone: ['over 20 amino acids', 'did not exist in the early atmosphere',
      'would break down organic molecules rather than allow their accumulation',
      'prevented the stable accumulation of the organic precursors',
      'The early atmosphere was reducing (no free O₂)']
  },

  // ---- Q58  bio-470  RNA world (stem replaced) ---------------------------
  {
    q: 58, id: 'bio-470', expectLetter: 'D',
    stemFull: 'The RNA world hypothesis proposes that early evolving systems relied on RNA for functions now divided among DNA, RNA and proteins. Which property of RNA supports this hypothesis?',
    explanation: [
      ['DNA\'s greater stability is actually why it eventually replaced RNA as the primary genetic material.</p>',
        'DNA\'s greater resistance to backbone hydrolysis is a proposed advantage for the later evolution of DNA-based genomes.</p>'],
      ['<p><strong>C. RNA contains thymine instead of uracil:</strong> This is reversed. RNA contains uracil (U), while DNA contains thymine (T). Thymine is a methylated form of uracil that provides extra stability to DNA.</p>',
        '<p><strong>C. RNA contains thymine instead of uracil:</strong> This is reversed. Standard RNA uses uracil (U) and standard DNA uses thymine (T). The chemical difference that matters for this hypothesis is RNA\'s 2\'-OH group rather than thymine\'s methyl group.</p>'],
      ['<li>The RNA world likely preceded the current DNA → RNA → Protein world</li>',
        '<li>The RNA world hypothesis proposes an early stage in which RNA carried information and catalyzed reactions; the exact route to modern cells remains unresolved</li>'],
      ['<p class=\'exp-key\'>Bottom Line: RNA\'s dual ability to store genetic information and catalyze reactions makes it a plausible candidate for the first self-replicating molecule in early life.</p>',
        '<p class=\'exp-key\'>Bottom Line: RNA can carry sequence information and catalyze reactions. These properties support the plausibility of an early RNA-based system, but they do not by themselves prove the historical pathway by which life arose.</p>']
    ],
    keepHeadings: ['<strong>C. RNA contains thymine instead of uracil:</strong>'],
    gone: ['Which unique property of RNA', 'why it eventually replaced RNA as the primary genetic material',
      'provides extra stability to DNA', 'The RNA world likely preceded']
  },

  // ---- Q59  bio-471  protobionts (substantial rewrite, option B renamed) -
  {
    q: 59, id: 'bio-471', expectLetter: 'C',
    stemFull: 'In simple laboratory models of protobionts (protocell-like compartments), which feature illustrates compartmentalization?',
    optionFull: [[1, 'Reproduction by coordinated DNA replication and binary fission, as in modern bacteria']],
    explanation: [
      ['<p>Protobionts are abiotically produced structures that exhibit some properties of life. Their most important characteristic is the ability to maintain an internal environment different from the external environment - a form of primitive compartmentalization. This includes structures like liposomes, coacervates, and microspheres, which can form spontaneously from organic molecules.</p>',
        '<p>Protobionts or protocells are models of simple systems that may help explain steps toward cellular life. Lipid vesicles and coacervate droplets can concentrate or retain some substances differently from their surroundings, creating distinct internal chemistry. This is compartmentalization; it does not necessarily imply the actively regulated homeostasis of a modern cell. Such models test possible processes, rather than providing a direct record of the first cells.</p>'],
      ['<p><strong>A. They contain DNA-based genomes and ribosomes:</strong> Protobionts predate the evolution of DNA and ribosomes. They may have contained simple polymers (possibly RNA), but they did not have organized genomes or translation machinery. These features evolved later in true cells.</p>',
        '<p><strong>A. They contain DNA-based genomes and ribosomes:</strong> A complete DNA genome and ribosomes are not required for a simple compartment model. The question tests separation of an internal chemical environment from its surroundings, not modern genetic and protein-synthesis machinery.</p>'],
      ['<p><strong>B. They can reproduce through binary fission:</strong> Binary fission is a complex process involving DNA replication, chromosome segregation, and cytokinesis. Protobionts could "split" or "bud" when they grew too large, but this was a simple physical process, not true reproduction with faithful genetic transmission.</p>',
        '<p><strong>B. Reproduction by coordinated DNA replication and binary fission, as in modern bacteria:</strong> Some model compartments can grow and physically divide. That does not by itself demonstrate the coordinated genome replication and division used by modern bacteria.</p>'],
      ['<p><strong>D. They perform oxidative phosphorylation:</strong> Oxidative phosphorylation requires a sophisticated electron transport chain embedded in a membrane, along with ATP synthase - molecular machinery that evolved much later. Early energy metabolism was likely based on simpler chemical reactions.</p>',
        '<p><strong>D. They perform oxidative phosphorylation:</strong> Modern oxidative phosphorylation requires an organized electron transport system and ATP synthase. These are not necessary for the simple compartmentalization demonstrated by the models in this question.</p>'],
      ['<h4>Key Educational Points:</h4><ul><li>Coacervates (Oparin) - colloidal droplets that can absorb substances from the surrounding solution</li>' +
        '<li>Microspheres (Fox) - formed from proteinoids when heated and cooled; can show osmotic-like behavior</li>' +
        '<li>Liposomes - lipid bilayer vesicles that form spontaneously and represent the most plausible protocell membrane model</li></ul>',
        Q59_POINTS],
      ['<p class=\'exp-key\'>Bottom Line: Protobionts are abiotic structures that can maintain a separate internal environment, representing a critical step toward the first living cells.</p>',
        '<p class=\'exp-key\'>Bottom Line: Simple compartments can create distinct internal chemistry without possessing all the machinery of living cells. This makes them useful models for studying possible steps in the origin of life.</p>']
    ],
    keepHeadings: ['<strong>A. They contain DNA-based genomes and ribosomes:</strong>',
      '<strong>D. They perform oxidative phosphorylation:</strong>'],
    gone: ['Protobionts are considered precursors to living cells', 'They can reproduce through binary fission',
      'Protobionts predate the evolution of DNA and ribosomes', 'most plausible protocell membrane model',
      'representing a critical step toward the first living cells']
  },

  // ---- Q60  bio-472  Fox proteinoid microspheres -------------------------
  {
    q: 60, id: 'bio-472', expectLetter: 'A',
    explanation: [
      ['<p>Sidney Fox showed that when dry mixtures of amino acids are heated to 150–180°C (simulating volcanic conditions), they polymerize into proteinoid chains. When these proteinoids are dissolved in hot water and then cooled, they spontaneously form microspheres - small, stable, cell-like structures with a double-layered boundary. These microspheres can swell, shrink, and even "bud" to form smaller microspheres.</p>',
        '<p>Fox and colleagues showed that heating suitable dry amino-acid mixtures could produce protein-like polymers called proteinoids. When prepared in water under suitable conditions, these polymers assembled into small microspheres. Their boundaries were made from proteinoid material, not the lipid bilayers of modern cell membranes. The experiment demonstrated abiotic polymer formation and cell-like assembly; it did not create living cells or demonstrate a self-replicating genome.</p>'],
      ['<p><strong>B. DNA can replicate without enzymes under high temperature:</strong> Fox\'s experiments did not involve DNA replication. His work focused on protein-like polymers (proteinoids), not nucleic acids. Additionally, high temperatures denature DNA rather than promote its replication.</p>',
        '<p><strong>B. DNA can replicate without enzymes under high temperature:</strong> Fox\'s experiment investigated amino-acid polymers and their assembly in water. It did not demonstrate enzyme-free copying of DNA.</p>'],
      ['<p><strong>D. Photosynthesis can occur without chlorophyll in primitive membranes:</strong> Photosynthesis requires complex pigment systems and electron transport chains. This was not demonstrated by Fox and is not supported by current evidence for early prebiotic chemistry.</p>',
        '<p><strong>D. Photosynthesis can occur without chlorophyll in primitive membranes:</strong> The experiment did not demonstrate light-driven energy conversion or photosynthetic carbon fixation. Its result concerned polymer formation and assembly into microspheres.</p>'],
      ['<h4>Key Educational Points:</h4><ul><li>Proteinoids are not true proteins - they are random polymers of amino acids formed without ribosomes or genetic coding</li>' +
        '<li>Microspheres demonstrate that cell-like compartmentalization can arise spontaneously</li>' +
        '<li>Fox\'s work addressed the "membrane problem" - how the first cells became enclosed</li></ul>',
        Q60_POINTS],
      ['<p class=\'exp-key\'>Bottom Line: Fox demonstrated that amino acids polymerize under heat and spontaneously form microspheres in water, suggesting a plausible path to primitive cell-like structures.</p>',
        '<p class=\'exp-key\'>Bottom Line: Fox\'s experiments demonstrated abiotic formation of protein-like polymers and their assembly into microspheres. They supplied a model for studying cell-like organization, not proof that these structures were the first living cells.</p>']
    ],
    keepHeadings: ['<strong>B. DNA can replicate without enzymes under high temperature:</strong>',
      '<strong>C. Lipid bilayers spontaneously form around RNA molecules:</strong>',
      '<strong>D. Photosynthesis can occur without chlorophyll in primitive membranes:</strong>'],
    gone: ['150–180°C', 'Proteinoids are not true proteins', 'double-layered boundary',
      'high temperatures denature DNA rather than promote its replication']
  }
];
