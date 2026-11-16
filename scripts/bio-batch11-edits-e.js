/**
 * Biology review batch 11, edits for File B items B19, B20 and B21.
 * Spec shape is documented in scripts/bio-batch11-edits-a.js.
 */
'use strict';

const B20_EXPLANATION =
  "<h4>Correct Answer: The mutagenic potential of chemical compounds using bacteria</h4>" +
  "<p>The <strong>Ames test</strong> asks whether a substance increases mutations in selected bacterial strains. A " +
  "classic version uses <em>Salmonella</em> strains unable to synthesize histidine. A reverse mutation, or another " +
  "mutation restoring that function, allows a bacterium to form a colony on the selective medium after the limited " +
  "histidine supply is exhausted.</p>" +
  "<p>Some revertants arise spontaneously, so treated plates must be compared with appropriate <strong>negative " +
  "controls</strong>. A reproducible increase in revertants, often across a dose range, supports a mutagenic effect. " +
  "Positive controls confirm that the system can detect known mutagens. Colony counts must also be interpreted alongside " +
  "bacterial survival and other test conditions.</p>" +
  "<h4>Why the other choices are wrong:</h4>" +
  "<p><strong>A. Chromosomal aberrations caused by ionizing radiation:</strong> The standard Ames assay measures " +
  "bacterial gene mutations, such as base substitutions and frameshifts. It is not a cytogenetic assay for large " +
  "chromosomal changes such as translocations or inversions.</p>" +
  "<p><strong>C. Viral oncogene integration into the host genome:</strong> This requires tests that identify viral DNA " +
  "and its relationship to the host genome. Bacterial reversion colonies do not establish whether a viral oncogene has " +
  "integrated.</p>" +
  "<p><strong>D. Teratogenic effects of drugs on embryonic development:</strong> Teratogenicity concerns abnormal " +
  "development of an embryo or fetus. A bacterial mutation assay cannot directly measure those developmental outcomes, " +
  "which require appropriate developmental-toxicity approaches.</p>" +
  "<h4>Key Educational Points:</h4><ul>" +
  "<li>Testing is performed both with and without S9, a liver-derived enzyme preparation used to model metabolic " +
  "activation; it can also reveal effects of metabolic detoxification.</li>" +
  "<li>Mutagenicity and carcinogenicity overlap, but a positive Ames test does not prove that a substance causes cancer " +
  "in humans, and a negative result does not establish safety.</li>" +
  "<li>The standard assay uses several bacterial strains to detect different mutation types; classic " +
  "histidine-requiring <em>Salmonella</em> strains are common examples.</li>" +
  "</ul>" +
  "<p class='exp-key'>Bottom Line: The Ames test detects increased bacterial mutation relative to controls. Testing with " +
  "and without liver-derived S9 helps reveal how metabolism changes the response.</p>";

const B21_EXPLANATION =
  "<h4>Correct Answer: Antidiuretic hormone (ADH/vasopressin)</h4>" +
  "<p><strong>ADH</strong> is synthesized in the hypothalamus and released from the posterior pituitary. Increased plasma " +
  "osmolality and reduced effective circulating volume can stimulate its release. ADH binds to <strong>V2 " +
  "receptors</strong> on collecting-duct principal cells, promoting insertion of <strong>aquaporin-2</strong> channels " +
  "into the apical membrane facing the tubular fluid.</p>" +
  "<p>The channels increase water permeability. Water moves by osmosis toward the concentrated surrounding medullary " +
  "tissue and is returned to the circulation. This reduces water loss and allows more concentrated urine. The osmotic " +
  "gradient and water channels work together; the channels do not actively pump water.</p>" +
  "<h4>Why the other choices are wrong:</h4>" +
  "<p><strong>A. Aldosterone:</strong> Aldosterone promotes sodium reabsorption and potassium secretion in the " +
  "aldosterone-sensitive distal nephron, including the collecting duct. Its main mechanism involves sodium channels and " +
  "transport proteins; it is not the V2-receptor signal responsible for the AQP2 insertion described here.</p>" +
  "<p><strong>B. Atrial natriuretic peptide (ANP):</strong> ANP is released in response to atrial stretch and promotes " +
  "sodium and water excretion. It can act on both glomerular function and tubular sodium transport, including in " +
  "collecting ducts. These actions differ from the ADH-driven AQP2 insertion described in the stem.</p>" +
  "<p><strong>D. Parathyroid hormone (PTH):</strong> PTH helps regulate calcium and phosphate balance. It promotes " +
  "calcium reabsorption in the distal nephron and reduces phosphate reabsorption in the proximal tubule. It is not the " +
  "hormone responsible for regulated AQP2 insertion.</p>" +
  "<h4>Key Educational Points:</h4><ul>" +
  "<li>Collecting ducts receive fluid from multiple nephrons and help determine the final water content of urine.</li>" +
  "<li>ADH deficiency or reduced kidney responsiveness to ADH can cause excessive loss of dilute urine, as in diabetes " +
  "insipidus.</li>" +
  "<li>Collecting-duct principal cells regulate water and electrolyte handling; intercalated cells contribute to " +
  "acid-base balance.</li>" +
  "</ul>" +
  "<p class='exp-key'>Bottom Line: ADH increases collecting-duct water permeability by promoting apical AQP2 insertion. " +
  "Water is reabsorbed by osmosis, helping conserve body water.</p>";

module.exports = [
  // ---- B19 bio-626: strobilation. Targeted scope repair; stem scoped to scyphozoans.
  {
    q: 'B19', id: 'bio-626', expectLetter: 'B',
    stemFull: 'In the life cycle of a typical scyphozoan jellyfish, strobilation refers to the process by which:',
    explanation: [
      ['in Scyphozoa (true jellyfish) where a sessile polyp',
        'in scyphozoan jellyfish such as <em>Aurelia</em>, in which a sessile polyp'],

      ['<p><strong>A. A polyp reproduces sexually by releasing gametes into the water:</strong> Sexual reproduction involving gamete release is called <strong>spawning</strong> and occurs in the <strong>medusa</strong> stage, not the polyp stage. In scyphozoans, mature medusae produce eggs and sperm that are released into the water, where fertilization occurs to form a planula larva.</p>',
        "<p><strong>A. A polyp reproduces sexually by releasing gametes into the water:</strong> This describes sexual " +
        "reproduction rather than strobilation. In the typical scyphozoan life cycle, medusae produce gametes, while the " +
        "polyp produces ephyrae asexually. Other cnidarian groups, such as corals, can produce gametes in the polyp " +
        "stage.</p>"],

      ['<p><strong>C. A medusa attaches to a substrate and transforms into a polyp:</strong> This describes a reverse of the normal life cycle. In reality, it is the <strong>planula larva</strong> (not the medusa) that settles on a substrate and metamorphoses into a polyp (scyphistoma). Medusae are the free-swimming reproductive adults and do not revert to polyps under normal conditions.</p>',
        "<p><strong>C. A medusa attaches to a substrate and transforms into a polyp:</strong> In the typical life cycle " +
        "described here, a planula larva settles and develops into a polyp. Strobilation is the later production of " +
        "juvenile medusae from that polyp; it is not a medusa changing back into a polyp.</p>"]
    ],
    keepHeadings: [
      '<strong>A. A polyp reproduces sexually by releasing gametes into the water:</strong>',
      '<strong>C. A medusa attaches to a substrate and transforms into a polyp:</strong>',
      '<strong>D. A planula larva directly develops into a mature medusa without a polyp stage:</strong>'
    ],
    gone: [
      'in Scyphozoa (true jellyfish) where',
      'Strobilation in cnidarians refers to the process by which',      // the old unscoped stem
      'occurs in the <strong>medusa</strong> stage, not the polyp stage',  // corals do make gametes in polyps
      'released into the water, where fertilization occurs',            // not all fertilization is external
      'do not revert to polyps under normal conditions'
    ],
    keepText: ['strobila', 'pine cone']
  },

  // ---- B20 bio-627: Ames test. Substantial repair; stem and options kept, no table added.
  {
    q: 'B20', id: 'bio-627', expectLetter: 'B',
    explanationFull: B20_EXPLANATION,
    noTable: true,
    gone: [
      'More revertant colonies = stronger mutagenic potential',   // invalid without controls and dose response
      'liver microsome fraction (S9 mix)',                        // S9 is a post-mitochondrial fraction
      'approximately 90% of known carcinogens are also mutagens',
      'requires <strong>animal models</strong>',                  // teratogenicity is not defined by that
      'typically pregnant rodents or rabbits',
      'rapid, inexpensive, and highly sensitive',
      'A positive Ames test suggests a compound may be carcinogenic',
      'detected by <strong>karyotyping</strong>'
    ]
  },

  // ---- B21 bio-629: collecting duct and ADH. MAJOR REWRITE; all four options replaced.
  {
    q: 'B21', id: 'bio-629', expectLetter: 'C',
    stemFull: 'During dehydration, which hormone promotes insertion of aquaporin-2 water channels into the apical membrane of collecting-duct principal cells, helping the kidneys conserve water?',
    optionFull: [
      [0, 'Aldosterone'],
      [1, 'Atrial natriuretic peptide (ANP)'],
      [2, 'Antidiuretic hormone (ADH/vasopressin)'],
      [3, 'Parathyroid hormone (PTH)']
    ],
    explanationFull: B21_EXPLANATION,
    gone: [
      'in the distal convoluted tubule only',                     // the old "only/exclusively" options
      'exclusively in the proximal tubule',
      'which increases glomerular filtration rate',
      'technically not part of the nephron',                      // the aside the review removed
      'Whether the collecting duct is technically',
      'remains impermeable to water',                             // low permeability, not absolute
      'up to 20 liters per day',
      'Its primary site of action is the <strong>glomerulus and afferent arteriole</strong>',  // ANP acts on collecting ducts too
      'The collecting duct of the kidney receives filtrate from multiple nephrons'             // the old stem
    ]
  }
];
