/**
 * Biology review batch 9, displayed Q1-Q10 (bio-473 .. bio-482).
 * Q5 (bio-477, ribozymes) is KEEP UNCHANGED per the review and so is absent
 * from this module by design. Q1 is one of the three major rewrites.
 */
'use strict';

const Q1_EXPLANATION =
  '<h4>Correct Answer: Mitochondrial genes and translation machinery show clear relationships to those of bacteria</h4>' +
  '<p>Mitochondria evolved from a bacterial ancestor that formed a lasting association with an ancestral host cell. Comparisons of mitochondrial genes and the machinery used to make proteins provide strong evidence of this bacterial ancestry. Mitochondria also retain a small genome and arise by division of existing mitochondria. Over evolution, many genes were lost or transferred to the nucleus, so modern mitochondria depend on numerous proteins made from nuclear genes. They are integrated parts of the cell, not independently living bacteria.</p>' +
  '<h4>Why the other choices are wrong:</h4>' +
  '<p><strong>A. Mitochondria contain actin filaments identical to those of bacteria:</strong> The claim about identical actin filaments is not the evidence for mitochondrial ancestry. Bacteria and eukaryotes have related cytoskeletal proteins, but comparisons of mitochondrial genes and translation machinery provide the relevant evidence here.</p>' +
  '<p><strong>B. Mitochondria have a single membrane like gram-positive bacteria:</strong> Mitochondria have an outer and an inner membrane. A single membrane therefore does not describe them. Their double-membrane structure is consistent with bacterial ancestry, but it should not be used to assert a particular origin for each membrane as an established fact.</p>' +
  '<p><strong>C. Mitochondria are found in all prokaryotic and eukaryotic cells:</strong> Mitochondria are organelles of eukaryotic cells; bacteria and archaea do not contain them. They are also not present in every eukaryotic cell. Their distribution does not support the claim that they occur in all cells.</p>' +
  '<h4>Key Educational Points:</h4>' +
  '<table class=\'exp-table\'><tr><th>Evidence</th><th>What it teaches</th></tr>' +
  '<tr><td>Related genes and translation machinery</td><td>Mitochondria have bacterial ancestry</td></tr>' +
  '<tr><td>Small retained genome</td><td>Some genetic functions remain within mitochondria</td></tr>' +
  '<tr><td>Dependence on nuclear genes</td><td>Modern mitochondria are integrated into the host cell</td></tr>' +
  '<tr><td>Division of existing mitochondria</td><td>New mitochondria arise from pre-existing organelles</td></tr></table>' +
  '<p class=\'exp-key\'>Bottom Line: Mitochondrial genes and translation machinery provide strong evidence of bacterial ancestry; modern mitochondria also depend on the host cell\'s nuclear genes.</p>';

const Q3_DISTRACTORS =
  '<p><strong>A. Formation of polymers → abiotic synthesis of monomers → formation of protobionts → origin of self-replicating molecules:</strong> Polymers are placed before their monomers. A polymer cannot be assembled before its constituent building blocks are available.</p>' +
  '<p><strong>B. Formation of protobionts → abiotic synthesis of monomers → formation of polymers → origin of self-replicating molecules:</strong> Protocells are placed before the organic building blocks used to construct them in the stated model.</p>' +
  '<p><strong>C. Origin of self-replicating molecules → abiotic synthesis of monomers → formation of protobionts → formation of polymers:</strong> The proposed self-replicating polymers are placed before the monomers from which they are built.</p>';

module.exports = [
  // ---- Q1  bio-473  endosymbiotic evidence (MAJOR REWRITE) --------------
  {
    q: 1, id: 'bio-473', expectLetter: 'D',
    optionFull: [[3, 'Mitochondrial genes and translation machinery show clear relationships to those of bacteria']],
    explanationFull: Q1_EXPLANATION,
    gone: ['70S', 'Lynn Margulis', 'circular DNA', 'reproduce by binary fission',
      'B. Mitochondria have a single membrane, but mitochondria actually have a double membrane',
      'the outer from the host\'s engulfing vesicle', 'independent of the cell cycle',
      'Eukaryotic cytoplasm']
  },

  // ---- Q2  bio-474  earliest fossil evidence (stem replaced) ------------
  {
    q: 2, id: 'bio-474', expectLetter: 'A',
    stemFull: 'Some of the earliest widely accepted stromatolite evidence of microbial life is approximately how old?',
    explanation: [
      ['<p>The earliest widely accepted fossil evidence of life comes from stromatolites (layered microbial mats) found in Western Australia, dating to approximately 3.5 billion years ago. Chemical evidence (carbon isotope ratios) from Greenland rocks suggests life may have existed as early as 3.7–3.8 billion years ago, but the oldest undisputed microfossils are ~3.5 billion years old.</p>',
        '<p>Stromatolites are layered structures that can form through the activity of microbial communities. Examples from rocks about 3.5 billion years old provide widely accepted evidence that microbial life was already present at that time. These fossils provide a minimum age for life; they do not identify the exact time or place where life first originated.</p>'],
      ['<p><strong>B. 4.6 billion years ago:</strong> 4.6 billion years is the age of the Earth itself. During the first several hundred million years (the Hadean eon), conditions were too hostile for life - the surface was molten and subject to intense meteorite bombardment (Late Heavy Bombardment ended ~3.9 billion years ago).</p>',
        '<p><strong>B. 4.6 billion years ago:</strong> About 4.5-4.6 billion years is the age of the Earth itself, which is not in itself evidence of life. The question asks how old the preserved evidence of microbial life is, not how old the planet is.</p>'],
      ['<p><strong>C. 2.1 billion years ago:</strong> By 2.1 billion years ago, life was already well established. This date roughly corresponds to the earliest eukaryotic fossils (Grypania spiralis). Prokaryotic life existed for at least 1.4 billion years before eukaryotes appeared.</p>',
        '<p><strong>C. 2.1 billion years ago:</strong> Life was already present long before 2.1 billion years ago. This date is too recent for the evidence asked about.</p>'],
      ['<ul><li>Earth formed ~4.6 Ga → earliest life ~3.5–3.8 Ga → oxygen accumulation ~2.4 Ga → eukaryotes ~2.1 Ga → Cambrian explosion ~540 Ma</li>' +
        '<li>Stromatolites are structures formed by cyanobacteria and are still found today (e.g., Shark Bay, Australia)</li>' +
        '<li>The time from Earth\'s formation to the first life was relatively short (~800 million years), suggesting that abiogenesis may occur readily under the right conditions</li>' +
        '</ul>',
        '<ul><li>Stromatolites can preserve evidence of ancient microbial communities.</li>' +
        '<li>Widely accepted evidence places microbial life on Earth by about 3.5 billion years ago.</li>' +
        '<li>The oldest preserved evidence does not necessarily date the origin of life.</li></ul>'],
      ['<p class=\'exp-key\'>Bottom Line: The earliest fossil evidence of life (stromatolites) dates to ~3.5 billion years ago, roughly 1 billion years after Earth formed.</p>',
        '<p class=\'exp-key\'>Bottom Line: Microbial life was present by about 3.5 billion years ago; its exact origin remains uncertain.</p>']
    ],
    keepHeadings: ['<strong>B. 4.6 billion years ago:</strong>', '<strong>C. 2.1 billion years ago:</strong>', '<strong>D. 540 million years ago:</strong>'],
    gone: ['The earliest fossil evidence of life on Earth dates to approximately', 'the surface was molten',
      'Grypania spiralis', 'structures formed by cyanobacteria', 'abiogenesis may occur readily',
      'roughly 1 billion years after Earth formed']
  },

  // ---- Q3  bio-475  chemical-evolution sequence (stem; swapped labels) --
  {
    q: 3, id: 'bio-475', expectLetter: 'D',
    stemFull: 'Which sequence is consistent with a model in which organic building blocks form first, self-replicating molecules develop next, and these molecules later become enclosed in protocells?',
    explanation: [
      ['<p>Chemical evolution followed a logical progression: (1) Simple inorganic molecules gave rise to organic monomers (amino acids, nucleotides, sugars) through abiotic synthesis driven by energy sources like lightning and UV radiation. (2) Monomers polymerized into more complex molecules (polypeptides, polynucleotides). (3) Self-replicating molecules (likely RNA) emerged, allowing information transfer. (4) These molecules became enclosed in membrane-bound protobionts, leading to primitive cells.</p>',
        '<p>In this proposed model, small organic building blocks form without living organisms, join into larger molecules, and eventually give rise to systems capable of replication. Enclosure within compartments then helps keep components together. The sequence in D fits that model. The actual route to the first cells is not known, and other models allow compartments, metabolism and replication to develop together or in a different order.</p>'],
      ['<p><strong>B. Formation of polymers → abiotic synthesis of monomers → ...</strong> This reverses the first two steps. Polymers are made FROM monomers, so monomers must form first. You cannot have polypeptides before amino acids exist.</p>' +
        '<p><strong>A. Formation of protobionts → abiotic synthesis of monomers → ...</strong> Protobionts are structures composed of organic molecules. They cannot form before their molecular building blocks are synthesized. This reverses the entire logical sequence.</p>' +
        '<p><strong>C. Origin of self-replicating molecules → abiotic synthesis of monomers → ...</strong> Self-replicating molecules (like RNA) are themselves polymers made of monomers (nucleotides). Monomers must be synthesized abiotically before complex self-replicating molecules can arise.</p>',
        Q3_DISTRACTORS],
      ['<ul><li>Each step builds on the previous one - monomers → polymers → replication → compartmentalization</li>' +
        '<li>The transition from chemical evolution to biological evolution likely occurred when self-replicating systems became enclosed in membranes</li>' +
        '<li>Natural selection could begin operating once there were self-replicating entities with heritable variation</li>' +
        '</ul>',
        '<ul><li>Monomers are building blocks; polymers are larger molecules assembled from them.</li>' +
        '<li>Replication with heritable variation allows selection among replicating systems.</li>' +
        '<li>Proposed origin-of-life sequences are models, and the historical order remains uncertain.</li></ul>'],
      ['<p class=\'exp-key\'>Bottom Line: Chemical evolution proceeded from simple monomers to polymers to self-replicating molecules to membrane-enclosed protobionts.</p>',
        '<p class=\'exp-key\'>Bottom Line: D follows the sequence specified in this model; it is not a proven timeline of the origin of life.</p>']
    ],
    gone: ['the correct sequence of events in chemical evolution', 'Chemical evolution followed a logical progression',
      'This reverses the entire logical sequence', 'Each step builds on the previous one']
  },

  // ---- Q4  bio-476  hydrothermal vents (stem replaced) ------------------
  {
    q: 4, id: 'bio-476', expectLetter: 'D',
    stemFull: 'Why are alkaline hydrothermal environments considered a possible setting for the origin of life?',
    explanation: [
      ['<p>Deep-sea hydrothermal vents (especially alkaline vents, or "white smokers") provide a continuous source of chemical energy from reduced compounds (H₂, H₂S, CH₄), mineral surfaces (iron-sulfur, nickel) that can catalyze reactions, and a protected environment shielded from UV radiation and meteorite impacts. The natural pH and temperature gradients across vent walls could have driven proto-metabolic reactions.</p>',
        '<p>Alkaline hydrothermal systems can supply chemical energy through differences in chemical composition and pH between vent fluids and surrounding water. Mineral surfaces may catalyze reactions, and small mineral pores may help concentrate reactants. Submerged settings are also shielded from surface ultraviolet radiation. These features make such environments useful models for studying prebiotic chemistry, but they do not establish that life actually began there.</p>'],
      ['<p><strong>A. Hydrothermal vents provide oxygen-rich conditions ideal for aerobic metabolism:</strong> The deep ocean near hydrothermal vents was anoxic (oxygen-free) in early Earth. Aerobic metabolism evolved much later, after the Great Oxidation Event. The vent hypothesis actually relies on anaerobic chemistry, which is an advantage because oxygen would destroy prebiotic organic molecules.</p>',
        '<p><strong>A. Hydrothermal vents provide oxygen-rich conditions ideal for aerobic metabolism:</strong> These models do not depend on an oxygen-rich environment or on aerobic metabolism. The early deep ocean near such vents was essentially free of dissolved oxygen, and the proposed prebiotic chemistry is anaerobic.</p>'],
      ['<p><strong>B. Hydrothermal vents contain large amounts of pre-formed DNA:</strong> DNA is not found naturally in hydrothermal vent fluid. DNA is a biological molecule that is synthesized only by living organisms. The vent hypothesis proposes conditions for abiotic synthesis of simpler precursors, not pre-formed DNA.</p>',
        '<p><strong>B. Hydrothermal vents contain large amounts of pre-formed DNA:</strong> The hypothesis concerns energy sources and conditions for prebiotic chemistry, not a ready-made supply of DNA. Finding DNA in a modern inhabited vent would not demonstrate that DNA formed there before life.</p>'],
      ['<p><strong>C. Hydrothermal vents have lower temperatures that preserve fragile organic molecules:</strong> "Black smokers" can reach 350°C or higher, which would destroy organic molecules. However, alkaline vents ("white smokers") are cooler (~70–90°C), and the mixing zones between vent fluid and ocean water provide moderate temperature gradients. The claim of universally low temperatures is incorrect.</p>',
        '<p><strong>C. Hydrothermal vents have lower temperatures that preserve fragile organic molecules:</strong> Vents are not generally cooler than the surface. Conditions vary between and within vent systems, and excessive heat can break down some organic compounds, so a single temperature range does not define these environments.</p>'],
      ['<ul><li>Alkaline hydrothermal vents (Russell and Martin model) provide natural proton gradients similar to those used in modern chemiosmosis</li>' +
        '<li>Iron-sulfur minerals at vents can catalyze carbon fixation reactions</li>' +
        '<li>This model explains why modern enzymes often have iron-sulfur clusters at their active sites</li>' +
        '</ul>',
        '<ul><li>In the alkaline-vent model, natural proton gradients across mineral barriers resemble the gradients used in modern chemiosmosis</li>' +
        '<li>Iron-sulfur minerals at vents may catalyze carbon-fixation reactions</li>' +
        '<li>Modern enzymes with iron-sulfur clusters are often cited as consistent with this proposal, but they do not show where life originated</li></ul>'],
      ['<p class=\'exp-key\'>Bottom Line: Deep-sea hydrothermal vents provide continuous chemical energy, mineral catalysts, and protection from harsh surface conditions - key advantages for the origin of life.</p>',
        '<p class=\'exp-key\'>Bottom Line: Alkaline hydrothermal systems are a possible setting for the origin of life: they may supply chemical energy and mineral catalysts, and they are shielded from surface ultraviolet radiation.</p>']
    ],
    keepHeadings: ['<strong>A. Hydrothermal vents provide oxygen-rich conditions ideal for aerobic metabolism:</strong>',
      '<strong>B. Hydrothermal vents contain large amounts of pre-formed DNA:</strong>',
      '<strong>C. Hydrothermal vents have lower temperatures that preserve fragile organic molecules:</strong>'],
    gone: ['The deep-sea hydrothermal vent hypothesis for the origin of life proposes', 'white smokers',
      'oxygen would destroy prebiotic organic molecules', 'synthesized only by living organisms',
      'protection from harsh surface conditions - key advantages', 'This model explains why modern enzymes']
  },

  // ---- Q6  bio-478  lac operon, neither sugar (options B and D) ---------
  {
    q: 6, id: 'bio-478', expectLetter: 'D',
    optionFull: [
      [1, 'Loss of glucose inactivates the lac repressor'],
      [3, 'The lac repressor remains active and keeps transcription strongly repressed']
    ],
    explanation: [
      ['<h4>Correct Answer: The repressor binds the operator and the operon is not transcribed</h4>',
        '<h4>Correct Answer: The lac repressor remains active and keeps transcription strongly repressed</h4>'],
      ['<p>When lactose is absent, there is no allolactose (the inducer) to bind and inactivate the lac repressor. The active repressor protein binds to the operator sequence, physically blocking RNA polymerase from transcribing the structural genes (lacZ, lacY, lacA). Even though glucose is also absent (meaning cAMP levels are high and CAP is active), the repressor\'s block at the operator prevents transcription.</p>',
        '<p>When lactose is absent, its inducer derivative allolactose is unavailable to inactivate the lac repressor. The repressor therefore strongly reduces transcription of lacZ, lacY and lacA. Low glucose favors CAP-cAMP activation, but this does not overcome strong repression in the absence of inducer. A very small amount of basal expression can still occur; repression does not mean that absolutely no transcript is ever made.</p>'],
      ['<p><strong>A. The operon is maximally transcribed due to CAP activation:</strong> While it is true that low glucose leads to high cAMP, which activates the CAP-cAMP complex, CAP activation alone is not sufficient for transcription. The repressor must also be removed from the operator by the inducer (allolactose). Both conditions - CAP activation AND inducer presence - are required for maximal transcription.</p>',
        '<p><strong>A. The operon is maximally transcribed due to CAP activation:</strong> Low glucose favors CAP-cAMP activation, but maximal expression also requires relief of lac repression. With lactose absent, the repressor remains active, so CAP activation alone does not produce maximal transcription.</p>'],
      ['<p><strong>B. The operon is transcribed at a low basal level only:</strong> Some very low-level "leaky" transcription may occur in reality (to produce the small amount of permease needed to initially transport lactose into the cell), but the standard model states that repressor binding effectively blocks transcription. For exam purposes, the operon is considered OFF when the repressor is bound.</p>',
        '<p><strong>B. Loss of glucose inactivates the lac repressor:</strong> The lac repressor responds to the lactose-derived inducer allolactose. Glucose mainly affects the CAP-cAMP control system; removing glucose does not directly inactivate the repressor.</p>'],
      ['<p><strong>C. RNA polymerase constitutively transcribes the structural genes:</strong> The lac operon is an inducible operon, meaning it is OFF by default and turned ON only when needed (when lactose is present). Constitutive expression would occur only if there were a mutation in the repressor gene or the operator.</p>',
        '<p><strong>C. RNA polymerase constitutively transcribes the structural genes:</strong> Constitutive expression means expression that no longer responds normally to the regulatory signal. The normal lac operon remains regulated. Certain mutations that disable repression can produce constitutive expression, but that is not the situation in the stem.</p>'],
      ['<th>Repressor bound?</th><th>Transcription</th>', '<th>Repressor predominantly bound?</th><th>Transcription</th>'],
      ['<tr><td>Both absent</td><td>−</td><td>−</td><td>High</td><td>Yes</td><td>Yes</td><td>OFF</td></tr><tr><td>Glucose only</td><td>+</td><td>−</td><td>Low</td><td>No</td><td>Yes</td><td>OFF</td></tr>',
        '<tr><td>Both absent</td><td>−</td><td>−</td><td>High</td><td>Yes</td><td>Yes</td><td>Strongly repressed; very low basal expression</td></tr><tr><td>Glucose only</td><td>+</td><td>−</td><td>Low</td><td>No</td><td>Yes</td><td>Strongly repressed; very low basal expression</td></tr>'],
      ['<p class=\'exp-key\'>Bottom Line: Without lactose, the lac repressor remains active and blocks transcription regardless of glucose status.</p>',
        '<p class=\'exp-key\'>Bottom Line: Without lactose, the lac repressor keeps expression very low even when low glucose favors CAP-cAMP activation.</p>']
    ],
    gone: ['The operon is transcribed at a low basal level only', 'The repressor binds the operator and the operon is not transcribed',
      'For exam purposes, the operon is considered OFF', '<td>OFF</td>', 'OFF by default']
  },

  // ---- Q7  bio-479  trp attenuation -------------------------------------
  {
    q: 7, id: 'bio-479', expectLetter: 'D',
    explanation: [
      ['<p>Attenuation is a regulatory mechanism unique to prokaryotes that uses the coupling of transcription and translation.',
        '<p>This E. coli attenuation mechanism depends on transcription and translation occurring together. Ribosome movement on the leader RNA influences whether a terminator or an antiterminator forms. Eukaryotic nuclear transcription is separated from cytoplasmic translation, so it does not use this same coupled mechanism.'],
      ['<li>Attenuation works because prokaryotes couple transcription and translation (no nuclear envelope separating the two)</li>',
        '<li>This E. coli mechanism works because transcription and translation occur together, with no nuclear envelope separating them</li>'],
      ['<li>Attenuation cannot occur in eukaryotes because transcription (nucleus) and translation (cytoplasm) are spatially separated</li>',
        '<li>Eukaryotic nuclear transcription is separated from cytoplasmic translation, so eukaryotes do not use this coupled mechanism; premature transcription termination does regulate some eukaryotic genes by other routes</li>']
    ],
    gone: ['unique to prokaryotes', 'Attenuation cannot occur in eukaryotes']
  },

  // ---- Q8  bio-480  F plasmid (stem replaced) ---------------------------
  {
    q: 8, id: 'bio-480', expectLetter: 'A',
    stemFull: 'In the classic E. coli F-plasmid system, what is the role of the F plasmid?',
    explanation: [
      ['extends its pilus to contact an F− (recipient) cell, forming a cytoplasmic bridge.',
        'extends its pilus to contact an F− (recipient) cell, establishing a connection through the conjugation machinery for DNA transfer.'],
      ['<p><strong>B. It encodes antibiotic resistance genes that are transferred to the recipient:</strong> Antibiotic resistance genes are carried on R plasmids (resistance plasmids), not the F plasmid. While the F plasmid enables the conjugation machinery, it is the R plasmid that carries resistance genes. However, R plasmids can sometimes also carry transfer genes (tra genes) or be co-transferred with F plasmids.</p>',
        '<p><strong>B. It encodes antibiotic resistance genes that are transferred to the recipient:</strong> Resistance genes define the function of an R plasmid. The classic F plasmid is identified here by its pilus and DNA-transfer genes. These categories are not mutually exclusive: some conjugative plasmids, including F-like plasmids, also carry antibiotic-resistance genes.</p>'],
      ['<p><strong>D. It carries the genes for restriction enzymes that protect against phage DNA:</strong> Restriction enzymes are encoded by the bacterial chromosome, not by the F plasmid. The restriction-modification system is a bacterial defense against bacteriophages and is unrelated to conjugation.</p>',
        '<p><strong>D. It carries the genes for restriction enzymes that protect against phage DNA:</strong> Restriction-modification systems help protect bacteria from foreign DNA. Their genes can occur on chromosomes or plasmids. They do not describe the defining fertility and DNA-transfer function of the F plasmid in this question.</p>']
    ],
    keepHeadings: ['<strong>B. It encodes antibiotic resistance genes that are transferred to the recipient:</strong>',
      '<strong>C. It integrates into the bacterial chromosome and prevents further conjugation:</strong>',
      '<strong>D. It carries the genes for restriction enzymes that protect against phage DNA:</strong>'],
    gone: ['In bacterial conjugation, what is the role of the F plasmid', 'forming a cytoplasmic bridge',
      'encoded by the bacterial chromosome, not by the F plasmid', 'unrelated to conjugation']
  },

  // ---- Q9  bio-481  generalized transduction ----------------------------
  {
    q: 9, id: 'bio-481', expectLetter: 'A',
    explanation: [
      ['<p>In generalized transduction, during the lytic cycle of a bacteriophage, the host bacterial chromosome is degraded into fragments. Occasionally, a phage head mistakenly packages a random fragment of bacterial DNA instead of phage DNA. When this defective phage particle infects a new bacterium, it injects the bacterial DNA from the previous host, which can then be incorporated into the new host\'s chromosome by homologous recombination.</p>',
        '<p>During phage-particle production, some particles mistakenly package bacterial DNA rather than the usual phage genome. A particle can then deliver that bacterial DNA to another bacterium, where it can be incorporated into the chromosome by homologous recombination. In generalized transduction, DNA from many different chromosomal regions can be transferred.</p>'],
      ['Conjugation requires physical contact between cells through a sex pilus encoded by the F plasmid. Transduction uses bacteriophages as vectors and does not involve direct cell contact.',
        'Conjugation transfers DNA between cells that come into contact; in E. coli the F pilus is the classic example, although not every conjugation system uses the same appendage. Transduction instead uses bacteriophage particles as vectors.'],
      ['<tr><td>Phage cycle</td><td>Lytic</td><td>Lysogenic (imprecise excision)</td></tr><tr><td>Genes transferred</td><td>Any random gene</td><td>Only genes near phage integration site</td></tr><tr><td>Mechanism</td><td>Accidental packaging of host DNA</td><td>Imprecise excision carries adjacent genes</td></tr>',
        '<tr><td>Typical origin of transferred DNA</td><td>Accidental packaging of bacterial DNA during phage-particle production</td><td>Faulty excision of an integrated prophage that carries adjacent bacterial DNA</td></tr><tr><td>Genes transferred</td><td>Many different chromosomal regions</td><td>Only genes near the phage integration site</td></tr>']
    ],
    gone: ['the host bacterial chromosome is degraded into fragments', '<td>Phage cycle</td>',
      'does not involve direct cell contact', '<td>Any random gene</td>']
  },

  // ---- Q10  bio-482  R plasmids -----------------------------------------
  {
    q: 10, id: 'bio-482', expectLetter: 'A',
    explanation: [
      ['These plasmids can be transferred between bacteria via conjugation, even between different species, contributing to the rapid spread of antibiotic resistance - a major global health concern.',
        'Many R plasmids can spread between bacteria by conjugation, including between different species, contributing to the rapid spread of antibiotic resistance. Some carry their own transfer machinery, some depend on a helper system, and some are not transferred this way at all.'],
      ['<p><strong>C. Encodes the enzymes for lactose metabolism:</strong> Lactose metabolism genes (lacZ, lacY, lacA) are encoded in the lac operon on the bacterial chromosome, not on a plasmid. The lac operon is a chromosomal gene cluster, not a plasmid-borne system.</p>',
        '<p><strong>C. Encodes the enzymes for lactose metabolism:</strong> The usual E. coli lacZ, lacY and lacA genes are chromosomal. Some plasmids can acquire metabolic genes, including lac genes, but the designation R plasmid refers to antibiotic resistance, not lactose metabolism.</p>'],
      ['No plasmid is required for binary fission. Plasmids are extra-chromosomal DNA elements that provide accessory functions but are not essential for basic cell division.',
        'Typical accessory resistance plasmids are not the core machinery required for bacterial cell division. Their significance here is the resistance they can confer.']
    ],
    keepHeadings: ['<strong>C. Encodes the enzymes for lactose metabolism:</strong>', '<strong>D. Is required for bacterial binary fission:</strong>'],
    gone: ['not a plasmid-borne system', 'not essential for basic cell division',
      'These plasmids can be transferred between bacteria via conjugation, even between different species']
  }
];
