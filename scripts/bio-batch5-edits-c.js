/**
 * Batch 5 review, part C: displayed Q25-Q38 (bio-216 .. bio-229).
 * Q27 (bio-218) needs no change and is absent by design.
 * The generic immunology block is replaced in Q33-Q38; Q25-Q32 keep their
 * individual blocks, corrected where the review identifies an inaccuracy.
 */
'use strict';

const GENERIC_IMMUNE =
  '<ul><li>Innate immunity provides rapid, non-specific defense (physical barriers, phagocytes, complement, inflammation), while adaptive immunity provides specific, slower but more targeted responses.</li>'
  + '<li>Adaptive immunity has two arms: humoral (B cells producing antibodies) and cell-mediated (T cells directly attacking infected/abnormal cells).</li>'
  + '<li>Immunological memory allows faster and stronger responses to previously encountered antigens - this is the basis of vaccination.</li></ul>';

const points = items => '<ul>' + items.map(t => '<li>' + t + '</li>').join('') + '</ul>';

module.exports = [

// Q25 bio-216: the rod feedback was truncated mid-sentence at "120 million
// vs.", and rods are absent specifically from the central fovea.
{
  q: 25, id: 'bio-216', expectLetter: 'B',
  explanation: [
    ['Rod cells are more numerous (about 120 million vs. 6 million cones) but function in dim light (scotopic vision) and do not detect color.</p>',
     'Rod cells function in dim light (scotopic vision) and do not detect color.</p>'],
    ['<p><strong>A. Rod cells:</strong> Rod cells are more numerous (about 120 million vs.</p>',
     '<p><strong>A. Rod cells:</strong> Rods are highly sensitive in dim light but do not provide color discrimination. Cones support color vision and high visual acuity in brighter light.</p>'],
    ['<li>Rods are far more numerous - about 120 million versus 6 million cones - but give monochromatic dim-light (scotopic) vision.</li>',
     '<li>Rods are far more numerous than cones, but give monochromatic dim-light (scotopic) vision.</li>'],
    ['<li>Rods are absent from the fovea, which is why a faint star is easier to see slightly off-centre.</li>',
     '<li>Rods are absent from the central fovea, which is why a faint star is easier to see slightly off-centre.</li>'],
  ],
},

// Q26 bio-217: "bending the stereocilia against the tectorial membrane"
// implies the same contact arrangement for inner and outer hair cells, and
// outer hair cells are sensory receptors too.
{
  q: 26, id: 'bio-217', expectLetter: 'B',
  explanation: [
    ['Inner hair cells are the primary auditory receptors, while outer hair cells amplify and fine-tune the response. Sound waves transmitted through the oval window create pressure waves in the perilymph that cause the basilar membrane to vibrate, bending the stereocilia of hair cells against the tectorial membrane and generating receptor potentials.',
     'Inner hair cells provide most of the sensory input to the auditory nerve, while outer hair cells amplify and sharpen the cochlear response. Sound causes the basilar membrane and the surrounding cochlear structures and fluid to move relative to one another. This bends hair-cell stereocilia, opening mechanically gated channels and changing the cells\' membrane potential.'],
    ['<li>Sound pressure waves vibrate the basilar membrane, bending hair cell stereocilia against the tectorial membrane.</li>',
     '<li>Sound makes the basilar membrane and the surrounding cochlear structures and fluid move relative to one another, which bends hair-cell stereocilia and opens mechanically gated channels.</li>'],
    ['<li>Inner hair cells are the true auditory receptors; outer hair cells amplify and sharpen tuning.</li>',
     '<li>Inner hair cells provide most of the sensory input to the auditory nerve; outer hair cells amplify and sharpen the cochlear response. Both are mechanosensitive hair cells.</li>'],
  ],
},

// Q28 bio-219: the canal signal adapts during sustained rotation rather than
// vanishing the instant acceleration ends, and pressure change is not
// confined to the middle ear.
{
  q: 28, id: 'bio-219', expectLetter: 'B',
  explanation: [
    ['<p><strong>A. Linear acceleration and gravity:</strong> Linear acceleration and gravity are detected by the otolith organs (utricle and saccule), which contain calcium carbonate crystals (otoliths).</p>',
     '<p><strong>A. Linear acceleration and gravity:</strong> These are sensed by the otolith organs, the utricle and saccule, whose hair cells are loaded with calcium carbonate otoliths. The semicircular canals respond instead to rotation of the head.</p>'],
    ['<p><strong>D. Changes in atmospheric pressure:</strong> Changes in atmospheric pressure are not detected by the semicircular canals. The Eustachian tube (auditory tube) connects the middle ear to the nasopharynx and helps equalize air pressure across the tympanic membrane. Pressure imbalances (such as during air travel or diving) affect the middle ear rather than the inner ear vestibular system.</p>',
     '<p><strong>D. Changes in atmospheric pressure:</strong> The semicircular canals primarily sense rotational movement. The Eustachian tube (auditory tube) connects the middle ear to the nasopharynx and equalizes air pressure across the tympanic membrane.</p>'],
    ['<li>Because they respond to acceleration, sustained constant-velocity rotation stops being sensed.</li>',
     '<li>During prolonged steady-speed rotation the canal response gradually adapts; changes in rotational speed produce renewed responses.</li>'],
  ],
},

// Q29 bio-220: option C held a copied list sentence instead of a comparison.
{
  q: 29, id: 'bio-220', expectLetter: 'B',
  explanation: [
    ['<p><strong>C. Cylindrical lens:</strong> Convex lenses are used for hyperopia (farsightedness), cylindrical lenses correct astigmatism, and bifocals combine corrections for both near and distance vision.</p>',
     '<p><strong>C. Cylindrical lens:</strong> A cylindrical lens provides different refractive power in different meridians and is used to correct astigmatism. A diverging spherical correction is the standard answer for uncomplicated myopia.</p>'],
  ],
},

// Q30 bio-221: raised intraocular pressure is a risk factor, not the
// definition of glaucoma, and the vitreous is not unchanged through life.
{
  q: 30, id: 'bio-221', expectLetter: 'B',
  explanation: [
    ['It drains through the trabecular meshwork into the canal of Schlemm and then into the venous system.',
     'It drains mainly through the trabecular meshwork into the canal of Schlemm and then into the venous system.'],
    ['Unlike aqueous humor, it is not continuously produced and drained. The vitreous is formed during embryonic development and remains relatively unchanged throughout life.',
     'Unlike aqueous humor, it is a gel that is not continuously produced and drained, although its structure changes with age.'],
    ['<li>It is produced by the ciliary processes into the posterior chamber, passes the pupil into the anterior chamber, and drains via the trabecular meshwork into the canal of Schlemm.</li>',
     '<li>It is produced by the ciliary processes into the posterior chamber, passes the pupil into the anterior chamber, and drains mainly via the trabecular meshwork into the canal of Schlemm.</li>'],
    ['<li>Glaucoma results from impaired drainage rather than overproduction, and damages the optic nerve.</li>',
     '<li>Impaired aqueous drainage can raise intraocular pressure, an important risk factor for glaucomatous optic-nerve damage. Glaucoma can also occur at pressures within the usual range.</li>'],
    ['<li>Do not confuse aqueous humour, which turns over continuously, with vitreous humour, which is a static gel in the posterior segment.</li>',
     '<li>Do not confuse aqueous humour, which turns over continuously, with vitreous humour, which is not continuously produced and drained, although its structure changes with age.</li>'],
  ],
},

// Q31 bio-222: Meniere disease affects hearing as well as balance, so it is
// the wrong example for an isolated vestibular disorder. The Weber finding
// needs qualifying, and not every central auditory lesion is CAPD.
{
  q: 31, id: 'bio-222', expectLetter: 'B',
  explanation: [
    ['Loss of central auditory processing describes central auditory processing disorder (CAPD), where sound reaches the brain but is not properly interpreted. Patients can detect sounds but have difficulty understanding speech, especially in noisy environments. This is a neurological condition affecting the auditory cortex or its pathways, distinct from both conductive and sensorineural hearing loss.',
     'This describes central auditory dysfunction, in which sound reaches the brain but is not properly interpreted, so speech can be difficult to follow especially in noise. Lesions of the auditory cortex or its central pathways vary, and they are distinct from both conductive and sensorineural hearing loss.'],
    ['<p><strong>D. Degeneration of the vestibular apparatus:</strong> Degeneration of the vestibular apparatus would cause balance and equilibrium problems (vertigo, nystagmus, unsteadiness), not hearing loss. The vestibular system (semicircular canals and otolith organs) is anatomically adjacent to the cochlea but functionally separate. Conditions like benign paroxysmal positional vertigo (BPPV) or Meniere disease affect vestibular function.</p>',
     '<p><strong>D. Degeneration of the vestibular apparatus:</strong> An isolated vestibular disorder primarily affects balance, producing vertigo, nystagmus and unsteadiness. Conductive hearing loss instead results from impaired sound transmission through the external or middle ear.</p>'],
    ['<li>Rinne and Weber tuning fork tests distinguish them: in conductive loss, Weber lateralises to the affected ear and bone conduction exceeds air conduction.</li>',
     '<li>Rinne and Weber tuning fork tests help distinguish them: in typical unilateral conductive loss, Weber lateralises towards the affected ear and bone conduction exceeds air conduction.</li>'],
  ],
},

// Q32 bio-223: the light-sensitive channels are cGMP-gated cation channels
// carrying Na+ and Ca2+, not sodium-only or voltage-gated channels.
{
  q: 32, id: 'bio-223', expectLetter: 'A',
  explanation: [
    ['This leads to decreased cGMP, closure of Na⁺ channels, and hyperpolarization of the rod cell.',
     'This leads to decreased cGMP and closure of cGMP-gated cation channels that carry Na⁺ and Ca²⁺; the resulting fall in inward current hyperpolarizes the rod cell.'],
    ['which hydrolyzes cGMP, leading to closure of cGMP-gated Na+ channels and rod cell hyperpolarization.',
     'which hydrolyzes cGMP, leading to closure of cGMP-gated cation channels and rod cell hyperpolarization.'],
    ['<li>The cascade runs through transducin, lowering cGMP and closing Na⁺ channels.</li>',
     '<li>The cascade runs through transducin, lowering cGMP and closing cGMP-gated cation channels that carry Na⁺ and Ca²⁺.</li>'],
  ],
},

// Q33 bio-224: three fragmentary distractor notes, and an absolute claim that
// CD4 T cells never kill directly.
{
  q: 33, id: 'bio-224', expectLetter: 'B',
  explanation: [
    ['B cells produce antibodies (humoral immunity), and CD4+ helper T cells coordinate immune responses but do not directly kill infected cells.</p>',
     'B cells produce antibodies (humoral immunity), and CD4+ helper T cells usually coordinate immune responses rather than carrying out this killing.</p>'],
    ['<p><strong>A. B lymphocytes:</strong> Produce antibodies (humoral immunity) but do not directly kill infected cells.</p>',
     '<p><strong>A. B lymphocytes:</strong> B lymphocytes contribute to humoral immunity by differentiating into plasma cells that secrete antibody. Antibody can neutralize and opsonize pathogens, but B cells do not themselves kill infected cells by direct contact.</p>'],
    ['<p><strong>C. Helper T lymphocytes (CD4+ T cells):</strong> Coordinate immune responses by releasing cytokines; they activate other immune cells but do not kill directly.</p>',
     '<p><strong>C. Helper T lymphocytes (CD4+ T cells):</strong> CD4 helper T cells usually coordinate immune responses, releasing cytokines that activate macrophages, B cells and cytotoxic T cells. Direct killing of virus-infected cells is the characteristic role of the CD8 subset.</p>'],
    ['<p><strong>D. Neutrophils:</strong> Most abundant white blood cells; first responders in acute inflammation.</p>',
     '<p><strong>D. Neutrophils:</strong> Neutrophils are the most abundant white blood cells and the first responders in acute inflammation, where they phagocytose extracellular bacteria and fungi. They are not the cells that recognize and kill virus-infected host cells.</p>'],
    [GENERIC_IMMUNE, points([
      'CD8 cytotoxic T cells recognize relevant peptide antigens presented on MHC class I.',
      'Perforin and granzymes help trigger apoptosis of target cells.',
      'CD4 helper T cells mainly coordinate immune responses; innate NK cells can also kill infected or abnormal cells through different recognition mechanisms.',
    ])],
  ],
},

// Q34 bio-225: all three distractor explanations were the same sentence,
// lowercased, and none described the class named in its own option.
{
  q: 34, id: 'bio-225', expectLetter: 'C',
  explanation: [
    ['<p><strong>A. IgG:</strong> As the immune response matures, b cells undergo class switching (isotype switching) to produce igg, iga, or ige depending on cytokine signals from helper t cells.</p>',
     '<p><strong>A. IgG:</strong> IgG is prominent in serum and is commonly the dominant class in a later or secondary systemic antibody response. It is not usually the first secreted class in a primary response.</p>'],
    ['<p><strong>B. IgA:</strong> As the immune response matures, b cells undergo class switching (isotype switching) to produce igg, iga, or ige depending on cytokine signals from helper t cells.</p>',
     '<p><strong>B. IgA:</strong> IgA is important at mucosal surfaces and in secretions such as saliva and breast milk, where it limits attachment of pathogens to epithelium.</p>'],
    ['<p><strong>D. IgE:</strong> As the immune response matures, b cells undergo class switching (isotype switching) to produce igg, iga, or ige depending on cytokine signals from helper t cells.</p>',
     '<p><strong>D. IgE:</strong> IgE is associated with immediate allergic responses and with defense against certain parasites, acting largely through mast cells and basophils.</p>'],
    [GENERIC_IMMUNE, points([
      'IgM is usually the first antibody class secreted during a primary immune response.',
      'Secreted IgM is mainly pentameric and is effective at activating complement.',
      'Activated B cells can later switch antibody class while retaining antigen specificity; memory supports a faster response on re-exposure.',
    ])],
  ],
},

// Q35 bio-226: C3a and C5a both promote inflammation, but C5a is the major
// potent neutrophil chemoattractant of the two.
{
  q: 35, id: 'bio-226', expectLetter: 'C',
  explanation: [
    ['(3) inflammation-complement fragments C3a and C5a act as anaphylatoxins, promoting mast cell degranulation, vasodilation, and chemotaxis of immune cells.',
     '(3) inflammation-C3a and C5a act as anaphylatoxins, promoting mast cell degranulation and vasodilation, with C5a the major potent neutrophil chemoattractant of the two.'],
    ['These small peptide fragments trigger mast cell degranulation (histamine release), increase vascular permeability, and act as potent chemotactic agents recruiting neutrophils and other immune cells to infection sites.',
     'These small peptide fragments trigger mast cell degranulation (histamine release) and increase vascular permeability; C5a in particular strongly recruits and activates neutrophils.'],
    [GENERIC_IMMUNE, points([
      'C3b opsonizes targets, helping phagocytes recognize and ingest them.',
      'C3a and C5a promote inflammation; C5a strongly recruits and activates neutrophils.',
      'C5b-C9 form the membrane attack complex; complement does not directly replace antigen recognition by the T-cell receptor.',
    ])],
  ],
},

// Q36 bio-227: option C held a copied half-sentence.
{
  q: 36, id: 'bio-227', expectLetter: 'D',
  explanation: [
    ['<p><strong>C. Natural active immunity:</strong> Natural active immunity results from actual infection.</p>',
     '<p><strong>C. Natural active immunity:</strong> Natural active immunity also comes from the person\'s own immune response, but it follows actual infection rather than deliberate administration of an antigen.</p>'],
    [GENERIC_IMMUNE, points([
      'Active immunity involves the person\'s own immune response and can establish memory.',
      'Vaccination is artificially acquired active immunity; infection is a natural route to active immunity.',
      'Passive immunity transfers ready-made antibodies and does not itself establish the recipient\'s immune memory.',
    ])],
  ],
},

// Q37 bio-228: option C is the CD8 co-receptor, but its feedback described a
// CD8 T cell; option A held a lowercased copy of a main-explanation sentence.
{
  q: 37, id: 'bio-228', expectLetter: 'B',
  explanation: [
    ['<p><strong>A. MHC class I:</strong> Mhc class i molecules are found on all nucleated cells and present endogenous (intracellular) antigens to cd8+ cytotoxic t cells.</p>',
     '<p><strong>A. MHC class I:</strong> MHC class I is expressed on nearly all nucleated cells and presents peptides derived from inside the cell to CD8+ cytotoxic T cells, not to helper T cells.</p>'],
    ['<p><strong>C. CD8 co-receptor:</strong> Directly kill virus-infected and tumor cells using perforin and granzymes.</p>',
     '<p><strong>C. CD8 co-receptor:</strong> CD8 is a co-receptor on cytotoxic T cells that interacts with MHC class I. It is not the MHC class II molecule that presents peptide to a helper T cell.</p>'],
    [GENERIC_IMMUNE, points([
      'Professional antigen-presenting cells present peptides on MHC class II to CD4 helper T cells.',
      'MHC class I is expressed on nearly all nucleated cells and presents peptides to CD8 T cells.',
      'MHC molecules display peptide; CD4 and CD8 are co-receptors that assist T-cell recognition.',
    ])],
  ],
},

// Q38 bio-229: fever is systemic, so the stem's cardinal sign is local
// warmth; and swelling is caused mainly by fluid and protein leakage rather
// than by the arriving leukocytes.
{
  q: 38, id: 'bio-229', expectLetter: 'B',
  stemFull: 'Local warmth, redness, swelling, and pain at a site of injury are the cardinal signs of which immune process?',
  explanation: [
    ['increased vascular permeability allows plasma proteins and leukocytes to enter the tissue (causing swelling),',
     'increased vascular permeability lets fluid and plasma proteins leak into the tissue (causing swelling, with leukocytes arriving as well),'],
    [GENERIC_IMMUNE, points([
      'Acute inflammation is an innate response producing local warmth, redness, swelling and pain, with loss of function sometimes added as a fifth sign.',
      'Vasodilation increases local blood flow, giving warmth and redness; increased vascular permeability lets fluid and plasma proteins leak out, giving swelling.',
      'Mediators such as prostaglandins and bradykinin sensitize and stimulate pain receptors; leukocyte recruitment follows the vascular changes.',
    ])],
  ],
},

];
