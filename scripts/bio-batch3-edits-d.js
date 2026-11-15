/**
 * Batch 3 review, part D: displayed Q37-Q48 (bio-102 .. bio-115).
 * Includes the fourth and fifth substantial rewrites: Q39 and Q48.
 */
'use strict';

const GENERIC_EVO =
  '<ul><li>Natural selection acts on phenotypic variation within populations - individuals with traits better suited to their environment have higher reproductive success.</li>'
  + '<li>Evidence for evolution comes from multiple independent sources: fossil record, comparative anatomy (homologous structures), molecular biology (DNA/protein comparisons), and biogeography.</li>'
  + '<li>Speciation can occur through geographic isolation (allopatric) or within the same area through ecological or behavioral differences (sympatric).</li></ul>';

const GENERIC_PLANT =
  '<ul><li>Plants alternate between haploid (gametophyte) and diploid (sporophyte) generations; in flowering plants, the sporophyte is dominant.</li>'
  + '<li>Plant transport occurs through xylem (water and minerals, driven by transpiration pull) and phloem (sugars, driven by pressure flow from source to sink).</li>'
  + '<li>Plant hormones (auxins, gibberellins, cytokinins, ethylene, abscisic acid) coordinate growth, development, and responses to environmental stimuli.</li></ul>';

const points = items => '<ul>' + items.map(t => '<li>' + t + '</li>').join('') + '</ul>';

module.exports = [

// ============================================================ Q37 bio-102
// "Non-random sample" implies selection. For drift, the survivors are a small
// RANDOM sample whose composition is unrepresentative.
{
  q: 37, id: 'bio-102', expectLetter: 'A',
  stemFull: 'A population experiences a severe reduction in size due to a natural disaster, in which survival was unrelated to the alleles being considered. The surviving individuals have different allele frequencies than the original population. This is an example of:',
  explanation: [
    ['<p>A population bottleneck occurs when a population\'s size is drastically reduced by a catastrophic event (natural disaster, disease, habitat destruction). The surviving individuals represent a non-random sample of the original gene pool, resulting in changed allele frequencies and reduced genetic diversity. The northern elephant seal and cheetah are examples of species that have undergone historical bottlenecks.</p>',
     '<p>A population bottleneck occurs when a population is drastically reduced in size by a catastrophic event such as a natural disaster, disease or habitat destruction. The survivors are a small chance sample of the original gene pool, and a small sample is easily unrepresentative of the whole. That is how allele frequencies shift and genetic variation is lost.</p>'
     + '<p>The wording matters here. The sampling is random; it is the <em>result</em> that is unrepresentative. Calling the survivors a non-random sample would imply a different mechanism, namely selection acting on the alleles concerned, which the stem rules out. The northern elephant seal and the cheetah are standard examples of species that have passed through historical bottlenecks.</p>'],
    ['<p><strong>B. Balancing selection:</strong> <em>Balancing selection</em> is a different evolutionary concept. The correct answer is <em>A population bottleneck</em>, which matches the specific mechanism or principle described in the question. Understanding the distinction between these evolutionary concepts is important for exam success.</p>',
     '<p><strong>B. Balancing selection:</strong> Balancing selection maintains two or more variants in a population, for example when the heterozygote is the fittest genotype. It preserves variation, which is the opposite of what a bottleneck does.</p>'],
    ['<p><strong>C. Directional selection:</strong> <em>Directional selection</em> is a different evolutionary concept. The correct answer is <em>A population bottleneck</em>, which matches the specific mechanism or principle described in the question. Understanding the distinction between these evolutionary concepts is important for exam success.</p>',
     '<p><strong>C. Directional selection:</strong> Directional selection favours one end of a trait distribution, so the change it produces has a predictable direction and depends on fitness. The stem states that survival was unrelated to the alleles in question, so chance rather than fitness explains the shift.</p>'],
    ['<p><strong>D. The founder effect:</strong> <em>The founder effect</em> is a different evolutionary concept. The correct answer is <em>A population bottleneck</em>, which matches the specific mechanism or principle described in the question. Understanding the distinction between these evolutionary concepts is important for exam success.</p>',
     '<p><strong>D. The founder effect:</strong> The founder effect is the closely related case in which a small group leaves and establishes a new population elsewhere, carrying allele frequencies that differ by chance from the source population. Here the population stays where it is and is cut down in size, which makes it a bottleneck.</p>'],
    [GENERIC_EVO, points([
      'A bottleneck is a sharp reduction in population size. The survivors are a small chance sample, and small samples are easily unrepresentative.',
      'Allele frequencies shift and genetic variation is lost, whether or not the alleles were beneficial.',
      'The founder effect is the related case where a small group starts a new population somewhere else, rather than a population being reduced in place.',
    ])],
  ],
},

// ============================================================ Q38 bio-103
// Some prezygotic barriers act after mating but before fertilization, so
// mating is not the dividing line.
{
  q: 38, id: 'bio-103', expectLetter: 'D',
  stemFull: 'Which category of reproductive isolation acts after fertilization, reducing hybrid survival or fertility?',
  explanation: [
    ['Temporal, behavioral, and mechanical isolation are all prezygotic barriers that prevent mating or fertilization from occurring.</p>',
     'Temporal, behavioural and mechanical isolation are all prezygotic barriers, acting before a zygote exists. Note why the boundary is fertilization rather than mating: some prezygotic barriers act after mating but before fertilization, such as incompatibility between gametes, so mating is not the dividing line.</p>'],
    ['<p><strong>A. Behavioral isolation:</strong> <em>Behavioral isolation</em> is a different evolutionary concept. The correct answer is <em>Postzygotic isolation</em>, which matches the specific mechanism or principle described in the question. Understanding the distinction between these evolutionary concepts is important for exam success.</p>',
     '<p><strong>A. Behavioral isolation:</strong> Behavioural isolation is prezygotic: courtship signals or rituals differ between the species, so individuals do not recognize each other as mates and do not mate at all.</p>'],
    ['<p><strong>B. Temporal isolation:</strong> <em>Temporal isolation</em> is a different evolutionary concept. The correct answer is <em>Postzygotic isolation</em>, which matches the specific mechanism or principle described in the question. Understanding the distinction between these evolutionary concepts is important for exam success.</p>',
     '<p><strong>B. Temporal isolation:</strong> Temporal isolation is also prezygotic: the two species breed at different times of day or in different seasons, so their gametes never have the opportunity to meet.</p>'],
    ['<p><strong>C. Mechanical isolation:</strong> <em>Mechanical isolation</em> is a different evolutionary concept. The correct answer is <em>Postzygotic isolation</em>, which matches the specific mechanism or principle described in the question. Understanding the distinction between these evolutionary concepts is important for exam success.</p>',
     '<p><strong>C. Mechanical isolation:</strong> Mechanical isolation is prezygotic too: the reproductive structures of the two species are incompatible, so mating cannot take place or cannot transfer gametes successfully.</p>'],
    [GENERIC_EVO, points([
      'The dividing line is the zygote: prezygotic barriers act before one forms, postzygotic barriers afterwards.',
      'Fertilization rather than mating is that line, because some prezygotic barriers act after mating but before fertilization.',
      'Postzygotic examples are hybrid inviability, hybrid sterility such as the mule, and hybrid breakdown in later generations.',
    ])],
  ],
},

// ============================================================ Q39 bio-104
// SUBSTANTIAL REWRITE. There is no universally correct "most commonly used"
// molecule for molecular clocks. rRNA genes are useful phylogenetic markers,
// but that does not make them universally ideal clocks with constant rates.
// The learning objective is what a clock actually needs: a calibrated rate.
{
  q: 39, id: 'bio-104', expectLetter: 'C',
  stemFull: 'In addition to comparing DNA sequences, what information is needed to use a molecular clock to estimate when two species shared a common ancestor?',
  optionFull: [
    [0, 'The percentage of genes currently expressed in each species'],
    [1, 'The current population size of each species'],
    [2, 'An estimated rate of sequence change, calibrated using independent timing evidence'],
    [3, 'The proportion of dominant alleles in each species'],
  ],
  explanationFull:
    '<h4>Correct Answer: C) An estimated rate of sequence change, calibrated using independent timing evidence</h4>'
    + '<p>Sequence differences accumulate as two lineages evolve apart. A molecular clock relates those differences to an estimated rate of change in order to infer how long ago the lineages diverged. Counting the differences is only half the problem: without knowing how fast differences accumulate, the count cannot be converted into a time.</p>'
    + '<p>That rate has to come from somewhere independent. Fossil evidence that dates a particular split, or another well-established timing constraint, is used to calibrate it. Rates also differ between genes and between lineages, so the output is an estimate with uncertainty rather than an exact date.</p>'
    + '<h4>Why the other choices are wrong:</h4>'
    + '<p><strong>A. The percentage of genes currently expressed in each species:</strong> Which genes a species expresses now says nothing about the rate at which inherited sequence differences accumulated over evolutionary time. Expression is a property of cells at a moment; the clock depends on changes to the sequence itself.</p>'
    + '<p><strong>B. The current population size of each species:</strong> Present-day population size cannot convert a count of sequence differences into elapsed time. Population size influences some evolutionary processes, but on its own it supplies neither a rate nor a calibration.</p>'
    + '<p><strong>D. The proportion of dominant alleles in each species:</strong> Dominance describes how an allele affects the phenotype of a heterozygote. It is a relationship between alleles within an organism, and it provides no information about how long two lineages have been diverging.</p>'
    + '<h4>Key Educational Points:</h4>'
    + points([
      'A molecular clock needs two things: a measure of sequence difference, and an estimated rate at which that difference accumulates.',
      'The rate must be calibrated against independent timing evidence, such as suitable fossil constraints.',
      'Rates vary between genes and between lineages, so a molecular clock gives an estimate with uncertainty, not an exact date.',
    ])
    + '<p class=\'exp-key\'>Bottom Line: Molecular clocks estimate divergence time from sequence differences and calibrated rates of evolutionary change.</p>',
},

// ============================================================ Q40 bio-106
// Sound item; only the unrelated plant educational points needed replacing.
{
  q: 40, id: 'bio-106', expectLetter: 'C',
  explanation: [
    [GENERIC_PLANT, points([
      'Water is split at photosystem II, by the oxygen-evolving complex: two water molecules give four protons, four electrons and one O₂.',
      'Those electrons replace the ones P680 loses when it absorbs light, and the protons are released into the thylakoid lumen, adding to the gradient.',
      'Despite the names, PSII acts before PSI in linear electron flow; PSI then re-energizes the electrons so they can go on to reduce NADP⁺.',
      'Keep three things separate: transferring electrons, building the proton gradient, and using that gradient to make ATP.',
    ])],
  ],
},

// ============================================================ Q41 bio-107
// ABA is not simply "the opposite of auxin", and acid growth loosens the wall
// rather than dissolving cellulose.
{
  q: 41, id: 'bio-107', expectLetter: 'A',
  explanation: [
    ['It promotes cell elongation by activating proton pumps that acidify the cell wall (acid growth hypothesis), loosening cellulose microfibrils.',
     'It promotes cell elongation by activating proton pumps that acidify the cell-wall region, which loosens the wall so the cell can expand as it takes up water. This is the acid-growth explanation; the wall is loosened rather than dissolved, and the cellulose fibres themselves remain.'],
    ['<p><strong>D. Abscisic acid:</strong> Abscisic acid (ABA) is often called the “stress hormone” of plants. It promotes stomatal closure during drought conditions by triggering ion efflux from guard cells, and it maintains seed dormancy by inhibiting germination. ABA acts antagonistically to gibberellins in many processes. It inhibits rather than promotes growth, making it the opposite of auxin in function.</p>',
     '<p><strong>D. Abscisic acid:</strong> Abscisic acid (ABA) promotes seed dormancy and stomatal closure during water stress, the latter by triggering ion loss from guard cells. It is not simply the opposite of auxin: hormone interactions depend on tissue and context. What matters here is that ABA does not drive the cell elongation or the directional bending the question asks about.</p>'],
    [GENERIC_PLANT, points([
      'Light arriving from one side causes auxin to be redistributed toward the shaded side of the shoot.',
      'The shaded side then elongates more than the lit side, and that unequal growth bends the shoot toward the light.',
      'Gibberellins also promote elongation, but they do not account for the direction of the response. The asymmetry of auxin is what makes phototropism directional.',
      'Acid growth: proton pumping acidifies the wall region and loosens it, allowing the cell to expand.',
    ])],
  ],
},

// ============================================================ Q42 bio-108
// Scope to a typical C4 plant, correct the PEP carboxylase substrate claim,
// and stop teaching unconditional "high" photorespiration in C3.
{
  q: 42, id: 'bio-108', expectLetter: 'C',
  stemFull: 'C4 plants such as maize differ from C3 plants in that they:',
  explanation: [
    ['<tr><td>Photorespiration</td><td>High</td><td>Minimal</td><td>Minimal</td></tr>',
     '<tr><td>Photorespiration</td><td>More pronounced in hot, dry conditions</td><td>Reduced by concentrating CO₂</td><td>Reduced by concentrating CO₂</td></tr>'],
    ['PEP carboxylase has a much higher affinity for CO₂ than RuBisCO and does not react with O₂, effectively concentrating CO₂ around RuBisCO and minimizing photorespiration.</p>',
     'PEP carboxylase uses bicarbonate, which forms from dissolved CO₂, rather than competing with RuBisCO for the same CO₂ substrate, and it does not react with O₂. Its job is the initial capture of inorganic carbon; the CO₂ is then released again next to RuBisCO in the bundle sheath, where concentrating it minimizes photorespiration.</p>'],
    [GENERIC_PLANT, points([
      'C4 plants separate the two steps in space: PEP carboxylase captures inorganic carbon in mesophyll cells, and CO₂ is released again in bundle-sheath cells where RuBisCO and the Calvin cycle operate.',
      'CAM plants separate them in time instead, generally taking up atmospheric CO₂ at night and running the Calvin cycle on the released CO₂ during the day.',
      'Both still use RuBisCO and the Calvin cycle. What they add is a way of concentrating CO₂ around RuBisCO, which reduces photorespiration.',
    ])],
  ],
},

// ============================================================ Q43 bio-109
// Vessel elements and tracheids are not identical open tubes, the tissue is
// not entirely dead, and root pressure is not an equal alternative to
// transpiration pull for lifting water up a tall plant.
{
  q: 43, id: 'bio-109', expectLetter: 'C',
  explanation: [
    ['<p>Xylem is the vascular tissue responsible for the upward transport of water and dissolved minerals from roots to aerial parts of the plant. Xylem vessels and tracheids are dead at maturity with lignified cell walls, forming continuous tubes. Water transport is driven by transpiration pull (cohesion-tension theory), root pressure, and capillary action. Phloem, in contrast, transports organic solutes (mainly sucrose) bidirectionally.</p>',
     '<p>Xylem is the vascular tissue that carries water and dissolved minerals upward from the roots. Its two conducting cell types are not quite the same: vessel elements are joined end to end into continuous tubes, while water passes between tracheids through pits in their walls. Both are dead at maturity, with lignified walls, although the xylem tissue as a whole also contains living cells.</p>'
     + '<p>The main explanation for water reaching the top of a tall plant is transpiration-driven cohesion-tension: evaporation from the leaves pulls a continuous column of water upward. Root pressure and capillarity contribute in some situations, but neither is sufficient on its own to lift water to a tall canopy.</p>'],
    ['<p><strong>D. Phloem:</strong> Phloem, in contrast, transports organic solutes (mainly sucrose) bidirectionally.</p>',
     '<p><strong>D. Phloem:</strong> Phloem transports organic solutes, mainly sucrose, from sources to sinks. Different sieve tubes can carry sap in opposite directions within the same plant, which is what "bidirectional" means here; it does not mean opposite bulk flows inside one tube at once. Phloem does not perform the upward water-and-mineral transport the question asks about.</p>'],
    [GENERIC_PLANT, points([
      'Xylem moves water and dissolved minerals; phloem moves organic solutes, mainly sucrose.',
      'Xylem&rsquo;s conducting cells are dead at maturity, while phloem&rsquo;s sieve elements are alive and depend on companion cells.',
      'Transpiration pull is the main explanation for water reaching a tall canopy; pressure flow from source to sink is what drives phloem transport.',
    ])],
    ['<p class=\'exp-key\'>Bottom Line: Xylem transports water upward using dead cells, while phloem transports sugars bidirectionally using living sieve tube elements and companion cells.</p>',
     '<p class=\'exp-key\'>Bottom Line: Xylem carries water and minerals upward through conducting cells that are dead at maturity, driven mainly by transpiration pull. Phloem carries sugars from source to sink through living sieve elements supported by companion cells.</p>'],
  ],
},

// ============================================================ Q44 bio-110
// G3P is a later product, not the immediate one; the turnover figure needs
// conditions to mean anything; and O2 fixation does not supply useful carbon.
{
  q: 44, id: 'bio-110', expectLetter: 'C',
  optionFull: [[0, 'Glyceraldehyde-3-phosphate (G3P)']],
  headingsGone: ['A. Glyceraldehyde-3-phosphate (G<sub>3</sub>P):'],
  explanation: [
    ['RuBisCO is the most abundant enzyme on Earth but is relatively slow, fixing only about 3 CO₂ molecules per second.</p>',
     'RuBisCO is extremely abundant, but relatively slow as enzymes go, which is part of why plants need so much of it.</p>'],
    ['<p><strong>A. Glyceraldehyde-3-phosphate (G<sub>3</sub>P):</strong> Glyceraldehyde-3-phosphate (G<sub>3</sub>P) is the product of CO₂ fixation, not the substrate. When RuBisCO fixes CO₂ to RuBP, it produces an unstable 6-carbon compound that immediately splits into two molecules of 3-phosphoglycerate (3-PGA), which are then reduced to G<sub>3</sub>P using ATP and NADPH from the light reactions. G<sub>3</sub>P is the key output of the Calvin cycle-some exits to form glucose, while most is recycled to regenerate RuBP.</p>',
     '<p><strong>A. Glyceraldehyde-3-phosphate (G3P):</strong> G3P is a later carbohydrate product of the Calvin cycle, not the molecule CO₂ is attached to. When RuBisCO fixes CO₂ to RuBP, the result is an unstable six-carbon intermediate that immediately splits into two molecules of 3-phosphoglycerate (3-PGA). Those are the immediate stable products, and they are then reduced to G3P using ATP and NADPH from the light reactions. Some G3P leaves the cycle to build carbohydrate, while most is used to regenerate RuBP.</p>'],
    [GENERIC_PLANT, points([
      'RuBP is the five-carbon acceptor, and RuBisCO attaches CO₂ to it.',
      'The immediate stable products are two molecules of 3-phosphoglycerate, formed when an unstable six-carbon intermediate splits.',
      '3-PGA is then reduced to G3P using ATP and NADPH from the light reactions. Some G3P leaves to make carbohydrate; most regenerates RuBP.',
    ])],
    ['<p class=\'exp-key\'>Bottom Line: RuBisCO fixes CO₂ onto RuBP in the Calvin cycle. Its dual carboxylase/oxygenase activity means it can also fix O₂ (photorespiration), reducing photosynthetic efficiency.</p>',
     '<p class=\'exp-key\'>Bottom Line: RuBisCO attaches CO₂ to RuBP in the Calvin cycle. It can also react with O₂ instead, which initiates photorespiration and reduces photosynthetic efficiency.</p>'],
  ],
},

// ============================================================ Q45 bio-111
// "The only gaseous plant hormone" and universal autocatalysis both need
// scoping, and cytokinins are not made only in root tips.
{
  q: 45, id: 'bio-111', expectLetter: 'C',
  explanation: [
    ['<p>Ethylene (C₂H₄) is the only gaseous plant hormone. It promotes fruit ripening by stimulating the production of enzymes that break down cell walls, convert starch to sugars, and degrade chlorophyll.',
     '<p>Ethylene (C₂H₄) is the gaseous hormone among the classical plant hormones. In ethylene-responsive fruits such as bananas and tomatoes it promotes ripening, by stimulating enzymes that break down cell walls, convert starch to sugars and degrade chlorophyll. Not every fruit ripens in the same ethylene-controlled way.'],
    ['They are produced primarily in root tips and transported upward in the xylem.',
     'They are produced in several plant tissues, including roots and shoots, and move through the plant.'],
    [GENERIC_PLANT, points([
      'Ethylene is a gas, which is unusual for a hormone: it can diffuse between neighbouring tissues and even between neighbouring fruits.',
      'It promotes ripening in responsive fruits such as bananas and tomatoes, and it promotes leaf abscission and senescence.',
      'During ripening in such fruits, ethylene production can become autocatalytic, so a small amount leads to more.',
    ])],
    ['<p class=\'exp-key\'>Bottom Line: Ethylene is a simple two-carbon gas that acts as a plant hormone, and its production is autocatalytic - ethylene stimulates more ethylene production, creating a positive feedback loop during fruit ripening.</p>',
     '<p class=\'exp-key\'>Bottom Line: Ethylene is a simple two-carbon gas acting as a plant hormone. During the ripening of fruits such as bananas and tomatoes its production can become autocatalytic, so a little ethylene leads to more. That positive feedback belongs to ripening in such fruits rather than to all ethylene production.</p>'],
  ],
},

// ============================================================ Q46 bio-112
// The Casparian strip is a lignified band, distinct from the suberin lamellae
// also deposited in endodermal cells, and the strip is a barrier rather than
// an ion-selective transporter.
{
  q: 46, id: 'bio-112', expectLetter: 'A',
  explanation: [
    ['<p>The Casparian strip is a band of suberin (a waxy, hydrophobic substance) in the cell walls of endodermal cells. It blocks the apoplastic pathway (movement through cell walls and intercellular spaces), forcing water and dissolved minerals to pass through the cell membrane (symplastic pathway). This allows the plant to selectively control which ions enter the vascular tissue.</p>',
     '<p>The Casparian strip is a localized lignified band in the cell walls of the endodermis. Suberin is also deposited in endodermal cells, as lamellae, but that is a separate feature from the strip itself.</p>'
     + '<p>The strip seals the apoplast, which is the route through cell walls and the spaces between cells, so water and dissolved minerals cannot simply bypass the cells on their way inward. To get past the endodermis they have to cross a plasma membrane and travel through the symplast, the connected cytoplasm of the cells. They need not all cross at exactly the same place, but cross they must. Because membranes carry selective transport proteins, this is what lets the plant control which ions reach the vascular tissue. The strip itself is a barrier, not an ion-selective transporter.</p>'],
    [GENERIC_PLANT, points([
      'The Casparian strip is in the endodermis, the innermost layer of the root cortex.',
      'It blocks the apoplastic route, the path through cell walls and intercellular spaces.',
      'Crossing a plasma membrane therefore becomes unavoidable, and because membranes carry selective transport proteins, the plant controls what enters the vascular tissue.',
      'Apoplast is the cell-wall route; symplast is the connected cytoplasm of the cells.',
    ])],
    ['<p class=\'exp-key\'>Bottom Line: The Casparian strip acts as a selective barrier in the endodermis, ensuring that all minerals entering the xylem must pass through a living cell membrane where transport proteins control uptake.</p>',
     '<p class=\'exp-key\'>Bottom Line: The endodermal Casparian strip blocks apoplastic bypass, making membrane transport essential for controlled entry into the root&rsquo;s vascular tissue.</p>'],
  ],
},

// ============================================================ Q47 bio-114
// The option and Bottom Line conflated the osmotic step with the hydrostatic
// pressure gradient that actually drives bulk flow, and the cotransporter
// does not itself hydrolyse ATP.
{
  q: 47, id: 'bio-114', expectLetter: 'C',
  optionFull: [[2, 'A hydrostatic pressure gradient generated by sugar loading at sources and unloading at sinks']],
  explanation: [
    ['<h4>Correct Answer: C) Osmotic pressure gradient created by sugar loading at source and unloading at sink</h4><p>The pressure-flow (mass flow) hypothesis explains phloem transport. At the source (e.g., mature leaves), sugars are actively loaded into sieve tube elements, lowering the water potential and causing water to enter by osmosis from nearby xylem. At the sink (e.g., roots, fruits), sugars are unloaded, causing water to leave the phloem. This creates a hydrostatic pressure gradient that drives bulk flow from source to sink.</p>',
     '<h4>Correct Answer: C) A hydrostatic pressure gradient generated by sugar loading at sources and unloading at sinks</h4><p>At the source, such as a mature leaf, sugars are loaded into the sieve tube elements, often by active transport, though not all plants load actively. Loading lowers the water potential inside the tube, so water enters by osmosis from the nearby xylem and the pressure inside rises. At the sink, such as a root or a developing fruit, sugars are unloaded and water leaves again, so the pressure there is lower.</p>'
     + '<p>Keep the two steps distinct. Osmotic water entry is what establishes the pressure; the longitudinal bulk flow of sap along the tube is then driven by the resulting hydrostatic pressure difference between source and sink.</p>'],
    ['<p><strong>B. Contractile proteins within sieve tube elements:</strong> Sieve tube elements lack most organelles (including nuclei) at maturity and do not contain contractile proteins. Phloem transport is not driven by a muscular or contractile mechanism. Instead, the pressure-flow hypothesis explains that sugars are actively loaded into sieve tubes at source tissues (like leaves), drawing in water by osmosis and creating a pressure gradient that pushes the solution toward sink tissues.</p>',
     '<p><strong>B. Contractile proteins within sieve tube elements:</strong> Mature sieve tube elements lack most organelles, including the nucleus, and phloem transport is not driven by any muscular or contractile mechanism. What moves the sap is the pressure difference between source and sink.</p>'],
    ['<p><strong>D. Active transport of water into sieve tubes by companion cells:</strong> Companion cells do play a crucial role in phloem transport-they actively load sucrose into sieve tube elements using ATP-dependent H+/sucrose cotransporters. However, they do not actively pump water into sieve tubes. Water enters sieve tubes passively by osmosis, following the solute concentration gradient created by sugar loading. The companion cells provide metabolic support since mature sieve tube elements lack nuclei.</p>',
     '<p><strong>D. Active transport of water into sieve tubes by companion cells:</strong> Companion cells do play a crucial role. In plants that load actively, an ATP-powered proton pump builds a proton gradient across the membrane, and an H⁺/sucrose cotransporter then uses that gradient to bring sucrose in; the cotransporter itself does not hydrolyse ATP, the pump does. Either way, water is not actively pumped into the sieve tubes. It enters passively by osmosis, following the solute gradient that sugar loading creates.</p>'],
    [GENERIC_PLANT, points([
      'Sugar loading at the source lowers the water potential inside the sieve tube, so water enters by osmosis and the pressure rises.',
      'Unloading at the sink reverses this, so the pressure there is lower.',
      'The hydrostatic pressure difference between source and sink is what drives bulk flow along the tube. Water is not pumped in actively.',
    ])],
    ['<p class=\'exp-key\'>Bottom Line: Phloem transport is driven by osmotic pressure differences between source (high sugar, high pressure) and sink (low sugar, low pressure), with water following the sugar gradient.</p>',
     '<p class=\'exp-key\'>Bottom Line: Sugar loading draws water into source phloem by osmosis. The resulting source-to-sink pressure difference drives bulk sap flow.</p>'],
  ],
},

// ============================================================ Q48 bio-115
// SUBSTANTIAL REWRITE. Cryptochromes also regulate photoperiodic flowering,
// so the broad stem plus a categorical dismissal of cryptochrome left A
// insufficiently unique. The red/far-red reversibility test is specific to
// phytochrome and keeps A the single best answer.
{
  q: 48, id: 'bio-115', expectLetter: 'A',
  stemFull: 'A brief red-light pulse during the night alters a plant&rsquo;s flowering response. An immediate far-red pulse reverses the effect. Which photoreceptor explains this red/far-red reversibility?',
  explanationFull:
    '<h4>Correct Answer: A) Phytochrome</h4>'
    + '<p>Phytochrome interconverts between two forms. Pr absorbs red light and is converted to Pfr; Pfr absorbs far-red light and is converted back to Pr. A red pulse therefore pushes the pigment one way and an immediate far-red pulse pushes it back, which is exactly the reversibility described in the stem. No other photoreceptor in the list behaves like this.</p>'
    + '<p>This reversible conversion helps plants sense their light environment and regulate developmental responses, flowering among them. Flowering also depends on the plant&rsquo;s internal clock and on other light signals, so phytochrome is part of the system rather than a single switch set by one ratio at dawn.</p>'
    + '<h4>Why the other choices are wrong:</h4>'
    + '<p><strong>B. Carotenoids:</strong> Carotenoids assist light capture and provide photoprotection, absorbing in the blue and green region and passing energy to chlorophyll. They have no Pr/Pfr switch, so they cannot account for a response that red light causes and far-red light reverses.</p>'
    + '<p><strong>C. Chlorophyll a:</strong> Chlorophyll a captures light energy for photosynthesis and sits in the reaction centres of both photosystems. It absorbs red light, but absorbing light is not the same as switching between two stable forms, so it does not explain the red/far-red reversible developmental response.</p>'
    + '<p><strong>D. Cryptochrome:</strong> Cryptochromes detect blue and UV-A light, and they do influence flowering and circadian responses, so they are a genuine part of photoperiodic control. What they do not do is mediate this particular red/far-red conversion, which is what the stem asks about.</p>'
    + '<h4>Key Educational Points:</h4>'
    + points([
      'Phytochrome exists in two interconvertible forms: red light converts Pr to Pfr, and far-red light converts Pfr back to Pr.',
      'Red/far-red reversibility is the classic signature of phytochrome, and it is what a reversal experiment like this one tests for.',
      'Light sensing works together with the plant&rsquo;s internal clock, so flowering is not decided by a single pigment ratio alone.',
      'Cryptochromes sense blue and UV-A light and also influence flowering, which is why the question specifies red and far-red.',
    ])
    + '<p class=\'exp-key\'>Bottom Line: Red/far-red reversible developmental responses are a classic signature of phytochrome.</p>',
},

];
