/* Apply the SHOSMED physics review of the 60-question block to
 * questions-physics.json.
 *
 * All-or-nothing. Every edit is anchored on the exact text it replaces, every
 * id/answer-letter pair is re-confirmed against the stored record, and the
 * inventories the review asserts are re-checked after the edits. Nothing is
 * written unless every check passes.
 *
 * Verified display -> bank id map: scripts/phys-review-60-idmap.json
 * Edit specs: scripts/phys-review-edits-{a..f}.js (ten display items each).
 *
 * Usage: node scripts/apply-phys-review-60.js
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const FILE = path.join(ROOT, 'questions-physics.json');
const L = 'ABCD';
const WHY = '<h4>Why the other choices are wrong:</h4>';
const KCOPEN = "<p class='exp-key'>Key Concept: ";

const raw = fs.readFileSync(FILE, 'utf8');
const data = JSON.parse(raw);
if (JSON.stringify(data, null, 2) + '\n' !== raw) {
  console.error('ABORT: questions-physics.json does not round-trip');
  process.exit(1);
}
const before = JSON.parse(raw);

const IDMAP = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/phys-review-60-idmap.json'), 'utf8'));
const MAP = IDMAP.map;
const SPECS = [];
for (const m of ['a', 'b', 'c', 'd', 'e', 'f'])
  for (const s of require('./phys-review-edits-' + m + '.js')) SPECS.push(s);

const problems = [];
const fail = m => problems.push(m);
const find = id => data.physics.find(r => r.id === id);
const findBefore = id => before.physics.find(r => r.id === id);

/* ---------- structure ---------- */
function split(exp) {
  const km = exp.match(/^<h4[^>]*>Correct Answer: ([\s\S]*?)<\/h4>/);
  if (!km) return null;
  const i = exp.indexOf(KCOPEN);
  if (i < 0) return null;
  const close = exp.indexOf('</p>', i);
  if (close < 0) return null;
  return {
    keyed: km[1],
    head: exp.slice(km[0].length, i),
    kc: exp.slice(i + KCOPEN.length, close),
    tail: exp.slice(close + 4),
  };
}
const join = s => '<h4>Correct Answer: ' + s.keyed + '</h4>' + s.head + KCOPEN + s.kc + '</p>' + s.tail;

const stat = {
  changed: [], stems: [], heads: [], headEdits: 0, kcs: [], fbItems: 0, fbParas: 0,
  keyChanges: [], keyedResynced: [],
};

for (const spec of SPECS) {
  const where = spec.q + ' ' + spec.id;
  if (MAP[spec.q] !== spec.id) { fail(where + ': the verified map says ' + MAP[spec.q]); continue; }
  const r = find(spec.id);
  if (!r) { fail(where + ': record not found'); continue; }
  if (L[r.correct] !== spec.key) {
    fail(where + ': stored key is ' + L[r.correct] + ', the review original is ' + spec.key); continue;
  }
  if (IDMAP.asserted_original_keys[spec.q] !== spec.key) { fail(where + ': spec key disagrees with the id map'); continue; }
  const want = IDMAP.asserted_corrected_keys[spec.q];
  const pre = JSON.stringify({ q: r.question, o: r.options, e: r.explanation, c: r.correct });

  const s = split(r.explanation);
  if (!s) { fail(where + ': the explanation does not parse into keyed/head/Key Concept'); continue; }
  if (s.head.indexOf(WHY) >= 0 || /<p><strong>[ABCD]\. /.test(s.head)) {
    fail(where + ': it already carries distractor feedback, so it must be reconciled, not added to'); continue;
  }
  const keyedWasLettered = /^[ABCD]\) /.test(s.keyed);

  /* stem. Anchored either byte-exactly (stemWas) or on a distinctive stored
     fragment (stemMustContain); one of the two is required, so a replacement
     can never be written against a record it does not actually match. */
  if (spec.stem !== undefined) {
    if (spec.stemWas === undefined && spec.stemMustContain === undefined) {
      fail(where + ': a stem replacement needs stemWas or stemMustContain'); continue;
    }
    if (spec.stemWas !== undefined && r.question !== spec.stemWas) { fail(where + ': the stem is not the reconfirmed text'); continue; }
    if (spec.stemMustContain !== undefined && r.question.indexOf(spec.stemMustContain) < 0) {
      fail(where + ': the stem does not contain ' + JSON.stringify(spec.stemMustContain)); continue;
    }
    if (r.question === spec.stem) { fail(where + ': the stem replacement is a no-op'); continue; }
    r.question = spec.stem;
    stat.stems.push(spec.q);
  }
  if (spec.options) { fail(where + ': this review replaces no option text'); continue; }

  /* answer letter: only where the review corrects it */
  if (want !== spec.key) {
    if (spec.newKey !== want) { fail(where + ': the spec does not carry the corrected key ' + want); continue; }
    r.correct = L.indexOf(want);
    stat.keyChanges.push(spec.q + ' ' + spec.key + '->' + want);
  } else if (spec.newKey !== undefined) { fail(where + ': the spec changes a key the review does not'); continue; }

  /* main explanation */
  let bad = false;
  if (spec.head !== undefined) {
    if (spec.headWas !== undefined && s.head !== spec.headWas) { fail(where + ': the head block is not the reconfirmed text'); continue; }
    if (spec.headMustContain !== undefined && s.head.indexOf(spec.headMustContain) < 0) {
      fail(where + ': the head does not contain ' + JSON.stringify(spec.headMustContain)); continue;
    }
    s.head = spec.head;
    stat.heads.push(spec.q);
  }
  for (const [from, to] of (spec.headEdits || [])) {
    const n = s.head.split(from).length - 1;
    if (n !== 1) { fail(where + ' head edit matched ' + n + ' time(s): ' + JSON.stringify(String(from).slice(0, 70))); bad = true; break; }
    s.head = s.head.replace(from, to);
    stat.headEdits++;
  }
  if (bad) continue;

  /* Key Concept */
  if (spec.kc !== undefined) {
    if (spec.kcWas === undefined && spec.kcMustContain === undefined) {
      fail(where + ': a Key Concept replacement needs kcWas or kcMustContain'); continue;
    }
    if (spec.kcWas !== undefined && s.kc !== spec.kcWas) { fail(where + ': the Key Concept is not the reconfirmed text'); continue; }
    if (spec.kcMustContain !== undefined && s.kc.indexOf(spec.kcMustContain) < 0) {
      fail(where + ': the Key Concept does not contain ' + JSON.stringify(spec.kcMustContain)); continue;
    }
    if (s.kc === spec.kc) { fail(where + ': the Key Concept replacement is a no-op'); continue; }
    s.kc = spec.kc;
    stat.kcs.push(spec.q);
  }

  /* keyed heading: preserve each item's style, resync only where the key moved */
  const keyedWant = keyedWasLettered ? L[r.correct] + ') ' + r.options[r.correct] : r.options[r.correct];
  if (s.keyed !== keyedWant) {
    if (want === spec.key) { fail(where + ': its keyed heading does not reproduce its option, and no key moved'); continue; }
    s.keyed = keyedWant;
    stat.keyedResynced.push(spec.q);
  }

  /* distractor feedback: three paragraphs, headings derived from the options */
  if (!spec.fb || spec.fb.length !== 3) { fail(where + ': needs exactly three distractor paragraphs'); continue; }
  const seen = new Set();
  let fb = '';
  for (const [letter, body] of spec.fb) {
    const j = L.indexOf(letter);
    if (j < 0 || j === r.correct || seen.has(letter)) { fail(where + ': feedback letter ' + letter + ' is invalid or repeated'); bad = true; break; }
    seen.add(letter);
    fb += '<p><strong>' + letter + '. ' + r.options[j] + ':</strong>' + body + '</p>';
  }
  if (bad) continue;
  s.head = s.head + WHY + fb;
  stat.fbItems++;
  stat.fbParas += 3;

  r.explanation = join(s);
  const post = JSON.stringify({ q: r.question, o: r.options, e: r.explanation, c: r.correct });
  if (post !== pre) stat.changed.push(spec.q);
  else fail(where + ': the spec produced no change');
}

/* ---------- pack-wide invariants ---------- */
const QS = Object.keys(MAP);
if (SPECS.length !== 60) fail('loaded ' + SPECS.length + ' specs, expected 60');
if (new Set(SPECS.map(s => s.q)).size !== 60) fail('the specs do not cover 60 distinct displays');

let tables = 0, kcCount = 0, fbTotal = 0, lettered = 0, unlettered = 0, pts = 0, bl = 0;
const tableItems = [], headBad = [];
for (const Q of QS) {
  const r = find(MAP[Q]), e = r.explanation, b = findBefore(MAP[Q]);
  const t = (e.match(/<table/g) || []).length;
  if (t) { tables += t; tableItems.push(Q); }
  if ((e.match(/<p class='exp-key'>Key Concept: /g) || []).length === 1) kcCount++;
  else fail(Q + ': not exactly one Key Concept');
  if (/Key Educational Points/i.test(e)) pts++;
  if (/Bottom Line/i.test(e)) bl++;
  if ((e.match(/<h4[^>]*>Correct Answer:/g) || []).length !== 1) fail(Q + ': duplicated keyed heading');
  if ((e.match(/Why the other choices are wrong/g) || []).length !== 1) fail(Q + ': feedback heading count is not 1');
  const parts = [...e.matchAll(/<p><strong>([ABCD])\. ([\s\S]*?):<\/strong>/g)];
  fbTotal += parts.length;
  if (parts.length !== 3) fail(Q + ': ' + parts.length + ' distractor paragraphs');
  if (new Set(parts.map(m => m[1])).size !== 3) fail(Q + ': duplicate distractor letters');
  for (const m of parts) {
    if (m[1] === L[r.correct]) fail(Q + ': a feedback paragraph for the keyed letter');
    if (m[2] !== r.options[L.indexOf(m[1])]) headBad.push(Q + ' ' + m[1]);
  }
  const kh = (e.match(/^<h4[^>]*>Correct Answer: ([\s\S]*?)<\/h4>/) || [])[1];
  const isLettered = /^[ABCD]\) /.test(kh);
  if (isLettered) lettered++; else unlettered++;
  const wasLettered = /^[ABCD]\) /.test((b.explanation.match(/^<h4[^>]*>Correct Answer: ([\s\S]*?)<\/h4>/) || [])[1]);
  if (isLettered !== wasLettered) fail(Q + ': its keyed-heading style changed');
  if ((isLettered ? L[r.correct] + ') ' + r.options[r.correct] : r.options[r.correct]) !== kh) headBad.push(Q + ' keyed');
  /* feedback sits after the main/tables and before the Key Concept */
  const iW = e.indexOf(WHY), iK = e.indexOf(KCOPEN), iT = e.indexOf('<table');
  if (!(iW < iK)) fail(Q + ': the feedback is not before the Key Concept');
  if (iT >= 0 && !(iT < iW)) fail(Q + ': the feedback is not after the table');
  if (/<p><p>|<\/p><\/p>/.test(e)) fail(Q + ': doubled paragraph tags');
  for (const t2 of ['p', 'h4', 'ul', 'ol', 'li', 'strong', 'em', 'table', 'tr', 'td', 'th', 'div', 'sub', 'sup']) {
    const o = (e.match(new RegExp('<' + t2 + '[ >]', 'g')) || []).length;
    const c = (e.match(new RegExp('</' + t2 + '>', 'g')) || []).length;
    if (o !== c) fail(Q + ': unbalanced <' + t2 + '> ' + o + '/' + c);
  }
  const all = r.question + r.options.join('') + e;
  if (/—/.test(all)) fail(Q + ': em dash');
  if (/�/.test(all)) fail(Q + ': replacement character');
  if (JSON.stringify(r.options) !== JSON.stringify(b.options)) fail(Q + ': an option text changed');
  if (r.id !== b.id || r.topic !== b.topic || r.subject !== b.subject) fail(Q + ': id, topic or subject moved');
}
if (tables !== 18) fail('tables ' + tables + ', expected 18');
if (JSON.stringify(tableItems) !== JSON.stringify(IDMAP.presentation.table_items)) fail('tables are in ' + tableItems.join(','));
if (kcCount !== 60) fail('Key Concepts ' + kcCount + ', expected 60');
if (fbTotal !== 180) fail('distractor paragraphs ' + fbTotal + ', expected 180');
if (pts || bl) fail('a Key Educational Points block or Bottom Line appeared (' + pts + '/' + bl + ')');
if (lettered !== 39 || unlettered !== 21) fail('keyed styles: ' + lettered + ' lettered, ' + unlettered + ' unlettered, expected 39/21');
if (headBad.length) fail('headings not matching their option: ' + headBad.join(', '));

/* scope against the review's own inventory */
const inv = IDMAP.scope;
if (JSON.stringify(stat.stems) !== JSON.stringify(inv.stem_changes)) fail('stems ' + stat.stems.length + ': ' + stat.stems.join(','));
if (JSON.stringify(stat.heads) !== JSON.stringify(inv.main_explanation_changes)) fail('mains ' + stat.heads.length + ': ' + stat.heads.join(','));
if (JSON.stringify(stat.kcs) !== JSON.stringify(inv.key_concept_changes)) fail('Key Concepts ' + stat.kcs.length + ': ' + stat.kcs.join(','));
if (JSON.stringify(stat.keyChanges) !== JSON.stringify(['Q31 D->B'])) fail('key changes: ' + stat.keyChanges.join(','));
if (stat.changed.length !== 60) fail(stat.changed.length + ' items changed, expected 60 (every item gains feedback)');
if (stat.fbItems !== 60) fail('feedback added to ' + stat.fbItems + ' items');

/* nothing outside the block */
const PACK = new Set(Object.values(MAP));
if (data.physics.length !== 280) fail('physics bank size moved');
for (const r of before.physics) {
  if (PACK.has(r.id)) continue;
  if (JSON.stringify(find(r.id)) !== JSON.stringify(r)) fail('out-of-block record changed: ' + r.id);
}

if (problems.length) {
  console.error('ABORTED, nothing written (' + problems.length + ' problem(s)):\n  ' + problems.slice(0, 40).join('\n  '));
  process.exit(1);
}

fs.writeFileSync(FILE, JSON.stringify(data, null, 2) + '\n');
const list = a => (a.length ? ' (' + a.join(', ') + ')' : '');
console.log('60/60 displays processed');
console.log('  items changed       : ' + stat.changed.length + ' (every item gains distractor feedback)');
console.log('  stems replaced      : ' + stat.stems.length);
console.log('  main explanations   : ' + stat.heads.length + ' replaced; targeted head edits: ' + stat.headEdits);
console.log('  Key Concepts        : ' + stat.kcs.length + ' replaced, ' + (60 - stat.kcs.length) + ' retained');
console.log('  distractor feedback : ' + stat.fbParas + ' paragraphs across ' + stat.fbItems + ' items');
console.log('  answer letters      : ' + stat.keyChanges.length + list(stat.keyChanges) + '; keyed headings resynced: ' + stat.keyedResynced.length + list(stat.keyedResynced));
console.log('  option texts        : 0 changed');
console.log('  block: ' + tables + ' tables, ' + kcCount + ' Key Concepts, ' + fbTotal + ' distractor paragraphs, ' +
  lettered + ' lettered / ' + unlettered + ' unlettered keyed headings');
