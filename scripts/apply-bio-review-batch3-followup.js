/**
 * Targeted correction pass over batch 3.
 *
 *   node scripts/apply-bio-review-batch3-followup.js [--dry]
 *
 * All 16 items of the follow-up review. The five substantial rewrites from the
 * first pass (Q8, Q12, Q30, Q39, Q48) are deliberately untouched.
 *
 *   Q3  bio-64  endotoxin is the LPS; lipid A is its toxic component
 *   Q9  bio-70  biofilm tolerance and genetic resistance are not exclusive
 *   Q11 bio-72  all three distractor explanations corrected
 *   Q13 bio-74  positive-sense comparison scoped to class IV
 *   Q14 bio-76  prion defined generally; PrP introduced as the mammalian case
 *   Q15 bio-77  toxin example attributed to other temperate phages, not lambda
 *   Q17 bio-79  central-dogma phrasing, simplified examples, reassortment
 *   Q20 bio-82  "viral DNA" before integration, "provirus" after
 *   Q23 bio-85  trophic position vs feeding mechanism, no universal claim
 *   Q25 bio-88  substrate without developed soil; "often slower"; Bottom Line
 *   Q42 bio-108 CAM takes up CO2 at night, but fixation is not all nocturnal
 *   Q47 bio-114 phloem sap moves by bulk flow down a hydrostatic gradient
 *   Q53 bio-121 trophoblast CONTRIBUTES TO the fetal part of the placenta
 *   Q55 bio-123 option A no longer contains the word trophoblast
 *   Q58 bio-126 stem scoped to humans; notochord is an axial mesodermal structure
 *   Q59 bio-127 "successive" rather than "rapid" mitotic divisions
 *
 * Same guarantees as every other pass: anchors must match exactly once, a
 * renamed option must end up with a matching heading, keys are asserted
 * unchanged, and no em dash may enter student-facing copy.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const FILE = path.join(ROOT, 'questions.json');
const DRY = process.argv.includes('--dry');
const LETTER = 'ABCD';

const EDITS = [

// ============================================================ Q3  bio-64
// Distractor A still defined endotoxin AS lipid A, contradicting the main
// explanation's LPS/lipid A distinction.
{
  q: 3, id: 'bio-64', expectLetter: 'B',
  explanation: [
    ['Endotoxin specifically refers to the lipid A component of lipopolysaccharide in the outer membrane of Gram-negative bacteria.',
     'Endotoxin is the lipopolysaccharide (LPS) of the Gram-negative outer membrane; lipid A is its principal toxic component.'],
  ],
},

// ============================================================ Q9  bio-70
// Biofilm tolerance and inherited resistance were made to sound mutually
// exclusive. They are not: a biofilm cell can have both.
{
  q: 9, id: 'bio-70', expectLetter: 'A',
  explanation: [
    ['A biofilm is a community of bacteria encased in an extracellular matrix, and bacteria growing in one are harder to clear with antibiotics and immune defences. That tolerance is a property of the community rather than inherited resistance in each cell.</p>',
     'A biofilm is a community of bacteria encased in an extracellular matrix. Biofilm growth can increase antibiotic tolerance without requiring acquired resistance genes. Bacteria within a biofilm may also possess genetic antibiotic resistance.</p>'],
    ['<li>Attachment allows biofilms to form. A biofilm tolerates antibiotics and immune attack better than free-living cells, which is a property of the community rather than inherited resistance.</li>',
     '<li>Attachment allows biofilms to form. Biofilm growth can increase antibiotic tolerance without requiring acquired resistance genes, and bacteria within a biofilm may also possess genetic antibiotic resistance.</li>'],
  ],
},

// ============================================================ Q11 bio-72
// All three distractors carried overreaching claims: CRISPR-Cas having
// "nothing to do with" conjugation, conjugation "specifically requiring" the
// F plasmid, and conjugation defined universally as pilus-dependent.
{
  q: 11, id: 'bio-72', expectLetter: 'D',
  explanation: [
    ['<p><strong>A. A CRISPR-Cas system:</strong> CRISPR-Cas is actually a bacterial <em>immune defense</em> system that protects against foreign DNA (such as phage genomes). It stores short sequences from past infections as "molecular memories" and uses them to recognize and destroy matching foreign DNA. CRISPR-Cas has nothing to do with conjugation - in fact, it may even prevent the uptake of foreign plasmids by degrading them.</p>',
     '<p><strong>A. A CRISPR-Cas system:</strong> CRISPR-Cas is a bacterial <em>immune defence</em> system that protects against foreign DNA such as phage genomes. It stores short sequences from past encounters as molecular memories and uses them to recognize and destroy matching DNA. It does not supply the transfer machinery in this F-mediated system. It can affect the acquisition or persistence of some plasmids, by degrading them, but that is a different thing from carrying the genes a donor needs in order to transfer DNA.</p>'],
    ['<p><strong>B. A transposon within the chromosome:</strong> Transposons ("jumping genes") are mobile genetic elements that can move within or between DNA molecules. While transposons can carry antibiotic resistance genes and move onto conjugative plasmids, the presence of a transposon alone does not enable conjugation. Conjugation specifically requires the F plasmid, which encodes the pilus and DNA transfer machinery.</p>',
     '<p><strong>B. A transposon within the chromosome:</strong> Transposons, or jumping genes, are mobile elements that can move within or between DNA molecules, and they can carry genes such as antibiotic resistance onto conjugative plasmids. In the F⁺ to F⁻ <em>E. coli</em> system specified in the stem, however, it is the F plasmid that supplies the transfer genes, not a transposon. Note the scope of that claim: in other systems, mobile chromosomal elements can mediate conjugative transfer.</p>'],
    ['<p><strong>C. A prophage integrated into the chromosome:</strong> A prophage is the DNA of a lysogenic bacteriophage integrated into the bacterial chromosome. It can be induced to enter the lytic cycle under stress conditions. While prophage excision can sometimes carry adjacent bacterial genes (specialized transduction), this is a phage-mediated transfer, not conjugation. Conjugation is a plasmid-mediated, pilus-dependent process distinct from phage biology.</p>',
     '<p><strong>C. A prophage integrated into the chromosome:</strong> A prophage is phage DNA maintained in a bacterial host, in lambda&rsquo;s case integrated into the chromosome, and it can be induced to enter the lytic cycle. Phage-mediated gene transfer is transduction, which includes the specialized transduction that can follow an imprecise prophage excision carrying adjacent bacterial genes. That is a different mechanism from the conjugative transfer this question asks about.</p>'],
  ],
},

// ============================================================ Q13 bio-74
// The positive-sense comparison would otherwise read as applying to
// retroviruses too, which package positive-sense RNA but use a DNA step.
{
  q: 13, id: 'bio-74', expectLetter: 'D',
  explanation: [
    ['<li>A positive-sense RNA virus does not have this problem: its genome can be read as mRNA as soon as it enters the cell.</li>',
     '<li>A typical Baltimore class IV positive-sense RNA virus, such as poliovirus, can use its genome as mRNA after uncoating, so it does not have this problem.</li>'],
  ],
},

// ============================================================ Q14 bio-76
// Define the prion generally, then introduce PrP as the mammalian example,
// rather than writing as though every prion is PrP.
{
  q: 14, id: 'bio-76', expectLetter: 'D',
  explanation: [
    ['<p>Prions are infectious agents consisting solely of a misfolded form of the prion protein (PrPSc). They contain no DNA or RNA. The misfolded protein catalyzes the conversion of normal cellular prion protein (PrPC) into the pathogenic PrPSc form, leading to accumulation of insoluble aggregates in brain tissue. This causes spongiform encephalopathies such as Creutzfeldt-Jakob disease and bovine spongiform encephalopathy.</p>',
     '<p>Prions are infectious, self-propagating protein conformations with no nucleic-acid genome. They contain no DNA or RNA at all; what spreads is a shape, because the misfolded form promotes a compatible protein to adopt the same conformation.</p>'
     + '<p>In mammalian prion diseases the protein concerned is the prion protein. The misfolded form, PrP<sup>Sc</sup>, templates the conversion of the normal cellular form, PrP<sup>C</sup>, into more of itself, and insoluble aggregates accumulate in brain tissue. This causes spongiform encephalopathies such as Creutzfeldt-Jakob disease and bovine spongiform encephalopathy.</p>'],
    ['Prions are the opposite - they are composed entirely of protein (a misfolded form of the normal cellular protein PrPᶜ) with absolutely no nucleic acid.',
     'Prions are the opposite: they are composed entirely of protein, with no nucleic acid at all. In mammalian prion diseases the protein concerned is the prion protein, whose normal cellular form is PrP<sup>C</sup>.'],
    ['They propagate by inducing normal PrPᶜ proteins to refold into the pathogenic PrPˢᶜ conformation.',
     'They propagate by inducing a compatible protein to refold into the misfolded conformation; in mammalian prion disease that is PrP<sup>C</sup> refolding into PrP<sup>Sc</sup>.'],
    ['<li>A prion is an infectious protein conformation with no nucleic acid. It propagates by promoting a compatible protein to adopt the misfolded shape.</li>',
     '<li>A prion is an infectious, self-propagating protein conformation with no nucleic acid. It spreads by promoting a compatible protein to adopt the misfolded shape.</li><li>In mammalian prion diseases that protein is the prion protein: PrP<sup>Sc</sup> templates the conversion of PrP<sup>C</sup>.</li>'],
  ],
},

// ============================================================ Q15 bio-77
// Lambda is the model for integrated lysogeny, but the toxin example belongs
// to other temperate phages and should not be attributed to lambda itself.
{
  q: 15, id: 'bio-77', expectLetter: 'C',
  explanation: [
    ['keeping the prophage in this state requires the phage repressor to be expressed, and lysogenic conversion genes can be expressed too.</p>',
     'keeping the prophage in this state requires the phage repressor to be expressed. More generally among temperate phages, lysogenic conversion genes can be expressed as well.</p>'],
    ['Some phage genes stay expressed, which is how lysogenic conversion can give the bacterium new properties such as toxin production.</p>',
     'Some phage genes stay expressed. Some other temperate phages carry expressed genes that give bacteria new properties, such as toxin production.</p>'],
  ],
},

// ============================================================ Q17 bio-79
// "Reversing the central dogma" survived in distractor B, the family labels
// were unnecessary, and reassortment was equated with antigenic shift.
{
  q: 17, id: 'bio-79', expectLetter: 'D',
  explanation: [
    ['Segmented genomes are characteristic of several RNA virus families (influenza/Orthomyxoviridae, rotavirus/Reoviridae, hantavirus/Bunyavirales) but NOT retroviruses.',
     'Segmented genomes are characteristic of several RNA viruses, such as influenza viruses, rotaviruses and hantaviruses, but not of retroviruses.'],
    ['The segmented genome of influenza enables reassortment (antigenic shift), which is a different evolutionary strategy.</p>',
     'The segmented influenza genome allows reassortment.</p>'],
    ['The truly unique feature of retroviruses is reverse transcription - converting RNA into DNA, reversing the central dogma.</p>',
     'Influenza, for example, also uses the nucleus. What distinguishes retroviruses in this comparison is the RNA-to-DNA intermediate made by reverse transcriptase.</p>'],
  ],
},

// ============================================================ Q20 bio-82
// The stem and the helicase distractor still said "proviral DNA" for DNA that
// has not been integrated yet.
{
  q: 20, id: 'bio-82', expectLetter: 'B',
  stemFull: 'In the HIV replication cycle, which viral enzyme is responsible for inserting the viral DNA into the host cell chromosome?',
  explanation: [
    ['The enzyme responsible for inserting proviral DNA into the host genome is integrase.</p>',
     'The enzyme responsible for inserting the viral DNA into the host genome is integrase; once inserted, that DNA is called a provirus.</p>'],
  ],
},

// ============================================================ Q23 bio-85
// "Like all consumers it ingests its food" is a universal claim about every
// consumer's digestive mechanism, which is not safe.
{
  q: 23, id: 'bio-85', expectLetter: 'B',
  explanation: [
    ['<p><strong>A. Tertiary consumer:</strong> A tertiary consumer feeds at a higher consumer level, eating other consumers. Like all consumers it ingests its food and digests it internally, rather than digesting externally and absorbing the products as the organism in the stem does.</p>',
     '<p><strong>A. Tertiary consumer:</strong> A tertiary consumer feeds on secondary consumers; this is a trophic position, whereas the stem describes external digestion of dead organic matter.</p>'],
    ['<p><strong>D. Primary consumer:</strong> A primary consumer eats producers. Again it ingests its food, whereas the organism described secretes enzymes onto its food and absorbs what is released.</p>',
     '<p><strong>D. Primary consumer:</strong> A primary consumer feeds on producers. That too is a trophic position, whereas the stem describes how the organism feeds: external digestion of dead organic matter, followed by absorption of the products.</p>'],
  ],
},

// ============================================================ Q25 bio-88
// Primary succession is defined by the absence of developed soil, not by a
// requirement that no organism was ever there.
{
  q: 25, id: 'bio-88', expectLetter: 'D',
  explanation: [
    ['<p>Primary succession occurs on newly formed or newly exposed substrates where no soil or organisms previously existed, such as bare rock from lava flows, glacial retreat, or newly formed volcanic islands.',
     '<p>Primary succession is the establishment of a community on a newly formed or newly exposed substrate that has no developed soil, such as bare rock from a lava flow, ground uncovered by glacial retreat, or a new volcanic island. The defining feature is the absence of developed soil, not a requirement that no organism was ever present there.'],
    ['Primary succession is far slower than secondary succession and can take hundreds or thousands of years.',
     'Primary succession is often slower than secondary succession and can take hundreds or thousands of years.'],
    ['<p class=\'exp-key\'>Bottom Line: Primary succession starts from bare substrate (no soil), while secondary succession starts from disturbed areas where soil and seed banks remain.</p>',
     '<p class=\'exp-key\'>Bottom Line: Primary succession starts on a substrate with no developed soil, while secondary succession occurs where soil remains after a disturbance. Seeds, roots or other surviving organisms may also remain, which is part of why secondary succession is usually quicker.</p>'],
  ],
},

// ============================================================ Q42 bio-108
// CAM plants take up CO2 at night, but the Calvin cycle runs in the day on
// the CO2 released from stored organic acids, so fixation is not nocturnal
// in its entirety.
{
  q: 42, id: 'bio-108', expectLetter: 'C',
  explanation: [
    ['<p><strong>A. Fix CO₂ only at night when stomata are open:</strong> Fixing CO₂ only at night with stomata open describes CAM (Crassulacean Acid Metabolism) plants such as cacti, pineapples, and succulents-not C4 plants. CAM plants open stomata at night to minimize water loss, temporarily fixing CO₂ into malate which is stored in vacuoles and decarboxylated during the day for the Calvin cycle. C4 plants, by contrast, keep their stomata open during the day.</p>',
     '<p><strong>A. Fix CO₂ only at night when stomata are open:</strong> CAM plants generally take up atmospheric CO₂ at night and store the carbon in organic acids. During the day, these acids release CO₂, which Rubisco fixes in the Calvin cycle. So this option is wrong twice over: it describes CAM rather than C4, and even in CAM plants the carbon fixation is not confined to the night. CAM plants, such as cacti, pineapples and succulents, open their stomata at night to limit water loss; C4 plants such as maize keep theirs open during the day.</p>'],
  ],
},

// ============================================================ Q47 bio-114
// Distractor A still ended by attributing phloem flow to "osmotic pressure
// gradients", which is the conflation the first pass fixed everywhere else.
{
  q: 47, id: 'bio-114', expectLetter: 'C',
  explanation: [
    ['Phloem transport operates by a completely different mechanism based on osmotic pressure gradients.</p>',
     'Phloem sap moves by bulk flow down a hydrostatic pressure gradient, established through sugar loading and unloading and the resulting osmotic movement of water.</p>'],
  ],
},

// ============================================================ Q53 bio-121
// The fetal placenta also contains mesoderm-derived tissue, so trophoblast
// contributes to it rather than forming it.
{
  q: 53, id: 'bio-121', expectLetter: 'C',
  explanation: [
    ['including the trophoblast that forms the fetal part of the placenta',
     'including the trophoblast that contributes to the fetal part of the placenta'],
  ],
},

// ============================================================ Q55 bio-123
// Option A named the trophoblast, which gives the answer away in a stem that
// asks what the trophoblast contributes to.
{
  q: 55, id: 'bio-123', expectLetter: 'A',
  optionFull: [[0, 'The chorion and fetal portion of the placenta']],
  explanation: [
    ['<h4>Correct Answer: A) The trophoblast component of the chorion and fetal placenta</h4>',
     '<h4>Correct Answer: A) The chorion and fetal portion of the placenta</h4>'],
  ],
},

// ============================================================ Q58 bio-126
// Scope to human development, and describe the notochord as the axial
// mesodermal structure it is rather than only as a signalling source.
{
  q: 58, id: 'bio-126', expectLetter: 'B',
  stemFull: 'The notochord, a defining feature of chordates, plays which key role during human embryonic development?',
  explanation: [
    ['<li>The notochord&rsquo;s key role is signalling to neighbouring tissues rather than becoming a structure itself.</li>',
     '<li>The notochord is an axial mesodermal structure that helps organize surrounding tissues through signalling.</li>'],
  ],
},

// ============================================================ Q59 bio-127
// "Rapid" in the keyed option made unusually short cell cycles sound like a
// universal requirement, which the revised explanation already denies.
{
  q: 59, id: 'bio-127', expectLetter: 'A',
  optionFull: [[0, 'Successive mitotic divisions that increase cell number without significant growth in total embryo size']],
  explanation: [
    ['<h4>Correct Answer: A) Rapid mitotic divisions that increase cell number without significant growth in total embryo size</h4>',
     '<h4>Correct Answer: A) Successive mitotic divisions that increase cell number without significant growth in total embryo size</h4>'],
  ],
},

];

// ===========================================================================

let failed = false;
function fail(msg) { console.error('FAIL ' + msg); failed = true; }

function replaceOnce(text, from, to, where) {
  const n = text.split(from).length - 1;
  if (n !== 1) {
    fail(`${where}: anchor matched ${n} times, expected 1\n      ${from.slice(0, 130)}`);
    return null;
  }
  return text.replace(from, to);
}

function main() {
  const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));
  const by = Object.fromEntries(data.biology.map(q => [q.id, q]));
  let applied = 0;

  for (const spec of EDITS) {
    const where = `Q${spec.q} ${spec.id}`;
    const q = by[spec.id];
    if (!q) { fail(`${where}: not found`); continue; }
    if (LETTER[q.correct] !== spec.expectLetter) {
      fail(`${where}: key is ${LETTER[q.correct]}, expected ${spec.expectLetter}`);
      continue;
    }
    let ok = true;
    if (spec.stemFull) q.question = spec.stemFull;
    for (const [i, t] of spec.optionFull || []) q.options[i] = t;
    if (spec.explanation) {
      let t = q.explanation;
      for (const [from, to] of spec.explanation) {
        const next = replaceOnce(t, from, to, where + ' explanation');
        if (next === null) { ok = false; break; }
        t = next;
      }
      if (ok) q.explanation = t;
    }
    if (ok) applied++;
  }

  for (const spec of EDITS) {
    const q = by[spec.id];
    if (!q) continue;
    for (const [i] of spec.optionFull || []) {
      if (i === q.correct) continue;
      const label = q.options[i].replace(/<[^>]*>/g, '');
      const esc = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      if (!new RegExp('<strong>' + LETTER[i] + '\\. ' + esc + ':?</strong>').test(q.explanation)) {
        fail(`Q${spec.q} ${spec.id}: option ${LETTER[i]} is "${label.slice(0, 60)}" with no matching heading`);
      }
    }
    const blob = q.question + ' ' + q.options.join(' ') + ' ' + q.explanation;
    if (blob.includes('—')) fail(`Q${spec.q} ${spec.id}: em dash in student-facing text`);
    if (/<li>\s*<\/li>|<p>\s*<\/p>/.test(q.explanation)) fail(`Q${spec.q} ${spec.id}: empty element left by a deletion`);
  }

  if (failed) { console.error(`\n${applied}/${EDITS.length} applied cleanly; nothing written.`); process.exit(1); }
  if (DRY) { console.log(`dry run: ${applied}/${EDITS.length} items apply cleanly.`); return; }
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2) + '\n');
  console.log(`${applied}/${EDITS.length} follow-up edits applied; questions.json written.`);
}

main();
