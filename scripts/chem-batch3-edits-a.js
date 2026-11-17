/**
 * Chemistry review batch 3, display Q2-Q10 (chem-123..chem-131).
 * Q1 (chem-76) is kept byte-identical per the review and has no spec here.
 *
 * Main-explanation edits are listed before feedback edits because the harness
 * resolves each anchor against the section it currently lives in and rejects
 * one that would match in two sections.
 */
'use strict';

module.exports = [

{ q: 'Q2', id: 'chem-123', key: 'C',
  edits: [
    ['<p>Pure solids and liquids are not included in the equilibrium expression - only gases and aqueous species.</p>',
     '<p>Pure solids and pure liquids are omitted from the usual equilibrium expression because their activities are treated as constant. For this all-gas reaction, use the equilibrium concentrations of all three gases.</p>']
  ],
  feedback: {
    A: 'This omits the exponents required by the balanced equation. The coefficient 2 becomes the exponent on [NH₃], and the coefficient 3 becomes the exponent on [H₂].',
    B: 'This is the reciprocal of the required expression and would describe the reverse reaction, 2NH₃ ⇌ N₂ + 3H₂. For the reaction as written, ammonia belongs in the numerator.'
  },
  points: [
    'Write products over reactants using equilibrium concentrations.',
    'Balanced coefficients become exponents: Kc = [NH₃]²/([N₂][H₂]³).',
    'Reversing the reaction replaces K by 1/K; it does not leave the expression unchanged.'
  ],
  bottom: 'For N₂ + 3H₂ ⇌ 2NH₃, Kc = [NH₃]²/([N₂][H₂]³), evaluated at equilibrium.',
  gone: ['only gases and aqueous species'],
  keep: ['Stoichiometric coefficients in the balanced equation become exponents']
},

{ q: 'Q3', id: 'chem-124', key: 'C',
  stem: 'For the ideal-gas equilibrium 2SO₂(g) + O₂(g) ⇌ 2SO₃(g), more O₂ is added while temperature and container volume remain constant. What happens as equilibrium is re-established?',
  main: [
    'Adding O₂ at fixed volume increases its concentration. The reaction quotient Qc = [SO₃]²/([SO₂]²[O₂]) therefore decreases below Kc. Net reaction proceeds to the right, consuming some of the added O₂ and forming more SO₃ until Qc again equals Kc. Kc is unchanged because temperature is unchanged.'
  ],
  feedback: {
    A: 'A leftward shift would form more O₂ and increase the imbalance. Here adding O₂ lowers Qc below Kc, so the net reaction must proceed toward products.',
    B: 'The mixture was initially at equilibrium, but increasing [O₂] changes Qc. The concentrations adjust through a net forward reaction until the equilibrium condition is restored.'
  },
  points: [
    'At fixed volume, adding O₂ raises [O₂].',
    'Qc falls below Kc, so more SO₃ forms.',
    'The equilibrium composition changes, but Kc stays constant at the unchanged temperature.'
  ],
  gone: ['Le Chatelier'],
  keep: ['Bottom Line: Adding more reactant shifts equilibrium toward products; Kc remains constant at constant temperature.',
         'The equilibrium constant Kc depends only on temperature']
},

{ q: 'Q4', id: 'chem-125', key: 'D',
  stem: 'Using the textbook ideal-gas expressions with pressures in atm and concentrations in mol/L, Kp = Kc(RT)<sup>Δn</sup>. At 300 K, Kp = 0.50 and Δn(gas) = −2. With R = 0.0821 L·atm·mol⁻¹·K⁻¹, how do the numerical values of Kp and Kc compare?',
  main: [
    'Here RT = 0.0821 × 300 = 24.63 in the stated unit convention. Thus Kp = Kc/(24.63)² ≈ Kc/606.6. Rearranging gives Kc = 0.50 × 606.6 ≈ 303.3. Therefore Kp < Kc for this calculation. The comparison uses the supplied temperature and consistent pressure/concentration units; it is not a rule based on Δn alone.'
  ],
  feedback: {
    A: 'For these values, (RT)<sup>−2</sup> is about 1/606.6, so Kp is smaller, not larger. A sign-only rule should not replace evaluation of the given factor.',
    B: 'The question supplies Δn, temperature and a consistent value of R, so the conversion can be calculated. It gives Kp = 0.50 and Kc ≈ 303.3 in the stated convention.',
    C: 'When Δn = 0, the conversion factor is 1. Here Δn = −2 and RT = 24.63, so the factor is not 1 and the numerical values differ.'
  },
  points: [
    'For the stated ideal-gas convention, Kp = Kc(RT)<sup>Δn</sup>.',
    'Δn is the sum of gaseous product coefficients minus gaseous reactant coefficients.',
    'With these units and 300 K, Kc ≈ 303.3 and Kp = 0.50; evaluate RT instead of relying on the sign of Δn alone.'
  ],
  bottom: 'Here Kp = Kc/(24.63)², so Kp < Kc in the specified unit convention.',
  gone: ['When Δn is negative (fewer gas moles in products), Kp < Kc.',
         'the sign of Δn alone decides whether Kp is larger or smaller',
         'The actual values of Kp, R and T are not needed']
},

{ q: 'Q5', id: 'chem-126', key: 'C',
  stem: 'For a reaction whose forward direction is exothermic, the temperature of an equilibrium mixture is increased at constant pressure. In which direction does equilibrium shift?',
  edits: [
    ['<p>Unlike adding a reactant, changing temperature actually changes the value of K.</p>',
     '<p>Unlike adding a reactant, changing temperature actually changes the value of K. K decreases as temperature increases for the exothermic forward reaction.</p>']
  ],
  feedback: {
    A: 'Heating favors the endothermic direction. Because the forward direction is exothermic here, the reverse direction is favored and the composition shifts toward reactants.',
    B: 'Temperature changes the equilibrium constant. For the exothermic forward reaction, heating lowers K and changes the equilibrium composition.',
    D: 'The stem holds pressure constant. The relevant information is that the forward reaction is exothermic, so increasing temperature favors the reverse, endothermic direction.'
  },
  points: [
    'The forward reaction releases heat; its reverse absorbs heat.',
    'Raising temperature favors the reverse direction under the stated conditions.',
    'Unlike adding a reactant at fixed temperature, heating changes K; for an exothermic forward reaction, K decreases.'
  ],
  gone: ['Pressure and temperature are independent variables that each cause predictable, separate shifts'],
  keep: ['heat can be thought of as a product',
         'Bottom Line: Increasing temperature shifts equilibrium away from the exothermic direction; K changes with temperature.']
},

{ q: 'Q6', id: 'chem-127', key: 'B',
  feedback: {
    A: 'In 5 min, only half of one half-life has elapsed. The fraction remaining is e^(−0.0693 × 5) ≈ 0.707, rather than 0.50.',
    C: 'After 15 min, the fraction remaining is e^(−0.0693 × 15) ≈ 0.354. Half remains at 10 min.',
    D: 'Twenty minutes is two half-lives for this rate constant, so about one-quarter remains. The half-life is ln 2/k = 10 min.'
  },
  points: [
    'First-order half-life is t½ = ln 2/k.',
    '0.693/0.0693 min⁻¹ = 10 min.',
    'At a fixed rate constant, each successive halving takes the same time, independent of the starting concentration.'
  ],
  gone: ['confusing the formula with t½ = 1/(k[A]₀) (which is for second-order reactions)'],
  keep: ['0.693/0.0693 = 10 min']
},

{ q: 'Q7', id: 'chem-128', key: 'B',
  points: [
    'The exponent of [A] is 2, so the reaction is second order with respect to A.',
    'Doubling [A] at unchanged [B] and k multiplies the rate by 2² = 4.',
    'If both [A] and [B] doubled, the rate would instead increase by 2² × 2 = 8.'
  ],
  keep: ['The reaction is second order in A, so doubling A quadruples the rate']
},

{ q: 'Q8', id: 'chem-129', key: 'A',
  feedback: {
    D: 'The exponents are 1 for [X] and 2 for [Y], giving an overall order of 1 + 2 = 3. An overall order of 4 would require exponents whose sum is 4.'
  },
  points: [
    'In rate = k[X][Y]², the individual orders are 1 in X and 2 in Y.',
    'Overall order is the sum: 1 + 2 = 3.',
    'Overall reaction order is obtained from the rate law, not inferred automatically from the overall balanced equation.'
  ],
  gone: ['Perhaps this comes from multiplying the orders or miscounting.'],
  keep: ['Bottom Line: Overall reaction order = sum of individual orders of all reactants in the rate law.']
},

{ q: 'Q9', id: 'chem-130', key: 'B',
  stem: 'At constant temperature, a catalyst provides an alternative pathway whose activation energy is 30 kJ/mol rather than 50 kJ/mol. Which statement correctly describes its effect on reaction kinetics and equilibrium?',
  main: [
    'A catalyst provides an alternative pathway that allows equilibrium to be reached faster. It catalyzes both forward and reverse interconversion without changing Kc or the equilibrium composition at the same temperature. It changes the pathway, not the initial and final thermodynamic states.'
  ],
  feedback: {
    A: 'The catalyst increases reaction rates but does not favor a different equilibrium composition. A rightward equilibrium shift would require a change in thermodynamic conditions, not merely a faster pathway.',
    C: 'A catalyst does not speed only the forward direction while leaving the reverse process unaffected. Both directions are catalyzed, so the same equilibrium can be reached more quickly.'
  },
  points: [
    'A catalyst changes the reaction pathway and can increase the rate.',
    'At the same temperature, it does not change K or the equilibrium composition.',
    'It is regenerated in the catalytic cycle and is not consumed overall.'
  ],
  bottom: 'A catalyst speeds approach to equilibrium without changing K or the equilibrium position at fixed temperature.',
  gone: ['lowers the activation energy for both forward and reverse reactions equally',
         'Catalysts provide an alternative reaction pathway with a lower energy barrier.'],
  keep: ['Enthalpy (ΔH) is a state function']
},

{ q: 'Q10', id: 'chem-131', key: 'A',
  stem: 'A reaction follows k = A exp(−Ea/RT), with A and Ea treated as constant over the temperature range. If temperature rises from 300 K to 310 K and Ea = 80 kJ/mol, the rate constant will: (R = 8.314 J·mol⁻¹·K⁻¹)',
  options: [[0, 'Increase by a factor of approximately 2.81']],
  main: [
    'Divide the Arrhenius expressions at the two temperatures: k₂/k₁ = exp[(Ea/R)(1/T₁ − 1/T₂)]. Use Ea = 80,000 J/mol to match R. The exponent is (80,000/8.314)(1/300 − 1/310) ≈ 1.035, so k₂/k₁ ≈ e^1.035 ≈ 2.81. The increase is therefore about 181%, not 10%. A rule of thumb about doubling per 10 degrees is not accurate enough for these supplied values.'
  ],
  feedback: {
    B: 'With positive Ea and the stated constant A, raising T increases the Arrhenius exponential factor. The rate constant therefore does not stay unchanged.',
    C: 'For the given positive activation energy, the exponent −Ea/(RT) becomes less negative as T rises. This increases k rather than decreasing it.',
    D: 'The temperature changes by 10 K, but k does not increase by the same numerical percentage. The calculated ratio is about 2.81, whereas a 10% increase would give a ratio of only 1.10.'
  },
  points: [
    'Use k₂/k₁ = exp[(Ea/R)(1/T₁ − 1/T₂)] when A and Ea are treated as unchanged.',
    'Convert 80 kJ/mol to 80,000 J/mol before using R = 8.314 J·mol⁻¹·K⁻¹.',
    'The ratio is about 2.81; the doubling-per-10-K shortcut is not a universal law.'
  ],
  bottom: 'For these values, heating from 300 to 310 K multiplies k by approximately 2.81.',
  gone: ['Approximately double',
         'rule of thumb that reaction rates double for every 10 degree C increase',
         'gives approximately 2 for these values',
         'gives approximately a factor of 2, not 1.10']
}

];
