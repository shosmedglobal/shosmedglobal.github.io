/* Chemistry batch 5 edits, Q1-Q10 (chem-242..chem-251).
 *
 * `stemWas` and `optionsWere` are the ORIGINAL texts, asserted here so the
 * harness can refuse to edit a record that is not the one the review reviewed.
 * Formula typography follows the pack's Unicode subscripts, matching the stems
 * and options. Main explanations stay a single paragraph, as stored.
 */
'use strict';
module.exports = [

{ q: 'Q1', id: 'chem-242', key: 'C',
  stemWas: 'The hybridization of carbon atoms in ethyne (C₂H₂) is:',
  optionsWere: ['sp³', 'sp²', 'sp', 'sp³d'],
  feedback: {
    D: 'In the usual hybridization model, each carbon in ethyne uses two sp orbitals for its sigma bonds and retains two unhybridized p orbitals for the two pi bonds. An sp³d description does not fit this carbon bonding arrangement.'
  },
  points: [
    'Each carbon in ethyne has two directions of sigma bonding and is described as sp-hybridized.',
    'A carbon–carbon triple bond contains one sigma bond and two pi bonds.',
    'Ethyne is linear, with bond angles of 180°.'
  ],
  keep: ['sp2 hybridization gives a trigonal planar geometry', 'This requires two hybrid orbitals, corresponding to sp hybridization'],
  gone: ['PCl5', 'accessible d orbitals'] },

{ q: 'Q2', id: 'chem-243', key: 'B',
  stemWas: 'Which of the following alkynes gives acetone (propan-2-one) upon acid-catalyzed hydration?',
  optionsWere: ['Ethyne', 'Propyne', 'But-1-yne', 'But-2-yne'],
  stem: 'Which alkyne gives acetone (propan-2-one) on hydration with water, dilute sulfuric acid and a mercury(II) sulfate catalyst?',
  main: 'Under these conditions, water adds to propyne to form an enol, CH₃C(OH)=CH₂. Proton transfer and rearrangement of the double bond then convert this enol into the more stable carbonyl compound, CH₃COCH₃, acetone. This enol-to-carbonyl change is called keto–enol tautomerism. The three-carbon skeleton is retained.',
  feedback: {
    A: 'Ethyne gives the enol CH₂=CHOH, which changes into ethanal, CH₃CHO. Ethyne has only two carbon atoms, so hydration cannot give the three-carbon product acetone.',
    C: 'But-1-yne gives butan-2-one, CH₃COCH₂CH₃, under these hydration conditions. Its four-carbon skeleton is retained, so the product is not acetone.',
    D: 'But-2-yne is a symmetrical four-carbon alkyne. Hydration and tautomerism give butan-2-one, the same ketone obtained here from but-1-yne, rather than three-carbon acetone.'
  },
  points: [
    'Mercury(II)-catalyzed hydration of an alkyne first produces an enol that changes into a carbonyl compound.',
    'Propyne gives acetone; count carbon atoms to check the product.',
    'Ethyne gives ethanal, whereas both but-1-yne and but-2-yne give butan-2-one under these conditions.'
  ],
  gone: ['no adjacent carbon with hydrogens', 'Markovnikov', 'would give a different product pattern', 'the classic textbook example'] },

{ q: 'Q3', id: 'chem-244', key: 'A',
  stemWas: 'What is the product when 2-butene reacts with ozone (O₃) followed by reductive workup with Zn/H₂O?',
  optionsWere: ['2 molecules of acetaldehyde', '1 molecule of formaldehyde + 1 molecule of propanal', '2 molecules of formaldehyde', '1 molecule of butanal'],
  feedback: {
    D: 'Butanal retains all four carbon atoms in one chain. Reductive ozonolysis of this acyclic alkene cleaves its central C=C bond, giving two molecules of ethanal instead. Cleavage of a cyclic alkene can leave both carbonyl groups in one molecule, so two separate products are not a universal rule.'
  },
  points: [
    'Reductive ozonolysis converts the two carbons of a C=C bond into carbonyl carbons.',
    'Each double-bond carbon in but-2-ene bears a hydrogen, so the products are aldehydes.',
    'One molecule of but-2-ene produces two molecules of ethanal, preserving the total of four carbon atoms.'
  ],
  keep: ['would result from ozonolysis of 1-butene', 'would result from ozonolysis of ethene', 'Reductive workup with Zn prevents further oxidation'],
  gone: ['Ozonolysis always breaks the carbon-carbon double bond'] },

{ q: 'Q4', id: 'chem-245', key: 'A',
  stemWas: 'The free-radical chlorination of methane proceeds via which steps in order?',
  optionsWere: ['Initiation → Propagation → Termination', 'Propagation → Initiation → Termination', 'Termination → Propagation → Initiation', 'Initiation → Termination → Propagation'],
  stem: 'What is the conventional order used to outline the stages of a productive free-radical chlorination chain?',
  main: 'A radical chain is conventionally described as initiation, propagation and termination. Light can initiate methane chlorination by splitting Cl₂ into two chlorine radicals. During propagation, Cl· + CH₄ → HCl + CH₃·, followed by CH₃· + Cl₂ → CH₃Cl + Cl·. The regenerated chlorine radical can continue the chain. Termination removes radicals, for example when two Cl· radicals combine. These processes can occur at the same time in a reaction mixture; the sequence is a way of describing a productive chain.',
  feedback: {
    B: 'Propagation requires radicals to be present. In the conventional description, initiation explains their formation before the chain-carrying propagation steps are introduced.',
    C: 'Termination describes removal of radicals, not their initial generation. Starting an outline with termination therefore does not describe how a productive radical chain is established.',
    D: 'Putting termination before propagation omits the repeated steps that produce chloromethane and regenerate a radical. An individual newly formed radical can nevertheless terminate without first propagating; the listed stages are not a compulsory timeline for every radical.'
  },
  points: [
    'Initiation generates radicals, such as by light-induced homolytic cleavage of Cl₂.',
    'Propagation consumes a radical and generates another radical, allowing the chain to continue.',
    'Termination removes radicals; it can occur while other chains are still propagating.'
  ],
  gone: ['Propagation cannot come before initiation', 'There are no radicals present at the start of the reaction', 'Termination cannot immediately follow initiation', 'often thousands of times'] },

{ q: 'Q5', id: 'chem-246', key: 'C',
  stemWas: 'Cyclopropane is more reactive than cyclohexane because:',
  optionsWere: ['It has fewer hydrogen atoms', 'It has more π electrons', 'Its C–C bonds have significant angle strain', 'It is aromatic'],
  stem: 'Which factor helps explain why cyclopropane undergoes ring-opening reactions more readily than cyclohexane?',
  main: 'The three-membered ring of cyclopropane forces its carbon framework into angles of about 60°, far from the preferred tetrahedral angle of about 109.5°. It also has torsional strain from eclipsing C–H bonds. Opening the ring can relieve this strain. Cyclohexane can adopt a chair conformation with bond angles close to tetrahedral and largely staggered bonds, so it has much less ring strain.',
  feedback: {
    D: 'Cyclopropane is not an ordinary aromatic π system. Its tendency to undergo ring opening is associated with ring strain, including angle and torsional strain, rather than aromatic stabilization.'
  },
  points: [
    'Cyclopropane has substantial angle strain because its ring angles are about 60°.',
    'Eclipsing C–H bonds also contribute torsional strain.',
    'Chair cyclohexane has much less strain; opening a strained ring can be energetically favorable.'
  ],
  keep: ['Having fewer hydrogen atoms does not make a cycloalkane more reactive', 'Cyclopropane has no pi electrons'],
  gone: ['Cyclopropane is definitely not aromatic', 'reactivity is entirely due to angle strain', 'Baeyer strain'] },

{ q: 'Q6', id: 'chem-247', key: 'D',
  stemWas: 'Which of the following has the highest boiling point?',
  optionsWere: ['Pentane', '2-methylbutane', '2,2-dimethylpropane', 'Cyclopentane'],
  stem: 'Which of the following compounds has the highest normal boiling point, measured at 1 atm?',
  main: 'Cyclopentane has the highest normal boiling point in this set, about 49 °C. The approximate values for pentane, 2-methylbutane and 2,2-dimethylpropane are 36, 28 and 10 °C, respectively. Among those three C₅H₁₂ isomers, greater branching is associated with weaker overall intermolecular attractions and a lower boiling point. Cyclopentane has the different formula C₅H₁₀, so that branching comparison alone does not establish its position. Molecular shape affects intermolecular interactions, but cyclic compounds do not universally boil above acyclic compounds.',
  feedback: {
    A: 'Pentane is the straight-chain C₅H₁₂ isomer and boils at about 36 °C. It boils above its two branched isomers, but below cyclopentane at about 49 °C.',
    B: '2-Methylbutane is a branched C₅H₁₂ isomer with a normal boiling point of about 28 °C. It is therefore below both pentane and cyclopentane.',
    C: '2,2-Dimethylpropane is the most compact of the three C₅H₁₂ isomers and boils at about 10 °C. It has the lowest, not the highest, boiling point in this set.'
  },
  points: [
    'Normal boiling points are compared at the same pressure, 1 atm.',
    'Within the three C₅H₁₂ isomers here, increasing branching lowers the boiling point.',
    'Cyclopentane boils at about 49 °C and has formula C₅H₁₀, not C₅H₁₂.'
  ],
  gone: ['greater surface contact area', 'Pentane (36°c)', 'Among C₅ hydrocarbons'] },

{ q: 'Q7', id: 'chem-248', key: 'C',
  stemWas: 'Treatment of propyne with sodium amide (NaNH₂) in liquid ammonia followed by methyl iodide (CH₃I) gives:',
  optionsWere: ['Butane', 'But-1-yne', 'But-2-yne', 'Pent-2-yne'],
  points: [
    'NaNH₂ removes the terminal hydrogen from propyne to form an acetylide ion.',
    'The acetylide attacks methyl iodide by an SN2 reaction, forming a new C–C bond.',
    'Adding one methyl carbon to three-carbon propyne produces four-carbon but-2-yne.'
  ],
  keep: ['Butane (C<sub>4</sub>H<sub>10</sub>) is a fully saturated alkane', 'would require adding an ethyl group to acetylene', 'has five carbons'] },

{ q: 'Q8', id: 'chem-249', key: 'B',
  stemWas: "According to Hückel's rule, a planar cyclic compound is aromatic if it has:",
  optionsWere: ['4n π electrons', '(4n + 2) π electrons', '4n + 1 π electrons', 'Any even number of π electrons'],
  stem: "For a planar, monocyclic, fully conjugated π system in its ground state, Hückel's rule predicts aromaticity when it contains:",
  main: "Hückel's rule applies to a planar ring with a continuous set of overlapping p orbitals. A closed-shell system with 4n + 2 π electrons, where n is a nonnegative integer, is aromatic. The allowed counts begin 2, 6, 10 and 14. A planar, fully conjugated ring with 4n π electrons is antiaromatic. If a ring avoids planarity or lacks continuous conjugation, it may instead be nonaromatic. Electron counting alone is not enough.",
  feedback: {
    A: 'A 4n π-electron count corresponds to antiaromaticity when the ring is also planar and fully conjugated. A nonplanar ring with that count, such as cyclooctatetraene, is nonaromatic rather than antiaromatic.'
  },
  fbEdits: [
    ['C', 'giving 2, 6, 10, 14 pi electrons. Benzene has 6 (n=1), naphthalene has 10 (n=2).', 'giving 2, 6, 10 and 14 pi electrons for a monocyclic ring. Benzene has 6, with n = 1.']
  ],
  points: [
    "Apply Hückel's rule to a planar, cyclic, continuously conjugated π system.",
    'The aromatic electron counts are 4n + 2, with n = 0, 1, 2 and so on.',
    'A 4n count is antiaromatic only when the other structural conditions are met.'
  ],
  keep: ['Cyclooctatetraene avoids this by adopting a non-planar tub shape'],
  gone: ['Compounds with 4n π electrons are anti-aromatic.</p>', 'naphthalene has 10 (n=2)'] },

{ q: 'Q9', id: 'chem-250', key: 'C',
  stemWas: 'Which substituent is an ortho/para director in electrophilic aromatic substitution?',
  optionsWere: ['-NO₂', '-COOH', '-OH', '-CHO'],
  feedback: {
    A: 'A nitro group withdraws electron density strongly through resonance and induction. It deactivates the benzene ring and favors meta substitution, unlike the activating hydroxyl group.',
    B: 'A carboxyl group attached through its carbonyl carbon withdraws electron density from the aromatic ring. It is deactivating and meta-directing rather than activating and ortho/para-directing.',
    D: 'The aldehyde group, –CHO, withdraws electron density through its carbonyl group. It deactivates the ring and favors meta substitution.'
  },
  points: [
    'A hydroxyl group can donate a lone pair into a benzene ring by resonance.',
    'This donation activates the ring and favors substitution at the ortho and para positions.',
    '–NO₂, –COOH and –CHO are deactivating meta directors in the examples here.'
  ],
  keep: ['The hydroxyl group (-OH) is an activating group'],
  gone: ['-no2, -cooh, and -cho are all electron-withdrawing', 'All strong electron-withdrawing groups are meta directors and ring deactivators'] },

{ q: 'Q10', id: 'chem-251', key: 'C',
  stemWas: 'Nitration of benzene uses a mixture of concentrated HNO₃ and H₂SO₄. The active electrophile is:',
  optionsWere: ['NO₂⁻', 'NO₃⁻', 'NO₂⁺', 'NO⁺'],
  feedback: {
    B: 'Nitrate, NO₃⁻, is the conjugate base of nitric acid. It is not the electrophile that attacks the ring in nitration. The active electrophile is the positively charged nitronium ion, NO₂⁺.'
  },
  points: [
    'The electrophile in standard mixed-acid nitration is NO₂⁺, the nitronium ion.',
    'Sulfuric acid helps generate NO₂⁺ from nitric acid.',
    'Nitration replaces a ring hydrogen with –NO₂ and restores aromaticity after the substitution.'
  ],
  keep: ['NO2- (nitrite ion) is a nucleophile', 'NO+ (nitrosonium ion) is an electrophile but is involved in nitrosation'],
  gone: ['NO3- (nitrate ion) is a stable, negatively charged species that acts as a nucleophile'] }

];
