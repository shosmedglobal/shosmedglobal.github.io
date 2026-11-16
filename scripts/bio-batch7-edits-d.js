/**
 * Batch 7 review, displayed Q37-Q48 (bio-380 .. bio-392).
 * Q42-Q48 share one generic three-point block; the review replaces it in each
 * of them with question-specific points.
 */
'use strict';

const points = items => '<h4>Key Educational Points:</h4><ul>' + items.map(t => '<li>' + t + '</li>').join('') + '</ul>';

const GENERIC_PHOTO = '<h4>Key Educational Points:</h4><ul><li>Photosynthesis converts light energy to chemical energy in two stages: light reactions (thylakoid membranes) produce ATP and NADPH, and the Calvin cycle (stroma) fixes CO2 into sugar.</li><li>The light reactions involve two photosystems: PSII (splits water, releases O2) and PSI (reduces NADP+ to NADPH).</li><li>C3, C4, and CAM plants have different strategies for carbon fixation adapted to their environments, balancing photosynthesis efficiency against water loss.</li></ul>';

module.exports = [

  // ------------------------------------------------------------- Q37 bio-380
  {
    q: 37, id: 'bio-380', expectLetter: 'A',
    explanation: [
      ['Mutations that impair GTPase activity (e.g., at codon 12) lock Ras in the active state, contributing to cancer.',
        'Many cancer-associated Ras variants impair normal switch-off and increase signaling from the active GTP-bound state.'],
      ['Mutations in Ras that lock it in the active GTP-bound state are found in approximately 30% of human cancers.',
        'Ras variants that impair normal switch-off, and so increase signaling from the GTP-bound state, are found in a large share of human cancers.'],
      ['<li>Mutations at codons 12, 13, or 61 impair hydrolysis and lock Ras in the active state - among the most common oncogenic changes in human cancer.</li>',
        '<li>Many cancer-associated variants, such as those at codons 12, 13 and 61, impair normal switch-off and increase signaling from the active GTP-bound state. They are among the most common oncogenic changes in human cancer.</li>']
    ],
    gone: ['lock Ras in the active state', 'lock it in the active GTP-bound state', 'impair hydrolysis and lock Ras']
  },

  // ------------------------------------------------------------- Q38 bio-381
  {
    q: 38, id: 'bio-381', expectLetter: 'B',
    explanation: [[
      '<p><strong>D. Opening ligand-gated sodium channels:</strong> Opening ligand-gated sodium channels describes the action of neurotransmitters like acetylcholine at the neuromuscular junction. NO does not directly open ion channels. Instead, NO acts through the cGMP pathway, which can indirectly modulate ion channels through PKG-mediated phosphorylation.</p>',
      '<p><strong>D. Opening ligand-gated sodium channels:</strong> Nicotinic acetylcholine receptors are ligand-gated cation channels that conduct Na⁺ and K⁺, rather than sodium-only channels. The smooth-muscle signaling mechanism tested here is different: NO activates soluble guanylyl cyclase, increasing cGMP. NO can still influence ion channels indirectly, for example through PKG-mediated phosphorylation.</p>'
    ]],
    gone: ['NO does not directly open ion channels']
  },

  // ------------------------------------------------------------- Q39 bio-382
  {
    q: 39, id: 'bio-382', expectLetter: 'B',
    stemFull: 'Cholera toxin causes persistent activation of Gₛ signaling by:',
    explanation: [
      ['This locks αₛ in the permanently active GTP-bound state, causing continuous activation of adenylyl cyclase and sustained elevation of cAMP. In intestinal epithelial cells, this leads to massive secretion of Cl− and water, producing the severe watery diarrhea characteristic of cholera.',
        'Impaired GTP hydrolysis leaves αₛ in the active GTP-bound state for a sustained period, so adenylyl cyclase is persistently activated and cAMP stays high. In intestinal epithelial cells the sequence is: Gₛ activation → adenylyl cyclase → increased cAMP → PKA activation → phosphorylation of CFTR and increased chloride secretion → water follows by osmosis, producing the severe watery diarrhea characteristic of cholera.'],
      ['This means the alpha-s subunit cannot hydrolyze GTP back to GDP and remains permanently active.',
        'This means the alpha-s subunit hydrolyses GTP back to GDP poorly and stays active far longer than it should.'],
      ['Cholera toxin causes persistent activation of adenylyl cyclase (via locked-on Gs), leading to massive cAMP accumulation, which opens CFTR chloride channels and causes the severe watery diarrhea characteristic of cholera.',
        'Cholera toxin causes persistent activation of adenylyl cyclase, so cAMP rises and activates PKA, which phosphorylates CFTR chloride channels. Chloride and water secretion follow, producing the severe watery diarrhea characteristic of cholera.'],
      ['The mechanism is indirect: permanent Gs activation leads to constitutive adenylyl cyclase activity, excessive cAMP production, persistent PKA activation, and then PKA-mediated phosphorylation of CFTR chloride channels.',
        'The mechanism is indirect: sustained Gs activation leads to persistent adenylyl cyclase activity, increased cAMP, persistent PKA activation, and then PKA-mediated phosphorylation of CFTR chloride channels.'],
      ['<li>Cholera toxin ADP-ribosylates the αₛ subunit, abolishing its GTPase activity and locking Gₛ in the active GTP-bound state.</li>',
        '<li>Cholera toxin ADP-ribosylates the αₛ subunit, impairing its GTPase activity so that Gₛ remains in the active GTP-bound state.</li>'],
      ['<li>Adenylyl cyclase is therefore permanently stimulated and cAMP rises without restraint.</li>',
        '<li>Adenylyl cyclase is therefore persistently stimulated and cAMP production increases, although the cell\'s degradation mechanisms still operate.</li>']
    ],
    gone: ['permanently activates', 'locks αₛ in the permanently active', 'remains permanently active',
      'via locked-on Gs', 'permanent Gs activation', 'abolishing its GTPase activity',
      'cAMP rises without restraint']
  },

  // ------------------------------------------------------------- Q40 bio-383
  {
    q: 40, id: 'bio-383', expectLetter: 'C',
    stemFull: 'The classical genomic effects of cortisol are initiated by which mechanism?',
    explanation: [
      ['This mechanism produces slower but more prolonged effects compared to cell surface receptor signaling.',
        'The response typically develops over minutes to hours and may last longer, in contrast with the faster action of cell surface receptor signaling.'],
      ['<p><strong>A. Binding to G protein-coupled receptors on the cell surface:</strong> GPCRs on the cell surface bind water-soluble signaling molecules (like epinephrine, serotonin, and glucagon) that cannot cross the plasma membrane. Steroid hormones are lipophilic and can freely diffuse through the membrane, so they do not need surface receptors. They bind to intracellular receptors that act as ligand-activated transcription factors.</p>',
        '<p><strong>A. Binding to G protein-coupled receptors on the cell surface:</strong> Many GPCR ligands are water soluble, such as epinephrine, serotonin and glucagon, although that is not a universal rule. Cortisol is lipophilic and crosses the plasma membrane readily, and its classical genomic effect is initiated by an intracellular receptor acting as a transcription factor rather than by a surface receptor.</p>'],
      ['<p><strong>B. Activating receptor tyrosine kinases in the cytoplasm:</strong> Receptor tyrosine kinases are activated by peptide growth factors (EGF, insulin, PDGF) that bind to the extracellular domain. RTKs signal through phosphorylation cascades, not through gene transcription regulation like steroid receptors. Steroids work by entering the cell and directly modifying gene expression, a mechanism that takes hours but produces long-lasting effects.</p>',
        '<p><strong>B. Activating receptor tyrosine kinases in the cytoplasm:</strong> RTKs are cell-surface receptors with intracellular kinase domains. They can influence gene transcription through signaling pathways such as Ras-MAPK. Cortisol\'s classical genomic effect instead involves an intracellular receptor that acts as a transcription factor.</p>'],
      ['<p><strong>D. Opening ligand-gated ion channels on the cell surface:</strong> Ligand-gated ion channels are activated by neurotransmitters (acetylcholine, GABA, glutamate) for rapid synaptic transmission occurring in milliseconds. Steroid hormones do not open ion channels. Their mechanism of action involves binding to nuclear receptors, forming receptor-hormone complexes that bind to hormone response elements (HREs) on DNA to regulate transcription.</p>',
        '<p><strong>D. Opening ligand-gated ion channels on the cell surface:</strong> Ligand-gated ion channels are activated by neurotransmitters (acetylcholine, GABA, glutamate) for rapid synaptic transmission in milliseconds. That is not the classical genomic mechanism asked about, which involves an intracellular receptor binding hormone response elements (HREs) on DNA. Some steroids do have rapid, nongenomic actions, including effects on ion channels, but those are a separate story.</p>'],
      ['<li>Because the response requires transcription and translation, onset is slow (hours) but sustained.</li>',
        '<li>Because the response requires transcription and translation, it typically develops over minutes to hours and may last longer.</li>'],
      ['<li>This contrasts with cell surface receptors, which act within seconds to minutes through second messengers.</li>',
        '<li>This contrasts with cell surface receptors, which act within seconds to minutes through second messengers and reach transcription factors only indirectly, through signalling pathways.</li>']
    ],
    gone: ['slower but more prolonged effects', 'that cannot cross the plasma membrane',
      'Steroid hormones do not open ion channels', 'onset is slow (hours) but sustained',
      'not through gene transcription regulation like steroid receptors']
  },

  // ------------------------------------------------------------- Q41 bio-384
  {
    q: 41, id: 'bio-384', expectLetter: 'B',
    stemFull: 'Which receptor class activates the classical Ras-Raf-MEK-ERK pathway through receptor tyrosine autophosphorylation and recruitment of Grb2/SOS?',
    explanation: [
      ['<p>The MAPK (Ras-Raf-MEK-ERK) cascade is a key signaling pathway downstream of receptor tyrosine kinases (RTKs). Upon RTK activation and autophosphorylation, adaptor proteins (Grb2/SOS) activate Ras, which then activates the kinase cascade: Ras → Raf (MAPKKK) → MEK (MAPKK) → ERK (MAPK). Activated ERK enters the nucleus and phosphorylates transcription factors controlling cell proliferation and differentiation. Dysregulation of this pathway is common in cancer.</p>',
        '<p>Activated receptor tyrosine kinases recruit signaling proteins to their phosphorylated tyrosines. The adaptor Grb2 recruits SOS, a guanine-nucleotide exchange factor that promotes release of GDP from Ras and binding of GTP. Ras-GTP activates Raf. Raf phosphorylates MEK, and MEK phosphorylates ERK. Activated ERK can regulate cytoplasmic targets and nuclear transcription factors, influencing cell growth and differentiation. Dysregulation of this pathway is common in cancer.</p>'],
      ['<p><strong>A. Gᵢ-coupled receptor:</strong> Gi-coupled receptors inhibit adenylyl cyclase and reduce cAMP levels. While they can activate some signaling pathways (like beta-gamma subunit-mediated pathways), the classical MAPK cascade (Ras-Raf-MEK-ERK) is primarily activated downstream of receptor tyrosine kinases, not Gi-coupled receptors.</p>',
        '<p><strong>A. Gᵢ-coupled receptor:</strong> Gi-coupled receptors inhibit adenylyl cyclase and reduce cAMP. They can also activate MAPK signaling, including through G-protein beta-gamma subunits. What they do not use is the receptor\'s own tyrosine-kinase autophosphorylation mechanism specified in the stem.</p>'],
      ['<p><strong>C. Nuclear steroid receptor:</strong> Nuclear steroid receptors are intracellular transcription factors that directly regulate gene expression. They do not activate the MAPK cascade as their primary mechanism. The MAPK cascade is a cytoplasmic phosphorylation relay, while steroid receptors work by binding DNA regulatory elements in the nucleus.</p>',
        '<p><strong>C. Nuclear steroid receptor:</strong> Classical nuclear-receptor signaling regulates transcription through the receptor itself, binding DNA regulatory elements in the nucleus. That is not the receptor tyrosine kinase mechanism described in the stem. Signaling pathways can and do interact, but that is a separate matter.</p>'],
      ['<p><strong>D. Ligand-gated ion channel:</strong> Ligand-gated ion channels produce rapid ion fluxes for synaptic transmission and do not typically activate the MAPK cascade. The MAPK pathway requires Ras activation, which occurs when RTK autophosphorylation recruits adaptor proteins (Grb2-SOS) that catalyze GDP-to-GTP exchange on Ras.</p>',
        '<p><strong>D. Ligand-gated ion channel:</strong> Ligand-gated ion channels produce rapid ion fluxes for synaptic transmission. They can influence signaling indirectly through changes in ions such as calcium, but they are not receptors with the tyrosine-kinase autophosphorylation mechanism named in the stem.</p>'],
      ['<li>The MAPK cascade runs Ras to Raf (MAPKKK) to MEK (MAPKK) to ERK (MAPK), typically downstream of an RTK.</li>',
        '<li>The classical Ras-ERK branch runs Ras → Raf (MAPKKK) → MEK (MAPKK) → ERK (MAPK), typically downstream of an RTK; other MAPK pathways exist.</li>'],
      ['<li>Grb2 and SOS couple the phosphorylated receptor to Ras activation.</li>',
        '<li>Grb2 is the adaptor that couples the phosphorylated receptor to SOS, and SOS is the guanine-nucleotide exchange factor that loads Ras with GTP.</li>'],
      ['<li>Each tier phosphorylates the next, so the cascade both amplifies the signal and creates multiple points of regulation.</li>',
        '<li>Ras-GTP activates Raf; the kinase phosphorylation relay is Raf → MEK → ERK. Ras is a GTPase and does not phosphorylate Raf.</li>']
    ],
    gone: ['adaptor proteins (Grb2/SOS) activate Ras', 'primarily activated downstream of receptor tyrosine kinases',
      'They do not activate the MAPK cascade as their primary mechanism', 'Grb2-SOS) that catalyze GDP-to-GTP exchange',
      'Each tier phosphorylates the next']
  },

  // ------------------------------------------------------------- Q42 bio-386
  {
    q: 42, id: 'bio-386', expectLetter: 'C',
    explanation: [[GENERIC_PHOTO, points([
      'The Calvin cycle occurs in the chloroplast stroma and incorporates carbon from CO₂ into organic molecules.',
      'ATP provides energy and NADPH provides reducing power for producing G3P from fixed carbon.',
      'Most cycle intermediates regenerate RuBP; some G3P supplies carbohydrate synthesis. The cycle does not directly absorb light, but normally depends on products of the light reactions.'
    ])]]
  },

  // ------------------------------------------------------------- Q43 bio-387
  {
    q: 43, id: 'bio-387', expectLetter: 'B',
    stemFull: 'In a typical C4 plant such as maize, how is photorespiration reduced?',
    optionFull: [[1, 'Using PEP carboxylase in mesophyll cells to form four-carbon compounds that deliver CO₂ to bundle-sheath cells']],
    explanation: [
      ['<h4>Correct Answer: B. Using PEP carboxylase to initially fix CO₂ in mesophyll cells, then releasing it in bundle sheath cells</h4><p>C4 plants (e.g., maize, sugarcane) spatially separate initial carbon fixation from the Calvin cycle. PEP carboxylase in mesophyll cells fixes CO₂ into oxaloacetate (4-carbon compound), which is converted to malate and transported to bundle sheath cells. There, CO₂ is released and concentrated around RuBisCO, minimizing photorespiration. CAM plants (not C4) open stomata at night and store CO₂ as malic acid.</p>',
        '<h4>Correct Answer: B. Using PEP carboxylase in mesophyll cells to form four-carbon compounds that deliver CO₂ to bundle-sheath cells</h4><p>Typical C4 plants, such as maize and sugarcane, separate initial carbon capture from the Calvin cycle in space. In mesophyll cells, CO₂ is converted to bicarbonate (HCO₃⁻), which PEP carboxylase adds to PEP to form oxaloacetate. A four-carbon acid, commonly malate, then carries the carbon to bundle-sheath cells, where CO₂ is released near RuBisCO. The raised CO₂ concentration there limits the oxygenase reaction and so reduces photorespiration. Not every C4 subtype transports malate. CAM plants, by contrast, usually open stomata at night and store carbon as malic acid.</p>'],
      ['Opening stomata only at night to fix CO2 describes CAM (Crassulacean Acid Metabolism) plants like cacti and succulents, not C4 plants. CAM plants temporally separate carbon fixation (night) from the Calvin cycle (day) to minimize water loss in extremely arid environments.',
        'Opening stomata at night to fix CO2 describes the usual pattern of CAM (Crassulacean Acid Metabolism) plants, such as cacti and succulents, not of C4 plants. CAM plants separate carbon capture (mainly at night) from the Calvin cycle (during the day) to limit water loss in arid environments.'],
      [GENERIC_PHOTO, points([
        'PEP carboxylase initially incorporates bicarbonate into a four-carbon compound in mesophyll cells.',
        'Release of CO₂ in bundle-sheath cells raises the CO₂ concentration around RuBisCO and limits its oxygenase reaction.',
        'Typical C4 plants separate initial carbon capture and the Calvin cycle spatially; CAM plants mainly separate these steps between night and day.'
      ])]
    ],
    gone: ['Using PEP carboxylase to initially fix CO₂ in mesophyll cells, then releasing it',
      'minimize water loss in extremely arid environments', 'CAM plants (not C4) open stomata at night']
  },

  // ------------------------------------------------------------- Q44 bio-388
  {
    q: 44, id: 'bio-388', expectLetter: 'C',
    stemFull: 'Which molecule is the final electron acceptor in linear (non-cyclic) photosynthetic electron flow?',
    explanation: [
      ['<p><strong>A. O₂:</strong> O2 is a product of the light reactions (released when water is split at PSII), not an electron acceptor. In photosynthesis, oxygen is liberated as a byproduct. Interestingly, in cellular respiration, the roles are reversed: O2 is the final electron acceptor in the mitochondrial electron transport chain.</p>',
        '<p><strong>A. O₂:</strong> In this pathway oxygen is produced by the oxidation of water at PSII and released as a by-product; it is not the acceptor at the end of the chain. In cellular respiration the roles are reversed: O2 is the final electron acceptor of the mitochondrial electron transport chain.</p>'],
      [GENERIC_PHOTO, points([
        'In linear electron flow, water supplies electrons and oxygen is released at photosystem II.',
        'Electrons pass through photosystem II and photosystem I before reducing NADP⁺ to NADPH.',
        'NADPH supplies reducing power for the Calvin cycle; cyclic flow around photosystem I does not produce net NADPH.'
      ])]
    ],
    gone: ['O2 is a product of the light reactions (released when water is split at PSII), not an electron acceptor']
  },

  // ------------------------------------------------------------- Q45 bio-389
  {
    q: 45, id: 'bio-389', expectLetter: 'B',
    stemFull: 'Why can photorespiration reduce net carbon gain in C3 plants?',
    optionFull: [[1, 'It consumes energy and releases some previously fixed carbon as CO₂']],
    explanation: [
      ['<h4>Correct Answer: B. RuBisCO fixes O₂ instead of CO₂, consuming ATP and releasing CO₂ without producing sugar</h4><p>Photorespiration occurs when RuBisCO catalyzes the oxygenation of RuBP (instead of carboxylation), producing one 3-PGA and one 2-phosphoglycolate. The salvage of 2-phosphoglycolate consumes ATP and releases previously fixed CO₂, reducing photosynthetic efficiency by 25-30% in C3 plants. This process is favored by high O₂/CO₂ ratios and high temperatures. C4 and CAM plants have evolved mechanisms to minimize photorespiration.</p>',
        '<h4>Correct Answer: B. It consumes energy and releases some previously fixed carbon as CO₂</h4><p>RuBisCO can react with oxygen instead of carbon dioxide. Oxygenation of RuBP produces one molecule of 3-phosphoglycerate (3-PGA) and one molecule of 2-phosphoglycolate. The latter cannot enter the Calvin cycle directly and must be processed through the photorespiratory salvage pathway. This recycling returns much of its carbon to the Calvin cycle, but uses energy and releases some carbon as CO₂. Photorespiration therefore reduces net carbon gain compared with carboxylation. It becomes more prominent when CO₂ around RuBisCO is low, often during hot, dry conditions when stomata close.</p>'],
      ['<p><strong>A. It produces toxic reactive oxygen species that destroy chloroplasts:</strong> While reactive oxygen species (ROS) can be generated during photosynthesis and do damage chloroplasts under stress conditions, this is not the definition of photorespiration. Photorespiration specifically refers to RuBisCO fixing O2 instead of CO2, producing phosphoglycolate, which must be salvaged through an energy-costly pathway that releases CO2 without producing useful sugar.</p>',
        '<p><strong>A. It produces toxic reactive oxygen species that destroy chloroplasts:</strong> Photorespiratory metabolism can produce hydrogen peroxide, which cells normally remove. However, destruction of chloroplasts by reactive oxygen species is not the defining explanation for reduced carbon gain. The key costs are energy consumption and loss of some previously fixed carbon during salvage.</p>'],
      ['<p><strong>C. It depletes the plant\'s water supply by opening stomata excessively:</strong> Excessive stomatal opening and water loss is not what defines photorespiration. In fact, photorespiration becomes problematic precisely when stomata close (to conserve water on hot, dry days), causing O2 to accumulate and CO2 to decline inside the leaf. This increases the ratio of O2 to CO2, making RuBisCO more likely to fix O2 instead of CO2.</p>',
        '<p><strong>C. It depletes the plant\'s water supply by opening stomata excessively:</strong> Excessive stomatal opening is not the cause. Stomatal closure conserves water but can lower the CO₂ concentration inside the leaf, making RuBisCO\'s oxygenase reaction more likely relative to carboxylation. Photorespiration is a metabolic pathway, not a mechanism that directly forces stomata open.</p>'],
      ['<p><strong>D. It converts chlorophyll to pheophytin, reducing light absorption:</strong> Chlorophyll conversion to pheophytin is part of the normal photochemical reaction at the reaction center, not photorespiration. When chlorophyll in the reaction center donates an electron, it briefly becomes an oxidized form. Pheophytin is actually the first electron acceptor in PSII. This is normal photosynthesis, not a wasteful side reaction.</p>',
        '<p><strong>D. It converts chlorophyll to pheophytin, reducing light absorption:</strong> Pheophytin is a chlorophyll-related pigment without the central magnesium ion, and it acts as an electron acceptor in photosystem II. A chlorophyll molecule does not become pheophytin merely by donating an electron. This pigment chemistry is separate from RuBisCO oxygenation and photorespiratory carbon recycling.</p>'],
      [GENERIC_PHOTO, points([
        'RuBisCO oxygenation produces 3-PGA and 2-phosphoglycolate instead of the two 3-PGA molecules formed by carboxylation.',
        'Photorespiration salvages carbon from 2-phosphoglycolate, but costs energy and releases some carbon as CO₂.',
        'Low CO₂ relative to O₂ around RuBisCO favors photorespiration; C4 and CAM carbon-concentrating mechanisms reduce it.'
      ])]
    ],
    gone: ['reducing photosynthetic efficiency by 25-30%', 'Pheophytin is actually the first electron acceptor in PSII',
      'without producing useful sugar', 'RuBisCO fixes O₂ instead of CO₂, consuming ATP and releasing CO₂']
  },

  // ------------------------------------------------------------- Q46 bio-390
  {
    q: 46, id: 'bio-390', expectLetter: 'B',
    explanation: [
      ['<p>CAM plants (e.g., cacti, pineapple, succulents) temporally separate carbon fixation from the Calvin cycle. Stomata open at night (when evapotranspiration is minimal) and CO₂ is fixed by PEP carboxylase into oxaloacetate, then converted to malic acid and stored in vacuoles. During the day, stomata close to conserve water while malic acid is decarboxylated to release CO₂ for the Calvin cycle. C4 plants use spatial separation with different cell types.</p>',
        '<p>CAM plants, including many succulents, cacti and pineapple, separate carbon capture from the Calvin cycle in time. Stomata open mainly at night, when water loss is usually lower, and CO₂ is converted to bicarbonate (HCO₃⁻), which PEP carboxylase adds to PEP to form oxaloacetate. The carbon is stored mainly as malic acid in vacuoles overnight. During the day stomata can stay closed while malic acid is decarboxylated to release CO₂ for the Calvin cycle. Typical C4 plants instead separate the two steps between cell types.</p>'],
      ['CAM is a biochemical adaptation that minimizes water loss by opening stomata only at night when temperatures are cooler and humidity is higher, reducing transpiration rates dramatically.',
        'CAM is a biochemical adaptation that limits water loss by opening stomata mainly at night, when temperatures are usually cooler and humidity higher, which reduces transpiration.'],
      ['CAM is specifically a carbon fixation strategy involving nighttime CO2 uptake, storage as organic acids, and daytime decarboxylation for the Calvin cycle.',
        'CAM is specifically a carbon fixation strategy involving CO2 uptake mainly at night, storage as organic acids, and daytime decarboxylation for the Calvin cycle.'],
      [GENERIC_PHOTO, points([
        'CAM plants typically open stomata at night and store captured carbon as malic acid in vacuoles.',
        'During the day, stored acids release CO₂ for the Calvin cycle while stomata can remain closed, conserving water.',
        'CAM separates initial carbon capture and use by time; typical C4 photosynthesis separates them between cell types.'
      ])]
    ],
    gone: ['opening stomata only at night when temperatures are cooler', 'involving nighttime CO2 uptake',
      'when evapotranspiration is minimal']
  },

  // ------------------------------------------------------------- Q47 bio-391
  {
    q: 47, id: 'bio-391', expectLetter: 'C',
    explanation: [[GENERIC_PHOTO, points([
      'Cyclic electron flow routes electrons from photosystem I back through the electron-transport pathway rather than producing net NADPH.',
      'It supports the proton gradient used for ATP synthesis, without net oxygen production from water splitting.',
      'Cyclic flow helps meet extra ATP demand relative to NADPH demand.'
    ])]]
  },

  // ------------------------------------------------------------- Q48 bio-392
  {
    q: 48, id: 'bio-392', expectLetter: 'C',
    explanation: [
      ['PEP carboxylase has a much higher affinity for CO2 than RuBisCO and does not bind O2.',
        'PEP carboxylase uses bicarbonate rather than CO2 itself, so the two enzymes do not act on the same inorganic-carbon substrate, and it does not catalyse RuBisCO\'s competing oxygenase reaction.'],
      ['<p><strong>D. Oxaloacetate (OAA):</strong> Oxaloacetate (OAA) is the four-carbon product formed when PEP carboxylase fixes CO2 to PEP in C4 plants. It is not the acceptor molecule in the Calvin cycle. OAA is also an important intermediate in the citric acid cycle and in gluconeogenesis, but it has no role in the Calvin cycle itself.</p>',
        '<p><strong>D. Oxaloacetate (OAA):</strong> Oxaloacetate is the four-carbon product formed when PEP carboxylase adds bicarbonate to PEP in C4 plants. It is not the Calvin-cycle acceptor for RuBisCO. OAA is also an important intermediate in the citric acid cycle and in gluconeogenesis, but it has no role in the Calvin cycle itself.</p>'],
      [GENERIC_PHOTO, points([
        'RuBP is the five-carbon acceptor for CO₂ in the Calvin cycle.',
        'RuBisCO carboxylation produces an unstable six-carbon intermediate that separates into two molecules of 3-PGA.',
        'ATP and NADPH support the production of G3P, while most cycle carbon is used to regenerate RuBP.'
      ])]
    ],
    gone: ['much higher affinity for CO2 than RuBisCO', 'PEP carboxylase fixes CO2 to PEP in C4 plants']
  }

];
