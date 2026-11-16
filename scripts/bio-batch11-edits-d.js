/**
 * Biology review batch 11, edits for File B items B14, B15, B17 and B18.
 * Spec shape is documented in scripts/bio-batch11-edits-a.js.
 *
 * B16 (bio-622, ethology) is left byte-identical per the review.
 */
'use strict';

module.exports = [
  // ---- B14 bio-619: sustainable forestry. Targeted qualification; option A kept.
  {
    q: 'B14', id: 'bio-619', expectLetter: 'A',
    explanation: [
      ["<p><strong>Selective logging with replanting</strong> exemplifies sustainable development because it allows resource utilization (timber harvest) while maintaining the ecosystem's ability to regenerate and continue providing resources for future generations. This approach balances the <strong>three pillars of sustainability</strong>: environmental protection, economic viability, and social equity.</p>",
        "<p>Option A best represents the intention of <strong>sustainable resource use</strong>: harvesting timber while " +
        "maintaining the forest's ability to regenerate. Whether it succeeds depends on harvest intensity, species " +
        "selection, soil and water protection, biodiversity, and the effects on local communities. Replanting alone does " +
        "not guarantee sustainability. Sustainable development considers environmental, economic and social outcomes " +
        "together.</p>"],

      ['<p><strong>B. Clear-cutting an entire forest to maximize short-term timber revenue:</strong> Clear-cutting destroys the entire forest ecosystem, causing soil erosion, loss of biodiversity, disruption of water cycles, and habitat destruction. While it maximizes immediate economic return, it fails the sustainability test because it compromises the forest\'s ability to regenerate and provide resources for future generations. This prioritizes short-term gain over long-term viability.</p>',
        "<p><strong>B. Clear-cutting an entire forest to maximize short-term timber revenue:</strong> The option " +
        "prioritizes immediate revenue rather than regeneration, biodiversity or other long-term forest functions. " +
        "Extensive clearing can damage habitat, soil and water regulation. Some cleared forests can regenerate, but this " +
        "does not make a strategy focused only on short-term revenue sustainable.</p>"],

      ['<p><strong>C. Extracting groundwater faster than the aquifer recharge rate:</strong> This is the definition of <strong>unsustainable resource use</strong> - extracting a resource faster than it can be replenished. Aquifer depletion leads to dropping water tables, land subsidence, saltwater intrusion in coastal areas, and eventual water scarcity. Sustainable water management requires extraction at or below the natural recharge rate.</p>',
        "<p><strong>C. Extracting groundwater faster than the aquifer recharge rate to meet current agricultural " +
        "demands:</strong> Sustained excessive pumping can deplete groundwater storage and lower water tables. " +
        "Sustainable management must also consider connected rivers, wetlands and water quality; simply matching pumping " +
        "to an estimated recharge rate does not guarantee that these are protected.</p>"],

      ['<p><strong>D. Converting all wetlands in a region to farmland:</strong> Wetlands provide essential <strong>ecosystem services</strong>: flood control, water filtration, groundwater recharge, carbon sequestration, and biodiversity habitat. Destroying all wetlands eliminates these services, ultimately reducing agricultural productivity through increased flooding, water pollution, and loss of pollinators. This trades natural capital for short-term agricultural output.</p>',
        "<p><strong>D. Converting all wetlands in a region to farmland to increase crop production:</strong> Wetlands " +
        "provide habitat, water filtration, flood regulation and other services. Removing all of them sacrifices these " +
        "functions for a single use. The resulting ecological and water-management costs make this an unsuitable example " +
        "of sustainable development.</p>"],

      ['<li>The "tragedy of the commons" describes how shared resources are overexploited when individuals act in self-interest without collective management</li>',
        '<li>The "tragedy of the commons" describes the risk that shared resources can be overused when individual incentives are not matched by effective collective management</li>'],

      ["<p class='exp-key'>Bottom Line: Sustainable development = using resources at a rate that allows natural regeneration, ensuring future availability. The key test: can this practice continue indefinitely without depleting the resource base?</p>",
        "<p class='exp-key'>Bottom Line: Sustainable forestry maintains regeneration and ecosystem functions while " +
        "considering economic and community needs. Selective harvesting with regeneration can contribute to that goal, " +
        'but replanting alone is not proof of sustainability.</p>']
    ],
    keepHeadings: ['<strong>B. Clear-cutting an entire forest to maximize short-term timber revenue:</strong>'],
    gone: [
      'exemplifies sustainable development because it allows',       // replanting alone is not proof
      'This approach balances the <strong>three pillars',
      'Clear-cutting destroys the entire forest ecosystem',          // some cleared forests do regenerate
      'This is the definition of <strong>unsustainable resource use',
      'requires extraction at or below the natural recharge rate',   // recharge-only rule is incomplete
      'shared resources are overexploited when individuals act in self-interest',
      'can this practice continue indefinitely without depleting the resource base'
    ],
    keepText: ['The Brundtland Commission defined sustainable development as']
  },

  // ---- B15 bio-621: biodiversity loss. Substantial repair; new stem sets the scope.
  {
    q: 'B15', id: 'bio-621', expectLetter: 'A',
    stemFull: 'According to the 2019 IPBES Global Assessment, which option best describes the leading direct driver of biodiversity loss in terrestrial and freshwater ecosystems since 1970?',
    explanation: [
      ['<p><strong>Habitat destruction and fragmentation</strong> is consistently identified as the <strong>single greatest driver of biodiversity loss</strong> globally. The conversion of natural ecosystems to agriculture, urban development, infrastructure, and resource extraction eliminates the physical environments that species need to survive. Fragmentation further divides remaining habitats into smaller, isolated patches that cannot support viable populations.</p><p>According to the IPBES Global Assessment (2019), approximately <strong>75% of the land surface</strong> has been significantly altered by human actions, and <strong>1 million species</strong> face extinction risk, primarily due to habitat loss.</p>',
        "<p><strong>Land-use change</strong> has had the greatest overall negative impact on terrestrial and freshwater " +
        "ecosystems in the assessment's time frame. Agriculture, urban growth and infrastructure can remove habitat or " +
        "divide it into smaller patches, reducing the space and connections that populations need.</p>" +
        "<p>This ranking is not universal across all environments: direct exploitation, especially fishing, has been the " +
        "leading pressure in marine ecosystems. Climate change, pollution and invasive species also cause major losses " +
        "and can interact with habitat change.</p>"],

      ['<p><strong>B. Pollution of freshwater ecosystems:</strong> Freshwater pollution (agricultural runoff, industrial waste, plastic contamination) is indeed a serious threat to aquatic biodiversity, contributing to eutrophication, dead zones, and species decline. However, it ranks below habitat destruction as an overall driver of global biodiversity loss. Pollution often acts as a secondary stressor that compounds the effects of habitat loss.</p>',
        "<p><strong>B. Pollution of freshwater ecosystems:</strong> Pollution can severely damage aquatic life, including " +
        "through nutrient enrichment and toxic contamination. It is a major direct driver, but it is not the " +
        "highest-ranked overall driver for the combined terrestrial and freshwater scope specified here. Its importance " +
        "varies by place and ecosystem.</p>"],

      ['<p><strong>C. Invasive alien species introduction:</strong> Invasive species are the <strong>second or third greatest</strong> threat to biodiversity (particularly devastating on islands, where they are the leading cause of extinctions). Examples include rats, cats, and mongooses devastating island bird populations, and zebra mussels disrupting Great Lakes ecosystems. However, at the global scale, habitat destruction remains the primary driver.</p>',
        "<p><strong>C. Invasive alien species introduction:</strong> Invasive species can cause serious declines and " +
        "extinctions, particularly in vulnerable island communities. Their relative importance varies with the organisms, " +
        "location and measure being studied. Habitat change is the best answer for the combined terrestrial and " +
        "freshwater scope in this stem.</p>"],

      ['<li>The five major drivers of biodiversity loss (HIPPO): Habitat loss, Invasive species, Pollution, Population growth (overexploitation), and Overharvesting/climate change</li>',
        '<li>IPBES identifies five major direct drivers: land/sea-use change, direct exploitation of organisms, climate change, pollution and invasive alien species</li>'],

      ["<p class='exp-key'>Bottom Line: Habitat destruction is the #1 cause of biodiversity loss globally. Remember HIPPO: Habitat loss, Invasive species, Pollution, Population, Overharvesting. Protecting and restoring habitats is the most effective conservation strategy.</p>",
        "<p class='exp-key'>Bottom Line: Habitat loss and fragmentation associated with land-use change have been the " +
        "leading pressures on terrestrial and freshwater biodiversity in the stated assessment. Driver rankings depend on " +
        'the ecosystem; direct exploitation has led in marine systems.</p>']
    ],
    keepHeadings: ['<strong>B. Pollution of freshwater ecosystems:</strong>', '<strong>C. Invasive alien species introduction:</strong>', '<strong>D. Ozone layer depletion:</strong>'],
    gone: [
      'single greatest driver of biodiversity loss',          // needs an ecosystem and time frame
      'single greatest current threat to global biodiversity',  // the old unscoped stem
      'second or third greatest',                             // unsupported fixed ranking
      'HIPPO',                                                // mixes direct and indirect drivers
      'Habitat destruction is the #1 cause'
    ],
    keepText: ['tropical forests contain over 50% of all terrestrial species', '30x30']
  },

  // ---- B17 bio-623: dicots and monocots. Targeted repair, including table edits.
  {
    q: 'B17', id: 'bio-623', expectLetter: 'D',
    explanation: [
      ['<p>Dicotyledonous plants (dicots) are characterized by having <strong>two cotyledons</strong> (seed leaves), a <strong>tap root system</strong> with a main primary root, <strong>reticulate (net-like) venation</strong> in their leaves, <strong>flower parts in multiples of 4 or 5</strong>, and <strong>vascular bundles arranged in a ring</strong> within the stem.</p>',
        "<p>Many familiar dicots, especially <strong>eudicots</strong>, typically have two cotyledons, a tap root, net-like " +
        "leaf venation, flower parts in fours or fives, and stem vascular bundles arranged in a ring. Monocots usually " +
        "show the contrasting pattern. These are useful general comparisons, but individual traits have exceptions.</p>"],

      ['<tr><th>Feature</th><th>Dicots</th><th>Monocots</th></tr>',
        '<tr><th>Feature</th><th>Typical dicot/eudicot pattern</th><th>Typical monocot pattern</th></tr>'],

      ['<tr><td>Secondary growth</td><td>Usually present</td><td>Usually absent</td></tr>',
        '<tr><td>Secondary growth</td><td>Present in many, especially woody species</td><td>Usually absent</td></tr>'],

      ['<p><strong>A. Parallel leaf venation and fibrous root system:</strong> These are hallmark features of <strong>monocots</strong>, not dicots. Grasses, lilies, and orchids are monocots with parallel veins running along the leaf length and a fibrous root system with many thin roots of similar size.</p>',
        "<p><strong>A. Parallel leaf venation and fibrous root system:</strong> These are typical monocot features, as " +
        "seen in many grasses and lilies. Net-like venation and a main tap root are the contrasting pattern commonly " +
        "taught for dicots. No single leaf or root feature should be treated as an exception-free classification " +
        "test.</p>"],

      ['<p><strong>C. Scattered vascular bundles in the stem:</strong> Scattered vascular bundles throughout the ground tissue (parenchyma) of the stem is a <strong>monocot</strong> characteristic. In dicots, vascular bundles are arranged in a neat ring around the central pith, which enables secondary growth and the formation of wood.</p>',
        "<p><strong>C. Scattered vascular bundles in the stem:</strong> Scattered bundles are typical of monocot stems, " +
        "whereas a ring of bundles is common in dicot stems. Secondary growth depends on the activity of lateral " +
        "meristems such as the vascular cambium; a ring arrangement alone does not mean that a plant must become " +
        "woody.</p>"],

      ['<li>Modern classification uses the term "eudicots" (true dicots) based on molecular phylogenetics, as some traditional dicots are now recognized as basal angiosperms.</li>',
        '<li>Eudicots form a major evolutionary group within the plants traditionally called dicots. Not all traditional dicots are eudicots, so the terms are not exact synonyms.</li>'],

      ["<p class='exp-key'>Bottom Line: Dicots have two cotyledons, tap roots, net-like leaf venation, flower parts in 4s or 5s, and ring-arranged vascular bundles. Monocots have one cotyledon, fibrous roots, parallel venation, flower parts in 3s, and scattered vascular bundles.</p>",
        "<p class='exp-key'>Bottom Line: The typical dicot pattern is two cotyledons, net-like veins, a tap root, flower " +
        "parts in fours or fives and ring-arranged stem bundles. Compare these general patterns with monocots while " +
        'recognizing that individual traits can have exceptions.</p>']
    ],
    keepHeadings: ['<strong>A. Parallel leaf venation and fibrous root system:</strong>', '<strong>B. Flower parts in multiples of three:</strong>', '<strong>C. Scattered vascular bundles in the stem:</strong>'],
    gone: [
      'are characterized by having <strong>two cotyledons</strong>',   // typical pattern, not a diagnostic rule
      '<th>Dicots</th>',
      'Usually present</td><td>Usually absent',                       // many dicots are herbaceous
      'hallmark features of <strong>monocots</strong>',
      'which enables secondary growth and the formation of wood',      // a ring does not guarantee wood
      '"eudicots" (true dicots)',
      'Dicots have two cotyledons, tap roots'
    ],
    keepText: ['Common dicot examples', 'Common monocot examples']
  },

  // ---- B18 bio-624: cetaceans. Targeted repair.
  {
    q: 'B18', id: 'bio-624', expectLetter: 'C',
    explanation: [
      ['<p>Cetaceans (order Cetacea) are a group of fully aquatic marine mammals that includes <strong>whales, dolphins, and porpoises</strong>. They share key adaptations for aquatic life: a streamlined fusiform body, a horizontal tail fluke for propulsion, flippers (modified forelimbs), a blowhole for breathing, and no external hind limbs.</p>',
        "<p><strong>Cetaceans</strong> are the fully aquatic mammal group that includes whales, dolphins and porpoises. " +
        "Most live in the sea, but some dolphins inhabit rivers. Their aquatic adaptations include a streamlined body, " +
        "horizontal tail flukes, forelimbs modified into flippers, one or two blowholes for breathing, and the absence of " +
        "functional external hind limbs.</p>"],

      ['a pinniped</strong> (order Carnivora, suborder Pinnipedia)',
        'a pinniped, belonging to the order Carnivora</strong>'],

      ['<p><strong>D. Sea lion and walrus:</strong> Both sea lions and walruses are <strong>pinnipeds</strong>, not cetaceans. They are semi-aquatic and spend significant time on land or ice, unlike cetaceans which are entirely aquatic and would be unable to survive on land.</p>',
        "<p><strong>D. Sea lion and walrus:</strong> Both are pinnipeds, not cetaceans. Pinnipeds are adapted to life in " +
        "water but also come onto land or ice for activities such as resting and reproduction. Whales and dolphins " +
        "complete their life cycles in the water.</p>"],

      ['two main suborders', 'two main groups'],

      ['<li>Molecular evidence shows cetaceans are most closely related to hippopotamuses, placing them within the order Artiodactyla (even-toed ungulates).</li>',
        '<li>Cetaceans are nested within the even-toed ungulate lineage, often called Artiodactyla or Cetartiodactyla in modern classifications. Hippopotamuses are their closest living relatives.</li>'],

      ["<p class='exp-key'>Bottom Line: Cetaceans include whales, dolphins, and porpoises -- all fully aquatic mammals. Sea lions and walruses are pinnipeds (semi-aquatic carnivores). The key distinction: cetaceans never leave the water; pinnipeds haul out on land or ice.</p>",
        "<p class='exp-key'>Bottom Line: Whales, dolphins and porpoises are cetaceans. Sea lions and walruses are " +
        'pinnipeds. Cetaceans remain aquatic throughout their life cycles, while pinnipeds also use land or ice.</p>']
    ],
    keepHeadings: ['<strong>A. Dolphin and sea lion:</strong>', '<strong>B. Whale and walrus:</strong>', '<strong>D. Sea lion and walrus:</strong>'],
    gone: [
      'fully aquatic marine mammals',                      // some dolphins live in rivers
      'suborder Pinnipedia',                               // contradictory rank
      'two main suborders',
      'cetaceans never leave the water',
      'would be unable to survive on land',
      'order Artiodactyla (even-toed ungulates)'
    ],
    keepText: ['Mysticeti', 'Odontoceti', 'vestigial pelvic bones']
  }
];
