/**
 * Batch 3 review, part A: displayed Q1-Q12 (bio-62 .. bio-73).
 * Includes the first substantial rewrites: Q8 and Q12.
 *
 * The six generic "Key Educational Points" blocks reused across Q1-Q59 are
 * replaced here item by item. The bacteriology block is:
 *   "Bacteria are prokaryotes lacking membrane-bound organelles; ... Gram stain
 *    ... Antibiotic resistance spreads rapidly through horizontal gene transfer"
 */
'use strict';

// The generic block reused verbatim across the bacteriology items (Q1-Q11).
const GENERIC_BACT =
  '<ul><li>Bacteria are prokaryotes lacking membrane-bound organelles; they reproduce by binary fission and can exchange genetic material via conjugation, transformation, and transduction.</li>'
  + '<li>The Gram stain distinguishes bacteria by cell wall structure: Gram-positive (thick peptidoglycan, stains purple) vs. Gram-negative (thin peptidoglycan + outer membrane, stains pink).</li>'
  + '<li>Antibiotic resistance spreads rapidly through horizontal gene transfer (plasmids) - a major global health concern.</li></ul>';

const points = items => '<ul>' + items.map(t => '<li>' + t + '</li>').join('') + '</ul>';

module.exports = [

// ============================================================ Q1  bio-62
// A cell wall does not by itself establish beta-lactam susceptibility, and the
// Chlamydia account was out of date: dividing pathogenic chlamydiae do make a
// limited peptidoglycan ring.
{
  q: 1, id: 'bio-62', expectLetter: 'C',
  explanation: [
    ['<p>Mycoplasma species are unique among bacteria because they completely lack a cell wall. Instead, they have a cholesterol-containing plasma membrane that provides structural support. Because β-lactam antibiotics target peptidoglycan synthesis, they are entirely ineffective against Mycoplasma. Treatment typically requires macrolides, tetracyclines, or fluoroquinolones.</p>',
     '<p>Mycoplasma species have no peptidoglycan cell wall at all. They are bounded only by a cholesterol-containing plasma membrane, which is what gives the cell its stability. Beta-lactam antibiotics work by blocking the cross-linking of peptidoglycan, so against Mycoplasma there is simply nothing for the drug to act on. This is intrinsic resistance: it follows from the organism&rsquo;s structure rather than from a resistance gene it acquired. Antibiotics with a different target, such as macrolides or tetracyclines, are not affected by the missing wall.</p>'],
    ['<p><strong>A. Rickettsia:</strong> Rickettsia species are obligate intracellular parasites that DO have a cell wall containing peptidoglycan. They cause diseases like Rocky Mountain spotted fever and typhus. Because they have peptidoglycan, they are susceptible to beta-lactam antibiotics (though tetracyclines are preferred clinically). Their obligate intracellular lifestyle distinguishes them from Mycoplasma, which can grow on artificial media.</p>',
     '<p><strong>A. Rickettsia:</strong> Rickettsia species are obligate intracellular bacteria that do have a cell wall containing peptidoglycan, so they are not the wall-less organism described here. Note that having a wall does not by itself make an organism treatable with beta-lactams: beta-lactams are not effective treatment for tickborne rickettsial diseases. Rickettsia also cannot be grown on artificial media, whereas Mycoplasma can.</p>'],
    ['<p><strong>D. Chlamydia:</strong> Chlamydia species are obligate intracellular bacteria that have an outer membrane but lack classical peptidoglycan (though they contain some peptidoglycan-like components). Despite this, they are structurally different from Mycoplasma - Chlamydia has a rigid outer membrane maintained by disulfide cross-linked proteins. Chlamydia cannot grow on artificial media and has a unique biphasic life cycle (elementary body and reticulate body).</p>',
     '<p><strong>D. Chlamydia:</strong> Chlamydia has an unusual cell envelope, and dividing pathogenic chlamydiae produce a limited peptidoglycan ring. It is therefore not the wall-less organism described here. Chlamydia is also an obligate intracellular bacterium with a two-stage life cycle (elementary body and reticulate body) and cannot be grown on artificial media.</p>'],
    [GENERIC_BACT, points([
      'Beta-lactams act by blocking the cross-linking of peptidoglycan, so they need a peptidoglycan wall to work on.',
      'Mycoplasma has no such wall, so the drug has no target. This is intrinsic resistance, built into the organism rather than acquired.',
      'A plasma membrane is not a cell wall: the membrane controls what crosses it, while a wall gives shape and resists osmotic pressure.',
      'Having a cell wall does not by itself make an organism treatable with beta-lactams; the drug still has to reach and bind its target.',
    ])],
    ['<p class=\'exp-key\'>Bottom Line: Mycoplasma is the smallest free-living bacterium and is inherently resistant to all cell wall-targeting antibiotics due to its complete absence of a cell wall.</p>',
     '<p class=\'exp-key\'>Bottom Line: Mycoplasma lacks a peptidoglycan cell wall, so beta-lactam antibiotics have no cell-wall target to inhibit.</p>'],
  ],
},

// ============================================================ Q2  bio-63
// "ALL bacteria stain purple" and "safranin does not affect Gram-positives".
{
  q: 2, id: 'bio-63', expectLetter: 'C',
  explanation: [
    ['<p><strong>A. Application of crystal violet as primary stain:</strong> Crystal violet is applied first and stains ALL bacteria purple - both Gram-positive and Gram-negative. At this stage, there is no differentiation between the two groups.',
     '<p><strong>A. Application of crystal violet as primary stain:</strong> Both Gram-positive and Gram-negative bacteria initially take up the crystal-violet stain in the standard procedure, so at this stage there is no differentiation between the two groups.'],
    ['Safranin does not affect Gram-positive bacteria because they already retained the darker crystal violet. The counterstain makes Gram-negatives visible but is not the step that differentiates the two groups.</p>',
     'Safranin binds Gram-positive cells too, but it does not visibly change their appearance, because the darker crystal violet they have retained masks it. The counterstain makes Gram-negatives visible; it is not the step that separates the two groups.</p>'],
    [GENERIC_BACT, points([
      'The sequence is crystal violet, then iodine as a mordant, then the decolorizer, then safranin as counterstain.',
      'Both cell types look purple until the decolorizer is applied, so decolorization is where the differentiation actually happens.',
      'A Gram-positive cell keeps the crystal violet-iodine complex because its thick peptidoglycan traps it; a Gram-negative cell loses it through its thin layer.',
      'Leaving the decolorizer on too long washes the dye out of Gram-positive cells as well, producing a false Gram-negative result.',
    ])],
  ],
},

// ============================================================ Q3  bio-64
// Lipid A and LPS used interchangeably; lysis taught as required for exposure.
{
  q: 3, id: 'bio-64', expectLetter: 'B',
  explanation: [
    ['<p>Endotoxin is the lipopolysaccharide (LPS) found in the outer membrane of Gram-negative bacteria. The toxic component is specifically Lipid A, which is released upon bacterial lysis. Lipid A activates macrophages and triggers the release of cytokines such as TNF-α and IL-1, which can lead to fever, septic shock, and disseminated intravascular coagulation (DIC) at high concentrations.</p>',
     '<p>The endotoxin is the lipopolysaccharide (LPS) of the Gram-negative outer membrane, and lipid A is its principal toxic component. The two are not interchangeable terms: lipid A is one part of the larger LPS molecule. LPS can reach the host when bacteria lyse, but also during growth, for example in outer-membrane vesicles, so lysis is not required for exposure. Lipid A activates innate immune cells such as macrophages, which release inflammatory mediators. A local response is useful; widespread systemic activation can cause fever and shock.</p>'],
    ['Endotoxin is specifically the lipid A moiety of LPS, which triggers massive inflammatory responses (TNF-α, IL-1, IL-6) and can cause septic shock.</p>',
     'Endotoxin is the LPS of the outer membrane, with lipid A as its toxic part, and it acts by driving inflammation rather than by forming channels.</p>'],
    ['While flagellin is recognized by the innate immune system (via Toll-like receptor 5, TLR5) and can trigger inflammation, it is not classified as an endotoxin. Endotoxin is specifically lipid A of LPS, released when Gram-negative bacteria lyse. Flagellin\'s immunogenicity is why it is used as a vaccine adjuvant in some formulations.</p>',
     'Flagellin can be recognized by the innate immune system and can trigger inflammation, but it is not the endotoxin. The endotoxin is LPS, whose toxic component is lipid A.</p>'],
    [GENERIC_BACT, points([
      'The Gram-negative outer membrane carries LPS. LPS is the endotoxin, and lipid A is the part responsible for its toxicity.',
      'Lipid A activates innate immune cells; a large systemic response can produce fever and shock.',
      'Exposure does not require the bacterium to lyse: LPS is also shed during growth, for example in outer-membrane vesicles.',
      'The other listed structures do different jobs: a capsule resists phagocytosis, porins let small molecules cross the outer membrane, and flagellin builds the flagellum.',
    ])],
  ],
},

// ============================================================ Q4  bio-65
// Sound item; only the educational points needed replacing.
{
  q: 4, id: 'bio-65', expectLetter: 'A',
  explanation: [
    [GENERIC_BACT, points([
      'In stationary phase the viable count plateaus, because new cells are produced at roughly the rate at which cells die.',
      'Nutrient depletion and the accumulation of waste products are the usual reasons growth slows to that balance.',
      '"Stationary" describes the population, not the individual cells: bacteria remain metabolically active, and some begin producing secondary metabolites.',
    ])],
  ],
},

// ============================================================ Q5  bio-66
// Conjugation should not be defined as universally requiring an F plasmid and
// sex pilus; accidental packaging is generalized transduction specifically.
{
  q: 5, id: 'bio-66', expectLetter: 'C',
  explanation: [
    ['<tr><td>Conjugation</td><td>Direct transfer via pilus (F plasmid)</td></tr>',
     '<tr><td>Conjugation</td><td>Direct cell contact and conjugative transfer machinery</td></tr>'],
    ['When a phage accidentally packages host bacterial DNA instead of viral DNA, it can inject this DNA into a new bacterial cell. Generalized transduction can transfer any gene, while specialized transduction transfers only genes near the prophage insertion site.',
     'When a phage packages host bacterial DNA by mistake, it can inject that DNA into a new bacterial cell: this is generalized transduction, and it can move more or less any gene. Specialized transduction works differently, carrying only genes next to the prophage insertion site.'],
    ['<p><strong>D. Conjugation:</strong> Conjugation is horizontal gene transfer through direct cell-to-cell contact via a pilus (encoded by the F plasmid). The donor (F⁺) cell extends a pilus to the recipient (F⁻) cell, creating a bridge for DNA transfer. Conjugation is often called "bacterial mating." Unlike transformation (uptake of free environmental DNA), conjugation requires physical contact between living bacterial cells.</p>',
     '<p><strong>D. Conjugation:</strong> Conjugation is horizontal gene transfer through direct cell-to-cell contact, using conjugative transfer machinery. In the classic <em>E. coli</em> system an F⁺ donor builds a pilus that helps it contact an F⁻ recipient, but F-mediated transfer is one example rather than the universal mechanism. What matters here is the contrast with transformation: conjugation needs contact between living cells, transformation needs only free DNA.</p>'],
    [GENERIC_BACT, points([
      'The three routes of horizontal gene transfer differ in what carries the DNA: free environmental DNA (transformation), a bacteriophage (transduction), or direct cell contact (conjugation).',
      'Transformation requires the recipient to be competent, meaning able to take DNA across its envelope.',
      'Horizontal transfer changes a bacterium&rsquo;s genetic information, but it is not reproduction: the transfer itself makes no new cell.',
    ])],
  ],
},

// ============================================================ Q6  bio-67
// Sound item; only the educational points needed replacing.
{
  q: 6, id: 'bio-67', expectLetter: 'D',
  explanation: [
    [GENERIC_BACT, points([
      'Aminoglycosides bind the 30S subunit and interfere with accurate decoding of the mRNA, so wrong amino acids get inserted.',
      'Macrolides act at the 50S subunit instead, blocking movement of the growing peptide chain.',
      'Rifamycins are not protein-synthesis inhibitors at all: they block transcription by inhibiting RNA polymerase, so no mRNA is made to read.',
    ])],
  ],
},

// ============================================================ Q7  bio-68
// Phage infection does not generally or automatically trigger the SOS response.
{
  q: 7, id: 'bio-68', expectLetter: 'C',
  explanation: [
    ['<p><strong>D. Exposure to bacteriophage infection:</strong> Phage infection triggers the bacterial SOS response and potentially the lytic cycle, but it does not specifically induce endospore formation. Sporulation is triggered by starvation, desiccation, or extreme environmental conditions. The endospore is a dormant, highly resistant structure that can survive heat, UV radiation, desiccation, and chemical disinfectants for decades or even centuries.</p>',
     '<p><strong>D. Exposure to bacteriophage infection:</strong> Phage infection does not generally trigger sporulation. DNA damage can activate the bacterial SOS response, and that in turn can induce certain lysogenic phages, but this is a different mechanism from the nutrient-triggered programme that builds an endospore. Sporulation is set off by starvation, drying, or other unfavourable conditions, not by infection.</p>'],
    [GENERIC_BACT, points([
      'Nutrient limitation is the common trigger: a bacterium capable of sporulating does so when conditions turn unfavourable.',
      'One vegetative cell makes one endospore, and one endospore germinates into one vegetative cell, so this is survival rather than reproduction.',
      'The endospore is dormant and highly resistant to heat, drying, radiation and disinfectants; germination follows when conditions improve.',
    ])],
  ],
},

// ============================================================ Q8  bio-69
// SUBSTANTIAL REWRITE. The old item defined obligate anaerobes as lacking
// catalase and superoxide dismutase, which is false: some obligate anaerobes
// have substantial antioxidant defences and still cannot grow in oxygen.
// Oxygen also directly inactivates oxygen-sensitive metabolic enzymes.
{
  q: 8, id: 'bio-69', expectLetter: 'A',
  stemFull: 'An obligately anaerobic bacterium grows only when oxygen is excluded. Which explanation best accounts for inhibition of its growth by oxygen?',
  optionFull: [
    [0, 'Oxidative damage and inactivation of oxygen-sensitive metabolic enzymes'],
    [1, 'Direct inhibition of ATP synthase by oxygen in all anaerobes'],
    [2, 'Denaturation of bacterial ribosomes simply by contact with oxygen'],
    [3, 'Blockage of chemotaxis receptors by oxygen molecules'],
  ],
  explanationFull:
    '<h4>Correct Answer: A) Oxidative damage and inactivation of oxygen-sensitive metabolic enzymes</h4>'
    + '<p>Obligate anaerobes cannot sustain growth in oxygenated conditions. Oxygen and the reactive oxygen species formed from it can damage cellular components and disrupt oxygen-sensitive enzymes that the organism&rsquo;s metabolism depends on. Their protective systems vary: some have catalase, superoxide dismutase, or other defences, yet they still cannot grow in oxygen. Oxygen tolerance therefore cannot be classified simply by the presence or absence of two enzymes.</p>'
    + '<p>Note also that failing to grow in oxygen is not the same as being unable to survive any exposure at all. How long a given species tolerates air varies.</p>'
    + '<table class=\'exp-table\'><caption>Growth requirement, not enzyme inventory</caption>'
    + '<tr><th>Group</th><th>Growth in the presence of oxygen</th></tr>'
    + '<tr><td>Obligate aerobe</td><td>Requires oxygen in order to grow</td></tr>'
    + '<tr><td>Facultative anaerobe</td><td>Grows with or without oxygen</td></tr>'
    + '<tr><td><strong>Obligate anaerobe</strong></td><td><strong>Does not grow under the oxygenated conditions discussed here</strong></td></tr>'
    + '</table>'
    + '<h4>Why the other choices are wrong:</h4>'
    + '<p><strong>B. Direct inhibition of ATP synthase by oxygen in all anaerobes:</strong> Direct inhibition of ATP synthase by oxygen is not the general explanation for obligate anaerobiosis. Obligate anaerobes make ATP by fermentation or by anaerobic respiration, and the problem oxygen causes is oxidative damage and the inactivation of sensitive enzymes, not a block on ATP synthase itself.</p>'
    + '<p><strong>C. Denaturation of bacterial ribosomes simply by contact with oxygen:</strong> Oxygen does not simply denature bacterial ribosomes. Ribosomes work in aerobes and anaerobes alike. The relevant mechanisms are oxidative damage to cell components and the disruption of oxygen-sensitive metabolism.</p>'
    + '<p><strong>D. Blockage of chemotaxis receptors by oxygen molecules:</strong> Chemotaxis concerns movement toward or away from a stimulus. Some bacteria do move in response to oxygen, but that is behaviour, not the fundamental reason an obligate anaerobe cannot grow in oxygen.</p>'
    + '<h4>Key Educational Points:</h4>'
    + points([
      'An obligate anaerobe is defined by its oxygen-sensitive growth, not by lacking any particular enzyme.',
      'Oxygen and reactive oxygen species can damage cell components and inactivate oxygen-sensitive enzymes the organism needs to metabolize.',
      'Protective enzymes vary between species: some obligate anaerobes do have catalase or superoxide dismutase and still cannot grow in oxygen.',
      'Not growing in oxygen is not the same as dying the instant air reaches the cell; tolerance of brief exposure differs between species.',
    ])
    + '<p class=\'exp-key\'>Bottom Line: Obligate anaerobes are defined by their oxygen-sensitive growth, not by a universal absence of catalase and superoxide dismutase.</p>',
},

// ============================================================ Q9  bio-70
// Flagella can contribute to attachment and biofilms, so the stem is narrowed
// to short hair-like appendages and the claim is softened.
{
  q: 9, id: 'bio-70', expectLetter: 'A',
  stemFull: 'Which short, hair-like surface appendages commonly mediate specific attachment of bacteria to host cells?',
  explanation: [
    ['This adhesion is the first step in biofilm formation. Biofilms are complex communities of bacteria encased in an extracellular matrix that protects them from antibiotics and immune responses.</p>',
     'This adhesion is usually the first step in colonization and in biofilm formation. A biofilm is a community of bacteria encased in an extracellular matrix, and bacteria growing in one are harder to clear with antibiotics and immune defences. That tolerance is a property of the community rather than inherited resistance in each cell.</p>'],
    ['<p><strong>B. Flagella:</strong> Flagella are long, whip-like appendages used for bacterial motility (swimming through liquid environments). They are powered by a rotary motor at the base and are composed of the protein flagellin. While motility helps bacteria reach surfaces initially, flagella are not the primary adhesion structures for forming biofilms. Fimbriae (pili) provide the specific adhesin-receptor interactions needed for firm attachment.</p>',
     '<p><strong>B. Flagella:</strong> Flagella are long, whip-like appendages whose primary role is motility, driven by a rotary motor at the base. They can also contribute to attachment and to biofilm development, so it would be wrong to say they never participate. They are not, however, the short hair-like appendages the question describes, and firm, specific attachment to host cells comes from the adhesins carried on fimbriae.</p>'],
    [GENERIC_BACT, points([
      'Fimbriae are short, hair-like appendages; the adhesins they carry bind specific molecules on host cells, which is usually the first step in colonization.',
      'Flagella are long and whip-like and mainly provide motility, although they can contribute to attachment as well.',
      'Attachment allows biofilms to form. A biofilm tolerates antibiotics and immune attack better than free-living cells, which is a property of the community rather than inherited resistance.',
    ])],
  ],
},

// ============================================================ Q10 bio-71
// "Enzymatic destruction" is too narrow as the umbrella category.
{
  q: 10, id: 'bio-71', expectLetter: 'B',
  explanation: [
    ['<p>β-lactamases are enzymes produced by resistant bacteria that hydrolyze the β-lactam ring of penicillins and cephalosporins, rendering them inactive. This is a direct enzymatic modification of the antibiotic molecule. Other resistance mechanisms include target modification (e.g., altered PBPs in MRSA), efflux pumps that expel the drug, and porin mutations that reduce drug entry.</p>',
     '<p>Beta-lactamases hydrolyse the beta-lactam ring of susceptible beta-lactam antibiotics, such as many penicillins and cephalosporins, which inactivates the drug. This is enzymatic inactivation: the antibiotic molecule itself is chemically changed. The other three mechanisms in the choices leave the drug molecule intact: altering its target, reducing its entry, or pumping it back out.</p>'],
    ['<p class=\'exp-key\'>Bottom Line: Enzymatic destruction of antibiotics (e.g., β-lactamase, aminoglycoside-modifying enzymes) is one of four major mechanisms of antibiotic resistance.</p>',
     '<p class=\'exp-key\'>Bottom Line: Enzymatic inactivation of the drug is one of four major resistance mechanisms. Beta-lactamases hydrolyse the beta-lactam ring; aminoglycoside-modifying enzymes chemically modify their substrate rather than necessarily destroying the whole molecule.</p>'],
    [GENERIC_BACT, points([
      'Four distinct resistance mechanisms: inactivating the drug, reducing its entry, pumping it out again, and altering the drug&rsquo;s target.',
      'Only the first changes the antibiotic molecule itself. The other three keep an intact drug away from its target, or change the target so the drug no longer binds.',
      'Beta-lactamase is the classic inactivating enzyme, hydrolysing the beta-lactam ring. Aminoglycoside-modifying enzymes also inactivate, but by chemically modifying the drug.',
    ])],
  ],
},

// ============================================================ Q11 bio-72
// Not every conjugating donor carries a separate F plasmid, and other
// conjugation systems use different conjugative elements.
{
  q: 11, id: 'bio-72', expectLetter: 'D',
  stemFull: 'In the classic F⁺ to F⁻ conjugation system of <em>Escherichia coli</em>, which genetic element carries the genes required for transfer by the donor cell?',
  explanation: [
    ['<p>Conjugation requires the F plasmid (fertility factor) in the donor cell (F⁺). The F plasmid encodes genes for the formation of the sex pilus, which connects the donor to the recipient (F⁻) cell, and for the transfer machinery. A single strand of the F plasmid is transferred to the recipient through the pilus, and both cells then synthesize the complementary strand. Hfr cells have the F plasmid integrated into the chromosome.</p>',
     '<p>In this system the F factor (fertility factor) carries the genes for the sex pilus and for the transfer machinery. The pilus helps the F⁺ donor establish contact with an F⁻ recipient, a single strand of the F plasmid is transferred, and both cells then synthesize the complementary strand, so the recipient usually becomes F⁺ as well.</p>'
     + '<p>Two scope points are worth keeping straight. In an Hfr cell the F factor is integrated into the chromosome rather than sitting separately, so a conjugating donor does not have to carry a free F plasmid. And other bacteria conjugate using different conjugative elements, so this describes the classic <em>E. coli</em> case rather than every instance of conjugation.</p>'],
    ['<p class=\'exp-key\'>Bottom Line: Conjugation is the only horizontal gene transfer mechanism requiring direct cell-to-cell contact via the sex pilus.</p>',
     '<p class=\'exp-key\'>Bottom Line: Conjugation is the horizontal transfer mechanism that needs direct contact between cells. In the classic <em>E. coli</em> system, the F factor supplies the pilus and the transfer machinery.</p>'],
    [GENERIC_BACT, points([
      'An F⁺ donor carries the F factor and an F⁻ recipient does not. Contact is established, one DNA strand crosses, and each cell then builds the complementary strand.',
      'The recipient usually becomes F⁺ itself, so the ability to conjugate spreads through the population.',
      'In an Hfr cell the F factor has integrated into the chromosome, so conjugation can carry chromosomal genes too. That is a related arrangement, not a separate free plasmid.',
    ])],
  ],
},

// ============================================================ Q12 bio-73
// SUBSTANTIAL REWRITE. Protease inhibitors target the protease ENZYME; the
// polyproteins are its substrate. "Protease inhibitors" is also a drug class,
// not an enzyme class, so the old stem could not be answered correctly.
{
  q: 12, id: 'bio-73', expectLetter: 'D',
  stemFull: 'A drug inhibits HIV protease. Which process is directly blocked?',
  optionFull: [
    [0, 'Insertion of viral DNA into the host chromosome'],
    [1, 'Attachment of the virus to CD4 receptors'],
    [2, 'Conversion of viral RNA into DNA'],
    [3, 'Cleavage of viral polyprotein precursors into functional proteins'],
  ],
  explanationFull:
    '<h4>Correct Answer: D) Cleavage of viral polyprotein precursors into functional proteins</h4>'
    + '<p>HIV initially makes several of its proteins as long polyprotein chains. Viral protease cuts these chains into the separate proteins needed for a mature, infectious particle. Inhibiting the protease prevents this maturation step, so immature particles can still be assembled but fail to mature normally and are not infectious.</p>'
    + '<p>Note what the drug acts on. A protease inhibitor inhibits the protease enzyme; the polyproteins are that enzyme&rsquo;s substrate. The processing happens around the late assembly and budding stages of the life cycle.</p>'
    + '<h4>Why the other choices are wrong:</h4>'
    + '<p><strong>A. Insertion of viral DNA into the host chromosome:</strong> Integrase inserts viral DNA into the host chromosome. That is a different enzyme and a different step, and it is the target of a different drug class.</p>'
    + '<p><strong>B. Attachment of the virus to CD4 receptors:</strong> Viral envelope proteins mediate attachment and entry. Protease plays no part in getting the virus into the cell.</p>'
    + '<p><strong>C. Conversion of viral RNA into DNA:</strong> Reverse transcriptase copies the viral RNA genome into DNA. This happens early, soon after entry, and well before the protein processing that protease carries out.</p>'
    + '<h4>Key Educational Points:</h4>'
    + points([
      'Three HIV enzymes, three jobs: reverse transcriptase copies the RNA genome into DNA, integrase inserts that DNA into the host chromosome, and protease cuts polyproteins into finished proteins.',
      'Protease acts at maturation, so blocking it still allows particles to be assembled; they simply do not become infectious.',
      'A drug class is named for what it inhibits. Protease inhibitors inhibit the protease enzyme, and the polyproteins are that enzyme&rsquo;s substrate.',
    ])
    + '<p class=\'exp-key\'>Bottom Line: HIV protease cleaves polyproteins; protease inhibitors block viral maturation.</p>',
},

];
