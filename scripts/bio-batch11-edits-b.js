/**
 * Biology review batch 11, edits for File B items B1-B6.
 * Spec shape is documented in scripts/bio-batch11-edits-a.js.
 *
 * Replaced educational points follow each item's own existing punctuation
 * convention, so no list ends up half with trailing periods and half without.
 */
'use strict';

const B2_EXPLANATION =
  "<h4>Correct Answer: Culex - Japanese encephalitis</h4>" +
  "<p><strong>Japanese encephalitis virus</strong> is transmitted mainly by <em>Culex</em> mosquitoes, including " +
  "<em>Culex tritaeniorhynchus</em>. Transmission is often associated with rural rice-growing areas. Different " +
  "<em>Culex</em> species can transmit other infections, including West Nile virus and, in some regions, lymphatic " +
  "filariasis.</p>" +
  "<table class='exp-table'>" +
  "<tr><th>Mosquito genus</th><th>Important disease examples</th><th>Useful general pattern</th></tr>" +
  "<tr><td><strong>Anopheles</strong></td><td>Malaria</td>" +
  "<td>Many vectors bite from dusk to dawn; breeding habitats vary</td></tr>" +
  "<tr><td><strong>Aedes</strong></td><td>Dengue, Zika, chikungunya; urban yellow fever</td>" +
  "<td>Important vectors such as <em>A. aegypti</em> often bite during the day and breed in water containers</td></tr>" +
  "<tr><td><strong>Culex</strong></td><td>Japanese encephalitis, West Nile; some lymphatic filariasis</td>" +
  "<td>Many bite at dusk or night; habitats include rice fields and other standing water, depending on species</td></tr>" +
  "</table>" +
  "<h4>Why the other choices are wrong:</h4>" +
  "<p><strong>A. Anopheles - dengue fever:</strong> The principal dengue vectors are <em>Aedes aegypti</em> and " +
  "<em>Aedes albopictus</em>. Female <em>Anopheles</em> mosquitoes are the vectors responsible for mosquito-borne human " +
  "malaria.</p>" +
  "<p><strong>B. Aedes - malaria:</strong> <em>Aedes</em> species transmit several important viral diseases, but they are " +
  "not the mosquito vectors of human malaria. That role belongs to <em>Anopheles</em>.</p>" +
  "<p><strong>D. Anopheles - yellow fever:</strong> <em>Aedes aegypti</em> is an important urban yellow-fever vector. " +
  "Other mosquitoes transmit yellow fever in forest cycles, including <em>Haemagogus</em> and <em>Sabethes</em> in the " +
  "Americas. <em>Anopheles</em> is not the correct pairing.</p>" +
  "<h4>Key Educational Points:</h4><ul>" +
  "<li>Useful pairings are <em>Anopheles</em>–malaria, <em>Aedes</em>–dengue and <em>Culex</em>–Japanese encephalitis</li>" +
  "<li>In these medically important mosquitoes, females take the blood meals that transmit infection</li>" +
  "<li>Biting times and breeding habitats vary by species; broad genus-level patterns are useful guides, not absolute rules</li>" +
  "</ul>" +
  "<p class='exp-key'>Bottom Line: <em>Culex</em> is the correct vector pairing for Japanese encephalitis. Avoid equating " +
  "every <em>Culex</em> species with polluted-water breeding or every mosquito genus with only one disease.</p>";

module.exports = [
  // ---- B1 bio-603: trichinellosis. Substantial repair; stem and options kept.
  {
    q: 'B1', id: 'bio-603', expectLetter: 'C',
    explanation: [
      ['<p><strong><em>Trichinella spiralis</em></strong> causes <strong>trichinellosis (trichinosis)</strong>, acquired by eating <strong>undercooked meat containing encysted larvae</strong> - classically pork, but also wild game (boar, bear). After',
        '<p><strong><em>Trichinella spiralis</em></strong> is one of the species that causes <strong>trichinellosis</strong>, acquired by eating <strong>undercooked meat containing infective larvae</strong>, including pork and wild game. After'],

      ['<p>The classic triad is: <strong>periorbital edema, myalgia, and eosinophilia</strong>. Muscle biopsy showing coiled larvae within a nurse cell (encysted in muscle fibers) is diagnostic.</p>',
        "<p>Periorbital edema, muscle pain and eosinophilia are characteristic clues, especially after eating undercooked " +
        "wild game. Demonstrating <em>Trichinella</em> larvae within affected muscle tissue supports the diagnosis.</p>"],

      ['<p><strong>A. Taenia solium:</strong> While <em>T. solium</em> cysticerci can be found in muscle tissue (causing cysticercosis), this occurs when humans ingest <em>eggs</em> (not meat with larvae). The clinical presentation of cysticercosis is different - typically seizures from neurocysticercosis. The characteristic triad of periorbital edema, myalgia, and marked eosinophilia is specific to <em>Trichinella</em>, not <em>Taenia</em>.</p>',
        "<p><strong>A. Taenia solium:</strong> Ingesting <em>T. solium</em> eggs can cause cysticercosis, including cysts in " +
        "muscle or the nervous system. Ingesting pork containing cysticerci instead causes an intestinal tapeworm " +
        "infection. The meat exposure, systemic symptoms and larvae within muscle fibers in this stem favor " +
        "trichinellosis.</p>"],

      ['<p><strong>B. Toxocara canis:</strong> <em>Toxocara</em> (dog roundworm) causes <strong>visceral larva migrans</strong> in children who ingest eggs from soil contaminated with dog feces. Larvae migrate through the liver, lungs, and eyes (ocular larva migrans) causing eosinophilia, but they do not encyst in skeletal muscle fibers. The transmission is from soil/feces, not undercooked meat.</p>',
        "<p><strong>B. Toxocara canis:</strong> <em>Toxocara</em> larvae can migrate through organs including the liver, " +
        "lungs, eyes and skeletal muscle. Infection usually follows ingestion of eggs from contaminated soil, but infected " +
        "meat or offal can also transmit larvae. The characteristic <em>Trichinella</em> muscle-stage appearance and the " +
        "overall presentation make <em>T. spiralis</em> the best choice here.</p>"],

      [' It does not encyst in skeletal muscle and is not transmitted through meat. Guinea worm disease is nearly eradicated globally.</p>',
        ' It does not encyst in skeletal muscle and is not transmitted through meat.</p>'],

      ["<li><em>Trichinella</em> has no free-living stage - the entire lifecycle occurs within mammalian hosts (one animal eats another's infected meat)</li>",
        '<li><em>T. spiralis</em> completes its life cycle within mammalian hosts; transmission occurs when an animal eats infected meat</li>'],

      ['<li>Prevention: cook meat to internal temperature of 71°C (160°F); freezing kills most <em>Trichinella</em> species (but not <em>T. nativa</em> in Arctic animals)</li>',
        '<li>Cook meat thoroughly using appropriate food-safety guidance and a food thermometer; freezing wild game is not a reliable way to kill <em>Trichinella</em> larvae</li>'],

      ['<li>Treatment: albendazole or mebendazole for intestinal worms + corticosteroids for severe myositis or myocarditis</li>',
        '<li>Albendazole or mebendazole may be used; severe inflammatory complications may also require corticosteroids</li>'],

      ["<p class='exp-key'>Bottom Line: Periorbital edema + myalgia + eosinophilia + undercooked meat history = Trichinella spiralis. Larvae encyst in skeletal muscle. Cook meat thoroughly to prevent infection.</p>",
        "<p class='exp-key'>Bottom Line: <em>Trichinella</em> larvae acquired in undercooked meat can invade skeletal " +
        "muscle, producing myalgia, periorbital edema and eosinophilia. The exposure history and muscle findings identify " +
        "trichinellosis here.</p>"]
    ],
    keepHeadings: ['<strong>A. Taenia solium:</strong>', '<strong>B. Toxocara canis:</strong>', '<strong>D. Dracunculus medinensis:</strong>'],
    gone: [
      'The classic triad is',                                  // characteristic, not individually specific
      'is specific to <em>Trichinella</em>',
      'they do not encyst in skeletal muscle fibers',          // Toxocara can involve skeletal muscle
      'The transmission is from soil/feces, not undercooked meat',
      'Guinea worm disease is nearly eradicated globally',     // time-dependent and not needed
      'cook meat to internal temperature of 71',               // one temperature is not a universal rule
      'freezing kills most <em>Trichinella</em> species',      // freezing wild game is unreliable
      'has no free-living stage'
    ]
  },

  // ---- B2 bio-604: mosquito-disease pairings. Substantial repair; new stem, full explanation.
  {
    q: 'B2', id: 'bio-604', expectLetter: 'C',
    stemFull: 'Which mosquito genus–disease pairing is correct?',
    explanationFull: B2_EXPLANATION,
    gone: [
      'breed in stagnant, polluted water',                     // genus-wide habitat rule; JE vectors use rice fields
      'rests at 45° angle, breeds in clean water',
      'Night-biter, breeds in polluted water',
      'Malaria is exclusively transmitted by <em>Anopheles</em>',
      'Yellow fever is transmitted by <em>Aedes aegypti</em>, not <em>Anopheles</em>',   // ignores sylvatic vectors
      'preventable with the live attenuated 17D vaccine',
      'Remember: "A-M-A"',
      'Only female mosquitoes bite',
      'The mosquito-disease pairing is high-yield for exams'
    ]
  },

  // ---- B3 bio-605: European Lyme borreliosis. Substantial repair; option B renamed.
  {
    q: 'B3', id: 'bio-605', expectLetter: 'B',
    optionFull: [[1, 'Borrelia burgdorferi sensu lato (species complex)']],
    explanation: [
      ['<h4>Correct Answer: Borrelia burgdorferi</h4>',
        '<h4>Correct Answer: Borrelia burgdorferi sensu lato (species complex)</h4>'],

      ['<p><strong><em>Borrelia burgdorferi</em></strong> causes <strong>Lyme disease</strong> (Lyme borreliosis), the most common tick-borne disease in the Northern Hemisphere. It is transmitted by <em>Ixodes</em> ticks (<em>I. scapularis</em> in North America, <em>I. ricinus</em> in Europe). The disease progresses through three stages:</p><ul><li><strong>Stage 1 (Early localized):</strong> Erythema migrans - expanding "bull\'s-eye" rash at the bite site (appears 3-30 days after bite)</li><li><strong>Stage 2 (Early disseminated):</strong> Cardiac involvement (AV block), neurological involvement (facial nerve palsy/Bell\'s palsy, meningitis), and multiple erythema migrans lesions</li><li><strong>Stage 3 (Late):</strong> Chronic arthritis (especially large joints like the knee) and chronic encephalopathy</li></ul>',
        "<p><strong>Lyme borreliosis</strong> is caused by bacteria in the <em>Borrelia burgdorferi</em> sensu lato species " +
        "complex. In Europe, important members include <em>B. afzelii</em> and <em>B. garinii</em> as well as " +
        "<em>B. burgdorferi</em> sensu stricto. <em>Ixodes ricinus</em> is an important European vector.</p>" +
        "<p><strong>Erythema migrans</strong> is an expanding skin lesion that may have central clearing but does not " +
        "always look like a bull's-eye. Disseminated infection can affect nerves and the heart, causing facial palsy, " +
        "meningitis or atrioventricular conduction block. Later manifestations can include arthritis and, in Europe, " +
        "particular chronic skin changes. These manifestations do not have to occur in a fixed sequence, and not every " +
        "patient develops all of them.</p>"],

      ['<p><strong>A. Rickettsia rickettsii:</strong> <em>R. rickettsii</em> causes <strong>Rocky Mountain Spotted Fever (RMSF)</strong>, transmitted by the <em>Dermacentor</em> tick (dog tick), not <em>Ixodes</em>. RMSF presents with fever, headache, and a characteristic petechial rash that starts on the wrists and ankles and spreads centrally (centripetal). It does not cause erythema migrans or the staged progression of Lyme disease.</p>',
        "<p><strong>A. Rickettsia rickettsii:</strong> This bacterium causes Rocky Mountain spotted fever, a different " +
        "tick-borne illness. Fever, headache and a rash that may become petechial are typical clues. It does not explain " +
        "the characteristic expanding erythema migrans lesion with subsequent Lyme-type neurological and cardiac " +
        "involvement.</p>"],

      ['<p><strong>C. Francisella tularensis:</strong> <em>F. tularensis</em> causes <strong>tularemia</strong> (rabbit fever), which can be transmitted by tick bites (<em>Dermacentor</em> tick), direct animal contact, or inhalation. It presents as an ulceroglandular disease (skin ulcer + regional lymphadenopathy), not the expanding ring-shaped rash. There is no staged cardiac or neurological dissemination like Lyme disease.</p>',
        "<p><strong>C. Francisella tularensis:</strong> Tularemia can follow tick bites or contact with infected animals. " +
        "A skin ulcer with enlarged regional lymph nodes is a common presentation. That differs from the expanding " +
        "erythema migrans lesion in this stem.</p>"],

      ['<p><strong>D. Tick-borne encephalitis virus:</strong> <strong>TBE virus</strong> is also transmitted by <em>Ixodes</em> ticks in Europe and Asia but presents as a biphasic illness: initial flu-like symptoms, then meningoencephalitis with headache, confusion, and neurological deficits. It does not cause erythema migrans, cardiac arrhythmias, or the specific staged progression described. TBE is preventable with vaccination.</p>',
        "<p><strong>D. Tick-borne encephalitis virus:</strong> This virus is also transmitted by <em>Ixodes</em> ticks in " +
        "Europe and can cause meningitis or encephalitis. It does not produce the characteristic erythema migrans lesion " +
        "that points to Lyme borreliosis here.</p>"],

      ['<li>Erythema migrans is pathognomonic for Lyme disease - the diagnosis is primarily clinical</li>',
        '<li>A typical erythema migrans lesion in an appropriate exposure setting supports a clinical diagnosis; it need not have a classic bull\'s-eye appearance</li>'],

      ['<li>Treatment: early Lyme - doxycycline (adults), amoxicillin (children/pregnant); late Lyme with CNS involvement - IV ceftriaxone</li>',
        '<li>Preventive measures include avoiding tick bites and checking for and promptly removing attached ticks</li>'],

      ['<li><em>Ixodes</em> ticks also transmit babesiosis, anaplasmosis, and TBE - co-infections can occur from a single tick bite</li>',
        '<li><em>Ixodes</em> ticks can transmit several pathogens; which infections occur depends on tick species and geography</li>'],

      ["<p class='exp-key'>Bottom Line: Erythema migrans (bull's-eye rash) + tick bite + staged progression (skin → heart/nerves → joints) = Lyme disease caused by Borrelia burgdorferi, transmitted by Ixodes ticks.</p>",
        "<p class='exp-key'>Bottom Line: An expanding erythema migrans lesion after a tick bite, followed by facial palsy " +
        "or cardiac conduction problems, suggests Lyme borreliosis. In Europe, several members of the " +
        "<em>B. burgdorferi</em> sensu lato complex can cause it.</p>"]
    ],
    keepHeadings: ['<strong>A. Rickettsia rickettsii:</strong>', '<strong>C. Francisella tularensis:</strong>', '<strong>D. Tick-borne encephalitis virus:</strong>'],
    gone: [
      'The disease progresses through three stages',           // no obligatory staged sequence
      'Stage 1 (Early localized)',
      'Erythema migrans is pathognomonic for Lyme disease',
      'doxycycline (adults), amoxicillin (children/pregnant)', // age-based shortcut
      'IV ceftriaxone',
      'the most common tick-borne disease in the Northern Hemisphere',
      'staged progression (skin'
    ]
  },

  // ---- B4 bio-606: epidemic typhus. Targeted feedback repair only.
  {
    q: 'B4', id: 'bio-606', expectLetter: 'B',
    explanation: [
      ['<p><strong>A. Rat flea (Xenopsylla cheopis):</strong> The rat flea transmits <strong><em>Yersinia pestis</em></strong> (plague/Black Death) and <strong><em>Rickettsia typhi</em></strong> (endemic/murine typhus - note the different species from epidemic typhus). Endemic typhus is milder than epidemic typhus and is associated with rats, not human overcrowding. The flea also transmits <em>Hymenolepis diminuta</em> (rat tapeworm).</p>',
        "<p><strong>A. Rat flea (Xenopsylla cheopis):</strong> Rat fleas are associated with plague and flea-borne murine " +
        "typhus, caused by <em>Rickettsia typhi</em>. Epidemic typhus is caused by <em>R. prowazekii</em> and is " +
        "classically associated with body lice in crowded conditions. These similar disease names refer to different " +
        "infections and vectors.</p>"],

      ['They are not associated with any <em>Rickettsia</em> species.',
        'They are not the established vector of epidemic typhus.']
    ],
    keepHeadings: ['<strong>A. Rat flea (Xenopsylla cheopis):</strong>', '<strong>C. Hard tick (Ixodes ricinus):</strong>', '<strong>D. Deer fly (Chrysops):</strong>'],
    gone: [
      'associated with rats, not human overcrowding',           // flea-borne typhus is not confined to rats
      'Hymenolepis diminuta',                                   // tapeworm reference needs a different mechanism
      'They are not associated with any <em>Rickettsia</em> species'
    ]
  },

  // ---- B5 bio-607: heterocysts. Targeted repair; stem scoped to filamentous cyanobacteria.
  {
    q: 'B5', id: 'bio-607', expectLetter: 'A',
    stemFull: 'Some filamentous cyanobacteria form specialized thick-walled cells that fix atmospheric nitrogen into ammonia. What are these cells called?',
    explanation: [
      ['<li>Lacking Photosystem II (which produces O₂) while retaining Photosystem I (which generates ATP)</li>',
        '<li>Suppressing oxygen-producing Photosystem II activity while retaining Photosystem I-dependent electron flow that supports ATP production</li>'],

      ['<li>Heterocysts are connected to neighboring vegetative cells by microplasmodesmata (channels) through which they exchange fixed nitrogen for carbon compounds</li>',
        '<li>Heterocysts exchange fixed nitrogen and carbon compounds with neighboring vegetative cells through connections called septal junctions</li>'],

      ['<li>Nitrogen fixation: N₂ + 8H⁺ + 8e⁻ + 16 ATP → 2NH₃ + H₂ + 16 ADP - it is extremely energy-expensive</li>',
        '<li>Nitrogen fixation converts N₂ to ammonia and requires substantial ATP and reducing power</li>'],

      ["<p class='exp-key'>Bottom Line: Heterocysts = nitrogen fixation in cyanobacteria. They maintain an anaerobic environment (thick wall, no PSII, high respiration) to protect the oxygen-sensitive nitrogenase enzyme.</p>",
        "<p class='exp-key'>Bottom Line: Heterocysts are specialized nitrogen-fixing cells in some filamentous " +
        "cyanobacteria. They maintain a low-oxygen interior to protect nitrogenase while neighboring cells supply carbon " +
        "compounds.</p>"]
    ],
    keepHeadings: ['<strong>B. Akinetes:</strong>', '<strong>C. Hormogonia:</strong>', '<strong>D. Baeocytes:</strong>'],
    gone: [
      'Lacking Photosystem II',                                 // PSII activity is suppressed, not absent wholesale
      'microplasmodesmata',
      '16 ATP',                                                 // the unbalanced equation
      'maintain an anaerobic environment',
      'Cyanobacteria can fix atmospheric nitrogen'              // the old unscoped stem
    ]
  },

  // ---- B6 bio-609: Great Oxidation Event. Substantial repair; new stem.
  {
    q: 'B6', id: 'bio-609', expectLetter: 'A',
    stemFull: "About 2.4 billion years ago, oxygen began to accumulate persistently in Earth's atmosphere, with oxygenic photosynthesis by cyanobacteria providing its biological source. What is this major transition called?",
    explanation: [
      ['<p>The <strong>Great Oxidation Event (GOE)</strong>, approximately <strong>2.4 billion years ago</strong>, was the dramatic rise of atmospheric oxygen (O₂) from near-zero to significant levels. This was caused by <strong>cyanobacteria</strong> - the first organisms to perform <strong>oxygenic photosynthesis</strong> - releasing oxygen as a byproduct over hundreds of millions of years.</p><p><strong>Stromatolites</strong> are layered sedimentary structures formed by cyanobacterial mats trapping and binding sediments. Fossil stromatolites dating back 3.5 billion years are among the oldest evidence of life on Earth, and living stromatolites still exist today (e.g., Shark Bay, Western Australia).</p>',
        "<p>The <strong>Great Oxidation Event</strong> was the major rise in atmospheric oxygen beginning about " +
        "<strong>2.4 billion years ago</strong>. Oxygenic photosynthesis evolved before this transition. Atmospheric " +
        "oxygen accumulated when its production and preservation exceeded the processes consuming it, including reactions " +
        "with reduced materials in the oceans and crust. This did not immediately produce today's atmospheric oxygen " +
        "level.</p>" +
        "<p><strong>Stromatolites</strong> are layered sedimentary structures associated with microbial communities, which " +
        "can trap sediment and promote mineral precipitation. Many modern examples involve cyanobacteria. Ancient " +
        "stromatolites provide evidence about early microbial life, but their shape alone does not identify the organisms " +
        "or prove that they produced oxygen.</p>"],

      ['<p><strong>B. The Cambrian Explosion:</strong> The Cambrian Explosion occurred approximately <strong>541 million years ago</strong> - nearly 2 billion years after the GOE. It was the rapid diversification of complex multicellular animal life (most major phyla appeared). While the oxygen produced by cyanobacteria likely enabled the Cambrian Explosion by raising O₂ levels sufficiently for complex aerobic organisms, the two events are distinct.</p>',
        "<p><strong>B. The Cambrian Explosion:</strong> This diversification of animal life occurred about 540 million " +
        "years ago, much later than the Great Oxidation Event. Oxygen availability was relevant to animal evolution, but " +
        "these are distinct events separated by nearly two billion years.</p>"],

      ['<p><strong>C. The Permian-Triassic Extinction:</strong> This mass extinction occurred approximately <strong>252 million years ago</strong> and was the most severe in Earth\'s history, eliminating about 96% of marine species and 70% of terrestrial vertebrate species. It was likely caused by massive volcanism (Siberian Traps), not by cyanobacteria. It is informally called "The Great Dying."</p>',
        "<p><strong>C. The Permian-Triassic Extinction:</strong> This severe mass extinction occurred about 252 million " +
        "years ago and is associated with massive volcanism and major environmental disruption. It was not the initial " +
        "persistent accumulation of atmospheric oxygen.</p>"],

      ["<li>Before the GOE, Earth's atmosphere was anoxic (reducing), containing mainly N₂, CO₂, CH₄, and water vapor</li>",
        '<li>Oxygenic photosynthesis predates the Great Oxidation Event; oxygen production and atmospheric accumulation are different milestones</li>'],

      ['<li>The GOE was actually catastrophic for most existing anaerobic life ("Oxygen Catastrophe") - oxygen was toxic to obligate anaerobes</li>',
        '<li>Increasing oxygen changed habitats and disadvantaged oxygen-sensitive organisms while supporting wider use of aerobic metabolism</li>'],

      ['<li>Banded iron formations (BIFs) in the geological record show how early oxygen was absorbed by dissolved iron in the oceans before accumulating in the atmosphere</li>',
        '<li>Geological evidence for ancient oxygen includes chemical signals in rocks; stromatolite shape alone does not identify its producer or metabolism</li>'],

      ["<p class='exp-key'>Bottom Line: Cyanobacteria caused the Great Oxidation Event (~2.4 Ga) through oxygenic photosynthesis, transforming Earth from an anoxic to an oxygenated planet. Stromatolites are the fossil evidence of ancient cyanobacterial mats.</p>",
        "<p class='exp-key'>Bottom Line: The Great Oxidation Event marks persistent atmospheric oxygen accumulation " +
        "beginning about 2.4 billion years ago. Cyanobacterial photosynthesis supplied oxygen, but accumulation also " +
        "depended on the balance between oxygen production and consumption.</p>"]
    ],
    keepHeadings: ['<strong>B. The Cambrian Explosion:</strong>', '<strong>C. The Permian-Triassic Extinction:</strong>', '<strong>D. The Late Heavy Bombardment:</strong>'],
    gone: [
      'the first organisms to perform',                         // oxygenic photosynthesis predates the GOE
      'formed by cyanobacterial mats',                          // stromatolite shape does not identify the producer
      'catastrophic for most existing anaerobic life',
      'anoxic (reducing)',                                      // anoxic and reducing are not interchangeable
      'eliminating about 96% of marine species',                // fixed extinction percentages not needed
      'transforming Earth from an anoxic to an oxygenated planet',
      'Cyanobacteria caused the Great Oxidation Event'
    ]
  }
];
