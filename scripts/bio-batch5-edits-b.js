/**
 * Batch 5 review, part B: displayed Q13-Q24 (bio-203 .. bio-211, bio-213 .. bio-215).
 * Includes the Q14, Q17 and Q21 substantial repairs. The generic renal block
 * is replaced in Q16-Q24; Q13-Q15 keep their individual blocks, corrected.
 */
'use strict';

const GENERIC_RENAL =
  '<ul><li>The nephron is the functional unit of the kidney - it performs filtration (glomerulus), selective reabsorption (tubules), and secretion to produce urine.</li>'
  + '<li>The proximal tubule reabsorbs the bulk of filtered solutes; the loop of Henle creates the concentration gradient; the collecting duct determines final urine concentration.</li>'
  + '<li>ADH (from posterior pituitary) increases water reabsorption in the collecting duct; aldosterone (from adrenal cortex) increases Na+ reabsorption in the distal tubule.</li></ul>';

const points = items => '<ul>' + items.map(t => '<li>' + t + '</li>').join('') + '</ul>';

module.exports = [

// Q13 bio-203: "accessory" has a specific meaning (muscles recruited when
// demand rises), so it is the wrong label for the external intercostals in
// quiet breathing. Option A's feedback was a verbatim copy of a sentence
// from the main explanation.
{
  q: 13, id: 'bio-203', expectLetter: 'C',
  explanation: [
    ['<p><strong>A. External intercostals:</strong> The external intercostals assist by elevating the ribs.</p>',
     '<p><strong>A. External intercostals:</strong> The external intercostals assist quiet inspiration by elevating the ribs and widening the thorax, but the diaphragm accounts for most of the volume change.</p>'],
    ['<li>The external intercostals assist by elevating the ribs, but they are accessory rather than primary during quiet breathing.</li>',
     '<li>The external intercostals assist quiet inspiration by elevating the ribs; the diaphragm remains the primary inspiratory muscle.</li>'],
  ],
},

// Q14 bio-204: SUBSTANTIAL REPAIR. The item taught that CO poisoning gives no
// stimulus to hyperventilate and produces no respiratory symptoms, which is
// wrong and clinically dangerous, and it explained the pulse-oximeter
// limitation as if it were chemoreceptor sensing.
{
  q: 14, id: 'bio-204', expectLetter: 'D',
  explanation: [
    ['CO poisoning is insidious because it does not stimulate the peripheral chemoreceptors (which respond to dissolved O₂, not hemoglobin-bound O₂).</p>',
     'Arterial PO₂ may remain normal, because it measures dissolved oxygen rather than how much oxygen hemoglobin can carry. Oxygen delivery can therefore be severely impaired despite a normal PO₂. A conventional pulse oximeter may also give a misleadingly reassuring reading, because optically it cannot reliably distinguish carboxyhemoglobin from oxyhemoglobin. Breathlessness or rapid breathing can occur.</p>'],
    ['<p><strong>B. Directly inhibits the respiratory center in the medulla:</strong> CO does not directly inhibit the respiratory center in the medulla. In fact, one of the insidious dangers of CO poisoning is that the patient may not feel short of breath because the peripheral chemoreceptors (which sense dissolved O2, not hemoglobin-bound O2) are not triggered. The PaO2 remains normal even though oxygen delivery to tissues is severely impaired.</p>',
     '<p><strong>B. Directly inhibits the respiratory center in the medulla:</strong> Direct inhibition of the medullary respiratory center is not the mechanism being tested. The central problem is that carboxyhemoglobin cannot carry oxygen and makes the remaining bound oxygen harder to release, so tissue oxygen delivery falls.</p>'],
    ['<p><strong>C. Stimulates excessive breathing leading to respiratory alkalosis:</strong> CO poisoning does not typically cause excessive breathing or respiratory alkalosis. Since the peripheral chemoreceptors respond to dissolved oxygen (PaO2), which remains normal in CO poisoning, there is no strong stimulus to hyperventilate. Patients may have only subtle symptoms like headache and confusion, which is why CO poisoning is often called the \'silent killer.\'</p>',
     '<p><strong>C. Stimulates excessive breathing leading to respiratory alkalosis:</strong> Rapid breathing can occur, but excessive ventilation and respiratory alkalosis are not the principal toxic mechanism. Impaired oxygen delivery is, and impaired tissue oxygen use can instead be accompanied by metabolic acidosis. Early symptoms such as headache and confusion are non-specific, which is why CO poisoning is easy to miss.</p>'],
    ['<li>Peripheral chemoreceptors respond to dissolved O₂, which stays normal, so the patient may feel no breathlessness. This is what makes CO poisoning insidious.</li><li>For the same reason standard pulse oximetry can read falsely normal, since it cannot distinguish carboxyhaemoglobin from oxyhaemoglobin.</li>',
     '<li>Arterial PO₂ measures dissolved oxygen, so it can stay normal while oxygen delivery is severely impaired; a normal PO₂ does not exclude serious toxicity.</li><li>Standard pulse oximetry can also read falsely normal, because optically it cannot distinguish carboxyhaemoglobin from oxyhaemoglobin.</li><li>Early symptoms such as headache and confusion are non-specific, and breathlessness or rapid breathing can occur.</li>'],
  ],
},

// Q15 bio-205: B and C were dismissed as having "no physiological
// significance" instead of being compared with the definition of VC.
{
  q: 15, id: 'bio-205', expectLetter: 'D',
  explanation: [
    ['Adding residual volume to the mix gives a value that does not represent any meaningful physiological measurement. Remember that vital capacity specifically excludes residual volume.',
     'This sum includes residual volume, which vital capacity excludes, and it omits tidal volume, which vital capacity includes.'],
    ['Residual volume cannot be voluntarily expelled, so combining it with tidal volume does not represent any functional breathing capacity. This combination has no physiological or clinical significance.',
     'It includes residual volume, which cannot be exhaled by any effort, and it omits both the inspiratory and the expiratory reserve volume.'],
  ],
},

// Q16 bio-206: option A held a copied sentence fragment, and option C
// asserted that filtration equilibrium is always reached.
{
  q: 16, id: 'bio-206', expectLetter: 'D',
  explanation: [
    ['<p><strong>A. Capsular hydrostatic pressure:</strong> It is opposed by the capsular hydrostatic pressure (~15 mmhg) and the glomerular capillary oncotic pressure (~30 mmhg).</p>',
     '<p><strong>A. Capsular hydrostatic pressure:</strong> Pressure in Bowman\'s capsule opposes movement of fluid out of the glomerular capillaries, so it opposes filtration rather than driving it.</p>'],
    ['plasma proteins (primarily albumin) that cannot pass through the glomerular filtration barrier. As filtration proceeds along the glomerular capillary, protein concentration rises and oncotic pressure increases, eventually reaching filtration equilibrium.',
     'plasma proteins (primarily albumin), which are largely retained by the glomerular filtration barrier. As filtration proceeds along the glomerular capillary, the capillary protein concentration rises and the oncotic opposition to filtration increases.'],
    [GENERIC_RENAL, points([
      'Glomerular capillary hydrostatic pressure favors filtration into Bowman\'s space.',
      'Capsular hydrostatic pressure and plasma oncotic pressure oppose filtration.',
      'Filtration produces a large volume of filtrate, most of which is subsequently reabsorbed; GFR is not urine output.',
    ])],
  ],
},

// Q17 bio-207: SUBSTANTIAL REPAIR. The item assigned one percentage to water,
// sodium, chloride, bicarbonate and potassium alike, called proximal
// reabsorption fixed regardless of need, and gave a downstream percentage
// breakdown that mixed up sodium and water fractions.
{
  q: 17, id: 'bio-207', expectLetter: 'C',
  stemFull: 'Approximately what percentage of filtered water is normally reabsorbed in the proximal convoluted tubule (PCT)?',
  explanationFull:
    '<h4>Correct Answer: C) 65&ndash;70%</h4>'
    + '<p>The proximal tubule normally reabsorbs about two-thirds of filtered water and a similar proportion of filtered sodium. It also reabsorbs most filtered bicarbonate and nearly all filtered glucose and amino acids at normal filtered loads. Sodium transport, supported by basolateral Na&#8314;/K&#8314;-ATPase, drives much of this reabsorption, and water follows by osmosis. Water movement here does not require ADH, although proximal transport can still be regulated.</p>'
    + '<h4>Why the other choices are wrong:</h4>'
    + '<p><strong>A. 25%:</strong> This underestimates proximal water reabsorption. A figure of roughly 25% is often quoted for the loop of Henle, but that figure commonly refers to filtered sodium rather than to the same proportion of water.</p>'
    + '<p><strong>B. 50%:</strong> 50% underestimates PCT reabsorption. The PCT is remarkably efficient because its cells have extensive brush borders (microvilli) and are packed with mitochondria to power the Na+/K+-ATPase pumps on the basolateral membrane. This creates the driving force for sodium-coupled transport of glucose, amino acids, phosphate, and other solutes.</p>'
    + '<p><strong>D. 90%:</strong> This overestimates proximal water reabsorption. About 99% of filtered water is ultimately recovered across the whole nephron, but the PCT alone accounts for roughly two-thirds, with the loop, distal tubule and collecting duct handling the rest. The early distal tubule is in fact poorly permeable to water.</p>'
    + '<h4>Key Educational Points:</h4>'
    + points([
      'The PCT reabsorbs about two-thirds of filtered water, with solute and water reabsorption keeping tubular fluid approximately isotonic.',
      'Different solutes have different reabsorbed fractions; most bicarbonate and nearly all glucose and amino acids are recovered here under normal conditions.',
      'Its brush border and abundant mitochondria support extensive transport; basolateral Na&#8314;/K&#8314;-ATPase supplies the driving sodium gradient.',
    ])
    + '<p class=\'exp-key\'>Bottom Line: The PCT normally reabsorbs about two-thirds of filtered water; do not apply that percentage to every filtered solute.</p>',
},

// Q18 bio-208: the medullary gradient is not produced by thick ascending limb
// NaCl transport alone, 1200 mOsm/kg is a high antidiuretic value rather than
// a constant, ADH inserts AQP2 rather than "opening" channels, and the
// collecting-duct feedback was a broken sentence.
{
  q: 18, id: 'bio-208', expectLetter: 'D',
  explanation: [
    ['progressively increasing the osmolality of the medulla from ~300 mOsm/kg at the cortex to ~1200 mOsm/kg at the papilla.',
     'progressively increasing the osmolality of the medulla from about 300 mOsm/kg at the cortex to values that may approach 1200 mOsm/kg deep in the medulla during strong antidiuresis.'],
    ['This gradient is essential for concentrating urine when ADH opens aquaporins in the collecting duct.</p>',
     'Urea recycling also contributes to the gradient, particularly in the inner medulla. The gradient is what allows urine to be concentrated when ADH increases insertion of AQP2 water channels into the collecting-duct apical membrane.</p>'],
    ['<p><strong>A. Proximal convoluted tubule:</strong> The proximal convoluted tubule reabsorbs ~65% of filtrate including all glucose, amino acids, most Na+, and water; this is not the primary site described.</p>',
     '<p><strong>A. Proximal convoluted tubule:</strong> The proximal convoluted tubule reabsorbs about two-thirds of the filtered water and sodium, along with nearly all filtered glucose and amino acids, but it does not generate the medullary osmotic gradient.</p>'],
    ['<p><strong>B. Collecting duct:</strong> The collecting duct final concentration of urine; ADH controls water reabsorption here; this is not the primary site described.</p>',
     '<p><strong>B. Collecting duct:</strong> The collecting duct uses the medullary gradient to reabsorb water when ADH increases its water permeability. It also contributes to urea recycling, but the loop of Henle is the countercurrent multiplier.</p>'],
    [GENERIC_RENAL, points([
      'Opposite flow in the loop\'s limbs, together with differing water and salt permeability, helps establish the medullary gradient.',
      'The descending limb is water-permeable; the ascending limb reabsorbs NaCl while remaining poorly permeable to water.',
      'Urea recycling contributes to the gradient, which enables ADH-dependent water reabsorption from collecting ducts.',
    ])],
  ],
},

// Q19 bio-209: PAH extraction is high but not complete, only its unbound
// fraction is freely filtered, and options A and B repeated single sentences
// already present in the main explanation.
{
  q: 19, id: 'bio-209', expectLetter: 'C',
  explanation: [
    ['PAH is both filtered and actively secreted, so its clearance approximates renal plasma flow, not GFR.',
     'PAH is both filtered and actively secreted, so its clearance approximates effective renal plasma flow rather than GFR.'],
    ['<p><strong>A. Glucose:</strong> Glucose is filtered but completely reabsorbed.</p>',
     '<p><strong>A. Glucose:</strong> Glucose is freely filtered but then reabsorbed almost entirely in the proximal tubule at normal filtered loads, so its clearance is far below GFR rather than equal to it.</p>'],
    ['<p><strong>B. Urea:</strong> Urea is filtered but partially reabsorbed.</p>',
     '<p><strong>B. Urea:</strong> Urea is freely filtered but is partially reabsorbed, and the reabsorbed fraction varies with urine flow, so urea clearance underestimates GFR by a changing margin.</p>'],
    ['At low plasma concentrations, nearly all PAH is cleared from the blood in a single pass through the kidney. Therefore, PAH clearance approximates renal plasma flow (RPF), not GFR. PAH clearance is used clinically to estimate RPF (~600 mL/min).',
     'Only its unbound fraction is freely filtered, and extraction from renal plasma in a single pass is high but not literally complete. PAH clearance therefore estimates effective renal plasma flow (on the order of 600 mL/min) rather than GFR.'],
    [GENERIC_RENAL, points([
      'An ideal GFR marker is freely filtered and neither reabsorbed nor secreted.',
      'Inulin meets these conditions, so its clearance measures GFR.',
      'Reabsorption lowers clearance relative to GFR; secretion can raise it, as illustrated by PAH.',
    ])],
  ],
},

// Q20 bio-210: the B feedback both denied and conceded parasympathetic
// innervation, and the JGA was described as having only two components.
{
  q: 20, id: 'bio-210', expectLetter: 'D',
  explanation: [
    ['The juxtaglomerular apparatus (JGA) consists of juxtaglomerular cells in the afferent arteriole and macula densa cells in the distal tubule.',
     'The juxtaglomerular apparatus (JGA) includes renin-secreting granular (juxtaglomerular) cells in the afferent arteriole, macula densa cells in the distal tubule, and extraglomerular mesangial cells.'],
    ['<p><strong>B. Parasympathetic stimulation of the kidney:</strong> The kidneys receive sympathetic innervation, not parasympathetic. Sympathetic stimulation (via beta-1 adrenergic receptors on juxtaglomerular cells) is actually one of the three main stimuli for renin release (along with low NaCl at the macula densa and low afferent arteriolar pressure). Parasympathetic innervation to the kidney is minimal and does not significantly regulate renin.</p>',
     '<p><strong>B. Parasympathetic stimulation of the kidney:</strong> Sympathetic stimulation, acting on beta1 receptors on the granular cells, promotes renin release and is one of the three classic triggers, along with low NaCl delivery to the macula densa and reduced afferent arteriolar pressure. Parasympathetic stimulation is not the principal trigger tested here.</p>'],
    [GENERIC_RENAL, points([
      'Renin release increases with reduced renal perfusion pressure, reduced NaCl delivery to the macula densa, or sympathetic beta1 stimulation.',
      'Renin initiates the sequence leading to angiotensin II and aldosterone.',
      'High potassium directly stimulates aldosterone secretion; it is not the classic direct trigger for renin release.',
    ])],
  ],
},

// Q21 bio-211: SUBSTANTIAL REPAIR. The renal threshold is not the point at
// which every transporter is saturated: nephrons differ in capacity, which
// produces splay. Option D and its heading are renamed accordingly, and the
// unnecessary hyperfiltration account is removed from C.
{
  q: 21, id: 'bio-211', expectLetter: 'D',
  optionFull: [[3, 'Glucose begins to appear in the urine because reabsorption no longer keeps pace with filtration']],
  headingsGone: ['D. Glucose appears in the urine (glucosuria) because transport carriers are saturated:'],
  explanationFull:
    '<h4>Correct Answer: D) Glucose begins to appear in the urine because reabsorption no longer keeps pace with filtration</h4>'
    + '<p>Filtered glucose is normally reabsorbed by sodium-glucose cotransporters (SGLT2 and SGLT1) in the proximal tubule. As blood glucose rises, the filtered load rises with it. Once reabsorption can no longer keep pace, some glucose remains in the tubular fluid and appears in the urine. This begins before every nephron has reached its maximum capacity, so the renal threshold should not be equated with complete saturation of the whole kidney. The figure of roughly 180 mg/dL is a typical teaching estimate, and the actual threshold varies between people and with conditions such as pregnancy.</p>'
    + '<h4>Why the other choices are wrong:</h4>'
    + '<p><strong>A. Glucose secretion begins in the collecting duct:</strong> Glucose is not secreted into the tubular fluid at any point in the nephron. There is no glucose secretory mechanism in the collecting duct or elsewhere. Glucose handling in the kidney involves only filtration (at the glomerulus) and reabsorption (in the proximal tubule).</p>'
    + '<p><strong>B. Insulin is released to increase glucose reabsorption:</strong> Proximal glucose reabsorption uses sodium-glucose cotransporters. An insulin response is not the mechanism that explains the appearance of glucose in urine when the renal threshold is exceeded. SGLT2 inhibitors such as empagliflozin and dapagliflozin work by blocking this reabsorption deliberately.</p>'
    + '<p><strong>C. The GFR increases to compensate for excess glucose:</strong> A rise in GFR is not required for glucosuria to develop, and raising GFR is not a compensatory response that disposes of excess glucose. Glucose appears in the urine because tubular reabsorption falls behind the filtered load.</p>'
    + '<h4>Key Educational Points:</h4>'
    + points([
      'The filtered glucose load rises as plasma glucose rises.',
      'Proximal glucose transport has limited capacity; glucose that is not reabsorbed stays in the tubular fluid.',
      'The renal threshold marks the onset of glucosuria and is not identical to the whole kidney\'s transport maximum.',
    ])
    + '<p class=\'exp-key\'>Bottom Line: Glucosuria begins when glucose reabsorption no longer keeps pace with filtration; its onset does not mean every glucose transporter is fully saturated.</p>',
},

// Q22 bio-213: "virtually all filtered bicarbonate in the PCT" overstates the
// proximal share, option A denied that urine contains CO2, and option C gave
// a universal H+/K+ exchange account of acidosis.
{
  q: 22, id: 'bio-213', expectLetter: 'B',
  explanation: [
    ['The kidneys also reabsorb virtually all filtered bicarbonate in the PCT. These mechanisms allow the kidneys to adjust blood pH over hours to days.</p>',
     'The kidneys reabsorb most filtered bicarbonate in the PCT, with the remainder recovered farther along the nephron. Reclaiming filtered bicarbonate prevents the loss of existing base, whereas net acid excretion as ammonium and titratable acid is associated with adding new bicarbonate to the blood. These mechanisms allow the kidneys to adjust blood pH over hours to days.</p>'],
    ['<p><strong>A. Excreting CO₂ into the urine:</strong> CO2 is not excreted into the urine. CO2 elimination is the job of the lungs: CO2 diffuses',
     '<p><strong>A. Excreting CO₂ into the urine:</strong> The lungs are the main route of CO₂ elimination, and urinary CO₂ excretion is not how the kidney disposes of acid. CO2 diffuses'],
    ['Potassium handling and acid-base balance are interconnected: in acidosis, K+ is shifted out of cells in exchange for H+, which can cause hyperkalemia. However, potassium reabsorption itself does not eliminate acid.',
     'Potassium handling and acid-base balance can influence one another, but potassium reabsorption is simply not the acid-elimination mechanism being asked about here.'],
    [GENERIC_RENAL, points([
      'Kidneys conserve filtered bicarbonate and excrete acid, complementing the lungs\' elimination of CO₂.',
      'Urinary phosphate and ammonia buffer secreted H⁺; ammonia can trap it as NH₄⁺.',
      'Reclaiming filtered bicarbonate and adding new bicarbonate through net acid excretion are related but distinct processes.',
    ])],
  ],
},

// Q23 bio-214: efferent constriction was presented as always preserving GFR
// and as intrinsic renal autoregulation.
{
  q: 23, id: 'bio-214', expectLetter: 'B',
  explanation: [
    ['and preferentially constricts the efferent arteriole of the glomerulus to maintain GFR despite reduced blood flow.',
     'and preferentially constricts the efferent arteriole, which helps maintain glomerular pressure and GFR when renal perfusion is reduced, particularly at moderate angiotensin II levels.'],
    ['Instead, it preferentially constricts the efferent arteriole, which maintains glomerular filtration pressure even when renal blood flow is reduced. This selective efferent constriction is one of the kidney\'s autoregulatory mechanisms to preserve GFR during hypotension.',
     'Instead, it preferentially constricts the efferent arteriole, which can help maintain glomerular filtration pressure when renal blood flow is reduced. This is a compensatory hormonal response rather than intrinsic renal autoregulation, and the benefit to GFR is not unlimited.'],
    [GENERIC_RENAL, points([
      'Angiotensin II causes vasoconstriction and stimulates aldosterone secretion.',
      'It helps conserve sodium and water and supports blood pressure during reduced effective circulating volume.',
      'Preferential efferent constriction can help preserve glomerular pressure, but the effect on GFR is not unlimited.',
    ])],
  ],
},

// Q24 bio-215: state that collecting-duct urea transporters mediate
// facilitated diffusion, and that AQP2 is not a urea transporter.
{
  q: 24, id: 'bio-215', expectLetter: 'C',
  explanation: [
    ['Urea transport in the collecting duct involves specific urea transporters (UT-A1 and UT-A3), not aquaporins. ADH does stimulate UT-A1, promoting urea reabsorption from the inner medullary collecting duct into the medullary interstitium,',
     'Urea transport in the collecting duct involves specific urea transporters (UT-A1 and UT-A3), which mediate facilitated diffusion rather than active pumping. Aquaporin-2 permits passive water movement and is not a urea transporter. ADH does stimulate UT-A1, promoting urea movement from the inner medullary collecting duct into the medullary interstitium,'],
    [GENERIC_RENAL, points([
      'ADH increases AQP2 insertion into the apical membrane of collecting-duct principal cells.',
      'Water then moves passively down an osmotic gradient toward the concentrated medullary interstitium.',
      'Aquaporins transport water; urea transporters are separate proteins with a different substrate.',
    ])],
  ],
},

];
