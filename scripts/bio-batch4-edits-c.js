/**
 * Batch 4 review, part C: displayed Q25-Q36 (bio-154 .. bio-165).
 * Includes the Q31 substantial feedback repair (duplicate C, missing D) and
 * the Q27 mismatched C feedback.
 */
'use strict';

const GENERIC_CARDIO =
  '<ul><li>The heart functions as a double pump: the right side pumps deoxygenated blood to the lungs (pulmonary circuit), and the left side pumps oxygenated blood to the body (systemic circuit).</li>'
  + '<li>Cardiac output equals heart rate multiplied by stroke volume; it is regulated by the autonomic nervous system, hormones, and intrinsic mechanisms (Frank-Starling law).</li>'
  + '<li>The cardiac conduction system (SA node, AV node, Bundle of His, Purkinje fibers) coordinates rhythmic contraction without external nerve stimulation.</li></ul>';

// The repeated nervous-system block, which also labels acetylcholine as
// simply excitatory. Removing the block removes that claim.
const GENERIC_NEURO =
  '<ul><li>The nervous system is divided into the CNS (brain and spinal cord) and PNS (cranial and spinal nerves); the PNS further divides into somatic (voluntary) and autonomic (involuntary) divisions.</li>'
  + '<li>Action potentials propagate along neurons via sequential depolarization; myelination increases conduction speed through saltatory conduction at nodes of Ranvier.</li>'
  + '<li>Neurotransmitters are released at synapses and bind to receptors on postsynaptic cells - excitatory (e.g., glutamate, acetylcholine) or inhibitory (e.g., GABA, glycine).</li></ul>';

const points = items => '<ul>' + items.map(t => '<li>' + t + '</li>').join('') + '</ul>';

module.exports = [

// Q25 bio-154: the distractor is wrong because it does not match the supplied
// numbers, not because 3.5 L/min necessarily means disease.
{
  q: 25, id: 'bio-154', expectLetter: 'D',
  explanation: [
    ['A value of 3.5 L/min would be abnormally low, potentially indicating heart failure or severe hypovolemia. Normal resting cardiac output is approximately 4.5–5.5 L/min in adults.</p>',
     'A value of 3.5 L/min simply does not follow from the heart rate and stroke volume given in the question. Resting cardiac output also varies with body size and circumstances, so a single number out of context does not identify a disease.</p>'],
    [GENERIC_CARDIO, points([
      'Cardiac output = heart rate &times; stroke volume.',
      'The units cancel neatly: mL/beat &times; beats/min gives mL/min.',
      'Divide mL/min by 1,000 to convert to L/min: 5,040 mL/min is about 5.0 L/min.',
    ])],
  ],
},

// Q26 bio-155: sound item; generic block only.
{
  q: 26, id: 'bio-155', expectLetter: 'A',
  explanation: [
    [GENERIC_CARDIO, points([
      'Total capillary cross-sectional area is large because the capillaries are arranged in parallel, not because any one of them is wide.',
      'At a given total flow, a larger total cross-sectional area means a lower average velocity.',
      'Slow passage through the capillary bed is functionally useful: it leaves time for exchange.',
    ])],
  ],
},

// Q27 bio-156: the C feedback discussed increased heart rate WITH
// vasoconstriction, although C pairs increased heart rate with vasodilation.
{
  q: 27, id: 'bio-156', expectLetter: 'A',
  explanation: [
    ['<p><strong>C. Increased heart rate and vasodilation:</strong> Increased heart rate and vasoconstriction is the response to low blood pressure (via the baroreceptor reflex), not high blood pressure. When blood pressure drops, baroreceptor firing decreases, which disinhibits the sympathetic nervous system, leading to increased heart rate and vasoconstriction to restore blood pressure. The response to high blood pressure is the opposite.</p>',
     '<p><strong>C. Increased heart rate and vasodilation:</strong> Vasodilation fits the response to a rise in blood pressure, but the heart rate should decrease, not increase. This option gets half of the reflex right and half of it backwards.</p>'],
    ['<p><strong>D. Decreased heart rate and vasoconstriction:</strong> Decreased heart rate combined with vasoconstriction would be a contradictory physiological response. In the baroreceptor reflex, heart rate and vascular tone change in the same direction: both decrease with high BP (parasympathetic activation and sympathetic withdrawal) or both increase with low BP (sympathetic activation). Decreased heart rate with vasoconstriction does not represent a coherent reflex response.</p>',
     '<p><strong>D. Decreased heart rate and vasoconstriction:</strong> The slowing is right, but the vasoconstriction is not. In this reflex, sympathetic vasoconstrictor activity falls when pressure rises, so the vessels dilate rather than constrict.</p>'],
    [GENERIC_CARDIO, points([
      'A rise in arterial pressure increases baroreceptor firing from the carotid sinus and aortic arch.',
      'Increased vagal activity slows the heart.',
      'Reduced sympathetic vasoconstrictor tone allows the vessels to dilate. The dilation comes from sympathetic withdrawal rather than directly from the vagus.',
    ])],
  ],
},

// Q28 bio-157: artery and vein names describe direction of flow, not oxygen
// content, so the umbilical vessels do not reverse any convention.
{
  q: 28, id: 'bio-157', expectLetter: 'A',
  explanation: [
    ['permits oxygenated blood returning from the placenta via the inferior vena cava to bypass the non-functional lungs.',
     'permits oxygen-rich blood returning from the placenta via the inferior vena cava to bypass lungs that are not yet performing gas exchange. The fetal shunts divert most, though not all, of the blood that would otherwise go to the lungs.'],
    ['This is a common exam trick-remember that in the umbilical cord, arteries carry deoxygenated blood (away from the fetus) and the vein carries oxygenated blood (toward the fetus), which is the reverse of systemic naming conventions.</p>',
     'Note that this does not reverse any naming convention: arteries carry blood away from the heart and veins carry it toward the heart, and the names say nothing about oxygen content. The umbilical vein carries relatively oxygen-rich placental blood toward the fetus, while the umbilical arteries carry less oxygenated blood back to the placenta.</p>'],
    ["<p class='exp-key'>Bottom Line: The foramen ovale and ductus arteriosus are fetal shunts that divert blood away from the non-functional lungs.</p>",
     "<p class='exp-key'>Bottom Line: The foramen ovale and ductus arteriosus are fetal shunts that divert most blood away from lungs that are not yet performing pulmonary gas exchange.</p>"],
    [GENERIC_CARDIO, points([
      'The placenta, not the lung, performs gas exchange before birth.',
      'The foramen ovale lets blood pass from the right atrium directly to the left atrium.',
      'The ductus arteriosus connects the pulmonary artery to the aorta, so blood bypasses the lungs a second way.',
    ])],
  ],
},

// Q29 bio-158: specify the adult context, and stop describing the liver's
// fetal role as merely "a smaller amount".
{
  q: 29, id: 'bio-158', expectLetter: 'D',
  stemFull: 'In a healthy adult, erythropoietin, the hormone that stimulates red blood cell production, is primarily produced by which organ?',
  explanation: [
    ['The liver produces a smaller amount of EPO, mainly during fetal development.</p>',
     'The liver is the main source before birth, and it continues to contribute a smaller share after birth.</p>'],
    [GENERIC_CARDIO, points([
      'Reduced oxygen delivery to the kidney stimulates renal EPO production.',
      'EPO travels in the blood and acts on erythroid precursors in the bone marrow.',
      'The kidney makes the signal; the marrow makes the red cells. Mixing up signal and target is the trap in this question.',
    ])],
  ],
},

// Q30 bio-159: sound item; generic block only.
{
  q: 30, id: 'bio-159', expectLetter: 'A',
  explanation: [
    [GENERIC_CARDIO, points([
      'S1 is associated with closure of the mitral and tricuspid valves at the start of ventricular systole.',
      'S2 is associated with closure of the aortic and pulmonary valves.',
      'S2 therefore marks the end of ventricular systole and the beginning of ventricular diastole.',
    ])],
  ],
},

// Q31 bio-160: SUBSTANTIAL FEEDBACK REPAIR. The main explanation contradicted
// itself about "the closer approximation", there were TWO C entries (one
// mislabelled "C. 93 mmHg"), and D had no feedback at all.
{
  q: 31, id: 'bio-160', expectLetter: 'B',
  stemFull: 'A person&rsquo;s blood pressure is measured at 120/80 mmHg at a normal resting heart rate. What is the approximate mean arterial pressure (MAP)?',
  explanationFull:
    '<h4>Correct Answer: B) 93 mmHg</h4>'
    + '<p>Mean arterial pressure (MAP) is the average arterial pressure over a cardiac cycle. At a normal resting heart rate, it can be estimated as diastolic pressure plus one-third of pulse pressure. Here, pulse pressure = 120 &minus; 80 = 40 mmHg, so MAP &asymp; 80 + 40/3 = 93.3 mmHg, which rounds to 93 mmHg. Diastole lasts longer than systole at rest, so the estimate weights diastolic pressure more heavily.</p>'
    + '<h4>Why the other choices are wrong:</h4>'
    + '<p><strong>A. 100 mmHg:</strong> This is the simple arithmetic mean of 120 and 80. It does not account for the longer time spent in diastole at rest.</p>'
    + '<p><strong>C. 80 mmHg:</strong> This is the diastolic pressure alone, not the average across the cardiac cycle.</p>'
    + '<p><strong>D. 87 mmHg:</strong> This does not follow from the standard resting estimate: 80 plus one-third of 40 is approximately 93, not 87.</p>'
    + '<h4>Key Educational Points:</h4>'
    + points([
      'Pulse pressure = systolic minus diastolic pressure.',
      'At rest, MAP &asymp; diastolic pressure + one-third of pulse pressure.',
      'MAP is a time average across the cardiac cycle, so it is not normally the simple midpoint of the two readings.',
    ])
    + '<p class=\'exp-key\'>Bottom Line: For 120/80 mmHg at a normal resting heart rate, estimated MAP is approximately 93 mmHg.</p>',
},

// Q32 bio-161: sound item; generic block only.
{
  q: 32, id: 'bio-161', expectLetter: 'A',
  explanation: [
    [GENERIC_CARDIO, points([
      'Albumin is the main contributor to plasma oncotic pressure, because it is both abundant and relatively small.',
      'Plasma proteins that stay inside the vessel draw water with them, favouring retention of fluid in the vascular space.',
      'A low plasma albumin can therefore contribute to oedema.',
    ])],
  ],
},

// Q33 bio-162: chloride-channel opening does not always mean influx and
// hyperpolarization; the effect depends on the ion gradients.
{
  q: 33, id: 'bio-162', expectLetter: 'A',
  explanation: [
    ['<p><strong>C. Ligand-gated chloride channels:</strong> Ligand-gated chloride channels are opened by the binding of inhibitory neurotransmitters such as GABA (via GABA-A receptors) or glycine. When these channels open, Cl- ions flow into the cell, causing hyperpolarization (inhibitory postsynaptic potential). They are involved in synaptic transmission, not in generating the action potential itself.</p>',
     '<p><strong>C. Ligand-gated chloride channels:</strong> These channels respond to neurotransmitters rather than to the voltage threshold that initiates the axonal action potential. They commonly reduce the likelihood of firing, by hyperpolarizing the membrane or by making excitatory inputs less effective. Either way they belong to synaptic transmission, not to the upstroke being asked about here.</p>'],
    [GENERIC_NEURO, points([
      'Rapid Na⁺ entry through voltage-gated sodium channels produces the upstroke.',
      'Voltage-gated potassium channels open more slowly and help repolarize the membrane.',
      'Voltage-gated channels respond to membrane voltage; ligand-gated channels respond to a chemical binding to them.',
    ])],
  ],
},

// Q34 bio-163: tighten to the adult brain (glycine matters in cord and
// brainstem), and stop calling acetylcholine simply excitatory.
{
  q: 34, id: 'bio-163', expectLetter: 'D',
  stemFull: 'Which neurotransmitter is the primary inhibitory transmitter in the adult brain?',
  explanation: [
    ['<p>GABA is the chief inhibitory neurotransmitter in the adult brain. It acts primarily through GABA-A receptors (ligand-gated chloride channels) and GABA-B receptors (G-protein coupled receptors). When GABA binds to GABA-A receptors, chloride ions enter the neuron, hyperpolarizing the membrane and reducing the likelihood of firing an action potential. Glutamate is the main excitatory neurotransmitter.</p>',
     '<p>GABA is the chief inhibitory neurotransmitter in the adult brain. GABA-A receptors are ligand-gated chloride channels: opening them increases chloride conductance, which usually reduces firing, either by hyperpolarizing the membrane or by making excitatory inputs less effective. GABA-B receptors work through a different, G-protein-mediated mechanism. Glutamate is the main excitatory neurotransmitter. (In the spinal cord and brainstem, glycine also has a major inhibitory role, which is why this question specifies the brain.)</p>'],
    ['<p><strong>C. Acetylcholine:</strong> Acetylcholine (ACh) is primarily an excitatory neurotransmitter in the CNS and is critical at the neuromuscular junction for skeletal muscle contraction. In the brain, cholinergic pathways are important for memory and learning. Degeneration of cholinergic neurons in the basal forebrain (nucleus basalis of Meynert) is associated with Alzheimer disease.</p>',
     '<p><strong>C. Acetylcholine:</strong> Acetylcholine&rsquo;s effect depends on the receptor it binds, so it is not intrinsically excitatory. It excites skeletal muscle through nicotinic receptors at the neuromuscular junction, but it slows the heart through muscarinic receptors. In the brain, cholinergic pathways matter for memory and learning, but acetylcholine is not the main inhibitory transmitter.</p>'],
    [GENERIC_NEURO, points([
      'GABA is the main inhibitory transmitter in the adult brain.',
      'Glutamate is the main excitatory transmitter.',
      'A transmitter&rsquo;s effect depends on its receptor and on the target cell, not on the transmitter alone.',
    ])],
  ],
},

// Q35 bio-164: "jump" taken literally is wrong; current spreads through the
// intervening axon, and myelin reduces leakage rather than preventing all
// ion movement.
{
  q: 35, id: 'bio-164', expectLetter: 'A',
  optionFull: [[0, 'Are regenerated at successive nodes of Ranvier as current spreads between them']],
  explanation: [
    ['<h4>Correct Answer: A) Jump from one node of Ranvier to the next</h4><p>In myelinated neurons, the myelin sheath insulates the axon and prevents ion flow across the membrane between nodes. Action potentials can only be generated at the nodes of Ranvier, where voltage-gated ion channels are concentrated. The current spreads passively through the myelinated segments and triggers a new action potential at each successive node. This \'jumping\' pattern (saltatory conduction) increases conduction velocity to 100 m/s or more.</p>',
     '<h4>Correct Answer: A) Are regenerated at successive nodes of Ranvier as current spreads between them</h4><p>Myelin reduces current leakage across the membrane and allows local current to spread rapidly along the axon. That current brings the next node of Ranvier to threshold, where a high density of voltage-gated channels regenerates the action potential. The signal therefore propagates quickly without having to be regenerated at every intervening patch of membrane.</p>'
     + '<p>"Jumping" is a useful image, but take it loosely: the current does pass through the axon between the nodes. What is concentrated at the nodes is the regeneration of the action potential. Some large myelinated axons can reach conduction velocities of around 100 m/s.</p>'],
    ['<p><strong>D. Require less sodium influx at each node:</strong> While myelinated axons do require less total sodium influx (since depolarization only occurs at nodes), this describes an energy efficiency advantage rather than the mechanism of increased speed. The actual reason for faster conduction is the leaping of electrical signals between nodes, not reduced ion flow at each node.</p>',
     '<p><strong>D. Require less sodium influx at each node:</strong> Myelinated axons do move less sodium in total, because the action potential is regenerated only at the nodes, and that is an energy saving. It does not follow that each individual node needs less sodium entry, and in any case the reason for the greater speed is the rapid spread of current between nodes. Note also that membrane voltage does change between the nodes; it is the regenerative action potential that is concentrated at them.</p>'],
    [GENERIC_NEURO, points([
      'Local current spreads through the axon between the nodes; it is not that nothing happens there.',
      'The action potential itself is regenerated at the nodes, where voltage-gated channels are concentrated.',
      'Myelin increases both the efficiency and the speed of conduction by reducing current leakage.',
    ])],
  ],
},

// Q36 bio-165: "via the vagus nerve" cannot cover pupillary constriction, and
// the A and B feedback were the same duplicated sentence.
{
  q: 36, id: 'bio-165', expectLetter: 'D',
  explanation: [
    ['<p>The parasympathetic division (via the vagus nerve) promotes \'rest and digest\' activities. It stimulates gastrointestinal motility, increases secretion of digestive enzymes and acid, slows heart rate, constricts pupils (miosis), and causes bronchoconstriction. The sympathetic nervous system produces the opposite effects: increased heart rate, bronchodilation, and pupil dilation.</p>',
     '<p>The parasympathetic division promotes "rest and digest" activities: it stimulates gastrointestinal motility and the secretion of digestive enzymes and acid, slows the heart rate, constricts the pupils (miosis), and causes bronchoconstriction. The sympathetic system produces the opposite effects.</p>'
     + '<p>Different parasympathetic pathways serve different organs. The vagus nerve carries many of the cardiac and gastrointestinal effects, while pupillary constriction travels with the oculomotor nerve (CN III).</p>'],
    ['<p><strong>A. Increased heart rate:</strong> The sympathetic nervous system produces the opposite effects: increased heart rate, bronchodilation, and pupil dilation.</p>',
     '<p><strong>A. Increased heart rate:</strong> Parasympathetic input normally slows the heart rate, through vagal muscarinic effects on the pacemaker. Speeding the heart up is a sympathetic effect.</p>'],
    ['<p><strong>B. Bronchodilation:</strong> The sympathetic nervous system produces the opposite effects: increased heart rate, bronchodilation, and pupil dilation.</p>',
     '<p><strong>B. Bronchodilation:</strong> The usual parasympathetic effect on the airways is bronchoconstriction, not dilation. Bronchodilation is associated with sympathetic and circulating adrenergic effects.</p>'],
    [GENERIC_NEURO, points([
      'Parasympathetic activation increases gastrointestinal motility and secretion.',
      'It slows the heart rate.',
      'Different parasympathetic pathways serve different organs: the vagus for much of the heart and gut, CN III for pupillary constriction.',
    ])],
  ],
},

];
