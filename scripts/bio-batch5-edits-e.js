/**
 * Batch 5 review, part E: displayed Q47-Q60
 * (bio-239 .. bio-242, bio-244 .. bio-250, bio-255, bio-256).
 * Includes the Q49 and Q55 substantial repairs and the Q57 major rewrite.
 * Q58 (bio-251, peroxisomes) needs no change and is absent by design.
 * The generic embryology block covers Q47-Q49; Q50 onward are individual.
 */
'use strict';

const GENERIC_EMBRYO =
  '<ul><li>Human embryonic development proceeds through cleavage, gastrulation (three germ layer formation), neurulation, and organogenesis.</li>'
  + '<li>Gastrulation establishes the three primary germ layers (ectoderm, mesoderm, endoderm) that give rise to all tissues and organs.</li>'
  + '<li>Spermatogenesis produces four functional sperm from each primary spermatocyte; oogenesis produces one functional egg plus polar bodies from each primary oocyte.</li></ul>';

const points = items => '<ul>' + items.map(t => '<li>' + t + '</li>').join('') + '</ul>';

module.exports = [

// Q47 bio-239: low-level pituitary hCG production is documented and hCG can
// arise in other contexts, so "exclusively", "uniquely" and "specific to
// pregnancy" all overstate the case. Option A held a copied sentence.
{
  q: 47, id: 'bio-239', expectLetter: 'C',
  stemFull: 'During a normal early pregnancy, which structure is the main source of hCG detected in maternal blood or urine?',
  explanation: [
    ['hCG levels peak at approximately 8–10 weeks of gestation, after which the placenta takes over progesterone production. hCG in maternal blood and urine is the basis of pregnancy tests.</p>',
     'hCG levels peak around 8 to 10 gestational weeks, and during the first trimester the placenta takes over progesterone production. hCG in maternal blood and urine is the basis of pregnancy tests.</p>'],
    ['<p><strong>A. Corpus luteum:</strong> Its primary function is to maintain the corpus luteum (which would otherwise degenerate), ensuring continued progesterone production to sustain the endometrium during early pregnancy.</p>',
     '<p><strong>A. Corpus luteum:</strong> The corpus luteum produces progesterone and estrogen. It responds to hCG from the developing trophoblast; it is not the principal source of pregnancy-associated hCG.</p>'],
    ['While hCG is structurally similar to LH (sharing the same alpha subunit), it is not produced by the pituitary. It is produced exclusively by the trophoblast of the developing embryo. This distinction is clinically important because hCG detection in blood or urine is specific to pregnancy.</p>',
     'hCG is structurally similar to LH, sharing the same alpha subunit, and the anterior pituitary is not the main source of hCG in normal early pregnancy. That role belongs to the syncytiotrophoblast.</p>'],
    ['The hypothalamus does not produce hCG; this hormone is uniquely produced by embryonic trophoblast tissue.</p>',
     'The hypothalamus does not produce hCG; in normal early pregnancy the syncytiotrophoblast is the main source.</p>'],
    [GENERIC_EMBRYO, points([
      'Syncytiotrophoblast is the main source of hCG during normal early pregnancy.',
      'hCG maintains luteal progesterone production until placental hormone production is sufficient.',
      'Pregnancy tests detect hCG, but detecting hCG is not, in every possible context, proof of a normal pregnancy.',
    ])],
  ],
},

// Q48 bio-240: scope the item to established natural menopause rather than
// the fluctuating transition, drop the FSH > 40 diagnostic rule, and describe
// the loss of functioning follicles rather than absent granulosa cells.
{
  q: 48, id: 'bio-240', expectLetter: 'B',
  stemFull: 'Which of the following hormonal changes characterizes established natural menopause?',
  explanation: [
    ['FSH levels rise particularly high because of the additional loss of inhibin (normally produced by granulosa cells).',
     'FSH rises particularly high because loss of functioning ovarian follicles reduces inhibin production as well as estrogen.'],
    ['FSH and LH increase (not decrease) because the depleted ovaries can no longer produce enough estrogen and inhibin to suppress pituitary gonadotropin release. Elevated FSH (often >40 IU/L) is actually used as a laboratory marker to confirm menopause.</p>',
     'FSH and LH increase, not decrease, because the depleted ovaries can no longer produce enough estrogen and inhibin to restrain pituitary gonadotropin release. The FSH rise is usually the more pronounced of the two.</p>'],
    ['FSH rises because the granulosa cells that normally produce inhibin (a direct suppressor of FSH) are no longer present. The loss of both estrogen negative feedback and inhibin leads to markedly elevated FSH levels, which is one of the earliest hormonal changes of the menopausal transition.</p>',
     'FSH rises because the loss of functioning ovarian follicles reduces inhibin production, and inhibin is a direct suppressor of FSH. Losing both estrogen negative feedback and inhibin leads to markedly elevated FSH, one of the earliest hormonal changes of the menopausal transition.</p>'],
    [GENERIC_EMBRYO, points([
      'Declining ovarian follicular function reduces estrogen and inhibin feedback.',
      'The anterior pituitary consequently releases more FSH and LH, with the FSH rise usually more pronounced.',
      'Established natural menopause also lacks normal cyclic ovulation and corpus-luteum progesterone production.',
    ])],
  ],
},

// Q49 bio-241: SUBSTANTIAL REPAIR. The enzymes help sperm pass through
// extracellular material rather than digesting the corona radiata cells, the
// reaction is not strictly ZP3- and zona-contact-only, and option A taught
// that mitochondria universally supply the predominant energy for human
// sperm motility.
{
  q: 49, id: 'bio-241', expectLetter: 'B',
  optionFull: [[1, 'Help sperm penetrate the extracellular material surrounding the oocyte']],
  headingsGone: ['B. Digest the corona radiata and zona pellucida of the oocyte to allow penetration:'],
  explanationFull:
    '<h4>Correct Answer: B) Help sperm penetrate the extracellular material surrounding the oocyte</h4>'
    + '<p>The acrosome is a cap-like organelle over the sperm head, containing hydrolytic enzymes such as hyaluronidase and acrosin. The acrosome reaction releases these enzymes and changes the sperm\'s surface, helping it pass through the material surrounding the oocyte and prepare for fertilization. Sperm movement also contributes to penetration. After fertilization, changes triggered by the oocyte\'s cortical reaction help prevent polyspermy.</p>'
    + '<h4>Why the other choices are wrong:</h4>'
    + '<p><strong>A. Provide energy for sperm motility:</strong> Sperm generate ATP through both glycolysis and mitochondrial oxidative phosphorylation, and the relative contribution varies. Either way, the acrosome is a store of hydrolytic enzymes at the head, not the cell\'s ATP-generating machinery.</p>'
    + '<p><strong>C. Trigger the second meiotic division of the sperm cell:</strong> Sperm complete their second meiotic division during spermatogenesis in the testes, well before the acrosome reaction. By the time a sperm reaches the oocyte it is already a mature haploid cell. It is the oocyte that completes its second meiotic division upon fertilization.</p>'
    + '<p><strong>D. Stimulate uterine contractions to aid sperm transport:</strong> Promoting uterine contraction is not a function of acrosomal enzymes. Contractions that aid sperm transport are promoted by prostaglandins in seminal fluid and by oxytocin.</p>'
    + '<h4>Key Educational Points:</h4>'
    + points([
      'The acrosome reaction releases enzymes and changes sperm membranes in preparation for fertilization.',
      'These changes, together with motility, help sperm traverse material surrounding the oocyte.',
      'The sperm\'s acrosome reaction and the oocyte\'s cortical reaction are different; the latter helps block polyspermy.',
    ])
    + '<p class=\'exp-key\'>Bottom Line: The acrosome reaction prepares the sperm and helps it traverse the material surrounding the oocyte; the cortical reaction helps block polyspermy.</p>',
},

// Q50 bio-242: "all humans have approximately the same number of melanocytes"
// needs scoping to comparable body sites, and option A held a copied
// sentence from the main explanation.
{
  q: 50, id: 'bio-242', expectLetter: 'B',
  explanation: [
    ['All humans have approximately the same number of melanocytes; differences in skin color are due to the amount, type (eumelanin vs. pheomelanin), and distribution of melanin produced.</p>',
     'At comparable body sites, people with different skin pigmentation generally have similar melanocyte densities. Pigmentation differences mainly reflect melanin production, type (eumelanin versus pheomelanin), packaging, and distribution.</p>'],
    ['<p><strong>A. Keratinocytes:</strong> The melanosomes are then transferred to surrounding keratinocytes, where melanin forms a protective cap over the nucleus to shield DNA from ultraviolet radiation damage.</p>',
     '<p><strong>A. Keratinocytes:</strong> Keratinocytes are the main structural cells of the epidermis and receive melanosomes from melanocytes, but they do not synthesize melanin themselves.</p>'],
    ['<li>All humans have roughly the same number of melanocytes; skin colour reflects the amount, type, and distribution of melanin.</li>',
     '<li>At comparable body sites, melanocyte densities are generally similar across different skin pigmentations; skin colour reflects melanin production, type, packaging, and distribution.</li>'],
  ],
},

// Q51 bio-244: vitamin C is a cofactor for the hydroxylases, not for the
// copper-dependent extracellular lysyl oxidase that forms cross-links;
// humans retain a nonfunctional GULO gene remnant; vitamin K is needed for a
// post-translational modification of clotting factors.
{
  q: 51, id: 'bio-244', expectLetter: 'C',
  explanation: [
    ['<p>Vitamin C is an essential cofactor for prolyl hydroxylase and lysyl hydroxylase, enzymes required for the post-translational modification and proper cross-linking of collagen. Without adequate vitamin C, collagen synthesis is defective,',
     '<p>Vitamin C supports proline and lysine hydroxylation during collagen synthesis, helping collagen develop its normal structure and strength. Without adequate vitamin C, collagen synthesis is defective,'],
    ['<p><strong>D. Vitamin K:</strong> Vitamin K is required for the hepatic synthesis of clotting factors II, VII, IX, and X (all gamma-carboxylated by a vitamin K-dependent carboxylase). Deficiency causes bleeding disorders due to impaired coagulation, but the bleeding pattern differs from scurvy. Vitamin K deficiency causes deep bleeding and prolonged PT/INR, while scurvy causes mucosal and skin bleeding from fragile capillaries.</p>',
     '<p><strong>D. Vitamin K:</strong> Vitamin K is needed for a post-translational modification, gamma-carboxylation, that allows clotting factors II, VII, IX and X to function normally. Its deficiency therefore impairs coagulation, whereas scurvy produces defective connective tissue with fragile capillaries. Bleeding can occur in both, so the underlying defect rather than the bleeding pattern alone is the distinction being tested.</p>'],
    ['<li>Without hydroxylation, collagen triple helices cannot cross-link properly and the resulting fibres are unstable.</li>',
     '<li>Without hydroxylation the collagen triple helix is unstable; hydroxylation and the later copper-dependent cross-linking step are related but separate.</li>'],
    ['<li>Humans cannot synthesise ascorbate, having lost the gulonolactone oxidase gene, so it must come from the diet.</li>',
     '<li>Humans cannot synthesise ascorbate because they lack functional gulonolactone oxidase, so it must come from the diet.</li>'],
  ],
},

// Q52 bio-245: Merkel cells are in the basal layer but are not mitotically
// active, and layer counts and turnover times vary by site and age.
{
  q: 52, id: 'bio-245', expectLetter: 'D',
  explanation: [
    ['consisting of 20–30 layers of dead, flat, anucleate keratinocytes',
     'consisting of approximately 20 to 30 layers, varying with body site, of dead, flat, anucleate keratinocytes'],
    ['The entire epidermis is renewed approximately every 28–40 days.</p>',
     'The entire epidermis is renewed roughly every 28 to 40 days, varying with body site and age.</p>'],
    ['It also houses melanocytes and Merkel cells. These cells are very much alive and mitotically active, unlike the dead cells of the stratum corneum.</p>',
     'It also houses melanocytes and Merkel cells. The basal layer contains living cells, including proliferating basal keratinocytes that replenish the epidermis, unlike the dead cells of the stratum corneum.</p>'],
    ['<li>Complete epidermal turnover takes roughly 28 to 40 days; accelerating it dramatically is what produces the scale of psoriasis.</li>',
     '<li>Complete epidermal turnover takes roughly 28 to 40 days, varying with body site and age; accelerating it dramatically is what produces the scale of psoriasis.</li>'],
  ],
},

// Q53 bio-246: megaloblasts are marrow precursors while macrocytes are
// circulating cells, benzene is a toxin rather than a drug, and folate
// deficiency is not entirely without neurological effect.
{
  q: 53, id: 'bio-246', expectLetter: 'B',
  explanation: [
    ['The cells grow larger without dividing properly, producing abnormally large red blood cells (megaloblasts/macrocytes).',
     'Nuclear maturation lags behind cytoplasmic growth, so the marrow contains abnormal enlarged nucleated precursors (megaloblasts) and the circulating red cells are enlarged (macrocytes).'],
    ['Causes include autoimmune destruction of hematopoietic stem cells, radiation, certain drugs (chloramphenicol, benzene), or viral infections. It is unrelated to vitamin B12 levels.</p>',
     'Causes include autoimmune destruction of hematopoietic stem cells, radiation, certain drugs such as chloramphenicol, toxins such as benzene, or viral infections. That is marrow failure, which is distinct from the ineffective blood-cell production of B12 deficiency.</p>'],
    ['<li>Folate deficiency produces an identical anaemia but no neurological damage - which is why folate alone can mask B12 deficiency while the neurology progresses.</li>',
     '<li>Folate deficiency also causes megaloblastic anaemia, but does not typically cause the characteristic spinal-cord syndrome of B12 deficiency. Folate alone can improve the anaemia while untreated B12-related neurological injury progresses.</li>'],
  ],
},

// Q54 bio-247: increased skin blood flow favours radiative and convective
// loss only when the environment is cooler than the skin.
{
  q: 54, id: 'bio-247', expectLetter: 'B',
  explanation: [
    ['increasing blood flow to the skin surface and facilitating heat loss by radiation and convection.',
     'increasing blood flow to the skin surface, which favours heat loss by radiation and convection when the environment is cooler than the skin.'],
    ['<li>Vasodilation brings warm blood to the surface, increasing loss by radiation and convection.</li>',
     '<li>Vasodilation brings warm blood to the surface, increasing loss by radiation and convection when the surroundings are cooler than the skin.</li>'],
  ],
},

// Q55 bio-248: SUBSTANTIAL REPAIR. Water-soluble vitamins are not uniformly
// unstorable or non-toxic (B12 stores last years; excess B6 causes
// neuropathy), fat-soluble vitamins differ among themselves, needing regular
// intake is not the same as needing daily supplements, and micelles in the
// lumen are not the same as chylomicrons released into lymph.
{
  q: 55, id: 'bio-248', expectLetter: 'B',
  explanation: [
    ['<p>Fat-soluble vitamins (A, D, E, K) are absorbed with dietary fats in the small intestine and transported via chylomicrons. They are stored in the liver and adipose tissue, meaning they do not need to be consumed daily but can accumulate to toxic levels (hypervitaminosis)-particularly vitamins A and D. Water-soluble vitamins (B-complex and C) are not stored significantly and are readily excreted in urine, so toxicity is rare but deficiency can develop more quickly.</p>',
     '<p>Fat-soluble vitamins are absorbed with dietary fat and can be stored in the body. Excessive intake, especially of vitamins A and D, can cause toxicity. Many water-soluble vitamins have smaller stores and excess is more readily excreted, but there are exceptions: B12 can be stored for years, and excessive doses of some water-soluble vitamins can also be harmful. Storage and toxicity vary by vitamin.</p>'],
    ['Because water-soluble vitamins dissolve in blood plasma and are filtered by the kidneys, excess amounts are readily excreted. This is the opposite property of fat-soluble vitamins, which accumulate in adipose tissue.</p>',
     'Because many water-soluble vitamins are filtered by the kidneys, excess amounts are more readily excreted, although this is not uniform: B12 is stored for years and excessive doses of some water-soluble vitamins can be harmful. Fat-soluble vitamins are the ones described in the correct option.</p>'],
    ['<p><strong>C. Require daily supplementation because the body cannot store them:</strong> The need for daily supplementation due to inability to store them is a characteristic of water-soluble vitamins, not fat-soluble ones. Fat-soluble vitamins (A, D, E, K) can be stored for weeks to months in the liver and fat tissue, so daily intake is not strictly necessary if stores are adequate.</p>',
     '<p><strong>C. Require daily supplementation because the body cannot store them:</strong> Fat-soluble vitamins can be stored, so this description is incorrect. More generally, needing regular vitamin intake does not mean needing supplements; an adequate diet can supply essential vitamins.</p>'],
    ['They require bile salts for emulsification and are packaged into micelles for absorption, then transported in chylomicrons through the lymphatic system.',
     'They require bile salts, which form micelles in the intestinal lumen that present the vitamins for uptake; chylomicrons are then assembled inside the enterocytes and released into lymph. The vitamins do not enter the circulation as intact micelles.'],
    ['<li>Fat-soluble vitamins A, D, E, and K are absorbed with dietary fat, carried in chylomicrons, and stored in liver and adipose tissue.</li><li>Because they are stored, they need not be consumed daily - but they can accumulate to toxic levels.</li><li>Hypervitaminosis is most important for A and D.</li><li>Water-soluble vitamins (B complex and C) are excreted in urine, so toxicity is rare but deficiency develops faster.</li>',
     '<li>Fat-soluble vitamins A, D, E, and K are absorbed with dietary fat, carried in chylomicrons, and can be stored in liver and adipose tissue.</li><li>Because they are stored, they need not be consumed daily - but they can accumulate to harmful levels.</li><li>Storage duration differs between them: vitamin K has relatively small stores and rapid turnover.</li><li>Hypervitaminosis is most important for A and D.</li><li>Many water-soluble vitamins have smaller stores and excess is more readily excreted, but B12 stores last years and excessive doses of some water-soluble vitamins can be harmful.</li>'],
    ['<p class=\'exp-key\'>Bottom Line: Fat-soluble vitamins (A, D, E, K) are stored in fat and liver; excess can cause toxicity, unlike water-soluble vitamins.</p>',
     '<p class=\'exp-key\'>Bottom Line: Fat-soluble vitamins can be stored and excessive intake can be harmful, especially for A and D. Water solubility does not guarantee an absence of storage or toxicity.</p>'],
  ],
},

// Q56 bio-249: severe vitamin E deficiency can affect the retina and thiamine
// deficiency syndromes can include ocular abnormalities, so blanket
// exclusions are inaccurate; Wernicke disease is not confined to alcohol use;
// and the toxicity warning belongs to preformed vitamin A.
{
  q: 56, id: 'bio-249', expectLetter: 'A',
  explanation: [
    ['Deficiency is rare but can cause hemolytic anemia (fragile red blood cell membranes) and neuromuscular problems such as ataxia and peripheral neuropathy. It does not cause night blindness.</p>',
     'Vitamin E deficiency typically produces neurological or red-cell problems, such as ataxia, peripheral neuropathy and haemolysis; the combination described here is much more characteristic of vitamin A deficiency.</p>'],
    ['Deficiency causes beriberi (wet beriberi with heart failure; dry beriberi with peripheral neuropathy) and Wernicke-Korsakoff syndrome in alcoholics. It does not affect vision or skin pigmentation.</p>',
     'Deficiency causes beriberi (wet beriberi with heart failure; dry beriberi with peripheral neuropathy) and Wernicke-Korsakoff syndrome, which can arise whenever thiamine intake or absorption is inadequate. That syndrome pattern is quite different from the night blindness, dry skin and immune impairment of vitamin A deficiency.</p>'],
    ['<li>Vitamin A is required for rhodopsin synthesis in rod cells, so deficiency first shows as night blindness.</li>',
     '<li>Vitamin A is required for rhodopsin synthesis in rod cells, and night blindness is a common early sign of deficiency.</li>'],
    ['<li>It comes preformed as retinol from animal sources and as the provitamin beta-carotene from plants; being fat-soluble, excess is toxic and teratogenic.</li>',
     '<li>It comes preformed as retinol from animal sources and as the provitamin beta-carotene from plants; excessive intake of preformed vitamin A can be toxic and teratogenic.</li>'],
  ],
},

// Q57 bio-250: MAJOR REWRITE. Brefeldin A does more than block anterograde
// transport: it can redistribute Golgi enzymes into the ER, where some
// Golgi-type processing continues, and initial N-linked glycosylation happens
// in the ER anyway. The item is recast as a simple selective ER-export defect
// so it tests the organelle concept without requiring knowledge of that drug.
{
  q: 57, id: 'bio-250', expectLetter: 'B',
  stemFull: 'A mutation prevents newly synthesized secretory proteins from leaving the rough endoplasmic reticulum (ER). Which process would be most directly impaired?',
  optionFull: [[1, 'Golgi-dependent processing and sorting of newly synthesized secretory proteins']],
  headingsGone: ['Post-translational glycosylation modification of secretory proteins', 'brefeldin', 'Brefeldin', 'polymerase gamma'],
  explanationFull:
    '<h4>Correct Answer: B) Golgi-dependent processing and sorting of newly synthesized secretory proteins</h4>'
    + '<p>Proteins traveling through the classical secretory pathway enter the rough ER, where folding and initial N-linked glycosylation occur. They then travel to the Golgi apparatus for further processing and sorting. If newly synthesized secretory proteins cannot leave the ER, they cannot reach the Golgi for these later steps. This does not mean that every form of protein glycosylation stops.</p>'
    + '<table class=\'exp-table\'><tr><th>Organelle</th><th>Function</th></tr>'
    + '<tr><td>Rough ER</td><td>Initial folding and N-linked glycosylation of proteins entering the secretory pathway</td></tr>'
    + '<tr><td>Golgi apparatus</td><td>Further processing and sorting for delivery</td></tr>'
    + '<tr><td>Proteasome</td><td>Degradation of selected proteins in the cytosol and nucleus</td></tr></table>'
    + '<h4>Why the other choices are wrong:</h4>'
    + '<p><strong>A. Synthesis of cytoplasmic proteins:</strong> Many cytoplasmic proteins are synthesized on free ribosomes and do not need to travel from the ER to the Golgi. Their synthesis is not the transport-dependent step asked about.</p>'
    + '<p><strong>C. Degradation of misfolded cytoplasmic proteins by proteasomes:</strong> Proteasomes degrade selected proteins, including misfolded cytoplasmic proteins. That degradation is a different process from delivery of secretory proteins to the Golgi.</p>'
    + '<p><strong>D. Replication of mitochondrial DNA:</strong> Mitochondrial DNA is replicated within mitochondria. Its replication is not a step in the ER-to-Golgi secretory pathway.</p>'
    + '<h4>Key Educational Points:</h4>'
    + points([
      'The classical secretory pathway carries proteins from the rough ER to the Golgi and then toward their destinations.',
      'Folding and initial N-linked glycosylation begin in the ER.',
      'The Golgi performs additional processing and sorts proteins for delivery.',
      'Blocking ER export directly prevents newly synthesized cargo from reaching these Golgi steps.',
      'Other cellular processes may be affected indirectly by severe transport disruption, but they are not the direct step tested here.',
    ])
    + '<p class=\'exp-key\'>Bottom Line: Secretory proteins must leave the ER and reach the Golgi for normal Golgi-dependent processing and sorting.</p>',
},

// Q59 bio-255: intracellular fluid is not simply a 0.9% NaCl solution, not
// every hypotonic exposure lyses every red cell, and plasmolysis is defined
// by a cell wall rather than by being a plant.
{
  q: 59, id: 'bio-255', expectLetter: 'B',
  explanation: [
    ['<p>A 0.45% NaCl solution is hypotonic relative to the cell\'s cytoplasm (which is isotonic at ~0.9% NaCl). Water moves by osmosis from the region of lower solute concentration (the hypotonic solution) into the cell, causing it to swell. In red blood cells, which lack a rigid cell wall, excessive swelling leads to hemolysis (lysis).</p>',
     '<p>A 0.45% NaCl solution is hypotonic relative to the red cell; 0.9% NaCl is approximately isotonic with human cells, although intracellular fluid is not simply a 0.9% NaCl solution. Water moves into the cell by osmosis, causing swelling. If swelling exceeds the membrane\'s capacity, the cell lyses.</p>'],
    ['<td>Swelling → hemolysis</td>', '<td>Swelling; possible hemolysis if sufficiently severe</td>'],
    ['<p><strong>D. The cell will undergo plasmolysis:</strong> Plasmolysis is a phenomenon specific to plant cells, not animal cells. It occurs when a plant cell in a hypertonic solution loses water, causing the plasma membrane to pull away from the rigid cell wall. Animal cells like red blood cells lack a cell wall and therefore cannot undergo plasmolysis; they instead crenate in hypertonic conditions or lyse in hypotonic conditions.</p>',
     '<p><strong>D. The cell will undergo plasmolysis:</strong> Plasmolysis describes the plasma membrane pulling away from the cell wall in a walled cell, such as a plant cell, that has lost water in a hypertonic solution. Red blood cells have no cell wall, so they instead crenate in hypertonic conditions or swell and potentially lyse in hypotonic ones.</p>'],
    ['<li>0.45% NaCl is hypotonic to the cell, since normal saline and cytoplasm are about 0.9%.</li>',
     '<li>0.45% NaCl is hypotonic to the red cell, because 0.9% NaCl is approximately isotonic with human cells.</li>'],
    ['<li>Red blood cells have no cell wall, so unchecked swelling ruptures the membrane - haemolysis.</li>',
     '<li>Red blood cells have no cell wall, so swelling beyond the membrane\'s capacity ruptures it, producing haemolysis.</li>'],
    ['<li>Plasmolysis is a plant-cell term and does not apply here, because it describes the membrane pulling away from a cell wall.</li>',
     '<li>Plasmolysis does not apply here, because it describes the membrane pulling away from a cell wall and red cells have none.</li>'],
  ],
},

// Q60 bio-256: for ions the relevant gradient is electrochemical, and
// "no energy" is better stated as no direct ATP input.
{
  q: 60, id: 'bio-256', expectLetter: 'B',
  explanation: [
    ['<p><strong>A. Facilitated diffusion:</strong> Facilitated diffusion is a passive transport process where molecules move down their concentration gradient through carrier proteins or channel proteins, without requiring ATP. Examples include glucose transport via GLUT transporters and ion movement through ion channels. Unlike the Na+/K+ ATPase, facilitated diffusion cannot move substances against their concentration gradient.</p>',
     '<p><strong>A. Facilitated diffusion:</strong> Facilitated diffusion uses a channel or carrier to move a substance down its relevant gradient without direct ATP consumption. For ions, the relevant gradient includes both concentration and electrical forces. The Na+/K+-ATPase instead directly uses ATP to move ions against their electrochemical gradients.</p>'],
    ['<td>None (down gradient)</td>', '<td>No direct ATP; down the relevant gradient</td>'],
    ['<li>Facilitated diffusion is passive: it uses a protein channel or carrier but moves solute down its gradient with no energy input.</li>',
     '<li>Facilitated diffusion is passive: it uses a protein channel or carrier and moves solute down its relevant gradient with no direct ATP input. For ions that gradient is electrochemical, so an ion can move passively against its concentration gradient when the electrical component is sufficiently favourable.</li>'],
  ],
},

];
