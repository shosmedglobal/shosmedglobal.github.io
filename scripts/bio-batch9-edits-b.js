/**
 * Biology review batch 9, displayed Q11-Q19 (bio-483 .. bio-491).
 * Q13 (bio-485, lac structural genes) and Q20 (bio-492, meiotic
 * nondisjunction) are KEEP UNCHANGED per the review and so are absent from
 * this module by design.
 */
'use strict';

module.exports = [
  // ---- Q11  bio-483  transposons ----------------------------------------
  {
    q: 11, id: 'bio-483', expectLetter: 'A',
    explanation: [
      ['In bacteria, complex transposons often carry antibiotic resistance genes flanked by insertion sequences (IS elements).',
        'Composite transposons can carry genes, such as antibiotic-resistance genes, between two insertion sequences. Other transposons can also carry accessory genes without having this two-IS arrangement.'],
      ['Transposons are not part of the normal DNA replication machinery. DNA replication requires DNA polymerase III (and I), helicase, primase, ligase, and other replication proteins encoded by chromosomal genes. Transposons are accessory elements and many bacteria function perfectly well without them.',
        'Transposons are not part of the normal DNA replication machinery. Ordinary chromosome replication depends on the cell\'s own replication machinery and does not require transposition. Transposons are accessory elements, and many bacteria function perfectly well without them.'],
      ['<p><strong>C. Replace the function of RNA polymerase during transcription:</strong> Transposons do not participate in transcription. They encode transposase (the enzyme that catalyzes their movement) and sometimes carry accessory genes, but they do not replace core transcription machinery.</p>',
        '<p><strong>C. Replace the function of RNA polymerase during transcription:</strong> Transposons do not replace RNA polymerase. Their movement uses transposition machinery, and insertion can alter nearby gene expression. Transcription of cellular and transposon genes still uses RNA polymerase.</p>'],
      ['<li>Complex transposons = carry additional genes (often antibiotic resistance) between two IS elements</li>',
        '<li>Composite transposons carry additional genes, often antibiotic resistance, between two insertion sequences; other transposons can carry accessory genes without that arrangement</li>'],
      ['<li>Transposons create target site duplications when they insert</li>',
        '<li>Many transposons generate short target-site duplications when they insert</li>']
    ],
    keepHeadings: ['<strong>B. Are required for normal DNA replication in all bacteria:</strong>', '<strong>C. Replace the function of RNA polymerase during transcription:</strong>'],
    gone: ['complex transposons often carry antibiotic resistance genes flanked by insertion sequences',
      'DNA polymerase III (and I), helicase, primase, ligase', 'Complex transposons = carry additional genes',
      'Transposons create target site duplications', 'they do not replace core transcription machinery']
  },

  // ---- Q12  bio-484  competence and Griffith ----------------------------
  {
    q: 12, id: 'bio-484', expectLetter: 'D',
    explanation: [
      ['<p><strong>A. The ability of a bacteriophage to integrate its DNA into the host chromosome:</strong> This describes lysogeny, the process by which a temperate bacteriophage (like lambda phage) integrates its genome into the host chromosome to form a prophage. This is a phage property, not a bacterial competence mechanism.</p>',
        '<p><strong>A. The ability of a bacteriophage to integrate its DNA into the host chromosome:</strong> This describes integration of phage DNA into a bacterial chromosome, as occurs when lambda establishes a prophage. Competence instead concerns the bacterium\'s ability to take up free DNA from its surroundings.</p>'],
      ['<p><strong>C. The ability of a plasmid to replicate independently of the chromosome:</strong> This is a fundamental property of all plasmids - they have their own origin of replication (ori) that allows autonomous replication. This is unrelated to transformation or competence.</p>',
        '<p><strong>C. The ability of a plasmid to replicate independently of the chromosome:</strong> A plasmid\'s replication origin allows its DNA to be replicated as a separate replicon. Competence refers to DNA uptake, not to how DNA subsequently replicates. A competent bacterium may take up plasmid DNA during transformation.</p>'],
      ['<li>Griffith\'s experiment (1928): demonstrated transformation in Streptococcus pneumoniae (smooth → rough)</li>',
        '<li>Griffith\'s experiment (1928): material from heat-killed smooth bacteria transformed living rough Streptococcus pneumoniae into virulent smooth bacteria</li>']
    ],
    keepHeadings: ['<strong>A. The ability of a bacteriophage to integrate its DNA into the host chromosome:</strong>',
      '<strong>C. The ability of a plasmid to replicate independently of the chromosome:</strong>'],
    gone: ['Streptococcus pneumoniae (smooth → rough)', 'This is unrelated to transformation or competence',
      'This is a phage property, not a bacterial competence mechanism']
  },

  // ---- Q14  bio-486  negative regulation (stem and option C) ------------
  {
    q: 14, id: 'bio-486', expectLetter: 'C',
    stemFull: 'In negative transcriptional regulation of a bacterial gene, what is the role of a repressor?',
    optionFull: [[2, 'A repressor binds regulatory DNA and reduces transcription']],
    explanation: [
      ['<h4>Correct Answer: A repressor protein binds the operator to block transcription, and transcription occurs when the repressor is removed</h4>',
        '<h4>Correct Answer: A repressor binds regulatory DNA and reduces transcription</h4>'],
      ['<p>In negative gene regulation, the default state is that a repressor protein binds to the operator and blocks RNA polymerase from transcribing the downstream genes. Transcription is "turned on" by removing the repressor - either through an inducer (as in the lac operon, where allolactose inactivates the repressor) or by depleting a corepressor (as in the trp operon, where lack of tryptophan leaves the repressor inactive).</p>',
        '<p>Negative transcriptional regulation uses a repressor to reduce gene transcription. Binding of the repressor to regulatory DNA can interfere with productive transcription by RNA polymerase. Whether the repressor is active depends on the regulatory system and its signals. For example, allolactose reduces lac-repressor activity, whereas tryptophan helps activate the trp repressor.</p>'],
      ['<p><strong>A. An activator protein binds the promoter to stimulate RNA polymerase binding:</strong> This describes POSITIVE gene regulation. In positive regulation, transcription requires an activator protein to help RNA polymerase bind. An example is the CAP-cAMP complex, which binds upstream of the lac operon promoter and enhances RNA polymerase recruitment when glucose is low.</p>',
        '<p><strong>A. An activator protein binds the promoter to stimulate RNA polymerase binding:</strong> This describes positive gene regulation. An activator enhances transcription, as the CAP-cAMP complex does when it binds upstream of the lac operon promoter while glucose is low. Positive regulation does not mean a gene has no expression at all without its activator.</p>'],
      ['<p><strong>B. Transcription is always on and cannot be turned off:</strong> This describes constitutive gene expression, not regulated gene expression. Most genes in bacteria are regulated, but some housekeeping genes (like those for ribosomal proteins) are expressed more or less constitutively.</p>',
        '<p><strong>B. Transcription is always on and cannot be turned off:</strong> A gene that cannot respond to regulatory signals does not illustrate repression. Negative regulation allows a repressor to reduce transcription under particular conditions.</p>'],
      ['<p><strong>D. Small RNA molecules degrade mRNA before it can be translated:</strong> This describes post-transcriptional regulation (e.g., RNA interference in eukaryotes or small regulatory RNAs in bacteria). While this is a real regulatory mechanism, it is not what defines negative gene regulation at the transcriptional level.</p>',
        '<p><strong>D. Small RNA molecules degrade mRNA before it can be translated:</strong> Small RNAs can reduce protein production by interfering with translation or promoting mRNA degradation. That is regulation after an RNA has been made, rather than the repressor-mediated control of transcription asked about here.</p>'],
      ['<tr><td>Negative inducible</td><td>Repressor blocks transcription; inducer removes repressor</td><td>lac operon (allolactose = inducer)</td></tr>',
        '<tr><td>Negative inducible</td><td>Repressor reduces transcription; inducer lowers repressor activity</td><td>lac operon (allolactose = inducer)</td></tr>'],
      ['<p class=\'exp-key\'>Bottom Line: Negative gene regulation uses a repressor protein to block transcription; the gene is expressed only when the repressor is inactivated or removed.</p>',
        '<p class=\'exp-key\'>Bottom Line: Negative transcriptional regulation uses a repressor to reduce transcription; the signal controlling the repressor differs between systems.</p>']
    ],
    gone: ['In negative gene regulation, how is transcription typically controlled',
      'A repressor protein binds the operator to block transcription, and transcription occurs when the repressor is removed',
      'the default state is that a repressor protein binds', 'like those for ribosomal proteins',
      'RNA interference in eukaryotes']
  },

  // ---- Q15  bio-487  Hfr strains ----------------------------------------
  {
    q: 15, id: 'bio-487', expectLetter: 'D',
    explanation: [
      ['When an Hfr cell conjugates with an F− cell, it begins transferring the chromosomal DNA starting from the integrated F origin of transfer (oriT). Because the F genes are split across the end of the transferred DNA, the recipient usually does not receive the complete F plasmid and remains F−.',
        'When an Hfr cell conjugates with an F− cell, transfer begins at an origin within the integrated F sequence. Chromosomal DNA is transferred before the remaining F sequence can arrive, and the connection usually breaks before the whole chromosome and complete F sequence are transferred. The recipient therefore usually remains F−.'],
      ['A protoplast (or spheroplast) is a bacterium that has lost its cell wall (e.g., by lysozyme treatment). This has no relationship to F plasmid biology or Hfr formation.',
        'A protoplast is a bacterium whose cell wall has been removed (e.g., by lysozyme treatment). That is distinct from integrating F DNA into the chromosome.']
    ],
    gone: ['the F genes are split across the end of the transferred DNA', 'A protoplast (or spheroplast)']
  },

  // ---- Q16  bio-488  cri-du-chat (stem replaced) ------------------------
  {
    q: 16, id: 'bio-488', expectLetter: 'C',
    stemFull: 'A newborn has microcephaly, a high-pitched cry resembling a cat, and facial abnormalities. Which chromosomal abnormality is most consistent with these findings?',
    explanation: [
      ['The characteristic cat-like cry is NOT a feature of trisomy 18. Most affected infants die within the first year.',
        'The characteristic cat-like cry is not a feature of trisomy 18, which is associated with high fetal and infant mortality, with variable survival.'],
      ['There is no cat-like cry. Most affected infants die within the first month.',
        'There is no cat-like cry. Trisomy 13 is also associated with high fetal and infant mortality, with variable survival.'],
      ['<li>Cri-du-chat = 5p deletion (remember: 5 letters in "chat" → chromosome 5)</li>',
        '<li>5p− means loss of material from the short arm of chromosome 5; p denotes the short arm</li>'],
      ['<p class=\'exp-key\'>Bottom Line: A high-pitched cat-like cry with microcephaly and intellectual disability is the classic presentation of cri-du-chat syndrome (5p deletion).</p>',
        '<p class=\'exp-key\'>Bottom Line: A high-pitched cat-like cry with microcephaly and facial abnormalities is the classic presentation of cri-du-chat syndrome (5p deletion); intellectual disability becomes apparent as the child develops.</p>']
    ],
    gone: ['A newborn presents with severe intellectual disability, microcephaly', '5 letters in "chat"',
      'die within the first year', 'die within the first month']
  },

  // ---- Q17  bio-489  Edwards versus Patau (stem replaced) ---------------
  {
    q: 17, id: 'bio-489', expectLetter: 'C',
    stemFull: 'Which combination of findings is more characteristic of Patau syndrome (trisomy 13) than of Edwards syndrome (trisomy 18)?',
    explanation: [
      ['<p>Polydactyly (extra digits) and cleft lip/palate are characteristic features of Patau syndrome (trisomy 13), NOT Edwards syndrome (trisomy 18). Edwards syndrome is characterized by clenched fists with overlapping fingers (index finger overlaps the 3rd, and 5th overlaps the 4th), rocker-bottom feet, micrognathia, prominent occiput, and severe congenital heart defects.</p>',
        '<p>Polydactyly with cleft lip or palate is a classic association with trisomy 13. Trisomy 18 is particularly associated with clenched hands and overlapping fingers, along with rocker-bottom feet, micrognathia and a prominent occiput. Both conditions can cause multiple congenital abnormalities, including heart defects, and their features can overlap. The question asks which association is more characteristic, not which finding is exclusive to one syndrome.</p>'],
      ['<p><strong>A. Clenched fists with overlapping fingers:</strong> This is a CLASSIC finding in Edwards syndrome. The distinctive pattern of overlapping fingers (2nd over 3rd, 5th over 4th) is highly characteristic and is an important clinical clue for prenatal and neonatal diagnosis.</p>',
        '<p><strong>A. Clenched fists with overlapping fingers:</strong> The distinctive pattern of overlapping fingers (2nd over 3rd, 5th over 4th) strongly suggests trisomy 18 rather than trisomy 13, so it is not the combination asked for here.</p>'],
      ['<p><strong>B. Rocker-bottom feet:</strong> Rocker-bottom feet (a rounded convexity of the sole) is another hallmark of Edwards syndrome. The calcaneus is prominent and the sole appears rounded. This finding helps distinguish trisomy 18 from other chromosomal disorders.</p>',
        '<p><strong>B. Rocker-bottom feet:</strong> Rocker-bottom feet (a rounded convexity of the sole, with a prominent calcaneus) are associated with trisomy 18, but they are not exclusive to it and can also occur in trisomy 13. They do not identify the association that is more characteristic of trisomy 13.</p>'],
      ['<p><strong>D. Severe intellectual disability and heart defects:</strong> Both are present in Edwards syndrome. Virtually all affected individuals have severe intellectual disability. Congenital heart defects (especially ventricular septal defect, VSD) are present in over 90% of cases and are a major cause of early death.</p>',
        '<p><strong>D. Severe intellectual disability and heart defects:</strong> Developmental impairment and congenital heart defects occur in both trisomy 18 and trisomy 13, so they do not distinguish between the two syndromes.</p>'],
      ['<tr><td>Hands</td><td>Simian crease</td><td>Clenched, overlapping fingers</td><td>Polydactyly</td></tr>',
        '<tr><td>Hands</td><td>Single transverse palmar crease</td><td>Clenched, overlapping fingers</td><td>Polydactyly</td></tr>'],
      ['<tr><td>Survival</td><td>Into adulthood</td><td>Median ~10 days</td><td>Median ~7 days</td></tr>', ''],
      ['<p class=\'exp-key\'>Bottom Line: Polydactyly and cleft lip/palate are features of trisomy 13 (Patau), not trisomy 18 (Edwards). Edwards syndrome features clenched overlapping fingers and rocker-bottom feet.</p>',
        '<p class=\'exp-key\'>Bottom Line: Overlapping fingers classically suggest trisomy 18; polydactyly with cleft lip or palate classically suggests trisomy 13. These associations are not absolute diagnostic rules.</p>']
    ],
    keepHeadings: ['<strong>A. Clenched fists with overlapping fingers:</strong>', '<strong>B. Rocker-bottom feet:</strong>',
      '<strong>D. Severe intellectual disability and heart defects:</strong>'],
    gone: ['characterized by all of the following EXCEPT', 'Simian crease', 'Median ~10 days',
      'Virtually all affected individuals', 'over 90% of cases']
  },

  // ---- Q18  bio-490  Turner syndrome ------------------------------------
  {
    q: 18, id: 'bio-490', expectLetter: 'C',
    explanation: [
      ['<p>This presentation is classic for Turner syndrome (45,X or 45,XO). Features include short stature (often < 5 feet), primary amenorrhea (due to streak gonads with no functional ovarian tissue), webbed neck (cystic hygroma remnant), shield chest with widely spaced nipples, coarctation of the aorta, horseshoe kidney, and lymphedema of hands and feet at birth. Intelligence is typically normal, though spatial reasoning may be affected.</p>',
        '<p>This presentation is classic for Turner syndrome (45,X). Features include short stature, webbed neck (a cystic hygroma remnant), shield chest with widely spaced nipples, and lymphedema of the hands and feet at birth; coarctation of the aorta and horseshoe kidney can occur. Ovarian insufficiency is common in Turner syndrome and often causes absent or incomplete puberty and primary amenorrhea. Some individuals, particularly those with mosaicism, retain ovarian function. Intelligence is typically normal, though spatial reasoning may be affected.</p>'],
      ['<p><strong>A. 47,XXX (Triple X syndrome):</strong> Triple X females are typically tall, have normal fertility, and are often phenotypically normal. They may have mild learning difficulties, but they do NOT have short stature, webbed neck, or amenorrhea. Most 47,XXX women are never diagnosed because the phenotype is so mild.</p>',
        '<p><strong>A. 47,XXX (Triple X syndrome):</strong> 47,XXX often has few obvious physical findings and is commonly associated with taller stature. Reproductive function is often normal, although ovarian insufficiency can occur. The combination of short stature, webbed neck and primary amenorrhea is more characteristic of Turner syndrome.</p>'],
      ['Affected individuals are phenotypically male (though with some female secondary characteristics) - tall stature, small testes, gynecomastia, infertility, and often reduced body hair.',
        'The typical pattern is male development with tall stature, small testes, reduced testosterone, possible gynecomastia, impaired fertility and often reduced body hair.'],
      ['<li>Turner syndrome is the only viable monosomy in humans (all autosomal monosomies are lethal)</li>',
        '<li>45,X is compatible with live birth. Complete nonmosaic autosomal monosomies generally result in pregnancy loss</li>'],
      ['<li>~99% of 45,X conceptions end in spontaneous abortion; Turner syndrome is actually rare at birth</li>',
        '<li>Many 45,X pregnancies end in pregnancy loss; features among individuals born with Turner syndrome vary</li>']
    ],
    keepHeadings: ['<strong>A. 47,XXX (Triple X syndrome):</strong>', '<strong>B. 47,XXY (Klinefelter syndrome):</strong>'],
    gone: ['45,XO', 'streak gonads with no functional ovarian tissue', 'female secondary characteristics',
      'only viable monosomy', '~99% of 45,X conceptions']
  },

  // ---- Q19  bio-491  Klinefelter syndrome -------------------------------
  {
    q: 19, id: 'bio-491', expectLetter: 'A',
    explanation: [
      ['<p>Klinefelter syndrome (47,XXY) is the most common sex chromosome disorder in males, occurring in approximately 1 in 600 male births. Key features include tall stature with long limbs, small firm testes, gynecomastia (breast development), infertility due to azoospermia (absence of sperm), reduced facial and body hair, and sometimes mild learning difficulties. Testosterone levels are reduced and FSH/LH are elevated.</p>',
        '<p>Klinefelter syndrome (47,XXY) is a common chromosomal cause of primary testicular insufficiency and male infertility. Typical features include tall stature with long limbs, small firm testes, gynecomastia (breast development), impaired sperm production often with azoospermia, reduced facial and body hair, and sometimes mild learning difficulties. Testosterone is typically reduced and FSH and LH raised. Clinical features vary, and some individuals have only mild findings.</p>'],
      ['<p><strong>C. Polydactyly, cleft lip, and holoprosencephaly:</strong> These are features of Patau syndrome (trisomy 13), an autosomal chromosome disorder. Polydactyly and midline defects are not associated with sex chromosome aneuploidies.</p>',
        '<p><strong>C. Polydactyly, cleft lip, and holoprosencephaly:</strong> These are classic associations of Patau syndrome (trisomy 13), an autosomal chromosome disorder. Polydactyly and midline abnormalities point there rather than to a sex-chromosome disorder.</p>'],
      ['About 64% of 47,XXY males are never diagnosed, however, because the features can be subtle.',
        'Many individuals remain undiagnosed, however, because the features can be mild.'],
      ['<li>Most common cause of male hypogonadism and infertility</li>',
        '<li>Klinefelter syndrome is a common chromosomal cause of primary testicular insufficiency and male infertility</li>']
    ],
    keepHeadings: ['<strong>C. Polydactyly, cleft lip, and holoprosencephaly:</strong>', '<strong>D. Normal male phenotype with no clinical manifestations:</strong>'],
    gone: ['the most common sex chromosome disorder in males', 'Most common cause of male hypogonadism',
      'About 64% of 47,XXY males', 'not associated with sex chromosome aneuploidies']
  }
];
