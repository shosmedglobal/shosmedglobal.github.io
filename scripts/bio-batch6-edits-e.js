/**
 * Review batch 6, displayed Q49-Q60 (bio-324 .. bio-341).
 */
'use strict';

const points = items => items.map(t => '<li>' + t + '</li>').join('');

// The generic block shared by Q43 and Q49.
const GENERIC_EVO =
  '<li>Natural selection acts on phenotypic variation within populations - individuals with traits better suited to their environment have higher reproductive success.</li>' +
  '<li>Evidence for evolution comes from multiple independent sources: fossil record, comparative anatomy (homologous structures), molecular biology (DNA/protein comparisons), and biogeography.</li>' +
  '<li>Speciation can occur through geographic isolation (allopatric) or within the same area through ecological or behavioral differences (sympatric).</li>';

// The generic block used by Q54.
const GENERIC_NERVE =
  '<li>The nervous system is divided into the CNS (brain and spinal cord) and PNS (cranial and spinal nerves); the PNS further divides into somatic (voluntary) and autonomic (involuntary) divisions.</li>' +
  '<li>Action potentials propagate along neurons via sequential depolarization; myelination increases conduction speed through saltatory conduction at nodes of Ranvier.</li>' +
  '<li>Neurotransmitters are released at synapses and bind to receptors on postsynaptic cells - excitatory (e.g., glutamate, acetylcholine) or inhibitory (e.g., GABA, glycine).</li>';

module.exports = [

{
  q: 49, id: 'bio-324', expectLetter: 'B',
  stemFull: 'Which early Homo species has a name meaning handy man and is traditionally associated with Oldowan stone tools?',
  headingsGone: [
    'First stone tools',
    'first to leave africa and use fire',
    'first to leave Africa and use fire',
    'Brain Size',
    'earliest known member',
    '~600-700 cm³',
  ],
  explanationFull:
    `<h4>Correct Answer: Homo habilis</h4>` +
    `<p>Homo habilis means handy man. The species was named partly because of its association with stone tools found at Olduvai Gorge, and it is traditionally linked with the Oldowan tool industry. That association does not prove that it was the first toolmaker: stone tools are known from earlier than the recorded range of H. habilis, and the species responsible for the earliest tools is uncertain.</p>` +
    `<table class='exp-table'><tr><th>Species</th><th>Association</th></tr>` +
    `<tr><td>A. afarensis</td><td>Lucy; bipedal australopith</td></tr>` +
    `<tr><td>H. habilis</td><td>Handy man; traditional Oldowan association</td></tr>` +
    `<tr><td>H. erectus</td><td>Early dispersal beyond Africa</td></tr>` +
    `<tr><td>H. neanderthalensis</td><td>Later human species in Eurasia</td></tr></table>` +
    `<h4>Why the other choices are wrong:</h4>` +
    `<p><strong>A. Australopithecus afarensis:</strong> Australopithecus afarensis, the species that includes the famous Lucy fossil, was a bipedal australopith dating to about 3.2 million years ago. It is not the Homo species whose name means handy man.</p>` +
    `<p><strong>C. Homo erectus:</strong> Homo erectus is associated with early dispersal beyond Africa, but its name means upright man, so it is not the species asked about here.</p>` +
    `<p><strong>D. Homo neanderthalensis:</strong> Homo neanderthalensis was a later human species associated with Eurasia, living from roughly 400,000 to 40,000 years ago. It is not the early Homo species called handy man.</p>` +
    `<h4>Key Educational Points:</h4><ul>` + points([
      'Homo habilis means handy man and is traditionally associated with Oldowan tools.',
      'Tool association does not prove that a species invented stone tools or made the earliest known examples.',
      'The fossil and archaeological records include older Homo remains and older tools whose makers are uncertain.',
    ]) + `</ul>` +
    `<p class='exp-key'>Bottom Line: Homo habilis is traditionally associated with Oldowan tools; it is not established as the first stone-tool maker.</p>`,
},

{
  q: 50, id: 'bio-325', expectLetter: 'B',
  explanation: [
    [`The Montreal Protocol (1987) successfully phased out CFC production.`,
     `The Montreal Protocol (1987) has led to major reductions and phaseouts of controlled ozone-depleting substances.`],
    [`<strong>A. Carbon dioxide emissions from fossil fuels:</strong> Carbon dioxide from fossil fuels is the primary driver of the greenhouse effect and global warming, but it does not deplete the ozone layer. CO2 and ozone depletion are two distinct environmental issues. Ozone destruction specifically requires halogen radicals (chlorine and bromine) that are released from CFCs and halons in the stratosphere.`,
     `<strong>A. Carbon dioxide emissions from fossil fuels:</strong> Carbon dioxide from fossil fuels is a major driver of human-caused warming, although it is not the cause of the entire natural greenhouse effect, and it does not deplete the ozone layer. Chlorine and bromine released from ozone-depleting substances such as CFCs and halons are the major causes of human-caused stratospheric ozone loss, although other chemical cycles also affect ozone.`],
    [`<li>Keep the two problems separate: ozone depletion is caused by CFCs, while global warming is driven by CO₂ and CH₄.</li>`,
     `<li>The two problems are distinct, but their chemistry overlaps: chlorine and bromine from ozone-depleting substances are the major causes of human-caused ozone loss, CO₂ and CH₄ drive most human-caused warming, and CFCs are themselves potent greenhouse gases.</li>`],
    [`<li>The Montreal Protocol (1987) phased out CFCs and the ozone layer is now recovering - the clearest success of international environmental regulation.</li>`,
     `<li>The Montreal Protocol (1987) has led to major reductions and phaseouts of controlled ozone-depleting substances, and the ozone layer is recovering.</li>`],
    [`<p class='exp-key'>Bottom Line: Ozone depletion = CFCs/chlorine radicals. Greenhouse effect = CO₂, CH₄. These are different environmental issues with different causes.</p>`,
     `<p class='exp-key'>Bottom Line: CFCs damage stratospheric ozone by releasing chlorine radicals; they also act as greenhouse gases.</p>`],
  ],
},

{
  q: 51, id: 'bio-327', expectLetter: 'C',
  stemFull: 'Most of the epithelial lining of the gastrointestinal tract, along with the main glandular cells of the liver and pancreas, develops from which germ layer?',
  explanation: [
    [`<p>The endoderm (innermost germ layer) gives rise to the epithelial lining of the digestive tract, respiratory tract, and associated organs including the liver, pancreas, thyroid, parathyroid, and thymus. It also forms the lining of the urinary bladder and urethra.</p>`,
     `<p>The endoderm (innermost germ layer) gives rise to most of the epithelial lining of the digestive and respiratory tracts, and to the glandular cells of the associated organs: the hepatocytes of the liver, the acinar and islet cells of the pancreas, the follicular cells of the thyroid, the parathyroid epithelium, and the thymic epithelium. It also forms most of the epithelium of the urinary bladder and urethra. The other parts of these organs, such as connective tissue, blood vessels, and the lymphocytes within the thymus, come from elsewhere. Saying most also allows for the ectodermal contributions at the two ends of the digestive tract.</p>`],
    [`<strong>B. Mesoderm:</strong> The mesoderm gives rise to muscles, bones, cartilage, blood, kidneys, gonads, and the cardiovascular system; this does not include the structures mentioned in the question.`,
     `<strong>B. Mesoderm:</strong> The mesoderm gives rise to muscle, most bone and cartilage, blood, the kidneys, the gonads, and the cardiovascular system. In the gut it supplies the smooth muscle and connective tissue of the wall and the vessels running through it, but not the epithelial lining the question asks about.`],
    [`Despite their remarkable versatility, neural crest cells are not a primary germ layer and do not give rise to the GI lining or associated organs.`,
     `Neural crest cells are not a primary germ layer. They do contribute the enteric neurons found in the gut wall, but they do not supply the digestive epithelium the question asks about.`],
    [`<li>Its derivatives include the lining of the digestive and respiratory tracts, liver, pancreas, thyroid, parathyroid, and thymus.</li>`,
     `<li>Its derivatives include most of the lining of the digestive and respiratory tracts, the glandular cells of the liver and pancreas, and the epithelium of the thyroid, parathyroid, and thymus; thymic lymphocytes, by contrast, are not endodermal.</li>`],
    [`<li>It also lines the urinary bladder and urethra.</li>`,
     `<li>It also forms most of the epithelium of the urinary bladder and urethra.</li>`],
    [`<p class='exp-key'>Bottom Line: Endoderm = 'inner' layer = internal organ linings (GI tract, respiratory tract, liver, pancreas, thyroid).</p>`,
     `<p class='exp-key'>Bottom Line: Endoderm is the inner layer: most of the epithelial lining of the GI and respiratory tracts, plus the glandular cells of the liver, pancreas, and thyroid.</p>`],
  ],
},

{
  q: 52, id: 'bio-328', expectLetter: 'B',
  stemFull: 'Which germ layer gives rise to skeletal muscle, cardiac muscle, most bone and cartilage, blood, and the kidneys?',
  explanation: [
    [`<p>The mesoderm (middle germ layer) differentiates into: skeletal, cardiac, and smooth muscle; bone and cartilage; the circulatory system (blood, blood vessels, heart); kidneys and ureters; the dermis of skin; gonads; and the adrenal cortex.`,
     `<p>The mesoderm (middle germ layer) differentiates into: skeletal, cardiac, and smooth muscle; most of the skeleton, including most bone and cartilage; the circulatory system (blood, blood vessels, heart); kidneys and ureters; much of the dermis of the skin; gonads; and the adrenal cortex.`],
    [`It does not produce skeletal muscle, bone, blood, or kidneys, which are all mesodermal derivatives.`,
     `It does not produce skeletal muscle, blood, or kidneys. It is not quite true that ectoderm produces no bone at all, because neural crest cells, which derive from ectoderm, form some craniofacial bone and cartilage. The whole collection listed in the stem, however, points to mesoderm.`],
    [`<strong>D. Trophoblast:</strong> The trophoblast is the outer cell layer of the blastocyst that gives rise to the placenta and extraembryonic membranes (chorion).`,
     `<strong>D. Trophoblast:</strong> The trophoblast is the outer cell layer of the blastocyst. It contributes to the fetal part of the placenta and to the chorion, rather than forming the whole placenta, which also has other fetal and maternal components.`],
    [`<li>Mesoderm is the middle germ layer and forms muscle, bone, cartilage, blood, and kidneys.</li>`,
     `<li>Mesoderm is the middle germ layer and forms muscle, most bone and cartilage, blood, and the kidneys.</li>`],
    [`<li>Its derivatives also include the heart and vessels, dermis, gonads, and adrenal cortex.</li>`,
     `<li>Its derivatives also include the heart and vessels, much of the dermis, the gonads, and the adrenal cortex.</li>`],
    [`<p class='exp-key'>Bottom Line: Mesoderm = 'middle' = muscles, skeleton, blood, kidneys, cardiovascular system, connective tissues.</p>`,
     `<p class='exp-key'>Bottom Line: Mesoderm is the middle layer: muscle, most of the skeleton, blood, kidneys, the cardiovascular system, and connective tissues.</p>`],
  ],
},

{
  q: 53, id: 'bio-329', expectLetter: 'B',
  explanation: [
    [`The webbing between fingers and toes is removed by programmed cell death during weeks 6-8 of human embryonic development.`,
     `The webbing between fingers and toes is removed by programmed cell death during about weeks 6 to 8 after fertilization.`],
    [`Failure of apoptosis in digit separation leads to syndactyly (webbed fingers/toes).`,
     `Failure to remove the normal interdigital tissue can contribute to syndactyly (webbed fingers or toes), although not every case of syndactyly has that single mechanism.`],
    [`This is a process of cavitation driven by active transport of ions and water, not by apoptosis.`,
     `This is cavitation: ion transport creates an osmotic gradient and water follows by osmosis. It is not apoptosis.`],
    [`<li>In human embryos this occurs around weeks 6 to 8; failure produces syndactyly.</li>`,
     `<li>In human embryos this occurs around weeks 6 to 8 after fertilization, and failure to remove the interdigital tissue can contribute to syndactyly.</li>`],
    [`<li>Apoptosis is orderly and non-inflammatory - cells shrink, fragment, and are phagocytosed intact.</li>`,
     `<li>Apoptosis is orderly and typically does not provoke the inflammatory response associated with uncontrolled cell injury: cells shrink, fragment, and are phagocytosed intact.</li>`],
  ],
},

{
  q: 54, id: 'bio-335', expectLetter: 'B',
  explanation: [
    [`<tr><td>Astrocytes</td><td>Blood-brain barrier, nutrient support, neurotransmitter uptake</td></tr>`,
     `<tr><td>Astrocytes</td><td>Supports blood-brain barrier function, nutrient support, neurotransmitter uptake</td></tr>`],
    [`<strong>C. Astrocytes:</strong> Astrocytes are the most abundant CNS glia. They provide metabolic support, buffer extracellular potassium, take up neurotransmitters, and contribute end-feet to the blood-brain barrier - but they produce no myelin.`,
     `<strong>C. Astrocytes:</strong> Astrocytes are abundant CNS glia that provide metabolic support, buffer extracellular potassium, and take up neurotransmitters. At the blood-brain barrier the principal physical barrier is formed by tight junctions between endothelial cells, with astrocyte end-feet supporting its function. Either way, astrocytes produce no myelin.`],
    [`<strong>D. Microglia:</strong> Microglia are the resident immune cells of the CNS and derive from the monocyte-macrophage lineage rather than from neuroectoderm. They phagocytose debris and dying cells and mediate neuroinflammation, taking no part in myelination.`,
     `<strong>D. Microglia:</strong> Microglia are the resident immune cells of the CNS and arise from embryonic yolk-sac myeloid precursors rather than from neuroectoderm. They phagocytose debris and dying cells and mediate neuroinflammation. They do not form myelin sheaths themselves, although they can influence the process.`],
    [GENERIC_NERVE, points([
      'Oligodendrocytes form CNS myelin, and one cell can myelinate segments of several axons.',
      'A myelinating Schwann cell forms one internode on one PNS axon.',
      'Myelin insulates axons and speeds conduction between nodes of Ranvier.',
    ])],
  ],
},

{
  q: 55, id: 'bio-336', expectLetter: 'B',
  explanation: [
    [`<p>In competitive inhibition, the inhibitor structurally resembles the substrate and competes for binding at the active site. This increases the apparent Kₘ (lower apparent affinity) because more substrate is needed to reach half-maximal velocity.`,
     `<p>In competitive inhibition, the inhibitor competes with the substrate for binding at the active site. Such inhibitors often resemble the substrate structurally, which makes the active-site picture a useful introductory model, but structural resemblance is not required. The competition increases the apparent Kₘ, meaning that a higher substrate concentration is needed to reach half-maximal rate.`],
    [`<strong>C. The inhibitor binds to an allosteric site and decreases V<sub>max</sub>:</strong> An inhibitor that binds to an allosteric site and decreases Vmax describes noncompetitive inhibition, not competitive. Noncompetitive inhibitors bind at a site other than the active site and reduce the number of functional enzyme molecules, decreasing Vmax while leaving Km unchanged. In competitive inhibition, the inhibitor competes directly for the active site.`,
     `<strong>C. The inhibitor binds to an allosteric site and decreases V<sub>max</sub>:</strong> Binding away from the active site can produce mixed or PURE noncompetitive inhibition. In the pure noncompetitive case, inhibitor binding to free enzyme and to the enzyme-substrate complex is equally strong, so Vmax falls while Km is unchanged; when those two affinities differ, the inhibition is mixed and the apparent Km changes as well. In competitive inhibition the inhibitor competes directly for the active site.`],
    [`<li>A competitive inhibitor resembles the substrate and binds the free enzyme at the active site.</li>`,
     `<li>A competitive inhibitor competes with the substrate for the active site on the free enzyme; it commonly resembles the substrate, but that resemblance is not required.</li>`],
    [`<li>Apparent Kₘ rises (affinity appears lower) while Vₘₐₓ is unchanged, because excess substrate can outcompete the inhibitor.</li>`,
     `<li>Apparent Kₘ rises, meaning a higher substrate concentration is needed to reach half-maximal rate, while Vₘₐₓ is unchanged because excess substrate can outcompete the inhibitor.</li>`],
    [`<li>Contrast with non-competitive inhibition (Vₘₐₓ falls, Kₘ unchanged) and uncompetitive inhibition (both fall together).</li>`,
     `<li>Contrast with pure non-competitive inhibition (Vₘₐₓ falls, Kₘ unchanged) and uncompetitive inhibition (both fall together).</li>`],
  ],
},

{
  q: 56, id: 'bio-337', expectLetter: 'B',
  explanation: [
    [`<li>Because these enzymes feed the citric acid cycle, thiamine deficiency impairs aerobic ATP production and raises lactate.</li>`,
     `<li>Pyruvate dehydrogenase links glycolysis to the citric acid cycle, and α-ketoglutarate dehydrogenase acts within the cycle, while transketolase instead acts in the pentose phosphate pathway. Impairing these reactions can reduce oxidative ATP production, and impaired pyruvate oxidation can increase lactate.</li>`],
  ],
},

{
  q: 57, id: 'bio-338', expectLetter: 'C',
  explanation: [
    [`<strong>B. Lines that intersect on the x-axis:</strong> Lines intersecting on the x-axis is the pattern for noncompetitive inhibition. Both lines share the same x-intercept (-1/Km is unchanged) but have different y-intercepts and slopes (Vmax decreases while Km stays the same). This reflects the fact that noncompetitive inhibitors reduce enzyme activity without affecting substrate binding affinity.`,
     `<strong>B. Lines that intersect on the x-axis:</strong> Lines intersecting on the x-axis is the pattern for PURE noncompetitive inhibition. Both lines share the same x-intercept (-1/Km is unchanged) while the y-intercepts and slopes differ, because Vmax decreases and the apparent Km stays the same.`],
    [`<strong>D. Lines that intersect in the second quadrant:</strong> Lines intersecting in the second quadrant (negative x, positive y region) describes mixed inhibition, where the inhibitor can bind both the free enzyme and the enzyme-substrate complex with different affinities. Mixed inhibition changes both Km and Vmax, but not by the same factor (unlike uncompetitive), producing lines that intersect in the upper-left quadrant.`,
     `<strong>D. Lines that intersect in the second quadrant:</strong> A quadrant-II intersection is one pattern of mixed inhibition rather than a universal feature of it. In the standard model, preferential binding to the free enzyme raises the apparent Km and gives a quadrant-II intersection, while preferential binding to the enzyme-substrate complex lowers the apparent Km and gives a quadrant-III intersection; equal affinities give the pure noncompetitive case, intersecting on the x-axis. Uncompetitive inhibition instead produces parallel lines.`],
  ],
},

{
  q: 58, id: 'bio-339', expectLetter: 'B',
  explanation: [
    [`Oxidoreductases catalyze redox reactions, hydrolases cleave bonds using water, and lyases remove groups to form double bonds.`,
     `Oxidoreductases catalyze redox reactions, hydrolases cleave bonds using water, and lyases carry out nonhydrolytic cleavage or the reverse addition across a double bond.`],
    [`They require cofactors such as NAD+, FAD, or metal ions to facilitate electron transfer.`,
     `Many use cofactors such as NAD+, FAD, or metal ions to facilitate electron transfer, although not every oxidoreductase requires one.`],
    [`<strong>D. Lyases:</strong> Lyases (EC class 4) catalyze the removal of groups from substrates by mechanisms other than hydrolysis or oxidation, often forming double bonds or ring structures. Examples include decarboxylases (remove CO2), aldolase (splits fructose-1,6-bisphosphate in glycolysis), and carbonic anhydrase (converts CO2 + H<sub>2</sub>O to bicarbonate). They do not transfer groups between molecules.`,
     `<strong>D. Lyases:</strong> Lyases (EC class 4) catalyze nonhydrolytic cleavage of a bond, often forming a double bond or a ring, as well as the reverse reaction of adding a group across a double bond. Examples include decarboxylases (remove CO2), aldolase (splits fructose-1,6-bisphosphate in glycolysis), and carbonic anhydrase (EC 4.2.1.1, which adds water across the CO2 double bond; water taking part does not make it a hydrolase). They do not transfer groups between molecules.`],
    [`<li>The six classical EC classes: oxidoreductases (redox), transferases (group transfer), hydrolases (cleavage using water), lyases (non-hydrolytic cleavage forming double bonds), isomerases (rearrangement), ligases (bond formation coupled to nucleoside triphosphate hydrolysis).</li>`,
     `<li>The six classical EC classes: oxidoreductases (redox), transferases (group transfer), hydrolases (cleavage using water), lyases (non-hydrolytic cleavage, or addition across a double bond), isomerases (rearrangement), ligases (energy-dependent joining of molecules, usually using ATP). The current EC classification adds a seventh class, the translocases (EC 7).</li>`],
    [`<li>Ligases are distinguished from lyases by their requirement for a nucleoside triphosphate to drive bond formation.</li>`,
     `<li>Ligases are distinguished from lyases because they couple bond formation to an energy source, usually ATP hydrolysis; NAD+-dependent DNA ligase shows that a nucleoside triphosphate is not an absolute requirement.</li>`],
    [`<div style="text-align:center;margin:12px 0"></div>`, ``],
  ],
},

{
  q: 59, id: 'bio-340', expectLetter: 'C',
  explanation: [
    [`<strong>A. Niacin (B₃):</strong> Niacin (vitamin B3) is the precursor for NAD+ (nicotinamide adenine dinucleotide) and NADP+, not FAD. NAD+ is a central electron carrier in catabolic pathways (glycolysis, citric acid cycle), while NADP+ is used in anabolic pathways (fatty acid synthesis, pentose phosphate pathway). Niacin deficiency causes pellagra (dermatitis, diarrhea, dementia).`,
     `<strong>A. Niacin (B₃):</strong> Niacin (vitamin B3) supplies the NAD+/NADH and NADP+/NADPH coenzyme systems, not FAD. NAD+ is a central electron acceptor in catabolic pathways such as glycolysis and the citric acid cycle. NADP+ accepts electrons, for example in the oxidative pentose phosphate pathway, and the reduced form NADPH supplies reducing power for biosynthetic reactions such as fatty-acid synthesis. Niacin deficiency causes pellagra (dermatitis, diarrhea, dementia).`],
    [`Deficiency causes megaloblastic anemia (similar to B12 deficiency) and, critically, neural tube defects in developing embryos.`,
     `Deficiency causes megaloblastic anemia (similar to B12 deficiency) and increases the risk of neural tube defects in a developing embryo.`],
    [`<li>In succinate dehydrogenase the FAD is a permanently bound part of Complex II, which passes its electrons straight to ubiquinone. Bypassing Complex I means one fewer proton-pumping site, so succinate yields less ATP than NADH.</li>`,
     `<li>In succinate dehydrogenase the FAD is a bound part of Complex II, and the electrons pass through Complex II to ubiquinone. Bypassing Complex I means one fewer proton-pumping site, so succinate yields less ATP than NADH.</li>`],
  ],
},

{
  q: 60, id: 'bio-341', expectLetter: 'B',
  stemFull: 'An enzyme follows Michaelis-Menten kinetics and has a Kₘ of 5 mM for substrate A and a Kₘ of 0.1 mM for substrate B. Which conclusion follows from these values alone?',
  optionFull: [
    [1, 'Half-maximal reaction rate is reached at a lower concentration of substrate B than of substrate A'],
  ],
  headingsGone: [
    'The enzyme has higher affinity for substrate B',
    'hexokinase',
    'inversely related',
  ],
  explanationFull:
    `<h4>Correct Answer: B. Half-maximal reaction rate is reached at a lower concentration of substrate B than of substrate A</h4>` +
    `<p>Kₘ is the substrate concentration at which the reaction rate is half of that enzyme-substrate pair's Vₘₐₓ. The reaction with A reaches half of its maximum rate at 5 mM, while the reaction with B reaches half of its maximum rate at 0.1 mM, so B requires a 50-fold lower concentration to reach its own half-maximal rate. Kₘ alone does not establish which substrate binds more tightly or which has the higher maximum rate, because Kₘ reflects both binding and catalytic steps.</p>` +
    `<h4>Why the other choices are wrong:</h4>` +
    `<p><strong>A. The enzyme has higher affinity for substrate A:</strong> Binding affinity cannot be ranked from these Kₘ values alone. Substrate A does have the higher concentration requirement for half-maximal rate, but that is not the same as directly measuring binding strength.</p>` +
    `<p><strong>C. The enzyme reaches Vₘₐₓ more quickly with substrate A:</strong> Kₘ is a concentration, not a time needed to reach a maximum rate. These values also tell us nothing about the catalytic rate constant, or about whether the two Vₘₐₓ values are equal.</p>` +
    `<p><strong>D. Kₘ values cannot be compared between different substrates:</strong> Kₘ values can be compared, to determine the substrate concentrations associated with half-maximal rates. What they do not establish by themselves is binding affinity or overall substrate preference.</p>` +
    `<h4>Key Educational Points:</h4><ul>` + points([
      'For Michaelis-Menten kinetics, Kₘ is the substrate concentration giving half Vₘₐₓ.',
      'Here, substrate B reaches its own half-maximal rate at a 50-fold lower concentration than substrate A.',
      'Kₘ is not generally identical to the substrate-binding dissociation constant K<sub>d</sub>.',
      'For fixed conditions and a given enzyme-substrate pair, Kₘ does not depend on enzyme concentration, whereas Vₘₐₓ does.',
      'Comparing substrate use may require catalytic efficiency (k<sub>cat</sub>/Kₘ) and substrate concentrations, rather than Kₘ alone.',
    ]) + `</ul>` +
    `<p class='exp-key'>Bottom Line: Lower Kₘ means half-maximal rate at a lower substrate concentration; it does not by itself prove tighter binding.</p>`,
},

];
