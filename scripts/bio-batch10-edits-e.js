/**
 * Biology review batch 10, displayed Q41-Q50
 * (bio-581, bio-582, bio-585, bio-587 .. bio-590, bio-592).
 * Q43 (bio-584, near accommodation) and Q45 (bio-586, myopia) are KEEP
 * UNCHANGED per the review and so are absent from this module by design.
 */
'use strict';

const Q48_EXPLANATION =
  '<h4>Correct Answer: Dermatophytes</h4>' +
  '<p>This is tinea capitis, a dermatophyte infection of the scalp and hair. Dermatophytes use keratin and usually cause infections of skin, hair or nails. Green fluorescence of affected hairs can support infection by certain <em>Microsporum</em> species, although many dermatophyte infections do not fluoresce. Commonly taught dermatophyte genera include <em>Trichophyton</em>, <em>Microsporum</em> and <em>Epidermophyton</em>; the last does not infect hair.</p>' +
  '<p>Dermatophytes cause <strong>tinea</strong> (ringworm) infections named by the body site affected: tinea capitis (scalp), tinea corporis (body), tinea pedis (athlete\'s foot), tinea cruris (groin) and tinea unguium (nails).</p>' +
  '<h4>Why the other choices are wrong:</h4>' +
  '<p><strong>A. Dimorphic fungi:</strong> The systemic thermally dimorphic fungi are a different group from dermatophytes. Many grow as molds in the environment and yeasts in tissue, but <em>Coccidioides</em> forms tissue spherules rather than yeasts. These are not the usual causes of the hair infection described.</p>' +
  '<p><strong>B. Yeasts:</strong> <em>Candida</em> and <em>Malassezia</em> cause other common fungal conditions. <em>Malassezia</em> can cause pityriasis versicolor, which changes skin pigmentation, but it does not explain this typical dermatophyte scalp infection. They should not be distinguished by claiming yeasts can never form filaments: <em>Candida</em> can form pseudohyphae and true hyphae.</p>' +
  '<p><strong>D. Mucorales:</strong> Mucorales such as <em>Rhizopus</em> and <em>Mucor</em> cause mucormycosis, including invasive sinus, lung or wound infections. They are not the usual cause of tinea capitis and have broad, often sparsely septate hyphae.</p>' +
  '<h4>Key Educational Points:</h4>' +
  '<ul><li>Dermatophytes use keratin and usually infect skin, hair or nails; deeper follicular infection can occasionally occur</li>' +
  '<li>Some <em>Microsporum</em> hair infections fluoresce, but a negative Wood-lamp examination does not exclude tinea capitis</li>' +
  '<li>Tinea capitis usually requires an oral antifungal because topical treatment alone does not reliably eradicate infection within hair shafts and follicles</li></ul>' +
  '<p class=\'exp-key\'>Bottom Line: Scalp scaling and broken hairs suggest tinea capitis caused by dermatophytes; green fluorescence favors certain Microsporum infections.</p>';

module.exports = [
  // ---- Q41  bio-581  placenta (stem, options C and D) --------------------
  {
    q: 41, id: 'bio-581', expectLetter: 'A',
    stemFull: 'Which option lists major functions of the placenta in supporting fetal development?',
    optionFull: [
      [2, 'Serving as the main site of red blood cell production throughout fetal life'],
      [3, 'Serving as the main site of T-lymphocyte maturation']
    ],
    explanation: [
      ['<p><strong>C. Production of red blood cells for the fetus:</strong> Fetal erythropoiesis occurs in the fetal liver (primarily during the second trimester) and later in fetal bone marrow, not in the placenta. The placenta facilitates nutrient delivery but does not produce blood cells.</p>',
        '<p><strong>C. Serving as the main site of red blood cell production throughout fetal life:</strong> The main sites of blood-cell production change during development, including the yolk sac, fetal liver and later bone marrow. The placenta can support early blood-cell progenitors, but it is not the principal site of red-cell production throughout fetal life.</p>'],
      ['<p><strong>B. Direct mixing of maternal and fetal blood:</strong> Maternal and fetal blood do NOT mix under normal conditions. Exchange occurs across the placental barrier (syncytiotrophoblast) via diffusion and active transport. The two circulations remain separate.</p>',
        '<p><strong>B. Direct mixing of maternal and fetal blood:</strong> Maternal and fetal blood normally circulate in separate spaces, and exchange occurs across placental tissues, including fetal capillary walls. Direct bulk mixing is not the normal exchange mechanism, although small numbers of blood cells can cross between the circulations.</p>'],
      ['<p><strong>D. Production of fetal immune cells:</strong> Fetal immune cells develop in fetal hematopoietic organs (liver, thymus, bone marrow). The placenta does transfer some maternal IgG antibodies to the fetus (passive immunity), but it does not produce immune cells.</p>',
        '<p><strong>D. Serving as the main site of T-lymphocyte maturation:</strong> T lymphocytes mature mainly in the thymus. The placenta transfers maternal IgG, providing passive immunity, but it is not the main site of T-cell maturation.</p>'],
      ['<li>Maternal and fetal blood never mix directly - exchange occurs across the placental barrier</li>',
        '<li>Maternal and fetal circulations are normally separate; substances cross the placental barrier rather than requiring direct mixing of the blood</li>']
    ],
    keepHeadings: ['<strong>B. Direct mixing of maternal and fetal blood:</strong>'],
    gone: ['Which of the following is a function of the placenta during pregnancy',
      'Production of red blood cells for the fetus', 'Production of fetal immune cells',
      'do NOT mix under normal conditions', 'never mix directly']
  },

  // ---- Q42  bio-582  corpus luteum ---------------------------------------
  {
    q: 42, id: 'bio-582', expectLetter: 'D',
    explanation: [[
      '<p><strong>C. The hypothalamus:</strong> The hypothalamus secretes gonadotropin-releasing hormone (GnRH), which regulates FSH and LH release. It does not directly produce progesterone.</p>',
      '<p><strong>C. The hypothalamus:</strong> The hypothalamus releases GnRH, which regulates pituitary FSH and LH. It is not the principal source of circulating progesterone during the luteal phase; that role belongs to the corpus luteum.</p>'
    ]],
    keepHeadings: ['<strong>C. The hypothalamus:</strong>'],
    gone: ['It does not directly produce progesterone']
  },

  // ---- Q44  bio-585  organ of Corti --------------------------------------
  {
    q: 44, id: 'bio-585', expectLetter: 'A',
    explanation: [
      ['When sound waves cause the basilar membrane to vibrate, the stereocilia of the hair cells are deflected against the tectorial membrane, opening mechanically-gated ion channels and generating receptor potentials that lead to nerve impulse transmission via the cochlear nerve.',
        'Movement within the cochlea bends the hair-cell bundles, opening mechanically gated ion channels and changing the hair cells\' membrane potential. Inner hair cells release neurotransmitter onto auditory nerve fibers, which then generate action potentials. Outer hair cells help amplify cochlear vibrations.'],
      ['It plays an important role by providing a surface against which the stereocilia are bent, but it does not itself contain the hair cells that perform mechanotransduction.',
        'It contributes to the mechanical stimulation of the hair bundles but does not contain the sensory hair cells of the organ of Corti.'],
      ['It helps maintain the ionic composition of the endolymph but has no role in mechanotransduction or sound detection.',
        'It helps maintain the ionic composition of the endolymph, which supports hearing, but it does not contain the sensory hair cells of the organ of Corti.'],
      ['<p class=\'exp-key\'>Bottom Line: Hair cells in the organ of Corti on the basilar membrane convert mechanical sound vibrations into electrical nerve impulses.</p>',
        '<p class=\'exp-key\'>Bottom Line: Hair cells in the organ of Corti convert vibration into receptor potentials, leading to action potentials in the auditory nerve.</p>']
    ],
    gone: ['deflected against the tectorial membrane, opening mechanically-gated ion channels',
      'has no role in mechanotransduction or sound detection', 'does not itself contain the hair cells',
      'convert mechanical sound vibrations into electrical nerve impulses']
  },

  // ---- Q46  bio-587  oral candidiasis ------------------------------------
  {
    q: 46, id: 'bio-587', expectLetter: 'B',
    explanation: [
      ['The hallmark finding is white, curd-like plaques on the oral mucosa that can be scraped off, and KOH preparation showing <strong>pseudohyphae and budding yeast</strong> is diagnostic.</p>',
        'Scrapable white plaques with budding yeast and pseudohyphae support oral candidiasis. <em>Candida albicans</em> is the most likely organism among these choices, although this appearance does not identify the <em>Candida</em> species with certainty.</p>'],
      ['It becomes pathogenic when the host immune system is compromised (HIV, chemotherapy, prolonged antibiotics, diabetes).',
        '<em>Candida</em> can overgrow when immune defenses are weakened, as in advanced HIV infection or chemotherapy, or when the normal microbial community is disturbed, for example after antibiotics.'],
      ['<p><strong>D. Histoplasma capsulatum:</strong> <em>Histoplasma</em> is a polymorphic fungus found in soil enriched with bird or bat droppings (Ohio and Mississippi River valleys). It primarily causes pulmonary disease and disseminated infection in immunocompromised hosts, with intracellular yeast forms within macrophages - not pseudohyphae on oral mucosa.</p>',
        '<p><strong>D. Histoplasma capsulatum:</strong> <em>Histoplasma</em> is thermally dimorphic, growing as a mold in the environment and as small yeasts inside tissue macrophages. It is found in soil enriched with bird or bat droppings and primarily causes pulmonary or disseminated infection, not pseudohyphae on oral mucosa.</p>'],
      ['<li>Oral thrush is often the first clinical sign of HIV progression to AIDS</li>',
        '<li>Oral thrush may indicate immune suppression, but it is not by itself an AIDS-defining condition; esophageal candidiasis is an AIDS-defining illness in a person with HIV</li>'],
      ['<li>Treatment: topical nystatin or clotrimazole for mild cases; systemic fluconazole for severe or recurrent cases</li>',
        '<li>Antibiotics can predispose to thrush by disturbing normal bacterial flora, even without severe immune suppression</li>'],
      ['<p class=\'exp-key\'>Bottom Line: Pseudohyphae + budding yeast + scrapable white oral plaques in an immunocompromised patient = Candida albicans oral thrush. Remember that Candida is a normal commensal that becomes pathogenic when immunity fails.</p>',
        '<p class=\'exp-key\'>Bottom Line: Scrapable white oral plaques with budding yeast and pseudohyphae suggest candidiasis; C. albicans is the most likely cause among the listed organisms.</p>']
    ],
    keepHeadings: ['<strong>D. Histoplasma capsulatum:</strong>'],
    gone: ['is diagnostic.</p>', 'when the host immune system is compromised (HIV, chemotherapy',
      'often the first clinical sign of HIV progression to AIDS', 'topical nystatin or clotrimazole',
      'a polymorphic fungus found in soil']
  },

  // ---- Q47  bio-588  invasive aspergillosis ------------------------------
  {
    q: 47, id: 'bio-588', expectLetter: 'A',
    explanation: [
      ['<p><strong>Invasive aspergillosis</strong> is the leading cause of death from fungal infections in immunocompromised patients, particularly those with prolonged neutropenia after bone marrow transplantation. The classic radiographic finding is the <strong>"halo sign"</strong> (a zone of ground-glass attenuation surrounding a nodule, representing hemorrhage around the fungal lesion). Histologically, <em>Aspergillus</em> species show <strong>septate hyphae with V-shaped (dichotomous) branching at 45-degree angles</strong>.</p>' +
        '<p><em>Aspergillus fumigatus</em> is also the source of <strong>aflatoxins</strong> (produced by <em>A. flavus</em>), which are potent hepatocarcinogens found in contaminated grains and peanuts.</p>',
        '<p><strong>Invasive aspergillosis</strong> is an important life-threatening fungal infection in people with severe immune suppression, including prolonged neutropenia after transplantation. A characteristic radiographic finding is the <strong>"halo sign"</strong> (a zone of ground-glass attenuation surrounding a nodule, representing hemorrhage around the fungal lesion). Histologically, <em>Aspergillus</em> species show <strong>septate hyphae with dichotomous branching at acute angles</strong>. Together, these septate acute-angle hyphae and the halo sign strongly support the diagnosis in this setting, although neither is specific on its own.</p>'],
      ['<p><strong>B. Pneumocystis pneumonia:</strong> <em>Pneumocystis jirovecii</em> (formerly <em>P. carinii</em>) causes diffuse bilateral ground-glass opacities on imaging, not focal nodules with a halo sign. It is diagnosed by methenamine silver staining of bronchoalveolar lavage showing cyst forms. It does not produce septate branching hyphae.</p>',
        '<p><strong>B. Pneumocystis pneumonia:</strong> <em>Pneumocystis jirovecii</em> (formerly <em>P. carinii</em>) usually causes diffuse bilateral ground-glass opacities rather than the focal nodule with a halo sign described here. It is diagnosed by methenamine silver staining of bronchoalveolar lavage showing cyst forms, and it does not produce septate branching hyphae.</p>'],
      ['<p><strong>C. Pulmonary candidiasis:</strong> While <em>Candida</em> can cause disseminated disease in immunocompromised patients, isolated pulmonary candidiasis is rare. <em>Candida</em> produces pseudohyphae and budding yeast, not the septate hyphae with 45-degree branching characteristic of <em>Aspergillus</em>.</p>',
        '<p><strong>C. Pulmonary candidiasis:</strong> <em>Candida</em> can cause disseminated infection, but isolated <em>Candida</em> pneumonia is uncommon. Budding yeast and pseudohyphae would favor <em>Candida</em>, although <em>C. albicans</em> can also form true hyphae. The combined tissue appearance and clinical findings here favor invasive aspergillosis.</p>'],
      ['<p><strong>D. Mucormycosis:</strong> Mucormycosis (caused by <em>Rhizopus</em>, <em>Mucor</em>) shows <strong>broad, ribbon-like, pauciseptate (rarely septate) hyphae branching at 90-degree (right) angles</strong>. This is the critical distinguishing feature from <em>Aspergillus</em>. Mucormycosis is classically associated with diabetic ketoacidosis and presents as rhinocerebral disease.</p>',
        '<p><strong>D. Mucormycosis:</strong> Mucormycosis (caused by <em>Rhizopus</em>, <em>Mucor</em>) shows hyphae that are <strong>typically broad and pauciseptate, often with irregular or near-right-angle branching</strong>, which is the main distinction from <em>Aspergillus</em>. It can also affect the lungs and transplant recipients; diabetic ketoacidosis with rhinocerebral disease is a classic association rather than its only presentation.</p>'],
      ['<li>Septate hyphae at 45 degrees = Aspergillus; pauciseptate hyphae at 90 degrees = Mucor/Rhizopus</li>',
        '<li>Septate hyphae with acute-angle branching suggest Aspergillus; broad, pauciseptate hyphae with irregular or near-right-angle branching suggest Mucorales</li>'],
      ['<li>The halo sign on CT is an early finding in invasive aspergillosis; the "air crescent sign" appears later during neutrophil recovery</li>',
        '<li>The halo sign on CT is an early finding in invasive aspergillosis and the "air crescent sign" can appear later during neutrophil recovery; this is a usual pattern rather than a sequence seen in every patient</li>'],
      ['<p class=\'exp-key\'>Bottom Line: Septate hyphae branching at 45-degree angles + halo sign on CT + neutropenic patient = invasive aspergillosis. Contrast with Mucor: pauciseptate, 90-degree branching, diabetic ketoacidosis association.</p>',
        '<p class=\'exp-key\'>Bottom Line: Septate hyphae with acute-angle branching, a halo sign on CT and prolonged neutropenia together point to invasive aspergillosis. Contrast with Mucorales: broad, pauciseptate hyphae with irregular or near-right-angle branching. Neither finding is specific on its own.</p>']
    ],
    keepHeadings: ['<strong>B. Pneumocystis pneumonia:</strong>', '<strong>C. Pulmonary candidiasis:</strong>',
      '<strong>D. Mucormycosis:</strong>'],
    // the stem itself says "approximately 45-degree angles" and is not replaced,
    // so only the explanation's own absolutes are listed here
    gone: ['the leading cause of death from fungal infections', 'aflatoxins',
      'branching at 45-degree angles</strong>', 'with 45-degree branching characteristic',
      '90-degree (right) angles', 'not focal nodules with a halo sign', 'isolated pulmonary candidiasis is rare']
  },

  // ---- Q48  bio-589  tinea capitis (stem, option D, full rewrite) --------
  {
    q: 48, id: 'bio-589', expectLetter: 'C',
    stemFull: 'A 14-year-old boy has scaly patches of hair loss on his scalp, with broken hairs. The affected hairs fluoresce green under a Wood lamp. Which group of fungi is most likely responsible?',
    optionFull: [[3, 'Mucorales']],
    explanationFull: Q48_EXPLANATION,
    gone: ['Zygomycetes', 'black dot', 'annular, erythematous, scaly patches',
      'only infect dead keratinized tissue', 'never invade deeper structures in immunocompetent hosts',
      'produce keratinases that digest keratin', 'griseofulvin']
  },

  // ---- Q49  bio-590  penicillin ------------------------------------------
  {
    q: 49, id: 'bio-590', expectLetter: 'D',
    explanation: [
      ['He identified the mold as <strong><em>Penicillium notatum</em></strong> (later reclassified as <em>P. rubens</em>) and named the antibacterial substance it produced <strong>penicillin</strong>.',
        'Fleming\'s isolate, historically referred to as <em>Penicillium notatum</em>, is now classified as <em>P. rubens</em>; he named the antibacterial substance it produced <strong>penicillin</strong>.'],
      ['<p><strong>A. Aspergillus:</strong> <em>Aspergillus</em> is a filamentous mold used industrially to produce citric acid (<em>A. niger</em>) and in food fermentation (soy sauce, sake). While some <em>Aspergillus</em> species produce mycotoxins (aflatoxins from <em>A. flavus</em>), the genus was not the source of penicillin. <em>Aspergillus</em> and <em>Penicillium</em> are related genera but produce different secondary metabolites.</p>',
        '<p><strong>A. Aspergillus:</strong> <em>Aspergillus</em> species are important in fermentation, biotechnology and disease, but <em>Aspergillus</em> was not the mold genus in Fleming\'s original discovery. The question asks about that specific observation, not every fungus capable of producing an antimicrobial substance.</p>'],
      ['<p><strong>B. Candida:</strong> <em>Candida</em> is a yeast, not a filamentous mold, and is primarily known as an opportunistic human pathogen causing thrush and systemic candidiasis. It does not produce antibiotics. <em>Candida</em> is in fact a target of antifungal therapy, not a source of antimicrobial compounds.</p>',
        '<p><strong>B. Candida:</strong> <em>Candida</em> is best known here as a yeast associated with commensal growth and opportunistic infection. It was not the mold genus from Fleming\'s penicillin experiment. Some <em>Candida</em> species can also form filamentous growth, so yeast should not be treated as an absolute ban on hyphae.</p>']
    ],
    keepHeadings: ['<strong>A. Aspergillus:</strong>', '<strong>B. Candida:</strong>', '<strong>C. Cephalosporium:</strong>'],
    gone: ['later reclassified as <em>P. rubens</em>) and named', 'It does not produce antibiotics',
      'not a source of antimicrobial compounds', 'produce different secondary metabolites']
  },

  // ---- Q50  bio-592  falciparum malaria (stem replaced) ------------------
  {
    q: 50, id: 'bio-592', expectLetter: 'B',
    stemFull: 'A 28-year-old traveler returns from sub-Saharan Africa with episodes of fever, chills and splenomegaly. A Giemsa-stained thin blood smear shows delicate ring forms inside red blood cells, with several cells containing more than one ring. Which Plasmodium species is most likely responsible?',
    explanation: [
      ['<p><strong><em>Plasmodium falciparum</em></strong> is the most dangerous malaria species and the predominant species in sub-Saharan Africa. A key diagnostic feature on blood smear is <strong>multiple ring-form trophozoites within a single red blood cell</strong>, which is uncommon in other <em>Plasmodium</em> species. <em>P. falciparum</em> can infect RBCs of any age, leading to high parasitemia and severe complications including cerebral malaria, severe anemia, and organ failure.</p>' +
        '<p>The malaria lifecycle involves the female <em>Anopheles</em> mosquito (definitive host where sexual reproduction occurs) injecting sporozoites into the human bloodstream, which travel to the liver (exo-erythrocytic stage) before invading red blood cells (erythrocytic stage).</p>',
        '<p><strong><em>Plasmodium falciparum</em></strong> is the predominant species in sub-Saharan Africa and the species most often responsible for severe malaria. A key feature on a thin smear is <strong>multiple delicate ring-form trophozoites within a single red blood cell</strong>, which is uncommon in other <em>Plasmodium</em> species; a thin smear preserves the intact red cells needed to see this. <em>P. falciparum</em> can infect red cells of any age, leading to high parasitemia and severe complications including cerebral malaria, severe anemia and organ failure. Although the erythrocytic cycle takes about 48 hours, fever can be irregular, especially early in the illness.</p>' +
        '<p>In the life cycle, a female <em>Anopheles</em> mosquito (the definitive host, where sexual reproduction occurs) introduces sporozoites, which develop in liver cells; merozoites released from the liver then invade red blood cells.</p>'],
      ['Critically, <em>P. vivax</em> (and <em>P. ovale</em>) form <strong>hypnozoites</strong> in the liver that can cause relapses months to years later - requiring primaquine for radical cure. Multiple rings per RBC are rare.',
        'Critically, <em>P. vivax</em> and <em>P. ovale</em> can leave dormant liver stages called <strong>hypnozoites</strong>, which can cause relapse months to years later and require treatment directed at that stage in addition to the blood-stage infection. Multiple rings per red cell are rare.'],
      ['<p><strong>D. Plasmodium ovale:</strong> <em>P. ovale</em> causes benign tertian malaria (48-hour cycles) similar to <em>P. vivax</em> and also forms liver hypnozoites. Infected RBCs appear oval-shaped with fimbriated (jagged) edges. It primarily occurs in West Africa and is the least common of the four major species. Multiple rings per RBC are not typical.</p>',
        '<p><strong>D. Plasmodium ovale:</strong> <em>P. ovale</em> causes tertian malaria (48-hour cycles) similar to <em>P. vivax</em> and also leaves dormant liver stages. Infected red cells appear oval-shaped with fimbriated (jagged) edges. It occurs mainly in parts of Africa. Multiple rings per red cell are not typical.</p>'],
      ['<li>Only <em>P. vivax</em> and <em>P. ovale</em> form liver hypnozoites requiring primaquine treatment</li>',
        '<li><em>P. vivax</em> and <em>P. ovale</em> can leave dormant liver stages called hypnozoites, which can cause relapse and require treatment directed at that stage as well as at the blood-stage infection</li>'],
      ['<p class=\'exp-key\'>Bottom Line: Multiple ring forms per RBC + Africa + severe disease = P. falciparum. Remember: falciparum is fatal, vivax has reViVax (relapses from hypnozoites), malariae has 72-hour (quartan) cycles.</p>',
        '<p class=\'exp-key\'>Bottom Line: Multiple delicate rings in individual red cells on a thin smear strongly suggest P. falciparum. It can cause severe malaria, but infection is not inevitably fatal.</p>']
    ],
    keepHeadings: ['<strong>A. Plasmodium vivax:</strong>', '<strong>C. Plasmodium malariae:</strong>',
      '<strong>D. Plasmodium ovale:</strong>'],
    gone: ['Giemsa-stained thick blood smear', 'cyclical fevers occurring every 48 hours',
      'requiring primaquine for radical cure', 'benign tertian malaria', 'least common of the four major species',
      'falciparum is fatal', 'the most dangerous malaria species and the predominant species']
  }
];
