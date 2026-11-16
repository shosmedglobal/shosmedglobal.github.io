/**
 * Biology review batch 11, edits for File B items B7-B10 and B12.
 * Spec shape is documented in scripts/bio-batch11-edits-a.js.
 *
 * B11 (bio-615, Mendel) and B13 (bio-618, binomial nomenclature) are left
 * byte-identical per the review and so appear in no module.
 *
 * The review supplied "disease modelling"; the bank uses the American
 * spelling "modeling" throughout (20 occurrences, none of the British form),
 * so the bank spelling is kept. This is recorded as a cosmetic deviation.
 */
'use strict';

module.exports = [
  // ---- B7 bio-610: iPSCs. Substantial repair; new stem drops the identity claim.
  {
    q: 'B7', id: 'bio-610', expectLetter: 'C',
    stemFull: "A researcher wants patient-derived pluripotent stem cells for disease modeling. She introduces four specific transcription factors into the patient's skin fibroblasts to reprogram them. What are these reprogrammed cells called?",
    explanation: [
      ['<p>The four <strong>Yamanaka factors</strong> are: <strong>Oct3/4, Sox2, Klf4, and c-Myc</strong> (sometimes abbreviated as OSKM). iPSCs behave similarly to embryonic stem cells - they can differentiate into virtually any cell type - while avoiding the ethical concerns associated with embryo destruction.</p>',
        "<p>The classic <strong>Yamanaka factors</strong> are Oct3/4, Sox2, Klf4 and c-Myc (OSKM). Reprogramming changes " +
        "gene-expression programs so that the cells can generate derivatives of all three embryonic germ layers. iPSCs " +
        "retain the donor's genetic background, but genetic changes can be present or arise during their production and " +
        "culture. They can be made without deriving cells from an embryo.</p>"],

      ['<p><strong>A. Embryonic stem cells (ESCs):</strong> ESCs are derived from the <strong>inner cell mass of the blastocyst</strong> (early embryo, approximately day 5-7 post-fertilization). While they are naturally pluripotent, they are NOT genetically identical to an adult patient (they come from an embryo) and their derivation involves destruction of an embryo, raising ethical concerns. iPSCs were developed specifically as an alternative to ESCs.</p>',
        "<p><strong>A. Embryonic stem cells (ESCs):</strong> ESCs are derived from the inner cell mass of a blastocyst. " +
        "They are pluripotent, but they are not the cells produced by reprogramming the adult fibroblasts in this stem. " +
        "Their embryonic origin distinguishes them from iPSCs.</p>"],

      ['<p><strong>B. Mesenchymal stem cells (MSCs):</strong> MSCs are <strong>multipotent</strong> (not pluripotent) adult stem cells found in bone marrow, adipose tissue, and other tissues. They can differentiate into a limited range of cell types: osteoblasts, chondrocytes, adipocytes, and myocytes. They are NOT produced by introducing transcription factors - they exist naturally in adult tissues.</p>',
        "<p><strong>B. Mesenchymal stem cells (MSCs):</strong> These cells are generally described as multipotent stromal " +
        "cells. Commonly demonstrated differentiation pathways include bone, cartilage and fat cells. They are not " +
        "equivalent to the pluripotent cells produced by the reprogramming procedure described here.</p>"],

      ['<li>Potency hierarchy: Totipotent (zygote → everything including placenta) > Pluripotent (ESCs/iPSCs → all three germ layers) > Multipotent (HSCs/MSCs → limited lineages) > Unipotent (one cell type only)</li>',
        '<li>Totipotent cells can contribute to embryonic and supporting extraembryonic lineages; pluripotent cells can generate derivatives of all three embryonic germ layers; multipotent cells have a more restricted range</li>'],

      ['<li>c-Myc is a proto-oncogene, which is why early iPSC methods carried a risk of tumor formation</li>',
        '<li>c-Myc can contribute to tumor risk, but genetic changes and residual undifferentiated pluripotent cells are also important safety concerns</li>'],

      ['<li>iPSC applications: disease modeling, drug screening, and potentially patient-specific cell replacement therapy</li>',
        '<li>iPSCs are useful for disease modeling and drug screening; cell-replacement applications require careful differentiation and safety assessment</li>'],

      ["<p class='exp-key'>Bottom Line: iPSCs are adult cells reprogrammed to pluripotency using Yamanaka factors (Oct3/4, Sox2, Klf4, c-Myc). They solve the ethical problem of ESCs while providing patient-specific pluripotent cells. Yamanaka won the 2012 Nobel Prize for this discovery.</p>",
        "<p class='exp-key'>Bottom Line: iPSCs are somatic cells reprogrammed to pluripotency. They provide cells with a " +
        "patient's genetic background without requiring an embryo, but they still require checks for genetic changes and " +
        "appropriate differentiation.</p>"]
    ],
    keepHeadings: ['<strong>A. Embryonic stem cells (ESCs):</strong>', '<strong>B. Mesenchymal stem cells (MSCs):</strong>', '<strong>D. Hematopoietic stem cells (HSCs):</strong>'],
    gone: [
      'genetically identical to an adult patient',          // reprogramming does not guarantee identity
      'differentiate into virtually any cell type',
      'while avoiding the ethical concerns associated with embryo destruction',
      'They solve the ethical problem of ESCs',
      'c-Myc is a proto-oncogene, which is why early iPSC methods',   // c-Myc is not the sole explanation
      'Potency hierarchy: Totipotent'
    ]
  },

  // ---- B8 bio-612: HSC potency. Targeted repair.
  {
    q: 'B8', id: 'bio-612', expectLetter: 'C',
    explanation: [
      ['<p><strong>Hematopoietic stem cells (HSCs)</strong> in bone marrow are <strong>multipotent</strong> - they can differentiate into <strong>multiple related cell types within a single lineage</strong>.',
        '<p><strong>Hematopoietic stem cells (HSCs)</strong> in bone marrow are <strong>multipotent</strong>: they generate several related cell types within the blood-forming system.'],

      ['<p><strong>A. Totipotent:</strong> <strong>Totipotent</strong> cells can give rise to <strong>all</strong> cell types of the organism PLUS extra-embryonic structures (placenta, umbilical cord). Only the zygote and cells up to the 8-cell stage (morula) are totipotent. HSCs cannot form placental tissue or non-blood cell types, so they are not totipotent.</p>',
        "<p><strong>A. Totipotent:</strong> Totipotency is the capacity to contribute to the embryo and its supporting " +
        "extraembryonic lineages. The zygote is the classic example. HSCs have a much narrower developmental range and do " +
        "not form all the tissues needed for an entire organism.</p>"],

      ['<p><strong>B. Pluripotent:</strong> <strong>Pluripotent</strong> cells can differentiate into all cell types of the body (all three germ layers: ectoderm, mesoderm, endoderm) but NOT extra-embryonic tissues. Embryonic stem cells (ESCs) and induced pluripotent stem cells (iPSCs) are pluripotent. HSCs are more restricted - they only form blood cells, not neurons, hepatocytes, or other non-blood cell types.</p>',
        "<p><strong>B. Pluripotent:</strong> Pluripotent cells can form derivatives of all three embryonic germ layers, " +
        "such as neurons, liver cells and blood cells, but cannot by themselves generate an entire organism with all its " +
        "supporting extraembryonic lineages. ESCs and iPSCs are examples. HSCs are restricted to the blood-forming " +
        "system.</p>"],

      ['<li>Umbilical cord blood is another source of HSCs, increasingly used in pediatric transplants</li>',
        '<li>Umbilical cord blood is another established source of hematopoietic stem cells for transplantation</li>']
    ],
    keepHeadings: ['<strong>A. Totipotent:</strong>', '<strong>B. Pluripotent:</strong>', '<strong>D. Unipotent:</strong>'],
    gone: [
      'multiple related cell types within a single lineage',
      'cells up to the 8-cell stage (morula) are totipotent',   // rigid human stage cutoff
      'but NOT extra-embryonic tissues',
      'increasingly used in pediatric transplants'
    ]
  },

  // ---- B9 bio-613: Koch's postulates. Targeted factual update.
  {
    q: 'B9', id: 'bio-613', expectLetter: 'D',
    explanation: [
      ['<strong>Koch\'s four postulates</strong> (1884) are:',
        'The classical formulation of <strong>Koch\'s postulates</strong> is:'],

      ['<li>Limitations: Koch\'s postulates cannot be fulfilled for all pathogens - some cannot be cultured in vitro (e.g., <em>Treponema pallidum</em>, <em>Mycobacterium leprae</em>), some only cause disease in humans (ethical constraints), and asymptomatic carriers violate postulate 1</li>',
        "<li>The postulates have limitations: some pathogens require specialized culture systems, viruses require host " +
        "cells, asymptomatic carriers can occur, and deliberately infecting healthy humans may be unethical. " +
        "<em>Treponema pallidum</em> can be maintained in specialized in-vitro co-culture, although it does not grow in " +
        "routine bacteriological culture</li>"]
    ],
    keepHeadings: ['<strong>A. The microorganism must be found in abundance in all organisms suffering from the disease:</strong>'],
    gone: [
      "Koch's four postulates</strong> (1884)",
      'some cannot be cultured in vitro',                       // T. pallidum can be co-cultured
      'asymptomatic carriers violate postulate 1'
    ]
  },

  // ---- B10 bio-614: Photo 51. Targeted repair; Gosling credited in the new stem.
  {
    q: 'B10', id: 'bio-614', expectLetter: 'D',
    stemFull: "Which scientist worked with her doctoral student Raymond Gosling at King's College London to obtain Photo 51, the X-ray diffraction image that helped reveal DNA's helical structure?",
    explanation: [
      ["<p><strong>Rosalind Franklin</strong> produced the famous <strong>Photo 51</strong>, an X-ray diffraction photograph of DNA taken in 1952 at King's College London. This image was critical evidence for the helical structure of DNA and its key dimensions. Watson and Crick at Cambridge used data from Photo 51 (shown to Watson by Maurice Wilkins without Franklin's knowledge) along with other evidence to build their double helix model, published in <em>Nature</em> in April 1953.</p><p>Watson, Crick, and Wilkins received the Nobel Prize in 1962. Franklin had died of ovarian cancer in 1958 and was not eligible (the Nobel Prize is not awarded posthumously).</p>",
        "<p><strong>Rosalind Franklin</strong> and her doctoral student <strong>Raymond Gosling</strong> obtained " +
        "<strong>Photo 51</strong> in 1952 at King's College London. The diffraction pattern provided important evidence " +
        "about the helical structure and dimensions of DNA. Their work, together with other structural and chemical " +
        "evidence, contributed to the double-helix model proposed by Watson and Crick in 1953.</p>" +
        "<p>Watson, Crick and Wilkins received the 1962 Nobel Prize. Franklin had died in 1958 and did not share that " +
        "award.</p>"],

      ["<p><strong>B. Erwin Chargaff:</strong> Erwin Chargaff discovered <strong>Chargaff's rules</strong>: in DNA, the amount of adenine (A) equals thymine (T), and guanine (G) equals cytosine (C) - i.e., A=T and G=C. This base-pairing rule was essential for Watson and Crick's model but Chargaff did not produce X-ray crystallography data. His rules established the complementary base pairing principle.</p>",
        "<p><strong>B. Erwin Chargaff:</strong> Chargaff measured the base composition of DNA and established the " +
        "approximate A=T and G=C relationships in double-stranded DNA. These observations helped constrain the " +
        "double-helix model. They were compositional evidence, not Photo 51 or, on their own, proof of the physical " +
        "base-pairing arrangement.</p>"],

      ['<li>Photo 51 revealed the helical structure, base spacing (3.4 Angstroms between bases, 34 Angstroms per full turn), and diameter of DNA</li>',
        "<li>Photo 51 provided evidence about DNA's helical arrangement and repeating dimensions, including approximately " +
        '3.4 angstroms between successive base pairs and roughly 34 angstroms per turn in the classical model</li>'],

      ['<li>The double helix model integrated data from crystallography (Franklin), base pairing rules (Chargaff), and chemical reasoning (Watson and Crick)</li>',
        '<li>The double-helix model combined diffraction evidence from Franklin, Gosling, Wilkins and colleagues with base-composition measurements and chemical model building</li>'],

      ["<p class='exp-key'>Bottom Line: Rosalind Franklin produced Photo 51 (X-ray diffraction of DNA) - essential evidence for the Watson-Crick double helix model. Chargaff provided the base pairing rules (A=T, G=C). Pauling proposed an incorrect triple helix.</p>",
        "<p class='exp-key'>Bottom Line: Franklin and Gosling obtained Photo 51, an important contribution to the evidence " +
        "for DNA's helical structure. Chargaff's base-composition measurements provided a separate line of evidence used " +
        'in constructing the model.</p>']
    ],
    keepHeadings: ['<strong>A. Barbara McClintock:</strong>', '<strong>C. Linus Pauling:</strong>', '<strong>B. Erwin Chargaff:</strong>'],
    gone: [
      "shown to Watson by Maurice Wilkins without Franklin's knowledge",   // motive argument, not needed
      'was not eligible (the Nobel Prize is not awarded posthumously)',    // overconfident about 1962 rules
      'This base-pairing rule was essential',
      'His rules established the complementary base pairing principle',    // composition did not show the arrangement
      'Rosalind Franklin produced Photo 51 (X-ray diffraction of DNA)'
    ]
  },

  // ---- B12 bio-617: Woese and rRNA. Substantial repair; stem and options kept.
  {
    q: 'B12', id: 'bio-617', expectLetter: 'D',
    explanation: [
      ['<p>Carl Woese and George Fox proposed the <strong>three-domain system in 1977</strong> based on comparative analysis of <strong>16S/18S ribosomal RNA (rRNA) gene sequences</strong>. They chose rRNA because it is: (1) present in all living organisms, (2) functionally conserved (essential for protein synthesis), (3) changes slowly enough to compare distantly related organisms, and (4) contains both conserved and variable regions suitable for phylogenetic analysis.</p><p>Their rRNA analysis revealed that what were previously classified as "bacteria" actually comprised <strong>two fundamentally distinct groups</strong>: Bacteria and Archaea, which are as different from each other as either is from Eukarya.</p>',
        "<p>Comparisons of <strong>small-subunit ribosomal RNA</strong> were central to recognizing deep evolutionary " +
        "relationships among cells. Woese and Fox's 1977 work helped establish Archaea as a distinct lineage. In 1990, " +
        "Woese, Kandler and Wheelis formally proposed the three-domain classification.</p>" +
        "<p>Small-subunit rRNA is useful because the ribosome has an essential role across cellular life and its RNA " +
        "contains both conserved and variable regions. Prokaryotic small-subunit rRNA is called 16S rRNA, whereas " +
        "eukaryotic cytosolic small-subunit rRNA is called 18S rRNA. Comparisons can use the RNA sequence or the genes " +
        "encoding it. The three-domain framework does not mean that all three groups are equally related.</p>"],

      ['<p><strong>A. Comparison of cell wall composition:</strong> While cell wall differences support the three-domain classification (Bacteria have peptidoglycan; Archaea have pseudopeptidoglycan or S-layers; Eukarya have varied walls or none), cell wall composition was NOT the primary evidence used to establish the domains. Cell wall analysis alone cannot resolve deep evolutionary relationships - it was molecular phylogenetics using rRNA that provided the definitive framework.</p>',
        "<p><strong>A. Comparison of cell wall composition:</strong> Cell-envelope chemistry provides useful supporting " +
        "differences, but it was not the main molecular evidence behind this classification. Most bacterial walls contain " +
        "peptidoglycan; archaeal envelopes differ, and eukaryotes vary in whether they have a wall and what it contains. " +
        "These patterns alone do not establish the evolutionary relationships.</p>"],

      ['<p><strong>B. Comparison of metabolic pathways:</strong> While Archaea, Bacteria, and Eukarya have some distinctive metabolic features (e.g., Archaea use unique coenzymes for methanogenesis), metabolic comparisons were not the primary evidence. Metabolic pathways can be gained or lost through horizontal gene transfer, making them less reliable for establishing deep phylogenetic relationships than rRNA sequences.</p>',
        "<p><strong>B. Comparison of metabolic pathways:</strong> Metabolic traits can help characterize organisms, but " +
        "they vary within groups and can change through gene loss or horizontal transfer. Methanogenesis is characteristic " +
        "of certain archaea, not all archaea. Comparative rRNA evidence was central to Woese's work.</p>"],

      ['<li>16S rRNA is used for prokaryote classification; 18S rRNA for eukaryotes - they are homologous genes</li>',
        '<li>The 16S and 18S rRNA molecules are homologous components of the small ribosomal subunit; their names are not names for whole ribosomes</li>'],

      ['<li>Archaea share some molecular features with Eukarya (e.g., similar RNA polymerase, histones, lack of peptidoglycan) despite being prokaryotic in cell structure</li>',
        '<li>Recognition of Archaea as a distinct lineage in 1977 preceded the formal three-domain proposal in 1990</li>'],

      ['<li>Modern phylogenomics uses whole-genome comparisons but rRNA remains the gold standard for initial classification</li>',
        '<li>rRNA remains useful for identifying and comparing organisms, while modern evolutionary analyses also use many genes and whole genomes</li>'],

      ["<p class='exp-key'>Bottom Line: Carl Woese used 16S rRNA gene sequences to establish the three-domain system (Bacteria, Archaea, Eukarya) in 1977. rRNA is the molecular clock of evolution - universal, essential, and slowly evolving.</p>",
        "<p class='exp-key'>Bottom Line: Comparative small-subunit rRNA sequences underpinned Woese's work on deep cellular " +
        "relationships. Distinguish the 1977 recognition of the archaeal lineage from the formal three-domain proposal in " +
        '1990.</p>']
    ],
    keepHeadings: ['<strong>A. Comparison of cell wall composition:</strong>', '<strong>B. Comparison of metabolic pathways:</strong>', '<strong>C. Comparison of gross morphological features:</strong>'],
    gone: [
      'proposed the <strong>three-domain system in 1977</strong>',    // 1977 lineage vs 1990 formal proposal
      'as different from each other as either is from Eukarya',       // not all equally related
      'changes slowly enough to compare distantly related organisms',
      'rRNA is the molecular clock of evolution',                     // not a perfectly constant clock
      'rRNA remains the gold standard',
      'Archaea use unique coenzymes for methanogenesis'               // not every archaeon is a methanogen
    ]
  }
];
