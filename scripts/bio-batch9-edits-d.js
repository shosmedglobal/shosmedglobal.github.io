/**
 * Biology review batch 9, displayed Q31-Q40 (bio-503 .. bio-512).
 * Every item in this range is edited; Q34 is one of the three major rewrites
 * and replaces its full option set.
 */
'use strict';

const Q34_EXPLANATION =
  '<h4>Correct Answer: Targeted testing examines selected genes, while broad genomic testing examines many genes or genome-wide patterns</h4>' +
  '<p>Tests can differ in the amount and type of genetic information they examine. A targeted test focuses on selected genes or variants relevant to a particular clinical question. Broader approaches survey many genes or genome-wide changes. Exome sequencing focuses mainly on protein-coding regions, genome sequencing examines DNA much more broadly, and chromosomal microarrays look for gains and losses of DNA across the genome. These are all forms of genetic testing; they do not detect exactly the same kinds of changes.</p>' +
  '<h4>Why the other choices are wrong:</h4>' +
  '<p><strong>A. Targeted testing examines the entire genome, while broad genomic testing examines only one gene:</strong> This reverses the intended comparison. Targeted testing concentrates on selected genes or variants, while broader testing surveys a larger range of genetic information.</p>' +
  '<p><strong>C. Targeted and broad genomic testing always examine exactly the same DNA regions:</strong> The approaches differ in scope and in the changes they can detect. For example, sequencing reads DNA sequence, whereas a chromosomal microarray primarily assesses gains and losses of DNA. Broader testing does not mean every possible genetic change will be detected.</p>' +
  '<p><strong>D. Broad genomic testing can only use cancer tissue, not blood samples:</strong> Broad testing can use DNA from blood, saliva or other suitable samples, depending on the clinical question and laboratory method. Tumor testing is one application, not the only use of genomic testing.</p>' +
  '<h4>Key Educational Points:</h4>' +
  '<ul><li>Test selection depends on the clinical question and the type of genetic change being sought.</li>' +
  '<li>Exome sequencing, genome sequencing and chromosomal microarrays examine different aspects of genetic variation.</li>' +
  '<li>Uncertain results can occur in both targeted and broad testing; broader tests can also reveal additional findings requiring counseling.</li></ul>' +
  '<p class=\'exp-key\'>Bottom Line: Targeted testing focuses on selected genes or variants; broad genomic approaches examine a wider range of information. Both fall within genetic testing.</p>';

module.exports = [
  // ---- Q31  bio-503  balanced reciprocal translocation ------------------
  {
    q: 31, id: 'bio-503', expectLetter: 'C',
    explanation: [
      ['<p>A balanced translocation carrier has no net gain or loss of genetic material, so they are usually phenotypically normal. However, during meiosis, the translocated chromosomes must segregate into gametes.',
        '<p>A balanced translocation has no large net gain or loss of chromosome material and often causes no health problems in the carrier. However, a breakpoint can sometimes disrupt a gene or its regulation. During meiosis, segregation of the rearranged chromosomes can produce unbalanced eggs or sperm, increasing the chance of pregnancy loss or an affected child. The translocated chromosomes must segregate into gametes.'],
      ['While the carrier is normal, their offspring are at significant risk for unbalanced chromosomal arrangements.',
        'While the carrier is usually healthy, their offspring are at significant risk for unbalanced chromosomal arrangements.'],
      ['<p><strong>D. The father must have a chromosomal disorder that has not yet manifested:</strong> Balanced translocation carriers are typically truly normal because they have the complete genome - just rearranged. They do not have a hidden disorder waiting to manifest. The issue is with meiotic segregation in their gametes, not with their own phenotype.</p>',
        '<p><strong>D. The father must have a chromosomal disorder that has not yet manifested:</strong> Being healthy is compatible with carrying a balanced rearrangement and does not mean that illness must appear later. The main concern in this scenario is the possibility of unbalanced chromosome material in offspring; the significance of a particular rearrangement depends on its breakpoints.</p>'],
      ['<li>Balanced translocation carriers: normal phenotype, risk to offspring</li>',
        '<li>Balanced translocation carriers usually have a normal phenotype but face an increased risk to their offspring</li>'],
      ['<p class=\'exp-key\'>Bottom Line: Balanced translocation carriers are phenotypically normal but have an increased risk of producing offspring with unbalanced chromosomal arrangements causing miscarriage or birth defects.</p>',
        '<p class=\'exp-key\'>Bottom Line: Balanced translocation carriers are usually phenotypically normal but have an increased risk of producing offspring with unbalanced chromosomal arrangements causing miscarriage or birth defects.</p>']
    ],
    keepHeadings: ['<strong>D. The father must have a chromosomal disorder that has not yet manifested:</strong>'],
    gone: ['so they are usually phenotypically normal', 'typically truly normal because they have the complete genome',
      'Balanced translocation carriers: normal phenotype']
  },

  // ---- Q32  bio-504  ethics of predictive testing (stem replaced) -------
  {
    q: 32, id: 'bio-504', expectLetter: 'B',
    stemFull: 'Which of the following is an especially important ethical consideration in predictive genetic testing, such as testing an asymptomatic adult for Huntington disease?',
    explanation: [
      ['<p>Predictive genetic testing for late-onset conditions like Huntington disease (HD) raises complex ethical issues: (1) psychological impact - learning one carries the HD gene (with 100% penetrance) when no cure exists can cause severe anxiety, depression, or suicidal ideation; (2) insurance discrimination - genetic information may be used by insurers or employers; (3) family implications - a positive result in one family member implies that a parent is also a carrier and siblings have a 50% risk, even if those family members have not consented to learn this information.</p>',
        '<p>Predictive testing can provide information about future disease risk before symptoms occur. Results can cause distress, affect personal and family decisions, and reveal risk to relatives who have not chosen to be tested. For Huntington disease, the significance of an HTT repeat expansion depends in part on its repeat length; not every disease-associated result has identical penetrance. Counseling should address what the test can predict, its limitations, confidentiality and the person\'s informed choice about whether to know.</p>'],
      ['<p><strong>A. The test may produce false-negative results due to lab error:</strong> While laboratory errors can occur with any test, this is not an ethical issue unique to predictive genetic testing. False-negative results are a general concern in all diagnostic testing, not a specific ethical dilemma of presymptomatic genetic testing.</p>',
        '<p><strong>A. The test may produce false-negative results due to lab error:</strong> Laboratory error is a general testing-quality concern that applies to many kinds of test. Option B addresses the personal and family implications that are especially relevant to predictive testing.</p>'],
      ['<p><strong>C. Predictive testing is not covered by any guidelines or regulations:</strong> Predictive genetic testing IS covered by guidelines and regulations. In many countries, laws like GINA (Genetic Information Nondiscrimination Act) in the US provide some protections. Professional organizations have established detailed protocols for predictive testing, especially for conditions like Huntington disease.</p>',
        '<p><strong>C. Predictive testing is not covered by any guidelines or regulations:</strong> Professional guidance and legal protections do exist, but their scope varies by country and type of insurance or employment. In the United States, GINA provides certain health-insurance and employment protections but does not itself cover life, disability or long-term-care insurance.</p>'],
      ['<p><strong>D. Positive results always lead to immediate and effective treatment:</strong> For many conditions tested predictively (like Huntington disease), there is currently no cure or effective treatment. This is actually part of the ethical dilemma - is it beneficial to inform someone of a condition for which no treatment exists? This statement is factually incorrect.</p>',
        '<p><strong>D. Positive results always lead to immediate and effective treatment:</strong> A positive predictive result does not guarantee an immediate preventive or curative treatment. Care may include counseling, monitoring, planning and treatment of symptoms. Lack of a cure is not the same as lack of useful care.</p>'],
      ['<ul><li>Huntington disease testing protocol requires pre-test and post-test genetic counseling</li>' +
        '<li>Testing of minors for adult-onset conditions is generally not recommended unless there is a medical intervention available</li>' +
        '<li>The right NOT to know one\'s genetic status is recognized as an ethical principle</li>' +
        '</ul>',
        '<ul><li>Predictive testing should be voluntary and supported by appropriate counseling before and after testing.</li>' +
        '<li>Testing minors for adult-onset conditions is generally deferred when the result provides no medical benefit during childhood.</li>' +
        '<li>People may choose not to learn their genetic risk; results can also have implications for relatives.</li></ul>'],
      ['<p class=\'exp-key\'>Bottom Line: Predictive genetic testing raises unique ethical issues including psychological harm, insurance discrimination, and unconsented disclosure of family members\' genetic status.</p>',
        '<p class=\'exp-key\'>Bottom Line: Predictive testing requires informed choice and attention to psychological effects, privacy, family implications and the limits of available protections.</p>']
    ],
    keepHeadings: ['<strong>A. The test may produce false-negative results due to lab error:</strong>',
      '<strong>C. Predictive testing is not covered by any guidelines or regulations:</strong>',
      '<strong>D. Positive results always lead to immediate and effective treatment:</strong>'],
    gone: ['an ethical consideration unique to predictive genetic testing', 'carries the HD gene',
      '100% penetrance', 'siblings have a 50% risk', 'not an ethical issue unique to predictive genetic testing',
      'raises unique ethical issues']
  },

  // ---- Q33  bio-505  congenital hypothyroidism --------------------------
  {
    q: 33, id: 'bio-505', expectLetter: 'B',
    explanation: [
      ['If untreated, thyroid hormone deficiency during the critical period of brain development leads to cretinism (irreversible intellectual disability, short stature, coarse facial features). Newborn screening detects elevated TSH (or low T4), and early initiation of levothyroxine (synthetic T4) replacement within the first 2 weeks of life leads to normal cognitive development.',
        'If untreated, thyroid hormone deficiency during the critical period of brain development causes irreversible intellectual disability, short stature and other developmental harm. Newborn screening detects a raised TSH or a low T4. Early and adequate treatment with levothyroxine (synthetic T4) can prevent severe developmental harm and usually supports normal growth and development.'],
      ['<p><strong>C. It only affects premature infants and resolves spontaneously:</strong> CH affects both term and preterm infants. While transient hypothyroidism can occur in premature infants (due to hypothalamic-pituitary immaturity), congenital hypothyroidism due to thyroid dysgenesis is permanent and does not resolve spontaneously. Lifelong treatment is required.</p>',
        '<p><strong>C. It only affects premature infants and resolves spontaneously:</strong> Congenital hypothyroidism can affect term or preterm infants, and it may be permanent or transient. A transient low thyroid-hormone measurement in a preterm infant is not the same disorder as permanent congenital hypothyroidism, which does not resolve spontaneously.</p>'],
      ['<p><strong>D. The treatment requires surgical intervention within 48 hours of birth:</strong> Treatment for congenital hypothyroidism is medical (oral levothyroxine), not surgical. Surgery is not part of the standard treatment. Levothyroxine is started once the diagnosis is confirmed and is continued lifelong.</p>',
        '<p><strong>D. The treatment requires surgical intervention within 48 hours of birth:</strong> Treatment is medical (oral levothyroxine), not surgical. Permanent congenital hypothyroidism requires long-term thyroid-hormone replacement. Some cases are transient, so the need for continuing treatment may be reassessed under specialist supervision. Screening matters because treatment must begin promptly when thyroid-hormone deficiency threatens development.</p>'],
      ['<li>Causes: thyroid dysgenesis (~85%), dyshormonogenesis (~10–15%), central hypothyroidism (rare)</li>',
        '<li>Main causes: abnormal thyroid development, impaired hormone synthesis and, less commonly, inadequate central stimulation</li>'],
      ['<li>Treatment goal: normalize TSH and maintain adequate T4 levels for normal brain development</li>',
        '<li>Treatment aims to restore adequate thyroid hormone for brain development; TSH alone is not sufficient to assess central hypothyroidism</li>']
    ],
    keepHeadings: ['<strong>C. It only affects premature infants and resolves spontaneously:</strong>',
      '<strong>D. The treatment requires surgical intervention within 48 hours of birth:</strong>'],
    gone: ['cretinism', 'leads to normal cognitive development', 'thyroid dysgenesis (~85%)',
      'Treatment goal: normalize TSH']
  },

  // ---- Q34  bio-506  targeted versus broad testing (MAJOR REWRITE) ------
  {
    q: 34, id: 'bio-506', expectLetter: 'B',
    stemFull: 'When comparing targeted gene testing with broad genomic testing, which statement is most accurate?',
    optionFull: [
      [0, 'Targeted testing examines the entire genome, while broad genomic testing examines only one gene'],
      [1, 'Targeted testing examines selected genes, while broad genomic testing examines many genes or genome-wide patterns'],
      [2, 'Targeted and broad genomic testing always examine exactly the same DNA regions'],
      [3, 'Broad genomic testing can only use cancer tissue, not blood samples']
    ],
    explanationFull: Q34_EXPLANATION,
    gone: ['A genetic counselor is explaining the difference between genetic testing and genomic testing',
      'Genetic testing typically examines one or a few specific genes for known mutations',
      'The prefix "genom-" implies the whole genome', 'Liquid biopsy', 'variants of uncertain significance (VUS)']
  },

  // ---- Q35  bio-507  when karyotyping helps (stem replaced) -------------
  {
    q: 35, id: 'bio-507', expectLetter: 'B',
    stemFull: 'Which scenario most strongly supports performing a karyotype as part of a genetic evaluation?',
    explanation: [
      ['<p>Karyotyping is indicated when a chromosomal abnormality is suspected. Multiple congenital anomalies (especially involving three or more organ systems) combined with ambiguous genitalia strongly suggest a chromosomal disorder. Karyotyping can identify numerical abnormalities (trisomies, monosomies), structural abnormalities (translocations, deletions, inversions), and sex chromosome anomalies that may explain the clinical presentation and guide management decisions about sex assignment.</p>',
        '<p>Multiple congenital anomalies and atypical genital development can raise concern for a chromosome abnormality. A karyotype can identify chromosome-number changes, such as trisomies and monosomies, and large structural rearrangements, such as translocations, deletions and inversions. It may form part of an evaluation that also uses clinical findings, hormone testing or other genetic tests. Smaller DNA changes may require other methods.</p>'],
      ['<p><strong>A. A 25-year-old man with seasonal allergies:</strong> Seasonal allergies (allergic rhinitis) are common conditions caused by immune hypersensitivity to environmental allergens, not by chromosomal abnormalities. There is no indication for karyotyping in this scenario.</p>',
        '<p><strong>A. A 25-year-old man with seasonal allergies:</strong> Seasonal allergies (allergic rhinitis) reflect immune hypersensitivity to environmental allergens. Allergic disease can have genetic contributions, but an isolated case like this does not by itself suggest a chromosome disorder requiring a karyotype.</p>'],
      ['<p><strong>C. A 40-year-old woman with type 2 diabetes:</strong> Type 2 diabetes is a complex multifactorial disease influenced by multiple genes and environmental factors (diet, exercise, obesity). It is not caused by a chromosomal abnormality detectable by karyotyping.</p>',
        '<p><strong>C. A 40-year-old woman with type 2 diabetes:</strong> Type 2 diabetes is a complex condition influenced by many genes and by environmental factors such as diet, activity and weight. Genetic factors contribute, but an isolated case does not by itself suggest a chromosome abnormality detectable by karyotyping.</p>'],
      ['<p><strong>D. A teenager with mild acne:</strong> Acne vulgaris is an extremely common condition caused by hormonal changes, sebaceous gland activity, and bacterial colonization. It has no association with chromosomal abnormalities and does not warrant karyotyping.</p>',
        '<p><strong>D. A teenager with mild acne:</strong> Acne vulgaris is very common and relates to hormonal changes, sebaceous gland activity and bacterial colonization. On its own it gives no reason to suspect a chromosome disorder, so it does not warrant a karyotype.</p>'],
      ['<li>Modern alternatives include FISH (for specific probes) and chromosomal microarray (for copy number variants)</li>',
        '<li>Other methods include FISH for specific probes and chromosomal microarray, which detects smaller copy-number changes; a balanced rearrangement may still require a karyotype</li>']
    ],
    keepHeadings: ['<strong>A. A 25-year-old man with seasonal allergies:</strong>', '<strong>C. A 40-year-old woman with type 2 diabetes:</strong>',
      '<strong>D. A teenager with mild acne:</strong>'],
    gone: ['A karyotype analysis is most commonly indicated for which', 'three or more organ systems',
      'guide management decisions about sex assignment', 'It has no association with chromosomal abnormalities',
      'It is not caused by a chromosomal abnormality detectable by karyotyping']
  },

  // ---- Q36  bio-508  bottleneck (stem replaced) -------------------------
  {
    q: 36, id: 'bio-508', expectLetter: 'C',
    stemFull: 'An earthquake reduces an island lizard population to 10% of its original size. Survival is unrelated to inherited differences among the lizards, and the survivors have different allele frequencies from the original population. This is an example of:',
    explanation: [
      ['In this scenario, the earthquake is a random event that does not select individuals based on a particular phenotype - it kills randomly. Therefore, the allele frequency change is due to chance (drift), not selection.',
        'The stem specifies that survival was unrelated to inherited differences among the lizards, so the change in allele frequencies is due to chance (drift) rather than selection.'],
      ['<li>Bottleneck effect = drastic population reduction → loss of genetic diversity</li>',
        '<li>Bottleneck effect = drastic population reduction, which often reduces genetic diversity</li>']
    ],
    gone: ['After an earthquake destroys 90% of a lizard population', 'it kills randomly',
      '→ loss of genetic diversity']
  },

  // ---- Q37  bio-509  founder effect (stem replaced) ---------------------
  {
    q: 37, id: 'bio-509', expectLetter: 'B',
    stemFull: 'A small group establishes a new community. By chance, the founders carry an allele for an inherited trait at a higher frequency than the population they came from. The allele is also relatively common among their descendants. This illustrates:',
    explanation: [
      ['<p>The founder effect occurs when a small group of individuals from a larger population establishes a new, isolated population. The allele frequencies of the founders may not be representative of the original population simply due to sampling error. If one or more of the original Amish founders happened to carry the allele for polydactyly, this allele could become disproportionately common in the descended population, especially with the small population size and endogamy (marrying within the community) typical of Amish groups.</p>',
        '<p>A new population founded by a small group may receive an unrepresentative sample of the original population\'s alleles. An allele can therefore be common in the new population simply because it was common among the founders, without providing a survival or reproductive advantage. Further drift can change its frequency over later generations.</p>'],
      ['<p><strong>A. Natural selection favoring polydactyly:</strong> Polydactyly does not provide a survival or reproductive advantage. Its high frequency in this community is due to the random composition of the founding group combined with genetic isolation, not because extra fingers confer fitness benefits. Natural selection would not increase the frequency of a trait without a selective advantage.</p>',
        '<p><strong>A. Natural selection favoring polydactyly:</strong> The stem specifies that the founders carried the allele by chance, not that the trait improves survival or reproduction. An allele\'s frequency can rise through founder sampling without conferring any advantage, so this scenario is not evidence of selection.</p>'],
      ['<p><strong>C. Disruptive selection:</strong> Disruptive (diversifying) selection favors both extremes of a trait at the expense of the intermediate phenotype (e.g., birds with very large or very small beaks surviving better than those with medium beaks). This is a form of natural selection and does not apply to the random allele frequency changes seen in founder populations.</p>',
        '<p><strong>C. Disruptive selection:</strong> Disruptive (diversifying) selection favors phenotypic extremes over intermediates, as when birds with very large or very small beaks do better than those with medium beaks. The stem does not describe that pattern.</p>'],
      ['<p><strong>D. Stabilizing selection:</strong> Stabilizing selection favors the intermediate phenotype and reduces variation (e.g., human birth weight - very large or very small babies have lower survival). This would actually work against an unusual trait like polydactyly, not increase its frequency.</p>',
        '<p><strong>D. Stabilizing selection:</strong> Stabilizing selection favors intermediate phenotypes, as with human birth weight. It is not a general process that removes every rare trait, and it is not what the stem describes.</p>'],
      ['<ul><li>The Amish community is a real-world example of the founder effect - elevated frequencies of several rare genetic conditions</li>' +
        '<li>Founder effect + small population + endogamy → amplification of rare alleles</li>' +
        '<li>Other examples: Afrikaner population (variegate porphyria), Pitcairn Islanders</li>' +
        '</ul>',
        '<ul><li>A population founded by a small group can show elevated frequencies of particular alleles, simply because of which founders were present</li>' +
        '<li>Mating within a community can increase relatedness and homozygosity, but that is inbreeding rather than drift, and it does not by itself require an allele\'s frequency to rise</li>' +
        '<li>A bottleneck is the other common route to drift: an existing population is sharply reduced, rather than a new one being founded by a few individuals</li></ul>']
    ],
    keepHeadings: ['<strong>A. Natural selection favoring polydactyly:</strong>', '<strong>C. Disruptive selection:</strong>',
      '<strong>D. Stabilizing selection:</strong>'],
    gone: ['A small group of Amish settlers establishes a new community', 'typical of Amish groups',
      'Pitcairn Islanders', 'Natural selection would not increase the frequency of a trait without a selective advantage',
      'work against an unusual trait like polydactyly']
  },

  // ---- Q38  bio-510  gene flow (stem replaced) --------------------------
  {
    q: 38, id: 'bio-510', expectLetter: 'B',
    stemFull: 'Migration followed by reproduction between two populations tends to:',
    explanation: [
      ['<p>Gene flow (migration) is the movement of alleles between populations through the migration of individuals or their gametes.',
        '<p>Gene flow is the movement of alleles between populations when migrating individuals, or their gametes, contribute to reproduction in the new population.'],
      ['<p><strong>C. Have no effect on the genetic composition of either population:</strong> Gene flow directly alters allele frequencies in both the source and receiving populations. Even low levels of gene flow (as few as one migrant per generation) can be enough to prevent significant genetic divergence between populations.</p>',
        '<p><strong>C. Have no effect on the genetic composition of either population:</strong> Gene flow can change allele frequencies when incoming individuals contribute alleles at different frequencies from those in the receiving population. It need not produce a detectable change in both populations, especially if their frequencies are already similar or movement is strongly one-way.</p>'],
      ['<p><strong>D. Cause both populations to undergo speciation simultaneously:</strong> Gene flow actually PREVENTS speciation by maintaining genetic similarity between populations. Speciation typically requires reproductive isolation - which means gene flow must be interrupted. This is why allopatric speciation (geographic separation) is so common: physical barriers stop gene flow.</p>',
        '<p><strong>D. Cause both populations to undergo speciation simultaneously:</strong> Gene flow often opposes divergence, but it neither causes simultaneous speciation nor makes speciation impossible. Reproductive barriers can develop despite some ongoing gene flow.</p>'],
      ['<li>Even 1 migrant per generation can prevent genetic differentiation due to drift alone</li>',
        '<li>The effect of gene flow depends on its rate, population sizes and other evolutionary forces</li>']
    ],
    keepHeadings: ['<strong>C. Have no effect on the genetic composition of either population:</strong>',
      '<strong>D. Cause both populations to undergo speciation simultaneously:</strong>'],
    gone: ['Migration of individuals between two populations tends to', 'one migrant per generation',
      'Even 1 migrant per generation', 'Gene flow actually PREVENTS speciation']
  },

  // ---- Q39  bio-511  selection and phenotypic variance (stem replaced) --
  {
    q: 39, id: 'bio-511', expectLetter: 'C',
    stemFull: 'In the standard comparison of selection patterns, which type favors both phenotypic extremes over intermediate individuals and tends to increase phenotypic variation?',
    explanation: [
      ['This increases phenotypic variance by creating a bimodal distribution - essentially splitting the population into two groups. Disruptive selection can, over time, lead to speciation if combined with reproductive isolation.',
        'This can increase phenotypic variation, and a distribution with two peaks can develop. Combined with reproductive isolation, disruptive selection can contribute to speciation.'],
      ['<p><strong>B. Directional selection:</strong> Directional selection shifts the population mean toward one extreme. While it changes the mean, it does not increase variance - it typically decreases variance somewhat as the population shifts. Example: antibiotic resistance increasing in a bacterial population under antibiotic pressure.</p>',
        '<p><strong>B. Directional selection:</strong> Directional selection favors one end of the distribution and tends to shift the mean. Its effect on variance can differ between situations; it is not the pattern of favoring both extremes described in the stem. Example: antibiotic resistance increasing in a bacterial population under antibiotic pressure.</p>'],
      ['<p><strong>D. All three types equally increase phenotypic variance:</strong> The three modes of selection have distinctly different effects on variance. Only disruptive selection increases variance; stabilizing selection decreases it; and directional selection shifts the mean without dramatically increasing variance.</p>',
        '<p><strong>D. All three types equally increase phenotypic variance:</strong> The three modes of selection have distinctly different effects. Stabilizing selection reduces the spread around an intermediate value, directional selection shifts the mean toward one extreme, and disruptive selection favors both extremes and can increase the spread.</p>'],
      ['<table class=\'exp-table\'><tr><th>Selection Type</th><th>Favors</th><th>Effect on Mean</th><th>Effect on Variance</th><th>Example</th></tr><tr><td>Stabilizing</td><td>Intermediate</td><td>No change</td><td>Decreases</td><td>Human birth weight</td></tr><tr><td>Directional</td><td>One extreme</td><td>Shifts</td><td>Slight decrease</td><td>Antibiotic resistance</td></tr><tr><td>Disruptive</td><td>Both extremes</td><td>May split</td><td>Increases</td><td>Beak size in finches</td></tr></table>',
        '<table class=\'exp-table\'><tr><th>Selection</th><th>Typical feature favored</th><th>Typical introductory pattern</th></tr><tr><td>Stabilizing</td><td>Intermediate phenotype</td><td>Reduced spread around an intermediate value</td></tr><tr><td>Directional</td><td>One extreme</td><td>Mean shifts toward that extreme; variance can change in different ways</td></tr><tr><td>Disruptive</td><td>Both extremes over intermediates</td><td>Increased spread or two peaks can develop</td></tr></table>'],
      ['<p class=\'exp-key\'>Bottom Line: Disruptive selection is the only mode of natural selection that increases phenotypic variance by favoring both extremes over the intermediate phenotype.</p>',
        '<p class=\'exp-key\'>Bottom Line: Disruptive selection favors both extremes over intermediate phenotypes and can increase phenotypic variation.</p>']
    ],
    keepHeadings: ['<strong>A. Stabilizing selection:</strong>', '<strong>B. Directional selection:</strong>',
      '<strong>D. All three types equally increase phenotypic variance:</strong>'],
    gone: ['Which type of selection increases phenotypic variance?', 'May split', 'Only disruptive selection increases variance',
      'is the only mode of natural selection that increases phenotypic variance', 'it does not increase variance']
  },

  // ---- Q40  bio-512  peacock ornaments ----------------------------------
  {
    q: 40, id: 'bio-512', expectLetter: 'B',
    explanation: [
      ['<p>The peacock\'s tail is a classic example of intersexual selection (mate choice), a form of sexual selection described by Charles Darwin. Female peahens preferentially mate with males having the most elaborate, symmetrical, and colorful tail displays. This female preference drives the evolution of increasingly ornate male plumage, even though the large tail may actually decrease survival (it attracts predators and is energetically costly). The trait persists because the reproductive advantage from female preference outweighs the survival disadvantage.</p>',
        '<p>The peacock\'s train is a classic example used to illustrate intersexual selection (mate choice), a form of sexual selection described by Charles Darwin. Female peahens preferentially mate with males having more elaborate, symmetrical and colorful displays. Female mate choice can favor male ornaments when those traits increase mating success, and an ornament may persist despite potential costs if its reproductive benefits are sufficient.</p>'],
      ['<p><strong>A. Stabilizing selection for average tail size:</strong> Stabilizing selection would favor intermediate tail sizes and eliminate both extreme lengths. The peacock\'s tail is EXTREME - far larger and more elaborate than needed for any practical function. This is the opposite of stabilizing selection; sexual selection has pushed the trait to an extreme.</p>',
        '<p><strong>A. Stabilizing selection for average tail size:</strong> The mechanism described is mate choice based on an ornament, not evidence that an intermediate tail size has the highest fitness. An elaborate trait on its own does not disprove stabilizing selection in every context.</p>'],
      ['<p><strong>C. Natural selection for improved flight ability:</strong> The peacock\'s elaborate tail actually IMPAIRS flight ability. It is heavy, creates drag, and limits maneuverability. This trait persists despite being detrimental to survival because the mating advantage it provides outweighs the survival cost. This tension between natural selection and sexual selection is a key concept in evolutionary biology.</p>',
        '<p><strong>C. Natural selection for improved flight ability:</strong> The benefit discussed here is mating success, not a demonstrated improvement in flight. Experimental work has not shown that the train impairs takeoff performance either, so it should not be described as preventing effective flight.</p>'],
      ['<p><strong>D. Genetic drift in a large population:</strong> Genetic drift has minimal effect in large populations - it is primarily significant in small populations. The peacock\'s tail is found consistently across the species and is clearly under directional sexual selection, not random chance. Genetic drift produces random fluctuations, not the consistent elaboration of a specific trait.</p>',
        '<p><strong>D. Genetic drift in a large population:</strong> Drift is random change in allele frequencies, whereas the mechanism proposed here involves nonrandom differences in mating success. Large populations can still experience drift, so a large population does not make drift impossible; drift simply does not explain the consistent elaboration of this ornament.</p>'],
      ['<li>The "handicap principle" (Zahavi): elaborate ornaments are honest signals of fitness - only healthy males can afford them</li>',
        '<li>The "handicap principle" (Zahavi) is one proposed explanation for honest signalling, not proof that only the healthiest males can produce every ornament</li>'],
      ['<li>Darwin\'s concept of sexual selection explains traits that seem maladaptive for survival but are advantageous for reproduction</li>',
        '<li>Sexual selection operates through differences in reproductive success, so it is part of natural selection in the broad sense rather than a separate opposing force</li>']
    ],
    keepHeadings: ['<strong>A. Stabilizing selection for average tail size:</strong>', '<strong>C. Natural selection for improved flight ability:</strong>',
      '<strong>D. Genetic drift in a large population:</strong>'],
    gone: ['it attracts predators and is energetically costly', 'actually IMPAIRS flight ability',
      'only healthy males can afford them', 'Genetic drift has minimal effect in large populations',
      'seem maladaptive for survival but are advantageous for reproduction']
  }
];
