/**
 * Chemistry review batch 3, display Q31-Q40 (chem-152..chem-161).
 * Q37 (chem-158) is kept byte-identical per the review and has no spec here.
 * Q36 onward carry five educational points, repaired in place.
 */
'use strict';

module.exports = [

{ q: 'Q31', id: 'chem-152', key: 'D',
  stem: 'A current of 5.0 A passes through AgNO₃ solution for 965 s. Assuming sufficient Ag⁺ and 100% current efficiency for Ag⁺ + e⁻ → Ag, what mass of silver is deposited? (M = 108 g/mol; F = 96,485 C/mol)',
  feedback: {
    A: '2.70 g would use only half the supplied charge or incorrectly require two electrons per Ag⁺. The stated half-reaction requires one electron per silver atom.',
    B: '1.08 g is 0.010 mol Ag and would require about 965 C. The actual charge is 5.0 × 965 = 4825 C, five times larger.'
  },
  points: [
    'Charge passed is Q = It = 4825 C.',
    'Ag⁺ requires one electron, so n(Ag) = Q/F ≈ 0.0500 mol at the stated efficiency.',
    'Mass = 0.0500 × 108 ≈ 5.40 g.'
  ],
  keep: ['Charge = I x t = 5.0 x 965 = 4825 C',
         'Bottom Line: Mass deposited = (I x t x M) / (n x F), where I is current, t is time, M is molar mass, n is electron count.']
},

{ q: 'Q32', id: 'chem-153', key: 'C',
  edits: [
    ['the same element acts as both the oxidizing and reducing agent, as oxygen does in H₂O₂ (−1 → −2 and −1 → 0).',
     'the same starting species supplies the element that is both oxidized and reduced; H₂O₂ serves as both oxidizing and reducing agent here, with oxygen going from −1 to −2 and from −1 to 0.']
  ],
  feedback: {
    A: 'Sodium is oxidized and chlorine is reduced. Different elements undergo the two changes, so this is ordinary redox rather than disproportionation of one species.',
    B: 'Cl₂ is reduced to chloride while bromide is oxidized to Br₂. Chlorine and bromine have different roles; one starting species is not both oxidized and reduced.'
  },
  points: [
    'Oxygen has oxidation state −1 in H₂O₂.',
    'It becomes −2 in H₂O and 0 in O₂.',
    'One starting species undergoes both reduction and oxidation, which defines disproportionation.'
  ],
  gone: ['the same element acts as both the oxidizing and reducing agent'],
  keep: ['This is a single displacement reaction where iron replaces copper.',
         'Bottom Line: Disproportionation occurs when the same element in one species is simultaneously oxidized and reduced.']
},

{ q: 'Q33', id: 'chem-154', key: 'B',
  stem: 'The standard reduction potentials are E°(Al³⁺/Al) = −1.66 V and E°(Ni²⁺/Ni) = −0.25 V. What is the standard potential of the galvanic cell formed from these half-cells?',
  edits: [
    ['<p>The more active metal (more negative E) is always the anode in a galvanic cell.</p>',
     '<p>Under standard conditions, Al is oxidized and Ni²⁺ is reduced because the nickel couple has the more positive standard reduction potential. Nonstandard concentrations can affect actual electrode potentials.</p>']
  ],
  feedback: {
    A: '−1.41 V describes the reverse standard cell reaction. For the spontaneous standard galvanic direction, E°cell = −0.25 − (−1.66) = +1.41 V.',
    C: '+1.91 V comes from adding the magnitudes 1.66 and 0.25. Both tabulated reduction potentials are negative, so subtract their signed values to obtain +1.41 V.',
    D: '−1.91 V is the signed sum of the two reduction potentials, not cathode minus anode. The standard galvanic direction in this question gives +1.41 V.'
  },
  points: [
    'Identify the couples explicitly: Al³⁺/Al and Ni²⁺/Ni.',
    'Under standard conditions, Al is the anode and Ni²⁺ reduction occurs at the cathode.',
    'Subtract signed reduction potentials: −0.25 − (−1.66) = +1.41 V.'
  ],
  bottom: 'For these standard half-cells, Al is oxidized and Ni²⁺ reduced, giving E°cell = +1.41 V.',
  gone: ['is always the anode in a galvanic cell',
         'Bottom Line: The metal with more negative standard reduction potential acts as the anode (is oxidized) in a galvanic cell.',
         'Standard cell potentials for galvanic cells must be positive.'],
  keep: ['(-0.25) - (-1.66) = -0.25 + 1.66 = 1.41 V']
},

{ q: 'Q34', id: 'chem-155', key: 'A',
  feedback: {
    B: 'The reactant Mn in MnO₄⁻ is +7, and the product Mn²⁺ is +2. The oxidation state decreases, so the stated reaction is reduction, not oxidation.',
    C: 'In MnO₄⁻, four oxygens contribute −8. The ion\'s total charge is −1, requiring Mn = +7, not +4. Mn = +4 would instead occur in MnO₂.',
    D: 'The given product is Mn²⁺, so the final oxidation state is +2. Reduction to MnO₂ would end at +4 and require three electrons per Mn; different conditions can favor different manganese products, but this question explicitly specifies Mn²⁺.'
  },
  points: [
    'In MnO₄⁻, Mn + 4(−2) = −1, so Mn is +7.',
    'Mn²⁺ is +2, a decrease of five oxidation-state units.',
    'One Mn therefore gains five electrons in the given balanced half-reaction.'
  ],
  bottom: 'Here one Mn changes from +7 to +2 and gains five electrons. In general, electron totals also account for how many atoms undergo the change.',
  gone: ['MnO₂ is the product when permanganate reacts in neutral or basic conditions (reduction by 3), but in acidic conditions (with H⁺), Mn is fully reduced to Mn²⁺',
         'Bottom Line: The number of electrons in a half-reaction equals the change in oxidation state.'],
  keep: ['Permanganate is a powerful oxidizing agent in acidic solution']
},

{ q: 'Q35', id: 'chem-156', key: 'B',
  edits: [
    ['<p>This is cathodic protection - the iron becomes the cathode and is protected from oxidation.</p>',
     '<p>This is cathodic protection - the iron becomes the cathode and is protected from oxidation.</p><p>Sacrificial-anode protection is one form of cathodic protection; another uses an externally supplied electrical current.</p>']
  ],
  feedback: {
    A: 'Gold is less readily oxidized than iron and does not provide sacrificial-anode protection. An intact coating can act as a barrier, but exposed iron at a defect can become the anodic metal in contact with gold.',
    C: 'Paint protects mainly by separating the metal from its environment. It does not use preferential oxidation of a more active metal, which is the mechanism asked about.',
    D: 'Oil provides a barrier that limits contact with moisture. It does not protect by sacrificing a more active metal. Galvanizing provides zinc that can oxidize preferentially while remaining electrically connected to the iron.'
  },
  points: [
    'Galvanizing coats iron with zinc, which is more readily oxidized.',
    'Electrically connected zinc can provide sacrificial protection even where the coating is scratched, while sufficient zinc remains.',
    'Paint and oil provide barriers; cathodic protection can use a sacrificial anode or an external current.'
  ],
  bottom: 'Galvanizing combines a zinc barrier with sacrificial-anode protection; cathodic protection is not limited to sacrificial-metal systems.',
  gone: ['Cathodic protection specifically requires a more reactive metal (like zinc or magnesium) that oxidizes preferentially',
         'Bottom Line: Cathodic protection uses a more active (more easily oxidized) metal as a sacrificial anode to protect the less active metal.'],
  keep: ['Zinc preferentially oxidizes (acts as a sacrificial anode)']
},

{ q: 'Q36', id: 'chem-157', key: 'D', expectPoints: 5,
  edits: [
    ['<p>A negative enthalpy change (ΔH < 0) indicates an exothermic reaction - heat is released to the surroundings. The combustion of carbon releases 393 kJ per mole of CO2 formed.</p>',
     '<p>At constant pressure, with only pressure-volume work, a negative enthalpy change (ΔH < 0) indicates an exothermic reaction - heat is released to the surroundings. The combustion of carbon releases about 393 kJ per mole of CO2 formed.</p>'],
    ['<p>Exothermic reactions feel hot to the touch because energy flows from the system to the surroundings.</p>',
     '<p>The released heat can warm the surroundings, although the reaction can be kept at constant temperature if that heat is removed.</p>']
  ],
  pointEdits: [
    [1, 'At constant pressure with only pressure-volume work, a negative reaction enthalpy corresponds to heat released to the surroundings.'],
    [3, 'Heat released by an exothermic reaction can warm its surroundings; the observed temperature change also depends on heat transfer and heat capacity.'],
    [4, 'The combustion of carbon in this question releases about 393 kJ per mole of CO₂ formed.'],
    [5, 'Enthalpy is a state function. Its sign alone does not determine spontaneity, which also depends on entropy and temperature.']
  ],
  bottom: 'At constant pressure, negative ΔH indicates exothermic heat release; positive ΔH indicates endothermic heat absorption, under the usual pressure-volume-work assumption.',
  gone: ['Exothermic reactions feel hot to the touch',
         'Combustion reactions such as this one are always strongly exothermic.',
         'Enthalpy change describes heat exchange only - on its own it does not determine whether a reaction is spontaneous.'],
  keep: ['The sign convention is written from the system\'s point of view',
         'Isothermal describes a process held at constant temperature.']
},

{ q: 'Q38', id: 'chem-159', key: 'B', expectPoints: 5,
  feedback: {
    C: 'A 50 °C rise would require q = 50.0 × 4.18 × 50 = 10,450 J, more than the supplied 4180 J. Omitting c would give 4180/50.0 = 83.6 J/g, not a temperature rise of 50 °C. Use ΔT = q/(mc) to obtain 20 °C.'
  },
  gone: ['50 °C comes from dividing the heat by the mass alone and omitting the specific heat capacity.'],
  keep: ['Rearranging Q = mcΔT for temperature change gives ΔT = Q/(mc).',
         'Bottom Line: q = mc(ΔT); rearrange to find any unknown variable in calorimetry problems.']
},

{ q: 'Q39', id: 'chem-160', key: 'A', expectPoints: 5,
  stem: 'Using the gas-phase bond enthalpies H-H = 436, Cl-Cl = 243 and H-Cl = 431 kJ/mol, estimate ΔH for H₂(g) + Cl₂(g) → 2HCl(g), for the reaction as written.',
  feedback: {
    C: 'Forming the two H-Cl bonds releases 862 kJ, so its contribution is −862 kJ, not +862 kJ. Breaking H-H and Cl-Cl requires +679 kJ. Combining both contributions gives ΔH = +679 − 862 = −183 kJ.'
  },
  pointEdits: [
    [5, 'This calculation uses gas-phase bond enthalpies and the specified bonds. Mean bond enthalpies used for more complex molecules give estimates; phase changes require separate consideration.']
  ],
  gone: ['862 kJ is the energy released in forming the two H–Cl bonds alone (2 × 431). The energy absorbed in breaking H–H and Cl–Cl must still be subtracted from it.',
         'Bond energies are averages taken across many compounds'],
  keep: ['(436 + 243) - (2 x 431) = 679 - 862 = -183 kJ',
         'The magnitude is correct but the sign is inverted']
},

{ q: 'Q40', id: 'chem-161', key: 'C', expectPoints: 5,
  stem: 'In the model ΔG = ΔH − TΔS, treating ΔH and ΔS as temperature-independent, which sign combination makes ΔG negative at every positive absolute temperature?',
  edits: [
    ['<p>An exothermic reaction with increasing entropy is always spontaneous.</p>',
     '<p>Within this model, ΔH < 0 and ΔS > 0 make both contributions to ΔG negative for T > 0. At constant temperature and pressure, negative ΔG indicates a thermodynamically favorable forward process; it does not specify its speed.</p>']
  ],
  pointEdits: [
    [1, 'At constant temperature and pressure, a negative Gibbs free-energy change indicates a thermodynamically favorable process.'],
    [2, 'Treating ΔH and ΔS as temperature-independent, ΔH < 0 and ΔS > 0 give ΔG < 0 for every T > 0.'],
    [3, 'In the same model, ΔH > 0 and ΔS < 0 give ΔG > 0 for every T > 0.']
  ],
  bottom: 'With temperature-independent ΔH < 0 and ΔS > 0, the model ΔG = ΔH − TΔS is negative for every positive absolute temperature.',
  gone: ['An exothermic reaction with increasing entropy is always spontaneous.',
         'Spontaneity is decided by the Gibbs free energy change'],
  keep: ['This combination is never spontaneous at any temperature.',
         'a spontaneous reaction can still be immeasurably slow without a catalyst']
}

];
