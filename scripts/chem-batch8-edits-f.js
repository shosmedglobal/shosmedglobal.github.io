/* Chemistry batch 8 edit specs, display Q51-Q60. Q59 and Q60 are REBUILT: both
   stored explanations are bare prose with no markup at all, so each gains one
   unlettered keyed heading and exactly three distractor paragraphs, and neither
   gains a point block, Bottom Line or table. */
'use strict';
module.exports = [
  { q: 'Q51', id: 'chem-468', key: 'B',
    options: [[1,
      'Urea is the primary waste from amino acid nitrogen; uric acid from purine degradation; creatinine from spontaneous cyclization of creatine phosphate in muscle',
      'Urea from amino acid nitrogen; uric acid from purine degradation; creatinine from creatine and phosphocreatine breakdown']],
    headWas: "<table class='exp-table'><tr><th>Parameter</th><th>Urea</th><th>Uric Acid</th><th>Creatinine</th></tr><tr><td>Source</td><td>Amino acid deamination (urea cycle)</td><td>Purine nucleotide degradation</td><td>Non-enzymatic cyclization of creatine/creatine-P</td></tr><tr><td>Site of production</td><td>Liver</td><td>Liver (mainly)</td><td>Muscle</td></tr><tr><td>Normal serum level</td><td>7-20 mg/dL (BUN: 7-20)</td><td>3.5-7.0 mg/dL</td><td>0.7-1.3 mg/dL</td></tr><tr><td>Clinical significance</td><td>Elevated in kidney failure, dehydration</td><td>Elevated in gout, tumor lysis</td><td>Gold standard for GFR estimation</td></tr></table>",
    head: "<table class='exp-table'><tr><th>Parameter</th><th>Urea</th><th>Uric acid / urate</th><th>Creatinine</th></tr><tr><td>Principal source</td><td>Disposal of nitrogen, principally from amino acid breakdown, via the urea cycle</td><td>Purine degradation</td><td>Spontaneous conversion of creatine and phosphocreatine</td></tr><tr><td>Main production sites</td><td>Liver</td><td>Liver and other tissues</td><td>Mainly skeletal muscle</td></tr><tr><td>Blood measurement</td><td>Urea concentration or its nitrogen component, reported as BUN</td><td>Serum urate, commonly reported as uric acid</td><td>Serum creatinine, used in estimating GFR</td></tr><tr><td>Clinical interpretation</td><td>Influenced by kidney function, hydration and protein metabolism</td><td>High levels increase gout risk; may rise with increased cell breakdown</td><td>Influenced by kidney function and muscle-related factors; not an exact GFR measurement</td></tr></table>",
    fb: {
      A: " These are not the correct principal source relationships. The liver's urea cycle disposes of nitrogen, principally from amino acid breakdown. Uric acid comes from purine degradation, while creatinine comes from creatine and phosphocreatine.",
      C: " Only urea is produced by the urea cycle. Purine degradation produces uric acid/urate, while creatinine forms spontaneously from the body's creatine and phosphocreatine pools. These are different processes.",
      D: " Urea is synthesized mainly in the liver and excreted by the kidneys. Creatinine is produced mainly in skeletal muscle, not only in the brain. Uric acid production also occurs in more than one tissue. The word 'only' makes these organ assignments incorrect."
    } },

  { q: 'Q52', id: 'chem-469', key: 'C',
    stemWas: 'When sodium acetate (CH3COONa) is dissolved in water, the resulting solution is:',
    stem: 'When sodium acetate (CH₃COONa) is dissolved in water at 25 °C, the resulting solution is:',
    headWas: "<p>Sodium acetate is the salt of a <strong>strong base (NaOH)</strong> and a <strong>weak acid (CH3COOH)</strong>. When dissolved in water, it dissociates completely into Na+ and CH3COO- ions. The <strong>acetate ion</strong> (conjugate base of the weak acid) undergoes hydrolysis:</p><p style='text-align:center'><strong>CH3COO- + H<sub>2</sub>O ⇌ CH3COOH + OH-</strong></p><p>This reaction produces hydroxide ions, making the solution <strong>alkaline (pH > 7)</strong>. The sodium ion, being the conjugate of a strong base, does not undergo hydrolysis.</p>",
    head: "<p>Sodium acetate dissociates into Na⁺ and CH₃COO⁻. Acetate is the conjugate base of the weak acid acetic acid and reacts with water:</p><p style='text-align:center'><strong>CH₃COO⁻ + H₂O ⇌ CH₃COOH + OH⁻</strong></p><p>The resulting excess of OH⁻ makes the solution basic, with pH above 7 at 25 °C. Hydrated Na⁺ has negligible acid-base effect in this example. Na⁺ is not the Brønsted conjugate acid of NaOH; conjugate acid-base partners differ by one proton.</p>",
    fb: {
      A: " Na⁺ is a spectator ion in this acid-base equilibrium. It is not the conjugate acid of NaOH: the conjugate acid of OH⁻ is H₂O. Acetate's reaction with water determines the basic character of the solution.",
      B: ' A strong electrolyte dissociates extensively, but that does not guarantee a neutral solution. Sodium acetate dissociates, and its acetate ions then react with water to form OH⁻. NaCl is a useful contrasting example with negligible ion hydrolysis.',
      D: " The equilibrium forms acetic acid and OH⁻ together. The presence of some acetic acid does not make the solution acidic; the excess hydroxide produced by acetate's reaction makes it basic."
    },
    points: [
      'Acetate is the conjugate base of acetic acid and accepts a proton from water.',
      'Na⁺ has negligible acid-base effect here; it is not the conjugate acid of NaOH.',
      'In water at 25 °C, sodium acetate is basic, NH₄Cl is acidic and NaCl is approximately neutral because their ions have different acid-base behavior.'
    ],
    bl: 'Sodium acetate forms a basic solution because acetate reacts with water to produce OH⁻. Determine which ions can donate or accept protons rather than assuming all strongly dissociated salts are neutral.' },

  { q: 'Q53', id: 'chem-470', key: 'B',
    stemWas: 'A 0.1 M solution of ammonium chloride (NH4Cl) is prepared. Given that the Kb of ammonia (NH3) is 1.8 x 10<sup>-5</sup>, what is the approximate pH of this solution?',
    stem: 'At 25 °C, estimate the pH of 0.10 M NH₄Cl using the dilute-solution concentration model. Given Kb(NH₃) = 1.8 × 10⁻⁵ and Kw = 1.0 × 10⁻¹⁴.',
    headEdits: [
      ['<p>2. Set up the equilibrium: Ka = [NH3][H<sub>3</sub>O+]/[NH4+] = x<sup>2</sup>/0.1</p>',
       '<p>2. Let x = [H₃O⁺] produced by NH₄⁺. Then Ka = x<sup>2</sup>/(0.10 - x) ≈ x<sup>2</sup>/0.10, provided x is small compared with 0.10 M.</p>'],
      ['<p>3. Solve for x: x = sqrt(5.56 x 10<sup>-10</sup> x 0.1) = sqrt(5.56 x 10<sup>-11</sup>) = 7.45 x 10<sup>-6</sup> M</p>',
       '<p>3. Solve for x: x = sqrt(5.56 x 10<sup>-10</sup> x 0.1) = sqrt(5.56 x 10<sup>-11</sup>) = 7.45 x 10<sup>-6</sup> M</p><p>The result x ≈ 7.45 x 10<sup>-6</sup> M is much smaller than 0.10 M, so the approximation is justified.</p>']
    ],
    fb: {
      A: ' A pH above 7 would describe a basic solution, whereas NH₄⁺ is a weak acid. The calculated pH is about 5.13; its corresponding pOH at 25 °C is about 8.87, not 9.13.',
      D: ' About 2.87 is the pOH obtained for 0.10 M NH₃ using Kb = 1.8 x 10<sup>-5</sup>. This question instead contains NH₄⁺, whose acid constant is Ka = Kw/Kb. Treating Kb as the acid constant gives the wrong calculation.'
    },
    pointEdits: [[2,
      'A useful shortcut: pH of a weak base salt ≈ 7 - (1/2)(pKb) - (1/2)(log C), where C is the salt concentration.',
      "For a dilute solution containing a weak acid BH⁺ at concentration C, pH ≈ ½(pKa - log C) when its ionization is small and water's contribution is negligible."]] },

  { q: 'Q54', id: 'chem-471', key: 'A',
    fb: {
      C: ' Neither sodium metal nor hydrogen peroxide is produced by the stated reaction. Hydride accepts a proton from water to form H₂, while sodium and hydroxide remain in the solution. Sodium metal would itself react with water rather than persist as this product.'
    },
    pointEdits: [
      [1, 'All ionic hydrides react vigorously with water to produce the metal hydroxide and H2 gas. This makes them useful as strong bases and drying agents in organic chemistry.',
          'Ionic hydrides react with water to produce hydrogen and the corresponding metal hydroxide. Their uses depend on the compound: NaH is a strong base, while CaH₂ is used to dry selected organic solvents.'],
      [3, 'NaH is widely used in organic synthesis as a base to deprotonate weakly acidic compounds (alcohols, amines).',
          'NaH is used in organic synthesis to deprotonate suitable compounds, such as alcohols, with hydrogen gas formed.']
    ] },

  { q: 'Q55', id: 'chem-472', key: 'C',
    headEdits: [['<p>Calcium carbide contains the <strong>carbide ion (C2<sup>2</sup>-)</strong>, which is the conjugate base of acetylene. The C2<sup>2</sup>- ion contains a carbon-carbon triple bond ([:C≡C:]<sup>2</sup>-). When it encounters water, it abstracts protons to form acetylene (H-C≡C-H).</p>',
                 '<p>Calcium carbide contains C₂²⁻, an acetylide ion with a carbon-carbon triple bond. It accepts two protons from water to form HC≡CH. The overall products are acetylene gas and calcium hydroxide.</p>']],
    fb: {
      B: ' Ethylene contains a carbon-carbon double bond. In calcium carbide hydrolysis, protonation of C₂²⁻ retains its triple bond and gives acetylene. Converting acetylene to ethylene would require a separate reduction, not this hydrolysis.'
    },
    fbEdits: [['A', 'methanide ion (C<sup>4</sup>-)', 'methanide ion (C⁴⁻)']],
    pointEdits: [[0,
      'Carbides are classified by their hydrolysis products: <strong>acetylides</strong> (CaC2, Na<sub>2</sub>C<sub>2</sub>) yield acetylene; <strong>methanides</strong> (Al<sub>4</sub>C<sub>3</sub>, Be<sub>2</sub>C) yield methane; <strong>interstitial carbides</strong> (WC, TiC) are extremely hard and chemically inert.',
      'Ionic carbides include acetylides such as CaC₂, which yield acetylene on hydrolysis, and methanides such as Al₄C₃, which yield methane. Carbides such as WC and TiC are hard, heat-resistant materials; chemical inertness is not a universal property of all carbides.']],
    blEdits: [['acetylide ion (C2<sup>2</sup>-)', 'acetylide ion (C₂²⁻)']] },

  { q: 'Q56', id: 'chem-473', key: 'C',
    stemWas: 'When the combustion reaction of propane is balanced: C<sub>3</sub>H<sub>8</sub> + O2 → CO2 + H<sub>2</sub>O, what is the coefficient of O2?',
    stem: 'When the complete combustion equation C₃H₈ + O₂ → CO₂ + H₂O is balanced using the smallest whole-number coefficients, what is the coefficient of O₂?',
    fb: {
      B: ' Four O₂ molecules supply eight oxygen atoms. After three CO₂ use six oxygen atoms, only two oxygen atoms remain, enough for two H₂O rather than the four required to account for all eight hydrogen atoms. Five O₂ are needed.'
    } },

  { q: 'Q57', id: 'chem-474', key: 'B', keep: true },

  { q: 'Q58', id: 'chem-475', key: 'C',
    stemWas: "Which noble gas is the most abundant in Earth's atmosphere?",
    stem: "Which noble gas is the most abundant in Earth's dry atmosphere?",
    headEdits: [["0.93% of Earth's atmosphere", "0.93% of Earth's dry atmosphere"]],
    bl: 'Argon makes up about 0.93% of dry air and is its most abundant noble gas and third most abundant gas overall. Atmospheric argon is predominantly ⁴⁰Ar, much of it accumulated from radioactive decay of ⁴⁰K.' },

  { q: 'Q59', id: 'chem-476', key: 'C',
    explanationWas: 'Amorphous solids lack the long-range ordered crystal lattice that defines crystalline solids. Glass is a supercooled liquid: its silicon–oxygen network is rigid but disordered, with no repeating unit cell. NaCl, diamond, and quartz are all crystalline—even though glass and quartz share the same SiO₂ chemistry, only quartz has a regular lattice.',
    rebuild: {
      keyed: 'Glass (silicate)',
      head: '<p>Glass is an amorphous solid: it has local atomic structure but lacks the long-range repeating lattice of a crystal. It is not a liquid at ordinary room temperature. Silicate glasses contain a disordered silicon-oxygen network and may contain other components; ordinary glass is not necessarily pure SiO₂. Fused silica is an example of amorphous SiO₂, whereas quartz is crystalline SiO₂.</p>',
      fb: [
        ['A', ' NaCl is crystalline. Its sodium and chloride ions occupy a regular, repeating three-dimensional arrangement.'],
        ['B', ' Diamond is a crystalline covalent network. Carbon atoms are bonded in a repeating three-dimensional structure, so it is not amorphous.'],
        ['D', ' Quartz has an ordered silicon-oxygen crystal structure. Even when an amorphous glass has the same SiO₂ composition, its atomic arrangement is different.']
      ]
    } },

  { q: 'Q60', id: 'chem-477', key: 'A',
    explanationWas: 'NaCl is held together by electrostatic attraction between Na⁺ and Cl⁻ ions arranged in a face-centered cubic lattice (each ion surrounded by 6 of the opposite charge). This defines an ionic crystal: high melting point (801 °C), brittle, and electrically insulating in the solid state but conductive when molten or dissolved (ions become mobile).',
    rebuild: {
      keyed: 'Ionic crystal',
      head: '<p>NaCl is an ionic crystal held together by electrostatic attraction between Na⁺ and Cl⁻ ions. In its rock-salt structure, each ion has six nearest neighbors of the opposite charge. The crystal is brittle and has a high melting point, about 801 °C. Solid NaCl does not conduct electricity well because its ions cannot move freely; molten NaCl and its aqueous solution conduct through mobile ions.</p>',
      fb: [
        ['B', ' A molecular crystal contains discrete molecules held together mainly by intermolecular forces. NaCl instead forms an extended lattice of ions, not separate NaCl molecules.'],
        ['C', ' Metallic bonding involves delocalized electrons shared through a metal structure. NaCl has oppositely charged ions and does not show the electron-based conductivity of a metal in its solid state.'],
        ['D', ' A covalent network solid, such as diamond, contains atoms linked by an extended network of covalent bonds. NaCl is classified as ionic because its lattice contains Na⁺ and Cl⁻ ions.']
      ]
    } }
];
