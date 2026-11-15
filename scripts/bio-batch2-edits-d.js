/**
 * Batch 2 review, part D: displayed Q50-Q60 (Q52 is a KEEP item), plus the
 * near-duplicate of Q24 that lives separately in the bank (bio-294).
 * Includes the third substantial rewrite: Q50.
 */
'use strict';

module.exports = [

// ============================================================ Q50 bio-95
// SUBSTANTIAL REWRITE. The old item was not a clean single-best-answer
// question: sexual reproduction is embedded in the usual random-mating
// diploid model, and random mating is not required merely for ALLELE
// frequencies to stay constant, since nonrandom mating can shift genotype
// frequencies without directly shifting allele frequencies. The correct
// letter stays C, but C now describes migration.
{
  q: 50, id: 'bio-95', expectLetter: 'C',
  stemFull: 'Which condition violates the assumptions of the standard Hardy-Weinberg equilibrium model?',
  optionFull: [
    [0, 'No natural selection'],
    [1, 'Random mating'],
    [2, 'Migration from a population with different allele frequencies'],
    [3, 'A very large population'],
  ],
  explanationFull:
    '<h4>Correct Answer: C. Migration from a population with different allele frequencies</h4>'
    + '<p>The standard Hardy-Weinberg model describes an idealized population in which allele frequencies do not change. It assumes no mutation, no natural selection, random mating, a very large population, and no migration. Migration from a population whose allele frequencies differ introduces alleles in different proportions from those already present, which changes the recipient gene pool. That is a direct violation of one of the assumptions, so C is the condition that breaks the model.</p>'
    + '<p>A, B and D are not violations: each is one of the assumptions the model is built on. In particular, a very large population is assumed precisely so that random sampling from one generation to the next, which is genetic drift, has a negligible effect.</p>'
    + '<h4>Why the other choices are wrong:</h4>'
    + '<p><strong>A. No natural selection:</strong> Absence of natural selection is an assumption of the model, not a violation of it. Selection changes allele frequencies by making some genotypes reproduce more successfully than others, so the model has to exclude it in order to predict unchanging frequencies.</p>'
    + '<p><strong>B. Random mating:</strong> Random mating is also an assumption of the standard model, so it cannot be the violation. It is worth noting what nonrandom mating does and does not do: it can change the proportions of genotypes, for example producing more homozygotes than expected, without by itself changing the frequencies of the alleles p and q.</p>'
    + '<p><strong>D. A very large population:</strong> A very large population is an assumption rather than a violation. The larger the population, the smaller the proportional effect of random sampling, so drift is minimized. It is a <em>small</em> population that violates this assumption.</p>'
    + '<h4>Key Educational Points:</h4><ul>'
    + '<li>The five standard assumptions are: no mutation, no natural selection, random mating, a very large population, and no migration.</li>'
    + '<li>Allele frequencies are p and q; genotype frequencies are p&sup2;, 2pq and q&sup2;. The two are different quantities and can behave differently.</li>'
    + '<li>Nonrandom mating can change genotype proportions without directly changing allele frequencies. Migration, selection, mutation and drift can change the allele frequencies themselves.</li>'
    + '<li>A very large population is assumed so that drift, the random sampling of alleles between generations, has a negligible effect.</li>'
    + '<li>The model is a null expectation. A departure from the expected genotype frequencies can indicate that one or more assumptions are not met.</li>'
    + '</ul><p class=\'exp-key\'>Bottom Line: Hardy-Weinberg equilibrium is a null model resting on five assumptions. Migration between populations with different allele frequencies violates one of them. A departure from the expected frequencies suggests an assumption is not met; it does not by itself identify which mechanism is at work.</p>',
},

// ============================================================ Q51 bio-173
// The nicotinic receptor is a cation channel, not a sodium-selective one;
// bronchodilation is more strongly associated with epinephrine; and the
// serotonin distractor mixed brain synthesis with total body content.
{
  q: 51, id: 'bio-173', expectLetter: 'A',
  explanation: [
    ['<p>Acetylcholine (ACh) is released from motor neuron terminals at the neuromuscular junction. It binds to nicotinic receptors on the motor end plate of the skeletal muscle fiber, causing sodium influx and depolarization. This generates an end-plate potential that triggers an action potential in the muscle fiber, leading to contraction. ACh is rapidly broken down by acetylcholinesterase in the synaptic cleft to allow precise control of muscle activity.</p>',
     '<p>Acetylcholine (ACh) is released from the motor neuron terminal at the neuromuscular junction and binds nicotinic receptors on the motor end plate. These receptors are cation channels: at the resting muscle membrane potential the net inward current, carried mainly by sodium entering the cell, depolarizes the end plate. The resulting end-plate potential triggers an action potential in the muscle fibre, which leads to contraction. Acetylcholinesterase in the synaptic cleft then breaks the ACh down, which ends the signal and allows precise control of muscle activity.</p>'],
    ['<p><strong>B. Norepinephrine:</strong> Norepinephrine is the primary neurotransmitter of the postganglionic sympathetic nervous system. It acts on adrenergic receptors (alpha and beta) in target organs to mediate \'fight or flight\' responses such as increased heart rate, vasoconstriction, and bronchodilation. It is not used at the neuromuscular junction for skeletal muscle.</p>',
     '<p><strong>B. Norepinephrine:</strong> Most postganglionic sympathetic neurons use norepinephrine, which acts on adrenergic receptors in target organs and can affect heart rate and vascular tone. It is not the transmitter at the skeletal neuromuscular junction.</p>'],
    ['<p><strong>D. Serotonin:</strong> Serotonin (5-hydroxytryptamine, 5-HT) is a monoamine neurotransmitter synthesized from tryptophan, primarily in the raphe nuclei of the brainstem. It modulates mood, appetite, sleep, and pain perception. About 90% of the body\'s serotonin is actually found in the GI tract, where it regulates intestinal motility.</p>',
     '<p><strong>D. Serotonin:</strong> Serotonin (5-hydroxytryptamine) is a monoamine neurotransmitter made from tryptophan. In the brain it is produced by neurons of the raphe nuclei and modulates mood, appetite, sleep and pain perception. It is not the transmitter at the neuromuscular junction.</p>'],
    ['<ul><li>The nervous system is divided into the CNS (brain and spinal cord) and PNS (cranial and spinal nerves); the PNS further divides into somatic (voluntary) and autonomic (involuntary) divisions.</li><li>Action potentials propagate along neurons via sequential depolarization; myelination increases conduction speed through saltatory conduction at nodes of Ranvier.</li><li>Neurotransmitters are released at synapses and bind to receptors on postsynaptic cells - excitatory (e.g., glutamate, acetylcholine) or inhibitory (e.g., GABA, glycine).</li></ul><p class=\'exp-key\'>Bottom Line: Acetylcholine acting on nicotinic receptors at the neuromuscular junction is the sole neurotransmitter for voluntary skeletal muscle activation.</p>',
     '<ul><li>ACh is released from the motor neuron terminal into the synaptic cleft.</li><li>It binds nicotinic receptors on the motor end plate. These are cation channels, and the net inward current depolarizes the end plate.</li><li>The end-plate potential triggers an action potential that spreads along the muscle fibre.</li><li>That action potential causes calcium release within the muscle fibre, and the calcium initiates contraction.</li><li>Acetylcholinesterase breaks the ACh down, which ends the signal.</li><li>ACh is excitatory at this junction. Elsewhere its effect depends on the receptor, so it is not universally excitatory.</li></ul><p class=\'exp-key\'>Bottom Line: Acetylcholine acting on nicotinic receptors is the transmitter at the skeletal neuromuscular junction. Those receptors are cation channels, and the end-plate depolarization they produce triggers the muscle action potential.</p>'],
  ],
},

// ============================================================ Q53 bio-557
// "ALL primates" plus universally opposable digits is too absolute, and the
// claim that no primates have specialized cellulose-digesting systems is
// wrong: colobine monkeys have foregut fermentation.
{
  q: 53, id: 'bio-557', expectLetter: 'D',
  stemFull: 'Which combination of features is typical of primates and reflects adaptations associated with an arboreal ancestry?',
  optionFull: [[3, 'Forward-facing eyes with overlapping visual fields and hands adapted for grasping']],
  headingsGone: ['Correct Answer: Forward-facing eyes with stereoscopic vision and grasping hands with opposable digits'],
  explanation: [
    ['<h4>Correct Answer: Forward-facing eyes with stereoscopic vision and grasping hands with opposable digits</h4><p>Primates share several key characteristics: forward-facing eyes providing binocular (stereoscopic) vision for depth perception, grasping hands and feet with opposable thumbs or big toes, nails instead of claws on most digits, relatively large brains compared to body size, and extended periods of parental care. These traits are adaptations to an arboreal (tree-dwelling) ancestral lifestyle.</p>',
     '<h4>Correct Answer: Forward-facing eyes with overlapping visual fields and hands adapted for grasping</h4><p>Primates typically share a set of features: forward-facing eyes whose visual fields overlap, giving good depth perception; hands and feet adapted for grasping; nails rather than claws on most digits; relatively large brains for their body size; and long periods of parental care. These are associated with an arboreal, tree-dwelling ancestry. Many primates have an opposable thumb or an opposable big toe, but hands, thumbs and feet vary between groups, and some groups have reduced or absent thumbs, so it is the general pattern rather than any single detail that is typical of the order.</p>'],
    ['<p><strong>C. Obligate herbivory:</strong> Most primates are omnivorous, eating a variety of fruits, leaves, insects, and sometimes meat. Few primates are obligate herbivores, and none have the specialized cellulose-digesting systems found in ruminants.</p>',
     '<p><strong>C. Obligate herbivory:</strong> Primate diets vary widely: many eat fruit, leaves, insects and sometimes meat. Obligatory herbivory is not a defining feature of the order. Note also that some primates do have specialized digestion for plant material; colobine monkeys, for example, have a foregut in which microbes ferment leaves.</p>'],
    ['<ul><li>Key primate traits: stereoscopic vision, grasping hands, nails (not claws), large brain-to-body ratio</li><li>These traits reflect arboreal ancestry, even in terrestrial primates</li></ul><p class=\'exp-key\'>Bottom Line: All primates share forward-facing eyes for stereoscopic vision and grasping hands with opposable digits, reflecting their arboreal evolutionary origins.</p>',
     '<ul><li>Typical primate features: forward-facing eyes with overlapping visual fields, hands adapted for grasping, nails rather than claws, and a large brain for body size.</li><li>These features reflect an arboreal ancestry, even in primates that now live on the ground.</li><li>Many primates have opposable thumbs or big toes, but this varies between groups, so avoid treating it as universal.</li></ul><p class=\'exp-key\'>Bottom Line: Forward-facing eyes with overlapping visual fields and hands adapted for grasping are typical primate features and reflect an arboreal ancestry. Thumbs, hands and feet vary between groups, so no single detail holds for every primate.</p>'],
  ],
},

// ============================================================ Q54 bio-326
// Peripheral nerves do not develop through the neural tube; that is the
// neural crest. Also absolutes about the "entire" nervous system and about
// endodermal organs.
{
  q: 54, id: 'bio-326', expectLetter: 'C',
  explanation: [
    ['<p>The ectoderm is the outermost germ layer and gives rise to: (1) the nervous system (brain, spinal cord, peripheral nerves) via the neural tube, (2) epidermis and its derivatives (hair, nails, sweat glands), (3) lens of the eye, (4) tooth enamel, (5) anterior pituitary, and (6) adrenal medulla (neural crest cells).</p>',
     '<p>The ectoderm is the outermost germ layer, and the nervous system develops primarily from it, by two different routes. The neural tube gives rise to the brain and spinal cord. The neural crest gives rise to much of the peripheral nervous system, and also to melanocytes and the adrenal medulla, among other derivatives. Separately, the surface ectoderm gives rise to the epidermis and its appendages such as hair, nails and sweat glands, and to the lens of the eye, tooth enamel and the anterior pituitary.</p>'],
    ['<tr><td>Endoderm</td><td>GI tract lining, lungs, liver, pancreas, thyroid</td></tr>',
     '<tr><td>Endoderm</td><td>Epithelial lining of the digestive and respiratory tracts; major epithelial and glandular components of liver, pancreas, thyroid</td></tr>'],
    ['<p><strong>A. Endoderm:</strong> The endoderm (innermost germ layer) gives rise to the epithelial lining of the digestive tract, respiratory tract, and associated organs including the liver, pancreas, thyroid, parathyroid, and thymus. It does not give rise to the nervous system or epidermis, which are ectodermal derivatives.</p>',
     '<p><strong>A. Endoderm:</strong> The endoderm, the innermost germ layer, gives rise to the epithelial lining of the digestive and respiratory tracts, and to the major epithelial and glandular components of organs such as the liver, pancreas, thyroid, parathyroid and thymus. Not every tissue within those organs is endodermal: their connective tissue and blood vessels, for instance, are mesodermal. Endoderm does not give rise to the nervous system or the epidermis.</p>'],
    ['bone, cartilage, blood and blood vessels, kidneys, gonads, the dermis of skin, and the adrenal cortex. While the dermis comes from mesoderm, the epidermis (outer skin layer) and the entire nervous system are ectodermal in origin.</p>',
     'bone, cartilage, blood and blood vessels, kidneys, gonads, most of the dermis of the skin, and the adrenal cortex. So the skin has a dual origin: most of the dermis is mesodermal, while the epidermis is ectodermal, and the nervous system develops primarily from ectoderm.</p>'],
    ['<li>Its derivatives include the brain and spinal cord (via the neural tube), epidermis with hair, nails and sweat glands, lens of the eye, tooth enamel, and the anterior pituitary.</li><li>Neural crest cells, an ectodermal derivative, additionally form the adrenal medulla, melanocytes, and much of the peripheral nervous system.</li><li>Skin has a dual origin: the epidermis is ectodermal but the dermis is mesodermal.</li>',
     '<li>Neural tube gives the brain and spinal cord; neural crest gives much of the peripheral nervous system, plus melanocytes and the adrenal medulla; surface ectoderm gives the epidermis and its appendages, the lens, tooth enamel and the anterior pituitary.</li><li>Keeping the neural tube and the neural crest apart is the point worth remembering: central nervous system from the tube, much of the peripheral nervous system from the crest.</li><li>Skin has a dual origin: the epidermis is ectodermal, while most of the dermis is mesodermal.</li>'],
  ],
},

// ============================================================ Q55 bio-423
// "No ATP", "ATP synthesis stops" and "the ETC runs at maximum speed" are
// all too absolute, and NAD+ is a substrate rather than an allosteric
// regulator of isocitrate dehydrogenase.
{
  q: 55, id: 'bio-423', expectLetter: 'C',
  explanation: [
    ['<p>2,4-dinitrophenol (DNP) is a lipid-soluble weak acid that carries protons across the inner mitochondrial membrane, dissipating the proton gradient without ATP synthesis. As an uncoupler, DNP does not inhibit the electron transport chain itself; rather, electron transport continues (and may even accelerate) but the energy is released as heat instead of driving ATP synthesis. DNP was historically used as a weight-loss drug but was banned due to dangerous hyperthermia and death.</p>',
     '<p>2,4-dinitrophenol (DNP) is a lipid-soluble weak acid that carries protons across the inner mitochondrial membrane, letting them return without passing through ATP synthase. This weakens the proton gradient, reduces ATP production by oxidative phosphorylation, and releases more of the energy as heat. DNP does not inhibit the electron transport chain itself: with sufficient fuel and oxygen, electron transport and oxygen consumption can increase. Note also that glycolysis can still make ATP, so what falls is oxidative ATP production rather than all ATP production in the cell. DNP was once sold as a weight-loss drug and was withdrawn because uncoupling can cause dangerous overheating.</p>'],
    ['This dissipates the proton gradient so that electron transport continues but ATP synthesis stops.</p>',
     'This weakens the proton gradient, so electron transport continues while ATP production by oxidative phosphorylation falls.</p>'],
    ['With DNP, the ETC runs at maximum speed (no back-pressure), oxygen consumption increases, but very little ATP is produced. The energy is released as heat.</p>',
     'With DNP the gradient is weakened, so with enough fuel and oxygen, electron transport and oxygen consumption can increase while oxidative ATP production falls and more of the energy leaves as heat. Note that the electron transport chain does not itself make ATP directly; ATP synthase does.</p>'],
    ['<p><strong>D. Inhibiting the citric acid cycle enzyme isocitrate dehydrogenase:</strong> Isocitrate dehydrogenase is a citric acid cycle enzyme that converts isocitrate to alpha-ketoglutarate while producing NADH. It is regulated allosterically by ATP, ADP, and NAD+ but is not a target of DNP. DNP acts at the inner mitochondrial membrane, not at any metabolic enzyme.</p>',
     '<p><strong>D. Inhibiting the citric acid cycle enzyme isocitrate dehydrogenase:</strong> Isocitrate dehydrogenase catalyses a reaction of the citric acid cycle, converting isocitrate to alpha-ketoglutarate while producing NADH. It is not DNP&rsquo;s primary target. DNP acts at the inner mitochondrial membrane rather than on a metabolic enzyme.</p>'],
    ['<li>As an uncoupler it separates electron transport from ATP synthesis: the chain runs, sometimes faster, but produces no ATP.</li><li>Oxygen consumption therefore rises while ATP falls, and the energy leaves as heat.</li><li>This is the opposite pattern to an inhibitor, which stops electron flow and oxygen consumption together.</li><li>DNP was sold as a weight-loss drug and banned after deaths from hyperthermia - the therapeutic window is essentially absent.</li>',
     '<li>As an uncoupler it separates electron transport from ATP synthesis: the chain keeps running, sometimes faster, while oxidative ATP production falls. The chain itself does not make ATP; ATP synthase does.</li><li>With enough fuel and oxygen, oxygen consumption can rise while oxidative ATP production falls, and more of the energy leaves as heat.</li><li>Glycolysis can still make ATP, so it is oxidative ATP production that falls rather than every source of ATP in the cell.</li><li>This is the opposite pattern to an inhibitor of electron transport, which reduces electron flow and oxygen consumption together.</li><li>Because uncoupling releases more of the energy as heat, DNP can cause dangerous overheating.</li>'],
  ],
},

// ============================================================ Q56 bio-466
// "Normal mother" is ambiguous, because an unaffected mother could still be
// a carrier, and a carrier is not guaranteed to be free of symptoms.
{
  q: 56, id: 'bio-466', expectLetter: 'C',
  explanation: [
    ['<tr><td><strong>XH</strong></td><td>XHXH (normal female)</td><td>XHXh (carrier female)</td></tr><tr><td><strong>Y</strong></td><td>XHY (normal male)</td><td>XhY (affected male)</td></tr>',
     '<tr><td><strong>XH</strong></td><td>XHXH (unaffected daughter)</td><td>XHXh (carrier daughter)</td></tr><tr><td><strong>Y</strong></td><td>XHY (unaffected son)</td><td>XhY (affected son)</td></tr>'],
    ['<p><strong>B. 25%:</strong> This would be the probability among ALL children (both sexes), not specifically among sons.</p>',
     '<p><strong>B. 25%:</strong> This is the probability among ALL children rather than among sons, and it assumes an equal chance of a son or a daughter. The question asks specifically about sons, each of whom has a 50% chance.</p>'],
    ['<p class=\'exp-key\'>Bottom Line: For X-linked recessive traits: carrier mother × normal father → 50% of sons affected, 50% of daughters are carriers. Affected father × normal mother → all sons normal, all daughters are carriers. Males are more commonly affected because they only have one X chromosome.</p>',
     '<p class=\'exp-key\'>Bottom Line: For X-linked recessive traits: carrier mother × unaffected father → 50% of sons affected and 50% of daughters carriers. Affected father × a mother who is neither affected nor a carrier → all sons unaffected and all daughters carriers. Males are more commonly affected because they have only one X chromosome.</p>'],
  ],
},

// ============================================================ Q57 bio-331
// Type II pneumocytes are MORE numerous than type I cells; they cover much
// less surface area. The item confused cell count with surface coverage.
{
  q: 57, id: 'bio-331', expectLetter: 'C',
  explanation: [
    ['<p>Simple squamous epithelium consists of a single layer of flat cells, providing the thinnest possible barrier for diffusion. This is ideal for gas exchange in the alveoli (type I pneumocytes), filtration in Bowman\'s capsule of the kidney, and lining blood vessels (endothelium).',
     '<p>Simple squamous epithelium consists of a single layer of flat cells, which is the thinnest barrier a tissue can provide for diffusion. Thin type I pneumocytes cover approximately 95% of the alveolar surface and provide the main gas-exchange surface. Type II pneumocytes are more numerous but cover much less surface area; they secrete surfactant. Simple squamous epithelium also lines blood vessels, as endothelium.',
    ],
    ['Stratified squamous epithelium is found in areas subject to abrasion (skin, oral cavity, esophagus).</p>',
     'Stratified squamous epithelium, by contrast, is found where tissue is subject to abrasion, such as skin, oral cavity and oesophagus.</p>'],
    ['<p><strong>B. Simple cuboidal epithelium:</strong> Simple cuboidal epithelium consists of a single layer of cube-shaped cells. It is found in kidney tubules (reabsorption and secretion), thyroid follicles, and small ducts of glands. While it is a single layer, its cells are thicker than squamous cells, making it less ideal for the rapid diffusion required at the alveolar surface.</p>',
     '<p><strong>B. Simple cuboidal epithelium:</strong> Cuboidal cells are in fact present in the alveoli: the type II pneumocytes, which secrete surfactant, are cuboidal, and they are more numerous than the type I cells. They are not the cells specialized for gas exchange, though. Being thicker than squamous cells they are poorly suited to rapid diffusion, and between them they cover only a small fraction of the alveolar surface. Simple cuboidal epithelium is also found in kidney tubules, thyroid follicles and small gland ducts.</p>'],
    ['<li>Simple squamous epithelium (type I pneumocytes) covers about 95% of the alveolar surface area.</li><li>Type II pneumocytes are cuboidal, far less numerous, and secrete surfactant rather than serving as the exchange surface.</li>',
     '<li>Thin type I pneumocytes cover approximately 95% of the alveolar surface and provide the main gas-exchange surface.</li><li>Type II pneumocytes are cuboidal and secrete surfactant. They are more numerous than type I cells but cover much less surface area, so cell count and surface coverage are not the same thing.</li>'],
  ],
},

// ============================================================ Q58 bio-312
// Integration is characteristic of lambda rather than universal, not every
// phage gene is dormant, lysis is not immediate even in the lytic cycle, and
// some phages do release particles without killing the host.
{
  q: 58, id: 'bio-312', expectLetter: 'B',
  stemFull: 'In the lysogenic cycle of bacteriophage lambda, the phage DNA:',
  explanation: [
    ['<p>In the lysogenic cycle, viral DNA integrates into the bacterial chromosome (becoming a prophage) and is replicated along with the host DNA during cell division. The phage genes remain dormant. Environmental stressors (UV light, chemicals) can trigger the switch to the lytic cycle, where the prophage excises and initiates viral reproduction and host cell lysis.</p>',
     '<p>In lambda lysogeny the phage DNA integrates into the bacterial chromosome, becoming a prophage, and is replicated along with the host DNA each time the cell divides. The genes required for lytic reproduction are repressed, while some phage genes remain expressed, including the repressor that holds the lytic genes off. DNA damage, for example from UV light, can trigger induction: the prophage excises and the lytic cycle follows. That is a possible trigger rather than an inevitable response to every stress. Integration is characteristic of lambda and is not required in every lysogenic phage.</p>'],
    ['<p><strong>A. Immediately lyses the host cell:</strong> Immediate lysis of the host cell describes the lytic cycle, not the lysogenic cycle. In the lytic cycle, the phage commandeers the host\'s machinery to rapidly replicate phage DNA and synthesize viral proteins, assembles new phage particles, and then lyses (bursts) the host cell to release hundreds of progeny phages. The lysogenic cycle, by contrast, is a dormant state.</p>',
     '<p><strong>A. Immediately lyses the host cell:</strong> This describes the lytic cycle rather than lysogeny, and even there lysis is not immediate: the phage first directs replication of its DNA and synthesis of viral proteins, then the assembly of new particles, and only after that is the host cell lysed to release them. In lysogeny the lytic genes are repressed instead, and the host cell survives.</p>'],
    ['<p><strong>D. Forms a capsid inside the host cell without lysis:</strong> Forming capsids inside the host without lysis does not accurately describe any phage cycle. In the lysogenic cycle, no viral structural proteins (capsids) are produced because the phage genome is dormant as a prophage. Capsid assembly only occurs when the prophage is induced to enter the lytic cycle (triggered by stress like UV light or chemicals).</p>',
     '<p><strong>D. Forms a capsid inside the host cell without lysis:</strong> Active capsid production is not the defining feature of lambda lysogeny. While the prophage is integrated, the genes for structural proteins are among those repressed, and capsid assembly follows induction. Note that releasing particles without killing the host is not impossible in general: some phages do exactly that. It simply is not what lambda lysogeny is.</p>'],
    ['<li>The phage genes stay dormant and the host cell survives and divides normally.</li><li>Stressors such as UV light or chemicals induce excision and a switch to the lytic cycle, which destroys the cell.</li>',
     '<li>The genes needed for lytic reproduction are repressed while some phage genes stay expressed, and the host cell survives and divides normally.</li><li>DNA damage, such as that from UV light, can induce excision and a switch to the lytic cycle. It is a possible trigger, not an automatic consequence of every stress.</li>'],
    ['<li>Lysogeny can change the host phenotype (lysogenic conversion): diphtheria toxin, cholera toxin, and the Shiga toxin of E. coli O157:H7 are all encoded by prophage genes.</li></ul><p class=\'exp-key\'>Bottom Line: Lysogenic = viral DNA integration as prophage (dormant). Lytic = viral replication and host cell lysis. Lambda phage is a classic example of lysogeny.</p>',
     '<li>Lysogeny can change the host phenotype, which is called lysogenic conversion: the diphtheria toxin gene, for example, is carried by a prophage. This is only possible because not every phage gene is silenced.</li></ul><p class=\'exp-key\'>Bottom Line: In lambda lysogeny the phage DNA integrates as a prophage and replicates with the host chromosome, with the lytic genes repressed. In the lytic cycle the phage replicates, assembles particles, and then lyses the cell.</p>'],
  ],
},

// ============================================================ Q59 bio-566
// Recombination frequency is the proportion of recombinant GAMETES, not of
// meioses containing a crossover, and RF equals cM only over short distances.
{
  q: 59, id: 'bio-566', expectLetter: 'B',
  optionFull: [[1, 'The genes are approximately 8 cM apart, with parental allele combinations in about 92% of gametes from the heterozygote']],
  headingsGone: ['Correct Answer: The genes are 8 centiMorgans apart and are inherited together 92% of the time'],
  explanation: [
    ['<h4>Correct Answer: The genes are 8 centiMorgans apart and are inherited together 92% of the time</h4><p>Recombination frequency (RF) directly measures the genetic distance between two linked genes, expressed in centiMorgans (cM). 1% recombination frequency = 1 cM. An RF of 8% means the genes are 8 cM apart, and crossing over between them occurs in 8% of meioses. Consequently, the parental (non-recombinant) combinations are seen in 92% of offspring, indicating relatively tight linkage.</p>',
     '<h4>Correct Answer: The genes are approximately 8 cM apart, with parental allele combinations in about 92% of gametes from the heterozygote</h4><p>An 8% recombination frequency means that about 8% of the gametes from the heterozygote carry recombinant combinations of the two marker alleles, while about 92% keep the parental combinations. For loci this close together, 1% recombination corresponds to approximately 1 cM, so the map distance is about 8 cM. In a suitable testcross the offspring classes reveal those gamete proportions.</p><p>Note what the 8% is not: it is not the proportion of meioses containing a crossover. One crossover involves two of the four chromatids, so only half the products of that meiosis are recombinant.</p><p>Illustrating with a testcross of AB/ab &times; ab/ab, the parental classes AB and ab would each be expected at about 46%, and the recombinant classes Ab and aB at about 4% each. Those four proportions follow from this particular cross and should not be imposed on an unspecified one.</p>'],
    ['<ul><li>Recombination frequency (%) = genetic distance in centiMorgans (cM)</li><li>RF of 50% = independent assortment (either different chromosomes or very far apart)</li></ul><p class=\'exp-key\'>Bottom Line: A recombination frequency of 8% means the genes are linked at 8 cM distance, with parental combinations appearing in 92% of offspring.</p>',
     '<ul><li>Recombination frequency is the proportion of recombinant gametes, or of the corresponding offspring classes in a suitable testcross.</li><li>Over short distances, 1% recombination corresponds to about 1 cM. The relation becomes unreliable over larger distances, because two crossovers between the loci can restore a parental combination.</li><li>An RF of 50% is consistent with independent assortment, which can mean two different chromosomes or two loci far apart on the same chromosome.</li><li>A crossover involves two of the four chromatids, so the proportion of recombinant products is not the proportion of meioses with a crossover.</li><li>Genetic map distance is not a fixed number of base pairs: recombination is not evenly distributed along a chromosome.</li></ul><p class=\'exp-key\'>Bottom Line: An 8% recombination frequency means about 8% of gametes are recombinant and about 92% parental, which for loci this close corresponds to a map distance of roughly 8 cM.</p>'],
  ],
},

// ============================================================ Q60 bio-230
// Resident tissue macrophages may already be present and respond before
// recruited neutrophils arrive, so an unconditional "first" is wrong.
{
  q: 60, id: 'bio-230', expectLetter: 'C',
  stemFull: 'Which cells are the most abundant leukocytes in healthy adult blood and are usually among the first phagocytes recruited FROM THE BLOOD to a site of acute bacterial infection?',
  explanation: [
    ['<p>Neutrophils constitute 60–70% of circulating white blood cells and are the first responders to sites of acute bacterial infection. They are attracted by chemotactic factors (including complement fragment C5a and bacterial products) and can rapidly phagocytose and destroy pathogens using reactive oxygen species, myeloperoxidase, and antimicrobial peptides. Neutrophils are short-lived (1–2 days in tissues) and form the major component of pus. Monocytes/macrophages arrive later and persist longer.</p>',
     '<p>Neutrophils are the most abundant leukocytes in healthy adult blood, and they are usually among the first phagocytes recruited out of the circulation to a site of acute bacterial infection. Chemotactic signals, including the complement fragment C5a and bacterial products, draw them across the vessel wall, and they phagocytose and kill pathogens using reactive oxygen species, myeloperoxidase and antimicrobial peptides. They are short-lived in tissue and form the major component of pus. Note the qualification: resident tissue macrophages are already present and can respond immediately, before any neutrophil arrives from the blood, so neutrophils are usually early recruits rather than always the first cells on the scene.</p>'],
    ['<p><strong>A. Monocytes:</strong> Monocytes/macrophages arrive later and persist longer.</p>',
     '<p><strong>A. Monocytes:</strong> Circulating monocytes are generally recruited later than neutrophils, and they persist longer in the tissue, where they mature into macrophages. Resident tissue macrophages are a separate matter: those are already in place and can respond immediately.</p>'],
    ['<p><strong>B. Eosinophils:</strong> Combat parasitic infections and modulate allergic responses.</p>',
     '<p><strong>B. Eosinophils:</strong> Eosinophils act mainly against parasites and take part in allergic responses. They are far less numerous in healthy blood than neutrophils.</p>'],
    ['<p><strong>D. Basophils:</strong> Release histamine and heparin; involved in allergic reactions.</p>',
     '<p><strong>D. Basophils:</strong> Basophils release histamine and other mediators and take part in allergic reactions. They are the least numerous of the circulating leukocytes.</p>'],
    ['<ul><li>Innate immunity provides rapid, non-specific defense (physical barriers, phagocytes, complement, inflammation), while adaptive immunity provides specific, slower but more targeted responses.</li><li>Adaptive immunity has two arms: humoral (B cells producing antibodies) and cell-mediated (T cells directly attacking infected/abnormal cells).</li><li>Immunological memory allows faster and stronger responses to previously encountered antigens - this is the basis of vaccination.</li></ul><p class=\'exp-key\'>Bottom Line: Neutrophils are the most abundant WBCs and the first phagocytes recruited to acute inflammation sites.</p>',
     '<ul><li>Neutrophils are the most abundant leukocytes in healthy adult blood. The normal leukocyte differential varies with age, which is why the adult qualifier matters.</li><li>Chemotactic signals recruit them out of the blood, and they phagocytose and kill pathogens once in the tissue.</li><li>Resident tissue macrophages are already in place and can respond before recruited neutrophils arrive, so neutrophils are usually early recruits rather than invariably first.</li><li>Monocytes are recruited later and mature into macrophages; eosinophils act mainly against parasites and in allergy; basophils release histamine and other mediators in allergic reactions.</li><li>All of these are innate defences: fast, and without the antigen-specific memory of the adaptive response.</li></ul><p class=\'exp-key\'>Bottom Line: Neutrophils are the most abundant leukocytes in healthy adult blood and are usually among the first phagocytes recruited from the blood to acute inflammation. Resident tissue macrophages can respond even earlier.</p>'],
  ],
},

// ============================================================ Q24b bio-294
// The bank holds two near-identical restriction-enzyme items and the review
// could not be matched to one of them with certainty, so the same
// corrections are applied to both rather than fixing one and leaving the
// other asserting that every recognition sequence is palindromic.
{
  q: '24b', id: 'bio-294', expectLetter: 'B',
  optionFull: [[1, 'Cut DNA at or near specific recognition sequences']],
  explanation: [
    ['<h4>Correct Answer: Cut DNA at specific palindromic recognition sequences</h4><p>Restriction endonucleases recognize and cut DNA at specific palindromic sequences (e.g., EcoRI recognizes GAATTC). They may produce sticky ends (overhangs) or blunt ends. They are natural bacterial defense enzymes against phage DNA and are essential tools in recombinant DNA technology.</p>',
     '<h4>Correct Answer: Cut DNA at or near specific recognition sequences</h4><p>Restriction endonucleases recognize short specific sequences in DNA, typically 4 to 8 base pairs long, and cut at or near them. EcoRI, for example, recognizes GAATTC. Many of the commonly taught enzymes recognize palindromic sequences, but not all recognition sequences are palindromic, and some enzymes cut outside the sequence they recognize. The cut leaves either sticky ends, which are short single-stranded overhangs, or blunt ends, depending on the enzyme. Bacteria use these enzymes to degrade incoming phage DNA, and they are essential tools in recombinant DNA technology.</p><p>A DNA palindrome reads the same in the 5&prime; to 3&prime; direction on each of the two complementary strands. That is not the same as reading the same backwards and forwards along a single strand.</p>'],
    ['Restriction enzymes, by contrast, are endonucleases that cut double-stranded DNA at specific recognition sequences, typically 4-8 base pair palindromes.</p>',
     'Restriction enzymes, by contrast, are endonucleases that cut double-stranded DNA at or near specific recognition sequences, typically 4 to 8 base pairs long.</p>'],
    ['<ul><li>The central dogma of molecular biology describes information flow: DNA is transcribed to mRNA, which is translated to protein.</li><li>Eukaryotic gene expression is regulated at multiple levels: chromatin remodeling, transcription, post-transcription (splicing), translation, and post-translation.</li><li>Mutations in DNA can be silent, missense, nonsense, or frameshift - each with different impacts on protein structure and function.</li></ul><p class=\'exp-key\'>Bottom Line: Restriction enzymes cut DNA at palindromic sites. DNA ligase joins fragments. Together they enable gene cloning.</p>',
     '<ul><li>Restriction enzymes cut DNA at or near specific recognition sequences, which is what makes them predictable tools.</li><li>A DNA palindrome reads the same 5&prime; to 3&prime; on both complementary strands. Many recognition sequences are palindromic, but not all of them are.</li><li>DNA ligase does the opposite job: it joins fragments by sealing phosphodiester bonds.</li><li>Cloning works when the insert and the vector have compatible ends, so an enzyme that leaves matching sticky ends is convenient.</li></ul><p class=\'exp-key\'>Bottom Line: Restriction enzymes cut DNA at or near specific recognition sequences; DNA ligase joins fragments. Together they make gene cloning possible.</p>'],
  ],
},

];
