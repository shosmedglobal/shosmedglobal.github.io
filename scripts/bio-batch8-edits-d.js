/**
 * Biology review batch 8, displayed Q37-Q47
 * (bio-445 .. bio-449, bio-451, bio-452, bio-454 .. bio-457).
 * Q48 (bio-458) is KEEP UNCHANGED per the review and so is absent from this
 * module by design. bio-450 and bio-453 are not in the pack.
 */
'use strict';

module.exports = [
  // ---- Q37  bio-445  molecular evidence (option B renamed) ---------------
  {
    q: 37, id: 'bio-445', expectLetter: 'B',
    optionFull: [[1, 'High DNA sequence similarity across many independent homologous regions']],
    explanation: [
      ['<h4>Correct Answer: Similar DNA nucleotide sequences</h4>',
        '<h4>Correct Answer: High DNA sequence similarity across many independent homologous regions</h4>'],
      ['<p>Molecular evidence - particularly high similarity in DNA or protein sequences - is the most reliable indicator of common ancestry. Organisms that diverged recently will have accumulated fewer mutations and thus share more of their genetic code. Unlike morphological similarities, molecular comparisons are not confounded by convergent evolution.</p>',
        '<p>Comparing corresponding DNA regions across a genome provides strong evidence about evolutionary relationships. Homologous regions are corresponding regions inherited from a common ancestral sequence. Organisms that diverged recently have accumulated fewer sequence differences, so they show more similar DNA sequences. Close similarity across many independent regions generally supports a more recent common ancestor than similarity in one outward feature. One short or highly conserved sequence alone is less informative, and molecular comparisons still need careful interpretation.</p>' +
        '<p>Convergence can affect molecular sequences as well as anatomy. Comparing many regions helps distinguish a broad ancestry signal from similarity at a few selected sites.</p>'],
      ['they reflect similar selection pressures on unrelated lineages.</p>',
        'they reflect similar selection pressures on distantly related lineages.</p>'],
      ['<p><strong>C. Living in the same geographic area:</strong> Geographic proximity does not imply relatedness; many unrelated species share habitats.</p>',
        '<p><strong>C. Living in the same geographic area:</strong> Geographic proximity does not imply relatedness; many distantly related species share the same habitat.</p>'],
      ['<p class=\'exp-key\'>Bottom Line: Homologous structures (shared ancestry) must be distinguished from analogous structures (convergent evolution). DNA sequence comparison is the gold standard for determining evolutionary relationships.</p>',
        '<p class=\'exp-key\'>Bottom Line: Similarity across many corresponding DNA regions is strong evidence of evolutionary relatedness; the inference is strongest when multiple lines of evidence agree.</p>']
    ],
    keepHeadings: ['<strong>A. Similar body shape (analogous structures):</strong>', '<strong>C. Living in the same geographic area:</strong>'],
    gone: ['Similar DNA nucleotide sequences', 'not confounded by convergent evolution',
      'share more of their genetic code', 'unrelated lineages', 'many unrelated species share habitats',
      'the gold standard for determining evolutionary relationships']
  },

  // ---- Q38  bio-446  endosymbiosis (substantial rewrite) -----------------
  {
    q: 38, id: 'bio-446', expectLetter: 'B',
    explanation: [
      ['<p>Lynn Margulis proposed the endosymbiotic theory, which holds that mitochondria descended from aerobic bacteria that were engulfed by a primitive anaerobic eukaryote. Instead of being digested, the bacteria survived and established a mutualistic relationship - providing ATP via aerobic respiration in exchange for shelter and nutrients.</p>',
        '<p>Mitochondria descended from bacteria that became long-term partners inside an ancestral host cell. Over evolution, this partnership became permanent: the bacterial descendants retained a reduced genome, while many genes were lost or transferred to the host nucleus. Modern mitochondria therefore depend on numerous proteins encoded by nuclear genes. Genetic comparisons and features of mitochondrial division and membranes support this bacterial ancestry.</p>'],
      ['<p><strong>A. Invagination of the plasma membrane:</strong> This hypothesis explains the origin of the endomembrane system (ER, nuclear envelope) but not mitochondria, which have their own DNA and double membranes characteristic of endosymbiosis.</p>',
        '<p><strong>A. Invagination of the plasma membrane:</strong> Membrane folding is one proposed contribution to the evolution of parts of the endomembrane system. It does not explain the bacterial evolutionary relationships of mitochondrial genes and translation machinery.</p>'],
      ['<p><strong>C. Viral infections that became permanent:</strong> Viruses are parasitic and reductive; they lack the metabolic machinery that mitochondria possess.</p>',
        '<p><strong>C. Viral infections that became permanent:</strong> Viruses do not have the cellular respiratory machinery of bacteria. Mitochondrial genes and translation machinery instead show bacterial ancestry.</p>'],
      ['<p><strong>D. Spontaneous assembly:</strong> Complex organelles with their own genome and protein synthesis machinery could not arise by random lipid assembly.</p>',
        '<p><strong>D. Spontaneous assembly:</strong> Lipid compartments can assemble spontaneously, but assembly of a membrane around enzymes does not explain the bacterial ancestry of mitochondrial genes and protein-synthesis machinery.</p>'],
      ['<p class=\'exp-key\'>Bottom Line: Key evidence for endosymbiosis: mitochondria have circular DNA, 70S ribosomes, double membranes, and divide by binary fission - all features shared with bacteria. Chloroplasts originated similarly from photosynthetic cyanobacteria.</p>',
        '<p class=\'exp-key\'>Bottom Line: Mitochondria have a bacterial origin. Supporting evidence includes their genomes, bacterial-related translation machinery, double membranes and division from pre-existing mitochondria. Chloroplasts trace their ancestry to cyanobacteria.</p>']
    ],
    keepHeadings: ['<strong>A. Invagination of the plasma membrane:</strong>', '<strong>C. Viral infections that became permanent:</strong>',
      '<strong>D. Spontaneous assembly:</strong>'],
    gone: ['Lynn Margulis proposed', '70S ribosomes', 'circular DNA', 'primitive anaerobic eukaryote',
      'in exchange for shelter and nutrients']
  },

  // ---- Q39  bio-447  cystic fibrosis inheritance -------------------------
  {
    q: 39, id: 'bio-447', expectLetter: 'B',
    explanation: [
      ['Only the homozygous recessive genotype (cc) manifests the disease. The Punnett square yields 1 CC : 2 Cc : 1 cc, giving a 25% chance of an affected child.</p>',
        'A child is affected when they inherit a CF-causing variant in each copy of CFTR, one from each parent. The simple diagram represents these as c and c; the two variants need not be identical. The Punnett square yields 1 CC : 2 Cc : 1 cc, giving a 25% chance of an affected child.</p>'],
      ['<p class=\'exp-key\'>Bottom Line: For autosomal recessive diseases, carrier × carrier gives a 1/4 chance of affected offspring, 1/2 chance of carriers, and 1/4 chance of homozygous normal. Cystic fibrosis is the most common lethal autosomal recessive disorder in Caucasian populations.</p>',
        '<p class=\'exp-key\'>Bottom Line: For two carriers in this autosomal recessive model, each pregnancy has a 25% chance of an affected child, a 50% chance of a carrier and a 25% chance of a child inheriting neither disease allele.</p>']
    ],
    gone: ['Only the homozygous recessive genotype (cc) manifests the disease',
      'most common lethal autosomal recessive disorder in Caucasian populations']
  },

  // ---- Q40  bio-448  final respiratory acceptor --------------------------
  {
    q: 40, id: 'bio-448', expectLetter: 'C',
    explanation: [
      ['<p>In the mitochondrial electron transport chain, electrons pass through a series of protein complexes (I through IV) in the inner mitochondrial membrane. At the end of this chain, Complex IV (cytochrome c oxidase) transfers electrons to molecular oxygen, which combines with hydrogen ions to form water. This is why organisms require oxygen for aerobic respiration.</p>',
        '<p>NADH supplies electrons through Complex I, while succinate oxidation supplies them through Complex II. These routes converge at coenzyme Q, then proceed through Complex III, cytochrome c and Complex IV. At Complex IV, oxygen accepts electrons and is reduced to water. This is why organisms require oxygen for aerobic respiration.</p>'],
      ['<p><strong>A. NAD⁺:</strong> NAD⁺ is an electron carrier that accepts electrons (becoming NADH) during glycolysis and the Krebs cycle; it donates electrons TO the ETC, not the final acceptor.</p>',
        '<p><strong>A. NAD⁺:</strong> NAD⁺ accepts electrons during reactions such as those in glycolysis and the citric acid cycle, forming NADH. It is the reduced form, NADH, that donates electrons to Complex I. NAD⁺ is not the terminal acceptor at Complex IV.</p>'],
      ['<p><strong>B. FAD:</strong> Similarly, FAD accepts electrons (becoming FADH₂) during metabolism and delivers them to the ETC at Complex II.</p>',
        '<p><strong>B. FAD:</strong> FAD is an enzyme-associated electron carrier. For example, FAD bound within succinate dehydrogenase accepts electrons during succinate oxidation and passes them toward coenzyme Q. Oxygen is the terminal acceptor of the aerobic mitochondrial chain.</p>'],
      ['<p><strong>D. Carbon dioxide:</strong> CO₂ is released during the Krebs cycle as a waste product of decarboxylation reactions; it does not accept electrons.</p>',
        '<p><strong>D. Carbon dioxide:</strong> CO₂ is released during pyruvate oxidation and the citric acid cycle. It is not the terminal electron acceptor of the aerobic mitochondrial chain; that role belongs to oxygen.</p>'],
      ['<p class=\'exp-key\'>Bottom Line: O₂ is the terminal electron acceptor, reduced to H₂O at Complex IV. Without O₂, the ETC stalls, NADH/FADH₂ cannot be reoxidized, and the cell switches to anaerobic fermentation for ATP production.</p>',
        '<p class=\'exp-key\'>Bottom Line: Oxygen is the final acceptor in the aerobic mitochondrial electron transport chain and is reduced to water. Without oxygen, human cells can regenerate cytosolic NAD⁺ by forming lactate, allowing glycolysis to continue producing a small amount of ATP.</p>']
    ],
    keepHeadings: ['<strong>A. NAD⁺:</strong>', '<strong>B. FAD:</strong>', '<strong>D. Carbon dioxide:</strong>'],
    gone: ['electrons pass through a series of protein complexes (I through IV)', 'it does not accept electrons',
      'it donates electrons TO the ETC', 'the cell switches to anaerobic fermentation for ATP production',
      'delivers them to the ETC at Complex II']
  },

  // ---- Q41  bio-449  hypotonic solution ----------------------------------
  {
    q: 41, id: 'bio-449', expectLetter: 'C',
    explanation: [
      ['<p>In a hypotonic solution, the solute concentration outside the cell is lower than inside, so water moves into the cell by osmosis (from high water concentration to low water concentration). Red blood cells, lacking a rigid cell wall, will swell as water enters. If the osmotic gradient is large enough, the cell membrane ruptures - a process called hemolysis.</p>',
        '<p>A hypotonic solution has a lower effective concentration of solutes that do not readily cross the cell membrane. Water therefore moves into the red blood cell by osmosis. The cell swells and, if enough water enters, may rupture because it has no rigid cell wall. This rupture is called hemolysis.</p>'],
      ['<tr><td>Hypotonic</td><td>Into cell</td><td>Swells → hemolysis</td></tr>',
        '<tr><td>Hypotonic</td><td>Into cell</td><td>Swells; may undergo hemolysis</td></tr>'],
      ['<p><strong>D. Undergo apoptosis:</strong> Apoptosis is programmed cell death triggered by internal signaling pathways, not by osmotic stress.</p>',
        '<p><strong>D. Undergo apoptosis:</strong> The immediate response described here is osmotic swelling and possible hemolysis. That is different from the regulated cell-death process meant by apoptosis.</p>'],
      ['<p class=\'exp-key\'>Bottom Line: Water follows solute - it moves toward higher solute concentration. In clinical practice, IV fluids must be isotonic (e.g., 0.9% NaCl) to prevent hemolysis or crenation of blood cells.</p>',
        '<p class=\'exp-key\'>Bottom Line: Tonicity predicts how a solution changes cell volume: hypotonic solutions cause swelling, isotonic solutions cause no sustained net volume change, and hypertonic solutions cause shrinkage.</p>']
    ],
    keepHeadings: ['<strong>D. Undergo apoptosis:</strong>'],
    gone: ['Swells → hemolysis', 'IV fluids must be isotonic', 'not by osmotic stress',
      'the solute concentration outside the cell is lower than inside']
  },

  // ---- Q42  bio-451  net glycolytic ATP ----------------------------------
  {
    q: 42, id: 'bio-451', expectLetter: 'B',
    explanation: [[
      '<p><strong>D. 36:</strong> Approximately 30-38 ATP are produced from complete oxidation of glucose through all stages (glycolysis + Krebs + oxidative phosphorylation), not glycolysis alone.</p>',
      '<p><strong>D. 36:</strong> A value such as 36 ATP is an older estimate for complete aerobic glucose oxidation, not glycolysis alone. A commonly taught modern estimate for a human cell is about 30-32 ATP for complete oxidation; glycolysis itself yields a net 2 ATP.</p>'
    ]],
    keepHeadings: ['<strong>D. 36:</strong>'],
    gone: ['Approximately 30-38 ATP']
  },

  // ---- Q43  bio-452  aortic pressure -------------------------------------
  {
    q: 43, id: 'bio-452', expectLetter: 'C',
    explanation: [
      ['<p>Blood pressure is generated by ventricular contraction and is highest in the aorta, the first and largest artery receiving blood from the left ventricle. As blood travels through progressively smaller arteries, arterioles, capillaries, venules, and veins, pressure drops steadily due to increasing total cross-sectional area and friction.</p>',
        '<p>The left ventricle generates the pressure that drives systemic blood flow. Among these vessels, the aorta has the highest pressure, as the first and largest artery receiving blood from the left ventricle. Mean pressure falls as blood flows through the systemic circulation because energy is dissipated overcoming vascular resistance; the largest pressure drop is across the arterioles.</p>'],
      ['<p><strong>B. Veins:</strong> Venous pressure is very low (~2-10 mmHg); blood return to the heart depends on skeletal muscle contractions and venous valves.</p>',
        '<p><strong>B. Veins:</strong> Venous pressure is much lower than aortic pressure (~2-10 mmHg). Venous return is driven by a pressure gradient toward the right atrium and is assisted by skeletal-muscle contractions, breathing and venous valves.</p>']
    ],
    keepHeadings: ['<strong>B. Veins:</strong>'],
    gone: ['pressure drops steadily due to increasing total cross-sectional area and friction',
      'blood return to the heart depends on skeletal muscle contractions and venous valves']
  },

  // ---- Q44  bio-454  glucagon --------------------------------------------
  {
    q: 44, id: 'bio-454', expectLetter: 'B',
    explanation: [[
      'Type 1 diabetes involves insulin deficiency; Type 2 involves insulin resistance.</p>',
      'Type 1 diabetes involves insulin deficiency; type 2 diabetes involves insulin resistance together with inadequate insulin secretion to meet the body\'s needs.</p>'
    ]],
    gone: ['Type 2 involves insulin resistance.']
  },

  // ---- Q45  bio-455  bile ------------------------------------------------
  {
    q: 45, id: 'bio-455', expectLetter: 'B',
    explanation: [
      ['not bile. Bile contains no enzymes.</p>', 'not bile. Bile contains no digestive enzymes.</p>'],
      ['<p><strong>D. Absorbing vitamins directly:</strong> Bile assists in fat-soluble vitamin absorption by emulsifying dietary fats, but bile itself does not absorb these vitamins.</p>',
        '<p><strong>D. Absorbing vitamins directly:</strong> Bile salts also help form mixed micelles that carry fat-digestion products and fat-soluble vitamins toward the intestinal surface. Intestinal cells absorb these substances. This supports absorption, while the emulsification described in the correct answer breaks large fat globules into smaller droplets.</p>']
    ],
    keepHeadings: ['<strong>D. Absorbing vitamins directly:</strong>'],
    gone: ['Bile contains no enzymes', 'by emulsifying dietary fats, but bile itself does not absorb']
  },

  // ---- Q46  bio-456  vaccination -----------------------------------------
  {
    q: 46, id: 'bio-456', expectLetter: 'C',
    explanation: [
      ['<p>Vaccines expose the immune system to harmless forms of a pathogen (attenuated, inactivated, or subunit antigens), stimulating B and T lymphocytes to mount a primary response. Crucially, this generates long-lived memory cells that can mount a faster, stronger secondary response upon future encounter with the actual pathogen.</p>',
        '<p>Vaccines provide antigens, or instructions for producing antigens, that stimulate an antigen-specific adaptive immune response. Attenuated, inactivated and subunit vaccines supply the antigen directly, while some vaccines deliver genetic instructions for the body\'s own cells to make it. This can produce antibodies and memory cells that support a faster, stronger response to later exposure.</p>'],
      ['<tr><td><strong>Active (natural)</strong></td><td>Infection</td><td>Long-lasting</td><td>Recovering from measles</td></tr><tr><td><strong>Active (artificial)</strong></td><td>Vaccination</td><td>Long-lasting</td><td>MMR vaccine</td></tr>',
        '<tr><td><strong>Active (natural)</strong></td><td>Infection</td><td>Often long-lasting; duration varies</td><td>Recovering from measles</td></tr><tr><td><strong>Active (artificial)</strong></td><td>Vaccination</td><td>Often long-lasting; duration varies</td><td>MMR vaccine</td></tr>'],
      ['<p><strong>A. Innate immunity only:</strong> Innate immunity is non-specific and does not form memory; vaccination specifically activates the adaptive immune system.</p>',
        '<p><strong>A. Innate immunity only:</strong> Innate immunity helps initiate vaccine responses, but innate immunity alone does not explain the antigen-specific B- and T-cell memory tested here. Vaccination stimulates active adaptive immunity.</p>']
    ],
    keepHeadings: ['<strong>A. Innate immunity only:</strong>'],
    gone: ['harmless forms of a pathogen', 'Innate immunity is non-specific and does not form memory',
      '<td>Long-lasting</td>']
  },

  // ---- Q47  bio-457  semiconservative replication ------------------------
  {
    q: 47, id: 'bio-457', expectLetter: 'C',
    explanation: [
      ['<p><strong>A. Two entirely new strands:</strong> This would describe dispersive or de novo synthesis; it contradicts the template-directed mechanism of DNA polymerase.</p>',
        '<p><strong>A. Two entirely new strands:</strong> A molecule containing two newly synthesized strands would be one product of the conservative model, in which the original two strands remain together in the other molecule. In semiconservative replication, the original strands separate and each serves as a template for a new partner.</p>'],
      ['<p><strong>D. Random mixtures:</strong> This describes the dispersive model, also disproven by the Meselson-Stahl experiment using density gradient centrifugation with ¹⁵N-labeled DNA.</p>',
        '<p><strong>D. Random mixtures:</strong> The dispersive model predicted old and new segments mixed within each strand. It too was ruled out by the Meselson-Stahl experiment, which used density gradient centrifugation with ¹⁵N-labeled DNA.</p>']
    ],
    keepHeadings: ['<strong>A. Two entirely new strands:</strong>', '<strong>D. Random mixtures:</strong>'],
    gone: ['This would describe dispersive or de novo synthesis', 'This describes the dispersive model']
  }
];
