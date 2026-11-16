/**
 * Biology review batch 10, displayed Q11-Q20 (bio-548 .. bio-556, bio-558).
 * Every item in this range is edited; Q12 and Q13 are two of the three major
 * rewrites.
 */
'use strict';

const Q12_EXPLANATION =
  '<h4>Correct Answer: Manufacture of Oldowan stone tools</h4>' +
  '<p>Homo habilis was named "handy man" because of its traditional association with Oldowan tools. These include cores and sharp flakes made by striking stone. This association does not establish H. habilis as the first or only toolmaker: stone-tool evidence predates its known fossil record, and the makers of the earliest tools remain uncertain.</p>' +
  '<h4>Why the other choices are wrong:</h4>' +
  '<p><strong>A. The first evidence of controlled fire use:</strong> Controlled fire use is not the association behind the name Homo habilis. Evidence for early fire use and the identity of the hominins responsible must be evaluated separately from stone-tool manufacture.</p>' +
  '<p><strong>B. The first migration out of Africa:</strong> Early Homo fossils document dispersal beyond Africa, but that is not the basis of the name Homo habilis. The name refers to the species\' traditional association with making tools.</p>' +
  '<p><strong>C. The first symbolic art and burial rituals:</strong> Symbolic art and deliberate burial are different archaeological behaviors. They are not the discoveries that led to the name Homo habilis, and they should not be combined into one confidently dated "first" event.</p>' +
  '<h4>Key Educational Points:</h4>' +
  '<ul><li>Homo habilis means "handy man" and is traditionally associated with Oldowan tools</li>' +
  '<li>An association with tools does not prove that a species invented them or was their only maker</li></ul>' +
  '<p class=\'exp-key\'>Bottom Line: Homo habilis is traditionally associated with Oldowan toolmaking, not securely identified as the first stone-tool maker.</p>';

const Q13_EXPLANATION =
  '<h4>Correct Answer: Its average brain size was about 1400 cm3, matching that of modern humans</h4>' +
  '<p>Homo erectus generally had a smaller average cranial capacity than modern Homo sapiens, although individual fossils vary widely. About 1400 cm3 is therefore not an appropriate average for H. erectus. This species had more modern human-like body proportions and is associated with dispersal beyond Africa and, in some populations, Acheulean hand axes.</p>' +
  '<h4>Why the other choices are wrong:</h4>' +
  '<p><strong>A. Fossil evidence shows dispersal beyond Africa:</strong> This is a supported characteristic. Fossils attributed to H. erectus occur outside Africa, including in Asia. This does not require assigning every early European fossil to the same species.</p>' +
  '<p><strong>C. Use of Acheulean hand axes:</strong> Acheulean hand axes are associated with some H. erectus populations. Tool traditions varied by place and time, so not every population used the same toolkit.</p>' +
  '<p><strong>D. Its body proportions included relatively long legs and shorter arms than earlier hominins:</strong> Relatively long legs and shorter arms distinguish its body proportions from those of many earlier hominins and supported efficient movement on the ground.</p>' +
  '<h4>Key Educational Points:</h4>' +
  '<ul><li>Homo erectus had a smaller average brain size than modern humans, with substantial variation among fossils</li>' +
  '<li>Its important features include more modern limb proportions, dispersal beyond Africa and associations with Acheulean technology</li></ul>' +
  '<p class=\'exp-key\'>Bottom Line: An average brain size of about 1400 cm3 is not characteristic of Homo erectus.</p>';

module.exports = [
  // ---- Q11  bio-548  Lucy ------------------------------------------------
  {
    q: 11, id: 'bio-548', expectLetter: 'C',
    explanation: [
      ['<p><strong>A. Homo habilis:</strong> Homo habilis ("handy man") appeared approximately 2.4-1.5 million years ago, over 800,000 years after Lucy. H. habilis had a larger brain (~600-700 cm3) and is associated with the first stone tools (Oldowan industry).</p>',
        '<p><strong>A. Homo habilis:</strong> Homo habilis ("handy man") appeared approximately 2.4-1.5 million years ago, well after Lucy, and had a larger brain. It is traditionally associated with Oldowan stone tools, but it is not established as the first stone-tool maker. Lucy belongs to an earlier australopith species.</p>'],
      ['<p><strong>B. Homo erectus:</strong> Homo erectus appeared approximately 1.9 million years ago and had an even larger brain (~900-1100 cm3). H. erectus was the first hominin to migrate out of Africa and is associated with Acheulean hand axes and controlled use of fire.</p>',
        '<p><strong>B. Homo erectus:</strong> Homo erectus lived later and is associated with dispersal beyond Africa and more modern human-like body proportions. It is not Lucy\'s species.</p>'],
      ['<li>Australopithecus afarensis: ~3.9-2.9 MYA, bipedal, small brain, no stone tools</li>',
        '<li>Australopithecus afarensis combined habitual bipedalism with a relatively small brain and adaptations for climbing</li>']
    ],
    keepHeadings: ['<strong>A. Homo habilis:</strong>', '<strong>B. Homo erectus:</strong>'],
    gone: ['associated with the first stone tools (Oldowan industry)', 'first hominin to migrate out of Africa',
      'bipedal, small brain, no stone tools', 'over 800,000 years after Lucy']
  },

  // ---- Q12  bio-549  Homo habilis and tools (MAJOR REWRITE) --------------
  {
    q: 12, id: 'bio-549', expectLetter: 'D',
    stemFull: 'The name Homo habilis, meaning "handy man," reflects its traditional association with which activity?',
    optionFull: [[3, 'Manufacture of Oldowan stone tools']],
    explanationFull: Q12_EXPLANATION,
    gone: ['The first known stone tool production (Oldowan tools)', 'the earliest known stone tools',
      'first tool-maker', 'earliest stone tool industry', 'marking a key milestone in human cognitive evolution',
      'Homo habilis is significant in the fossil record because']
  },

  // ---- Q13  bio-550  Homo erectus (MAJOR REWRITE) ------------------------
  {
    q: 13, id: 'bio-550', expectLetter: 'B',
    stemFull: 'Which statement about Homo erectus is incorrect?',
    optionFull: [
      [0, 'Fossil evidence shows dispersal beyond Africa'],
      [1, 'Its average brain size was about 1400 cm3, matching that of modern humans'],
      [3, 'Its body proportions included relatively long legs and shorter arms than earlier hominins']
    ],
    explanationFull: Q13_EXPLANATION,
    gone: ['Brain size comparable to modern Homo sapiens (~1400 cm3)', 'Evidence of controlled use of fire',
      'ranged from approximately 900 to 1100 cm3', 'Java Man', '790,000 years ago',
      'the longest-lived Homo species', 'Which of the following is NOT a characteristic']
  },

  // ---- Q14  bio-551  Neanderthal ancestry (option A) ---------------------
  {
    q: 14, id: 'bio-551', expectLetter: 'A',
    optionFull: [[0, 'Many people with ancestry outside Africa carry roughly 1-2% Neanderthal-derived DNA']],
    explanation: [
      ['<h4>Correct Answer: Most non-African modern human populations carry approximately 1-4% Neanderthal DNA</h4>',
        '<h4>Correct Answer: Many people with ancestry outside Africa carry roughly 1-2% Neanderthal-derived DNA</h4>'],
      ['<p>Genome sequencing of Neanderthal fossils revealed that interbreeding occurred between Neanderthals and anatomically modern humans after the latter migrated out of Africa. As a result, non-African modern human populations carry approximately 1-4% Neanderthal DNA. Sub-Saharan African populations generally lack this admixture because the interbreeding occurred after the out-of-Africa migration.</p>',
        '<p>Genome sequencing of Neanderthal fossils revealed that interbreeding occurred between Neanderthals and anatomically modern humans. That interbreeding contributed ancestry to present-day populations: many people with ancestry outside Africa carry roughly 1-2% Neanderthal-derived DNA, and the proportion varies among individuals and populations. Migration back into Africa and subsequent gene flow contributed Neanderthal-derived segments there as well, so continental labels should not be treated as genetically sealed categories.</p>'],
      ['However, brain shape differed, with Neanderthals having more elongated crania and modern humans having more globular brains.',
        'However, brain shape differed, with Neanderthals having more elongated crania and modern humans having more globular brains. A larger brain volume alone does not establish greater intelligence.'],
      ['<p><strong>D. Neanderthals were the direct ancestors of all modern humans:</strong> Neanderthals are not direct ancestors but rather a sister species that shared a common ancestor with H. sapiens approximately 500,000-700,000 years ago. They went extinct approximately 40,000 years ago.</p>',
        '<p><strong>D. Neanderthals were the direct ancestors of all modern humans:</strong> Neanderthals were not the sole direct ancestors of all modern humans. They were a related hominin lineage that contributed some ancestry through interbreeding, sharing a common ancestor with H. sapiens roughly 500,000-700,000 years ago.</p>'],
      ['<li>Interbreeding left 1-4% Neanderthal DNA in non-African populations</li>',
        '<li>Interbreeding contributed roughly 1-2% Neanderthal-derived DNA in many people with ancestry outside Africa, with the proportion varying between individuals and populations</li>'],
      ['<p class=\'exp-key\'>Bottom Line: Genetic evidence shows Neanderthals interbred with Homo sapiens, leaving 1-4% of Neanderthal DNA in most non-African populations today.</p>',
        '<p class=\'exp-key\'>Bottom Line: Genetic evidence shows Neanderthals interbred with Homo sapiens, contributing roughly 1-2% Neanderthal-derived DNA to many present-day people with ancestry outside Africa.</p>']
    ],
    keepHeadings: ['<strong>B. Neanderthals and modern humans never interbred:</strong>',
      '<strong>C. Neanderthals had significantly smaller brains:</strong>',
      '<strong>D. Neanderthals were the direct ancestors of all modern humans:</strong>'],
    gone: ['approximately 1-4% Neanderthal DNA', 'Sub-Saharan African populations generally lack this admixture',
      'not direct ancestors but rather a sister species', '1-4% Neanderthal DNA in non-African populations']
  },

  // ---- Q15  bio-552  early Homo sapiens (stem replaced) ------------------
  {
    q: 15, id: 'bio-552', expectLetter: 'C',
    stemFull: 'Fossils assigned to early Homo sapiens date to approximately:',
    explanation: [
      ['<p>Fossil evidence, particularly from Jebel Irhoud (Morocco) dated to approximately 300,000 years ago and Omo Kibish (Ethiopia) dated to approximately 195,000 years ago, indicates that anatomically modern Homo sapiens evolved in Africa around 300,000 years ago. This represents a revision from earlier estimates of ~200,000 years ago based on the Ethiopian fossils alone.</p>',
        '<p>Fossils from Jebel Irhoud in Morocco, dated to about 300,000 years ago, are assigned to early Homo sapiens. They combine relatively modern facial features with a more elongated braincase. The Omo I remains from Ethiopia are older than an overlying volcanic layer dated to approximately 233,000 years ago, which is a minimum age rather than an exact age for the individual. The origin of our species was an evolutionary process, not a precisely dated appearance of every modern anatomical feature at once.</p>'],
      ['<p><strong>D. 50,000 years ago in Europe:</strong> Approximately 50,000-70,000 years ago marks the major out-of-Africa migration of H. sapiens, not the species\' origin. H. sapiens had been in Africa for over 200,000 years before this migration.</p>',
        '<p><strong>D. 50,000 years ago in Europe:</strong> Approximately 50,000-70,000 years ago marks an important later expansion that contributed much of the ancestry of people outside Africa. It is neither the first appearance of our species nor the first possible dispersal beyond Africa.</p>'],
      ['<li>Major out-of-Africa migration occurred approximately 50,000-70,000 years ago</li>',
        '<li>An important later expansion around 50,000-70,000 years ago contributed much of the ancestry of people outside Africa</li>'],
      ['<p class=\'exp-key\'>Bottom Line: Anatomically modern Homo sapiens evolved in Africa approximately 300,000 years ago, with major dispersal out of Africa occurring ~50,000-70,000 years ago.</p>',
        '<p class=\'exp-key\'>Bottom Line: Early Homo sapiens fossils from Africa are about 300,000 years old; modern human traits developed over time.</p>']
    ],
    keepHeadings: ['<strong>D. 50,000 years ago in Europe:</strong>'],
    gone: ['The emergence of anatomically modern Homo sapiens is estimated', 'approximately 195,000 years ago',
      'marks the major out-of-Africa migration', 'Major out-of-Africa migration occurred']
  },

  // ---- Q16  bio-553  bipedalism ------------------------------------------
  {
    q: 16, id: 'bio-553', expectLetter: 'B',
    explanation: [
      ['and more energy-efficient long-distance travel compared to quadrupedal ape locomotion.</p>',
        'and more energy-efficient long-distance travel compared to quadrupedal ape locomotion. An advantage of a trait does not by itself establish why the trait first evolved.</p>'],
      ['<p><strong>A. Increased speed compared to quadrupedal locomotion:</strong> Bipedal humans are actually slower than many quadrupedal mammals of similar size in sprint speed. The advantage of bipedalism is energy efficiency during long-distance walking and endurance running, not top speed.</p>',
        '<p><strong>A. Increased speed compared to quadrupedal locomotion:</strong> Walking upright does not provide superior speed on every terrain, and bipedal humans are slower than many quadrupedal mammals of similar size in a sprint. The proposed advantages centre on efficient long-distance walking rather than top speed.</p>'],
      ['<p><strong>C. Eliminated the need for a large brain:</strong> Bipedalism did not eliminate the need for a large brain. In fact, the freeing of hands for tool use may have contributed to selection pressures that favored brain enlargement over time. Brain expansion occurred millions of years after bipedalism evolved.</p>',
        '<p><strong>C. Eliminated the need for a large brain:</strong> Bipedalism did not eliminate a need for brain function, nor did it require a modern human-sized brain. Early bipedal hominins already walked upright while retaining relatively small brains.</p>'],
      ['<p><strong>D. Better camouflage in forest environments:</strong> Bipedalism likely evolved in or near open savanna or woodland environments. Standing upright in a forest does not provide a camouflage advantage and may actually make an organism more visible.</p>',
        '<p><strong>D. Better camouflage in forest environments:</strong> Standing upright does not provide a camouflage advantage and may make an organism more visible. Early bipeds occupied a range of settings, including wooded ones, so a single open-savanna origin story is not established.</p>'],
      ['<li>Advantages: freed hands, energy-efficient travel, thermoregulation, improved sight lines</li>',
        '<li>Proposed additional advantages include energy-efficient travel, thermoregulation and improved sight lines</li>']
    ],
    keepHeadings: ['<strong>A. Increased speed compared to quadrupedal locomotion:</strong>',
      '<strong>C. Eliminated the need for a large brain:</strong>', '<strong>D. Better camouflage in forest environments:</strong>'],
    gone: ['endurance running, not top speed', 'likely evolved in or near open savanna',
      'Advantages: freed hands, energy-efficient travel', 'favored brain enlargement over time']
  },

  // ---- Q17  bio-554  average cranial capacity ----------------------------
  {
    q: 17, id: 'bio-554', expectLetter: 'D',
    explanation: [
      ['<p>Brain size increased progressively through hominin evolution: Australopithecus afarensis (~400-500 cm3), Homo habilis (~600-700 cm3), Homo erectus (~900-1100 cm3), Homo sapiens (~1350-1400 cm3). This represents an approximate tripling of brain volume over about 3 million years of evolution.</p>',
        '<p>Among these four taxa, the usual ordering of approximate average cranial capacity is Australopithecus afarensis, Homo habilis, Homo erectus, then Homo sapiens. There was substantial variation within taxa and overlap between some of their ranges. This comparison is not a claim that each species directly evolved into the next.</p>'],
      ['<p><strong>A. Homo sapiens, Homo erectus, Australopithecus, Homo habilis:</strong> This lists brain size in largely decreasing order and does not place the smallest-brained species first.</p>',
        '<p><strong>A. Homo sapiens, Homo erectus, Australopithecus, Homo habilis:</strong> This lists average brain size among the listed taxa in largely decreasing order and does not place the smallest-brained taxon first.</p>'],
      ['<p><strong>B. Homo habilis, Australopithecus, Homo sapiens, Homo erectus:</strong> This incorrectly places Australopithecus after Homo habilis and H. erectus after H. sapiens. Australopithecus had the smallest brain, and H. sapiens has the largest.</p>',
        '<p><strong>B. Homo habilis, Australopithecus, Homo sapiens, Homo erectus:</strong> This incorrectly places Australopithecus after Homo habilis and H. erectus after H. sapiens. Among the listed taxa, Australopithecus afarensis has the smallest average brain volume and H. sapiens the largest.</p>'],
      ['<p><strong>C. Homo erectus, Homo habilis, Australopithecus, Homo sapiens:</strong> This sequence does not represent increasing brain size. It places the larger-brained H. erectus before the smaller-brained H. habilis and Australopithecus.</p>',
        '<p><strong>C. Homo erectus, Homo habilis, Australopithecus, Homo sapiens:</strong> This sequence does not represent increasing average brain size among the listed taxa. It places H. erectus, with a larger average, before H. habilis and Australopithecus.</p>'],
      ['<li>Brain size roughly tripled from Australopithecus (~450 cm3) to Homo sapiens (~1400 cm3)</li>',
        '<li>Rough average brain volume rises from about 450 cm3 in Australopithecus afarensis to about 1350-1400 cm3 in Homo sapiens; these are approximate averages, not limits</li>'],
      ['<li>Brain enlargement correlates with tool sophistication and social complexity</li>',
        '<li>Brain volume alone does not measure intelligence or identify a toolmaker; evolution was branching, with several hominin species coexisting</li>'],
      ['<p class=\'exp-key\'>Bottom Line: Hominin brain size increased progressively from Australopithecus (~450 cm3) through H. habilis and H. erectus to H. sapiens (~1400 cm3).</p>',
        '<p class=\'exp-key\'>Bottom Line: Among these four taxa, the usual ordering of approximate average cranial capacity is Australopithecus afarensis, Homo habilis, Homo erectus, then Homo sapiens.</p>']
    ],
    keepHeadings: ['<strong>A. Homo sapiens, Homo erectus, Australopithecus, Homo habilis:</strong>',
      '<strong>B. Homo habilis, Australopithecus, Homo sapiens, Homo erectus:</strong>',
      '<strong>C. Homo erectus, Homo habilis, Australopithecus, Homo sapiens:</strong>'],
    gone: ['Brain size increased progressively through hominin evolution', '~600-700 cm3',
      'approximate tripling of brain volume', 'correlates with tool sophistication',
      'increased progressively from Australopithecus']
  },

  // ---- Q18  bio-555  tool chronology (stem replaced) ---------------------
  {
    q: 18, id: 'bio-555', expectLetter: 'C',
    stemFull: 'Considering their earliest appearances, which sequence orders these tool traditions and archaeological periods from oldest to most recent?',
    explanation: [
      ['<p>Stone tool industries progressed in sophistication: Oldowan (~2.6 MYA, simple flaked pebbles, H. habilis), Acheulean (~1.7 MYA, bifacial hand axes, H. erectus), Mousterian (~300,000-30,000 years ago, prepared-core technique, Neanderthals), Upper Paleolithic (~50,000-10,000 years ago, blade tools, bone tools, art, H. sapiens).</p>',
        '<p>Among the categories listed, Oldowan technology appeared first, followed by Acheulean, then Mousterian, and later the Upper Paleolithic. Oldowan tools include cores and flakes; Acheulean assemblages include bifacial hand axes; Mousterian assemblages commonly include prepared-core flake tools. The Upper Paleolithic is a broad archaeological period containing several traditions, often including blade and bone technologies. These categories overlap in time and vary geographically; they are not four exclusive stages assigned to four successive species.</p>'],
      ['<p><strong>A. Acheulean, Oldowan, Mousterian, Upper Paleolithic:</strong> This reverses the first two industries. Oldowan tools appeared approximately 900,000 years before Acheulean tools. Oldowan technology is simpler (basic flakes and choppers), while Acheulean represents a more sophisticated, standardized technology.</p>',
        '<p><strong>A. Acheulean, Oldowan, Mousterian, Upper Paleolithic:</strong> This reverses the first two categories: Oldowan technology precedes Acheulean.</p>'],
      ['<p><strong>B. Mousterian, Oldowan, Upper Paleolithic, Acheulean:</strong> This scrambles the chronological order entirely. The sequence should follow the progression from simplest and oldest to most complex and recent.</p>',
        '<p><strong>B. Mousterian, Oldowan, Upper Paleolithic, Acheulean:</strong> Mousterian is not the earliest of these categories, and Acheulean does not follow the Upper Paleolithic.</p>'],
      ['<p><strong>D. Upper Paleolithic, Mousterian, Acheulean, Oldowan:</strong> This lists the technologies in reverse chronological order, from most recent to oldest, rather than from oldest to most recent as the question asks.</p>',
        '<p><strong>D. Upper Paleolithic, Mousterian, Acheulean, Oldowan:</strong> This lists the categories in reverse chronological order, from most recent to oldest, rather than from oldest to most recent as the question asks.</p>'],
      ['<ul><li>Each tool industry reflects increased cognitive ability and planning</li>' +
        '<li>Tool technology progression tracks with brain size increase and species succession</li>' +
        '</ul>',
        '<ul><li>The order refers to earliest appearances, not an immediate worldwide replacement of one tradition by another</li>' +
        '<li>Tool traditions are not exclusive species labels: for example, Mousterian technology is associated with both Neanderthals and some early Homo sapiens</li></ul>'],
      ['<p class=\'exp-key\'>Bottom Line: Stone tool technology progressed from simple Oldowan flakes to sophisticated Upper Paleolithic blade tools over approximately 2.5 million years.</p>',
        '<p class=\'exp-key\'>Bottom Line: Among these categories: Oldowan → Acheulean → Mousterian → Upper Paleolithic.</p>']
    ],
    keepHeadings: ['<strong>A. Acheulean, Oldowan, Mousterian, Upper Paleolithic:</strong>',
      '<strong>B. Mousterian, Oldowan, Upper Paleolithic, Acheulean:</strong>',
      '<strong>D. Upper Paleolithic, Mousterian, Acheulean, Oldowan:</strong>'],
    gone: ['The progression of stone tool technology throughout hominin evolution followed a general sequence',
      'approximately 900,000 years before Acheulean', 'Each tool industry reflects increased cognitive ability',
      'tracks with brain size increase and species succession', 'progressed in sophistication']
  },

  // ---- Q19  bio-556  African origin (option C) ---------------------------
  {
    q: 19, id: 'bio-556', expectLetter: 'C',
    optionFull: [[2, 'Homo sapiens evolved in Africa and later spread to other continents, with some interbreeding with other hominin groups']],
    explanation: [
      ['<h4>Correct Answer: All modern humans descended from a single ancestral population that originated in Africa and subsequently migrated to other continents</h4>',
        '<h4>Correct Answer: Homo sapiens evolved in Africa and later spread to other continents, with some interbreeding with other hominin groups</h4>'],
      ['<p>The Out of Africa model (also called the Recent African Origin model) is supported by extensive genetic, fossil, and archaeological evidence. It proposes that anatomically modern Homo sapiens evolved in Africa approximately 300,000 years ago. A subset of this population then migrated out of Africa approximately 50,000-70,000 years ago, eventually replacing other archaic hominin populations (with some limited interbreeding, as shown by Neanderthal DNA in non-African genomes).</p>',
        '<p>The Out of Africa model (also called the Recent African Origin model) is supported by extensive genetic, fossil and archaeological evidence. Homo sapiens evolved in Africa, with fossils assigned to the species from about 300,000 years ago. Populations later dispersed from Africa, and an important expansion around 50,000-70,000 years ago contributed much of the ancestry of people outside Africa, with some interbreeding with other hominin groups such as Neanderthals. The evidence supports a complex African population history rather than one isolated, homogeneous ancestral population, and particular models of population structure remain under study. The later expansion does not exclude earlier dispersals.</p>'],
      ['<p><strong>A. Evolved independently on multiple continents:</strong> This describes the Multiregional model, an alternative hypothesis proposing that local H. erectus populations on different continents independently evolved into modern humans while maintaining gene flow. This model is largely contradicted by genetic evidence showing low genetic diversity outside Africa and recent common ancestry.</p>',
        '<p><strong>A. Evolved independently on multiple continents:</strong> The evidence favors an African origin of Homo sapiens, rather than separate origins on multiple continents. Historical multiregional models proposed regional continuity with gene flow; describing them as completely independent evolution is an oversimplification.</p>'],
      ['<li>The Out of Africa model is now the dominant scientific consensus, with minor modification for limited interbreeding with archaic populations</li>',
        '<li>African origin and later interbreeding with other hominins are compatible; they describe different parts of our ancestry</li>'],
      ['<p class=\'exp-key\'>Bottom Line: The Out of Africa model states that modern humans originated in Africa and migrated outward, largely replacing other hominin species with limited interbreeding.</p>',
        '<p class=\'exp-key\'>Bottom Line: Homo sapiens originated in Africa, later dispersed widely, and interbred to some extent with other hominin groups.</p>']
    ],
    keepHeadings: ['<strong>A. Evolved independently on multiple continents:</strong>', '<strong>B. Originated in Europe:</strong>',
      '<strong>D. Evolved in Asia:</strong>'],
    gone: ['All modern humans descended from a single ancestral population', 'A subset of this population then migrated',
      'with minor modification for limited interbreeding', 'largely replacing other hominin species']
  },

  // ---- Q20  bio-558  synaptonemal complex (option A) ---------------------
  {
    q: 20, id: 'bio-558', expectLetter: 'A',
    optionFull: [[0, 'It is fully assembled by pachytene of prophase I, stabilizing homolog pairing and supporting crossing over']],
    explanation: [
      ['<h4>Correct Answer: It forms during pachytene of prophase I to stabilize homolog pairing and facilitate crossing over</h4>',
        '<h4>Correct Answer: It is fully assembled by pachytene of prophase I, stabilizing homolog pairing and supporting crossing over</h4>'],
      ['At metaphase I, bivalents (tetrads) align at the metaphase plate, held together only at chiasmata, not by the SC.',
        'At metaphase I, bivalents (tetrads) align at the metaphase plate, maintained as paired homologs through chiasmata and sister-chromatid cohesion rather than by the SC.']
    ],
    keepHeadings: ['<strong>B. Forms during metaphase I:</strong>'],
    gone: ['It forms during pachytene of prophase I to stabilize homolog pairing and facilitate crossing over',
      'held together only at chiasmata']
  }
];
