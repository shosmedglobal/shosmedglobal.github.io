/**
 * Biology review batch 10, displayed Q51-Q60 (bio-593 .. bio-602).
 * Every item in this range is edited.
 */
'use strict';

const Q56_TABLE =
  '<table class=\'exp-table\'><tr><th>Traditional teaching group</th><th>Typical movement or distinguishing feature</th><th>Examples</th></tr>' +
  '<tr><td>Apicomplexa</td><td>Many invasive stages move by gliding; apical structures aid cell invasion</td><td>Plasmodium, Toxoplasma, Cryptosporidium</td></tr>' +
  '<tr><td>Flagellated protozoa</td><td>Flagella</td><td>Giardia, Trichomonas, Trypanosoma, Leishmania</td></tr>' +
  '<tr><td>Amoebae</td><td>Pseudopods</td><td>Entamoeba, Naegleria, Acanthamoeba</td></tr>' +
  '<tr><td>Ciliates</td><td>Cilia</td><td>Balantidium coli</td></tr></table>' +
  '<p>These traditional descriptive groups are useful for learning morphology; they are not four equivalent modern evolutionary divisions.</p>';

module.exports = [
  // ---- Q51  bio-593  toxoplasmosis ---------------------------------------
  {
    q: 51, id: 'bio-593', expectLetter: 'D',
    explanation: [
      ['Humans become infected by ingesting oocysts from cat feces (e.g., cleaning litter boxes) or tissue cysts in <strong>undercooked meat</strong> (especially pork and lamb).</p>',
        'Humans become infected by ingesting sporulated oocysts from fecally contaminated material, such as soil, water or unwashed produce, or tissue cysts in <strong>undercooked meat</strong> (especially pork and lamb). Oocysts shed in cat feces take about 1-5 days to become infective, so touching a cat is not itself the mechanism.</p>'],
      ['can cause devastating fetal consequences: hydrocephalus, intracranial calcifications, chorioretinitis, and intellectual disability - the classic triad.</p>',
        'can cause serious fetal consequences. The classic triad is chorioretinitis, hydrocephalus and intracranial calcifications. Other neurological effects may occur, and many infected infants have no obvious signs at birth.</p>'],
      ['<li>Congenital TORCH infections: Toxoplasma, Others, Rubella, CMV, Herpes - all can cross the placenta</li>',
        '<li>New maternal infection during pregnancy can transmit the parasite to the fetus; the likelihood and severity vary with the timing of infection</li>'],
      ['<p class=\'exp-key\'>Bottom Line: Toxoplasma gondii - cat feces + undercooked meat = transmission routes. Pregnant women must avoid both. The cat is the definitive host where the parasite sexually reproduces and sheds oocysts.</p>',
        '<p class=\'exp-key\'>Bottom Line: Toxoplasma can be acquired from undercooked meat or ingestion of material contaminated with infective oocysts. Thorough cooking, hand hygiene and precautions with cat litter reduce risk during pregnancy.</p>']
    ],
    gone: ['ingesting oocysts from cat feces (e.g., cleaning litter boxes)', 'intellectual disability - the classic triad',
      'Congenital TORCH infections', 'Pregnant women must avoid both']
  },

  // ---- Q52  bio-594  Giardia ---------------------------------------------
  {
    q: 52, id: 'bio-594', expectLetter: 'C',
    explanation: [
      ['is the most common intestinal protozoan pathogen worldwide.',
        'is a common intestinal protozoan pathogen.'],
      ['<p><em>Giardia</em> causes <strong>malabsorption</strong> by coating the intestinal villi, leading to steatorrhea (fatty stools), bloating, and foul-smelling diarrhea - notably without blood or mucus.</p>',
        '<p><em>Giardia</em> attaches to the small-intestinal surface with its ventral adhesive disc. Infection can disrupt the brush border and absorption, causing bloating and greasy, foul-smelling stools. It usually causes nonbloody diarrhea rather than invasive dysentery.</p>'],
      ['<p><strong>A. Entamoeba histolytica:</strong> <em>E. histolytica</em> causes <strong>amoebic dysentery</strong> - bloody diarrhea with mucus, not steatorrhea. It invades the colonic mucosa creating flask-shaped ulcers and can form liver abscesses. Trophozoites contain ingested red blood cells (erythrophagocytosis) and have a single nucleus, not the binucleate pear shape of <em>Giardia</em>.</p>',
        '<p><strong>A. Entamoeba histolytica:</strong> Invasive amoebiasis classically produces bloody diarrhea with mucus rather than steatorrhea, and it invades the colonic mucosa creating flask-shaped ulcers that can lead to liver abscesses. <em>E. histolytica</em> infection can also be asymptomatic or nonbloody, so absence of blood alone does not exclude it. Its trophozoites may contain ingested red blood cells (erythrophagocytosis) and have a single nucleus, not the binucleate pear shape of <em>Giardia</em>.</p>'],
      ['<p><strong>B. Cryptosporidium parvum:</strong> <em>Cryptosporidium</em> causes profuse watery diarrhea, particularly severe in immunocompromised patients (AIDS). While also waterborne, it does not cause steatorrhea and its oocysts are much smaller (4-6 μm), identified by acid-fast staining - not the large, binucleate trophozoites described. <em>Cryptosporidium</em> is resistant to chlorine disinfection.</p>',
        '<p><strong>B. Cryptosporidium parvum:</strong> <em>Cryptosporidium</em> also spreads through contaminated water and usually causes watery diarrhea. It can cause malabsorption, particularly with severe or prolonged infection, so steatorrhea is not an absolute exclusion. The binucleate, pear-shaped trophozoites with an adhesive disc specifically favor <em>Giardia</em>; <em>Cryptosporidium</em> is identified by its small oocysts or by other diagnostic tests.</p>'],
      ['<li>The cyst form has four nuclei and is the infectious stage transmitted through contaminated water</li>',
        '<li>Mature cysts have four nuclei and immature cysts may have two; the cyst is the infectious stage transmitted through contaminated water</li>'],
      ['<p class=\'exp-key\'>Bottom Line: Foul-smelling fatty diarrhea + contaminated water + pear-shaped binucleate trophozoite with sucking disk = Giardia lamblia. No blood in stool distinguishes it from Entamoeba (bloody dysentery).</p>',
        '<p class=\'exp-key\'>Bottom Line: Foul-smelling fatty diarrhea after drinking untreated surface water, with pear-shaped binucleate trophozoites bearing a ventral adhesive disc, points to Giardia lamblia.</p>']
    ],
    keepHeadings: ['<strong>A. Entamoeba histolytica:</strong>', '<strong>B. Cryptosporidium parvum:</strong>',
      '<strong>D. Balantidium coli:</strong>'],
    gone: ['most common intestinal protozoan pathogen worldwide', 'by coating the intestinal villi',
      'it does not cause steatorrhea', 'The cyst form has four nuclei',
      'No blood in stool distinguishes it from Entamoeba']
  },

  // ---- Q53  bio-595  amoebic dysentery (stem replaced) -------------------
  {
    q: 53, id: 'bio-595', expectLetter: 'A',
    stemFull: 'A patient from a tropical region has bloody diarrhea with mucus. A colonic biopsy shows ulcers extending into the submucosa with a narrow opening and a wider base ("flask-shaped" ulcers). Stool microscopy shows amoebic trophozoites containing ingested red blood cells. Which organism is most likely responsible?',
    explanation: [
      ['It invades the colonic mucosa using lytic enzymes, creating pathognomonic <strong>flask-shaped ulcers</strong> (narrow neck at the surface, wider base in the submucosa). The hallmark diagnostic finding is trophozoites demonstrating <strong>erythrophagocytosis</strong> - ingested red blood cells within the cytoplasm.</p>',
        'It invades the colonic mucosa using lytic enzymes, creating characteristic <strong>flask-shaped ulcers</strong> with a narrow neck at the surface and a wider base in the submucosa; that shape is a tissue-section pattern. Trophozoites showing <strong>erythrophagocytosis</strong>, with ingested red blood cells in the cytoplasm, support the diagnosis. Erythrophagocytosis is not a perfectly reliable species discriminator, since it can rarely occur in <em>E. dispar</em>, so it is the combination of findings that strongly supports <em>E. histolytica</em>.</p>'],
      ['<p><strong>B. Giardia lamblia:</strong> <em>Giardia</em> infects the <strong>small intestine</strong> (duodenum), not the colon, and causes non-bloody, fatty, foul-smelling diarrhea (steatorrhea) by coating intestinal villi. It does not invade tissue, does not produce ulcers, and its trophozoites do not ingest red blood cells. <em>Giardia</em> causes malabsorption, not dysentery.</p>',
        '<p><strong>B. Giardia lamblia:</strong> <em>Giardia</em> infects the <strong>small intestine</strong> rather than the colon. It attaches to the mucosal surface with its ventral adhesive disc and disrupts the brush border, causing nonbloody, fatty, foul-smelling diarrhea and malabsorption rather than dysentery. Its trophozoites do not ingest red blood cells.</p>'],
      ['It invades Peyer\'s patches in the ileum, not the colon, and does not produce flask-shaped colonic ulcers.',
        'It classically involves ileal lymphoid tissue (Peyer\'s patches) and does not produce the flask-shaped colonic ulcers described here.'],
      ['There are no trophozoites with ingested RBCs (this is unique to <em>Entamoeba</em>).',
        '<em>Shigella</em> is a bacterium and does not produce amoebic trophozoites.'],
      ['<li>Treatment: metronidazole (kills trophozoites) followed by paromomycin or diloxanide furoate (kills cysts in the gut lumen)</li>',
        '<li>Invasive amoebiasis requires treatment of the tissue infection followed by a luminal agent to eradicate parasites remaining in the intestine</li>'],
      ['<p class=\'exp-key\'>Bottom Line: Bloody diarrhea + flask-shaped colonic ulcers + trophozoites with ingested RBCs = Entamoeba histolytica. Erythrophagocytosis is the key distinguishing feature of this pathogenic amoeba.</p>',
        '<p class=\'exp-key\'>Bottom Line: Bloody diarrhea, characteristic colonic ulcers and erythrophagocytic trophozoites strongly suggest E. histolytica; species-specific testing can distinguish it from similar amoebae.</p>']
    ],
    keepHeadings: ['<strong>B. Giardia lamblia:</strong>', '<strong>C. Salmonella typhi:</strong>',
      '<strong>D. Shigella dysenteriae:</strong>'],
    gone: ['Colonoscopy reveals flask-shaped ulcers of the colonic mucosa', 'pathognomonic',
      'by coating intestinal villi', 'this is unique to <em>Entamoeba</em>', 'kills cysts in the gut lumen',
      'Erythrophagocytosis is the key distinguishing feature']
  },

  // ---- Q54  bio-596  African trypanosomiasis -----------------------------
  {
    q: 54, id: 'bio-596', expectLetter: 'B',
    explanation: [
      ['<p><em>T. b. gambiense</em> (West Africa) causes chronic disease; <em>T. b. rhodesiense</em> (East Africa) causes acute, rapidly fatal disease.</p>',
        '<p><em>T. b. gambiense</em> occurs in West and Central Africa and usually causes a more chronic illness; <em>T. b. rhodesiense</em> occurs in East and southeastern Africa and usually progresses more rapidly. Both can be fatal without treatment.</p>'],
      ['<p><strong>A. Aedes mosquito:</strong> <em>Aedes aegypti</em> and <em>Aedes albopictus</em> transmit viral diseases: <strong>dengue, Zika, chikungunya, and yellow fever</strong>. They do not transmit trypanosomes. <em>Aedes</em> mosquitoes are recognized by their black-and-white striped pattern and bite during the daytime.</p>',
        '<p><strong>A. Aedes mosquito:</strong> <em>Aedes</em> mosquitoes transmit infections such as <strong>dengue, Zika and chikungunya</strong>; <em>A. aegypti</em> is also an important yellow-fever vector. They are not the vector for African sleeping sickness. <em>Aedes</em> mosquitoes are recognized by their black-and-white striped pattern and bite during the daytime.</p>']
    ],
    keepHeadings: ['<strong>A. Aedes mosquito:</strong>'],
    gone: ['(West Africa) causes chronic disease', 'acute, rapidly fatal disease',
      'They do not transmit trypanosomes']
  },

  // ---- Q55  bio-597  Leishmania ------------------------------------------
  {
    q: 55, id: 'bio-597', expectLetter: 'B',
    explanation: [
      ['The finding of <strong>amastigotes</strong> (small, round, non-flagellated forms also called <strong>Leishman-Donovan bodies</strong>) inside macrophages is the diagnostic hallmark.</p>',
        'The finding of <strong>amastigotes</strong> (small, round forms that lack an externally projecting flagellum, also called <strong>Leishman-Donovan bodies</strong>) inside macrophages is the diagnostic hallmark.</p>'],
      ['The species determines the clinical form: <em>L. tropica</em>/<em>L. major</em> (cutaneous), <em>L. braziliensis</em> (mucocutaneous), <em>L. donovani</em> (visceral/kala-azar).</p>',
        'Species are typically associated with particular forms rather than mapped one-to-one: <em>L. tropica</em> and <em>L. major</em> with cutaneous disease, <em>L. braziliensis</em> with cutaneous disease that may later involve mucosal surfaces, and <em>L. donovani</em> and <em>L. infantum</em> with visceral disease (kala-azar).</p>'],
      ['<p><strong>A. Mosquito:</strong> Mosquitoes transmit malaria (<em>Anopheles</em>), dengue/Zika (<em>Aedes</em>), and filariasis (<em>Culex</em>), among other diseases. They do not transmit <em>Leishmania</em>. Mosquitoes inject parasites directly into the bloodstream, whereas sandflies deposit <em>Leishmania</em> promastigotes into the skin wound created during feeding.</p>',
        '<p><strong>A. Mosquito:</strong> Mosquitoes transmit infections such as malaria and some viral diseases, but they are not the usual vector for this <em>Leishmania</em> infection. The chronic ulcer and amastigotes in macrophages point to infection transmitted by a sandfly.</p>'],
      ['<li>Sandflies are the exclusive vector for all forms of leishmaniasis</li>',
        '<li>Infected female phlebotomine sandflies are the usual vectors of human leishmaniasis</li>'],
      ['<p class=\'exp-key\'>Bottom Line: Amastigotes inside macrophages + chronic skin ulcer + sandfly vector = Leishmania. Sandflies transmit all forms of leishmaniasis. Remember: amastigotes (in humans, intracellular) vs. promastigotes (in sandfly, flagellated).</p>',
        '<p class=\'exp-key\'>Bottom Line: Amastigotes inside macrophages with a chronic skin ulcer point to Leishmania, transmitted by phlebotomine sandflies. Remember: amastigotes (in humans, intracellular) versus promastigotes (in the sandfly, flagellated).</p>']
    ],
    keepHeadings: ['<strong>A. Mosquito:</strong>', '<strong>C. Tick:</strong>', '<strong>D. Flea:</strong>'],
    gone: ['non-flagellated forms also called', 'Mosquitoes inject parasites directly into the bloodstream',
      'exclusive vector for all forms', 'Sandflies transmit all forms of leishmaniasis',
      'The species determines the clinical form']
  },

  // ---- Q56  bio-598  Apicomplexa (table repair) --------------------------
  {
    q: 56, id: 'bio-598', expectLetter: 'C',
    explanation: [
      ['whose members share a defining ultrastructural feature: the <strong>apical complex</strong>. This specialized structure includes rhoptries, micronemes, and conoid elements that enable the parasite to actively penetrate and invade host cells. All <em>Plasmodium</em> species use this machinery to invade red blood cells and liver hepatocytes.</p>',
        'whose members share specialized structures at the cell\'s front end, including secretory organelles, that help invasive stages enter host cells. All <em>Plasmodium</em> species use this machinery to invade red blood cells and liver cells.</p>'],
      ['<table class=\'exp-table\'><tr><th>Protozoan Group</th><th>Motility</th><th>Key Examples</th></tr><tr><td>Apicomplexa (Sporozoa)</td><td>Non-motile (gliding)</td><td>Plasmodium, Toxoplasma, Cryptosporidium</td></tr><tr><td>Flagellates</td><td>Flagella</td><td>Giardia, Trichomonas, Trypanosoma, Leishmania</td></tr><tr><td>Amoebae</td><td>Pseudopods</td><td>Entamoeba, Naegleria, Acanthamoeba</td></tr><tr><td>Ciliates</td><td>Cilia</td><td>Balantidium coli</td></tr></table>',
        Q56_TABLE],
      ['<p><strong>D. Trypanosoma cruzi:</strong> <em>Trypanosoma</em> is a <strong>flagellated protozoan</strong> (order Kinetoplastida) with a prominent kinetoplast (a mitochondrial DNA structure) and a single flagellum. While it does invade cells, it does so using a different mechanism than the apical complex - it triggers host cell endocytosis.</p>',
        '<p><strong>D. Trypanosoma cruzi:</strong> <em>Trypanosoma cruzi</em> can invade host cells, but it is a flagellated kinetoplastid, with a prominent kinetoplast and a single flagellum, and it lacks the defining apicomplexan invasion apparatus. Being intracellular does not by itself make an organism an apicomplexan.</p>'],
      ['<ul><li>Apicomplexa are all obligate intracellular parasites with complex lifecycles often involving sexual and asexual stages</li>' +
        '<li>The four major groups of medically important protozoa are classified by motility: sporozoa, flagellates, amoebae, and ciliates</li>' +
        '<li><em>Balantidium coli</em> is the only ciliated protozoan that infects humans</li>' +
        '</ul>',
        '<ul><li>The medically important apicomplexans discussed here depend on intracellular stages in their life cycles</li>' +
        '<li>Gliding is a form of movement; lack of obvious cilia or flagella does not mean a cell is motionless</li>' +
        '<li><em>Balantidium coli</em> is the classic ciliated protozoan pathogen of humans</li></ul>'],
      ['<p class=\'exp-key\'>Bottom Line: Apicomplexa (Plasmodium, Toxoplasma, Cryptosporidium) have an apical complex for cell invasion and are obligate intracellular parasites. Classify protozoa by their motility mechanism: flagella, pseudopods, cilia, or non-motile (Apicomplexa).</p>',
        '<p class=\'exp-key\'>Bottom Line: Plasmodium is an apicomplexan whose invasive stages use specialized apical structures to enter host cells; many such stages can move by gliding.</p>']
    ],
    keepHeadings: ['<strong>A. Giardia lamblia:</strong>', '<strong>B. Trichomonas vaginalis:</strong>',
      '<strong>D. Trypanosoma cruzi:</strong>'],
    gone: ['Non-motile (gliding)', 'rhoptries, micronemes, and conoid elements',
      'Apicomplexa are all obligate intracellular parasites', 'the only ciliated protozoan that infects humans',
      'or non-motile (Apicomplexa)', 'it triggers host cell endocytosis']
  },

  // ---- Q57  bio-599  beef tapeworm (stem replaced) -----------------------
  {
    q: 57, id: 'bio-599', expectLetter: 'B',
    stemFull: 'A patient who frequently eats raw or undercooked beef passes segments of a long tapeworm. A gravid segment has 15-20 primary lateral uterine branches on each side of its central uterine stem. Which helminth is most likely present?',
    explanation: [
      ['A critical distinguishing feature is the number of <strong>uterine branches in the gravid proglottid</strong>: <em>T. saginata</em> has <strong>15-20 lateral branches</strong>, while <em>T. solium</em> (pork tapeworm) has only <strong>7-13 lateral branches</strong>.</p>',
        'The number of <strong>primary lateral uterine branches on each side of the central stem</strong> helps distinguish the species: <em>T. saginata</em> has about <strong>12-30 per side</strong> and <em>T. solium</em> (pork tapeworm) about <strong>7-13</strong>. The observed count of 15-20 per side, together with the beef exposure, supports <em>T. saginata</em>; these ranges are approximate, and a borderline count alone does not settle identification.</p>'],
      ['Its gravid proglottids have only <strong>7-13 uterine branches</strong>. The critical clinical distinction is that <em>T. solium</em> (but NOT <em>T. saginata</em>) can cause <strong>cysticercosis</strong> - when humans ingest eggs (not cysticerci), the larvae can encyst in the brain (neurocysticercosis), causing seizures. This makes <em>T. solium</em> far more dangerous.',
        'Its gravid proglottids have about <strong>7-13 primary lateral branches per side</strong>. Comparing these two species, it is <em>T. solium</em> rather than <em>T. saginata</em> whose eggs can cause <strong>cysticercosis</strong>: eating cysticerci in meat causes intestinal taeniasis, whereas ingesting <em>T. solium</em> eggs can lead to larvae encysting in human tissues, including the brain (neurocysticercosis), causing seizures.'],
      ['acquired from raw freshwater fish (sushi, sashimi).',
        'acquired from raw or undercooked infected freshwater fish.'],
      ['<li>Pork tapeworm (<em>T. solium</em>) = 7-13 branches; Beef tapeworm (<em>T. saginata</em>) = 15-20 branches</li>',
        '<li>Primary lateral uterine branches per side: about 7-13 in <em>T. solium</em> and about 12-30 in <em>T. saginata</em>; these ranges are approximate</li>'],
      ['<li>Only <em>T. solium</em> causes cysticercosis in humans - <em>T. saginata</em> does not</li>',
        '<li>Comparing these two species, it is <em>T. solium</em> whose eggs can cause human cysticercosis, whereas eating cysticerci in meat causes intestinal taeniasis</li>'],
      ['<p class=\'exp-key\'>Bottom Line: Beef tapeworm (T. saginata) = 15-20 uterine branches; Pork tapeworm (T. solium) = 7-13 branches + armed scolex + risk of cysticercosis. Count the branches to identify the species.</p>',
        '<p class=\'exp-key\'>Bottom Line: Beef tapeworm (T. saginata) has about 12-30 primary lateral uterine branches per side; pork tapeworm (T. solium) has about 7-13, plus an armed scolex and the risk of cysticercosis from its eggs.</p>']
    ],
    keepHeadings: ['<strong>A. Taenia solium:</strong>', '<strong>C. Diphyllobothrium latum:</strong>',
      '<strong>D. Echinococcus granulosus:</strong>'],
    gone: ['The gravid proglottids contain a uterus with 15-20 lateral branches', '7-13 uterine branches',
      'sushi, sashimi', 'Only <em>T. solium</em> causes cysticercosis in humans',
      '= 15-20 uterine branches']
  },

  // ---- Q58  bio-600  Ascaris (stem replaced) -----------------------------
  {
    q: 58, id: 'bio-600', expectLetter: 'B',
    stemFull: 'Which helminth is acquired by swallowing embryonated eggs from contaminated soil and has adult females that can reach about 35 cm in the small intestine?',
    explanation: [
      ['is the <strong>most common helminth infection globally</strong>, affecting approximately 800 million people. It is the largest intestinal roundworm (nematode), with adult females reaching <strong>20-35 cm</strong> in length.',
        'is a widespread soil-transmitted intestinal roundworm. It is the largest intestinal roundworm (nematode), with adult females reaching <strong>20-35 cm</strong> in length.'],
      ['<p><strong>A. Enterobius vermicularis:</strong> <em>Enterobius</em> (pinworm) is the most common helminth in developed countries (especially children), but <em>Ascaris</em> is most common worldwide. Pinworms are much smaller (approximately 1 cm) and reside in the cecum/large intestine, not the small intestine. The female migrates to the perianal area at night to deposit eggs, causing intense pruritus ani.</p>',
        '<p><strong>A. Enterobius vermicularis:</strong> <em>Enterobius</em> (pinworm) is especially common among children. Pinworms are much smaller (approximately 1 cm) and reside in the cecum and large intestine, not the small intestine. The female migrates to the perianal area at night to deposit eggs, causing intense pruritus ani.</p>'],
      ['<p><strong>C. Necator americanus:</strong> <em>Necator</em> (New World hookworm) is a common soil-transmitted helminth but not the most common overall. Hookworms are much smaller than <em>Ascaris</em> (approximately 1 cm). They attach to the duodenal/jejunal mucosa and feed on blood, causing iron deficiency anemia. Infection occurs through skin penetration by filariform larvae, not egg ingestion.</p>',
        '<p><strong>C. Necator americanus:</strong> <em>Necator</em> (New World hookworm) is a soil-transmitted helminth whose adults are much smaller than <em>Ascaris</em> (approximately 1 cm). They attach to the duodenal and jejunal mucosa and feed on blood, causing iron deficiency anemia. Infection usually occurs through skin penetration by filariform larvae, not egg ingestion.</p>'],
      ['<p><strong>D. Strongyloides stercoralis:</strong> <em>Strongyloides</em> is unique among helminths for its ability to complete its lifecycle within the human host (<strong>autoinfection</strong>), potentially causing hyperinfection syndrome in immunosuppressed patients. Adults are small (approximately 2 mm), much smaller than <em>Ascaris</em>. It is less prevalent globally than <em>Ascaris</em>.</p>',
        '<p><strong>D. Strongyloides stercoralis:</strong> <em>Strongyloides</em> adults are much smaller (approximately 2 mm), and infection is usually acquired when larvae penetrate the skin. Its ability to cause <strong>autoinfection</strong> allows infection to persist and can lead to dangerous hyperinfection during immune suppression. Autoinfection is not unique to this helminth; it also occurs in parasites such as <em>Hymenolepis nana</em>.</p>'],
      ['<p class=\'exp-key\'>Bottom Line: Ascaris lumbricoides = most common helminth worldwide, largest intestinal roundworm (up to 35 cm), causes Löffler syndrome during lung migration phase. Fecal-oral transmission via eggs in contaminated soil.</p>',
        '<p class=\'exp-key\'>Bottom Line: Ascaris is a large intestinal roundworm acquired by ingestion of infective eggs; its larvae migrate through the lungs before adults develop in the small intestine.</p>']
    ],
    keepHeadings: ['<strong>A. Enterobius vermicularis:</strong>', '<strong>C. Necator americanus:</strong>',
      '<strong>D. Strongyloides stercoralis:</strong>'],
    gone: ['most common human worm infection worldwide', 'approximately 800 million people',
      'is unique among helminths for its ability', 'not the most common overall',
      'most common helminth worldwide, largest intestinal roundworm']
  },

  // ---- Q59  bio-601  urinary schistosomiasis (stem replaced) -------------
  {
    q: 59, id: 'bio-601', expectLetter: 'D',
    stemFull: 'A 40-year-old farmer from Egypt has hematuria. A bladder-wall biopsy shows granulomatous inflammation around parasite eggs. He reports frequent contact with freshwater irrigation canals. Which parasite is most likely responsible, and which larval stage infects humans?',
    explanation: [
      ['The infectious larval stage is the <strong>cercaria</strong>, which is released from freshwater snails (intermediate host) and penetrates human skin during contact with contaminated water.</p>',
        'The infectious larval stage is the <strong>cercaria</strong>, which is released from freshwater snails (intermediate host) and penetrates human skin during contact with contaminated water. The inflammation and tissue damage result primarily from the immune response to eggs deposited in the bladder wall, and granulomatous inflammation is established on histology rather than by cystoscopy alone.</p>'],
      ['<p>The lifecycle: eggs in urine reach freshwater → hatch into miracidia → infect snails → develop into cercariae → penetrate human skin → mature into adult flukes in the vesical venous plexus.</p>',
        '<p>The life cycle: eggs reach freshwater in urine → miracidia hatch and infect snails → snails release cercariae → cercariae penetrate human skin → immature worms migrate through the circulation and develop in the liver → adult pairs move to veins around the urinary tract.</p>'],
      ['While the disease mechanism is correct for schistosomiasis, <em>S. mansoni</em> affects the <strong>intestine and liver</strong> (via the inferior mesenteric vein/portal system), not the bladder. It causes bloody diarrhea and hepatic fibrosis (Symmers clay pipestem fibrosis), not hematuria.',
        'While the disease mechanism is correct for schistosomiasis, <em>S. mansoni</em> typically affects the <strong>intestine and liver</strong> (via the inferior mesenteric vein and portal system) rather than causing the urinary presentation here. It classically causes bloody diarrhea and hepatic fibrosis (Symmers clay pipestem fibrosis).'],
      ['<p class=\'exp-key\'>Bottom Line: Hematuria + freshwater exposure + Egypt/Africa = Schistosoma haematobium. The cercaria penetrates skin (swimmer\'s itch). Chronic infection causes bladder squamous cell carcinoma. Remember: cercariae infect humans, miracidia infect snails.</p>',
        '<p class=\'exp-key\'>Bottom Line: Freshwater exposure with hematuria suggests S. haematobium. Cercariae infect humans through the skin; eggs drive chronic inflammation, and longstanding infection increases the risk of bladder squamous cell carcinoma.</p>']
    ],
    gone: ['Cystoscopy reveals granulomatous inflammation of the bladder wall', 'mature into adult flukes in the vesical venous plexus',
      'not the bladder. It causes bloody diarrhea', 'swimmer\'s itch', 'causes bladder squamous cell carcinoma']
  },

  // ---- Q60  bio-602  pinworm ---------------------------------------------
  {
    q: 60, id: 'bio-602', expectLetter: 'C',
    explanation: [
      ['The pathognomonic symptom is <strong>intense perianal pruritus</strong>, worse at night, caused by female worms migrating to the perianal area to deposit eggs.',
        'The characteristic symptom is <strong>intense perianal pruritus</strong>, worse at night, caused by female worms migrating to the perianal area to deposit eggs. It strongly suggests pinworm but is not exclusive to it.'],
      ['transparent adhesive tape is pressed against the perianal skin in the morning (before bathing) to collect eggs, then examined microscopically.</p>',
        'transparent adhesive tape is pressed against the perianal skin first thing in the morning, before bathing or using the toilet, to collect eggs, which are then examined microscopically.</p>'],
      ['<p>The eggs are characteristically <strong>D-shaped (plano-convex)</strong> and are not typically found in stool samples - this is why standard stool O&P examination often misses pinworm infection.</p>',
        '<p>The eggs are characteristically <strong>D-shaped (plano-convex)</strong>. Routine stool examination often misses pinworm because the eggs are mainly deposited around the anus rather than passed in stool.</p>'],
      ['<p><strong>D. Ancylostoma duodenale:</strong> <em>Ancylostoma</em> (Old World hookworm) infects via skin penetration of larvae from contaminated soil, not the fecal-oral route. It attaches to the small intestinal mucosa and causes iron-deficiency anemia from chronic blood loss. Diagnosis is by stool examination showing characteristic thin-shelled oval eggs. It does not cause perianal itching.</p>',
        '<p><strong>D. Ancylostoma duodenale:</strong> <em>Ancylostoma duodenale</em> is a hookworm that usually enters through skin penetration by infective larvae; oral acquisition of larvae can also occur. Adults attach to small-intestinal mucosa and can cause iron-deficiency anemia. Its eggs are sought in stool, whereas the pinworm tape test collects eggs deposited on perianal skin.</p>'],
      ['<li>Pinworm transmission is by the fecal-oral route - eggs become airborne from bedding and are ingested or inhaled</li>',
        '<li>Infection usually follows swallowing eggs transferred from contaminated hands or objects. Rarely, airborne eggs are inhaled and then swallowed</li>'],
      ['<p class=\'exp-key\'>Bottom Line: Perianal itching worse at night + child + Scotch tape test = Enterobius vermicularis (pinworm). Eggs are deposited perianally and won\'t be found in routine stool samples.</p>',
        '<p class=\'exp-key\'>Bottom Line: Nocturnal perianal itching suggests pinworm. Morning perianal tape sampling is more useful than routine stool examination because eggs are mainly laid on the surrounding skin.</p>']
    ],
    keepHeadings: ['<strong>D. Ancylostoma duodenale:</strong>'],
    gone: ['pathognomonic symptom', 'are not typically found in stool samples',
      'not the fecal-oral route', 'eggs become airborne from bedding',
      'won\'t be found in routine stool samples']
  }
];
