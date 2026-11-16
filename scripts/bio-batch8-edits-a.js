/**
 * Biology review batch 8, displayed Q1-Q12 (bio-406 .. bio-417).
 * Q6 (bio-411) and Q7 (bio-412) are KEEP UNCHANGED per the review and so are
 * absent from this module by design.
 */
'use strict';

module.exports = [
  // ---- Q1  bio-406  Toxoplasma definitive host ---------------------------
  {
    q: 1, id: 'bio-406', expectLetter: 'B',
    explanation: [
      ['<p><strong>C. Rat:</strong> Rats and other rodents are intermediate hosts for T. gondii. Interestingly, T. gondii infection in rats causes behavioral changes that make them less afraid of cats, increasing the likelihood that infected rats will be caught and eaten, thus completing the parasite\'s life cycle. This is a classic example of parasite-induced behavioral manipulation.</p>',
        '<p><strong>C. Rat:</strong> Rats are intermediate hosts. They can contain tissue cysts, and a cat can become infected by eating an infected rat. Sexual reproduction of the parasite occurs in felids, not rats.</p>'],
      ['This is why pregnant women are advised to cook meat thoroughly and avoid cat litter.</p>',
        'Prevention includes cooking meat thoroughly and avoiding accidental ingestion of material contaminated by cat faeces.</p>'],
      ['<li>Human infection more often comes from undercooked meat containing tissue cysts than from cats directly.</li>',
        '<li>Humans can acquire infection from tissue cysts in undercooked meat or from oocysts in food, water or soil contaminated by cat faeces.</li>']
    ],
    keepHeadings: ['<strong>C. Rat:</strong>', '<strong>D. Pig:</strong>'],
    gone: ['behavioral changes that make them less afraid of cats', 'avoid cat litter',
      'more often comes from undercooked meat containing tissue cysts than from cats directly']
  },

  // ---- Q2  bio-407  tsetse fly -------------------------------------------
  {
    q: 2, id: 'bio-407', expectLetter: 'B',
    explanation: [
      ['T. b. gambiense causes chronic West African sleeping sickness, while T. b. rhodesiense causes acute East African form.',
        'T. b. gambiense occurs in West and Central Africa and causes a chronic illness, while T. b. rhodesiense occurs in eastern and southern Africa and causes a more acute illness.'],
      ['<p><strong>D. Chagas disease:</strong> Chagas disease, or American trypanosomiasis, is caused by Trypanosoma cruzi and spread by triatomine (reduviid) bugs. It is the closest distractor because it is also a trypanosome infection, but both the vector and the continent differ.</p>',
        '<p><strong>D. Chagas disease:</strong> Chagas disease is caused by Trypanosoma cruzi. In its classic insect-borne route, parasites in the faeces of a triatomine bug enter through broken skin or mucous membranes. African sleeping sickness is transmitted through the bite of a tsetse fly.</p>'],
      ['<li>T. b. gambiense causes the chronic West African form; T. b. rhodesiense the acute East African form.</li>',
        '<li>T. b. gambiense occurs in West and Central Africa and causes the chronic form; T. b. rhodesiense occurs in eastern and southern Africa and causes the acute form.</li>'],
      ['<li>That same mechanism is why no effective vaccine exists.</li>',
        '<li>The parasite can change its surface antigens, helping it evade antibodies and making vaccine development difficult.</li>']
    ],
    keepHeadings: ['<strong>D. Chagas disease:</strong>'],
    gone: ['chronic West African sleeping sickness', 'the acute East African form',
      'That same mechanism is why no effective vaccine exists', 'spread by triatomine (reduviid) bugs']
  },

  // ---- Q3  bio-408  cysticercosis (option A renamed) ---------------------
  {
    q: 3, id: 'bio-408', expectLetter: 'B',
    optionFull: [[0, 'Larval cysts in undercooked pork']],
    explanation: [
      ['Cysticercosis (including neurocysticercosis) occurs when humans accidentally ingest T. solium eggs through fecal-oral contamination.',
        'Cysticercosis (including neurocysticercosis) occurs when humans accidentally ingest T. solium eggs through fecal-oral contamination. The eggs are shed in the feces of a person carrying an adult T. solium tapeworm in the intestine.'],
      ['<p><strong>A. Adult worms in undercooked pork:</strong> Eating undercooked pork containing larval cysts (cysticerci) causes intestinal taeniasis (adult tapeworm infection), not cysticercosis. The distinction is critical: intestinal infection comes from eating larvae in meat, while cysticercosis comes from ingesting eggs from fecal contamination. In cysticercosis, the human becomes an accidental intermediate host rather than the definitive host.</p>',
        '<p><strong>A. Larval cysts in undercooked pork:</strong> Eating pork containing T. solium larval cysts causes intestinal taeniasis, in which an adult tapeworm develops in the intestine. Cysticercosis instead follows ingestion of eggs, which can develop into larvae in human tissues.</p>']
    ],
    gone: ['Adult worms in undercooked pork']
  },

  // ---- Q4  bio-409  S. mansoni egg (substantial repair) ------------------
  {
    q: 4, id: 'bio-409', expectLetter: 'B',
    explanation: [
      ['<p>Schistosoma mansoni eggs have a characteristic large lateral spine, which distinguishes them from other Schistosoma species. S. haematobium eggs have a terminal spine, while S. japonicum eggs are round with a small lateral knob (rudimentary spine). The spines help the eggs penetrate blood vessel walls and migrate through tissues to reach the intestinal lumen (S. mansoni, S. japonicum) or bladder (S. haematobium). Eggs trapped in tissues cause the granulomatous inflammatory response responsible for disease pathology.</p>',
        '<p>Schistosoma mansoni eggs have a prominent lateral spine. S. haematobium eggs have a terminal spine, while the rounder eggs of S. japonicum have a small, often inconspicuous lateral knob. Egg morphology helps distinguish these parasites microscopically. Many eggs pass out of the body, but eggs retained in tissues provoke inflammation and fibrosis.</p>'],
      ['<p><strong>A. A terminal spine:</strong> Haematobium eggs have a terminal spine, while s.</p>',
        '<p><strong>A. A terminal spine:</strong> A terminal spine is characteristic of S. haematobium eggs, which are usually detected in urine. S. mansoni eggs have a lateral spine and are usually detected in stool.</p>'],
      ['<p><strong>C. No spine (round and smooth):</strong> Schistosoma japonicum eggs are round and smooth (no visible spine or only a small vestigial lateral knob), not S. mansoni. S. japonicum is found primarily in East Asia and is the most pathogenic species because it produces the most eggs. Remembering the egg morphology is essential for parasitology exams: mansoni = lateral spine, haematobium = terminal spine, japonicum = round.</p>',
        '<p><strong>C. No spine (round and smooth):</strong> S. mansoni eggs have a conspicuous lateral spine. S. japonicum eggs are rounder, but they still have a small lateral knob that may be difficult to see; they should not be taught as completely spine-free.</p>'],
      ['<p><strong>D. An operculum (lid):</strong> An operculum (lid) is a characteristic feature of fluke eggs from Clonorchis, Opisthorchis, Paragonimus, and Diphyllobothrium (a cestode). Schistosoma eggs do not have opercula. Instead, Schistosoma eggs use a spine to help them penetrate through blood vessel walls and into the intestinal or bladder lumen for excretion.</p>',
        '<p><strong>D. An operculum (lid):</strong> An operculum is a lid-like opening found in the eggs of several other flukes and some tapeworms. Schistosoma eggs do not have an operculum.</p>'],
      ['<li>S. haematobium eggs have a terminal spine; S. japonicum eggs are rounder with only a rudimentary knob.</li>',
        '<li>S. haematobium eggs have a terminal spine; S. japonicum eggs are rounder, with a small lateral knob that is often inconspicuous.</li>'],
      ['<li>The spine helps eggs penetrate vessel walls to reach the gut lumen (mansoni, japonicum) or bladder (haematobium).</li>',
        '<li>Eggs passed into the gut or urinary tract can leave the body; eggs retained in tissues cause inflammation.</li>'],
      ['<li>Disease results from granulomatous inflammation around trapped eggs, not from the adult worms - hence periportal fibrosis in mansoni and bladder disease in haematobium.</li>',
        '<li>The major pathology results from inflammation around retained eggs, giving periportal fibrosis in mansoni and bladder disease in haematobium.</li>']
    ],
    keepHeadings: ['<strong>A. A terminal spine:</strong>', '<strong>C. No spine (round and smooth):</strong>', '<strong>D. An operculum (lid):</strong>'],
    gone: ['most pathogenic species because it produces the most eggs', 'spines help the eggs penetrate blood vessel walls',
      'use a spine to help them penetrate through blood vessel walls', 'The spine helps eggs penetrate vessel walls',
      'not from the adult worms', 'while s.']
  },

  // ---- Q5  bio-410  Giardia site -----------------------------------------
  {
    q: 5, id: 'bio-410', expectLetter: 'B',
    explanation: [
      ['Giardiasis is the most common parasitic intestinal infection worldwide.',
        'Giardiasis is a common intestinal protozoan infection.'],
      ['Giardia remains in the intestinal lumen and does not penetrate the mucosa. It causes malabsorption, bloating, foul-smelling diarrhea, and steatorrhea (fatty stools).',
        'Giardia usually remains on the surface of the small-intestinal mucosa rather than invading it. It causes malabsorption, bloating, foul-smelling diarrhea, and steatorrhea (fatty stools).'],
      ['<li>Because it is non-invasive, giardiasis causes no blood or pus in the stool and no systemic illness.</li>',
        '<li>Giardia usually remains on the surface of the small-intestinal mucosa rather than invading it. It typically causes nonbloody diarrhoea, bloating and malabsorption; fever can occur.</li>'],
      ['<li>Transmission is faecal-oral via cysts in contaminated water; the cysts resist chlorination, so filtration or boiling is needed.</li>',
        '<li>Transmission is faecal-oral via cysts in contaminated water. Giardia cysts are relatively chlorine-tolerant, so disinfection requires suitable conditions and contact time. Boiling or appropriate filtration can also remove this waterborne risk.</li>']
    ],
    gone: ['most common parasitic intestinal infection worldwide', 'no blood or pus in the stool and no systemic illness',
      'the cysts resist chlorination', 'does not penetrate the mucosa']
  },

  // ---- Q8  bio-413  Entamoeba infective stage (stem replaced) ------------
  {
    q: 8, id: 'bio-413', expectLetter: 'B',
    stemFull: 'Which stage of Entamoeba histolytica is usually responsible for infection after ingestion of contaminated food or water?',
    explanation: [
      ['Trophozoites are the pathogenic form that invade the intestinal wall causing amoebic dysentery and can spread to the liver (amoebic liver abscess). Sporozoites and merozoites are stages of apicomplexan parasites like Plasmodium.</p>',
        'Trophozoites are the active, multiplying form; they may remain in the intestinal lumen or invade the intestinal wall, causing amoebic dysentery, and can spread to the liver (amoebic liver abscess). Sporozoites and merozoites are stages of apicomplexan parasites like Plasmodium.</p>'],
      ['<p><strong>A. Trophozoite:</strong> Trophozoites are the pathogenic form that invade the intestinal wall causing amoebic dysentery and can spread to the liver (amoebic liver abscess).</p>',
        '<p><strong>A. Trophozoite:</strong> Trophozoites are the active, multiplying form. They may remain in the intestinal lumen or invade tissues, but they are fragile outside the host and ordinarily do not survive passage through the stomach after ingestion. The resistant cyst is the usual form transmitted in contaminated food or water.</p>'],
      ['<p><strong>C. Sporozoite:</strong> Sporozoites and merozoites are stages of apicomplexan parasites like plasmodium.</p>',
        '<p><strong>C. Sporozoite:</strong> A Plasmodium sporozoite is the stage delivered by a mosquito, and it infects liver cells. It is not a stage in the Entamoeba histolytica life cycle.</p>'],
      ['<p><strong>D. Merozoite:</strong> Sporozoites and merozoites are stages of apicomplexan parasites like plasmodium.</p>',
        '<p><strong>D. Merozoite:</strong> A Plasmodium merozoite is the stage that invades red blood cells. It is not a stage in the Entamoeba histolytica life cycle.</p>'],
      ['<li>Excystation releases trophozoites, which are the invasive and pathogenic form but cannot survive outside the host.</li>',
        '<li>Excystation releases trophozoites, the active form; these may stay in the intestinal lumen or invade the wall, and they cannot survive outside the host.</li>'],
      ['<li>The general rule holds across protozoa: the cyst transmits, the trophozoite causes disease.</li>',
        '<li>In E. histolytica and Giardia, cysts are important for transmission and trophozoites are the active form. Not all protozoan parasites have a cyst stage.</li>']
    ],
    keepHeadings: ['<strong>A. Trophozoite:</strong>', '<strong>C. Sporozoite:</strong>', '<strong>D. Merozoite:</strong>'],
    gone: ['The infective stage of Entamoeba histolytica that is transmitted',
      'stages of apicomplexan parasites like plasmodium', 'The general rule holds across protozoa',
      'which are the invasive and pathogenic form']
  },

  // ---- Q9  bio-414  Echinococcus -----------------------------------------
  {
    q: 9, id: 'bio-414', expectLetter: 'B',
    explanation: [
      ['Neurocysticercosis is caused by Taenia solium, elephantiasis by Wuchereria bancrofti, and river blindness by Onchocerca volvulus.',
        'Neurocysticercosis is caused by Taenia solium, elephantiasis by lymphatic filarial worms such as Wuchereria bancrofti, and river blindness by Onchocerca volvulus.'],
      ['<p><strong>C. Elephantiasis:</strong> Elephantiasis is lymphatic filariasis, caused by the nematode Wuchereria bancrofti and transmitted by mosquitoes. The adult worms obstruct lymphatic vessels rather than forming cysts.</p>',
        '<p><strong>C. Elephantiasis:</strong> Elephantiasis can result from chronic lymphatic filariasis caused by worms such as Wuchereria bancrofti or Brugia species. It is not the cyst-forming disease caused by Echinococcus.</p>'],
      ['<li>Cyst rupture can release antigenic fluid and provoke anaphylaxis, which is why aspiration is hazardous.</li>',
        '<li>Rupture of a hydatid cyst can release parasite material, causing dissemination and potentially anaphylaxis.</li>']
    ],
    keepHeadings: ['<strong>C. Elephantiasis:</strong>'],
    gone: ['which is why aspiration is hazardous', 'Elephantiasis is lymphatic filariasis, caused by the nematode']
  },

  // ---- Q10  bio-415  ATP per glucose (stem replaced, substantial) --------
  {
    q: 10, id: 'bio-415', expectLetter: 'C',
    stemFull: 'Approximately how many ATP molecules can a human cell with functioning mitochondria obtain from the complete aerobic oxidation of one glucose molecule?',
    explanation: [
      ['<p>The complete aerobic oxidation of one glucose molecule yields approximately 30-32 ATP: 2 ATP from glycolysis (substrate-level phosphorylation), 2 ATP from the citric acid cycle (via GTP), and approximately 26-28 ATP from oxidative phosphorylation (from 10 NADH × ~2.5 ATP each = 25, plus 2 FADH₂ × ~1.5 ATP each = 3). The variability depends on the shuttle system used to transport cytoplasmic NADH into mitochondria (malate-aspartate shuttle yields ~2.5 ATP; glycerol-3-phosphate shuttle yields ~1.5 ATP per NADH).</p>',
        '<p>A commonly used estimate is about 30-32 ATP per glucose. Glycolysis contributes a net 2 ATP directly, and the citric acid cycle contributes 2 ATP equivalents as ATP or GTP. Oxidative phosphorylation supplies approximately 26-28 ATP. The range mainly reflects how the electrons from cytosolic NADH are transferred to the mitochondrial respiratory chain. NADH itself does not cross the inner mitochondrial membrane.</p>' +
        '<table class=\'exp-table\'><tr><th>Source</th><th>Approximate ATP</th></tr>' +
        '<tr><td>Eight NADH formed within mitochondria</td><td>about 20</td></tr>' +
        '<tr><td>Two succinate-derived FAD-linked electron pairs</td><td>about 3</td></tr>' +
        '<tr><td>Two cytosolic NADH</td><td>about 3 or 5, depending on the shuttle</td></tr>' +
        '<tr><td>Substrate-level phosphorylation</td><td>4 ATP equivalents</td></tr>' +
        '<tr><td><strong>Total</strong></td><td><strong>about 30 or 32</strong></td></tr></table>'],
      ['<p><strong>B. 4 ATP:</strong> 4 ATP is the gross (not net) yield from glycolysis. Glycolysis produces 4 ATP total but consumes 2 ATP in the early steps (hexokinase and phosphofructokinase reactions), giving a net of 2 ATP. Adding in all the subsequent aerobic steps yields far more than 4 ATP.</p>',
        '<p><strong>B. 4 ATP:</strong> 4 ATP is the gross (not net) yield from glycolysis, which consumes 2 ATP in its early steps and so nets 2. It is also the total substrate-level yield from a completely oxidised glucose: 2 from glycolysis plus 2 ATP or GTP equivalents from the citric acid cycle. Neither figure is the total aerobic yield, because most ATP comes from oxidative phosphorylation.</p>'],
      ['<li>Current estimates use about 2.5 ATP per NADH and 1.5 per FADH₂, rather than the older values of 3 and 2.</li>',
        '<li>Current estimates use about 2.5 ATP per mitochondrial NADH and about 1.5 for an FAD-linked electron pair, rather than the older values of 3 and 2.</li>'],
      ['<li>The range exists because cytoplasmic NADH must be shuttled into mitochondria: the malate-aspartate shuttle preserves it as NADH, while the glycerol-3-phosphate shuttle delivers it as FADH₂ and yields less.</li>',
        '<li>The malate-aspartate shuttle transfers reducing equivalents to mitochondrial NADH. The glycerol-3-phosphate shuttle transfers them through an enzyme-bound FAD to coenzyme Q, bypassing Complex I and yielding less ATP.</li>']
    ],
    keepHeadings: ['<strong>B. 4 ATP:</strong>'],
    gone: ['generated from the complete oxidation of one molecule of glucose via aerobic respiration',
      'glycerol-3-phosphate shuttle yields ~1.5 ATP per NADH', 'delivers it as FADH₂ and yields less',
      'and 1.5 per FADH₂']
  },

  // ---- Q11  bio-416  Complex I donor -------------------------------------
  {
    q: 11, id: 'bio-416', expectLetter: 'B',
    explanation: [
      ['During this process, Complex I pumps 4 H⁺ from the mitochondrial matrix to the intermembrane space, contributing to the proton motive force. FADH₂ donates electrons to Complex II (succinate dehydrogenase), bypassing Complex I.</p>',
        'During this process, Complex I pumps 4 H⁺ per pair of electrons from one NADH, from the mitochondrial matrix to the intermembrane space, contributing to the proton motive force. Complex II contains enzyme-bound FAD. During succinate oxidation, this FAD is reduced and its electrons are transferred through the complex to coenzyme Q. NADH instead donates electrons to Complex I.</p>'],
      ['<p><strong>A. FADH₂:</strong> Fadh2 donates electrons to complex ii (succinate dehydrogenase), bypassing complex i.</p>',
        '<p><strong>A. FADH₂:</strong> Free FADH₂ is not what Complex I accepts, and it is not how FAD-linked electrons reach the chain. Complex II contains enzyme-bound FAD: during succinate oxidation that FAD is reduced, and its electrons are transferred through the complex to coenzyme Q. NADH is the donor to Complex I.</p>'],
      ['It accepts electrons from both Complex I and Complex II and delivers them to Complex III. CoQ does not donate electrons to Complex I; it receives electrons from Complex I.',
        'During forward electron transport, CoQ accepts electrons from Complex I and other entry routes and carries them toward Complex III. It receives electrons from Complex I rather than donating them to it.'],
      ['<li>FADH₂ enters at Complex II instead, bypassing Complex I - which is why it yields less ATP.</li>',
        '<li>Succinate-derived electrons reach coenzyme Q through Complex II and bypass Complex I, so their entry supports less proton pumping than entry from NADH.</li>'],
      ['<li>Complex II is the only ETC complex that pumps no protons, and it is also a citric acid cycle enzyme (succinate dehydrogenase).</li>',
        '<li>Of the electron-transfer complexes I–IV, Complex II does not pump protons. It also functions as succinate dehydrogenase in the citric acid cycle.</li>']
    ],
    keepHeadings: ['<strong>A. FADH₂:</strong>', '<strong>D. Ubiquinone (CoQ):</strong>'],
    gone: ['Fadh2 donates electrons to complex ii', 'FADH₂ enters at Complex II instead',
      'the only ETC complex that pumps no protons', 'CoQ does not donate electrons to Complex I']
  },

  // ---- Q12  bio-417  chemiosmosis (one point) ----------------------------
  {
    q: 12, id: 'bio-417', expectLetter: 'B',
    explanation: [[
      '<li>The inner mitochondrial membrane must stay intact and impermeable to protons, or the gradient dissipates and synthesis stops.</li>',
      '<li>The inner mitochondrial membrane has low passive permeability to protons. Controlled proton flow through ATP synthase drives ATP production; excessive proton leakage reduces this coupling.</li>'
    ]],
    gone: ['impermeable to protons, or the gradient dissipates and synthesis stops']
  }
];
