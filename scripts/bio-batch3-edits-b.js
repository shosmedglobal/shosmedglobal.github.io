/**
 * Batch 3 review, part B: displayed Q13-Q24 (bio-74 .. bio-87).
 * Covers the end of the virology block and the start of the ecology block,
 * including the placeholder distractor feedback the review flags for Q21-Q24.
 */
'use strict';

// The generic block reused verbatim across the virology items (Q12-Q20). The
// review notes it also contains errors: lytic/lysogenic are presented as
// universal viral alternatives, and lysogeny as merely delayed lysis.
const GENERIC_VIRO =
  '<ul><li>Viruses are obligate intracellular parasites consisting of nucleic acid (DNA or RNA) enclosed in a protein coat (capsid); they cannot reproduce independently.</li>'
  + '<li>Viral replication strategies vary: lytic cycle (immediate reproduction and cell lysis) vs. lysogenic cycle (genome integration as prophage with delayed lysis).</li>'
  + '<li>Retroviruses (like HIV) use reverse transcriptase to convert their RNA genome into DNA, which integrates into the host chromosome as a provirus.</li></ul>';

// The generic block reused verbatim across the ecology items (Q21-Q31). It
// also contains the error that all untransferred energy is lost as heat.
const GENERIC_ECOL =
  '<ul><li>Energy flows one way through ecosystems (sun to producers to consumers to decomposers), while matter (nutrients) cycles through biogeochemical pathways.</li>'
  + '<li>Only about 10% of energy is transferred between trophic levels - the rest is lost as heat through cellular respiration.</li>'
  + '<li>Biodiversity increases ecosystem stability and resilience; keystone species have disproportionately large effects on community structure.</li></ul>';

const points = items => '<ul>' + items.map(t => '<li>' + t + '</li>').join('') + '</ul>';

module.exports = [

// ============================================================ Q13 bio-74
// Scope the item to a named example, and replace the universal claim that
// host cells have no RNA-dependent RNA polymerase activity at all.
{
  q: 13, id: 'bio-74', expectLetter: 'D',
  stemFull: 'Influenza virus has a negative-sense single-stranded RNA genome. Which enzyme must its virion carry to make viral mRNA after entering a human cell?',
  explanation: [
    ['<p>Negative-sense ssRNA viruses (such as influenza, Ebola, and rabies) carry their genome in the antisense orientation, meaning it cannot be directly translated by host ribosomes. They must package RNA-dependent RNA polymerase within the virion to first synthesize a positive-sense mRNA strand upon entry into the host cell. Without this enzyme, the infection cycle cannot begin.</p>',
     '<p>A negative-sense RNA genome is complementary to mRNA, so ribosomes cannot read it directly. It must first be copied into positive-sense mRNA. The virus therefore has to bring an RNA-dependent RNA polymerase (RdRp) inside the particle, because the human cell does not supply the polymerase this step needs. Until that first mRNA is made, no viral protein can be produced, so the infection could not get started. Influenza, Ebola and rabies viruses all work this way.</p>'],
    ['They specifically need RNA-dependent RNA polymerase (RdRp), which uses RNA as a template to make RNA - an activity not found in normal host cells, making RdRp an excellent antiviral drug target.</p>',
     'They need RNA-dependent RNA polymerase, which uses RNA as a template to make RNA. Human cells do not supply the viral polymerase required here, which is also why RdRp is an attractive antiviral drug target.</p>'],
    [GENERIC_VIRO, points([
      'A negative-sense RNA genome is complementary to mRNA, so it cannot be translated directly; it must be copied into positive-sense mRNA first.',
      'The virion therefore carries its own RNA-dependent RNA polymerase, because the human cell does not supply the polymerase this step needs.',
      'A positive-sense RNA virus does not have this problem: its genome can be read as mRNA as soon as it enters the cell.',
    ])],
    ['<p class=\'exp-key\'>Bottom Line: Negative-sense RNA viruses must carry their own RdRp because host cells do not possess RNA-dependent RNA polymerase.</p>',
     '<p class=\'exp-key\'>Bottom Line: A negative-sense RNA virus must carry its own RNA-dependent RNA polymerase, because the human cell does not supply the polymerase needed to make the first viral mRNA.</p>'],
  ],
},

// ============================================================ Q14 bio-76
// "Prions are exclusively associated with mammals" is false (prion phenomena
// are established in yeast), and "challenge the central dogma" overstates it.
{
  q: 14, id: 'bio-76', expectLetter: 'D',
  explanation: [
    ['<p><strong>C. Require a bacterial host for replication:</strong> Prions do not infect bacteria. They are exclusively associated with mammals (and possibly other animals), causing progressive neurodegenerative diseases. Prions "replicate" by converting normal host prion protein (PrPᶜ) into the misfolded pathogenic form (PrPˢᶜ) through direct protein-protein interaction - no cellular machinery for DNA or RNA replication is involved.</p>',
     '<p><strong>C. Require a bacterial host for replication:</strong> A requirement for a bacterial host describes bacteriophages, not the defining mechanism of a prion. Prions propagate by promoting a compatible protein&rsquo;s misfolded conformation, through direct protein-protein interaction, with no machinery for DNA or RNA replication involved. In humans the example is PrP-associated disease, although prion phenomena are not confined to mammals.</p>'],
    ['<p class=\'exp-key\'>Bottom Line: Prions challenge the central dogma by demonstrating that an infectious agent can propagate without nucleic acid, using only protein conformational change.</p>',
     '<p class=\'exp-key\'>Bottom Line: Prions propagate through templated protein misfolding without a nucleic-acid genome.</p>'],
    [GENERIC_VIRO, points([
      'A virus is a nucleic-acid genome inside a protein capsid.',
      'A viroid is an infectious RNA molecule with no capsid at all.',
      'A prion is an infectious protein conformation with no nucleic acid. It propagates by promoting a compatible protein to adopt the misfolded shape.',
      'Conformational propagation copies a shape, not a sequence: it does not send amino-acid sequence information back into DNA or RNA.',
    ])],
  ],
},

// ============================================================ Q15 bio-77
// Direct scientific error: the feedback for A said DNA is translated during
// the lytic cycle. Also scope to lambda, and stop teaching that every phage
// gene is silent during lysogeny.
{
  q: 15, id: 'bio-77', expectLetter: 'C',
  stemFull: 'During lysogeny of bacteriophage lambda in <em>E. coli</em>, the phage DNA is:',
  explanation: [
    ['<p>In the lysogenic cycle, the phage DNA integrates into the host bacterial chromosome using integrase enzyme, becoming a prophage. The prophage is replicated along with the bacterial DNA during cell division. It remains dormant until environmental stressors (such as UV radiation) trigger the switch to the lytic cycle, where the phage DNA excises and directs production of new viral particles.</p>',
     '<p>In lambda lysogeny the phage DNA integrates into the host chromosome using an integrase, becoming a prophage, and is then copied along with the bacterial DNA each time the cell divides. The genes that drive lytic reproduction are repressed, but not every phage gene is silent: keeping the prophage in this state requires the phage repressor to be expressed, and lysogenic conversion genes can be expressed too.</p>'
     + '<p>Suitable signals, such as DNA damage from UV radiation, can induce the prophage to excise and enter the lytic cycle, where new particles are made and the cell is eventually lysed. Induction is a possibility rather than an inevitable fate for every lysogenic cell. Integration is how lambda maintains its genome; not all temperate phages keep their genomes this way.</p>'],
    ['<p><strong>A. Translated directly into viral coat proteins:</strong> Direct translation of viral DNA into coat proteins would occur in the <em>lytic</em> cycle, where the phage immediately hijacks host cell machinery to produce viral components. In the lysogenic cycle, the viral DNA instead integrates silently into the host chromosome as a prophage and is replicated passively with the bacterial genome. Viral gene expression is repressed by a phage-encoded repressor protein.</p>',
     '<p><strong>A. Translated directly into viral coat proteins:</strong> DNA is never translated directly, in any cycle. DNA is transcribed into mRNA, and ribosomes translate the mRNA. In the lytic cycle the phage does get its coat proteins made, but the route still runs DNA to RNA to protein. In lysogeny the genes for lytic reproduction are repressed, so those coat proteins are not being made at all.</p>'],
    ['<p class=\'exp-key\'>Bottom Line: Lysogeny allows the phage genome to persist silently in the host. The prophage can confer new properties to the bacterium (lysogenic conversion), such as toxin production.</p>',
     '<p class=\'exp-key\'>Bottom Line: In lambda lysogeny the phage genome persists as an integrated prophage, copied with the host chromosome, with its lytic genes repressed. Some phage genes stay expressed, which is how lysogenic conversion can give the bacterium new properties such as toxin production.</p>'],
    [GENERIC_VIRO, points([
      'Integrated lambda DNA is copied along with the host chromosome every time the cell divides, so the prophage spreads without killing anything.',
      'The host cell stays alive. Lytic genes are repressed, but the repressor that keeps them off must itself be expressed.',
      'Induction, often after DNA damage, lets the prophage excise, replicate and assemble new phages before the cell lyses.',
    ])],
  ],
},

// ============================================================ Q16 bio-78
// Release is not the same as budding, and not all clinically used influenza
// drugs target neuraminidase.
{
  q: 16, id: 'bio-78', expectLetter: 'C',
  explanation: [
    ['<p>Neuraminidase inhibitors block the neuraminidase enzyme on the surface of influenza virions. Neuraminidase cleaves sialic acid residues that tether newly budded virions to the host cell surface. By inhibiting this enzyme, oseltamivir (Tamiflu) and zanamivir prevent the release of new viral particles, limiting spread of infection to neighboring cells.</p>',
     '<p>Neuraminidase sits on the surface of the influenza virion and cleaves the sialic-acid attachments that hold newly formed particles to the host cell surface and to each other. Inhibiting it leaves those particles tethered, so they detach and spread poorly, which limits infection of neighbouring cells. Note what this does and does not block: assembly and budding at the membrane still occur, and what is restricted is the release and onward spread of the particles.</p>'],
    ['<p><strong>B. Fusion inhibitors:</strong> Fusion inhibitors (like enfuvirtide for HIV) block the fusion of the viral envelope with the host cell membrane, preventing viral entry. While entry inhibitors exist for influenza research, the clinically used drugs for influenza virus release are neuraminidase inhibitors (oseltamivir/Tamiflu, zanamivir). Neuraminidase cleaves sialic acid residues, allowing new virions to detach from the host cell surface.</p>',
     '<p><strong>B. Fusion inhibitors:</strong> Fusion inhibitors block fusion of the viral envelope with the host cell membrane, so they act at entry, before the cell is infected at all. The question asks about the step at which newly formed virions leave an already infected cell, which is where neuraminidase acts.</p>'],
    ['<p><strong>D. Protease inhibitors:</strong> Protease inhibitors (like ritonavir, darunavir) are primarily used against HIV, where viral protease cleaves polyprotein precursors into functional proteins. While influenza does have a protease-dependent step (hemagglutinin cleavage), clinically used anti-influenza drugs target neuraminidase. Neuraminidase inhibitors prevent the release (budding) of new viral particles from infected cells, limiting viral spread.</p>',
     '<p><strong>D. Protease inhibitors:</strong> Protease inhibitors are best known against HIV, where viral protease cuts polyprotein precursors into functional proteins. Influenza does have a protease-dependent step, the cleavage of hemagglutinin, but that is not the release step this question describes.</p>'],
    [GENERIC_VIRO, points([
      'Hemagglutinin helps the virus attach to sialic acid on a host cell; neuraminidase cleaves those same attachments so new particles can detach.',
      'Blocking neuraminidase limits release and spread to neighbouring cells. It does not stop the virus assembling or budding.',
      'Antiviral drugs can act at different stages of a viral cycle: entry, genome replication, protein processing, or release.',
    ])],
  ],
},

// ============================================================ Q17 bio-79
// Reverse transcriptase is not unique to retroviruses across all viruses, the
// two packaged RNA copies need not be identical, and reverse transcription
// does not invalidate the central dogma.
{
  q: 17, id: 'bio-79', expectLetter: 'D',
  explanation: [
    ['<p>Retroviruses (family Retroviridae, including HIV) are unique in possessing reverse transcriptase, which converts their single-stranded RNA genome into double-stranded DNA. This DNA intermediate (provirus) is then integrated into the host cell genome by integrase. This reverse flow of genetic information (RNA → DNA) is the defining feature of retroviruses.</p>',
     '<p>Retroviruses such as HIV carry reverse transcriptase, which copies their single-stranded RNA genome into double-stranded viral DNA. Integrase then inserts that DNA into a host chromosome, and once integrated it is called a provirus. Among the RNA virus families, this DNA intermediate is what sets retroviruses apart. Reverse transcription is an established route of information transfer, not a reversal that invalidates the central dogma.</p>'],
    ['Retroviruses have a <em>diploid</em> genome (two identical copies of single-stranded positive-sense RNA), but it is not segmented.',
     'Retroviruses package two copies of a positive-sense single-stranded RNA genome, which need not be identical to each other, but the genome is not segmented.'],
    [GENERIC_VIRO, points([
      'Reverse transcriptase copies RNA into DNA; integrase inserts that DNA into a host chromosome, where it is called a provirus.',
      'The host then transcribes the provirus much like one of its own genes, producing new viral RNA.',
      'Among RNA viruses, that DNA intermediate is the distinguishing feature. Replicating in the nucleus and having an envelope are shared with other virus families, so neither identifies a retrovirus.',
    ])],
    ['<p class=\'exp-key\'>Bottom Line: The retrovirus life cycle follows the path: ssRNA → dsDNA (by reverse transcriptase) → integration into host genome (by integrase) → transcription of new viral RNA.</p>',
     '<p class=\'exp-key\'>Bottom Line: The retrovirus life cycle runs ssRNA → double-stranded viral DNA (reverse transcriptase) → integration as a provirus (integrase) → transcription of new viral RNA by the host.</p>'],
  ],
},

// ============================================================ Q18 bio-80
// Bacteriophages are not universally non-enveloped (enveloped phages exist),
// and Myoviridae was abolished as a taxonomic family.
{
  q: 18, id: 'bio-80', expectLetter: 'A',
  stemFull: 'Which of the following best describes the structure of bacteriophage T4?',
  explanation: [
    ['<p><strong>B. A spherical enveloped virus with surface glycoproteins:</strong> This description fits many animal viruses like influenza, HIV, or coronaviruses, which acquire a lipid envelope from host cell membranes during budding. Bacteriophage T4, however, is a non-enveloped virus with a distinctive complex structure: an icosahedral head, a contractile tail sheath, a baseplate, and tail fibers. Phages do not acquire envelopes because bacteria lack the membrane systems used for viral budding.</p>',
     '<p><strong>B. A spherical enveloped virus with surface glycoproteins:</strong> This description fits many animal viruses, such as influenza, HIV or coronaviruses, which take a lipid envelope from host membranes as they bud. T4 itself is non-enveloped, with an icosahedral head, a contractile tail sheath, a baseplate and tail fibers. Note that bacteriophages as a group are not all non-enveloped: enveloped phages do exist. What rules this option out is T4&rsquo;s actual architecture.</p>'],
    ['T4\'s complex morphology with head, tail, baseplate, and fibers is characteristic of the Myoviridae family of bacteriophages.</p>',
     'T4&rsquo;s complex morphology, with head, tail, baseplate and fibers, is typical of the contractile-tailed phages.</p>'],
    [GENERIC_VIRO, points([
      'T4 has an icosahedral head holding its double-stranded DNA genome, a contractile tail, a baseplate and tail fibers.',
      'The tail fibers recognize receptors on the bacterial surface, and the tail sheath then contracts to deliver the genome into the cell.',
      'Only the genome enters the bacterium; the rest of the particle stays outside.',
    ])],
  ],
},

// ============================================================ Q19 bio-81
// "Class III (dsRNA)" gave the answer away inside the option, and class I
// viruses do not all replicate in the nucleus (poxviruses are the exception).
{
  q: 19, id: 'bio-81', expectLetter: 'B',
  optionFull: [[0, 'Class IV'], [1, 'Class III'], [2, 'Class I'], [3, 'Class V']],
  headingsGone: ['A. Class IV (+ssRNA):', 'C. Class I (dsDNA):', 'D. Class V (−ssRNA):'],
  explanation: [
    ['<h4>Correct Answer: B) Class III (dsRNA)</h4>', '<h4>Correct Answer: B) Class III</h4>'],
    ['<table class=\'exp-table\'><tr><th>Class</th><th>Genome</th><th>Example</th></tr>',
     '<table class=\'exp-table\'><caption>Selected Baltimore groups</caption><tr><th>Class</th><th>Genome</th><th>Example</th></tr>'],
    ['<p><strong>A. Class IV (+ssRNA):</strong> Class IV viruses have positive-sense single-stranded RNA (+ssRNA) genomes,',
     '<p><strong>A. Class IV:</strong> Class IV viruses have positive-sense single-stranded RNA (+ssRNA) genomes,'],
    ['<p><strong>C. Class I (dsDNA):</strong> Class I viruses have double-stranded DNA (dsDNA) genomes, similar to host cell DNA. They replicate in the nucleus using host or viral DNA polymerases. Examples include herpesviruses, adenoviruses, and poxviruses. The question specifies an RNA genome, so this class does not apply.</p>',
     '<p><strong>C. Class I:</strong> Class I viruses have double-stranded DNA genomes. Examples include herpesviruses, adenoviruses and poxviruses. Note that they do not all replicate in the nucleus: poxviruses replicate in the cytoplasm. What separates the Baltimore classes is genome type and the route to mRNA, not where replication happens. The question specifies an RNA genome, so this class does not apply.</p>'],
    ['<p><strong>D. Class V (−ssRNA):</strong> Class V viruses have negative-sense single-stranded RNA (−ssRNA) genomes,',
     '<p><strong>D. Class V:</strong> Class V viruses have negative-sense single-stranded RNA (−ssRNA) genomes,'],
    [GENERIC_VIRO, points([
      'The Baltimore classification groups viruses by genome type and by the route each takes to producing mRNA.',
      'Class III is double-stranded RNA. A viral RNA-dependent RNA polymerase, carried in the particle, makes mRNA from that genome.',
      'Read the genome description in the stem carefully: double-stranded or single-stranded, RNA or DNA, and for single-stranded RNA whether it is positive or negative sense.',
    ])],
  ],
},

// ============================================================ Q20 bio-82
// Keep "viral DNA" before integration and "provirus" after, and keep the
// protease description consistent with the rewritten Q12.
{
  q: 20, id: 'bio-82', expectLetter: 'B',
  explanation: [
    ['<p>After reverse transcriptase converts the HIV RNA genome into double-stranded DNA, integrase catalyzes the insertion of this proviral DNA into the host cell\'s chromosomal DNA. The integrated provirus can then be transcribed by host RNA polymerase II to produce viral mRNA and new genomic RNA. Integrase inhibitors (e.g., raltegravir, dolutegravir) are an important class of antiretroviral drugs.</p>',
     '<p>Reverse transcriptase first copies the HIV RNA genome into double-stranded viral DNA. Integrase then catalyses the insertion of that DNA into the host cell&rsquo;s chromosome, and once it is integrated it is called a provirus. The host&rsquo;s own RNA polymerase II can then transcribe it, producing viral mRNA and new genomic RNA. Because the provirus sits inside the host chromosome, the infection persists for the life of the cell.</p>'],
    ['<p><strong>A. Protease:</strong> Protease is an HIV enzyme that cleaves the large polyprotein precursors (gag and gag-pol) into individual functional proteins needed to assemble new viral particles. HIV protease inhibitors (e.g., ritonavir, lopinavir) are a major drug class in antiretroviral therapy. Protease acts late in the viral life cycle during virion maturation, not during DNA integration.</p>',
     '<p><strong>A. Protease:</strong> Protease cuts the large polyprotein precursors into individual functional proteins. It acts late, at maturation: an immature particle can be assembled without it, but it does not become infectious. That is a different step from inserting DNA into the chromosome.</p>'],
    ['<p><strong>C. Reverse transcriptase:</strong> Reverse transcriptase is the HIV enzyme that converts the viral single-stranded RNA genome into double-stranded DNA (the provirus). This is an essential step that occurs before integration, but the actual insertion of DNA into the host chromosome is performed by integrase. Reverse transcriptase inhibitors (NRTIs and NNRTIs) are key antiretroviral drugs.</p>',
     '<p><strong>C. Reverse transcriptase:</strong> Reverse transcriptase converts the viral single-stranded RNA genome into double-stranded viral DNA. That DNA is only called a provirus once integrase has inserted it into the host chromosome. Reverse transcription is an essential step before integration, but it is not the insertion itself.</p>'],
    [GENERIC_VIRO, points([
      'Reverse transcriptase makes DNA from the RNA genome, integrase inserts that DNA into a host chromosome, and protease processes polyproteins at maturation.',
      'The integrated DNA is the provirus. Before integration it is simply viral DNA.',
      'Once integrated, the host&rsquo;s own RNA polymerase transcribes it, which is why the infection persists in that cell.',
    ])],
  ],
},

// ============================================================ Q21 bio-83
// The 10% rule is an approximation, the other 90% is not all heat, pyramids
// of biomass and numbers can be inverted, and A and B had no feedback at all.
{
  q: 21, id: 'bio-83', expectLetter: 'D',
  explanation: [
    ['<p>The 10% rule states that approximately only 10% of the energy at one trophic level is transferred to the next level. The remaining 90% is lost as heat through cellular respiration, used for metabolic processes, or excreted as waste. This explains why food chains rarely exceed 4-5 trophic levels and why there is always less biomass at higher trophic levels.</p>',
     '<p>The 10% rule is a useful approximation: roughly a tenth of the energy at one trophic level ends up in the next. It is a rule of thumb rather than a fixed efficiency for every ecosystem. The remaining ninety per cent or so is not all lost immediately as heat. Some is dissipated through respiration, and some stays in uneaten biomass and in waste, which can enter detrital food chains. Because so little passes on at each step, food chains rarely exceed four or five trophic levels. As a worked example, 10,000 units of energy in the producers would support roughly 1,000 units at the primary consumers and about 100 at the level above.</p>'],
    ['<h4>Why the other choices are wrong:</h4><p><strong>C. 90%:</strong> The remaining 90% is lost as heat through cellular respiration, used for metabolic processes, or excreted as waste.</p>',
     '<h4>Why the other choices are wrong:</h4>'
     + '<p><strong>A. 1%:</strong> One per cent is lower than the conventional rule of thumb. Measured transfer efficiencies do vary between ecosystems and some are low, but the figure taught as the general approximation is about ten per cent.</p>'
     + '<p><strong>B. 50%:</strong> Fifty per cent is far higher than the conventional approximation. If half the energy passed on at every step, food chains could be much longer than the four or five levels usually observed.</p>'
     + '<p><strong>C. 90%:</strong> Ninety per cent is approximately the fraction that does NOT pass to the next consumer level, so it is the complement of what the question asks for. Some of it is dissipated through respiration, and some remains in uneaten biomass and waste.</p>'],
    [GENERIC_ECOL, points([
      'Energy flows through an ecosystem and is not recycled, whereas nutrients cycle.',
      'Roughly ten per cent passes from one trophic level to the next. This is an approximation, and real efficiencies vary between ecosystems.',
      'The rest is not simply heat: respiration dissipates some of it, and uneaten biomass and waste carry some into detrital food chains.',
      'A worked example: about 10,000 units in producers, 1,000 in primary consumers, 100 in secondary consumers.',
    ])],
    ['<p class=\'exp-key\'>Bottom Line: The 10% energy transfer rule explains why ecosystems support fewer organisms at higher trophic levels and why energy pyramids are always upright.</p>',
     '<p class=\'exp-key\'>Bottom Line: The 10% rule is an approximation, and it explains why food chains are short. Pyramids of energy are upright, but pyramids of standing biomass or of numbers can be inverted, so do not assume every higher level must hold less biomass or fewer organisms.</p>'],
  ],
},

// ============================================================ Q22 bio-84
// Placeholder distractor feedback, and an unsupported "slowest cycle" ranking.
{
  q: 22, id: 'bio-84', expectLetter: 'D',
  explanation: [
    ['It is released from rocks through weathering, absorbed by plants as phosphate (PO₄³⁻), and cycles through food webs.',
     'It is released from rocks by weathering, taken up by plants as dissolved phosphate, and passed along food webs.'],
    ['<p><strong>A. Carbon cycle:</strong> <em>Carbon cycle</em> is incorrect for this question. The correct answer is <em>Phosphorus cycle</em>, which specifically matches the definition or concept described in the question stem. Carbon cycle refers to a different ecological concept.</p>',
     '<p><strong>A. Carbon cycle:</strong> The carbon cycle has a large atmospheric reservoir. Carbon dioxide moves between the air, organisms and the oceans through photosynthesis, respiration and dissolution, so it certainly has a significant gaseous phase.</p>'],
    ['<p><strong>B. Nitrogen cycle:</strong> <em>Nitrogen cycle</em> is incorrect for this question. The correct answer is <em>Phosphorus cycle</em>, which specifically matches the definition or concept described in the question stem. Nitrogen cycle refers to a different ecological concept.</p>',
     '<p><strong>B. Nitrogen cycle:</strong> The nitrogen cycle has an even larger atmospheric reservoir: N₂ makes up about 78% of the atmosphere. Nitrogen fixation converts that gas into forms organisms can use, and denitrification returns nitrogen to the air.</p>'],
    ['<p><strong>C. Water cycle:</strong> <em>Water cycle</em> is incorrect for this question. The correct answer is <em>Phosphorus cycle</em>, which specifically matches the definition or concept described in the question stem. Water cycle refers to a different ecological concept.</p>',
     '<p><strong>C. Water cycle:</strong> The water cycle moves water through the atmosphere continuously as water vapour, in evaporation, condensation and precipitation. Its gaseous phase is central to how the cycle works.</p>'],
    [GENERIC_ECOL, points([
      'Phosphorus has no significant gaseous phase; its major reservoirs are rocks and sediments.',
      'Weathering releases phosphate from rock, plants take up dissolved phosphate, food webs pass it along, and sedimentation eventually returns it to rock.',
      'Carbon, nitrogen and water all have large atmospheric reservoirs, which is what makes the phosphorus cycle the odd one out here.',
    ])],
    ['<p class=\'exp-key\'>Bottom Line: The phosphorus cycle is a sedimentary cycle (rock → soil → water → organisms → sediment), making it the slowest of the major nutrient cycles.</p>',
     '<p class=\'exp-key\'>Bottom Line: The phosphorus cycle is a sedimentary cycle: rock → soil → water → organisms → sediment. Its major reservoirs are rocks and sediments, and weathering is what releases phosphate into the living part of the cycle.</p>'],
  ],
},

// ============================================================ Q23 bio-85
// "Secondary producer" overlaps the correct answer rather than contrasting
// with it, and the feeding mechanism was not stated in the stem.
{
  q: 23, id: 'bio-85', expectLetter: 'B',
  stemFull: 'An organism secretes digestive enzymes onto dead organic matter and absorbs the breakdown products, helping return nutrients to the environment. It is a:',
  optionFull: [[2, 'Primary producer (autotroph)']],
  headingsGone: ['C. Secondary producer:'],
  explanation: [
    ['<p><strong>A. Tertiary consumer:</strong> <em>Tertiary consumer</em> is incorrect for this question. The correct answer is <em>Decomposer (saprotroph)</em>, which specifically matches the definition or concept described in the question stem. Tertiary consumer refers to a different ecological concept.</p>',
     '<p><strong>A. Tertiary consumer:</strong> A tertiary consumer feeds at a higher consumer level, eating other consumers. Like all consumers it ingests its food and digests it internally, rather than digesting externally and absorbing the products as the organism in the stem does.</p>'],
    ['<p><strong>C. Secondary producer:</strong> <em>Secondary producer</em> is incorrect for this question. The correct answer is <em>Decomposer (saprotroph)</em>, which specifically matches the definition or concept described in the question stem. Secondary producer refers to a different ecological concept.</p>',
     '<p><strong>C. Primary producer (autotroph):</strong> A primary producer makes its own organic matter from inorganic sources, typically by photosynthesis. It does not feed on dead organic matter at all, so it is the opposite end of the process described here.</p>'],
    ['<p><strong>D. Primary consumer:</strong> <em>Primary consumer</em> is incorrect for this question. The correct answer is <em>Decomposer (saprotroph)</em>, which specifically matches the definition or concept described in the question stem. Primary consumer refers to a different ecological concept.</p>',
     '<p><strong>D. Primary consumer:</strong> A primary consumer eats producers. Again it ingests its food, whereas the organism described secretes enzymes onto its food and absorbs what is released.</p>'],
    [GENERIC_ECOL, points([
      'A saprotroph digests outside its body: it secretes enzymes onto dead material and absorbs the soluble products. Fungi and many bacteria feed this way.',
      'A detritivore, such as an earthworm, instead ingests detritus and digests it internally. Both help break down dead matter, but by different routes.',
      'Decomposition recycles nutrients back to producers. Energy does not cycle back in the same way: it is ultimately dissipated.',
    ])],
  ],
},

// ============================================================ Q24 bio-87
// Placeholder distractor feedback, and a Bottom Line that made preventing
// competitive exclusion the definition.
{
  q: 24, id: 'bio-87', expectLetter: 'B',
  explanation: [
    ['<p><strong>A. Is the primary producer that supports all other organisms:</strong> <em>Is the primary producer that supports all other organisms</em> is incorrect for this question. The correct answer is <em>Has a disproportionately large effect on community structure relative to its abundance</em>, which specifically matches the definition or concept described in the question stem. Is the primary producer that supports all other organisms refers to a different ecological concept.</p>',
     '<p><strong>A. Is the primary producer that supports all other organisms:</strong> Being a primary producer is a trophic role, not the definition of a keystone species. A primary producer can also be a keystone species, but what makes it one is the size of its effect relative to its abundance, not the fact that it photosynthesizes.</p>'],
    ['<p><strong>C. Has the largest population in the ecosystem:</strong> <em>Has the largest population in the ecosystem</em> is incorrect for this question. The correct answer is <em>Has a disproportionately large effect on community structure relative to its abundance</em>, which specifically matches the definition or concept described in the question stem. Has the largest population in the ecosystem refers to a different ecological concept.</p>',
     '<p><strong>C. Has the largest population in the ecosystem:</strong> This is close to the opposite of the idea. A keystone species has an effect out of proportion to how abundant it is, so it is frequently not abundant at all. High abundance on its own does not make a species keystone.</p>'],
    ['<p><strong>D. Is always the top predator in the food web:</strong> <em>Is always the top predator in the food web</em> is incorrect for this question. The correct answer is <em>Has a disproportionately large effect on community structure relative to its abundance</em>, which specifically matches the definition or concept described in the question stem. Is always the top predator in the food web refers to a different ecological concept.</p>',
     '<p><strong>D. Is always the top predator in the food web:</strong> Keystone species need not be predators. The sea star in the classic example is one, but other keystone species act by engineering habitat or by supplying a resource that many other species depend on.</p>'],
    [GENERIC_ECOL, points([
      'The defining feature is the size of a species&rsquo; effect relative to its abundance, not which trophic level it occupies.',
      'Removing a keystone species can change community structure sharply and reduce diversity.',
      'Different keystone species act in different ways: through predation, through engineering habitat, or by providing a resource others rely on.',
    ])],
    ['<p class=\'exp-key\'>Bottom Line: Keystone species maintain biodiversity by preventing competitive exclusion; their loss causes cascading effects through the entire community.</p>',
     '<p class=\'exp-key\'>Bottom Line: A keystone species has an effect on its community out of proportion to its abundance, and removing it can change that community dramatically. Preventing competitive exclusion is one mechanism among several, not the definition.</p>'],
  ],
},

];
