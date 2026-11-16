/**
 * Biology review batch 10, displayed Q1-Q10 (bio-537 .. bio-547).
 * Q5 (bio-541, platelets) and Q9 (bio-546, O x AB cross) are KEEP UNCHANGED
 * per the review and so are absent from this module by design.
 */
'use strict';

module.exports = [
  // ---- Q1  bio-537  aldosterone ------------------------------------------
  {
    q: 1, id: 'bio-537', expectLetter: 'A',
    explanation: [
      ['Aldosterone retains sodium and excretes potassium. This is why hyperaldosteronism causes hypokalemia.',
        'Aldosterone retains sodium and promotes potassium secretion, which is why hyperaldosteronism is often associated with potassium loss.'],
      ['<li>Excess aldosterone leads to hypernatremia, hypokalemia, metabolic alkalosis, hypertension</li>',
        '<li>Excess aldosterone can cause hypertension, potassium loss and metabolic alkalosis; serum sodium does not necessarily rise</li>']
    ],
    gone: ['hyperaldosteronism causes hypokalemia', 'leads to hypernatremia']
  },

  // ---- Q2  bio-538  albumin ----------------------------------------------
  {
    q: 2, id: 'bio-538', expectLetter: 'C',
    explanation: [
      ['maintaining colloid osmotic (oncotic) pressure to prevent fluid from leaking out of capillaries',
        'maintaining colloid osmotic (oncotic) pressure, helping retain water within the circulation by opposing net fluid movement into the tissues'],
      ['Notably, serum (plasma minus clotting factors) lacks fibrinogen.',
        'Serum is the liquid remaining after blood clots; fibrinogen is largely removed into the clot, but not every clotting factor disappears.'],
      ['<li>Low albumin (hypoalbuminemia) leads to edema due to reduced oncotic pressure</li>',
        '<li>Low albumin (hypoalbuminemia) can contribute to edema through reduced oncotic pressure</li>']
    ],
    gone: ['prevent fluid from leaking out of capillaries', 'plasma minus clotting factors',
      'leads to edema due to reduced oncotic pressure']
  },

  // ---- Q3  bio-539  mature erythrocytes (stem replaced) ------------------
  {
    q: 3, id: 'bio-539', expectLetter: 'A',
    stemFull: 'Which statement about mature human red blood cells (erythrocytes) is correct?',
    explanation: [[
      '<p>Mature mammalian erythrocytes are unique among body cells in that they extrude their nucleus and organelles (including mitochondria) during maturation. This creates more space for hemoglobin (approximately 270 million molecules per RBC) and gives them their characteristic biconcave disc shape, which maximizes surface area for gas exchange. Without mitochondria, they generate ATP exclusively through anaerobic glycolysis.</p>',
      '<p>During maturation, the developing red cell expels its nucleus and removes mitochondria and other organelles. This also leaves more space for hemoglobin. Mature human red cells therefore make ATP through glycolysis and do not use mitochondria to consume the oxygen they carry. Their flexible, biconcave shape provides a large surface area for gas exchange and helps them pass through narrow capillaries.</p>'
    ]],
    gone: ['Mature red blood cells (erythrocytes) in mammals have a unique structural adaptation',
      'unique among body cells', 'gives them their characteristic biconcave disc shape',
      'approximately 270 million molecules per RBC']
  },

  // ---- Q4  bio-540  eosinophilia -----------------------------------------
  {
    q: 4, id: 'bio-540', expectLetter: 'D',
    explanation: [
      ['<p>Eosinophils are granulocytic white blood cells that typically constitute 1-4% of circulating WBCs. They are particularly important in defense against parasitic helminths (worms), which are too large to be phagocytosed. Eosinophils release cytotoxic granule contents (major basic protein, eosinophilic cationic protein) onto the parasite surface. Eosinophilia is also strongly associated with allergic/atopic conditions (asthma, hay fever, eczema).</p>',
        '<p>Eosinophils are granulocytic white blood cells that typically constitute 1-4% of circulating WBCs. Eosinophilia is associated particularly with tissue-invasive helminths and with allergic conditions, including allergic asthma, hay fever and eczema. Helminths are too large to be phagocytosed, so eosinophils release cytotoxic granule contents (major basic protein, eosinophilic cationic protein) onto the parasite surface instead.</p>'],
      ['<p><strong>B. Viral hepatitis:</strong> Viral infections more typically cause lymphocytosis (elevated lymphocytes, particularly T cells), as the adaptive immune response to intracellular pathogens is primarily cell-mediated.</p>',
        '<p><strong>B. Viral hepatitis:</strong> Some viral infections are associated with increased lymphocytes, although blood-count changes vary. Viral hepatitis is not the classic association with eosinophilia tested here; helminth infection and allergy are better matches.</p>'],
      ['<li>Neutrophils: bacteria; Lymphocytes: viruses; Eosinophils: parasites and allergies; Basophils: allergies (histamine release); Monocytes: chronic inflammation</li>',
        '<li>Typical patterns: neutrophils with bacteria, lymphocytes with viruses, eosinophils with parasites and allergy, basophils in allergic responses and monocytes in chronic inflammation. These are associations, not diagnostic rules</li>'],
      ['<li>Mnemonic for eosinophilia causes: NAACP (Neoplasm, Asthma/Allergy, Addison disease, Collagen vascular disease, Parasites)</li>',
        '<li>Eosinophilia has several possible causes, including allergy, some helminth infections and medication reactions; the clinical context matters</li>'],
      ['<p class=\'exp-key\'>Bottom Line: Eosinophilia is classically associated with parasitic infections and allergic conditions.</p>',
        '<p class=\'exp-key\'>Bottom Line: Eosinophilia suggests an allergic disorder or certain helminth infections, especially those involving tissue migration, but is not diagnostic on its own.</p>']
    ],
    keepHeadings: ['<strong>B. Viral hepatitis:</strong>'],
    gone: ['NAACP', 'strongly associated with allergic/atopic conditions',
      'Neutrophils: bacteria; Lymphocytes: viruses', 'classically associated with parasitic infections and allergic conditions']
  },

  // ---- Q6  bio-543  erythropoietin (stem replaced) -----------------------
  {
    q: 6, id: 'bio-543', expectLetter: 'D',
    stemFull: 'In a healthy adult, where is erythropoietin (EPO) predominantly produced, and what stimulates its production?',
    explanation: [
      ['<p><strong>A. Produced in the liver; stimulated by high oxygen:</strong> While the liver produces a small fraction of EPO (especially in the fetus), the kidneys are the primary source in adults. Furthermore, high oxygen levels suppress EPO production; it is hypoxia that stimulates its release.</p>',
        '<p><strong>A. Produced in the liver; stimulated by high oxygen:</strong> The liver is the major EPO-producing organ during fetal life, whereas the kidneys are the main source in adults. Reduced oxygen availability, not high oxygen levels, stimulates EPO production.</p>'],
      ['<p><strong>B. Produced in the bone marrow; stimulated by iron:</strong> The bone marrow is the target of EPO action, not its source. While iron is necessary for hemoglobin synthesis, it does not directly regulate EPO production.</p>',
        '<p><strong>B. Produced in the bone marrow; stimulated by iron:</strong> Bone marrow is the main site where EPO stimulates red-cell production, rather than its main source. Iron is required to make hemoglobin, but the principal stimulus for renal EPO production is reduced oxygen availability.</p>']
    ],
    keepHeadings: ['<strong>A. Produced in the liver; stimulated by high oxygen:</strong>',
      '<strong>B. Produced in the bone marrow; stimulated by iron:</strong>'],
    gone: ['Erythropoietin (EPO) is the primary hormone regulating red blood cell production. Where',
      'it is hypoxia that stimulates its release', 'it does not directly regulate EPO production']
  },

  // ---- Q7  bio-544  tissue factor ----------------------------------------
  {
    q: 7, id: 'bio-544', expectLetter: 'C',
    explanation: [
      ['<p>The extrinsic pathway is initiated when tissue damage exposes tissue factor (TF, also called Factor III or thromboplastin) to the blood. TF is a transmembrane protein expressed on subendothelial cells that is normally not in contact with blood. When exposed, TF binds to Factor VII (which becomes Factor VIIa), forming the TF-VIIa complex that activates Factor X. This is the faster of the two pathways and is assessed clinically by the prothrombin time (PT/INR).</p>',
        '<p>Vessel injury exposes tissue factor (TF, also called Factor III or thromboplastin) to blood. TF is a transmembrane protein expressed on subendothelial cells that is normally not in contact with blood. Tissue factor binds factor VII/VIIa; the active tissue factor-VIIa complex initiates coagulation by activating downstream clotting factors, beginning with factor X. The traditional intrinsic/extrinsic diagram is useful for understanding the laboratory tests, whereas tissue factor initiates most normal clotting in the body. PT assesses the extrinsic and common pathways; aPTT assesses the intrinsic and common pathways.</p>'],
      ['It is activated when blood contacts negatively charged surfaces such as exposed collagen. The intrinsic pathway is assessed by the activated partial thromboplastin time (aPTT).',
        'It is activated when blood contacts negatively charged surfaces, and the aPTT assesses the intrinsic and common pathways. Contact activation through factor XII is the traditional intrinsic-pathway trigger used in the laboratory, but it is not required to initiate normal hemostasis in the body.'],
      ['<li>Extrinsic pathway: Tissue Factor + Factor VII, measured by PT/INR</li>',
        '<li>Extrinsic pathway: tissue factor + factor VII; the PT/INR assesses the extrinsic and common pathways</li>'],
      ['<li>Intrinsic pathway: Factor XII, XI, IX, VIII, measured by aPTT</li>',
        '<li>Intrinsic pathway: factors XII, XI, IX and VIII; the aPTT assesses the intrinsic and common pathways</li>'],
      ['<p class=\'exp-key\'>Bottom Line: Tissue factor (Factor III) released from damaged tissue initiates the extrinsic coagulation pathway by activating Factor VII.</p>',
        '<p class=\'exp-key\'>Bottom Line: Exposure of tissue factor allows formation of the tissue factor-VIIa complex, initiating the extrinsic pathway and downstream fibrin formation.</p>']
    ],
    gone: ['This is the faster of the two pathways', 'measured by PT/INR', 'measured by aPTT',
      'The intrinsic pathway is assessed by the activated partial thromboplastin time (aPTT).',
      'released from damaged tissue initiates the extrinsic coagulation pathway']
  },

  // ---- Q8  bio-545  hemophilia A (stem replaced) -------------------------
  {
    q: 8, id: 'bio-545', expectLetter: 'A',
    stemFull: 'A patient has a prolonged aPTT but a normal PT. Factor testing shows reduced factor VIII activity, and genetic testing identifies a disease-causing variant in F8, the gene encoding factor VIII. Which condition does the patient have?',
    explanation: [
      ['<p><strong>C. Von Willebrand disease:</strong> VWD involves deficiency or dysfunction of von Willebrand factor (vWF), which protects Factor VIII from degradation and mediates platelet adhesion. While VWD can secondarily reduce Factor VIII levels and prolong aPTT, it also causes prolonged bleeding time due to impaired platelet function.</p>',
        '<p><strong>C. Von Willebrand disease:</strong> Von Willebrand factor helps platelets adhere to an injured vessel and carries factor VIII in the blood. Its deficiency or dysfunction can therefore cause bleeding and sometimes reduced factor VIII activity. Here, the disease-causing variant is in F8 itself, identifying hemophilia A.</p>'],
      ['<p><strong>D. Disseminated intravascular coagulation (DIC):</strong> DIC involves widespread activation of coagulation followed by consumption of clotting factors and platelets. Both PT and aPTT are prolonged, along with decreased fibrinogen and elevated D-dimer.</p>',
        '<p><strong>D. Disseminated intravascular coagulation (DIC):</strong> DIC involves widespread clotting and consumption of platelets and clotting factors; PT and aPTT are often prolonged. It does not explain the inherited F8 defect in this stem.</p>'],
      ['<li>Both cause prolonged aPTT with normal PT; distinguished by factor assays</li>',
        '<li>Hemophilia A and B typically produce a prolonged aPTT with a normal PT and are distinguished by factor assays; mild disease can have a normal aPTT</li>']
    ],
    keepHeadings: ['<strong>C. Von Willebrand disease:</strong>', '<strong>D. Disseminated intravascular coagulation (DIC):</strong>'],
    gone: ['Genetic testing reveals a deficiency of Factor VIII', 'prolonged bleeding time',
      'elevated D-dimer', 'Both cause prolonged aPTT with normal PT; distinguished by factor assays']
  },

  // ---- Q10  bio-547  serum versus plasma (option B; full rewrite) --------
  {
    q: 10, id: 'bio-547', expectLetter: 'B',
    optionFull: [[1, 'Plasma retains fibrinogen, whereas serum is collected after clotting and is depleted of fibrinogen']],
    explanation: [
      ['<h4>Correct Answer: Plasma contains fibrinogen and clotting factors while serum does not</h4>',
        '<h4>Correct Answer: Plasma retains fibrinogen, whereas serum is collected after clotting and is depleted of fibrinogen</h4>'],
      ['<p>Plasma is the liquid portion of blood obtained when an anticoagulant (e.g., EDTA, heparin) is added to prevent clotting, and the blood is then centrifuged. It contains all dissolved proteins, including fibrinogen and other clotting factors. Serum is obtained by allowing blood to clot first, then centrifuging; the clotting process consumes fibrinogen (converting it to fibrin) and other clotting factors. Therefore: Serum = Plasma minus Fibrinogen minus Clotting Factors.</p>',
        '<p>Plasma is the liquid portion obtained when blood is prevented from clotting, usually by an anticoagulant in the collection tube. It retains fibrinogen. Serum is the liquid remaining after blood has clotted and the clot has been removed. Fibrinogen is largely converted into fibrin in the clot, and some other clotting components are consumed or altered. Serum is not devoid of every clotting factor.</p>'],
      ['<p><strong>A. Serum contains clotting factors while plasma does not:</strong> This is the reverse of reality. Plasma retains all clotting factors, while serum has had them consumed during the clotting process.</p>',
        '<p><strong>A. Serum contains clotting factors while plasma does not:</strong> This reverses the distinction. Anticoagulated plasma retains fibrinogen; serum is collected after clotting and is depleted of it. The difference should not be described as all clotting factors being present in one and absent from the other.</p>'],
      ['<li>Serum = liquid from clotted blood (lacks fibrinogen and clotting factors consumed in coagulation)</li>',
        '<li>Serum = liquid from clotted blood, depleted of fibrinogen, with some other clotting components consumed or altered</li>'],
      ['<p class=\'exp-key\'>Bottom Line: Serum is plasma minus fibrinogen and clotting factors, obtained after blood is allowed to clot.</p>',
        '<p class=\'exp-key\'>Bottom Line: Plasma is obtained from anticoagulated blood and retains fibrinogen; serum is obtained after clotting and is depleted of fibrinogen.</p>']
    ],
    keepHeadings: ['<strong>A. Serum contains clotting factors while plasma does not:</strong>',
      '<strong>C. Serum contains red blood cells:</strong>', '<strong>D. Plasma is obtained after blood clotting:</strong>'],
    gone: ['Plasma contains fibrinogen and clotting factors while serum does not',
      'Serum = Plasma minus Fibrinogen minus Clotting Factors', 'Plasma retains all clotting factors',
      'lacks fibrinogen and clotting factors consumed in coagulation', 'Serum is plasma minus fibrinogen']
  }
];
