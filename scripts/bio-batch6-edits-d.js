/**
 * Review batch 6, displayed Q37-Q48 (bio-307 .. bio-322).
 */
'use strict';

const points = items => items.map(t => '<li>' + t + '</li>').join('');

// The generic block shared by Q37, Q38 and Q42.
const GENERIC_BACT =
  '<li>Bacteria are prokaryotes lacking membrane-bound organelles; they reproduce by binary fission and can exchange genetic material via conjugation, transformation, and transduction.</li>' +
  '<li>The Gram stain distinguishes bacteria by cell wall structure: Gram-positive (thick peptidoglycan, stains purple) vs. Gram-negative (thin peptidoglycan + outer membrane, stains pink).</li>' +
  '<li>Antibiotic resistance spreads rapidly through horizontal gene transfer (plasmids) - a major global health concern.</li>';

// The generic block shared by Q43 and Q49.
const GENERIC_EVO =
  '<li>Natural selection acts on phenotypic variation within populations - individuals with traits better suited to their environment have higher reproductive success.</li>' +
  '<li>Evidence for evolution comes from multiple independent sources: fossil record, comparative anatomy (homologous structures), molecular biology (DNA/protein comparisons), and biogeography.</li>' +
  '<li>Speciation can occur through geographic isolation (allopatric) or within the same area through ecological or behavioral differences (sympatric).</li>';

// The generic block used by Q40.
const GENERIC_VIRUS =
  '<li>Viruses are obligate intracellular parasites consisting of nucleic acid (DNA or RNA) enclosed in a protein coat (capsid); they cannot reproduce independently.</li>' +
  '<li>Viral replication strategies vary: lytic cycle (immediate reproduction and cell lysis) vs. lysogenic cycle (genome integration as prophage with delayed lysis).</li>' +
  '<li>Retroviruses (like HIV) use reverse transcriptase to convert their RNA genome into DNA, which integrates into the host chromosome as a provirus.</li>';

// The generic block used by Q47.
const GENERIC_ECO =
  '<li>Energy flows one way through ecosystems (sun to producers to consumers to decomposers), while matter (nutrients) cycles through biogeochemical pathways.</li>' +
  '<li>Only about 10% of energy is transferred between trophic levels - the rest is lost as heat through cellular respiration.</li>' +
  '<li>Biodiversity increases ecosystem stability and resilience; keystone species have disproportionately large effects on community structure.</li>';

module.exports = [

{
  q: 37, id: 'bio-307', expectLetter: 'B',
  stemFull: 'Which bacterial structure consists of short, hair-like surface appendages that commonly mediate attachment to host tissues?',
  explanation: [
    [`While flagella are important for bacterial movement and chemotaxis, they are not the primary structures for surface adhesion and biofilm formation. Pili (fimbriae) are shorter, more numerous, and specialized for attachment.`,
     `Flagella primarily support movement and chemotaxis, and they can also contribute to colonization, but they are not the short, hair-like appendages the question describes. Fimbriae are shorter, more numerous, and specialized for attachment.`],
    [`It is not involved in surface adhesion or biofilm formation. Endospores can survive extreme heat, radiation, desiccation, and chemical exposure for centuries.`,
     `Its role is survival rather than attachment, so it is not one of the short surface appendages the question describes. Endospores can survive extreme heat, radiation, desiccation, and chemical exposure for centuries.`],
    [GENERIC_BACT, points([
      'Adhesive fimbriae help bacteria attach to surfaces or host cells.',
      'Conjugative pili are involved in DNA transfer; not every pilus has the same function.',
      'Flagella primarily provide motility, while endospores provide resistance to adverse conditions.',
    ])],
  ],
},

{
  q: 38, id: 'bio-308', expectLetter: 'B',
  explanation: [
    [`<p>Gram-negative bacteria have a thin peptidoglycan layer and an outer membrane containing lipopolysaccharide (LPS).`,
     `<p>In a typical bacterial culture with a properly performed Gram stain, a pink/red result indicates Gram-negative bacteria. These have a thin peptidoglycan layer and an outer membrane containing lipopolysaccharide (LPS).`],
    [`They require a special staining technique (Ziehl-Neelsen or auramine-rhodamine stain) using heat or detergent to penetrate the waxy coat.`,
     `Because of that waxy envelope they are demonstrated with an acid-fast staining method, such as Ziehl-Neelsen, rather than with the Gram stain.`],
    [`<strong>D. Archaea without a cell wall:</strong> Archaea are prokaryotes that lack peptidoglycan in their cell walls (they may have pseudopeptidoglycan, S-layers, or no cell wall). They are a distinct domain of life from Bacteria and Eukarya. Archaea do not stain reliably with the Gram stain because the technique depends on the peptidoglycan content of the cell wall.`,
     `<strong>D. Archaea without a cell wall:</strong> Archaea are a distinct domain of life and lack the bacterial peptidoglycan found in bacterial walls; they may instead have pseudopeptidoglycan, S-layers, or no wall at all, so the option's blanket description is not the usual case. Archaea can still stain Gram-positive or Gram-negative, so a staining result by itself does not establish bacterial-type wall chemistry.`],
    [GENERIC_BACT, points([
      'Typical Gram-negative bacteria have a thin peptidoglycan layer and an outer membrane.',
      'Decolorization removes the crystal violet-iodine complex, allowing the counterstain to make them pink/red.',
      'Typical Gram-positive bacteria retain the complex in their thicker peptidoglycan wall and appear purple.',
    ])],
  ],
},

{
  q: 39, id: 'bio-309', expectLetter: 'C',
  explanation: [
    [`<tr><td>Conjugation</td><td>Direct transfer via sex pilus (F plasmid)</td></tr>`,
     `<tr><td>Conjugation</td><td>Contact-dependent transfer between cells</td></tr>`],
    [`<strong>A. Conjugation:</strong> Conjugation is the transfer of DNA from one bacterium to another through direct cell-to-cell contact via a sex pilus. The F (fertility) plasmid encodes the pilus and the transfer machinery. Conjugation requires physical contact between bacteria, whereas transformation involves uptake of free DNA from the environment with no cell contact.`,
     `<strong>A. Conjugation:</strong> Conjugation is contact-dependent DNA transfer between cells. The F (fertility) plasmid, which encodes a sex pilus and the transfer machinery, is the familiar example, but not every conjugative system uses that same machinery. Either way conjugation requires contact between cells, whereas transformation involves uptake of free DNA from the environment with no cell contact.`],
    [`<li>Compare the alternatives: transduction moves DNA inside a bacteriophage, and conjugation requires direct contact through a sex pilus.</li>`,
     `<li>Compare the alternatives: transduction moves DNA inside a bacteriophage, and conjugation is contact-dependent transfer between cells, classically through a sex pilus.</li>`],
  ],
},

{
  q: 40, id: 'bio-311', expectLetter: 'C',
  optionFull: [
    [0, 'Viral genomes always contain both DNA and RNA'],
    [2, 'Viruses lack ribosomes and depend on host cells for protein synthesis'],
  ],
  headingsGone: [
    'Viruses contain both DNA and RNA',
    'obligate intracellular parasites that require host cell machinery',
    'lytic cycle (immediate reproduction and cell lysis)',
    'Viruses are always smaller than bacteria, not larger',
  ],
  explanation: [
    [`<h4>Correct Answer: Viruses are obligate intracellular parasites that require host cell machinery to replicate</h4><p>Viruses lack ribosomes, metabolic enzymes, and ATP-generating systems. They must hijack host cell machinery for replication. A virus contains either DNA or RNA (not both), is generally much smaller than bacteria, and cannot be cultured on standard growth media. Viruses are not considered living organisms by many definitions.</p>`,
     `<h4>Correct Answer: Viruses lack ribosomes and depend on host cells for protein synthesis</h4><p>Viruses are acellular. A virus particle has a genome of either DNA or RNA enclosed in a protein capsid, sometimes with an envelope, and it has no ribosomes of its own, so viral proteins must be made by host-cell ribosomes. Many viruses do encode or carry enzymes that help replication, so it is not true that a virus has no enzymes at all; what it lacks is a complete, independent cellular system for making proteins and reproducing. Being an obligate intracellular organism does not by itself separate viruses from all bacteria, because some bacteria, such as <em>Chlamydia</em>, are also obligate intracellular organisms.</p>`],
    [`<strong>A. Viruses contain both DNA and RNA:</strong> Viruses contain either DNA or RNA, never both simultaneously. This is a key distinguishing feature of viruses. DNA viruses (e.g., herpes, adenovirus, poxvirus) have DNA genomes, while RNA viruses (e.g., influenza, HIV, SARS-CoV-2) have RNA genomes. The type of nucleic acid determines the replication strategy of the virus.`,
     `<strong>A. Viral genomes always contain both DNA and RNA:</strong> A viral genome is classified as DNA or RNA, not both. DNA viruses (e.g., herpes, adenovirus, poxvirus) have DNA genomes, while RNA viruses (e.g., influenza, HIV, SARS-CoV-2) have RNA genomes, and the type of nucleic acid determines the replication strategy. This does not mean that the other nucleic acid can never appear as a packaged molecule or a replication intermediate: a retrovirus, for example, makes a DNA copy of its RNA genome inside the cell.`],
    [`<strong>B. Viruses can reproduce independently on nutrient media:</strong> Viruses cannot reproduce independently on nutrient media because they lack their own metabolic machinery (no ribosomes, no energy-producing enzymes). This is a fundamental distinction from bacteria, which are free-living cells that can grow on appropriate culture media. Viruses must be cultured in living cells (cell cultures, embryonated eggs, or laboratory animals).`,
     `<strong>B. Viruses can reproduce independently on nutrient media:</strong> Viruses require living cells in order to multiply, so they cannot be grown on cell-free nutrient media; they are cultured in cell cultures, embryonated eggs, or laboratory animals. Many bacteria do grow on suitable cell-free media, although some bacteria also require host cells.`],
    [`<strong>D. Viruses are always larger than bacteria:</strong> Viruses are always smaller than bacteria, not larger. Most viruses range from 20-300 nm, while bacteria typically range from 0.2-10 micrometers. Viruses are too small to be seen with a light microscope and require electron microscopy. The smallest known bacterium (Mycoplasma) is about 0.2 um, still larger than most viruses.`,
     `<strong>D. Viruses are always larger than bacteria:</strong> Most viruses are smaller than typical bacteria: many are about 20-300 nm, while bacteria are typically 0.2-10 micrometres. The two size ranges overlap, however, and giant viruses are large enough to be seen by light microscopy, so neither always smaller nor invisible to every light microscope holds as a universal rule.`],
    [GENERIC_VIRUS, points([
      'Viruses are acellular infectious agents with a DNA or RNA genome and a protein capsid; some also have an envelope.',
      'Viruses lack ribosomes and use host cells to make viral proteins.',
      'Viral enzymes can help replication, but do not make a virus independently self-sufficient.',
    ])],
    [`<p class='exp-key'>Bottom Line: Viruses are obligate intracellular parasites containing either DNA or RNA (not both) surrounded by a protein capsid, with or without an envelope.</p>`,
     `<p class='exp-key'>Bottom Line: Viruses lack their own ribosomes and rely on host-cell protein synthesis to produce new virus particles.</p>`],
  ],
},

{
  q: 41, id: 'bio-313', expectLetter: 'C',
  explanation: [
    [`<strong>A. DNA polymerase III:</strong> DNA polymerase III is the main replicative enzyme in prokaryotic DNA replication.`,
     `<strong>A. DNA polymerase III:</strong> DNA polymerase III is the main replicative enzyme in bacteria such as <em>Escherichia coli</em>.`],
    [`<li>The replication route is RNA to cDNA (reverse transcriptase), then double-stranded DNA, then integration by integrase, then transcription of new virions.</li>`,
     `<li>The route is RNA to cDNA (reverse transcriptase), then double-stranded DNA, then integration by integrase. The integrated viral DNA can then be transcribed into RNA; viral proteins are translated, and new virus particles are assembled and released.</li>`],
    [`<li>Integration into the host genome as a provirus is why HIV infection is lifelong and not cleared.</li>`,
     `<li>Integration into the host genome as a provirus contributes to long-lived HIV reservoirs, which standard treatment does not eliminate.</li>`],
    [`<p class='exp-key'>Bottom Line: Retrovirus replication: RNA → cDNA (reverse transcriptase) → dsDNA → integration (integrase) → transcription → new virions.</p>`,
     `<p class='exp-key'>Bottom Line: Retrovirus replication: RNA → cDNA (reverse transcriptase) → dsDNA → integration (integrase) → transcription of viral RNA → translation of viral proteins → assembly and release of new virus particles.</p>`],
  ],
},

{
  q: 42, id: 'bio-315', expectLetter: 'B',
  explanation: [
    [`<p>Bacteria lack the microtubule-based spindle apparatus used in eukaryotic mitosis. Instead, after DNA replication, the two circular chromosomes attach to the cell membrane at different points, and cell elongation separates them. A septum forms at midcell (coordinated by the FtsZ protein ring), dividing the cell into two genetically identical daughter cells.</p>`,
     `<p>Bacteria lack the microtubule-based spindle apparatus used in eukaryotic mitosis. DNA replication is followed by organized partitioning of the chromosome copies to opposite ends of the cell. Division machinery then forms a septum at midcell, separating the cell into two daughters. In a typical bacterial model such as <em>Escherichia coli</em> there is a single circular chromosome and the septum is coordinated by the FtsZ protein ring, although not every bacterium matches that description. The two daughter cells are usually genetically identical apart from mutations.</p>`],
    [`<strong>D. Binary fission results in genetically different daughter cells:</strong> Binary fission produces genetically identical daughter cells (clones), not genetically different ones. Since bacteria are haploid and DNA replication is faithful, both daughter cells receive identical copies of the chromosome. Genetic variation in bacteria arises from mutation and horizontal gene transfer (conjugation, transformation, transduction), not from binary fission itself.`,
     `<strong>D. Binary fission results in genetically different daughter cells:</strong> Binary fission produces daughter cells that are usually genetically identical, not deliberately different ones. Replication is high-fidelity, so each daughter normally receives an identical copy of the chromosome, although mutations do occur. Most genetic variation in bacteria arises from mutation and horizontal gene transfer (conjugation, transformation, transduction) rather than from binary fission itself.`],
    [GENERIC_BACT, points([
      'Binary fission produces two daughter cells after DNA replication and chromosome partitioning.',
      'Bacterial division uses its own cellular machinery, rather than a eukaryotic mitotic spindle.',
      'Daughter cells are usually clones, but mutations can introduce differences.',
    ])],
    [`<p class='exp-key'>Bottom Line: Binary fission: no spindle, no nuclear envelope breakdown, FtsZ ring forms the septum. Result: two identical daughter cells.</p>`,
     `<p class='exp-key'>Bottom Line: Binary fission: no spindle and no nuclear envelope breakdown, with an FtsZ ring forming the septum in typical bacteria. Result: two daughter cells, usually identical apart from mutations.</p>`],
  ],
},

{
  q: 43, id: 'bio-316', expectLetter: 'B',
  explanation: [
    [`and the population could not evolve through selection (though it could still experience genetic drift).`,
     `and the population could not evolve through selection.`],
    [`Instead, random mutations generate variation, and individuals with traits that happen to improve survival and reproduction in a given environment leave more offspring. This is a passive, non-directed process driven by differential reproductive success.`,
     `Instead, mutation generates variation without regard to what the organism needs, and individuals with traits that happen to improve survival and reproduction in a given environment leave more offspring. Natural selection is nonrandom with respect to reproductive success, but it has no intention or foresight.`],
    [`Natural selection then acts on this random variation, favoring beneficial mutations and eliminating harmful ones over generations.`,
     `Natural selection then acts on this variation, tending to favor variants that increase reproductive success in the current environment.`],
    [GENERIC_EVO, points([
      'Natural selection requires variation, heritability, and differences in reproductive success.',
      'Evolutionary fitness means contribution to future generations, not simply physical strength.',
      'Mutation is not directed toward need; selection nonrandomly favors variants that improve reproductive success in a particular environment.',
    ])],
    [`<p class='exp-key'>Bottom Line: Natural selection acts on existing heritable variation. It requires: variation, heritability, differential reproduction, and overproduction of offspring.</p>`,
     `<p class='exp-key'>Bottom Line: Natural selection acts on existing heritable variation. It requires variation, heritability, and differences in reproductive success.</p>`],
  ],
},

{
  q: 44, id: 'bio-317', expectLetter: 'B',
  explanation: [
    [`Darwin argued that variation arises randomly, and natural selection favors those variants best suited to the environment. Modern genetics confirms that acquired somatic changes are not inherited through the germline.`,
     `Darwin's distinctive contribution was natural selection acting on heritable variation already present in a population. Changes acquired in the body during an organism's life are generally not transmitted to offspring in the way Lamarck proposed, and modern genetics supplies the account of variation that Darwin himself lacked.`],
    [`<strong>C. Darwin agreed with Lamarck on the mechanism of evolution:</strong> Darwin fundamentally disagreed with Lamarck on the mechanism of evolution. Lamarck proposed inheritance of acquired characteristics (e.g., a blacksmith's children inheriting strong arms). Darwin proposed that natural selection acts on random heritable variations already present in the population. Modern genetics supports Darwin: acquired traits do not alter germ-line DNA.`,
     `<strong>C. Darwin agreed with Lamarck on the mechanism of evolution:</strong> The defining contrast in this question is Lamarck's emphasis on use and disuse and acquired characteristics versus Darwin's mechanism of natural selection acting on heritable variation. Darwin also entertained ideas about use and disuse, so the contrast is about his distinctive mechanism rather than a wholesale rejection of Lamarck's thinking. The blacksmith example shows the limitation: arm strength built up by a lifetime of work is not passed to his children as such.`],
    [`<li>Modern genetics supports Darwin: somatic changes are not transmitted through the germline (the Weismann barrier).</li>`,
     `<li>Modern genetics supports selection acting on heritable variation, and changes acquired in the body are generally not transmitted through the germline (the Weismann barrier).</li>`],
    [`<p class='exp-key'>Bottom Line: Lamarck = acquired traits inherited. Darwin = natural selection on random variation. De Vries added the concept of mutations as the source of new variation.</p>`,
     `<p class='exp-key'>Bottom Line: Lamarck emphasized inheritance of acquired characteristics; Darwin's central mechanism was natural selection acting on heritable variation.</p>`],
  ],
},

{
  q: 45, id: 'bio-318', expectLetter: 'C',
  stemFull: 'A small population of birds is blown by a storm to a remote island where that species was not previously present. The allele frequencies in this founder population differ from the original mainland population. This is an example of:',
  explanation: [
    [`<strong>B. Gene flow:</strong> Gene flow is the movement of alleles between populations, typically through migration. In this scenario, there is no ongoing exchange of alleles between the island population and the mainland population. The birds were carried to the island by a one-time event, establishing an isolated population. The initial allele frequency differences are due to the founder effect, a type of genetic drift.`,
     `<strong>B. Gene flow:</strong> Gene flow is the movement of alleles between populations, and a single successful migration event can transfer alleles, so it does not require continuous or repeated migration. What this scenario describes, though, is the founding of a new population where the species was not previously present. The point of interest is that the founders carry an unrepresentative sample of the source population's alleles, which is the founder effect, a type of genetic drift.`],
    [`<li>The bottleneck effect is the other form of drift, following a drastic population crash.</li>`,
     `<li>The bottleneck effect is another example of drift, following a drastic population crash; founder and bottleneck effects are examples of drift rather than the only ways drift occurs.</li>`],
    [`<li>Both reduce genetic diversity and can raise the frequency of otherwise rare alleles - the basis of certain disorders in geographically isolated populations.</li>`,
     `<li>Both often reduce genetic diversity and can raise the frequency of otherwise rare alleles, which is the basis of certain disorders in geographically isolated populations.</li>`],
    [`<p class='exp-key'>Bottom Line: Genetic drift has stronger effects in small populations. Two types: founder effect (new colony) and bottleneck effect (population crash).</p>`,
     `<p class='exp-key'>Bottom Line: Genetic drift has stronger effects in small populations. Two common examples are the founder effect (a new colony) and the bottleneck effect (a population crash).</p>`],
  ],
},

{
  q: 46, id: 'bio-320', expectLetter: 'B',
  optionFull: [
    [1, 'Bacteria that established endosymbiotic relationships with ancestral host cells'],
  ],
  headingsGone: ['70S', 'Free-living prokaryotes that were engulfed by ancestral eukaryotic cells', 'now-disfavored', 'independent division'],
  explanation: [
    [`<h4>Correct Answer: Free-living prokaryotes that were engulfed by ancestral eukaryotic cells</h4><p>Lynn Margulis proposed that mitochondria evolved from aerobic alpha-proteobacteria and chloroplasts from photosynthetic cyanobacteria engulfed by ancestral eukaryotes. Evidence: (1) double membranes, (2) own circular DNA, (3) 70S ribosomes, (4) binary fission-like division, (5) size similar to bacteria, (6) DNA sequence similarity to bacteria.</p>`,
     `<h4>Correct Answer: Bacteria that established endosymbiotic relationships with ancestral host cells</h4><p>Mitochondria derive from a bacterial lineage related to the alphaproteobacteria, and chloroplasts from cyanobacteria. Lynn Margulis was a major developer of the modern theory. Evidence: (1) double membranes, (2) their own organelle genomes, (3) bacterial-derived translation machinery, (4) division from pre-existing organelles, (5) size similar to bacteria, (6) gene sequences showing bacterial relationships.</p>`],
    [`<strong>A. Invaginations of the plasma membrane:</strong> Invaginations of the plasma membrane is an older, now-disfavored hypothesis for the origin of the endomembrane system (ER, Golgi, nuclear envelope). While membrane invagination may explain some organelles, it does not account for mitochondria and chloroplasts having their own DNA, 70S ribosomes, and double membranes, all of which support the endosymbiotic origin.`,
     `<strong>A. Invaginations of the plasma membrane:</strong> Membrane invagination is discussed in connection with the origin of the endomembrane system (ER, Golgi, nuclear envelope). Whatever its role there, it does not account for mitochondria and chloroplasts having their own genomes, bacterial-derived translation machinery, and double membranes, all of which support an endosymbiotic origin.`],
    [`Viruses can alter host cell machinery, but mitochondria and chloroplasts have prokaryotic-like circular DNA, 70S ribosomes, and replicate by binary fission, strongly suggesting they descend from free-living prokaryotes (alpha-proteobacteria and cyanobacteria, respectively).`,
     `Viruses can alter host cell machinery, but mitochondria and chloroplasts retain their own genomes and bacterial-derived translation machinery and divide from pre-existing organelles, which points instead to descent from bacteria (an alphaproteobacterial lineage and cyanobacteria, respectively).`],
    [`These organelles contain their own genomes, have double membranes (the inner membrane from the engulfed prokaryote, the outer from the host's phagocytic vesicle), and reproduce semi-autonomously.`,
     `These organelles contain their own genomes, have double membranes, and divide from pre-existing organelles. The double membrane supports the historical model, although assigning the outer membrane definitively to a host phagocytic vesicle goes beyond what is established.`],
    [`<li>The endosymbiotic theory holds that mitochondria and chloroplasts descend from free-living prokaryotes engulfed by an ancestral eukaryote.</li>`,
     `<li>The endosymbiotic theory holds that mitochondria and chloroplasts descend from bacteria that established endosymbiotic relationships with ancestral host cells.</li>`],
    [`<li>Mitochondria trace to aerobic alpha-proteobacteria; chloroplasts to photosynthetic cyanobacteria.</li>`,
     `<li>Mitochondria trace to a lineage related to the aerobic alphaproteobacteria; chloroplasts to photosynthetic cyanobacteria.</li>`],
    [`<li>The evidence is structural and molecular: double membranes, circular DNA, 70S ribosomes, division by binary fission, and bacterial-type gene sequences.</li>`,
     `<li>The evidence is structural and molecular: double membranes, their own organelle genomes, bacterial-derived translation machinery, division from pre-existing organelles, and gene sequences showing bacterial relationships.</li>`],
    [`<li>Having 70S ribosomes explains why some antibacterial antibiotics carry mitochondrial toxicity.</li>`,
     `<li>Similarities between organelle and bacterial translation machinery explain why some antibacterial antibiotics carry mitochondrial toxicity.</li>`],
    [`<li>Most of the original endosymbiont genes have since migrated to the nuclear genome, so these organelles can no longer live independently.</li>`,
     `<li>Most of the original endosymbiont genes have since moved to the nuclear genome, so although these organelles divide, they depend on nuclear-encoded proteins and cannot live independently.</li>`],
    [`<p class='exp-key'>Bottom Line: Mitochondria from aerobic bacteria; chloroplasts from cyanobacteria. Key evidence: double membrane, circular DNA, 70S ribosomes, independent division.</p>`,
     `<p class='exp-key'>Bottom Line: Mitochondria from a bacterial lineage related to the alphaproteobacteria; chloroplasts from cyanobacteria. Key evidence: double membranes, their own genomes, bacterial-derived translation machinery, and division from pre-existing organelles.</p>`],
  ],
},

{
  q: 47, id: 'bio-321', expectLetter: 'C',
  explanation: [
    [`<p>The 10% rule states that approximately only 10% of energy at one trophic level is transferred to the next. The remaining ~90% is lost as heat through cellular respiration, used for metabolism, or remains in undigested material. This explains why food chains rarely exceed 4-5 trophic levels and why there is less biomass at higher trophic levels (ecological pyramid).</p>`,
     `<p>The 10% rule is a rough average: roughly 10% of the production at one trophic level passes to the next. It is an approximate guide rather than a fixed law, and measured efficiencies vary between systems. Much of the rest is dissipated through respiration, while uneaten or unassimilated material enters detrital food webs. Less energy at higher levels helps explain why food chains are usually short, often around four or five levels, and why a pyramid of energy narrows upward.</p>`],
    [`Organisms at each trophic level use most of the energy they consume for their own respiration, movement, growth, and maintenance, leaving only about 10% available to the next level.`,
     `Organisms at each trophic level use most of the energy they consume for respiration, movement, and maintenance. Energy stored in new biomass is a different case: it can be transferred when that biomass is eaten. On average only about 10% of the production passes to the next level.`],
    [`<strong>B. 50%:</strong> 50% energy transfer would be far more efficient than what actually occurs in ecosystems. In reality, about 90% of energy at each trophic level is lost to metabolic heat and other processes. If 50% were transferred, food chains could support many more trophic levels and much larger populations of top predators than are observed in nature.`,
     `<strong>B. 50%:</strong> 50% is not the figure used by the 10% model, which is the approximation this question is testing. Measured transfer efficiencies vary between ecosystems, but a value as high as 50% would be well above the usual range and would support far longer food chains than are generally observed.`],
    [`<strong>D. 1%:</strong> 1% energy transfer per trophic level is too low. The widely accepted ecological principle is the 10% rule, meaning approximately 10% of energy is passed from one trophic level to the next. If only 1% were transferred, food chains would be extremely short and could barely support a second trophic level, which does not match observed ecosystems.`,
     `<strong>D. 1%:</strong> 1% is well below the approximate 10% figure this question is testing. Transfer efficiencies do vary between systems, so a value other than 10% is not automatically impossible; it is simply not the approximation the 10% rule describes.`],
    [GENERIC_ECO, points([
      'The 10% rule is an approximate guide to transfer of production between trophic levels.',
      'Respiration dissipates energy as heat, and uneaten or unassimilated material can enter detrital pathways.',
      'Less energy is available at higher trophic levels, helping limit food-chain length.',
    ])],
    [`<p class='exp-key'>Bottom Line: Only ~10% of energy passes between trophic levels. Energy flow is unidirectional; nutrients cycle.</p>`,
     `<p class='exp-key'>Bottom Line: Roughly 10% of production passes between trophic levels, as an approximation. Energy flow is unidirectional; nutrients cycle.</p>`],
  ],
},

{
  q: 48, id: 'bio-322', expectLetter: 'B',
  stemFull: 'Severe nutrient enrichment of a lake from agricultural runoff can lead to which outcome?',
  explanation: [
    [`<p>Excess nitrogen and phosphorus from fertilizer runoff stimulates massive algal growth (algal bloom). When algae die, aerobic bacteria decompose the organic matter, consuming dissolved oxygen (creating hypoxic or anoxic conditions). Fish and other aquatic organisms die from oxygen deprivation. This creates a dead zone.</p>`,
     `<p>Excess nitrogen and phosphorus from fertilizer runoff can stimulate a bloom of algae. Respiration by the bloom and by other organisms, together with decomposition of organic material by bacteria, can lower dissolved oxygen and harm or kill fish. Algae photosynthesize by day but respire continuously, so dissolved oxygen can fall sharply at night. Severe oxygen depletion is a possible consequence, producing a dead zone, rather than the inevitable result of every increase in nutrient supply.</p>`],
    [`The initial algal bloom may appear productive, but when the algae die and decompose, massive oxygen consumption by bacteria creates hypoxic or anoxic dead zones.`,
     `The initial algal bloom may appear productive, but respiration by the bloom itself and by decomposers breaking down organic matter can consume enough oxygen to create hypoxic or anoxic conditions.`],
    [`This further reduces oxygen levels and habitat complexity. Clear water is actually an indicator of a healthy, non-eutrophic aquatic ecosystem.`,
     `This further reduces oxygen levels and habitat complexity. What matters for the outcome in this question is dissolved oxygen and whether the organisms present can meet their oxygen requirements.`],
    [`<li>Eutrophication follows a fixed sequence: nutrient runoff, algal bloom, algal death, bacterial decomposition, oxygen depletion, then death of aquatic life.</li>`,
     `<li>The usual sequence is nutrient runoff, then an algal bloom, then falling dissolved oxygen as organisms respire and decomposers break down organic matter, which can kill aquatic life. Severe oxygen depletion is a possible consequence rather than an inevitable one.</li>`],
    [`<li>Oxygen is consumed by the decomposers, not by the algae themselves - that is the step most often misread.</li>`,
     `<li>Both the algae and the decomposers consume oxygen: algae respire continuously, so oxygen can fall sharply at night when photosynthesis stops, and decomposers consume more as they break down organic matter.</li>`],
    [`<p class='exp-key'>Bottom Line: Eutrophication sequence: excess nutrients → algal bloom → algal death → bacterial decomposition → oxygen depletion → aquatic life death.</p>`,
     `<p class='exp-key'>Bottom Line: Severe nutrient enrichment can give: excess nutrients → algal bloom → respiration and decomposition → falling dissolved oxygen → harm to fish and other aquatic life.</p>`],
  ],
},

];
