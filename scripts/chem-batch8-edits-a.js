/* Chemistry batch 8 edit specs, display Q1-Q10. Every string here is the
   review's own supplied wording; `*Was` fields are the exact stored text the
   edit is anchored on. Feedback bodies keep their leading space. */
'use strict';
module.exports = [
  { q: 'Q1', id: 'chem-369', key: 'B', keep: true },
  { q: 'Q2', id: 'chem-382', key: 'C', keep: true },
  { q: 'Q3', id: 'chem-396', key: 'C', keep: true },
  { q: 'Q4', id: 'chem-409', key: 'A', keep: true },

  { q: 'Q5', id: 'chem-422', key: 'D',
    headWas: '<p>Mutarotation is the gradual change in optical rotation observed when a pure anomer (α or β) of a sugar is dissolved in water. The cyclic hemiacetal ring opens transiently to form the open-chain (linear) aldehyde, which can then re-close to form either the α or β anomer. Over time, an equilibrium mixture of both anomers is established, and the specific rotation reaches a stable intermediate value.</p>',
    head: "<p>Mutarotation is a change in optical rotation as a sugar's anomeric composition approaches equilibrium in solution. A cyclic hemiacetal or hemiketal can open to the carbonyl form and close again to form either anomer. The open-chain form is an aldehyde for an aldose such as glucose and a ketone for a ketose such as fructose. Once the equilibrium composition is reached, the optical rotation becomes constant.</p>",
    fb: {
      B: " Reduction converts the sugar's carbonyl group to an alcohol, producing a sugar alcohol such as sorbitol from glucose. The carbon atom is still present, but it no longer forms the hemiacetal or hemiketal center needed for this anomeric interconversion. A sugar alcohol therefore does not undergo mutarotation."
    },
    bl: 'Mutarotation is the change in optical rotation accompanying anomer interconversion through the open-chain form until equilibrium is reached. It requires a sugar that can open and reclose at its anomeric center.' },

  { q: 'Q6', id: 'chem-423', key: 'C',
    stemWas: 'In a Haworth projection of β-D-glucopyranose, the hydroxyl group at C1 is oriented:',
    stem: 'In the conventional Haworth projection of β-D-glucopyranose, with the CH₂OH group at C5 drawn above the ring, where is the hydroxyl group at C1?',
    options: [
      [0, 'Below the plane of the ring (axial, same side as the ring oxygen reference)', 'Below the ring, on the opposite side from the CH₂OH group at C5'],
      [1, 'Above the plane of the ring (equatorial, opposite the reference carbon C6 on the right)', 'In the plane of the ring'],
      [3, 'To the right in the Fischer projection, which corresponds to below in Haworth', 'Absent, because C1 retains a carbonyl group in the cyclic form']
    ],
    headWas: '<p>In a Haworth projection of β-D-glucopyranose, the β anomer is defined by having the hydroxyl group at C1 on the SAME side of the ring as the reference group (the CH₂OH group at C5 in D-sugars). Since the CH₂OH group at C5 is drawn above the ring plane in the standard Haworth projection of D-glucose, the β-OH at C1 is also above the plane.</p>',
    head: '<p>In β-D-glucopyranose, the anomeric OH at C1 is on the same side of the ring as the CH₂OH group attached to C5. With that CH₂OH group drawn above the ring, the C1-OH is also above. Alpha and beta describe this stereochemical relationship. Axial and equatorial describe positions in a particular chair conformation and should not be substituted for up and down in a Haworth projection.</p>',
    fb: {
      A: ' An OH below the ring would be on the opposite side from the upward CH₂OH group. That describes α-D-glucopyranose in this drawing, not the β anomer.',
      B: ' The anomeric OH is represented above or below the ring in a Haworth projection. It is not drawn in the ring plane; here its same-side relationship to CH₂OH places it above.',
      D: " Glucose's C1 carbonyl becomes a hemiacetal center when the ring forms. The cyclic form has an OH at C1, whose orientation distinguishes the two anomers."
    },
    points: [
      'In β-D-glucopyranose, C1-OH and the CH₂OH group at C5 are on the same side of the ring.',
      'In α-D-glucopyranose, those groups are on opposite sides.',
      'Haworth up/down describes ring-face orientation; axial/equatorial refers to a chair conformation.'
    ] },

  { q: 'Q7', id: 'chem-424', key: 'C',
    stemWas: 'A molecule has 3 chiral centers and no internal plane of symmetry. How many stereoisomers does this molecule have?',
    stem: 'What is the maximum number of stereoisomers for a molecule with three tetrahedral stereocenters and no other source of stereoisomerism?',
    headWas: '<p>The maximum number of stereoisomers for a molecule with n chiral centers is 2<sup>n</sup>. With 3 chiral centers and no internal plane of symmetry (ruling out meso forms), all 2³ = 8 stereoisomers are distinct. These consist of 4 pairs of enantiomers (8 individual stereoisomers total).</p>',
    head: '<p>Each tetrahedral stereocenter can have R or S configuration. Three centers therefore give at most 2³ = 8 configurations. The full maximum is reached when all eight are distinct; molecular symmetry can make some assignments identical and reduce the count. The question asks for the maximum, so the answer is 8.</p>',
    fb: {
      A: ' Four is 2², the maximum for two independent tetrahedral stereocenters. Three centers give a maximum of 2³ = 8.',
      B: ' Some molecules can have six stereoisomers because symmetry reduces their count. Six is therefore not an impossible number, but it is not the maximum for the three-center case asked here.',
      D: ' Sixteen is 2⁴, the maximum for four independent tetrahedral stereocenters. Three centers allow at most eight under the stated assumptions.'
    },
    points: [
      'For n tetrahedral stereocenters and no other stereoisomerism, the maximum count is 2<sup>n</sup>.',
      'Symmetry can reduce the number of distinct stereoisomers.',
      'With three centers, the maximum is 2³ = 8.'
    ],
    bl: 'Three tetrahedral stereocenters allow a maximum of eight stereoisomers. The actual count can be smaller when symmetry makes configurations identical.' },

  { q: 'Q8', id: 'chem-425', key: 'B',
    pointEdits: [[0,
      'Meso compounds have chiral centers but are overall achiral due to an internal mirror plane',
      'Meso compounds are achiral despite containing stereocenters; in meso-tartaric acid, an internal mirror plane explains the achirality.']] },

  { q: 'Q9', id: 'chem-426', key: 'D',
    headWas: '<p>Enantiomers are stereoisomers that are non-superimposable mirror images of each other. They have identical physical properties (melting point, boiling point, solubility) except for the direction they rotate plane-polarized light (equal magnitude, opposite sign) and their interactions with other chiral molecules.</p>',
    head: '<p>Enantiomers are stereoisomers that are non-superimposable mirror images. Under the same achiral conditions, they have the same properties such as melting point and boiling point. Pure enantiomers rotate plane-polarized light by equal amounts in opposite directions under the same measurement conditions. They can interact differently with chiral environments, including enzymes and receptors.</p>',
    fb: {
      A: ' Diastereomers are stereoisomers that are not mirror images. Their physical properties generally differ. Examples include suitable cis/trans pairs and molecules that differ at some, but not all, corresponding stereocenters.',
      B: ' Conformers differ through rotations about single bonds and related changes in molecular shape. Ordinary cyclohexane conformers interconvert readily. The relationship specified here, non-superimposable mirror images, is the definition of enantiomers.'
    },
    points: [
      'Enantiomers are non-superimposable mirror-image stereoisomers.',
      'Enantiomers have matching physical properties in achiral environments but can behave differently in chiral environments.',
      'Chirality means that an object or molecule cannot be superimposed on its mirror image.'
    ] },

  { q: 'Q10', id: 'chem-427', key: 'B',
    stemWas: 'Using Cahn-Ingold-Prelog priority rules, what is the configuration of the following chiral center: a carbon bonded to -OH (highest priority), -NH₂, -CH₃, and -H (lowest priority), where viewing from opposite the -H shows the remaining three groups decreasing in priority counterclockwise?',
    stem: 'A tetrahedral carbon is bonded to OH, NH₂, CH₃ and H. With H pointing away from the viewer, the sequence OH → NH₂ → CH₃ runs counterclockwise. What is the configuration of this stereocenter?' }
];
