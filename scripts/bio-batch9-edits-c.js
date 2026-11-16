/**
 * Biology review batch 9, displayed Q21-Q30 (bio-493 .. bio-502).
 * Every item in this range is edited; Q22 is one of the three major rewrites.
 */
'use strict';

const Q22_EXPLANATION =
  '<h4>Correct Answer: Extra complete chromosome sets usually severely disrupt human embryonic development, but can be tolerated in many plant species</h4>' +
  '<p>Polyploidy means having more than two complete chromosome sets. In humans, an extra set throughout the developing embryo usually causes severe developmental problems and pregnancy loss. This differs from the normal presence of polyploid cells in certain adult tissues. Many plant species can survive and reproduce with extra chromosome sets, and whole-genome duplication has contributed to plant evolution and crop diversity. Tolerance depends on the organism and its developmental and reproductive biology; it is not explained by one universal sex-chromosome rule.</p>' +
  '<h4>Why the other choices are wrong:</h4>' +
  '<p><strong>B. Plants have fewer chromosomes than humans, so extra sets are tolerated:</strong> Plant chromosome numbers vary widely, and many plants have more chromosomes than humans. The number of individual chromosomes does not by itself determine whether an organism tolerates an extra complete set.</p>' +
  '<p><strong>C. Polyploidy causes cancer in all animals but not in plants:</strong> Polyploid cells are not automatically cancerous: normal human liver cells and megakaryocytes provide examples. Changes in ploidy can contribute to genomic instability in some cancers, but polyploidy neither causes every cancer nor occurs only as a consequence of cancer.</p>' +
  '<p><strong>D. Humans are diploid while all plants are naturally polyploid:</strong> Many plants are diploid, while others are polyploid. For example, bread wheat has six chromosome sets, and many cultivated bananas have three. Polyploidy is common in plants, but it does not describe every plant.</p>' +
  '<h4>Key Educational Points:</h4>' +
  '<ul><li>Polyploidy changes the number of complete chromosome sets; aneuploidy changes the number of individual chromosomes.</li>' +
  '<li>Human triploid cells have 69 chromosomes and tetraploid cells have 92; whole-embryo polyploidy usually disrupts development severely.</li>' +
  '<li>Autopolyploidy involves additional sets from one species; allopolyploidy involves chromosome sets derived from different species.</li></ul>' +
  '<p class=\'exp-key\'>Bottom Line: Many plants tolerate whole-organism polyploidy. In humans it usually severely disrupts embryonic development, although some normal adult cell types are polyploid.</p>';

module.exports = [
  // ---- Q21  bio-493  Philadelphia chromosome ----------------------------
  {
    q: 21, id: 'bio-493', expectLetter: 'A',
    explanation: [[
      '<p><strong>C. Trisomy of chromosome 22:</strong> Trisomy 22 is not associated with CML. Trisomy refers to having three copies of a chromosome, which is a different type of chromosomal abnormality (numerical vs. structural). The Philadelphia chromosome involves a structural rearrangement.</p>',
      '<p><strong>C. Trisomy of chromosome 22:</strong> Trisomy 22 means an extra whole chromosome 22. The Philadelphia chromosome is instead a structurally altered chromosome produced by a translocation involving chromosomes 9 and 22, creating the BCR-ABL fusion.</p>'
    ]],
    keepHeadings: ['<strong>C. Trisomy of chromosome 22:</strong>'],
    gone: ['Trisomy 22 is not associated with CML']
  },

  // ---- Q22  bio-494  human versus plant polyploidy (MAJOR REWRITE) ------
  {
    q: 22, id: 'bio-494', expectLetter: 'A',
    stemFull: 'Which statement correctly compares whole-organism polyploidy in humans and plants?',
    optionFull: [[0, 'Extra complete chromosome sets usually severely disrupt human embryonic development, but can be tolerated in many plant species']],
    explanationFull: Q22_EXPLANATION,
    gone: ['Why is polyploidy generally lethal in humans but common in plants',
      'Human sex determination is disrupted by extra chromosome sets', 'extra centrosomes',
      'partial hydatidiform mole', 'Ophioglossum', '6n', 'mitotic spindle formation is impaired']
  },

  // ---- Q23  bio-495  pericentric inversion (stem replaced) --------------
  {
    q: 23, id: 'bio-495', expectLetter: 'A',
    stemFull: 'A person has one normal chromosome and one homolog with a pericentric inversion, which includes the centromere. What can crossing over within the inverted region during meiosis produce?',
    explanation: [
      ['<p>In a heterozygous inversion carrier, one chromosome has the normal gene order and the other has the inverted segment. During meiosis, when homologous chromosomes pair up, the inverted region forms a loop structure. If crossing over occurs within this loop, the resulting recombinant chromosomes can have duplications of some genes and deletions of others (unbalanced gametes). These unbalanced gametes typically lead to inviable embryos or offspring with severe abnormalities.</p>',
        '<p>In a heterozygous inversion carrier, one chromosome has the normal gene order and the other has the inverted segment. During meiosis, pairing can form an inversion loop. Crossing over within that loop can produce chromatids with duplications of some genes and deletions of others. Gametes carrying such unbalanced chromatids often lead to inviable embryos or to offspring with abnormalities, but not every gamete from a carrier is unbalanced.</p>'],
      ['<p><strong>B. All offspring will have the same inversion:</strong> Heterozygous inversion carriers can produce offspring who are: (1) normal homozygotes, (2) inversion heterozygotes like the parent, or (3) carry recombinant chromosomes (if crossing over occurred in the inverted segment). Not all offspring inherit the inversion.</p>',
        '<p><strong>B. All offspring will have the same inversion:</strong> A carrier can pass on a normal chromosome, the inverted chromosome, or a recombinant product, so not every child inherits the inversion. The proportions also depend on the other parent\'s chromosomes, which the stem does not specify.</p>'],
      ['<p><strong>C. The inversion prevents all meiotic cell division entirely:</strong> Inversions do NOT prevent meiosis. Meiosis proceeds normally - the chromosomes simply form an inversion loop during synapsis in meiosis I. The problem arises only if crossing over occurs within the inverted region, producing unbalanced recombinant chromosomes.</p>',
        '<p><strong>C. The inversion prevents all meiotic cell division entirely:</strong> Inversions do not prevent meiosis. It can proceed, with the chromosomes forming an inversion loop during synapsis in meiosis I, and some recombinant products can be unbalanced. A breakpoint can also disrupt a gene or its regulation, so crossing over is not the only possible consequence of an inversion.</p>'],
      ['<p><strong>D. Inversions always cause trisomy in offspring:</strong> Inversions do not cause trisomy (which is a numerical chromosome abnormality caused by nondisjunction). Inversions cause structural problems - specifically duplications and deletions - if recombination occurs within the inverted segment. Trisomy and inversions are fundamentally different types of chromosomal abnormalities.</p>',
        '<p><strong>D. Inversions always cause trisomy in offspring:</strong> An inversion is a rearrangement rather than an automatic gain of a whole chromosome; trisomy arises from nondisjunction. Some recombinant products carry duplicated material, but that is not the same as every offspring having whole-chromosome trisomy.</p>'],
      ['<li>Paracentric inversion = does not include centromere → crossover produces acentric and dicentric chromosomes</li>',
        '<li>Paracentric inversion = does not include the centromere → a standard single crossover within the loop can produce acentric and dicentric products, unlike the pericentric case tested here</li>']
    ],
    keepHeadings: ['<strong>B. All offspring will have the same inversion:</strong>', '<strong>C. The inversion prevents all meiotic cell division entirely:</strong>',
      '<strong>D. Inversions always cause trisomy in offspring:</strong>'],
    gone: ['What is the primary risk when an individual heterozygous for an inversion reproduces',
      'These unbalanced gametes typically lead to inviable embryos or offspring with severe abnormalities',
      'The problem arises only if crossing over occurs within the inverted region',
      'Trisomy and inversions are fundamentally different types']
  },

  // ---- Q24  bio-496  Patau syndrome (option B renamed) ------------------
  {
    q: 24, id: 'bio-496', expectLetter: 'A',
    optionFull: [[1, 'Single transverse palmar crease and Brushfield spots on the iris']],
    explanation: [
      ['Median survival is approximately 7–10 days.',
        'Trisomy 13 is associated with serious congenital abnormalities and high fetal and infant mortality. Survival varies, and some affected children live for years.'],
      ['<p><strong>B. Single palmar crease (simian crease) and Brushfield spots on the iris:</strong> These are features of Down syndrome (trisomy 21). The single palmar crease (found in ~45% of Down syndrome) and Brushfield spots (speckled light-colored spots on the iris) are classic diagnostic clues for trisomy 21, not trisomy 13.</p>',
        '<p><strong>B. Single transverse palmar crease and Brushfield spots on the iris:</strong> These are features of Down syndrome (trisomy 21). A single transverse palmar crease and Brushfield spots (speckled light-colored spots on the iris) are classic diagnostic clues for trisomy 21, not trisomy 13.</p>'],
      ['<p><strong>C. Clenched fists with overlapping fingers and rocker-bottom feet:</strong> These are hallmark features of Edwards syndrome (trisomy 18). The characteristic hand posture (2nd finger overlapping 3rd, 5th overlapping 4th) is a useful clinical distinction from trisomy 13, which features polydactyly instead.</p>',
        '<p><strong>C. Clenched fists with overlapping fingers and rocker-bottom feet:</strong> Overlapping fingers in a clenched hand (2nd over 3rd, 5th over 4th) are particularly associated with Edwards syndrome (trisomy 18). Rocker-bottom feet are also associated with trisomy 18 but are not exclusive to it. Trisomy 13 features polydactyly instead.</p>'],
      ['<p><strong>D. Tall stature, long limbs, and gynecomastia:</strong> These features describe Klinefelter syndrome (47,XXY), a sex chromosome disorder in males. Patau syndrome causes severe structural abnormalities incompatible with long-term survival, not growth pattern changes seen in sex chromosome aneuploidies.</p>',
        '<p><strong>D. Tall stature, long limbs, and gynecomastia:</strong> These features describe Klinefelter syndrome (47,XXY), a sex chromosome disorder in males. They are a growth and development pattern rather than the combination of congenital anomalies described in A.</p>']
    ],
    gone: ['Median survival is approximately 7–10 days', 'simian crease', '~45% of Down syndrome',
      'incompatible with long-term survival']
  },

  // ---- Q25  bio-497  Robertsonian translocation (stem replaced) ---------
  {
    q: 25, id: 'bio-497', expectLetter: 'D',
    stemFull: 'In the common Robertsonian 14;21 form of translocation Down syndrome, which statement describes the chromosome arrangement?',
    explanation: [
      ['two normal 21s + one translocated 21q on chromosome 14), producing the Down syndrome phenotype.',
        'two normal 21s + one translocated 21q on chromosome 14), producing the Down syndrome phenotype. A balanced 14;21 carrier, by contrast, typically has 45 chromosomes and no extra copy of that material.'],
      ['<p><strong>B. Chromosome 21 is duplicated within itself, forming a ring chromosome:</strong> Ring chromosomes form when both ends of a chromosome are deleted and the remaining piece joins into a ring. This is a different structural abnormality and does not produce trisomy 21. Ring chromosome 21 can occur but typically causes partial monosomy, not trisomy.</p>',
        '<p><strong>B. Chromosome 21 is duplicated within itself, forming a ring chromosome:</strong> A ring chromosome forms when chromosome ends join, sometimes with loss of terminal material. That is different from the fusion of chromosome long arms in a Robertsonian translocation, and it does not describe this form of Down syndrome.</p>'],
      ['<li>Translocation Down syndrome is not associated with advanced maternal age (unlike free trisomy 21)</li>',
        '<li>A parent may carry a balanced Robertsonian translocation, which changes the recurrence assessment</li>']
    ],
    keepHeadings: ['<strong>B. Chromosome 21 is duplicated within itself, forming a ring chromosome:</strong>'],
    gone: ['Down syndrome (trisomy 21) can result from Robertsonian translocation. In this scenario',
      'Ring chromosomes form when both ends of a chromosome are deleted',
      'not associated with advanced maternal age']
  },

  // ---- Q26  bio-498  amniocentesis --------------------------------------
  {
    q: 26, id: 'bio-498', expectLetter: 'C',
    explanation: [
      ['<p>Amniocentesis is typically performed between 15 and 18 weeks of gestation (second trimester). A needle is inserted through the mother\'s abdomen into the amniotic sac under ultrasound guidance, and ~20 mL of amniotic fluid is withdrawn. This fluid contains fetal cells (shed from the fetal skin, respiratory tract, and urinary tract) that can be cultured for karyotyping, biochemical analysis, or DNA testing. Results typically take 1–2 weeks due to the need to culture cells.</p>',
        '<p>Amniocentesis samples amniotic fluid, which contains cells and other material useful for prenatal diagnosis. It is generally performed from 15 weeks; 15-18 weeks falls within the usual testing period. A needle is inserted through the mother\'s abdomen into the amniotic sac under ultrasound guidance and a sample of fluid is withdrawn. Turnaround depends on the laboratory analysis: rapid tests for selected chromosome abnormalities may return in a few days, while other analyses take longer.</p>'],
      ['CVS is performed between 10 and 13 weeks and samples placental tissue (chorionic villi) rather than amniotic fluid. CVS provides results earlier than amniocentesis but cannot test for neural tube defects (no α-fetoprotein measurement).',
        'CVS is performed in the first trimester and samples placental tissue (chorionic villi) rather than amniotic fluid, so it does not provide fluid for the α-fetoprotein and acetylcholinesterase assessment used to help detect open neural tube defects.'],
      ['<p><strong>D. Weeks 28–32:</strong> By weeks 28–32, the pregnancy is in the third trimester. While late amniocentesis is sometimes performed for specific indications (e.g., assessing fetal lung maturity), routine diagnostic genetic testing via amniocentesis is done in the second trimester to allow time for decision-making.</p>',
        '<p><strong>D. Weeks 28–32:</strong> Amniocentesis can be performed later if a diagnostic question arises later in pregnancy, but 28-32 weeks is not the usual early prenatal-diagnosis window. Routine diagnostic testing is done from 15 weeks to allow time for interpretation and decision-making.</p>'],
      ['<tr><td>Timing</td><td>15–18 weeks</td><td>10–13 weeks</td></tr>',
        '<tr><td>Timing</td><td>From 15 weeks (15–18 weeks is within the usual period)</td><td>10–13 weeks</td></tr>'],
      ['<tr><td>Risk of miscarriage</td><td>~0.1–0.3%</td><td>~0.5–1%</td></tr>',
        '<tr><td>Risk of miscarriage</td><td>Small procedure-related risk; depends on clinical circumstances and operator</td><td>Small procedure-related risk; depends on clinical circumstances and operator</td></tr>'],
      ['<tr><td>Neural tube defect testing</td><td>Yes (AFP in fluid)</td><td>No</td></tr>',
        '<tr><td>Open neural tube defect assessment</td><td>Yes (AFP and acetylcholinesterase in fluid)</td><td>No</td></tr>'],
      ['<tr><td>Results timing</td><td>1–2 weeks</td><td>1–2 weeks</td></tr>',
        '<tr><td>Results timing</td><td>Depends on the analysis: days for rapid tests, longer for others</td><td>Depends on the analysis: days for rapid tests, longer for others</td></tr>']
    ],
    keepHeadings: ['<strong>A. Weeks 6–8:</strong>', '<strong>B. Weeks 10–12:</strong>', '<strong>D. Weeks 28–32:</strong>'],
    gone: ['Results typically take 1–2 weeks due to the need to culture cells', '~0.1–0.3%', '~0.5–1%',
      'cannot test for neural tube defects', 'assessing fetal lung maturity']
  },

  // ---- Q27  bio-499  CVS -------------------------------------------------
  {
    q: 27, id: 'bio-499', expectLetter: 'A',
    explanation: [
      ['This allows earlier diagnosis and, if needed, earlier decision-making. CVS samples chorionic villi (placental tissue of fetal origin), which are rapidly dividing and can provide karyotype results without the extended cell culture required for amniocentesis.',
        'CVS permits sampling in the first trimester, earlier than routine amniocentesis, which allows earlier diagnosis and, if needed, earlier decision-making. It samples chorionic villi, which are placental tissue of fetal origin. The time needed for results depends on the test performed. Both procedures can provide material for rapid testing or for analyses that take longer; CVS is not defined by avoiding culture in every case.'],
      ['<p><strong>B. Can detect neural tube defects through α-fetoprotein measurement:</strong> This is actually an advantage of amniocentesis, NOT CVS. Amniocentesis can measure α-fetoprotein (AFP) levels in amniotic fluid to screen for neural tube defects (such as spina bifida and anencephaly). CVS cannot assess AFP levels because it samples placental tissue, not amniotic fluid.</p>',
        '<p><strong>B. Can detect neural tube defects through α-fetoprotein measurement:</strong> CVS samples placental tissue and does not provide amniotic fluid, so it cannot be used for the α-fetoprotein and acetylcholinesterase assessment that helps detect open neural tube defects. Other prenatal assessments, including ultrasound, still address those defects.</p>'],
      ['<p><strong>C. Carries zero risk of miscarriage:</strong> No invasive prenatal procedure carries zero risk. CVS actually has a slightly higher miscarriage risk (~0.5–1%) compared to amniocentesis (~0.1–0.3%). This is one of the trade-offs of earlier testing.</p>',
        '<p><strong>C. Carries zero risk of miscarriage:</strong> No invasive prenatal procedure carries zero risk. Both CVS and amniocentesis carry a small procedure-related miscarriage risk, which depends on clinical circumstances and operator rather than on one fixed figure.</p>']
    ],
    keepHeadings: ['<strong>B. Can detect neural tube defects through α-fetoprotein measurement:</strong>',
      '<strong>C. Carries zero risk of miscarriage:</strong>', '<strong>D. Requires no ultrasound guidance for the procedure:</strong>'],
    gone: ['without the extended cell culture required for amniocentesis', 'slightly higher miscarriage risk (~0.5–1%)',
      'CVS cannot assess AFP levels because it samples placental tissue']
  },

  // ---- Q28  bio-500  cystic fibrosis carrier cross ----------------------
  {
    q: 28, id: 'bio-500', expectLetter: 'B',
    explanation: [
      ['Carriers of autosomal recessive diseases are phenotypically normal because one functional allele is sufficient for normal protein production.',
        'Carriers of autosomal recessive diseases are phenotypically normal because one functioning copy of the gene generally supplies enough function to prevent the disease.'],
      ['<li>Autosomal recessive disease requires two copies of the mutant allele (homozygous recessive)</li>',
        '<li>An autosomal recessive disorder generally requires disease-causing variants in both copies of the relevant gene. The variants may be the same or different. The Cc notation is a simplified model for this cross</li>'],
      ['<li>Cystic fibrosis carrier frequency is ~1 in 25 among Caucasians</li>',
        '<li>Carrier frequency varies between populations; the parents\' stated carrier status, not a population estimate, determines the answer here</li>']
    ],
    gone: ['requires two copies of the mutant allele', '~1 in 25 among Caucasians',
      'sufficient for normal protein production']
  },

  // ---- Q29  bio-501  PKU screening --------------------------------------
  {
    q: 29, id: 'bio-501', expectLetter: 'B',
    explanation: [
      ['Newborn screening using the Guthrie test or tandem mass spectrometry detects elevated phenylalanine levels in blood. Early initiation of a low-phenylalanine diet (within the first weeks of life) prevents neurological damage and allows normal development.',
        'Newborn screening measures biochemical markers in dried blood spots; the Guthrie test was the historical method, and an abnormal screen needs appropriate confirmatory assessment. Early and sustained control of phenylalanine can prevent severe neurological injury. Phenylalanine is an essential amino acid, so it is restricted to an appropriate amount rather than eliminated from nutrition.'],
      ['<p><strong>A. PKU can be cured by gene therapy immediately after birth:</strong> Gene therapy for PKU is currently under research but is not yet a standard clinical treatment. The primary treatment remains lifelong dietary restriction of phenylalanine. Some patients also benefit from sapropterin (BH4 supplementation), but this is not gene therapy.</p>',
        '<p><strong>A. PKU can be cured by gene therapy immediately after birth:</strong> The benefit of screening is that metabolic management can begin before irreversible injury develops. The immediate gene-therapy cure proposed in this option is not the basis for routine PKU screening.</p>'],
      ['<p><strong>D. The PKU screening test can also detect all other metabolic disorders simultaneously:</strong> While modern tandem mass spectrometry newborn screening panels can detect many metabolic disorders simultaneously, this is NOT the reason PKU screening was originally implemented. PKU screening was one of the first newborn screens established because it met the criteria: the disease is common enough, detectable before symptoms, and treatable if caught early.</p>',
        '<p><strong>D. The PKU screening test can also detect all other metabolic disorders simultaneously:</strong> No screening program detects every metabolic disorder. Newborn screening tests for selected conditions for which early identification and follow-up can improve outcomes.</p>'],
      ['<li>Criteria for newborn screening: common, detectable presymptomatically, treatable, and screening is cost-effective</li>',
        '<li>A useful screening program identifies a serious condition before symptoms, uses an appropriate test, and provides timely confirmation and effective early care. Rare conditions can qualify</li>'],
      ['<p class=\'exp-key\'>Bottom Line: Newborn PKU screening enables early dietary intervention that prevents irreversible intellectual disability - a model for successful newborn screening programs.</p>',
        '<p class=\'exp-key\'>Bottom Line: PKU screening enables early and ongoing phenylalanine control to prevent severe neurological injury.</p>']
    ],
    keepHeadings: ['<strong>A. PKU can be cured by gene therapy immediately after birth:</strong>',
      '<strong>D. The PKU screening test can also detect all other metabolic disorders simultaneously:</strong>'],
    gone: ['prevents neurological damage and allows normal development', 'Criteria for newborn screening: common',
      'is currently under research but is not yet a standard clinical treatment', 'the disease is common enough']
  },

  // ---- Q30  bio-502  X-linked dominant pedigree -------------------------
  {
    q: 30, id: 'bio-502', expectLetter: 'C',
    explanation: [
      ['<p>When an affected father has an X-linked dominant trait, ALL of his daughters will be affected because they all receive his X chromosome carrying the dominant disease allele (XDY father × XdXd mother → daughters are all XDXd, affected). None of his sons will be affected because sons receive their father\'s Y chromosome, not his X (sons are all XdY, unaffected).</p>',
        '<p>Under the usual fully penetrant Mendelian model, an affected father with an X-linked dominant trait passes his single X chromosome to every daughter, so all of his daughters are affected (X<sup>D</sup>Y father × X<sup>d</sup>X<sup>d</sup> mother → daughters are all X<sup>D</sup>X<sup>d</sup> and affected). None of his sons is affected, because sons receive his Y chromosome rather than his X (sons are all X<sup>d</sup>Y).</p>'],
      ['Autosomal recessive does not show the sex-specific pattern described (all daughters affected, no sons affected).',
        'Autosomal inheritance does not predict this systematic difference between daughters and sons, although a small family could show such a pattern by chance.'],
      ['<p><strong>B. Autosomal dominant:</strong> An affected autosomal dominant father (Aa) crossed with an unaffected mother (aa) would produce 50% affected and 50% unaffected children, regardless of sex. It would NOT preferentially affect all daughters and no sons.</p>',
        '<p><strong>B. Autosomal dominant:</strong> An affected autosomal dominant father (Aa) crossed with an unaffected mother (aa) is expected to produce 50% affected and 50% unaffected children, regardless of sex. That does not predict the systematic daughter-versus-son difference described, although a small family could show it by chance.</p>'],
      ['<p><strong>D. X-linked recessive:</strong> An X-linked recessive affected father (XaY) crossed with an unaffected carrier mother would produce affected sons and carrier daughters. But if the mother is homozygous normal (XAXA), ALL daughters would be carriers (XAXa, unaffected) and all sons would be unaffected (XAY). An affected father with X-linked recessive cannot produce affected daughters unless the mother is at least a carrier.</p>',
        '<p><strong>D. X-linked recessive:</strong> For an X-linked recessive condition, an affected father (X<sup>a</sup>Y) and a noncarrier mother (X<sup>A</sup>X<sup>A</sup>) have carrier daughters and unaffected sons in the standard model. If the mother is a carrier (X<sup>A</sup>X<sup>a</sup>), each daughter has a 50% chance of being affected and a 50% chance of being a carrier; each son has a 50% chance of being affected. That does not predict all daughters affected and all sons unaffected.</p>'],
      ['<li>X-linked dominant: affected mother → 50% sons and 50% daughters affected</li>',
        '<li>A heterozygous mother with an X-linked dominant variant has a 50% chance of transmitting it to each child; under the fully penetrant model, either sex can be affected</li>'],
      ['<li>Examples of X-linked dominant disorders: Rett syndrome, hypophosphatemic rickets, Aicardi syndrome</li>',
        '<li>X-linked hypophosphatemia is an example of an X-linked dominant disorder</li>']
    ],
    keepHeadings: ['<strong>A. Autosomal recessive:</strong>', '<strong>B. Autosomal dominant:</strong>', '<strong>D. X-linked recessive:</strong>'],
    gone: ['Aicardi syndrome', 'XDY father', 'XaY', 'the sex-specific pattern described',
      'cannot produce affected daughters unless the mother is at least a carrier',
      'affected mother → 50% sons and 50% daughters affected']
  }
];
