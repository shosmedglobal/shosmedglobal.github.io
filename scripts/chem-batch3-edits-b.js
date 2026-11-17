/** Chemistry review batch 3, display Q11-Q20 (chem-132..chem-141). */
'use strict';

module.exports = [

{ q: 'Q11', id: 'chem-132', key: 'A',
  stem: 'For A → B + C, the proposed elementary steps are: (1) A → D, slow; (2) D → B + C, fast. Using the slow-first-step approximation, what is the overall rate law?',
  main: [
    'The slow first step is elementary and unimolecular: one A forms D. Its rate is k[A]. With D rapidly converted to products in the second step, this gives the overall rate law in the stated approximation. D is an intermediate because it is formed and then consumed.'
  ],
  // the stored B paragraph explains option D's rate law under B's label, so all
  // three distractor paragraphs are rebuilt rather than relabelled
  feedback: {
    B: 'A rate proportional to [D] describes the fast elementary second step. In the given approximation, overall progress is controlled by the slow formation of D from A, giving rate = k[A].',
    C: 'B and C are products of the stated forward mechanism. Neither appears as a reactant in its slow first step, so this product-concentration expression is not the predicted forward rate law.',
    D: 'This would be second order in A. The slow elementary step contains one A, not two colliding A molecules, so its rate is first order in A.'
  },
  points: [
    'Rate laws can be written directly from the molecularity of an elementary step.',
    'Here the slow first step is unimolecular, giving rate = k[A].',
    'This shortcut is scoped to the stated mechanism; more complex mechanisms may require additional relationships to eliminate intermediates.'
  ],
  bottom: 'For this mechanism with a slow elementary first step A → D, the overall rate law is rate = k[A].',
  gone: ['This would imply the slow step involves two molecules of A colliding (bimolecular in A).',
         'The slow step acts as a bottleneck']
},

{ q: 'Q12', id: 'chem-133', key: 'B',
  stem: 'For the dilute-solution equilibrium A(aq) ⇌ B(aq), Kc = [B]/[A] = 4.0 × 10⁻³ at 25 °C. Which statement is true?',
  main: [
    'For this 1:1 reaction, the equilibrium ratio [B]/[A] is only 0.004. The equilibrium therefore strongly favors reactant A over product B. This describes the final ratio, not how quickly it is reached. A catalyst or activation barrier can affect the rate without changing this equilibrium ratio.'
  ],
  feedback: {
    A: 'Product B would be favored over A if [B]/[A] were greater than 1. Here it is 0.004, so A has the much larger equilibrium concentration.',
    C: 'Equal concentrations would give [B]/[A] = 1 for this particular reaction. That does not match Kc = 0.004.',
    D: 'A small equilibrium constant does not mean no reaction occurs. Some product is present at equilibrium; whether it forms quickly or slowly depends on kinetics, which Kc does not specify.'
  },
  points: [
    'For the specified A ⇌ B reaction, Kc is the ratio [B]/[A].',
    'Kc = 0.004 means the equilibrium strongly favors A.',
    'Equilibrium constants describe equilibrium composition, not reaction speed.'
  ],
  bottom: 'For A ⇌ B, [B]/[A] = 0.004 at equilibrium: reactant A is strongly favored, but Kc says nothing about how fast equilibrium is reached.',
  gone: ['Kc = 1 means roughly equal amounts',
         'A reaction that truly does not proceed would have K = 0, which is essentially impossible thermodynamically.']
},

{ q: 'Q13', id: 'chem-134', key: 'C',
  edits: [
    ['<p>For a zero-order reaction, rate = k[A]<sup>0</sup> = k. The rate is constant regardless of the concentration of reactant A. This occurs in enzyme-catalyzed reactions at saturation or surface reactions on saturated catalysts.</p>',
     '<p>For a zero-order reaction, rate = k[A]<sup>0</sup> = k. The rate is constant regardless of the concentration of reactant A over the range in which the zero-order rate law applies. Enzyme-catalyzed reactions near saturation and some surface reactions approximate this behavior over a concentration range; the rate cannot remain nonzero once the reactant is exhausted.</p>']
  ],
  feedback: {
    A: 'For disappearance following −d[A]/dt = k, t½ = [A]₀/(2k). The half-life therefore depends on starting concentration; concentration-independent half-life is characteristic of a first-order law.',
    B: 'Doubling concentration doubles the rate for a first-order dependence. In the zero-order range, rate = k, so changing [A] does not change the rate.'
  },
  points: [
    'A zero-order law has rate = k over its applicable concentration range.',
    'For −d[A]/dt = k, [A] = [A]₀ − kt, so [A] versus time is linear.',
    'Its half-life [A]₀/(2k) depends on starting concentration, unlike a first-order half-life.'
  ],
  bottom: 'Within its zero-order range, the rate is independent of [A]; the model must stop or change when that range no longer applies.',
  gone: ['The rate is constant regardless of the concentration of reactant A. This occurs in enzyme-catalyzed reactions at saturation'],
  keep: ['A linear ln[A] vs. time plot is the hallmark of first-order kinetics',
         'which depends on the initial concentration']
},

{ q: 'Q14', id: 'chem-135', key: 'D',
  edits: [
    ['<p>When Q > Kc, there are more products than at equilibrium. The system will shift toward reactants (left) to decrease Q until Q = Kc and equilibrium is reached.</p>',
     '<p>Qc has the same concentration expression as Kc but uses the current concentrations. Here Qc = 5.0 is greater than Kc = 2.0, so the products-to-reactants quotient is too large for equilibrium. Net reverse reaction lowers Qc until Qc = Kc at the stated temperature.</p>']
  ],
  feedback: {
    A: 'A net forward reaction would increase the products-to-reactants quotient. Here Qc already exceeds Kc, so net reaction must proceed in the reverse direction.',
    B: 'The comparison of Qc with Kc supplies the needed information: 5.0 > 2.0 means a net shift toward reactants.'
  },
  points: [
    'Q uses current amounts; K describes the equilibrium value at that temperature.',
    'Q > K gives net reverse reaction, while Q < K gives net forward reaction.',
    'At Q = K there is dynamic equilibrium, not cessation of molecular reactions.'
  ],
  keep: ['When Q < Kc, the reaction shifts right',
         'Equilibrium is reached only when Q = K exactly.',
         'Bottom Line: If Q > K, shift left (toward reactants); if Q < K, shift right (toward products); if Q = K, at equilibrium.']
},

{ q: 'Q15', id: 'chem-136', key: 'A',
  feedback: {
    B: 'A decrease in K on heating is the pattern for an exothermic forward reaction. The forward reaction here is endothermic, so K increases.',
    C: 'Changing concentration at fixed temperature leaves K unchanged, but changing temperature generally changes it. For the stated endothermic direction, heating increases K.',
    D: 'Heating increases K for an endothermic reaction, but the starting value and temperature change determine the new value. There is no reason it must become exactly 1.'
  },
  points: [
    'Endothermic forward reactions have positive reaction enthalpy over the range considered.',
    'Increasing temperature increases their equilibrium constant.',
    'The trend does not specify a numerical K without additional data.'
  ],
  gone: ['which only happens at one specific temperature for a given reaction'],
  keep: ['heat is effectively a reactant',
         'Bottom Line: For endothermic reactions, K increases with increasing temperature; for exothermic reactions, K decreases.']
},

{ q: 'Q16', id: 'chem-137', key: 'D',
  stem: 'A reactant disappears according to −d[A]/dt = k[A]², with k = 0.040 M⁻¹ s⁻¹ and [A]₀ = 0.50 M. What is its half-life?',
  feedback: {
    A: '17.3 s is approximately 0.693/0.040, which incorrectly uses the first-order half-life formula. The units of this k and the stated [A]² law require 1/(k[A]₀).',
    B: 'A half-life of 25 s would require k[A]₀ = 0.040 s⁻¹. The actual product is 0.040 × 0.50 = 0.020 s⁻¹, giving 50 s.'
  },
  points: [
    'For the stated disappearance law, t½ = 1/(k[A]₀).',
    '1/(0.040 × 0.50) = 50 s.',
    'Successive halvings take longer as [A] decreases; this differs from first-order behavior.'
  ],
  bottom: 'For −d[A]/dt = k[A]², t½ = 1/(k[A]₀) = 50 s.',
  keep: ['1/(0.040 x 0.50) = 1/0.020 = 50 s',
         'This is double the correct value, perhaps from using [A]₀ = 0.25 M']
},

{ q: 'Q17', id: 'chem-138', key: 'B',
  stem: 'An inert gas is added to an ideal-gas equilibrium mixture while both temperature and container volume are held constant. What happens?',
  edits: [
    ['<p>At constant volume, adding an inert gas increases total pressure but does not change the partial pressures or concentrations of any reacting species. Since the equilibrium expression depends on partial pressures (or concentrations) of reactants and products, the position of equilibrium is unaffected.</p>',
     '<p>At constant temperature and constant volume, adding an inert gas increases total pressure but does not change the partial pressures or concentrations of any reacting species. Since the equilibrium expression depends on partial pressures (or concentrations) of reactants and products, the position of equilibrium is unaffected under these conditions.</p>']
  ],
  feedback: {
    A: 'The added gas increases total pressure but leaves each reacting gas\'s partial pressure unchanged: pi = niRT/V. The reaction quotient therefore does not drive a shift toward products.',
    C: 'No reacting species has its partial pressure changed under these conditions, so the equilibrium is not driven toward reactants either.'
  },
  points: [
    'At fixed T and V, adding an inert ideal gas does not change niRT/V for a reacting species.',
    'Total pressure rises, but reacting partial pressures and equilibrium composition are unchanged.',
    'At constant total pressure instead, expansion can shift a gas equilibrium when the gaseous stoichiometric totals differ.'
  ],
  bottom: 'For ideal gases at fixed temperature and volume, an inert gas changes total pressure but not the reacting partial pressures or equilibrium position.',
  keep: ['adding inert gas at constant pressure would increase volume and could shift equilibrium',
         'The equilibrium constant depends only on temperature.']
},

{ q: 'Q18', id: 'chem-139', key: 'D',
  stem: 'At constant temperature, the rate triples when [A] is tripled while all other reactant concentrations remain unchanged. Assuming rate is proportional to [A]<sup>n</sup> over this range, what is the order with respect to A?',
  edits: [
    [' Since 3¹ = 3, the order must be 1. Third-order reactions are quite rare in practice.',
     ' Since 3¹ = 3, the order must be 1.']
  ],
  points: [
    'Hold temperature and other reactant concentrations fixed when comparing the effect of [A].',
    'The measured relation is 3 = 3<sup>n</sup>, so n = 1.',
    'This determines the order in A; it does not determine orders in other species or the overall order.'
  ],
  gone: ['Third-order reactions are quite rare in practice.'],
  keep: ['Bottom Line: If multiplying concentration by x changes rate by x<sup>n</sup>, then n is the order with respect to that reactant.']
},

{ q: 'Q19', id: 'chem-140', key: 'A',
  feedback: {
    B: 'Appearance in a rate law does not define an intermediate: ordinary reactants can also appear there. An intermediate is identified by being formed and subsequently consumed in the mechanism.',
    C: 'A catalyst participates and is regenerated overall. An intermediate is formed during the mechanism and consumed later. Both may cancel from the net equation, but their roles differ.'
  },
  points: [
    'An intermediate is made in one elementary step and consumed in a later step.',
    'It cancels when the steps are added to obtain the net equation.',
    'A catalyst is regenerated overall; an intermediate is generated along the pathway.'
  ],
  keep: ['An excess reactant is simply a starting material present in greater amount than needed.',
         'Bottom Line: Intermediates are produced and consumed within the mechanism; they do not appear in the overall equation.']
},

{ q: 'Q20', id: 'chem-141', key: 'A',
  edits: [
    ['<p>Decreasing volume increases pressure. Le Chatelier\'s principle states the system will shift toward the side with fewer moles of gas. Reactant side has 1 mol gas (PCl5), product side has 2 mol gas (PCl3 + Cl2), so equilibrium shifts left.</p>',
     '<p>Decreasing the volume at constant temperature increases the pressure. In this ideal-gas treatment, the system shifts toward the side with fewer moles of gas. The reactant side has 1 mol of gas (PCl5) and the product side has 2 mol (PCl3 + Cl2), so the equilibrium shifts left.</p>']
  ],
  feedback: {
    B: 'The product side contains two gaseous species per reaction event, compared with one on the reactant side. Compression favors the side with fewer gas particles here, so it shifts left rather than right.',
    C: 'The gaseous coefficient sums differ: one on the left and two on the right. Compression therefore changes Q relative to K and causes a shift in this ideal-gas model.',
    D: 'In the stated fixed-temperature ideal-gas model, changing volume changes Q and the equilibrium composition, not Kc.'
  },
  points: [
    'PCl5 ⇌ PCl3 + Cl₂ changes one gaseous formula unit into two.',
    'Reducing volume at fixed temperature shifts this equilibrium toward PCl₅.',
    'K stays unchanged; the composition adjusts until Q again equals K.'
  ],
  bottom: 'For this ideal-gas equilibrium at fixed temperature, compression favors PCl₅, the side with fewer gaseous particles.',
  gone: ['Kc depends only on temperature, never on pressure or volume changes.'],
  keep: ['Kc remains unchanged because temperature is constant.']
}

];
