/**
 * Batch 5 review, part D: displayed Q39-Q46 (bio-231 .. bio-238).
 * Includes the Q41 substantial repair. The generic immunology block covers
 * Q39-Q41 and the generic embryology block covers Q42-Q46.
 */
'use strict';

const GENERIC_IMMUNE =
  '<ul><li>Innate immunity provides rapid, non-specific defense (physical barriers, phagocytes, complement, inflammation), while adaptive immunity provides specific, slower but more targeted responses.</li>'
  + '<li>Adaptive immunity has two arms: humoral (B cells producing antibodies) and cell-mediated (T cells directly attacking infected/abnormal cells).</li>'
  + '<li>Immunological memory allows faster and stronger responses to previously encountered antigens - this is the basis of vaccination.</li></ul>';

const GENERIC_EMBRYO =
  '<ul><li>Human embryonic development proceeds through cleavage, gastrulation (three germ layer formation), neurulation, and organogenesis.</li>'
  + '<li>Gastrulation establishes the three primary germ layers (ectoderm, mesoderm, endoderm) that give rise to all tissues and organs.</li>'
  + '<li>Spermatogenesis produces four functional sperm from each primary spermatocyte; oogenesis produces one functional egg plus polar bodies from each primary oocyte.</li></ul>';

const points = items => '<ul>' + items.map(t => '<li>' + t + '</li>').join('') + '</ul>';

module.exports = [

// Q39 bio-231: not every asthma phenotype is IgE-mediated; histamine is
// preformed while leukotrienes and prostaglandins are newly synthesized; and
// the three distractor notes described only the cell, not the pairing.
{
  q: 39, id: 'bio-231', expectLetter: 'B',
  stemFull: 'Allergic reactions such as hay fever and allergic asthma are mediated primarily by which immunoglobulin class and which immune cell?',
  explanation: [
    ['cross-linking of surface-bound IgE triggers mast cell degranulation, releasing histamine, leukotrienes, and prostaglandins. These mediators cause',
     'cross-linking of surface-bound IgE activates the mast cell. Degranulation releases preformed mediators, principally histamine, and activation also stimulates synthesis of further mediators such as leukotrienes and prostaglandins. These mediators cause'],
    ['<p><strong>A. IgG and macrophages:</strong> Phagocytic cells that engulf pathogens and present antigens; part of innate immunity.</p>',
     '<p><strong>A. IgG and macrophages:</strong> IgG works mainly through neutralization, opsonization and complement activation, and macrophages are phagocytes and antigen-presenting cells. Neither is the receptor-bound antibody and effector cell of immediate hypersensitivity.</p>'],
    ['<p><strong>C. IgA and neutrophils:</strong> Most abundant white blood cells; first responders in acute inflammation.</p>',
     '<p><strong>C. IgA and neutrophils:</strong> IgA acts chiefly at mucosal surfaces and in secretions, and neutrophils are the first responders of acute inflammation. This pair does not drive immediate allergic reactions.</p>'],
    ['<p><strong>D. IgM and natural killer cells:</strong> Innate immune cells that kill abnormal cells without prior sensitization.</p>',
     '<p><strong>D. IgM and natural killer cells:</strong> IgM is the first class secreted in a primary response and activates complement well, while NK cells kill abnormal cells without prior sensitization. Neither mediates the immediate allergic response.</p>'],
    [GENERIC_IMMUNE, points([
      'During sensitization, allergen-specific IgE binds high-affinity receptors on mast cells.',
      'Re-exposure can cross-link this bound IgE and activate the mast cell.',
      'Histamine and other mediators produce the symptoms of immediate hypersensitivity; allergic asthma is one possible manifestation.',
    ])],
  ],
},

// Q40 bio-232: a retrovirus integrates a DNA copy, not its RNA genome; CD4
// help is important but not an absolute prerequisite for every response; and
// the CD4 count below 200 is not the only route to an AIDS diagnosis.
{
  q: 40, id: 'bio-232', expectLetter: 'C',
  explanation: [
    ['As a retrovirus, HIV integrates its RNA genome (converted to DNA by reverse transcriptase) into the host cell\'s DNA. Progressive destruction of CD4+ T cells undermines the entire adaptive immune system because helper T cells are essential for activating both cytotoxic T cells and B cells. When CD4+ counts fall below 200 cells/μL, the patient is diagnosed with AIDS.</p>',
     'As a retrovirus, HIV uses reverse transcriptase to make a DNA copy of its RNA genome, and integrase then inserts that viral DNA into the host cell\'s DNA. Progressive loss of CD4+ T cells weakens immune coordination, because helper T cells support and coordinate the activation of B cells and cytotoxic T cells. Untreated HIV infection can progress to AIDS, with increasing susceptibility to opportunistic infections.</p>'],
    ['<p><strong>A. B lymphocytes:</strong> Produce antibodies (humoral immunity) but do not directly kill infected cells.</p>',
     '<p><strong>A. B lymphocytes:</strong> B lymphocytes produce antibody and do not carry the CD4 receptor that HIV uses for entry. Antibody responses are weakened indirectly, through the loss of helper T cell support.</p>'],
    ['<p><strong>B. Cytotoxic T cells (CD8+):</strong> Directly kill virus-infected and tumor cells using perforin and granzymes.</p>',
     '<p><strong>B. Cytotoxic T cells (CD8+):</strong> CD8 T cells kill virus-infected cells using perforin and granzymes, and they are part of the response against HIV rather than its main target. They do not express CD4.</p>'],
    ['<p><strong>D. Natural killer cells:</strong> Innate immune cells that kill abnormal cells without prior sensitization.</p>',
     '<p><strong>D. Natural killer cells:</strong> NK cells kill abnormal cells without prior sensitization and are innate effectors. They are not the CD4-expressing cells that HIV principally infects.</p>'],
    [GENERIC_IMMUNE, points([
      'HIV infects CD4-expressing cells and progressively damages helper-T-cell function without effective treatment.',
      'Loss of CD4 support weakens immune coordination and increases susceptibility to opportunistic infections.',
      'HIV uses reverse transcription and integration of viral DNA; effective treatment can suppress replication and prevent progression.',
    ])],
  ],
},

// Q41 bio-233: SUBSTANTIAL REPAIR. The item lumped IFN-gamma (a type II
// interferon) into a type I, virus-infected-cell account; it also named PKR
// and OAS as the RNA-degrading enzymes, and options C and D carried feedback
// copied from unrelated questions.
{
  q: 41, id: 'bio-233', expectLetter: 'B',
  stemFull: 'Type I interferons, such as IFN-alpha and IFN-beta, released in response to viral infection help limit viral spread primarily by which mechanism?',
  explanationFull:
    '<h4>Correct Answer: B) They signal neighboring cells to activate antiviral defenses, inhibiting viral replication</h4>'
    + '<p>Type I interferons are signaling proteins that induce antiviral defenses in cells, including neighboring uninfected ones. These defenses can inhibit viral protein production and promote degradation of viral RNA, reducing viral replication and spread. Interferons do not directly destroy extracellular viruses. IFN-gamma is a type II interferon with a different main production and immune-function context.</p>'
    + '<h4>Why the other choices are wrong:</h4>'
    + '<p><strong>A. They directly kill viruses in the bloodstream:</strong> Interferons are signaling proteins, not antiviral weapons that attack virus particles. The antiviral effect occurs inside the cells that receive the interferon signal, where induced proteins block viral protein synthesis and promote degradation of viral RNA.</p>'
    + '<p><strong>C. They stimulate B cells to produce antibodies immediately:</strong> Antibody production requires B-cell activation and differentiation. Immediate antibody production is not the main antiviral mechanism of type I interferons.</p>'
    + '<p><strong>D. They promote histamine release from mast cells:</strong> Mast-cell histamine release is central to immediate allergy. It is not the main antiviral effect of type I interferons.</p>'
    + '<h4>Key Educational Points:</h4>'
    + points([
      'IFN-alpha and IFN-beta are type I interferons involved in early antiviral defense.',
      'They induce antiviral programs in responding cells, including neighboring cells, limiting viral replication.',
      'They act through cellular signaling, not by directly killing viruses or immediately producing antibodies.',
    ])
    + '<p class=\'exp-key\'>Bottom Line: Type I interferons help establish an antiviral state in responding cells and limit viral spread.</p>',
},

// Q42 bio-234: it is sustained high estradiol that switches to positive
// feedback, and the hour count did not say whether it referred to the onset
// or the peak of the surge.
{
  q: 42, id: 'bio-234', expectLetter: 'B',
  explanation: [
    ['which occurs approximately 24–36 hours before the dominant follicle ruptures and releases the secondary oocyte (around day 14 of a 28-day cycle). The LH surge is itself triggered by rising estrogen levels from the developing follicle, which switch from negative to positive feedback on the hypothalamus and pituitary at high concentrations.',
     'which shortly precedes rupture of the dominant follicle and release of the secondary oocyte (around day 14 of a typical 28-day cycle). The surge follows a period of sustained high estradiol from the developing follicle, which switches feedback on the hypothalamus and pituitary from negative to positive.'],
    [GENERIC_EMBRYO, points([
      'FSH supports follicular development and rising estradiol production.',
      'Sustained high estradiol switches to positive feedback, helping produce the mid-cycle LH surge.',
      'The LH surge triggers ovulation and luteinization of the remaining follicular cells.',
    ])],
  ],
},

// Q43 bio-235: name tight junctions between Sertoli cells as the cellular
// basis of the blood-testis barrier; option A held a lowercased copy.
{
  q: 43, id: 'bio-235', expectLetter: 'B',
  explanation: [
    ['Sertoli cells (sustentacular cells) form the blood-testis barrier and provide physical support,',
     'Sertoli cells (sustentacular cells) form the blood-testis barrier through tight junctions between adjacent Sertoli cells, and provide physical support,'],
    ['<p><strong>A. Leydig cells:</strong> Leydig cells are located in the interstitial tissue between tubules and produce testosterone in response to lh.</p>',
     '<p><strong>A. Leydig cells:</strong> Leydig cells lie in the interstitial tissue between the tubules and produce testosterone in response to LH. They are not inside the seminiferous epithelium and do not support the developing germ cells directly.</p>'],
    ['They also contribute to the blood-testis barrier by producing components of the tubular basement membrane.</p>',
     'They contribute components of the tubular basement membrane, but the main cellular basis of the blood-testis barrier is the tight junctions between adjacent Sertoli cells.</p>'],
    [GENERIC_EMBRYO, points([
      'Sertoli cells support and nourish developing germ cells within seminiferous tubules.',
      'Tight junctions between Sertoli cells contribute to the blood-testis barrier.',
      'FSH acts on Sertoli cells, which produce inhibin B; LH acts on Leydig cells to stimulate testosterone production.',
    ])],
  ],
},

// Q44 bio-236: a cervical pregnancy is not inside the uterine cavity, and
// ectopic location describes where implantation occurs rather than where
// fertilization took place.
{
  q: 44, id: 'bio-236', expectLetter: 'B',
  explanation: [
    ['where it implants as a blastocyst approximately 6–7 days after fertilization.</p>',
     'where implantation of the blastocyst in the endometrium begins roughly 6 to 7 days after fertilization.</p>'],
    ['The blastocyst implants in the endometrium, which has been prepared by progesterone. If an ectopic pregnancy occurs in the uterine cavity (e.g., cervical pregnancy), it is still abnormal. Normal implantation occurs in the uterine fundus or body.</p>',
     'The blastocyst implants in the endometrium, which has been prepared by progesterone, normally in the uterine fundus or body. Fertilization in the ampulla and implantation in the endometrium are two different events, separated by about a week.</p>'],
    ['The fimbriae of the fallopian tube sweep the oocyte off the ovarian surface and into the tube. If fertilization occurred on the ovarian surface and the embryo implanted there, it would result in an ovarian ectopic pregnancy, a rare and dangerous condition.</p>',
     'The fimbriae of the fallopian tube sweep the oocyte off the ovarian surface and into the tube, where fertilization normally takes place. An ovarian ectopic pregnancy is defined by implantation at the ovary, which is a statement about where implantation occurs rather than where fertilization did.</p>'],
    [GENERIC_EMBRYO, points([
      'Fertilization usually occurs in the ampulla of the uterine tube.',
      'Cleavage occurs while the early embryo travels toward the uterus.',
      'Implantation normally begins in the endometrium roughly a week after fertilization; fertilization and implantation are different events.',
    ])],
    ['<p class=\'exp-key\'>Bottom Line: Fertilization occurs in the ampulla of the fallopian tube; implantation occurs in the uterus approximately 6–7 days later.</p>',
     '<p class=\'exp-key\'>Bottom Line: Fertilization occurs in the ampulla of the uterine tube; implantation in the endometrium begins roughly a week later.</p>'],
  ],
},

// Q45 bio-237: the corpus luteum does secrete inhibin, particularly inhibin
// A, so option D cannot be rejected by claiming both hormones are absent.
// Luteal rescue is by hCG from an implanting conceptus.
{
  q: 45, id: 'bio-237', expectLetter: 'B',
  explanation: [
    ['moderate amounts of estrogen during the luteal phase (days 15–28).',
     'moderate amounts of estrogen during the luteal phase (illustratively days 15 to 28 of a typical cycle). It also secretes inhibin A.'],
    ['If fertilization does not occur, the corpus luteum degenerates after about 10–12 days, causing progesterone levels to fall and menstruation to begin.</p>',
     'Without rescue by hCG from an implanting conceptus, the corpus luteum regresses after roughly 10 to 12 days, progesterone falls, and menstruation follows.</p>'],
    ['<p><strong>D. Testosterone and inhibin:</strong> Testosterone and inhibin are both produced in significant quantities by the testes, not by the corpus luteum. Testosterone is produced by Leydig cells, and inhibin is secreted by Sertoli cells. While the ovaries do produce small amounts of androgens and inhibin (from granulosa cells), these are not the primary hormones of the corpus luteum.</p>',
     '<p><strong>D. Testosterone and inhibin:</strong> The corpus luteum can secrete inhibin A, but testosterone and inhibin are not its principal hormone pair. Its major steroid products are progesterone and estrogen.</p>'],
    [GENERIC_EMBRYO, points([
      'LH promotes formation of the corpus luteum after ovulation.',
      'Luteal progesterone, with estrogen, supports the endometrium; the corpus luteum also secretes inhibin A.',
      'hCG maintains the corpus luteum in early pregnancy; without sufficient rescue, luteal regression lowers hormone levels and menstruation follows.',
    ])],
  ],
},

// Q46 bio-238: the prostate is not an external genital structure, and voice
// deepening is predominantly testosterone-mediated. Option A held a
// lowercased copy of a main-explanation sentence.
{
  q: 46, id: 'bio-238', expectLetter: 'C',
  explanation: [
    ['DHT is responsible for external genitalia masculinization.',
     'DHT, formed from testosterone, supports masculinization of the external genitalia and development of the prostate.'],
    ['<p><strong>A. Testosterone:</strong> Testosterone from leydig cells promotes development of the wolffian (mesonephric) ducts into the epididymis, vas deferens, and seminal vesicles.</p>',
     '<p><strong>A. Testosterone:</strong> Testosterone from Leydig cells promotes differentiation of the Wolffian (mesonephric) ducts into the epididymis, vas deferens and seminal vesicles. It does not cause Mullerian-duct regression, which is the role of AMH.</p>'],
    ['DHT is responsible for masculinization of the external genitalia (penis, scrotum, prostate) during fetal development and later drives secondary sexual characteristics like male-pattern hair growth and voice deepening at puberty. DHT does not cause Mullerian duct regression; that is specifically AMH\'s role.',
     'DHT supports development of the male external genitalia and of the prostate during fetal development. It does not cause Mullerian duct regression; that is specifically AMH\'s role.'],
    [GENERIC_EMBRYO, points([
      'Fetal Sertoli-cell AMH causes Mullerian-duct regression.',
      'Leydig-cell testosterone supports Wolffian-duct differentiation.',
      'DHT, formed from testosterone, supports masculinization of external genitalia and prostate development.',
    ])],
  ],
},

];
