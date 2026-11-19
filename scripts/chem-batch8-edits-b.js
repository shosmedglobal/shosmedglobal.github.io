/* Chemistry batch 8 edit specs, display Q11-Q20. */
'use strict';
module.exports = [
  { q: 'Q11', id: 'chem-428', key: 'D',
    pointEdits: [
      [0, 'E = entgegen (opposite sides) = generally corresponds to trans',
          'E means the higher-priority substituents are on opposite sides of the double bond; trans-2-butene is an example.'],
      [1, 'Z = zusammen (same side) = generally corresponds to cis',
          'Z means the higher-priority substituents are on the same side; cis-2-butene is an example. Cis/trans and E/Z are not universally interchangeable.']
    ] },

  { q: 'Q12', id: 'chem-429', key: 'B',
    stemWas: "Given the following data:\nC(s) + O₂(g) → CO₂(g), ΔH = −393 kJ/mol\nH₂(g) + ½O₂(g) → H₂O(l), ΔH = −286 kJ/mol\nCH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l), ΔH = −890 kJ/mol\n\nUsing Hess's law, what is the enthalpy of formation of methane (ΔH<sub>f</sub> for CH₄(g))?",
    stem: "At 25 °C and standard pressure (1 bar), the following rounded reaction enthalpies are given:<br>C(s, graphite) + O₂(g) → CO₂(g), ΔH° = −393 kJ<br>H₂(g) + ½O₂(g) → H₂O(l), ΔH° = −286 kJ<br>CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l), ΔH° = −890 kJ<br><br>Using Hess's law, what is the standard enthalpy of formation of CH₄(g), per mole of methane?",
    headEdits: [['The formation reaction for methane is: C(s) + 2H₂(g) → CH₄(g).',
                 'The formation reaction for methane is: C(s, graphite) + 2H₂(g) → CH₄(g).']],
    fb: {
      C: ' +890 kJ is the enthalpy change for reversing the stated combustion of one mole of methane. That reverse reaction starts with CO₂ and water, not with the elemental reference forms required for an enthalpy of formation.'
    },
    pointEdits: [[1,
      'ΔH<sub>f</sub> is defined for forming 1 mole of compound from elements in their standard states',
      'Standard enthalpy of formation, ΔH°<sub>f</sub>, describes forming one mole of a substance from its elements in their reference forms at the specified temperature and standard pressure.']] },

  { q: 'Q13', id: 'chem-430', key: 'A',
    fb: {
      C: ' This value is not the result of the required bond-energy calculation. Breaking H−H and Cl−Cl requires 436 + 242 = 678 kJ; forming two H−Cl bonds releases 862 kJ. The net change is 678 − 862 = −184 kJ.'
    } },

  { q: 'Q14', id: 'chem-431', key: 'C',
    stemWas: 'The standard enthalpy of formation (ΔH°f) of O₂(g) is:',
    stem: 'At 25 °C and standard pressure (1 bar), the standard enthalpy of formation, ΔH°f, of O₂(g) is:',
    headWas: '<p>By definition, the standard enthalpy of formation of any element in its most stable allotropic form (standard state) at 25°C and 1 atm is zero. O₂(g) is the standard state of oxygen, so ΔH°f = 0. This convention provides the reference point from which all other formation enthalpies are measured.</p>',
    head: "<p>The standard enthalpy of formation of an element in its reference form is defined as zero. At 25 °C and 1 bar, oxygen's reference form is O₂(g), so ΔH°f[O₂(g)] = 0. This is a thermodynamic reference convention; it does not mean that breaking an O=O bond requires no energy. Standard pressure is 1 bar, while the temperature must be specified separately.</p>",
    fb: {
      A: ' A negative value of this size would describe an energy-releasing change, not the chosen zero reference for O₂(g). Formation enthalpy of the elemental reference form is zero by definition.',
      B: ' About +249 kJ/mol is the enthalpy needed to form one mole of gaseous O atoms from half a mole of O₂. It is approximately half the O=O bond-dissociation enthalpy, not ΔH°f of O₂(g).',
      D: " About −498 kJ describes forming one mole of O₂ from two moles of gaseous O atoms. That is bond formation from atoms, not formation from oxygen's reference form, which is already O₂(g)."
    },
    points: [
      "An element's standard enthalpy of formation is zero when it is in its reference form.",
      'Standard pressure is 1 bar; thermodynamic values are often tabulated at 25 °C, but temperature is specified separately.',
      "At 25 °C, O₂ is oxygen's reference form; O₃ and O(g) have nonzero standard formation enthalpies."
    ],
    bl: "ΔH°f[O₂(g)] = 0 because O₂ is oxygen's elemental reference form under the stated conditions. This does not imply a zero O=O bond energy." },

  { q: 'Q15', id: 'chem-432', key: 'D',
    stemWas: 'A reaction has ΔH = −100 kJ and ΔS = −200 J/K. At what temperature does this reaction change from spontaneous to non-spontaneous?',
    stem: 'For a reaction at constant pressure, assume ΔH = −100 kJ and ΔS = −200 J/K remain approximately constant over the temperature range considered. At what temperature does ΔG = ΔH − TΔS change sign?',
    fb: {
      A: ' At 200 K, ΔG = −100 kJ − (200 K)(−0.200 kJ/K) = −60 kJ. The forward reaction is still thermodynamically favorable, so 200 K is below the crossover temperature.'
    },
    fbEdits: [['C', '−100 kJ/mol', '−100 kJ']] },

  { q: 'Q16', id: 'chem-433', key: 'C',
    stemWas: 'Which of the following processes results in an INCREASE in entropy (ΔS > 0)?',
    stem: 'Which of the following processes increases the entropy of the system under the stated conditions?',
    options: [
      [0, 'Water freezing at 0°C', 'Freezing pure water at 0 °C and 1 atm'],
      [1, 'Synthesis of a protein from amino acids', 'Condensing water vapor at 100 °C and 1 atm'],
      [2, 'Dissolution of NaCl in water', 'Dissolving NaCl in water to form a dilute solution at 25 °C'],
      [3, 'Gas compression from 10 L to 1 L at constant temperature', 'Compressing a fixed amount of an ideal gas from 10 L to 1 L at constant temperature']
    ],
    headWas: '<p>When NaCl dissolves in water, the highly ordered crystal lattice breaks apart into freely moving Na⁺ and Cl⁻ ions dispersed throughout the solvent. Although the water molecules near the ions become somewhat more ordered (hydration shells), the overall effect is a net increase in entropy because the destruction of the rigid lattice creates much more disorder than the partial ordering of surrounding water molecules.</p>',
    head: '<p>For NaCl dissolving to form a dilute aqueous solution at 25 °C, the entropy change of the combined solute-and-solvent system is positive. The ions disperse through the water, while hydration also changes the organization of surrounding water molecules. Both contributions matter. The result for NaCl should not be generalized to every dissolving substance.</p>',
    fb: {
      A: ' Freezing converts liquid water to crystalline ice. At the stated melting point, the water system loses entropy even though its temperature remains constant during the phase change.',
      B: " Condensation converts water vapor to liquid. The liquid has lower entropy than the vapor at the stated boiling point, so the system's entropy decreases.",
      D: ' For a fixed amount of ideal gas at constant temperature, ΔS = nR ln(V₂/V₁). Here V₂/V₁ = 1/10, so the logarithm and the entropy change are negative.'
    },
    points: [
      "Melting and vaporization increase the substance's entropy; freezing and condensation decrease it.",
      'Isothermal expansion of an ideal gas increases entropy; isothermal compression decreases it.',
      'Dissolution involves both solute and solvent; its entropy change is not always positive.'
    ],
    bl: "Dissolving NaCl into a dilute aqueous solution at 25 °C increases the system's entropy. Evaluate the complete system and stated conditions rather than assuming that every dissolution or reaction has the same entropy sign." },

  { q: 'Q17', id: 'chem-434', key: 'D', keep: true },
  { q: 'Q18', id: 'chem-435', key: 'A', keep: true },

  { q: 'Q19', id: 'chem-436', key: 'D',
    headEdits: [
      ['This occurs at approximately 840 °C and is the basis of lime production.',
       'This is the basis of lime production. The temperature needed depends on conditions, including CO₂ pressure; removing CO₂ favors further decomposition.'],
      [" The CO₂ escapes as a gas, driving the reaction forward (Le Chatelier's principle).", '']
    ],
    fb: {
      C: ' The carbonate releases CO₂ in this decomposition: CaCO₃ → CaO + CO₂. CO is a different gas, commonly formed during incomplete combustion or by the reaction of hot carbon with CO₂. The blast-furnace reaction Fe₂O₃ + 3CO → 2Fe + 3CO₂ consumes CO rather than producing it.',
      B: ' Heating CaCO₃ in the stated process gives CaO, not calcium metal. Calcium remains in oxidation state +2. Producing elemental calcium requires a separate reduction process, such as electrolysis of a suitable molten salt.'
    } },

  { q: 'Q20', id: 'chem-437', key: 'A',
    stemWas: 'Iron(III) chloride solution is treated with potassium thiocyanate (KSCN). What observation confirms the presence of Fe³⁺ ions?',
    stem: 'Adding thiocyanate ions to an acidified aqueous solution containing Fe³⁺ usually produces which observation?',
    headWas: '<p>The reaction of Fe³⁺ with thiocyanate ions produces the intensely colored iron(III) thiocyanate complex:</p><p><strong>Fe³⁺(aq) + 3SCN⁻(aq) → [Fe(SCN)₃](aq)</strong></p><p>This produces a characteristic <strong>blood-red</strong> color in solution. The reaction is extremely sensitive and is used as a qualitative test for Fe³⁺ ions. Even very low concentrations of Fe³⁺ give a visible red color.</p>',
    head: '<p>Iron(III) ions form red complexes with thiocyanate ions. A useful simplified equilibrium is:</p><p><strong>Fe³⁺(aq) + SCN⁻(aq) ⇌ [FeSCN]²⁺(aq)</strong></p><p>The coordinated water molecules are omitted in this shorthand. Other iron-thiocyanate complexes can also be present, depending on concentrations. The characteristic observation is a red coloration in solution, not a precipitate.</p>' }
];
