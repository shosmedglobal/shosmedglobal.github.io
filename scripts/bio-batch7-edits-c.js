/**
 * Batch 7 review, displayed Q25-Q36 (bio-368 .. bio-379).
 * Q31 (bio-374) and Q32 (bio-375) are KEEP UNCHANGED and so are absent.
 */
'use strict';

module.exports = [

  // ------------------------------------------------------------- Q25 bio-368
  {
    q: 25, id: 'bio-368', expectLetter: 'B',
    explanation: [
      ['Examples include the high frequency of Ellis-van Creveld syndrome among the Amish, founded by a small number of immigrants.',
        'Examples include the high frequency of Ellis-van Creveld syndrome in some Old Order Amish communities, founded by a small number of immigrants.'],
      ['<li>The new population begins with reduced genetic diversity and may show unusually high frequencies of otherwise rare alleles.</li>',
        '<li>The new population can begin with reduced genetic diversity and different allele frequencies, including unusually high frequencies of otherwise rare alleles, although neither follows in every founding event.</li>'],
      ['<li>Ellis-van Creveld syndrome among the Old Order Amish is the standard example.</li>',
        '<li>Ellis-van Creveld syndrome in some Old Order Amish communities is the standard example.</li>'],
      ['<li>It is a form of genetic drift, differing from a bottleneck only in that the small group migrates rather than being all that survived.</li>',
        '<li>A founder effect occurs when a few individuals establish a population. A bottleneck occurs when an existing population becomes much smaller. Both can change allele frequencies through chance sampling.</li>']
    ],
    gone: ['among the Amish, founded by', 'among the Old Order Amish is the standard example',
      'differing from a bottleneck only in that', 'The new population begins with reduced genetic diversity']
  },

  // ------------------------------------------------------------- Q26 bio-369
  {
    q: 26, id: 'bio-369', expectLetter: 'C',
    explanation: [
      ['In malaria-endemic regions, HbS heterozygotes have resistance to Plasmodium falciparum malaria without severe sickle cell disease, maintaining the HbS allele at relatively high frequency despite its lethal effects in homozygotes.',
        'In malaria-endemic regions HbAS offers partial protection against severe falciparum malaria without causing sickle cell disease, which keeps the HbS allele at relatively high frequency despite the severe disease and reduced fitness associated with HbSS in that environment.'],
      ['<p><strong>D. Purifying selection:</strong> Purifying (stabilizing) selection removes deleterious alleles from the population, keeping the phenotype close to the current optimum. Most mutations that affect protein function are slightly harmful, and purifying selection eliminates them. This is the most common form of selection acting on most genes most of the time.</p>',
        '<p><strong>D. Purifying selection:</strong> Purifying selection removes deleterious alleles. Stabilizing selection instead describes selection favoring intermediate trait values over extremes; the terms are not interchangeable. In the example here, the heterozygote advantage helps maintain both alleles, so it is balancing selection.</p>'],
      ['<li>Heterozygote advantage (overdominance) is one mechanism: HbA/HbS heterozygotes resist severe malaria.</li>',
        '<li>Heterozygote advantage (overdominance) is one mechanism: HbAS gives partial protection against severe falciparum malaria.</li>']
    ],
    gone: ['its lethal effects in homozygotes', 'Purifying (stabilizing) selection', 'most genes most of the time',
      'HbA/HbS heterozygotes resist severe malaria']
  },

  // ------------------------------------------------------------- Q27 bio-370
  {
    q: 27, id: 'bio-370', expectLetter: 'C',
    explanation: [
      ['<p><strong>D. 64%:</strong> 64% is not correct. It might be confused with the combined frequency of all individuals carrying at least one dominant allele (p<sup>2</sup> + 2pq = 0.36 + 0.48 = 0.84), but even that does not equal 64%. The heterozygote frequency is 2pq = 48%.</p>',
        '<p><strong>D. 64%:</strong> 64% equals 1 − p<sup>2</sup>, or 2pq + q<sup>2</sup>. It combines heterozygotes and homozygous recessive individuals. The question asks only for heterozygotes, which are 48%.</p>'],
      ['<li>Notice that heterozygotes outnumber affected homozygotes threefold here, and the gap widens as the allele becomes rarer.</li>',
        '<li>Notice that heterozygotes outnumber homozygous recessive individuals threefold here, and the gap widens as the allele becomes rarer.</li>']
    ],
    gone: ['64% is not correct', 'heterozygotes outnumber affected homozygotes']
  },

  // ------------------------------------------------------------- Q28 bio-371
  {
    q: 28, id: 'bio-371', expectLetter: 'B',
    explanation: [
      ['Gene flow counteracts the diverging effects of genetic drift and natural selection, making populations more genetically similar to each other over time.',
        'Gene flow can counteract divergence caused by drift or by different local selective pressures, making populations more genetically similar to each other over time.'],
      ['<li>It therefore opposes both drift and local selection, which tend to drive populations apart.</li>',
        '<li>It can therefore counteract divergence caused by drift or by different local selective pressures.</li>']
    ],
    gone: ['counteracts the diverging effects', 'opposes both drift and local selection']
  },

  // ------------------------------------------------------------- Q29 bio-372
  {
    q: 29, id: 'bio-372', expectLetter: 'B',
    optionFull: [[1, 'Results from a major reduction in the size of an existing population']],
    explanation: [
      ['<h4>Correct Answer: B. Results from a dramatic reduction in population size due to a catastrophic event</h4><p>A population bottleneck occurs when a population\'s size is drastically reduced by a catastrophic event (natural disaster, disease, habitat destruction), leaving a small surviving group whose allele frequencies may differ from the original population. The founder effect involves a small group migrating and establishing a new population. Both reduce genetic diversity, but the bottleneck occurs in situ while the founder effect involves colonization of a new area.</p>',
        '<h4>Correct Answer: B. Results from a major reduction in the size of an existing population</h4><p>A population bottleneck is a major reduction in the size of an existing population. A single catastrophe is one possible cause, but prolonged hunting, disease or habitat loss can do the same. Alleles can be lost by chance, genetic diversity falls, and drift becomes more influential while numbers stay low. The survivors are not necessarily a perfectly random sample, since selection can act as well. The founder effect is different: there a small group establishes a new population rather than an existing population shrinking.</p>'],
      ['The bottleneck, by contrast, occurs in situ when a catastrophe sharply reduces the existing population.',
        'The bottleneck, by contrast, is a sharp reduction in the size of the existing population.'],
      ['<li>A bottleneck is a drastic reduction in population size caused by a catastrophic event.</li>',
        '<li>A bottleneck is a major reduction in the size of an existing population, whether caused by a catastrophe, prolonged hunting, disease or habitat loss.</li>'],
      ['<li>The survivors form a random sample, so allele frequencies can shift sharply and diversity is lost.</li>',
        '<li>Alleles can be lost by chance, so allele frequencies can shift sharply and diversity falls; the survivors are not necessarily a perfectly random sample.</li>'],
      ['<li>The distinguishing feature is location: a bottleneck happens in place, whereas a founder event involves migration.</li>',
        '<li>The distinguishing feature is which population changes: a bottleneck shrinks an existing population, whereas a founder event starts a new one from a few individuals.</li>'],
      ['<li>Both are forms of genetic drift and both reduce genetic diversity.</li>',
        '<li>Both involve chance sampling and both can reduce genetic diversity, and drift becomes more influential while numbers stay low.</li>']
    ],
    gone: ['due to a catastrophic event', 'occurs in situ', 'The survivors form a random sample',
      'The distinguishing feature is location', 'Both are forms of genetic drift and both reduce']
  },

  // ------------------------------------------------------------- Q30 bio-373
  {
    q: 30, id: 'bio-373', expectLetter: 'A',
    stemFull: 'In a simple population-genetics model, individuals preferentially mate with others of the same genotype at a particular locus. Assume equal reproductive contributions and no selection, mutation, migration or drift. What is the expected effect of this positive assortative mating?',
    explanation: [
      ['<p>Positive assortative mating (like mates with like) increases the frequency of homozygotes and decreases heterozygotes in the population, but it does not change the overall allele frequencies. This is similar to the effect of inbreeding. The population deviates from Hardy-Weinberg equilibrium genotype proportions even though p and q remain the same. Negative assortative mating (opposites attract) increases heterozygosity.</p>',
        '<p>Positive assortative mating means that like mates with like. Pairing changes how the existing alleles are combined into genotypes: homozygotes become more frequent and heterozygotes less frequent. Under the assumptions stated in the stem, p and q do not change, so the population departs from Hardy-Weinberg genotype proportions while its allele frequencies stay the same. Negative assortative mating, where opposites attract, can instead favour heterozygosity.</p>'],
      ['Notably, allele frequencies remain unchanged because no alleles are being selected for or against.',
        'Under the assumptions stated in the stem, allele frequencies remain unchanged, because no genotype has greater reproductive success than another.'],
      ['<p><strong>C. A decrease in allele frequencies:</strong> Assortative mating does not change allele frequencies at all. It only reshuffles genotype frequencies within the existing allele pool. Selection, drift, mutation, and migration change allele frequencies; mating patterns only affect how alleles are combined into genotypes.</p>',
        '<p><strong>C. A decrease in allele frequencies:</strong> Under the model stated in the stem, assortative mating does not change allele frequencies; it only changes how the existing alleles are combined into genotypes. Outside that model, mate choice that creates differences in reproductive success is sexual selection, and that can change allele frequencies.</p>'],
      ['<li>Crucially it does not change allele frequencies: p and q stay the same while genotype proportions shift.</li>',
        '<li>Under the stated assumptions it does not change allele frequencies: p and q stay the same while genotype proportions shift.</li>'],
      ['<li>Inbreeding produces the same effect for the same reason - non-random pairing of like genotypes.</li>',
        '<li>Inbreeding increases homozygosity across the genome because relatives share ancestry. Assortment by a particular heritable trait primarily affects the loci associated with that trait.</li>'],
      ['<li>Negative assortative mating, where opposites attract, does the reverse and increases heterozygosity.</li>',
        '<li>Negative assortative mating, where opposites attract, can instead favour heterozygosity.</li>']
    ],
    gone: ['This is similar to the effect of inbreeding', 'does not change allele frequencies at all',
      'Inbreeding produces the same effect for the same reason', 'does the reverse and increases heterozygosity',
      'because no alleles are being selected for or against']
  },

  // ------------------------------------------------------------- Q33 bio-376
  {
    q: 33, id: 'bio-376', expectLetter: 'B',
    stemFull: 'Which mechanism commonly activates receptor tyrosine kinases that are separate monomers before ligand binding?',
    explanation: [
      ['RTKs are activated by growth factors (like EGF, insulin, PDGF) binding to their extracellular domains, triggering dimerization and autophosphorylation.',
        'RTKs are activated by ligands such as EGF and PDGF binding to their extracellular domains. The insulin receptor is a preformed dimer, so its ligand produces a conformational change that activates the existing receptor complex rather than creating a new dimer.'],
      ['<li>RTKs are activated by ligand-induced dimerization followed by cross-phosphorylation of tyrosine residues (autophosphorylation).</li>',
        '<li>Many RTKs are separate monomers that ligand binding brings together, after which the juxtaposed kinase domains cross-phosphorylate tyrosine residues. Some, such as the insulin receptor, are preformed dimers activated by a conformational change.</li>'],
      ['<li>RTK signalling drives growth and differentiation, so mutations that force dimerization are oncogenic - HER2 and EGFR are the standard examples.</li>',
        '<li>RTK signaling can become excessive through receptor overexpression or activating mutations. Examples include HER2 amplification and activating EGFR mutations in some cancers.</li>']
    ],
    gone: ['growth factors (like EGF, insulin, PDGF)', 'mutations that force dimerization are oncogenic',
      'activated by ligand-induced dimerization followed by cross-phosphorylation']
  },

  // ------------------------------------------------------------- Q34 bio-377
  {
    q: 34, id: 'bio-377', expectLetter: 'B',
    stemFull: 'What is the direct action of IP₃ (inositol trisphosphate) in the PLC signaling pathway?',
    explanation: [
      ['activating various calcium-dependent proteins including calmodulin and, together with DAG, protein kinase C (PKC).',
        'activating various calcium-dependent proteins including calmodulin and, together with DAG, conventional (calcium-dependent) protein kinase C.'],
      ['<p><strong>A. Activating protein kinase C at the plasma membrane:</strong> Activating protein kinase C (PKC) at the plasma membrane is the function of DAG (diacylglycerol), not IP3. DAG and IP3 are both produced when phospholipase C cleaves PIP2, but they have distinct roles: DAG stays in the membrane to activate PKC, while IP3 diffuses through the cytoplasm to the ER to release calcium.</p>',
        '<p><strong>A. Activating protein kinase C at the plasma membrane:</strong> Activating protein kinase C at the plasma membrane is the direct action of DAG (diacylglycerol), not of IP₃. Both are produced when phospholipase C cleaves PIP₂, but DAG stays in the membrane, while IP₃ diffuses through the cytoplasm to the ER and releases calcium. IP₃ contributes to activating conventional, calcium-dependent forms of PKC only indirectly, through that calcium release.</p>'],
      ['Its sole function is to bind IP3 receptors on the endoplasmic reticulum, which are ligand-gated calcium channels.',
        'Its direct action in this pathway is binding IP₃ receptors on the endoplasmic reticulum, which are ligand-gated calcium channels, to release stored calcium.'],
      ['When Gi-coupled receptors are activated, the alpha-i subunit inhibits adenylyl cyclase, reducing cAMP levels. IP3 works in a completely separate signaling cascade.',
        'When Gi-coupled receptors are activated, the alpha-i subunit inhibits adenylyl cyclase, reducing cAMP levels. That is a different immediate mechanism from the one asked about; IP₃ signaling can itself begin at a GPCR, through Gq, so the two are not disconnected systems.'],
      ['<li>DAG remains in the membrane and, together with the released Ca²⁺, activates protein kinase C.</li>',
        '<li>DAG remains in the membrane and, together with the released Ca²⁺, activates conventional, calcium-dependent forms of protein kinase C.</li>']
    ],
    gone: ['is the function of DAG (diacylglycerol), not IP3', 'Its sole function is to bind',
      'works in a completely separate signaling cascade', 'together with the released Ca²⁺, activates protein kinase C']
  },

  // ------------------------------------------------------------- Q35 bio-378
  {
    q: 35, id: 'bio-378', expectLetter: 'B',
    stemFull: 'A cAMP phosphodiesterase helps terminate cAMP signaling by:',
    explanation: [
      ['<p>Phosphodiesterase (PDE) terminates cAMP signaling by cleaving the phosphodiester bond in cAMP, converting it to inactive 5\'-AMP. This reduces intracellular cAMP levels and consequently inactivates protein kinase A. Drugs like caffeine and theophylline inhibit phosphodiesterase, prolonging cAMP signaling. Sildenafil (Viagra) inhibits PDE5, which normally degrades cGMP, thus prolonging cGMP-mediated smooth muscle relaxation.</p>',
        '<p>A cyclic-nucleotide phosphodiesterase (PDE) terminates cAMP signaling by cleaving the phosphodiester bond in cAMP, converting it to 5\'-AMP, which does not activate PKA as cAMP does. Intracellular cAMP falls and protein kinase A is activated less. The clearest drug example is sildenafil, which inhibits PDE5, the enzyme that degrades cGMP, prolonging cGMP-mediated smooth muscle relaxation. Caffeine\'s usual stimulant effects are mainly due to blockade of adenosine receptors; substantial PDE inhibition generally requires higher concentrations.</p>'],
      ['Additionally, the primary mechanism for lowering cytoplasmic calcium is the SERCA pump, which pumps Ca2+ back into the endoplasmic reticulum. Phosphodiesterase works exclusively on cyclic nucleotide second messengers.',
        'Cytosolic calcium is lowered by sequestration into intracellular stores and by extrusion across the plasma membrane; the SERCA pump is one important example rather than the sole route in every cell. The phosphodiesterase in this question acts on cyclic nucleotide second messengers.'],
      ['<li>Phosphodiesterase hydrolyses the cyclic phosphodiester bond, converting cAMP to inactive 5\'-AMP.</li>',
        '<li>Phosphodiesterase hydrolyses the cyclic phosphodiester bond, converting cAMP to 5\'-AMP, which does not activate PKA as cAMP does.</li>'],
      ['<li>Signal termination is as tightly regulated as initiation; without degradation the signal would persist indefinitely.</li>',
        '<li>Signal termination is as tightly regulated as initiation: PDE-mediated degradation helps limit the strength and duration of the signal.</li>'],
      ['<li>Methylxanthines such as caffeine and theophylline inhibit PDE and so prolong cAMP signalling.</li>',
        '<li>Theophylline is a methylxanthine with PDE-inhibitory actions, although that is not its only action; caffeine\'s usual stimulant effect is mainly blockade of adenosine receptors.</li>'],
      ['<li>Isoform selectivity among PDEs is what allows tissue-specific drug action.</li>',
        '<li>PDE isoforms differ in substrate preference and tissue distribution, helping determine the effects of selective inhibitors.</li>']
    ],
    gone: ['converting it to inactive 5\'-AMP', 'Drugs like caffeine and theophylline inhibit phosphodiesterase',
      'the primary mechanism for lowering cytoplasmic calcium is the SERCA pump',
      'the signal would persist indefinitely', 'Isoform selectivity among PDEs']
  },

  // ------------------------------------------------------------- Q36 bio-379
  {
    q: 36, id: 'bio-379', expectLetter: 'C',
    explanation: [
      ['Examples include the nicotinic acetylcholine receptor (Na⁺ channel), GABAA receptor (Cl− channel), and NMDA receptor (Ca²⁺/Na⁺ channel). These receptors mediate fast synaptic transmission, in contrast to the slower signaling of GPCRs and RTKs.',
        'Examples include the nicotinic acetylcholine receptor, a cation channel permeable to Na⁺ and K⁺, with some subtypes appreciably permeable to Ca²⁺; the GABA_A receptor, an anion channel; and the NMDA receptor, a cation channel conducting Na⁺, K⁺ and Ca²⁺. These receptors mediate fast synaptic transmission, typically faster than signaling through GPCRs and RTKs.'],
      ['<p><strong>A. G protein-coupled receptor:</strong> G protein-coupled receptors (GPCRs) work indirectly through heterotrimeric G proteins and second messengers, not by directly opening ion channels. GPCRs have seven transmembrane domains and activate downstream signaling cascades (cAMP, IP3/DAG, etc.) that may eventually affect ion channels, but the channel opening is not direct or immediate.</p>',
        '<p><strong>A. G protein-coupled receptor:</strong> A GPCR is not itself an ion channel. After receptor activation, G-protein subunits can regulate a separate channel directly, which can be rapid, or act through second messengers such as cAMP or IP₃ and DAG. The direct ligand-to-pore mechanism asked about here is characteristic of an ionotropic receptor.</p>'],
      ['<p><strong>D. Nuclear receptor:</strong> Nuclear receptors (like steroid hormone receptors) are intracellular receptors that function as ligand-activated transcription factors. They bind hydrophobic signaling molecules (steroids, thyroid hormones, vitamin D) that cross the cell membrane, then translocate to the nucleus to regulate gene expression. This is the slowest receptor signaling mechanism, taking hours, while ligand-gated channels act in milliseconds.</p>',
        '<p><strong>D. Nuclear receptor:</strong> Nuclear receptors, such as the steroid hormone receptors, are intracellular receptors that act as ligand-activated transcription factors. They bind hydrophobic signaling molecules (steroids, thyroid hormones, vitamin D) that cross the cell membrane. Some are already in the nucleus and others change location after binding their ligand, but either way they regulate gene expression rather than opening a pore, and the response is far slower than the millisecond action of a ligand-gated channel.</p>'],
      ['<li>This produces responses within milliseconds - far faster than GPCR or RTK signalling, which require intermediates.</li>',
        '<li>Ionotropic signalling is typically rapid, within milliseconds, because no intermediate messenger is needed.</li>'],
      ['<li>Ion selectivity determines the effect: cation influx depolarises and excites, while Cl⁻ influx hyperpolarises and inhibits.</li>',
        '<li>The electrical effect depends on ion selectivity and on the electrochemical gradients: GABA_A-mediated anion conductance is usually inhibitory in mature neurons.</li>'],
      ['<li>Metabotropic receptors use second messengers instead, giving slower but amplified and longer-lasting responses.</li>',
        '<li>Metabotropic receptors instead couple to intracellular signalling proteins, often giving slower, amplified and longer-lasting responses.</li>']
    ],
    gone: ['nicotinic acetylcholine receptor (Na⁺ channel)', 'the channel opening is not direct or immediate',
      'then translocate to the nucleus to regulate gene expression', 'cation influx depolarises and excites',
      'Metabotropic receptors use second messengers instead']
  }

];
