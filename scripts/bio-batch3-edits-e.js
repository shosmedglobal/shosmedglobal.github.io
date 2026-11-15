/**
 * Batch 3 review, part E: displayed Q49-Q60 (bio-116 .. bio-128).
 * Q60 is the one item whose educational points were already tailored; the
 * review asks for them to be corrected rather than replaced wholesale.
 */
'use strict';

const GENERIC_PLANT =
  '<ul><li>Plants alternate between haploid (gametophyte) and diploid (sporophyte) generations; in flowering plants, the sporophyte is dominant.</li>'
  + '<li>Plant transport occurs through xylem (water and minerals, driven by transpiration pull) and phloem (sugars, driven by pressure flow from source to sink).</li>'
  + '<li>Plant hormones (auxins, gibberellins, cytokinins, ethylene, abscisic acid) coordinate growth, development, and responses to environmental stimuli.</li></ul>';

const GENERIC_DEV =
  '<ul><li>Human embryonic development proceeds through cleavage, gastrulation (three germ layer formation), neurulation, and organogenesis.</li>'
  + '<li>Gastrulation establishes the three primary germ layers (ectoderm, mesoderm, endoderm) that give rise to all tissues and organs.</li>'
  + '<li>Spermatogenesis produces four functional sperm from each primary spermatocyte; oogenesis produces one functional egg plus polar bodies from each primary oocyte.</li></ul>';

const points = items => '<ul>' + items.map(t => '<li>' + t + '</li>').join('') + '</ul>';

module.exports = [

// ============================================================ Q49 bio-116
// The cyanobacteria aside is wrong as stated, "reversed membrane orientation"
// is vague, and not every photosystem is itself a proton pump.
{
  q: 49, id: 'bio-116', expectLetter: 'A',
  explanation: [
    ['<p>During the light reactions, the electron transport chain (including PSII, cytochrome b6f, and PSI) embedded in the thylakoid membrane drives the pumping of protons (H⁺) from the stroma into the thylakoid lumen. This creates an electrochemical gradient (proton motive force) across the thylakoid membrane, which drives ATP synthesis as protons flow back through ATP synthase (chemiosmosis) into the stroma.</p>',
     '<p>During the light reactions, electron transport through the components embedded in the thylakoid membrane raises the proton concentration inside the thylakoid lumen relative to the stroma. Two things contribute: the cytochrome b6f complex moves protons across the membrane as electrons pass through it, and the splitting of water releases protons directly into the lumen. The photosystems are not each simply proton pumps in their own right. The resulting electrochemical gradient drives ATP synthesis as protons flow back into the stroma through ATP synthase.</p>'],
    ['<p><strong>C. The plasma membrane of the mesophyll cell:</strong> The plasma membrane of the mesophyll cell is the cell’s outer boundary that regulates transport of substances in and out of the cell. Photosynthetic light reactions occur inside chloroplasts, not at the plasma membrane. In prokaryotic photosynthetic organisms (like cyanobacteria), the plasma membrane or its invaginations do house photosynthetic machinery, but in plant cells, this function is within thylakoids.</p>',
     '<p><strong>C. The plasma membrane of the mesophyll cell:</strong> The plasma membrane is the cell&rsquo;s outer boundary and regulates what enters and leaves the cell. The light reactions take place inside the chloroplast, on the thylakoid membranes, not at the plasma membrane.</p>'],
    [GENERIC_PLANT, points([
      'The gradient is across the thylakoid membrane: protons accumulate in the lumen, with the stroma on the other side.',
      'Protons return to the stroma through ATP synthase, and ATP is produced on the stromal side.',
      'Both water splitting in the lumen and electron transfer through the chain contribute protons to that gradient.',
    ])],
    ['<p class=\'exp-key\'>Bottom Line: Protons accumulate in the thylakoid lumen (low pH), and ATP synthesis occurs on the stromal side - the same chemiosmotic principle that operates in mitochondria but with reversed membrane orientation.</p>',
     '<p class=\'exp-key\'>Bottom Line: Protons accumulate in the thylakoid lumen and return to the stroma through ATP synthase, where ATP is made. Mitochondria use the same chemiosmotic principle in different compartments: protons accumulate on the intermembrane-space side and return to the matrix.</p>'],
  ],
},

// ============================================================ Q50 bio-117
// The osmotic step was missing from the guard-cell mechanism, and the
// feedback for B and D was a copied sentence that explained neither.
{
  q: 50, id: 'bio-117', expectLetter: 'C',
  explanation: [
    ['<p>Abscisic acid (ABA) is a stress hormone that accumulates during drought conditions. It triggers closure of stomata by causing potassium ions (K⁺) to leave guard cells, making them lose turgor pressure and close the stomatal pore. ABA also maintains seed dormancy by inhibiting germination until conditions are favorable. It generally antagonizes the growth-promoting effects of gibberellins and auxins.</p>',
     '<p>Abscisic acid (ABA) accumulates during water stress and triggers stomatal closure through a clear chain of events. Ions, including potassium (K⁺), leave the guard cells. That raises the water potential inside them relative to outside, so water follows by osmosis and leaves the cells too. The guard cells lose turgor, go slack, and the stomatal pore closes. The osmotic step matters: ion movement by itself would not change the volume of the cell. ABA also maintains seed dormancy, holding germination back until conditions are favourable.</p>'],
    ['It is produced mainly in root tips and transported upward through the xylem. In tissue culture, the ratio of cytokinin to auxin determines whether shoots or roots develop. Cytokinin acts antagonistically to abscisic acid in many processes-it promotes growth and activity rather than dormancy and stress responses.</p>',
     'It is produced in several plant tissues, including roots and shoots. In tissue culture, the ratio of cytokinin to auxin determines whether shoots or roots develop. It is not the hormone that maintains seed dormancy or closes stomata under water stress.</p>'],
    ['<p><strong>B. Gibberellin:</strong> It generally antagonizes the growth-promoting effects of gibberellins and auxins.</p>',
     '<p><strong>B. Gibberellin:</strong> Gibberellins promote seed germination and stem elongation. In germination they act in the opposite direction to ABA, which maintains dormancy, so the two make a useful contrast. Gibberellin is not what closes stomata during water stress.</p>'],
    ['<p><strong>D. Auxin:</strong> It generally antagonizes the growth-promoting effects of gibberellins and auxins.</p>',
     '<p><strong>D. Auxin:</strong> Auxin promotes cell elongation and the tropic growth responses such as phototropism and gravitropism. It is not the hormone that maintains seed dormancy or closes stomata.</p>'],
    [GENERIC_PLANT, points([
      'The causal chain for stomatal closure: ions leave the guard cells, water follows by osmosis, turgor falls, and the pore shuts.',
      'ABA also maintains seed dormancy, while gibberellin promotes germination, so the two give a useful contrast in that process.',
      'The common theme for ABA is conserving water and holding development back until conditions improve.',
    ])],
    ['<p class=\'exp-key\'>Bottom Line: ABA is the primary stress-response hormone in plants - it closes stomata to prevent water loss and maintains seed dormancy, acting as a counterbalance to growth-promoting hormones.</p>',
     '<p class=\'exp-key\'>Bottom Line: ABA promotes stomatal closure during water stress and maintains seed dormancy. Closure works through osmosis: ions leave the guard cells, water follows, turgor falls, and the pore shuts.</p>'],
  ],
},

// ============================================================ Q51 bio-118
// Ectoderm gives the epidermis, not all layers of skin, and whole mixed-tissue
// organs should not be assigned to endoderm.
{
  q: 51, id: 'bio-118', expectLetter: 'B',
  explanation: [
    ['During neurulation, a portion of the ectoderm (the neural plate) folds inward to form the neural tube, which develops into the central nervous system.</p>',
     'During neurulation a portion of the ectoderm, the neural plate, folds inward to form the neural tube, which develops into the central nervous system. Note that ectoderm gives the epidermis rather than every layer of the skin: the dermis beneath it is mesodermal. In human development the three definitive germ layers arise from the epiblast during gastrulation, and the epiblast itself derives from the inner cell mass.</p>'],
    ['<tr><td>Endoderm</td><td>GI tract lining, lungs, liver, pancreas, thyroid</td></tr>',
     '<tr><td>Endoderm</td><td>Epithelial lining of gut and respiratory tract; epithelial and glandular components of liver, pancreas, thyroid</td></tr>'],
    ['<p><strong>D. Endoderm:</strong> The endoderm gives rise to the lining of the GI tract, respiratory tract, liver, pancreas, thyroid, and bladder; this does not include the structures mentioned in the question.</p>',
     '<p><strong>D. Endoderm:</strong> The endoderm gives rise to the epithelial lining of the gut and respiratory tract, and to the epithelial and glandular components of organs such as the liver, pancreas, thyroid and bladder. Those organs also contain mesoderm-derived connective tissue and blood vessels, so they are not assigned wholesale to one layer. None of this includes the nervous system or the epidermis.</p>'],
    [GENERIC_DEV, points([
      'Surface ectoderm gives the epidermis and its appendages; neural ectoderm gives the nervous system. The dermis underneath is mesodermal, so skin is not a single-layer derivative.',
      'Mesoderm gives muscle, bone, blood, kidneys and the cardiovascular system.',
      'Endoderm gives the epithelial lining of the gut and respiratory tract, and the epithelial parts of organs such as liver and pancreas.',
      'In humans the three definitive germ layers arise from the epiblast during gastrulation, and the epiblast comes from the inner cell mass.',
    ])],
    ['<p class=\'exp-key\'>Bottom Line: Ectoderm forms the outer structures (skin) and nervous system; mesoderm forms middle structures (muscle, bone, blood); endoderm forms inner linings (gut, respiratory tract).</p>',
     '<p class=\'exp-key\'>Bottom Line: Ectoderm forms the epidermis and the nervous system; mesoderm forms muscle, bone and blood; endoderm forms the epithelial linings of the gut and respiratory tract.</p>'],
  ],
},

// ============================================================ Q52 bio-120
// Not all peripheral neurons are neural crest derived, bone marrow is not the
// origin of all blood formation in embryogenesis, and "fourth germ layer"
// should not be the takeaway.
{
  q: 52, id: 'bio-120', expectLetter: 'B',
  explanation: [
    ['<p>Neural crest cells are a transient, multipotent population of cells that migrate extensively throughout the embryo. They give rise to remarkably diverse cell types including melanocytes (pigment cells), peripheral nervous system neurons and glia (Schwann cells), chromaffin cells of the adrenal medulla, craniofacial cartilage and bone, smooth muscle of great vessels, and odontoblasts of teeth.</p>',
     '<p>Neural crest cells are a transient, migratory population that arises at the border of the neural plate and travels widely through the embryo. They give rise to a strikingly diverse set of cell types: melanocytes, many peripheral neurons and glia including Schwann cells, the chromaffin cells of the adrenal medulla, much craniofacial cartilage and bone, smooth muscle of the great vessels, and the odontoblasts of teeth. Note "many" rather than "all" for peripheral neurons: cranial sensory placodes contribute neurons as well.</p>'],
    ['<p><strong>D. Red blood cells and platelets:</strong> Red blood cells (erythrocytes) and platelets (thrombocytes) derive from mesoderm, specifically from hematopoietic stem cells in the bone marrow. All blood cell lineages originate from mesoderm. Neural crest cells produce a diverse array of cell types including peripheral neurons, Schwann cells, melanocytes, and adrenal medulla cells, but blood cells are not among their derivatives.</p>',
     '<p><strong>D. Red blood cells and platelets:</strong> Blood cell lineages are mesoderm-derived. Bone marrow is the major site of blood-cell production in adults, but it is not where blood formation happens throughout embryogenesis, which begins elsewhere. Either way, blood cells are not among the neural crest derivatives.</p>'],
    [GENERIC_DEV, points([
      'Neural crest arises at the border of the neural plate and is derived from ectoderm. It is not a separate primary germ layer.',
      'Its defining behaviour is migration: the cells travel far from where they form before differentiating.',
      'High-yield derivatives: melanocytes, many peripheral neurons and Schwann cells, adrenal medulla chromaffin cells, and much craniofacial cartilage and bone.',
    ])],
    ['<p class=\'exp-key\'>Bottom Line: Neural crest cells are sometimes called the \'fourth germ layer\' due to their extraordinary migratory capacity and diverse developmental contributions.</p>',
     '<p class=\'exp-key\'>Bottom Line: Migrating neural crest cells form structures including melanocytes, many peripheral neurons and Schwann cells, and adrenal medulla chromaffin cells.</p>'],
  ],
},

// ============================================================ Q53 bio-121
// The eight-cell cutoff is not an established universal human rule, the
// placenta is not wholly embryo-derived, and the claim that pluripotent cells
// can never contribute to any extraembryonic tissue is too broad.
{
  q: 53, id: 'bio-121', expectLetter: 'C',
  stemFull: 'Which cells can give rise to all body cell types and the embryo-derived supporting tissues, including trophoblast?',
  optionFull: [
    [0, 'Multipotent cells'],
    [1, 'Pluripotent cells'],
    [2, 'Totipotent cells'],
    [3, 'Unipotent cells'],
  ],
  headingsGone: ['A. Multipotent stem cells:', 'B. Pluripotent stem cells:', 'D. Unipotent stem cells:'],
  explanation: [
    ['<h4>Correct Answer: C) Totipotent stem cells</h4><p>Totipotent cells can give rise to all cell types of the organism plus extraembryonic tissues (placenta, yolk sac). Only the zygote and cells from the first few divisions (up to the 8-cell stage in humans) are truly totipotent. Pluripotent cells (e.g., embryonic stem cells from the inner cell mass) can form all body cell types but not extraembryonic tissues. Multipotent cells are restricted to a single lineage.</p>',
     '<h4>Correct Answer: C) Totipotent cells</h4><p>Totipotent cells can give rise to all the cell types of the organism plus the embryo-derived supporting tissues, including the trophoblast that forms the fetal part of the placenta. The zygote and the earliest blastomeres have this full potential; there is no firm cell-number cutoff worth quoting.</p>'
     + '<p>Two distinctions are worth keeping straight. The placenta is not entirely embryo-derived: it also has a maternal component, which no embryonic cell produces. And pluripotent cells, such as embryonic stem cells from the inner cell mass, can form all the body cell types but lack the full developmental potential to build an organism together with all the extraembryonic support it needs. Multipotent cells are more restricted still, covering a range of types within one lineage.</p>'],
    ['<tr><td>Totipotent</td><td>All cell types + placenta</td><td>Zygote, early blastomeres</td></tr>',
     '<tr><td>Totipotent</td><td>All body cell types plus embryo-derived supporting tissues</td><td>Zygote, earliest blastomeres</td></tr>'],
    ['<p><strong>A. Multipotent stem cells:</strong> Multipotent stem cells can differentiate into several related cell types within a particular lineage. Examples include hematopoietic stem cells (which produce all blood cell types) and neural stem cells (which produce neurons, astrocytes, and oligodendrocytes). They are more restricted than totipotent or pluripotent cells and cannot generate all body cell types or placental tissues.</p>',
     '<p><strong>A. Multipotent cells:</strong> Multipotent cells can differentiate into several related cell types within one lineage. Hematopoietic stem cells, which produce the blood cell types, are the clearest example. They are more restricted than totipotent or pluripotent cells and cannot generate all the body cell types.</p>'],
    ['<p><strong>B. Pluripotent stem cells:</strong> Pluripotent stem cells can differentiate into any cell type of the three germ layers (ectoderm, mesoderm, endoderm) but cannot form extraembryonic tissues like the placenta. Embryonic stem cells (from the inner cell mass of the blastocyst) are the classic example of pluripotent cells. They are more versatile than multipotent cells but less so than totipotent cells, which can form the entire organism including placenta.</p>',
     '<p><strong>B. Pluripotent cells:</strong> Pluripotent cells can differentiate into any cell type of the three germ layers, so they can form all the body cell types. What they lack is the full developmental potential to produce an organism along with all the extraembryonic support it requires, which is what the stem asks about. Embryonic stem cells from the inner cell mass are the classic example.</p>'],
    ['<p><strong>D. Unipotent stem cells:</strong> Unipotent stem cells can produce only one cell type but retain the ability to self-renew.',
     '<p><strong>D. Unipotent cells:</strong> Unipotent cells can produce only one cell type, while retaining the ability to self-renew.'],
    [GENERIC_DEV, points([
      'Totipotent: can form all body cell types and the embryo-derived supporting tissues, including trophoblast. The zygote and the earliest blastomeres.',
      'Pluripotent: can form all body cell types, but not the full extraembryonic support needed to build a whole organism.',
      'Multipotent: a range of related types within one lineage, with hematopoietic stem cells as the clear example. Unipotent: just one type.',
      'The placenta has both embryo-derived and maternal components, so an embryonic cell does not produce all of it.',
    ])],
  ],
},

// ============================================================ Q54 bio-122
// Hox genes assign identity along the axis; they do not by themselves
// establish the axis.
{
  q: 54, id: 'bio-122', expectLetter: 'A',
  optionFull: [[0, 'Specify regional identity along the anterior-posterior body axis']],
  explanation: [
    ['<h4>Correct Answer: A) Specify the anterior-posterior body axis and identity of body segments</h4><p>Hox genes are homeotic selector genes that encode transcription factors containing a homeodomain. They are arranged in clusters on chromosomes in an order that corresponds to their expression along the anterior-posterior body axis (collinearity). Hox genes specify the identity of body segments and determine what structures develop in each region.',
     '<h4>Correct Answer: A) Specify regional identity along the anterior-posterior body axis</h4><p>Hox genes are homeotic selector genes encoding transcription factors that contain a homeodomain. They sit in clusters on the chromosome in an order matching the order in which they are expressed along the anterior-posterior body axis, a property called collinearity. What they do is specify which structures develop at each position along that axis; they do not by themselves establish the axis in the first place.'],
    [GENERIC_DEV, points([
      'Hox genes are regulatory genes: they encode transcription factors that switch other genes on and off, rather than coding for structural proteins themselves.',
      'They assign positional identity, deciding which structure forms at each place along the anterior-posterior axis.',
      'Collinearity: their order along the chromosome matches the order of their expression along the body.',
      'Changing their regulation changes which structure forms where, which is what a homeotic transformation is.',
    ])],
  ],
},

// ============================================================ Q55 bio-123
// Trophoblast contributes to the chorion and fetal placenta rather than being
// the whole of either, and the mammalian yolk sac is not merely vestigial.
{
  q: 55, id: 'bio-123', expectLetter: 'A',
  optionFull: [[0, 'The trophoblast component of the chorion and fetal placenta']],
  explanation: [
    ['<h4>Correct Answer: A) The placenta and extraembryonic membranes</h4><p>The trophoblast is the outer layer of cells in the blastocyst that will form the fetal portion of the placenta (specifically the chorion) and contribute to other extraembryonic structures. The trophoblast mediates implantation into the uterine wall and later forms the chorionic villi for nutrient and gas exchange. The inner cell mass (embryoblast), not the trophoblast, gives rise to the embryo itself.</p>',
     '<h4>Correct Answer: A) The trophoblast component of the chorion and fetal placenta</h4><p>The trophoblast is the outer cell layer of the blastocyst. It mediates implantation into the uterine wall and contributes the trophoblast component of the chorion and of the fetal placenta, later forming the chorionic villi where exchange with maternal blood takes place.</p>'
     + '<p>Be precise about how much of the structure is trophoblast. It is not the whole chorion and not the whole placenta: extraembryonic mesoderm contributes connective tissue and the fetal blood vessels, and the placenta also has a maternal component. Nor does trophoblast give rise to all the extraembryonic membranes. The inner cell mass, not the trophoblast, gives rise to the embryo itself, by way of the epiblast and the definitive germ layers.</p>'],
    ['<p><strong>D. The yolk sac only:</strong> The yolk sac in mammals is a vestigial structure that forms from extraembryonic endoderm and mesoderm. While it plays a role in early blood cell formation and primordial germ cell development, it is not the primary structure derived from the trophoblast. The trophoblast primarily gives rise to the chorion and placental tissues that support maternal-fetal exchange.</p>',
     '<p><strong>D. The yolk sac only:</strong> The mammalian yolk sac forms from extraembryonic endoderm and mesoderm. Although it holds little yolk in humans, it is not merely vestigial: it has important early functions, including early blood formation and a role in the development of the primordial germ cells. In any case it is not what the trophoblast primarily gives rise to.</p>'],
    [GENERIC_DEV, points([
      'Trophoblast supports implantation and maternal-fetal exchange; the inner cell mass gives rise to the embryonic lineages.',
      'The placenta has both fetal and maternal components, and even the fetal part is not trophoblast alone: extraembryonic mesoderm supplies connective tissue and vessels.',
      'Inner cell mass → epiblast → the three definitive germ layers → the embryo proper.',
    ])],
    ['<p class=\'exp-key\'>Bottom Line: The blastocyst has two distinct cell populations: trophoblast (→ placenta) and inner cell mass (→ embryo). This is the first differentiation event in mammalian development.</p>',
     '<p class=\'exp-key\'>Bottom Line: The blastocyst has two cell populations: the trophoblast, which contributes the trophoblast part of the chorion and fetal placenta, and the inner cell mass, which gives rise to the embryo. This is the first differentiation event in mammalian development.</p>'],
  ],
},

// ============================================================ Q56 bio-124
// Apoptosis does not act "only later", twinning is not defined by splitting
// an inner cell mass, and "not pathological" is the wrong framing.
{
  q: 56, id: 'bio-124', expectLetter: 'A',
  explanation: [
    ['It involves massive cell migration and invagination, not programmed cell death. Apoptosis plays its developmental role later, sculpting structures by eliminating cells between forming structures (like separating fingers from a webbed limb bud).</p>',
     'It is defined by cell movements and the formation of the germ layers, not by programmed cell death. That is why this option does not answer the question: the removal of interdigital cells is the direct apoptosis example being tested here.</p>'],
    ['<p><strong>C. Producing identical twin embryos from a single zygote:</strong> Identical twins form when the inner cell mass of a single embryo splits into two separate cell groups during early development (typically before day 14), each capable of forming a complete organism. This is a result of the totipotency of early embryonic cells, not apoptosis. Apoptosis removes unwanted cells; it does not split embryos into twins.</p>',
     '<p><strong>C. Producing identical twin embryos from a single zygote:</strong> Monozygotic twinning involves separation of one early embryo into two developing embryos, rather than programmed cell death. Apoptosis removes unwanted cells; it does not split an embryo in two.</p>'],
    [GENERIC_DEV, points([
      'Apoptosis is controlled cell removal, the counterpart to proliferation in shaping a developing structure.',
      'The clearest example is the limb bud: cells between the developing digits are removed, which separates the fingers and toes.',
      'It also removes surplus cells elsewhere, such as neurons that fail to make the right connections.',
    ])],
    ['<p class=\'exp-key\'>Bottom Line: Apoptosis is not pathological - it is a precisely regulated developmental mechanism essential for proper morphogenesis, tissue homeostasis, and removal of superfluous structures.</p>',
     '<p class=\'exp-key\'>Bottom Line: Apoptosis is a normal and essential part of development: a precisely regulated mechanism for shaping structures, maintaining tissues and removing cells that are no longer needed. It can also contribute to disease when its regulation fails.</p>'],
  ],
},

// ============================================================ Q57 bio-125
// "Avoids the ethical concerns" overstates it; SCNT does not automatically
// produce a cloned organism; the four factor names are optional context.
{
  q: 57, id: 'bio-125', expectLetter: 'C',
  optionFull: [[1, 'Transferring a somatic-cell nucleus into an enucleated egg']],
  headingsGone: ['B. Fusing an enucleated egg cell with a somatic cell nucleus:'],
  explanation: [
    ['<p>Induced pluripotent stem cells (iPSCs) are generated by introducing a set of transcription factors (originally Oct4, Sox2, Klf4, and c-Myc, known as Yamanaka factors) into differentiated somatic cells such as fibroblasts. This reprogramming reverses the differentiated state and restores pluripotency. Shinya Yamanaka received the Nobel Prize in 2012 for this discovery, which avoids the ethical concerns of embryonic stem cell use.</p>',
     '<p>Induced pluripotent stem cells (iPSCs) are generated by introducing a set of transcription factors into differentiated somatic cells such as fibroblasts. Expressing those factors reverses the differentiated state and restores pluripotency. The classical combination is Oct4, Sox2, Klf4 and c-Myc, the Yamanaka factors, which is useful context rather than something to memorize for this question. Shinya Yamanaka received the Nobel Prize in 2012 for the discovery. Unlike embryonic stem cells, this method does not require deriving the cells from an embryo.</p>'],
    ['The key distinction is that iPSC technology avoids the ethical concerns associated with destroying embryos, since it starts with ordinary adult cells like skin fibroblasts.</p>',
     'The key distinction is the starting material: embryonic stem cells are taken from an embryo, while iPSCs start from ordinary adult cells such as skin fibroblasts.</p>'],
    ['<p><strong>B. Fusing an enucleated egg cell with a somatic cell nucleus:</strong> Fusing an enucleated egg cell with a somatic cell nucleus describes somatic cell nuclear transfer (SCNT), the technique used to clone Dolly the sheep in 1996. SCNT produces a cloned organism or embryo, not iPSCs. iPSC generation uses a fundamentally different approach: introducing specific transcription factors (originally Oct4, Sox2, Klf4, and c-Myc, known as the Yamanaka factors) into adult cells to reprogram them back to a pluripotent state.</p>',
     '<p><strong>B. Transferring a somatic-cell nucleus into an enucleated egg:</strong> This is somatic cell nuclear transfer, a distinct reprogramming approach, and the technique used to clone Dolly the sheep. It does not automatically produce a living cloned organism, and it is not how iPSCs are made: iPSC generation introduces specific transcription factors into an adult cell instead.</p>'],
    [GENERIC_DEV, points([
      'A differentiated somatic cell can be reprogrammed to pluripotency by expressing an appropriate set of transcription factors.',
      'iPSCs and embryonic stem cells differ in where they come from rather than in being pluripotent: iPSCs are not derived from an embryo.',
      'Adult stem cells found in tissues such as bone marrow are multipotent, a more restricted potential than pluripotency.',
    ])],
    ['<p class=\'exp-key\'>Bottom Line: iPSC technology demonstrates that differentiation is reversible - introducing just four transcription factors can reprogram a specialized cell back to a pluripotent state.</p>',
     '<p class=\'exp-key\'>Bottom Line: iPSC technology shows that differentiation is reversible: introducing an appropriate set of transcription factors can reprogram a specialized cell back to a pluripotent state.</p>'],
  ],
},

// ============================================================ Q58 bio-126
// Shh is not simply the main initial neural-plate inducer; its clear role here
// is ventral patterning of the neural tube.
{
  q: 58, id: 'bio-126', expectLetter: 'B',
  explanation: [
    ['<p>The notochord is a mesodermal structure that plays a crucial inductive role during embryogenesis. It secretes signaling molecules (particularly Sonic hedgehog, Shh, and noggin/chordin) that induce the overlying ectoderm to differentiate into the neural plate, which then folds to form the neural tube (neurulation). In vertebrates, the notochord is largely replaced by the vertebral column, persisting only as the nucleus pulposus of intervertebral discs.</p>',
     '<p>The notochord is a mesodermal structure with a crucial signalling role in vertebrate embryos. Signals from axial tissues, the developing notochord among them, help induce the overlying ectoderm to form the neural plate, which then folds to make the neural tube during neurulation. BMP antagonists such as noggin and chordin are the molecules associated with that induction step. Sonic hedgehog (Shh) from the notochord has a clear and separate role in patterning the ventral part of the neural tube once it forms. In humans the notochord is largely replaced by the vertebral column, persisting as the nucleus pulposus of the intervertebral discs.</p>'],
    [GENERIC_DEV, points([
      'The notochord&rsquo;s key role is signalling to neighbouring tissues rather than becoming a structure itself.',
      'Neural plate to neural tube: signals from axial tissues including the notochord help induce the overlying ectoderm to form the plate.',
      'Shh from the notochord patterns the ventral neural tube, which is a separate job from the initial induction.',
      'The vertebrae develop from the surrounding mesoderm; the notochord does not turn into bone. In humans it persists as the nucleus pulposus.',
    ])],
    ['<p class=\'exp-key\'>Bottom Line: The notochord is an organizer that patterns the embryo - it induces neural development and specifies ventral cell fates in the neural tube through Sonic hedgehog signaling.</p>',
     '<p class=\'exp-key\'>Bottom Line: The notochord signals to the tissues around it. Signals from axial tissues including the notochord help induce the neural plate, and Shh from the notochord patterns the ventral neural tube. The vertebrae form from surrounding mesoderm, not from the notochord itself.</p>'],
  ],
},

// ============================================================ Q59 bio-127
// Absent gap phases and an abrupt mid-blastula transition are features of frog
// and some other embryos, not of human cleavage.
{
  q: 59, id: 'bio-127', expectLetter: 'A',
  optionFull: [[2, 'Cell divisions accompanied by substantial growth in the overall size of the embryo']],
  headingsGone: ['C. Slow divisions with extended G1 and G2 phases for cell growth:'],
  explanation: [
    ['<p>Cleavage consists of rapid mitotic divisions of the zygote with very short or absent G1 and G2 phases. The cells (blastomeres) divide rapidly without growing, so the overall embryo size remains approximately the same as the original zygote. The cytoplasm is progressively partitioned into smaller cells, increasing the surface-area-to-volume ratio and the nuclear-to-cytoplasmic ratio. This phase continues until the mid-blastula transition.</p>',
     '<p>Cleavage is a series of successive mitotic divisions of the zygote in which the cells divide without growing much in between. The number of cells rises sharply while the overall size of the embryo stays approximately unchanged, so each blastomere is smaller than the cell it came from. The cytoplasm of the zygote is progressively partitioned, which raises both the surface-area-to-volume ratio and the ratio of nucleus to cytoplasm.</p>'
     + '<p>One caution about examples: very short cell cycles with abbreviated gap phases, and an abrupt mid-blastula transition, are features of frog and some other animal embryos. Human embryonic cleavage is considerably slower and its timing differs.</p>'],
    ['<p><strong>B. Rapid mitotic divisions that increase cell size but not cell number:</strong> This answer flips the key feature of cleavage. During cleavage, cells divide rapidly but do not grow between divisions - so the total embryo size stays roughly the same while cell number increases dramatically.',
     '<p><strong>B. Rapid mitotic divisions that increase cell size but not cell number:</strong> This answer flips the key feature of cleavage. During cleavage, cells divide without growing much between divisions, so the overall size of the embryo stays approximately the same while cell number increases.'],
    ['<p><strong>C. Slow divisions with extended G1 and G2 phases for cell growth:</strong> Cleavage divisions are notably rapid precisely because they lack extended G1 and G2 phases. The cell cycle during cleavage consists primarily of S phase (DNA replication) and M phase (mitosis), with minimal or absent gap phases. This allows extremely fast division rates. Extended gap phases for cell growth are characteristic of normal somatic cell division, not of embryonic cleavage.</p>',
     '<p><strong>C. Cell divisions accompanied by substantial growth in the overall size of the embryo:</strong> Cleavage is distinguished precisely by the absence of substantial growth. The overall size of the embryo stays approximately the same while the cells divide, so the zygote&rsquo;s cytoplasm is partitioned into more and smaller cells rather than being added to. Substantial growth comes later in development.</p>'],
    [GENERIC_DEV, points([
      'Cleavage divisions are mitotic, not meiotic, so every blastomere keeps the full chromosome complement.',
      'Cell number rises while the overall size of the embryo stays approximately the same, so the cells become smaller.',
      'That partitioning raises the ratio of nucleus to cytoplasm in each cell.',
    ])],
    ['<p class=\'exp-key\'>Bottom Line: Cleavage divides the large zygote into many smaller cells without growth - the total mass remains constant while the number of cells and the ratio of nucleus to cytoplasm increase.</p>',
     '<p class=\'exp-key\'>Bottom Line: Cleavage divides the large zygote into many smaller cells, with the overall size of the embryo approximately unchanged while cell number and the nucleus-to-cytoplasm ratio increase.</p>'],
  ],
},

// ============================================================ Q60 bio-128
// Methylation is on carbon 5 of the cytosine BASE; prime notation refers to
// sugar positions. The silencing generalization holds for promoter CpGs, not
// for methylation everywhere in a gene.
{
  q: 60, id: 'bio-128', expectLetter: 'B',
  stemFull: 'In a mammalian cell, increased methylation of CpG sites in a gene&rsquo;s promoter typically:',
  optionFull: [[1, 'Reduces transcription by promoting a less accessible chromatin state']],
  explanation: [
    ['<h4>Correct Answer: B) Silences gene expression by promoting chromatin condensation</h4><p>DNA methylation (addition of a methyl group to the 5\' position of cytosine in CpG dinucleotides) is catalyzed by DNA methyltransferases (DNMTs). Methylated CpG sites recruit methyl-CpG-binding domain proteins (MBDs), which in turn recruit histone deacetylases and chromatin remodeling complexes that condense chromatin into a transcriptionally silent state (heterochromatin). This is a key mechanism for X-chromosome inactivation, genomic imprinting, and silencing of transposable elements.</p>',
     '<h4>Correct Answer: B) Reduces transcription by promoting a less accessible chromatin state</h4><p>DNA methylation adds a methyl group to carbon 5 of the cytosine base within a CpG dinucleotide, a reaction carried out by DNA methyltransferases. Note the notation: prime symbols such as 5&prime; refer to positions on the sugar, so this is the 5-position of the base rather than a 5&prime; position. CpG simply means a cytosine followed by a guanine along one DNA strand.</p>'
     + '<p>Methylation of the CpG sites in a gene&rsquo;s promoter is commonly associated with reduced transcription. Methylated sites can recruit binding proteins, which in turn bring in histone-modifying enzymes, and the chromatin becomes less accessible. Scope this to promoters: methylation elsewhere, for example within the body of a gene, does not carry the same meaning, so it is not true that all DNA methylation silences. Promoter methylation of this kind contributes to X-chromosome inactivation, genomic imprinting and the silencing of transposable elements.</p>'],
    ['Methylation of CpG dinucleotides is an epigenetic mark that typically leads to transcriptional silencing by recruiting methyl-CpG binding proteins that attract histone deacetylases, promoting chromatin condensation.</p>',
     'Methylation of promoter CpG sites is an epigenetic mark commonly associated with reduced transcription, because the methylated sites can recruit proteins that promote a less accessible chromatin state.</p>'],
    ['<p><strong>C. Activates gene transcription by opening chromatin:</strong> DNA methylation at CpG sites does not activate transcription or open chromatin. It has the opposite effect: methylation recruits proteins (like MeCP2) that attract histone-modifying enzymes causing chromatin to condense into a tightly packed, transcriptionally silent state called heterochromatin. Chromatin opening (euchromatin formation) is associated with histone acetylation and DNA demethylation.</p>',
     '<p><strong>C. Activates gene transcription by opening chromatin:</strong> Promoter CpG methylation does not open chromatin; it is commonly associated with the opposite, a less accessible state. Methylated sites can recruit binding proteins that attract histone-modifying enzymes, and the chromatin condenses. Chromatin opening is more often associated with histone acetylation.</p>'],
    ['<ul><li>DNA methyltransferases add methyl groups to cytosine within CpG dinucleotides.</li><li>Methylated CpG sites recruit binding proteins that in turn bring in histone deacetylases, condensing chromatin into silent heterochromatin.</li><li>The DNA sequence itself is unchanged, which is what makes this epigenetic rather than mutational.</li><li>Pair the two rules: DNA methylation generally silences, while histone acetylation generally activates.</li><li>The pattern is copied through cell division by the maintenance methyltransferase DNMT1, so the silencing is heritable.</li></ul>',
     points([
       'DNA methyltransferases add a methyl group to carbon 5 of the cytosine base within a CpG dinucleotide. CpG means a C followed by a G along one strand.',
       'Methylation of a gene&rsquo;s promoter is commonly associated with reduced transcription. Methylation elsewhere, such as within the gene body, does not carry the same meaning.',
       'Methylated sites can recruit binding proteins that bring in histone-modifying enzymes, making the chromatin less accessible.',
       'The DNA sequence itself is unchanged, which is what makes this epigenetic rather than mutational.',
       'DNMT1 copies the pattern after replication, so the mark is maintained through cell division. That is not the same as being transmitted across human generations.',
     ])],
    ['<p class=\'exp-key\'>Bottom Line: CpG methylation is a heritable epigenetic mark that silences genes without changing the DNA sequence - it is maintained through cell division by DNMT1 (maintenance methyltransferase).</p>',
     '<p class=\'exp-key\'>Bottom Line: Methylation of promoter CpG sites is commonly associated with reduced transcription, with no change to the DNA sequence. DNMT1 copies the pattern after replication, so the mark is maintained through cell division.</p>'],
  ],
},

];
