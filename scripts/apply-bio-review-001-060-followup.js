/**
 * Second, targeted pass over the reviewed biology block.
 *
 *   node scripts/apply-bio-review-001-060-followup.js [--dry]
 *
 * Five edits that came back after the first pass. Same numbering as before
 * (see apply-bio-review-001-060.js): review Q1-Q11 -> bio-1..bio-11,
 * review Q12-Q60 -> bio-13..bio-61.
 *
 *   Q6  bio-6   option D "Cytoplasm" -> "Cytosol"
 *   Q34 bio-35  the lagging strand is not "built backwards"
 *   Q44 bio-45  drop the dihybrid-ratio column; this item names no cross
 *   Q47 bio-48  option A "Cytoplasm" -> "Cytosol"; ATP synthase is not
 *               part of the electron transport chain
 *   Q53 bio-54  split emulsification and micelle formation
 *
 * Every edit is anchored on text that must appear exactly once, and a label
 * change is applied to the option AND to the heading of its distractor
 * explanation, so the two cannot drift apart.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const FILE = path.join(ROOT, 'questions.json');
const DRY = process.argv.includes('--dry');

const ID = n => 'bio-' + (n <= 11 ? n : n + 1);
const LETTER = 'ABCD';

const EDITS = {

  // ----------------------------------------------------------------- Q6
  // "Cytoplasm" includes the organelles, so it is the wrong contrast with a
  // chloroplast. The option now names the cytosol, which is what is meant.
  6: {
    expectLetter: 'B',
    option: [3, 'Cytoplasm', 'Cytosol'],
    explanation: [
      ["<p><strong>D. Cytoplasm:</strong> The cytoplasm includes the organelles; the cytosol is the fluid around them. The cell's cytosol is not the site of the light reactions in plants; these occur on membranes inside chloroplasts. Cyanobacteria have no chloroplasts and carry thylakoid membranes directly in the cell.</p>",
        '<p><strong>D. Cytosol:</strong> The cytosol is the fluid portion of the cytoplasm outside the membrane-bound organelles. In plants, the light-dependent reactions occur on thylakoid membranes inside chloroplasts, not in the cytosol.</p>'],
    ],
  },

  // ---------------------------------------------------------------- Q34
  // "Built backwards" describes the direction of the fragments relative to
  // the fork, but reads as though the strand itself is made 3'->5'.
  34: {
    expectLetter: 'C',
    explanation: [
      ['<li>The leading strand is synthesized continuously toward the replication fork; the lagging strand is built backwards in pieces.</li>',
        '<li>Both new DNA strands are synthesized in the 5&prime;&rarr;3&prime; direction. The leading strand is synthesized continuously toward the advancing replication fork. The lagging strand is synthesized discontinuously as short Okazaki fragments, each growing away from the fork.</li>'],
    ],
  },

  // ---------------------------------------------------------------- Q44
  // The item names no cross, so quoting 9:3:3:1 against it asserts a ratio
  // the question never set up. The comparison keeps what the stem supports.
  44: {
    expectLetter: 'B',
    explanation: [
      ['<tr><th>Gene Location</th><th>Assortment</th><th>Dihybrid Ratio</th></tr><tr><td>Different chromosomes</td><td>Independent</td><td>9:3:3:1</td></tr><tr><td>Far apart, same chromosome</td><td>Nearly independent</td><td>Near 9:3:3:1</td></tr><tr><td><strong>Close, same chromosome</strong></td><td><strong>Linked</strong></td><td><strong>Excess parental types</strong></td></tr>',
        '<tr><th>Gene location</th><th>Behaviour in inheritance</th></tr>'
        + '<tr><td>Different chromosomes</td><td>Independent assortment</td></tr>'
        + '<tr><td>Far apart on the same chromosome</td><td>Can behave as effectively unlinked</td></tr>'
        + '<tr><td><strong>Close together on the same chromosome</strong></td><td><strong>Tend to be inherited together</strong></td></tr>'],
      ["<p><strong>A. On different chromosomes:</strong> Genes on different chromosomes assort independently according to Mendel's second law (law of independent assortment). Morgan's key discovery was that genes on the <em>same</em> chromosome tend to be inherited together, violating independent assortment. This is why his fruit fly crosses produced ratios different from the expected 9:3:3:1 for unlinked genes.</p>",
        '<p><strong>A. On different chromosomes:</strong> Genes on different chromosomes generally assort independently. Genes close together on the same chromosome tend to be inherited together, producing more parental combinations and fewer recombinant combinations than expected under independent assortment.</p>'],
    ],
  },

  // ---------------------------------------------------------------- Q47
  // Same cytoplasm/cytosol correction as Q6, plus the distinction the first
  // pass made in the prose but left contradicted in the first bullet:
  // ATP synthase uses the gradient, it is not a link in the chain.
  47: {
    expectLetter: 'C',
    option: [0, 'Cytoplasm', 'Cytosol'],
    explanation: [
      ['<p><strong>A. Cytoplasm:</strong> While glycolysis occurs in the cytoplasm, the electron transport chain (ETC) is located in the inner mitochondrial membrane, not the cytoplasm. The cytoplasm lacks the membrane-bound complexes (Complexes I-IV and ATP synthase) needed for oxidative phosphorylation.</p>',
        '<p><strong>A. Cytosol:</strong> Glycolysis occurs in the cytosol. In eukaryotic cells, the respiratory electron transport chain is embedded in the inner mitochondrial membrane.</p>'],
      ['<li>The electron transport chain consists of four protein complexes (I-IV) and ATP synthase (Complex V) embedded in the inner mitochondrial membrane.</li>',
        '<li>The electron transport chain transfers electrons through complexes I&ndash;IV and mobile electron carriers, helping establish a proton gradient. ATP synthase, also called Complex V, uses that gradient to make ATP; it does not itself transfer electrons along the chain.</li>'],
      // Redundant once the bullet above states the relationship precisely.
      ['<li>The ETC creates a proton gradient across the inner membrane, which drives ATP synthesis via chemiosmosis.</li>', ''],
      // Keep the opening paragraph consistent with that distinction.
      ['<p>The electron transport chain transfers electrons and helps build a proton gradient across the inner mitochondrial membrane. ATP synthase uses this gradient to make ATP. Together these processes support oxidative phosphorylation. Both the ETC complexes (I&ndash;IV) and ATP synthase are embedded in the inner membrane, which is folded into cristae.</p>',
        '<p>The electron transport chain transfers electrons through complexes I&ndash;IV and helps build a proton gradient across the inner mitochondrial membrane. ATP synthase, also called Complex V, uses that gradient to make ATP rather than passing electrons along the chain. Together these processes make up oxidative phosphorylation. The chain complexes and ATP synthase are all embedded in the inner membrane, which is folded into cristae.</p>'],
    ],
  },

  // ---------------------------------------------------------------- Q53
  // Emulsification and micelle formation are two different jobs, and the old
  // bullet attached the surface-area benefit to both.
  53: {
    expectLetter: 'B',
    explanation: [
      ['<li>Bile salts emulsify fat into small droplets and help form micelles, which increases the surface area lipase can work on.</li>',
        '<li>Bile salts help emulsify fat into small droplets, increasing the surface area available to pancreatic lipase.</li>'
        + '<li>Bile salts also form mixed micelles that carry products of fat digestion, including fatty acids and monoglycerides, toward the intestinal surface for absorption.</li>'],
    ],
  },
};

// ===========================================================================

function fail(msg) { console.error('FAIL ' + msg); process.exitCode = 1; return false; }

function replaceOnce(text, from, to, where) {
  const n = text.split(from).length - 1;
  if (n !== 1) {
    fail(`${where}: anchor matched ${n} times, expected 1\n      ${from.slice(0, 110)}`);
    return null;
  }
  return text.replace(from, to);
}

function main() {
  const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));
  const by = Object.fromEntries(data.biology.map(q => [q.id, q]));
  let ok = true, changed = 0;

  for (const num of Object.keys(EDITS).map(Number).sort((a, b) => a - b)) {
    const spec = EDITS[num];
    const id = ID(num);
    const q = by[id];
    if (!q) { ok = fail(`Q${num} -> ${id} not found`); continue; }

    if (spec.expectLetter && LETTER[q.correct] !== spec.expectLetter) {
      ok = fail(`Q${num} (${id}): key is ${LETTER[q.correct]}, expected ${spec.expectLetter}`);
      continue;
    }
    if (spec.option) {
      const [i, from, to] = spec.option;
      const t = replaceOnce(q.options[i], from, to, `Q${num} ${id} option ${LETTER[i]}`);
      if (t === null) { ok = false; continue; }
      q.options[i] = t;
    }
    if (spec.explanation) {
      let t = q.explanation;
      for (const [from, to] of spec.explanation) {
        const next = replaceOnce(t, from, to, `Q${num} ${id} explanation`);
        if (next === null) { ok = false; t = null; break; }
        t = next;
      }
      if (t === null) continue;
      q.explanation = t;
    }
    changed++;
  }

  // An option's text and the heading of its distractor explanation must agree,
  // or a renamed option leaves its explanation labelled with the old word.
  for (const num of Object.keys(EDITS).map(Number)) {
    const q = by[ID(num)];
    if (!q || !EDITS[num].option) continue;
    const i = EDITS[num].option[0];
    const label = q.options[i];
    const heading = new RegExp('<strong>' + LETTER[i] + '\\. ' + label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':</strong>');
    if (i === q.correct) continue;
    if (!heading.test(q.explanation)) {
      ok = fail(`Q${num} ${ID(num)}: option ${LETTER[i]} is "${label}" but no matching "${LETTER[i]}. ${label}:" heading in the explanation`);
    }
  }

  const planned = Object.keys(EDITS).length;
  if (!ok) { console.error(`\n${changed}/${planned} applied cleanly; nothing written.`); process.exit(1); }
  if (DRY) { console.log(`dry run: ${changed}/${planned} items apply cleanly.`); return; }
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2) + '\n');
  console.log(`${changed}/${planned} follow-up edits applied; questions.json written.`);
}

main();
