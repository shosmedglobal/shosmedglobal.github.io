/* Apply the SHOSMED physics review of the FINAL block to
 * questions-physics.json.
 *
 * All-or-nothing. Every edit is anchored on the exact text it replaces, every
 * id/answer-letter pair is re-confirmed against the stored record, and the
 * inventories the review asserts are re-checked after the edits. Nothing is
 * written unless every check passes.
 *
 * The block has three bands:
 *   Q1       phys-214, the approved batch 4 Q34 record. Frozen in every field.
 *   Q2-Q11   phys-241..250. Educational points plus a Bottom Line, and three
 *            lettered feedback paragraphs already stored.
 *   Q12-Q41  phys-251..280. One Key Concept and NO feedback; three bodies are
 *            added before the Key Concept.
 *
 * Verified display -> bank id map: scripts/phys-review-b5-idmap.json
 * Edit specs: scripts/phys-b5-edits-{a..e}.js.
 *
 * Usage: node scripts/apply-phys-review-b5.js
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const FILE = path.join(ROOT, 'questions-physics.json');
const L = 'ABCD';
const OLDWHY = '<p><strong>Why the other answers are wrong:</strong></p>';
const NEWWHY = '<h4>Why the other choices are wrong:</h4>';
const EPOPEN = '<h4>Key Educational Points:</h4><ul>';
const KCOPEN = "<p class='exp-key'>Key Concept: ";
const BLOPEN = "<p class='exp-key'>Bottom Line: ";

const raw = fs.readFileSync(FILE, 'utf8');
const data = JSON.parse(raw);
if (JSON.stringify(data, null, 2) + '\n' !== raw) {
  console.error('ABORT: questions-physics.json does not round-trip');
  process.exit(1);
}
const before = JSON.parse(raw);

const IDMAP = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/phys-review-b5-idmap.json'), 'utf8'));
const MAP = IDMAP.map;
const SPECS = [];
for (const m of ['a', 'b', 'c', 'd', 'e'])
  for (const s of require('./phys-b5-edits-' + m + '.js')) SPECS.push(s);

const problems = [];
const fail = m => problems.push(m);
const find = id => data.physics.find(r => r.id === id);
const findBefore = id => before.physics.find(r => r.id === id);
const bandOf = Q => { const n = Number(Q.slice(1)); return n === 1 ? 1 : (n <= 11 ? 2 : 3); };

/* ---------- parse an explanation into its band's parts ---------- */
function split(exp, band) {
  const km = exp.match(/^<h4[^>]*>Correct Answer: ([\s\S]*?)<\/h4>/);
  if (!km) return null;
  const rest = exp.slice(km[0].length);
  if (band === 3) {
    const iK = rest.indexOf(KCOPEN);
    if (iK < 0) return null;
    const iFb = rest.indexOf(NEWWHY);
    const close = rest.indexOf('</p>', iK);
    return { band, keyed: km[1], head: rest.slice(0, iFb >= 0 ? iFb : iK),
      fbBlock: iFb >= 0 ? rest.slice(iFb, iK) : '', kc: rest.slice(iK + KCOPEN.length, close), tail: rest.slice(close + 4) };
  }
  const iFb = rest.indexOf(NEWWHY);
  const iEP = rest.indexOf(EPOPEN);
  const iBL = rest.indexOf(BLOPEN);
  if (!(iFb >= 0 && iFb < iEP && iEP < iBL)) return null;
  const epEnd = rest.indexOf('</ul>', iEP);
  const inner = rest.slice(iEP + EPOPEN.length, epEnd);
  if (rest.slice(epEnd + 5, iBL) !== '') return null;
  if (!inner.startsWith('<li>') || !inner.endsWith('</li>')) return null;
  const close = rest.indexOf('</p>', iBL);
  return { band, keyed: km[1], head: rest.slice(0, iFb), fbBlock: rest.slice(iFb, iEP),
    points: inner.slice(4, -5).split('</li><li>'), bl: rest.slice(iBL + BLOPEN.length, close), tail: rest.slice(close + 4) };
}
const join = s => '<h4>Correct Answer: ' + s.keyed + '</h4>' + s.head + s.fbBlock +
  (s.band === 3
    ? KCOPEN + s.kc + '</p>'
    : EPOPEN + s.points.map(p => '<li>' + p + '</li>').join('') + '</ul>' + BLOPEN + s.bl + '</p>') + s.tail;

const paraFb = (r, bodies) => NEWWHY +
  bodies.map(([l, b]) => '<p><strong>' + l + '. ' + r.options[L.indexOf(l)] + ':</strong>' + b + '</p>').join('');

const stat = { changed: [], stems: [], heads: [], headEdits: [], kcs: [], bls: [], epBlocks: [], epPoints: [],
  opts: [], keyedResynced: [], fbReplaced: [], fbKept: [], fbAdded: [], headingsSynced: 0, keptItems: [] };

for (const spec of SPECS) {
  const where = spec.q + ' ' + spec.id;
  const band = bandOf(spec.q);
  if (MAP[spec.q] !== spec.id) { fail(where + ': the verified map says ' + MAP[spec.q]); continue; }
  const r = find(spec.id);
  if (!r) { fail(where + ': record not found'); continue; }
  if (L[r.correct] !== spec.key) { fail(where + ': stored key is ' + L[r.correct] + ', the review says ' + spec.key); continue; }
  if (IDMAP.asserted_keys[spec.q] !== spec.key) { fail(where + ': spec key disagrees with the id map'); continue; }
  const pre = JSON.stringify({ q: r.question, o: r.options, e: r.explanation, c: r.correct });

  /* ---- Q1: byte-identical, no heading normalization ---- */
  if (spec.keep) {
    if (band !== 1) fail(where + ': only the first band carries a KEEP item');
    for (const f of ['stem', 'head', 'headEdits', 'kc', 'bl', 'epBlock', 'epEdits', 'options', 'existingFb', 'fb'])
      if (spec[f] !== undefined) fail(where + ': a KEEP item must carry no ' + f);
    stat.keptItems.push(spec.q);
    continue;
  }
  if (band === 1) { fail(where + ': the first band holds only the KEEP item'); continue; }

  const s = split(r.explanation, band);
  if (!s) { fail(where + ': the explanation does not parse into band ' + band); continue; }
  if (s.tail !== '') { fail(where + ': unexpected content at the end: ' + JSON.stringify(s.tail.slice(0, 80))); continue; }
  if (/^[ABCD][.)] /.test(s.keyed)) { fail(where + ': its keyed heading is lettered, but this block is unlettered throughout'); continue; }
  if (band === 3 && s.fbBlock !== '') { fail(where + ': the third band should store no feedback, but this record has some'); continue; }
  if (band === 2 && s.fbBlock === '') { fail(where + ': the second band should store three bodies, but this record has none'); continue; }

  /* ---- feedback bodies ---- */
  let bodies = [], bad = false;
  const want = L.split('').filter((_, j) => j !== r.correct);
  if (band === 2) {
    if (!Array.isArray(spec.existingFb) || spec.existingFb.length !== 3) { fail(where + ': needs three stored feedback bodies'); continue; }
    if (JSON.stringify(spec.existingFb.map(x => x[0])) !== JSON.stringify(want)) {
      fail(where + ': stored feedback letters are not ' + want.join('') + ' in order'); continue;
    }
    if (JSON.stringify([...(spec.fbKeep || []), ...(spec.fbReplace || [])].slice().sort()) !== JSON.stringify(want)) {
      fail(where + ': fbKeep plus fbReplace must name each of ' + want.join('') + ' exactly once'); continue;
    }
    const stored = NEWWHY + spec.existingFb.map(x => '<p><strong>' + x[0] + '. ' + x[1] + ':</strong>' + x[2] + '</p>').join('');
    if (s.fbBlock !== stored) { fail(where + ': the stored feedback block is not the reconfirmed text'); continue; }
    const given = {};
    for (const [letter, body] of (spec.fb || [])) given[letter] = body;
    for (const [letter, , storedBody] of spec.existingFb) {
      const keep = spec.fbKeep.indexOf(letter) >= 0;
      if (keep) {
        if (given[letter] !== undefined) { fail(where + ' ' + letter + ': a retained body needs no replacement text'); bad = true; break; }
        bodies.push([letter, storedBody]);
        stat.fbKept.push(spec.q + ' ' + letter);
      } else {
        if (given[letter] === undefined) { fail(where + ' ' + letter + ': named as replaced but no new body'); bad = true; break; }
        if (given[letter] === storedBody) { fail(where + ' ' + letter + ': named as replaced but the body equals storage'); bad = true; break; }
        bodies.push([letter, given[letter]]);
        stat.fbReplaced.push(spec.q + ' ' + letter);
      }
    }
    if (bad) continue;
  } else {
    for (const f of ['existingFb', 'fbKeep', 'fbReplace']) if (spec[f] !== undefined) { fail(where + ': ' + f + ' belongs to the second band only'); bad = true; }
    if (bad) continue;
    if (!Array.isArray(spec.fb) || spec.fb.length !== 3) { fail(where + ': needs exactly three new bodies'); continue; }
    if (JSON.stringify(spec.fb.map(x => x[0])) !== JSON.stringify(want)) {
      fail(where + ': the new bodies are not ' + want.join('') + ' in order'); continue;
    }
    bodies = spec.fb.map(x => [x[0], x[1]]);
    for (const [letter] of bodies) stat.fbAdded.push(spec.q + ' ' + letter);
  }

  /* ---- stem ---- */
  if (spec.stem !== undefined) {
    if (spec.stemWas === undefined) { fail(where + ': a stem replacement needs an exact anchor'); continue; }
    if (r.question !== spec.stemWas) { fail(where + ': the stem is not the reconfirmed text'); continue; }
    if (r.question === spec.stem) { fail(where + ': the stem replacement is a no-op'); continue; }
    r.question = spec.stem;
    stat.stems.push(spec.q);
  } else if (spec.stemWas !== undefined) { fail(where + ': stemWas without a replacement'); continue; }

  /* ---- option texts ---- */
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
    if (spec.headWas === undefined) { fail(where + ': a main-block replacement needs an exact anchor'); continue; }
    if (s.head !== spec.headWas) { fail(where + ': the main explanation is not the reconfirmed text'); continue; }
    if (s.head === spec.head) { fail(where + ': the main-block replacement is a no-op'); continue; }
    s.head = spec.head;
    stat.heads.push(spec.q);
  } else if (spec.headWas !== undefined) { fail(where + ': headWas without a replacement'); continue; }
  for (let i = 0; i < (spec.headEdits || []).length; i++) {
    const [from, to] = spec.headEdits[i];
    const n = s.head.split(from).length - 1;
    if (n !== 1) { fail(where + ' scoped main edit ' + (i + 1) + ' matched ' + n + ' time(s)'); bad = true; break; }
    if (from === to) { fail(where + ' scoped main edit ' + (i + 1) + ' is a no-op'); bad = true; break; }
    s.head = s.head.replace(from, to);
    stat.headEdits.push(spec.q + '.' + (i + 1));
  }
  if (bad) continue;

  /* ---- Key Concept (third band) / points and Bottom Line (second band) ---- */
  if (band === 3) {
    for (const f of ['epWas', 'epBlock', 'epEdits', 'bl', 'blWas']) if (spec[f] !== undefined) { fail(where + ': ' + f + ' belongs to the second band only'); bad = true; }
    if (bad) continue;
    if (spec.kc !== undefined) {
      if (spec.kcWas === undefined) { fail(where + ': a Key Concept replacement needs an exact anchor'); continue; }
      if (s.kc !== spec.kcWas) { fail(where + ': the Key Concept is not the reconfirmed text'); continue; }
      if (s.kc === spec.kc) { fail(where + ': the Key Concept replacement is a no-op'); continue; }
      s.kc = spec.kc;
      stat.kcs.push(spec.q);
    } else if (spec.kcWas !== undefined) { fail(where + ': kcWas without a replacement'); continue; }
  } else {
    for (const f of ['kc', 'kcWas']) if (spec[f] !== undefined) { fail(where + ': ' + f + ' belongs to the third band only'); bad = true; }
    if (bad) continue;
    if (!Array.isArray(spec.epWas)) { fail(where + ': a second-band item needs its stored educational points'); continue; }
    if (JSON.stringify(s.points) !== JSON.stringify(spec.epWas)) { fail(where + ': the educational points are not the reconfirmed text'); continue; }
    if (spec.epBlock !== undefined) {
      if (spec.epEdits !== undefined) { fail(where + ': a block replacement and point edits are mutually exclusive'); continue; }
      if (spec.epBlock.length !== spec.epWas.length) { fail(where + ': a replacement block must keep the original point count'); continue; }
      if (JSON.stringify(spec.epBlock) === JSON.stringify(spec.epWas)) { fail(where + ': the block replacement is a no-op'); continue; }
      s.points = spec.epBlock.slice();
      stat.epBlocks.push(spec.q);
    } else {
      for (const [n, text] of (spec.epEdits || [])) {
        if (!(n >= 1 && n <= s.points.length)) { fail(where + ': educational point ' + n + ' is out of range'); bad = true; break; }
        if (s.points[n - 1] === text) { fail(where + ': educational point ' + n + ' replacement is a no-op'); bad = true; break; }
        s.points[n - 1] = text;
        stat.epPoints.push(spec.q + '.' + n);
      }
      if (bad) continue;
    }
    if (spec.bl !== undefined) {
      if (spec.blWas === undefined) { fail(where + ': a Bottom Line replacement needs an exact anchor'); continue; }
      if (s.bl !== spec.blWas) { fail(where + ': the Bottom Line is not the reconfirmed text'); continue; }
      if (s.bl === spec.bl) { fail(where + ': the Bottom Line replacement is a no-op'); continue; }
      s.bl = spec.bl;
      stat.bls.push(spec.q);
    } else if (spec.blWas !== undefined) { fail(where + ': blWas without a replacement'); continue; }
  }

  /* ---- keyed heading ---- */
  if (s.keyed !== r.options[r.correct]) {
    const renamedKeyed = (spec.options || []).some(o => o[0] === L[r.correct]);
    if (!renamedKeyed) { fail(where + ': its keyed heading does not reproduce its option, and the option was not renamed'); continue; }
    s.keyed = r.options[r.correct];
    stat.keyedResynced.push(spec.q);
  }

  /* ---- rebuild the feedback block with synchronized lettered headings ---- */
  s.fbBlock = paraFb(r, bodies);
  stat.headingsSynced += 3;

  r.explanation = join(s);
  const post = JSON.stringify({ q: r.question, o: r.options, e: r.explanation, c: r.correct });
  if (post !== pre) stat.changed.push(spec.q);
  else fail(where + ': the spec produced no change');
}

/* ---------- block-wide invariants ---------- */
const QS = Object.keys(MAP);
if (SPECS.length !== 41) fail('loaded ' + SPECS.length + ' specs, expected 41');
if (new Set(SPECS.map(s => s.q)).size !== 41) fail('the specs do not cover 41 distinct displays');

let tables = 0, kcCount = 0, blCount = 0, epBlockCount = 0, epCount = 0, fbTotal = 0, lettered = 0;
const perItemPoints = [], headBad = [];
for (const Q of QS) {
  const r = find(MAP[Q]), e = r.explanation, b = findBefore(MAP[Q]), band = bandOf(Q);
  tables += (e.match(/<table/g) || []).length;
  kcCount += (e.match(/<p class='exp-key'>Key Concept: /g) || []).length;
  blCount += (e.match(/<p class='exp-key'>Bottom Line: /g) || []).length;
  epBlockCount += (e.match(/<h4>Key Educational Points:<\/h4>/g) || []).length;
  if (band !== 1) {
    const s = split(e, band);
    if (!s) { fail(Q + ': the edited explanation no longer parses'); continue; }
    if (band === 2) { perItemPoints.push(s.points.length); epCount += s.points.length; }
  }
  const parts = [...e.matchAll(/<strong>([ABCD])\. ([\s\S]*?):<\/strong>/g)];
  fbTotal += parts.length;
  if (parts.length !== 3) fail(Q + ': ' + parts.length + ' lettered feedback headings');
  if (new Set(parts.map(m => m[1])).size !== 3) fail(Q + ': duplicate feedback letters');
  for (const m of parts) {
    if (m[1] === L[r.correct]) fail(Q + ': a feedback heading for the keyed letter');
    if (band !== 1 && m[2] !== r.options[L.indexOf(m[1])]) headBad.push(Q + ' ' + m[1]);
  }
  const kh = (e.match(/^<h4[^>]*>Correct Answer: ([\s\S]*?)<\/h4>/) || [])[1];
  if (/^[ABCD][.)] /.test(kh)) lettered++;
  if (kh !== r.options[r.correct]) headBad.push(Q + ' keyed');
  if ((e.match(/Why the other/gi) || []).length !== 1) fail(Q + ': feedback section heading count is not 1');
  if (/<p><p>|<\/p><\/p>/.test(e)) fail(Q + ': doubled paragraph tags');
  for (const t of ['p', 'h4', 'ul', 'ol', 'li', 'strong', 'em', 'table', 'tr', 'td', 'th', 'div', 'sub', 'sup']) {
    const o = (e.match(new RegExp('<' + t + '[ >]', 'g')) || []).length;
    const c = (e.match(new RegExp('</' + t + '>', 'g')) || []).length;
    if (o !== c) fail(Q + ': unbalanced <' + t + '> ' + o + '/' + c);
  }
  const all = r.question + r.options.join('') + e;
  if (/—/.test(all)) fail(Q + ': em dash');
  if (/�/.test(all)) fail(Q + ': replacement character');
  if (r.correct !== b.correct) fail(Q + ': an answer letter moved');
  if (r.id !== b.id || r.topic !== b.topic || r.subject !== b.subject) fail(Q + ': id, topic or subject moved');
}
const P = IDMAP.presentation;
if (tables !== P.tables) fail('tables ' + tables + ', expected ' + P.tables);
if (kcCount !== P.key_concepts) fail('Key Concepts ' + kcCount);
if (blCount !== P.bottom_lines) fail('Bottom Lines ' + blCount);
if (epBlockCount !== P.educational_point_blocks) fail('educational-point blocks ' + epBlockCount);
if (epCount !== P.educational_points) fail('educational points ' + epCount);
if (JSON.stringify(perItemPoints) !== JSON.stringify(P.educational_points_per_item)) fail('points per item: ' + perItemPoints.join(','));
if (fbTotal !== P.distractor_bodies_after) fail('distractor bodies ' + fbTotal);
if (lettered !== 0) fail(lettered + ' keyed headings are lettered, expected 0');
if (headBad.length) fail('headings not matching their option: ' + headBad.join(', '));

const inv = IDMAP.scope;
const same = (a, b, label) => { if (JSON.stringify(a) !== JSON.stringify(b)) fail(label + ': ' + a.length + ' -> ' + a.join(',')); };
same(stat.stems, inv.stem_changes, 'stems');
same(stat.heads, inv.main_block_changes, 'main blocks');
same(stat.headEdits, inv.scoped_main_edits, 'scoped main edits');
same(stat.kcs, inv.key_concept_changes, 'Key Concepts');
same(stat.bls, inv.bottom_line_changes, 'Bottom Lines');
same(stat.epBlocks, inv.educational_point_block_changes, 'educational-point blocks');
same(stat.epPoints, inv.educational_point_changes, 'educational points');
same(stat.opts, Object.keys(inv.option_text_changes), 'option texts');
same(stat.fbReplaced.slice().sort(), inv.distractor_bodies_replaced.slice().sort(), 'replaced bodies');
same(stat.keptItems, inv.keep_items, 'KEEP items');
for (const slot of Object.keys(inv.option_text_changes)) {
  const [Q, letter] = slot.split(' ');
  if (find(MAP[Q]).options[L.indexOf(letter)] !== inv.option_text_changes[slot]) fail(slot + ': stored option is not the replacement');
}
if (stat.fbKept.length !== inv.distractor_bodies_retained_in_edited_items) fail('retained bodies ' + stat.fbKept.length);
if (stat.fbAdded.length !== inv.distractor_bodies_added) fail('added bodies ' + stat.fbAdded.length);
if (stat.fbReplaced.length + stat.fbKept.length + stat.fbAdded.length + 3 !== 123) fail('the bodies do not account for 123');
if (stat.changed.length !== 40) fail(stat.changed.length + ' items changed, expected 40');
if (stat.headingsSynced !== 40 * 3) fail('synchronized headings ' + stat.headingsSynced);

/* Q1 is byte-identical */
for (const Q of inv.keep_items) {
  if (JSON.stringify(find(MAP[Q])) !== JSON.stringify(findBefore(MAP[Q]))) fail(Q + ': the KEEP item changed');
}
/* retained bodies are stored verbatim under their synchronized heading */
for (const Q of QS) {
  if (bandOf(Q) !== 2) continue;
  const spec = SPECS.find(x => x.q === Q), r = find(MAP[Q]);
  for (const letter of spec.fbKeep) {
    const body = spec.existingFb.find(x => x[0] === letter)[2];
    if (r.explanation.indexOf('<strong>' + letter + '. ' + r.options[L.indexOf(letter)] + ':</strong>' + body) < 0)
      fail(Q + ' ' + letter + ': the retained body is not stored verbatim');
  }
}
/* fields outside the declared scope did not move */
for (const Q of QS) {
  const band = bandOf(Q);
  if (band === 1) continue;
  const a = split(findBefore(MAP[Q]).explanation, band), b = split(find(MAP[Q]).explanation, band);
  if (inv.stem_changes.indexOf(Q) < 0 && findBefore(MAP[Q]).question !== find(MAP[Q]).question) fail(Q + ': a retained stem changed');
  if (inv.main_block_changes.indexOf(Q) < 0 && !inv.scoped_main_edits.some(x => x.split('.')[0] === Q) && a.head !== b.head) fail(Q + ': a retained main explanation changed');
  if (band === 3 && inv.key_concept_changes.indexOf(Q) < 0 && a.kc !== b.kc) fail(Q + ': a retained Key Concept changed');
  if (band === 2) {
    if (inv.bottom_line_changes.indexOf(Q) < 0 && a.bl !== b.bl) fail(Q + ': a retained Bottom Line changed');
    if (a.points.length !== b.points.length) fail(Q + ': its educational-point count changed');
    for (let i = 0; i < a.points.length; i++) {
      const named = inv.educational_point_block_changes.indexOf(Q) >= 0 ||
        inv.educational_point_changes.indexOf(Q + '.' + (i + 1)) >= 0;
      if (!named && a.points[i] !== b.points[i]) fail(Q + ': educational point ' + (i + 1) + ' changed without being named');
    }
  }
}
/* nothing outside the block */
const PACK = new Set(Object.values(MAP));
if (data.physics.length !== 280) fail('physics bank size moved');
if (PACK.size !== 41) fail('the map does not hold 41 distinct ids');
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
console.log('41/41 displays processed, 40 edited and 1 kept byte-identical' + list(stat.keptItems));
console.log('  stems replaced          : ' + stat.stems.length);
console.log('  main blocks replaced    : ' + stat.heads.length + '; scoped main edits: ' + stat.headEdits.length + list(stat.headEdits));
console.log('  Key Concepts            : ' + stat.kcs.length + ' replaced of 31');
console.log('  educational points      : ' + stat.epBlocks.length + ' whole blocks' + list(stat.epBlocks) + ', ' + stat.epPoints.length + ' individual points');
console.log('  Bottom Lines            : ' + stat.bls.length + ' replaced of 10');
console.log('  option texts            : ' + stat.opts.length + list(stat.opts));
console.log('  keyed headings          : ' + stat.keyedResynced.length + ' re-synchronized' + list(stat.keyedResynced) + '; answer letters moved: 0');
console.log('  distractor bodies       : ' + stat.fbAdded.length + ' added, ' + stat.fbReplaced.length + ' replaced, ' +
  stat.fbKept.length + ' retained in edited items, 3 more in Q1 = ' + fbTotal + ' in all');
console.log('  feedback headings synced: ' + stat.headingsSynced + ' across the 40 edited items');
console.log('  block: ' + tables + ' tables, ' + kcCount + ' Key Concepts, ' + epBlockCount + ' point blocks holding ' + epCount +
  ' points, ' + blCount + ' Bottom Lines, ' + fbTotal + ' distractor bodies, all keyed headings unlettered');
