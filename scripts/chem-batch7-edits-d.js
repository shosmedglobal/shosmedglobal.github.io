/* Chemistry batch 7, display Q31-Q40 (chem-392 .. chem-401). */
'use strict';
module.exports = [

{ q: 'Q31', id: 'chem-392', key: 'B',
  stemWas: 'Beta-oxidation of fatty acids occurs in which cellular compartment?',
  stem: 'In human cells, the main pathway for energy-yielding β-oxidation of ordinary long-chain fatty acids is associated with which compartment?',
  main: 'Mitochondrial β-oxidation breaks down fatty acyl-CoA chains through repeated reactions associated with the matrix and the matrix-facing side of the inner membrane. Long-chain acyl groups enter through the carnitine shuttle; fatty acyl-CoA itself does not cross the inner membrane directly. Oxidation generates acetyl-CoA, NADH and electrons transferred through enzyme-bound FAD. Peroxisomes also carry out β-oxidation, especially the initial shortening of very-long-chain fatty acids.',
  fb: {
    A: 'In human cells, the main pathway for fatty acid synthesis is cytosolic, whereas the mitochondrial β-oxidation pathway is associated with the matrix. Peroxisomes provide an additional site of fatty acid breakdown.',
    C: 'The endoplasmic reticulum participates in lipid synthesis and in a different pathway called ω-oxidation. It is not the site of the mitochondrial β-oxidation pathway asked about here.'
  },
  bl: 'For saturated palmitate (C16), 7 β-oxidation cycles yield 8 acetyl-CoA, 7 NADH and 7 FAD-linked reductions. The last C4 intermediate splits into two acetyl-CoA. Standard accounting gives about 106 ATP equivalents after the activation cost of 2 ATP equivalents; the yield is an estimate.',
  keep: ['The nucleus contains genetic material and is the site of DNA replication and transcription'],
  gone: ['as CoA derivatives cannot pass directly',
         'Each cycle of β-oxidation removes 2 carbons (as acetyl-CoA) and produces 1 NADH + 1 FADH₂',
         'detoxification, and steroid production, not fatty acid oxidation'] },

{ q: 'Q32', id: 'chem-393', key: 'B',
  stemWas: 'Many enzymes require a non-protein helper molecule to function. A tightly bound, non-protein organic molecule that assists enzyme catalysis is called a:',
  stem: "In traditional enzyme terminology, a tightly bound, non-protein organic component required for an enzyme's activity is called a:",
  main: "Some enzymes require a non-protein component for activity. Such components can be organic molecules or inorganic ions. A tightly associated component is traditionally called a prosthetic group; FAD bound to succinate dehydrogenase is an example. 'Coenzyme' is an older term for organic helpers in enzyme reactions and does not provide a universal rule about how tightly every molecule binds. The protein component of a cofactor-dependent enzyme is the apoenzyme; its active form with the required component is the holoenzyme.",
  table: "<table class='exp-table'><tr><th>Term</th><th>Definition</th><th>Example</th></tr>" +
         '<tr><td>Apoenzyme</td><td>Protein component without its required non-protein component</td><td>Apoenzyme of a cofactor-dependent enzyme</td></tr>' +
         '<tr><td>Cofactor</td><td>Non-protein component required for catalysis; may be organic or inorganic</td><td>Enzyme-bound FAD, Mg²⁺</td></tr>' +
         '<tr><td><strong>Prosthetic group</strong></td><td>Traditional term for a tightly associated non-protein component</td><td>Heme in a peroxidase; FAD in succinate dehydrogenase</td></tr>' +
         '<tr><td>Coenzyme</td><td>Traditional term for an organic helper in enzyme reactions</td><td>NAD⁺, coenzyme A</td></tr>' +
         '<tr><td>Holoenzyme</td><td>Active enzyme with its required component</td><td>Apoenzyme plus its required cofactor</td></tr></table>',
  bl: 'For this traditional terminology question, the tightly bound helper is a prosthetic group. Cofactors can be organic or inorganic. Many vitamin-derived compounds participate in enzyme reactions, but their association with enzymes varies.',
  keep: ['The substrate is the molecule acted upon by the enzyme',
         'An inhibitor reduces or blocks enzyme activity'],
  gone: ['tightly and permanently bound to the enzyme',
         '<td>Non-protein helper (inorganic)</td>',
         '<td>Loosely bound organic molecule</td>',
         'Many B vitamins serve as coenzyme precursors'] },

{ q: 'Q33', id: 'chem-394', key: 'D',
  stemWas: 'What is the correct name for the compound FeCl₃?',
  stem: 'What is the Stock-system name for FeCl₃?',
  fb: {
    A: "'Iron chloride' does not state the oxidation state requested by the Stock system. FeCl₂ contains iron(II), while FeCl₃ contains iron(III)."
  },
  pointEdits: [[1, 'Stock notation uses Roman numerals in parentheses to indicate the charge of the metal cation',
                   "Stock notation uses a Roman numeral for oxidation state; for a simple monatomic ion, this equals its charge"]],
  bl: 'In Stock notation, FeCl₃ is iron(III) chloride: three chloride ions balance iron in oxidation state +3. Other naming systems also exist, so Stock notation should not be described as the only possible nomenclature.',
  keep: ['The total positive charge must equal the total negative charge in an ionic compound',
         'Older names use suffixes: -ous for the lower charge (ferrous = Fe²⁺)',
         'While "ferric" correctly refers to Fe³⁺'],
  gone: ['This name is ambiguous because it does not specify which oxidation state of iron is present.',
         'Transition metals with variable oxidation states require Stock notation'] },

{ q: 'Q34', id: 'chem-395', key: 'C',
  stemWas: 'What is the systematic name for HNO₃ when dissolved in water?',
  stem: 'What is the conventional oxyacid name for HNO₃(aq)?',
  options: [[1, 'Nitrious acid', 'Nitrous acid']],
  fb: {
    A: 'The conventional oxyacid name derived from nitrate is nitric acid. The hydro-...-ic pattern is used for familiar binary acids such as HCl(aq), not for naming HNO₃ in this oxyacid system.',
    B: 'Nitrous acid is HNO₂, associated with nitrite, NO₂⁻. HNO₃ is associated with nitrate, NO₃⁻, and is named nitric acid.',
    D: "'Hydrogen nitrate' describes the composition, but the stem asks for the conventional oxyacid name, nitric acid. The alternative compositional description is not restricted to the pure compound simply because it lacks the word 'acid'."
  },
  keep: ['Oxyacid naming: -ate ion → -ic acid; -ite ion → -ous acid',
         'HNO₃ is nitric acid - derived from the nitrate ion'],
  gone: ['Nitrious acid', 'This is a misspelling',
         'This form is used when referring to the pure compound, not the aqueous acid.'] },

{ q: 'Q35', id: 'chem-396', key: 'C',
  fb: {
    D: 'Ca₃PO₄ contains three Ca²⁺ ions but only one PO₄³⁻ ion, giving a net charge of +3. The neutral formula requires two whole phosphate ions: Ca₃(PO₄)₂. The 4 counts oxygen atoms inside each phosphate, while the outside 2 counts phosphate groups.'
  },
  pointEdits: [
    [1, 'Use the criss-cross method: the charge magnitude of one ion becomes the subscript of the other',
        'Balance ionic charges and use the simplest whole-number ratio of intact ions; reduce any common factor after criss-crossing charges'],
    [3, 'Calcium phosphate is a major component of bones and teeth (hydroxyapatite)',
        'The main mineral of bone and teeth is hydroxyapatite, Ca₁₀(PO₄)₆(OH)₂, a calcium phosphate mineral with a different formula from Ca₃(PO₄)₂']
  ],
  keep: ['Parentheses are required around polyatomic ions when the subscript is greater than 1',
         'This formula reverses the correct subscripts.',
         'Ionic compounds must be electrically neutral.'],
  gone: ['the subscript 4 would only apply to the last oxygen rather than the entire polyatomic ion',
         'Calcium phosphate is a major component of bones and teeth (hydroxyapatite)'] },

{ q: 'Q36', id: 'chem-397', key: 'D', frozen: true },

{ q: 'Q37', id: 'chem-398', key: 'C',
  stemWas: 'What is the correct name for the compound CuSO₄·5H₂O?',
  stem: 'What is the full Stock-system name, including the waters of crystallization, for CuSO₄·5H₂O?',
  fb: {
    A: "'Copper sulfate pentahydrate' is commonly understood, but it omits the oxidation-state numeral requested by the stem. Sulfate has charge −2, so copper is +2 in this formula and the full Stock-system name uses copper(II)."
  },
  keep: ['Hydrates are named using Greek prefixes: mono-, di-, tri-, tetra-, penta-, hexa-',
         'CuSO₄·5H₂O is a bright blue crystal'],
  gone: ['This name omits the Roman numeral. Since copper can be Cu⁺ or Cu²⁺'] },

{ q: 'Q38', id: 'chem-399', key: 'B',
  stemWas: 'Which of the following is the correct formula for tin(IV) oxide?',
  stem: 'What is the simplest whole-number formula for tin(IV) oxide?',
  fb: {
    C: 'Sn₂O₄ has the same 1:2 tin-to-oxygen ratio, but it is not reduced to the simplest formula requested. Dividing both subscripts by 2 gives SnO₂.'
  },
  pointEdits: [
    [1, "The Roman numeral in Stock notation directly tells you the metal's charge",
        "The Roman numeral in Stock notation gives the metal's oxidation state"],
    [2, 'Ionic formulas are always written as the lowest whole-number ratio of ions',
        'For simple ionic formulas, use the lowest whole-number ratio of intact ions; do not split a polyatomic ion to reduce its internal formula']
  ],
  keep: ['This is tin(II) oxide (stannous oxide)', 'Tin has two common oxidation states',
         'Tin(IV) oxide is SnO₂'],
  gone: ['While the ratio of charges would be correct (total +8 and −8)',
         'Ionic formulas are always written as the lowest whole-number ratio of ions'] },

{ q: 'Q39', id: 'chem-400', key: 'D',
  stemWas: 'What is the correct name for HBr(aq)?',
  stem: 'What is the conventional binary-acid name for HBr(aq)?',
  fb: {
    A: "'Hydrogen bromide' names HBr as a compound, and an aqueous sample can be described as a solution of hydrogen bromide. The conventional binary-acid name specifically requested here is hydrobromic acid."
  },
  keep: ['Binary acids (no oxygen): hydro- + root + -ic acid',
         'HBr(g) is hydrogen bromide; HBr(aq) is hydrobromic acid'],
  gone: ['This is the correct name for HBr as a pure gas, not in aqueous solution.'] },

{ q: 'Q40', id: 'chem-401', key: 'B',
  stemWas: 'Which compound is correctly paired with its name?',
  stem: 'Using the introductory ionic naming convention of cation name followed by the unchanged anion name, which pairing is correct?',
  fb: {
    D: "'Calcium dihydroxide' can be used as a compositional name, but the convention specified in this question gives calcium hydroxide. In that convention the ion charges determine the ratio, so a numerical prefix is not added to the anion name."
  },
  pointEdits: [
    [2, 'Ionic compounds do not use Greek prefixes - the subscript is determined by charge balance',
        'In the cation-name plus anion-name convention used here, charge balance supplies the subscripts; numerical prefixes are omitted'],
    [3, 'Mg(OH)₂ (milk of magnesia) is a common antacid and laxative',
        'A suspension of Mg(OH)₂ in water is called milk of magnesia and is used as an antacid and laxative']
  ],
  bl: 'Under the naming convention specified, Mg(OH)₂ is magnesium hydroxide. Other compositional naming methods can use numerical prefixes, so the rule should not be stated as a universal ban.',
  keep: ['Hydroxide (OH−) is a polyatomic ion named as one unit',
         'NaOH is sodium <em>hydroxide</em>, not sodium oxide',
         'KOH is correctly named potassium hydroxide'],
  gone: ['Greek prefixes (di-, tri-) are not used in ionic compound nomenclature.',
         'Ionic compounds do not use Greek prefixes',
         'Hydroxides are named as metal + hydroxide, with no Greek prefixes.'] }

];
