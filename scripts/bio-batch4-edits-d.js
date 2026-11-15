/**
 * Batch 4 review, part D: displayed Q37-Q48 (bio-166 .. bio-178).
 * Includes the Q41 substantial repair, the Q43 major rewrite, and the Q48
 * stem-ambiguity repair.
 */
'use strict';

const GENERIC_NEURO =
  '<ul><li>The nervous system is divided into the CNS (brain and spinal cord) and PNS (cranial and spinal nerves); the PNS further divides into somatic (voluntary) and autonomic (involuntary) divisions.</li>'
  + '<li>Action potentials propagate along neurons via sequential depolarization; myelination increases conduction speed through saltatory conduction at nodes of Ranvier.</li>'
  + '<li>Neurotransmitters are released at synapses and bind to receptors on postsynaptic cells - excitatory (e.g., glutamate, acetylcholine) or inhibitory (e.g., GABA, glycine).</li></ul>';

const GENERIC_ENDO =
  '<ul><li>Hormones are chemical messengers that travel through the blood to target cells; they can be peptide/protein (hydrophilic, bind surface receptors) or steroid (lipophilic, enter cells and bind intracellular receptors).</li>'
  + '<li>The hypothalamic-pituitary axis is the master regulatory system - the hypothalamus controls the pituitary, which in turn controls peripheral endocrine glands.</li>'
  + '<li>Negative feedback is the primary mechanism regulating hormone levels: high hormone levels inhibit further release from upstream glands.</li></ul>';

const points = items => '<ul>' + items.map(t => '<li>' + t + '</li>').join('') + '</ul>';

module.exports = [

// Q37 bio-166: the distractors should name each region's principal role
// without denying that it takes part in motor circuits at all.
{
  q: 37, id: 'bio-166', expectLetter: 'A',
  explanation: [
    ['While essential for survival, it does not coordinate voluntary movements or maintain balance.</p>',
     'It is essential for survival, but coordinating the timing and accuracy of voluntary movement is not its role.</p>'],
    ['It plays a role in consciousness, sleep-wake cycles, and attention, but it does not directly coordinate movement or balance.</p>',
     'It plays a role in consciousness, sleep-wake cycles and attention, and it does relay traffic within motor circuits, but it is not the structure that coordinates the timing and accuracy of movement.</p>'],
    [GENERIC_NEURO, points([
      'The cerebellum coordinates the timing, force and accuracy of voluntary movement.',
      'It integrates sensory feedback relevant to posture and balance.',
      'Cerebellar injury causes ataxia, uncoordinated movement, rather than directly abolishing muscle strength.',
    ])],
  ],
},

// Q38 bio-167: separate the route BETWEEN cells from the route THROUGH cell
// membranes, and do not make astrocytes the sole initiators of the barrier.
{
  q: 38, id: 'bio-167', expectLetter: 'A',
  explanation: [
    ['These tight junctions restrict paracellular transport, allowing only small lipophilic molecules and gases to cross freely. Astrocyte foot processes surround the capillaries and help maintain the BBB, but the structural barrier itself is the endothelium.',
     'The tight junctions restrict movement BETWEEN the endothelial cells. Gases and some lipid-soluble molecules can still cross THROUGH the cell membranes, and glucose and other required nutrients use specific transport systems. Astrocyte foot processes surround the capillaries and support barrier function, but the structural barrier itself is the endothelium.'],
    ['They help induce tight junction formation during development and regulate nutrient transport. However, astrocytes alone do not form the physical barrier; the endothelial tight junctions are the structural basis of the BBB.</p>',
     'They support barrier function and help regulate transport, but they are not the sole initiators of barrier formation, and they do not form the physical barrier themselves. The endothelial tight junctions are the structural basis of the BBB.</p>'],
    ['They are not involved in forming the blood-brain barrier.</p>',
     'They are not the endothelial barrier being tested here.</p>'],
    ['They play no structural role in the blood-brain barrier.</p>',
     'They are not the endothelial barrier being tested here either.</p>'],
    [GENERIC_NEURO, points([
      'Tight junctions between capillary endothelial cells are the physical basis of the barrier.',
      'Astrocytes support barrier function but do not constitute the barrier themselves.',
      'Selective transport systems carry glucose and other required substances into the brain, so the barrier is not simply a wall.',
    ])],
  ],
},

// Q39 bio-168: palatoglossus is the usual vagal exception, so "the vagus does
// not control tongue movement" is too broad.
{
  q: 39, id: 'bio-168', expectLetter: 'D',
  stemFull: 'Which cranial nerve supplies all intrinsic and most extrinsic muscles of the tongue?',
  explanation: [
    ['Damage to this nerve causes deviation of the tongue toward the side of the lesion upon protrusion.',
     'With a peripheral hypoglossal nerve lesion, the protruded tongue deviates toward the weak side.'],
    ['<p><strong>B. Vagus nerve (CN X):</strong> The vagus nerve (CN X) is the longest cranial nerve and has the widest distribution. It provides parasympathetic innervation to most thoracic and abdominal organs, controls laryngeal muscles important for voice production, and carries sensory information from the viscera. It does not control tongue movement.</p>',
     '<p><strong>B. Vagus nerve (CN X):</strong> The vagus supplies palatoglossus and many pharyngeal and laryngeal muscles, but the hypoglossal nerve supplies the other tongue muscles described here. The vagus also carries wide parasympathetic and visceral sensory functions.</p>'],
    [GENERIC_NEURO, points([
      'CN XII, the hypoglossal nerve, supplies most of the motor function of the tongue.',
      'CN X, the vagus, supplies palatoglossus, which is the usual exception.',
      'Motor supply to the tongue and taste sensation from it are different functions carried by different nerves.',
    ])],
  ],
},

// Q40 bio-169: beta-2 receptors are present in the heart; beta-1 is simply
// the principal receptor for the response being asked about.
{
  q: 40, id: 'bio-169', expectLetter: 'A',
  explanation: [
    ['This is why beta-2 agonists like salbutamol (albuterol) are used to treat asthma. They have minimal cardiac effects.</p>',
     'This is why beta-2 agonists such as salbutamol are used in asthma. Beta-2 receptors are also present in the heart, but beta-1 is the principal receptor for the norepinephrine response asked about here.</p>'],
    [GENERIC_ENDO.length ? GENERIC_NEURO : GENERIC_NEURO, points([
      'Beta-1 activation increases heart rate and the force of contraction.',
      'Cardiac muscarinic M2 activation, from the vagus, slows the heart rate.',
      'Which response you get depends on which receptor the transmitter reaches, not on the transmitter alone.',
    ])],
  ],
},

// Q41 bio-170: SUBSTANTIAL REPAIR. The question asked which equilibrium
// potential is CLOSEST to -70 mV, but the explanation put K+ at -90 and Cl-
// at -80 to -90, which does not make K+ uniquely closest. The explanation was
// in fact answering a different question: which permeability dominates.
{
  q: 41, id: 'bio-170', expectLetter: 'A',
  stemFull: 'In a typical neuron at rest, permeability to which ion through leak channels makes the largest contribution to the resting membrane potential?',
  explanationFull:
    '<h4>Correct Answer: A) Potassium (K⁺)</h4>'
    + '<p>At rest, a typical neuronal membrane is more permeable to potassium than to sodium. Potassium tends to leave the cell through leak channels, making the inside relatively negative. The electrical gradient that builds up opposes further potassium loss. Other ion permeabilities mean the resting voltage does not exactly equal the potassium equilibrium potential. The sodium-potassium pump maintains the concentration gradients and also makes a smaller direct electrical contribution.</p>'
    + '<h4>Why the other choices are wrong:</h4>'
    + '<p><strong>B. Sodium (Na⁺):</strong> Resting sodium permeability is lower. Sodium entry becomes especially important during the upstroke of a typical neuronal action potential.</p>'
    + '<p><strong>C. Calcium (Ca²⁺):</strong> Calcium is an important signaling ion, but calcium permeability is not normally the main determinant of resting voltage in a typical neuron.</p>'
    + '<p><strong>D. Chloride (Cl⁻):</strong> Chloride can influence and stabilize membrane voltage, and its concentration is regulated by transporters rather than being simply passively distributed. It is not the dominant resting leak permeability in the introductory neuronal model asked about here.</p>'
    + '<h4>Key Educational Points:</h4>'
    + points([
      'The resting voltage depends on the ion concentration gradients and on the relative permeability to each ion.',
      'Potassium leak is a major determinant of that voltage in a typical neuron.',
      'The Na⁺/K⁺ pump maintains the gradients and contributes a smaller direct electrical effect of its own.',
    ])
    + '<p class=\'exp-key\'>Bottom Line: High resting permeability to potassium makes a major contribution to the negative resting membrane potential.</p>',
},

// Q42 bio-171: A and B carried the same sentence.
{
  q: 42, id: 'bio-171', expectLetter: 'C',
  explanation: [
    ['<p><strong>A. Hypothalamus:</strong> The pons modifies the respiratory rhythm, and the hypothalamus integrates autonomic responses at a higher level, but the medulla is the direct regulatory center.</p>',
     '<p><strong>A. Hypothalamus:</strong> The hypothalamus integrates autonomic and homeostatic responses at a higher level, coordinating temperature, thirst, hunger and the stress response. It influences cardiovascular and respiratory activity indirectly, through the brainstem, rather than housing the direct control centres.</p>'],
    ['<p><strong>B. Pons:</strong> The pons modifies the respiratory rhythm, and the hypothalamus integrates autonomic responses at a higher level, but the medulla is the direct regulatory center.</p>',
     '<p><strong>B. Pons:</strong> The pons modifies the breathing rhythm that the medulla generates, smoothing the transition between inspiration and expiration. It adjusts the pattern rather than containing the primary cardiovascular and respiratory centres.</p>'],
    [GENERIC_NEURO, points([
      'Medullary networks participate in cardiovascular and respiratory regulation.',
      'The pons modifies the breathing rhythm rather than generating it.',
      'The hypothalamus coordinates broader homeostatic and autonomic responses at a higher level.',
    ])],
  ],
},

// Q43 bio-172: MAJOR REWRITE. The original did not state complete versus
// incomplete injury, neurological versus vertebral level, or time since
// injury; it overstated loss of function and ventilator dependence; and
// "cranial nerves are spared" does not reliably explain a nerve whose spinal
// motor neurons lie in the upper cervical cord. Replaced with a clear
// nerve-function question that tests the same anatomy.
{
  q: 43, id: 'bio-172', expectLetter: 'C',
  stemFull: 'Which of the following movements is primarily supplied by the spinal accessory nerve (cranial nerve XI)?',
  optionFull: [
    [1, 'Contraction of the diaphragm'],
    [2, 'Shoulder shrug'],
  ],
  headingsGone: ['B. Independent breathing using the diaphragm:'],
  explanationFull:
    '<h4>Correct Answer: C) Shoulder shrug</h4>'
    + '<p>The spinal accessory nerve supplies the trapezius and sternocleidomastoid muscles. The upper trapezius elevates the shoulder, so a shoulder shrug is commonly used to assess this nerve. The nerve&rsquo;s motor neurons arise in the upper cervical spinal cord, despite its classification as a cranial nerve.</p>'
    + '<h4>Why the other choices are wrong:</h4>'
    + '<p><strong>A. Voluntary movement of the hands:</strong> Hand muscles receive motor supply through peripheral nerves of the upper limb, not the accessory nerve.</p>'
    + '<p><strong>B. Contraction of the diaphragm:</strong> The diaphragm is supplied by the phrenic nerve, which receives fibers from C3 to C5.</p>'
    + '<p><strong>D. Voluntary movement of the legs:</strong> Leg muscles receive their motor supply through lumbar and sacral spinal nerves, not CN XI.</p>'
    + '<h4>Key Educational Points:</h4>'
    + points([
      'CN XI supplies the trapezius and sternocleidomastoid.',
      'The trapezius contributes to shoulder elevation, which is why shoulder shrug tests this nerve.',
      'The phrenic nerve, from C3 to C5, supplies the diaphragm.',
    ])
    + '<p class=\'exp-key\'>Bottom Line: CN XI supplies the trapezius, making shoulder shrug a useful test of accessory-nerve function.</p>',
},

// Q44 bio-174: both ADH and oxytocin are made in the supraoptic and
// paraventricular nuclei, so an exclusive one-hormone-one-nucleus assignment
// is wrong.
{
  q: 44, id: 'bio-174', expectLetter: 'C',
  explanation: [
    ['<p>ADH is synthesized in the hypothalamus (supraoptic nuclei) and stored in the posterior pituitary.',
     '<p>ADH is synthesized in the hypothalamus and stored in, and released from, the posterior pituitary. (Both ADH and oxytocin are made in the supraoptic and paraventricular nuclei, with different predominant distributions, so neither belongs exclusively to one nucleus.)'],
    ['<p><strong>A. Oxytocin:</strong> Oxytocin is indeed stored and released by the posterior pituitary (synthesized in the paraventricular nucleus of the hypothalamus), just like ADH.',
     '<p><strong>A. Oxytocin:</strong> Oxytocin is indeed stored and released by the posterior pituitary, having been synthesized in the hypothalamus, just like ADH.'],
    [GENERIC_ENDO, points([
      'High plasma osmolality, detected by hypothalamic osmoreceptors, stimulates ADH release.',
      'ADH increases water permeability of the collecting duct, so more water is reabsorbed and the urine becomes concentrated.',
      'Where a posterior pituitary hormone is synthesized and where it is released are different places: synthesis is hypothalamic, release is from the posterior pituitary.',
    ])],
  ],
},

// Q45 bio-175: thyroid eye disease is an autoimmune orbital process, not a
// consequence of the hypermetabolic state, and it is not unique in causing
// bulging eyes.
{
  q: 45, id: 'bio-175', expectLetter: 'C',
  explanation: [
    ['<p>Graves disease is an autoimmune condition in which thyroid-stimulating immunoglobulins (TSI) mimic TSH and stimulate the thyroid to produce excess T3 and T4. The symptoms-weight loss, tachycardia, heat intolerance, and exophthalmos (a feature unique to Graves disease)-result from the hypermetabolic state caused by excessive thyroid hormones. Hypothyroidism would present with opposite symptoms: weight gain, bradycardia, and cold intolerance.</p>',
     '<p>Graves disease is an autoimmune cause of hyperthyroidism. Antibodies stimulate the TSH receptor, increasing thyroid hormone production and causing features such as weight loss, tachycardia and heat intolerance. The associated thyroid eye disease results from autoimmune inflammation and tissue expansion in the orbit. Proptosis, or bulging eyes, is a characteristic clue in this presentation rather than a general effect of excess thyroid hormone, and bulging eyes have other causes too.</p>'],
    ['<p><strong>A. Hypothyroidism:</strong> Hypothyroidism would present with opposite symptoms: weight gain, bradycardia, and cold intolerance.</p>',
     '<p><strong>A. Hypothyroidism:</strong> Too little thyroid hormone slows metabolic activity, so the usual picture is weight gain, bradycardia and cold intolerance, which is the opposite of what the stem describes.</p>'],
    ['These symptoms are entirely different from those of hyperthyroidism.</p>',
     'That picture is quite different from the one in the stem, although some individual features can overlap.</p>'],
    [GENERIC_ENDO, points([
      'In Graves disease, stimulating TSH-receptor antibodies drive excess thyroid hormone production.',
      'Hyperthyroidism increases metabolic activity, giving weight loss, tachycardia and heat intolerance.',
      'Graves eye disease has a separate autoimmune tissue mechanism in the orbit, not simply a consequence of circulating hormone levels.',
    ])],
  ],
},

// Q46 bio-176: the same full list was repeated for B, C and D; and insulin
// does not drive glucose uptake in every tissue.
{
  q: 46, id: 'bio-176', expectLetter: 'A',
  explanation: [
    ['produce insulin, which lowers blood glucose by promoting glucose uptake into cells and glycogen synthesis.',
     'produce insulin, which lowers blood glucose by promoting glucose uptake, particularly into skeletal muscle and adipose tissue, and by promoting glycogen synthesis. Not every tissue requires insulin in order to take up glucose.'],
    ['<p><strong>B. Alpha cells:</strong> Alpha cells produce glucagon (raises blood glucose), delta cells secrete somatostatin (inhibits both insulin and glucagon), and pp cells produce pancreatic polypeptide.</p>',
     '<p><strong>B. Alpha cells:</strong> Alpha cells secrete glucagon, which raises blood glucose rather than lowering it.</p>'],
    ['<p><strong>C. Delta cells:</strong> Alpha cells produce glucagon (raises blood glucose), delta cells secrete somatostatin (inhibits both insulin and glucagon), and pp cells produce pancreatic polypeptide.</p>',
     '<p><strong>C. Delta cells:</strong> Delta cells secrete somatostatin, which inhibits the secretion of other islet hormones including insulin and glucagon.</p>'],
    ['<p><strong>D. PP cells:</strong> Alpha cells produce glucagon (raises blood glucose), delta cells secrete somatostatin (inhibits both insulin and glucagon), and pp cells produce pancreatic polypeptide.</p>',
     '<p><strong>D. PP cells:</strong> PP cells secrete pancreatic polypeptide, which is not the glucose-lowering hormone the question asks about.</p>'],
    [GENERIC_ENDO, points([
      'Beta cells produce insulin, the glucose-lowering islet hormone.',
      'Alpha cells produce glucagon, which raises blood glucose.',
      'Delta-cell somatostatin inhibits secretion of the other islet hormones.',
    ])],
  ],
},

// Q47 bio-177: sound item; generic block only.
{
  q: 47, id: 'bio-177', expectLetter: 'A',
  explanation: [
    [GENERIC_ENDO, points([
      'CRH from the hypothalamus stimulates the anterior pituitary to release ACTH.',
      'ACTH directly stimulates cortisol production in the adrenal cortex.',
      'Cortisol feeds back to reduce both CRH and ACTH, which is what makes this a closed loop.',
    ])],
  ],
},

// Q48 bio-178: the stem asks what is NOT a DIRECT action, but osteoclast
// activation is also indirect: PTH acts on osteoblast-lineage cells. Option A
// is replaced with a genuinely direct renal action.
{
  q: 48, id: 'bio-178', expectLetter: 'C',
  optionFull: [[0, 'Decreases phosphate reabsorption in the proximal tubule of the kidney']],
  headingsGone: ['A. Stimulates osteoclast activity to release calcium from bone:'],
  explanation: [
    ['<p>PTH does not directly act on the intestine. Instead, PTH stimulates the kidney to produce the active form of vitamin D (1,25-dihydroxyvitamin D/calcitriol), which then increases intestinal calcium absorption. PTH directly increases bone resorption via osteoclasts, enhances renal calcium reabsorption, and promotes phosphate excretion. The intestinal effect is therefore indirect, mediated through vitamin D.</p>',
     '<p>PTH raises blood calcium through actions on the kidney and bone. In the kidney it increases calcium reabsorption, decreases phosphate reabsorption, and stimulates production of calcitriol, the active form of vitamin D. Calcitriol then increases calcium absorption from the intestine, so the intestinal effect is indirect. PTH also promotes osteoclast-mediated bone resorption through signals from osteoblast-lineage cells; it does not directly activate osteoclasts.</p>'],
    ['<p><strong>A. Stimulates osteoclast activity to release calcium from bone:</strong> Stimulating osteoclast activity to release calcium from bone is indeed a direct action of PTH. PTH acts on osteoblasts (not osteoclasts directly), which then release RANKL to activate osteoclast differentiation and bone resorption, liberating calcium and phosphate into the bloodstream. This is one of the fastest mechanisms to raise blood calcium.</p>',
     '<p><strong>A. Decreases phosphate reabsorption in the proximal tubule of the kidney:</strong> PTH acts on the proximal tubule to reduce phosphate reabsorption, increasing phosphate excretion in the urine. This is a direct renal action, so it is not the answer to the NOT question.</p>'],
    [GENERIC_ENDO, points([
      'PTH promotes renal calcium retention and renal phosphate excretion.',
      'PTH stimulates the kidney to produce calcitriol, the active form of vitamin D.',
      'Calcitriol, not PTH itself, mediates the increase in intestinal calcium absorption.',
    ])],
    ['<p class=\'exp-key\'>Bottom Line: PTH raises blood calcium through direct actions on bone and kidney, and indirectly on the intestine via vitamin D activation.</p>',
     '<p class=\'exp-key\'>Bottom Line: PTH increases intestinal calcium absorption indirectly, by stimulating renal production of calcitriol.</p>'],
  ],
},

];
