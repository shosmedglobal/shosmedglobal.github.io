/**
 * Batch 7 review, displayed Q13-Q24 (bio-356 .. bio-367).
 */
'use strict';

module.exports = [

  // ------------------------------------------------------------- Q13 bio-356
  {
    q: 13, id: 'bio-356', expectLetter: 'C',
    explanation: [
      ['Normal individuals have 10-35 repeats, while affected individuals have 36 or more. CGG expansion causes Fragile X syndrome, CTG expansion causes myotonic dystrophy, and GAA expansion causes Friedreich ataxia.',
        'HTT alleles with 36-39 CAG repeats have reduced penetrance; people with 40 or more repeats almost always develop Huntington disease during a normal lifespan. Alleles with 27-35 repeats generally do not cause the disease in the carrier but can expand when transmitted. CGG expansion causes Fragile X syndrome, CTG expansion causes myotonic dystrophy type 1, and GAA expansion causes Friedreich ataxia.'],
      ['<strong>B. CTG:</strong> CTG expansion in the DMPK gene causes myotonic dystrophy. This is the closest distractor',
        '<strong>B. CTG:</strong> CTG expansion in the DMPK gene causes myotonic dystrophy type 1. This is the closest distractor'],
      ['<li>Normal alleles carry roughly 10-35 repeats, while 36 or more causes disease.</li>',
        '<li>Repeat length matters: 40 or more repeats almost always causes the disease, while 36-39 repeats show reduced penetrance.</li>'],
      ['<li>Learn the other repeat disorders alongside it: CGG in Fragile X, CTG in myotonic dystrophy, GAA in Friedreich ataxia.</li>',
        '<li>Learn the other repeat disorders alongside it: CGG in Fragile X, CTG in myotonic dystrophy type 1, GAA in Friedreich ataxia.</li>']
    ],
    gone: ['Normal individuals have 10-35 repeats', 'Normal alleles carry roughly 10-35 repeats',
      'CTG expansion causes myotonic dystrophy,', 'CTG in myotonic dystrophy,']
  },

  // ------------------------------------------------------------- Q14 bio-357
  {
    q: 14, id: 'bio-357', expectLetter: 'B',
    stemFull: 'Two parents are confirmed heterozygous carriers of a cystic-fibrosis-causing CFTR variant. They have a child with cystic fibrosis. What is the probability that their next child will be a heterozygous carrier?',
    explanation: [
      ['<p>Since both parents must be carriers (Cc) to have an affected child (cc), the expected genotype ratio for each pregnancy is:',
        '<p>Because the stem specifies two heterozygous parents, this is a Cc × Cc cross. The expected genotype ratio for each pregnancy is:'],
      ['<li>Having an affected child proves that both parents are carriers.</li>',
        '<li>The stated parental genotypes are Cc and Cc.</li>']
    ],
    gone: ['Since both parents must be carriers', 'Having an affected child proves that both parents are carriers']
  },

  // ------------------------------------------------------------- Q15 bio-358
  {
    q: 15, id: 'bio-358', expectLetter: 'B',
    optionFull: [[1, 'The trait can skip generations; affected males often have carrier mothers']],
    explanation: [
      ['<h4>Correct Answer: B. The trait skips generations, with affected males having carrier mothers</h4>',
        '<h4>Correct Answer: B. The trait can skip generations; affected males often have carrier mothers</h4>'],
      ['<p>In X-linked recessive inheritance, the trait predominantly affects males because they have only one X chromosome (hemizygous). Affected males inherit the mutant allele from their carrier mothers (who are typically phenotypically normal). The trait appears to skip generations: an affected grandfather passes the allele through his carrier daughter to his affected grandson. Fathers cannot transmit X-linked traits to sons (they pass the Y chromosome).</p>',
        '<p>In X-linked recessive inheritance, the trait predominantly affects males because they have only one X chromosome (hemizygous). Affected males may inherit the allele from a mother carrying it; new variants also occur. Carrier females are often less affected than males, but some have symptoms. The trait can appear to skip generations: an affected grandfather passes the allele through his carrier daughter to his affected grandson. Fathers cannot transmit X-linked traits to sons, because they pass the Y chromosome.</p>'],
      ['This is a key distinguishing feature: the absence of male-to-male transmission rules in X-linked inheritance when observed in pedigrees.',
        'Father-to-son transmission therefore excludes the standard X-linked pattern. Its absence alone does not prove X-linked inheritance, since many autosomal pedigrees contain no father-to-son transmission either.'],
      ['<p><strong>C. Both parents must be carriers for affected offspring:</strong> This describes autosomal recessive inheritance, where both parents must carry one copy of the mutant allele (be heterozygous carriers) for affected offspring to appear. In X-linked recessive inheritance, only the mother needs to be a carrier; the father\'s genotype for the X-linked gene is irrelevant if the trait is on the X chromosome.</p>',
        '<p><strong>C. Both parents must be carriers for affected offspring:</strong> A son receives his X chromosome from his mother and his Y from his father. His father\'s allele at this X-linked locus therefore does not determine the son\'s genotype. Daughters receive an X from each parent, so the father\'s genotype matters for them. An affected son does not require two carrier parents.</p>'],
      ['Females would need two copies of the recessive allele to be affected, which is much rarer.',
        'Females are less commonly affected in the usual recessive pattern, because two altered copies are usually needed. A heterozygous female can still have symptoms, for example where X-inactivation is skewed.'],
      ['<li>Affected males almost always inherit the allele from a carrier mother who is herself phenotypically normal.</li>',
        '<li>Affected males often inherit the allele from a carrier mother, who is frequently unaffected herself; new variants also occur.</li>'],
      ['<li>The trait therefore appears to skip generations, passing from an affected grandfather through a carrier daughter to an affected grandson.</li>',
        '<li>The trait can therefore appear to skip generations, passing from an affected grandfather through a carrier daughter to an affected grandson.</li>'],
      ['<li>Contrast autosomal recessive inheritance, where both parents must contribute and the sexes are affected equally.</li>',
        '<li>Contrast autosomal recessive inheritance, where an affected child inherits an altered allele from each parent, often from two unaffected carriers, and the sexes are affected equally.</li>']
    ],
    gone: ['The trait skips generations, with affected males having carrier mothers',
      'the absence of male-to-male transmission rules in X-linked inheritance',
      'only the mother needs to be a carrier', 'Females would need two copies',
      'almost always inherit the allele from a carrier mother', 'where both parents must contribute']
  },

  // ------------------------------------------------------------- Q16 bio-359
  {
    q: 16, id: 'bio-359', expectLetter: 'B',
    stemFull: 'Which amino-acid substitution in the mature β-globin chain produces hemoglobin S (HbS)?',
    explanation: [
      ['<p>Sickle cell disease results from a single nucleotide substitution (A→T) in the β-globin gene, changing codon 6 from GAG (glutamic acid) to GTG (valine). This substitution replaces a hydrophilic, charged amino acid with a hydrophobic one, causing hemoglobin S molecules to polymerize under low oxygen conditions, deforming red blood cells into a sickle shape.</p>',
        '<p>A single nucleotide substitution (A→T) in the β-globin gene changes codon 6 of the coding DNA from GAG (glutamic acid) to GTG (valine), and the haemoglobin produced is HbS. The substitution replaces a hydrophilic, charged amino acid with a hydrophobic one. Producing HbS is not the same as having sickle cell disease: one HbS allele alongside a normal allele (HbAS) is usually sickle cell trait, while sickle cell disease involves HbS together with another disease-causing HBB allele. Deoxygenation promotes HbS polymerization; red-cell dehydration also favors polymer formation by increasing the intracellular HbS concentration.</p>'],
      ['<li>Polymerisation occurs only when oxygen is low, which is why crises are provoked by hypoxia, dehydration and acidosis.</li>',
        '<li>Deoxygenation promotes polymerisation, and red-cell dehydration favours it too by raising the intracellular HbS concentration.</li>']
    ],
    gone: ['polymerize under low oxygen conditions', 'Polymerisation occurs only when oxygen is low']
  },

  // ------------------------------------------------------------- Q17 bio-360
  {
    q: 17, id: 'bio-360', expectLetter: 'C',
    stemFull: 'A man with hemophilia A (X<sup>h</sup>Y) and a heterozygous woman (X<sup>H</sup>X<sup>h</sup>) have children. What proportion of their daughters is expected to inherit X<sup>h</sup> from both parents?',
    explanation: [
      ['<p>The affected father (XhY) contributes Xh to all daughters. The carrier mother (XHXh) contributes either XH or Xh with equal probability. Therefore, daughters will be either XHXh (carrier, 1/2) or XhXh (affected, 1/2). Half of their daughters will be affected with hemophilia A.</p>',
        '<p>The father (X<sup>h</sup>Y) passes X<sup>h</sup> to every daughter. The heterozygous mother (X<sup>H</sup>X<sup>h</sup>) passes either X<sup>H</sup> or X<sup>h</sup> with equal probability. Daughters are therefore expected to be 1/2 X<sup>h</sup>X<sup>h</sup> and 1/2 X<sup>H</sup>X<sup>h</sup>, so half inherit X<sup>h</sup> from both parents. Heterozygous daughters are often unaffected, but some have low factor levels and bleeding symptoms.</p>'],
      ['<p><strong>B. 1/4:</strong> 1/4 would be the proportion of affected daughters if you counted among all children (sons and daughters combined). Among daughters specifically, the probability is 1/2 because the father always donates X<sup>h</sup>, and the mother (a carrier) donates either X<sup>H</sup> or X<sup>h</sup> with equal probability.</p>',
        '<p><strong>B. 1/4:</strong> 1/4 is the probability of a daughter with two altered alleles among ALL children, assuming equal probabilities of male and female offspring. It is not the answer among daughters specifically, where the father always donates X<sup>h</sup> and the mother donates either allele with equal probability, giving 1/2.</p>'],
      ['<p><strong>D. All:</strong> Not all daughters will be affected because the mother is a carrier (X<sup>H</sup> X<sup>h</sup>), not affected. Each daughter receives X<sup>h</sup> from the father for certain, but from the mother she has a 50% chance of receiving X<sup>H</sup> (making her a carrier) and a 50% chance of receiving X<sup>h</sup> (making her affected).</p>',
        '<p><strong>D. All:</strong> The mother is heterozygous (X<sup>H</sup>X<sup>h</sup>), so she transmits either allele with probability 1/2; her own symptom status is not the reason. Each daughter receives X<sup>h</sup> from her father for certain, but only half receive X<sup>h</sup> from their mother as well.</p>'],
      ['<li>This is the usual route to an affected daughter: she needs an affected father and at least a carrier mother.</li>',
        '<li>Females with two altered alleles are expected to have hemophilia, but heterozygous females can also have low factor levels and bleeding symptoms.</li>']
    ],
    gone: ['The affected father (XhY)', 'if you counted among all children', 'not affected. Each daughter receives',
      'she needs an affected father and at least a carrier mother']
  },

  // ------------------------------------------------------------- Q18 bio-361
  {
    q: 18, id: 'bio-361', expectLetter: 'C',
    stemFull: 'Which disorder classically shows genetic anticipation, a tendency toward earlier onset and/or greater severity in successive generations?',
    optionFull: [[2, 'Myotonic dystrophy type 1']],
    explanation: [
      ['<h4>Correct Answer: C. Myotonic dystrophy</h4><p>Myotonic dystrophy exhibits genetic anticipation, meaning the disease tends to become more severe and have an earlier age of onset in successive generations. This is caused by expansion of a CTG trinucleotide repeat in the DMPK gene; the number of repeats can increase during transmission from parent to child. Other trinucleotide repeat disorders (Huntington disease, Fragile X) also show anticipation. Sickle cell disease and PKU do not show this pattern.</p>',
        '<h4>Correct Answer: C. Myotonic dystrophy type 1</h4><p>Myotonic dystrophy type 1 classically shows genetic anticipation, meaning the disease tends toward earlier onset and greater severity in successive generations. It is caused by expansion of a CTG trinucleotide repeat in the DMPK gene, and the number of repeats can increase during transmission from parent to child. Other repeat-expansion disorders, such as Huntington disease and Fragile X syndrome, can also show anticipation. Sickle cell disease and PKU are not repeat-expansion disorders and do not classically show it.</p>'],
      ['<p><strong>A. Sickle cell disease:</strong> Sickle cell disease and pku do not show this pattern.</p>',
        '<p><strong>A. Sickle cell disease:</strong> Sickle cell disease results from disease-causing HBB variants, including the substitution that produces HbS. It is not a classic repeat-expansion disorder with genetic anticipation. Its severity can still vary among relatives.</p>'],
      ['<p><strong>B. Phenylketonuria:</strong> Phenylketonuria (PKU) is caused by a stable point mutation in the phenylalanine hydroxylase gene, not a trinucleotide repeat expansion. The disease severity does not increase across generations. It is an autosomal recessive metabolic disorder managed by dietary restriction of phenylalanine, detected through newborn screening programs worldwide.</p>',
        '<p><strong>B. Phenylketonuria:</strong> PKU is caused by pathogenic variants in PAH, not by a characteristic expanding repeat that produces anticipation. Severity depends on the variants and on treatment; it is not necessarily identical across generations. It is an autosomal recessive metabolic disorder managed by dietary restriction of phenylalanine and detected through newborn screening.</p>'],
      ['<p><strong>D. Albinism:</strong> Albinism is caused by stable mutations in genes involved in melanin synthesis (such as the TYR gene in oculocutaneous albinism type 1). Like PKU, it does not show anticipation because the mutation does not expand with each generation. The severity remains constant across affected family members.</p>',
        '<p><strong>D. Albinism:</strong> Albinism is a group of disorders affecting pigment production, for example through variants in the TYR gene in oculocutaneous albinism type 1. Severity can differ among relatives, but this variation is not the same as the characteristic repeat-expansion anticipation seen in myotonic dystrophy type 1.</p>'],
      ['<li>Anticipation means a disorder becomes more severe and begins earlier in successive generations.</li>',
        '<li>Anticipation is a tendency toward earlier onset and/or greater severity in successive generations.</li>'],
      ['<li>Myotonic dystrophy is caused by a CTG expansion in the DMPK gene.</li>',
        '<li>Myotonic dystrophy type 1 is caused by a CTG expansion in the DMPK gene.</li>'],
      ['<li>Disorders caused by stable point mutations, such as sickle cell disease and PKU, do not show anticipation.</li>',
        '<li>Disorders that are not caused by an expanding repeat, such as sickle cell disease and PKU, do not classically show anticipation.</li>']
    ],
    gone: ['Sickle cell disease and pku do not show this pattern', 'stable point mutation in the phenylalanine hydroxylase gene',
      'The severity remains constant across affected family members', 'caused by stable mutations in genes involved in melanin synthesis',
      'Disorders caused by stable point mutations']
  },

  // ------------------------------------------------------------- Q19 bio-362
  {
    q: 19, id: 'bio-362', expectLetter: 'B',
    stemFull: 'In a pedigree, a trait appears in successive generations, affects both males and females, and includes transmission from an affected father to his son. Most affected individuals have an affected parent. Which inheritance pattern is most consistent with these observations?',
    explanation: [
      ['<p>Autosomal dominant traits characteristically appear in every generation (no skipping), affect males and females equally, and affected individuals have at least one affected parent. Each child of an affected heterozygous parent has a 50% chance of inheriting the trait. Autosomal recessive traits often skip generations, X-linked recessive preferentially affects males, and mitochondrial inheritance shows maternal transmission only.</p>',
        '<p>Vertical transmission through successive generations, in both sexes, is typical of autosomal dominant inheritance, although it is not obligatory: reduced penetrance, age of onset and new variants can all alter the observed pattern. Each child of an affected heterozygous parent has a 50% chance of inheriting the dominant allele. Father-to-son transmission is the observation that settles the comparison here, because it argues against both X-linked and mitochondrial inheritance.</p>'],
      ['<p><strong>A. Autosomal recessive inheritance:</strong> In autosomal recessive inheritance, the trait often appears to skip generations because both parents must be carriers for an affected child to appear. Affected individuals typically have unaffected (carrier) parents, and the trait can seem to disappear and reappear in later generations. This pattern contrasts with the every-generation appearance described in the question.</p>',
        '<p><strong>A. Autosomal recessive inheritance:</strong> An autosomal recessive trait can also pass from father to son, so that observation does not prove dominance on its own. Such a trait more often appears in siblings born to unaffected carrier parents and seems to skip generations. The pedigree described here, with affected people in successive generations and most having an affected parent, is more suggestive of dominant inheritance.</p>'],
      ['<p><strong>D. Mitochondrial inheritance:</strong> Autosomal recessive traits often skip generations, x-linked recessive preferentially affects males, and mitochondrial inheritance shows maternal transmission only.</p>',
        '<p><strong>D. Mitochondrial inheritance:</strong> Mitochondrial DNA is ordinarily transmitted through the mother. An affected father does not pass his mitochondrial DNA to his son, so the paternal transmission described here argues against mitochondrial inheritance.</p>'],
      ['<li>Autosomal dominant traits appear in every generation, without skipping.</li>',
        '<li>Autosomal dominant traits typically appear in successive generations, although penetrance and age of onset can interrupt that pattern.</li>'],
      ['<li>Each child of an affected heterozygote has a 50% chance of inheriting the condition.</li>',
        '<li>Each child of an affected heterozygote has a 50% chance of inheriting the dominant allele; with an unaffected noncarrier other parent and full penetrance, that is also the chance of being affected.</li>'],
      ['<li>Contrast the alternatives: autosomal recessive skips generations, X-linked recessive favours males, and mitochondrial inheritance passes only through mothers.</li>',
        '<li>Contrast the alternatives: autosomal recessive often skips generations, X-linked recessive favours males and has no father-to-son transmission, and mitochondrial inheritance is ordinarily passed only by mothers.</li>']
    ],
    gone: ['appear in every generation (no skipping)', 'x-linked recessive preferentially affects males',
      'appear in every generation, without skipping', 'the every-generation appearance described in the question',
      'inheriting the condition']
  },

  // ------------------------------------------------------------- Q20 bio-363
  {
    q: 20, id: 'bio-363', expectLetter: 'C',
    explanation: [
      ['Tyrosinase deficiency causes albinism, homogentisic acid oxidase deficiency causes alkaptonuria',
        'Tyrosinase deficiency causes oculocutaneous albinism type 1, homogentisic acid oxidase deficiency causes alkaptonuria'],
      ['<p><strong>A. Tyrosinase:</strong> Tyrosinase deficiency causes albinism. Tyrosinase acts on tyrosine to make melanin - one step further along the same pathway - so the two conditions are related but distinct. In PKU the block lies before tyrosine is even formed.</p>',
        '<p><strong>A. Tyrosinase:</strong> Tyrosinase takes part in the multistep synthesis of melanin from tyrosine, so it acts further along the pathway rather than one step away from it. Its deficiency causes oculocutaneous albinism type 1. In PKU the block lies before tyrosine is formed, although dietary tyrosine and residual enzyme activity mean tyrosine is not completely absent.</p>'],
      ['<li>Treatment is dietary restriction of phenylalanine, which is why newborn screening matters so much - the damage is preventable but not reversible.</li>',
        '<li>Treatment is dietary restriction of phenylalanine with adequate nutrition and tyrosine, which is why newborn screening matters: early detection and treatment can prevent much of the neurologic injury, while delayed treatment can leave permanent impairment.</li>'],
      ['<li>Keep the related enzyme blocks distinct: tyrosinase causes albinism, homogentisate oxidase causes alkaptonuria, and branched-chain ketoacid dehydrogenase causes maple syrup urine disease.</li>',
        '<li>Keep the related enzyme blocks distinct: tyrosinase causes oculocutaneous albinism type 1, homogentisate oxidase causes alkaptonuria, and branched-chain ketoacid dehydrogenase causes maple syrup urine disease.</li>']
    ],
    gone: ['one step further along the same pathway', 'preventable but not reversible',
      'tyrosinase causes albinism,', 'Tyrosinase deficiency causes albinism']
  },

  // ------------------------------------------------------------- Q21 bio-364
  {
    q: 21, id: 'bio-364', expectLetter: 'C',
    explanation: [
      ['The presence of male-to-male transmission confirms autosomal inheritance. Both autosomal dominant and autosomal recessive patterns can show father-to-son transmission.</p>',
        'The presence of male-to-male transmission is compatible with autosomal or Y-linked inheritance. Both autosomal dominant and autosomal recessive patterns can show father-to-son transmission.</p>'],
      ['<p><strong>A. Autosomal dominant:</strong> Both autosomal dominant and autosomal recessive patterns can show father-to-son transmission.</p>',
        '<p><strong>A. Autosomal dominant:</strong> A father who is heterozygous for an autosomal dominant allele can transmit it to a son, because the gene sits on an autosome rather than on a sex chromosome. Father-to-son transmission therefore does not exclude this pattern.</p>'],
      ['<p><strong>B. Autosomal recessive:</strong> Both autosomal dominant and autosomal recessive patterns can show father-to-son transmission.</p>',
        '<p><strong>B. Autosomal recessive:</strong> An affected father with an autosomal recessive condition and a carrier mother can also have an affected son. Father-to-son transmission therefore does not exclude this pattern either, so it is not what the question asks to rule out.</p>'],
      ['<li>It points to autosomal inheritance, though on its own it does not distinguish dominant from recessive.</li>',
        '<li>It is compatible with autosomal inheritance, dominant or recessive, and also with Y-linked inheritance, so on its own it does not identify the pattern.</li>']
    ],
    gone: ['confirms autosomal inheritance', 'It points to autosomal inheritance']
  },

  // ------------------------------------------------------------- Q22 bio-365
  {
    q: 22, id: 'bio-365', expectLetter: 'B',
    explanation: [
      ['For example, BRCA1 mutations have approximately 70-80% penetrance for breast cancer, meaning 20-30% of carriers may never develop the disease.',
        'For example, women with a pathogenic BRCA1 variant have an increased lifetime risk of breast cancer, but developing it is not certain.'],
      ['<p><strong>A. The phenotype is always expressed in heterozygotes but with variable severity:</strong> This description fits variable expressivity, not incomplete penetrance. Variable expressivity means the phenotype is always present in individuals with the genotype, but its severity or manifestation varies among individuals. Incomplete penetrance, by contrast, means some individuals with the disease genotype show no phenotype at all. The two concepts are related but distinct.</p>',
        '<p><strong>A. The phenotype is always expressed in heterozygotes but with variable severity:</strong> Option A combines complete penetrance with variable expressivity: everyone described has the phenotype, but its severity varies. Variable expressivity itself describes differences among people who express a phenotype; it does not require complete penetrance, and the two phenomena can coexist.</p>'],
      ['<p><strong>D. The mutation has no phenotypic effect:</strong> If the mutation had no phenotypic effect at all, it would be a silent or neutral polymorphism, not a disease-causing mutation with incomplete penetrance. In incomplete penetrance, the mutation does cause disease in most carriers, but a proportion of genotype-positive individuals escape the phenotype due to modifying genes, environmental factors, or stochastic effects.</p>',
        '<p><strong>D. The mutation has no phenotypic effect:</strong> A variant with no phenotypic effect at all is a different situation from incomplete penetrance. With incomplete penetrance, some individuals with the variant express the phenotype and some do not, through the influence of modifying genes, environmental factors, or chance.</p>'],
      ['<li>Incomplete penetrance means some individuals carrying the disease genotype never express the phenotype at all.</li>',
        '<li>Incomplete penetrance means some individuals carrying the disease genotype do not express the phenotype in the population and time period being considered.</li>'],
      ['<li>It is a property measured across a population: the proportion of carriers who show the trait.</li>',
        '<li>Penetrance is defined for a specified phenotype and a specified age or time period: the proportion of carriers who show it.</li>']
    ],
    gone: ['70-80% penetrance', 'silent or neutral polymorphism', 'does cause disease in most carriers',
      'never express the phenotype at all', 'the phenotype is always present in individuals with the genotype']
  },

  // ------------------------------------------------------------- Q23 bio-366
  {
    q: 23, id: 'bio-366', expectLetter: 'C',
    explanation: [
      ['<p><strong>B. Random mating within the population:</strong> Random mating within the population is also one of the five Hardy-Weinberg assumptions. Non-random mating (like assortative mating) changes genotype frequencies, increasing homozygosity without changing allele frequencies.</p>',
        '<p><strong>B. Random mating within the population:</strong> Random mating within the population is also one of the five Hardy-Weinberg assumptions. Positive assortative mating and inbreeding can increase homozygosity without changing allele frequencies, while negative assortative mating can instead favour heterozygosity, so not every departure from random mating has the same effect.</p>'],
      ['<p><strong>D. No natural selection:</strong> The five assumptions are: (1) no mutation, (2) random mating, (3) no natural selection, (4) infinitely large population, and (5) no gene flow (migration).</p>',
        '<p><strong>D. No natural selection:</strong> No natural selection is one of the five assumptions, so it is not the exception the question asks for. In the model it means that the genotypes have equal reproductive success, so selection does not shift allele frequencies between generations.</p>'],
      ['<li>The model is a null hypothesis, and departures from it reveal which evolutionary force is actually operating.</li>',
        '<li>A departure from Hardy-Weinberg expectations suggests that one or more assumptions may not hold, but the departure alone does not identify the cause.</li>']
    ],
    gone: ['Non-random mating (like assortative mating) changes genotype frequencies',
      'departures from it reveal which evolutionary force is actually operating']
  },

  // ------------------------------------------------------------- Q24 bio-367
  {
    q: 24, id: 'bio-367', expectLetter: 'B',
    optionFull: [[3, 'Large populations under strong directional selection']],
    explanation: [
      ['Its impact is inversely proportional to population size: smaller populations experience greater random fluctuations in allele frequencies per generation.',
        'Drift is stronger in smaller populations, which experience greater random fluctuations in allele frequency from one generation to the next.'],
      ['<p><strong>A. Large populations with high genetic diversity:</strong> In large populations with high genetic diversity, random sampling effects are negligible because the large number of individuals means that allele frequencies remain stable from generation to generation. Genetic drift is inversely proportional to population size: the larger the population, the less impact random chance has on allele frequencies.</p>',
        '<p><strong>A. Large populations with high genetic diversity:</strong> Large population size reduces random sampling fluctuations, so drift has little effect. It does not guarantee stable allele frequencies, because selection, migration and other processes can still change them. Drift is simply not the dominant force here.</p>'],
      ['<p><strong>D. Populations under strong directional selection:</strong> When strong directional selection is operating, it dominates changes in allele frequency, pushing the population toward the favored phenotype. While drift still occurs, its effects are overwhelmed by selection in large populations. Drift becomes important relative to selection only when selection is weak or population size is very small.</p>',
        '<p><strong>D. Large populations under strong directional selection:</strong> Large population size limits drift, because random sampling fluctuations are small. Strong directional selection can meanwhile cause systematic change in allele frequency, pushing the population toward the favoured phenotype. Neither feature makes this the setting where drift has its greatest effect.</p>'],
      ['<li>Its magnitude is inversely related to population size, so small populations drift fastest.</li>',
        '<li>Drift is stronger in smaller populations, so they change fastest by chance alone; effective population size is the quantity that matters technically.</li>'],
      ['<li>Drift and selection differ fundamentally: selection is directional and fitness-based, whereas drift is random.</li>',
        '<li>Selection reflects nonrandom differences in reproductive success associated with heritable traits; drift reflects random sampling. Selection can be directional, stabilizing or otherwise maintain variation.</li>']
    ],
    gone: ['inversely proportional to population size', 'its effects are overwhelmed by selection',
      'inversely related to population size', 'selection is directional and fitness-based']
  }

];
