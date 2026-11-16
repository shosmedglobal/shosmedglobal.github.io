/**
 * Biology review batch 10, displayed Q21-Q30 (bio-559 .. bio-567, bio-569).
 * Q29 (bio-568, heterozygous A x heterozygous B) is KEEP UNCHANGED per the
 * review and so is absent from this module by design.
 */
'use strict';

module.exports = [
  // ---- Q21  bio-559  crossing over ---------------------------------------
  {
    q: 21, id: 'bio-559', expectLetter: 'B',
    explanation: [
      ['<p><strong>A. Sister chromatids of the same chromosome:</strong> Sister chromatids are identical copies produced by DNA replication. Exchange between them would not generate any new genetic combinations. While sister chromatid exchange can occur (in mitosis), it does not contribute to genetic variation.</p>',
        '<p><strong>A. Sister chromatids of the same chromosome:</strong> Sister chromatids are copies produced during DNA replication. Exchanges between them can occur, for example during DNA repair, but the meiotic crossing over tested here exchanges material between nonsister chromatids of homologous chromosomes, reshuffling maternal and paternal alleles.</p>'],
      ['<p><strong>D. Centromeres of homologous chromosomes:</strong> Centromeres are specialized regions for spindle attachment and do not exchange genetic material during crossing over. Recombination occurs along the chromosome arms.</p>',
        '<p><strong>D. Centromeres of homologous chromosomes:</strong> Centromeres are specialized regions for spindle attachment. What crossing over exchanges is segments of the chromosome arms rather than the centromeres themselves.</p>'],
      ['<li>Each crossover event produces two recombinant and two parental chromatids</li>',
        '<li>A single crossover between two nonsister chromatids in a tetrad produces two recombinant chromatids and leaves two unchanged</li>']
    ],
    keepHeadings: ['<strong>A. Sister chromatids of the same chromosome:</strong>', '<strong>D. Centromeres of homologous chromosomes:</strong>'],
    gone: ['sister chromatid exchange can occur (in mitosis)', 'Recombination occurs along the chromosome arms',
      'Each crossover event produces two recombinant and two parental chromatids']
  },

  // ---- Q22  bio-560  nondisjunction (stem replaced) ----------------------
  {
    q: 22, id: 'bio-560', expectLetter: 'D',
    stemFull: 'In a primary spermatocyte, one homologous chromosome pair fails to separate during meiosis I. If meiosis II otherwise proceeds normally, what chromosome pattern is expected in the four resulting sperm cells?',
    explanation: [
      ['<p>When nondisjunction occurs in meiosis I, homologous chromosomes fail to separate. One secondary oocyte/spermatocyte receives both homologs, while the other receives none. After meiosis II proceeds normally, this produces four abnormal gametes: two with an extra copy of the chromosome (n+1) and two missing that chromosome (n-1). None of the gametes will have the normal chromosome number.</p>',
        '<p>When nondisjunction occurs in meiosis I, homologous chromosomes fail to separate. One secondary spermatocyte receives both homologs, while the other receives none. Meiosis II then proceeds normally in each, giving four meiotic products that develop into sperm: two with an extra copy of the chromosome (n+1) and two missing that chromosome (n-1). None of the four has the normal chromosome number.</p>'],
      ['<p><strong>B. Only one gamete will be abnormal:</strong> Nondisjunction always affects at least two gametes. Even in meiosis II nondisjunction (the mildest scenario), two gametes are abnormal.</p>',
        '<p><strong>B. Only one gamete will be abnormal:</strong> Nondisjunction affects at least two of the four products. After a meiosis-II error two of the four are abnormal; the question asks for the pattern expected after a meiosis-I error, not a severity ranking.</p>'],
      ['<p><strong>C. All four gametes will be normal:</strong> If nondisjunction has occurred, at least some gametes must be aneuploid. Normal gametes only result from normal meiotic division.</p>',
        '<p><strong>C. All four gametes will be normal:</strong> Because both homologs went to the same cell in meiosis I, none of the four products has the normal chromosome number under the stated assumptions.</p>']
    ],
    keepHeadings: ['<strong>B. Only one gamete will be abnormal:</strong>', '<strong>C. All four gametes will be normal:</strong>'],
    gone: ['Nondisjunction during meiosis I versus meiosis II produces different patterns of gamete abnormality',
      'the mildest scenario', 'Normal gametes only result from normal meiotic division',
      'One secondary oocyte/spermatocyte receives both homologs']
  },

  // ---- Q23  bio-561  oogenesis versus spermatogenesis (option C) ---------
  {
    q: 23, id: 'bio-561', expectLetter: 'C',
    optionFull: [[2, 'Primary oocytes arrest in prophase I before birth; selected oocytes resume meiosis after puberty, while sperm production normally begins at puberty']],
    explanation: [
      ['<h4>Correct Answer: Oogenesis is arrested at prophase I before birth and resumes at puberty, while spermatogenesis begins and continues uninterrupted from puberty</h4>',
        '<h4>Correct Answer: Primary oocytes arrest in prophase I before birth; selected oocytes resume meiosis after puberty, while sperm production normally begins at puberty</h4>'],
      ['<p>In females, oogenesis begins during fetal development when primary oocytes enter meiosis I but arrest at the diplotene stage of prophase I (also called the dictyate stage). They remain arrested until puberty, when hormonal signals (LH surge) resume meiosis. Meiosis I is completed just before ovulation, and meiosis II is only completed upon fertilization. In males, spermatogenesis begins at puberty and continues throughout life without prolonged arrests.</p>',
        '<p>In females, oogenesis begins during fetal development when primary oocytes enter meiosis I but arrest at the diplotene stage of prophase I (also called the dictyate stage). They remain arrested for years, and selected oocytes resume meiosis during reproductive cycles after puberty rather than all oocytes restarting at once. Meiosis I is completed just before ovulation; the secondary oocyte then arrests at metaphase II and normally completes meiosis following fertilization. In males, sperm production normally begins at puberty and continues through adult life.</p>'],
      ['<p><strong>B. Spermatogenesis is completed before birth:</strong> Spermatogenesis does not begin until puberty. Before puberty, the testes contain only spermatogonia. The full meiotic process starts with hormonal stimulation at puberty.</p>',
        '<p><strong>B. Spermatogenesis is completed before birth:</strong> Sperm production does not begin until puberty. Before puberty, the male germ-cell population is mainly spermatogonia and full sperm production is not yet established; the testes also contain supporting and hormone-producing cells.</p>'],
      ['<li>Oogenesis: arrested at prophase I (fetal life), resumes at puberty, arrested again at metaphase II, completed at fertilization</li>',
        '<li>Oogenesis: arrested at prophase I in fetal life; selected oocytes resume after puberty, arrest again at metaphase II and normally complete meiosis at fertilization</li>'],
      ['<li>Spermatogenesis: begins at puberty, continuous, produces 4 sperm per primary spermatocyte</li>',
        '<li>Spermatogenesis normally begins at puberty and continues through adult life, producing four sperm per primary spermatocyte</li>'],
      ['<p class=\'exp-key\'>Bottom Line: Oogenesis begins before birth with prolonged arrest at prophase I, while spermatogenesis begins at puberty and runs continuously.</p>',
        '<p class=\'exp-key\'>Bottom Line: Female meiosis begins before birth and includes prolonged arrests; male sperm production normally begins at puberty and continues through adult life.</p>']
    ],
    keepHeadings: ['<strong>B. Spermatogenesis is completed before birth:</strong>'],
    gone: ['continues uninterrupted from puberty', 'the testes contain only spermatogonia',
      'continues throughout life without prolonged arrests', 'begins at puberty, continuous']
  },

  // ---- Q24  bio-562  maternal age and trisomy 21 -------------------------
  {
    q: 24, id: 'bio-562', expectLetter: 'B',
    explanation: [
      ['<p>Primary oocytes enter meiosis during fetal development and arrest at prophase I, remaining in this state for years to decades. Over time, the proteins maintaining proper chromosome cohesion (particularly cohesin) degrade. The spindle assembly checkpoint machinery may also deteriorate. These age-related changes increase the likelihood that homologous chromosomes (or sister chromatids) will fail to separate properly during meiosis, leading to nondisjunction. Approximately 95% of trisomy 21 cases result from maternal meiotic errors.</p>',
        '<p>Primary oocytes enter meiosis during fetal development and arrest at prophase I, remaining in this state for years to decades. Age-related loss of chromosome cohesion is one important contributor to errors in chromosome separation, and the spindle assembly checkpoint machinery may also deteriorate. These age-related changes increase the likelihood that homologous chromosomes, or sister chromatids, fail to separate properly during meiosis. Most cases of free trisomy 21 result from an error in maternal meiosis.</p>'],
      ['<p><strong>A. Mutations in the chromosome 21 gene:</strong> Down syndrome results from nondisjunction (gaining an extra copy of the entire chromosome 21), not from point mutations within genes on chromosome 21. It is a chromosomal number abnormality, not a gene mutation.</p>',
        '<p><strong>A. Mutations in the chromosome 21 gene:</strong> Down syndrome involves extra chromosome-21 material rather than mutation of a single gene on chromosome 21. Free trisomy, translocation and mosaic forms all occur.</p>'],
      ['While advanced paternal age is associated with increased point mutations in sperm, the vast majority of trisomy 21 cases (~95%) arise from errors in maternal meiosis, not paternal.',
        'While advanced paternal age is associated with increased point mutations in sperm, most cases of free trisomy 21 arise from errors in maternal meiosis rather than paternal.'],
      ['<p><strong>D. Placental filtering:</strong> The placenta does not selectively filter cells based on chromosome number. Trisomy 21 is present from the moment of fertilization in every cell of the developing embryo.</p>',
        '<p><strong>D. Placental filtering:</strong> The placenta does not selectively filter out cells with trisomy 21. Extra chromosome-21 material arises through errors in chromosome inheritance or, in mosaic cases, an early cell division. Placental filtering is not the explanation for the maternal-age association.</p>'],
      ['<li>Cohesin protein degradation over decades of prophase I arrest is the primary mechanism</li>',
        '<li>Age-related loss of chromosome cohesion during the long prophase I arrest is one important contributor to errors in chromosome separation</li>'],
      ['<li>Maternal age >35 significantly increases trisomy risk</li>',
        '<li>Risk rises with maternal age; 35 is a conventional reporting threshold rather than a biological on/off point</li>'],
      ['<p class=\'exp-key\'>Bottom Line: The prolonged arrest of oocytes at prophase I allows deterioration of meiotic cohesion machinery, explaining why nondisjunction risk increases with maternal age.</p>',
        '<p class=\'exp-key\'>Bottom Line: The prolonged arrest of oocytes at prophase I and age-related changes in chromosome cohesion help explain why the risk of nondisjunction increases with maternal age.</p>']
    ],
    keepHeadings: ['<strong>A. Mutations in the chromosome 21 gene:</strong>', '<strong>D. Placental filtering:</strong>'],
    gone: ['Approximately 95% of trisomy 21 cases', 'the vast majority of trisomy 21 cases (~95%)',
      'present from the moment of fertilization in every cell', 'is the primary mechanism',
      'Maternal age >35 significantly increases']
  },

  // ---- Q25  bio-563  aabb probability ------------------------------------
  {
    q: 25, id: 'bio-563', expectLetter: 'D',
    explanation: [
      ['This corresponds to 1 out of the 16 possible phenotypic outcomes in the classic 9:3:3:1 dihybrid ratio.',
        'This corresponds to 1 of the 16 equally likely combinations of parental gametes in a Punnett square. Those combinations give nine distinct genotypes and, under the standard model of complete dominance with no epistasis, four phenotype classes.'],
      ['<p><strong>B. 3/16:</strong> This fraction represents the proportion of offspring showing one dominant trait and one recessive trait (e.g., <i>A</i>&#8209;bb or <i>aaB</i>&#8209;) in a dihybrid cross, not the double homozygous recessive.</p>',
        '<p><strong>B. 3/16:</strong> <i>A</i>&#8209;bb and <i>aaB</i>&#8209; each account for 3/16, so together they account for 6/16 of offspring showing one dominant and one recessive trait. Neither is the double homozygous recessive.</p>'],
      ['<li>Dihybrid ratio (AaBb x AaBb): 9 <i>A</i>&#8209;<i>B</i>&#8209; : 3 <i>A</i>&#8209;bb : 3 <i>aaB</i>&#8209; : 1 aabb</li>',
        '<li>Dihybrid phenotype ratio for AaBb x AaBb, assuming independent assortment, complete dominance and no epistasis: 9 <i>A</i>&#8209;<i>B</i>&#8209; : 3 <i>A</i>&#8209;bb : 3 <i>aaB</i>&#8209; : 1 aabb</li>']
    ],
    keepHeadings: ['<strong>B. 3/16:</strong>', '<strong>C. 9/16:</strong>'],
    gone: ['16 possible phenotypic outcomes', 'Dihybrid ratio (AaBb x AaBb): 9']
  },

  // ---- Q26  bio-564  testcross -------------------------------------------
  {
    q: 26, id: 'bio-564', expectLetter: 'D',
    explanation: [
      ['<p><strong>C. The testcross cannot determine the genotype:</strong> The testcross is specifically designed to distinguish between AA and Aa. The offspring ratio directly reveals the unknown genotype.</p>',
        '<p><strong>C. The testcross cannot determine the genotype:</strong> The testcross is designed to distinguish AA from Aa. Recessive offspring establish that the dominant-phenotype parent carries a recessive allele; an all-dominant sample supports AA without proving it.</p>'],
      ['<li>Testcross with aa: if all offspring dominant, parent is AA; if 1:1 ratio, parent is Aa</li>',
        '<li>An AA x aa cross produces only dominant-phenotype offspring. However, a finite all-dominant sample can also occur by chance from Aa x aa, so it supports AA without proving it</li>']
    ],
    keepHeadings: ['<strong>C. The testcross cannot determine the genotype:</strong>'],
    gone: ['The offspring ratio directly reveals the unknown genotype', 'if all offspring dominant, parent is AA']
  },

  // ---- Q27  bio-565  independent assortment ------------------------------
  {
    q: 27, id: 'bio-565', expectLetter: 'C',
    explanation: [
      ['<p><strong>B. Both located on the X chromosome:</strong> Genes on the same X chromosome are sex-linked and tend to be inherited together (linked), especially in males who have only one X chromosome. They do not assort independently from each other.</p>',
        '<p><strong>B. Both located on the X chromosome:</strong> Being on the X chromosome does not by itself determine whether two genes assort approximately independently. In an individual with two X chromosomes, the distance between the genes and recombination matter; nearby genes tend to be inherited together.</p>'],
      ['<p><strong>D. Both imprinted by the same parent:</strong> Genomic imprinting refers to epigenetic silencing of one parental allele and is unrelated to independent assortment. Imprinted genes can be on any chromosome and follow their own patterns of expression.</p>',
        '<p><strong>D. Both imprinted by the same parent:</strong> Genomic imprinting affects expression according to parental origin, rather than defining whether chromosomes assort independently. Imprinted genes can be on any chromosome and follow their own patterns of expression.</p>'],
      ['<li>Independent assortment requires genes on different chromosomes OR far apart (>50 cM) on the same chromosome</li>',
        '<li>Genes far apart on the same chromosome can have an observed recombination frequency close to 50%, so they may behave approximately as independently assorting genes. Map distance and recombination percentage are not interchangeable over long intervals</li>']
    ],
    keepHeadings: ['<strong>B. Both located on the X chromosome:</strong>', '<strong>D. Both imprinted by the same parent:</strong>'],
    gone: ['far apart (>50 cM) on the same chromosome', 'is unrelated to independent assortment',
      'especially in males who have only one X chromosome']
  },

  // ---- Q28  bio-567  Labrador epistasis (stem replaced) ------------------
  {
    q: 28, id: 'bio-567', expectLetter: 'D',
    stemFull: 'In Labrador retrievers, dogs with genotype E-B- have black coats and dogs with E-bb have brown coats. Dogs with ee have yellow coats regardless of their B-locus genotype. This masking of one locus\'s effect by another is an example of:',
    explanation: [
      ['<p>Epistasis occurs when the expression of one gene is modified or masked by the expression of another gene. In this example, the E gene is epistatic to the B gene. When a dog is homozygous recessive ee, no pigment is deposited regardless of the B locus genotype, resulting in a yellow coat. Only when at least one E allele is present (<i>E</i>&#8209;) does the B locus determine whether the coat is black (<i>B</i>&#8209;) or brown/chocolate (bb). This produces a modified dihybrid ratio of 9 black : 3 brown : 4 yellow.</p>',
        '<p>This is recessive epistasis: ee masks the effect of the B locus on coat color. Yellow Labradors still produce pigment, mainly yellow/red pheomelanin in their hair; they are not pigment-free. The E locus affects whether black/brown eumelanin is produced in the hair, while the B locus determines whether that eumelanin is black or brown. Only when at least one E allele is present (<i>E</i>&#8209;) does the B locus show its effect, giving black (<i>B</i>&#8209;) or brown/chocolate (bb) coats.</p>'],
      ['<li>The epistatic gene (E locus) determines whether the hypostatic gene (B locus) can be expressed</li>',
        '<li>The ee genotype is epistatic: it masks the effect of the B locus on the coat phenotype. In an EeBb x EeBb cross with independent assortment this gives 9 black : 3 brown : 4 yellow</li>'],
      ['<p class=\'exp-key\'>Bottom Line: Epistasis occurs when one gene controls whether another gene can be expressed, as seen in Labrador coat color where the E gene determines if the B gene\'s pigment is deposited.</p>',
        '<p class=\'exp-key\'>Bottom Line: The ee genotype masks the B locus\'s effect on Labrador coat color, producing yellow hair through recessive epistasis.</p>']
    ],
    gone: ['coat color is determined by two genes: one controls pigment production', 'no pigment is deposited regardless',
      'The epistatic gene (E locus)', 'whether another gene can be expressed']
  },

  // ---- Q30  bio-569  Rh disease (stem replaced) --------------------------
  {
    q: 30, id: 'bio-569', expectLetter: 'A',
    stemFull: 'Hemolytic disease of the fetus and newborn caused by maternal anti-D antibodies is most likely in which scenario?',
    explanation: [
      ['<p>During the first Rh-positive pregnancy, fetal red blood cells can enter the Rh-negative mother\'s circulation (especially at delivery), sensitizing her immune system to produce anti-Rh (anti-D) IgG antibodies. In a subsequent Rh-positive pregnancy, these maternal IgG antibodies cross the placenta and attack fetal red blood cells, causing hemolytic disease.</p>',
        '<p>An RhD-negative mother can become sensitized after exposure to RhD-positive red cells, for example when fetal red cells enter her circulation at delivery. Maternal IgG anti-D can then cross the placenta and destroy an RhD-positive fetus\'s red cells. An earlier RhD-positive pregnancy without prophylaxis creates an opportunity for sensitization, making A the best choice. A second pregnancy is not an absolute requirement: a previous transfusion or another earlier sensitizing exposure can also matter.</p>'],
      ['<p><strong>C. An Rh-negative mother carrying her first Rh-negative fetus:</strong> If the fetus is also Rh-negative, there is no D antigen mismatch and therefore no immune response. Hemolytic disease requires the fetus to be Rh-positive.</p>',
        '<p><strong>C. An Rh-negative mother carrying her first Rh-negative fetus:</strong> An RhD-negative fetus lacks the D target, so maternal anti-D cannot cause anti-D disease. This does not exclude other causes of fetal or newborn hemolysis.</p>'],
      ['<p><strong>D. An Rh-positive mother carrying her second Rh-positive fetus:</strong> An Rh-positive mother is immunologically compatible with an Rh-positive fetus. She does not produce anti-D antibodies regardless of how many pregnancies she has had.</p>',
        '<p><strong>D. An Rh-positive mother carrying her second Rh-positive fetus:</strong> An RhD-positive mother already carries the D antigen, so she does not form anti-D against an RhD-positive fetus. Anti-D disease is therefore not expected, regardless of the number of pregnancies.</p>'],
      ['<li>The first pregnancy typically sensitizes the mother; disease manifests in subsequent pregnancies</li>',
        '<li>An earlier RhD-positive pregnancy without prophylaxis creates an opportunity for sensitization; a previous transfusion or another sensitizing exposure can also matter</li>'],
      ['<p class=\'exp-key\'>Bottom Line: Erythroblastosis fetalis classically occurs in the second (or later) Rh-positive pregnancy of an unsensitized Rh-negative mother.</p>',
        '<p class=\'exp-key\'>Bottom Line: Anti-D-mediated fetal or newborn hemolysis occurs when an RhD-negative mother has formed anti-D antibodies and carries an RhD-positive fetus. Anti-D prophylaxis helps prevent sensitization; it does not erase established sensitization.</p>']
    ],
    keepHeadings: ['<strong>C. An Rh-negative mother carrying her first Rh-negative fetus:</strong>',
      '<strong>D. An Rh-positive mother carrying her second Rh-positive fetus:</strong>'],
    gone: ['Rh hemolytic disease of the newborn (erythroblastosis fetalis) is MOST likely',
      'Hemolytic disease requires the fetus to be Rh-positive', 'immunologically compatible with an Rh-positive fetus',
      'of an unsensitized Rh-negative mother', 'The first pregnancy typically sensitizes the mother']
  }
];
