/* Apply the SHOSMED physics review of the THIRD 60-question block to
 * questions-physics.json.
 *
 * All-or-nothing. Every edit is anchored on the exact text it replaces, every
 * id/answer-letter pair is re-confirmed against the stored record, and the
 * inventories the review asserts are re-checked after the edits. Nothing is
 * written unless every check passes.
 *
 * Unlike the first two blocks, Q56..Q60 ALREADY carry three distractor bodies
 * each, stored as a <ul> of <li> items with option-text lead-ins. Those five
 * blocks are reconstructed byte for byte from the spec before being touched,
 * the seven bodies the review retains are carried over verbatim and only the
 * eight it names are replaced, and the list becomes one paragraph per
 * incorrect option with the option letters added.
 *
 * Verified display -> bank id map: scripts/phys-review-b3-idmap.json
 * Edit specs: scripts/phys-b3-edits-{a..f}.js (ten display items each).
 *
 * Usage: node scripts/apply-phys-review-b3.js
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const FILE = path.join(ROOT, 'questions-physics.json');
const L = 'ABCD';
const WHY = '<h4>Why the other choices are wrong:</h4>';
const OLDWHY = '<p><strong>Why the other answers are wrong:</strong></p>';
const KCOPEN = "<p class='exp-key'>Key Concept: ";

const raw = fs.readFileSync(FILE, 'utf8');
const data = JSON.parse(raw);
if (JSON.stringify(data, null, 2) + '\n' !== raw) {
  console.error('ABORT: questions-physics.json does not round-trip');
  process.exit(1);
}
const before = JSON.parse(raw);

const IDMAP = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/phys-review-b3-idmap.json'), 'utf8'));
const MAP = IDMAP.map;
const SPECS = [];
for (const m of ['a', 'b', 'c', 'd', 'e', 'f'])
  for (const s of require('./phys-b3-edits-' + m + '.js')) SPECS.push(s);

const problems = [];
const fail = m => problems.push(m);
const find = id => data.physics.find(r => r.id === id);
const findBefore = id => before.physics.find(r => r.id === id);

function split(exp) {
  const km = exp.match(/^<h4[^>]*>Correct Answer: ([\s\S]*?)<\/h4>/);
  if (!km) return null;
  const i = exp.indexOf(KCOPEN);
  if (i < 0) return null;
  const close = exp.indexOf('</p>', i);
  if (close < 0) return null;
  return { keyed: km[1], head: exp.slice(km[0].length, i), kc: exp.slice(i + KCOPEN.length, close), tail: exp.slice(close + 4) };
}
const join = s => '<h4>Correct Answer: ' + s.keyed + '</h4>' + s.head + KCOPEN + s.kc + '</p>' + s.tail;

/* Q17 is the one item in this block that stores anything after its Key
   Concept: an empty styled div. The review changes nothing about it, so it is
   allowed here by exact text and by no other value. */
const ALLOWED_TAIL = { Q17: '<div style="text-align:center;margin:12px 0"></div>' };

const stat = {
  changed: [], stems: [], heads: [], kcs: [], opts: [], fbItems: 0, fbParas: 0,
  keyedResynced: [], existingConverted: [], fbKept: [], fbReplaced: []
};

for (const spec of SPECS) {
  const where = spec.q + ' ' + spec.id;
  if (MAP[spec.q] !== spec.id) { fail(where + ': the verified map says ' + MAP[spec.q]); continue; }
  const r = find(spec.id);
  if (!r) { fail(where + ': record not found'); continue; }
  if (L[r.correct] !== spec.key) { fail(where + ': stored key is ' + L[r.correct] + ', the review says ' + spec.key); continue; }
  if (IDMAP.asserted_keys[spec.q] !== spec.key) { fail(where + ': spec key disagrees with the id map'); continue; }
  if (spec.newKey !== undefined) { fail(where + ': this review changes no answer letter'); continue; }
  const pre = JSON.stringify({ q: r.question, o: r.options, e: r.explanation, c: r.correct });

  const s = split(r.explanation);
  if (!s) { fail(where + ': the explanation does not parse into keyed/head/Key Concept'); continue; }
  if (s.head.indexOf(WHY) >= 0 || /<p><strong>[ABCD]\. /.test(s.head)) {
    fail(where + ': it already carries lettered distractor feedback in the target form'); continue;
  }
  if (s.tail !== (ALLOWED_TAIL[spec.q] || '')) {
    fail(where + ': unexpected content after the Key Concept: ' + JSON.stringify(s.tail.slice(0, 120))); continue;
  }
  if (/^[ABCD][.)] /.test(s.keyed)) { fail(where + ': its keyed heading is lettered, but this block is unlettered throughout'); continue; }

  /* ---- existing <ul> feedback: reconstruct exactly, then strip ---- */
  const hasExisting = spec.existingFb !== undefined;
  if (hasExisting !== (s.head.indexOf(OLDWHY) >= 0)) {
    fail(where + ': the spec ' + (hasExisting ? 'expects' : 'expects no') + ' stored <ul> feedback, storage disagrees'); continue;
  }
  if (hasExisting) {
    if (!Array.isArray(spec.fbKeep) || !Array.isArray(spec.fbReplace)) { fail(where + ': existingFb needs fbKeep and fbReplace'); continue; }
    const letters = spec.existingFb.map(x => x[0]);
    const want = L.split('').filter((_, j) => j !== r.correct);
    if (JSON.stringify(letters) !== JSON.stringify(want)) {
      fail(where + ': stored feedback letters ' + letters.join('') + ', expected ' + want.join('') + ' in order'); continue;
    }
    if (JSON.stringify([...spec.fbKeep, ...spec.fbReplace].slice().sort()) !== JSON.stringify(want)) {
      fail(where + ': fbKeep plus fbReplace must name each of ' + want.join('') + ' exactly once'); continue;
    }
    const block = OLDWHY + '<ul>' + spec.existingFb.map(x => '<li>' + x[1] + ':' + x[2] + '</li>').join('') + '</ul>';
    if (!s.head.endsWith(block)) { fail(where + ': the stored <ul> feedback block is not the reconfirmed text'); continue; }
    const finalBody = {};
    for (const [letter, body] of (spec.fb || [])) finalBody[letter] = body;
    let bad = false;
    for (const [letter, , storedBody] of spec.existingFb) {
      const keep = spec.fbKeep.indexOf(letter) >= 0;
      if (finalBody[letter] === undefined) { fail(where + ' ' + letter + ': no final feedback body'); bad = true; break; }
      if (keep && finalBody[letter] !== storedBody) { fail(where + ' ' + letter + ': named as retained but the body differs from storage'); bad = true; break; }
      if (!keep && finalBody[letter] === storedBody) { fail(where + ' ' + letter + ': named as replaced but the body equals storage'); bad = true; break; }
      stat[keep ? 'fbKept' : 'fbReplaced'].push(spec.q + ' ' + letter);
    }
    if (bad) continue;
    s.head = s.head.slice(0, s.head.length - block.length);
    stat.existingConverted.push(spec.q);
  }

  /* ---- stem ---- */
  let bad = false;
  if (spec.stem !== undefined) {
    if (spec.stemWas === undefined) { fail(where + ': a stem replacement needs an exact anchor'); continue; }
    if (r.question !== spec.stemWas) { fail(where + ': the stem is not the reconfirmed text'); continue; }
    if (r.question === spec.stem) { fail(where + ': the stem replacement is a no-op'); continue; }
    r.question = spec.stem;
    stat.stems.push(spec.q);
  } else if (spec.stemWas !== undefined) { fail(where + ': stemWas without a replacement'); continue; }

  /* ---- option texts: anchored on the exact stored text, letter never moves ---- */
  for (const [letter, from, to] of (spec.options || [])) {
    const j = L.indexOf(letter);
    if (j < 0) { fail(where + ': bad option letter ' + letter); bad = true; break; }
    if (r.options[j] !== from) { fail(where + ' option ' + letter + ': expected ' + JSON.stringify(from)); bad = true; break; }
    if (from === to) { fail(where + ' option ' + letter + ': replacement is a no-op'); bad = true; break; }
    r.options[j] = to;
    stat.opts.push(spec.q + ' ' + letter);
  }
  if (bad) continue;

  /* ---- main explanation ---- */
  if (spec.head !== undefined) {
    if (spec.headWas === undefined) { fail(where + ': a main-explanation replacement needs an exact anchor'); continue; }
    if (s.head !== spec.headWas) { fail(where + ': the main explanation is not the reconfirmed text'); continue; }
    if (s.head === spec.head) { fail(where + ': the main-explanation replacement is a no-op'); continue; }
    s.head = spec.head;
    stat.heads.push(spec.q);
  } else if (spec.headWas !== undefined) { fail(where + ': headWas without a replacement'); continue; }

  /* ---- Key Concept ---- */
  if (spec.kc !== undefined) {
    if (spec.kcWas === undefined) { fail(where + ': a Key Concept replacement needs an exact anchor'); continue; }
    if (s.kc !== spec.kcWas) { fail(where + ': the Key Concept is not the reconfirmed text'); continue; }
    if (s.kc === spec.kc) { fail(where + ': the Key Concept replacement is a no-op'); continue; }
    s.kc = spec.kc;
    stat.kcs.push(spec.q);
  } else if (spec.kcWas !== undefined) { fail(where + ': kcWas without a replacement'); continue; }

  /* ---- keyed heading: unlettered, reproduces the keyed option. Only a
     renamed keyed option can move it, since no answer letter changes here. ---- */
  if (s.keyed !== r.options[r.correct]) {
    const renamedKeyed = (spec.options || []).some(o => o[0] === L[r.correct]);
    if (!renamedKeyed) { fail(where + ': its keyed heading does not reproduce its option, and the option was not renamed'); continue; }
    s.keyed = r.options[r.correct];
    stat.keyedResynced.push(spec.q);
  }

  /* ---- three distractor paragraphs, headings derived from the stored options ---- */
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

/* ---------- block-wide invariants ---------- */
const QS = Object.keys(MAP);
if (SPECS.length !== 60) fail('loaded ' + SPECS.length + ' specs, expected 60');
if (new Set(SPECS.map(s => s.q)).size !== 60) fail('the specs do not cover 60 distinct displays');

let tables = 0, kcCount = 0, fbTotal = 0, lettered = 0, pts = 0, bl = 0, divs = 0, uls = 0, lis = 0, oldWhy = 0;
const headBad = [];
for (const Q of QS) {
  const r = find(MAP[Q]), e = r.explanation, b = findBefore(MAP[Q]);
  tables += (e.match(/<table/g) || []).length;
  divs += (e.match(/<div/g) || []).length;
  uls += (e.match(/<ul>/g) || []).length;
  lis += (e.match(/<li>/g) || []).length;
  if (e.indexOf(OLDWHY) >= 0) oldWhy++;
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
  if (/^[ABCD][.)] /.test(kh)) lettered++;
  if (kh !== r.options[r.correct]) headBad.push(Q + ' keyed');
  const iW = e.indexOf(WHY), iK = e.indexOf(KCOPEN);
  if (!(iW > 0 && iW < iK)) fail(Q + ': the feedback is not between the main explanation and the Key Concept');
  if (/<p><p>|<\/p><\/p>/.test(e)) fail(Q + ': doubled paragraph tags');
  for (const t of ['p', 'h4', 'ul', 'ol', 'li', 'strong', 'em', 'table', 'tr', 'td', 'th', 'div', 'sub', 'sup']) {
    const o = (e.match(new RegExp('<' + t + '[ >]', 'g')) || []).length;
    const c = (e.match(new RegExp('</' + t + '>', 'g')) || []).length;
    if (o !== c) fail(Q + ': unbalanced <' + t + '> ' + o + '/' + c);
  }
  const all = r.question + r.options.join('') + e;
  if (/—/.test(all)) fail(Q + ': em dash');
  if (/�/.test(all)) fail(Q + ': replacement character');
  if (/[ΑΒΓ]/.test(all)) fail(Q + ': uppercase Greek particle symbol survives');
  if (r.correct !== b.correct) fail(Q + ': an answer letter moved');
  if (r.id !== b.id || r.topic !== b.topic || r.subject !== b.subject) fail(Q + ': id, topic or subject moved');
}
const P = IDMAP.presentation;
if (tables !== P.tables) fail('tables ' + tables);
if (kcCount !== P.key_concepts) fail('Key Concepts ' + kcCount);
if (fbTotal !== P.distractor_paragraphs_after) fail('distractor paragraphs ' + fbTotal);
if (uls !== 0 || lis !== P.distractor_list_items_after) fail('list markup survives: ' + uls + ' ul, ' + lis + ' li');
if (oldWhy !== 0) fail(oldWhy + ' items keep the old feedback heading');
if (divs !== P.divs_after) fail('divs ' + divs + ', expected ' + P.divs_after);
if (pts || bl) fail('a Key Educational Points block or Bottom Line appeared');
if (lettered !== 0) fail(lettered + ' keyed headings are lettered, expected 0');
if (headBad.length) fail('headings not matching their option: ' + headBad.join(', '));

const inv = IDMAP.scope;
if (JSON.stringify(stat.stems) !== JSON.stringify(inv.stem_changes)) fail('stems ' + stat.stems.length + ': ' + stat.stems.join(','));
if (JSON.stringify(stat.heads) !== JSON.stringify(inv.main_explanation_changes)) fail('mains ' + stat.heads.length + ': ' + stat.heads.join(','));
if (JSON.stringify(stat.kcs) !== JSON.stringify(inv.key_concept_changes)) fail('Key Concepts ' + stat.kcs.length + ': ' + stat.kcs.join(','));
if (JSON.stringify(stat.opts) !== JSON.stringify(Object.keys(inv.option_text_changes))) fail('option texts: ' + stat.opts.join(','));
for (const slot of Object.keys(inv.option_text_changes)) {
  const [Q, letter] = slot.split(' ');
  if (find(MAP[Q]).options[L.indexOf(letter)] !== inv.option_text_changes[slot]) fail(slot + ': stored option is not the replacement');
}
if (JSON.stringify(stat.existingConverted) !== JSON.stringify(inv.existing_feedback_items)) fail('converted items: ' + stat.existingConverted.join(','));
if (JSON.stringify(stat.fbKept.slice().sort()) !== JSON.stringify(inv.existing_feedback_bodies_retained.slice().sort())) fail('retained bodies: ' + stat.fbKept.join(', '));
if (JSON.stringify(stat.fbReplaced.slice().sort()) !== JSON.stringify(inv.existing_feedback_bodies_replaced.slice().sort())) fail('replaced bodies: ' + stat.fbReplaced.join(', '));
if (stat.changed.length !== 60) fail(stat.changed.length + ' items changed, expected 60');
if (stat.fbItems !== 60) fail('feedback built for ' + stat.fbItems + ' items');

/* the retained bodies must be byte-identical to what was stored */
for (const slot of inv.existing_feedback_bodies_retained) {
  const [Q, letter] = slot.split(' ');
  const r = find(MAP[Q]);
  const spec = SPECS.find(x => x.q === Q);
  const body = spec.existingFb.find(x => x[0] === letter)[2];
  const want = '<p><strong>' + letter + '. ' + r.options[L.indexOf(letter)] + ':</strong>' + body + '</p>';
  if (r.explanation.indexOf(want) < 0) fail(slot + ': the retained body is not stored verbatim');
}

/* core-content-kept items: only feedback may have appeared */
for (const Q of inv.core_content_kept) {
  const a = findBefore(MAP[Q]), b = find(MAP[Q]);
  if (a.question !== b.question) fail(Q + ': a core-kept stem changed');
  if (JSON.stringify(a.options) !== JSON.stringify(b.options)) fail(Q + ': a core-kept option changed');
  const sa = split(a.explanation), sb = split(b.explanation);
  if (sa.kc !== sb.kc) fail(Q + ': a core-kept Key Concept changed');
  if (sb.head.slice(0, sb.head.indexOf(WHY)) !== sa.head) fail(Q + ': a core-kept main explanation changed');
  if (sa.tail !== sb.tail) fail(Q + ': a core-kept tail changed');
}

/* retained main explanations and Key Concepts outside the replacement lists */
for (const Q of QS) {
  const a = findBefore(MAP[Q]), b = find(MAP[Q]);
  const sa = split(a.explanation), sb = split(b.explanation);
  if (inv.main_explanation_changes.indexOf(Q) < 0) {
    const spec = SPECS.find(x => x.q === Q);
    let wasHead = sa.head;
    if (spec.existingFb) {
      const block = OLDWHY + '<ul>' + spec.existingFb.map(x => '<li>' + x[1] + ':' + x[2] + '</li>').join('') + '</ul>';
      wasHead = wasHead.slice(0, wasHead.length - block.length);
    }
    if (sb.head.slice(0, sb.head.indexOf(WHY)) !== wasHead) fail(Q + ': a retained main explanation changed');
  }
  if (inv.key_concept_changes.indexOf(Q) < 0 && sa.kc !== sb.kc) fail(Q + ': a retained Key Concept changed');
  if (inv.stem_changes.indexOf(Q) < 0 && a.question !== b.question) fail(Q + ': a retained stem changed');
  if (sa.tail !== sb.tail) fail(Q + ': content after the Key Concept changed');
}

/* nothing outside the block */
const PACK = new Set(Object.values(MAP));
if (data.physics.length !== 280) fail('physics bank size moved');
if (PACK.size !== 60) fail('the map does not hold 60 distinct ids');
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
console.log('  items changed       : ' + stat.changed.length + ' (every item gains lettered distractor feedback)');
console.log('  stems replaced      : ' + stat.stems.length);
console.log('  main explanations   : ' + stat.heads.length + ' replaced, ' + (60 - stat.heads.length) + ' retained');
console.log('  Key Concepts        : ' + stat.kcs.length + ' replaced, ' + (60 - stat.kcs.length) + ' retained');
console.log('  option texts        : ' + stat.opts.length + list(stat.opts));
console.log('  keyed headings      : ' + stat.keyedResynced.length + ' re-synchronized' + list(stat.keyedResynced) + '; answer letters moved: 0');
console.log('  distractor feedback : ' + stat.fbParas + ' paragraphs across ' + stat.fbItems + ' items');
console.log('    new bodies        : ' + (stat.fbParas - stat.fbKept.length - stat.fbReplaced.length) + ' in Q1..Q55');
console.log('    retained verbatim : ' + stat.fbKept.length + list(stat.fbKept));
console.log('    replaced          : ' + stat.fbReplaced.length + list(stat.fbReplaced));
console.log('  <ul> feedback converted to paragraphs in: ' + stat.existingConverted.join(', '));
console.log('  block: ' + tables + ' tables, ' + kcCount + ' Key Concepts, ' + fbTotal + ' distractor paragraphs, ' +
  divs + ' divs (was ' + P.divs_before + '), ' + uls + ' ul, all keyed headings unlettered');
