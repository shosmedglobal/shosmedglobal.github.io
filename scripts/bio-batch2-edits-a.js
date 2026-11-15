/**
 * Batch 2 review, part A: displayed Q1-Q16 (Q9 and Q12 are KEEP items).
 * Spec shape is documented in apply-bio-review-batch2.js.
 */
'use strict';

module.exports = [

// ============================================================ Q1  bio-97
// Drift. The three distractor explanations were filler ("a different
// evolutionary concept"); the educational points were about natural selection,
// evidence for evolution and speciation, none of which this item tests.
{
  q: 1, id: 'bio-97', expectLetter: 'A',
  explanation: [
    ['The founder effect and population bottleneck are special cases of genetic drift in small populations.</p>',
     'The founder effect and the population bottleneck are special cases of drift in small populations. Drift acts in any finite population; isolation is not a requirement for it, but isolation removes the gene flow that would otherwise counteract it.</p>'],
    ['<p><strong>B. A population with high gene flow from neighboring populations:</strong> <em>A population with high gene flow from neighboring populations</em> is a different evolutionary concept. The correct answer is <em>A small, isolated population</em>, which matches the specific mechanism or principle described in the question. Understanding the distinction between these evolutionary concepts is important for exam success.</p>',
     '<p><strong>B. A population with high gene flow from neighboring populations:</strong> Gene flow transfers alleles between populations and tends to reduce the genetic differences between them. It is not the random sampling of alleles within a population that drift describes, and a steady arrival of migrants tends to swamp the chance changes drift produces rather than magnify them.</p>'],
    ['<p><strong>C. A very large, randomly mating population:</strong> <em>A very large, randomly mating population</em> is a different evolutionary concept. The correct answer is <em>A small, isolated population</em>, which matches the specific mechanism or principle described in the question. Understanding the distinction between these evolutionary concepts is important for exam success.</p>',
     '<p><strong>C. A very large, randomly mating population:</strong> Random sampling has a smaller proportional effect in a large population. Drift still occurs, but each generation&rsquo;s allele frequencies stay close to the last, so chance alone shifts them only slowly.</p>'],
    ['<p><strong>D. A population undergoing strong directional selection:</strong> <em>A population undergoing strong directional selection</em> is a different evolutionary concept. The correct answer is <em>A small, isolated population</em>, which matches the specific mechanism or principle described in the question. Understanding the distinction between these evolutionary concepts is important for exam success.</p>',
     '<p><strong>D. A population undergoing strong directional selection:</strong> Directional selection favours an allele because of its effect on survival and reproduction, so the direction of change is predictable. Drift changes frequencies by chance, with no reference to fitness. Both can act in the same population at the same time.</p>'],
    ['<ul><li>Natural selection acts on phenotypic variation within populations - individuals with traits better suited to their environment have higher reproductive success.</li><li>Evidence for evolution comes from multiple independent sources: fossil record, comparative anatomy (homologous structures), molecular biology (DNA/protein comparisons), and biogeography.</li><li>Speciation can occur through geographic isolation (allopatric) or within the same area through ecological or behavioral differences (sympatric).</li></ul><p class=\'exp-key\'>Bottom Line: Genetic drift is a non-adaptive evolutionary mechanism',
     '<ul><li>Genetic drift is change in allele frequency caused by the element of chance in which individuals reproduce and which of their alleles they pass on.</li><li>Its proportional effect is inversely related to population size, so it matters most in small populations.</li><li>Over enough generations drift can carry an allele to fixation (100%) or loss (0%) whether or not the allele is beneficial.</li><li>The founder effect is drift in a small group that starts a new population; a bottleneck is drift following a sharp reduction in numbers.</li><li>Drift requires only a finite population, not isolation. Isolation matters because it removes the gene flow that would otherwise oppose drift.</li></ul><p class=\'exp-key\'>Bottom Line: Genetic drift is a non-adaptive evolutionary mechanism'],
  ],
},

// ============================================================ Q2  bio-303
// Oogenesis timing. Meiosis I completes shortly BEFORE ovulation, not "at"
// it, and the first arrest does not end for every oocyte at puberty.
{
  q: 2, id: 'bio-303', expectLetter: 'D',
  explanation: [
    ['<p>In human oogenesis: meiosis I begins in fetal life but arrests at prophase I (dictyotene). At puberty, one oocyte per cycle completes meiosis I at ovulation, producing a secondary oocyte arrested at metaphase II. Meiosis II completes only upon sperm penetration (fertilization), producing the mature ovum and a second polar body.</p>',
     '<p>Primary oocytes enter meiosis before birth and arrest in prophase I (the dictyotene stage). From puberty onward, selected oocytes can resume meiosis, and the oocyte in the ovulatory follicle normally completes meiosis I shortly before ovulation, producing a secondary oocyte and the first polar body. That secondary oocyte is ovulated arrested in metaphase II. Fertilization normally triggers completion of meiosis II, producing the mature ovum and the second polar body.</p>'],
    ['<tr><td>Meiosis I begins</td><td>Fetal development</td></tr><tr><td>Arrest at prophase I</td><td>Fetal life through puberty</td></tr><tr><td>Meiosis I completes</td><td>Ovulation</td></tr><tr><td>Arrest at metaphase II</td><td>After ovulation</td></tr><tr><td>Meiosis II completes</td><td>Fertilization</td></tr>',
     '<tr><td>Meiosis I begins</td><td>Before birth</td></tr><tr><td>Arrest in prophase I</td><td>From before birth until that oocyte is selected, potentially for decades</td></tr><tr><td>Meiosis I completes</td><td>Shortly before ovulation, in the ovulatory follicle</td></tr><tr><td>Arrest in metaphase II</td><td>In the ovulated secondary oocyte</td></tr><tr><td>Meiosis II completes</td><td>At fertilization</td></tr>'],
    ['The primary oocytes remain arrested in prophase I from before birth until puberty, when hormonal signals (LH surge) trigger resumption of meiosis I in each ovulatory cycle.</p>',
     'A primary oocyte remains arrested in prophase I from before birth until it is selected in an ovulatory cycle, which may be decades later. Oocytes that are never selected stay arrested.</p>'],
    ['<p><strong>B. At puberty:</strong> At puberty, one oocyte per cycle completes meiosis i at ovulation, producing a secondary oocyte arrested at metaphase ii.</p>',
     '<p><strong>B. At puberty:</strong> Puberty does not complete meiosis II. From puberty onward the hormonal cycle allows selected oocytes to resume meiosis I, but the oocyte released at ovulation is arrested in metaphase II and finishes meiosis II only if a sperm fertilizes it.</p>'],
    ['<ul><li>Human oogenesis has two arrest points: prophase I, and metaphase II.</li><li>Meiosis I begins in fetal life and arrests at prophase I (dictyotene) for years to decades.</li><li>One oocyte per cycle completes meiosis I at ovulation, producing a secondary oocyte that arrests at metaphase II.</li><li>Meiosis II completes only on sperm penetration, releasing the second polar body.</li><li>The long prophase I arrest is the accepted explanation for the rising rate of nondisjunction with maternal age.</li></ul><p class=\'exp-key\'>Bottom Line: Oogenesis has two arrest points: prophase I (years) and metaphase II (until fertilization).</p>',
     '<ul><li>Human oogenesis has two arrest points: prophase I before birth, and metaphase II after ovulation.</li><li>Primary oocytes enter meiosis before birth and can stay arrested in prophase I for decades.</li><li>Usually one oocyte in an ovulatory cycle completes meiosis I, shortly before ovulation, giving a secondary oocyte arrested in metaphase II.</li><li>Fertilization triggers completion of meiosis II and release of the second polar body.</li><li>The very long prophase I arrest is one contributing context discussed for the rise in nondisjunction with maternal age, not the single established explanation.</li></ul><p class=\'exp-key\'>Bottom Line: Oogenesis has two arrest points: prophase I, which can last decades, and metaphase II, which ends only at fertilization.</p>'],
  ],
},

// ============================================================ Q3  bio-298
// "G1/S transition", "G1/S DNA-damage checkpoint" and "restriction point"
// were being used as interchangeable names. The CDC25 detail and the
// cancer-percentage statistic answer nothing here.
{
  q: 3, id: 'bio-298', expectLetter: 'B',
  explanation: [
    ['<p>At the G1/S transition (restriction point), cyclin E accumulates and binds CDK2, phosphorylating Rb protein and releasing E2F transcription factors that activate S-phase genes. CDK1-cyclin B is involved at G2/M, not G1/S. p53 is a tumor suppressor that <strong>inhibits</strong> cell cycle progression via p21 (a CDK inhibitor).</p>',
     '<p>At the G1/S transition, cyclin E accumulates and binds CDK2. The complex phosphorylates the Rb protein, releasing E2F transcription factors that switch on S-phase genes, so the cell commits to DNA replication. Cyclin E-CDK2 therefore promotes progression from G1 into S phase, while cyclin B-CDK1 promotes entry into mitosis. DNA damage can activate p53, which induces p21 and so inhibits cyclin-CDK activity.</p>'],
    ['<p><strong>A. CDK1-cyclin B drives entry into mitosis:</strong> CDK1-cyclin B (also called MPF, maturation-promoting factor) does indeed drive entry into mitosis, and this statement is actually TRUE. However, it does not answer the question being asked. CDK1-cyclin B promotes chromosome condensation, nuclear envelope breakdown, and spindle assembly. It is activated by dephosphorylation by CDC25 phosphatase.</p>',
     '<p><strong>A. CDK1-cyclin B drives entry into mitosis:</strong> CDK1-cyclin B (also called MPF, maturation-promoting factor) does drive entry into mitosis, so the statement is true in itself. It is the wrong answer because it describes the G2/M transition, not the G1/S checkpoint the question asks about. CDK1-cyclin B promotes chromosome condensation, breakdown of the nuclear envelope, and spindle assembly.</p>'],
    ['This allows time for DNA repair. Loss of p53 function is found in over 50% of human cancers.</p>',
     'This allows time for DNA repair before the cell commits to replicating its DNA.</p>'],
    ['<li>At the G1/S restriction point, cyclin E-CDK2 phosphorylates Rb, releasing E2F to transcribe S-phase genes.</li>',
     '<li>At the G1/S transition, cyclin E-CDK2 phosphorylates Rb, releasing E2F to transcribe S-phase genes.</li>'],
    ['<li>p53 halts the cycle through p21, a CDK inhibitor, when DNA damage is detected.</li><li>The restriction point is the commitment step: once past it, the cell completes the cycle independently of external growth signals.</li></ul>',
     '<li>p53 halts the cycle through p21, a CDK inhibitor, when DNA damage is detected.</li><li>Cyclin binding is not the only control: inhibitors such as p21 and p27 can switch a complex off even while its cyclin is present.</li></ul>'],
  ],
},

// ============================================================ Q4  bio-281
// The 1/16 answer depends on assumptions the stem never stated.
{
  q: 4, id: 'bio-281', expectLetter: 'A',
  stem: ['what fraction of offspring will show BOTH recessive phenotypes?',
         'what fraction of offspring will show BOTH recessive phenotypes? Assume the two genes assort independently, each shows complete dominance, and neither gene masks the effect of the other.'],
  explanation: [
    ['<p>By Mendel\'s law of independent assortment: probability of aa = 1/4 and probability of bb = 1/4. Probability of both recessive (aabb) = 1/4 × 1/4 = 1/16. The classic dihybrid phenotypic ratio is 9:3:3:1, where 1/16 = double recessive.</p>',
     '<p>Because the genes assort independently, each can be treated separately: P(aa) = 1/4 and P(bb) = 1/4, so P(aabb) = 1/4 &times; 1/4 = 1/16. With complete dominance at both genes and no interaction between them, that double-recessive genotype is also the only one showing both recessive phenotypes, which is the 1 in the classic 9:3:3:1 ratio. Those three assumptions are what make the simple multiplication valid; they are not true of every pair of genes.</p>'],
    ['<li>Independent assortment lets you treat each gene separately and multiply the separate probabilities.</li>',
     '<li>Independent assortment lets you treat each gene separately and multiply the separate probabilities.</li><li>The step from genotype to phenotype needs complete dominance at each gene and no interaction between the two genes.</li>'],
  ],
},

// ============================================================ Q5  bio-625
// Universal leg and body-region rules are brittle once larvae and fused body
// regions are included, and the choices mix taxonomic ranks.
{
  q: 5, id: 'bio-625', expectLetter: 'C',
  stemFull: 'A student collects an adult terrestrial arthropod with eight legs and two main body regions (cephalothorax and abdomen). This organism most likely belongs to which major arthropod group?',
  explanation: [
    ['<p>The combination of <strong>eight legs</strong> and <strong>two body segments</strong> (cephalothorax/prosoma and abdomen/opisthosoma) is diagnostic of arachnids. This class includes spiders, scorpions, ticks, and mites. Arachnids also lack antennae and wings, and possess chelicerae (fang-like mouthparts) and pedipalps.</p><table class=\'exp-table\'>',
     '<p>In an adult, the combination of <strong>eight legs</strong> (four pairs) and <strong>two main body regions</strong> (cephalothorax or prosoma, and abdomen or opisthosoma) points to the arachnids, a group that includes spiders, scorpions, ticks, and mites. Adult arachnids also have no antennae and no wings, and they carry chelicerae (fang-like mouthparts) and pedipalps. These are typical adult features: some arachnid larvae differ, and in several groups the body regions are partly fused.</p><table class=\'exp-table\'><caption>Typical adult characteristics</caption>'],
    ['<tr><th>Feature</th><th>Arachnida</th><th>Insecta</th><th>Crustacea</th><th>Chilopoda</th></tr><tr><td>Legs</td>',
     '<tr><th>Feature</th><th>Arachnida</th><th>Insecta</th><th>Crustacea</th><th>Chilopoda</th></tr><tr><td>Walking legs</td>'],
    ['<tr><td>Body segments</td><td>2</td><td>3</td><td>2-3</td><td>Many</td></tr>',
     '<tr><td>Main body regions</td><td>2</td><td>3</td><td>2-3</td><td>2 (head and long trunk)</td></tr>'],
    ['<li>The number of legs is the quickest way to distinguish major arthropod classes: 6 = insect, 8 = arachnid, 10+ = crustacean or myriapod.</li>',
     '<li>Use leg number together with antennae and body regions: typical adult arachnids have four pairs of walking legs and no antennae, insects have three pairs and one pair of antennae, and crustaceans have two pairs of antennae.</li>'],
    ['Bottom Line: Eight legs + two body segments + no antennae = Arachnida. Six legs + three body segments = Insecta.',
     'Bottom Line: In an adult: eight legs + two body regions + no antennae = Arachnida. Six legs + three body regions + one pair of antennae = Insecta.'],
  ],
},

// ============================================================ Q6  bio-323
// "Sheer abundance" is not an explanation, the unsourced gas ranking depends
// on what is being compared, and the permanent-dipole rule is wrong for CO2.
{
  q: 6, id: 'bio-323', expectLetter: 'C',
  explanation: [
    ['<p>While methane (CH₄) is a more potent greenhouse gas per molecule, CO₂ is the primary contributor to enhanced global warming due to its vastly higher atmospheric concentration from fossil fuel combustion, deforestation, and industrial processes. CO₂ absorbs and re-emits infrared radiation, trapping heat in the atmosphere.</p>',
     '<p>Human activities, chiefly burning fossil fuels, clearing forests, and making cement, have raised the atmospheric concentration of CO₂. CO₂ absorbs outgoing infrared radiation and re-emits part of it back toward the surface, and because it stays in the atmosphere for a long time its warming influence persists. Methane traps more heat per molecule, but CO₂ is responsible for the largest share of human-driven warming. Water vapour is a major greenhouse gas, but the amount the air holds is set largely by temperature, so water vapour mainly amplifies this warming as a feedback rather than driving it.</p>'],
    ['However, its contribution to the enhanced greenhouse effect is small compared to CO2, which is produced in vastly larger quantities by fossil fuel combustion.</p>',
     'Its contribution to the enhanced greenhouse effect is small compared with the contribution CO₂ makes to human-driven warming.</p>'],
    ['<p><strong>B. Nitrogen (N₂):</strong> Nitrogen (N2) makes up about 78% of the atmosphere but is NOT a greenhouse gas. N2 molecules are homonuclear diatomic molecules with no dipole moment, so they cannot absorb or re-emit infrared radiation. Greenhouse gases (CO2, CH4, N<sub>2</sub>O, H<sub>2</sub>O) have molecular structures that allow them to vibrate and absorb infrared energy.</p>',
     '<p><strong>B. Nitrogen (N₂):</strong> Nitrogen makes up about 78% of the atmosphere but is not a significant direct greenhouse gas. Its single vibration does not interact with infrared radiation, whereas several vibrations of CO₂, CH₄, N₂O and water vapour do. Abundance alone is therefore not enough: a gas also has to interact with the outgoing infrared radiation.</p>'],
    ['<p><strong>D. Argon (Ar):</strong> Argon (Ar) is an inert noble gas that makes up about 0.93% of the atmosphere. As a monatomic gas, it cannot absorb infrared radiation and has zero greenhouse effect. Noble gases are chemically unreactive and do not participate in atmospheric chemistry or climate change.</p>',
     '<p><strong>D. Argon (Ar):</strong> Argon is a monatomic noble gas making up about 0.93% of the atmosphere. A single atom has no vibrations to excite, so argon does not absorb infrared radiation and is not a significant direct greenhouse gas in this context.</p>'],
    ['<ul><li>CO₂ is the primary driver of the enhanced greenhouse effect, because of its sheer atmospheric abundance.</li><li>Methane traps more heat per molecule, but is present at far lower concentration - potency and total contribution are different questions.</li><li>Human CO₂ comes chiefly from fossil fuel combustion, deforestation, and cement production.</li><li>Greenhouse gases work by absorbing and re-emitting infrared radiation, trapping outgoing heat.</li><li>The natural greenhouse effect is essential to a habitable Earth; it is the enhancement from emissions that causes warming.</li></ul><p class=\'exp-key\'>Bottom Line: Greenhouse gases in order of contribution to warming: CO₂ > CH₄ > N₂O > fluorinated gases. The greenhouse effect itself is natural and necessary; the enhanced effect from human emissions causes warming.</p>',
     '<ul><li>Human activities raise atmospheric CO₂, which absorbs outgoing infrared radiation and warms the lower atmosphere.</li><li>CO₂ accounts for the largest share of human-driven warming. That is a different claim from being the most potent per molecule.</li><li>Methane traps more heat per molecule but sits at a far lower concentration, so potency and total contribution are separate questions.</li><li>Water vapour is a major greenhouse gas, but mainly amplifies warming as a feedback, because warmer air holds more of it.</li><li>The natural greenhouse effect keeps Earth habitable; it is the enhancement from human emissions that causes warming.</li></ul><p class=\'exp-key\'>Bottom Line: CO₂ is the largest contributor to human-driven warming because human activity has raised its concentration and it absorbs outgoing infrared radiation. The greenhouse effect itself is natural and necessary; it is the enhancement from emissions that causes warming.</p>'],
  ],
},

// ============================================================ Q7  bio-450
// "Allosteric" is not a synonym for "noncompetitive", denaturation is not the
// same as irreversible inhibition, and an inhibitor does not change the
// activation energy of the uncatalysed reaction.
{
  q: 7, id: 'bio-450', expectLetter: 'A',
  explanation: [
    ['<p>A competitive inhibitor has a molecular shape similar to the substrate and competes for the same active site on the enzyme. When the inhibitor occupies the active site, the substrate cannot bind. Importantly, competitive inhibition can be overcome by increasing substrate concentration, which outcompetes the inhibitor for active site access.</p>',
     '<p>In the standard model, a competitive inhibitor resembles the substrate closely enough to bind the enzyme&rsquo;s active site, so the two molecules compete for the same site. While the inhibitor occupies the active site, the substrate cannot bind. Because the outcome depends on their relative concentrations, reversible competitive inhibition can be overcome by raising the substrate concentration.</p>'],
    ['<p><strong>B. Binding to an allosteric site:</strong> This describes non-competitive (allosteric) inhibition, where the inhibitor binds elsewhere and alters enzyme conformation. It cannot be overcome by adding more substrate.</p>',
     '<p><strong>B. Binding to an allosteric site:</strong> Binding at a site separate from the active site is allosteric regulation. &ldquo;Allosteric&rdquo; describes where and how the regulation happens; it is not another name for the kinetic category &ldquo;noncompetitive&rdquo;. What this option describes is therefore a different kind of regulation from the competition the question asks about.</p>'],
    ['<p><strong>C. Permanently denaturing the enzyme:</strong> This describes irreversible inhibition (e.g., heavy metals, nerve gas). Competitive inhibition is typically reversible.</p>',
     '<p><strong>C. Permanently denaturing the enzyme:</strong> Denaturation disrupts the protein&rsquo;s folded structure, so the enzyme loses activity altogether rather than being outcompeted for its active site. Note also that denaturation and irreversible inhibition are not the same thing: an irreversible inhibitor can bind tightly to an enzyme that is still correctly folded. Competitive inhibition in the standard model is reversible.</p>'],
    ['<p><strong>D. Increasing activation energy:</strong> Inhibitors do not increase activation energy - enzymes lower it. Inhibitors work by blocking or distorting the active site.</p><p class=\'exp-key\'>Bottom Line: Competitive inhibition increases apparent Km (lower apparent affinity) but Vmax remains unchanged (achievable with enough substrate). Non-competitive inhibition decreases Vmax but Km stays the same.</p>',
     '<p><strong>D. Increasing activation energy:</strong> In the usual competitive model the inhibitor reduces the substrate&rsquo;s access to the active site. It does not change the activation energy of the uncatalysed reaction, which is a property of the reaction itself. An enzyme works by offering a path with a lower activation energy; blocking the enzyme simply leaves the uncatalysed path as it was.</p><p class=\'exp-key\'>Bottom Line: Reversible competitive inhibition raises the apparent Km (the substrate concentration giving half the maximum rate) and leaves Vmax (the maximum rate) unchanged, so enough substrate can overcome it. Pure noncompetitive inhibition lowers Vmax while leaving Km unchanged.</p>'],
  ],
},

// ============================================================ Q8  bio-267
// Absolutes ("all mRNAs", intron retention always nonfunctional), and three
// educational points about the central dogma that teach nothing about
// processing. The snRNA roll-call is not needed to answer this.
{
  q: 8, id: 'bio-267', expectLetter: 'C',
  explanation: [
    ['<p>Eukaryotic pre-mRNA processing: (1) 5\' cap (7-methylguanosine) for protection and ribosome binding; (2) 3\' poly-A tail (~200 adenines) for stability and nuclear export; (3) Splicing by the spliceosome to remove introns.</p>',
     '<p>A typical eukaryotic pre-mRNA is processed in three ways. A 5&prime; cap of 7-methylguanosine is added, which protects the transcript and helps the ribosome find it. Introns are removed and the exons joined by the spliceosome. Most mature mRNAs then receive a 3&prime; poly(A) tail of roughly 200 adenines, which adds stability and helps the transcript leave the nucleus.</p>'],
    ['Alternative splicing can include or exclude certain exons, allowing one gene to produce multiple protein variants. Intron retention would produce a nonfunctional protein in most cases.</p>',
     'Alternative splicing can include or skip particular exons, so one gene can give more than one mature mRNA and more than one protein isoform.</p>'],
    ['<p><strong>D. Splicing is performed by DNA polymerase:</strong> Splicing is performed by the spliceosome, a large ribonucleoprotein complex composed of five small nuclear RNAs (snRNAs: U1, U2, U4, U5, U6) and associated proteins. DNA polymerase is involved in DNA replication, not RNA processing. The spliceosome recognizes conserved splice site sequences (GU at the 5\' splice site, AG at the 3\' splice site) to precisely excise introns.</p>',
     '<p><strong>D. Splicing is performed by DNA polymerase:</strong> Splicing is carried out by the spliceosome, a complex of small nuclear RNAs and proteins. DNA polymerase synthesizes DNA and has no part in RNA processing. The spliceosome recognizes conserved sequences at the two ends of an intron (GU at the 5&prime; splice site, AG at the 3&prime; splice site) and cuts there, so the exons can be joined precisely.</p>'],
    ['<ul><li>The central dogma of molecular biology describes information flow: DNA is transcribed to mRNA, which is translated to protein.</li><li>Eukaryotic gene expression is regulated at multiple levels: chromatin remodeling, transcription, post-transcription (splicing), translation, and post-translation.</li><li>Mutations in DNA can be silent, missense, nonsense, or frameshift - each with different impacts on protein structure and function.</li></ul><p class=\'exp-key\'>Bottom Line: 5\' = 7-methylguanosine cap; 3\' = poly-A tail. Introns are removed, not retained.</p>',
     '<ul><li>The 5&prime; cap of 7-methylguanosine protects the transcript from degradation and helps the ribosome bind it.</li><li>The 3&prime; poly(A) tail adds stability and helps the mRNA leave the nucleus.</li><li>Splicing removes introns and joins exons, so the coding sequence arriving at the ribosome is continuous.</li><li>Cap and tail sit on opposite ends: cap at the 5&prime; end, tail at the 3&prime; end. Swapping them is a common exam trap.</li></ul><p class=\'exp-key\'>Bottom Line: 5&prime; = 7-methylguanosine cap; 3&prime; = poly(A) tail. Introns are removed, not retained.</p>'],
  ],
},

// ============================================================ Q10 bio-105
// Three filler distractors and three educational points about evolution in
// general rather than about adaptive radiation.
{
  q: 10, id: 'bio-105', expectLetter: 'B',
  explanation: [
    ['<p><strong>A. Punctuated equilibrium:</strong> <em>Punctuated equilibrium</em> is a different evolutionary concept. The correct answer is <em>Adaptive radiation</em>, which matches the specific mechanism or principle described in the question. Understanding the distinction between these evolutionary concepts is important for exam success.</p>',
     '<p><strong>A. Punctuated equilibrium:</strong> Punctuated equilibrium describes a pattern in the fossil record: long periods of relative stasis interrupted by comparatively rapid evolutionary change. It is a claim about the tempo of change, and it does not specifically mean diversification into different niches.</p>'],
    ['<p><strong>C. Genetic assimilation:</strong> <em>Genetic assimilation</em> is a different evolutionary concept. The correct answer is <em>Adaptive radiation</em>, which matches the specific mechanism or principle described in the question. Understanding the distinction between these evolutionary concepts is important for exam success.</p>',
     '<p><strong>C. Genetic assimilation:</strong> Genetic assimilation describes a phenotype that was at first produced in response to the environment coming to be expressed without that environmental trigger, through evolutionary change. That is not the diversification described in the question.</p>'],
    ['<p><strong>D. Gradualism:</strong> <em>Gradualism</em> is a different evolutionary concept. The correct answer is <em>Adaptive radiation</em>, which matches the specific mechanism or principle described in the question. Understanding the distinction between these evolutionary concepts is important for exam success.</p>',
     '<p><strong>D. Gradualism:</strong> Gradualism describes evolutionary change accumulating in small steps over long periods. Like punctuated equilibrium it concerns tempo, and it does not specifically describe one ancestral lineage producing many niche-specialized descendants.</p>'],
    ['<ul><li>Natural selection acts on phenotypic variation within populations - individuals with traits better suited to their environment have higher reproductive success.</li><li>Evidence for evolution comes from multiple independent sources: fossil record, comparative anatomy (homologous structures), molecular biology (DNA/protein comparisons), and biogeography.</li><li>Speciation can occur through geographic isolation (allopatric) or within the same area through ecological or behavioral differences (sympatric).</li></ul>',
     '<ul><li>Adaptive radiation begins from one ancestral lineage, so the resulting species share recent common ancestry.</li><li>The descendants diverge by specializing on different ecological niches: different foods, habitats, or ways of moving.</li><li>It requires ecological opportunity: unoccupied niches, as on a newly colonized island, or niches emptied by a mass extinction.</li><li>Darwin&rsquo;s finches, the cichlids of the African lakes, and the mammals that radiated after the dinosaurs are the standard examples.</li></ul>'],
  ],
},

// ============================================================ Q11 bio-266
// Sound calculation, educational points about gene expression.
{
  q: 11, id: 'bio-266', expectLetter: 'B',
  explanation: [
    ['<ul><li>The central dogma of molecular biology describes information flow: DNA is transcribed to mRNA, which is translated to protein.</li><li>Eukaryotic gene expression is regulated at multiple levels: chromatin remodeling, transcription, post-transcription (splicing), translation, and post-translation.</li><li>Mutations in DNA can be silent, missense, nonsense, or frameshift - each with different impacts on protein structure and function.</li></ul>',
     '<ul><li>In double-stranded DNA, A = T and G = C. These are Chargaff&rsquo;s rules, and they follow from complementary base pairing.</li><li>All four base percentages add up to 100%.</li><li>So A = 20% gives T = 20%; A + T = 40%, leaving 60% for G + C; and since G = C, each is 30%.</li></ul>'],
  ],
},

// ============================================================ Q13 bio-252
// Educational reframe: the sorting principle is worth teaching, but the item
// asked for specialist disease knowledge. The mechanism moves into the stem,
// and the implausible "Golgi undergoes apoptosis" option is replaced.
{
  q: 13, id: 'bio-252', expectLetter: 'B',
  stemFull: 'Mannose-6-phosphate tags normally help direct newly made digestive enzymes from the Golgi apparatus to lysosomes. In a cell that cannot add these tags, what is the most likely consequence?',
  optionFull: [[2, 'The enzymes are redirected to mitochondria']],
  headingsGone: ['C. The Golgi apparatus will undergo apoptosis:'],
  explanation: [
    ['<p>In I-cell disease, the enzyme N-acetylglucosamine phosphotransferase is deficient, preventing the addition of mannose-6-phosphate (M<sub>6</sub>P) tags to lysosomal enzymes in the Golgi. Without M<sub>6</sub>P tags, these enzymes are not recognized by M<sub>6</sub>P receptors and follow the default secretory pathway, being released outside the cell. The lysosomes become filled with undigested substrates (inclusion bodies).</p>',
     '<p>The tag is an address label. Without mannose-6-phosphate (M<sub>6</sub>P), the M<sub>6</sub>P receptors in the Golgi cannot capture these enzymes, so many of them stay in the default pathway and are released from the cell instead of being delivered to lysosomes. Lysosomes therefore receive less digestive enzyme, less material is broken down inside them, and undegraded material accumulates as inclusion bodies. I-cell disease (mucolipidosis II) is a named example, in which the enzyme that adds the tag is deficient.</p>'],
    ['<p><strong>A. Lysosomes will contain excess hydrolytic enzymes:</strong> In I-cell disease, lysosomes actually become depleted of hydrolytic enzymes, not filled with excess. Because enzymes lack the mannose-6-phosphate tag, they are mistakenly secreted out of the cell instead of being delivered to lysosomes. The lysosomes fill with undigested substrates (inclusion bodies, hence "I-cell"), not with enzymes.</p>',
     '<p><strong>A. Lysosomes will contain excess hydrolytic enzymes:</strong> The lysosomes end up with less hydrolytic enzyme, not more. Because many enzymes lack the tag, they are released from the cell instead of being delivered, and what fills the lysosomes is undigested material (inclusion bodies, hence the name I-cell), not enzyme.</p>'],
    ['<p><strong>C. The Golgi apparatus will undergo apoptosis:</strong> The Golgi apparatus does not undergo apoptosis in I-cell disease. The Golgi continues to function normally in terms of protein processing and sorting; the defect lies specifically in the failure to add the M<sub>6</sub>P tag (due to deficient N-acetylglucosamine phosphotransferase). Without this tag, enzymes follow the default secretory pathway rather than being sorted to lysosomes.</p>',
     '<p><strong>C. The enzymes are redirected to mitochondria:</strong> Losing a lysosomal sorting tag does not supply a mitochondrial targeting signal. Proteins reach mitochondria because they carry their own targeting sequence, which these enzymes do not have. Removing one address does not create a different one; the enzymes simply stay on the default route out of the cell.</p>'],
    ['<p><strong>D. Peroxisomes will compensate by increasing catalase production:</strong> Peroxisomes do not compensate for lysosomal dysfunction by increasing catalase production. Peroxisomes and lysosomes have distinct and non-overlapping functions: peroxisomes handle oxidative reactions and very long-chain fatty acid breakdown, while lysosomes handle hydrolytic degradation of macromolecules. One organelle cannot substitute for the other.</p>',
     '<p><strong>D. Peroxisomes will compensate by increasing catalase production:</strong> Peroxisomal catalase breaks down hydrogen peroxide. It cannot carry out the hydrolytic digestion of proteins, lipids and sugars that the missing lysosomal enzymes perform, so making more catalase would not compensate for their absence.</p>'],
    ['<ul><li>Mannose-6-phosphate is the address tag that directs newly made enzymes from the Golgi to lysosomes.</li><li>The tag is added in the Golgi by N-acetylglucosamine phosphotransferase; loss of that enzyme causes I-cell disease.</li><li>Without the tag, M6P receptors cannot capture the enzymes, so they follow the default secretory route and are released from the cell.</li><li>The result is the characteristic paradox: high hydrolase levels in the blood alongside lysosomes full of undigested material (inclusion bodies).</li><li>The general principle is that proteins carry sorting signals - losing the signal misroutes the protein rather than destroying it.</li></ul><p class=\'exp-key\'>Bottom Line: Mannose-6-phosphate serves as a molecular address tag that directs enzymes from the Golgi to lysosomes via M<sub>6</sub>P receptor-mediated sorting.</p>',
     '<ul><li>Newly made proteins carry sorting signals, and those signals decide where in the cell each protein ends up.</li><li>Mannose-6-phosphate is the signal that directs many lysosomal enzymes from the Golgi to lysosomes.</li><li>Without the tag the receptors cannot capture the enzymes, so they stay on the default route and leave the cell. The protein is misdirected, not destroyed.</li><li>The consequence is reduced digestion inside lysosomes, so undegraded material accumulates there as inclusion bodies.</li><li>I-cell disease (mucolipidosis II) is a named example of this sorting failure.</li></ul><p class=\'exp-key\'>Bottom Line: Losing a sorting tag misroutes a protein rather than destroying it. Without mannose-6-phosphate, many lysosomal enzymes leave the cell and lysosomes fill with undigested material.</p>'],
  ],
},

// ============================================================ Q14 bio-579
// "64-72 days" is narrower than the published range, and "mature spermatozoon"
// blurred testicular formation with epididymal maturation.
{
  q: 14, id: 'bio-579', expectLetter: 'C',
  stemFull: 'Approximately how long does human spermatogenesis take within the testes, before further maturation in the epididymis?',
  optionFull: [[2, 'About 2-2.5 months']],
  headingsGone: ['Correct Answer: 64-72 days'],
  explanation: [
    ['<h4>Correct Answer: 64-72 days</h4><p>The complete process of spermatogenesis - from the initial mitotic division of a spermatogonium through meiosis and spermiogenesis (morphological maturation of spermatids into spermatozoa) - takes approximately 64-72 days in humans. This is followed by an additional 10-14 days for sperm transit and maturation through the epididymis.</p>',
     '<h4>Correct Answer: About 2-2.5 months</h4><p>Commonly taught estimates for spermatogenesis within the testes, from the first mitotic division of a spermatogonium through meiosis and spermiogenesis (the shaping of spermatids into spermatozoa), are roughly 64 to 74 days, which is about 2 to 2.5 months. Published figures vary, so treat this as a working estimate rather than an exact biological cutoff. Sperm then spend further time passing through the epididymis, where they gain motility and the ability to fertilize.</p>'],
    ['<p><strong>A. 14 days:</strong> 14 days is far too short. This is approximately the length of the follicular or luteal phase of the female menstrual cycle, not the duration of spermatogenesis.</p>',
     '<p><strong>A. 14 days:</strong> Two weeks is far too short for the whole sequence of mitotic divisions, meiosis and spermiogenesis, which takes roughly 2 to 2.5 months within the testes.</p>'],
    ['<p><strong>B. 28 days:</strong> 28 days corresponds roughly to the length of one menstrual cycle. Spermatogenesis takes more than twice as long as this.</p>',
     '<p><strong>B. 28 days:</strong> Four weeks is still well under the commonly taught estimate. Spermatogenesis within the testes takes roughly twice to two and a half times this long.</p>'],
    ['<p><strong>D. 120 days:</strong> 120 days (~4 months) is the approximate lifespan of a mature red blood cell. While sperm production is a continuous process, the development time of individual sperm is 64-72 days, not 120 days.</p>',
     '<p><strong>D. 120 days:</strong> About four months is longer than the usual estimate. Sperm production runs continuously, but an individual sperm takes roughly 2 to 2.5 months to develop within the testes.</p>'],
    ['<ul><li>Spermatogenesis takes ~64-72 days; epididymal maturation adds ~12 more days</li><li>Spermatogenesis is continuous from puberty onward, unlike oogenesis</li><li>One primary spermatocyte produces four functional spermatozoa</li></ul><p class=\'exp-key\'>Bottom Line: Human spermatogenesis requires approximately 64-72 days from spermatogonium to mature spermatozoon.</p>',
     '<ul><li>Sperm formation takes many weeks, not days: commonly taught estimates are roughly 64 to 74 days within the testes.</li><li>Transit and maturation in the epididymis follow, so the time from stem cell to a sperm able to fertilize is longer still.</li><li>Published estimates vary, so the figure is approximate rather than a fixed cutoff.</li><li>Spermatogenesis runs continuously from puberty onward, unlike oogenesis.</li><li>One primary spermatocyte gives four spermatozoa, whereas one primary oocyte gives one ovum.</li></ul><p class=\'exp-key\'>Bottom Line: Human spermatogenesis within the testes takes about 2 to 2.5 months, followed by further maturation in the epididymis.</p>'],
  ],
},

// ============================================================ Q15 bio-453
// The pump maintains the gradients; resting K+ permeability is the principal
// immediate determinant of the voltage. "Primarily maintained" blurred them.
{
  q: 15, id: 'bio-453', expectLetter: 'B',
  stemFull: 'Which mechanism uses ATP to maintain the sodium and potassium concentration gradients needed for a neuron&rsquo;s resting membrane potential?',
  explanation: [
    ['<p>The Na⁺/K⁺-ATPase actively pumps 3 Na⁺ ions out and 2 K⁺ ions into the cell per ATP hydrolyzed, creating an electrochemical gradient. This, combined with the selective permeability of the resting membrane (more permeable to K⁺ than Na⁺ through leak channels), establishes the negative resting potential of approximately -70 mV inside the cell.</p>',
     '<p>The Na⁺/K⁺-ATPase moves 3 Na⁺ out of the cell and 2 K⁺ in for every ATP hydrolysed, and that is what keeps the two concentration gradients in place. The voltage itself comes mostly from K⁺ leaving through leak channels, because the resting membrane is far more permeable to K⁺ than to Na⁺. The pump preserves the gradients that make this possible, and because it moves three positive charges out for every two it brings in, it also adds a smaller direct electrical contribution of its own.</p>'],
    ['<p><strong>A. Voltage-gated calcium channels:</strong> These open during action potentials and synaptic transmission but are not responsible for maintaining the resting potential.</p>',
     '<p><strong>A. Voltage-gated calcium channels:</strong> These open during action potentials and at synaptic terminals, where calcium entry triggers neurotransmitter release. They are passive channels and do not carry out ATP-driven exchange of sodium and potassium.</p>'],
    ['<p><strong>C. Ligand-gated chloride channels:</strong> These open in response to inhibitory neurotransmitters (like GABA) and contribute to inhibitory postsynaptic potentials, not the resting state.</p>',
     '<p><strong>C. Ligand-gated chloride channels:</strong> These open in response to inhibitory neurotransmitters such as GABA. Chloride movement can influence membrane voltage, but these channels let ions flow down existing gradients; they do not use ATP to pump sodium and potassium.</p>'],
    ['<p><strong>D. Passive diffusion of glucose:</strong> Glucose is uncharged and transported by facilitated diffusion via GLUT transporters; it does not contribute to membrane potential.</p><p class=\'exp-key\'>Bottom Line: The resting membrane potential results from the Na⁺/K⁺-ATPase pump (electrogenic, pumps 3 Na⁺ out / 2 K⁺ in) and the high K⁺ permeability of the resting membrane through leak channels. K⁺ diffusion out of the cell is the major contributor to the negative charge inside.</p>',
     '<p><strong>D. Passive diffusion of glucose:</strong> Glucose is uncharged and crosses the membrane by facilitated diffusion through GLUT transporters. It carries no charge across the membrane and moves neither sodium nor potassium.</p><p class=\'exp-key\'>Bottom Line: The Na⁺/K⁺-ATPase uses ATP to maintain the gradients, pumping 3 Na⁺ out for every 2 K⁺ in. The resting voltage of about -70 mV is set mainly by K⁺ leaving through leak channels; the pump preserves the gradients and adds a smaller direct contribution.</p>'],
  ],
},

// ============================================================ Q16 bio-385
// Good mechanism; the third educational point was about C3/C4/CAM carbon
// fixation, which this item does not test.
{
  q: 16, id: 'bio-385', expectLetter: 'C',
  explanation: [
    ['<li>C3, C4, and CAM plants have different strategies for carbon fixation adapted to their environments, balancing photosynthesis efficiency against water loss.</li>',
     '<li>The oxygen released during photosynthesis comes from water, not from carbon dioxide.</li><li>Splitting water supplies the electrons that replace those the P680 reaction centre loses, and releases protons into the thylakoid lumen.</li><li>That proton gradient across the thylakoid membrane drives ATP synthase.</li><li>Photosystem I then re-energizes the electrons so they can go on to reduce NADP⁺ to NADPH.</li>'],
  ],
},

];
