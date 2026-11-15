/**
 * Batch 2 review, part B: displayed Q17-Q32 (Q26 and Q28 are KEEP items).
 * Includes two of the three substantial rewrites: Q22 and Q23.
 */
'use strict';

module.exports = [

// ============================================================ Q17 bio-135
// Splicing acts during RNA processing, which can be during or after
// transcription. The large numerical claims answer nothing here.
{
  q: 17, id: 'bio-135', expectLetter: 'A',
  explanation: [
    ['<p>Alternative splicing is a post-transcriptional mechanism that selectively includes or excludes different exons from the pre-mRNA, generating multiple distinct mRNA variants from a single gene. Each variant can be translated into a different protein isoform with potentially different functions, localizations, or binding properties. Over 95% of human multi-exon genes undergo alternative splicing, greatly expanding the proteome.</p>',
     '<p>Alternative splicing acts during RNA processing, which can take place during or after transcription. It selects different combinations of exons from the same pre-mRNA, so one gene can give several different mature mRNAs and several protein isoforms, which may differ in function, in where they sit in the cell, or in what they bind. A pre-mRNA with exons 1, 2, 3 and 4, for instance, may be spliced as 1-2-3-4 in one cell type and as 1-3-4 in another, giving two mRNAs and two isoforms from one gene.</p>'],
    ['<p><strong>B. Bypass the need for a poly-A tail for mRNA stability:</strong> The poly-A tail (a stretch of ~200 adenine nucleotides added to the 3’ end of mRNA) is essential for mRNA stability and export from the nucleus. Alternative splicing does not eliminate the need for polyadenylation-all alternatively spliced mRNAs still require a poly-A tail. Polyadenylation and splicing are separate post-transcriptional modifications, though alternative polyadenylation sites can contribute to mRNA diversity.</p>',
     '<p><strong>B. Bypass the need for a poly-A tail for mRNA stability:</strong> Splicing and polyadenylation are separate processing steps, and choosing between exon combinations does nothing to the 3&prime; end. Most mature mRNAs carry a poly(A) tail, which contributes to stability and to export from the nucleus, and alternative splicing is not a substitute for it. Selecting between alternative polyadenylation sites is itself a separate way of generating mRNA diversity.</p>'],
    ['Transcription rate is controlled by promoter elements, transcription factors, and chromatin state. A single gene like the Drosophila DSCAM gene can produce over 38,000 different mRNA variants through alternative splicing.</p>',
     'Transcription rate is controlled by promoter elements, transcription factors, and the state of the chromatin.</p>'],
    ['<li>It acts after transcription, on the pre-mRNA, and does not alter the gene itself.</li><li>The great majority of human multi-exon genes are alternatively spliced, which is a major reason the proteome far exceeds the gene count.</li>',
     '<li>It acts during RNA processing, on the pre-mRNA, which can happen during or after transcription. The gene itself is unchanged.</li><li>Many human genes with more than one exon are alternatively spliced, which is one reason a genome can make more proteins than it has genes.</li>'],
    ['<p class=\'exp-key\'>Bottom Line: Alternative splicing explains how ~20,000 human genes can produce over 100,000 different proteins - it is a major mechanism for increasing proteomic diversity without increasing gene number.</p>',
     '<p class=\'exp-key\'>Bottom Line: Alternative splicing lets one gene give several mRNAs and several protein isoforms, so the number of proteins a cell can make is not fixed by the number of genes.</p>'],
  ],
},

// ============================================================ Q18 bio-293
// "Mild sickling" is not the explanation for malaria protection, protection
// is partial, trait is not a guarantee of health, and G6PD deficiency is
// X-linked so it does not fit the same HbAA/HbAS/HbSS scheme.
{
  q: 18, id: 'bio-293', expectLetter: 'C',
  explanation: [
    ['<p>In malaria-endemic regions, HbSS individuals suffer from sickle cell disease, HbAA individuals are susceptible to severe malaria, but HbAS heterozygotes have mild sickling that impairs the malaria parasite without causing disease. This maintains both alleles in the population (balanced polymorphism).</p>',
     '<p>In regions where falciparum malaria is common, HbAS individuals have protection against severe malaria and usually do not have sickle cell disease. HbAA individuals lack that protection, and HbSS individuals have sickle cell disease. Because the heterozygote has the highest fitness in that setting, selection can favour maintenance of both alleles in the population, which is a balanced polymorphism. The protection is partial rather than complete immunity, and sickle cell trait is not a guarantee of freedom from health problems.</p>'],
    ['<p><strong>D. Disruptive selection:</strong> Disruptive selection favors both extreme phenotypes over the intermediate, potentially splitting the population into two distinct groups. This is the opposite of what happens with sickle cell trait, where the intermediate (heterozygote HbAS) is actually the most fit. Disruptive selection would drive the population toward homozygosity, not maintain heterozygosity.</p>',
     '<p><strong>D. Disruptive selection:</strong> Disruptive selection favours both phenotypic extremes over the intermediate, and can split a population into two distinct groups. Sickle cell trait is the opposite case: in a malaria-endemic region the intermediate genotype, HbAS, is the fittest, so selection preserves the heterozygote rather than the extremes.</p>'],
    ['<li>HbAS carriers resist severe malaria, while HbAA are susceptible and HbSS have sickle cell disease.</li>',
     '<li>HbAS carriers have partial protection against severe malaria, HbAA individuals lack it, and HbSS individuals have sickle cell disease.</li>'],
    ['<li>Thalassaemias and G6PD deficiency show the same pattern, and it is a standard exception to the expectation that deleterious alleles are purged.</li>',
     '<li>Heterozygote advantage is a standard reason a harmful allele can persist instead of being removed by selection.</li>'],
  ],
},

// ============================================================ Q19 bio-75
// Shift is not simply "reassortment between subtypes", and not every
// reassortment is a shift. Generic virology points replaced with shift/drift.
{
  q: 19, id: 'bio-75', expectLetter: 'D',
  stemFull: 'Which mechanism can produce antigenic shift in influenza A viruses?',
  optionFull: [[3, 'Reassortment of RNA genome segments when distinct influenza A viruses infect the same cell']],
  headingsGone: ['Correct Answer: D) Reassortment of genome segments between different influenza subtypes'],
  explanation: [
    ['<h4>Correct Answer: D) Reassortment of genome segments between different influenza subtypes</h4><p>Antigenic shift involves the major change of surface antigens (hemagglutinin and/or neuraminidase) through reassortment. This occurs when two different influenza A subtypes co-infect the same cell, and their segmented genomes (8 segments) mix during replication. The result can be a novel virus to which the human population has no immunity, potentially causing pandemics. Antigenic drift, by contrast, involves minor point mutations.</p>',
     '<h4>Correct Answer: D) Reassortment of RNA genome segments when distinct influenza A viruses infect the same cell</h4><p>Influenza A carries its genome as eight separate RNA segments. When two distinct influenza A viruses infect the same cell, segments from both can be packaged into the new virus particles, a process called reassortment. If the resulting virus carries a hemagglutinin or neuraminidase that is new to the human population, the antigenic change can be large, and that is antigenic shift. Not every reassortment produces one. Antigenic shift can also arise when an influenza A virus of animal origin begins infecting humans, so it is not defined by reassortment alone. Antigenic drift, by contrast, is the gradual change produced by point mutations.</p>'],
    ['<p><strong>A. Recombination between influenza and a host cellular gene:</strong> Recombination between viral and host genes is not the mechanism of antigenic shift in influenza. Antigenic shift specifically involves reassortment of genome segments between different influenza virus subtypes when they co-infect the same cell (often in pigs, which can be infected by both avian and human strains). This produces a dramatically new surface antigen against which the population has little immunity, potentially causing pandemics.</p>',
     '<p><strong>A. Recombination between influenza and a host cellular gene:</strong> Recombination between a viral gene and a host cellular gene is not the mechanism here. Shift arises from exchange of whole genome segments between influenza A viruses infecting the same cell, which can happen in a host such as a pig that both avian and human viruses are able to infect.</p>'],
    ['Antigenic shift is a sudden, major change from reassortment of entire genome segments, producing entirely new surface protein subtypes.</p>',
     'Antigenic shift is a large, sudden antigenic change, which exchange of whole genome segments can produce.</p>'],
    ['Antigenic shift is not caused by mutation at all - it results from the physical exchange (reassortment) of genome segments when two different influenza A subtypes infect the same cell simultaneously.</p>',
     'Antigenic shift is not produced by mutation within one genome: it results from the physical exchange of whole genome segments when two influenza A viruses infect the same cell.</p>'],
    ['<ul><li>Viruses are obligate intracellular parasites consisting of nucleic acid (DNA or RNA) enclosed in a protein coat (capsid); they cannot reproduce independently.</li><li>Viral replication strategies vary: lytic cycle (immediate reproduction and cell lysis) vs. lysogenic cycle (genome integration as prophage with delayed lysis).</li><li>Retroviruses (like HIV) use reverse transcriptase to convert their RNA genome into DNA, which integrates into the host chromosome as a provirus.</li></ul><p class=\'exp-key\'>Bottom Line: Antigenic shift (reassortment) causes pandemics, while antigenic drift (point mutations) causes seasonal epidemics. Shift requires a segmented genome.</p>',
     '<ul><li>Influenza A has a segmented RNA genome, eight separate pieces, which is what makes reassortment possible at all.</li><li>Antigenic shift is a large, abrupt change in the surface antigens. Reassortment can produce it, and so can an animal-origin influenza A virus beginning to infect humans.</li><li>Antigenic drift is the gradual change produced by point mutations during replication, and is why seasonal vaccines are updated.</li><li>A novel virus may cause a pandemic if people have little immunity to it and it spreads efficiently between humans.</li></ul><p class=\'exp-key\'>Bottom Line: Antigenic shift is a large antigenic change that reassortment of genome segments can produce; antigenic drift is the gradual change from point mutations. A novel virus may cause a pandemic if immunity is low and it transmits efficiently between humans.</p>'],
  ],
},

// ============================================================ Q20 bio-330
// "ALL cells have the same DNA" and "every cell except gametes has 46
// chromosomes" are both false as written.
{
  q: 20, id: 'bio-330', expectLetter: 'B',
  stemFull: 'Most nucleated somatic cells in a person contain essentially the same genome. Why do different cell types nevertheless have different structures and functions?',
  explanation: [
    ['<p>Cellular differentiation results from differential gene expression, not changes in DNA content. Transcription factors, epigenetic modifications (DNA methylation, histone modification), and signaling molecules determine which genes are active in each cell type. A skin cell and a neuron have identical genomes but express very different sets of genes. This was demonstrated by somatic cell nuclear transfer experiments (cloning).</p>',
     '<p>Differentiation works primarily by changing which genes are expressed, not by changing the DNA a cell contains. Transcription factors, epigenetic modifications such as DNA methylation and histone modification, and signalling molecules together decide which genes are active in each cell type. A skin cell and a neuron carry essentially the same genome but transcribe very different sets of genes from it. Somatic cell nuclear transfer experiments showed this directly: the nucleus of a differentiated cell can still direct the development of a whole organism.</p>'],
    ['<p><strong>C. Each cell type receives a unique set of chromosomes during mitosis:</strong> Mitosis distributes identical, complete sets of chromosomes to each daughter cell. Every cell in the body (except gametes) receives the same 46 chromosomes. If cells received unique subsets of chromosomes, cloning from a differentiated cell would be impossible. Cell identity is determined by which genes are turned on or off through transcription factors and epigenetic marks.</p>',
     '<p><strong>C. Each cell type receives a unique set of chromosomes during mitosis:</strong> Mitosis distributes complete, identical sets of chromosomes to both daughter cells, so cells of different types are not handed different chromosome sets. If they were, cloning from a differentiated cell would be impossible. Cell identity comes from which genes are switched on or off, through transcription factors and epigenetic marks.</p>'],
    ['<li>Differentiation results from differential gene expression, not from any loss or change of DNA.</li><li>Nearly all somatic cells retain the complete genome; they simply transcribe different subsets of it.</li>',
     '<li>Differentiation primarily changes which genes are expressed. It does not routinely delete unused genes or give each cell type a different chromosome set.</li><li>Nearly all nucleated somatic cells retain the whole genome; they simply transcribe different subsets of it.</li>'],
    ['<p class=\'exp-key\'>Bottom Line: Differentiation = differential gene expression with the same genome. Epigenetic mechanisms regulate which genes are active in each cell type.</p>',
     '<p class=\'exp-key\'>Bottom Line: Differentiation = differential gene expression from essentially the same genome. Epigenetic mechanisms help regulate which genes are active in each cell type.</p>'],
  ],
},

// ============================================================ Q21 bio-542
// Hematocrit is a concentration. A high value can mean more red cells or less
// plasma, so it does not by itself prove increased production.
{
  q: 21, id: 'bio-542', expectLetter: 'B',
  explanation: [
    ['<p>Hematocrit is the percentage of blood volume occupied by red blood cells. An elevated hematocrit (>54% in males) indicates polycythemia, an increased number of RBCs. Secondary polycythemia commonly occurs in response to chronic hypoxia (e.g., living at high altitude, chronic lung disease, or heavy smoking), which stimulates erythropoietin (EPO) production by the kidneys, driving increased RBC production.</p>',
     '<p>Hematocrit is the fraction of blood volume occupied by red cells, so it is a concentration rather than a count. A raised value can come from an increased red-cell mass or from a reduced plasma volume, as in dehydration, and so does not by itself prove increased red-cell production. Among the listed options, polycythemia best fits an elevated hematocrit. Secondary polycythemia commonly follows chronic hypoxia, for example living at high altitude, chronic lung disease, or heavy smoking, which raises erythropoietin (EPO) production by the kidneys and so increases red-cell production.</p>'],
    ['<ul><li>Hematocrit = percentage of blood volume occupied by RBCs</li><li>Chronic hypoxia leads to increased EPO, increased RBC production, and polycythemia</li></ul><p class=\'exp-key\'>Bottom Line: Elevated hematocrit indicates polycythemia, commonly caused by chronic hypoxia stimulating EPO-driven erythropoiesis.</p>',
     '<ul><li>Hematocrit is the percentage of blood volume occupied by red cells.</li><li>An elevated hematocrit may reflect an increased red-cell mass, or a relative concentration of red cells because plasma volume has fallen.</li><li>Chronic hypoxia raises EPO, which raises red-cell production and can give a genuinely increased red-cell mass.</li><li>Immediately after acute whole-blood loss the hematocrit can still be normal, because cells and plasma are lost in the same proportion.</li></ul><p class=\'exp-key\'>Bottom Line: Among the listed options, polycythemia best fits an elevated hematocrit. Read hematocrit as a concentration: it rises when red-cell mass increases, and also when plasma volume falls.</p>'],
  ],
},

// ============================================================ Q22 bio-342
// SUBSTANTIAL REWRITE. Allostery and cooperativity are related but distinct:
// not all allosteric enzymes are multimeric or cooperative, and
// Michaelis-Menten behaviour is not limited to single-subunit enzymes. The
// old item taught all three equivalences, and option C confused a straight
// line with a constant velocity. The question now asks about cooperativity
// directly, which is what the sigmoidal curve actually follows from.
{
  q: 22, id: 'bio-342', expectLetter: 'B',
  stemFull: 'A multisubunit enzyme shows positive substrate cooperativity: binding of substrate to one subunit increases substrate affinity at the other subunits. Which shape is expected when initial reaction rate is plotted against substrate concentration?',
  optionFull: [
    [0, 'Hyperbolic curve'],
    [1, 'Sigmoidal (S-shaped) curve'],
    [2, 'Straight line through the origin'],
    [3, 'Horizontal line at all substrate concentrations'],
  ],
  explanationFull:
    '<h4>Correct Answer: B. Sigmoidal (S-shaped) curve</h4>'
    + '<p>At low substrate concentration relatively little substrate binds, because the first binding event is the hardest: affinity at the other subunits is still low. Once some sites are occupied, binding at the remaining sites becomes easier, so the rate climbs steeply over a narrow range of substrate concentration. At high concentration the enzyme approaches saturation and the curve flattens. A slow start, a steep middle, and a plateau together give the S shape.</p>'
    + '<p>One distinction is worth keeping separate from this. Allosteric regulation means binding at a site other than the active site. Positive cooperativity means one binding event makes the next easier. The two often appear together, but they are different ideas, and an enzyme can be allosteric without being cooperative.</p>'
    + '<h4>Why the other choices are wrong:</h4>'
    + '<p><strong>A. Hyperbolic curve:</strong> A rectangular hyperbola is the usual non-cooperative, Michaelis-Menten pattern, described by V = Vmax[S]/(Km + [S]). It rises steeply from the origin and then bends over toward Vmax, with no slow start. Cooperativity is precisely what makes the curve depart from this shape at low substrate concentration.</p>'
    + '<p><strong>C. Straight line through the origin:</strong> A straight line would mean the rate kept rising in proportion to substrate concentration without limit. A real enzyme has a finite number of active sites, so the rate must level off once they are mostly occupied. A straight line has no saturation plateau, so it cannot describe enzyme kinetics over a wide concentration range.</p>'
    + '<p><strong>D. Horizontal line at all substrate concentrations:</strong> A horizontal line would make the rate independent of substrate concentration even at very low concentrations, which cannot be right: with almost no substrate present, there is almost nothing for the enzyme to convert. A constant rate is approached only at saturating substrate concentrations.</p>'
    + '<h4>Key Educational Points:</h4><ul>'
    + '<li>Positive cooperativity means binding at one subunit raises the affinity of the others, so the enzyme needs more than one binding site to show it.</li>'
    + '<li>The result is a sigmoidal rate curve: slow at low substrate, steep in the middle, flattening toward saturation.</li>'
    + '<li>That shape makes the enzyme switch-like, so a small change in substrate concentration near the steep part produces a large change in rate.</li>'
    + '<li>A non-cooperative enzyme gives the hyperbolic Michaelis-Menten curve instead. Having several subunits does not by itself rule this out.</li>'
    + '<li>Allosteric regulation (binding away from the active site) and cooperativity (one binding event favouring another) are related but separate ideas.</li>'
    + '<li>Phosphofructokinase-1, the rate-limiting enzyme of glycolysis, is the standard cooperative example.</li>'
    + '</ul><p class=\'exp-key\'>Bottom Line: Positive cooperativity gives a sigmoidal rate curve; a non-cooperative enzyme gives a hyperbolic one. Cooperativity and allosteric regulation are related but not the same thing.</p>',
},

// ============================================================ Q23 bio-620
// SUBSTANTIAL REWRITE. Two historical population totals do not establish a
// constant exponential growth law; the old explanation also confused a
// constant proportional growth rate with an increasing one, and its own
// doubling milestones did not show continually shortening doubling times.
// The item now defines the model it is asking about.
{
  q: 23, id: 'bio-620', expectLetter: 'D',
  stemFull: 'In a simplified model with favorable conditions, a population increases by 3% each year. If that percentage remains constant, which growth pattern results?',
  optionFull: [
    [0, 'Logistic growth that levels off at carrying capacity'],
    [1, 'Regular oscillations in population size'],
    [2, 'Linear growth with the same number added each year'],
    [3, 'Exponential growth with a J-shaped curve'],
  ],
  explanationFull:
    '<h4>Correct Answer: D. Exponential growth with a J-shaped curve</h4>'
    + '<p>A constant percentage is applied to a population that keeps getting larger, so the absolute number of individuals added each year rises even though the percentage never changes. Starting from 1,000: after one year there are 1,030, an increase of 30; after two years about 1,061, an increase of 31; and the yearly increase keeps growing from there. Plotted against time, this gives the J-shaped curve of exponential growth. Note what stays fixed and what does not: in this model the percentage growth rate is constant, and so is the doubling time; it is the number added per year that increases.</p>'
    + '<h4>Why the other choices are wrong:</h4>'
    + '<p><strong>A. Logistic growth that levels off at carrying capacity:</strong> In logistic growth the proportional growth rate falls as the population approaches the carrying capacity of its environment, so the curve flattens into an S shape. This model has no such limit built in: the 3% is stated to remain constant, so nothing in it slows the growth down.</p>'
    + '<p><strong>B. Regular oscillations in population size:</strong> Oscillation requires the population to rise and fall in turn, which happens when growth repeatedly overshoots the available resources and then crashes. A constant positive percentage only ever adds individuals, so the population rises every year.</p>'
    + '<p><strong>C. Linear growth with the same number added each year:</strong> Linear growth adds a fixed number each year, for example 30 individuals every year regardless of the current size. Here the fixed quantity is a percentage, not a number, so the amount added grows with the population. A fixed percentage and a fixed number are the two patterns this question is really contrasting.</p>'
    + '<h4>Key Educational Points:</h4><ul>'
    + '<li>Exponential growth means a constant proportional rate: each year the population is multiplied by the same factor.</li>'
    + '<li>A constant percentage of a growing population is a growing absolute increase, which is what bends the curve upward into a J shape.</li>'
    + '<li>Under this model the doubling time is constant. A shortening doubling time would mean the percentage rate itself was rising.</li>'
    + '<li>Linear growth adds a fixed number per unit time; exponential growth multiplies by a fixed factor.</li>'
    + '<li>Logistic growth is the contrasting model: the proportional rate falls as the population approaches carrying capacity, giving an S-shaped curve.</li>'
    + '</ul><p class=\'exp-key\'>Bottom Line: A constant percentage increase gives exponential, J-shaped growth. Real populations are not obliged to follow it, because their growth rates change over time.</p>',
},

// ============================================================ Q24 bio-141
// Not all recognition sequences are palindromic, and not all cleavage happens
// inside the recognised sequence. Generic central-dogma points replaced.
{
  q: 24, id: 'bio-141', expectLetter: 'B',
  optionFull: [[1, 'Cut DNA at or near specific recognition sequences']],
  explanation: [
    ['<h4>Correct Answer: B) Cut DNA at specific palindromic recognition sequences</h4><p>Restriction endonucleases recognize and cut DNA at specific palindromic sequences (typically 4-8 base pairs). They may produce blunt ends or sticky ends (overhangs), depending on the enzyme. For example, EcoRI recognizes GAATTC and produces 4-nucleotide sticky ends. These enzymes naturally protect bacteria from bacteriophage infection by degrading foreign DNA. DNA ligase, not restriction enzymes, joins DNA fragments together.</p>',
     '<h4>Correct Answer: B) Cut DNA at or near specific recognition sequences</h4><p>Restriction endonucleases recognize short specific sequences in DNA, typically 4 to 8 base pairs long, and cut at or near them. Many of the commonly taught enzymes recognize palindromic sequences, but not all recognition sequences are palindromic, and some enzymes cut outside the sequence they recognize. Depending on the enzyme, the cut leaves blunt ends or sticky ends, which are short single-stranded overhangs. EcoRI, for example, recognizes GAATTC and leaves four-nucleotide sticky ends. Bacteria use these enzymes to degrade incoming foreign DNA. DNA ligase, not a restriction enzyme, joins fragments together.</p><p>A DNA palindrome reads the same in the 5&prime; to 3&prime; direction on each of the two complementary strands. That is not the same as reading the same backwards and forwards along a single strand.</p>'],
    ['Restriction enzymes work only on DNA, cutting it at specific palindromic recognition sequences.</p>',
     'Restriction enzymes work only on DNA, cutting it at or near their specific recognition sequences.</p>'],
    ['<ul><li>The central dogma of molecular biology describes information flow: DNA is transcribed to mRNA, which is translated to protein.</li><li>Eukaryotic gene expression is regulated at multiple levels: chromatin remodeling, transcription, post-transcription (splicing), translation, and post-translation.</li><li>Mutations in DNA can be silent, missense, nonsense, or frameshift - each with different impacts on protein structure and function.</li></ul><p class=\'exp-key\'>Bottom Line: Restriction enzymes cut at palindromic sequences; those producing sticky ends (like EcoRI, BamHI) are especially useful for cloning because sticky ends facilitate complementary base pairing before ligation.</p>',
     '<ul><li>Restriction enzymes cut DNA at or near specific recognition sequences, which is what makes them predictable tools.</li><li>A DNA palindrome reads the same 5&prime; to 3&prime; on both complementary strands. Many recognition sequences are palindromic, but not all of them are.</li><li>DNA ligase does the opposite job: it joins fragments by sealing phosphodiester bonds.</li><li>Cloning works when the insert and the vector have compatible ends, so an enzyme that leaves matching sticky ends is convenient.</li></ul><p class=\'exp-key\'>Bottom Line: Restriction enzymes cut at or near specific recognition sequences; those leaving matching sticky ends, such as EcoRI and BamHI, are especially useful for cloning because the overhangs base-pair with each other before ligation.</p>'],
  ],
},

// ============================================================ Q25 bio-333
// One sentence: mineralised bone is not literally impermeable to diffusion.
{
  q: 25, id: 'bio-333', expectLetter: 'B',
  explanation: [
    ['<li>This network is essential because mineralised bone is impermeable to diffusion; without canaliculi the osteocytes could not be supplied.</li>',
     '<li>The dense mineralised matrix limits direct nutrient exchange. Fluid-filled canaliculi provide routes for diffusion of nutrients and wastes between osteocytes and nearby blood vessels.</li>'],
  ],
},

// ============================================================ Q27 bio-332
// Human platelets are cell fragments, so they should not be grouped
// unqualified with complete cells.
{
  q: 27, id: 'bio-332', expectLetter: 'C',
  explanation: [
    ['<p>Blood is classified as a specialized connective tissue. Its extracellular matrix is the liquid plasma, and its \'cells\' include erythrocytes, leukocytes, and platelets.',
     '<p>Blood is classified as a specialized connective tissue. Its extracellular matrix is the liquid plasma, and its formed elements are red cells, white cells, and platelets, the last of these being cell fragments rather than complete cells.'],
    ['<li>Blood meets that definition: formed elements suspended in plasma, which is its liquid matrix.</li>',
     '<li>Blood meets that definition: formed elements (red cells, white cells and platelets) suspended in plasma, which is its liquid matrix.</li>'],
  ],
},

// ============================================================ Q29 bio-440
// Monera is a historical grouping, and traditional Monera included organisms
// now placed in Archaea, which lack true peptidoglycan.
{
  q: 29, id: 'bio-440', expectLetter: 'C',
  stemFull: 'Using the traditional five-kingdom classification system, a scientist discovers a unicellular organism that lacks a nucleus, has a cell wall made of peptidoglycan, and reproduces by binary fission. In which kingdom should this organism be classified?',
  explanation: [
    ['<p>Organisms lacking a membrane-bound nucleus are classified as prokaryotes. The presence of peptidoglycan in the cell wall and reproduction by binary fission are hallmarks of bacteria, which belong to kingdom Monera in the five-kingdom classification system.</p>',
     '<p>Organisms lacking a membrane-bound nucleus are prokaryotes. Peptidoglycan in the cell wall and reproduction by binary fission are hallmarks of bacteria, and in the traditional five-kingdom system bacteria are placed in kingdom Monera.</p><p>In the three-domain system used today, this organism belongs to Bacteria, and peptidoglycan is what distinguishes it from Archaea.</p>'],
    ['<tr><td><strong>Monera</strong></td><td>Prokaryotic</td><td>Peptidoglycan</td><td>Varied</td></tr>',
     '<tr><td><strong>Monera</strong></td><td>Prokaryotic</td><td>Variable; peptidoglycan in bacteria</td><td>Varied</td></tr>'],
    ['<p class=\'exp-key\'>Bottom Line: Prokaryotic cells (no nucleus, no membrane-bound organelles) with peptidoglycan walls belong to Monera. The five-kingdom system classifies life into Monera, Protista, Fungi, Plantae, and Animalia.</p>',
     '<p class=\'exp-key\'>Bottom Line: In the five-kingdom system, a prokaryotic cell (no nucleus, no membrane-bound organelles) with a peptidoglycan wall is placed in Monera, alongside Protista, Fungi, Plantae and Animalia. Monera is a historical grouping: in the three-domain system this organism is a bacterium, and true peptidoglycan is what separates Bacteria from Archaea.</p>'],
  ],
},

// ============================================================ Q30 bio-591
// Budding is not universal among yeasts, not all mold spores are conidia, and
// Coccidioides forms spherules with endospores rather than a yeast form.
{
  q: 30, id: 'bio-591', expectLetter: 'B',
  optionFull: [[1, 'Yeasts are unicellular and commonly reproduce by budding, whereas molds grow as filamentous hyphae']],
  explanation: [
    ['<h4>Correct Answer: Yeasts reproduce by budding and are unicellular, while molds grow as multicellular filamentous hyphae</h4>',
     '<h4>Correct Answer: Yeasts are unicellular and commonly reproduce by budding, whereas molds grow as filamentous hyphae</h4>'],
    ['<tr><td>Reproduction</td><td>Budding (asexual) primarily</td><td>Spore formation (conidia)</td></tr>',
     '<tr><td>Asexual reproduction</td><td>Commonly budding; some yeasts divide by fission</td><td>Spore formation</td></tr>'],
    ['<li>Dimorphic fungi (Histoplasma, Blastomyces, Coccidioides) switch forms: "mold in the cold, yeast in the heat"</li>',
     '<li>Several medically important thermally dimorphic fungi, such as <em>Histoplasma</em> and <em>Blastomyces</em>, grow as molds in the environment and as yeasts in tissue. The phrase "mold in the cold, yeast in the heat" is a memory aid for those, not a rule that holds for every dimorphic fungus.</li>'],
    ['<p class=\'exp-key\'>Bottom Line: Yeasts = unicellular, budding; Molds = multicellular, filamentous hyphae. Both are eukaryotic with chitin cell walls. Remember: "mold in the cold, yeast in the heat" for dimorphic fungi.</p>',
     '<p class=\'exp-key\'>Bottom Line: Yeasts are unicellular and commonly bud; molds grow as multicellular filamentous hyphae. Both are eukaryotic, with chitin in the cell wall. Growth form, not pathogenicity or wall chemistry, is the distinction being tested.</p>'],
  ],
},

// ============================================================ Q31 bio-86
// Lipid solubility is not a requirement: methylmercury binds strongly to
// proteins in tissues. Three filler distractors, and educational points
// about energy flow rather than about contaminants.
{
  q: 31, id: 'bio-86', expectLetter: 'A',
  explanation: [
    ['<p>Biomagnification occurs when non-biodegradable, lipid-soluble substances (such as DDT, mercury, and PCBs) accumulate in organisms and become increasingly concentrated at each trophic level. Top predators (such as eagles, tuna, and polar bears) may accumulate toxin concentrations millions of times higher than the environmental water concentration.</p>',
     '<p>Biomagnification is an increase in the concentration of a contaminant at successive trophic levels. It happens when consumers retain a contaminant taken in from their food faster than they eliminate it. A predator eats many contaminated prey, so a persistent, poorly eliminated substance can reach high concentrations in top predators such as eagles, tuna, and polar bears. DDT, PCBs and methylmercury are the standard examples. Fat solubility is one common reason a substance is retained rather than excreted, but it is not a requirement: methylmercury binds strongly to proteins in tissues.</p>'],
    ['<p><strong>B. Biodiversity increases with increasing ecosystem complexity:</strong> <em>Biodiversity increases with increasing ecosystem complexity</em> is incorrect for this question. The correct answer is <em>The concentration of persistent pollutants increases at successively higher trophic levels</em>, which specifically matches the definition or concept described in the question stem. Biodiversity increases with increasing ecosystem complexity refers to a different ecological concept.</p>',
     '<p><strong>B. Biodiversity increases with increasing ecosystem complexity:</strong> Biodiversity concerns the number and variety of species living in an ecosystem. It says nothing about the concentration of a contaminant inside those organisms, which is what biomagnification describes.</p>'],
    ['<p><strong>C. Organisms at lower trophic levels accumulate more toxins than those at higher levels:</strong> <em>Organisms at lower trophic levels accumulate more toxins than those at higher levels</em> is incorrect for this question. The correct answer is <em>The concentration of persistent pollutants increases at successively higher trophic levels</em>, which specifically matches the definition or concept described in the question stem. Organisms at lower trophic levels accumulate more toxins than those at higher levels refers to a different ecological concept.</p>',
     '<p><strong>C. Organisms at lower trophic levels accumulate more toxins than those at higher levels:</strong> This reverses the expected pattern. Concentrations are generally lowest near the bottom of the food chain and highest in top predators, because each consumer takes in what its prey had already accumulated.</p>'],
    ['<p><strong>D. Nutrient concentrations decrease as water flows downstream:</strong> <em>Nutrient concentrations decrease as water flows downstream</em> is incorrect for this question. The correct answer is <em>The concentration of persistent pollutants increases at successively higher trophic levels</em>, which specifically matches the definition or concept described in the question stem. Nutrient concentrations decrease as water flows downstream refers to a different ecological concept.</p>',
     '<p><strong>D. Nutrient concentrations decrease as water flows downstream:</strong> A change in concentration along a watercourse is a pattern in space. Biomagnification is a pattern across trophic levels, which is about transfer from food to consumer rather than about location.</p>'],
    ['<ul><li>Energy flows one way through ecosystems (sun to producers to consumers to decomposers), while matter (nutrients) cycles through biogeochemical pathways.</li><li>Only about 10% of energy is transferred between trophic levels - the rest is lost as heat through cellular respiration.</li><li>Biodiversity increases ecosystem stability and resilience; keystone species have disproportionately large effects on community structure.</li></ul><p class=\'exp-key\'>Bottom Line: Biomagnification requires two properties of the pollutant: persistence (resistance to degradation) and lipophilicity (accumulation in fatty tissues rather than excretion).</p>',
     '<ul><li>Bioaccumulation is the build-up of a substance within a single organism over time.</li><li>Biomagnification is the increase in concentration from one trophic level to the next.</li><li>It needs a substance that is persistent and poorly eliminated, so that intake outpaces excretion.</li><li>Fat solubility is one common reason a substance is retained, but not the only one: methylmercury binds to proteins in tissues.</li><li>DDT, PCBs and methylmercury are the standard examples, and top predators carry the highest concentrations.</li></ul><p class=\'exp-key\'>Bottom Line: Biomagnification needs a contaminant that is persistent and poorly eliminated, so each consumer retains more than it excretes. Storage in fat is one route to that; methylmercury shows that binding to proteins is another.</p>'],
  ],
},

// ============================================================ Q32 bio-441
// "A proper control group receives no treatment" is not a universal rule.
{
  q: 32, id: 'bio-441', expectLetter: 'B',
  explanation: [
    ['Controlled variables = everything kept the same. A proper control group receives no treatment to serve as a baseline.</p>',
     'Controlled variables = everything kept the same. In this experiment, a no-fertilizer control group provides a useful baseline.</p>'],
  ],
},

];
