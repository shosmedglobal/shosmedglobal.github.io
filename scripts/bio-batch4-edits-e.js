/**
 * Batch 4 review, part E: displayed Q49-Q60 (bio-179 .. bio-190).
 * Includes the Q58 mechanism rewrite and the Q60 stem repair.
 */
'use strict';

const GENERIC_ENDO =
  '<ul><li>Hormones are chemical messengers that travel through the blood to target cells; they can be peptide/protein (hydrophilic, bind surface receptors) or steroid (lipophilic, enter cells and bind intracellular receptors).</li>'
  + '<li>The hypothalamic-pituitary axis is the master regulatory system - the hypothalamus controls the pituitary, which in turn controls peripheral endocrine glands.</li>'
  + '<li>Negative feedback is the primary mechanism regulating hormone levels: high hormone levels inhibit further release from upstream glands.</li></ul>';

// The repeated digestive block, which groups bile with agents that chemically
// break food down. Bile emulsifies; it does not hydrolyse.
const GENERIC_DIGEST =
  '<ul><li>Digestion involves mechanical breakdown (chewing, peristalsis) and chemical breakdown (enzymes, acid, bile) of food into absorbable molecules.</li>'
  + '<li>The small intestine is the primary site of nutrient absorption - its enormous surface area (villi and microvilli) maximizes absorption efficiency.</li>'
  + '<li>The liver, gallbladder, and pancreas are accessory organs that contribute bile and digestive enzymes to the small intestine.</li></ul>';

const points = items => '<ul>' + items.map(t => '<li>' + t + '</li>').join('') + '</ul>';

module.exports = [

// Q49 bio-179: name the late distal nephron, and stop implying that water
// automatically follows sodium regardless of ADH.
{
  q: 49, id: 'bio-179', expectLetter: 'C',
  optionFull: [[2, 'Late distal tubule and collecting duct']],
  explanation: [
    ['<h4>Correct Answer: C) Distal convoluted tubule and collecting duct</h4><p>Aldosterone, a mineralocorticoid produced by the zona glomerulosa of the adrenal cortex, acts on principal cells in the distal convoluted tubule and collecting duct. It stimulates the synthesis and insertion of epithelial sodium channels (ENaC) and Na⁺/K⁺-ATPase pumps, promoting sodium reabsorption and potassium secretion. Water follows sodium osmotically, increasing blood volume and pressure.</p>',
     '<h4>Correct Answer: C) Late distal tubule and collecting duct</h4><p>Aldosterone is a mineralocorticoid produced by the zona glomerulosa of the adrenal cortex. It acts on principal cells of the late distal nephron, which includes the connecting tubule and the collecting duct, stimulating epithelial sodium channels (ENaC) and Na⁺/K⁺-ATPase so that sodium is reabsorbed and potassium secreted. Not every cell of the distal convoluted tubule is a principal cell, which is why the late distal nephron is the better description.</p>'
     + '<p>Sodium retention supports extracellular fluid volume. Water retention also depends on water availability and on renal water permeability, which is strongly regulated by ADH rather than by aldosterone.</p>'],
    ['<p><strong>B. Loop of Henle (descending limb):</strong> The loop of henle (descending limb) establishes the medullary concentration gradient; descending limb is water-permeable, ascending limb actively transports Na+/Cl-; this is not the primary site described.</p>',
     '<p><strong>B. Loop of Henle (descending limb):</strong> The descending limb is water-permeable but does not actively transport salt; it is the thick ascending limb that actively transports Na⁺ and Cl⁻ and so helps build the medullary concentration gradient. Neither limb is the site of aldosterone action.</p>'],
    [GENERIC_ENDO, points([
      'Aldosterone increases sodium reabsorption and potassium secretion in the late distal nephron.',
      'ADH, not aldosterone, principally regulates how water-permeable the collecting duct is.',
      'Angiotensin II and a raised plasma potassium are the important stimuli for aldosterone release.',
    ])],
  ],
},

// Q50 bio-180: thyroid hormone uptake uses transport proteins, and T4 is
// commonly converted to the more active T3.
{
  q: 50, id: 'bio-180', expectLetter: 'D',
  explanation: [
    ['<p><strong>C. Thyroxine (T4):</strong> Thyroxine (T4) is an iodinated amino acid derivative synthesized from tyrosine residues on thyroglobulin in the thyroid gland. Although T4 is lipophilic enough to cross cell membranes (like steroids), it is not derived from cholesterol and is classified as an amine hormone. Its mechanism of action involves binding to nuclear thyroid hormone receptors.</p>',
     '<p><strong>C. Thyroxine (T4):</strong> Thyroxine is an iodinated tyrosine derivative, not a cholesterol-derived steroid. Thyroid hormones enter cells through transport proteins rather than simply diffusing across the membrane, and T4 commonly acts after conversion to T3, which binds nuclear thyroid-hormone receptors.</p>'],
    [GENERIC_ENDO, points([
      'Steroid hormones are derived from cholesterol.',
      'Insulin is a peptide hormone and epinephrine is a catecholamine, so neither is a steroid.',
      'Thyroid hormones are amino-acid derivatives that act on intracellular receptors, which shows that chemical class and receptor location are not the same classification.',
    ])],
  ],
},

// Q51 bio-181: physiological glucagon is not well supported as a direct
// stimulus of adipose lipolysis in humans.
{
  q: 51, id: 'bio-181', expectLetter: 'A',
  explanation: [
    ['<p><strong>D. Lipogenesis in adipose tissue:</strong> Lipogenesis (fat synthesis) in adipose tissue is an anabolic process stimulated by insulin during fed states. Insulin promotes the conversion of excess glucose to fatty acids and their storage as triglycerides. Glucagon has the opposite effect: it stimulates lipolysis (fat breakdown) in adipose tissue, releasing fatty acids for energy production.</p>',
     '<p><strong>D. Lipogenesis in adipose tissue:</strong> Insulin promotes fat storage in the fed state, converting excess glucose into fatty acids stored as triglycerides. Glucagon&rsquo;s principal blood-glucose-raising effects are hepatic glycogen breakdown and glucose production, not stimulation of adipose fat synthesis. During fasting, the mobilization of fat from adipose tissue owes more to falling insulin and to catecholamine signalling.</p>'],
    [GENERIC_ENDO, points([
      'Pancreatic alpha cells release glucagon when blood glucose falls.',
      'Glycogenolysis breaks down stored glycogen, while gluconeogenesis makes new glucose from non-carbohydrate precursors.',
      'The liver can release glucose into the blood, which is what raises blood glucose; muscle cannot.',
    ])],
  ],
},

// Q52 bio-182: "before puberty" and "before epiphyseal closure" are not
// interchangeable, and not all dwarfism results from GH deficiency.
{
  q: 52, id: 'bio-182', expectLetter: 'A',
  optionFull: [[2, 'Short stature due to childhood GH deficiency']],
  headingsGone: ['C. Dwarfism:'],
  explanation: [
    ['Dwarfism results from GH deficiency in childhood, and Cushing syndrome is caused by excess cortisol.</p>',
     'Short stature due to childhood GH deficiency is the opposite hormonal problem, and Cushing syndrome results from cortisol excess rather than GH excess.</p>'],
    ['<p><strong>B. Acromegaly:</strong> If gh excess occurs after epiphyseal closure (in adults), it causes acromegaly, with enlargement of hands, feet, jaw, and visceral organs, but not increased height.</p>',
     '<p><strong>B. Acromegaly:</strong> Acromegaly is what GH excess causes once the epiphyseal plates have closed: hands, feet, jaw and some internal organs enlarge, but height does not increase. The stem specifies that the plates are still open.</p>'],
    ['<p><strong>C. Dwarfism:</strong> Dwarfism results from gh deficiency in childhood, and cushing syndrome is caused by excess cortisol.</p>',
     '<p><strong>C. Short stature due to childhood GH deficiency:</strong> Too little GH in childhood can impair growth, which is the opposite of the excess described in the stem. Note also that GH deficiency is only one of several causes of short stature.</p>'],
    ['<p><strong>D. Cushing syndrome:</strong> Dwarfism results from gh deficiency in childhood, and cushing syndrome is caused by excess cortisol.</p>',
     '<p><strong>D. Cushing syndrome:</strong> Cushing syndrome results from cortisol excess, not GH excess, and presents with features such as central obesity, a rounded face and skin changes.</p>'],
    [GENERIC_ENDO, points([
      'Many of GH&rsquo;s growth effects are mediated by IGF-1.',
      'Open epiphyseal growth plates allow the long bones to lengthen, which is why GH excess then increases height.',
      'Once the plates are closed, GH excess enlarges tissues without adding height.',
    ])],
    ['<p class=\'exp-key\'>Bottom Line: GH excess before puberty causes gigantism (proportional overgrowth); after puberty it causes acromegaly (appositional bone growth).</p>',
     '<p class=\'exp-key\'>Bottom Line: GH excess before epiphyseal plate closure causes gigantism with increased linear growth; after closure it causes acromegaly without increased height.</p>'],
  ],
},

// Q53 bio-183: iodination happens at the apical/colloid interface in the
// follicular lumen, not simply "within the follicular cells".
{
  q: 53, id: 'bio-183', expectLetter: 'C',
  explanation: [
    ['<p>Thyroid hormones T3 and T4 are synthesized by attaching iodine atoms to tyrosine residues on the thyroglobulin protein within the thyroid follicular cells. T4 contains four iodine atoms and T3 contains three. Iodine deficiency leads to inadequate thyroid hormone production, causing the pituitary to release excess TSH, which stimulates thyroid enlargement (goiter).',
     '<p>Follicular cells make thyroglobulin and release it into the follicle&rsquo;s colloid. There, iodine is added to tyrosine residues, which are coupled to form T3 and T4 while still attached to thyroglobulin. The hormones are later released from the protein and secreted into the blood. T4 contains four iodine atoms and T3 contains three. Sufficient iodine deficiency can reduce thyroid hormone production, which removes negative feedback and lets the pituitary release more TSH; sustained TSH stimulation can enlarge the thyroid, producing a goiter. Not every goiter is caused by iodine deficiency.'],
    [GENERIC_ENDO, points([
      'T3 carries three iodine atoms and T4 carries four, which is where the names come from.',
      'Synthesis uses iodinated tyrosine residues on thyroglobulin, in the colloid of the follicle.',
      'If hormone production falls far enough, loss of negative feedback raises TSH.',
    ])],
  ],
},

// Q54 bio-184: the distractors repeated one sentence between them.
{
  q: 54, id: 'bio-184', expectLetter: 'A',
  explanation: [
    ['<p><strong>B. Follicular cells:</strong> Follicular cells produce T3 and T4.</p>',
     '<p><strong>B. Follicular cells:</strong> Follicular cells are the main thyroid cell type, and they produce the thyroid hormones T3 and T4, not calcitonin.</p>'],
    ['<p><strong>C. Chief cells:</strong> Chief cells and oxyphil cells are found in the parathyroid glands.</p>',
     '<p><strong>C. Chief cells:</strong> Chief cells belong to the parathyroid glands, where they produce parathyroid hormone. PTH raises blood calcium, which is the opposite direction from calcitonin.</p>'],
    ['<p><strong>D. Oxyphil cells:</strong> Chief cells and oxyphil cells are found in the parathyroid glands.</p>',
     '<p><strong>D. Oxyphil cells:</strong> Oxyphil cells are a second cell type of the parathyroid glands, distinct from the thyroid C cells that make calcitonin.</p>'],
    [GENERIC_ENDO, points([
      'Thyroid C cells, also called parafollicular cells, produce calcitonin.',
      'Thyroid follicular cells produce T3 and T4.',
      'Parathyroid chief cells produce PTH. Keeping the thyroid and parathyroid glands distinct is the point of this question.',
    ])],
  ],
},

// Q55 bio-185: sound item; generic block only.
{
  q: 55, id: 'bio-185', expectLetter: 'A',
  explanation: [
    [GENERIC_ENDO, points([
      'Hypothalamic releasing and inhibiting hormones travel through portal blood to the anterior pituitary.',
      'The portal route delivers those signals locally and in high concentration, rather than diluting them in the general circulation.',
      'Posterior pituitary hormones are different: they are released from hypothalamic axon terminals in the gland itself.',
    ])],
  ],
},

// Q56 bio-186: pH 6.8-7.0 is near neutral, not slightly alkaline.
{
  q: 56, id: 'bio-186', expectLetter: 'D',
  explanation: [
    ['It works optimally at the slightly alkaline pH of saliva (pH 6.8–7.0) and is inactivated in the acidic environment of the stomach. Pepsin digests proteins in the stomach, and trypsin digests proteins in the small intestine.</p>',
     'It works best near neutral pH, around 6.8 to 7.0, which is the pH of saliva. As the bolus is acidified in the stomach, salivary amylase is progressively inhibited, so starch digestion pauses until pancreatic amylase takes over in the small intestine.</p>'],
    ['<p><strong>A. Pepsin:</strong> Pepsin digests proteins in the stomach, and trypsin digests proteins in the small intestine.</p>',
     '<p><strong>A. Pepsin:</strong> Pepsin begins protein digestion in the stomach, where the acidic environment suits it. It does not act on starch.</p>'],
    ['<p><strong>B. Trypsin:</strong> Pepsin digests proteins in the stomach, and trypsin digests proteins in the small intestine.</p>',
     '<p><strong>B. Trypsin:</strong> Trypsin is a pancreatic protease that continues protein digestion in the small intestine. It is neither a carbohydrate enzyme nor active in the mouth.</p>'],
    [GENERIC_DIGEST, points([
      'Salivary amylase begins starch digestion in the mouth.',
      'It cleaves alpha-1,4 bonds, producing maltose and shorter carbohydrate fragments.',
      'Pancreatic amylase and intestinal brush-border enzymes continue carbohydrate digestion in the small intestine.',
    ])],
  ],
},

// Q57 bio-187: the stem asks for an organ, and the duodenum is an important
// absorptive segment rather than a purely digestive one.
{
  q: 57, id: 'bio-187', expectLetter: 'C',
  optionFull: [[2, 'Small intestine']],
  explanation: [
    ['<h4>Correct Answer: C) Jejunum and ileum of the small intestine</h4><p>The small intestine, particularly the jejunum and ileum, is the primary site of nutrient absorption. Its enormous surface area is enhanced by circular folds (plicae circulares), villi, and microvilli (brush border), increasing the absorptive area approximately 600-fold. The jejunum absorbs most carbohydrates, amino acids, and fatty acids, while the ileum specifically absorbs vitamin B12 and bile salts. The large intestine primarily absorbs water and electrolytes.</p>',
     '<h4>Correct Answer: C) Small intestine</h4><p>The majority of nutrient absorption occurs in the small intestine, across all three of its segments. Circular folds, villi and microvilli together give it a very large absorptive surface. The jejunum absorbs much of the nutrient load; the terminal ileum is important for vitamin B12 bound to intrinsic factor and for recovering bile salts; and the duodenum contributes too, including absorption of iron and calcium. The large intestine primarily absorbs water and electrolytes.</p>'],
    ['<p><strong>B. Duodenum only:</strong> The duodenum is the first and shortest segment of the small intestine (~25 cm). While important digestive processes occur here (mixing with bile and pancreatic enzymes, neutralization of gastric acid), the duodenum is primarily a site of digestion rather than absorption. The bulk of nutrient absorption occurs downstream in the jejunum and ileum, which are much longer and have greater surface area.</p>',
     '<p><strong>B. Duodenum only:</strong> The duodenum is an important absorptive segment, including for iron and calcium, as well as the site where chyme is mixed with bile and pancreatic secretions. The problem with this option is the word "only": it excludes the jejunum and ileum, which together absorb the bulk of the nutrient load.</p>'],
    [GENERIC_DIGEST, points([
      'Most nutrients are absorbed in the small intestine.',
      'Circular folds, villi and microvilli multiply the surface available for absorption.',
      'Different segments specialize in particular nutrients without being the only place those nutrients can be absorbed.',
    ])],
  ],
},

// Q58 bio-188: SUBSTANTIAL MECHANISM CORRECTION. Emulsified fat droplets are
// not micelles; and bile does contribute bicarbonate, so "bicarbonate from
// the pancreas, not bile" is wrong as an absolute.
{
  q: 58, id: 'bio-188', expectLetter: 'D',
  explanation: [
    ['<p>Bile salts are amphipathic molecules produced by hepatocytes and stored in the gallbladder. They emulsify large fat globules into smaller droplets (micelles), dramatically increasing the surface area available for pancreatic lipase to digest triglycerides. Bile does not contain digestive enzymes itself. Bicarbonate from the pancreas neutralizes gastric acid, not bile. Bile salts are recycled through the enterohepatic circulation.</p>',
     '<p>Bile is made by the liver and stored and concentrated in the gallbladder. Bile salts help emulsify dietary fat into smaller droplets, increasing the surface available to pancreatic lipase. After fat digestion, bile salts also form mixed micelles that carry fatty acids, monoglycerides and fat-soluble vitamins toward the intestinal surface for absorption. Emulsified droplets and mixed micelles are not the same structures: the first exposes triglyceride to lipase, the second ferries the products of digestion. Bile contains no digestive enzymes. Most bile salts are recovered in the terminal ileum and returned to the liver.</p>'],
    ['Brush border peptidases then break dipeptides and tripeptides into individual amino acids for absorption. Bile has no enzymatic activity.</p>',
     'Bile has no enzymatic activity of its own.</p>'],
    ['<p><strong>C. Neutralize stomach acid in the duodenum:</strong> Neutralization of stomach acid in the duodenum is primarily accomplished by bicarbonate-rich secretions from the pancreas, stimulated by the hormone secretin. Bile is slightly alkaline and may contribute marginally to buffering, but the pancreatic bicarbonate is the main neutralizing agent that raises duodenal pH for optimal enzyme function.</p>',
     '<p><strong>C. Neutralize stomach acid in the duodenum:</strong> Bicarbonate-rich pancreatic secretions provide a major contribution to neutralizing gastric acid in the duodenum. Bile also contributes alkaline fluid, but its main function in fat digestion is the emulsification described in D.</p>'],
    [GENERIC_DIGEST, points([
      'Emulsified droplets increase the surface area that pancreatic lipase can act on.',
      'Mixed micelles then help deliver the products of fat digestion to the absorptive surface.',
      'Bile aids digestion without enzymatically breaking the bonds in triglycerides itself.',
    ])],
    ['<p class=\'exp-key\'>Bottom Line: Bile emulsifies dietary fats, enabling efficient lipase digestion; bile salts are recycled via the enterohepatic circulation.</p>',
     '<p class=\'exp-key\'>Bottom Line: Bile salts support fat digestion by emulsifying droplets and support fat absorption by forming mixed micelles.</p>'],
  ],
},

// Q59 bio-189: the old option C was scientifically defensible, since
// physiological CCK can potentiate amino-acid-induced insulin secretion.
{
  q: 59, id: 'bio-189', expectLetter: 'A',
  optionFull: [[2, 'Accelerates gastric emptying']],
  headingsGone: ['C. Stimulates insulin release from the pancreas:'],
  explanation: [
    ['<p><strong>C. Stimulates insulin release from the pancreas:</strong> While some studies show CCK may have a modest incretin-like effect, stimulating insulin release is primarily the role of incretins such as GLP-1 (glucagon-like peptide-1) and GIP (glucose-dependent insulinotropic peptide), which are released from intestinal cells in response to nutrients. The primary actions of CCK target the gallbladder and exocrine pancreas.</p>',
     '<p><strong>C. Accelerates gastric emptying:</strong> CCK generally slows gastric emptying, helping limit the rate at which fat-containing chyme enters the small intestine. Accelerating it would work against the digestion CCK is coordinating.</p>'],
    [GENERIC_DIGEST, points([
      'Products of fat and protein digestion stimulate the intestinal I cells that release CCK.',
      'CCK contracts the gallbladder and promotes secretion of enzyme-rich pancreatic juice.',
      'CCK also slows gastric emptying, giving the duodenum time to deal with what it has already received.',
    ])],
  ],
},

// Q60 bio-190: the original stem asked which structure prevents food entering
// the trachea, and the vocal folds do that too, so B was defensible.
{
  q: 60, id: 'bio-190', expectLetter: 'D',
  stemFull: 'Which structure folds backward over the laryngeal inlet during swallowing?',
  explanationFull:
    '<h4>Correct Answer: D) Epiglottis</h4>'
    + '<p>During swallowing, the larynx moves upward and forward, and the epiglottis inverts over the laryngeal inlet to help direct the food bolus away from the airway. Airway protection is coordinated rather than the work of one structure: the vocal folds also close at the glottis and breathing briefly pauses. The soft palate elevates to prevent food entering the nasopharynx. The whole sequence is coordinated by the swallowing centre in the medulla.</p>'
    + '<h4>Why the other choices are wrong:</h4>'
    + '<p><strong>A. Uvula:</strong> The uvula is part of the soft-palate region involved in separating the nasopharynx during swallowing. It does not fold over the laryngeal inlet.</p>'
    + '<p><strong>B. Vocal cords:</strong> The vocal folds close the glottis and contribute directly to airway protection. They do not form the flap that folds over the laryngeal inlet.</p>'
    + '<p><strong>C. Soft palate:</strong> The soft palate rises to close the nasopharynx, rather than folding over the laryngeal inlet.</p>'
    + '<h4>Key Educational Points:</h4>'
    + points([
      'The epiglottis inverts over the laryngeal inlet during swallowing.',
      'Vocal-fold closure also protects the airway, so protection is layered rather than resting on one structure.',
      'Soft-palate elevation protects the nasopharynx, which is a different opening from the airway below.',
    ])
    + '<p class=\'exp-key\'>Bottom Line: The epiglottis folds over the laryngeal inlet during swallowing as part of coordinated airway protection.</p>',
},

];
