/**
 * Batch 7 review, displayed Q49-Q60 (bio-393 .. bio-404).
 * Q52 (bio-396), Q54 (bio-398), Q55 (bio-399) and Q60 (bio-404) are
 * KEEP UNCHANGED and so are absent. Q53 (bio-397) is the one full-item rewrite.
 */
'use strict';

const points = items => '<h4>Key Educational Points:</h4><ul>' + items.map(t => '<li>' + t + '</li>').join('') + '</ul>';

const GENERIC_PHOTO = '<h4>Key Educational Points:</h4><ul><li>Photosynthesis converts light energy to chemical energy in two stages: light reactions (thylakoid membranes) produce ATP and NADPH, and the Calvin cycle (stroma) fixes CO2 into sugar.</li><li>The light reactions involve two photosystems: PSII (splits water, releases O2) and PSI (reduces NADP+ to NADPH).</li><li>C3, C4, and CAM plants have different strategies for carbon fixation adapted to their environments, balancing photosynthesis efficiency against water loss.</li></ul>';

const Q53_EXPLANATION =
  '<h4>Correct Answer: B. Brachialis</h4>' +
  '<p>Brachialis is a major flexor of the elbow. It lies deep to biceps brachii and runs from the anterior humerus to the ulna. Because it attaches to the ulna, it can flex the elbow whether the forearm is pronated, supinated or in the neutral position. Biceps brachii also flexes the elbow and is a powerful supinator, but its contribution depends more on forearm position.</p>' +
  '<h4>Why the other choices are wrong:</h4>' +
  '<p><strong>A. Triceps brachii:</strong> Triceps brachii extends the elbow. It inserts on the olecranon of the ulna and acts in opposition to the elbow flexors. Although it also attaches to the ulna, its posterior position and line of pull produce extension, not flexion.</p>' +
  '<p><strong>C. Brachioradialis:</strong> Brachioradialis assists elbow flexion, especially with the forearm in a neutral position, as when holding a hammer. It inserts on the distal radius, not the ulna, and is not the muscle lying deep to biceps described in the stem.</p>' +
  '<p><strong>D. Deltoid:</strong> Deltoid acts at the shoulder and gives it its rounded contour. Different parts contribute to abduction, flexion or extension of the arm. It does not cross the elbow and is not an elbow flexor.</p>' +
  points([
    'Brachialis is a major elbow flexor located deep to biceps brachii.',
    'Its insertion on the ulna allows flexion in pronated, neutral and supinated forearm positions.',
    'Biceps brachii contributes to elbow flexion and supinates the forearm.',
    'Brachioradialis assists elbow flexion especially with the forearm in the neutral position.',
    'Triceps brachii is the main elbow extensor and opposes the flexors.'
  ]);

module.exports = [

  // ------------------------------------------------------------- Q49 bio-393
  {
    q: 49, id: 'bio-393', expectLetter: 'C',
    explanation: [
      ['Protons accumulate in the lumen through water splitting (at PSII), electron transport via the cytochrome b₆f complex (which pumps H⁺), and NADP⁺ reduction (which consumes stromal H⁺).',
        'Water oxidation at PSII releases protons into the thylakoid lumen, and electron transport involving the cytochrome b₆f complex moves additional protons toward the lumen. NADP⁺ reduction consumes protons on the stromal side, so it supports the gradient by removing stromal protons rather than by depositing those protons in the lumen.'],
      [GENERIC_PHOTO, points([
        'Light-driven electron transport builds a proton gradient across the thylakoid membrane, with a higher proton concentration in the lumen.',
        'Protons return from the lumen to the stroma through ATP synthase, driving ATP production on the stromal side.',
        'Water oxidation and electron transport increase lumenal protons; NADP⁺ reduction also supports the gradient by consuming stromal protons.'
      ])]
    ],
    gone: ['Protons accumulate in the lumen through water splitting']
  },

  // ------------------------------------------------------------- Q50 bio-394
  {
    q: 50, id: 'bio-394', expectLetter: 'C',
    explanation: [
      ['<p><strong>A. Chlorophyll b:</strong> Chlorophyll b and carotenoids serve as accessory/antenna pigments.</p>',
        '<p><strong>A. Chlorophyll b:</strong> Chlorophyll b is an accessory antenna pigment. It broadens the range of light the leaf can absorb and transfers excitation energy toward the reaction centre, but it is not the P700 reaction-centre donor.</p>'],
      ['<p><strong>B. P680:</strong> P680 is the reaction center chlorophyll of psii.</p>',
        '<p><strong>B. P680:</strong> P680 is the reaction-centre chlorophyll associated with photosystem II, where water is oxidised and oxygen released. P700 is the corresponding reaction-centre chlorophyll of photosystem I, which is the photosystem named in this question.</p>'],
      ['It is not a reaction center pigment and does not directly participate in photochemical reactions.',
        'The relevant point here is that it is not the chlorophyll donor called P700.'],
      [GENERIC_PHOTO, points([
        'P700 is the reaction-center chlorophyll donor associated with photosystem I, named for its characteristic absorption near 700 nm.',
        'Excitation of P700 allows electron transfer into the photosystem I acceptor chain.',
        'P680 belongs to photosystem II; antenna pigments help capture light and deliver excitation energy to reaction centers.'
      ])]
    ],
    gone: ['<strong>A. Chlorophyll b:</strong> Chlorophyll b and carotenoids serve', 'reaction center chlorophyll of psii',
      'It is not a reaction center pigment']
  },

  // ------------------------------------------------------------- Q51 bio-395
  {
    q: 51, id: 'bio-395', expectLetter: 'C',
    explanation: [
      ['<p>The medial and lateral menisci are C-shaped wedges of fibrocartilage located within the knee (tibiofemoral) joint.',
        '<p>The medial and lateral menisci are wedge-shaped fibrocartilage structures in cross-section, located within the knee (tibiofemoral) joint. The medial meniscus is crescent or C-shaped, while the lateral meniscus is more nearly circular.'],
      ['Its stability comes from the interlocking bony surfaces (trochlea-trochlear notch articulation) and strong collateral ligaments. The elbow does not require menisci because it moves primarily in one plane.',
        'Its stability comes from the congruent, interlocking bony surfaces of the trochlea and trochlear notch together with strong collateral ligaments, which together provide what menisci contribute at the knee.'],
      ['<li>The menisci are C-shaped fibrocartilage wedges within the knee (tibiofemoral) joint.</li>',
        '<li>The menisci are wedge-shaped fibrocartilage structures within the knee (tibiofemoral) joint: the medial is crescent or C-shaped, the lateral more nearly circular.</li>'],
      ['<li>That tethering underlies the classic association of medial meniscus, MCL, and ACL injury.</li>',
        '<li>ACL injuries can occur together with meniscal or collateral-ligament injuries.</li>']
    ],
    gone: ['C-shaped wedges of fibrocartilage', 'The elbow does not require menisci',
      'C-shaped fibrocartilage wedges within the knee', 'the classic association of medial meniscus']
  },

  // ------------------------------------------------------------- Q53 bio-397
  {
    q: 53, id: 'bio-397', expectLetter: 'B',
    stemFull: 'Which muscle lies deep to biceps brachii, inserts on the ulna, and flexes the elbow regardless of forearm position?',
    optionFull: [[1, 'Brachialis']],
    explanationFull: Q53_EXPLANATION,
    gone: ['primary flexor of the forearm', 'supraglenoid tubercle', 'radial tuberosity', 'two-joint muscles']
  },

  // ------------------------------------------------------------- Q56 bio-400
  {
    q: 56, id: 'bio-400', expectLetter: 'B',
    explanation: [
      ['The anterior cruciate ligament (ACL) originates from the posterior intercondylar area of the femur and inserts on the anterior intercondylar area of the tibia.',
        'The anterior cruciate ligament (ACL) arises from the posterior part of the medial surface of the lateral femoral condyle and inserts on the anterior intercondylar area of the tibia.'],
      ['<p><strong>A. Lateral displacement of the tibia:</strong> Lateral displacement of the tibia is prevented primarily by the medial collateral ligament (MCL) and lateral collateral ligament (LCL), which stabilize the knee against valgus and varus stresses respectively. The cruciate ligaments primarily prevent anteroposterior displacement.</p>',
        '<p><strong>A. Lateral displacement of the tibia:</strong> Side-to-side stability at the knee comes mainly from the collateral ligaments: the medial collateral ligament (MCL) resists valgus stress and the lateral collateral ligament (LCL) resists varus stress. The cruciate ligaments primarily resist anteroposterior translation.</p>'],
      ['<li>It runs from the posterior intercondylar femur to the anterior intercondylar tibia, and also resists hyperextension and internal rotation.</li>',
        '<li>It runs from the posterior part of the medial surface of the lateral femoral condyle to the anterior intercondylar area of the tibia, and also resists hyperextension and internal rotation.</li>'],
      ['<li>The PCL prevents posterior tibial displacement; the collateral ligaments resist medial and lateral stress.</li>',
        '<li>The PCL prevents posterior tibial displacement; the MCL resists valgus stress and the LCL resists varus stress.</li>']
    ],
    gone: ['posterior intercondylar area of the femur', 'posterior intercondylar femur',
      'the collateral ligaments resist medial and lateral stress',
      'Lateral displacement of the tibia is prevented primarily by']
  },

  // ------------------------------------------------------------- Q57 bio-401
  {
    q: 57, id: 'bio-401', expectLetter: 'B',
    explanation: [
      ['<p><strong>A. Trachea:</strong> It passes through the thorax posterior to the trachea and heart, penetrates the diaphragm through the esophageal hiatus at the level of t10, and joins the stomach at the cardiac orifice.</p>',
        '<p><strong>A. Trachea:</strong> The trachea is an airway connecting the larynx to the main bronchi. It lies anterior to the esophagus and carries air, not food, toward the lungs. It does not pass through the esophageal hiatus or join the stomach.</p>'],
      ['<p><strong>C. Duodenum:</strong> The trachea leads to the lungs, and the duodenum is distal to the stomach.</p>',
        '<p><strong>C. Duodenum:</strong> The duodenum is the first part of the small intestine. It receives chyme from the stomach and continues into the jejunum, so it lies downstream of the stomach rather than connecting the pharynx to it.</p>'],
      ['The larynx sits anterior to the esophagus, and during swallowing, the epiglottis folds over the laryngeal inlet to prevent food from entering the airway.',
        'The larynx sits anterior to the esophagus. During swallowing the airway is protected by coordinated laryngeal closure, including closure of the vocal folds and movement of the epiglottis over the laryngeal inlet.'],
      ['<li>That transition explains why the top of a swallow is voluntary while the rest is reflexive peristalsis.</li>',
        '<li>Swallowing begins with a voluntary oral phase, followed by coordinated reflexive pharyngeal and esophageal phases. Skeletal muscle in the upper esophagus does not make that phase voluntarily controlled.</li>']
    ],
    gone: ['at the level of t10', '<strong>C. Duodenum:</strong> The trachea leads to the lungs',
      'the epiglottis folds over the laryngeal inlet to prevent food',
      'the top of a swallow is voluntary while the rest is reflexive']
  },

  // ------------------------------------------------------------- Q58 bio-402
  {
    q: 58, id: 'bio-402', expectLetter: 'B',
    stemFull: 'Which nerve provides the motor innervation to the diaphragm?',
    explanation: [
      ['Injury to the phrenic nerve results in paralysis of the ipsilateral hemidiaphragm.',
        'Damage to a phrenic nerve can cause weakness or paralysis of the corresponding hemidiaphragm.'],
      ['<p><strong>C. Intercostal nerves:</strong> Peripheral sensory innervation comes from the lower intercostal nerves.</p>',
        '<p><strong>C. Intercostal nerves:</strong> Lower intercostal nerves carry sensation from the peripheral diaphragm and supply the intercostal muscles. They do not provide the diaphragm\'s motor supply; that comes from the phrenic nerves.</p>'],
      ['The phrenic nerve (C3, C4, C5) is the sole motor nerve supply to the diaphragm, which is why cervical spinal cord injuries above C3 can be fatal due to loss of breathing.',
        'The phrenic nerve (C3, C4, C5) is the motor nerve supply to the diaphragm. A high cervical spinal cord injury can interrupt the descending commands that drive breathing, and how severe that is depends on the extent and completeness of the injury rather than on the vertebral level alone.'],
      ['<li>Injury paralyses the ipsilateral hemidiaphragm, which then rises and moves paradoxically.</li>',
        '<li>Damage can cause weakness or paralysis of the corresponding hemidiaphragm, which may then rise and move paradoxically.</li>'],
      ['<li>Because the diaphragm descends from cervical somites, a high cervical cord injury can stop breathing entirely.</li>',
        '<li>The diaphragm develops from cervical somites, which explains its nerve roots; a high cervical cord injury can interrupt the descending respiratory commands, with the effect depending on how extensive and complete the injury is.</li>']
    ],
    gone: ['results in paralysis of the ipsilateral hemidiaphragm', '<strong>C. Intercostal nerves:</strong> Peripheral sensory innervation',
      'can be fatal due to loss of breathing', 'Injury paralyses the ipsilateral hemidiaphragm',
      'a high cervical cord injury can stop breathing entirely']
  },

  // ------------------------------------------------------------- Q59 bio-403
  {
    q: 59, id: 'bio-403', expectLetter: 'D',
    explanation: [
      ['<p><strong>C. Median nerve:</strong> It contains nine tendons (four flexor digitorum superficialis, four flexor digitorum profundus, and one flexor pollicis longus) plus the median nerve.</p>',
        '<p><strong>C. Median nerve:</strong> The median nerve passes through the carpal tunnel with the nine flexor tendons. Compression of this nerve causes carpal tunnel syndrome, so it is a normal tunnel content and is not the exception asked for.</p>'],
      ['<li>Median nerve compression there causes carpal tunnel syndrome, with numbness sparing the little finger - the clinical proof the ulnar nerve runs elsewhere.</li>',
        '<li>Median nerve compression there causes carpal tunnel syndrome, and sparing of the little finger fits the median versus ulnar sensory distribution. That is a useful clinical clue rather than proof of where the ulnar nerve runs, which is settled anatomically.</li>']
    ],
    gone: ['the clinical proof the ulnar nerve runs elsewhere']
  }

];
