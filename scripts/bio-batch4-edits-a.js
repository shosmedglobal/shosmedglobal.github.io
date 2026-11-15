/**
 * Batch 4 review, part A: displayed Q1-Q12 (bio-129 .. bio-141).
 * Includes the Q7 substantial correction. The generic biotechnology block
 * starts at Q9 and runs to Q20.
 */
'use strict';

const GENERIC_BIOTECH =
  '<ul><li>The central dogma of molecular biology describes information flow: DNA is transcribed to mRNA, which is translated to protein.</li>'
  + '<li>Eukaryotic gene expression is regulated at multiple levels: chromatin remodeling, transcription, post-transcription (splicing), translation, and post-translation.</li>'
  + '<li>Mutations in DNA can be silent, missense, nonsense, or frameshift - each with different impacts on protein structure and function.</li></ul>';

const points = items => '<ul>' + items.map(t => '<li>' + t + '</li>').join('') + '</ul>';

module.exports = [

// Q1 bio-129: "uses lactose only when glucose is unavailable" is an absolute
// permission switch; regulation sets the degree of expression.
{
  q: 1, id: 'bio-129', expectLetter: 'B',
  explanation: [
    ['<li>This is catabolite repression: the cell burns glucose preferentially and only invests in lactose enzymes when it must.</li>',
     '<li>This is catabolite repression: the cell preferentially uses glucose, and lac expression is strongest when glucose is scarce.</li>'],
    ['<p class=\'exp-key\'>Bottom Line: The lac operon demonstrates dual regulation - negative control by the repressor and positive control by CAP-cAMP, allowing the cell to use lactose only when glucose is unavailable.</p>',
     '<p class=\'exp-key\'>Bottom Line: The lac operon combines negative inducible control by the lac repressor with positive control by CAP-cAMP. Expression is highest when lactose is available and glucose is low or absent.</p>'],
  ],
},

// Q2 bio-130: mammalian miRNAs commonly cause BOTH reduced translation and
// mRNA destabilization, which must agree with Q8.
{
  q: 2, id: 'bio-130', expectLetter: 'B',
  stemFull: 'In canonical post-transcriptional RNA interference in animal cells, gene silencing occurs through which mechanism?',
  explanation: [
    ['<p>In RNA interference, double-stranded RNA is processed by the enzyme Dicer into small interfering RNAs (siRNAs, ~21 nucleotides). One strand (the guide strand) is loaded into the RNA-induced silencing complex (RISC), which contains the Argonaute protein. The guide strand directs RISC to complementary mRNA sequences. Perfect complementarity leads to mRNA cleavage, while partial complementarity (typical of miRNAs) leads to translational repression.</p>',
     '<p>In canonical post-transcriptional RNA interference, a short guide RNA directs an Argonaute-containing RNA-induced silencing complex (RISC) to a target mRNA. Double-stranded RNA is first processed by the enzyme Dicer into small interfering RNAs of about 21 nucleotides, and one strand is loaded into RISC as the guide.</p>'
     + '<p>Extensive matching can allow cleavage of the target RNA. Mammalian miRNAs commonly bind with imperfect matching and reduce protein production by inhibiting translation and promoting mRNA destabilization and decay. The targeting is sequence-specific; RNAi does not shut down all translation.</p>'],
    ['<p><strong>A. Small RNAs bind ribosomes and prevent all translation:</strong> This answer is partially correct in concept but overstated. Small RNAs in the RNAi pathway do not bind directly to ribosomes to prevent all translation globally. Instead, they are loaded into the RISC (RNA-induced silencing complex), which uses the small RNA as a guide to find specific complementary mRNAs. The silencing is highly sequence-specific, targeting only mRNAs that match the guide RNA, not all translation.</p>',
     '<p><strong>A. Small RNAs bind ribosomes and prevent all translation:</strong> Binding ribosomes to prevent all translation is not the mechanism being tested. Small RNAs in this pathway are loaded into RISC, which uses the guide RNA to find specific complementary mRNAs. The silencing is sequence-specific, affecting only transcripts that match the guide.</p>'],
    ['<li>Perfect complementarity leads to mRNA cleavage; partial complementarity, typical of miRNAs, causes translational repression instead.</li>',
     '<li>Extensive matching can allow cleavage of the target RNA. Mammalian miRNAs commonly match imperfectly and both reduce translation and promote mRNA destabilization and decay.</li>'],
    ['<p class=\'exp-key\'>Bottom Line: RNAi is a post-transcriptional gene silencing mechanism: Dicer processes dsRNA into siRNA → RISC loads the guide strand → RISC finds complementary mRNA → mRNA is degraded or translationally repressed.</p>',
     '<p class=\'exp-key\'>Bottom Line: RNAi silences genes after transcription: Dicer processes dsRNA into small RNAs → RISC loads the guide strand → RISC finds the complementary mRNA → the mRNA is cleaved, or its translation is reduced and the transcript destabilized.</p>'],
  ],
},

// Q3 bio-131: "functionally haploid" invites confusion with chromosome number;
// imprinted expression is also not identical in every tissue and life stage.
{
  q: 3, id: 'bio-131', expectLetter: 'A',
  explanation: [
    ['For example, the IGF2 gene is expressed only from the paternal allele, while H19 is expressed only from the maternal allele. Imprinting errors',
     'IGF2 and H19 are the classic examples: in the relevant tissues and developmental settings, IGF2 is expressed from the paternal allele and H19 from the maternal allele. Imprinting errors'],
    ['<li>One parental allele is silenced by methylation marks established during gametogenesis, leaving the gene functionally haploid.</li><li>IGF2 is expressed only from the paternal allele, while H19 is expressed only from the maternal allele.</li><li>Because only one copy is active there is no backup, so losing or mutating it causes disease - as in Prader-Willi and Angelman syndromes.</li>',
     '<li>One parental allele is silenced by methylation marks established during gametogenesis. Both DNA copies remain present, but one parental copy is predominantly expressed at the imprinted locus.</li><li>IGF2 and H19 are the classic examples, expressed from the paternal and maternal allele respectively in the relevant tissues.</li><li>Because effectively one copy is active there is no backup, so losing or mutating it can cause disease, as in Prader-Willi and Angelman syndromes.</li><li>Imprints are reset during egg or sperm formation, so the marks passed to the next generation reflect the parent producing those gametes.</li>'],
    ['<p class=\'exp-key\'>Bottom Line: Imprinted genes are functionally haploid - only one parental allele is expressed. This makes them vulnerable to disease if the expressed allele is mutated or deleted.</p>',
     '<p class=\'exp-key\'>Bottom Line: At an imprinted locus both DNA copies are present, but one parental copy is predominantly expressed. That makes the locus vulnerable: mutating or deleting the expressed copy can cause disease.</p>'],
  ],
},

// Q4 bio-132: scope the methylation claim to promoter CpG islands and soften
// the equals-sign chain in the Bottom Line.
{
  q: 4, id: 'bio-132', expectLetter: 'A',
  explanation: [
    ['DNA methylation typically leads to gene silencing, which is the opposite of what histone acetylation does. HATs and DNMTs often work antagonistically: acetylation opens chromatin for transcription, while CpG methylation closes it.</p>',
     'Methylation of promoter CpG islands is commonly associated with reduced transcription, which is the opposite of what histone acetylation does. Methylation elsewhere in a gene does not carry the same meaning, so this is a promoter-specific generalization rather than a rule for methylation anywhere.</p>'],
    ['<li>Loosened chromatin (euchromatin) is accessible to transcription factors and RNA polymerase, so acetylation promotes transcription.</li>',
     '<li>Loosened chromatin (euchromatin) is more accessible to transcription factors and RNA polymerase, so acetylation generally promotes transcription.</li>'],
    ['<p class=\'exp-key\'>Bottom Line: Histone acetylation = open chromatin = gene activation; histone deacetylation = closed chromatin = gene silencing. This is a reversible epigenetic modification.</p>',
     '<p class=\'exp-key\'>Bottom Line: Histone acetylation generally makes chromatin more accessible and favours transcription; deacetylation generally favours reduced accessibility. These are reversible changes.</p>'],
  ],
},

// Q5 bio-133: sound item. Only the allolactose consistency edit.
{
  q: 5, id: 'bio-133', expectLetter: 'B',
  explanation: [
    ['<li>Contrast the lac operon, which is negative inducible: there the sugar switches the repressor off rather than on.</li>',
     '<li>Contrast the lac operon, which is negative inducible: there allolactose switches the repressor off rather than on.</li>'],
    ['while the lac operon is a negative inducible system: lactose inactivates the repressor.</p>',
     'while the lac operon is a negative inducible system: allolactose inactivates the repressor.</p>'],
  ],
},

// Q6 bio-134: XIST is not the universal mammalian X-inactivation RNA, and the
// inactive X is not completely silent.
{
  q: 6, id: 'bio-134', expectLetter: 'D',
  stemFull: 'X-chromosome inactivation (Lyonization) in human XX somatic cells is regulated by which non-coding RNA?',
  explanation: [
    ['This results in condensation of one X chromosome into a transcriptionally silent Barr body, ensuring dosage compensation between XX females and XY males.</p>',
     'XIST promotes silencing of most genes on the X chromosome from which it is transcribed, and that chromosome condenses into a Barr body. Some genes escape X-inactivation, so the inactive X is not completely silent. The result is dosage compensation between XX and XY cells.</p>'],
    ['<li>The result is condensation into a Barr body and transcriptional silencing, achieving dosage compensation.</li>',
     '<li>Most genes on that chromosome are silenced and it condenses into a Barr body, achieving dosage compensation. Some genes escape inactivation, so the inactive X is not completely silent.</li>'],
    ['<p class=\'exp-key\'>Bottom Line: XIST is a long non-coding RNA that coats one X chromosome, triggering heterochromatinization and silencing - it is one of the best-characterized examples of lncRNA function in epigenetic regulation.</p>',
     '<p class=\'exp-key\'>Bottom Line: XIST is a long non-coding RNA that coats one X chromosome in cis, triggering heterochromatinization and silencing of most of its genes. It is one of the best-characterized examples of lncRNA function in epigenetic regulation.</p>'],
  ],
},

// Q7 bio-136: SUBSTANTIAL CORRECTION. The A feedback conflated enhancers with
// silencers, and the B feedback claimed RNA polymerase II does not bind
// enhancers, which is false; as written, B described a real enhancer property.
{
  q: 7, id: 'bio-136', expectLetter: 'D',
  optionFull: [[1, 'Specify the site where transcription of the target gene begins']],
  headingsGone: ['B. Are bound by RNA polymerase II to initiate transcription:'],
  explanationFull:
    '<h4>Correct Answer: D) Can function thousands of base pairs away from the promoter and in either orientation</h4>'
    + '<p>Enhancers are regulatory DNA sequences that increase transcription of a target gene. They can lie far upstream, downstream, or within an intron, and many can function in either orientation. Proteins bound to an enhancer can contact the target promoter when the DNA loops. The promoter specifies where transcription of that gene begins and helps assemble the transcription machinery. Enhancers normally regulate genes on the same DNA molecule.</p>'
    + '<h4>Why the other choices are wrong:</h4>'
    + '<p><strong>A. Only repress gene transcription:</strong> Enhancers increase transcription in the introductory model tested here. Regulatory elements that reduce transcription are called silencers.</p>'
    + '<p><strong>B. Specify the site where transcription of the target gene begins:</strong> Specifying the target gene&rsquo;s transcription start site is a promoter function. An enhancer helps regulate how strongly the target gene is transcribed.</p>'
    + '<p><strong>C. Must be located immediately upstream of the gene they regulate:</strong> Enhancers do not have to sit immediately upstream of the target gene. They can act over long distances through interactions with the promoter.</p>'
    + '<h4>Key Educational Points:</h4>'
    + points([
      'An enhancer increases transcription of its target gene.',
      'The promoter establishes where transcription of that gene begins.',
      'DNA looping is what permits an enhancer to regulate a promoter from a distant site.',
    ])
    + '<p class=\'exp-key\'>Bottom Line: Enhancers can increase transcription from a distance, often in either orientation, by interacting with a target promoter.</p>',
},

// Q8 bio-137: scope to mammalian miRNAs, define 3' UTR once, and drop the
// unnecessary "over 60% of genes" claim.
{
  q: 8, id: 'bio-137', expectLetter: 'A',
  stemFull: 'Mammalian microRNAs (miRNAs) primarily regulate gene expression at which level?',
  optionFull: [[0, 'Post-transcriptionally, often by binding sites in the 3&prime; UTR of target mRNAs']],
  explanation: [
    ['<h4>Correct Answer: A) Post-transcriptional level by binding to the 3\' UTR of target mRNAs</h4>',
     '<h4>Correct Answer: A) Post-transcriptionally, often by binding sites in the 3&prime; UTR of target mRNAs</h4>'],
    ['miRNAs typically bind with imperfect complementarity to the 3\' untranslated region (3\' UTR) of target mRNAs, leading to translational repression or mRNA destabilization. A single miRNA can regulate hundreds of different mRNA targets.</p>',
     'miRNAs commonly bind with imperfect complementarity to sites in the 3&prime; untranslated region (3&prime; UTR), the stretch of mRNA after the protein-coding sequence. Binding there is common rather than mandatory for every target. The result is reduced translation together with destabilization and decay of the mRNA. A single miRNA can regulate many different mRNA targets.</p>'],
    ['<li>They bind, usually with imperfect complementarity, to the 3\' untranslated region of their target mRNAs.</li><li>The result is translational repression or mRNA destabilisation rather than clean cleavage.</li>',
     '<li>They bind, usually with imperfect complementarity, to sites in the 3&prime; untranslated region of their target mRNAs, which is the stretch after the coding sequence.</li><li>The result is reduced translation together with destabilization and decay of the mRNA, rather than clean cleavage.</li>'],
    ['<p class=\'exp-key\'>Bottom Line: miRNAs fine-tune gene expression post-transcriptionally by binding the 3\' UTR of target mRNAs, and are estimated to regulate over 60% of human protein-coding genes.</p>',
     '<p class=\'exp-key\'>Bottom Line: miRNAs fine-tune gene expression after transcription, commonly through sites in the 3&prime; UTR, reducing translation and destabilizing the target mRNA.</p>'],
  ],
},

// Q9 bio-138: generic block; also label the doubling formula as idealized.
{
  q: 9, id: 'bio-138', expectLetter: 'C',
  explanation: [
    [GENERIC_BIOTECH, points([
      'Heating separates the two DNA strands without cutting the sugar-phosphate backbone.',
      'Cooling lets primers bind; the polymerase then extends them.',
      'A thermostable polymerase survives the repeated heating used in PCR.',
    ])],
    ['After n cycles, DNA is amplified approximately 2ⁿ-fold.</p>',
     'In an idealized model, n cycles amplify the target about 2ⁿ-fold; real reactions fall short of perfect doubling every cycle.</p>'],
  ],
},

// Q10 bio-139: sound item; generic block only.
{
  q: 10, id: 'bio-139', expectLetter: 'D',
  explanation: [
    [GENERIC_BIOTECH, points([
      'DNA has a negatively charged phosphate backbone, so it moves toward the positive electrode.',
      'Smaller linear fragments usually move faster and farther through an agarose gel.',
      'A DNA ladder run alongside the samples provides reference fragment sizes.',
    ])],
  ],
},

// Q11 bio-140: the single fused guide RNA is an engineered design, and not all
// restriction recognition sequences are palindromic (must agree with Q12).
{
  q: 11, id: 'bio-140', expectLetter: 'D',
  stemFull: 'A commonly used engineered CRISPR-Cas9 gene-editing system uses which component to guide the Cas9 nuclease to its target DNA sequence?',
  explanation: [
    ['<p>The CRISPR-Cas9 system uses a synthetic single guide RNA (sgRNA) that contains a ~20-nucleotide sequence complementary to the target DNA. The sgRNA directs the Cas9 endonuclease to the specific genomic location, where Cas9 creates a double-strand break. The target site must be adjacent to a protospacer adjacent motif (PAM, usually NGG for SpCas9). The cell\'s DNA repair mechanisms (NHEJ or HDR) then process the break.</p>',
     '<p>The engineered system uses a synthetic single guide RNA (sgRNA) carrying a sequence of about 20 nucleotides complementary to the target DNA. The guide RNA supplies the sequence specificity and Cas9 does the cutting, creating a double-strand break. The natural bacterial system uses two separate RNA molecules; the engineered sgRNA fuses them into one.</p>'
     + '<p>Cas9 also requires a suitable protospacer adjacent motif (PAM) next to the target site, usually NGG for the commonly used SpCas9. The cell then repairs the break. Non-homologous end joining (NHEJ) rejoins the ends and often leaves small insertions or deletions, while homology-directed repair (HDR) can copy from a supplied template. Making the cut does not by itself produce a precise correction: the outcome depends on which repair route the cell takes and on the conditions.</p>'],
    ['<p><strong>C. A restriction enzyme recognition sequence:</strong> Restriction enzyme recognition sequences are short palindromic DNA sequences (typically 4–8 base pairs) where restriction enzymes cut DNA.',
     '<p><strong>C. A restriction enzyme recognition sequence:</strong> Many commonly used restriction enzymes recognize palindromic sequences, typically 4 to 8 base pairs long, at or near which they cut the DNA.'],
    [GENERIC_BIOTECH, points([
      'The guide RNA supplies the sequence specificity; Cas9 cuts the DNA.',
      'Cas9 also requires a suitable PAM sequence next to the target site.',
      'The cell repairs the cut, and the repair outcome depends on the route taken and the conditions.',
    ])],
  ],
},

// Q12 bio-141: the Bottom Line, written during batch 2, implied that EcoRI and
// BamHI overhangs pair with EACH OTHER. They do not.
{
  q: 12, id: 'bio-141', expectLetter: 'B',
  explanation: [
    ['<p class=\'exp-key\'>Bottom Line: Restriction enzymes cut at or near specific recognition sequences; those leaving matching sticky ends, such as EcoRI and BamHI, are especially useful for cloning because the overhangs base-pair with each other before ligation.</p>',
     '<p class=\'exp-key\'>Bottom Line: Restriction enzymes cut at or near specific recognition sequences. Cutting both the insert and the vector with EcoRI produces compatible sticky ends that can pair, and DNA ligase then seals the backbone. What matters is that the two ends are compatible, not that the same enzyme is used in every cloning experiment.</p>'],
  ],
},

];
