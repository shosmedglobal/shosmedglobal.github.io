#!/usr/bin/env node
// Strips `correct` and `explanation` from every question in
// data/mock-exams/mock-exam-YYYY.json so the public JSON no longer
// contains the answer key. The full data (with correct+explanation)
// lives at functions/exam-data/mock-exam-YYYY.json which is only
// readable by Cloud Functions running with admin privileges.
//
// Run:  node scripts/strip-mock-exams.js
//
// Re-run after editing any exam JSON so the client copy stays in sync
// with the server copy MINUS the sensitive fields.
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'data', 'mock-exams');
const PRIVATE_DIR = path.join(ROOT, 'functions', 'exam-data');
const YEARS = ['2022', '2023', '2024', '2025'];

function stripQuestion(q) {
  // Public shape: id, section, question, options. That's it.
  // NO `correct`, NO `explanation`, NO `topic` (topic can leak the
  // subject well enough for LLM-assisted cheating).
  return {
    id: q.id,
    section: q.section,
    question: q.question,
    options: q.options,
  };
}

let touched = 0;
for (const year of YEARS) {
  const priv = path.join(PRIVATE_DIR, `mock-exam-${year}.json`);
  const pub = path.join(PUBLIC_DIR, `mock-exam-${year}.json`);
  if (!fs.existsSync(priv)) {
    console.warn(`[strip] private file missing for ${year}: ${priv}`);
    continue;
  }
  const full = JSON.parse(fs.readFileSync(priv, 'utf8'));
  const stripped = full.map(stripQuestion);
  fs.writeFileSync(pub, JSON.stringify(stripped, null, 2) + '\n');
  console.log(`[strip] wrote ${pub} (${stripped.length} questions, no answer key)`);
  touched++;
}
console.log(`[strip] done — ${touched} files updated`);
