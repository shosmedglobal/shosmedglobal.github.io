/* Chemistry batch 8 edit specs, display Q31-Q40. */
'use strict';
module.exports = [
  { q: 'Q31', id: 'chem-448', key: 'D', keep: true },

  { q: 'Q32', id: 'chem-449', key: 'B',
    headEdits: [['<p>Each cycle produces: 1 FADH₂ + 1 NADH + 1 acetyl-CoA (except the last cycle, which produces 2 acetyl-CoA).</p>',
                 '<p>Each cycle produces one NADH and one FAD-linked reduction, conventionally counted as one FADH₂ equivalent. FAD is enzyme-bound; its electrons are passed onward through electron-transfer proteins. Each of the first six cycles releases one acetyl-CoA, and the final four-carbon intermediate yields two acetyl-CoA.</p>']],
    fb: {
      D: ' Seven cycles is correct, but the final cycle produces two acetyl-CoA molecules from the four-carbon intermediate. The first six cycles give six acetyl-CoA and the seventh gives two, for eight in total.'
    },
    bl: 'For an unbranched, even-chain saturated fatty acyl-CoA in the standard mitochondrial pathway: cycles = n/2 - 1 and acetyl-CoA units = n/2. Palmitoyl-CoA gives seven cycles, eight acetyl-CoA, seven NADH and seven FADH₂ equivalents.' },

  { q: 'Q33', id: 'chem-450', key: 'A',
    headEdits: [['<p>Step-by-step calculation for complete oxidation of palmitate:</p>',
                 '<p>This is an estimated ATP-equivalent yield under the supplied accounting assumptions; FADH₂ here denotes FAD-linked reducing equivalents, not a freely released carrier.</p><p>Step-by-step calculation for complete oxidation of palmitate:</p>']],
    fb: {
      B: ' Using the older assumptions of 3 ATP per NADH, 2 per FAD-linked electron pair and 12 per acetyl-CoA gives 7×3 + 7×2 + 8×12 - 2 = 129. Those are not the values stipulated in this question.',
      C: ' 108 is exactly the gross yield before activation: 28 + 80. Subtracting the two ATP equivalents used to activate free palmitate gives the net yield of 106. No additional counting error is needed to obtain 108.',
      D: ' 131 is the gross yield under the older assumptions: 7×3 + 7×2 + 8×12. It both uses the wrong accounting assumptions for this question and omits the activation cost.'
    } },

  { q: 'Q34', id: 'chem-451', key: 'C',
    stemWas: 'In the citric acid cycle, which step directly produces GTP (or ATP in some organisms) by substrate-level phosphorylation?',
    stem: 'Which citric acid cycle reaction directly produces GTP or ATP by substrate-level phosphorylation, depending on the enzyme isoform?',
    headEdits: [['The energy released from cleaving the high-energy thioester bond of succinyl-CoA drives the phosphorylation of GDP to GTP.',
                 'The favorable overall conversion of the succinyl-CoA thioester is coupled to phosphorylation of GDP to GTP. Breaking a bond by itself requires energy; the energy balance depends on all bonds broken and formed in the coupled reaction. Other isoforms use ADP and produce ATP, including in human tissues.']],
    fbEdits: [['B', 'the primary regulatory point', 'an important regulatory point']],
    bl: 'A turn of the citric acid cycle yields three NADH, one FAD-linked reduction, one GTP or ATP, and two CO₂. Succinyl-CoA synthetase carries out its substrate-level phosphorylation; ATP from the reducing equivalents is generated through oxidative phosphorylation.' },

  { q: 'Q35', id: 'chem-452', key: 'A',
    fb: {
      B: ' 36 ATP is an older textbook estimate for aerobic glucose oxidation, not the yield from glucose-to-lactate conversion. With modern textbook accounting, complete aerobic oxidation is commonly estimated at about 30-32 ATP; the malate-aspartate shuttle gives the higher estimate. The net yield asked here remains two ATP.'
    },
    bl: 'Conversion of one glucose to two lactate molecules yields two net ATP and regenerates NAD⁺. Muscle can increase this pathway when oxidative ATP production is insufficient. Mature red blood cells depend on glycolysis for ATP because they lack mitochondria, even when oxygen is available.' },

  { q: 'Q36', id: 'chem-453', key: 'D',
    stemWas: 'In β-oxidation, the four sequential enzymatic steps per cycle are, in order:',
    stem: 'During mitochondrial β-oxidation of a saturated fatty acyl-CoA, the four recurring steps are, in order:',
    headEdits: [
      ['<li><strong>Oxidation (Acyl-CoA dehydrogenase, FAD):</strong> Creates a trans-Δ² double bond (enoyl-CoA), producing FADH₂</li>',
       '<li><strong>Oxidation:</strong> acyl-CoA dehydrogenase uses enzyme-bound FAD to create a trans-Δ² double bond. Electrons pass onward through electron-transfer proteins rather than leaving as free FADH₂.</li>'],
      ['<li><strong>Hydration (Enoyl-CoA hydratase):</strong> Adds H₂O across the double bond to form L-3-hydroxyacyl-CoA</li>',
       '<li><strong>Hydration:</strong> enoyl-CoA hydratase adds water across the double bond, forming L-3-hydroxyacyl-CoA.</li>'],
      ['<li><strong>Oxidation (3-Hydroxyacyl-CoA dehydrogenase, NAD⁺):</strong> Oxidizes the hydroxyl to a ketone (3-ketoacyl-CoA), producing NADH</li>',
       '<li><strong>Oxidation:</strong> 3-hydroxyacyl-CoA dehydrogenase uses NAD⁺ to form 3-ketoacyl-CoA and NADH.</li>'],
      ['<li><strong>Thiolytic cleavage (Thiolase/β-ketothiolase):</strong> CoA-SH attacks the β-carbon, releasing acetyl-CoA and a shortened acyl-CoA</li>',
       '<li><strong>Thiolysis:</strong> thiolase uses CoA-SH to cleave the bond between the α and β carbons, producing acetyl-CoA and an acyl-CoA shortened by two carbons.</li>']
    ],
    fb: {
      B: ' This is not the β-oxidation sequence. Fatty acid synthesis uses a distinct pathway, typically condensation followed by reduction, dehydration and reduction, with acyl groups carried by ACP and NADPH supplying reducing power. It is not simply β-oxidation run backward.'
    } },

  { q: 'Q37', id: 'chem-454', key: 'B',
    fb: {
      A: ' 1.12 L corresponds to 0.050 mol of CO₂, half the amount obtained here. The balanced equation gives one mole of CO₂ per mole of CaCO₃, so approximately 0.100 mol of carbonate produces approximately 0.100 mol of CO₂.'
    } },

  { q: 'Q38', id: 'chem-455', key: 'B',
    stemWas: 'What is the pH of a 0.0050 M HCl solution at 25 °C? (Assume complete dissociation; log 2 = 0.30, log 5 = 0.70)',
    stem: 'Using the ideal dilute-solution approximation, what is the pH of 0.0050 M HCl at 25 °C? Assume complete dissociation and use log 2 = 0.30 and log 5 = 0.70.',
    fb: {
      A: ' pH 2.00 corresponds to [H⁺] = 0.010 M, twice the concentration in this question. Using the actual concentration gives -log(5.0 × 10⁻³) = 3 - 0.70 = 2.30.'
    } },

  { q: 'Q39', id: 'chem-456', key: 'C',
    fb: {
      D: ' 1.60 g is 0.040 mol of NaOH, twice the required amount. The 0.0100 mol of H₂SO₄ requires 0.0200 mol of NaOH because the balanced equation has a 1:2 ratio. A 1:4 ratio would incorrectly produce this answer.'
    } },

  { q: 'Q40', id: 'chem-457', key: 'D', keep: true }
];
