/**
 * Biology review batch 9, displayed Q41-Q60
 * (bio-514 .. bio-517, bio-521, bio-523, bio-525 .. bio-527, bio-530 .. bio-536).
 * Q45 (bio-519, osteoblasts), Q46 (bio-520, RANK/RANKL/OPG), Q49 (bio-524,
 * occipital bone) and Q53 (bio-528, conduction) are KEEP UNCHANGED per the
 * review and so are absent from this module by design.
 */
'use strict';

module.exports = [
  // ---- Q41  bio-514  allopatric versus sympatric speciation -------------
  {
    q: 41, id: 'bio-514', expectLetter: 'B',
    explanation: [
      ['Each group evolves independently through mutation, drift, and natural selection until they can no longer interbreed - they have become separate species.',
        'Geographic isolation reduces gene flow and can allow populations to diverge through mutation, drift and natural selection. They may eventually develop reproductive barriers, but geographic separation does not guarantee speciation.'],
      ['<p><strong>D. Whether mutations occur during the process:</strong> Mutations occur in both allopatric and sympatric speciation - they are a fundamental source of genetic variation required for any evolutionary change. Neither mode of speciation can proceed without mutation providing the raw material for divergence.</p>',
        '<p><strong>D. Whether mutations occur during the process:</strong> Mutation supplies new genetic variation over evolutionary time, but it does not distinguish allopatric from sympatric speciation. Divergence can also use variation already present in the ancestral population; a new mutation is not required at every step of every speciation event.</p>'],
      ['<tr><td>Commonality</td><td>Most common mode</td><td>Less common, more in plants</td></tr>', ''],
      ['<tr><td>Example</td><td>Darwin\'s finches (Galapagos)</td><td>Cichlid fish in African lakes; polyploidy in wheat</td></tr>',
        '<tr><td>Example</td><td>Darwin\'s finches (Galapagos)</td><td>Polyploid plant lineages arising alongside their parent populations</td></tr>']
    ],
    keepHeadings: ['<strong>D. Whether mutations occur during the process:</strong>'],
    gone: ['until they can no longer interbreed', 'Most common mode', 'Cichlid fish in African lakes',
      'Neither mode of speciation can proceed without mutation']
  },

  // ---- Q42  bio-515  adaptive radiation ---------------------------------
  {
    q: 42, id: 'bio-515', expectLetter: 'B',
    explanation: [
      ['<p><strong>A. The gradual extinction of all species on an island due to environmental change:</strong> This describes mass extinction, not adaptive radiation. In fact, adaptive radiation often FOLLOWS mass extinction events because the elimination of many species opens ecological niches for the survivors to diversify into.</p>',
        '<p><strong>A. The gradual extinction of all species on an island due to environmental change:</strong> This describes loss of species from an area. Adaptive radiation instead involves diversification of a lineage into multiple species associated with different ecological roles. Radiation often follows a mass extinction, because the loss of many species opens ecological niches.</p>'],
      ['<p><strong>D. The process by which all members of a species become genetically identical:</strong> This describes the loss of genetic diversity (perhaps through a severe bottleneck or strong directional selection), which is the OPPOSITE of diversification. Adaptive radiation increases biodiversity and genetic diversity.</p>',
        '<p><strong>D. The process by which all members of a species become genetically identical:</strong> Genetic uniformity does not describe adaptive radiation. The defining idea is diversification into species with different ecological roles, not production of genetically identical descendants.</p>']
    ],
    keepHeadings: ['<strong>A. The gradual extinction of all species on an island due to environmental change:</strong>',
      '<strong>D. The process by which all members of a species become genetically identical:</strong>'],
    gone: ['This describes mass extinction, not adaptive radiation',
      'perhaps through a severe bottleneck or strong directional selection']
  },

  // ---- Q43  bio-516  inbreeding depression ------------------------------
  {
    q: 43, id: 'bio-516', expectLetter: 'C',
    explanation: [
      ['<li>Inbreeding coefficient (F) measures the probability that two alleles at a locus are identical by descent</li>',
        '<li>The inbreeding coefficient F describes the probability that an individual\'s two alleles at a locus are identical by descent</li>'],
      ['<li>F increases with closer relatedness: siblings (F=0.25), first cousins (F=0.0625)</li>',
        '<li>Under the simple assumption of otherwise unrelated, non-inbred ancestors, offspring of first cousins have an expected F of 1/16, and offspring of a full-sibling mating an expected F of 1/4. These are values for the offspring, not the proportion of alleles shared between the parents</li>'],
      ['<li>The opposite of inbreeding depression is heterosis (hybrid vigor) - increased fitness in hybrids due to increased heterozygosity</li>',
        '<li>Some crosses between genetically different lines show hybrid vigor (heterosis), partly because heterozygosity can mask harmful recessive variants. Such a fitness improvement is not guaranteed for every cross</li>']
    ],
    gone: ['siblings (F=0.25), first cousins (F=0.0625)', 'The opposite of inbreeding depression is heterosis',
      'Inbreeding coefficient (F) measures the probability that two alleles']
  },

  // ---- Q44  bio-517  assortative mating ---------------------------------
  {
    q: 44, id: 'bio-517', expectLetter: 'B',
    explanation: [
      ['<p>Assortative mating is a form of nonrandom mating. In positive assortative mating, individuals tend to choose mates who are phenotypically similar to themselves (e.g., tall people preferring to mate with tall people, or organisms with the same color pattern mating together). In negative assortative mating (disassortative mating), individuals prefer mates who are phenotypically different. Assortative mating changes genotype frequencies (increasing homozygosity in positive assortative mating) without directly changing allele frequencies.</p>',
        '<p>Assortative mating is a form of nonrandom mating. Positive assortative mating favors partners with similar phenotypes, such as taller people pairing with taller partners; negative assortative mating favors dissimilar phenotypes. For genetically influenced traits, these patterns can change genotype frequencies at relevant loci. In a simple model with equal reproductive contributions and no selection, rearranging mating pairs can alter genotype frequencies without changing allele frequencies. In real populations, differences in mating success can also produce selection.</p>'],
      ['<li>Positive assortative mating → increases homozygosity (similar to inbreeding but based on phenotype, not relatedness)</li>',
        '<li>In the simplified model, positive assortative mating can increase homozygosity at loci related to the mating trait; it works through phenotype rather than relatedness</li>'],
      ['<li>Negative assortative mating → increases heterozygosity</li>',
        '<li>Negative assortative mating can correspondingly increase heterozygosity at those same loci</li>'],
      ['<li>Example: humans tend to mate assortatively for height, educational level, and ethnicity</li>',
        '<li>Assortative mating concerns similarity in a trait; inbreeding concerns relatedness. They can overlap but are not the same process</li>'],
      ['<p class=\'exp-key\'>Bottom Line: Assortative mating is nonrandom mating based on phenotypic similarity (positive) or dissimilarity (negative), altering genotype frequencies in the population.</p>',
        '<p class=\'exp-key\'>Bottom Line: Assortative mating is nonrandom pairing by phenotype; its genetic effects depend on the trait and reproductive assumptions.</p>']
    ],
    gone: ['without directly changing allele frequencies', 'educational level, and ethnicity',
      '→ increases heterozygosity', 'similar to inbreeding but based on phenotype']
  },

  // ---- Q47  bio-521  joint classification (stem, options A and B) -------
  {
    q: 47, id: 'bio-521', expectLetter: 'C',
    stemFull: 'A joint permits movement in several planes. Its opposing bone surfaces are covered by articular cartilage and separated by a cavity containing lubricating fluid. How is this joint classified?',
    optionFull: [[0, 'A fibrous joint'], [1, 'A cartilaginous joint']],
    explanation: [
      ['<p>Synovial joints are the most mobile type of joint in the body. They are characterized by a joint cavity filled with synovial fluid, articular cartilage covering the bone ends, and a synovial membrane lining the joint capsule. Examples include the shoulder, hip, and knee joints. They permit movement in multiple planes.</p>',
        '<p>A synovial joint has a joint cavity, articular cartilage and a capsule whose inner lining produces synovial fluid. These joints are functionally classified as diarthroses, meaning freely movable joints. The permitted movements depend on joint shape: ball-and-socket joints such as the shoulder and hip allow movement in several planes, whereas hinge joints mainly allow movement in one plane.</p>'],
      ['<p><strong>A. A fibrous joint (synarthrosis):</strong> Fibrous joints are connected by dense connective tissue and permit little to no movement. Examples include skull sutures and the gomphoses (tooth sockets).</p>',
        '<p><strong>A. A fibrous joint:</strong> Fibrous joints connect bones with fibrous connective tissue and lack a synovial cavity. Their mobility varies: skull sutures are essentially immobile, whereas some syndesmoses allow limited movement. A fibrous joint is therefore not automatically synonymous with a synarthrosis.</p>'],
      ['<p><strong>B. A cartilaginous joint (amphiarthrosis):</strong> Cartilaginous joints are connected by cartilage and allow limited movement. Examples include the pubic symphysis (fibrocartilage) and the epiphyseal plates (hyaline cartilage).</p>',
        '<p><strong>B. A cartilaginous joint:</strong> Cartilaginous joints connect bones through cartilage and lack a synovial cavity. Some are immobile, such as a synchondrosis, while others allow limited movement, such as the pubic symphysis. Structural classification as cartilaginous does not always mean the same degree of movement.</p>'],
      ['<p><strong>D. A suture joint of the skull:</strong> Sutures are a specific type of fibrous joint found only in the skull. They are essentially immovable (synarthrotic) and are connected by short connective tissue fibers.</p>',
        '<p><strong>D. A suture joint of the skull:</strong> Sutures are a specific type of fibrous joint found only in the skull. They have no joint cavity and are essentially immobile, being connected by short connective tissue fibers.</p>'],
      ['<ul><li>Synovial joints = freely movable, have a joint cavity with synovial fluid</li>' +
        '<li>Fibrous = immovable (sutures), Cartilaginous = slightly movable (symphyses)</li>' +
        '</ul>',
        '<ul><li>Structural classification describes the connecting tissue and the presence or absence of a cavity</li>' +
        '<li>Synovial joints have a cavity and are freely movable; their shape determines the directions of movement</li></ul>'],
      ['<p class=\'exp-key\'>Bottom Line: Synovial joints are the most mobile joint type, characterized by a synovial cavity, synovial fluid, and articular cartilage.</p>',
        '<p class=\'exp-key\'>Bottom Line: A fluid-containing joint cavity identifies a synovial joint; the range of movement depends on the synovial-joint subtype.</p>']
    ],
    gone: ['The joint cavity is lined by synovial membrane and contains synovial fluid. This joint is classified as',
      'A fibrous joint (synarthrosis)', 'A cartilaginous joint (amphiarthrosis)',
      'Fibrous = immovable (sutures)', 'the most mobile type of joint in the body']
  },

  // ---- Q48  bio-523  vertebral counts (stem replaced) -------------------
  {
    q: 48, id: 'bio-523', expectLetter: 'A',
    stemFull: 'In a typical human vertebral column, how many cervical, thoracic and lumbar vertebrae are present, respectively?',
    explanation: [
      ['<p><strong>B. 5, 12, 7:</strong> This reverses the cervical and lumbar numbers. All mammals (with very few exceptions) have exactly 7 cervical vertebrae, and the lumbar region has 5 larger vertebrae that bear more weight.</p>',
        '<p><strong>B. 5, 12, 7:</strong> This reverses the usual human cervical and lumbar counts. Humans typically have seven cervical and five lumbar vertebrae. Most mammals also have seven cervical vertebrae, but lumbar counts differ between species.</p>'],
      ['<p><strong>D. 8, 12, 5:</strong> This overestimates the cervical count. Humans consistently have 7 cervical vertebrae, a number conserved across nearly all mammals.</p>',
        '<p><strong>D. 8, 12, 5:</strong> This overestimates the cervical count. Humans typically have 7 cervical vertebrae, a number conserved across nearly all mammals.</p>']
    ],
    keepHeadings: ['<strong>B. 5, 12, 7:</strong>', '<strong>D. 8, 12, 5:</strong>'],
    gone: ['The vertebral column is divided into five regions. From superior to inferior',
      'All mammals (with very few exceptions) have exactly 7 cervical vertebrae', 'Humans consistently have 7 cervical vertebrae']
  },

  // ---- Q50  bio-525  rib classification ---------------------------------
  {
    q: 50, id: 'bio-525', expectLetter: 'B',
    explanation: [
      ['Floating ribs (pairs 11-12) do not attach to the sternum at all and have free anterior ends.</p>',
        'Floating ribs (pairs 11-12) do not attach to the sternum at all and have free anterior ends.</p><p>In the broader classification, all ribs without their own direct sternal attachment are false ribs (8-12); ribs 11-12 are the floating subgroup. This question uses the common three-group scheme.</p>'],
      ['<li>True ribs (1-7): direct sternal attachment; false ribs (8-10): indirect; floating ribs (11-12): no attachment</li>',
        '<li>True ribs (1-7) have their own sternal cartilage connection; ribs 8-10 connect indirectly; floating ribs (11-12) have no anterior sternal attachment</li>']
    ],
    gone: ['floating ribs (11-12): no attachment']
  },

  // ---- Q51  bio-526  osteoporosis ---------------------------------------
  {
    q: 51, id: 'bio-526', expectLetter: 'D',
    explanation: [
      ['<p><strong>B. Failure of chondrocytes to produce cartilage matrix:</strong> This would describe a cartilage disorder (e.g., achondroplasia or osteoarthritis), not a condition of reduced bone mineral density.</p>',
        '<p><strong>B. Failure of chondrocytes to produce cartilage matrix:</strong> Chondrocytes produce and maintain cartilage matrix. A problem in cartilage formation or maintenance would affect cartilage rather than directly explain the imbalance between bone resorption and bone formation in osteoporosis.</p>'],
      ['is not the mechanism of osteoporosis, which involves loss of calcium from bones.',
        'is not the mechanism of osteoporosis, which involves loss of bone tissue and deterioration of bone structure, including its organic matrix, rather than removal of calcium from an otherwise intact matrix.']
    ],
    keepHeadings: ['<strong>B. Failure of chondrocytes to produce cartilage matrix:</strong>'],
    gone: ['achondroplasia', 'loss of calcium from bones']
  },

  // ---- Q52  bio-527  fracture repair (stem replaced) --------------------
  {
    q: 52, id: 'bio-527', expectLetter: 'A',
    stemFull: 'During the usual indirect healing of a long-bone fracture, which sequence correctly describes the main stages of repair?',
    explanation: [
      ['<p>Fracture healing follows a predictable sequence: (1) A fracture hematoma forms from blood leaking from broken vessels. (2) A soft (fibrocartilaginous) callus replaces the hematoma as fibroblasts and chondroblasts produce fibrocartilage. (3) A hard (bony) callus forms as osteoblasts replace the fibrocartilage with woven bone through endochondral ossification. (4) Bone remodeling reshapes the woven bone into compact and spongy bone, restoring the bone\'s original structure.</p>',
        '<p>Bleeding at the fracture produces a hematoma and an inflammatory response. Repair tissue develops into a soft callus, which includes fibrous tissue and cartilage. Bone formation then creates a hard callus containing woven bone; replacement of cartilage occurs through endochondral ossification, while bone can also form directly in other parts of the repair tissue. Remodeling gradually replaces woven bone with organized lamellar bone and reshapes the repaired region. The stages overlap rather than occurring as completely separate events.</p>'],
      ['<p><strong>B. Soft callus, hematoma formation, hard callus, bone remodeling:</strong> The hematoma always forms first, immediately after the fracture, because blood vessels in the bone and periosteum are disrupted. The soft callus develops afterward.</p>',
        '<p><strong>B. Soft callus, hematoma formation, hard callus, bone remodeling:</strong> In the indirect-healing sequence in the question, the hematoma comes first, immediately after the fracture, because blood vessels in the bone and periosteum are disrupted. The soft callus develops afterward.</p>'],
      ['<p><strong>C. Hard callus, soft callus, hematoma formation, bone remodeling:</strong> This reverses the sequence. The soft fibrocartilaginous callus always precedes the hard bony callus, as the cartilage serves as a template for subsequent ossification.</p>',
        '<p><strong>C. Hard callus, soft callus, hematoma formation, bone remodeling:</strong> This reverses the sequence. In the indirect-healing sequence in the question the soft callus precedes the hard callus, and its cartilage serves as a template for subsequent ossification.</p>'],
      ['<p><strong>D. Hematoma formation, hard callus, soft callus, bone remodeling:</strong> The soft callus must form before the hard callus. Osteoblasts replace the fibrocartilage of the soft callus with bone tissue to create the hard callus.</p>',
        '<p><strong>D. Hematoma formation, hard callus, soft callus, bone remodeling:</strong> In the indirect-healing sequence in the question the soft callus forms before the hard callus; bone then replaces the fibrocartilage of the soft callus to create the hard callus.</p>'],
      ['<li>Fracture healing recapitulates endochondral ossification</li>',
        '<li>Indirect fracture healing uses a callus and includes both endochondral and intramembranous bone formation</li>'],
      ['<p class=\'exp-key\'>Bottom Line: Fracture healing follows four stages: hematoma, soft callus, hard callus, remodeling.</p>',
        '<p class=\'exp-key\'>Bottom Line: Indirect fracture healing follows four overlapping stages: hematoma, soft callus, hard callus and remodeling, with woven bone replaced by organized lamellar bone.</p>']
    ],
    keepHeadings: ['<strong>B. Soft callus, hematoma formation, hard callus, bone remodeling:</strong>',
      '<strong>C. Hard callus, soft callus, hematoma formation, bone remodeling:</strong>',
      '<strong>D. Hematoma formation, hard callus, soft callus, bone remodeling:</strong>'],
    gone: ['During fracture healing, a soft callus of fibrocartilage initially forms',
      'reshapes the woven bone into compact and spongy bone', 'The hematoma always forms first',
      'The soft callus must form before the hard callus', 'recapitulates endochondral ossification',
      'Fracture healing follows four stages']
  },

  // ---- Q54  bio-530  ADH -------------------------------------------------
  {
    q: 54, id: 'bio-530', expectLetter: 'A',
    explanation: [
      ['<p><strong>B. Increases sodium reabsorption in the proximal convoluted tubule:</strong> Sodium reabsorption in the PCT is largely constitutive and driven by Na+/K+-ATPase. Aldosterone (not ADH) is the primary hormone that enhances sodium reabsorption, and it acts on the distal nephron.</p>',
        '<p><strong>B. Increases sodium reabsorption in the proximal convoluted tubule:</strong> Proximal sodium reabsorption depends on transport processes supported by the Na+/K+-ATPase and is regulated by several signals. ADH\'s main water-conserving action in this question is to increase collecting-duct water permeability. Aldosterone mainly increases sodium reabsorption in the distal nephron.</p>'],
      ['<li>Without ADH, the collecting duct is impermeable to water, producing dilute urine (as in diabetes insipidus)</li>',
        '<li>Without ADH stimulation, collecting-duct water permeability is low, so less water is reabsorbed and urine can remain dilute. Diabetes insipidus can result from inadequate ADH release or reduced kidney responsiveness to it</li>']
    ],
    keepHeadings: ['<strong>B. Increases sodium reabsorption in the proximal convoluted tubule:</strong>'],
    gone: ['largely constitutive and driven by Na+/K+-ATPase', 'the collecting duct is impermeable to water']
  },

  // ---- Q55  bio-531  high plasma osmolality (stem replaced) -------------
  {
    q: 55, id: 'bio-531', expectLetter: 'B',
    stemFull: 'After losing water without replacing it, an otherwise healthy person has a plasma osmolality of 310 mOsm/kg (normal approximately 275-295 mOsm/kg). Which physiological response would be expected?',
    explanation: [
      ['<p>Elevated plasma osmolarity (hyperosmolarity) is detected by osmoreceptors in the hypothalamus. These neurons shrink due to osmotic water loss, which activates them. This triggers two responses: (1) increased ADH release from the posterior pituitary to promote renal water reabsorption, and (2) stimulation of the thirst center to promote water intake. Both work to dilute the plasma and restore normal osmolarity.</p>',
        '<p>A raised plasma osmolality is detected by osmoreceptors in the hypothalamus. An increased effective concentration of extracellular solutes draws water out of these osmosensitive cells, which activates them. This triggers two responses: (1) increased ADH release from the posterior pituitary to promote renal water reabsorption, and (2) stimulation of the thirst center to promote water intake. Both work to dilute the plasma and restore normal osmolality.</p>'],
      ['<p><strong>A. Decreased ADH secretion and concentrated urine:</strong> Decreased ADH would produce dilute urine, which would further increase plasma osmolarity. The body needs to retain water, so ADH secretion increases, not decreases.</p>',
        '<p><strong>A. Decreased ADH secretion and concentrated urine:</strong> Decreased ADH would produce dilute urine, which would raise plasma osmolality further. The body needs to retain water, so ADH secretion increases rather than decreases.</p>'],
      ['<p><strong>C. Suppression of the RAAS:</strong> The RAAS is suppressed by high blood pressure and high blood volume. Hyperosmolarity, if anything, can be associated with hypovolemia, which would activate (not suppress) the RAAS.</p>',
        '<p><strong>C. Suppression of the RAAS:</strong> RAAS activity depends on factors including renal perfusion, sodium-chloride delivery to the macula densa and sympathetic input. High plasma osmolality alone does not establish that RAAS is suppressed. With sufficient volume loss it may instead be activated.</p>'],
      ['<p><strong>D. Inhibition of hypothalamic osmoreceptors:</strong> Hyperosmolarity stimulates (not inhibits) osmoreceptors. These specialized neurons detect increased osmolarity and trigger the compensatory responses.</p>',
        '<p><strong>D. Inhibition of hypothalamic osmoreceptors:</strong> A raised plasma osmolality stimulates rather than inhibits osmoreceptors. These specialized neurons detect the change and trigger the compensatory responses.</p>'],
      ['<li>Osmoreceptors in the hypothalamus detect changes in plasma osmolarity</li>',
        '<li>Osmoreceptors in the hypothalamus detect changes in plasma osmolality</li>'],
      ['<li>ADH and thirst work together to correct hyperosmolarity</li>',
        '<li>ADH and thirst work together to correct a water deficit</li>'],
      ['<p class=\'exp-key\'>Bottom Line: Elevated plasma osmolarity stimulates hypothalamic osmoreceptors, increasing ADH release and thirst to restore water balance.</p>',
        '<p class=\'exp-key\'>Bottom Line: A raised plasma osmolality stimulates hypothalamic osmoreceptors, increasing ADH release and thirst to restore water balance.</p>']
    ],
    keepHeadings: ['<strong>A. Decreased ADH secretion and concentrated urine:</strong>', '<strong>C. Suppression of the RAAS:</strong>',
      '<strong>D. Inhibition of hypothalamic osmoreceptors:</strong>'],
    gone: ['plasma osmolarity of 310 mOsm/L', 'hyperosmolarity', 'osmolarity', 'These neurons shrink due to osmotic water loss']
  },

  // ---- Q56  bio-532  renin ----------------------------------------------
  {
    q: 56, id: 'bio-532', expectLetter: 'C',
    explanation: [
      ['<p>Renin is an enzyme secreted by juxtaglomerular cells of the kidney in response to low blood pressure, low sodium in the distal tubule, or sympathetic stimulation. Renin cleaves angiotensinogen (a protein produced by the liver and constantly circulating in the blood) to form angiotensin I. Angiotensin I is then converted to angiotensin II by angiotensin-converting enzyme (ACE), primarily in the lungs.</p>',
        '<p>Renin is released by juxtaglomerular cells in response to reduced renal perfusion pressure, reduced sodium-chloride delivery to the macula densa, or sympathetic stimulation. It cleaves circulating angiotensinogen, made by the liver, to form angiotensin I. Angiotensin I is then converted to angiotensin II by angiotensin-converting enzyme (ACE), which is present on vascular endothelium, prominently in the lungs and also in other tissues.</p>'],
      ['ACE is found on the surface of pulmonary endothelial cells. ACE inhibitors (e.g., enalapril) target this step.',
        'ACE is present on vascular endothelium, prominently in the lungs and also in other tissues. ACE inhibitors (e.g., enalapril) target this step.'],
      ['<li>RAAS cascade: Angiotensinogen (renin) Angiotensin I (ACE) Angiotensin II stimulates aldosterone</li>',
        '<li>RAAS cascade: angiotensinogen → (renin) → angiotensin I → (ACE) → angiotensin II; angiotensin II then stimulates aldosterone secretion from the adrenal cortex</li>'],
      ['<li>Renin is the rate-limiting step of the RAAS</li>',
        '<li>Renin-mediated cleavage of angiotensinogen is a key regulated, rate-limiting step of the RAAS</li>']
    ],
    gone: ['low sodium in the distal tubule', 'primarily in the lungs',
      'found on the surface of pulmonary endothelial cells', 'Renin is the rate-limiting step']
  },

  // ---- Q57  bio-533  nitrogenous waste (option D renamed) ---------------
  {
    q: 57, id: 'bio-533', expectLetter: 'D',
    optionFull: [[3, 'Birds and many terrestrial reptiles excrete mainly uric acid']],
    explanation: [
      ['<h4>Correct Answer: Birds and reptiles excrete uric acid as their primary nitrogenous waste</h4>',
        '<h4>Correct Answer: Birds and many terrestrial reptiles excrete mainly uric acid</h4>'],
      ['<p>Birds and reptiles are uricotelic organisms, meaning they excrete nitrogenous waste primarily as uric acid.',
        '<p>Birds and many terrestrial reptiles are uricotelic, excreting nitrogenous waste mainly as uric acid.'],
      ['<p><strong>A. Freshwater fish excrete uric acid:</strong> Freshwater fish are ammonotelic, excreting ammonia (NH3) directly into the surrounding water. Ammonia is highly toxic but very water-soluble, and fish can continuously dilute and excrete it through their gills.</p>',
        '<p><strong>A. Freshwater fish excrete uric acid:</strong> Most freshwater bony fish excrete much of their nitrogenous waste as ammonia across the gills. Ammonia is highly toxic but very water-soluble, so it can be continuously diluted and lost to the surrounding water.</p>'],
      ['<p><strong>C. Mammals excrete ammonia:</strong> Mammals convert ammonia to urea in the liver via the urea cycle. Direct ammonia excretion would be toxic at mammalian metabolic rates without constant dilution.</p>',
        '<p><strong>C. Mammals excrete ammonia:</strong> Mammals dispose of most waste nitrogen as urea, formed in the liver. They also excrete ammonium through the kidneys, particularly in acid-base regulation, so this is a comparison of the main nitrogenous product rather than a claim that mammals never excrete ammonia-derived nitrogen.</p>'],
      ['<li>Ammonotelic (ammonia): fish, aquatic invertebrates; Ureotelic (urea): mammals, amphibians; Uricotelic (uric acid): birds, reptiles, insects</li>',
        '<li>Typical patterns: ammonia in many aquatic invertebrates and most bony fish; urea in mammals and many adult amphibians; uric acid in birds and many terrestrial reptiles and insects</li>'],
      ['<li>Water availability drives the evolution of nitrogenous waste form</li>',
        '<li>Water availability helps explain these patterns, together with other adaptations such as development inside an egg</li>'],
      ['<p class=\'exp-key\'>Bottom Line: Birds and reptiles excrete uric acid, mammals excrete urea, and aquatic animals excrete ammonia, reflecting adaptation to water availability.</p>',
        '<p class=\'exp-key\'>Bottom Line: The main nitrogenous waste varies with the animal and its biology: mammals mainly use urea, birds mainly uric acid, and many aquatic animals mainly ammonia.</p>']
    ],
    keepHeadings: ['<strong>A. Freshwater fish excrete uric acid:</strong>', '<strong>B. Birds excrete urea:</strong>',
      '<strong>C. Mammals excrete ammonia:</strong>'],
    gone: ['Birds and reptiles excrete uric acid as their primary nitrogenous waste',
      'Freshwater fish are ammonotelic', 'Ammonotelic (ammonia): fish, aquatic invertebrates',
      'Water availability drives the evolution']
  },

  // ---- Q58  bio-534  fever mediator (stem and option C) -----------------
  {
    q: 58, id: 'bio-534', expectLetter: 'C',
    stemFull: 'During a bacterial infection, inflammatory cytokines stimulate production of which molecule that directly raises the hypothalamic temperature set point?',
    optionFull: [[2, 'Prostaglandin E2 (PGE2)']],
    explanation: [
      ['<h4>Correct Answer: Interleukin-1 (IL-1) and prostaglandin E2 (PGE2)</h4>',
        '<h4>Correct Answer: Prostaglandin E2 (PGE2)</h4>'],
      ['<p>During infection, activated macrophages release endogenous pyrogens, notably interleukin-1 (IL-1), interleukin-6 (IL-6), and tumor necrosis factor (TNF). These cytokines travel to the hypothalamus and stimulate the production of prostaglandin E2 (PGE2) by the vascular endothelium. PGE2 acts on the preoptic area of the hypothalamus to raise the thermoregulatory set point, resulting in fever. This is why NSAIDs (which inhibit prostaglandin synthesis) reduce fever.</p>',
        '<p>During infection, immune cells release cytokines such as IL-1 and IL-6. These signals stimulate prostaglandin E2 production, importantly in endothelial cells of brain blood vessels. PGE2 then acts on thermoregulatory neurons in the hypothalamus, raising the temperature set point. The body responds by conserving and generating heat until it approaches that higher set point. NSAIDs reduce fever by inhibiting prostaglandin synthesis.</p>'],
      ['but it is not the primary mediator of the febrile response.',
        'but it is not the mediator that directly raises the hypothalamic temperature set point.'],
      ['<p><strong>D. Aldosterone:</strong> Aldosterone is a mineralocorticoid from the adrenal cortex that regulates sodium and potassium balance. It has no role in thermoregulation or fever.</p>',
        '<p><strong>D. Aldosterone:</strong> Aldosterone regulates sodium and potassium balance; it is not the direct mediator that raises the hypothalamic set point in fever.</p>'],
      ['<ul><li>Exogenous pyrogens (e.g., bacterial LPS) stimulate macrophages to release endogenous pyrogens (IL-1, IL-6, TNF)</li>' +
        '<li>PGE2 is the final mediator acting on the hypothalamus; NSAIDs reduce fever by blocking PGE2 synthesis</li>' +
        '</ul>',
        '<ul><li>Infection can stimulate immune cells to release pyrogenic cytokines, including IL-1 and IL-6</li>' +
        '<li>PGE2 is a downstream mediator acting on hypothalamic thermoregulatory neurons; reducing its synthesis helps lower fever</li></ul>'],
      ['<p class=\'exp-key\'>Bottom Line: Fever is mediated by macrophage-derived cytokines (IL-1) that stimulate PGE2 production in the hypothalamus, raising the temperature set point.</p>',
        '<p class=\'exp-key\'>Bottom Line: Inflammatory cytokines promote PGE2 production, and PGE2 raises the hypothalamic temperature set point.</p>']
    ],
    keepHeadings: ['<strong>A. Histamine:</strong>', '<strong>B. Epinephrine:</strong>', '<strong>D. Aldosterone:</strong>'],
    gone: ['Which molecule, released by macrophages, acts on the hypothalamic thermoregulatory center',
      'Interleukin-1 (IL-1) and prostaglandin E2 (PGE2)', 'It has no role in thermoregulation or fever',
      'Exogenous pyrogens (e.g., bacterial LPS)', 'PGE2 is the final mediator']
  },

  // ---- Q59  bio-535  countercurrent multiplier --------------------------
  {
    q: 59, id: 'bio-535', expectLetter: 'B',
    explanation: [
      ['<p>The thick ascending limb actively pumps NaCl (via the Na-K-2Cl cotransporter, NKCC2) out of the tubular fluid into the medullary interstitium. Crucially, this segment is impermeable to water, so salt leaves but water cannot follow. This active transport creates the hyperosmotic medullary gradient that drives water reabsorption from the collecting duct when ADH is present.</p>',
        '<p>The thick ascending limb reabsorbs NaCl while remaining largely impermeable to water. NKCC2 carries sodium, potassium and chloride from the tubular fluid into the cell. The basolateral Na+/K+-ATPase maintains the sodium gradient and moves sodium toward the interstitial side; chloride leaves through basolateral pathways. Because water does not follow across this segment, the tubular fluid becomes more dilute and the medullary interstitium becomes more concentrated. This helps create the gradient used for collecting-duct water reabsorption when ADH is present. Urea also contributes to the medullary gradient, especially in the inner medulla.</p>'],
      ['<p><strong>A. The descending limb of the loop of Henle:</strong> The thin descending limb is permeable to water but impermeable to solutes. Water moves out passively by osmosis into the hyperosmotic medulla, concentrating the tubular fluid. It does not actively transport NaCl.</p>',
        '<p><strong>A. The descending limb of the loop of Henle:</strong> The thin descending limb permits substantial passive water movement in the standard countercurrent model. Water can leave into the concentrated medulla, concentrating the tubular fluid. It does not provide the active NaCl reabsorption characteristic of the thick ascending limb. Its permeability varies along the loop and it should not be described as impermeable to every solute.</p>'],
      ['but this occurs iso-osmotically (water follows solute) and does not contribute to the medullary concentration gradient.',
        'but this is largely iso-osmotic (water follows solute) and does not generate the medullary gradient by the countercurrent-multiplier mechanism.'],
      ['<li>Thick ascending limb: active NaCl transport, water-impermeable (diluting segment)</li>',
        '<li>Thick ascending limb: active NaCl reabsorption with very low water permeability (the diluting segment)</li>'],
      ['<li>Descending limb: water-permeable, solute-impermeable (concentrating segment)</li>',
        '<li>Descending limb: important for passive water movement; thick ascending limb: active NaCl reabsorption with very low water permeability</li>'],
      ['<p class=\'exp-key\'>Bottom Line: The thick ascending limb of the loop of Henle actively transports NaCl while being water-impermeable, creating the medullary osmotic gradient essential for urine concentration.</p>',
        '<p class=\'exp-key\'>Bottom Line: The thick ascending limb reabsorbs NaCl without water, helping build the medullary gradient needed to concentrate urine.</p>']
    ],
    keepHeadings: ['<strong>A. The descending limb of the loop of Henle:</strong>', '<strong>C. The proximal convoluted tubule:</strong>',
      '<strong>D. The glomerular capsule:</strong>'],
    gone: ['actively pumps NaCl (via the Na-K-2Cl cotransporter, NKCC2) out of the tubular fluid into the medullary interstitium',
      'permeable to water but impermeable to solutes', 'does not contribute to the medullary concentration gradient',
      'while being water-impermeable', 'solute-impermeable (concentrating segment)']
  },

  // ---- Q60  bio-536  hypertonic dehydration -----------------------------
  {
    q: 60, id: 'bio-536', expectLetter: 'C',
    explanation: [
      ['The elevated hematocrit indicates hemoconcentration from fluid loss.',
        'The elevated hematocrit supports hemoconcentration in this context.'],
      ['<p><strong>B. Metabolic alkalosis:</strong> Metabolic alkalosis is an acid-base disorder characterized by elevated blood pH and bicarbonate. While it can be associated with dehydration (e.g., from vomiting), it is not primarily characterized by the volume-depletion findings described here.</p>',
        '<p><strong>B. Metabolic alkalosis:</strong> Metabolic alkalosis is defined by an acid-base disturbance, usually an increased bicarbonate concentration and raised blood pH. It can coexist with volume depletion, but those acid-base findings are not supplied here. The raised plasma concentration together with water-loss signs is better explained by hypertonic dehydration.</p>'],
      ['<li>Dehydration causes hemoconcentration (elevated hematocrit) and hyperosmolarity</li>',
        '<li>Hypertonic dehydration involves proportionally greater loss of water than salt. Plasma concentration rises, and hematocrit may rise when plasma volume falls</li>']
    ],
    keepHeadings: ['<strong>B. Metabolic alkalosis:</strong>'],
    gone: ['indicates hemoconcentration from fluid loss', 'Dehydration causes hemoconcentration (elevated hematocrit)',
      'it is not primarily characterized by the volume-depletion findings']
  }
];
