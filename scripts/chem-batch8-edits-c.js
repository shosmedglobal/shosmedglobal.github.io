/* Chemistry batch 8 edit specs, display Q21-Q30. */
'use strict';
module.exports = [
  { q: 'Q21', id: 'chem-438', key: 'C',
    stemWas: 'The Statue of Liberty has a characteristic green color due to the patina on its copper surface. Which compound is primarily responsible for this green patina?',
    stem: "Which type of compound is a major component of the Statue of Liberty's green copper patina?",
    options: [[2, 'Basic copper(II) carbonate (Cu₂(OH)₂CO₃)', 'Basic copper(II) sulfates, including brochantite']],
    headWas: '<p>When copper is exposed to the atmosphere over long periods, it undergoes a series of oxidation reactions. Initially, a thin layer of Cu₂O (reddish-brown) forms, followed by CuO (black). Over years, reaction with moisture, CO₂, and sulfur compounds in the air produces the green patina, which is primarily <strong>basic copper(II) carbonate</strong> - the same mineral as malachite. In coastal or industrial areas, basic copper(II) sulfate and chloride also contribute.</p>',
    head: "<p>Analyses of the Statue of Liberty's patina have identified basic copper(II) sulfates, especially brochantite, Cu₄SO₄(OH)₆. These sparingly soluble corrosion products form an adherent green layer. Other corrosion products can also occur, and patina composition depends on the environment. Basic copper carbonate is the mineral malachite, but it should not be taught as the main constituent of this monument's patina.</p>",
    fb: {
      A: ' Cu₂O is a reddish-brown copper oxide that can occur beneath a developed patina. It is not the basic copper sulfate responsible for the green coating described here.',
      B: ' CuSO₄·5H₂O is the familiar blue, water-soluble copper sulfate. The green basic copper sulfates in the patina contain hydroxide as well as sulfate and are much less soluble. These are different compounds.',
      D: ' CuCl₂ is a soluble copper chloride, not the basic copper sulfate named in the correct answer. Some environments also produce basic copper chlorides, but these are not the same compound as CuCl₂.'
    },
    bl: "The Statue of Liberty's green patina contains basic copper sulfates, notably brochantite. Copper patinas vary with environmental conditions; they are not universally basic copper carbonate." },

  { q: 'Q22', id: 'chem-439', key: 'B',
    stemWas: 'Aluminum is described as an amphoteric metal because its oxide reacts with both acids and bases. What is the product when Al₂O₃ reacts with excess NaOH solution?',
    stem: 'Aluminum oxide is amphoteric. When it dissolves in hot, excess aqueous NaOH, which dissolved product forms?',
    options: [[1, 'NaAlO₂ (sodium aluminate) and H₂O', 'Na[Al(OH)₄] in solution (sodium tetrahydroxoaluminate)']],
    headWas: '<p>The reaction of aluminum oxide with sodium hydroxide demonstrates its amphoteric character:</p><p><strong>Al₂O₃(s) + 2NaOH(aq) → 2NaAlO₂(aq) + H₂O(l)</strong></p><p>Aluminum oxide acts as an acidic oxide here, reacting with the base NaOH to form sodium aluminate. With acids, Al₂O₃ acts as a basic oxide: Al₂O₃ + 6HCl → 2AlCl₃ + 3H₂O. This dual behavior defines amphoterism.</p>',
    head: '<p>Aluminum oxide reacts with both acids and bases. In hot aqueous NaOH, dissolved aluminum can be represented as the tetrahydroxoaluminate ion, [Al(OH)₄]⁻:</p><p><strong>Al₂O₃(s) + 2NaOH(aq) + 3H₂O(l) → 2Na[Al(OH)₄](aq)</strong></p><p>The sodium ions are spectators. In acid, the oxide instead consumes H⁺ to form an aluminum salt and water, for example Al₂O₃ + 6HCl → 2AlCl₃ + 3H₂O. This ability to react with either acids or bases is amphoterism.</p>',
    fb: {
      A: ' Na₂O does not persist in aqueous solution because it reacts with water. Al(OH)₃ can form under other conditions, but excess hydroxide dissolves it as [Al(OH)₄]⁻. The aqueous complex should not be described as simply losing water to become a free AlO₂⁻ ion in the solution.'
    },
    bl: 'Amphoteric oxides and hydroxides react with both acids and bases. In excess aqueous hydroxide, aluminum forms [Al(OH)₄]⁻. The Bayer process uses hot NaOH to dissolve aluminum-bearing minerals from bauxite.' },

  { q: 'Q23', id: 'chem-440', key: 'A',
    fb: {
      B: ' This choice introduces sodium, which is absent from the stated reactants. Zinc hydroxide can dissolve in excess aqueous NaOH to form [Zn(OH)₄]²⁻, but the reagent here is HCl. With HCl, it forms ZnCl₂ and water.'
    } },

  { q: 'Q24', id: 'chem-441', key: 'D',
    stemWas: 'Which of the following correctly ranks the halogens in order of DECREASING oxidizing power?',
    stem: 'Based on standard reduction potentials for X₂/X⁻ couples with aqueous halide ions, which order shows decreasing oxidizing power?',
    headWas: '<p>Oxidizing power of halogens decreases going down Group 17. Fluorine is the strongest oxidizing agent of all elements (E° = +2.87 V for F₂/F⁻). This trend exists because:</p><ul><li>Smaller atomic radius means greater attraction for incoming electrons</li><li>Higher electronegativity (F = 4.0, Cl = 3.0, Br = 2.8, I = 2.5)</li><li>A more positive standard reduction potential</li></ul><p>A practical consequence: a higher halogen can displace a lower halogen from its salts. For example, Cl₂ + 2KBr → 2KCl + Br₂.</p>',
    head: '<p>The order is F₂ > Cl₂ > Br₂ > I₂. A more positive standard reduction potential indicates a greater tendency for X₂ to gain electrons and form X⁻ under standard conditions. The overall change depends on factors including the X–X bond and stabilization of the resulting ions by water, not electronegativity alone. For example, chlorine oxidizes bromide to bromine: Cl₂ + 2Br⁻ → 2Cl⁻ + Br₂. Fluorine also reacts vigorously with water, so it is not used as an ordinary aqueous halogen-displacement reagent.</p>',
    fb: {
      A: ' This reverses the standard-potential order. Among the four halogens listed, F₂ is the strongest oxidant and I₂ the weakest under the specified comparison.',
      B: ' This places iodine above bromine and chlorine. Their standard reduction potentials instead give Cl₂ > Br₂ > I₂ after fluorine.',
      C: ' Fluorine, not chlorine, has the more positive standard reduction potential. The comparison concerns the overall conversion of X₂ to hydrated X⁻, rather than any single atomic property.'
    },
    bl: 'Under the stated standard-potential comparison, halogen oxidizing strength decreases F₂ > Cl₂ > Br₂ > I₂. Ordinary aqueous displacement examples use chlorine, bromine and iodine; fluorine also attacks water.' },

  { q: 'Q25', id: 'chem-442', key: 'A', keep: true },

  { q: 'Q26', id: 'chem-443', key: 'D',
    headWas: '<p>Carbon monoxide binds to the Fe²⁺ in hemoglobin with an affinity approximately <strong>200-250 times greater</strong> than oxygen. The resulting carboxyhemoglobin (HbCO) cannot carry oxygen, and the binding is nearly irreversible under normal conditions. Even 0.1% CO in air can be lethal because it rapidly saturates hemoglobin.</p><p>Additionally, CO binding to one subunit of hemoglobin shifts the remaining subunits to a high-affinity state (left-shifting the oxygen-hemoglobin dissociation curve), making it harder for the remaining O₂ molecules to be released to tissues.</p>',
    head: "<p>Carbon monoxide binds hemoglobin with roughly 200-250 times the affinity of oxygen. CO occupies heme binding sites, reducing the capacity to carry oxygen. It also increases the oxygen affinity of remaining oxygen-binding sites, making oxygen harder to release to tissues.</p><p>Binding is reversible: after exposure stops, CO gradually leaves hemoglobin, and oxygen treatment accelerates its removal. Harm depends on concentration, duration of exposure and the person's condition; the affinity ratio alone does not predict a safe exposure.</p>",
    fb: {
      A: ' Twofold is far below the approximate 200-250-fold affinity difference. The question compares hemoglobin binding affinity, not a threshold for whether an exposure would be harmless.',
      B: " Tenfold also underestimates CO's affinity for hemoglobin. The much larger actual ratio helps explain why relatively low environmental CO concentrations can interfere with oxygen delivery.",
      C: ' The affinities are not approximately equal. CO binds far more strongly than oxygen, so the presence of oxygen in air does not prevent CO poisoning.'
    },
    bl: 'CO binds hemoglobin much more strongly than O₂ and impairs both oxygen carriage and unloading. The binding is reversible. Supplemental oxygen speeds CO removal; hyperbaric oxygen is considered in selected cases.' },

  { q: 'Q27', id: 'chem-444', key: 'D',
    headWas: "<p>This enzyme is <strong>alanine aminotransferase (ALT)</strong>, also known as alanine transaminase. It transfers an amino group from one molecule (alanine) to another (α-ketoglutarate). All enzymes that transfer functional groups between molecules belong to <strong>EC class 2 (Transferases)</strong>.</p><table class='exp-table'><tr><th>EC Class</th><th>Name</th><th>Reaction Type</th></tr><tr><td>EC 1</td><td>Oxidoreductases</td><td>Electron/H transfer (redox)</td></tr><tr><td>EC 2</td><td>Transferases</td><td>Group transfer</td></tr><tr><td>EC 3</td><td>Hydrolases</td><td>Hydrolysis (bond cleavage by water)</td></tr><tr><td>EC 4</td><td>Lyases</td><td>Non-hydrolytic bond cleavage/formation</td></tr><tr><td>EC 5</td><td>Isomerases</td><td>Structural rearrangement</td></tr><tr><td>EC 6</td><td>Ligases</td><td>Bond formation coupled to ATP hydrolysis</td></tr></table>",
    head: "<p>Alanine aminotransferase (ALT) transfers an amino group from alanine to α-ketoglutarate, forming pyruvate and glutamate. Aminotransferases are transferases, EC class 2. Classification is based on the overall reaction, which is amino-group transfer rather than hydrolysis or a net redox reaction.</p><table class='exp-table'><tr><th>EC Class</th><th>Name</th><th>Reaction Type</th></tr><tr><td>EC 1</td><td>Oxidoreductases</td><td>Oxidation-reduction reactions</td></tr><tr><td>EC 2</td><td>Transferases</td><td>Transfer of functional groups</td></tr><tr><td>EC 3</td><td>Hydrolases</td><td>Bond cleavage with water consumed in the overall reaction</td></tr><tr><td>EC 4</td><td>Lyases</td><td>Non-hydrolytic, non-redox cleavage, or addition to a double bond</td></tr><tr><td>EC 5</td><td>Isomerases</td><td>Intramolecular rearrangements</td></tr><tr><td>EC 6</td><td>Ligases</td><td>Bond formation coupled to nucleoside-triphosphate cleavage, often ATP</td></tr><tr><td>EC 7</td><td>Translocases</td><td>Movement of ions or molecules across or within membranes</td></tr></table>",
    fb: {
      C: ' Hydrolases use water as a reactant in the overall bond-cleavage reaction. In the net ALT reaction, an amino group moves between alanine and α-ketoglutarate; there is no net consumption of water. ALT is therefore classified by its amino-group transfer.'
    },
    bl: 'Aminotransferases are EC 2 transferases. ALT transfers an amino group from alanine to α-ketoglutarate. Increased serum ALT can indicate hepatocellular injury, but it is not by itself a diagnosis of a particular disease.' },

  { q: 'Q28', id: 'chem-445', key: 'B',
    stemWas: 'Pepsin is a digestive enzyme secreted by chief cells in the stomach. What is its substrate specificity and optimal pH?',
    stem: 'Pepsin is formed from pepsinogen secreted by gastric chief cells. Which option best describes its substrate preference and approximate optimal pH?',
    headEdits: [['and activated by HCl secreted by parietal cells.',
                 'and activated by HCl secreted by parietal cells; active pepsin also helps activate more pepsinogen.']],
    fb: {
      C: " Pancreatic lipase hydrolyzes ester bonds in triacylglycerols and works in the small intestine. Bile salts help disperse dietary fat, while colipase supports pancreatic lipase action at the lipid-water interface in the presence of bile salts. These roles should not be confused with pepsin's cleavage of peptide bonds in the stomach.",
      D: ' DNases and RNases cleave nucleic acids rather than proteins. Their preferred pH varies with the enzyme. The decisive distinction here is the substrate and bond type, not a claim that no nuclease can work near pH 5.'
    } },

  { q: 'Q29', id: 'chem-446', key: 'B',
    stemWas: 'Which coenzyme is required by all aminotransferase (transaminase) enzymes?',
    stem: 'Which coenzyme is required by aminotransferases such as alanine aminotransferase (ALT) and aspartate aminotransferase (AST)?',
    headEdits: [['Pyridoxal phosphate (PLP) is the essential coenzyme for <strong>all aminotransferases</strong> as well as many other enzymes of amino acid metabolism (decarboxylases, racemases, dehydratases).',
                 'Pyridoxal phosphate (PLP), derived from vitamin B₆, is the coenzyme used by aminotransferases and many other enzymes involved in amino acid metabolism.']],
    bl: 'PLP is the vitamin B₆-derived coenzyme used in transamination. It also supports several other amino acid reactions, but it is not a universal coenzyme for every pathway of amino acid metabolism.' },

  { q: 'Q30', id: 'chem-447', key: 'A',
    headEdits: [['<p>Aldolase cleaves a carbon-carbon bond <strong>without hydrolysis and without oxidation-reduction</strong>. It performs an aldol cleavage (the reverse of an aldol condensation). Enzymes that catalyze bond cleavage by mechanisms other than hydrolysis or oxidation belong to <strong>EC class 4 - Lyases</strong>.</p>',
                 '<p>Fructose-bisphosphate aldolase cleaves a carbon-carbon bond in fructose-1,6-bisphosphate to produce DHAP and glyceraldehyde-3-phosphate. The net reaction consumes no water and is not a redox reaction, so aldolase is a lyase, EC 4.1.2.13. The reverse is an aldol addition; no dehydration step is part of this net reaction.</p>']],
    fb: {
      B: " Hydrolases consume water in the overall reaction that cleaves a bond. Aldolase's net reaction splits fructose-1,6-bisphosphate into two three-carbon products without consuming water, so it is not classified as a hydrolase."
    },
    bl: 'Aldolase is a lyase: it catalyzes non-hydrolytic C-C cleavage and the reverse addition reaction. Fumarase and carbonic anhydrase are other lyases. Citrate synthase is a transferase, not a lyase.' }
];
