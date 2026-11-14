/**
 * Applies the external biology review of QBank questions 1-60 to questions.json.
 *
 *   node scripts/apply-bio-review-001-060.js [--dry]
 *
 * The review numbers its items Q1-Q60, but those are NOT bio-1..bio-60. The
 * block that was exported for review skipped one question and ran one past
 * the end, so:
 *
 *     review Q1 .. Q11   ->  bio-1  .. bio-11
 *     review Q12 .. Q60  ->  bio-13 .. bio-61      (bio-12 was never reviewed)
 *
 * That mapping is not a guess: under it, all 50 answer letters the review
 * asserts match the database exactly, and no other offset does. ID() below is
 * the single place it is written down.
 *
 * Every edit is anchored on text that must appear exactly once. A missed
 * anchor fails the whole run and writes nothing, so a partially applied
 * review is not a state this script can produce.
 *
 * `correct` is a 0-based index into options, not a letter. The review speaks
 * in letters; LETTER() converts, and the verifier re-checks every key.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const FILE = path.join(ROOT, 'questions.json');
const DRY = process.argv.includes('--dry');

const ID = n => 'bio-' + (n <= 11 ? n : n + 1);
const LETTER = 'ABCD';

/**
 * EDITS[reviewNumber] = {
 *   stem:        [from, to]           replace text inside the question stem
 *   option:      [index, from, to]    replace text inside one option
 *   options:     [...]                replace the whole option list
 *   explanation: [[from, to], ...]    ordered replacements, each must hit once
 *   explanationFull: '...'            replace the explanation outright
 *   expectLetter: 'B'                 the answer letter this item must still have
 * }
 * A `to` of '' deletes. Order matters: later anchors see earlier results.
 */
const EDITS = {

  // ---------------------------------------------------------------- Q1 bio-1
  // Mitochondrial ribosomes are not universally 70S (mammalian are 55S), and
  // mitochondrial disease is not exclusively maternally inherited.
  1: {
    expectLetter: 'B',
    explanation: [
      ['its own ribosomes (70S, similar to prokaryotic ribosomes), and a double membrane (outer membrane and highly folded inner membrane called cristae)',
        'its own ribosomes, which differ from the 80S ribosomes of the eukaryotic cytosol, and a double membrane whose inner membrane is folded into cristae'],
      ['<td>Own ribosomes</td><td>Yes (70S)</td>',
        '<td>Own ribosomes</td><td>Yes; distinct from cytosolic ribosomes</td>'],
      ['<li>No single feature is decisive - it is the combination that excludes the ER, Golgi, and lysosome, which each have a single membrane and no DNA.</li>',
        '<li>Among the organelles listed, possessing its own DNA already sets the mitochondrion apart; the ER, Golgi, and lysosome each have a single membrane and no DNA.</li>'],
      ['<li>Mitochondrial ribosomes are 70S, like bacterial ribosomes, rather than the 80S ribosomes of the cytosol.</li>',
        '<li>Mitochondria have their own ribosomes, which differ from the 80S ribosomes in the eukaryotic cytosol. Their bacterial ancestry helps explain why mitochondria retain their own DNA and protein-synthesis machinery.</li>'],
      ['<li>Because mitochondrial DNA comes from the egg, mitochondrial disorders show maternal inheritance.</li>',
        '<li>Disorders caused by variants in mitochondrial DNA typically show maternal inheritance. Disorders affecting mitochondria can also result from nuclear-gene variants, which follow other inheritance patterns.</li>'],
    ],
  },

  // ---------------------------------------------------------------- Q4 bio-4
  // DNA content and chromosome number were being conflated, and polyploidy
  // was called universally lethal.
  4: {
    expectLetter: 'B',
    stem: ['How many chromosomes will be present in each resulting cell at the end of meiosis II?',
      'Assuming normal chromosome separation, how many chromosomes will be present in each resulting cell at the end of meiosis II?'],
    explanation: [
      ['<p><strong>D. 92:</strong> A chromosome count of 92 (4n) would occur if DNA replication happened without any cell division - this is called endoreduplication or polyploidy. In normal meiosis, replication occurs once (2n to 4n in S phase) followed by two divisions, yielding four haploid (n = 23) cells. Polyploidy is lethal in humans but common in plants.</p>',
        '<p><strong>D. 92:</strong> DNA replication doubles the amount of DNA, not the chromosome number. After S phase, the original human cell still has 46 chromosomes, but each consists of two sister chromatids, giving 92 chromatids. Meiosis I separates homologous chromosomes; meiosis II separates sister chromatids. Each final product has 23 chromosomes.</p>'
        + "<table class='exp-table'><tr><th>Stage</th><th>Chromosomes per cell</th><th>Chromatids per cell</th></tr>"
        + '<tr><td>Before DNA replication</td><td>46</td><td>46</td></tr>'
        + '<tr><td>After DNA replication, before meiosis I</td><td>46</td><td>92</td></tr>'
        + '<tr><td>After meiosis I</td><td>23</td><td>46</td></tr>'
        + '<tr><td>After meiosis II</td><td>23</td><td>23</td></tr></table>'],
    ],
  },

  // ---------------------------------------------------------------- Q5 bio-5
  // A codon can specify a stop signal; not all DNA polymerases proofread or
  // act only in S phase. Generic central-dogma points replaced.
  5: {
    expectLetter: 'C',
    explanation: [
      ['It is read in triplets called codons, each specifying one amino acid.',
        'It is read in triplets called codons, each specifying an amino acid or a stop signal.'],
      ['<p><strong>D. DNA polymerase:</strong> DNA polymerase is the enzyme responsible for synthesizing new DNA strands during replication by adding nucleotides complementary to the template strand. It operates during the S phase of the cell cycle and has proofreading (3\' to 5\' exonuclease) activity. It plays no role in translation or amino acid transport.</p>',
        '<p><strong>D. DNA polymerase:</strong> DNA polymerase synthesizes DNA during replication or repair. It does not deliver amino acids to the ribosome.</p>'],
      ['<li>The central dogma of molecular biology describes information flow: DNA is transcribed to mRNA, which is translated to protein.</li><li>Eukaryotic gene expression is regulated at multiple levels: chromatin remodeling, transcription, post-transcription (splicing), translation, and post-translation.</li><li>Mutations in DNA can be silent, missense, nonsense, or frameshift - each with different impacts on protein structure and function.</li>',
        '<li>tRNA carries an amino acid and has an anticodon that pairs with a complementary mRNA codon.</li>'
        + '<li>An aminoacyl-tRNA synthetase attaches the appropriate amino acid to its tRNA.</li>'
        + "<li>mRNA provides the sequence instructions; rRNA forms the ribosome's structural and catalytic core.</li>"],
    ],
  },

  // ---------------------------------------------------------------- Q6 bio-6
  // ATP and NADPH are made on the stromal side; glucose is not the direct
  // product of the Calvin cycle; option A was a copy of the paragraph above
  // it; cytoplasm and cytosol were conflated.
  6: {
    expectLetter: 'B',
    explanation: [
      ['<td>Stroma</td><td>Calvin cycle (light-independent)</td><td>G3P, glucose</td>',
        '<td>Stroma</td><td>Calvin cycle (light-independent)</td><td>G3P, used to build sugars</td>'],
      ['<p>These energy carriers then move to the <strong>stroma</strong>, where the Calvin cycle uses them to fix CO₂ into organic molecules (glucose).</p>',
        '<p>The light reactions produce ATP and NADPH on the stromal side of the thylakoid membrane. The Calvin cycle uses them in the stroma to make G3P, a small carbohydrate used to build glucose and other organic molecules.</p>'],
      ['<p><strong>A. Stroma:</strong> These energy carriers then move to the stroma, where the Calvin cycle uses them to fix CO₂ into organic molecules (glucose).</p>',
        '<p><strong>A. Stroma:</strong> The stroma is the fluid surrounding the thylakoids. It contains the enzymes of the Calvin cycle, whereas the photosystems and electron transport chain are in the thylakoid membrane.</p>'],
      ['<p><strong>D. Cytoplasm:</strong> The cytoplasm is the cellular space outside the nucleus and organelles. In eukaryotes, photosynthesis is entirely contained within chloroplasts - the light reactions never occur in the cytoplasm. However, in prokaryotic cyanobacteria, the thylakoid membranes are located directly in the cytoplasm since these organisms lack chloroplasts.</p>',
        "<p><strong>D. Cytoplasm:</strong> The cytoplasm includes the organelles; the cytosol is the fluid around them. The cell's cytosol is not the site of the light reactions in plants; these occur on membranes inside chloroplasts. Cyanobacteria have no chloroplasts and carry thylakoid membranes directly in the cell.</p>"],
      ['<li>C3, C4, and CAM plants have different strategies for carbon fixation adapted to their environments, balancing photosynthesis efficiency against water loss.</li>',
        '<li>Keep the three compartments apart: the thylakoid membrane holds the photosystems, the thylakoid lumen is the space inside it where protons accumulate, and the stroma is the surrounding fluid where the Calvin cycle runs.</li>'],
    ],
  },
  // ---------------------------------------------------------------- Q8 bio-8
  // Option C implied little protein digestion happens in the small intestine.
  // Much of it does; the stem asks where digestion BEGINS. Placeholder
  // distractors replaced, and bile removed from the list of enzymes.
  8: {
    expectLetter: 'B',
    explanation: [
      ['<p><strong>A. Mouth:</strong> The mouth begins starch digestion via salivary amylase; also contains lingual lipase; it is not where the process described primarily occurs.</p>',
        '<p><strong>A. Mouth:</strong> The mouth mechanically breaks down food and begins starch digestion through salivary amylase. Significant enzymatic protein digestion begins later, in the stomach.</p>'],
      ['<p><strong>C. Small intestine:</strong> The small intestine major site of digestion and absorption for all macronutrients; receives pancreatic enzymes and bile; it is not where the process described primarily occurs.</p>',
        '<p><strong>C. Small intestine:</strong> Most protein digestion and nutrient absorption occur in the small intestine, but protein digestion has already begun in the stomach. Pancreatic proteases and intestinal peptidases continue it.</p>'],
      ['<p><strong>D. Large intestine:</strong> The large intestine primarily absorbs water and electrolytes; houses gut microbiota; minimal enzymatic digestion; it is not where the process described primarily occurs.</p>',
        '<p><strong>D. Large intestine:</strong> The large intestine mainly absorbs water and electrolytes and supports microbial fermentation. It is not where enzymatic protein digestion begins.</p>'],
      ['<li>Digestion involves mechanical breakdown (chewing, peristalsis) and chemical breakdown (enzymes, acid, bile) of food into absorbable molecules.</li><li>The small intestine is the primary site of nutrient absorption - its enormous surface area (villi and microvilli) maximizes absorption efficiency.</li><li>The liver, gallbladder, and pancreas are accessory organs that contribute bile and digestive enzymes to the small intestine.</li>',
        '<li>Stomach acid helps unfold proteins and activates pepsinogen to pepsin; pepsin can activate more pepsinogen.</li>'
        + '<li>Pepsin breaks proteins into smaller peptides; small-intestinal enzymes continue digestion.</li>'
        + '<li>Bile physically emulsifies fats; digestive enzymes chemically break down nutrients.</li>'],
    ],
  },

  // ---------------------------------------------------------------- Q9 bio-9
  // The 10% figure is an approximation, not all untransferred energy leaves
  // as respiratory heat, and all three distractors were placeholders.
  9: {
    expectLetter: 'C',
    explanation: [
      ['<p><strong>A. Primary consumers:</strong> Primary consumers occupies a different ecological role in the ecosystem hierarchy.</p>',
        '<p><strong>A. Primary consumers:</strong> Primary consumers obtain energy by eating producers; they do not make their own organic food by photosynthesis.</p>'],
      ['<p><strong>B. Decomposers:</strong> Decomposers occupies a different ecological role in the ecosystem hierarchy.</p>',
        '<p><strong>B. Decomposers:</strong> Decomposers obtain energy by breaking down dead organic material and waste.</p>'],
      ['<p><strong>D. Secondary consumers:</strong> Secondary consumers occupies a different ecological role in the ecosystem hierarchy.</p>',
        '<p><strong>D. Secondary consumers:</strong> Secondary consumers obtain energy by eating primary consumers.</p>'],
      ['<li>Only about 10% of energy is transferred between trophic levels - the rest is lost as heat through cellular respiration.</li>',
        '<li>Only a fraction of energy at one trophic level becomes biomass available to the next; about 10% is a useful approximation, not a fixed law. Energy is used in metabolism and released as heat, while some remains in uneaten material and waste that can enter decomposer food webs.</li>'],
      ["<p class='exp-key'>Bottom Line: Only about 10% of energy is transferred from one trophic level to the next (10% rule). Producers form the base of every food chain and capture the most total energy in the ecosystem.</p>",
        "<p class='exp-key'>Bottom Line: Photosynthetic producers use light energy to build organic molecules from inorganic carbon, forming the base of photosynthesis-based food webs.</p>"],
    ],
  },

  // -------------------------------------------------------------- Q10 bio-10
  // Sensory pathways are not confined to the dorsal root, ventral-horn cell
  // bodies are somatic motor neurons, and acetylcholine is not intrinsically
  // excitatory.
  10: {
    expectLetter: 'C',
    explanation: [
      ['The ventral root contains axons of motor neurons whose cell bodies are in the ventral horn of the spinal cord gray matter.',
        'Somatic motor neuron cell bodies lie in the ventral horn of the spinal cord gray matter, and their axons leave through the ventral roots.'],
      [' However, once these fibers merge with motor fibers at the intervertebral foramen, the resulting spinal nerve contains both types. Pure sensory pathways exist only in the dorsal root.',
        ' However, once these fibers merge with motor fibers at the intervertebral foramen, the resulting spinal nerve contains both types.'],
      ['<li>The nervous system is divided into the CNS (brain and spinal cord) and PNS (cranial and spinal nerves); the PNS further divides into somatic (voluntary) and autonomic (involuntary) divisions.</li><li>Action potentials propagate along neurons via sequential depolarization; myelination increases conduction speed through saltatory conduction at nodes of Ranvier.</li><li>Neurotransmitters are released at synapses and bind to receptors on postsynaptic cells - excitatory (e.g., glutamate, acetylcholine) or inhibitory (e.g., GABA, glycine).</li>',
        '<li>Dorsal roots carry sensory input toward the spinal cord; the dorsal root ganglion holds the sensory neuron cell bodies.</li>'
        + '<li>Ventral roots carry motor output away from the spinal cord.</li>'
        + '<li>Where the two roots join, the resulting spinal nerve is mixed.</li>'],
    ],
  },

  // -------------------------------------------------------------- Q11 bio-11
  // Peptidoglycan distinguishes BACTERIA, not all prokaryotes: archaea are
  // prokaryotes without it. Also removes the claim that ribosome-targeting
  // antibiotics cannot harm human cells, and the "all living cells" absolute.
  11: {
    expectLetter: 'B',
    stem: ['Which structure is found in prokaryotic cells but is absent in eukaryotic animal cells?',
      'Which structure is present in most bacterial cells but absent from animal cells?'],
    explanation: [
      ['<tr><th>Feature</th><th>Prokaryotes (Bacteria)</th><th>Eukaryotic Animal Cells</th></tr>',
        '<tr><th>Feature</th><th>Typical bacterium</th><th>Typical animal cell</th></tr>'],
      ['<tr><td>Cell wall</td><td>Yes (peptidoglycan)</td><td>No</td></tr>',
        '<tr><td>Cell wall</td><td>Usually present; contains peptidoglycan</td><td>No</td></tr>'],
      ['<p>The Gram stain differentiates bacteria',
        '<p>Archaea are also prokaryotes, but their cell walls do not contain peptidoglycan; some bacteria, such as <em>Mycoplasma</em>, lack a cell wall altogether.</p><p>The Gram stain differentiates bacteria'],
      ['This size difference is clinically important - many antibiotics (like tetracyclines and aminoglycosides) specifically target 70S ribosomes without harming human cells.',
        'Differences between bacterial and human cytosolic ribosomes allow some antibiotics to inhibit bacterial protein synthesis selectively, although these drugs can still cause adverse effects.'],
      ['<p><strong>D. DNA:</strong> DNA is the genetic material found in all living cells. Both prokaryotes and eukaryotes contain DNA, though its organization differs:',
        '<p><strong>D. DNA:</strong> Both bacterial and typical animal cells contain DNA, although its organization differs:'],
      ['<li>Other prokaryotic distinctions worth pairing with this: 70S ribosomes, a circular chromosome in a nucleoid, and no membrane-bound organelles.</li>',
        '<li>Other bacterial distinctions worth pairing with this: ribosomes that differ from the 80S cytosolic ribosomes of animal cells, a circular chromosome in a nucleoid, and no membrane-bound organelles.</li>'],
    ],
  },
  // -------------------------------------------------------------- Q12 bio-13
  // "Post-transcriptional" overstates the timing: capping and much splicing
  // happen while transcription is still running. Also fixes the cap's name
  // and the claim that exons are purely coding.
  12: {
    expectLetter: 'D',
    stem: ['Which of the following is NOT a post-transcriptional modification of eukaryotic mRNA?',
      'Which of the following is NOT a step in the processing of a typical eukaryotic pre-mRNA?'],
    option: [0, "Addition of a 5' methylguanine cap", "Addition of a 5' 7-methylguanosine cap"],
    explanation: [
      ['<p>Methylation of cytosine in the promoter region is an <strong>epigenetic modification of DNA</strong>, not a post-transcriptional modification of mRNA.',
        '<p>Methylation of cytosine in the promoter region is an <strong>epigenetic modification of DNA</strong>, not a step in RNA processing.'],
      ["<tr><td>5' cap (7-methylguanosine)</td><td>Post-transcriptional (mRNA)</td>",
        "<tr><td>5' cap (7-methylguanosine)</td><td>RNA processing</td>"],
      ['<tr><td>Poly-A tail</td><td>Post-transcriptional (mRNA)</td>',
        '<tr><td>Poly-A tail</td><td>RNA processing</td>'],
      ['<tr><td>Splicing (intron removal)</td><td>Post-transcriptional (mRNA)</td>',
        '<tr><td>Splicing (intron removal)</td><td>RNA processing</td>'],
      ["<p><strong>A. Addition of a 5' methylguanine cap:</strong> The 5' cap is a genuine post-transcriptional modification of eukaryotic mRNA. A modified guanine nucleotide (7-methylguanosine) is added to the 5' end of the pre-mRNA shortly after transcription begins.",
        "<p><strong>A. Addition of a 5' 7-methylguanosine cap:</strong> The 5' cap is a genuine step in RNA processing. A modified guanine nucleotide (7-methylguanosine) is added to the 5' end of the pre-mRNA shortly after transcription begins, while transcription is often still underway."],
      ['<p><strong>B. Removal of introns by splicing:</strong> Splicing is a genuine post-transcriptional modification where non-coding introns are removed and coding exons are joined together.',
        '<p><strong>B. Removal of introns by splicing:</strong> Splicing is a genuine step in RNA processing: introns are removed and exons are joined; the retained exons can include both protein-coding and untranslated regions.'],
      ['<p><strong>C. Addition of a poly-A tail at the 3\' end:</strong> Polyadenylation is a genuine post-transcriptional modification where',
        '<p><strong>C. Addition of a poly-A tail at the 3\' end:</strong> Polyadenylation is a genuine step in RNA processing, in which'],
      ['<li>The central dogma of molecular biology describes information flow: DNA is transcribed to mRNA, which is translated to protein.</li><li>Eukaryotic gene expression is regulated at multiple levels: chromatin remodeling, transcription, post-transcription (splicing), translation, and post-translation.</li><li>Mutations in DNA can be silent, missense, nonsense, or frameshift - each with different impacts on protein structure and function.</li>',
        "<li>Capping adds a modified guanine to the 5' end, which protects the transcript and helps the ribosome find it.</li>"
        + '<li>Splicing removes introns and joins exons, and alternative splicing lets one gene yield more than one protein.</li>'
        + "<li>Polyadenylation adds a poly-A tail to the 3' end, which aids stability and export.</li>"],
      ["<p class='exp-key'>Bottom Line: Eukaryotic pre-mRNA undergoes three key modifications before leaving the nucleus: 5' capping, 3' polyadenylation, and intron splicing. These modifications are absent in prokaryotes, where translation begins even before transcription is complete.</p>",
        "<p class='exp-key'>Bottom Line: Typical eukaryotic pre-mRNA is capped, spliced, and polyadenylated before translation. Promoter methylation modifies DNA and usually reduces transcription. Bacterial mRNA generally does not undergo the same processing pattern.</p>"],
    ],
  },

  // -------------------------------------------------------------- Q13 bio-14
  // SUBSTANTIAL REWRITE. The old explanation confused checkpoint activation,
  // treated cyclin as the only control on kinase activity, described Rb as a
  // direct CDK inhibitor, and listed APC/C among cyclin-CDK complexes.
  13: {
    expectLetter: 'B',
    stem: ['Cyclin-dependent kinases (CDKs) are activated at specific checkpoints of the cell cycle. What must bind to a CDK for it to become active?',
      'Which regulatory protein binds to a cyclin-dependent kinase (CDK) to help activate it during the cell cycle?'],
    explanationFull:
      '<h4>Correct Answer: A cyclin protein</h4>'
      + '<p>Cyclins are regulatory proteins whose levels rise and fall during the cell cycle. A cyclin binds a matching CDK, helping activate the kinase. The active cyclin&ndash;CDK complex adds phosphate groups to target proteins, helping the cell progress through the cycle. Other controls, including phosphorylation and CDK inhibitors, also regulate whether the complex is active.</p>'
      + '<h4>Why the other choices are wrong:</h4>'
      + '<p><strong>A. ATP:</strong> ATP supplies the phosphate used in the kinase reaction. It is a substrate, not the regulatory protein asked for here.</p>'
      + '<p><strong>C. A tumor suppressor protein:</strong> Tumor suppressors help restrain cell-cycle progression. For example, p53 can increase production of p21, a protein that inhibits cyclin&ndash;CDK complexes.</p>'
      + '<p><strong>D. DNA polymerase:</strong> DNA polymerase copies DNA; it is not the regulatory partner that activates a CDK.</p>'
      + '<h4>Key Educational Points:</h4><ul>'
      + '<li>A CDK is present through the cycle but needs a cyclin partner to become active.</li>'
      + '<li>Cyclin levels rise and fall, so the timing of a CDK’s activity comes from its cyclin.</li>'
      + '<li>Cyclin B&ndash;CDK1 is the central complex for entry into mitosis.</li>'
      + '</ul>'
      + "<p class='exp-key'>Bottom Line: Cyclins help control the timing of cell-cycle progression by binding and regulating CDKs.</p>",
  },

  // -------------------------------------------------------------- Q14 bio-15
  // Three placeholder distractors, plus an unsupported claim that stabilizing
  // selection is the most common type in nature.
  14: {
    expectLetter: 'B',
    explanation: [
      ["<p><strong>A. Peppered moths becoming darker during industrial pollution:</strong> This concept applies to a different evolutionary mechanism than the one described.</p>",
        '<p><strong>A. Peppered moths becoming darker during industrial pollution:</strong> This is directional selection: during industrial pollution, darker moths were favored over lighter moths.</p>'],
      ["<p><strong>C. Beak size in Darwin's finches diverging into two extreme forms:</strong> This concept applies to a different evolutionary mechanism than the one described.</p>",
        "<p><strong>C. Beak size in Darwin's finches diverging into two extreme forms:</strong> This describes disruptive selection: two extreme beak-size forms are favored over intermediate forms within a population.</p>"],
      ['<p><strong>D. Antibiotic resistance increasing in a bacterial population:</strong> This concept applies to a different evolutionary mechanism than the one described.</p>',
        '<p><strong>D. Antibiotic resistance increasing in a bacterial population:</strong> Antibiotic exposure favors resistant bacteria, shifting the population toward resistance. This is directional selection.</p>'],
      ['<p>Babies born with very low birth weight have survival difficulties, while very large babies face complications during delivery. This selects for an intermediate, optimal birth weight range.</p>',
        '<p>Babies born with very low birth weight have survival difficulties, while very large babies face complications during delivery. This selects for an intermediate birth-weight range. The example is an illustrative model, not a universal numerical definition of healthy birth weight.</p>'],
      ['<li>Natural selection acts on phenotypic variation within populations - individuals with traits better suited to their environment have higher reproductive success.</li><li>Evidence for evolution comes from multiple independent sources: fossil record, comparative anatomy (homologous structures), molecular biology (DNA/protein comparisons), and biogeography.</li><li>Speciation can occur through geographic isolation (allopatric) or within the same area through ecological or behavioral differences (sympatric).</li>',
        '<li>Stabilizing selection favors intermediate phenotypes and selects against extremes.</li>'
        + '<li>Directional selection favors a shift toward one end of the range.</li>'
        + '<li>Disruptive selection favors both extremes over the intermediate phenotype.</li>'],
      ["<p class='exp-key'>Bottom Line: Stabilizing selection is the most common type in nature. It maintains the status quo by favoring the average. Directional selection drives evolutionary change; disruptive selection can lead to speciation.</p>",
        "<p class='exp-key'>Bottom Line: Stabilizing selection favors the average and narrows variation. Directional selection drives a shift toward one extreme; disruptive selection favors both extremes and can contribute to speciation.</p>"],
    ],
  },

  // -------------------------------------------------------------- Q15 bio-16
  // Option A's explanation invented an arithmetic slip, and the takeaway said
  // any violated assumption changes allele frequencies.
  15: {
    expectLetter: 'B',
    explanation: [
      ['<p><strong>A. 0.24:</strong> In the Hardy-Weinberg calculation, if q² = 0.16, then q = 0.4 and p = 0.6. The value 0.24 equals 2 × 0.4 × 0.3 - this would result from an arithmetic error where p is incorrectly calculated as 0.3 instead of 0.6. Always verify: p + q must equal 1.0, so if q = 0.4, then p must be 0.6.</p>',
        '<p><strong>A. 0.24:</strong> 0.24 is pq = 0.6 × 0.4. Heterozygotes can arise through either parental allele combination, so their total frequency is 2pq = 0.48.</p>'],
      ["<p class='exp-key'>Bottom Line: Hardy-Weinberg equilibrium requires: no mutation, no selection, no migration, random mating, and large population size. If any condition is violated, allele frequencies change and evolution occurs.</p>",
        "<p class='exp-key'>Bottom Line: Hardy-Weinberg proportions provide a baseline under assumptions including random mating, a large population, and no mutation, migration, or selection. Violating these assumptions can alter genotype frequencies and/or allele frequencies. Nonrandom mating alone can change genotype frequencies without changing allele frequencies.</p>"],
    ],
  },
  // -------------------------------------------------------------- Q16 bio-17
  // Independent assortment is not exclusive to genes on different
  // chromosomes, and option D confused a phenotype class with a genotype.
  16: {
    expectLetter: 'C',
    stem: ['In a dihybrid cross (AaBb x AaBb), what fraction',
      'In a dihybrid cross (AaBb x AaBb), assuming the two genes assort independently, what fraction'],
    explanation: [
      ['<p><strong>B. 1/8:</strong> The value 1/8 does not correspond to any standard Mendelian ratio in a dihybrid cross. The classic 9:3:3:1 ratio produces fractions of 9/16, 3/16, 3/16, and 1/16. Getting 1/8 likely stems from incorrectly multiplying 1/4 × 1/2 or some other computational error. Always apply the product rule: multiply independent probabilities.</p>',
        '<p><strong>B. 1/8:</strong> 1/8 is the probability of some individual genotypes, such as aaBb: 1/4 × 1/2. The question requires aabb, so both probabilities are 1/4.</p>'],
      ['(e.g., <i>A</i>&#8209;bb or aaBb). This is the "3" in the 9:3:3:1 ratio.',
        '(e.g., <i>A</i>&#8209;bb or <i>aaB</i>&#8209;). This is the "3" in the 9:3:3:1 ratio: the phenotype class <i>aaB</i>&#8209; totals 3/16, whereas the individual genotype aaBb is 2/16.'],
      ['<li>The method assumes the genes are unlinked; genes close together on one chromosome do not assort independently.</li>',
        '<li>The method assumes the genes assort independently; genes close together on one chromosome do not. Widely separated loci on the same chromosome can behave as effectively unlinked.</li>'],
      ["<p class='exp-key'>Bottom Line: The classic dihybrid ratio is 9:3:3:1. This ratio only applies when genes are on different chromosomes (independent assortment). Linked genes on the same chromosome deviate from this ratio.</p>",
        "<p class='exp-key'>Bottom Line: For independently assorting genes, multiply the probabilities: P(aabb) = 1/4 × 1/4 = 1/16. A 9:3:3:1 phenotypic ratio additionally assumes complete dominance at both loci and no interaction changing those phenotype categories.</p>"],
    ],
  },

  // -------------------------------------------------------------- Q17 bio-18
  // A balanced Robertsonian translocation gives 45 chromosomes, not 46, so
  // "translocations keep the count at 46" is wrong as a blanket rule.
  17: {
    expectLetter: 'B',
    explanation: [
      ['<tr><td>Translocation</td><td>Usually 46 (rearranged)</td><td>Robertsonian translocation</td></tr>',
        '<tr><td>Reciprocal translocation</td><td>Often 46 (rearranged)</td><td>Balanced carrier</td></tr>'
        + '<tr><td>Balanced Robertsonian translocation</td><td>Typically 45</td><td>Two chromosomes fused</td></tr>'],
      ['<p><strong>D. Translocation:</strong> A translocation moves a segment of one chromosome onto another. It rearranges material without changing the total count, so the karyotype usually still reads 46. This patient has 47. (A minority of Down syndrome cases do arise from a Robertsonian translocation, but those still show 46 chromosomes.)</p>',
        '<p><strong>D. Translocation:</strong> A translocation rearranges chromosome material. A balanced reciprocal translocation usually retains 46 chromosomes, whereas a balanced Robertsonian translocation typically has 45 because two chromosomes have fused. Translocation Down syndrome can have 46 chromosomes with extra chromosome-21 material. The stem instead describes 47 chromosomes with three separate copies of chromosome 21.</p>'],
      ['<li>A translocation rearranges material while typically leaving the count at 46, so it is not numerical aneuploidy.</li>',
        '<li>Translocations are structural chromosome rearrangements; their chromosome counts depend on the type.</li>'],
    ],
  },

  // -------------------------------------------------------------- Q18 bio-19
  // Taq is an example of a thermostable polymerase, not the only one, and the
  // 2^n takeaway ignored the starting copy number and the plateau.
  18: {
    expectLetter: 'C',
    stem: ['Polymerase chain reaction (PCR) requires all of the following EXCEPT:',
      'Standard thermal-cycling PCR of a DNA sample requires all of the following EXCEPT:'],
    option: [1, 'Thermostable DNA polymerase (Taq)', 'A thermostable DNA polymerase, such as Taq'],
    explanation: [
      ['<p><strong>B. Thermostable DNA polymerase (Taq):</strong> Taq polymerase (from <em>Thermus aquaticus</em>, a bacterium from hot springs) is essential for PCR because it withstands the ~95°C denaturation step that would destroy normal DNA polymerases. Without Taq, you would need to add fresh enzyme after every denaturation cycle. Since Taq is required, this is not the correct answer.</p>',
        '<p><strong>B. A thermostable DNA polymerase, such as Taq:</strong> A thermostable DNA polymerase synthesizes DNA and withstands repeated heating. Taq is commonly used, but other thermostable polymerases can also perform PCR. Since a thermostable polymerase is required, this is not the correct answer.</p>'],
      ['<li>The central dogma of molecular biology describes information flow: DNA is transcribed to mRNA, which is translated to protein.</li><li>Eukaryotic gene expression is regulated at multiple levels: chromatin remodeling, transcription, post-transcription (splicing), translation, and post-translation.</li><li>Mutations in DNA can be silent, missense, nonsense, or frameshift - each with different impacts on protein structure and function.</li>',
        '<li>Each cycle runs three steps: denaturation separates the strands, annealing binds the primers, and extension synthesizes new DNA.</li>'
        + '<li>With ideal doubling, N₀ starting target copies produce N₀ &times; 2ⁿ copies after n cycles; actual amplification is less efficient and eventually plateaus.</li>'
        + '<li>Standard PCR starts from DNA. Reverse-transcription PCR first copies RNA into cDNA, which is why reverse transcriptase belongs there and not here.</li>'],
      ["<p class='exp-key'>Bottom Line: PCR amplifies DNA exponentially: after n cycles, there are approximately 2ⁿ copies. Taq polymerase from Thermus aquaticus survives repeated heating, making the automated thermal cycling possible.</p>",
        "<p class='exp-key'>Bottom Line: PCR approximately doubles the target each cycle during efficient amplification. A thermostable polymerase survives repeated heating, which is what makes automated thermal cycling possible.</p>"],
    ],
  },

  // -------------------------------------------------------------- Q19 bio-20
  // Macrophages are innate cells that support adaptive immunity, not members
  // of both arms. Distractors were one-liners.
  19: {
    expectLetter: 'B',
    stem: ['Which type of immune cell is directly responsible for killing virus-infected host cells?',
      'In the adaptive immune response, which type of immune cell is directly responsible for killing virus-infected host cells?'],
    explanation: [
      ['<tr><td>Macrophages</td><td>Phagocytosis, antigen presentation</td><td>Innate + Adaptive</td></tr>',
        '<tr><td>Macrophages</td><td>Phagocytosis, antigen presentation</td><td>Innate; helps activate adaptive immunity</td></tr>'],
      ['<p>CD8+ T cells kill target cells using perforins (create pores in the target cell membrane) and granzymes (enter through pores and trigger apoptosis).</p>',
        '<p>CD8+ T cells kill target cells using perforins (create pores in the target cell membrane) and granzymes (enter through pores and trigger apoptosis). MHC molecules are cell-surface proteins that display peptide fragments for T cells to inspect. Natural killer cells can also kill virus-infected cells, but they are not among these options and belong to innate immunity.</p>'],
      ['<p><strong>A. B lymphocytes:</strong> Produce antibodies (humoral immunity) but do not directly kill infected cells.</p>',
        '<p><strong>A. B lymphocytes:</strong> B cells recognize antigen and can differentiate into plasma cells that secrete antibodies. Antibodies mark pathogens and neutralize them outside cells; they do not themselves kill an infected host cell.</p>'],
      ['<p><strong>C. Helper T lymphocytes (CD4+):</strong> Coordinate immune responses by releasing cytokines; they activate other immune cells but do not kill directly.</p>',
        '<p><strong>C. Helper T lymphocytes (CD4+):</strong> CD4+ helper T cells coordinate other immune cells by releasing cytokines, including the help that cytotoxic T cells and B cells depend on. They direct the response rather than killing infected cells themselves.</p>'],
      ['<p><strong>D. Macrophages:</strong> Phagocytic cells that engulf pathogens and present antigens; part of innate immunity.</p>',
        '<p><strong>D. Macrophages:</strong> Macrophages engulf pathogens and debris and present antigen to T cells. They are innate immune cells that help activate adaptive immunity rather than the adaptive killers asked for here.</p>'],
      ['<li>Innate immunity provides rapid, non-specific defense (physical barriers, phagocytes, complement, inflammation), while adaptive immunity provides specific, slower but more targeted responses.</li><li>Adaptive immunity has two arms: humoral (B cells producing antibodies) and cell-mediated (T cells directly attacking infected/abnormal cells).</li><li>Immunological memory allows faster and stronger responses to previously encountered antigens - this is the basis of vaccination.</li>',
        '<li>CD8+ cytotoxic T cells recognize infected cells and can trigger their apoptosis.</li>'
        + '<li>CD4+ helper T cells coordinate other immune cells.</li>'
        + '<li>B cells can differentiate into antibody-secreting plasma cells.</li>'],
    ],
  },
  // -------------------------------------------------------------- Q20 bio-21
  // A normal stomach lining has surface mucous cells, not goblet cells, and
  // an exact alveolar thickness depends on what is being measured.
  20: {
    expectLetter: 'C',
    explanation: [
      ['<p>The alveolar wall is only about 0.2 micrometers thick, creating a very short diffusion path between air and blood.',
        '<p>The air&ndash;blood barrier is extremely thin, minimizing the distance gases must diffuse.'],
      ['<p><strong>B. Simple columnar epithelium:</strong> This tissue is a single layer of tall, column-shaped cells specialized for absorption and secretion. It lines the stomach (with goblet cells producing mucus) and the intestines (with microvilli for nutrient absorption). While it is a single layer, the cells are too tall and thick to permit the rapid gas exchange needed in alveoli.</p>',
        '<p><strong>B. Simple columnar epithelium:</strong> Simple columnar epithelium consists of tall cells specialized for absorption and secretion. It lines the stomach, where surface mucous cells protect the lining, and the intestines, which contain absorptive cells and goblet cells. Its structure is different from the very thin squamous cells covering most of the alveolar gas-exchange surface.</p>'],
      ['<li>The same epithelium lines capillaries and the serous membranes, for the same reason.</li>',
        '<li>Simple squamous cells also form capillary endothelium and serous membranes; their functions depend on location.</li>'],
    ],
  },

  // -------------------------------------------------------------- Q21 bio-22
  // SUBSTANTIAL OPTION REVISION. A and C were the same answer, because the
  // mitral valve IS the bicuspid valve. D was specialist trivia.
  21: {
    expectLetter: 'B',
    options: [
      'Mitral and tricuspid valves',
      'Aortic and pulmonary semilunar valves',
      'Aortic and mitral valves',
      'Pulmonary and tricuspid valves',
    ],
    explanation: [
      ['<p>Vena cava -> Right atrium -> [Tricuspid] -> Right ventricle -> [Pulmonary valve] -> Lungs -> Pulmonary veins',
        '<p>Vena cava -> Right atrium -> [Tricuspid] -> Right ventricle -> [Pulmonary valve] -> Pulmonary arteries -> Lungs -> Pulmonary veins'],
      ['<p><strong>A. Mitral and tricuspid valves:</strong> The mitral (bicuspid) and tricuspid valves are the atrioventricular (AV) valves. They sit between the atria and ventricles, preventing backflow from ventricles into atria during ventricular contraction (systole). The mitral valve is on the left side; the tricuspid is on the right. These guard the AV openings, not the arterial exits.</p>',
        '<p><strong>A. Mitral and tricuspid valves:</strong> These are atrioventricular valves. They prevent blood from flowing from the ventricles back into the atria.</p>'],
      ['<p><strong>C. Bicuspid and tricuspid valves:</strong> "Bicuspid" is another name for the mitral valve. So this answer is identical to option A - both are AV valves preventing atrial backflow. The key distinction to remember: AV valves (mitral + tricuspid) close at the start of systole (S1 heart sound), while semilunar valves (aortic + pulmonary) close at the start of diastole (S2 heart sound).</p>',
        '<p><strong>C. Aortic and mitral valves:</strong> The aortic valve prevents aortic backflow into the left ventricle, but the mitral valve guards the opening between the left atrium and left ventricle. This pair omits the pulmonary valve.</p>'],
      ['<p><strong>D. Eustachian and Thebesian valves:</strong> These are vestigial or minor cardiac structures. The Eustachian valve (valve of the inferior vena cava) is a small fold of tissue that directed blood through the foramen ovale in fetal circulation. The Thebesian valve guards the coronary sinus opening. Neither plays a significant role in preventing arterial backflow in postnatal circulation.</p>',
        '<p><strong>D. Pulmonary and tricuspid valves:</strong> The pulmonary valve prevents pulmonary-artery backflow into the right ventricle, but the tricuspid valve guards the opening between the right atrium and right ventricle. This pair omits the aortic valve.</p>'],
      ['<li>The heart functions as a double pump: the right side pumps deoxygenated blood to the lungs (pulmonary circuit), and the left side pumps oxygenated blood to the body (systemic circuit).</li><li>Cardiac output equals heart rate multiplied by stroke volume; it is regulated by the autonomic nervous system, hormones, and intrinsic mechanisms (Frank-Starling law).</li><li>The cardiac conduction system (SA node, AV node, Bundle of His, Purkinje fibers) coordinates rhythmic contraction without external nerve stimulation.</li>',
        '<li>The semilunar valves, aortic and pulmonary, sit at the exits of the ventricles and stop blood returning from the great arteries.</li>'
        + '<li>The atrioventricular valves, mitral and tricuspid, sit between each atrium and ventricle and stop blood returning into the atria.</li>'
        + '<li>Mitral and bicuspid are two names for the same valve, so a pair naming both is naming one valve twice.</li>'],
    ],
  },

  // -------------------------------------------------------------- Q23 bio-24
  // One percentage was applied to every filtered substance, "protein-free"
  // was absolute, and the takeaway compared a concentration with a rate.
  23: {
    expectLetter: 'B',
    explanation: [
      ['reabsorbs approximately 65-80% of the filtrate, including virtually all glucose and amino acids under normal conditions',
        'reabsorbs about 65&ndash;70% of filtered water and sodium, along with nearly all filtered glucose and amino acids under normal conditions'],
      ['<p>Glucose reabsorption in the PCT uses sodium-glucose cotransporters (SGLT). When blood glucose exceeds ~180 mg/dL (renal threshold), the transporters become saturated, and glucose appears in urine (glycosuria).</p>',
        "<p>Glucose reabsorption in the PCT uses sodium-glucose cotransporters. The sodium gradient provides the energy for glucose and amino acids to be carried from the filtrate into proximal-tubule cells. If the filtered glucose load exceeds the tubule's reabsorptive capacity, glucose appears in the urine (glycosuria).</p>"],
      ['producing a protein-free and cell-free filtrate',
        'producing a filtrate that is normally cell-free and very low in protein'],
      ["<p class='exp-key'>Bottom Line: The PCT does the heavy lifting of reabsorption. Diabetes mellitus causes glycosuria because blood glucose exceeds the transport maximum of the PCT. SGLT2 inhibitors are a class of diabetes drugs that work by blocking glucose reabsorption here.</p>",
        "<p class='exp-key'>Bottom Line: The proximal tubule does the heavy lifting of reabsorption. If the filtered glucose load exceeds the tubule's reabsorptive capacity, glucose appears in urine.</p>"],
    ],
  },

  // -------------------------------------------------------------- Q24 bio-25
  // SUBSTANTIAL REWRITE. The table implied one germ layer per organ, the
  // cleavage explanation denied early differentiation, the sequence treated
  // overlapping processes as strictly separate, and the takeaway was a quote.
  24: {
    expectLetter: 'B',
    explanationFull:
      '<h4>Correct Answer: Gastrulation</h4>'
      + '<p>During gastrulation, cells of the epiblast move and reorganize to establish three primary germ layers: ectoderm, mesoderm, and endoderm. These layers later contribute to different tissues. An organ can contain tissues derived from more than one germ layer.</p>'
      + "<table class='exp-table'><tr><th>Germ Layer</th><th>Contributes to</th></tr>"
      + '<tr><td>Ectoderm</td><td>Epidermis of the skin, nervous system, lens, tooth enamel</td></tr>'
      + '<tr><td>Mesoderm</td><td>Most muscle, bone and connective tissue; blood, heart, kidneys and gonads</td></tr>'
      + '<tr><td>Endoderm</td><td>Much of the digestive and respiratory epithelium; epithelial tissues of organs such as the liver and pancreas</td></tr></table>'
      + "<div class='exp-diagram'><p><strong>Embryonic Development Sequence:</strong></p>"
      + '<p>Fertilization -> Cleavage -> Blastocyst -> Gastrulation (3 germ layers) -> Neurulation (neural tube) -> Organogenesis</p>'
      + '<p>These phases overlap in time rather than finishing one before the next begins.</p></div>'
      + '<h4>Why the other choices are wrong:</h4>'
      + '<p><strong>A. Cleavage:</strong> Cleavage is a series of early mitotic divisions that produces smaller cells without a comparable increase in overall embryo size. Formation of the three primary germ layers occurs later, during gastrulation.</p>'
      + '<p><strong>C. Neurulation:</strong> Neurulation forms the neural tube from ectoderm. It follows the start of gastrulation and overlaps with other early developmental processes.</p>'
      + '<p><strong>D. Organogenesis:</strong> Organogenesis is the development of organs from the established germ layers. Neurulation is one component of this broader process.</p>'
      + '<h4>Key Educational Points:</h4><ul>'
      + '<li>Gastrulation reorganizes the embryo into ectoderm, mesoderm, and endoderm.</li>'
      + '<li>An organ is not the product of one germ layer: the gut wall, for example, combines endodermal epithelium with mesodermal muscle.</li>'
      + '<li>The order to remember is cleavage, then gastrulation, then neurulation and organogenesis.</li>'
      + '</ul>'
      + "<p class='exp-key'>Bottom Line: Gastrulation establishes ectoderm, mesoderm, and endoderm; organogenesis builds organs from their derivatives.</p>",
  },
  // -------------------------------------------------------------- Q27 bio-28
  // Endogenous synthesis is not unique to vitamin D (niacin comes from
  // tryptophan), and the newborn vitamin-K story was wrong about sterile gut.
  27: {
    expectLetter: 'C',
    explanation: [
      ['<p>Vitamin D is unique among vitamins because it can be synthesized endogenously when UV-B radiation from sunlight converts 7-dehydrocholesterol in the skin to cholecalciferol (vitamin D3).</p>',
        '<p>Vitamin D can be synthesized in the skin when exposed to UVB light: UV-B radiation converts 7-dehydrocholesterol in the skin to cholecalciferol (vitamin D3).</p>'],
      ['<tr><td>Vitamin K</td><td>Blood clotting factors synthesis</td><td>Bleeding disorders</td></tr>',
        '<tr><td>Vitamin K</td><td>Activation of several blood-clotting proteins</td><td>Bleeding disorders</td></tr>'],
      ['Deficiency causes prolonged bleeding. Newborns receive a vitamin K injection at birth because they have sterile guts and cannot yet produce vitamin K from gut bacteria. It is not synthesized in the skin.',
        'Deficiency causes prolonged bleeding. Newborns have low vitamin K stores and receive little through breast milk, which is why vitamin K is routinely given after birth. It is not synthesized in the skin.'],
      ['<li>Vitamin D is unique in being synthesised endogenously, from 7-dehydrocholesterol in skin under UVB.</li>',
        '<li>Vitamin D can be made in the skin from 7-dehydrocholesterol under UVB, so sunlight exposure reduces how much must come from the diet. It is not the only vitamin the body can make: niacin can be synthesised from tryptophan.</li>'],
      ['<li>Its active form calcitriol raises intestinal calcium absorption and promotes bone mineralisation.</li>',
        '<li>Calcitriol, the active form, raises intestinal calcium absorption and promotes bone mineralisation.</li>'],
    ],
  },

  // -------------------------------------------------------------- Q28 bio-29
  // MAJOR REWRITE OF THE WHOLE ITEM. The stem asserted both disputed direct
  // ancestry and an overly certain claim about the first extensive controlled
  // use of fire. The explanation added unsupported absolutes about the first
  // toolmakers. None of that is preserved.
  28: {
    expectLetter: 'B',
    stem: ['Which species of the genus Homo is considered the direct ancestor of anatomically modern humans and is known for being the first to use controlled fire extensively?',
      'Which early human species is strongly associated with Acheulean handaxes and was among the first to spread widely beyond Africa?'],
    explanationFull:
      '<h4>Correct Answer: Homo erectus</h4>'
      + '<p>Homo erectus is associated with Acheulean stone tools, including handaxes, and an early expansion from Africa into parts of Asia. Compared with earlier hominins, it had body proportions better suited to efficient movement on the ground. Human evolution involved branching lineages rather than a single ladder of species.</p>'
      + '<h4>Why the other choices are wrong:</h4>'
      + '<p><strong>A. Homo habilis:</strong> Homo habilis is associated with earlier Oldowan stone tools. It is not the species best associated with the combination of Acheulean handaxes and widespread early dispersal beyond Africa.</p>'
      + '<p><strong>C. Homo neanderthalensis:</strong> Neanderthals lived much later and were a close relative of modern humans. They are not the earliest species associated with this dispersal.</p>'
      + '<p><strong>D. Australopithecus afarensis:</strong> Australopithecus afarensis was an earlier bipedal hominin and is not a member of the genus Homo.</p>'
      + '<h4>Key Educational Points:</h4><ul>'
      + '<li>Oldowan tools are the earlier, simpler industry; Acheulean handaxes are the later, more standardised one associated with Homo erectus.</li>'
      + '<li>Homo erectus is the first hominin known to have spread widely beyond Africa.</li>'
      + '<li>Treat claims of direct ancestry with caution: the fossil record shows a branching tree, and which branch leads to us is often unresolved.</li>'
      + '</ul>'
      + "<p class='exp-key'>Bottom Line: Associate Homo erectus with early dispersal beyond Africa and Acheulean handaxes. Claims about exact direct ancestry or the first control of fire require more caution.</p>",
  },

  // -------------------------------------------------------------- Q29 bio-30
  // A diagnostic glucose range was being taught incidentally, insulin was
  // implied to be needed by all cells, and norepinephrine was said always to
  // raise heart rate.
  29: {
    expectLetter: 'A',
    explanation: [
      ['work in opposition to maintain blood glucose within a narrow range (70-110 mg/dL)',
        'work in opposition to help maintain blood glucose within a normal range'],
      ['<tr><td>Mechanism</td><td>Stimulates glucose uptake by cells, glycogenesis</td><td>Stimulates glycogenolysis, gluconeogenesis</td></tr>',
        '<tr><td>Mechanism</td><td>Stimulates glucose uptake chiefly by skeletal muscle and adipose tissue; promotes glycogenesis</td><td>Acts chiefly on the liver to stimulate glycogenolysis and gluconeogenesis</td></tr>'],
      ['<p>High glucose -> Beta cells release insulin -> Cells absorb glucose -> Blood glucose falls</p>',
        '<p>High glucose -> Beta cells release insulin -> Muscle and fat take up glucose -> Blood glucose falls</p>'],
      ['<p><strong>C. Epinephrine and norepinephrine:</strong> These catecholamines are released by the adrenal medulla during the "fight or flight" response. They both work in the <em>same direction</em> - increasing heart rate, blood pressure, and blood glucose. Since they are synergistic rather than antagonistic, they do not form an antagonistic pair for glucose homeostasis.</p>',
        '<p><strong>C. Epinephrine and norepinephrine:</strong> Epinephrine and norepinephrine participate in the stress response and can mobilize energy stores. They do not form the principal glucose-lowering/glucose-raising pair described in the question.</p>'],
      ['While they sometimes have opposing effects on the uterine lining (estrogen proliferates it, progesterone stabilizes it), they are not involved in blood glucose homeostasis.',
        'While they sometimes have opposing effects on the uterine lining (estrogen proliferates it, progesterone stabilizes it), they are not the main antagonistic pair controlling blood glucose. Sex hormones can affect metabolism.'],
      ['<li>Hormones are chemical messengers that travel through the blood to target cells; they can be peptide/protein (hydrophilic, bind surface receptors) or steroid (lipophilic, enter cells and bind intracellular receptors).</li><li>The hypothalamic-pituitary axis is the master regulatory system - the hypothalamus controls the pituitary, which in turn controls peripheral endocrine glands.</li><li>Negative feedback is the primary mechanism regulating hormone levels: high hormone levels inhibit further release from upstream glands.</li>',
        '<li>Beta cells of the pancreatic islets release insulin when blood glucose rises; insulin lowers it.</li>'
        + '<li>Alpha cells release glucagon when blood glucose falls; glucagon acts chiefly on the liver to raise it.</li>'
        + '<li>An antagonistic pair must act on the same variable in opposite directions, which is what separates this pair from the other options.</li>'],
    ],
  },

  // -------------------------------------------------------------- Q31 bio-32
  // Distractors claimed Rhizobium can never do other things, and
  // nitrification was collapsed into one step with two genera attached.
  31: {
    expectLetter: 'B',
    explanation: [
      ['<tr><td>Nitrification</td><td>Nitrosomonas, Nitrobacter</td><td>NH₃ → NO₃⁻</td></tr>',
        '<tr><td>Nitrification, step 1</td><td>Nitrosomonas</td><td>NH₃/NH₄⁺ → NO₂⁻</td></tr>'
        + '<tr><td>Nitrification, step 2</td><td>Nitrobacter</td><td>NO₂⁻ → NO₃⁻</td></tr>'],
      ['<p><strong>A. They decompose cellulose in the plant roots:</strong> Cellulose decomposition is performed by saprophytic fungi and certain bacteria (like <em>Cellulomonas</em>), not by Rhizobium. Cellulose-degrading organisms break down dead plant material in soil, contributing to nutrient recycling. Rhizobium\'s symbiotic role is specifically nitrogen fixation - converting atmospheric N₂ into ammonia (NH₃) that plants can use for amino acid and nucleotide synthesis.</p>',
        '<p><strong>A. They decompose cellulose in the plant roots:</strong> Breaking down cellulose is not the defining benefit of the legume&ndash;Rhizobium association. The bacteria supply fixed nitrogen that the plant can use to build amino acids and other molecules.</p>'],
      ['<p><strong>C. They produce antibiotics that protect from fungal infections:</strong> While some soil bacteria (notably <em>Streptomyces</em> species) are prolific antibiotic producers, Rhizobium is not one of them. Rhizobium\'s symbiotic contribution is fixing atmospheric nitrogen using the enzyme nitrogenase within specialized root structures called nodules. The plant provides the bacteria with carbohydrates in return.</p>',
        '<p><strong>C. They produce antibiotics that protect from fungal infections:</strong> Some plant-associated bacteria can help suppress pathogens, but the essential process tested in this symbiosis is nitrogen fixation. The plant provides carbohydrate; the bacteria provide fixed nitrogen.</p>'],
      ['<li>Know the nitrogen cycle steps: fixation (N₂ to NH₃), nitrification (NH₃ to NO₃⁻), denitrification (NO₃⁻ to N₂), ammonification (organic N to NH₃).</li>',
        '<li>Know the nitrogen cycle steps: fixation (N₂ to NH₃), nitrification in two steps (NH₃/NH₄⁺ to NO₂⁻, then NO₂⁻ to NO₃⁻), denitrification (NO₃⁻ to N₂), ammonification (organic N to NH₃).</li>'],
    ],
  },
  // -------------------------------------------------------------- Q32 bio-33
  // Retroviruses are enveloped, not "often" enveloped, and not all phages
  // have tails. Generic viral-life-cycle points replaced with the contrast
  // the question actually tests.
  32: {
    expectLetter: 'C',
    explanation: [
      ['a protein capsid, and often a lipid envelope', 'a protein capsid, and a lipid envelope'],
      ['<tr><td>Bacteriophage</td><td>DNA or RNA</td><td>Capsid + tail</td><td>Infects bacteria</td></tr>',
        '<tr><td>Bacteriophage</td><td>DNA or RNA</td><td>Capsid; many also have a tail</td><td>Infects bacteria</td></tr>'],
      ['<li>Viruses are obligate intracellular parasites consisting of nucleic acid (DNA or RNA) enclosed in a protein coat (capsid); they cannot reproduce independently.</li><li>Viral replication strategies vary: lytic cycle (immediate reproduction and cell lysis) vs. lysogenic cycle (genome integration as prophage with delayed lysis).</li><li>Retroviruses (like HIV) use reverse transcriptase to convert their RNA genome into DNA, which integrates into the host chromosome as a provirus.</li>',
        '<li>A virus contains a DNA or RNA genome within a protein coat.</li>'
        + '<li>A viroid is a small infectious RNA molecule without a protein coat.</li>'
        + '<li>A prion is an infectious misfolded protein that promotes misfolding of normal protein; it has no nucleic-acid genome.</li>'],
      ["<p class='exp-key'>Bottom Line: Prions convert normal PrPC (α-helix rich) into pathological PrPSc (β-sheet rich). This autocatalytic conversion causes spongiform brain degeneration.</p>",
        "<p class='exp-key'>Bottom Line: A prion is protein only, with no genome. The normal cellular form of the protein (PrP<sup>C</sup>, rich in &alpha;-helix) is converted into the disease-associated form (PrP<sup>Sc</sup>, rich in &beta;-sheet), and that converted protein drives further misfolding.</p>"],
    ],
  },

  // -------------------------------------------------------------- Q33 bio-34
  // Not every integral protein spans the bilayer, and cholesterol does not
  // switch behaviour at exactly 37 degrees.
  33: {
    expectLetter: 'B',
    explanation: [
      ['<tr><td>Cholesterol (37°C)</td><td>Decreases fluidity</td></tr><tr><td>Cholesterol (low temp)</td><td>Increases fluidity</td></tr>',
        '<tr><td>Cholesterol at higher temperatures</td><td>Restrains phospholipid movement</td></tr>'
        + '<tr><td>Cholesterol at lower temperatures</td><td>Prevents tight packing</td></tr>'],
      ['<p><strong>A. Integral membrane proteins:</strong> Integral (transmembrane) proteins span the lipid bilayer and serve as channels, receptors, and enzymes.',
        '<p><strong>A. Integral membrane proteins:</strong> Integral proteins are embedded in the membrane; many span the entire bilayer and function as channels, receptors, or enzymes.'],
    ],
  },

  // -------------------------------------------------------------- Q34 bio-35
  // An E. coli enzyme set was presented as universal, restriction sites were
  // all called palindromic, and telomere shortening was made universal.
  34: {
    expectLetter: 'C',
    explanation: [
      // A <caption>, not a colspan header: qbank-sanitizer.js strips every
      // attribute except class, so a colspan would vanish and leave a
      // one-cell row in a two-column table.
      ["<table class='exp-table'><tr><th>Enzyme</th><th>Role</th></tr>",
        "<table class='exp-table'><caption>DNA replication in <em>E. coli</em>: a bacterial example</caption><tr><th>Enzyme</th><th>Role</th></tr>"],
      ['After replication, these RNA primers are removed and replaced with DNA by DNA polymerase I, and the gaps are sealed by DNA ligase.',
        'After replication, these RNA primers are removed and replaced with DNA, by DNA polymerase I in this bacterial example, and the gaps are sealed by DNA ligase.'],
      ['enzymes that recognize and cleave specific palindromic DNA sequences',
        'enzymes that cut specific recognition sequences; many commonly used examples recognize palindromic sequences'],
      ['Telomeres shorten with each cell division because DNA polymerase cannot fully replicate',
        'Telomeres shorten with each division in many somatic cells because DNA polymerase cannot fully replicate'],
      ['<li>The central dogma of molecular biology describes information flow: DNA is transcribed to mRNA, which is translated to protein.</li><li>Eukaryotic gene expression is regulated at multiple levels: chromatin remodeling, transcription, post-transcription (splicing), translation, and post-translation.</li><li>Mutations in DNA can be silent, missense, nonsense, or frameshift - each with different impacts on protein structure and function.</li>',
        '<li>The leading strand is synthesized continuously toward the replication fork; the lagging strand is built backwards in pieces.</li>'
        + '<li>Every Okazaki fragment begins from its own primer, because a DNA polymerase cannot start a strand from nothing.</li>'
        + '<li>Once the primers are replaced with DNA, ligase seals the nicks between fragments.</li>'],
      ["<p class='exp-key'>Bottom Line: Each Okazaki fragment needs its own RNA primer. DNA Pol I removes primers, fills gaps, then ligase seals the nicks.</p>",
        "<p class='exp-key'>Bottom Line: The lagging strand is synthesized as Okazaki fragments because DNA polymerases extend new DNA only in the 5&prime;&rarr;3&prime; direction. Each fragment starts from a primer; after primer removal and replacement, DNA ligase seals the remaining nicks.</p>"],
    ],
  },

  // -------------------------------------------------------------- Q35 bio-36
  // The takeaway said "each codon = one amino acid", contradicting the
  // explanation above it, which correctly allowed for stop codons.
  35: {
    expectLetter: 'B',
    explanation: [
      ['<li>The central dogma of molecular biology describes information flow: DNA is transcribed to mRNA, which is translated to protein.</li><li>Eukaryotic gene expression is regulated at multiple levels: chromatin remodeling, transcription, post-transcription (splicing), translation, and post-translation.</li><li>Mutations in DNA can be silent, missense, nonsense, or frameshift - each with different impacts on protein structure and function.</li>',
        '<li>In the standard code, 61 codons specify amino acids and 3 are stop signals.</li>'
        + '<li>Most amino acids have more than one codon; methionine and tryptophan each have one.</li>'
        + '<li>Some single-base substitutions are synonymous because they change a codon without changing the encoded amino acid.</li>'
        + '<li>Wobble describes flexible pairing between the third codon base and the anticodon. It helps explain how degeneracy is read, but it is not the definition of degeneracy.</li>'],
      ["<p class='exp-key'>Bottom Line: The code is degenerate (multiple codons per amino acid), unambiguous (each codon = one amino acid), universal, and non-overlapping. Wobble at position 3 explains most degeneracy.</p>",
        "<p class='exp-key'>Bottom Line: The genetic code is degenerate because several codons can specify the same amino acid. It is unambiguous because a given codon specifies one amino acid or a stop signal in the standard code, and it is nearly universal across organisms.</p>"],
    ],
  },
  // -------------------------------------------------------------- Q36 bio-37
  // SUBSTANTIAL REWRITE. The old item said p53 loss removes all apoptosis and
  // arrest, implied G0 is necessarily permanent, and taught the two-hit model
  // as exceptionless. p53-independent arrest and apoptosis both exist.
  36: {
    expectLetter: 'B',
    explanationFull:
      '<h4>Correct Answer: DNA replication proceeds despite damage, increasing cancer risk</h4>'
      + '<p>TP53 encodes p53, a protein that helps protect cells after DNA damage. It can promote cell-cycle arrest, giving the cell time to repair damage, and can promote apoptosis when the damage is severe. Loss of functional p53 weakens these safeguards, making it more likely that a cell survives and divides with damaged DNA. This increases cancer risk; it does not mean that cancer appears immediately.</p>'
      + "<table class='exp-table'><tr><th>Gene type</th><th>Normal role</th><th>How a change can favour cancer</th></tr>"
      + '<tr><td>Tumor suppressor</td><td>Helps restrain growth or protect genome integrity</td><td>Loss of function can favour cancer</td></tr>'
      + '<tr><td>Proto-oncogene</td><td>Normally helps promote growth or survival</td><td>Activating change can favour cancer</td></tr></table>'
      + '<h4>Why the other choices are wrong:</h4>'
      + '<p><strong>A. Immediate apoptosis:</strong> Loss of p53 generally reduces p53-dependent apoptosis rather than triggering it. Other pathways can still cause apoptosis.</p>'
      + '<p><strong>C. Permanent G0 arrest:</strong> G0 is a nondividing state and is not always permanent. Loss of p53 weakens an important growth-control pathway rather than forcing the cell into permanent quiescence.</p>'
      + '<p><strong>D. Chromosome number reduces to haploid:</strong> An orderly reduction to a haploid chromosome set is a feature of meiosis, not a direct consequence of losing p53.</p>'
      + '<h4>Key Educational Points:</h4><ul>'
      + '<li>p53 can pause the cell cycle after DNA damage so repair can happen, and can push a badly damaged cell into apoptosis.</li>'
      + '<li>Losing p53 weakens both safeguards, so damaged cells are more likely to survive and divide.</li>'
      + '<li>For many tumor suppressors, both copies must be lost before the effect shows at the cellular level.</li>'
      + '</ul>'
      + "<p class='exp-key'>Bottom Line: Loss of p53 allows damaged cells to survive and divide more readily, increasing the chance that additional cancer-promoting changes accumulate.</p>",
  },

  // -------------------------------------------------------------- Q37 bio-38
  // Crossing over is not impossible outside prophase I, and not all four
  // meiotic products mature into gametes.
  37: {
    expectLetter: 'A',
    explanation: [
      ['<li>It cannot occur at any other stage, because homologues are physically paired only during prophase I.</li>',
        '<li>Normal meiotic crossing over occurs during prophase I between nonsister chromatids of homologous chromosomes. The homologues remain connected at chiasmata until they separate in anaphase I.</li>'],
      ['The four resulting cells then mature into gametes (sperm or ova).',
        'In spermatogenesis, the four haploid products can develop into sperm; oogenesis produces one functional egg and polar bodies.'],
    ],
  },

  // -------------------------------------------------------------- Q38 bio-39
  // Option D's explanation called the fusion it describes "normal", and the
  // cytokinesis answer claimed a doubled chromosome number.
  38: {
    expectLetter: 'B',
    explanation: [
      ['<p>In meiosis I nondisjunction, both homologs go to one cell.</p>',
        '<p>In meiosis I nondisjunction, both homologs go to one cell. The comparison below assumes one affected chromosome pair and otherwise normal divisions; the meiosis II row assumes nondisjunction in just one of the two cells produced by meiosis I.</p>'],
      ['<p><strong>A. The cell fails to complete cytokinesis:</strong> Failure of cytokinesis produces a single cell with double the chromosome number (a binucleate or polyploid cell), which is a different type of error. This is not nondisjunction.',
        '<p><strong>A. The cell fails to complete cytokinesis:</strong> Failure of cytokinesis prevents physical separation into daughter cells and can leave a cell with two nuclei. That differs from chromosomes failing to separate during nuclear division.'],
      ['<p><strong>D. Sister chromatids fuse at the centromere:</strong> Sister chromatids are normally joined at the centromere after DNA replication, held together by cohesin proteins. This is a normal state, not an error. In nondisjunction during meiosis I, the problem is that <em>homologous chromosomes</em> fail to separate - both homologs go to the same pole, producing one cell with an extra chromosome and one with a missing chromosome.</p>',
        '<p><strong>D. Sister chromatids fuse at the centromere:</strong> Sister chromatids are normally held together by cohesin after replication; they are not fused into one continuous DNA molecule. Meiosis I nondisjunction is a failure of homologous chromosomes to separate, so both homologs go to the same pole, producing one cell with an extra chromosome and one with a missing chromosome.</p>'],
    ],
  },

  // -------------------------------------------------------------- Q39 bio-40
  // "100% dominant offspring = parent was AA" treats an expected ratio as
  // proof from a limited sample.
  39: {
    expectLetter: 'B',
    explanation: [
      ['A testcross (unknown genotype × homozygous recessive) reveals the unknown genotype through offspring ratios. 100% dominant offspring = parent was AA; 50% dominant and 50% recessive = parent was Aa. The 50:50 ratio in this question definitively identifies the parent as heterozygous.',
        'An AA parent is expected to produce only dominant-phenotype offspring in this testcross. An Aa parent is expected to produce a 1:1 ratio, although a small sample can deviate by chance. Observing recessive offspring establishes that the dominant-phenotype parent carries a recessive allele under the simple Mendelian model.'],
      ['<li>A roughly 50:50 split of dominant to recessive offspring means the unknown parent produced two kinds of gamete, so it is heterozygous.</li>',
        '<li>A roughly 50:50 split of dominant to recessive offspring means the unknown parent produced two kinds of gamete, so it is heterozygous. The 1:1 figure is the expected ratio, and a small sample can depart from it by chance.</li>'],
    ],
  },
  // -------------------------------------------------------------- Q40 bio-41
  // Option A said each parent would need to contribute both A and B, and the
  // text stated an exact 50:50 split rather than a per-child probability.
  // Genotype notation is also normalised to <sup> throughout.
  40: {
    expectLetter: 'B',
    explanation: [
      ['<p>Father (IAIB) × Mother (ii): father passes IA or IB, mother always passes i.</p>',
        '<p>Father (I<sup>A</sup>I<sup>B</sup>) &times; Mother (ii): the father passes I<sup>A</sup> or I<sup>B</sup>, the mother always passes i.</p>'],
      ['<tr><td>IA</td><td>IAi (Type A)</td><td>IAi (Type A)</td></tr><tr><td>IB</td><td>IBi (Type B)</td><td>IBi (Type B)</td></tr>',
        '<tr><td>I<sup>A</sup></td><td>I<sup>A</sup>i (Type A)</td><td>I<sup>A</sup>i (Type A)</td></tr>'
        + '<tr><td>I<sup>B</sup></td><td>I<sup>B</sup>i (Type B)</td><td>I<sup>B</sup>i (Type B)</td></tr>'],
      ['<p>Children are 50% type A and 50% type B. No AB or O possible.</p>',
        '<p>Each child has a 50% probability of type A and a 50% probability of type B. Neither AB nor O is possible in this cross.</p>'],
      ['<p><strong>A. Only AB:</strong> For all children to be AB, both parents would need to contribute both A and B alleles. But a type O parent has genotype ii (homozygous recessive) and can only pass on the i allele. The AB father (genotype I<sup>A</sup> I<sup>B</sup>) passes either I<sup>A</sup> or I<sup>B</sup>. Each child receives one allele from each parent, resulting in either I<sup>A</sup> i (type A) or I<sup>B</sup> i (type B) - never AB or O.</p>',
        '<p><strong>A. Only AB:</strong> A child with type AB must inherit I<sup>A</sup> from one parent and I<sup>B</sup> from the other. Each parent contributes only one ABO allele to each child. The type O mother contributes i, so the children in this cross can be type A or type B, but not AB.</p>'],
      ['<li>An AB parent is IᴬIᴮ and passes on either Iᴬ or Iᴮ, but never both.</li><li>An O parent is ii and can pass on only i.</li><li>The children are therefore Iᴬi (type A) or Iᴮi (type B) - never AB and never O.</li><li>Iᴬ and Iᴮ are codominant with each other, and both are dominant over i.</li>',
        '<li>An AB parent is I<sup>A</sup>I<sup>B</sup> and passes on either I<sup>A</sup> or I<sup>B</sup>, but never both.</li>'
        + '<li>An O parent is ii and can pass on only i.</li>'
        + '<li>The children are therefore I<sup>A</sup>i (type A) or I<sup>B</sup>i (type B), never AB and never O.</li>'
        + '<li>I<sup>A</sup> and I<sup>B</sup> are codominant with each other, and both are dominant over i.</li>'],
      ["<p class='exp-key'>Bottom Line: ABO uses three alleles: IA, IB (codominant), and i (recessive). Type O requires the ii genotype.</p>",
        "<p class='exp-key'>Bottom Line: ABO uses three alleles: I<sup>A</sup> and I<sup>B</sup> (codominant) and i (recessive). Type O requires the ii genotype.</p>"],
    ],
  },

  // -------------------------------------------------------------- Q41 bio-42
  // Not every colour-vision disorder is X-linked recessive, so the stem is
  // scoped. Notation is unified on X^N / X^n: the old educational point had
  // mangled it to "XᶜXᶜ'". "Females need two copies" is softened.
  41: {
    expectLetter: 'C',
    stem: ['Color blindness is X-linked recessive. If a carrier mother and normal father have children, what percentage of sons will be color blind?',
      'Red&ndash;green color-vision deficiency is usually inherited as an X-linked recessive trait. A carrier mother and a father with normal color vision have children. What is the probability that a son will be affected?'],
    explanationFull:
      '<h4>Correct Answer: 50%</h4>'
      + "<p>Sons inherit the Y chromosome from their father, so only the mother's X matters. Writing X<sup>N</sup> for the normal-vision allele and X<sup>n</sup> for the affected allele: the mother is X<sup>N</sup>X<sup>n</sup> and the father is X<sup>N</sup>Y.</p>"
      + "<table class='exp-table'><tr><th></th><th>X<sup>N</sup></th><th>X<sup>n</sup></th></tr>"
      + '<tr><td>X<sup>N</sup></td><td>X<sup>N</sup>X<sup>N</sup> unaffected daughter</td><td>X<sup>N</sup>X<sup>n</sup> carrier daughter</td></tr>'
      + '<tr><td>Y</td><td>X<sup>N</sup>Y unaffected son</td><td>X<sup>n</sup>Y affected son</td></tr></table>'
      + '<p>Half the sons receive X<sup>n</sup> and are affected, so the probability for any given son is 50%.</p>'
      + '<h4>Why the other choices are wrong:</h4>'
      + '<p><strong>A. 0%:</strong> Zero would require the mother to carry no affected allele. She is X<sup>N</sup>X<sup>n</sup>, so each son has a 50% chance of receiving X<sup>n</sup>.</p>'
      + '<p><strong>B. 25%:</strong> 25% is the proportion of all children who are affected sons, assuming sons and daughters are equally likely. The question asks about sons only, and half of them are affected.</p>'
      + '<p><strong>D. 100%:</strong> Every son would be affected only if the mother were X<sup>n</sup>X<sup>n</sup>, which would mean she was affected herself rather than a carrier.</p>'
      + '<h4>Key Educational Points:</h4><ul>'
      + "<li>Sons receive the Y chromosome from their father, so their X-linked phenotype depends entirely on the mother's X.</li>"
      + '<li>A carrier mother is X<sup>N</sup>X<sup>n</sup> and passes each allele with equal probability, so half her sons are affected.</li>'
      + '<li>Males are hemizygous, carrying only one X, so a single recessive allele is fully expressed.</li>'
      + '<li>Females usually need two affected alleles to express an X-linked recessive condition, which is why these conditions are far commoner in males.</li>'
      + '<li>Watch the denominator: 50% of sons are affected, which is 25% of all children if sons and daughters are equally likely.</li>'
      + '</ul>'
      + "<p class='exp-key'>Bottom Line: X-linked recessive traits appear more often in males, who are hemizygous. One recessive allele on his single X is enough to affect a male.</p>",
  },

  // -------------------------------------------------------------- Q42 bio-43
  // Some genes escape X-inactivation, so "transcriptionally silent" is too
  // absolute, and a Barr body is not visible in every cell of every female.
  42: {
    expectLetter: 'B',
    explanation: [
      ['<p>One X chromosome is randomly inactivated in each female cell (Lyon hypothesis).</p>',
        '<p>In typical XX somatic cells, one X chromosome becomes largely inactive early in development and condenses into a Barr body. The choice is usually random and is passed on to daughter cells (Lyon hypothesis).</p>'],
      ['<li>A Barr body is one X chromosome condensed into transcriptionally silent heterochromatin.</li>',
        '<li>A Barr body is one X chromosome condensed into largely transcriptionally inactive heterochromatin; some genes escape inactivation.</li>'],
      ['<li>Inactivation is random in each cell early in development, which is why heterozygous females are mosaics for X-linked traits.</li>',
        '<li>Inactivation is random in each cell early in development, which is why heterozygous females are mosaics for X-linked traits. A Barr body is not necessarily visible in every cell examined.</li>'],
    ],
  },

  // -------------------------------------------------------------- Q43 bio-44
  // The old option D claimed topology does not affect size separation and
  // that fragments are linear by definition. Both are wrong.
  43: {
    expectLetter: 'B',
    stem: ['In gel electrophoresis, which DNA fragments migrate farthest toward the positive electrode?',
      'When linear double-stranded DNA fragments are separated by standard agarose gel electrophoresis, which fragments usually migrate farthest toward the positive electrode?'],
    explanation: [
      ['<p><strong>D. Circular DNA only:</strong> While DNA conformation (supercoiled, relaxed circular, or linear) does affect migration speed, standard gel electrophoresis separates all DNA by size regardless of topology. The question refers to DNA fragments, which are linear by definition. Circular DNA does migrate differently than linear DNA of the same size, but this is a specialized consideration, not the general principle of electrophoretic separation.</p>',
        '<p><strong>D. Circular DNA only:</strong> Circular DNA can migrate through a gel, but its migration also depends on whether it is relaxed or supercoiled. This question compares linear fragments, for which smaller fragments usually travel farther.</p>'],
      ['<li>The central dogma of molecular biology describes information flow: DNA is transcribed to mRNA, which is translated to protein.</li><li>Eukaryotic gene expression is regulated at multiple levels: chromatin remodeling, transcription, post-transcription (splicing), translation, and post-translation.</li><li>Mutations in DNA can be silent, missense, nonsense, or frameshift - each with different impacts on protein structure and function.</li>',
        "<li>DNA's phosphate backbone gives it a negative charge, so it moves toward the positive electrode.</li>"
        + '<li>The gel acts as a sieve, slowing larger linear fragments more than smaller ones.</li>'
        + '<li>Compare bands with a DNA ladder containing fragments of known length.</li>'],
    ],
  },
  // -------------------------------------------------------------- Q44 bio-45
  // The centimorgan relationship needs its short-interval qualification, and
  // a testcross does not have the same expected ratios as an F2 dihybrid.
  44: {
    expectLetter: 'B',
    explanation: [
      ["<li>Morgan's fruit fly crosses showed an excess of parental combinations and fewer recombinants than a 9:3:3:1 ratio predicts.</li>",
        '<li>Linkage produces more parental allele combinations and fewer recombinant combinations than expected for independently assorting genes.</li>'],
      ['<li>Recombination frequency therefore rises with distance, and 1 centimorgan is defined as 1% recombinant offspring.</li>',
        '<li>Recombination frequency rises with distance. Over short intervals, about 1% recombination corresponds to about 1 centimorgan.</li>'],
      ["<p class='exp-key'>Bottom Line: Recombination frequency is proportional to gene distance. 1 centimorgan = 1% recombination.</p>",
        "<p class='exp-key'>Bottom Line: Nearby genes on the same chromosome tend to be inherited together. For short intervals, a recombination frequency of about 1% corresponds to about 1 centimorgan. Observed recombination frequency approaches, but does not exceed, 50% for ordinary two-locus linkage analysis.</p>"],
    ],
  },

  // -------------------------------------------------------------- Q45 bio-46
  // The CD4 < 200 row is not a complete AIDS definition, and the NK-cell
  // explanation made an absolute claim about receptors and infection.
  45: {
    expectLetter: 'C',
    explanation: [
      ['<tr><td>AIDS criterion</td><td>CD4 below 200 cells/&mu;L</td></tr>',
        '<tr><td>Main consequence</td><td>Reduced coordination of immune responses</td></tr>'],
      ['<p>HIV binds the CD4 receptor and uses reverse transcriptase to convert its RNA to DNA.</p>',
        '<p>HIV binds the CD4 receptor and uses reverse transcriptase to convert its RNA to DNA. It principally targets CD4+ helper T cells and can also infect other susceptible cells such as macrophages.</p>'],
      ['<p><strong>D. Natural killer cells:</strong> NK cells are part of the innate immune system and can kill virus-infected or tumor cells without prior sensitization (no MHC restriction). They do not express CD4 receptors and are therefore not directly targeted by HIV. NK cell function may decline during HIV infection, but this is an indirect consequence of immune system dysregulation, not direct viral infection and destruction.</p>',
        '<p><strong>D. Natural killer cells:</strong> Natural killer cells contribute to innate defense, but they are not the main cell population whose depletion defines the immune defect in HIV infection.</p>'],
      ['<li>Viruses are obligate intracellular parasites consisting of nucleic acid (DNA or RNA) enclosed in a protein coat (capsid); they cannot reproduce independently.</li><li>Viral replication strategies vary: lytic cycle (immediate reproduction and cell lysis) vs. lysogenic cycle (genome integration as prophage with delayed lysis).</li><li>Retroviruses (like HIV) use reverse transcriptase to convert their RNA genome into DNA, which integrates into the host chromosome as a provirus.</li>',
        '<li>CD4+ helper T cells coordinate the immune response, so losing them weakens defence broadly rather than in one place.</li>'
        + '<li>Antibody responses suffer, because B cells depend on helper T cells to mount strong, class-switched responses.</li>'
        + '<li>Cell-mediated defence suffers too, because cytotoxic T cells rely on the same help, which is why opportunistic infections follow.</li>'],
    ],
  },

  // -------------------------------------------------------------- Q47 bio-48
  // Respiring bacteria use the cell membrane, so the stem is scoped to
  // eukaryotes. The ETC is also distinguished from ATP synthase, and the
  // "~34 ATP" column is replaced: that is one older accounting model.
  47: {
    expectLetter: 'C',
    stem: ['The electron transport chain of cellular respiration is located in which structure?',
      'In a eukaryotic cell, the electron transport chain of cellular respiration is located in which structure?'],
    explanation: [
      ['<p>The ETC complexes (I-IV) and ATP synthase are embedded in the inner membrane (cristae).</p>',
        '<p>The electron transport chain transfers electrons and helps build a proton gradient across the inner mitochondrial membrane. ATP synthase uses this gradient to make ATP. Together these processes support oxidative phosphorylation. Both the ETC complexes (I&ndash;IV) and ATP synthase are embedded in the inner membrane, which is folded into cristae.</p>'],
      ['<tr><th>Stage</th><th>Location</th><th>ATP/glucose</th></tr><tr><td>Glycolysis</td><td>Cytoplasm</td><td>2</td></tr><tr><td>Krebs cycle</td><td>Matrix</td><td>2</td></tr><tr><td><strong>ETC</strong></td><td><strong>Inner membrane</strong></td><td><strong>~34</strong></td></tr>',
        '<tr><th>Stage</th><th>Location</th><th>Main role</th></tr>'
        + '<tr><td>Glycolysis</td><td>Cytosol</td><td>Splits glucose into pyruvate</td></tr>'
        + '<tr><td>Citric acid cycle</td><td>Mainly mitochondrial matrix</td><td>Produces reduced electron carriers and releases CO₂</td></tr>'
        + '<tr><td><strong>Oxidative phosphorylation</strong></td><td><strong>Inner mitochondrial membrane</strong></td><td><strong>Uses electron transfer and a proton gradient to generate most ATP from aerobic glucose oxidation</strong></td></tr>'],
      ['<li>Cristae (folds of the inner membrane) increase the surface area available for ETC complexes, maximizing ATP production.</li>',
        '<li>Cristae, the folds of the inner membrane, increase the surface area available for these complexes.</li>'
        + '<li>Respiring bacteria have no mitochondria and run an equivalent chain in their cell membrane.</li>'],
    ],
  },

  // -------------------------------------------------------------- Q48 bio-49
  // The educational points were about photosynthesis, on a glycolysis
  // question. Acetyl-CoA was called a 2-carbon compound, citrate was placed
  // "two metabolic steps" away, and the takeaway said oxygen sends pyruvate
  // into mitochondria, which mature red blood cells cannot do at all.
  48: {
    expectLetter: 'C',
    explanation: [
      ['<tr><td>Payoff (steps 6-10)</td><td>+4 ATP</td><td>2 pyruvate, 2 NADH</td></tr><tr><td><strong>Net</strong></td><td><strong>+2 ATP</strong></td><td><strong>2 pyruvate</strong></td></tr>',
        '<tr><td>Payoff (steps 6-10)</td><td>+4 ATP</td><td>2 pyruvate, 2 NADH</td></tr>'
        + '<tr><td><strong>Net</strong></td><td><strong>+2 ATP</strong></td><td><strong>2 pyruvate, 2 NADH</strong></td></tr>'],
      ['<p><strong>A. Acetyl-CoA:</strong> Acetyl-CoA is a 2-carbon compound (acetyl group attached to coenzyme A) formed <em>after</em> glycolysis,',
        '<p><strong>A. Acetyl-CoA:</strong> Acetyl-CoA carries a two-carbon acetyl group attached to coenzyme A, and is formed <em>after</em> glycolysis,'],
      ['It is two metabolic steps removed from glycolysis. Citrate is the namesake',
        'Citrate is the namesake'],
      ['<p><strong>D. Lactate:</strong> Lactate is a 3-carbon compound produced from pyruvate during anaerobic fermentation (lactic acid fermentation) when oxygen is insufficient - for example, during intense exercise in muscle cells. It is produced by lactate dehydrogenase, converting NADH back to NAD⁺ so glycolysis can continue. Lactate is a fermentation product, not the direct product of glycolysis itself.</p>',
        '<p><strong>D. Lactate:</strong> Lactate is formed from pyruvate in a separate reaction that regenerates NAD⁺, allowing glycolysis to continue. Lactate formation is especially important when oxidative metabolism is limited, but it can also occur when oxygen is available. It is not the direct product of glycolysis itself.</p>'],
      ['<li>Photosynthesis converts light energy to chemical energy in two stages: light reactions (thylakoid membranes) produce ATP and NADPH, and the Calvin cycle (stroma) fixes CO2 into sugar.</li><li>The light reactions involve two photosystems: PSII (splits water, releases O2) and PSI (reduces NADP+ to NADPH).</li><li>C3, C4, and CAM plants have different strategies for carbon fixation adapted to their environments, balancing photosynthesis efficiency against water loss.</li>',
        '<li>Glycolysis runs in the cytosol and needs no oxygen, which is why it works in cells and conditions that cannot use oxygen.</li>'
        + '<li>One glucose yields two pyruvate, two net ATP and two NADH.</li>'
        + '<li>What happens to the pyruvate next depends on the cell: oxidation in mitochondria, or conversion to lactate to regenerate NAD⁺.</li>'],
      ["<p class='exp-key'>Bottom Line: Glycolysis occurs in ALL cells and does NOT require oxygen. With O₂, pyruvate enters mitochondria; without it, fermentation occurs.</p>",
        "<p class='exp-key'>Bottom Line: Glycolysis occurs in the cytosol of virtually all human cells and does not directly require oxygen. Each glucose molecule produces two pyruvate, two net ATP, and two NADH. Pyruvate's subsequent fate depends on the cell and its conditions: mature red blood cells lack mitochondria and convert pyruvate to lactate even when oxygen is available.</p>"],
    ],
  },
  // -------------------------------------------------------------- Q49 bio-50
  // Serum IgA is mainly monomeric, surface IgM is monomeric, and antibody
  // class alone does not date an infection.
  49: {
    expectLetter: 'C',
    explanation: [
      ['<tr><td>IgA</td><td>10-15%</td><td>Secretions (saliva, milk)</td></tr>',
        '<tr><td>IgA</td><td>10-15%</td><td>Secretory IgA is usually dimeric; serum IgA is mainly monomeric</td></tr>'],
      ['<tr><td>IgM</td><td>5-10%</td><td>First produced; pentamer</td></tr>',
        '<tr><td>IgM</td><td>5-10%</td><td>Prominent early; secreted IgM is a pentamer</td></tr>'],
      ['It exists as a dimer joined by a J chain and a secretory component that protects it from degradation.',
        'Secretory IgA is usually a dimer joined by a J chain and a secretory component that protects it from degradation, whereas the IgA circulating in serum is mainly monomeric.'],
      ['<p><strong>D. IgM:</strong> IgM is the largest immunoglobulin (pentamer) and the first antibody class produced during a primary immune response. Its five linked units make it very effective at agglutination and complement activation. IgM is found in blood but at lower concentrations than IgG. Detecting IgM against a pathogen indicates recent or acute infection, while IgG indicates past exposure or chronic infection.</p>',
        '<p><strong>D. IgM:</strong> Secreted IgM is the largest immunoglobulin, a pentamer, and is prominent early in a primary immune response; the IgM on a B cell surface is monomeric. Its five linked units make it very effective at agglutination and complement activation. IgM is found in blood but at lower concentrations than IgG. IgM is often produced early in a primary response, while IgG becomes prominent later and in many secondary responses. Antibody class alone does not reliably determine when an infection occurred; IgG can also reflect vaccination.</p>'],
      ['<li>Innate immunity provides rapid, non-specific defense (physical barriers, phagocytes, complement, inflammation), while adaptive immunity provides specific, slower but more targeted responses.</li><li>Adaptive immunity has two arms: humoral (B cells producing antibodies) and cell-mediated (T cells directly attacking infected/abnormal cells).</li><li>Immunological memory allows faster and stronger responses to previously encountered antigens - this is the basis of vaccination.</li>',
        '<li>IgG dominates the blood serum and is the only class that crosses the placenta.</li>'
        + '<li>IgA guards mucosal surfaces, in saliva, tears, breast milk and the gut and airway linings.</li>'
        + '<li>Secreted IgM appears early in a primary response and is an efficient complement activator.</li>'
        + '<li>IgE is the rarest in serum but drives allergic reactions and helps against parasitic worms.</li>'],
      ["<p class='exp-key'>Bottom Line: IgG is the only class crossing the placenta (passive immunity to fetus). IgM = primary response; IgG = secondary response.</p>",
        "<p class='exp-key'>Bottom Line: IgG is the most abundant immunoglobulin in serum and the only class that crosses the placenta. IgM tends to appear early in a primary response and IgG later, but class alone does not date an infection.</p>"],
    ],
  },

  // -------------------------------------------------------------- Q51 bio-52
  // The explanation already described PTH's action as indirect; the takeaway
  // contradicted it.
  51: {
    expectLetter: 'C',
    explanation: [
      ["<p class='exp-key'>Bottom Line: PTH stimulates osteoclasts; calcitonin inhibits them. Osteoporosis results when resorption exceeds formation.</p>",
        "<p class='exp-key'>Bottom Line: Osteoclasts resorb bone, while osteoblasts build it. PTH can increase resorption indirectly by changing signals from osteoblast-lineage cells to osteoclasts; calcitonin inhibits osteoclast activity.</p>"],
    ],
  },

  // -------------------------------------------------------------- Q52 bio-53
  // The stem needs the systemic circulation named, 120/80 is not a mean
  // pressure, and not all filtered fluid returns at the venous end.
  52: {
    expectLetter: 'C',
    stem: ['Blood pressure is highest in which type of blood vessel?',
      'In the systemic circulation, mean blood pressure is highest in which of the following vessels?'],
    explanation: [
      ['<tr><th>Vessel</th><th>Pressure</th><th>Feature</th></tr><tr><td><strong>Aorta</strong></td><td><strong>120/80 mmHg</strong></td><td><strong>Highest pressure</strong></td></tr>',
        '<tr><th>Vessel</th><th>Illustrative resting pressure</th><th>Feature</th></tr>'
        + '<tr><td><strong>Aorta</strong></td><td><strong>~120/80 mmHg systolic/diastolic</strong></td><td><strong>Highest mean pressure</strong></td></tr>'],
      ['<tr><td>Venae cavae</td><td>0-5 mmHg</td><td>Lowest</td></tr></table>',
        '<tr><td>Venae cavae</td><td>0-5 mmHg</td><td>Lowest</td></tr></table>'
        + '<p>These figures are illustrative resting values, not fixed readings for every vessel or person.</p>'],
      ['<p><strong>B. Capillaries:</strong> Capillary blood pressure is moderate (about 30-35 mmHg at the arteriolar end, dropping to about 15 mmHg at the venular end). This pressure gradient drives fluid out at the arteriolar end (filtration) and allows reabsorption at the venular end. Capillaries are the site of gas, nutrient, and waste exchange, but their pressure is much lower than in large arteries.</p>',
        '<p><strong>B. Capillaries:</strong> Capillary pressure is much lower than pressure in large arteries. Capillaries support exchange with tissues, and lymphatic vessels return much of the filtered fluid to the circulation.</p>'],
      ['<li>The heart functions as a double pump: the right side pumps deoxygenated blood to the lungs (pulmonary circuit), and the left side pumps oxygenated blood to the body (systemic circuit).</li><li>Cardiac output equals heart rate multiplied by stroke volume; it is regulated by the autonomic nervous system, hormones, and intrinsic mechanisms (Frank-Starling law).</li><li>The cardiac conduction system (SA node, AV node, Bundle of His, Purkinje fibers) coordinates rhythmic contraction without external nerve stimulation.</li>',
        '<li>Pressure is highest in the systemic arteries, closest to the pumping left ventricle.</li>'
        + '<li>The largest drop in mean pressure happens across the arterioles, which is what makes them the main resistance vessels.</li>'
        + '<li>Pressure in the veins is low, which is why venous return depends on valves and the skeletal muscle pump.</li>'],
      ["<p class='exp-key'>Bottom Line: BP = cardiac output × peripheral resistance. Greatest pressure drop is across arterioles.</p>",
        "<p class='exp-key'>Bottom Line: Mean arterial pressure is approximately cardiac output × systemic vascular resistance when central venous pressure is small. The greatest pressure drop is across the arterioles.</p>"],
    ],
  },

  // -------------------------------------------------------------- Q53 bio-54
  // Bilirubin is converted to stercobilin before colouring faeces, option C
  // was a copy of option A, and the pancreas secretes protease precursors.
  53: {
    expectLetter: 'B',
    explanation: [
      ['<tr><td>Pancreatic juice</td><td>Pancreas</td><td>Duodenum</td><td>Lipase, trypsin, amylase</td></tr>',
        '<tr><td>Pancreatic juice</td><td>Pancreas</td><td>Duodenum</td><td>Amylase, lipase, and protease precursors such as trypsinogen</td></tr>'],
      ['<p><strong>C. Pancreas produces, gallbladder stores:</strong> The gallbladder stores and concentrates bile produced by the liver, but it does not produce bile itself. When fatty food enters the duodenum, cholecystokinin (CCK) stimulates the gallbladder to contract and release bile.</p>',
        '<p><strong>C. Pancreas produces, gallbladder stores:</strong> The pancreas produces digestive enzymes and bicarbonate, not bile. The liver makes bile, and the gallbladder stores and concentrates it.</p>'],
      ['<li>Digestion involves mechanical breakdown (chewing, peristalsis) and chemical breakdown (enzymes, acid, bile) of food into absorbable molecules.</li><li>The small intestine is the primary site of nutrient absorption - its enormous surface area (villi and microvilli) maximizes absorption efficiency.</li><li>The liver, gallbladder, and pancreas are accessory organs that contribute bile and digestive enzymes to the small intestine.</li>',
        '<li>The liver makes bile continuously; the gallbladder stores and concentrates it between meals.</li>'
        + '<li>Bile salts emulsify fat into small droplets and help form micelles, which increases the surface area lipase can work on.</li>'
        + '<li>Bile is not an enzyme: it prepares fat physically, while enzymes do the chemical breakdown.</li>'],
      ["<p class='exp-key'>Bottom Line: Bile is NOT an enzyme - it physically emulsifies fats. Bilirubin in bile gives feces its brown color.</p>",
        "<p class='exp-key'>Bottom Line: The liver makes bile; the gallbladder stores and concentrates it; bile salts help fat digestion and absorption without acting as enzymes. Bilirubin delivered to the intestine is converted into other pigments, including stercobilin, which contributes to the brown color of feces.</p>"],
    ],
  },
  // -------------------------------------------------------------- Q54 bio-55
  // Not all diabetes insipidus is absent ADH: the nephrogenic form has ADH
  // present and a kidney that cannot respond.
  54: {
    expectLetter: 'D',
    explanation: [
      ['<p>ADH inserts aquaporin-2 channels into the collecting duct, increasing water reabsorption.</p>',
        '<p>ADH causes collecting-duct cells to insert aquaporin-2 water channels into their lumen-facing membrane. Water then moves out of the tubular fluid by osmosis, producing a smaller volume of more concentrated urine.</p>'],
      ['<tr><td>Diabetes insipidus</td><td>Absent</td><td>Up to 20 L/day, very dilute</td></tr>',
        '<tr><td>Central diabetes insipidus</td><td>Insufficient ADH release</td><td>Excess dilute urine</td></tr>'
        + '<tr><td>Nephrogenic diabetes insipidus</td><td>Reduced kidney response despite available ADH</td><td>Excess dilute urine</td></tr>'],
      ['<p><strong>A. Glomerulus:</strong> The glomerulus is the site of blood filtration, not water reabsorption. Blood is filtered through fenestrated capillaries under high hydrostatic pressure, producing a cell-free and protein-free filtrate. ADH does not act on the glomerulus. The glomerular filtration rate is regulated by afferent and efferent arteriole tone, not by ADH.</p>',
        '<p><strong>A. Glomerulus:</strong> The glomerulus filters blood through fenestrated capillaries under high hydrostatic pressure, producing a filtrate that is normally cell-free and very low in protein. It is not the main site where ADH regulates water permeability.</p>'],
    ],
  },

  // -------------------------------------------------------------- Q55 bio-56
  // Stem and option B revised per the owner's instruction: the old option B
  // restated the question. Also removes the implication that every chemical
  // synapse opens postsynaptic sodium channels or is excitatory.
  55: {
    expectLetter: 'B',
    stem: ['What happens immediately after an action potential reaches a presynaptic terminal at a chemical synapse?',
      'After an action potential reaches a presynaptic terminal, which event directly triggers neurotransmitter release from synaptic vesicles?'],
    option: [1, 'Calcium enters the terminal, triggering neurotransmitter release',
      'Calcium enters the presynaptic terminal through voltage-gated calcium channels'],
    explanation: [
      ['<h4>Correct Answer: Calcium enters the terminal, triggering neurotransmitter release</h4><p>Voltage-gated Ca²⁺ channels open, and calcium triggers vesicle exocytosis.</p>',
        '<h4>Correct Answer: Calcium enters the presynaptic terminal through voltage-gated calcium channels</h4>'
        + '<p>Depolarization of the terminal opens voltage-gated Ca²⁺ channels. The calcium that enters causes synaptic vesicles to fuse with the presynaptic membrane, releasing neurotransmitter into the synaptic cleft, where it binds receptors on the postsynaptic cell.</p>'],
      ['<p><strong>A. Sodium channels open in the postsynaptic membrane:</strong> Sodium channels do open in the postsynaptic membrane, but this is a <em>later</em> step - it occurs after neurotransmitter binds to postsynaptic receptors. The sequence is: action potential reaches terminal → Ca²⁺ enters → vesicles fuse and release neurotransmitter → neurotransmitter binds receptors → THEN ion channels (including Na⁺ channels) open postsynaptically.</p>',
        '<p><strong>A. Sodium channels open in the postsynaptic membrane:</strong> Changes in postsynaptic ion-channel activity occur after neurotransmitter release and receptor binding. Depending on the receptor, the response can be excitatory or inhibitory; sodium-channel opening is not universal.</p>'],
      ['The influx of Ca²⁺ ions triggers the SNARE protein machinery (synaptobrevin, syntaxin, SNAP-25) that causes synaptic vesicles to fuse with the presynaptic membrane and release their neurotransmitter contents.',
        'The influx of Ca²⁺ ions is what causes synaptic vesicles to fuse with the presynaptic membrane and release their neurotransmitter contents.'],
      ['<li>The nervous system is divided into the CNS (brain and spinal cord) and PNS (cranial and spinal nerves); the PNS further divides into somatic (voluntary) and autonomic (involuntary) divisions.</li><li>Action potentials propagate along neurons via sequential depolarization; myelination increases conduction speed through saltatory conduction at nodes of Ranvier.</li><li>Neurotransmitters are released at synapses and bind to receptors on postsynaptic cells - excitatory (e.g., glutamate, acetylcholine) or inhibitory (e.g., GABA, glycine).</li>',
        '<li>The sequence is: depolarization &rarr; voltage-gated Ca²⁺ channels open &rarr; Ca²⁺ enters &rarr; vesicles fuse &rarr; neurotransmitter binds postsynaptic receptors.</li>'
        + '<li>Calcium entry is the step that couples the electrical signal to chemical release.</li>'
        + '<li>Whether the postsynaptic cell is excited or inhibited depends on the receptor it carries, not on the transmitter alone.</li>'],
      ["<p class='exp-key'>Bottom Line: Calcium is the key trigger for neurotransmitter release. Removal of Ca²⁺ blocks synaptic transmission entirely.</p>",
        "<p class='exp-key'>Bottom Line: Calcium entry is the usual trigger for action-potential-evoked vesicular neurotransmitter release at a chemical synapse.</p>"],
    ],
  },

  // -------------------------------------------------------------- Q56 bio-57
  // Frontal motor areas do contribute to motor learning, and brainstem
  // structures do contribute to balance.
  56: {
    expectLetter: 'C',
    explanation: [
      ['<p><strong>A. Frontal lobe of cerebral cortex:</strong> The frontal lobe is responsible for higher-order functions including conscious decision-making, planning, personality, and voluntary motor command initiation (via the primary motor cortex in the precentral gyrus). While it initiates voluntary movement, it does not coordinate balance or motor learning - those are cerebellar functions. Damage to the frontal lobe causes personality changes and motor planning deficits, not ataxia.</p>',
        '<p><strong>A. Frontal lobe of cerebral cortex:</strong> Frontal motor areas help plan and initiate voluntary movement and contribute to motor learning. The cerebellum is the best answer for fine-tuning movement, balance, and the learning of coordinated motor skills.</p>'],
      ['<p><strong>D. Medulla oblongata:</strong> The medulla oblongata (part of the brainstem) controls vital autonomic functions: breathing rhythm, heart rate, blood pressure, and reflexes like swallowing, coughing, and vomiting. Damage to the medulla is often fatal. While it processes some motor information as tracts pass through it, it does not coordinate voluntary movement or balance - that is the cerebellum\'s role.</p>',
        '<p><strong>D. Medulla oblongata:</strong> The medulla, part of the brainstem, controls vital autonomic functions: breathing rhythm, heart rate, blood pressure, and reflexes such as swallowing, coughing, and vomiting. Its primary role is autonomic control rather than the coordination of voluntary movement asked about here.</p>'],
      ['<li>The nervous system is divided into the CNS (brain and spinal cord) and PNS (cranial and spinal nerves); the PNS further divides into somatic (voluntary) and autonomic (involuntary) divisions.</li><li>Action potentials propagate along neurons via sequential depolarization; myelination increases conduction speed through saltatory conduction at nodes of Ranvier.</li><li>Neurotransmitters are released at synapses and bind to receptors on postsynaptic cells - excitatory (e.g., glutamate, acetylcholine) or inhibitory (e.g., GABA, glycine).</li>',
        '<li>The cerebellum compares intended movement with incoming sensory information and helps correct errors.</li>'
        + '<li>It supports balance, coordination, and motor learning.</li>'
        + '<li>Damage commonly causes ataxia, meaning poorly coordinated movement, rather than primary loss of muscle strength.</li>'],
    ],
  },

  // -------------------------------------------------------------- Q58 bio-59
  // SUBSTANTIAL REWRITE. The stem skipped maturation, and the explanation
  // made exactly three polar bodies universal. Option C also claimed no
  // normal meiotic process can yield three cells.
  58: {
    expectLetter: 'D',
    stem: ['A primary spermatocyte undergoes meiosis to produce how many functional sperm?',
      'Under normal conditions, one primary spermatocyte can produce how many sperm after meiosis and subsequent maturation?'],
    explanationFull:
      '<h4>Correct Answer: 4</h4>'
      + '<p>One primary spermatocyte undergoes meiosis I to form two secondary spermatocytes. Each undergoes meiosis II, giving four haploid spermatids. These differentiate into sperm; meiosis itself produces spermatids, not fully mature functional sperm.</p>'
      + "<table class='exp-table'><tr><th>Stage</th><th>Spermatogenesis</th><th>Oogenesis</th></tr>"
      + '<tr><td>After meiosis I</td><td>2 secondary spermatocytes</td><td>1 secondary oocyte + 1 polar body</td></tr>'
      + '<tr><td>After meiosis II</td><td>4 spermatids</td><td>1 egg + polar bodies</td></tr>'
      + '<tr><td><strong>Gametes produced</strong></td><td><strong>4</strong></td><td><strong>1</strong></td></tr></table>'
      + '<h4>Why the other choices are wrong:</h4>'
      + '<p><strong>A. 1:</strong> One functional egg per primary oocyte is the usual result of oogenesis. Spermatogenesis normally produces four spermatids that can develop into sperm.</p>'
      + '<p><strong>B. 2:</strong> Two secondary spermatocytes are produced after meiosis I, but each divides again in meiosis II.</p>'
      + '<p><strong>C. 3:</strong> Three is not the normal number of sperm produced from one primary spermatocyte: the divisions give two secondary spermatocytes and then four spermatids.</p>'
      + '<h4>Key Educational Points:</h4><ul>'
      + '<li>Meiosis is two divisions, so one cell becomes two and then four.</li>'
      + '<li>Spermatogenesis divides the cytoplasm evenly, so all four products can become sperm.</li>'
      + '<li>Oogenesis produces one functional egg and polar bodies. The first polar body may or may not divide, so the final number of polar bodies can vary. In humans, the secondary oocyte normally completes meiosis II after fertilization begins.</li>'
      + '</ul>'
      + "<p class='exp-key'>Bottom Line: One primary spermatocyte &rarr; two secondary spermatocytes &rarr; four spermatids &rarr; four sperm after maturation.</p>",
  },

  // -------------------------------------------------------------- Q59 bio-60
  // "Amplifies sound ~20-fold" states a bare multiplication of energy. The
  // ossicles match impedance and raise PRESSURE at the oval window.
  59: {
    expectLetter: 'C',
    stem: ['Which middle ear ossicle directly contacts the oval window of the cochlea?',
      'Which middle-ear ossicle directly contacts the oval window of the inner ear?'],
    explanation: [
      ['<p>The stapes footplate presses against the oval window, transmitting amplified vibrations to cochlear fluid.</p>',
        '<p>The stapes footplate presses against the oval window, transmitting vibrations into the fluid of the inner ear. The difference in area between the large tympanic membrane and the small oval window, together with the leverage of the ossicular chain, increases pressure at the oval window relative to the tympanic membrane and so improves the transfer of sound energy from air into fluid.</p>'],
      ['The three-ossicle chain amplifies sound by approximately 20-fold, partly through leverage and partly through the area ratio between the large eardrum and the small oval window.',
        'The three-ossicle chain increases pressure at the oval window relative to the tympanic membrane, partly through leverage and partly through the area ratio between the large eardrum and the small oval window.'],
      ['<li>The ossicles amplify pressure roughly twentyfold, matching low-impedance air to high-impedance fluid.</li>',
        '<li>The ossicles increase pressure at the oval window, matching low-impedance air to high-impedance fluid.</li>'],
      ["<p class='exp-key'>Bottom Line: The ossicles amplify sound ~20x. The stapes is the smallest bone in the human body.</p>",
        "<p class='exp-key'>Bottom Line: The chain runs malleus &rarr; incus &rarr; stapes, and only the stapes touches the oval window. The ossicles raise pressure at that window rather than creating extra sound energy. The stapes is the smallest bone in the human body.</p>"],
    ],
  },

  // -------------------------------------------------------------- Q60 bio-61
  // The stem asked for a "component" while every option names a process.
  // Ethambutol is not a second mycolic-acid-synthesis inhibitor, and
  // beta-lactams are not simple reversible competitive inhibitors.
  60: {
    expectLetter: 'C',
    stem: ['Which component of the bacterial cell wall is the primary target of penicillin and its derivatives?',
      'Which bacterial cell-wall process is directly inhibited by penicillin and related beta-lactam antibiotics?'],
    explanation: [
      ['<p>Penicillin and other β-lactam antibiotics inhibit transpeptidase (also called penicillin-binding proteins, PBPs), which catalyzes the cross-linking of peptidoglycan chains in the bacterial cell wall. Without proper cross-linking, the cell wall loses structural integrity and the bacterium undergoes osmotic lysis.</p>',
        '<p>Penicillin blocks enzymes that form cross-links between peptidoglycan strands. This weakens the wall of susceptible, actively growing bacteria and can lead to osmotic lysis. The drugs act by covalently inhibiting the transpeptidase activity of penicillin-binding proteins (PBPs).</p>'],
      ['<p><strong>B. Mycolic acid attachment to the arabinogalactan layer:</strong> Mycolic acids are long-chain fatty acids found in the cell walls of mycobacteria (like <em>Mycobacterium tuberculosis</em>), forming a waxy layer that makes these organisms resistant to many antibiotics including penicillin. Drugs targeting mycolic acid synthesis include isoniazid and ethambutol. Penicillin targets the peptidoglycan layer, which is a different cell wall component.</p>',
        '<p><strong>B. Mycolic acid attachment to the arabinogalactan layer:</strong> Mycolic acids form part of the waxy cell wall of mycobacteria. Their synthesis or attachment is not the direct process targeted by penicillin.</p>'],
      ['<li>Bacteria are prokaryotes lacking membrane-bound organelles; they reproduce by binary fission and can exchange genetic material via conjugation, transformation, and transduction.</li><li>The Gram stain distinguishes bacteria by cell wall structure: Gram-positive (thick peptidoglycan, stains purple) vs. Gram-negative (thin peptidoglycan + outer membrane, stains pink).</li><li>Antibiotic resistance spreads rapidly through horizontal gene transfer (plasmids) - a major global health concern.</li>',
        '<li>Peptidoglycan is the mesh that gives a bacterial cell wall its strength and resists osmotic swelling.</li>'
        + '<li>Cross-linking is what turns separate strands into that mesh, so blocking it leaves the wall weak.</li>'
        + '<li>Human cells have no peptidoglycan at all, which is why these drugs can be selective for bacteria.</li>'],
      ["<p class='exp-key'>Bottom Line: β-lactam antibiotics are structural analogs of D-Ala-D-Ala and competitively inhibit transpeptidase, preventing peptidoglycan cross-link formation.</p>",
        "<p class='exp-key'>Bottom Line: β-lactam antibiotics resemble the D-Ala-D-Ala end of the peptidoglycan precursor and covalently inhibit the transpeptidase activity of penicillin-binding proteins, preventing cross-link formation.</p>"],
    ],
  },
};

// ===========================================================================

function fail(msg) { console.error('FAIL ' + msg); process.exitCode = 1; return false; }

function replaceOnce(text, from, to, where) {
  const n = text.split(from).length - 1;
  if (n !== 1) {
    fail(`${where}: anchor matched ${n} times, expected 1\n      ${from.slice(0, 110)}`);
    return null;
  }
  return text.replace(from, to);
}

function main() {
  const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));
  const by = Object.fromEntries(data.biology.map(q => [q.id, q]));
  let ok = true, changed = 0;

  for (const num of Object.keys(EDITS).map(Number).sort((a, b) => a - b)) {
    const spec = EDITS[num];
    const id = ID(num);
    const q = by[id];
    if (!q) { ok = fail(`Q${num} -> ${id} not found`); continue; }

    if (spec.expectLetter && LETTER[q.correct] !== spec.expectLetter) {
      ok = fail(`Q${num} (${id}): key is ${LETTER[q.correct]}, review expects ${spec.expectLetter}`);
      continue;
    }

    if (spec.stem) {
      const t = replaceOnce(q.question, spec.stem[0], spec.stem[1], `Q${num} ${id} stem`);
      if (t === null) { ok = false; continue; }
      q.question = t;
    }
    if (spec.option) {
      const [i, from, to] = spec.option;
      const t = replaceOnce(q.options[i], from, to, `Q${num} ${id} option ${LETTER[i]}`);
      if (t === null) { ok = false; continue; }
      q.options[i] = t;
    }
    if (spec.options) q.options = spec.options.slice();
    if (spec.correct !== undefined) q.correct = spec.correct;
    if (spec.explanationFull) q.explanation = spec.explanationFull;
    if (spec.explanation) {
      let t = q.explanation;
      for (const [from, to] of spec.explanation) {
        const next = replaceOnce(t, from, to, `Q${num} ${id} explanation`);
        if (next === null) { ok = false; t = null; break; }
        t = next;
      }
      if (t === null) continue;
      q.explanation = t;
    }
    changed++;
  }

  const planned = Object.keys(EDITS).length;
  if (!ok) {
    console.error(`\n${changed}/${planned} items applied cleanly; nothing written.`);
    process.exit(1);
  }
  if (DRY) { console.log(`dry run: ${changed}/${planned} items apply cleanly.`); return; }
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2) + '\n');
  console.log(`${changed}/${planned} review items applied; questions.json written.`);
}

main();
