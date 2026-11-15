/**
 * Batch 2 review, part C: displayed Q35-Q49 (Q37 is a KEEP item).
 */
'use strict';

const ARROW = ' → ';

module.exports = [

// ============================================================ Q35 bio-616
// The explanation called kingdom the most inclusive rank and then correctly
// placed domain above it. Scope the claim to the ranks in the choices.
{
  q: 35, id: 'bio-616', expectLetter: 'A',
  explanation: [
    ['system arranges organisms into nested groups from the most inclusive (Kingdom, containing the most organisms) to the least inclusive (Species, the most specific grouping). The correct order is:</p>',
     'system arranges organisms into nested groups, each one more specific than the last. Among the ranks listed in the choices, kingdom is the most inclusive and species the least. In the broader hierarchy, domain sits above kingdom:</p>'],
    ['<li>The species is the basic unit of classification; it is typically defined as a group of organisms that can interbreed and produce fertile offspring</li>',
     '<li>The species is the basic unit of classification. The biological species concept defines it as a group whose members can interbreed and produce fertile offspring, which applies principally to sexually reproducing organisms rather than to all life</li>'],
  ],
},

// ============================================================ Q36 bio-269
// "Universal start codon" overstates it, and an AUG anywhere in an mRNA does
// not necessarily initiate translation.
{
  q: 36, id: 'bio-269', expectLetter: 'B',
  explanation: [
    ['<p>Anticodon 3\'-UAC-5\' pairs with mRNA codon 5\'-AUG-3\'. AUG is the universal start codon encoding methionine.</p>',
     '<p>Pair the two antiparallel: the anticodon 3&prime;-UAC-5&prime; pairs with the mRNA codon 5&prime;-AUG-3&prime;. AUG is the usual start codon and it encodes methionine. AUG also encodes methionine at internal positions, so an AUG anywhere in an mRNA does not necessarily start translation.</p>'],
    ['The anticodon in this question (3\'-UAC-5\') pairs with AUG, the universal start codon for methionine.</p>',
     'Note the trap: the anticodon here reads UAC, and UAC as a <em>codon</em> would indeed give tyrosine. As an <em>anticodon</em> it pairs with AUG, which gives methionine.</p>'],
    ['While these codons start with AU (similar to AUG), the third position differs. AUG specifically encodes methionine and serves as the start codon for translation initiation in both prokaryotes (as formyl-methionine) and eukaryotes.</p>',
     'These codons begin with AU, like AUG, but the third position differs, and that is enough to change the amino acid. AUG encodes methionine. In bacteria the initiating methionine is carried as formyl-methionine, which does not change the amino acid this tRNA delivers.</p>'],
    ['<ul><li>The central dogma of molecular biology describes information flow: DNA is transcribed to mRNA, which is translated to protein.</li><li>Eukaryotic gene expression is regulated at multiple levels: chromatin remodeling, transcription, post-transcription (splicing), translation, and post-translation.</li><li>Mutations in DNA can be silent, missense, nonsense, or frameshift - each with different impacts on protein structure and function.</li></ul><p class=\'exp-key\'>Bottom Line: AUG is the start codon encoding methionine. Anticodon-codon pairing is antiparallel.</p>',
     '<ul><li>Codon and anticodon pair antiparallel, so mark the 5&prime; and 3&prime; ends of both before comparing them.</li><li>Look the mRNA CODON up in a codon table, not the anticodon. Here the codon is 5&prime;-AUG-3&prime;, which gives methionine.</li><li>Do not confuse the anticodon 3&prime;-UAC-5&prime; with the codon UAC, which codes for tyrosine. That is the trap in this question.</li><li>AUG is the usual start codon, but an AUG further along an mRNA simply codes for an internal methionine.</li></ul><p class=\'exp-key\'>Bottom Line: Anticodon 3&prime;-UAC-5&prime; pairs with codon 5&prime;-AUG-3&prime;, which encodes methionine. Read the codon from the table, not the anticodon.</p>'],
  ],
},

// ============================================================ Q38 bio-113
// "Unique to angiosperms" is stronger than needed; the educational points
// were about plant transport and hormones.
{
  q: 38, id: 'bio-113', expectLetter: 'B',
  explanation: [
    ['<p>Double fertilization is unique to angiosperms. One sperm cell fuses with the egg cell to form the diploid (2n) zygote, which develops into the embryo. The second sperm cell fuses with the two polar nuclei in the central cell to form the triploid (3n) endosperm, which serves as nutritive tissue for the developing embryo and seedling.</p>',
     '<p>Double fertilization as described here is characteristic of angiosperms. One sperm cell fuses with the egg cell to form the diploid (2n) zygote, which develops into the embryo. The second sperm cell fuses with the two polar nuclei of the central cell to form the endosperm, typically triploid (3n), which nourishes the developing embryo and seedling. Both fusions happen in the same reproductive process.</p>'],
    ['<ul><li>Plants alternate between haploid (gametophyte) and diploid (sporophyte) generations; in flowering plants, the sporophyte is dominant.</li><li>Plant transport occurs through xylem (water and minerals, driven by transpiration pull) and phloem (sugars, driven by pressure flow from source to sink).</li><li>Plant hormones (auxins, gibberellins, cytokinins, ethylene, abscisic acid) coordinate growth, development, and responses to environmental stimuli.</li></ul><p class=\'exp-key\'>Bottom Line: Double fertilization is a defining feature of angiosperms - it produces both the embryo (2n) and endosperm (3n) simultaneously, ensuring energy investment in seed nutrient reserves only when fertilization is successful.</p>',
     '<ul><li>Sperm (n) + egg (n) gives the zygote (2n), which develops into the embryo.</li><li>The second sperm (n) + the two polar nuclei (n + n) gives the endosperm, typically 3n, which nourishes the embryo.</li><li>The seed coat develops from the maternal ovule integuments and is not a product of either fertilization event.</li><li>Both fusions occur in the same reproductive process, which is why the seed acquires its embryo and its food store together.</li></ul><p class=\'exp-key\'>Bottom Line: Double fertilization is characteristic of angiosperms: in the same reproductive process it produces the embryo (2n) and the endosperm (3n), so nutrient reserves are laid down only when fertilization has succeeded.</p>'],
  ],
},

// ============================================================ Q39 bio-254
// Archaeal surfaces are variable rather than uniformly pseudopeptidoglycan,
// penicillin and lysozyme do not share a mechanism, and circular chromosomes
// plus 70S ribosomes do not separate Bacteria from Archaea.
{
  q: 39, id: 'bio-254', expectLetter: 'B',
  explanation: [
    ['<p>Peptidoglycan in the cell wall is a defining characteristic of Bacteria. While both Bacteria and Archaea are prokaryotes with circular chromosomes and 70S ribosomes, only Bacteria have peptidoglycan (murein) in their cell walls. Archaea have pseudopeptidoglycan or other polymers. Fungi and Protista are eukaryotes with 80S ribosomes.</p>',
     '<p>True peptidoglycan (murein) in the cell wall identifies Bacteria here. Both Bacteria and Archaea are prokaryotes with circular chromosomes and 70S ribosomes, so those two clues establish only that the organism is a prokaryote and do not separate the two groups. Archaeal cell surfaces are variable: many have a protein S-layer, and some groups have pseudomurein, but Archaea do not make true peptidoglycan. Fungi and protists are eukaryotes, with 80S ribosomes in the cytosol.</p>'],
    ['<p><strong>A. Archaea:</strong> Archaea have pseudopeptidoglycan or other polymers.</p>',
     '<p><strong>A. Archaea:</strong> Archaea are prokaryotes with circular chromosomes and 70S ribosomes, so two of the three clues in the stem fit them just as well as Bacteria. The deciding clue is the wall: archaeal surfaces are variable, often a protein S-layer and in some groups pseudomurein, but they do not contain true peptidoglycan.</p>'],
    ['<p><strong>C. Fungi:</strong> Fungi are eukaryotes with 80S ribosomes, membrane-bound organelles,',
     '<p><strong>C. Fungi:</strong> Fungi are eukaryotes with 80S ribosomes in the cytosol, membrane-bound organelles,'],
    ['<p><strong>D. Protista:</strong> Protists are a diverse group of eukaryotes with 80S ribosomes and membrane-bound organelles.',
     '<p><strong>D. Protista:</strong> Protists are a diverse group of eukaryotes with 80S ribosomes in the cytosol and membrane-bound organelles.'],
    ['<li>Archaea have pseudopeptidoglycan or S-layer proteins instead.</li><li>Fungi and protists are eukaryotes with 80S ribosomes; fungal walls contain chitin, not peptidoglycan.</li><li>Because only Bacteria make peptidoglycan, penicillin and lysozyme act on Bacteria but not on Archaea.</li>',
     '<li>Archaeal surfaces are variable: often protein S-layers, and pseudomurein in some groups. Do not assume every archaeon has it.</li><li>Fungi and protists are eukaryotes with 80S ribosomes in the cytosol; fungal walls contain chitin, not peptidoglycan.</li><li>Penicillin, an antibiotic, blocks peptidoglycan cross-linking. Lysozyme, an antibacterial enzyme, cleaves bonds in the sugar backbone of peptidoglycan. They are different mechanisms acting on the same structure, and neither works on Archaea, which have no true peptidoglycan. Not every bacterium is susceptible to them either.</li>'],
    ['<p class=\'exp-key\'>Bottom Line: Peptidoglycan is unique to bacterial cell walls and is the target of antibiotics like penicillin and lysozyme.</p>',
     '<p class=\'exp-key\'>Bottom Line: True peptidoglycan in the cell wall is what identifies Bacteria in this question. Circular chromosomes and 70S ribosomes show only that the organism is a prokaryote.</p>'],
  ],
},

// ============================================================ Q40 bio-263
// Not all anaerobic ATP comes from glycolysis (phosphocreatine also
// regenerates ATP without oxygen), and the Krebs cycle does not stop during
// intense exercise.
{
  q: 40, id: 'bio-263', expectLetter: 'B',
  explanation: [
    ['<p>During lactic acid fermentation, lactate dehydrogenase reduces pyruvate to lactate while oxidizing NADH back to NAD⁺. This regeneration of NAD⁺ is essential because glycolysis requires NAD⁺ at the glyceraldehyde-3-phosphate dehydrogenase step. Without NAD⁺ recycling, glycolysis would halt and no ATP could be produced anaerobically.</p>',
     '<p>Lactate dehydrogenase transfers electrons from NADH to pyruvate, forming lactate and regenerating cytosolic NAD⁺. That regeneration is what matters here, because glycolysis needs NAD⁺ at the glyceraldehyde-3-phosphate dehydrogenase step; without it, glycolysis would stall and stop producing ATP. The conversion of pyruvate to lactate itself produces no additional ATP and no CO₂. Note that lactate can be formed even when oxygen is present, so a high rate of lactate production does not prove that oxygen is absent.</p>'],
    ['ATP production in anaerobic conditions comes exclusively from glycolysis (substrate-level phosphorylation). Fermentation\'s role is solely to recycle NAD+ so glycolysis can continue.</p>',
     'Without oxygen, glycolysis is the main source of ATP from glucose, and phosphocreatine can also regenerate ATP without oxygen. The key role of this particular reaction is to recycle NAD⁺ so that glycolysis can continue.</p>'],
    ['<p><strong>D. To activate the Krebs cycle:</strong> The Krebs (citric acid) cycle requires oxygen indirectly (because the ETC must be running to regenerate NAD+ and FAD). During intense anaerobic exercise, the Krebs cycle slows or stops because the mitochondrial NAD+ pool becomes depleted. Lactate fermentation is actually an alternative to the Krebs cycle, not an activator of it.</p>',
     '<p><strong>D. To activate the Krebs cycle:</strong> Recycling NAD⁺ in the cytosol does not directly activate the mitochondrial citric acid cycle, which has its own NAD⁺ pool. Aerobic metabolism continues during intense exercise; lactate formation simply allows glycolysis to run faster than pyruvate can be oxidised in the mitochondria.</p>'],
    ['<li>The sole purpose of lactate fermentation is to regenerate NAD⁺ so glycolysis can continue.</li>',
     '<li>The key role of this reaction in this context is to regenerate cytosolic NAD⁺ so glycolysis can continue.</li>'],
    ['<li>Fermentation yields no additional ATP itself - all anaerobic ATP comes from glycolysis.</li><li>Lactate is not a waste product: it is exported and reconverted to glucose in the liver via the Cori cycle.</li></ul><p class=\'exp-key\'>Bottom Line: Fermentation does not produce additional ATP - its sole purpose is to regenerate NAD⁺ to keep glycolysis running under anaerobic conditions.</p>',
     '<li>The reaction yields no additional ATP and no CO₂. Glycolysis is the ATP-producing step, and phosphocreatine is another source that needs no oxygen.</li><li>Lactate is not simply a waste product: other tissues can oxidise it as fuel, and the liver can convert it back to glucose.</li><li>Lactate can be produced even when oxygen is available, so its appearance is not proof that oxygen has run out.</li></ul><p class=\'exp-key\'>Bottom Line: This reaction produces no extra ATP. Its key role is to regenerate cytosolic NAD⁺ so that glycolysis can keep running and keep making ATP.</p>'],
  ],
},

// ============================================================ Q41 bio-529
// Ectotherm/endotherm and homeotherm/poikilotherm are two separate axes.
{
  q: 41, id: 'bio-529', expectLetter: 'D',
  explanation: [
    ['<p>Ectotherms (including most reptiles, amphibians, fish, and invertebrates) depend primarily on external environmental heat sources to regulate their body temperature. Behavioral thermoregulation, such as basking in the sun, is a key strategy. Ectotherms have lower metabolic rates and cannot generate sufficient internal heat to maintain a constant body temperature.</p>',
     '<p>Ectotherms, including most reptiles, amphibians, fish and invertebrates, depend mainly on heat from their surroundings. Behavioural thermoregulation, such as basking in the sun, is a key strategy, and that is exactly what the lizard in the stem is doing. Ectotherms produce less metabolic heat, so their body temperature depends largely on the environment and on behaviour.</p><p>Two separate classifications are easy to confuse here. Ectotherm and endotherm describe where an animal&rsquo;s body heat mainly comes from. Homeotherm and poikilotherm describe how stable its body temperature is. The behaviour in the stem tells you about the source of heat, not about stability.</p>'],
    ['<p><strong>A. An endotherm that generates heat metabolically:</strong> Endotherms (mammals and birds) generate body heat primarily through their own metabolism. They maintain relatively constant internal temperatures regardless of external conditions, which requires higher caloric intake.</p>',
     '<p><strong>A. An endotherm that generates heat metabolically:</strong> Endotherms, such as mammals and birds, generate most of their body heat through their own metabolism and keep a relatively constant internal temperature across a range of external conditions, which requires a higher energy intake. A lizard warming itself on a rock is doing the opposite: taking heat from outside.</p>'],
    ['<p><strong>B. A homeotherm with a constant body temperature:</strong> Homeotherms maintain a stable internal temperature. While some ectotherms can achieve relatively stable temperatures through behavior, lizards are poikilotherms whose body temperature fluctuates with the environment.</p>',
     '<p><strong>B. A homeotherm with a constant body temperature:</strong> Homeothermy describes a relatively stable body temperature, whereas the behaviour in the stem identifies reliance on external heat. These are two different classifications, so this option does not answer what was asked. Some ectotherms do keep a fairly stable body temperature, through behaviour or because they live in a stable environment.</p>'],
    ['<ul><li>Ectotherms use behavioral strategies (basking, burrowing) for thermoregulation</li><li>Endothermy is metabolically expensive but allows activity in variable conditions</li></ul>',
     '<ul><li>Ectotherms use behavioural strategies such as basking and burrowing to regulate temperature.</li><li>Endothermy is metabolically expensive but allows activity in variable conditions.</li><li>Ectotherm and endotherm refer to the main source of body heat; homeotherm and poikilotherm refer to how stable the body temperature is. An animal is described on both axes separately.</li></ul>'],
  ],
},

// ============================================================ Q42 bio-243
// D2 described as "plant-derived" while the example given is mushrooms,
// which are fungi. Also the previtamin D3 step, and calcidiol as the main
// circulating form rather than simply a storage form.
{
  q: 42, id: 'bio-243', expectLetter: 'B',
  explanation: [
    ['<p>UVB radiation converts 7-dehydrocholesterol in the skin to cholecalciferol (vitamin D3). This is then transported to the liver, where it is hydroxylated to 25-hydroxyvitamin D (calcidiol), the main circulating form used to assess vitamin D status. Finally, calcidiol is converted to the active form, 1,25-dihydroxyvitamin D (calcitriol), in the kidneys by 1-alpha-hydroxylase under PTH stimulation. Ergocalciferol (D2) is the plant-derived form obtained from diet.</p>',
     '<p>UVB radiation converts 7-dehydrocholesterol in the skin to previtamin D3, which then becomes cholecalciferol (vitamin D3). This travels to the liver, where it is hydroxylated to 25-hydroxyvitamin D (calcidiol), the main circulating form and the one measured to assess vitamin D status. Calcidiol is then converted in the kidneys to the active form, 1,25-dihydroxyvitamin D (calcitriol). The sequence to remember is skin to D3, liver to 25-hydroxyvitamin D, kidney to active calcitriol. Vitamin D2 (ergocalciferol) is obtained from the diet, from sources such as UV-exposed fungi, including mushrooms and yeast, and from fortified foods.</p>'],
    ['<p><strong>D. Ergocalciferol (vitamin D2):</strong> Ergocalciferol (vitamin D2) is the plant-derived form of vitamin D, obtained from dietary sources such as mushrooms and fortified foods. It is NOT produced in human skin. The skin exclusively produces cholecalciferol (D3) from 7-dehydrocholesterol upon UVB exposure. Both D2 and D3 undergo the same liver and kidney activation steps.</p>',
     '<p><strong>D. Ergocalciferol (vitamin D2):</strong> Vitamin D2 comes from the diet, from sources such as UV-exposed fungi, including mushrooms and yeast, and from fortified foods. Mushrooms are fungi rather than plants, so describing D2 as plant-derived is misleading. D2 is not made in human skin: the skin produces D3 from 7-dehydrocholesterol on UVB exposure. Both D2 and D3 then go through the same liver and kidney steps.</p>'],
    ['<li>UVB converts 7-dehydrocholesterol in skin to cholecalciferol, vitamin D3.</li>',
     '<li>UVB converts 7-dehydrocholesterol in the skin to previtamin D3, which becomes cholecalciferol, vitamin D3.</li>'],
    ['<li>Calcidiol is the storage form measured to assess vitamin D status; calcitriol is the active hormone.</li>',
     '<li>Calcidiol is the main circulating form, and the one measured to assess vitamin D status; calcitriol is the active hormone.</li>'],
    ['<li>Ergocalciferol (D2) is the plant-derived dietary form; because the liver and kidney steps are required, renal disease impairs activation regardless of sun exposure.</li>',
     '<li>Ergocalciferol (D2) is a dietary form, from UV-exposed fungi such as mushrooms and yeast and from fortified foods. The key lesson is the sequence and where each step happens.</li>'],
  ],
},

// ============================================================ Q43 bio-314
// Amphotericin B is an antifungal and does not belong in a list of drugs
// disrupting the BACTERIAL membrane. The Gram-negative discussion was long
// and clinical for the level.
{
  q: 43, id: 'bio-314', expectLetter: 'B',
  explanation: [
    ['This is why penicillin is bactericidal. Penicillin G is active against many susceptible Gram-positive organisms, whose peptidoglycan and penicillin-binding proteins are directly accessible from outside the cell. In Gram-negative bacteria an additional outer membrane lies over the peptidoglycan and restricts the drug from reaching those targets. Wall architecture is not the whole story, though: beta-lactamase production, how tightly a drug binds particular PBPs, and the chemistry of the individual beta-lactam all shape its spectrum, which is why later agents such as aminopenicillins, extended-spectrum cephalosporins and carbapenems treat many Gram-negative infections.</p>',
     'This is why penicillin is bactericidal, and why beta-lactams are most effective against actively growing bacteria that are building new cell wall. Whether a particular bacterium is susceptible depends on whether the drug reaches and binds its target, and on whether the bacterium can inactivate it: an outer membrane over the peptidoglycan, altered penicillin-binding proteins, and beta-lactamase enzymes can all contribute to resistance.</p>'],
    ['<p><strong>C. Disrupting the bacterial cell membrane:</strong> Disruption of the bacterial cell membrane is the mechanism of polymyxin antibiotics (e.g., colistin) and the antifungal amphotericin B. These drugs insert into and destabilize the membrane lipid bilayer.',
     '<p><strong>C. Disrupting the bacterial cell membrane:</strong> Disruption of the bacterial cell membrane is the mechanism of the polymyxins, such as colistin, which insert into and destabilize the membrane lipid bilayer.'],
    ['<li>In Gram-positive bacteria the peptidoglycan and its PBPs sit at the cell surface and are readily accessible, which is part of why traditional penicillins work well against susceptible Gram-positive organisms. In Gram-negatives an outer membrane covers them, and the drug must cross it through porin channels.</li><li>Accessibility is not the only factor deciding spectrum: beta-lactamase production by the organism, how tightly the drug binds particular PBPs, and the chemistry of the individual beta-lactam all matter. This is why aminopenicillins, extended-spectrum cephalosporins and carbapenems are useful against many Gram-negatives.</li><li>Beta-lactams act only on actively growing cells, since the target is wall synthesis rather than an existing wall.</li>',
     '<li>Susceptibility depends on whether the drug reaches and binds its target and whether the bacterium can inactivate it. An outer membrane, altered targets, and beta-lactamases can all contribute to resistance.</li><li>Beta-lactams are most effective against actively growing bacteria making new cell wall, since the target is wall synthesis rather than an existing wall.</li>'],
    ['<p class=\'exp-key\'>Bottom Line: Beta-lactams inhibit cell wall synthesis. Bacterial resistance via beta-lactamase enzymes that cleave the beta-lactam ring.</p>',
     '<p class=\'exp-key\'>Bottom Line: Beta-lactams inhibit cell wall synthesis by blocking peptidoglycan cross-linking. Beta-lactamases, which cleave the beta-lactam ring, are one resistance mechanism among several.</p>'],
  ],
},

// ============================================================ Q44 bio-212
// The explanation listed segmental arteries while the answer and takeaway
// presented a complete sequence without them. Segmental artery is added to
// all four choices, preserving the wrong downstream order in B, C and D.
{
  q: 44, id: 'bio-212', expectLetter: 'A',
  optionFull: [
    [0, 'Renal artery' + ARROW + 'segmental artery' + ARROW + 'interlobar artery' + ARROW + 'arcuate artery' + ARROW + 'interlobular artery' + ARROW + 'afferent arteriole'],
    [1, 'Renal artery' + ARROW + 'segmental artery' + ARROW + 'arcuate artery' + ARROW + 'interlobar artery' + ARROW + 'interlobular artery' + ARROW + 'afferent arteriole'],
    [2, 'Renal artery' + ARROW + 'segmental artery' + ARROW + 'interlobular artery' + ARROW + 'interlobar artery' + ARROW + 'arcuate artery' + ARROW + 'afferent arteriole'],
    [3, 'Renal artery' + ARROW + 'segmental artery' + ARROW + 'afferent arteriole' + ARROW + 'interlobar artery' + ARROW + 'arcuate artery' + ARROW + 'interlobular artery'],
  ],
  explanation: [
    ['<h4>Correct Answer: A) Renal artery → interlobar artery → arcuate artery → interlobular artery → afferent arteriole</h4><p>Blood enters the kidney via the renal artery, which branches into segmental arteries, then interlobar arteries (running between the renal pyramids), arcuate arteries (arching along the corticomedullary junction), interlobular arteries (ascending into the cortex), and finally the afferent arterioles that supply the glomeruli. This progressive branching ensures adequate blood supply to approximately 1 million nephrons per kidney.</p>',
     '<h4>Correct Answer: A) Renal artery → segmental artery → interlobar artery → arcuate artery → interlobular artery → afferent arteriole</h4><p>Blood enters the kidney through the renal artery, which divides into segmental arteries, then interlobar arteries running between the renal pyramids, arcuate arteries arching along the boundary between cortex and medulla, interlobular arteries (also called cortical radiate arteries) running outward into the cortex, and finally the afferent arterioles that supply the glomeruli. This progressive branching supplies roughly a million nephrons per kidney.</p>'],
    ['<p><strong>B. Renal artery → arcuate artery → interlobar artery → interlobular artery → afferent arteriole:</strong> This sequence incorrectly places the arcuate artery before the interlobar artery.',
     '<p><strong>B. Renal artery → segmental artery → arcuate artery → interlobar artery → interlobular artery → afferent arteriole:</strong> This sequence incorrectly places the arcuate artery before the interlobar artery.'],
    ['Only after reaching the corticomedullary junction do they become arcuate arteries that arch along this boundary. Getting the order correct helps when understanding the zones affected by vascular disease.</p>',
     'Only on reaching the boundary between cortex and medulla do they become arcuate arteries, which arch along it.</p>'],
    ['<p><strong>C. Renal artery → interlobular artery → interlobar artery → arcuate artery → afferent arteriole:</strong> This sequence incorrectly begins with interlobular arteries, which are actually the smallest named arteries in the kidney\'s branching pattern (before the afferent arterioles). The correct progression moves from largest to smallest: renal artery to interlobar to arcuate to interlobular to afferent arteriole.</p>',
     '<p><strong>C. Renal artery → segmental artery → interlobular artery → interlobar artery → arcuate artery → afferent arteriole:</strong> This sequence puts the interlobular arteries too early. They are the smallest named arteries in the branching pattern, immediately before the afferent arterioles. The order runs from largest to smallest: renal, segmental, interlobar, arcuate, interlobular, afferent arteriole.</p>'],
    ['<p><strong>D. Renal artery → afferent arteriole → interlobar artery → arcuate artery → interlobular artery:</strong> This sequence places the afferent arteriole immediately after the renal artery, skipping all intermediate branches. The afferent arteriole is the final arterial branch before the glomerular capillary bed. Several levels of branching (interlobar, arcuate, interlobular) occur between the renal artery and the afferent arteriole.</p>',
     '<p><strong>D. Renal artery → segmental artery → afferent arteriole → interlobar artery → arcuate artery → interlobular artery:</strong> This sequence places the afferent arteriole near the start, skipping the intermediate branches. The afferent arteriole is the last arterial branch before the glomerular capillary bed, so several levels of branching come before it.</p>'],
    ['<ul><li>The nephron is the functional unit of the kidney - it performs filtration (glomerulus), selective reabsorption (tubules), and secretion to produce urine.</li><li>The proximal tubule reabsorbs the bulk of filtered solutes; the loop of Henle creates the concentration gradient; the collecting duct determines final urine concentration.</li><li>ADH (from posterior pituitary) increases water reabsorption in the collecting duct; aldosterone (from adrenal cortex) increases Na+ reabsorption in the distal tubule.</li></ul><p class=\'exp-key\'>Bottom Line: Renal blood flow follows: renal artery → interlobar → arcuate → interlobular → afferent arteriole → glomerulus.</p>',
     '<ul><li>Interlobar arteries run between the renal pyramids, in the renal columns.</li><li>Arcuate arteries arch along the boundary between cortex and medulla.</li><li>Interlobular arteries, also called cortical radiate arteries, run outward into the cortex and give off the afferent arterioles.</li><li>Past the afferent arteriole the route continues: glomerular capillaries, efferent arteriole, then peritubular capillaries and vasa recta.</li><li>This is the path of blood. Filtrate takes a different route, out of the glomerulus into the tubule, and the two should not be mixed up.</li></ul><p class=\'exp-key\'>Bottom Line: Renal blood flow runs renal artery → segmental → interlobar → arcuate → interlobular (cortical radiate) → afferent arteriole → glomerulus.</p>'],
  ],
},

// ============================================================ Q45 bio-611
// Pax7 is a muscle-development transcription factor but not one of the
// canonical myogenic regulatory factors, and the educational points were
// pitched above the level the question is for.
{
  q: 45, id: 'bio-611', expectLetter: 'A',
  explanation: [
    ['<p><strong>D. MyoD, Pax7, Myogenin, and Mrf4:</strong> These are <strong>myogenic regulatory factors (MRFs)</strong> - transcription factors that drive differentiation of stem cells into <strong>skeletal muscle cells</strong>. MyoD was actually the first master regulatory transcription factor discovered (it can convert fibroblasts into muscle cells). These factors drive differentiation toward a specific lineage, the opposite of the Yamanaka factors, which drive de-differentiation back to pluripotency.</p>',
     '<p><strong>D. MyoD, Pax7, Myogenin, and Mrf4:</strong> These are transcription factors involved in skeletal-muscle development, not the classic four-factor combination for inducing pluripotency. They push a cell toward one particular lineage, which is the opposite direction from the Yamanaka factors. Note that Pax7, although it contributes to muscle development, is not one of the canonical myogenic regulatory factors.</p>'],
    ['<ul><li>Oct3/4 and Sox2 are the most critical - they are sometimes sufficient for reprogramming when combined with small molecules</li><li>c-Myc increases efficiency but also increases tumor risk; safer protocols may omit it</li><li>Alternative factor combinations (e.g., Thomson factors: Oct4, Sox2, Nanog, Lin28) can also generate iPSCs</li></ul>',
     '<ul><li>A differentiated cell can be reprogrammed: its specialized state is not permanent.</li><li>Transcription factors act by changing which genes a cell expresses, so introducing the right ones can change the cell&rsquo;s whole programme.</li><li>Pluripotent cells can give rise to cell types from all three germ layers, but they are not equivalent to a totipotent zygote, which can also form the extraembryonic tissues.</li><li>Recalling all four factor names is a harder extension rather than the main point of the question.</li></ul>'],
  ],
},

// ============================================================ Q46 bio-119
// Same absolute as Q20, plus cleavage described as categorically excluding
// specialization. Educational points were about development in general.
{
  q: 46, id: 'bio-119', expectLetter: 'D',
  explanation: [
    ['<p>Differentiation is the process by which unspecialized cells acquire specialized structures and functions through selective gene expression. All cells in an organism contain the same genome, but differentiation involves the activation and silencing of specific gene sets, giving each cell type its characteristic morphology and function. Determination refers to the earlier commitment of a cell to a particular fate, while differentiation is the actual acquisition of specialized features.</p>',
     '<p>Differentiation is the process by which unspecialized cells acquire specialized structures and functions, through selective gene expression. Most nucleated somatic cells in an organism share essentially the same genome; differentiation works by activating and silencing particular sets of genes, which gives each cell type its characteristic shape and function. Determination is the earlier commitment of a cell to a fate, while differentiation is the acquisition of the specialized features themselves.</p>'],
    ['During cleavage, the total embryo size stays roughly the same while cell number increases dramatically. Cleavage increases cell number but does not involve cellular specialization-that comes later during differentiation.</p>',
     'During cleavage the embryo as a whole grows little while the number of cells rises sharply. Cleavage is defined by that pattern of rapid division with little overall growth, rather than by producing specialized cells, although some specification can begin during this period.</p>'],
    ['<ul><li>Human embryonic development proceeds through cleavage, gastrulation (three germ layer formation), neurulation, and organogenesis.</li><li>Gastrulation establishes the three primary germ layers (ectoderm, mesoderm, endoderm) that give rise to all tissues and organs.</li><li>Spermatogenesis produces four functional sperm from each primary spermatocyte; oogenesis produces one functional egg plus polar bodies from each primary oocyte.</li></ul><p class=\'exp-key\'>Bottom Line: Differentiation involves changes in gene expression, not changes in DNA sequence - a neuron and a muscle cell contain identical genomes but express different gene sets.</p>',
     '<ul><li>Determination is the commitment of a cell to a particular fate, before any visible change appears.</li><li>Differentiation is the acquisition of the specialized structure and function that follows.</li><li>Induction is signalling from one group of cells that can influence the fate of neighbouring cells.</li><li>Cleavage is the period of rapid division after fertilization, with little overall growth of the embryo.</li></ul><p class=\'exp-key\'>Bottom Line: Determination commits a cell to a fate; differentiation gives it specialized features; induction is signalling that can influence that fate. Differentiation changes gene expression, not the DNA sequence.</p>'],
  ],
},

// ============================================================ Q47 bio-310
// Statements about ALL bacterial chromosomes and transposons are too broad,
// because other conjugation systems exist. Scope the item to the F system.
{
  q: 47, id: 'bio-310', expectLetter: 'B',
  stemFull: 'In the classic F-plasmid conjugation system of <em>Escherichia coli</em>, which genetic element carries the genes for sex-pilus formation and DNA transfer?',
  explanation: [
    ['<p>The F plasmid (fertility factor) encodes the genes needed for sex pilus formation and DNA transfer. F⁺ cells (donors) have the F plasmid and form pili to connect with F⁻ cells (recipients). During conjugation, a single strand of the F plasmid is transferred. Hfr cells have the F plasmid integrated into the chromosome, allowing transfer of chromosomal genes.</p>',
     '<p>The F factor (fertility factor) carries the genes for sex-pilus formation and DNA transfer. In an F⁺ donor the pilus helps establish contact with an F⁻ recipient, and the conjugation machinery then mediates transfer of a single strand of the F plasmid, which is copied in both cells. In an Hfr cell the F factor has integrated into the chromosome, so conjugation can carry chromosomal genes across as well. Other conjugation systems exist in bacteria, including conjugative elements that sit in the chromosome, so this describes the classic F system rather than every case of bacterial DNA transfer.</p>'],
    ['<p><strong>A. Bacterial chromosome only:</strong> The bacterial chromosome alone does not encode the sex pilus or the transfer machinery needed for conjugation. Hfr (High frequency recombination) strains do have the F plasmid integrated into their chromosome, allowing chromosomal DNA transfer during conjugation. However, the genes for pilus formation and conjugation originally come from the F plasmid.</p>',
     '<p><strong>A. Bacterial chromosome only:</strong> In this system the pilus and transfer genes are F-factor genes, not genes the chromosome carries on its own. In an Hfr (high frequency recombination) strain the F factor has integrated into the chromosome, so those genes are then physically located there and chromosomal DNA can be transferred, but they are still F-factor genes.</p>'],
    ['<p><strong>C. Transposon:</strong> A transposon ("jumping gene") is a mobile genetic element that can move from one location to another within or between DNA molecules. While transposons can carry antibiotic resistance genes and other traits, they do not encode the sex pilus. Transposons rely on transposase enzyme to cut and paste (or copy) themselves into new genomic locations.</p>',
     '<p><strong>C. Transposon:</strong> A transposon, or jumping gene, is a mobile element that moves from one location to another within or between DNA molecules, using a transposase to cut and paste or copy itself. Transposons can carry genes such as antibiotic resistance, but the pilus and transfer genes of this system belong to the F factor, not to a transposon.</p>'],
    ['Bacteriophages can transfer bacterial DNA through transduction, which is a separate mechanism from conjugation. In transduction, bacterial DNA is accidentally packaged in phage particles, not transferred via a pilus.</p>',
     'Bacteriophages can move bacterial DNA by transduction, which is a separate mechanism from conjugation. Accidental packaging of host DNA into phage particles is generalized transduction, one form of it. Either way no pilus is involved.</p>'],
    ['<li>An F⁺ donor forms a pilus to contact an F⁻ recipient, and a single strand of the plasmid is transferred and then copied.</li>',
     '<li>In an F⁺ donor the pilus helps establish contact with an F⁻ recipient; the conjugation machinery then transfers a single strand of the plasmid, which is copied in both cells.</li>'],
  ],
},

// ============================================================ Q48 bio-405
// Calling other malaria species "benign" or ranking one as the "mildest"
// teaches false reassurance, and the four-species framing is not an
// exhaustive modern list. Treatment instructions removed.
{
  q: 48, id: 'bio-405', expectLetter: 'C',
  explanation: [
    ['<p>Plasmodium falciparum causes the most severe and lethal form of malaria. It can infect red blood cells of all ages (unlike P. vivax which prefers reticulocytes), leading to high parasitemia. Infected RBCs express PfEMP1 surface proteins that adhere to endothelial cells in capillaries (sequestration), causing microvascular obstruction. In the brain, this leads to cerebral malaria. P. falciparum also causes severe anemia, acute respiratory distress syndrome, and organ failure.</p>',
     '<p><em>Plasmodium falciparum</em> causes the most severe form of malaria. It can infect red cells of different ages, so the proportion of infected cells can rise much higher than with the other species. Infected cells adhere to the lining of small blood vessels, which can impair blood flow; when this happens in the brain it is the basis of cerebral malaria. Severe anaemia and failure of other organs can also occur. The adhesion protein involved is called PfEMP1, which is useful extra detail rather than knowledge the question requires.</p>'],
    ['<p><strong>A. Plasmodium vivax:</strong> Plasmodium vivax causes benign tertian malaria with 48-hour fever cycles. While it can cause significant illness, it rarely causes the severe complications seen with P. falciparum. P. vivax has a dormant liver stage (hypnozoite) that can cause relapses months or years after initial infection, requiring treatment with primaquine to eliminate this stage.</p>',
     '<p><strong>A. Plasmodium vivax:</strong> <em>P. vivax</em> typically infects young red cells, which limits how high the proportion of infected cells can go. It has a dormant liver stage, the hypnozoite, which can cause relapse months or years later. It is not the characteristic cause of cerebral malaria, but it can still cause severe illness, so it should not be thought of as harmless.</p>'],
    ['<p><strong>B. Plasmodium ovale:</strong> Plasmodium ovale also causes benign tertian malaria and, like P. vivax, can form hypnozoites in the liver leading to relapses. It is the least common of the four major human Plasmodium species and is found mainly in West Africa. It causes milder illness than P. falciparum.</p>',
     '<p><strong>B. Plasmodium ovale:</strong> <em>P. ovale</em> can also form dormant liver stages and cause relapse, as <em>P. vivax</em> does. It is uncommon and found mainly in West Africa. It is not the classic answer for cerebral malaria.</p>'],
    ['<p><strong>D. Plasmodium malariae:</strong> Plasmodium malariae causes quartan malaria with 72-hour fever cycles. It produces the mildest form of malaria but can persist in the blood at very low levels for decades if untreated. It does not cause cerebral malaria. P. malariae is associated with nephrotic syndrome in chronic infections.</p>',
     '<p><strong>D. Plasmodium malariae:</strong> <em>P. malariae</em> classically produces a 72-hour fever cycle and may persist in the blood at low levels for long periods. It is not the characteristic cause of cerebral malaria. Note that these fever cycles are classic patterns rather than something guaranteed in every patient.</p>'],
    ['<li>Infected cells express PfEMP1 and adhere to capillary endothelium - sequestration - obstructing microcirculation.</li><li>Cerebral sequestration produces coma; other severe manifestations include profound anaemia, ARDS, and renal failure.</li>',
     '<li>Infected cells adhere to the lining of small vessels, which obstructs blood flow. The adhesion protein, PfEMP1, is optional detail.</li><li>Adhesion in cerebral vessels underlies cerebral malaria; severe anaemia and organ failure are other severe manifestations.</li>'],
  ],
},

// ============================================================ Q49 bio-319
// Methane is an organic compound, so the starting mixture was not "inorganic
// gases". The experiment's assumptions are also not its conclusions.
{
  q: 49, id: 'bio-319', expectLetter: 'B',
  optionFull: [[1, 'Organic molecules such as amino acids can form abiotically from simple starting materials under simulated early-Earth conditions']],
  explanation: [
    ['<h4>Correct Answer: Organic molecules such as amino acids can be synthesized from inorganic gases under simulated early Earth conditions</h4><p>Miller and Urey simulated the hypothesized early Earth atmosphere (CH₄, NH₃, H₂, H₂O) with electrical sparks (simulating lightning). They produced several amino acids and other organic molecules, supporting the hypothesis that abiotic synthesis of organic building blocks was possible on the early, reducing (oxygen-free) Earth.</p>',
     '<h4>Correct Answer: Organic molecules such as amino acids can form abiotically from simple starting materials under simulated early-Earth conditions</h4><p>Miller and Urey passed an electrical discharge, standing in for lightning, through a mixture containing methane (CH₄), ammonia (NH₃), hydrogen (H₂) and water vapour. Amino acids and other small organic compounds formed without any living organism present. Note that methane is itself an organic compound, so the starting mixture was not purely inorganic.</p><p>Keep the experiment&rsquo;s assumptions separate from its conclusions. It used a strongly reducing mixture, but it did not establish what Earth&rsquo;s early atmosphere actually contained.</p>'],
    ['<p><strong>A. Living cells can arise spontaneously from non-living matter:</strong> The Miller-Urey experiment did NOT demonstrate spontaneous generation of living cells. Spontaneous generation was disproven by Pasteur in 1859. Miller and Urey showed only that simple organic molecules (amino acids, sugars, lipids) could form from inorganic gases under conditions simulating the early Earth atmosphere. The origin of actual living cells remains a separate, unsolved question.</p>',
     '<p><strong>A. Living cells can arise spontaneously from non-living matter:</strong> The experiment did not produce living cells, and it was not designed to. It showed that amino acids and other small organic molecules can form from simple starting materials under the conditions simulated. How the first living cells arose is a separate question, and this experiment does not answer it.</p>'],
    ['<p><strong>D. Oxygen was abundant in the early Earth atmosphere:</strong> The Miller-Urey experiment actually assumed the early Earth atmosphere was reducing (lacking free O2), containing gases like methane (CH4), ammonia (NH3), hydrogen (H2), and water vapor. Free oxygen accumulated much later, primarily through oxygenic photosynthesis by cyanobacteria (~2.4 billion years ago, the Great Oxidation Event).</p>',
     '<p><strong>D. Oxygen was abundant in the early Earth atmosphere:</strong> The experiment assumed the opposite: a strongly reducing mixture of methane, ammonia, hydrogen and water vapour, with no free oxygen. Note that an absence of free oxygen is not by itself the same thing as a strongly reducing mixture. Free oxygen accumulated much later, mainly through oxygenic photosynthesis by cyanobacteria, around 2.4 billion years ago.</p>'],
    ['<li>Miller and Urey showed that amino acids and other organic molecules form abiotically from simple inorganic gases.</li>',
     '<li>Miller and Urey showed that amino acids and other organic molecules can form abiotically from simple starting materials. One of those starting materials, methane, is itself organic.</li>'],
    ['<li>The experiment supports abiotic synthesis of building blocks - it did not create life or a self-replicating system.</li><li>The simulated atmosphere was reducing, with no free O₂; an oxidising atmosphere would have destroyed the products.</li><li>Later estimates suggest the early atmosphere was less reducing than assumed, but comparable syntheses occur at hydrothermal vents.</li></ul><p class=\'exp-key\'>Bottom Line: Miller-Urey showed abiotic synthesis of amino acids is possible. The early atmosphere was reducing (no free O₂).</p>',
     '<li>It supports abiotic synthesis of building blocks. It did not create a living cell, DNA, or a self-replicating system.</li><li>The simulated mixture was strongly reducing. Having no free O₂ is not by itself the same as being strongly reducing.</li><li>What the early atmosphere actually contained is still uncertain, and this experiment did not settle it. The RNA-world idea is a later hypothesis, not something this experiment proved.</li></ul><p class=\'exp-key\'>Bottom Line: Miller and Urey showed that abiotic synthesis of amino acids is possible under the conditions they simulated. What the early atmosphere actually contained is a separate question the experiment did not answer.</p>'],
  ],
},

];
