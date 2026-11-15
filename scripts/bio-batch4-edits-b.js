/**
 * Batch 4 review, part B: displayed Q13-Q24 (bio-142 .. bio-153).
 * End of the biotechnology block, start of the cardiovascular block, and the
 * Q21 truncated-feedback repair.
 */
'use strict';

const GENERIC_BIOTECH =
  '<ul><li>The central dogma of molecular biology describes information flow: DNA is transcribed to mRNA, which is translated to protein.</li>'
  + '<li>Eukaryotic gene expression is regulated at multiple levels: chromatin remodeling, transcription, post-transcription (splicing), translation, and post-translation.</li>'
  + '<li>Mutations in DNA can be silent, missense, nonsense, or frameshift - each with different impacts on protein structure and function.</li></ul>';

const GENERIC_CARDIO =
  '<ul><li>The heart functions as a double pump: the right side pumps deoxygenated blood to the lungs (pulmonary circuit), and the left side pumps oxygenated blood to the body (systemic circuit).</li>'
  + '<li>Cardiac output equals heart rate multiplied by stroke volume; it is regulated by the autonomic nervous system, hormones, and intrinsic mechanisms (Frank-Starling law).</li>'
  + '<li>The cardiac conduction system (SA node, AV node, Bundle of His, Purkinje fibers) coordinates rhythmic contraction without external nerve stimulation.</li></ul>';

const points = items => '<ul>' + items.map(t => '<li>' + t + '</li>').join('') + '</ul>';

module.exports = [

// Q13 bio-142: "plasmid" without host context is too broad, and the three
// features are standard conveniences rather than universal essentials.
{
  q: 13, id: 'bio-142', expectLetter: 'B',
  stemFull: 'In molecular cloning, a typical bacterial cloning plasmid used in <em>E. coli</em> contains all of the following EXCEPT:',
  explanation: [
    ['<p>Bacterial plasmid vectors contain three essential components: (1) an origin of replication (ori) for autonomous replication in the host bacterium, (2) a selectable marker such as an antibiotic resistance gene (e.g., ampicillin resistance), and (3) a multiple cloning site (MCS/polylinker) containing multiple unique restriction enzyme sites for inserting foreign DNA. Plasmids replicate independently of the bacterial chromosome and do not require a centromere.</p>',
     '<p>A standard bacterial cloning vector commonly carries three features: an origin of replication (ori) that lets it replicate in the host bacterium, a selectable marker such as an antibiotic resistance gene, and a multiple cloning site (MCS or polylinker) with unique restriction sites for inserting foreign DNA. An MCS and an antibiotic-resistance marker are standard convenient choices rather than the only possible insertion and selection arrangements.</p>'
     + '<p>Such a plasmid replicates independently of the bacterial chromosome and does not need a centromere. Centromere-containing plasmids do exist for yeast, which is why this question specifies a bacterial vector.</p>'],
    [GENERIC_BIOTECH, points([
      'The origin of replication permits the plasmid to be copied in the bacterial host.',
      'A selectable marker helps identify the cells that are carrying the plasmid.',
      'An insertion site permits cloning. Antibiotic resistance alone does not prove the intended insert is present and correct.',
    ])],
    ['<p class=\'exp-key\'>Bottom Line: The three essential features of a cloning vector are: ori (replication), selectable marker (identification of transformed cells), and MCS (insertion site for foreign DNA).</p>',
     '<p class=\'exp-key\'>Bottom Line: Common features of a standard bacterial cloning vector are an ori for replication, a selectable marker for identifying transformed cells, and an insertion site such as an MCS for the foreign DNA.</p>'],
  ],
},

// Q14 bio-143: cDNA from mature mRNA can include untranslated regions, which
// have regulatory functions, so "lacking regulatory regions" is too broad.
{
  q: 14, id: 'bio-143', expectLetter: 'B',
  explanation: [
    ['<p>Reverse transcriptase is an RNA-dependent DNA polymerase originally isolated from retroviruses. In biotechnology, it is used to synthesize complementary DNA (cDNA) from mRNA templates. cDNA represents only the expressed (exon) sequences of a gene, lacking introns and regulatory regions. This is essential for expressing eukaryotic genes in prokaryotic systems (which cannot splice introns) and for constructing cDNA libraries that represent the transcriptome.</p>',
     '<p>Reverse transcriptase is an RNA-dependent DNA polymerase, originally isolated from retroviruses, which makes a DNA copy of an RNA template. cDNA made from fully spliced mature mRNA contains the expressed exons, including any copied untranslated regions, but lacks the introns removed by splicing. It also lacks the upstream genomic promoter.</p>'
     + '<p>That matters for expressing a eukaryotic gene in bacteria, which cannot splice introns: an intron-free coding sequence can be placed in a vector carrying suitable bacterial expression signals. cDNA on its own is not a complete expression system, and not every eukaryotic protein will be correctly processed in a bacterium. cDNA libraries are also used to represent the transcriptome.</p>'],
    [GENERIC_BIOTECH, points([
      'Reverse transcriptase copies an RNA template into DNA.',
      'cDNA made from mature mRNA lacks the introns that splicing removed, and lacks the genomic promoter.',
      'Reverse transcription supplies the DNA template needed for RT-PCR and RT-qPCR.',
    ])],
    ['<p class=\'exp-key\'>Bottom Line: cDNA made by reverse transcriptase contains only exon sequences (no introns), making it suitable for gene expression in bacteria and for studying which genes are actively transcribed in a particular tissue.</p>',
     '<p class=\'exp-key\'>Bottom Line: cDNA made from mature mRNA contains the exons without the spliced-out introns, which is why it is used to express eukaryotic coding sequences in bacteria and to study which genes a tissue is transcribing.</p>'],
  ],
},

// Q15 bio-144: add the denaturation step, fix "Edward" to "Edwin", and stop
// equating immunohistochemistry with a measurement of enzyme activity.
{
  q: 15, id: 'bio-144', expectLetter: 'A',
  explanation: [
    ['(2) separating fragments by gel electrophoresis, (3) transferring (blotting) the DNA onto a nitrocellulose or nylon membrane, and (4) hybridizing with a labeled complementary probe to detect specific sequences.',
     '(2) separating fragments by gel electrophoresis, (3) denaturing the DNA to single strands and transferring (blotting) it onto a nitrocellulose or nylon membrane, so a complementary probe can hybridize, and (4) hybridizing with a labeled complementary probe to detect specific sequences.'],
    ['<p><strong>B. Enzyme activity in tissue sections:</strong> Detecting enzyme activity in tissue sections is done by histochemistry or enzyme histochemistry (e.g., immunohistochemistry for protein localization).',
     '<p><strong>B. Enzyme activity in tissue sections:</strong> Detecting enzyme activity in tissue sections is done by enzyme histochemistry. Immunohistochemistry is related but different: antibody staining shows where a protein is, whereas enzyme histochemistry can demonstrate that the enzyme is active.'],
    ['Edward Southern invented Southern blotting; “Northern” and “Western” were named as humorous extensions.</p>',
     'Edwin Southern invented Southern blotting; "Northern" and "Western" were named as humorous extensions.</p>'],
    [GENERIC_BIOTECH, points([
      'Southern blotting detects DNA.',
      'A labeled complementary probe supplies the sequence specificity, which is why the DNA must first be made single-stranded.',
      'Northern blotting detects RNA and Western blotting detects protein.',
    ])],
  ],
},

// Q16 bio-145: RNA-seq does not sequence every RNA molecule; it sequences a
// cDNA library prepared from sampled RNA.
{
  q: 16, id: 'bio-145', expectLetter: 'D',
  explanation: [
    ['RNA-seq uses next-generation sequencing to directly sequence and quantify all RNA molecules. Both methods can compare expression patterns between different cell types, tissues, or conditions.</p>',
     'Standard RNA-seq typically sequences a cDNA library made from sampled RNA and uses read counts to estimate transcript abundance. It does not capture every RNA molecule, and the way the library is prepared determines which kinds of RNA are represented. Both methods can compare expression patterns between cell types, tissues, or conditions.</p>'],
    ['A karyotype looks the same in liver and kidney cells because they share the same genome. To compare gene expression between tissues, you need techniques that measure mRNA levels, such as microarrays or RNA-seq.</p>',
     'Karyotyping does not show which genes a cell is expressing. To compare gene expression between tissues you need a method that measures mRNA, such as a microarray or RNA-seq.</p>'],
    ['RFLP analyzes the genome (DNA), which is identical in liver and kidney cells-only the transcriptome (mRNA) differs.</p>',
     'RFLP analyses DNA, so it does not directly measure mRNA expression.</p>'],
    [GENERIC_BIOTECH, points([
      'Expression profiling compares how abundant different RNAs are between samples.',
      'A microarray measures hybridization to probes fixed on a chip.',
      'RNA-seq usually sequences a cDNA library made from the sampled RNA and estimates abundance from read counts.',
    ])],
    ['<p class=\'exp-key\'>Bottom Line: Microarrays and RNA-seq measure transcriptome-wide gene expression. RNA-seq has largely replaced microarrays due to its greater sensitivity, dynamic range, and ability to detect novel transcripts.</p>',
     '<p class=\'exp-key\'>Bottom Line: Microarrays and RNA-seq both compare RNA abundance between samples. Microarrays use probes on a chip; RNA-seq usually sequences a cDNA library made from the RNA.</p>'],
  ],
},

// Q17 bio-146: the size comparison is unnecessary, and whether the polymerase
// dissociates afterwards is not what terminates the chain.
{
  q: 17, id: 'bio-146', expectLetter: 'D',
  explanation: [
    ['<p><strong>B. Are too large to be incorporated by DNA polymerase:</strong> DdNTPs are not too large for DNA polymerase-they are actually slightly smaller than normal dNTPs because they are missing the 3’-OH group. DNA polymerase readily incorporates ddNTPs into the growing strand. The chain terminates not because of size exclusion but because the absence of the 3’-OH group prevents formation of the next phosphodiester bond, halting further extension.</p>',
     '<p><strong>B. Are too large to be incorporated by DNA polymerase:</strong> DNA polymerase can incorporate a ddNTP into the growing strand, so size is not what stops the reaction. Extension stops afterwards, because the missing 3&prime;-OH leaves nothing for the next phosphodiester bond to form with.</p>'],
    ['The polymerase incorporates the ddNTP normally and only “stalls” because no further nucleotide can be added. The chain termination is a chemical consequence of the missing 3’-OH, not an enzyme dissociation event. In Sanger sequencing, random incorporation of fluorescently labeled ddNTPs produces fragments of every possible length, which are then separated by capillary electrophoresis.</p>',
     'Termination is a chemical consequence of the missing 3&prime;-OH group: once a ddNTP has been incorporated, no further nucleotide can be added. What the polymerase does next is beside the point. In Sanger sequencing, occasional incorporation of fluorescently labeled ddNTPs produces fragments of many different lengths, which are then separated by capillary electrophoresis.</p>'],
    [GENERIC_BIOTECH, points([
      'Normal chain extension requires a free 3&prime;-OH on the last nucleotide added.',
      'Occasional incorporation of a ddNTP, which has no 3&prime;-OH, creates terminated fragments of different lengths.',
      'In modern dye-terminator sequencing, the length of a fragment and the identity of its terminal base together read out the sequence.',
    ])],
  ],
},

// Q18 bio-147: tighten the scenario so that increasing expression is clearly
// not a useful alternative, and drop two absolute claims.
{
  q: 18, id: 'bio-147', expectLetter: 'D',
  stemFull: 'A genetic disorder results from a mutation that prevents production of a functional protein. Which gene-based intervention could restore the missing function?',
  explanation: [
    ['<p><strong>A. Removing all copies of the mutated gene from the genome:</strong> Current gene therapy technology cannot reliably remove all copies of a mutated gene from the genome. More importantly, for a loss-of-function mutation, removing the gene would make the problem worse, not better. The therapeutic goal is to restore the missing function by delivering a working copy of the gene. Techniques like CRISPR can potentially correct mutations in place, but wholesale gene removal is not the approach for loss-of-function disorders.</p>',
     '<p><strong>A. Removing all copies of the mutated gene from the genome:</strong> Deleting the defective gene does not itself supply the missing function. When no functional protein is being made, taking the gene away leaves the cell with even less to work from. The therapeutic goal is to restore the function, by delivering a working copy or by correcting the sequence in place.</p>'],
    ['<p><strong>B. Administering antibiotics to eliminate the phenotypic effects:</strong> Antibiotics treat bacterial infections by targeting bacterial cellular processes-they have no mechanism to correct or compensate for a genetic mutation. A loss-of-function genetic disorder (like cystic fibrosis or hemophilia) results from a defective protein, and antibiotics cannot restore that protein’s function. Gene therapy addresses the root cause by introducing a functional gene copy.</p>',
     '<p><strong>B. Administering antibiotics to eliminate the phenotypic effects:</strong> Ordinary antibiotic treatment addresses bacterial infection; it does not add a functional gene copy. The disorder described comes from a gene that cannot produce a working protein, which is not something an antibacterial drug sets out to fix.</p>'],
    ['<p><strong>C. Increasing the expression of the mutated gene:</strong> Increasing expression of a mutated (non-functional) gene would produce more of the defective protein, which would not help and could potentially be harmful. If the mutation produces a truncated or misfolded protein, overexpressing it could trigger cellular stress responses like the unfolded protein response. The correct approach is to introduce a normal, functional copy of the gene.</p>',
     '<p><strong>C. Increasing the expression of the mutated gene:</strong> In the scenario described, the allele produces no functional protein at all, so transcribing it harder simply makes more of something that does not work. It may also be harmful if the product is truncated or misfolded. The functional copy has to come from somewhere else.</p>'],
    [GENERIC_BIOTECH, points([
      'Gene addition supplies a functional copy of the gene rather than repairing the existing one.',
      'The added copy has to be expressed in the cells where the protein is needed.',
      'Gene addition and correction of the existing DNA sequence are different strategies with different requirements.',
    ])],
  ],
},

// Q19 bio-148: compatibility, not identity of enzyme, is what matters; and
// not every DNA ligase uses ATP.
{
  q: 19, id: 'bio-148', expectLetter: 'C',
  explanation: [
    ['T4 DNA ligase is used to join (ligate) a DNA insert into a linearized vector after both have been cut with the same restriction enzyme, creating a recombinant molecule.</p>',
     'T4 DNA ligase is used to join a DNA insert into a linearized vector once the two have compatible ends for the chosen ligation method, creating a recombinant molecule.</p>'],
    ['Restriction enzymes recognize specific palindromic sequences and cleave the phosphodiester backbone, producing either blunt ends or sticky (overhanging) ends.',
     'Many commonly used restriction enzymes recognize palindromic sequences, and they cleave the phosphodiester backbone to produce either blunt ends or sticky overhanging ends.'],
    [GENERIC_BIOTECH, points([
      'Ligase makes covalent phosphodiester bonds between a 3&prime;-OH and a 5&prime;-phosphate, sealing the backbone.',
      'Sticky ends pairing up is not the same thing as the backbone being sealed: base pairing holds the pieces together, and ligase joins them.',
      'Restriction enzymes cut; ligase joins. The two are opposite halves of cloning.',
    ])],
    ['<p class=\'exp-key\'>Bottom Line: DNA ligase is the \'molecular glue\' that joins DNA fragments. It requires compatible ends (from the same restriction enzyme) and ATP as a cofactor for the ligation reaction.</p>',
     '<p class=\'exp-key\'>Bottom Line: DNA ligase is the molecular glue that joins DNA fragments. The insert and vector need compatible ends for the chosen method: compatible overhangs can come from different enzymes, and blunt ends can be ligated under suitable conditions. T4 DNA ligase, the enzyme usually used in cloning, requires ATP.</p>'],
  ],
},

// Q20 bio-149: Ct is not inversely proportional to starting amount; the
// relationship is logarithmic and depends on comparable conditions.
{
  q: 20, id: 'bio-149', expectLetter: 'B',
  explanation: [
    ['The cycle at which fluorescence crosses a threshold (Ct value) is inversely proportional to the initial amount of template, allowing precise quantification.',
     'The threshold cycle (Ct) is reached earlier when more target DNA was present initially, provided the samples are tested under comparable conditions. The relationship is logarithmic rather than a simple reciprocal: at ideal doubling efficiency, a difference of one cycle corresponds to roughly a twofold difference in starting amount. Quantification also depends on calibration and normalization.'],
    [GENERIC_BIOTECH, points([
      'Fluorescence tracks the amount of product as the reaction cycles, rather than only at the end.',
      'A lower Ct generally means more target was present at the start, provided the assays are comparable.',
      'Analysing RNA requires a reverse transcription step before qPCR, which makes it RT-qPCR.',
    ])],
    ['<p class=\'exp-key\'>Bottom Line: qPCR quantifies the starting amount of template by measuring fluorescence increase during amplification. Lower Ct values indicate higher initial template concentrations.</p>',
     '<p class=\'exp-key\'>Bottom Line: qPCR estimates the starting amount of template by following the fluorescence increase during amplification. Under comparable conditions, a lower Ct means more target was present to begin with.</p>'],
  ],
},

// Q21 bio-150: option B's feedback was truncated to a fragment of a sentence.
{
  q: 21, id: 'bio-150', expectLetter: 'D',
  explanation: [
    ['This requires a thicker muscular wall (approximately 1.3–1.5 cm) compared to the right ventricle (approximately 0.3–0.5 cm).</p>',
     'This requires a thicker muscular wall than the right ventricle, which pumps into the lower-pressure pulmonary circulation.</p>'],
    ['<p><strong>B. Right ventricle:</strong> 5 cm) compared to the right ventricle (approximately 0.</p>',
     '<p><strong>B. Right ventricle:</strong> The right ventricle pumps blood into the lower-pressure pulmonary circulation, so its wall is thinner than the left ventricle&rsquo;s.</p>'],
    [GENERIC_CARDIO, points([
      'The left ventricle generates the higher pressure needed for the systemic circulation.',
      'The right ventricle pumps into the lower-pressure pulmonary circuit, so it needs less muscle.',
      'In a healthy steady state the two ventricles pump the same average volume, despite their very different wall thicknesses.',
    ])],
  ],
},

// Q22 bio-151: the old option D, "atrial diastole", overlaps the start of
// ventricular systole, so saying AV closure does not happen then is false.
{
  q: 22, id: 'bio-151', expectLetter: 'A',
  stemFull: 'The atrioventricular (AV) valves normally close at the beginning of which phase of the cardiac cycle?',
  optionFull: [[3, 'Isovolumetric relaxation of the ventricles']],
  headingsGone: ['D. Atrial diastole:'],
  explanation: [
    ['<p><strong>D. Atrial diastole:</strong> Atrial diastole is when the atria are relaxing and filling with blood returning from the veins. During most of atrial diastole, the AV valves are actually open, allowing passive blood flow from the atria into the ventricles (accounting for about 70–80% of ventricular filling). The AV valves close when the ventricles begin contracting, not during atrial relaxation.</p>',
     '<p><strong>D. Isovolumetric relaxation of the ventricles:</strong> At the start of isovolumetric relaxation, the semilunar valves close. The AV valves are already closed at that point and open later, when ventricular pressure falls below atrial pressure.</p>'],
    [GENERIC_CARDIO, points([
      'Heart valves open and close in response to pressure differences across them, not to nerve signals.',
      'AV valve closure marks the start of ventricular systole and contributes to the first heart sound, S1.',
      'During isovolumetric contraction all four valves are shut, so ventricular volume does not change even though the muscle is contracting.',
    ])],
  ],
},

// Q23 bio-152: PR spans more than AV-node conduction, so the distractors must
// not deny that the His-Purkinje system can prolong it.
{
  q: 23, id: 'bio-152', expectLetter: 'A',
  stemFull: 'An adult&rsquo;s ECG shows a PR interval of 0.24 seconds, with each P wave followed by a QRS complex. Which structure is the most common site of the conduction delay?',
  explanation: [
    ['A prolonged PR interval (first-degree heart block) most commonly results from delayed conduction through the AV node, which normally introduces a brief delay to allow complete atrial contraction before ventricular activation.</p>',
     'A prolonged PR interval with 1:1 conduction is first-degree AV delay, and it most commonly results from delayed conduction through the AV node, which normally introduces a brief pause so the atria can finish contracting before the ventricles are activated. Note that the PR interval covers atrial depolarization through the start of ventricular depolarization, so it is not a pure measurement of AV-node conduction.</p>'],
    ['Dysfunction of the Bundle of His typically causes bundle branch blocks, seen as a widened QRS complex on the ECG-not a prolonged PR interval. A prolonged PR interval (first-degree AV block) reflects delayed conduction specifically at the AV node.</p>',
     'Delay in the His-Purkinje system can also lengthen the PR interval, but it is less common than AV-nodal delay in this setting. Disease here more typically shows itself as a widened QRS complex.</p>'],
    ['Purkinje fiber dysfunction would cause widened or abnormal QRS complexes, not a prolonged PR interval. The PR interval is determined by conduction through the AV node, which physiologically delays the signal to allow complete atrial contraction before ventricular activation.</p>',
     'Delay in the Purkinje network is possible but is less common than AV-nodal delay as an explanation for a long PR interval, and it more typically produces widened or abnormal QRS complexes.</p>'],
    [GENERIC_CARDIO, points([
      'The PR interval is measured from the onset of the P wave to the onset of the QRS complex.',
      'In an adult, a PR interval over 0.20 seconds with 1:1 conduction is first-degree AV delay.',
      'AV-node delay is the common cause, but the PR interval alone does not prove where in the conduction system the delay lies.',
    ])],
    ['<p class=\'exp-key\'>Bottom Line: The PR interval reflects AV node conduction time; prolongation indicates impaired AV nodal conduction.</p>',
     '<p class=\'exp-key\'>Bottom Line: The PR interval runs from the start of atrial depolarization to the start of ventricular depolarization. Prolongation with 1:1 conduction is first-degree AV delay, most commonly at the AV node.</p>'],
  ],
},

// Q24 bio-153: the stronger contraction is a length-dependent response, not
// simply more actin-myosin overlap, and the heart does not pump whatever
// returns without limit.
{
  q: 24, id: 'bio-153', expectLetter: 'A',
  explanation: [
    ['<p>The Frank-Starling law states that the heart pumps whatever volume of blood returns to it. When end-diastolic volume increases, myocardial sarcomeres are stretched to a more optimal length, increasing the overlap of actin and myosin filaments and generating greater contractile force. This intrinsic mechanism operates without neural or hormonal input.</p>',
     '<p>Within the physiological range, greater ventricular filling increases end-diastolic volume and stretches cardiac muscle fibers. This length-dependent response produces a stronger contraction and a larger stroke volume, helping the heart match output to venous return. The mechanism is intrinsic to the myocardium and does not require increased sympathetic stimulation. Note the qualification: the relationship holds within physiological limits, rather than being an unlimited capacity to pump whatever arrives.</p>'],
    [GENERIC_CARDIO, points([
      'Greater filling of the ventricle means greater preload.',
      'Within physiological limits, increased preload produces a larger stroke volume.',
      'This differs from sympathetic stimulation, which increases contractility at any given filling level.',
    ])],
  ],
},

];
