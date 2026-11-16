/**
 * Biology review batch 10, displayed Q31-Q40
 * (bio-570 .. bio-574, bio-576 .. bio-578, bio-580).
 * Q36 (bio-575, lethal yellow allele) is KEEP UNCHANGED per the review and so
 * is absent from this module by design. Q37 is the third major rewrite.
 */
'use strict';

const Q37_EXPLANATION =
  '<h4>Correct Answer: 9 purple : 7 white</h4>' +
  '<p>Purple flowers require both <i>A</i>&#8209; and <i>B</i>&#8209;. Each occurs with probability 3/4, so P(purple) = 3/4 x 3/4 = 9/16. The remaining 7/16 lack a dominant allele at one or both loci and are white. This produces the 9:7 ratio of complementary gene interaction.</p>' +
  '<h4>Why the other choices are wrong:</h4>' +
  '<p><strong>B. 15 purple : 1 white:</strong> A 15:1 ratio would fit a different model in which a dominant allele at either locus is sufficient. Here, both loci must contribute their functional dominant allele for purple pigment.</p>' +
  '<p><strong>C. 3 purple : 1 white:</strong> A 3:1 ratio is the standard outcome for one heterozygous locus with complete dominance. It ignores the additional requirement for a dominant allele at the second locus.</p>' +
  '<p><strong>D. 1 purple : 3 white:</strong> This would make only one quarter of the offspring purple. In this cross, the probability of having a dominant allele at both loci is nine sixteenths, so purple is more common than white.</p>' +
  '<h4>Key Educational Points:</h4>' +
  '<ul><li>Complementary interaction: at least one dominant allele is required at each locus → 9:7 ratio</li>' +
  '<li>Duplicate dominant: either gene sufficient → 15:1 ratio</li>' +
  '<li>These are modifications of the basic 9:3:3:1 dihybrid ratio</li></ul>' +
  '<p class=\'exp-key\'>Bottom Line: Complementary gene interaction produces a 9:7 ratio because at least one dominant allele must be present at each locus for the phenotype to appear.</p>';

module.exports = [
  // ---- Q31  bio-570  Barr bodies -----------------------------------------
  {
    q: 31, id: 'bio-570', expectLetter: 'D',
    explanation: [
      ['Each extra X chromosome beyond the first is inactivated and condenses into a Barr body through X-inactivation (lyonization).',
        'One X remains largely active, while the additional X chromosomes are largely inactivated and condense into Barr bodies through X-inactivation (lyonization); some genes escape inactivation. The expected count is a teaching rule rather than a guarantee that two bodies will be visible in every cell examined.'],
      ['<p><strong>C. 3:</strong> This incorrectly assumes all X chromosomes form Barr bodies. One X chromosome must remain active in every cell to provide essential gene expression, so the maximum is always n − 1.</p>',
        '<p><strong>C. 3:</strong> This incorrectly assumes all X chromosomes form Barr bodies. One X remains largely active in every cell, while the additional X chromosomes are largely inactivated, so the expected count is n − 1.</p>'],
      ['<li>X-inactivation ensures only one X chromosome is transcriptionally active per cell</li>',
        '<li>X-inactivation leaves one X largely active, while additional X chromosomes are largely inactivated; some genes escape inactivation</li>']
    ],
    keepHeadings: ['<strong>C. 3:</strong>'],
    gone: ['Each extra X chromosome beyond the first is inactivated and condenses',
      'must remain active in every cell to provide essential gene expression',
      'only one X chromosome is transcriptionally active per cell']
  },

  // ---- Q32  bio-571  ZW sex determination --------------------------------
  {
    q: 32, id: 'bio-571', expectLetter: 'A',
    explanation: [
      ['Males carry two identical sex chromosomes (ZZ) and are homogametic',
        'Males carry two Z chromosomes (ZZ) and are homogametic'],
      ['<li>XY system (mammals): males are heterogametic (XY), females are homogametic (XX)</li>',
        '<li>XY system in most mammals: males are heterogametic (XY), females are homogametic (XX)</li>'],
      ['<li>X0 system (grasshoppers): males are X0, females are XX</li>',
        '<li>X0 system in many grasshoppers: males are X0, females are XX</li>']
    ],
    gone: ['two identical sex chromosomes (ZZ)', 'XY system (mammals):', 'X0 system (grasshoppers):']
  },

  // ---- Q33  bio-572  Turner syndrome -------------------------------------
  {
    q: 33, id: 'bio-572', expectLetter: 'C',
    explanation: [
      ['<p>Turner syndrome (45,X or 45,X0) results from complete or partial monosomy of the X chromosome. Affected individuals are phenotypically female and present with short stature, webbed neck, shield chest, and gonadal dysgenesis (streak gonads). It is the only viable monosomy in humans.</p>',
        '<p>The 45,X karyotype identifies Turner syndrome with complete monosomy X. Turner syndrome can also occur with mosaic or structural X-chromosome abnormalities. Affected individuals are phenotypically female. Common features include short stature and ovarian dysfunction; other features, such as a webbed neck and shield chest, vary.</p>'],
      ['These individuals are phenotypically male with tall stature, small testes, gynecomastia, and reduced fertility.',
        'Features may include tall stature, small testes, gynecomastia and reduced fertility in a phenotypically male individual.'],
      ['<p><strong>B. Down syndrome:</strong> Down syndrome (trisomy 21) has the karyotype 47,XX+21 or 47,XY+21. It involves 47 chromosomes with an extra chromosome 21, not a missing sex chromosome.</p>',
        '<p><strong>B. Down syndrome:</strong> Typical free trisomy 21 has the karyotype 47,XX,+21 or 47,XY,+21: 47 chromosomes with an extra chromosome 21, not a missing sex chromosome.</p>'],
      ['<p><strong>D. Patau syndrome:</strong> Patau syndrome (trisomy 13) has the karyotype 47,XX+13 or 47,XY+13. It involves 47 chromosomes with an extra chromosome 13 and presents with holoprosencephaly, cleft lip/palate, and polydactyly.</p>',
        '<p><strong>D. Patau syndrome:</strong> Typical free trisomy 13 has the karyotype 47,XX,+13 or 47,XY,+13: 47 chromosomes with an extra chromosome 13. Common features include holoprosencephaly, cleft lip/palate and polydactyly.</p>'],
      ['<li>Turner syndrome (45,X) is the only viable monosomy; all autosomal monosomies are lethal</li>',
        '<li>Monosomy X is the only complete whole-chromosome monosomy commonly compatible with live birth. Complete nonmosaic autosomal monosomies are generally incompatible with live birth</li>'],
      ['<li>Common features include lymphedema at birth, coarctation of the aorta, and ovarian failure</li>',
        '<li>Features that may occur include lymphedema at birth, coarctation of the aorta and ovarian insufficiency</li>']
    ],
    keepHeadings: ['<strong>A. Klinefelter syndrome:</strong>', '<strong>B. Down syndrome:</strong>', '<strong>D. Patau syndrome:</strong>'],
    gone: ['45,X0', 'the only viable monosomy in humans', '47,XX+21', '47,XX+13',
      'all autosomal monosomies are lethal', 'and ovarian failure']
  },

  // ---- Q34  bio-573  both dominant phenotypes (stem replaced) ------------
  {
    q: 34, id: 'bio-573', expectLetter: 'D',
    stemFull: 'For two independently assorting genes with complete dominance and no epistasis, what fraction of offspring from AaBb x AaBb is expected to show both dominant phenotypes (<i>A</i>&#8209;<i>B</i>&#8209;)?',
    explanation: [
      ['<p><strong>C. 1/4:</strong> This fraction does not correspond to any phenotypic class in a dihybrid cross. It may be confused with the probability of a homozygous recessive genotype in a monohybrid cross (1/4 for aa from Aa × Aa).</p>',
        '<p><strong>C. 1/4:</strong> 1/4 does not correspond to any of the four mutually exclusive phenotype classes in this specified cross. It may be confused with the probability of a homozygous recessive genotype in a monohybrid cross (1/4 for aa from Aa × Aa).</p>'],
      ['<li>Deviations from 9:3:3:1 suggest epistasis, linkage, or other non-Mendelian effects</li>',
        '<li>Large, consistent departures from the expected ratio can suggest linkage, gene interactions or other model violations; small samples also vary by chance</li>'],
      ['<p class=\'exp-key\'>Bottom Line: In a dihybrid cross of two heterozygotes, 9/16 of offspring show both dominant phenotypes.</p>',
        '<p class=\'exp-key\'>Bottom Line: With independent assortment, complete dominance and no epistasis, AaBb x AaBb gives both dominant phenotypes in an expected 9/16 of offspring.</p>']
    ],
    keepHeadings: ['<strong>C. 1/4:</strong>'],
    gone: ['In a dihybrid cross between two heterozygous parents (AaBb × AaBb), what fraction',
      'does not correspond to any phenotypic class in a dihybrid cross',
      'Deviations from 9:3:3:1 suggest epistasis']
  },

  // ---- Q35  bio-574  yellow Labrador fraction (stem replaced) ------------
  {
    q: 35, id: 'bio-574', expectLetter: 'D',
    stemFull: 'In Labrador retrievers, <i>E</i>&#8209;<i>B</i>&#8209; dogs are black, <i>E</i>&#8209;bb dogs are brown, and ee dogs are yellow regardless of the B-locus genotype. Assuming the loci assort independently, what proportion of puppies from EeBb × EeBb is expected to be yellow?',
    explanation: [
      ['<p>This is a classic example of recessive epistasis. The ee genotype is epistatic to the B gene - when no pigment is deposited, coat color is yellow regardless of the B genotype. From EeBb × EeBb: P(ee) = 1/4. All ee individuals are yellow regardless of their B genotype, so yellow = 1/4 of all offspring = 4/16. This includes <i>eeB</i>&#8209; (3/16) and eebb (1/16).</p>',
        '<p>This is a classic example of recessive epistasis. The ee genotype masks the effect of the B locus on coat color, so ee dogs are yellow regardless of their B genotype. Such dogs still produce pigment, mainly yellow/red pheomelanin in the hair, rather than no pigment at all: ee prevents production of black/brown eumelanin in the hair. From EeBb × EeBb: P(ee) = 1/4, so yellow = 1/4 of all offspring = 4/16. This includes <i>eeB</i>&#8209; (3/16) and eebb (1/16).</p>'],
      ['<li>Recessive epistasis modifies the 9:3:3:1 ratio to 9:3:4 (black:brown:yellow)</li>',
        '<li>Under this model, recessive epistasis modifies the 9:3:3:1 ratio to 9 black : 3 brown : 4 yellow</li>'],
      ['<li>The epistatic gene (ee) masks the expression of the hypostatic gene (B)</li>',
        '<li>ee is an epistatic genotype: it masks the coat-color effect of the B locus rather than removing the B gene or its expression</li>'],
      ['<p class=\'exp-key\'>Bottom Line: In recessive epistasis, the ee genotype masks the B gene entirely, making 4/16 (1/4) of offspring yellow in an EeBb × EeBb cross.</p>',
        '<p class=\'exp-key\'>Bottom Line: One quarter of offspring are expected to be ee and therefore yellow, regardless of which B-locus alleles they inherit.</p>']
    ],
    gone: ['coat color is controlled by two genes. The E gene determines pigment deposition',
      'when no pigment is deposited', 'The epistatic gene (ee) masks the expression of the hypostatic gene',
      'masks the B gene entirely', '9:3:4 (black:brown:yellow)']
  },

  // ---- Q37  bio-576  complementary genes (MAJOR REWRITE) -----------------
  {
    q: 37, id: 'bio-576', expectLetter: 'A',
    stemFull: 'In sweet peas, purple pigment is produced only when at least one dominant allele is present at each of two independently assorting loci, A and B. All other genotypes have white flowers. What phenotype ratio is expected from AaBb × AaBb?',
    optionFull: [[2, '3 purple : 1 white'], [3, '1 purple : 3 white']],
    explanationFull: Q37_EXPLANATION,
    gone: ['12 purple : 3 white : 1 white', '9 purple : 3 white : 3 white : 1 white',
      'Neither gene alone can produce pigment', 'makes no phenotypic sense',
      'A 12:3:1 ratio indicates dominant epistasis', 'both dominant alleles must be present for the phenotype to appear']
  },

  // ---- Q38  bio-577  map distance and recombinants (stem replaced) -------
  {
    q: 38, id: 'bio-577', expectLetter: 'D',
    stemFull: 'Genes A and B are 20 cM apart. Using the simplified approximation that 1 cM corresponds to 1% recombination and ignoring undetected multiple crossovers, an AB/ab individual is crossed with ab/ab. Approximately what percentage of offspring will belong to the recombinant classes Ab and aB combined?',
    explanation: [
      ['<p>The recombination frequency between linked genes directly equals the map distance in centiMorgans (for distances up to ~30 cM). A distance of 20 cM means that 20% of gametes produced by the AB/ab parent will be recombinant (Ab and aB), while 80% will be parental (AB and ab). In a testcross (× ab/ab), the gamete ratios directly translate to offspring phenotype ratios, so 20% of offspring show recombinant phenotypes.</p>',
        '<p>For short intervals, map distance in cM approximates the observed recombination percentage. Under the approximation stated in the question, 20 cM means that about 20% of the gametes produced by the AB/ab parent are recombinant (about 10% Ab and about 10% aB), while about 80% are parental (about 40% AB and about 40% ab). In a testcross (× ab/ab), the gamete ratios translate directly into offspring phenotype ratios, so about 20% of offspring show recombinant phenotypes. Multiple crossovers can make the observed recombination percentage underestimate map distance.</p>'],
      ['<li>1 cM = 1% recombination frequency (for short to moderate distances)</li>',
        '<li>For short intervals, 1 cM approximates 1% recombination; multiple crossovers can make the observed percentage underestimate map distance</li>'],
      ['<li>Parental types are always more frequent than recombinant types for linked genes</li>',
        '<li>In this modeled cross the parental classes are more frequent than the recombinant classes; that is not an unrestricted rule for every interval and dataset</li>'],
      ['<p class=\'exp-key\'>Bottom Line: Map distance in centiMorgans equals recombination frequency - 20 cM apart means 20% recombinant offspring in a testcross.</p>',
        '<p class=\'exp-key\'>Bottom Line: Using the stated approximation, 20 cM predicts about 20% recombinant offspring in total, approximately 10% Ab and 10% aB.</p>']
    ],
    gone: ['Genes A and B are located on the same chromosome and are 20 centiMorgans (cM) apart',
      'directly equals the map distance in centiMorgans (for distances up to ~30 cM)',
      '1 cM = 1% recombination frequency', 'Parental types are always more frequent',
      'Map distance in centiMorgans equals recombination frequency']
  },

  // ---- Q39  bio-578  LH and ovulation (stem replaced) --------------------
  {
    q: 39, id: 'bio-578', expectLetter: 'C',
    stemFull: 'In a typical 28-day menstrual cycle, the surge of which hormone directly triggers ovulation around day 14?',
    explanation: [
      ['<p>The LH surge is the direct hormonal trigger for ovulation. Rising estrogen levels from the mature Graafian follicle exert positive feedback on the anterior pituitary, causing a dramatic spike in LH secretion approximately 24-36 hours before ovulation. This LH surge induces the follicle to rupture and release the secondary oocyte.</p>',
        '<p>The LH surge is the direct hormonal trigger for ovulation. Sustained high estradiol from the mature Graafian follicle near the end of the follicular phase produces positive feedback on the hypothalamus and anterior pituitary, causing a sharp rise in LH secretion. Ovulation usually occurs about 36 hours after the start of the LH surge, when the follicle ruptures and releases the secondary oocyte.</p>'],
      ['<p><strong>A. Estrogen:</strong> Estrogen rises during the follicular phase and triggers the LH surge via positive feedback, but it does not directly cause the follicle to rupture. Estrogen is the upstream signal, while LH is the direct effector of ovulation.</p>',
        '<p><strong>A. Estrogen:</strong> Sustained high estradiol near the end of the follicular phase triggers the LH surge through positive feedback, but it does not directly cause the follicle to rupture. Not every rise in estrogen produces positive feedback; estradiol is the upstream signal, while LH is the direct effector of ovulation.</p>'],
      ['<li>The LH surge is the direct trigger for ovulation (~day 14)</li>',
        '<li>The LH surge is the direct trigger for ovulation, around day 14 of a typical 28-day cycle; ovulation timing varies</li>'],
      ['<li>Estrogen positive feedback on the pituitary causes the LH surge</li>',
        '<li>Sustained high estradiol produces positive feedback on the hypothalamus and pituitary, causing the LH surge</li>']
    ],
    keepHeadings: ['<strong>A. Estrogen:</strong>'],
    gone: ['During the menstrual cycle, the surge of which hormone directly triggers ovulation on approximately day 14',
      'approximately 24-36 hours before ovulation', 'Estrogen rises during the follicular phase and triggers',
      'direct trigger for ovulation (~day 14)']
  },

  // ---- Q40  bio-580  oogenesis products (stem replaced) ------------------
  {
    q: 40, id: 'bio-580', expectLetter: 'A',
    stemFull: 'In the simplified model of human oogenesis in which meiosis is completed and the first polar body also divides, which combination of products is formed from one primary oocyte?',
    explanation: [
      ['<p>Oogenesis involves unequal cytoplasmic division. Meiosis I produces one large secondary oocyte and one small first polar body. Meiosis II of the secondary oocyte produces one large ovum and one small second polar body. The first polar body may also divide, yielding a total of 3 polar bodies and 1 functional ovum. This asymmetric division ensures the ovum retains maximum cytoplasm and nutrients.</p>',
        '<p>Oogenesis involves unequal cytoplasmic division. Meiosis I produces one large secondary oocyte and one small first polar body. Completion of meiosis II normally follows fertilization and produces one large egg cell and one small second polar body. If the first polar body also divides, as this question specifies, there are three polar bodies in total; without that division the usual schematic count is two. The unequal divisions ensure the egg cell retains most of the cytoplasm and nutrients.</p>'],
      ['<p><strong>D. 1 ovum and 1 polar body:</strong> This accounts for only the meiosis II products and ignores the first polar body produced during meiosis I. The total is 1 ovum + up to 3 polar bodies.</p>',
        '<p><strong>D. 1 ovum and 1 polar body:</strong> One egg cell and one polar body do not account for all products under the assumptions given. The secondary oocyte produces a second polar body, and the question also specifies division of the first polar body.</p>'],
      ['<li>Oogenesis: 1 primary oocyte → 1 ovum + 3 polar bodies</li>',
        '<li>Oogenesis produces one large functional egg cell; three polar bodies are shown in the model where the first polar body also divides</li>'],
      ['<p class=\'exp-key\'>Bottom Line: Oogenesis produces one functional ovum and three polar bodies from each primary oocyte due to unequal cytoplasmic division.</p>',
        '<p class=\'exp-key\'>Bottom Line: Under the stated model, one primary oocyte yields one ovum and three polar bodies. The key biological distinction is that only one large functional egg cell is produced.</p>']
    ],
    keepHeadings: ['<strong>D. 1 ovum and 1 polar body:</strong>'],
    gone: ['During oogenesis, one primary oocyte ultimately produces how many functional egg cells',
      'The first polar body may also divide, yielding a total of 3 polar bodies',
      '1 primary oocyte → 1 ovum + 3 polar bodies', 'The total is 1 ovum + up to 3 polar bodies']
  }
];
