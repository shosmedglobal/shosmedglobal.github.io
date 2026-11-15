/**
 * Review batch 6, displayed Q13-Q24 (bio-273 .. bio-288).
 * Q17 (bio-279, Tt x Tt) and Q19 (bio-283, AB x O) are absent by design:
 * the review says KEEP UNCHANGED.
 */
'use strict';

module.exports = [

{
  q: 13, id: 'bio-273', expectLetter: 'B',
  stemFull: 'Which level of protein structure is stabilized primarily by hydrogen bonds between backbone carbonyl C=O groups and amide N-H groups, forming alpha helices and beta sheets?',
  explanation: [
    [`It describes how the subunits assemble and interact, stabilized by the same types of non-covalent forces as tertiary structure.`,
     `It describes how the subunits assemble and interact, stabilized by the same types of non-covalent forces as tertiary structure and sometimes by disulfide bonds between chains.`],
    [`<li>Crucially, secondary structure involves the backbone only - R groups are not responsible for it.</li>`,
     `<li>The characteristic hydrogen bonds are between backbone groups rather than side chains, although the side chains still influence which secondary structures form where.</li>`],
  ],
},

{
  q: 14, id: 'bio-274', expectLetter: 'B',
  stemFull: 'An enzyme follows Michaelis-Menten kinetics with a Kₘ of 2 mM and a Vₘₐₓ of 100 µmol/min. At a substrate concentration of 2 mM, what is the reaction velocity?',
  explanation: [
    [`<li>A low Kₘ indicates high apparent affinity; a high Kₘ indicates low affinity.</li>`,
     `<li>A low Kₘ means half-maximal rate is reached at a lower substrate concentration; a high Kₘ means a higher concentration is needed.</li>`],
    [`<p class='exp-key'>Bottom Line: Kₘ = substrate concentration at which V = ½Vₘₐₓ. Low Kₘ = high affinity.</p>`,
     `<p class='exp-key'>Bottom Line: Kₘ is the substrate concentration at which V = ½Vₘₐₓ. A low Kₘ means half-maximal rate at a lower substrate concentration.</p>`],
  ],
},

{
  q: 15, id: 'bio-275', expectLetter: 'B',
  explanation: [
    [`<tr><td>Noncompetitive</td><td>Unchanged</td><td>Decreased</td></tr>`,
     `<tr><td>Pure noncompetitive</td><td>Unchanged</td><td>Decreased</td></tr>`],
    [`<strong>C. Decrease Vₘₐₓ but NOT change Kₘ:</strong> Decreased Vmax with unchanged Km describes noncompetitive inhibition. A noncompetitive inhibitor binds to an allosteric site (not the active site) and reduces the number of functional enzyme molecules, lowering Vmax. Since it does not compete for the active site, it does not change the enzyme's apparent affinity for substrate (Km stays the same).`,
     `<strong>C. Decrease Vₘₐₓ but NOT change Kₘ:</strong> Decreased Vmax with unchanged Km describes PURE noncompetitive inhibition. In that special case the inhibitor binds the free enzyme and the enzyme-substrate complex equally well, so Vmax falls while the apparent Km is unchanged. Note that binding away from the active site does not by itself leave Km unchanged: a mixed inhibitor also binds away from the active site and does change the apparent Km.`],
    [`<li>Learn the three patterns together - competitive (Kₘ up, Vₘₐₓ same), non-competitive (Kₘ same, Vₘₐₓ down), uncompetitive (both down).</li>`,
     `<li>Learn the three patterns together - competitive (Kₘ up, Vₘₐₓ same), pure non-competitive (Kₘ same, Vₘₐₓ down), uncompetitive (both down).</li>`],
    [`<li>Non-competitive inhibitors bind an allosteric site on either free enzyme or the ES complex, so extra substrate does not help.</li>`,
     `<li>A pure non-competitive inhibitor binds a site away from the active site, and binds free enzyme and the ES complex equally well, so extra substrate does not help. When those two affinities differ the inhibition is mixed, and then the apparent Kₘ changes as well.</li>`],
  ],
},

{
  q: 16, id: 'bio-278', expectLetter: 'B',
  explanation: [
    [`<p>With 64 codons (4³) but only 20 amino acids + 3 stops, most amino acids have multiple codons. Variation usually occurs at the third (wobble) position. Degeneracy is NOT ambiguity - each codon specifies only one amino acid.</p>`,
     `<p>In the standard genetic code there are 64 codons (4³): 61 sense codons specify amino acids and three signal termination. With only 20 amino acids to encode, most of them have several codons, and the variation usually sits at the third (wobble) position. Degeneracy is not ambiguity: each sense codon specifies one amino acid, while several different codons may specify the same amino acid.</p>`],
    [`The genetic code is unambiguous, meaning each codon specifies only one amino acid.`,
     `The genetic code is unambiguous: each sense codon specifies one amino acid.`],
    [`<li>Degeneracy is not ambiguity: each codon specifies exactly one amino acid, so translation stays unambiguous.</li>`,
     `<li>Degeneracy is not ambiguity: each sense codon specifies exactly one amino acid, and three codons signal termination instead.</li>`],
  ],
},

{
  q: 18, id: 'bio-280', expectLetter: 'B',
  explanation: [
    [`Since ALL offspring are dominant, the parent must be homozygous dominant (AA).`,
     `All-dominant offspring support AA as the likely genotype. However, an Aa parent can produce an all-dominant sample by chance, especially when few offspring are observed.`],
    [`Since the question states ALL offspring show the dominant phenotype, the parent cannot be heterozygous. A testcross revealing 100% dominant offspring conclusively demonstrates a homozygous dominant (AA) parent.`,
     `Because every offspring shows the dominant phenotype, AA is the more likely genotype. A heterozygous parent could still produce an all-dominant sample by chance, particularly when few offspring are observed, so this result is strong evidence for AA rather than proof of it.`],
    [`<strong>C. Homozygous recessive:</strong> Key concept: a testcross reveals the genotype of a dominant-phenotype organism by crossing it with a homozygous recessive individual.`,
     `<strong>C. Homozygous recessive:</strong> A homozygous recessive (aa) parent would itself show the recessive phenotype. The stem describes a parent showing the dominant phenotype, so aa is ruled out before any offspring are counted.`],
    [`<li>Since every offspring shows the dominant phenotype, the tested parent is homozygous dominant.</li>`,
     `<li>Since every offspring shows the dominant phenotype, homozygous dominant is the most likely genotype for the tested parent.</li>`],
  ],
},

{
  q: 20, id: 'bio-284', expectLetter: 'B',
  explanation: [
    [`<strong>C. All pink:</strong> All offspring would be pink only if both parents were homozygous for different alleles (RR x WW), producing all RW heterozygotes.`,
     `<strong>C. All pink:</strong> All offspring are expected to be pink only if both parents are homozygous for different alleles (RR x WW), producing RW heterozygotes. A small sample from RW x RW could still happen to contain only pink offspring by chance.`],
    [`The RW x RW cross yields 1:2:1 (red:pink:white) because both parental alleles segregate independently.`,
     `The RW x RW cross yields 1:2:1 (red:pink:white) because each RW parent produces R and W gametes in equal expected proportions.`],
  ],
},

{
  q: 21, id: 'bio-285', expectLetter: 'C',
  explanation: [
    [`If mating is random and the population is large, allele frequencies remain stable.`,
     `If mating is random and the population is large, allele frequencies remain stable when the other Hardy-Weinberg assumptions also hold.`],
    [`If no selection acts on the trait, all genotypes have equal fitness and allele frequencies do not shift.`,
     `If no selection acts on the trait, all genotypes have equal fitness and allele frequencies do not shift, again when the other Hardy-Weinberg assumptions also hold.`],
    [`Mutations introduce new alleles into a population, changing allele frequencies. The absence of mutation keeps the allele pool stable.`,
     `Mutations introduce new alleles into a population, changing allele frequencies. The absence of mutation helps keep the allele pool stable when the other Hardy-Weinberg assumptions also hold.`],
    [`<li>Real populations rarely meet all five conditions, so departure from Hardy-Weinberg is the signal that some evolutionary process is at work.</li>`,
     `<li>Real populations rarely meet all five conditions. A departure from Hardy-Weinberg proportions tells us to examine which assumption is failing; it does not identify the cause. Nonrandom mating, for instance, can change genotype frequencies without changing allele frequencies.</li>`],
  ],
},

{
  q: 22, id: 'bio-286', expectLetter: 'C',
  explanation: [
    [`Note: this is 50% of SONS, not 50% of all children (only 25% of all children are affected sons).`,
     `Note: this is 50% of SONS. Assuming a son and a daughter are equally likely, that corresponds to 25% of all children being affected sons.`],
    [`<li>Watch the denominator: 50% of sons corresponds to 25% of all children.</li>`,
     `<li>Watch the denominator: if a son and a daughter are equally likely, 50% of sons corresponds to 25% of all children being affected sons.</li>`],
    [`<li>Every daughter receives the father's normal X, so none are affected, although half are carriers.</li>`,
     `<li>Every daughter receives her father's normal X. Half are expected to inherit their mother's hemophilia allele and be carriers; some carriers can also have bleeding symptoms.</li>`],
  ],
},

{
  q: 23, id: 'bio-287', expectLetter: 'B',
  explanation: [
    [`<strong>C. Half the daughters will be color blind:</strong> Half the daughters being color blind would require the mother to be a carrier (X<sup>C</sup> X<sup>c</sup>) rather than color blind (X<sup>c</sup> X<sup>c</sup>). Since the mother IS color blind, she can only pass X<sup>c</sup> to every daughter. All daughters receive X<sup>C</sup> from the normal father and X<sup>c</sup> from the mother, making them all carriers (X<sup>C</sup> X<sup>c</sup>), not half color blind.`,
     `<strong>C. Half the daughters will be color blind:</strong> In the standard model, 50% affected daughters would be expected from a carrier mother (X<sup>C</sup> X<sup>c</sup>) crossed with an affected father (X<sup>c</sup> Y). Changing only the mother to a carrier would not produce that result, because the father in this stem has normal vision. In the cross described, every daughter receives X<sup>C</sup> from her father and X<sup>c</sup> from her color-blind mother, making each daughter a carrier with normal vision.`],
    [`<li>A daughter can only be affected if her father is also affected, since she needs a recessive allele from each parent.</li>`,
     `<li>Under the standard X-linked recessive model in a person with two X chromosomes, a daughter is affected only if she receives an affected allele from each parent, which means her father must be affected too.</li>`],
  ],
},

{
  q: 24, id: 'bio-288', expectLetter: 'B',
  explanation: [
    [`<strong>C. 2/3:</strong> From a Cc × Cc cross, the probability of an affected (cc) offspring is 1/4 (25%). This option does not match the expected Mendelian ratio.`,
     `<strong>C. 2/3:</strong> 2/3 is the probability that a child is a carrier GIVEN that the child is unaffected, which is a different question. The probability of an affected (cc) child among all children from Cc × Cc is 1/4.`],
    [`<p class='exp-key'>Bottom Line: Autosomal recessive: both parents must be carriers (or affected). Carrier × carrier = 25% affected, 50% carriers, 25% unaffected.</p>`,
     `<p class='exp-key'>Bottom Line: Autosomal recessive: both parents must be carriers (or affected). Carrier × carrier gives 25% affected, 50% unaffected carriers, and 25% unaffected non-carriers; 75% are unaffected overall.</p>`],
  ],
},

];
