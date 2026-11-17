/** Chemistry review batch 3, display Q21-Q30 (chem-142..chem-151). */
'use strict';

module.exports = [

{ q: 'Q21', id: 'chem-142', key: 'A',
  stem: 'Two first-order reactions are compared at the same temperature and equal reactant concentrations. Reaction 1 has Ea = 40 kJ/mol and reaction 2 has Ea = 100 kJ/mol. Which reaction is faster?',
  main: [
    'For first-order reactions at equal concentrations, comparing rates reduces to comparing their rate constants. The Arrhenius equation k = A exp(−Ea/RT) contains both Ea and the pre-exponential factor A. The lower Ea of reaction 1 favors a larger k, but an unknown difference in A prevents a definite conclusion. If A were the same for both, reaction 1 would be faster.'
  ],
  feedback: {
    B: 'A higher activation energy does not by itself make a reaction faster. With equal A, it would give a smaller k at the same temperature; an unknown A could change the ranking.',
    C: 'Equal temperature and concentration do not guarantee equal rates. The rate constants also depend on Ea and the pre-exponential factors.',
    D: 'Reaction 1 would be faster if the pre-exponential factors were equal. Because their values are not supplied, lower Ea alone does not prove the rate ranking.'
  },
  points: [
    'First-order rate is k times reactant concentration, so equal concentrations allow rates to be compared through k.',
    'Arrhenius k depends on both Ea and A at a specified temperature.',
    'Lower Ea gives larger k when A and temperature are the same; that additional information is missing here.'
  ],
  bottom: 'For these first-order reactions at equal concentration and temperature, Ea alone cannot rank the rates without the pre-exponential factors.',
  gone: ['However, if A values are similar, the reaction with lower Ea would be faster.',
         'If Reaction 2 has a much larger A, it could still be faster despite its higher Ea.']
},

{ q: 'Q22', id: 'chem-143', key: 'B',
  feedback: {
    A: 'Cu²⁺ gains two electrons to become Cu, so it is reduced. The oxidizing agent is itself reduced; it is not the species that loses electrons.',
    C: 'Cu is the product of the reduction half-reaction Cu²⁺ + 2e⁻ → Cu. The reacting species that is oxidized is Zn, which becomes Zn²⁺.'
  },
  points: [
    'Zn changes from oxidation state 0 to +2 and loses two electrons.',
    'Cu²⁺ gains those electrons and is reduced to Cu.',
    'Zn is the reducing agent; Cu²⁺ is the oxidizing agent.'
  ],
  keep: ['OIL RIG', 'Bottom Line: The species that loses electrons is oxidized; the species that gains electrons is reduced.']
},

{ q: 'Q23', id: 'chem-144', key: 'B',
  feedback: {
    A: 'The cathode is where reduction occurs. In this galvanic cell it receives electrons from the external circuit; oxidation occurs at the anode.',
    C: 'A salt bridge carries ions to maintain electrical neutrality between half-cells. It is not the electrode where the oxidation half-reaction occurs.'
  },
  points: [
    'Oxidation occurs at the anode and reduction at the cathode in both galvanic and electrolytic cells.',
    'In a galvanic cell, the anode is negative and the cathode positive.',
    'Electrons travel through the external circuit; ions carry charge through the electrolyte and salt bridge.'
  ],
  keep: ['AN OX', 'Bottom Line: Anode = oxidation; Cathode = reduction. In galvanic cells, the anode is negative and cathode is positive.']
},

{ q: 'Q24', id: 'chem-145', key: 'B',
  stem: 'The standard reduction potentials are E°(Zn²⁺/Zn) = −0.76 V and E°(Cu²⁺/Cu) = +0.34 V. What is the standard cell potential of the Zn-Cu galvanic cell? Use E°cell = E°cathode − E°anode.',
  main: [
    'Both supplied values are standard reduction potentials. Cu²⁺ is reduced at the cathode and Zn is oxidized at the anode. E°cell = E°cathode − E°anode = 0.34 − (−0.76) = 0.34 + 0.76 = 1.10 V.',
    'The positive E°cell shows that Zn + Cu²⁺ → Zn²⁺ + Cu is thermodynamically favored under standard conditions.'
  ],
  feedback: {
    A: '0.42 V results from adding the signed reduction potentials and then discarding the sign: 0.34 + (−0.76) = −0.42. Use cathode minus anode, not their signed sum.',
    C: '−1.10 V is the standard potential for the reverse cell reaction. The spontaneous standard Zn-Cu galvanic direction has Zn oxidized and Cu²⁺ reduced, giving +1.10 V.',
    D: '−0.42 V is the signed sum of the two tabulated reduction potentials. The formula instead gives 0.34 − (−0.76) = +1.10 V.'
  },
  points: [
    'Use both tabulated values as reduction potentials.',
    'Cu²⁺ is reduced at the cathode; Zn is oxidized at the anode in this standard galvanic cell.',
    'E°cell = 0.34 − (−0.76) = +1.10 V; do not multiply electrode potentials by stoichiometric coefficients.'
  ],
  bottom: 'The Zn-Cu standard cell potential is +1.10 V, calculated as E°cathode − E°anode.',
  gone: ['Always assign the electrode with the more positive reduction potential as the cathode.',
         'A positive E<sub>cell</sub> indicates a spontaneous reaction in a galvanic cell.']
},

{ q: 'Q25', id: 'chem-146', key: 'B',
  edits: [
    ['<p>When all species are at standard conditions (1 M, 1 atm), Q = 1 and the cell potential equals the standard cell potential.</p>',
     '<p>The condition needed here is Q = 1, making ln Q = 0. Standard-state activities give Q = 1, but this value can also occur when individual species are not all in their standard states. Q = 1 is not the same as the equilibrium condition Q = K.</p>']
  ],
  feedback: {
    A: 'E = 0 applies at equilibrium for the complete cell reaction, where Q = K. Here Q = 1 and E° = 1.10 V, so the logarithmic correction is zero and E is not zero.',
    C: 'The electron number n belongs in the coefficient of ln Q. It does not divide E°. Because ln 1 = 0, E remains 1.10 V, not 0.55 V.'
  },
  points: [
    'In E = E° − (RT/nF)ln Q, Q = 1 makes the correction zero.',
    'The answer is therefore E = E° = 1.10 V.',
    'Q = 1 need not mean all individual species are at standard-state values, and it need not mean equilibrium.'
  ],
  gone: ['When all species are at standard conditions (1 M, 1 atm)'],
  keep: ['Cell potential does not scale with the number of electrons transferred.',
         'Bottom Line: When Q = 1, the Nernst equation gives E = E<sub>standard</sub> because ln(1) = 0.']
},

{ q: 'Q26', id: 'chem-147', key: 'D',
  feedback: {
    A: 'Cl₂ forms at the anode by oxidation: 2Cl⁻ → Cl₂ + 2e⁻. At the cathode, Na⁺ instead gains electrons to form sodium.',
    B: 'Molten NaCl contains no oxygen-containing species from which O₂ would be generated. Oxygen evolution is associated with oxidation of water or hydroxide in other electrolysis systems.'
  },
  points: [
    'Molten NaCl supplies Na⁺ and Cl⁻, without water competing at the electrodes.',
    'Cathode reduction is Na⁺ + e⁻ → Na.',
    'Anode oxidation is 2Cl⁻ → Cl₂ + 2e⁻; aqueous NaCl has different cathode chemistry.'
  ],
  bottom: 'Molten NaCl gives sodium at the cathode and chlorine at the anode. In aqueous electrolysis, water can participate, so electrode products are not determined simply by ion charge.',
  gone: ['Bottom Line: In electrolysis, cations are reduced at the cathode and anions are oxidized at the anode.'],
  keep: ['NaOH is produced during electrolysis of aqueous NaCl (the chloralkali process)',
         'Downs process']
},

{ q: 'Q27', id: 'chem-148', key: 'B',
  stem: 'Assuming sufficient Cu²⁺ and that all the charge is used for Cu²⁺ + 2e⁻ → Cu, how many moles of Cu are deposited when 2 Faradays of charge (2 × 96,485 C) pass through a CuSO₄ solution?',
  feedback: {
    A: '0.5 mol Cu requires 1 mol electrons, or 1 Faraday. The supplied charge is twice that amount, so 1.0 mol Cu is deposited.',
    C: '2.0 mol is the amount of electrons supplied, not the amount of copper. Each Cu²⁺ needs two electrons, so the copper amount is 2.0/2 = 1.0 mol.'
  },
  points: [
    'One Faraday is the charge carried by one mole of electrons.',
    'Depositing one mole of Cu from Cu²⁺ requires two moles of electrons.',
    'With all charge used for deposition, n(Cu) = Q/(2F) = 1.0 mol.'
  ],
  keep: ['Each mole of Cu<sup>2</sup>+ requires 2 moles of electrons',
         'Bottom Line: Moles deposited = total charge (coulombs) / (n x F), where n is electrons per ion and F = 96,485 C/mol.']
},

{ q: 'Q28', id: 'chem-149', key: 'D',
  edits: [
    ['<p>Conversely, the species with the most negative reduction potential is the strongest reducing agent.</p>',
     '<p>The oxidizing agent is the species on the reactant side of the reduction half-reaction. The reduced member of a couple with a very negative reduction potential can be a strong reducing agent; for example, Zn metal is the reducing agent associated with Zn²⁺/Zn, not Zn²⁺ itself.</p>']
  ],
  feedback: {
    A: 'Zn²⁺/Zn has the lowest listed standard reduction potential, −0.76 V. Zn²⁺ is therefore the weakest oxidizing agent among these choices. Do not confuse it with Zn metal, which donates electrons.',
    B: 'Ag⁺ has a positive standard reduction potential of +0.80 V, but this is lower than the values for Au³⁺ and F₂. F₂ has the strongest reduction tendency among the listed oxidants.',
    C: 'Au³⁺ is a strong oxidizing agent in the listed standard couple, but its +1.50 V value is below F₂\'s +2.87 V. The question compares these standard reduction potentials, not reaction speed or every possible chemical environment.'
  },
  points: [
    'An oxidizing agent accepts electrons and is reduced.',
    'Among the listed couples, the highest standard reduction potential belongs to F₂/F⁻.',
    'F₂ is the strongest listed oxidizing agent; Zn metal, not Zn²⁺, is the reducing member of the zinc couple.'
  ],
  gone: ['Conversely, the species with the most negative reduction potential is the strongest reducing agent.',
         'F₂ at +2.87 V is the strongest common oxidizing agent.'],
  keep: ['F2 at +2.87 V is the strongest oxidizing agent.',
         'Bottom Line: Higher standard reduction potential = stronger oxidizing agent (greater tendency to gain electrons).']
},

{ q: 'Q29', id: 'chem-150', key: 'D',
  feedback: {
    A: 'With S = +2, the oxidation-state sum would be 2(+1) + 2 + 4(−2) = −4, not zero. Neutral H₂SO₄ requires S = +6.',
    B: 'With S = +4, the sum would be +2 + 4 − 8 = −2. Sulfur has +4 in H₂SO₃, but the four oxygens in H₂SO₄ require +6.',
    C: 'With S = +8, the sum would be +2 + 8 − 8 = +2, not zero. Solve the charge-balance equation rather than applying a blanket group-number rule.'
  },
  points: [
    'In H₂SO₄, H is +1 and O is −2.',
    'The oxidation states sum to zero because the molecule is neutral.',
    '2(+1) + S + 4(−2) = 0 gives S = +6.'
  ],
  gone: ['The maximum oxidation state for a main-group element equals its group number.'],
  keep: ['especially when hot and concentrated',
         'Bottom Line: Assign known oxidation states first (H = +1, O = -2), then solve for the unknown element.']
},

{ q: 'Q30', id: 'chem-151', key: 'B',
  main: [
    'At an anodic region, iron loses electrons: Fe → Fe²⁺ + 2e⁻. During ordinary rusting in aerated, near-neutral water, oxygen can be reduced at cathodic regions: O₂ + 2H₂O + 4e⁻ → 4OH⁻. Further reactions and oxidation produce iron oxides and oxyhydroxides commonly called rust. Iron can also corrode in other environments; oxygen is not required for every corrosion mechanism.'
  ],
  feedback: {
    A: 'Electrons are consumed in this oxygen-reduction reaction, so it is cathodic. The anodic region releases electrons as Fe is oxidized.',
    C: 'Fe²⁺ + 2e⁻ → Fe is reduction and is the reverse of the iron-dissolution reaction. The anode is where metallic iron loses electrons.'
  },
  points: [
    'Iron dissolution at the anode is Fe → Fe²⁺ + 2e⁻.',
    'The cathodic reaction consumes electrons and depends on the environment.',
    'Ordinary oxygen-assisted rusting is one corrosion process; acidic corrosion can instead involve H⁺ reduction.'
  ],
  bottom: 'Iron is oxidized at the anodic region. Oxygen reduction is a common cathodic partner in aerated water, but it is not universal to all iron corrosion.',
  gone: ['Corrosion requires both oxygen and water (moisture) to proceed.',
         'The Fe<sup>2</sup>+ eventually forms rust (Fe<sub>2</sub>O<sub>3</sub> . xH2O).'],
  keep: ['hydrogen evolution']
}

];
