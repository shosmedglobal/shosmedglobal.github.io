/**
 * Batch 7 review, displayed Q1-Q12 (bio-343 .. bio-355).
 * Spec shape is documented in scripts/apply-bio-review-batch7.js.
 */
'use strict';

module.exports = [

  // -------------------------------------------------------------- Q1 bio-343
  {
    q: 1, id: 'bio-343', expectLetter: 'B',
    explanation: [
      ['No chemical bond is formed between citrate and PFK-1.',
        'Citrate binds through noncovalent interactions; it does not covalently modify PFK-1.'],
      ['<li>It is reversible - phosphatases remove the group - which makes it suitable for rapid on/off control.</li>',
        '<li>Phosphorylation is reversible: kinases add phosphate groups and phosphatases remove them.</li>']
    ],
    gone: ['No chemical bond is formed', 'phosphatases remove the group']
  },

  // -------------------------------------------------------------- Q2 bio-344
  {
    q: 2, id: 'bio-344', expectLetter: 'C',
    explanation: [
      ['PLP forms a Schiff base with the amino group of amino acids, facilitating the transfer of the amino group to an α-keto acid.',
        'PLP forms a Schiff base, a temporary covalent link, with the amino group of an amino acid, so that the amino group can be transferred to an α-keto acid.'],
      ['<p><strong>A. Biotin:</strong> Biotin is involved in carboxylation reactions, coa in acyl group transfer, and thf in one-carbon metabolism.</p>',
        '<p><strong>A. Biotin:</strong> Biotin, derived from vitamin B7, carries carbon dioxide in carboxylation reactions, such as the conversion of pyruvate to oxaloacetate by pyruvate carboxylase. Aminotransferases instead require PLP, derived from vitamin B6.</p>'],
      ['<p><strong>D. Tetrahydrofolate (THF):</strong> Tetrahydrofolate (THF) is a coenzyme involved in one-carbon transfer reactions, crucial for nucleotide synthesis (purines and thymidine) and amino acid metabolism (e.g., serine-glycine interconversion). THF is derived from folic acid (vitamin B9), and its inhibition by methotrexate is the basis for certain cancer and autoimmune therapies.</p>',
        '<p><strong>D. Tetrahydrofolate (THF):</strong> Tetrahydrofolate (THF) carries one-carbon units in reactions including purine and thymidylate (dTMP) synthesis, and in amino acid metabolism such as the serine-glycine interconversion. THF is derived from folic acid (vitamin B9). Methotrexate inhibits dihydrofolate reductase and so reduces the regeneration of THF; it does not inhibit THF itself. THF has no role in transamination.</p>'],
      ['<li>Transamination links amino acid metabolism to the citric acid cycle by generating glutamate, aspartate, and alanine.</li>',
        '<li>Transamination interconverts amino acids and their corresponding keto acids, connecting amino-acid metabolism with central metabolism; examples include alanine/pyruvate and aspartate/oxaloacetate.</li>']
    ],
    gone: ['coa in acyl group transfer', 'purines and thymidine', 'its inhibition by methotrexate is the basis',
      'links amino acid metabolism to the citric acid cycle by generating']
  },

  // -------------------------------------------------------------- Q3 bio-345
  {
    q: 3, id: 'bio-345', expectLetter: 'C',
    stemFull: 'Methotrexate competes with dihydrofolate for binding to dihydrofolate reductase. In the standard enzyme-kinetics model, what type of inhibition is this?',
    explanation: [
      ['<p>Methotrexate is a structural analog of folic acid (dihydrofolate) that competitively inhibits dihydrofolate reductase (DHFR). By occupying the active site, it prevents the conversion of dihydrofolate to tetrahydrofolate, which is essential for purine and thymidylate synthesis. This makes methotrexate effective as an anticancer and immunosuppressive agent by blocking DNA synthesis in rapidly dividing cells.</p>',
        '<p>Methotrexate is a folate analog that competes with dihydrofolate for the active site of dihydrofolate reductase (DHFR). Inhibitor and substrate compete for the same site, which is competitive inhibition with respect to dihydrofolate. DHFR regenerates reduced folates, and reduced folates support purine and thymidylate synthesis, so inhibiting the enzyme can restrict DNA synthesis. Methotrexate is also used at lower doses in some autoimmune diseases, where this one mechanism does not fully explain its anti-inflammatory effect.</p>'],
      ['<p><strong>B. Non-competitive inhibition:</strong> Non-competitive inhibition involves the inhibitor binding to a site other than the active site, reducing Vmax without affecting Km. Since methotrexate is a structural analog of folic acid and competes directly for the active site of dihydrofolate reductase, it is a competitive inhibitor. Adding excess dihydrofolate can overcome methotrexate inhibition, consistent with competitive (not non-competitive) behavior.</p>',
        '<p><strong>B. Non-competitive inhibition:</strong> In pure noncompetitive inhibition the inhibitor binds the free enzyme and the enzyme-substrate complex equally well, lowering Vmax without changing the apparent Km. Binding away from the active site does not by itself produce that kinetic pattern. Methotrexate competes with dihydrofolate for the same site, and in the standard model a higher substrate concentration reduces competitive inhibition. That is a statement about enzyme kinetics, not a treatment instruction.</p>'],
      ['<li>Methotrexate is a structural analog of folate that binds the active site of dihydrofolate reductase - the definition of competitive inhibition.</li>',
        '<li>Methotrexate is a folate analog that competes with dihydrofolate at the active site of dihydrofolate reductase, which is the definition of competitive inhibition.</li>'],
      ['<li>Blocking DHFR prevents regeneration of tetrahydrofolate, halting thymidylate and purine synthesis and therefore DNA replication.</li>',
        '<li>Blocking DHFR reduces the regeneration of tetrahydrofolate, so thymidylate and purine synthesis, and therefore DNA synthesis, can be restricted.</li>'],
      ['<li>The effect falls hardest on rapidly dividing cells, which is the basis of its use in cancer and autoimmune disease.</li>',
        '<li>The effect falls hardest on rapidly dividing cells, which is the basis of its use in cancer chemotherapy.</li>'],
      ['<li>As a rule, antimetabolites that mimic a normal substrate act as competitive inhibitors - the structural resemblance is the clue.</li>',
        '<li>In the standard competitive-inhibition model, apparent Km increases while Vmax is unchanged. Structural resemblance alone does not determine an inhibitor\'s mechanism.</li>']
    ],
    gone: ['structural analog of folic acid', 'Adding excess dihydrofolate can overcome',
      'cancer and autoimmune disease', 'antimetabolites that mimic a normal substrate act as competitive inhibitors']
  },

  // -------------------------------------------------------------- Q4 bio-347
  {
    q: 4, id: 'bio-347', expectLetter: 'C',
    stemFull: 'Which cell is the principal producer of collagen fibers and ground substance in connective tissue proper?',
    explanation: [
      ['<p>Fibroblasts are the most abundant cells in connective tissue and are responsible for synthesizing and secreting the components of the extracellular matrix, including collagen, elastin, reticular fibers, and ground substance (proteoglycans and glycosaminoglycans). Macrophages are phagocytic, mast cells release histamine and heparin, and plasma cells produce antibodies.</p>',
        '<p>Fibroblasts are the principal cells of connective tissue proper and synthesize and secrete the components of its extracellular matrix, including collagen, elastin, reticular fibers, and ground substance (proteoglycans and glycosaminoglycans). In specialized connective tissues the matrix comes from other cells, such as chondrocytes in cartilage and osteoblasts in bone. Macrophages are mainly phagocytic, mast cells release histamine and other granule contents, and plasma cells produce antibodies.</p>'],
      ['<p><strong>A. Macrophage:</strong> Macrophages are the phagocytic cells of connective tissue. They engulf debris, dead cells and pathogens and present antigen to lymphocytes. They live within the matrix but consume material rather than secreting it.</p>',
        '<p><strong>A. Macrophage:</strong> Macrophages are the phagocytic cells of connective tissue. They engulf debris, dead cells and pathogens and present antigen to lymphocytes, and they also secrete signaling molecules such as cytokines. Their principal role here is phagocytosis and immune regulation rather than bulk matrix production.</p>'],
      ['<p><strong>B. Mast cell:</strong> Mast cells store granules of histamine and heparin and release them during allergic and inflammatory responses. They alter the local environment - vascular permeability and blood flow - but synthesise neither collagen nor ground substance.</p>',
        '<p><strong>B. Mast cell:</strong> Mast cells store granules containing histamine and heparin, itself a proteoglycan, and release them during allergic and inflammatory responses. They alter the local environment, including vascular permeability and blood flow, but they are not the principal producers of connective-tissue matrix.</p>'],
      ['<li>Do not confuse them with the other resident cells: macrophages phagocytose and present antigen, mast cells release histamine and heparin, and neither builds matrix.</li>',
        '<li>Compare the principal roles of the other resident cells: macrophages phagocytose and present antigen, and mast cells release histamine and other granule contents during inflammation.</li>'],
      ['<li>The suffix -blast marks the active matrix-producing cell (osteoblast, chondroblast); -cyte marks the quieter maintenance form.</li>',
        '<li>Other connective tissues rely on their own cells: chondrocytes maintain cartilage matrix, osteoblasts lay down bone matrix, and osteocytes sense mechanical load and help regulate remodeling.</li>']
    ],
    gone: ['consume material rather than secreting it', 'synthesise neither collagen nor ground substance',
      'neither builds matrix', 'The suffix -blast marks', 'most abundant cells in connective tissue']
  },

  // -------------------------------------------------------------- Q5 bio-348
  {
    q: 5, id: 'bio-348', expectLetter: 'B',
    explanation: [
      ['In cardiac muscle, T-tubules are wider and located at the Z-lines',
        'In ventricular cardiomyocytes, T-tubules are wider and located at the Z-lines'],
      ['<li>Electrical coupling through gap junctions is what allows the heart to contract as one unit rather than as independent fibres.</li>',
        '<li>Electrical coupling through gap junctions helps coordinate contraction within cardiac muscle; atrial and ventricular activation normally occur in sequence.</li>']
    ],
    gone: ['contract as one unit rather than as independent fibres', 'In cardiac muscle, T-tubules are wider']
  },

  // -------------------------------------------------------------- Q6 bio-349
  {
    q: 6, id: 'bio-349', expectLetter: 'C',
    stemFull: 'Which type of cartilage forms the annulus fibrosus of intervertebral discs and the fibrocartilaginous disc of the pubic symphysis?',
    explanation: [
      ['<p>Fibrocartilage contains abundant type I collagen fibers arranged in thick, parallel bundles, giving it exceptional tensile strength and the ability to resist compressive forces. It is found in intervertebral discs, the pubic symphysis, menisci of the knee, and the temporomandibular joint. Unlike hyaline cartilage, fibrocartilage lacks a perichondrium. Elastic cartilage (in the ear pinna and epiglottis) contains elastic fibers.</p>',
        '<p>Fibrocartilage contains abundant type I collagen in thick, prominent bundles, which suits it to places where tensile and compressive forces act together. It forms the annulus fibrosus of the intervertebral discs, the pubic symphysis, the menisci of the knee, and the disc of the temporomandibular joint. The nucleus pulposus at the centre of an intervertebral disc is a different, gel-like tissue, so the whole disc is not simply fibrocartilage. Fibrocartilage has no perichondrium, although articular hyaline cartilage lacks one as well.</p>'],
      ['<p><strong>A. Hyaline cartilage:</strong> Hyaline cartilage is the most common type of cartilage and is found covering articular surfaces of joints, in the tracheal rings, nose, and fetal skeleton. It has a glassy, translucent matrix with fine collagen fibers and provides smooth, low-friction surfaces for joint movement. Unlike fibrocartilage, it lacks the dense collagen bundles needed for withstanding heavy compression.</p>',
        '<p><strong>A. Hyaline cartilage:</strong> Hyaline cartilage is the most common type of cartilage and is found covering articular surfaces of joints, in the tracheal rings, nose, and fetal skeleton. It has a glassy, translucent matrix built on a fine network of type II collagen, it gives smooth, low-friction joint surfaces, and it also withstands compression. The useful distinction is the abundant, prominent bundles of type I collagen in fibrocartilage.</p>'],
      ['<p><strong>B. Elastic cartilage:</strong> Elastic cartilage (in the ear pinna and epiglottis) contains elastic fibers.</p>',
        '<p><strong>B. Elastic cartilage:</strong> Elastic cartilage contains elastic fibers alongside its collagen, so it bends and springs back into shape. It forms the pinna of the ear, the epiglottis and the walls of the auditory tube. Flexibility, rather than the heavy type I collagen bundles of the discs and symphysis, is what it provides.</p>'],
      ['<p><strong>D. Calcified cartilage:</strong> Calcified cartilage is not a primary cartilage type but rather refers to cartilage that has undergone mineralization, as seen in the zone of calcified cartilage at the growth plate during endochondral ossification. It represents cartilage being replaced by bone and is not a functional tissue designed to bear loads like fibrocartilage.</p>',
        '<p><strong>D. Calcified cartilage:</strong> Calcified cartilage has a mineralized matrix. It occurs during endochondral bone formation and persists at the interface between articular cartilage and the underlying bone, where it helps transfer load. It is not the tissue named in this question.</p>'],
      ['<li>It is therefore found wherever tension and compression act together: intervertebral discs, pubic symphysis, menisci, and some tendon insertions.</li>',
        '<li>It is well suited to sites where tensile and compressive forces act together, such as the annulus fibrosus, pubic symphysis, menisci, and some tendon insertions.</li>'],
      ['<li>Unlike hyaline and elastic cartilage, fibrocartilage has no perichondrium.</li>',
        '<li>Fibrocartilage has no perichondrium, but articular hyaline cartilage lacks one too, so this is not a unique identifying feature.</li>']
    ],
    gone: ['lacks the dense collagen bundles needed for withstanding heavy compression',
      'is not a functional tissue designed to bear loads', 'not a primary cartilage type',
      'found wherever tension and compression act together', 'Unlike hyaline and elastic cartilage']
  },

  // -------------------------------------------------------------- Q7 bio-350
  {
    q: 7, id: 'bio-350', expectLetter: 'B',
    explanation: [
      ['The stomach lining also contains gastric pits with chief cells (pepsinogen) and parietal cells (HCl and intrinsic factor).',
        'Chief cells (pepsinogen) and parietal cells (hydrochloric acid and intrinsic factor) lie in the gastric glands, which open into the gastric pits.'],
      ['<li>Smoking first paralyses and then destroys the cilia, which is why mucus accumulates and a chronic cough develops.</li>',
        '<li>Smoking damages cilia and impairs mucociliary clearance, which is why mucus accumulates and a chronic cough develops.</li>']
    ],
    gone: ['gastric pits with chief cells', 'Smoking first paralyses and then destroys']
  },

  // -------------------------------------------------------------- Q8 bio-351
  {
    q: 8, id: 'bio-351', expectLetter: 'B',
    explanation: [
      ['<p><strong>C. Astrocytes:</strong> Astrocytes are the most abundant glial cells of the CNS. They provide metabolic and structural support, regulate extracellular ions and neurotransmitters, and contribute end-feet to the blood-brain barrier. They produce no myelin.</p>',
        '<p><strong>C. Astrocytes:</strong> Astrocytes provide metabolic and structural support, regulate extracellular ions and neurotransmitters, and send end-feet to brain capillaries, where they support the blood-brain barrier. The physical barrier itself is formed principally by tight junctions between the capillary endothelial cells. Astrocytes produce no myelin.</p>'],
      ['<p><strong>D. Microglia:</strong> Microglia are the resident immune cells of the CNS and derive from the monocyte-macrophage lineage rather than from neural tissue. They phagocytose debris and damaged cells and drive neuroinflammation, but take no part in myelination.</p>',
        '<p><strong>D. Microglia:</strong> Microglia are the resident immune cells of the CNS and derive largely from embryonic yolk-sac myeloid precursors rather than from circulating adult monocytes. They phagocytose debris and damaged cells and take part in neuroinflammation, but they do not form myelin sheaths.</p>'],
      ['<li>Multiple sclerosis attacks CNS myelin, whereas Guillain-Barré syndrome attacks PNS myelin - the same molecule, different cells and very different diseases.</li>',
        '<li>Myelin is a membrane sheath rich in lipids and proteins. Multiple sclerosis involves CNS demyelination; a common form of Guillain-Barré syndrome damages peripheral myelin, while other forms primarily affect axons.</li>']
    ],
    gone: ['most abundant glial cells', 'derive from the monocyte-macrophage lineage', 'take no part in myelination',
      'the same molecule, different cells']
  },

  // -------------------------------------------------------------- Q9 bio-352
  {
    q: 9, id: 'bio-352', expectLetter: 'B',
    explanation: [[
      '<p><strong>A. Randomly oriented collagen fibers with many cell types:</strong> Randomly oriented collagen fibers with many cell types describes dense irregular connective tissue, which is found in the dermis of the skin and organ capsules. The random arrangement of collagen provides strength in all directions, making it ideal for tissues that experience multidirectional forces.</p>',
      '<p><strong>A. Randomly oriented collagen fibers with many cell types:</strong> Collagen arranged in many directions resists forces from several directions, as in dense irregular connective tissue. Tendons instead contain closely packed, parallel collagen bundles. Numerous varied cell types are more characteristic of loose connective tissue than of dense collagenous tissue.</p>'
    ]],
    gone: ['describes dense irregular connective tissue, which is found in the dermis']
  },

  // ------------------------------------------------------------- Q10 bio-353
  {
    q: 10, id: 'bio-353', expectLetter: 'B',
    explanation: [
      ['<p><strong>A. Lung alveoli:</strong> Lung alveoli are lined by simple squamous epithelium for gas exchange.</p>',
        '<p><strong>A. Lung alveoli:</strong> Lung alveoli are lined by simple squamous epithelium, a single layer of very thin cells that makes the diffusion distance for oxygen and carbon dioxide as short as possible. Gas exchange, not absorption of nutrients, is the job there, so no brush border of microvilli is present.</p>'],
      ['<li>The proximal renal tubule has a brush border for the same reason; the stomach is also simple columnar but lacks one, because it secretes rather than absorbs.</li>',
        '<li>The proximal renal tubule also has a brush border, but its epithelium is simple cuboidal. The stomach has simple columnar epithelium whose surface cells primarily secrete protective mucus rather than forming an intestinal-type absorptive brush border.</li>']
    ],
    gone: ['has a brush border for the same reason', 'because it secretes rather than absorbs']
  },

  // ------------------------------------------------------------- Q11 bio-354
  {
    q: 11, id: 'bio-354', expectLetter: 'C',
    explanation: [
      ['<p><strong>B. Osteocyte:</strong> Osteocytes are osteoblasts that became trapped in the matrix they themselves secreted. Sitting in lacunae, they maintain the surrounding bone and sense mechanical loading, but they do not carry out resorption.</p>',
        '<p><strong>B. Osteocyte:</strong> Osteocytes are osteoblasts that became trapped in the matrix they themselves secreted. Embedded in lacunae, they sense mechanical loading and help regulate remodeling. Osteoclasts are the specialized cells responsible for bulk resorption at bone surfaces.</p>'],
      ['<li>PTH does not act on osteoclasts directly: it stimulates osteoblasts to express RANKL, which then activates osteoclasts. Calcitonin inhibits them directly.</li>',
        '<li>PTH does not act on osteoclasts directly: it acts on osteoblast-lineage cells, including osteocytes, which express RANKL and so activate osteoclasts. Calcitonin inhibits osteoclasts directly.</li>']
    ],
    gone: ['they do not carry out resorption', 'it stimulates osteoblasts to express RANKL']
  },

  // ------------------------------------------------------------- Q12 bio-355
  {
    q: 12, id: 'bio-355', expectLetter: 'B',
    explanation: [[
      '<p><strong>C. Temperature changes:</strong> Temperature changes are detected by free nerve endings called thermoreceptors. Cold receptors respond to temperatures between about 10-35 degrees C, while warm receptors respond between 30-45 degrees C. Extreme temperatures activate nociceptors (pain receptors) rather than thermoreceptors.</p>',
      "<p><strong>C. Temperature changes:</strong> Temperature is detected by temperature-sensitive free nerve endings. Potentially damaging heat or cold also activates nociceptors. Meissner's corpuscles are encapsulated mechanoreceptors for light touch and low-frequency vibration.</p>"
    ]],
    gone: ['Cold receptors respond to temperatures between about 10-35 degrees C', 'rather than thermoreceptors']
  }

];
