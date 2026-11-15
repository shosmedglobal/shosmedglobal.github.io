/**
 * Review batch 6, displayed Q1-Q12 (bio-257 .. bio-272).
 * Q11 (bio-271, lac operon) is absent by design: the review says KEEP UNCHANGED.
 */
'use strict';

const points = items => items.map(t => '<li>' + t + '</li>').join('');

// The generic block shared by Q2 and Q3.
const GENERIC_PHOTO =
  '<li>Photosynthesis converts light energy to chemical energy in two stages: light reactions (thylakoid membranes) produce ATP and NADPH, and the Calvin cycle (stroma) fixes CO2 into sugar.</li>' +
  '<li>The light reactions involve two photosystems: PSII (splits water, releases O2) and PSI (reduces NADP+ to NADPH).</li>' +
  '<li>C3, C4, and CAM plants have different strategies for carbon fixation adapted to their environments, balancing photosynthesis efficiency against water loss.</li>';

// The generic block shared by Q7, Q8, Q9 and Q10.
const GENERIC_MOLBIO =
  '<li>The central dogma of molecular biology describes information flow: DNA is transcribed to mRNA, which is translated to protein.</li>' +
  '<li>Eukaryotic gene expression is regulated at multiple levels: chromatin remodeling, transcription, post-transcription (splicing), translation, and post-translation.</li>' +
  '<li>Mutations in DNA can be silent, missense, nonsense, or frameshift - each with different impacts on protein structure and function.</li>';

module.exports = [

{
  q: 1, id: 'bio-257', expectLetter: 'C',
  stemFull: 'Which feature of phospholipids increases membrane fluidity by preventing their fatty acid tails from packing tightly together?',
  explanation: [
    [`Unsaturated fatty acids have one or more double bonds that create kinks in their hydrocarbon tails, preventing tight packing and increasing membrane fluidity. Cholesterol has a dual role: it reduces fluidity at high temperatures and prevents solidification at low temperatures, acting as a fluidity buffer. However, the primary determinant of fluidity at physiological temperature is the degree of unsaturation in fatty acid tails.`,
     `Unsaturated fatty acids contain one or more double bonds. A cis double bond puts a kink in the hydrocarbon tail, so neighbouring tails cannot pack tightly and the membrane stays more fluid. Not every double bond has this geometry, which is why the cis arrangement matters. Cholesterol has a dual role: it reduces fluidity at high temperatures and prevents solidification at low temperatures, acting as a fluidity buffer. Fluidity also depends on temperature, tail length, and the overall lipid composition of the membrane, so no single factor acts on its own.`],
    [`<strong>A. Integral proteins:</strong> Integral (transmembrane) proteins span the lipid bilayer and serve critical functions in transport, signaling, and cell adhesion. While they contribute to the overall structure and function of the membrane (as described in the fluid mosaic model), they do not primarily determine membrane fluidity. Fluidity depends on the lipid composition of the bilayer itself.`,
     `<strong>A. Integral proteins:</strong> Integral proteins are embedded in the bilayer, and many of them span it from one side to the other, although not all do. They serve important functions in transport, signaling, and cell adhesion, and they contribute to the structure described by the fluid mosaic model. They are not, however, the phospholipid feature the question asks about: the fluidity described here comes from the lipid part of the bilayer.`],
    [`At high temperatures, cholesterol reduces fluidity by restricting phospholipid movement; at low temperatures, it prevents solidification by disrupting tight packing. The degree of unsaturation in fatty acid tails is the primary factor.`,
     `At high temperatures, cholesterol reduces fluidity by restricting phospholipid movement; at low temperatures, it prevents solidification by disrupting tight packing. The question asks about a feature of the phospholipids themselves, which is the unsaturation of their fatty acid tails.`],
    [`They participate in cell signaling, cytoskeletal attachment, and enzymatic activity. They do not embed within the lipid bilayer and have no significant effect on membrane fluidity.`,
     `They participate in cell signaling, cytoskeletal attachment, and enzymatic activity. Because they sit at the surface rather than among the fatty acid tails, they are not the phospholipid feature the question asks about. Proteins can influence how a membrane is organised locally, but the fluidity described here comes from the lipid tails.`],
    [`<li>Membrane proteins drift within the bilayer but do not create its fluidity - the lipids do.</li>`,
     `<li>Many membrane proteins move laterally within the bilayer, while some are held in place by attachments such as those to the cytoskeleton; either way, the lipids rather than the proteins give the membrane its fluidity.</li>`],
  ],
},

{
  q: 2, id: 'bio-258', expectLetter: 'B',
  explanation: [
    [GENERIC_PHOTO, points([
      'RuBisCO attaches CO₂ to RuBP in the Calvin cycle; the unstable product splits into two molecules of 3-phosphoglycerate.',
      'The Calvin cycle takes place in the chloroplast stroma and uses ATP and NADPH supplied by the light reactions.',
      'C4 and CAM plants initially capture inorganic carbon using PEP carboxylase, but still use RuBisCO in the Calvin cycle.',
    ])],
  ],
},

{
  q: 3, id: 'bio-259', expectLetter: 'B',
  stemFull: 'Which statement about green light and photosynthesis is correct?',
  optionFull: [
    [0, 'Chlorophyll a and b absorb green light more strongly than blue and red light'],
    [1, 'Green light can support photosynthesis, although chlorophyll a and b absorb it less strongly than blue and red light'],
    [2, 'Green light activates only the Calvin cycle'],
    [3, 'Green light directly inhibits ATP synthase'],
  ],
  headingsGone: [
    'Photosynthesis will proceed at a maximal rate',
    'chlorophyll reflects green light',
    'minimal ATP and NADPH',
    'absorption minimum',
    'mostly reflected',
  ],
  explanationFull:
    `<h4>Correct Answer: Green light can support photosynthesis, although chlorophyll a and b absorb it less strongly than blue and red light</h4>` +
    `<p>Chlorophyll a and b absorb blue and red light more strongly than green light. This does not mean that green light is useless to a plant. A leaf absorbs some green light, and green light can reach chloroplasts deeper inside the leaf and support photosynthesis. Some green light is reflected or transmitted, contributing to the leaf's green appearance. The photosynthetic rate also depends on light intensity, leaf structure, CO₂ availability, and other conditions.</p>` +
    `<h4>Why the other choices are wrong:</h4>` +
    `<p><strong>A. Chlorophyll a and b absorb green light more strongly than blue and red light:</strong> The opposite is true. Chlorophyll a and b have stronger absorption in the blue and red regions than in the green region. Do not confuse a pigment's absorption spectrum with the total light captured by a whole leaf.</p>` +
    `<p><strong>C. Green light activates only the Calvin cycle:</strong> The Calvin cycle uses ATP and NADPH supplied by the light reactions. Green light does not selectively activate the Calvin cycle while bypassing the light reactions.</p>` +
    `<p><strong>D. Green light directly inhibits ATP synthase:</strong> ATP synthase uses a proton gradient across the thylakoid membrane to make ATP. Green light is not a direct inhibitor of this enzyme.</p>` +
    `<h4>Key Educational Points:</h4><ul>` + points([
      'Chlorophyll a and b absorb blue and red light more strongly than green light.',
      'Whole leaves can absorb and use green light, including in deeper chloroplasts.',
      'Wavelength alone does not determine the photosynthetic rate.',
    ]) + `</ul>` +
    `<p class='exp-key'>Bottom Line: Green light can support photosynthesis; weaker chlorophyll absorption does not mean that a leaf cannot use it.</p>`,
},

{
  q: 4, id: 'bio-260', expectLetter: 'B',
  explanation: [
    [`<li>NAD⁺ must be regenerated for glycolysis to continue - by the electron transport chain aerobically, or by fermentation anaerobically.</li>`,
     `<li>NAD⁺ must be regenerated for glycolysis to continue. This can occur through respiration or fermentation; mature human red blood cells form lactate even when oxygen is available.</li>`],
  ],
},

{
  q: 5, id: 'bio-261', expectLetter: 'D',
  stemFull: 'In the mitochondrial electron transport chain during aerobic respiration, what is the final electron acceptor?',
  explanation: [
    [`In the ETC, NADH donates its electrons to Complex I (NADH dehydrogenase) at the beginning of the chain. NAD+ is an electron donor to the chain, not the final acceptor at the end.`,
     `NAD+ accepts electrons to become NADH. NADH, not NAD+, supplies electrons to Complex I (NADH dehydrogenase) at the beginning of the chain, so neither form is the acceptor at the end of the chain.`],
    [`In the ETC, FADH2 donates its electrons to Complex II (succinate dehydrogenase), entering the chain at a later point than NADH. FAD is an electron donor to the ETC, not the terminal acceptor. The final electron acceptor is molecular oxygen at Complex IV.`,
     `FAD accepts electrons rather than donating them. In succinate dehydrogenase (Complex II) the FAD is bound to the enzyme and is reduced as succinate is oxidized; those electrons then pass through Complex II to ubiquinone, entering the chain beyond Complex I. FAD is therefore not the terminal acceptor. The final electron acceptor is molecular oxygen at Complex IV.`],
    [`<li>Anaerobic cells fall back on substrate-level phosphorylation, at a large cost in ATP yield.</li>`,
     `<li>Without oxygen, human mitochondrial oxidative phosphorylation stops. Glycolysis can still supply some ATP if NAD⁺ is regenerated.</li>`],
  ],
},

{
  q: 6, id: 'bio-262', expectLetter: 'C',
  explanation: [
    [`preventing H⁺ flow from the intermembrane space back into the matrix. This stops ATP synthesis.`,
     `preventing H⁺ flow from the intermembrane space back into the matrix. This stops ATP production by ATP synthase, although substrate-level phosphorylation elsewhere in the cell is not directly affected.`],
    [`Rotenone poisoning halts the ETC at its first step, preventing NADH oxidation but not directly affecting ATP synthase.`,
     `Rotenone blocks the entry of NADH-derived electrons at Complex I. Electrons from succinate can still enter further along the chain through Complex II, so it does not close every route through the chain, and it does not act on ATP synthase.`],
    [` DNP was once used as a weight-loss drug but was banned due to dangerous hyperthermia.`,
     ` With adequate oxygen and substrate, uncoupling can increase oxygen consumption while reducing the ATP yield.`],
    [`<li>Uncouplers such as DNP do the opposite: the gradient collapses, electron transport accelerates, and no ATP is made.</li>`,
     `<li>Uncouplers such as DNP do the opposite: the gradient collapses, electron transport accelerates, and ATP production by oxidative phosphorylation is greatly reduced. Substrate-level phosphorylation can still make some ATP.</li>`],
  ],
},

{
  q: 7, id: 'bio-264', expectLetter: 'C',
  explanation: [
    [`Topoisomerase relieves this strain by transiently cutting one or both DNA strands, allowing rotation, then resealing.`,
     `Topoisomerases relieve this strain by making transient breaks in the DNA. These breaks let the strands rotate, or let one DNA segment pass through another, before the enzyme reseals them.`],
    [GENERIC_MOLBIO, points([
      'Unwinding DNA at a replication fork creates torsional strain ahead of the fork.',
      'Topoisomerases relieve this strain by temporarily breaking and resealing DNA.',
      'Helicase separates the strands; ligase seals remaining nicks. These are different jobs.',
    ])],
  ],
},

{
  q: 8, id: 'bio-265', expectLetter: 'B',
  explanation: [
    [`<p>The lagging strand is oriented 3' to 5' relative to fork movement. Primase lays RNA primers, DNA polymerase III extends each primer as an Okazaki fragment in the 5' to 3' direction. DNA polymerase I removes primers and DNA ligase seals the nicks.</p>`,
     `<p>DNA polymerase extends a new strand only 5' to 3'. The lagging-strand template runs 5' to 3' toward the replication fork, so the new DNA is made in short sections extending away from the fork. Primase supplies an RNA primer for each section. DNA polymerase extends each Okazaki fragment; the primers are later removed and replaced with DNA, and DNA ligase seals the remaining nicks. In <em>Escherichia coli</em> this work is divided between DNA polymerase III, which extends the fragments, and DNA polymerase I, which replaces the primers; those enzyme names do not apply to every organism.</p>`],
    [`RNA polymerase synthesizes RNA, not DNA, and it works in a single direction (5' to 3') on the template strand. RNA polymerase does contribute a short RNA primer at the start of each Okazaki fragment (via primase activity), but the actual DNA synthesis on the lagging strand is performed by DNA polymerase III (in prokaryotes) or DNA polymerase delta (in eukaryotes).`,
     `RNA polymerase makes RNA, not DNA. It reads its DNA template 3' to 5' while synthesizing RNA 5' to 3', so it does not work in both directions. Primase makes the short RNA primer at the start of each Okazaki fragment; it does not synthesize the DNA fragments themselves. A DNA polymerase does that, such as DNA polymerase III in <em>E. coli</em> or DNA polymerase delta in eukaryotes.`],
    [`Reverse transcriptase is a specialized enzyme found in retroviruses (like HIV) that synthesizes DNA from an RNA template. It is not part of normal cellular DNA replication. Reverse transcriptase also synthesizes in the 5' to 3' direction, not 3' to 5'. Its existence was a groundbreaking discovery that challenged the original "central dogma."`,
     `Reverse transcriptase synthesizes DNA from an RNA template, and like other DNA-synthesizing enzymes it extends 5' to 3', not 3' to 5'. It is not the enzyme that extends ordinary Okazaki fragments. Retroviruses such as HIV carry one, and cells have a reverse transcriptase of their own in telomerase, but neither takes part in ordinary lagging-strand synthesis.`],
    [GENERIC_MOLBIO, points([
      'New DNA is synthesized 5′ to 3′ on both leading and lagging strands.',
      'The antiparallel templates make continuous synthesis possible on one strand and discontinuous synthesis necessary on the other.',
      'Okazaki fragments require primers, primer replacement with DNA, and sealing by ligase.',
    ])],
  ],
},

{
  q: 9, id: 'bio-268', expectLetter: 'C',
  stemFull: 'In bacteria, the sigma factor of RNA polymerase is essential for:',
  explanation: [
    [`<p>The sigma factor recognizes promoter sequences (-10 Pribnow box TATAAT and -35 region). After initiation (~10 nucleotides synthesized), sigma dissociates and the core enzyme continues elongation.</p>`,
     `<p>The sigma factor lets RNA polymerase recognize promoter sequences, so that transcription starts in the right place. In the familiar <em>Escherichia coli</em> sigma-70 example these include the -10 Pribnow box (TATAAT) and the -35 region, although not every bacterial promoter follows that consensus. Sigma is needed for initiation; the core enzyme is what catalyzes RNA synthesis.</p>`],
    [`<strong>A. Elongation of the RNA transcript:</strong> Elongation of the RNA transcript is carried out by the core enzyme of RNA polymerase (alpha2-beta-beta' subunits in prokaryotes) after the sigma factor has dissociated. The core enzyme moves along the template strand, synthesizing RNA in the 5' to 3' direction. Sigma is only needed for the initial promoter recognition, not for the elongation process.`,
     `<strong>A. Elongation of the RNA transcript:</strong> Elongation is carried out by the core enzyme of RNA polymerase, which moves along the template strand synthesizing RNA in the 5' to 3' direction. Sigma's job is promoter recognition at initiation. It may remain associated with the enzyme into elongation rather than leaving at a fixed point, but it is not what catalyzes chain extension.`],
    [`<strong>D. Proofreading of newly synthesized RNA:</strong> RNA polymerase does not have a proofreading function comparable to DNA polymerase's 3' to 5' exonuclease activity. RNA synthesis has a higher error rate than DNA replication (~1 error per 10,000 nucleotides vs. ~1 per billion for DNA), but this is tolerable because mRNA molecules are temporary and multiple copies are made.`,
     `<strong>D. Proofreading of newly synthesized RNA:</strong> RNA polymerase can correct some of its own errors, for example by backtracking and cleaving the transcript, so it is not true that the enzyme cannot proofread at all. Error correction is not what sigma does: its principal role is promoter recognition.`],
    [GENERIC_MOLBIO, points([
      'Sigma factors help bacterial RNA polymerase recognize promoters.',
      'A sigma factor associates with the core enzyme to form an initiation-competent holoenzyme.',
      'The core enzyme synthesizes RNA; sigma is not the enzyme’s proofreading component.',
    ])],
  ],
},

{
  q: 10, id: 'bio-270', expectLetter: 'C',
  explanation: [
    [GENERIC_MOLBIO, points([
      'A nonsense mutation changes an amino-acid codon into a stop codon.',
      'UAA, UAG, and UGA are stop codons in the standard genetic code.',
      'A premature stop can shorten the protein; a single-base substitution does not itself shift the reading frame.',
    ])],
    [`<p class='exp-key'>Bottom Line: Stop codons: UAA, UAG, UGA.</p>`,
     `<p class='exp-key'>Bottom Line: UAU → UAA introduces a premature stop codon: a nonsense mutation.</p>`],
  ],
},

{
  q: 12, id: 'bio-272', expectLetter: 'B',
  stemFull: 'Which epigenetic modification commonly reduces transcription when it occurs at CpG sites in a gene’s promoter?',
  explanation: [
    [`<p>DNA methyltransferases (DNMTs) add methyl groups to cytosine in CpG dinucleotides. Promoter methylation recruits proteins that condense chromatin into heterochromatin, silencing the gene epigenetically.</p>`,
     `<p>DNA methyltransferases (DNMTs) add methyl groups to cytosine in CpG dinucleotides. Methylation of a gene's promoter CpG island is generally associated with reduced transcription, because it recruits proteins that pack the chromatin more tightly. Methylation elsewhere in a gene is not automatically a silencing switch.</p>`],
    [`<strong>A. Histone acetylation:</strong> Histone acetylation actually has the opposite effect: it activates gene expression.`,
     `<strong>A. Histone acetylation:</strong> Histone acetylation generally has the opposite effect: it promotes gene expression.`],
    [`This opens chromatin (euchromatin) and promotes transcription. Histone deacetylation by HDACs leads to gene silencing.`,
     `This generally opens the chromatin (euchromatin) and promotes transcription, while removal of the acetyl groups by HDACs generally has the opposite effect.`],
    [`It increases protein diversity (the human genome produces ~100,000 proteins from ~20,000 genes) but does not silence genes. A gene must first be actively transcribed before alternative splicing can occur.`,
     `It increases protein diversity and can affect gene expression, for example by producing a transcript that is not translated into functional protein. What it is not is methylation of promoter DNA, which is what the question describes, and a gene must first be transcribed before its RNA can be spliced.`],
    [`<strong>D. Polyubiquitination:</strong> Polyubiquitination is a post-translational modification where chains of ubiquitin protein are attached to a target protein, marking it for degradation by the 26S proteasome. This regulates protein turnover and quality control but does not directly affect gene expression at the DNA or transcription level. It acts on existing proteins, not on the gene itself.`,
     `<strong>D. Polyubiquitination:</strong> Polyubiquitination attaches chains of the small protein ubiquitin to a target protein. This commonly marks the protein for degradation by the 26S proteasome, although not every ubiquitin modification does so; some instead change a protein's location or activity. Either way it modifies proteins and does not add methyl groups to cytosine, which is what the question asks about.`],
    [`<li>Methylation of a promoter CpG island recruits proteins that condense chromatin into heterochromatin, silencing the gene.</li>`,
     `<li>Methylation of a promoter CpG island is generally associated with reduced transcription of that gene, because it recruits proteins that pack the chromatin more tightly.</li>`],
    [`<p class='exp-key'>Bottom Line: DNA methylation = silencing; histone acetylation = activation. Both are epigenetic modifications.</p>`,
     `<p class='exp-key'>Bottom Line: Promoter CpG methylation is generally associated with reduced transcription; histone acetylation is generally associated with increased transcription. Both are epigenetic modifications.</p>`],
  ],
},

];
