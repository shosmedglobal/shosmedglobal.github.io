/* Chemistry batch 7, display Q11-Q20 (chem-372 .. chem-381). */
'use strict';
module.exports = [

{ q: 'Q11', id: 'chem-372', key: 'B',
  stemWas: 'Which type of lipid is the main structural component of biological cell membranes?',
  stem: 'Which lipid class provides the basic bilayer framework of human cell membranes?',
  mainEdits: [['Phospholipids are amphipathic molecules with a hydrophilic phosphate head group and two hydrophobic fatty acid tails. In aqueous environments, they spontaneously arrange into a bilayer - the fundamental architecture of all biological membranes.',
               'Typical membrane phospholipids have a polar, phosphate-containing head and two hydrophobic hydrocarbon chains. In water, these amphipathic molecules assemble into the bilayer framework of human cell membranes, with the polar heads facing water and the nonpolar chains sheltered inside.']],
  keep: ['This bilayer acts as a selectively permeable barrier, allowing small nonpolar molecules to pass while restricting ions and large polar molecules.'],
  gone: ['the fundamental architecture of all biological membranes'] },

{ q: 'Q12', id: 'chem-373', key: 'C',
  stemWas: 'At physiological pH (~7.4), a free amino acid exists primarily as a:',
  stem: 'At pH 7.4, which form predominates for free glycine (R = H)?',
  main: "At pH 7.4, glycine's carboxyl group is predominantly deprotonated (COO⁻) and its amino group predominantly protonated (NH₃⁺). The predominant species therefore carries one positive and one negative charge and is a zwitterion. This does not mean that pH 7.4 is glycine's isoelectric point: its pI is about 6. The pI is the pH at which the population of molecules has zero average net charge. Amino acids with ionizable side chains can have a different predominant net charge at pH 7.4.",
  fb: {
    A: "The fully protonated cation predominates at sufficiently low pH, when the carboxyl group is mainly COOH. At pH 7.4, glycine's carboxyl group is mainly COO⁻.",
    B: 'The form with NH₂ and COO⁻ predominates at sufficiently high pH, when the amino group loses its proton. At pH 7.4, that amino group is still mainly NH₃⁺.',
    D: 'The uncharged NH₂-CHR-COOH form is not the predominant form of glycine in water at pH 7.4. A zwitterion has charged groups even though its own charges sum to zero.'
  },
  bl: 'Glycine is predominantly a zwitterion at pH 7.4. Predominant molecular form and isoelectric point are different concepts. Do not assume every amino acid has zero net charge at physiological pH.',
  gone: ['which is near the isoelectric point of most amino acids',
         'the molecule carries both positive and negative charges but has zero net charge',
         'The isoelectric point (pI) is the pH at which the amino acid has zero net charge.'] },

{ q: 'Q13', id: 'chem-374', key: 'C',
  main: 'A peptide bond is a covalent amide linkage, –C(=O)–N–, joining amino-acid residues in a polypeptide. Its net formation from free amino and carboxyl groups can be drawn as loss of water. In cells, however, ribosomes form peptide bonds using activated amino acids attached to tRNAs, rather than directly dehydrating free amino acids. Resonance gives the peptide C–N bond partial double-bond character, restricting its rotation and making the peptide group approximately planar.',
  keep: ['Links monosaccharides together in carbohydrates'],
  gone: ['formed by a condensation reaction between the carboxyl group (-COOH) of one amino acid and the amino group (-NH₂) of the next, with the loss of one water molecule'] },

{ q: 'Q14', id: 'chem-375', key: 'A',
  stemWas: "According to Le Chatelier's principle, if the concentration of a reactant is increased in a system at equilibrium, the system will:",
  stem: 'For the dilute aqueous equilibrium A(aq) ⇌ B(aq) at constant temperature, increasing [A] while initially leaving [B] unchanged causes the system to:',
  mainEdits: [['Adding more reactant increases the reactant concentration, so the system shifts toward products (forward reaction accelerates) until a new equilibrium is established at the same Keq but with different concentrations.',
               'Here, adding A lowers the reaction quotient [B]/[A] below its equilibrium value, so net conversion toward B occurs until equilibrium is restored at the same equilibrium constant.']],
  fb: {
    C: 'For the equilibrium and concentration change specified, the reaction quotient changes, so the mixture is no longer at equilibrium. A catalyst would change how rapidly equilibrium is reached without changing its position.'
  },
  bl: 'For A(aq) ⇌ B(aq), increasing [A] alone shifts the mixture toward B; increasing [B] alone shifts it toward A. At constant temperature the equilibrium constant is unchanged. Adding more of a pure solid or pure liquid already present does not generally have the same effect.',
  keep: ["Le Chatelier's principle states that when a system at equilibrium is subjected to a stress, it shifts in the direction that partially relieves that stress.",
         'The equilibrium constant (Keq) depends only on temperature.'],
  gone: ['forward reaction accelerates', 'The system will always respond to a concentration change by shifting to counteract it'] },

{ q: 'Q15', id: 'chem-376', key: 'C',
  stemWas: 'A buffer solution is prepared by mixing a weak acid (HA) with its conjugate base (A⁻). What is the pH when [HA] = [A⁻]?',
  stem: 'For a dilute buffer made from a weak acid HA and its conjugate base A⁻, assume the concentration form of the Henderson-Hasselbalch equation applies. What is the pH when [HA] = [A⁻]?',
  mainEdits: [['This is also the point of maximum buffer capacity - the solution is most resistant to pH changes when pH equals pKa.',
               'For a fixed total concentration of this acid-base pair, its buffering contribution is greatest near pH = pKa.']],
  fb: {
    A: "An ideal solution with hydrogen-ion concentration 1 mol/L has pH 0. Equal buffer-component concentrations instead make pH equal to the acid's pKa, which is not generally zero.",
    B: 'The buffer has pH 7 only if its acid has pKa = 7. Equal acid and base concentrations do not automatically make a solution neutral. Neutral pH is 7 at 25 °C and changes with temperature.',
    D: 'At 25 °C, 14 - pKa gives the pKb of the conjugate base. It is not the buffer pH obtained when [HA] and [A⁻] are equal.'
  },
  bl: 'When [A⁻] = [HA], the logarithm of their ratio is zero and pH ≈ pKa. A weak-acid/conjugate-base buffer generally works best within about one pH unit of its pKa; the amount of buffer present also matters.',
  keep: ['The Henderson-Hasselbalch equation (pH = pKa + log([A⁻]/[HA]))',
         'log([A⁻]/[HA]) = log(1) = 0, so pH = pKa'],
  gone: ['the point of maximum buffer capacity', 'The bicarbonate buffer system (pKa ≈ 6.1) is the primary blood buffer',
         'maintaining pH 7.35-7.45'] },

{ q: 'Q16', id: 'chem-377', key: 'B',
  fb: {
    A: 'Reduction, meaning gain of electrons, occurs at the cathode. The species reduced may be a cation, a neutral molecule or another species; reduction is not restricted to metal cations. Remember: Red Cat = Reduction at Cathode.'
  },
  bl: 'An Ox, Red Cat: oxidation at the anode, reduction at the cathode. A galvanic cell operates spontaneously under its actual conditions, with Ecell > 0 and ΔG < 0. Under standard conditions the corresponding relation uses E°cell and ΔG°. An electrolytic cell uses external electrical energy to drive a nonspontaneous reaction.',
  keep: ['<table class=\'exp-table\'>', '<td>An Ox</td>', '<td>Red Cat</td>',
         'The salt bridge provides ion flow to maintain electrical neutrality in each half-cell'],
  gone: ['(cations gain electrons here)', 'the reaction is spontaneous (E°cell > 0, ΔG < 0)'] },

{ q: 'Q17', id: 'chem-378', key: 'B',
  fb: {
    A: 'One mole of H₂O would contain only 2 mol of hydrogen atoms and 1 mol of oxygen atoms. The stated reactants supply 4 mol of hydrogen atoms and 2 mol of oxygen atoms and react completely, so they form 2 mol of water.',
    C: 'Three moles of H₂O would require 6 mol of hydrogen atoms and 3 mol of oxygen atoms, more than the stated reactants provide.',
    D: 'Four moles of H₂O would require 8 mol of hydrogen atoms and 4 mol of oxygen atoms. The reactants provide only 4 mol of hydrogen atoms and 2 mol of oxygen atoms.'
  },
  keep: ['The balanced equation 2H₂ + O₂ → 2H₂O shows that the mole ratio of hydrogen to oxygen to water is 2:1:2.',
         'Balanced equations give mole ratios.'],
  gone: ['This would imply a 2:1:1 ratio, which does not satisfy conservation of hydrogen atoms',
         'This would require 6 hydrogen atoms and 3 oxygen atoms in the products',
         'This would require 4 oxygen atoms in the products, but only 2 are available from 1 mole of O₂.'] },

{ q: 'Q18', id: 'chem-379', key: 'B', frozen: true },

{ q: 'Q19', id: 'chem-380', key: 'C', frozen: true },

{ q: 'Q20', id: 'chem-381', key: 'C',
  mainEdits: [['(100°C)', '(100 °C at 1 atm)']],
  fb: {
    A: "London dispersion forces arise from fluctuating electron distributions and occur in all molecules. Their strength increases with polarizability and molecular size, so they are not always the weakest intermolecular attraction. They do not account for water's unusually high boiling point compared with similarly sized molecules."
  },
  blEdits: [['Hydrogen bonds form when H is bonded to F, O, or N (highly electronegative atoms with lone pairs).',
             'In the common examples studied here, hydrogen bonding occurs between an H bonded to N, O or F and a suitable lone pair on another atom.']],
  keep: ["Water's unique properties - high boiling point, high specific heat, high surface tension, ice floating - all result from extensive hydrogen bonding.",
         'Water does have permanent dipole-dipole interactions'],
  gone: ['These are the weakest intermolecular forces, arising from temporary dipoles',
         'Hydrogen bonds form when H is bonded to F, O, or N (highly electronegative atoms with lone pairs).',
         '(100°C)'] }

];
