/* Chemistry batch 6 edits, Q51-Q60 (chem-352..chem-361).
   Q52 and Q57 are points-only. */
'use strict';
module.exports = [

{ q: 'Q51', id: 'chem-352', key: 'B',
  stemWas: 'E1 elimination shares which feature with SN1?',
  optionsWere: ['Both require a strong base', 'Both proceed via a carbocation intermediate', 'Both give inversion of configuration', 'Both follow second-order kinetics'],
  feedback: {
    C: 'Backside inversion is characteristic of SN2. An SN1 carbocation can be attacked from either face, giving retention and inversion products, but they need not occur in an exactly 1:1 ratio. E1 instead forms an alkene.'
  },
  points: [
    'E1 and SN1 share a carbocation intermediate and often compete.',
    'SN1 captures the carbocation with a nucleophile; E1 removes a β-proton to form an alkene.',
    'In their simple rate laws, the unimolecular ionization step gives rate = k[substrate].'
  ],
  keep: ['Neither E1 nor SN1 requires a strong base', 'Both E1 and SN1 follow first-order kinetics',
         'Both E1 and SN1 reactions begin with the same rate-determining step'],
  gone: ['leading to racemization (mixture of retention and inversion)',
         'Chemical structure determines chemical properties - understanding structure allows prediction of reactivity and behavior.'] },

{ q: 'Q52', id: 'chem-353', key: 'C',
  stemWas: 'Which of the following is a copolymer?',
  optionsWere: ['Polyethylene', 'Polystyrene', 'Styrene-butadiene rubber (SBR)', 'Polyvinyl chloride'],
  pointsOnly: true,
  points: [
    'A copolymer contains units derived from more than one monomer type.',
    'Styrene-butadiene rubber combines styrene and 1,3-butadiene units.',
    'Compare this with the simple homopolymers polystyrene from styrene and PVC from vinyl chloride.'
  ],
  keep: ['A copolymer is formed from two or more different monomers', 'Polyvinyl chloride (PVC) is a homopolymer'],
  gone: ['Chemical structure determines chemical properties - understanding structure allows prediction of reactivity and behavior.'] },

{ q: 'Q53', id: 'chem-354', key: 'B',
  stemWas: 'PET (polyethylene terephthalate) is formed by condensation of ethylene glycol and terephthalic acid. The linkage between monomers is:',
  optionsWere: ['An amide bond', 'An ester bond', 'An ether bond', 'A glycosidic bond'],
  feedback: {
    D: "An O-glycosidic bond connects a sugar's anomeric carbon through oxygen to another group, which may be another sugar. It has acetal or ketal character rather than the ester carbonyl linkage found in PET."
  },
  points: [
    'PET is a polyester formed from a diol and a dicarboxylic acid.',
    'Its connecting ester group contains –C(=O)–O–.',
    "Nylon's amide linkages and carbohydrates' glycosidic linkages are chemically different from PET's ester linkages."
  ],
  keep: ['Amide bonds (–CONH–) form between a carboxylic acid and an amine, as in nylon', 'PET is a polyester'],
  gone: ['Glycosidic bonds are specific to carbohydrate chemistry',
         'glycosidic bonds are hemiacetal/acetal linkages, structurally different from esters',
         'Chemical structure determines chemical properties - understanding structure allows prediction of reactivity and behavior.'] },

{ q: 'Q54', id: 'chem-355', key: 'B',
  stemWas: 'Which factor most strongly favors SN2 over E2 when treating a primary alkyl halide with a base/nucleophile?',
  optionsWere: ['Using a strong, bulky base like tert-butoxide', 'Using a strong, unhindered nucleophile like CH₃O⁻', 'Increasing the temperature', 'Using a polar protic solvent'],
  stem: 'For an unhindered primary alkyl halide that has a β-hydrogen, which choice most directly favors SN2 rather than E2?',
  main: 'A small nucleophile such as methoxide can approach an unhindered primary carbon for backside SN2 attack. A bulky strong base more readily favors β-hydrogen removal because its approach to that carbon is hindered. Solvent and temperature also influence the competition, but a protic solvent does not automatically mean an E2 reaction.',
  feedback: {
    A: 'tert-Butoxide is a bulky strong base. Its size hinders backside attack at carbon and often favors β-hydrogen abstraction, making it a less suitable choice for promoting SN2 over E2 here.',
    C: 'Heating often increases the proportion of elimination under common substitution/elimination conditions. It is not a direct way to favor SN2; the precise product ratio depends on the substrate, reagent and solvent.',
    D: 'Polar protic solvents hydrogen-bond to anionic nucleophiles such as methoxide, often reducing their SN2 reactivity. Polar aprotic solvents commonly favor their reactivity by solvating them differently, not by leaving them completely unsolvated.'
  },
  points: [
    'An unhindered primary carbon is accessible to backside SN2 attack.',
    'Bulky strong bases often favor E2 when a suitable β-hydrogen is available.',
    'Predict the competing pathways from substrate, reagent and conditions together; no solvent label alone guarantees E2.'
  ],
  gone: ['Higher temperature and polar protic solvents also tend to favor elimination',
         'Elimination has a higher activation entropy (more disorder in the transition state',
         'but leave the nucleophilic anion free and reactive',
         'Chemical structure determines chemical properties - understanding structure allows prediction of reactivity and behavior.'] },

{ q: 'Q55', id: 'chem-356', key: 'C',
  stemWas: 'Vulcanization of rubber involves cross-linking polymer chains with:',
  optionsWere: ['Oxygen', 'Nitrogen', 'Sulfur', 'Chlorine'],
  stem: 'Traditional vulcanization of natural rubber forms cross-links between polymer chains using which element?',
  main: "Traditional vulcanization uses sulfur to form bridges between polyisoprene chains. The bridges can contain one, two or several sulfur atoms, and often involve allylic positions next to double bonds. The cross-links reduce chain slippage and improve the rubber's mechanical properties.",
  feedback: {
    A: 'Oxygen is not the element forming the characteristic sulfur bridges in this process. Oxygen exposure can cause oxidative aging of rubber, which is a different phenomenon from the traditional vulcanization asked about here.',
    B: 'Sulfur forms the characteristic bridges in traditional vulcanization. Some processing additives may contain nitrogen, but that does not make nitrogen the answer to the cross-linking-element question.',
    D: 'Chlorine can occur in polymers such as chloroprene rubber, but it is not the element forming the sulfur bridges in traditional natural-rubber vulcanization.'
  },
  points: [
    'Traditional natural-rubber vulcanization uses sulfur cross-links between chains.',
    'These bridges can contain one or more sulfur atoms; they are not all disulfides.',
    'Cross-linking restricts chain slippage and changes elasticity and hardness.'
  ],
  gone: ['which forms cross-links (–S–S– or –Sₓ–) between polymer chains at the double bond positions',
         'Nitrogen is not used in vulcanization',
         'sulfur, which forms disulfide bridges that give rubber its characteristic elasticity',
         'Chemical structure determines chemical properties - understanding structure allows prediction of reactivity and behavior.'] },

{ q: 'Q56', id: 'chem-357', key: 'B',
  stemWas: 'The conversion of a primary alcohol to a carboxylic acid involves:',
  optionsWere: ['Reduction', 'Oxidation', 'Hydrolysis', 'Dehydration'],
  main: 'Oxidation of a primary alcohol to a carboxylic acid proceeds through the aldehyde oxidation level: RCH₂OH → RCHO → RCOOH. With R representing an alkyl group, the oxidation state of the reacting carbon rises from −1 to +1 to +3. Suitable strong oxidants under aqueous conditions can carry out both stages in one reaction vessel.',
  feedback: {
    A: 'Reduction lowers oxidation state. Here the reacting carbon gains bonds to oxygen and loses bonds to hydrogen, so its oxidation state increases: this is oxidation.',
    C: 'Hydrolysis cleaves a bond using water, as in ester hydrolysis. Alcohol-to-acid conversion instead changes oxidation state and proceeds through an aldehyde level; carrying it out in one vessel does not make it a single elementary step.',
    D: 'Alcohol dehydration removes water and, under suitable elimination conditions, can form an alkene. It does not explain the increased oxidation state required to form a carboxylic acid.'
  },
  points: [
    'Primary alcohol oxidation can proceed through an aldehyde to a carboxylic acid.',
    'More C–O bonds and fewer C–H bonds generally mean oxidation of the carbon involved.',
    'Reagent and conditions determine whether oxidation stops at the aldehyde or continues to the acid.'
  ],
  gone: ['Reduction of a primary alcohol would instead produce an alkane (R–CH₃)',
         'Strong oxidizing agents like KMnO₄ or CrO₃ can accomplish this in one step',
         'Chemical structure determines chemical properties - understanding structure allows prediction of reactivity and behavior.'] },

{ q: 'Q57', id: 'chem-358', key: 'C',
  stemWas: 'Conversion of a carboxylic acid to an acid chloride is best accomplished using:',
  optionsWere: ['HCl', 'NaCl', 'SOCl₂ (thionyl chloride)', 'Cl₂/UV light'],
  pointsOnly: true,
  points: [
    'SOCl₂ converts a carboxylic acid into an acid chloride.',
    "The reaction replaces the acid's –OH with –Cl and produces SO₂ and HCl.",
    'Activation of the carboxyl group is needed; ordinary chloride salt alone is not the equivalent of thionyl chloride.'
  ],
  keep: ['Thionyl chloride (SOCl₂) reacts with carboxylic acids to give acid chlorides', 'NaCl is a stable ionic salt'],
  gone: ['Chemical structure determines chemical properties - understanding structure allows prediction of reactivity and behavior.'] },

{ q: 'Q58', id: 'chem-359', key: 'B',
  stemWas: 'Which functional group transformation occurs when an alkene reacts with H₂ over a Pd/C catalyst?',
  optionsWere: ['Oxidation to an epoxide', 'Reduction to an alkane', 'Isomerization to a cycloalkane', 'Halogenation'],
  fbEdits: [
    ['A', 'Epoxide formation from an alkene requires a peracid (like mCPBA) or a peroxide, not H₂ and Pd/C.',
     'Alkene epoxidation commonly uses a peracid such as mCPBA; some peroxide methods require an appropriate catalyst or other suitable conditions.']
  ],
  points: [
    'H₂ with Pd/C reduces a simple C=C bond to C–C by adding hydrogen.',
    'Catalytic hydrogenation gives syn delivery of hydrogen at the metal surface.',
    'Hydrogenation and epoxidation use different reagents and make different products.'
  ],
  keep: ['Catalytic hydrogenation (H₂/Pd, Pt, or Ni) adds H₂ across the double bond in a syn fashion',
         'Isomerization to a cycloalkane would require forming a new C–C bond',
         '<div style="text-align:center;margin:12px 0"></div>'],
  gone: ['requires a peracid (like mCPBA) or a peroxide, not H₂ and Pd/C',
         'Chemical structure determines chemical properties - understanding structure allows prediction of reactivity and behavior.'] },

{ q: 'Q59', id: 'chem-360', key: 'B',
  stemWas: 'A Wittig reaction converts a ketone or aldehyde into:',
  optionsWere: ['An alcohol', 'An alkene', 'An amine', 'An ester'],
  main: 'The Wittig reaction joins the carbonyl carbon of an aldehyde or ketone to the carbon of a phosphorus ylide, forming a C=C bond. With a triphenylphosphorus ylide such as Ph₃P=CHR, the other product is triphenylphosphine oxide, Ph₃P=O. This controls where the new double bond forms, although its E/Z outcome depends on the reactants and conditions and may be a mixture.',
  feedback: {
    A: 'Reagents such as NaBH₄ reduce aldehydes and ketones to alcohols. A Wittig ylide instead supplies a carbon that becomes double-bonded to the original carbonyl carbon, producing an alkene.',
    D: 'The Wittig reaction makes an alkene, not an ester. An ester retains a carbonyl and has an –OR group attached to that carbonyl carbon; Wittig replaces the carbonyl oxygen with the ylide-derived carbon in a new C=C bond.'
  },
  points: [
    'A phosphorus ylide converts an aldehyde or ketone C=O into a new C=C bond.',
    'One alkene carbon comes from the carbonyl compound and the other from the ylide.',
    'Control of double-bond position does not guarantee a single E/Z stereoisomer.'
  ],
  keep: ['Amines are produced by reductive amination of ketones/aldehydes'],
  gone: ["The Wittig reaction uses a phosphonium ylide (R₃P=CR'₂)",
         'unlike elimination reactions which may give mixtures',
         'Ester formation from a carbonyl requires an oxidation step (like Baeyer–Villiger oxidation for ketones)',
         'Chemical structure determines chemical properties - understanding structure allows prediction of reactivity and behavior.'] },

{ q: 'Q60', id: 'chem-361', key: 'A',
  stemWas: 'Beckmann rearrangement of an oxime produces:',
  optionsWere: ['An amide', 'A nitrile', 'An amine', 'An imine'],
  stem: 'The classic Beckmann rearrangement of a ketoxime produces which functional group?',
  main: 'In the Beckmann rearrangement, a ketoxime is converted into an amide after activation of its –OH group. The group anti to the activated leaving group migrates from carbon to nitrogen as the N–O bond breaks; reaction with water then gives the amide. A cyclic ketoxime can undergo ring expansion to a lactam, as in cyclohexanone oxime forming caprolactam for nylon-6 production.',
  feedback: {
    C: 'Amines can be obtained by reduction of suitable nitrogen-containing compounds, but that is not this rearrangement. The Beckmann product has a carbonyl bonded to nitrogen, which identifies it as an amide.',
    D: 'An oxime contains C=N–OH. Its Beckmann product instead contains the amide linkage C(=O)–N; the transformation does not simply produce an ordinary imine.'
  },
  points: [
    'The classic ketoxime Beckmann rearrangement gives an amide.',
    'The group anti to the activated leaving group migrates to nitrogen during rearrangement.',
    'Ring expansion of cyclohexanone oxime gives caprolactam, used to produce nylon-6.'
  ],
  keep: ['can be formed by dehydration of primary amides or aldoximes'],
  gone: ['The Beckmann rearrangement is an acid-catalyzed conversion of an oxime (R₁R₂C=NOH) to an amide',
         'an oxime is a special type of imine', 'departure of water, 1,2-shift of the anti-periplanar group',
         'Chemical structure determines chemical properties - understanding structure allows prediction of reactivity and behavior.'] }

];
