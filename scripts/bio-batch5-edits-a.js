/**
 * Batch 5 review, part A: displayed Q1-Q12 (bio-191 .. bio-202).
 * Includes the Q3 and Q12 substantial repairs. The generic digestive block
 * covers Q1-Q5; Q6-Q12 already have individual blocks, which are retained
 * except where the review identifies a specific claim to correct.
 */
'use strict';

const GENERIC_DIGEST =
  '<ul><li>Digestion involves mechanical breakdown (chewing, peristalsis) and chemical breakdown (enzymes, acid, bile) of food into absorbable molecules.</li>'
  + '<li>The small intestine is the primary site of nutrient absorption - its enormous surface area (villi and microvilli) maximizes absorption efficiency.</li>'
  + '<li>The liver, gallbladder, and pancreas are accessory organs that contribute bile and digestive enzymes to the small intestine.</li></ul>';

const points = items => '<ul>' + items.map(t => '<li>' + t + '</li>').join('') + '</ul>';

module.exports = [

// Q1 bio-191: the gastrin feedback was a generic sentence lifted from the main
// explanation rather than a comparison.
{
  q: 1, id: 'bio-191', expectLetter: 'D',
  explanation: [
    ['<p><strong>B. Gastrin:</strong> Chief cells secrete pepsinogen, mucous cells produce the protective mucus-bicarbonate barrier, and g-cells secrete gastrin.</p>',
     '<p><strong>B. Gastrin:</strong> Gastrin is secreted by G cells, mainly in the gastric antrum. It stimulates gastric acid secretion, but parietal cells themselves secrete HCl and intrinsic factor.</p>'],
    [GENERIC_DIGEST, points([
      'Parietal cells secrete HCl and intrinsic factor.',
      'HCl provides an acidic environment for pepsin; intrinsic factor enables vitamin B12 absorption in the terminal ileum.',
      'Chief cells secrete pepsinogen, whereas G cells secrete gastrin.',
    ])],
  ],
},

// Q2 bio-192: "Only proteases are secreted as zymogens" is false (pancreatic
// pro-phospholipase A2 is a non-protease zymogen), and an enzyme is not
// secreted active merely because it could not damage the pancreas.
{
  q: 2, id: 'bio-192', expectLetter: 'C',
  explanation: [
    ['<p><strong>A. Pancreatic lipase:</strong> Pancreatic lipase and amylase are secreted in their active forms and do not require activation.</p>',
     '<p><strong>A. Pancreatic lipase:</strong> Pancreatic lipase is secreted in an active form and does not require activation in the duodenum. It digests triglycerides, working together with bile salts and colipase.</p>'],
    ['The reason it does not need zymogen protection is that amylase does not pose a danger to the pancreatic tissue itself, unlike proteases.</p>',
     'It is secreted in an active form, so unlike trypsinogen it needs no activation step in the duodenum.</p>'],
    ['<p><strong>D. Nuclease:</strong> Nucleases (DNase and RNase) from the pancreas digest nucleic acids (DNA and RNA) from ingested food into nucleotides. Like lipase and amylase, pancreatic nucleases are secreted in their active forms because they do not threaten the integrity of the pancreatic cells. Only proteases are secreted as zymogens to prevent self-digestion.</p>',
     '<p><strong>D. Nuclease:</strong> Pancreatic nucleases (DNase and RNase) digest dietary nucleic acids into nucleotides. Like lipase and amylase, they are secreted in active form. Trypsinogen is the one in this list that requires activation after it reaches the duodenum.</p>'],
    [GENERIC_DIGEST, points([
      'A zymogen is an inactive enzyme precursor; this helps prevent premature digestive activity.',
      'Brush-border enteropeptidase converts trypsinogen to trypsin in the small intestine.',
      'Trypsin activates additional trypsinogen and several other pancreatic zymogens.',
    ])],
  ],
},

// Q3 bio-193: SUBSTANTIAL REPAIR. The cecum feedback was corrupted, the item
// implied the ascending colon absorbs most water in the whole digestive
// tract, and it asserted a precise ranking of cecum versus ascending colon
// that the evidence does not establish.
{
  q: 3, id: 'bio-193', expectLetter: 'D',
  stemFull: 'Which region of the large intestine is the main site of water and electrolyte absorption?',
  optionFull: [
    [0, 'Rectum'],
    [3, 'Proximal colon, particularly the cecum and ascending colon'],
  ],
  headingsGone: ['A. Cecum:'],
  explanationFull:
    '<h4>Correct Answer: D) Proximal colon, particularly the cecum and ascending colon</h4>'
    + '<p>Most water entering the digestive tract is absorbed in the small intestine. The large intestine recovers much of the remaining water and electrolytes, especially in its proximal region. Sodium absorption helps create an osmotic gradient, so water follows into the body. This progressively changes liquid intestinal contents into more solid feces.</p>'
    + '<h4>Why the other choices are wrong:</h4>'
    + '<p><strong>A. Rectum:</strong> The rectum mainly stores feces before defecation. It is not the main region for colonic water absorption.</p>'
    + '<p><strong>B. Sigmoid colon:</strong> The sigmoid colon helps store and propel feces. Much of the colonic water absorption has already occurred upstream.</p>'
    + '<p><strong>C. Transverse colon:</strong> The transverse colon also absorbs water and electrolytes, but the proximal colon is the main absorptive region emphasized here.</p>'
    + '<h4>Key Educational Points:</h4>'
    + points([
      'The small intestine absorbs most gastrointestinal water.',
      'The proximal colon absorbs much of the water and electrolytes remaining in intestinal contents.',
      'Water follows osmotic gradients created by solute absorption; the distal bowel increasingly serves storage and propulsion functions.',
    ])
    + '<p class=\'exp-key\'>Bottom Line: The proximal colon absorbs much of the water that reaches the large intestine; most gastrointestinal water absorption has already occurred in the small intestine.</p>',
},

// Q4 bio-194: pH 6-7 is not alkaline.
{
  q: 4, id: 'bio-194', expectLetter: 'D',
  explanation: [
    ['that neutralizes the acidic chyme, raising the duodenal pH to approximately 6–7. This alkaline environment is necessary for the optimal activity of pancreatic enzymes.',
     'that neutralizes acidic chyme and raises duodenal pH toward a range suitable for pancreatic enzymes.'],
    [GENERIC_DIGEST, points([
      'Acidic chyme stimulates duodenal S cells to release secretin.',
      'Secretin stimulates pancreatic duct cells to secrete bicarbonate-rich fluid.',
      'Secretin mainly promotes bicarbonate secretion; CCK mainly promotes pancreatic enzyme secretion and gallbladder contraction.',
    ])],
  ],
},

// Q5 bio-195: most dietary long-chain fat leaves the enterocyte in
// chylomicrons and enters lymph, not the portal vein.
{
  q: 5, id: 'bio-195', expectLetter: 'C',
  explanation: [
    ['<p>The hepatic portal vein collects nutrient-rich, deoxygenated blood from the stomach, intestines, spleen, and pancreas and delivers it to the liver for processing.',
     '<p>The hepatic portal vein carries venous blood from the digestive organs to the liver, including most newly absorbed water-soluble nutrients. Most long-chain dietary fats initially travel through lymph in chylomicrons instead. The vein collects blood from the stomach, intestines, spleen and pancreas and delivers it to the liver for processing.'],
    [GENERIC_DIGEST, points([
      'Portal blood carries most absorbed water-soluble nutrients from the intestine to the liver for processing.',
      'Blood leaves the liver through hepatic veins and then enters the inferior vena cava.',
      'Most dietary long-chain fats initially enter lymph rather than the hepatic portal vein.',
    ])],
  ],
},

// Q6 bio-196: the conducting zone ends at the terminal bronchioles;
// respiratory bronchioles belong to the respiratory zone.
{
  q: 6, id: 'bio-196', expectLetter: 'C',
  explanation: [
    ['<li>The trachea, bronchi and bronchioles form the conducting zone: they move air but their walls are far too thick for exchange, which is why they constitute anatomical dead space.</li>',
     '<li>The conducting zone runs from the trachea through the bronchi to the terminal bronchioles: it moves air but its walls are too thick for exchange, which is why it forms the anatomical dead space. Respiratory bronchioles belong to the respiratory zone and carry a few alveoli in their walls.</li>'],
  ],
},

// Q7 bio-197: state the Laplace assumption, and surfactant production is a
// gradient with maturity rather than an all-or-nothing late event.
{
  q: 7, id: 'bio-197', expectLetter: 'D',
  explanation: [
    ['<li>By Laplace\'s law the collapsing pressure is greater in a smaller alveolus, so surfactant matters most there and stops small alveoli emptying into larger ones.</li>',
     '<li>For the same surface tension, a smaller alveolus has a greater collapsing pressure. That is the assumption behind the simplified Laplace comparison, and it is why surfactant matters most in small alveoli and stops them emptying into larger ones.</li>'],
    ['<li>Surfactant is only produced in quantity late in gestation, which is why premature infants develop respiratory distress syndrome.</li>',
     '<li>Surfactant production increases as the lungs mature; premature infants are at increased risk of surfactant deficiency and respiratory distress syndrome.</li>'],
  ],
},

// Q9 bio-199: rapidly adapting receptors can respond to mechanical changes
// including inflation, so a blanket exclusion is wrong.
{
  q: 9, id: 'bio-199', expectLetter: 'D',
  explanation: [
    ['They are rapidly adapting receptors that respond to mechanical and chemical irritation, not to lung inflation.</p>',
     'They are rapidly adapting receptors and can respond to mechanical changes, including inflation. They are not, however, the receptor group principally responsible for this reflex: the Hering-Breuer inflation reflex is mediated mainly by slowly adapting pulmonary stretch receptors.</p>'],
  ],
},

// Q10 bio-200: not every rightward shift is the Bohr effect. Temperature and
// 2,3-BPG are separate influences.
{
  q: 10, id: 'bio-200', expectLetter: 'C',
  stemFull: 'Which change produces a rightward shift of the oxygen-hemoglobin dissociation curve through the Bohr effect?',
  explanation: [
    ['<p>The Bohr effect describes the rightward shift of the oxygen-hemoglobin dissociation curve when CO₂ increases, pH decreases, temperature rises, or 2,3-BPG increases. A right shift means hemoglobin has reduced oxygen affinity and releases O₂ more readily to metabolically active tissues. This is physiologically important during exercise, when tissues produce more CO₂ and heat and have lower pH, requiring greater oxygen delivery.</p>',
     '<p>Higher CO₂ and lower pH reduce hemoglobin&rsquo;s affinity for oxygen, promoting oxygen unloading. This is the Bohr effect. A right shift means hemoglobin releases O₂ more readily to metabolically active tissues, which matters during exercise when tissues produce more CO₂ and become more acidic.</p>'
     + '<p>Increased temperature and increased red-cell 2,3-BPG can also shift the curve right, but through separate mechanisms. The Bohr effect itself concerns the influence of CO₂ and H⁺ on hemoglobin&rsquo;s oxygen affinity.</p>'],
    ['Decreased blood temperature shifts the oxygen-hemoglobin dissociation curve to the left, meaning hemoglobin holds onto oxygen more tightly. This is the opposite of the Bohr effect (right shift). Left shifts occur in conditions of hypothermia, alkalosis, low CO2, and decreased 2,3-BPG. Hypothermic patients\' tissues may receive less oxygen despite adequate hemoglobin saturation.</p>',
     'Decreased blood temperature shifts the curve to the left, so hemoglobin holds oxygen more tightly. Temperature is a separate influence from the Bohr effect, which concerns CO₂ and H⁺, and in any case this option moves the curve the wrong way.</p>'],
    ['In respiratory alkalosis (hyperventilation), the reduced CO2 and elevated pH both favor tighter oxygen binding. This is one reason hyperventilating patients may feel lightheaded despite high blood oxygen levels.</p>',
     'In respiratory alkalosis the reduced CO₂ and raised pH both favour tighter oxygen binding, which is a leftward shift rather than the rightward one the question asks about.</p>'],
    ['<li>Rising CO₂ and falling pH (the Bohr effect), rising temperature, and rising 2,3-BPG all shift the curve right.</li>',
     '<li>Rising CO₂ and falling pH shift the curve right: that is the Bohr effect. Rising temperature and rising 2,3-BPG also shift it right, but through separate mechanisms.</li>'],
    ['<p class=\'exp-key\'>Bottom Line: The Bohr effect (right shift) facilitates oxygen unloading at tissues with high metabolic activity (low pH, high CO₂, high temperature).</p>',
     '<p class=\'exp-key\'>Bottom Line: The Bohr effect links increased CO₂ and decreased pH to reduced hemoglobin oxygen affinity and easier oxygen unloading.</p>'],
  ],
},

// Q11 bio-201: residual volume is a measured volume, not the mechanism that
// keeps alveoli open. FRC is the reservoir between quiet breaths.
{
  q: 11, id: 'bio-201', expectLetter: 'C',
  explanation: [
    ['<p>Residual volume (RV) is approximately 1200 mL in a healthy adult and represents the air that cannot be expelled even with maximum effort. It prevents the lungs from completely collapsing and maintains a continuous supply of oxygen in the alveoli between breaths. RV cannot be measured by simple spirometry;',
     '<p>Residual volume (RV) is the air that cannot be expelled even with maximum effort, approximately 1200 mL in a healthy adult, though values vary with body size, sex, age and disease. The air left in the lungs after an ordinary quiet breath is the functional residual capacity, and that is the reservoir which keeps gas exchange going between breaths. Alveolar stability itself depends on surfactant and on transpulmonary pressure rather than on a measured volume. RV cannot be measured by simple spirometry;'],
    ['<li>Retaining this air prevents alveolar collapse and keeps gas exchange going continuously between breaths.</li>',
     '<li>Functional residual capacity, the air left after an ordinary quiet breath, is the reservoir that keeps gas exchange going between breaths.</li>'],
    ['<p class=\'exp-key\'>Bottom Line: Residual volume is the air remaining after maximal expiration; it prevents lung collapse and ensures continuous gas exchange.</p>',
     '<p class=\'exp-key\'>Bottom Line: Residual volume is the air remaining after maximal expiration and cannot be measured by simple spirometry.</p>'],
  ],
},

// Q12 bio-202: SUBSTANTIAL REPAIR. The old stem implied abnormally high CO2
// is needed for normal breathing, and option D said central chemoreceptors
// detect CO2 directly although the explanation described H+ sensing.
{
  q: 12, id: 'bio-202', expectLetter: 'D',
  stemFull: 'Under normal physiological conditions, a rise in arterial CO₂ stimulates ventilation mainly through which mechanism?',
  optionFull: [[3, 'An increase in H⁺ near central chemoreceptors in the medulla']],
  explanation: [
    ['<h4>Correct Answer: D) High blood CO₂ levels detected by central chemoreceptors in the medulla</h4><p>Under normal conditions, the central chemoreceptors on the ventral surface of the medulla are the primary drivers of respiration. They respond to changes in H⁺ concentration in the cerebrospinal fluid, which reflects blood CO₂ levels (CO₂ freely crosses the blood-brain barrier and reacts with water to form H⁺). A small rise in arterial PCO₂ (hypercapnia) produces a strong increase in ventilation. Peripheral chemoreceptors (carotid and aortic bodies) primarily respond to severe hypoxemia.</p>',
     '<h4>Correct Answer: D) An increase in H⁺ near central chemoreceptors in the medulla</h4><p>CO₂ crosses the blood-brain barrier and contributes to H⁺ formation in brain extracellular fluid and cerebrospinal fluid. Central chemoreceptors respond to this fall in pH and stimulate an increase in ventilation, helping remove excess CO₂. Brainstem networks generate the breathing rhythm, while chemical feedback adjusts its rate and depth.</p>'],
    ['<p><strong>A. Low blood oxygen levels detected by peripheral chemoreceptors:</strong> Low blood oxygen is detected by peripheral chemoreceptors in the carotid and aortic bodies, which respond primarily to PaO2 below ~60 mmHg. Under normal conditions, oxygen levels are well above this threshold, so peripheral chemoreceptors contribute little to resting ventilatory drive. However, in chronic CO2 retention (e.g., severe COPD), the central chemoreceptors may become desensitized, and hypoxic drive through peripheral chemoreceptors can become the primary respiratory stimulus.</p>',
     '<p><strong>A. Low blood oxygen levels detected by peripheral chemoreceptors:</strong> Peripheral chemoreceptors respond to arterial oxygen, CO₂ and pH. Their response to low oxygen becomes especially strong when arterial PO₂ falls substantially, but the mechanism asked here is the central response to increased CO₂.</p>'],
    ['<li>Quiet breathing is driven mainly by CO₂, sensed by central chemoreceptors on the ventral surface of the medulla.</li><li>Those receptors actually detect H⁺ in the cerebrospinal fluid: CO₂ crosses the blood-brain barrier freely and forms H⁺ there.</li><li>H⁺ itself crosses the barrier poorly, which is why arterial CO₂ rather than arterial pH is the effective stimulus.</li><li>The system is highly sensitive - a small rise in arterial PCO₂ produces a large increase in ventilation.</li><li>Peripheral chemoreceptors in the carotid and aortic bodies respond mainly to severe hypoxaemia, becoming the dominant drive only when PO₂ falls markedly.</li>',
     '<li>Brainstem networks generate the breathing rhythm; chemical feedback adjusts its rate and depth rather than creating it.</li><li>Central chemoreceptors in the medulla detect H⁺, not CO₂ directly. CO₂ crosses the blood-brain barrier freely and forms H⁺ on the other side.</li><li>H⁺ itself crosses the barrier poorly, which is why arterial CO₂ rather than arterial pH is the effective stimulus for the central response.</li><li>The system is sensitive: a small rise in arterial PCO₂ produces a large increase in ventilation.</li><li>Peripheral chemoreceptors in the carotid and aortic bodies sense arterial oxygen, CO₂ and pH, and their oxygen response becomes especially strong when PO₂ falls substantially.</li>'],
    ['<p class=\'exp-key\'>Bottom Line: CO₂ (via H⁺ in CSF) is the primary chemical driver of ventilation under normal physiological conditions.</p>',
     '<p class=\'exp-key\'>Bottom Line: A rise in arterial CO₂ raises H⁺ near the central chemoreceptors, and that is the main chemical signal increasing ventilation under normal conditions.</p>'],
  ],
},

];
