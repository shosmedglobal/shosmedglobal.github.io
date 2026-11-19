/* Chemistry batch 8 edit specs, display Q41-Q50. */
'use strict';
module.exports = [
  { q: 'Q41', id: 'chem-458', key: 'A',
    stemWas: "Given the following enthalpy data:\n\nC(s) + O₂(g) → CO₂(g), ΔH₁ = -393.5 kJ/mol\nH₂(g) + ½O₂(g) → H₂O(l), ΔH₂ = -285.8 kJ/mol\nCH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l), ΔH₃ = -890.4 kJ/mol\n\nUsing Hess's law, what is ΔH for the reaction: C(s) + 2H₂(g) → CH₄(g)?",
    stem: "At 25 °C and standard pressure (1 bar), the following reaction enthalpies are given:<br><br>C(s, graphite) + O₂(g) → CO₂(g), ΔH°₁ = -393.5 kJ<br>H₂(g) + ½O₂(g) → H₂O(l), ΔH°₂ = -285.8 kJ<br>CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l), ΔH°₃ = -890.4 kJ<br><br>Using Hess's law, what is the enthalpy change per mole of methane for C(s, graphite) + 2H₂(g) → CH₄(g)?",
    headEdits: [
      ['Target reaction: C(s) + 2H₂(g)', 'Target reaction: C(s, graphite) + 2H₂(g)'],
      ['<br>C(s) + O₂(g) → CO₂(g), ΔH₁', '<br>C(s, graphite) + O₂(g) → CO₂(g), ΔH₁'],
      ['<br>C(s) + O₂(g) + 2H₂(g)', '<br>C(s, graphite) + O₂(g) + 2H₂(g)'],
      ['Result: C(s) + 2H₂(g)', 'Result: C(s, graphite) + 2H₂(g)']
    ],
    fb: {
      B: ' +74.7 kJ/mol has the magnitude of the correct answer but the sign of the reverse target reaction, CH₄ → C(graphite) + 2H₂. Formation in the direction asked gives -74.7 kJ/mol.',
      C: ' This value does not follow from the combination needed to obtain the target reaction. Add reaction 1 to twice reaction 2 and subtract reaction 3: -393.5 - 571.6 + 890.4 = -74.7 kJ/mol.',
      D: ' The hydrogen-formation data must be used twice because the target consumes two H₂ molecules. Reaction 3 must then be reversed so that CH₄ is a product. This gives -393.5 + 2(-285.8) + 890.4, not -496.9 kJ/mol.'
    } },

  { q: 'Q42', id: 'chem-459', key: 'C',
    stemWas: 'What is the correct IUPAC name for the compound with the formula KMnO₄?',
    stem: 'What is the commonly used name of KMnO₄?',
    headEdits: [['<p>KMnO₄ is <strong>potassium permanganate</strong>. In this compound, manganese is in the +7 oxidation state (its highest common oxidation state). The prefix "per-" combined with the suffix "-ate" indicates the highest oxidation state of the central atom in the oxoanion (MnO₄⁻).</p>',
                 '<p>KMnO₄ is potassium permanganate. Potassium is K⁺, so its anion is MnO₄⁻. Taking oxygen as −2 gives manganese an oxidation state of +7. Manganate is MnO₄²⁻, with manganese at +6. These traditional ion names should be learned with their formulas; the per-/hypo- pattern is not a universal naming rule for every element.</p>']],
    fb: {
      A: ' The standard name for MnO₄⁻ in this compound is permanganate. The name in A does not identify that ion. Remember the relevant pair: MnO₄²⁻ is manganate and MnO₄⁻ is permanganate.',
      D: ' This phrase does not uniquely identify the compound or its oxoanion. Potassium permanganate specifically names K⁺ combined with MnO₄⁻.'
    },
    bl: 'KMnO₄ contains permanganate, MnO₄⁻, with Mn at +7. K₂MnO₄ contains manganate, MnO₄²⁻, with Mn at +6. Traditional oxoanion names must be tied to the correct formulas and charges.' },

  { q: 'Q43', id: 'chem-460', key: 'D',
    bl: 'To write an ionic formula, identify the ions and choose the smallest whole-number ratio that makes the total charge zero. If using criss-crossed charge magnitudes, reduce any common factor and use parentheses around repeated polyatomic ions.' },

  { q: 'Q44', id: 'chem-461', key: 'B', keep: true },

  { q: 'Q45', id: 'chem-462', key: 'C',
    bl: "Dicarboxylic acids by carbon number: oxalic (C₂), malonic (C₃), succinic (C₄), glutaric (C₅), adipic (C₆). Among these, succinate is a citric acid cycle intermediate. The mnemonic 'Oh My, Such Good Apples' recalls the series." },

  { q: 'Q46', id: 'chem-463', key: 'A',
    headWas: '<p>Hemoglobin contains four heme groups, each consisting of a protoporphyrin IX ring coordinating a central <strong>Fe²⁺ (ferrous iron)</strong> ion. The Fe²⁺ forms six coordination bonds: four to nitrogen atoms of the porphyrin ring, one to a proximal histidine of the globin chain, and the sixth to O₂ (when oxygenated) or remains empty (when deoxygenated).</p><p>Crucially, iron must stay in the Fe²⁺ state to bind O₂ reversibly. If iron is oxidized to Fe³⁺, the resulting <strong>methemoglobin</strong> cannot bind O₂ and is clinically non-functional.</p>',
    head: '<p>Each hemoglobin subunit contains a heme group with an iron ion coordinated by four nitrogens of protoporphyrin IX and a proximal histidine. Normal deoxyhemoglobin contains ferrous iron, Fe²⁺, with a site available for oxygen; oxygen binding supplies a sixth ligand.</p><p>Reversible oxygen binding is distinguished from formation of methemoglobin, in which the affected iron is ferric, Fe³⁺, and cannot bind oxygen normally.</p>',
    fb: {
      B: " Ferric iron in a heme group produces methemoglobin, and that heme cannot bind oxygen normally. Low amounts of methemoglobin occur normally and are reduced by cellular enzymes. A level just above 1% does not automatically cause cyanosis or tissue hypoxia; clinical effects depend on the amount and the person's condition.",
      C: ' Chlorophyll contains magnesium coordinated within a chlorin ring, which is related to but chemically distinct from a porphyrin. Hemoglobin uses an iron-containing heme group. The metal and the surrounding molecule both contribute to their different biological functions.'
    },
    bl: 'Normal oxygen-carrying hemoglobin uses ferrous heme iron. Persistent oxidation to ferric iron forms methemoglobin and prevents oxygen binding at the affected heme. Heme contains a porphyrin; chlorophyll contains a chlorin; vitamin B₁₂ contains a cobalt-bearing corrin.' },

  { q: 'Q47', id: 'chem-464', key: 'B',
    headWas: '<p>The steroid nucleus (also called the sterane skeleton or cyclopentanoperhydrophenanthrene) consists of <strong>17 carbon atoms</strong> arranged in four fused rings:</p><ul><li><strong>Ring A:</strong> 6-membered (cyclohexane)</li><li><strong>Ring B:</strong> 6-membered (cyclohexane)</li><li><strong>Ring C:</strong> 6-membered (cyclohexane)</li><li><strong>Ring D:</strong> 5-membered (cyclopentane)</li></ul><p>This rigid, planar ring system is the structural foundation for cholesterol, bile acids, steroid hormones (cortisol, aldosterone, testosterone, estradiol, progesterone), and vitamin D.</p>',
    head: '<p>The parent steroid nucleus contains 17 ring carbons arranged in four fused rings:</p><ul><li><strong>Ring A:</strong> six-membered</li><li><strong>Ring B:</strong> six-membered</li><li><strong>Ring C:</strong> six-membered</li><li><strong>Ring D:</strong> five-membered</li></ul><p>In the saturated parent, these are three cyclohexane rings and one cyclopentane ring. The three-dimensional ring system is relatively rigid but not planar. Cholesterol, many steroid hormones and bile acids contain this core with different substituents and degrees of unsaturation. Vitamin D is a steroid-derived secosteroid: one ring has opened.</p>',
    fb: {
      A: ' The parent steroid nucleus does not have four six-membered rings in a straight row. It has an angular fused arrangement with a five-membered D ring.',
      D: ' This gives the wrong ring-size pattern for the steroid nucleus. It has three six-membered rings and only one five-membered ring, not one six-membered ring and three five-membered rings.'
    },
    bl: 'The parent steroid nucleus has three six-membered rings and one five-membered ring. It is three-dimensional, not planar. Vitamin D is derived from a steroid but has an opened ring.' },

  { q: 'Q48', id: 'chem-465', key: 'C',
    stemWas: "Which vitamin's chemical name is ascorbic acid, and what is its primary biochemical function?",
    stem: 'Which option correctly identifies ascorbic acid and an important biochemical role of this vitamin?',
    headEdits: [['<p>Ascorbic acid is <strong>vitamin C</strong>. Its primary biochemical role is as a cofactor for <strong>prolyl hydroxylase and lysyl hydroxylase</strong>, enzymes that hydroxylate proline and lysine residues in collagen. These hydroxylated residues are essential for the stability of the collagen triple helix through hydrogen bonding.</p>',
                 '<p>Ascorbic acid is vitamin C. It supports the enzymes that hydroxylate proline and lysine residues during collagen maturation. Hydroxyproline helps stabilize the triple helix; hydroxylysine contributes to cross-link formation and can be modified by addition of sugars. Vitamin C also has antioxidant and other biosynthetic functions.</p>']],
    fb: {
      D: ' Vitamin E is a family of fat-soluble compounds that includes tocopherols and tocotrienols; α-tocopherol is an important human form. It protects membranes against lipid oxidation. Ascorbic acid is water-soluble vitamin C, not vitamin E, and can help regenerate oxidized vitamin E.'
    },
    bl: 'Vitamin C is ascorbic acid and is required for normal collagen maturation; deficiency causes scurvy. Some vitamin names represent families of compounds: cholecalciferol is vitamin D₃, phylloquinone is vitamin K₁, and α-tocopherol is one form of vitamin E.' },

  { q: 'Q49', id: 'chem-466', key: 'C', keep: true },

  { q: 'Q50', id: 'chem-467', key: 'B',
    stemWas: 'Gout is a clinical condition caused by the deposition of crystals in joints. Which metabolic end product accumulates in gout, and what is its biochemical origin?',
    stem: 'Which compound forms the characteristic crystals in gout, and from which metabolic pathway is it derived?',
    options: [[1, 'Uric acid (monosodium urate) crystals from purine degradation', 'Monosodium urate crystals from purine degradation']],
    headWas: '<p>Gout results from <strong>hyperuricemia</strong> - elevated blood uric acid levels (>6.8 mg/dL) leading to deposition of monosodium urate (MSU) crystals in joints and soft tissues. Uric acid is the final degradation product of <strong>purine nucleotides</strong> (adenine and guanine, from DNA/RNA turnover and dietary purines).</p><p>The pathway: Purines → Hypoxanthine → Xanthine → <strong>Uric acid</strong> (catalyzed by xanthine oxidase). Treatment includes allopurinol (xanthine oxidase inhibitor) and colchicine (anti-inflammatory).</p>',
    head: '<p>Gout is an inflammatory response to monosodium urate crystals deposited in joints or other tissues. Urate is the predominant ionized form of uric acid at physiological pH and is derived from purine breakdown.</p><p>Adenine-derived nucleotides can be degraded through hypoxanthine to xanthine; guanine is converted to xanthine by a different route. Xanthine is then converted to uric acid/urate. Sustained high urate levels increase the risk of crystals, but not everyone with hyperuricemia develops gout.</p>',
    fb: {
      A: ' Urea is a soluble waste product used to dispose of nitrogen, principally from amino acid metabolism. It is not the material forming the characteristic crystals in gout. Its physiological role and chemical identity differ from those of urate.',
      D: ' Calcium oxalate is a common component of kidney stones, and metabolism of vitamin C can contribute to oxalate production. It is a different compound from monosodium urate and is not the crystal that defines gout.'
    },
    bl: 'Gout involves monosodium urate crystals. Urate comes from purine degradation; high blood urate increases risk but does not by itself establish gout.' }
];
