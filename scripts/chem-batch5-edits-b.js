/* Chemistry batch 5 edits, Q11-Q20 (chem-252..chem-261). */
'use strict';
module.exports = [

{ q: 'Q11', id: 'chem-252', key: 'B',
  stemWas: 'Toluene undergoes electrophilic bromination faster than benzene because the methyl group is:',
  optionsWere: ['An electron-withdrawing group by induction', 'An electron-donating group by hyperconjugation and induction', 'A meta director', 'A deactivating substituent'],
  feedback: {
    A: 'A methyl group is treated as electron-donating in this aromatic-substitution comparison. Its inductive effect and hyperconjugation help stabilize the positively charged reaction intermediate; it does not deactivate the ring by withdrawing electron density.',
    D: 'The methyl group activates the aromatic ring toward electrophilic bromination compared with benzene. It also favors ortho and para substitution. Activation describes the effect on reaction rate; directing describes the preferred position.'
  },
  points: [
    'A methyl substituent activates benzene toward electrophilic aromatic substitution.',
    'Hyperconjugation and electron donation help stabilize the reaction intermediate.',
    'Methyl is an ortho/para director; rate effects and positional effects are related but distinct ideas.'
  ],
  keep: ['A meta director directs incoming electrophiles preferentially to the meta position', 'The methyl group donates electron density to the benzene ring'],
  gone: ['this effect is overwhelmed by hyperconjugation', 'All electron-donating groups are activating and ortho/para directing'] },

{ q: 'Q12', id: 'chem-253', key: 'B',
  stemWas: 'Friedel-Crafts alkylation of benzene with CH₃Cl in the presence of AlCl₃ produces:',
  optionsWere: ['Chlorobenzene', 'Toluene', 'Benzaldehyde', 'Phenol'],
  stem: 'What is the initial monosubstitution product when benzene reacts with CH₃Cl in the presence of AlCl₃?',
  main: 'This Friedel-Crafts alkylation replaces a hydrogen on benzene with a methyl group, giving toluene. AlCl₃ acts as a Lewis acid and activates CH₃Cl by strongly polarizing its C–Cl bond. The ring attacks the activated methyl group; a freely existing methyl carbocation need not be invoked. Toluene is more reactive than benzene toward further alkylation, so additional substitution can occur if conditions allow it.',
  feedback: {
    A: 'Chlorobenzene results from introducing chlorine onto the ring, for example with Cl₂ and a suitable Lewis acid. CH₃Cl/AlCl₃ transfers a methyl group in this reaction; it does not chlorinate benzene.',
    C: 'Benzaldehyde contains a formyl group, –CHO, but this reaction introduces –CH₃. A different formylation method is needed to introduce –CHO; formyl chloride is unstable and is not used like an ordinary acyl chloride.',
    D: 'Phenol contains an –OH group attached directly to the ring. Neither CH₃Cl nor AlCl₃ supplies an oxygen-containing group in this reaction, so phenol is not the product.'
  },
  points: [
    'Friedel-Crafts alkylation forms a bond between an aromatic ring and an alkyl group.',
    'AlCl₃ activates the alkyl halide; methylation does not require a free CH₃⁺ intermediate.',
    'Toluene is the first product here, but its activated ring can undergo further alkylation.'
  ],
  gone: ['generating the electrophilic carbocation CH₃⁺', 'this methyl cation is the electrophile', 'formyl chloride (HCOCl) or by other specialized methods', 'cumene process'] },

{ q: 'Q13', id: 'chem-254', key: 'B',
  stemWas: 'Which compound is NOT aromatic?',
  optionsWere: ['Pyridine', 'Cyclooctatetraene', 'Furan', 'Thiophene'],
  feedback: {
    A: 'Pyridine has six π electrons in its aromatic ring. Its nitrogen contributes one electron from a p orbital; the nitrogen lone pair lies outside the aromatic π system and is not part of that six-electron count.',
    C: 'Furan has four π electrons from its two double bonds and two from one oxygen lone pair. The resulting six-electron conjugated ring is aromatic.',
    D: 'Thiophene has four π electrons from its two double bonds and two from one sulfur lone pair. This gives an aromatic six-electron π system.'
  },
  points: [
    'Cyclooctatetraene adopts a nonplanar shape and is nonaromatic.',
    'A planar, fully conjugated eight-π-electron ring would be antiaromatic.',
    'Pyridine, furan and thiophene each have six aromatic π electrons, but their lone pairs contribute differently.'
  ],
  keep: ['COT adopts a non-planar tub-shaped conformation'],
  gone: ['</strong> Pyridine, furan, and thiophene are all aromatic heterocycles'] },

{ q: 'Q14', id: 'chem-255', key: 'B',
  stemWas: 'When chlorobenzene undergoes further nitration, the major product is:',
  optionsWere: ['m-nitrochlorobenzene', 'o- and p-nitrochlorobenzene', '2,4-dinitrochlorobenzene', 'm-chloronitrobenzene'],
  stem: 'During mononitration of chlorobenzene, which product or product mixture is formed preferentially?',
  options: [[3, 'Nitrobenzene']],
  mainEdits: [
    ['arenium ion at ortho and para positions.', 'arenium ion at ortho and para positions. The principal products are the ortho and para isomers; this does not mean that no meta product can form.']
  ],
  feedback: {
    C: '2,4-Dinitrochlorobenzene contains two nitro groups. The question specifies mononitration, which introduces one nitro group. Further nitration requires a separate reaction of the already deactivated nitrochlorobenzene.',
    D: 'Nitrobenzene lacks the chlorine substituent. In the electrophilic nitration described here, a ring hydrogen is replaced by –NO₂ while the original chlorine remains attached.'
  },
  points: [
    'Chlorine deactivates a benzene ring overall through its electron-withdrawing inductive effect.',
    'Lone-pair donation favors ortho and para substitution despite that deactivation.',
    'Mononitration introduces one nitro group and retains the chlorine substituent.'
  ],
  keep: ['m-nitrochlorobenzene would be the major product if chlorine were a meta director', 'Chlorine is an ortho/para director despite being a ring deactivator'],
  gone: ['m-chloronitrobenzene is actually the same compound as m-nitrochlorobenzene', 'only form as a minor product under forcing conditions'] },

{ q: 'Q15', id: 'chem-256', key: 'B',
  stemWas: 'Which of the following polycyclic aromatic hydrocarbons has 10 π electrons?',
  optionsWere: ['Benzene', 'Naphthalene', 'Anthracene', 'Phenanthrene'],
  main: 'Naphthalene, C₁₀H₈, has two fused six-membered rings and ten sp² carbon atoms. Each contributes one electron to its delocalized π system, giving ten π electrons in total. The shared ring atoms are counted only once. Benzene has six π electrons; anthracene and phenanthrene each have fourteen.',
  feedback: {
    A: 'Benzene has one six-membered ring and six π electrons. It is aromatic, but it is neither polycyclic nor a ten-π-electron system.',
    C: 'Anthracene has three linearly fused rings and fourteen π electrons. Counting its fourteen sp² carbon atoms gives the total without double-counting shared ring edges.',
    D: 'Phenanthrene has three angularly fused rings and fourteen π electrons. Its different arrangement of rings does not change that electron count to ten.'
  },
  points: [
    'Naphthalene contains ten π electrons distributed over a fused aromatic system.',
    'Shared atoms in fused rings must not be counted twice.',
    'Anthracene and phenanthrene have different ring arrangements but each contains fourteen π electrons.'
  ],
  gone: ['Benzene has 6, while anthracene and phenanthrene each have 14 π electrons.</p>', "satisfying Hückel's rule"] },

{ q: 'Q16', id: 'chem-257', key: 'B',
  stemWas: 'Phenol is more acidic than ethanol because:',
  optionsWere: ['Phenol has a higher molecular weight', 'The phenoxide ion is stabilized by resonance with the benzene ring', 'The O–H bond in phenol is shorter', 'Ethanol has a stronger inductive effect'],
  options: [[3, 'The ethyl group stabilizes ethoxide by withdrawing electron density']],
  feedback: {
    C: 'A claim about a shorter O–H bond does not establish the relative acidity. This comparison concerns proton loss and the relative stabilization of the resulting conjugate bases; phenoxide has resonance delocalization that ethoxide lacks.',
    D: 'The ethyl group is electron-donating in this comparison, not an electron-withdrawing group that stabilizes ethoxide. The most useful distinction is that phenoxide can delocalize negative charge into the ring, whereas ethoxide cannot.'
  },
  points: [
    'Acid strength is related to the stability of the conjugate base produced by proton loss.',
    'Phenoxide is resonance-stabilized; ethoxide lacks comparable resonance delocalization.',
    'The approximate aqueous pKₐ values, 10 for phenol and 16 for ethanol, show that phenol is much more acidic.'
  ],
  keep: ['Molecular weight has no direct relationship to acidity'],
  gone: ['Bond length differences between O-H bonds in phenol and ethanol are negligible', 'the aromatic ring withdraws and delocalizes the negative charge'] },

{ q: 'Q17', id: 'chem-258', key: 'B',
  stemWas: 'Benzene reacts with acetyl chloride (CH₃COCl) in the presence of AlCl₃ to give:',
  optionsWere: ['Toluene', 'Acetophenone', 'Benzaldehyde', 'Benzoic acid'],
  main: 'AlCl₃ activates acetyl chloride to form an acylium electrophile, CH₃CO⁺. Benzene reacts with this electrophile, and aqueous work-up releases acetophenone, C₆H₅COCH₃. The introduced carbonyl group deactivates the ring, so further Friedel-Crafts acylation is strongly disfavored. The resonance-stabilized acylium ion also avoids the carbocation rearrangements associated with some alkylations.',
  feedback: {
    C: 'Benzaldehyde contains –CHO, whereas acetyl chloride introduces –COCH₃. Benzene formylation requires different reagents; unstable formyl chloride should not be presented as a routine substitute for acetyl chloride.',
    D: 'Benzoic acid contains –COOH, not the –COCH₃ group introduced here. The product is a ketone. In this acylation, the acylium electrophile resists rearrangement and the newly introduced carbonyl group discourages further ring acylation.'
  },
  points: [
    'Acetyl chloride introduces an acetyl group, –COCH₃, onto benzene.',
    'The electrophile is a resonance-stabilized acylium ion.',
    "The product's carbonyl group deactivates the ring, limiting further Friedel-Crafts acylation."
  ],
  keep: ['Toluene (methylbenzene) is the product of Friedel-Crafts alkylation'],
  gone: ['would require formyl chloride (HCOCl) as the acylating agent', 'It can be made by oxidizing toluene with KMnO4', 'does not suffer from polysubstitution'] },

{ q: 'Q18', id: 'chem-259', key: 'C',
  stemWas: 'Which type of alcohol is most easily oxidized to a carboxylic acid?',
  optionsWere: ['Tertiary alcohol', 'Secondary alcohol', 'Primary alcohol', 'Phenol'],
  stem: 'Which class of alcohol commonly undergoes oxidation first to an aldehyde and then to a carboxylic acid without breaking its carbon skeleton?',
  mainEdits: [
    ['Secondary alcohols oxidize to ketones only.', 'Secondary alcohols ordinarily give ketones under standard alcohol-oxidation conditions; harsher oxidation can cleave carbon–carbon bonds.']
  ],
  feedback: {
    A: 'A tertiary alcohol has no hydrogen on the carbon bearing –OH. It therefore resists the usual oxidation to a carbonyl compound without carbon–carbon bond cleavage.',
    B: 'A secondary alcohol normally gives a ketone rather than an aldehyde. Converting that ketone further into smaller acids requires a different, more destructive oxidation pathway.'
  },
  points: [
    'A primary alcohol can give an aldehyde and, with further oxidation, a carboxylic acid.',
    'A secondary alcohol normally gives a ketone under standard alcohol-oxidation conditions.',
    'A tertiary alcohol lacks the required hydrogen on its –OH-bearing carbon and resists that usual pathway.'
  ],
  keep: ['phenol can be oxidized to quinones under certain conditions'],
  gone: ['Secondary alcohols oxidize to ketones only.', '</strong> Tertiary alcohols resist oxidation under normal conditions', '</strong> Secondary alcohols oxidize to ketones'] },

{ q: 'Q19', id: 'chem-260', key: 'C',
  stemWas: 'The Lucas test distinguishes between primary, secondary, and tertiary alcohols. A tertiary alcohol reacts with Lucas reagent (ZnCl₂/conc. HCl):',
  optionsWere: ['Only upon heating', 'Within 5 minutes at room temperature', 'Immediately at room temperature', 'Not at all'],
  stem: 'In the standard Lucas test, a small saturated tertiary alcohol that is initially soluble in the reagent typically produces cloudiness:',
  options: [[1, 'After several minutes at room temperature, with no immediate cloudiness']],
  main: 'Lucas reagent is concentrated HCl containing ZnCl₂. A suitable tertiary alcohol generally forms an insoluble alkyl chloride rapidly at room temperature, giving immediate cloudiness. The reaction is facilitated by formation of a relatively stable tertiary carbocation. Simple secondary alcohols are usually slower, while ordinary primary alcohols generally show no reaction during the room-temperature test. The timing is a practical guide, not an exact stopwatch rule; benzylic and allylic alcohols are important exceptions.',
  feedback: {
    A: 'Heating is not normally required for the immediate positive test of a suitable tertiary alcohol. Ordinary primary alcohols react much less readily under the test conditions, but their substitution must not be explained by a stable primary carbocation.',
    B: 'Delayed cloudiness is more characteristic of a suitable secondary alcohol than a tertiary one. Exact timing varies with the alcohol and test conditions, so a fixed five-minute cutoff is not a universal rule.',
    D: 'A suitable tertiary alcohol usually gives a rapid positive test because its conversion to an alkyl chloride is favorable under these conditions. The cloudy material is the poorly water-soluble chloride product.'
  },
  points: [
    'The Lucas test detects formation of a poorly water-soluble alkyl chloride as cloudiness.',
    'Suitable tertiary alcohols usually react rapidly, secondary alcohols more slowly and ordinary primary alcohols poorly at room temperature.',
    'Initial solubility and special structures such as benzylic or allylic alcohols can affect interpretation.'
  ],
  gone: ['primary carbocations) are highly unstable', 'Within 5 minutes at room temperature" describes the behavior', 'Secondary alcohols react within 5 minutes', 'Tertiary alcohols absolutely do react'] },

{ q: 'Q20', id: 'chem-261', key: 'B',
  stemWas: 'Dehydration of 2-methylbutan-2-ol with concentrated H₂SO₄ gives primarily:',
  optionsWere: ['2-methylbut-1-ene', '2-methylbut-2-ene', '3-methylbut-1-ene', 'Pentene'],
  stem: 'When 2-methylbutan-2-ol is heated with concentrated H₂SO₄ under dehydration conditions, the major alkene product is:',
  options: [[3, 'Pent-1-ene']],
  feedback: {
    C: '3-Methylbut-1-ene places the double bond away from the carbon that originally bore –OH. It is not the direct β-elimination product of the initially formed tertiary carbocation. The major product comes from removing a β-hydrogen to form the more substituted 2-methylbut-2-ene.',
    D: 'Pent-1-ene has an unbranched carbon skeleton. The normal dehydration of 2-methylbutan-2-ol retains its branch and mainly produces 2-methylbut-2-ene.'
  },
  points: [
    'Acid-catalyzed dehydration of this tertiary alcohol proceeds through a tertiary carbocation.',
    'A β-hydrogen is removed to form a double bond adjacent to the carbocation carbon.',
    'The more substituted alkene, 2-methylbut-2-ene, is the major product under these conditions.'
  ],
  keep: ['2-methylbut-1-ene is the less substituted alkene', "According to Zaitsev's rule"],
  gone: ['would require a structural rearrangement of the carbon skeleton', '"Pentene" is too vague an answer'] }

];
