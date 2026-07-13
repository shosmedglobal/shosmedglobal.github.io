// Extract examQuestions array from practice-exam.html and emit JSON.
// One-time script used when refactoring the mock exam to per-year JSON files.
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const src = fs.readFileSync(path.join(ROOT, 'practice-exam.html'), 'utf8');
const marker = 'const examQuestions = [';
const start = src.indexOf(marker);
if (start < 0) { console.error('marker not found'); process.exit(1); }
let i = src.indexOf('[', start), depth = 0, inStr = null, esc = false, end = -1;
for (; i < src.length; i++) {
  const c = src[i];
  if (inStr) {
    if (esc) { esc = false; continue; }
    if (c === '\\') { esc = true; continue; }
    if (c === inStr) inStr = null;
  } else {
    if (c === "'" || c === '"' || c === '`') inStr = c;
    else if (c === '[' || c === '{') depth++;
    else if (c === ']' || c === '}') { depth--; if (depth === 0 && c === ']') { end = i; break; } }
  }
}
const arrSrc = src.slice(src.indexOf('[', start), end + 1);
const examQuestions = eval(arrSrc);
const out = path.join(ROOT, 'data/mock-exams/mock-exam-2025.json');
fs.writeFileSync(out, JSON.stringify(examQuestions, null, 2) + '\n');
console.log('Extracted', examQuestions.length, 'questions to', out);
