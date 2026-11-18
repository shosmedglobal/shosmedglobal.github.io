/* Chemistry batch 6 edits, Q11-Q20 (chem-312..chem-321).
   Q16-Q20 are the first of the 45 items whose generic three-point block is
   replaced outright with the review's question-specific set. */
'use strict';
module.exports = [

{ q: 'Q11', id: 'chem-312', key: 'C',
  stemWas: 'Lactose is a reducing sugar because:',
  optionsWere: ['It contains fructose', 'It has a free anomeric carbon on the galactose unit', 'It has a free anomeric carbon on the glucose unit', 'Both anomeric carbons are free'],
  feedback: {
    D: "Both anomeric carbons are not free in lactose. Galactose C1 participates in the β(1→4) linkage, while glucose C1 retains a free hemiacetal group and can open to the aldehyde form. That glucose end accounts for lactose's reducing behavior."
  },
  pointEdits: [
    [1, 'Lactose is reducing because its glucose unit retains a free hemiacetal group that can open to an aldehyde.'],
    [4, 'Common free monosaccharides test as reducing sugars; fructose also reacts because alkaline conditions allow conversion to aldoses.'],
    [5, "Benedict's and Fehling's tests detect reduction of copper(II); they are not specific tests for glucose or for an exposed aldehyde in the starting structure."]
  ],
  keep: ['Lactose contains galactose and glucose, not fructose', 'Sucrose is the contrasting case'],
  gone: ['If both anomeric carbons were free, the two monosaccharides would not be bonded together at all',
         '<li>A reducing sugar has a free anomeric carbon that can open to an aldehyde and then be oxidised.</li>',
         "<li>Benedict's and Fehling's tests detect exactly this free, oxidisable carbonyl group.</li>"] },

{ q: 'Q12', id: 'chem-313', key: 'B',
  stemWas: 'D-glucose and D-mannose are:',
  optionsWere: ['Enantiomers', 'Epimers differing at C-2', 'Anomers', 'Identical compounds'],
  feedback: {
    A: 'D-glucose and L-glucose are enantiomers: their corresponding stereocenters all have opposite configurations. D-glucose and D-mannose instead differ only at C2 and are not mirror images, so they are epimers.'
  },
  pointEdits: [
    [4, 'Epimers are different compounds, and enzymes can distinguish their different configurations.'],
    [5, 'Anomers are a special case of epimers: their configuration differs specifically at the anomeric carbon.']
  ],
  keep: ['Anomers are cyclic sugar forms that differ specifically at the anomeric carbon',
         '<li>D-glucose and D-mannose differ only at C2; D-glucose and D-galactose differ only at C4.</li>'],
  gone: ['<p><strong>A. Enantiomers:</strong> Enantiomers would differ at every stereocenter (d-glucose vs.</p>',
         '<li>Because epimers are diastereomers, they are genuinely different compounds with different properties, handled by different enzymes.</li>',
         '<li>Epimerases interconvert them, which is how dietary galactose is converted for entry into glycolysis.</li>'] },

{ q: 'Q13', id: 'chem-314', key: 'B',
  stemWas: 'Mutarotation is the process by which:',
  optionsWere: ['A sugar undergoes hydrolysis', 'The optical rotation of a freshly dissolved sugar changes over time until equilibrium between anomers is reached', 'A sugar loses water', 'A polysaccharide breaks down'],
  fbEdits: [
    ['A', 'anomeric forms of the same monosaccharide through the open-chain intermediate',
     'anomeric forms of the same reducing sugar through the open-chain intermediate']
  ],
  pointEdits: [
    [4, 'In the preferred chair of D-glucopyranose, the β-anomer has an equatorial anomeric hydroxyl, helping explain its greater abundance in water.']
  ],
  keep: ['approximately 36% α and 64% β for D-glucose at 25°C',
         '<li>At equilibrium D-glucose is roughly 64% β and 36% α, with only a trace present as the open chain.</li>'],
  gone: ['anomeric forms of the same monosaccharide',
         '<li>β predominates because its anomeric hydroxyl occupies the more stable equatorial position.</li>'] },

{ q: 'Q14', id: 'chem-315', key: 'B',
  stemWas: 'Which test can detect reducing sugars?',
  optionsWere: ['Biuret test', "Benedict's test", 'Ninhydrin test', 'Xanthoproteic test'],
  main: "On heating, reducing sugars reduce the blue Cu²⁺ in alkaline Benedict's reagent to copper(I) oxide, Cu₂O. Depending on the amount present, the result can range from green or yellow to orange or brick-red precipitate. Biuret, ninhydrin and xanthoproteic tests are used for different features of amino acids or proteins.",
  fbEdits: [
    ['C', 'Ninhydrin reacts with the α-amino group to produce a purple-blue color known as Ruhemann’s purple.',
     'Most common α-amino acids give a purple-blue product, but proline, which has a secondary amino group, gives a yellow product.']
  ],
  feedback: {
    D: 'The xanthoproteic test detects readily nitrated aromatic groups, especially those in tyrosine and tryptophan. Phenylalanine gives little or no color under usual test conditions. The test is used for amino acids or proteins, rather than to identify reducing sugars.'
  },
  points: [
    "Benedict's reagent detects reducing activity through Cu²⁺ reduction and formation of Cu₂O.",
    'The observed color depends on the amount of reducing material and the test conditions; a positive result need not be brick-red.',
    'Glucose, fructose, lactose and maltose react; intact sucrose ordinarily does not.',
    'Fructose reacts after alkaline isomerization to aldoses, so an ordinary ketone group alone does not explain the result.',
    "Benedict's test is not glucose-specific; iodine is the usual simple identification test for starch."
  ],
  keep: ['The biuret test detects proteins (peptide bonds), not sugars', 'It is widely used in forensics'],
  gone: ['The xanthoproteic test specifically detects aromatic amino acids (tyrosine, tryptophan, phenylalanine)',
         'Reducing sugars (which have a free or potentially free anomeric carbon) reduce Cu²⁺ to Cu₂O (brick-red precipitate)',
         '<li>A positive result is a brick-red precipitate of copper(I) oxide'] },

{ q: 'Q15', id: 'chem-316', key: 'A',
  stemWas: 'Fructose adopts predominantly which ring form in solution?',
  optionsWere: ['Pyranose (6-membered ring)', 'Furanose (5-membered ring)', 'Open-chain form', 'Both pyranose and furanose in equal amounts'],
  stem: 'At equilibrium in dilute aqueous solution near room temperature, free D-fructose predominantly adopts which ring size?',
  main: 'Under these conditions, the largest component is β-D-fructopyranose, approximately 70% of the mixture. Its six-membered ring forms when the C6 hydroxyl reacts with the C2 carbonyl to make a hemiketal. Smaller amounts of furanose forms and other forms are also present. The distribution depends on temperature and solvent; fructose within sucrose is instead locked into a furanose structure.',
  feedback: {
    B: 'Five-membered fructofuranose rings are present in the aqueous equilibrium, and fructose has this ring size in sucrose. They are not the predominant free-fructose forms under the conditions in the stem.',
    C: 'Only a small fraction is open-chain under these conditions. Most free fructose molecules are cyclic hemiketals; the open-chain form provides a route for interconversion between them.',
    D: 'The ring forms do not occur in equal amounts. Near room temperature in dilute water, β-D-fructopyranose alone makes up roughly 70%; the proportions change with conditions.'
  },
  pointEdits: [
    [1, 'Free D-fructose in dilute water near room temperature is predominantly β-D-fructopyranose, with a six-membered ring.'],
    [2, 'The equilibrium proportions depend on temperature and solvent; one ring size is not universally preferred under every condition.']
  ],
  keep: ['<li>Fructose is often pictured as a furanose because that is the form locked in place within sucrose',
         '<li>The ring-size names describe the ring itself: pyranose is six-membered and furanose five-membered, after pyran and furan.</li>'],
  gone: ['the thermodynamically more stable pyranose form predominates',
         '<li>The six-membered pyranose ring is thermodynamically more stable than the five-membered furanose form.</li>',
         'Sugars strongly favor cyclic forms because ring closure to hemiacetals or hemiketals is thermodynamically favorable'] },

{ q: 'Q16', id: 'chem-317', key: 'B',
  stemWas: 'Saturated fatty acids differ from unsaturated fatty acids in that they:',
  optionsWere: ['Have shorter carbon chains', 'Contain no carbon-carbon double bonds', 'Are always liquid at room temperature', 'Are derived from plants only'],
  main: 'A saturated fatty acid has no carbon-carbon double bonds. For comparable chain lengths, a saturated chain usually packs more closely and has a higher melting point than a cis-unsaturated chain. The melting point also depends on chain length and other structural features, so saturated does not mean always solid.',
  feedback: {
    C: 'Saturated fatty acids are not always liquid or always solid at room temperature. Longer saturated chains often have relatively high melting points, whereas shorter ones can be liquid. Butter and oils are mixtures composed mainly of triacylglycerols, not simply samples of individual free fatty acids.'
  },
  points: [
    'Saturated means no C=C bonds; monounsaturated means one and polyunsaturated means two or more.',
    'Cis double bonds bend the chain and usually lower melting point compared with a saturated chain of similar length.',
    'Chain length and double-bond geometry also matter; physical state cannot be inferred from saturation alone.'
  ],
  keep: ['Chain length is independent of saturation', 'Both plants and animals produce saturated and unsaturated fatty acids'],
  gone: ['resulting in higher melting points (solid at room temperature, e.g., stearic acid)',
         'Saturated fatty acids are typically solid at room temperature (like butter and animal fats)',
         'Lipids are hydrophobic molecules that include fats, phospholipids, steroids, and waxes'] },

{ q: 'Q17', id: 'chem-318', key: 'C',
  stemWas: 'A triglyceride is formed by esterification of:',
  optionsWere: ['Glycerol with one fatty acid', 'Glycerol with two fatty acids', 'Glycerol with three fatty acids', 'Sphingosine with three fatty acids'],
  mainEdits: [
    ['A triglyceride (triacylglycerol) is a triester formed when all three hydroxyl groups of glycerol react with fatty acids (which may be the same or different). Three molecules of water are released.',
     'A triglyceride, or triacylglycerol, has all three hydroxyl groups of glycerol esterified with fatty acid residues, which may be identical or different. In the formal reaction between glycerol and three free fatty acids, three water molecules are released.']
  ],
  points: [
    'Glycerol has three hydroxyl groups, allowing formation of three ester bonds.',
    'Mono-, di- and triacylglycerols contain one, two and three fatty acyl groups, respectively.',
    'Triacylglycerols are major energy-storage lipids; their three fatty acid residues need not be the same.'
  ],
  keep: ['Triglycerides are the main form of fat storage in the body',
         'Esterification of glycerol with only one fatty acid produces a monoglyceride',
         'Sphingosine is the backbone of sphingolipids'],
  gone: ['is a triester formed when all three hydroxyl groups of glycerol react with fatty acids',
         'Lipids are hydrophobic molecules that include fats, phospholipids, steroids, and waxes'] },

{ q: 'Q18', id: 'chem-319', key: 'B',
  stemWas: 'Saponification of a fat produces:',
  optionsWere: ['Fatty acids and glycerol', 'Soap (fatty acid salts) and glycerol', 'Fatty acids and ethanol', 'Fatty acid esters and water'],
  main: 'Saponification is base-promoted hydrolysis of a triacylglycerol with NaOH or KOH. It yields glycerol and fatty acid carboxylate salts, which are soaps. Three hydroxide ions are consumed per triacylglycerol overall. For a triacylglycerol with identical acyl groups: triacylglycerol + 3NaOH → glycerol + 3RCOONa.',
  feedback: {
    A: 'Acidic hydrolysis gives glycerol and free fatty acids. Under saponification conditions, the products are instead carboxylate salts because the reaction occurs in base and consumes hydroxide overall.',
    D: 'The ester bonds are being broken, not formed. With aqueous NaOH, the overall reaction consumes hydroxide and yields glycerol plus sodium carboxylates; ester and water are not the products.'
  },
  points: [
    'A triacylglycerol contains three ester bonds that can be hydrolyzed.',
    'Saponification produces glycerol and fatty acid salts, rather than free fatty acids under the basic reaction conditions.',
    'Hydroxide is consumed overall: saponification is base-promoted, not simply catalyzed by a regenerated base.'
  ],
  keep: ['Ethanol is not a product of fat saponification'],
  gone: ['Saponification is the base-catalyzed hydrolysis of a triglyceride',
         'Water is a reactant in saponification (hydrolysis), not a product',
         'Hydrolysis of a fat under acidic conditions produces free fatty acids and glycerol. Saponification is base-catalyzed hydrolysis',
         'Lipids are hydrophobic molecules that include fats, phospholipids, steroids, and waxes'] },

{ q: 'Q19', id: 'chem-320', key: 'C',
  stemWas: 'Which lipid is the basic structural unit of cell membranes?',
  optionsWere: ['Triglyceride', 'Cholesterol', 'Phospholipid', 'Wax'],
  stem: 'Which lipid class forms the main bilayer framework of human cell membranes?',
  main: 'Phospholipids have a hydrophilic phosphate-containing region and hydrophobic regions that favor bilayer formation in water. Many are glycerophospholipids, with glycerol and two fatty acyl chains. Sphingomyelin is also a phospholipid, but has a sphingosine-based backbone. Cholesterol and proteins are important additional membrane components.',
  fbEdits: [
    ['A', 'They are fully hydrophobic (three nonpolar fatty acid tails, no polar head group)',
     'They are predominantly hydrophobic (three nonpolar fatty acid tails, no polar head group)'],
    ['D', 'Waxes are esters of long-chain fatty acids with long-chain alcohols. They form waterproof coatings on surfaces (leaf cuticles, bird feathers, ear canals) but are not components of cell membranes.',
     'Waxes are esters of long-chain fatty acids and long-chain alcohols. They commonly provide protective surface coatings, rather than forming the phospholipid bilayer of human cell membranes.']
  ],
  points: [
    'Amphipathic lipids contain both water-attracting and water-avoiding regions.',
    'In a bilayer, polar heads face water and hydrophobic chains face the interior.',
    'Glycerophospholipids and sphingomyelin illustrate that phospholipids need not share the same backbone.'
  ],
  keep: ['Cholesterol is an important membrane component that modulates fluidity',
         'Their extreme hydrophobicity makes them unsuitable for forming the dynamic bilayer structure'],
  gone: ['They have a glycerol backbone, two fatty acid chains (hydrophobic tails), and a phosphate-containing head group (hydrophilic)',
         'They are fully hydrophobic', 'Lipids are hydrophobic molecules that include fats, phospholipids, steroids, and waxes'] },

{ q: 'Q20', id: 'chem-321', key: 'C',
  stemWas: 'Cholesterol belongs to which class of lipids?',
  optionsWere: ['Triglycerides', 'Phospholipids', 'Steroids', 'Waxes'],
  feedback: {
    B: 'Phospholipids have phosphate-containing polar heads; many use glycerol, whereas sphingomyelin uses a different backbone. Cholesterol has no phosphate head and instead has the characteristic four fused rings of a steroid.'
  },
  fbEdits: [
    ['D', 'is built around the planar four-ring steroid nucleus', 'is built around the rigid, puckered four-ring steroid nucleus']
  ],
  points: [
    'The steroid skeleton consists of three fused six-membered rings and one five-membered ring.',
    'Cholesterol is a sterol: a steroid with a hydroxyl group.',
    'Cholesterol contributes to animal membranes and is a precursor of steroid hormones and bile acids.'
  ],
  keep: ['Triglycerides are esters of glycerol with three fatty acids', 'Waxes are esters formed from long-chain fatty acids and long-chain alcohols'],
  gone: ['Phospholipids have a glycerol backbone, two fatty acid tails, and a phosphate-containing head group. Cholesterol lacks a glycerol backbone entirely',
         'planar four-ring steroid nucleus', 'Lipids are hydrophobic molecules that include fats, phospholipids, steroids, and waxes'] }

];
