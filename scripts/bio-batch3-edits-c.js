/**
 * Batch 3 review, part C: displayed Q25-Q36 (bio-88 .. bio-101).
 * Includes the third substantial rewrite, Q30, and Q34 where the review asks
 * for the calculation and distractor feedback to be left alone.
 */
'use strict';

const GENERIC_ECOL =
  '<ul><li>Energy flows one way through ecosystems (sun to producers to consumers to decomposers), while matter (nutrients) cycles through biogeochemical pathways.</li>'
  + '<li>Only about 10% of energy is transferred between trophic levels - the rest is lost as heat through cellular respiration.</li>'
  + '<li>Biodiversity increases ecosystem stability and resilience; keystone species have disproportionately large effects on community structure.</li></ul>';

const GENERIC_EVO =
  '<ul><li>Natural selection acts on phenotypic variation within populations - individuals with traits better suited to their environment have higher reproductive success.</li>'
  + '<li>Evidence for evolution comes from multiple independent sources: fossil record, comparative anatomy (homologous structures), molecular biology (DNA/protein comparisons), and biogeography.</li>'
  + '<li>Speciation can occur through geographic isolation (allopatric) or within the same area through ecological or behavioral differences (sympatric).</li></ul>';

const points = items => '<ul>' + items.map(t => '<li>' + t + '</li>').join('') + '</ul>';

module.exports = [

// ============================================================ Q25 bio-88
// Placeholder feedback; also softened the inevitable climax community and the
// idea that lichens and mosses must come first.
{
  q: 25, id: 'bio-88', expectLetter: 'D',
  explanation: [
    ['Pioneer species such as lichens and mosses are the first colonizers, gradually breaking down rock to form soil. The process is much slower than secondary succession and can take hundreds to thousands of years to reach a climax community.</p>',
     'Lichens and mosses are familiar pioneers, helping to break rock down into soil, though they are not the compulsory first organisms in every case. Primary succession is far slower than secondary succession and can take hundreds or thousands of years. Trajectories and timescales vary, so it does not follow one fixed sequence to a single permanent endpoint.</p>'],
    ['<p><strong>A. Secondary succession:</strong> <em>Secondary succession</em> is incorrect for this question. The correct answer is <em>Primary succession</em>, which specifically matches the definition or concept described in the question stem. Secondary succession refers to a different ecological concept.</p>',
     '<p><strong>A. Secondary succession:</strong> Secondary succession follows a disturbance such as fire, logging or the abandonment of farmland, where the soil and often a seed bank remain in place. Existing soil is the useful discriminator, and the stem specifies bare rock with no soil, so this is not secondary succession.</p>'],
    ['<p><strong>B. Retrogressive succession:</strong> <em>Retrogressive succession</em> is incorrect for this question. The correct answer is <em>Primary succession</em>, which specifically matches the definition or concept described in the question stem. Retrogressive succession refers to a different ecological concept.</p>',
     '<p><strong>B. Retrogressive succession:</strong> Retrogression is a decline in ecosystem development or productivity, which can happen under sustained stress such as heavy grazing or pollution. The stem describes colonization of new ground, which is the opposite direction.</p>'],
    ['<p><strong>C. Cyclic succession:</strong> <em>Cyclic succession</em> is incorrect for this question. The correct answer is <em>Primary succession</em>, which specifically matches the definition or concept described in the question stem. Cyclic succession refers to a different ecological concept.</p>',
     '<p><strong>C. Cyclic succession:</strong> Cyclic succession involves recurring community changes, where a set of stages repeats rather than progressing toward one endpoint. The stem describes a one-off colonization of newly exposed rock.</p>'],
    [GENERIC_ECOL, points([
      'Primary succession begins on a newly exposed or newly formed substrate with no developed soil; secondary succession begins where soil remains after a disturbance.',
      'Soil availability is therefore the useful discriminator between the two.',
      'Pioneers such as lichens and mosses help turn rock into soil, but successional sequences and timescales vary, and they need not end in one fixed permanent community.',
    ])],
  ],
},

// ============================================================ Q26 bio-89
// Sharing one resource is not the same as occupying the same niche, and the
// Bottom Line asserted that exclusion drives evolution of partitioning.
{
  q: 26, id: 'bio-89', expectLetter: 'C',
  stemFull: 'Under stable environmental conditions with limiting resources, the competitive exclusion principle (Gause&rsquo;s principle) predicts that:',
  optionFull: [[2, 'Two species occupying the same ecological niche cannot coexist indefinitely']],
  explanation: [
    ['<h4>Correct Answer: C) Two species competing for the same limited resource cannot stably coexist</h4><p>Gause\'s competitive exclusion principle states that two species with identical ecological niches cannot coexist indefinitely; one will inevitably outcompete the other. This was demonstrated experimentally with Paramecium species. In nature, species coexist through niche differentiation (resource partitioning), where each species uses slightly different resources or occupies different microhabitats.</p>',
     '<h4>Correct Answer: C) Two species occupying the same ecological niche cannot coexist indefinitely</h4><p>Under stable conditions with a limiting resource, two species occupying the same ecological niche cannot coexist indefinitely: one eventually displaces the other. Gause demonstrated this experimentally with <em>Paramecium</em>.</p>'
     + '<p>Read the condition carefully, because it is easy to over-apply. Merely sharing one resource does not establish that two species have identical niches. Species frequently coexist because they differ in other resources they use, in the habitats they occupy, or in when they are active. Those differences are called resource partitioning, and they can allow coexistence.</p>'],
    ['<p><strong>A. Predators always outcompete prey in the long term:</strong> <em>Predators always outcompete prey in the long term</em> is incorrect for this question. The correct answer is <em>Two species competing for the same limited resource cannot stably coexist</em>, which specifically matches the definition or concept described in the question stem. Predators always outcompete prey in the long term refers to a different ecological concept.</p>',
     '<p><strong>A. Predators always outcompete prey in the long term:</strong> Predation is a different interaction from competition. A predator eats its prey rather than competing with it for a shared resource. Predators also do not generally drive their prey to extinction, since that would remove their own food supply.</p>'],
    ['<p><strong>B. Two species can coexist if they share the same ecological niche:</strong> <em>Two species can coexist if they share the same ecological niche</em> is incorrect for this question. The correct answer is <em>Two species competing for the same limited resource cannot stably coexist</em>, which specifically matches the definition or concept described in the question stem. Two species can coexist if they share the same ecological niche refers to a different ecological concept.</p>',
     '<p><strong>B. Two species can coexist if they share the same ecological niche:</strong> This states the opposite of the principle. If two species genuinely occupy the same niche, under stable conditions with a limiting resource, they cannot coexist indefinitely.</p>'],
    ['<p><strong>D. Larger species always exclude smaller species from habitats:</strong> <em>Larger species always exclude smaller species from habitats</em> is incorrect for this question. The correct answer is <em>Two species competing for the same limited resource cannot stably coexist</em>, which specifically matches the definition or concept described in the question stem. Larger species always exclude smaller species from habitats refers to a different ecological concept.</p>',
     '<p><strong>D. Larger species always exclude smaller species from habitats:</strong> Body size alone does not decide the outcome. What matters is which competitor uses the limiting resource more efficiently under the conditions in question, and a smaller species can easily be the better competitor.</p>'],
    [GENERIC_ECOL, points([
      'The principle applies to a limiting resource under stable conditions, and it concerns competition rather than predation.',
      'Sharing one resource does not mean two species occupy the same niche: they may differ in other resources, in habitat, or in timing.',
      'Those differences are resource partitioning, and they are what allows similar species to coexist in practice.',
    ])],
    ['<p class=\'exp-key\'>Bottom Line: The competitive exclusion principle drives niche differentiation, where sympatric species evolve to exploit different resources to reduce competition.</p>',
     '<p class=\'exp-key\'>Bottom Line: Under stable conditions with limiting resources, two species in the same niche cannot coexist indefinitely. Differences in resource use can allow coexistence; exclusion does not guarantee that populations will evolve such differences.</p>'],
  ],
},

// ============================================================ Q27 bio-90
// Placeholder feedback; lightning does not follow the biological pathway, and
// not every nitrogen fixer is an obligate anaerobe.
{
  q: 27, id: 'bio-90', expectLetter: 'D',
  explanation: [
    ['<p>Nitrogen fixation is the conversion of atmospheric N₂ gas into ammonia (NH₃) or ammonium (NH₄⁺). This process is carried out by nitrogen-fixing bacteria such as free-living Azotobacter and symbiotic Rhizobium (in root nodules of legumes) using the enzyme nitrogenase. Lightning can also fix small amounts of nitrogen abiotically.</p>',
     '<p>Nitrogen fixation converts atmospheric N₂ gas into ammonia (NH₃), which under typical biological conditions is present largely as ammonium (NH₄⁺). It is carried out by certain prokaryotes using the enzyme nitrogenase: free-living ones such as <em>Azotobacter</em>, and symbiotic ones such as <em>Rhizobium</em> in the root nodules of legumes. Plants do not perform the nitrogenase reaction themselves; they take up ammonium or nitrate that these prokaryotes, or other processes, have made available.</p>'],
    ['<p><strong>A. Denitrification:</strong> <em>Denitrification</em> is incorrect for this question. The correct answer is <em>Nitrogen fixation</em>, which specifically matches the definition or concept described in the question stem. Denitrification refers to a different ecological concept.</p>',
     '<p><strong>A. Denitrification:</strong> Denitrification runs the other way: it converts nitrate (NO₃⁻) into gaseous nitrogen products, returning nitrogen to the atmosphere. It removes usable nitrogen from the soil rather than supplying it.</p>'],
    ['<p><strong>B. Nitrification:</strong> <em>Nitrification</em> is incorrect for this question. The correct answer is <em>Nitrogen fixation</em>, which specifically matches the definition or concept described in the question stem. Nitrification refers to a different ecological concept.</p>',
     '<p><strong>B. Nitrification:</strong> Nitrification converts ammonia or ammonium into nitrite (NO₂⁻) and then nitrate (NO₃⁻). It works on nitrogen that has already been fixed, so it does not draw on atmospheric N₂.</p>'],
    ['<p><strong>C. Ammonification:</strong> <em>Ammonification</em> is incorrect for this question. The correct answer is <em>Nitrogen fixation</em>, which specifically matches the definition or concept described in the question stem. Ammonification refers to a different ecological concept.</p>',
     '<p><strong>C. Ammonification:</strong> Ammonification converts organic nitrogen, from dead material and waste, into ammonia or ammonium. Like nitrification, it recycles nitrogen already in the biological pool rather than fixing new nitrogen from the air.</p>'],
    [GENERIC_ECOL, points([
      'Fixation is the only one of these steps that draws on atmospheric N₂. Nitrification and ammonification both act on nitrogen already in the biological pool.',
      'Plants cannot fix nitrogen themselves; they absorb ammonium or nitrate that prokaryotes or abiotic processes have made available.',
      'Nitrogenase is oxygen-sensitive, so nitrogen fixers need some way of protecting it. Different groups manage this differently, so not all of them are anaerobes.',
    ])],
    ['<p class=\'exp-key\'>Bottom Line: Nitrogenase, the enzyme responsible for nitrogen fixation, is irreversibly inhibited by oxygen, which is why many nitrogen-fixing bacteria are anaerobic or use leghemoglobin for oxygen protection.</p>',
     '<p class=\'exp-key\'>Bottom Line: Nitrogen fixation is the step that brings atmospheric N₂ into the biological nitrogen pool, and only certain prokaryotes can carry it out. Nitrogenase is oxygen-sensitive, and nitrogen fixers protect it in various ways, such as the leghemoglobin of legume root nodules.</p>'],
  ],
},

// ============================================================ Q28 bio-91
// Placeholder feedback, and shading treated as a compulsory step.
{
  q: 28, id: 'bio-91', expectLetter: 'B',
  explanation: [
    ['<p>Eutrophication occurs when excess nutrients (primarily nitrogen and phosphorus from fertilizers, sewage, or detergents) enter aquatic systems. This triggers algal blooms that block light to submerged vegetation. When the algae die, decomposition by bacteria consumes dissolved oxygen, creating hypoxic or anoxic conditions (dead zones) that kill fish and other aquatic organisms.</p>',
     '<p>Eutrophication starts with nutrient enrichment: excess nitrogen and phosphorus, typically from fertilizers, sewage or detergents, entering the water. The added nutrients let algae grow much faster than usual. More algal growth means more respiration, and when a bloom dies, bacterial decomposition consumes large amounts of dissolved oxygen. The water can become hypoxic or anoxic, killing fish and other animals. Dense algae at the surface can also shade out submerged plants, which contributes in many cases, though it is not a compulsory step in every one.</p>'],
    ['<p><strong>A. Decreased water temperature due to climate change:</strong> <em>Decreased water temperature due to climate change</em> is incorrect for this question. The correct answer is <em>Excessive input of nitrogen and phosphorus from agricultural runoff</em>, which specifically matches the definition or concept described in the question stem. Decreased water temperature due to climate change refers to a different ecological concept.</p>',
     '<p><strong>A. Decreased water temperature due to climate change:</strong> A change in water temperature is not nutrient enrichment. Temperature does affect how much oxygen water can hold and how fast organisms respire, but it is not what the term eutrophication describes.</p>'],
    ['<p><strong>C. Introduction of a new predatory fish species:</strong> <em>Introduction of a new predatory fish species</em> is incorrect for this question. The correct answer is <em>Excessive input of nitrogen and phosphorus from agricultural runoff</em>, which specifically matches the definition or concept described in the question stem. Introduction of a new predatory fish species refers to a different ecological concept.</p>',
     '<p><strong>C. Introduction of a new predatory fish species:</strong> A new predator can change algal abundance indirectly, by altering what eats the algae. That is a real effect, but the stem asks for the most common cause of eutrophication, and that is the direct input of nutrients.</p>'],
    ['<p><strong>D. Increased UV radiation from ozone depletion:</strong> <em>Increased UV radiation from ozone depletion</em> is incorrect for this question. The correct answer is <em>Excessive input of nitrogen and phosphorus from agricultural runoff</em>, which specifically matches the definition or concept described in the question stem. Increased UV radiation from ozone depletion refers to a different ecological concept.</p>',
     '<p><strong>D. Increased UV radiation from ozone depletion:</strong> Increased UV radiation is a different environmental stress. It does not supply the nitrogen and phosphorus that drive the excess algal growth at the heart of eutrophication.</p>'],
    [GENERIC_ECOL, points([
      'The driver is excess nitrogen and phosphorus entering the water, most often in agricultural runoff.',
      'Decomposers consume dissolved oxygen as they break down dead algae, and that is what produces the hypoxic water.',
      'Algal photosynthesis does not guarantee that oxygen stays adequate: the algae respire at night too, and once a bloom dies, decomposition dominates.',
    ])],
    ['<p class=\'exp-key\'>Bottom Line: Eutrophication follows the sequence: nutrient enrichment → algal bloom → light blocking → algal death → bacterial decomposition → oxygen depletion → aquatic organism death.</p>',
     '<p class=\'exp-key\'>Bottom Line: The sequence is nutrient enrichment → increased algal growth → increased respiration and decomposition → oxygen depletion → death of fish and other animals. Shading of submerged plants often contributes as well.</p>'],
  ],
},

// ============================================================ Q29 bio-92
// Core item and table are sound; only the placeholder feedback and points.
{
  q: 29, id: 'bio-92', expectLetter: 'B',
  explanation: [
    ['<p><strong>A. Parasitism:</strong> <em>Parasitism</em> is incorrect for this question. The correct answer is <em>Commensalism</em>, which specifically matches the definition or concept described in the question stem. Parasitism refers to a different ecological concept.</p>',
     '<p><strong>A. Parasitism:</strong> Parasitism is +/&minus;: the parasite benefits and the host is harmed. The stem specifies that the second organism is neither helped nor harmed.</p>'],
    ['<p><strong>C. Mutualism:</strong> <em>Mutualism</em> is incorrect for this question. The correct answer is <em>Commensalism</em>, which specifically matches the definition or concept described in the question stem. Mutualism refers to a different ecological concept.</p>',
     '<p><strong>C. Mutualism:</strong> Mutualism is +/+: both partners benefit. Here only one organism gains anything.</p>'],
    ['<p><strong>D. Amensalism:</strong> <em>Amensalism</em> is incorrect for this question. The correct answer is <em>Commensalism</em>, which specifically matches the definition or concept described in the question stem. Amensalism refers to a different ecological concept.</p>',
     '<p><strong>D. Amensalism:</strong> Amensalism is 0/&minus;: one organism is harmed while the other is unaffected. That is the mirror image of the relationship described in the stem.</p>'],
    [GENERIC_ECOL, points([
      'Read each interaction as a pair of signs, one per partner: mutualism +/+, commensalism +/0, parasitism +/&minus;, amensalism 0/&minus;.',
      'Commensalism is the +/0 case: one organism benefits and the other experiences no net benefit or harm.',
      'A remora riding a shark is the familiar example, on the assumption that the shark is neither helped nor harmed by the passenger.',
    ])],
  ],
},

// ============================================================ Q30 bio-93
// SUBSTANTIAL REWRITE. The trophic-cascade concept is right, but the claim
// that wolves alone changed Yellowstone river courses is too strong as a
// simple causal account; stream hydrology and other factors affect riparian
// recovery. A hypothetical scenario tests the same concept cleanly.
{
  q: 30, id: 'bio-93', expectLetter: 'D',
  stemFull: 'After wolves are reintroduced to a park, herbivore numbers fall, browsing decreases, and riverside trees recover. Which process best describes the wolves&rsquo; indirect effect on vegetation?',
  optionFull: [[2, 'Bottom-up control']],
  headingsGone: ['C. Bottom-up regulation:'],
  explanationFull:
    '<h4>Correct Answer: D) A trophic cascade</h4>'
    + '<p>A trophic cascade occurs when a change at one trophic level indirectly affects other levels. In this example the wolves do not touch the trees. They reduce herbivore numbers and browsing, and it is the drop in browsing that allows the trees to recover. The effect begins with the predators and passes down the food web, so it is a form of top-down control.</p>'
    + '<p>Keep the direct and indirect effects apart: the wolves&rsquo; direct effect is on the herbivores, and the effect on vegetation is indirect, working through that intermediate level.</p>'
    + '<h4>Why the other choices are wrong:</h4>'
    + '<p><strong>A. Convergent evolution:</strong> Convergent evolution is the independent evolution of similar traits in different lineages. It is an evolutionary pattern over long timescales, not an ecological interaction between populations in a park.</p>'
    + '<p><strong>B. Competitive exclusion:</strong> Competitive exclusion concerns two competitors occupying the same niche, where one eventually displaces the other. The wolves and the trees are not competitors, and nothing here is being excluded by competition.</p>'
    + '<p><strong>C. Bottom-up control:</strong> Bottom-up control begins with a change in resources or in the primary producers, which then propagates upward. Here the change begins with the predator at the top and passes downward, which is the opposite direction.</p>'
    + '<h4>Key Educational Points:</h4>'
    + points([
      'A trophic cascade is an indirect effect: a change at one trophic level reaches another through the levels in between.',
      'Top-down control starts with predators; bottom-up control starts with resources or producers. The direction is what distinguishes them.',
      'Here the wolves act directly on herbivores and only indirectly on vegetation, which is what makes it a cascade rather than a direct effect.',
    ])
    + '<p class=\'exp-key\'>Bottom Line: A predator can indirectly change vegetation by changing herbivory: this is a trophic cascade.</p>',
},

// ============================================================ Q31 bio-94
// "Tertiary productivity" is not a useful standard comparison; GPP is. Also
// define R as autotrophic respiration so it is not read as ecosystem
// respiration, which is what separates NPP from net ecosystem productivity.
{
  q: 31, id: 'bio-94', expectLetter: 'A',
  optionFull: [[2, 'Gross primary productivity (GPP)']],
  headingsGone: ['C. Tertiary productivity:'],
  explanation: [
    ['<p>Net primary productivity (NPP) is the rate at which producers (autotrophs) store energy as biomass after accounting for their own respiratory losses. It is calculated as NPP = GPP − R (autotrophic respiration). NPP represents the energy available to all consumers in the ecosystem and is a key measure of ecosystem productivity.</p>',
     '<p>Net primary productivity (NPP) is the rate at which producers store energy as biomass once their own respiratory losses are subtracted. Written out: NPP = GPP &minus; R<sub>a</sub>, where R<sub>a</sub> is respiration by the autotrophs themselves. The subscript matters, because "respiration" on its own can be read as respiration by the whole ecosystem, which is a different quantity. NPP is the new producer biomass that becomes available to consumers and decomposers.</p>'],
    ['<p><strong>B. Secondary productivity:</strong> <em>Secondary productivity</em> is incorrect for this question. The correct answer is <em>Net primary productivity (NPP)</em>, which specifically matches the definition or concept described in the question stem. Secondary productivity refers to a different ecological concept.</p>',
     '<p><strong>B. Secondary productivity:</strong> Secondary productivity is the production of new biomass by consumers, that is by heterotrophs. It describes a later step in the flow of energy, not what the producers themselves retain.</p>'],
    ['<p><strong>C. Tertiary productivity:</strong> <em>Tertiary productivity</em> is incorrect for this question. The correct answer is <em>Net primary productivity (NPP)</em>, which specifically matches the definition or concept described in the question stem. Tertiary productivity refers to a different ecological concept.</p>',
     '<p><strong>C. Gross primary productivity (GPP):</strong> Gross primary productivity is the total energy the producers capture, before any of it is spent on their own respiration. Subtracting that respiration from GPP is precisely what gives NPP, so GPP is the quantity you start from rather than the answer.</p>'],
    ['<p><strong>D. Net ecosystem productivity:</strong> <em>Net ecosystem productivity</em> is incorrect for this question. The correct answer is <em>Net primary productivity (NPP)</em>, which specifically matches the definition or concept described in the question stem. Net ecosystem productivity refers to a different ecological concept.</p>',
     '<p><strong>D. Net ecosystem productivity:</strong> Net ecosystem productivity subtracts the respiration of both producers and heterotrophs from GPP. It is a whole-ecosystem balance, whereas NPP subtracts only the producers&rsquo; own respiration. That difference is exactly what separates D from A.</p>'],
    [GENERIC_ECOL, points([
      'GPP is the total energy producers capture; NPP is what remains after they spend some of it on their own respiration.',
      'Write it as NPP = GPP &minus; R<sub>a</sub>, with R<sub>a</sub> meaning autotrophic respiration, so it is not confused with respiration by the whole ecosystem.',
      'Net ecosystem productivity goes one step further and subtracts heterotroph respiration as well.',
      'NPP is the energy available to consumers and decomposers, though not every unit of it is actually eaten by the next trophic level.',
    ])],
    ['<p class=\'exp-key\'>Bottom Line: NPP = GPP − Respiration. NPP determines the total energy available to consumers and decomposers in an ecosystem.</p>',
     '<p class=\'exp-key\'>Bottom Line: NPP = GPP &minus; R<sub>a</sub>, the respiration of the producers themselves. NPP is the new producer biomass that becomes available to consumers and decomposers.</p>'],
  ],
},

// ============================================================ Q32 bio-96
// Placeholder feedback, and geographic separation is not itself proof that
// speciation has completed.
{
  q: 32, id: 'bio-96', expectLetter: 'B',
  explanation: [
    ['If sufficient genetic divergence occurs, reproductive isolation develops and the groups become separate species.</p>',
     'If enough divergence accumulates, reproductive isolation develops and the groups become separate species. Note what marks that final step: the isolation persists even if the populations later come back into contact. Geographic separation by itself is not proof that speciation has completed.</p>'],
    ['<p><strong>A. Artificial selection:</strong> <em>Artificial selection</em> is a different evolutionary concept. The correct answer is <em>Allopatric speciation</em>, which matches the specific mechanism or principle described in the question. Understanding the distinction between these evolutionary concepts is important for exam success.</p>',
     '<p><strong>A. Artificial selection:</strong> Artificial selection is breeding carried out by people, who choose which individuals reproduce. The stem describes populations diverging on their own after being separated, with no human involvement.</p>'],
    ['<p><strong>C. Sympatric speciation:</strong> <em>Sympatric speciation</em> is a different evolutionary concept. The correct answer is <em>Allopatric speciation</em>, which matches the specific mechanism or principle described in the question. Understanding the distinction between these evolutionary concepts is important for exam success.</p>',
     '<p><strong>C. Sympatric speciation:</strong> Sympatric speciation happens without geographic separation, within the same area, for example through polyploidy in plants or through use of different habitats or hosts. The stem states explicitly that the populations are geographically separated.</p>'],
    ['<p><strong>D. Parapatric speciation:</strong> <em>Parapatric speciation</em> is a different evolutionary concept. The correct answer is <em>Allopatric speciation</em>, which matches the specific mechanism or principle described in the question. Understanding the distinction between these evolutionary concepts is important for exam success.</p>',
     '<p><strong>D. Parapatric speciation:</strong> Parapatric speciation involves neighbouring populations that stay in contact along a boundary, with limited gene flow between them. That is different from the complete geographic separation described here.</p>'],
    [GENERIC_EVO, points([
      'Geographic separation reduces or stops gene flow between the two groups.',
      'Each group then diverges independently, through mutation, natural selection and genetic drift.',
      'Speciation is complete when reproductive isolation persists even if the populations meet again. Separation on its own does not prove it.',
    ])],
  ],
},

// ============================================================ Q33 bio-98
// Placeholder feedback replaced with the actual distinctions.
{
  q: 33, id: 'bio-98', expectLetter: 'D',
  explanation: [
    ['<p><strong>A. Vestigial structures:</strong> <em>Vestigial structures</em> is a different evolutionary concept. The correct answer is <em>Homologous structures</em>, which matches the specific mechanism or principle described in the question. Understanding the distinction between these evolutionary concepts is important for exam success.</p>',
     '<p><strong>A. Vestigial structures:</strong> Vestigial structures are reduced relative to their ancestral condition, and some of them retain functions. A vestigial structure can also be homologous to a structure in another species, but "vestigial" describes reduction, not the broad relationship of shared ancestry the question asks about.</p>'],
    ['<p><strong>B. Convergent structures:</strong> <em>Convergent structures</em> is a different evolutionary concept. The correct answer is <em>Homologous structures</em>, which matches the specific mechanism or principle described in the question. Understanding the distinction between these evolutionary concepts is important for exam success.</p>',
     '<p><strong>B. Convergent structures:</strong> Convergent structures arise when different lineages independently evolve something similar, usually under similar selection pressures. They are not inherited from a common ancestor, which is the opposite of what the stem describes.</p>'],
    ['<p><strong>C. Analogous structures:</strong> <em>Analogous structures</em> is a different evolutionary concept. The correct answer is <em>Homologous structures</em>, which matches the specific mechanism or principle described in the question. Understanding the distinction between these evolutionary concepts is important for exam success.</p>',
     '<p><strong>C. Analogous structures:</strong> Analogous structures acquire a similar function independently, so they share function rather than ancestry. Bird wings and insect wings are the standard example: both are used for flight, but they were not inherited from a common winged ancestor.</p>'],
    [GENERIC_EVO, points([
      'Homology is about common evolutionary origin. Similar function is not required, and homologous structures may or may not still do the same job.',
      'The mammalian forelimb is the standard illustration: human arm, whale flipper, bat wing and dog leg all share one inherited skeletal plan.',
      'Analogy is the contrast: bird and insect wings do the same job but were not inherited from a common winged ancestor.',
    ])],
  ],
},

// ============================================================ Q34 bio-99
// The review asks for the calculation and the distractor feedback to be left
// exactly as they are. Only the generic points change.
{
  q: 34, id: 'bio-99', expectLetter: 'C',
  explanation: [
    [GENERIC_EVO, points([
      'Allele frequencies are p and q and must sum to 1. Genotype frequencies are p&sup2;, 2pq and q&sup2;, and they also sum to 1.',
      'The heterozygote term carries a factor of 2 because an Aa individual can be formed in two ways: the A allele can come from either parent.',
      'The equation predicts genotype frequencies only for a population at equilibrium: random mating, with no significant selection, migration, mutation or drift.',
    ])],
  ],
},

// ============================================================ Q35 bio-100
// "Unrelated species" is loose, the bird/bat wing example needs care, and the
// Bottom Line implied divergent evolution creates homology.
{
  q: 35, id: 'bio-100', expectLetter: 'B',
  stemFull: 'The evolution of similar traits in distantly related species that occupy similar environments is known as:',
  explanation: [
    ['<p>Convergent evolution occurs when unrelated species independently evolve similar traits due to similar environmental pressures. Classic examples include the streamlined body shapes of dolphins (mammals), sharks (fish), and ichthyosaurs (reptiles), or the wings of birds, bats, and insects. These analogous structures have different evolutionary origins but similar functions.</p>',
     '<p>Convergent evolution occurs when distantly related lineages independently evolve similar traits under similar selection pressures. The streamlined bodies of dolphins (mammals), sharks (fish) and ichthyosaurs (reptiles) are a clean example: each lineage arrived at a similar shape for moving through water, and none inherited it from the others. Bird and bat wings are often quoted too, but handle that example carefully: the wings are independently evolved flight adaptations, while the forelimb bones underneath them are homologous, inherited from a shared tetrapod ancestor. Structures that share function without shared ancestry are called analogous.</p>'],
    ['<p><strong>A. Parallel evolution:</strong> <em>Parallel evolution</em> is a different evolutionary concept. The correct answer is <em>Convergent evolution</em>, which matches the specific mechanism or principle described in the question. Understanding the distinction between these evolutionary concepts is important for exam success.</p>',
     '<p><strong>A. Parallel evolution:</strong> In the usual introductory distinction, parallel evolution describes similar changes arising in related lineages that started from similar conditions. The stem specifies species that are not closely related.</p>'],
    ['<p><strong>C. Coevolution:</strong> <em>Coevolution</em> is a different evolutionary concept. The correct answer is <em>Convergent evolution</em>, which matches the specific mechanism or principle described in the question. Understanding the distinction between these evolutionary concepts is important for exam success.</p>',
     '<p><strong>C. Coevolution:</strong> Coevolution involves two interacting species influencing each other&rsquo;s evolution, such as a flower and its pollinator. It is about reciprocal influence between species in contact, not about separate lineages independently arriving at similar traits.</p>'],
    ['<p><strong>D. Divergent evolution:</strong> <em>Divergent evolution</em> is a different evolutionary concept. The correct answer is <em>Convergent evolution</em>, which matches the specific mechanism or principle described in the question. Understanding the distinction between these evolutionary concepts is important for exam success.</p>',
     '<p><strong>D. Divergent evolution:</strong> Divergent evolution produces differences among related lineages that share ancestry. It is the opposite pattern to the one described: shared ancestry growing more different, rather than separate ancestries growing more similar.</p>'],
    [GENERIC_EVO, points([
      'Similar selection pressures can produce similar solutions in lineages that are not closely related.',
      'The resulting structures are analogous: similar in function, different in ancestry.',
      'Streamlined bodies in dolphins, sharks and ichthyosaurs are the cleanest example, because the similarity clearly was not inherited from a recent shared ancestor.',
    ])],
    ['<p class=\'exp-key\'>Bottom Line: Convergent evolution produces analogous structures in unrelated lineages, while divergent evolution produces homologous structures in related lineages.</p>',
     '<p class=\'exp-key\'>Bottom Line: Convergent evolution produces analogous structures in distantly related lineages. Homologous structures, by contrast, reflect shared ancestry; divergent evolution makes them differ over time rather than creating the homology.</p>'],
  ],
},

// ============================================================ Q36 bio-101
// "Provides the raw material" is too broad, because gene flow can also
// introduce variation into a particular population.
{
  q: 36, id: 'bio-101', expectLetter: 'A',
  stemFull: 'Which process is the ultimate source of new alleles in a population?',
  explanation: [
    ['<p>Mutation is the ultimate source of all new genetic variation in a population. Without mutation, there would be no new alleles for natural selection to act upon. While recombination and gene flow redistribute existing variation, only mutation creates entirely new alleles. Natural selection then acts on this variation, favoring alleles that increase fitness in the current environment.</p>',
     '<p>Mutation originates new sequence variants, so it is the ultimate source of new alleles. Recombination and gene flow rearrange or move variation that already exists; only mutation creates an allele that was not there before. Natural selection then acts on the heritable differences that variation produces, favouring alleles that increase fitness in the current environment. Note that mutations do not arise because an organism needs a particular adaptive change: they occur regardless, and selection sorts them afterwards.</p>'],
    ['<p><strong>B. Gene flow:</strong> <em>Gene flow</em> is a different evolutionary concept. The correct answer is <em>Mutation</em>, which matches the specific mechanism or principle described in the question. Understanding the distinction between these evolutionary concepts is important for exam success.</p>',
     '<p><strong>B. Gene flow:</strong> Gene flow moves existing alleles between populations. It can introduce variation that is new to one particular population, which is why the question asks for the <em>ultimate</em> source: those alleles originated as mutations somewhere else, and gene flow did not create them.</p>'],
    ['<p><strong>C. Non-random mating:</strong> <em>Non-random mating</em> is a different evolutionary concept. The correct answer is <em>Mutation</em>, which matches the specific mechanism or principle described in the question. Understanding the distinction between these evolutionary concepts is important for exam success.</p>',
     '<p><strong>C. Non-random mating:</strong> Nonrandom mating changes which genotype combinations are formed, and so the genotype frequencies. It creates no new alleles, and by itself it does not change allele frequencies either.</p>'],
    ['<p><strong>D. Genetic drift:</strong> <em>Genetic drift</em> is a different evolutionary concept. The correct answer is <em>Mutation</em>, which matches the specific mechanism or principle described in the question. Understanding the distinction between these evolutionary concepts is important for exam success.</p>',
     '<p><strong>D. Genetic drift:</strong> Genetic drift changes allele frequencies by chance, with the largest effect in small populations. It alters the proportions of alleles already present rather than generating new ones.</p>'],
    [GENERIC_EVO, points([
      'Mutation originates new sequence variants, which is why it is the ultimate source of new alleles.',
      'Gene flow, drift and nonrandom mating redistribute or reshuffle variation that already exists; none of them creates a new allele.',
      'Mutations are not produced because an organism needs an adaptive change. They arise regardless of need, and selection sorts them afterwards.',
    ])],
    ['<p class=\'exp-key\'>Bottom Line: Mutation generates genetic variation (raw material), while natural selection, genetic drift, and gene flow act on this variation to change allele frequencies over time.</p>',
     '<p class=\'exp-key\'>Bottom Line: Mutation originates new alleles. Gene flow redistributes existing alleles between populations, drift changes their frequencies by chance, and selection acts on the heritable differences they produce.</p>'],
  ],
},

];
