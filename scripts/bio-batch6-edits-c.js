/**
 * Review batch 6, displayed Q25-Q36 (bio-289 .. bio-306).
 */
'use strict';

module.exports = [

{
  q: 25, id: 'bio-289', expectLetter: 'C',
  stemFull: 'Huntington’s disease is autosomal dominant. An affected heterozygous father (Hh) and an unaffected mother (hh) have children. What proportion of their children is expected to inherit the H allele?',
  explanation: [
    [`<p>Hh × hh → 1/2 Hh (affected) : 1/2 hh (unaffected). In autosomal dominant disorders, only one copy of the mutant allele is needed for disease expression.`,
     `<p>Hh × hh → 1/2 Hh : 1/2 hh, so half the children are expected to inherit the H allele. In autosomal dominant disorders one disease-associated allele can be sufficient, although symptoms may begin later in life.`],
    [`<strong>A. All children:</strong> If the affected parent were homozygous dominant (HH), all offspring would be affected.`,
     `<strong>A. All children:</strong> If the affected parent were homozygous dominant (HH), every child would inherit an H allele.`],
    [`<strong>D. 1/4:</strong> 1/4 would be the result if both parents were heterozygous (Hh × Hh). In this cross (Hh × hh), only H or h comes from the affected parent, giving a 1:1 ratio, so 1/2 of offspring are affected.`,
     `<strong>D. 1/4:</strong> Hh × Hh gives 1/4 HH, 1/2 Hh, and 1/4 hh, so in the simple dominant model 3/4 rather than 1/4 inherit an H allele. In this cross (Hh × hh) the affected parent passes either H or h, giving a 1:1 ratio, so 1/2 of the children are expected to inherit the H allele.`],
    [`<li>One copy of a dominant allele is enough to cause disease, so there is no carrier state.</li>`,
     `<li>One disease-associated allele can be sufficient, but symptoms may begin later, so a person can carry the allele for years without signs of disease; some dominant variants also have reduced penetrance.</li>`],
    [`<li>Autosomal dominant traits appear in every generation and affect both sexes equally.</li>`,
     `<li>Autosomal dominant conditions often show a vertical pattern across generations and affect both sexes equally, although age of onset and penetrance can obscure that pattern.</li>`],
    [`<p class='exp-key'>Bottom Line: Autosomal dominant traits appear in every generation. An affected heterozygous parent has a 50% chance of passing the allele to each child.</p>`,
     `<p class='exp-key'>Bottom Line: Autosomal dominant conditions often show a vertical pattern across generations. An affected heterozygous parent has a 50% chance of passing the allele to each child.</p>`],
  ],
},

{
  q: 26, id: 'bio-290', expectLetter: 'B',
  explanation: [
    [`While Robertsonian translocation accounts for about 4% of Down syndrome cases (translocation trisomy 21), the question asks about the <em>most common</em> cause, which is meiotic nondisjunction (~95% of cases).`,
     `Translocation Down syndrome accounts for about 4% of cases, and such a person often has 46 chromosomes, with extra chromosome-21 material attached to another chromosome. The stem describes 47 chromosomes and asks for the <em>most common</em> cause, which is meiotic nondisjunction (~95% of cases).`],
    [`Point mutations affect individual genes, not whole chromosomes. Down syndrome is caused by an entire extra copy of chromosome 21 (trisomy), most commonly resulting from nondisjunction.`,
     `Point mutations affect individual genes, not whole chromosomes. Down syndrome results from extra chromosome-21 genetic material, most commonly a whole extra chromosome 21 arising from nondisjunction.`],
    [`<p class='exp-key'>Bottom Line: Nondisjunction = failure of chromosome separation during meiosis, leading to aneuploidy (trisomy or monosomy).</p>`,
     `<p class='exp-key'>Bottom Line: Nondisjunction is failure of homologous chromosomes or sister chromatids to separate properly. It can occur in meiosis or mitosis and can cause aneuploidy.</p>`],
  ],
},

{
  q: 27, id: 'bio-291', expectLetter: 'B',
  explanation: [
    [`<p>The presence of the Y chromosome (specifically the SRY gene) determines male sex. Individuals with 47,XXY are phenotypically male but may have features including tall stature, gynecomastia, small testes, reduced fertility, and learning difficulties. The extra X undergoes X-inactivation (Barr body present).</p>`,
     `<p>A functional SRY gene on the Y chromosome typically initiates testis development. Individuals with 47,XXY are usually phenotypically male but may have features including tall stature, gynecomastia, small testes, reduced fertility, and learning difficulties. The extra X is largely inactivated, so a Barr body is present. Inactivation is not complete: some X-linked genes escape it, which helps explain why an extra X still affects development.</p>`],
    [`Klinefelter individuals (47,XXY) are phenotypically male because the Y chromosome contains the SRY gene that initiates male sex determination.`,
     `Individuals with 47,XXY are typically phenotypically male, because a functional SRY gene on the Y chromosome initiates testis development.`],
    [`The presence of the Y chromosome (specifically the SRY gene) directs male development regardless of the number of X chromosomes.`,
     `A functional SRY gene on the Y chromosome typically initiates testis development, and extra X chromosomes do not by themselves reverse that.`],
    [`<li>Sex is determined by the presence of the Y chromosome, specifically the SRY gene - not by the number of X chromosomes.</li>`,
     `<li>A functional SRY gene on the Y chromosome typically initiates testis development, rather than the number of X chromosomes deciding the outcome.</li>`],
    [`<li>The extra X is inactivated, so these individuals have one Barr body.</li>`,
     `<li>The extra X is largely inactivated, so these individuals have one Barr body; because some genes escape inactivation, an inactive X is not completely silent.</li>`],
    [`<p class='exp-key'>Bottom Line: SRY gene on the Y chromosome determines male development. XXY individuals are male because they have a Y chromosome. Number of Barr bodies = number of X chromosomes minus 1.</p>`,
     `<p class='exp-key'>Bottom Line: A functional SRY gene on the Y chromosome typically initiates testis development, so 47,XXY is usually phenotypically male. Number of Barr bodies = number of X chromosomes minus 1.</p>`],
  ],
},

{
  q: 28, id: 'bio-292', expectLetter: 'C',
  stemFull: 'Using the usual X-inactivation rule for a somatic interphase nucleus, how many Barr bodies are expected in a person with the karyotype 49,XXXXY?',
  explanation: [
    [`X-inactivation ensures only one X chromosome remains active per cell, so all extra X chromosomes are condensed into Barr bodies.`,
     `By the usual rule one X stays active per cell, and the extra X chromosomes are largely inactivated and condensed into Barr bodies. Some genes escape inactivation, and the figure is the expected number rather than a count that every cell visibly displays under every observation condition.`],
    [`<li>Barr bodies = (number of X chromosomes) minus 1, because exactly one X remains active per cell.</li>`,
     `<li>Barr bodies = (number of X chromosomes) minus 1, because by the usual rule one X remains active per cell.</li>`],
    [`<li>X-inactivation (lyonization) condenses the surplus X chromosomes into transcriptionally silent heterochromatin.</li>`,
     `<li>X-inactivation (lyonization) condenses the surplus X chromosomes into largely silent heterochromatin, although some genes escape inactivation.</li>`],
  ],
},

{
  q: 29, id: 'bio-295', expectLetter: 'B',
  explanation: [
    [`<strong>A. 900:</strong> 900 is the value of 2q × 10,000/2 or could come from confusing q with 2pq. The correct carrier frequency is 2pq = 2(0.9)(0.1) = 0.18, giving 1,800 carriers in 10,000 people.`,
     `<strong>A. 900:</strong> 900 equals pq × 10,000. This omits the factor of 2 in the heterozygote frequency, 2pq. The correct carrier frequency is 2pq = 2(0.9)(0.1) = 0.18, giving 1,800 carriers in 10,000 people.`],
    [`<strong>C. 4,200:</strong> 200 carriers would imply 2pq = 0.02, but the correct calculation gives q = √(100/10000) = 0.1, p = 0.9, and 2pq = 2(0.9)(0.1) = 0.18. In a population of 10,000, that means 1,800 carriers.`,
     `<strong>C. 4,200:</strong> 4,200 would be 42% of the population, whereas the calculated carrier frequency is 18%. With q² = 100/10,000 = 0.01, q = 0.1 and p = 0.9, so 2pq = 2(0.9)(0.1) = 0.18, which is 1,800 carriers in 10,000 people.`],
    [`<strong>D. 300:</strong> Using Hardy-Weinberg: q² = 100/10,000 = 0.01, so q = 0.1, p = 0.9. Carrier frequency = 2pq = 2(0.9)(0.1) = 0.18. In 10,000 people: 0.18 × 10,000 = 1,800 carriers.`,
     `<strong>D. 300:</strong> 300 is 3% of the population, not the calculated 18% carrier frequency. With q² = 100/10,000 = 0.01, q = 0.1 and p = 0.9, so 2pq = 0.18 and there are 1,800 carriers in 10,000 people.`],
  ],
},

{
  q: 30, id: 'bio-296', expectLetter: 'B',
  explanation: [
    [`<p>The Philadelphia chromosome results from a reciprocal translocation t(9;22)(q34;q11), creating the BCR-ABL fusion gene.`,
     `<p>The Philadelphia chromosome is the shortened derivative chromosome 22 produced by the reciprocal translocation t(9;22)(q34;q11), and it carries the BCR-ABL fusion gene. The name refers to that derivative chromosome rather than to the translocation event as a whole.`],
    [`<strong>C. Turner syndrome:</strong> Turner syndrome is monosomy X (45,X), the loss of a sex chromosome. It is a numerical abnormality present from conception, not an acquired reciprocal translocation, and it is not a malignancy.`,
     `<strong>C. Turner syndrome:</strong> Turner syndrome involves partial or complete loss of an X chromosome, with 45,X as the typical example; mosaic forms also occur. It is a constitutional chromosome abnormality rather than an acquired reciprocal translocation, and it is not a malignancy.`],
    [`<li>The Philadelphia chromosome is the reciprocal translocation t(9;22)(q34;q11), producing the BCR-ABL fusion gene.</li>`,
     `<li>The Philadelphia chromosome is the shortened derivative chromosome 22 made by the reciprocal translocation t(9;22)(q34;q11), and it carries the BCR-ABL fusion gene.</li>`],
    [`<li>Imatinib and later tyrosine kinase inhibitors target this fusion protein directly - the first clear success of targeted cancer therapy.</li>`,
     `<li>Imatinib and later tyrosine kinase inhibitors target this fusion protein directly.</li>`],
    [`<p class='exp-key'>Bottom Line: The Philadelphia chromosome t(9;22) produces BCR-ABL fusion protein, a constitutively active tyrosine kinase driving CML.</p>`,
     `<p class='exp-key'>Bottom Line: The Philadelphia chromosome is the derivative chromosome 22 arising from t(9;22). Its BCR-ABL fusion protein is a constitutively active tyrosine kinase that drives CML.</p>`],
  ],
},

{
  q: 31, id: 'bio-299', expectLetter: 'B',
  explanation: [
    [`The spindle assembly checkpoint ensures all chromosomes are properly attached before anaphase proceeds.`,
     `The spindle assembly checkpoint helps ensure that chromosomes are correctly attached before anaphase proceeds.`],
    [`<li>Attachment from opposite poles (biorientation) is what guarantees the sister chromatids will be pulled to different daughter cells.</li>`,
     `<li>Attachment from opposite poles (biorientation) is what directs the sister chromatids to different daughter cells.</li>`],
    [`<li>The spindle assembly checkpoint holds the cell in metaphase until every kinetochore is correctly attached, which prevents aneuploidy.</li>`,
     `<li>The spindle assembly checkpoint holds the cell in metaphase until the kinetochores are correctly attached, which reduces the risk of missegregation; like any checkpoint, it is not infallible.</li>`],
    [`<p class='exp-key'>Bottom Line: The spindle assembly checkpoint at metaphase prevents premature anaphase entry until all kinetochores are properly attached.</p>`,
     `<p class='exp-key'>Bottom Line: The spindle assembly checkpoint at metaphase delays anaphase until the kinetochores are properly attached, which reduces the risk of missegregation.</p>`],
  ],
},

{
  q: 32, id: 'bio-300', expectLetter: 'B',
  explanation: [
    [`<strong>C. 92 chromosomes:</strong> 92 chromosomes would represent a doubling, which does not occur in normal cell division. While DNA is replicated before mitosis (so the cell briefly contains 92 chromatids), the sister chromatids separate so each daughter cell receives 46 chromosomes.`,
     `<strong>C. 92 chromosomes:</strong> The undivided cell temporarily contains 92 chromosomes during anaphase, after sister chromatids separate and each becomes a chromosome in its own right, with 46 moving toward each future daughter cell. These are partitioned into two daughter cells of 46 each, and the question asks about each daughter cell after division.`],
  ],
},

{
  q: 33, id: 'bio-301', expectLetter: 'A',
  explanation: [
    [`<strong>C. Anaphase II:</strong> During anaphase I, homologous chromosomes separate and move to opposite poles. Crossing over occurred earlier, during prophase I, when homologs were closely synapsed in tetrads.`,
     `<strong>C. Anaphase II:</strong> In anaphase II, sister chromatids separate. Crossing over occurred earlier, during prophase I, between nonsister chromatids of homologous chromosomes.`],
  ],
},

{
  q: 34, id: 'bio-302', expectLetter: 'B',
  explanation: [
    [`<strong>A. Crossing over in prophase I:</strong> Crossing over (recombination) during prophase I IS indeed a major source of genetic variation in meiosis. Homologous chromosomes exchange segments at chiasmata, creating new allele combinations on each chromatid. This is actually a correct statement, but depending on the question, it may not be the specific answer being asked for.`,
     `<strong>A. Crossing over in prophase I:</strong> Crossing over during prophase I exchanges segments between homologous chromosomes at chiasmata, creating new allele combinations within a chromosome. It is a real source of genetic variation, but a separate one from the independent orientation of different homologous pairs, which is what this question asks about.`],
    [`<strong>C. Separation of sister chromatids in anaphase II:</strong> Separation of sister chromatids in anaphase II produces identical copies of each chromosome. This step does not create genetic variation because sister chromatids are (barring crossing over) genetically identical copies produced during S phase. The variation-generating steps are crossing over (prophase I) and independent assortment (anaphase I).`,
     `<strong>C. Separation of sister chromatids in anaphase II:</strong> Anaphase II separates sister chromatids; it does not create the copies. Those were made in S phase, and crossing over can leave the two sister chromatids differing from each other. This question concerns the independent arrangement of homologous pairs in meiosis I, which is established at metaphase I, with those homologs segregating at anaphase I.`],
    [`<strong>D. DNA replication in S phase:</strong> DNA replication in S phase produces an exact copy of each chromosome (sister chromatids). It is a faithful copying process with proofreading by DNA polymerase. Replication itself does not generate genetic diversity. The variation in meiosis comes from crossing over (new allele combinations) and independent assortment (random chromosome segregation).`,
     `<strong>D. DNA replication in S phase:</strong> DNA replication in S phase copies each chromosome to give sister chromatids. It is not the mechanism responsible for independent assortment, which comes from the random orientation of homologous pairs at metaphase I. Replication is high-fidelity, with proofreading by DNA polymerase, although replication errors can still introduce mutations.`],
    [`<li>Each homologous pair lines up independently of every other pair, so maternal and paternal chromosomes are distributed at random.</li>`,
     `<li>Each homologous pair lines up independently of every other pair at metaphase I, and those homologs then segregate at anaphase I, so maternal and paternal chromosomes are distributed at random.</li>`],
  ],
},

{
  q: 35, id: 'bio-304', expectLetter: 'D',
  explanation: [
    [`<strong>C. 3:</strong> Three is not the product of any standard meiotic division. Meiosis always involves two rounds of division: meiosis I (reductional) and meiosis II (equational), producing 2 x 2 = 4 cells. In oogenesis, three polar bodies and one ovum result (total 4 cells, but only 1 is functional). In spermatogenesis, all 4 cells are functional.`,
     `<strong>C. 3:</strong> Two meiotic divisions produce four spermatids in normal spermatogenesis, so three is not the expected number. Oogenesis instead produces one functional ovum and polar bodies; the number of polar bodies can vary. The four spermatids then differentiate into spermatozoa.`],
  ],
},

{
  q: 36, id: 'bio-306', expectLetter: 'B',
  optionFull: [
    [1, 'Proto-oncogenes normally regulate cell growth; oncogenes are abnormally activated or overexpressed versions of these genes'],
  ],
  headingsGone: ['oncogenes are their mutated, overactive forms'],
  explanation: [
    [`<h4>Correct Answer: Proto-oncogenes are normal genes that regulate cell growth; oncogenes are their mutated, overactive forms</h4>`,
     `<h4>Correct Answer: Proto-oncogenes normally regulate cell growth; oncogenes are abnormally activated or overexpressed versions of these genes</h4>`],
    [`Mutations that cause gain of function (point mutations, amplification, translocation) convert them into oncogenes, which drive uncontrolled proliferation. Only ONE mutant allele is sufficient (dominant effect). Examples: RAS, MYC, HER2.`,
     `Changes that make such a gene abnormally active convert it into an oncogene, which drives uncontrolled proliferation. The change can be in the gene's sequence, its copy number, or the way it is regulated; point mutation, gene amplification, and translocation are the common examples. One activated allele can exert a dominant growth-promoting effect at the level of a single cell, although one alteration alone is generally not enough to produce a cancer. Examples: RAS, MYC, HER2.`],
    [`Growth factors, growth factor receptors, signal transduction proteins, and transcription factors are all products of proto-oncogenes. They only become problematic when mutated into oncogenes.`,
     `Growth factors, growth factor receptors, signal transduction proteins, and transcription factors are all products of proto-oncogenes. They become problematic when they are abnormally activated or overexpressed as oncogenes.`],
    [`<li>Proto-oncogenes are normal genes promoting growth; oncogenes are their mutated, overactive forms.</li>`,
     `<li>Proto-oncogenes are normal genes that regulate cell growth; oncogenes are abnormally activated or overexpressed versions of them.</li>`],
    [`<li>Activation is gain-of-function, by point mutation, gene amplification, or translocation.</li>`,
     `<li>Activation is a gain of function, arising from changes in sequence, copy number, or regulation; point mutation, gene amplification, and translocation are the common routes.</li>`],
    [`<li>One mutant allele suffices, so oncogenes act dominantly at the cellular level.</li>`,
     `<li>One activated allele can act dominantly at the level of a single cell, although one alteration alone is generally not enough to cause a cancer.</li>`],
    [`<li>Tumour suppressors are the mirror image: loss-of-function, recessive, and generally requiring both alleles - Knudson's two-hit hypothesis.</li>`,
     `<li>Tumour suppressors are the mirror image: loss of function, with many following a two-hit pattern in which both alleles are inactivated (Knudson's hypothesis). Inherited predisposition can still be autosomal dominant, because the second hit occurs later in a tumour cell.</li>`],
    [`<p class='exp-key'>Bottom Line: Oncogenes = gain-of-function mutations in proto-oncogenes (dominant). Tumor suppressors = loss-of-function mutations (recessive, need both alleles affected per Knudson's two-hit hypothesis).</p>`,
     `<p class='exp-key'>Bottom Line: Oncogenes are abnormally activated proto-oncogenes, acting dominantly within the cell. Tumor suppressors lose function, and many follow a two-hit pattern in which both alleles are inactivated (Knudson's hypothesis).</p>`],
  ],
},

];
