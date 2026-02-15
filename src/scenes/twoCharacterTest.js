export const twoCharacterTestScene = {
  npc: {
    name: 'Jax & Mira',
    type: 'duo',
    location: 'Rooftop lounge, late evening',
    initialStats: {
      jaxMood: 0,
      miraMood: 0,
    },
    traits: ['competitive', 'thoughtful', 'curious', 'confident'],
    currentMood: 'both watching your reactions closely',
  },

  backdrop: 'Skylight Terrace',

  background: 'locations/park_bench.png',

  sceneContext:
    'Two people you like equally ask you to choose how you want this to go. Every answer shifts the balance.',

  exchanges: [
    {
      turn: 1,
      npcOpening: {
        dialogue:
          'Jax leans in. “We both like you. If you had to pick a vibe tonight, who are you leaning toward?”',
        action: 'Jax smiles, Mira watches your eyes.',
        subtext: 'They want honesty, but neither wants to feel second place.',
      },
      playerChoices: [
        {
          id: 't1_choice_a',
          intent: 'Acknowledge Jax',
          tone: 'Playful, direct',
          riskLevel: 'Moderate',
          display: '“Jax, your energy’s calling me.”',
          statDeltas: { jaxMood: +0.04, miraMood: -0.02 },
        },
        {
          id: 't1_choice_b',
          intent: 'Acknowledge Mira',
          tone: 'Gentle, sincere',
          riskLevel: 'Moderate',
          display: '“Mira, I like the way you listen.”',
          statDeltas: { jaxMood: -0.02, miraMood: +0.04 },
        },
      ],
    },
    {
      turn: 2,
      npcOpening: {
        dialogue:
          'Mira folds her arms. “What would make you choose someone long-term?”',
        action: 'She studies you carefully.',
        subtext: 'She wants to know if you value depth or thrill.',
      },
      playerChoices: [
        {
          id: 't2_choice_a',
          intent: 'Value depth',
          tone: 'Thoughtful',
          riskLevel: 'Safe',
          display: '“Consistency, honesty, and calm.”',
          statDeltas: { jaxMood: -0.01, miraMood: +0.03 },
        },
        {
          id: 't2_choice_b',
          intent: 'Value thrill',
          tone: 'Bold',
          riskLevel: 'Moderate',
          display: '“Chemistry. The kind you can’t ignore.”',
          statDeltas: { jaxMood: +0.03, miraMood: -0.01 },
        },
      ],
    },
    {
      turn: 3,
      npcOpening: {
        dialogue:
          'Jax grins. “If I surprised you with a date tonight, would you say yes?”',
        action: 'He taps the table, waiting.',
        subtext: 'He wants a clear green light.',
      },
      playerChoices: [
        {
          id: 't3_choice_a',
          intent: 'Accept Jax',
          tone: 'Excited',
          riskLevel: 'Moderate',
          display: '“Yes. Surprise me.”',
          statDeltas: { jaxMood: +0.04, miraMood: -0.02 },
        },
        {
          id: 't3_choice_b',
          intent: 'Keep it open',
          tone: 'Careful',
          riskLevel: 'Safe',
          display: '“Only if Mira gets one too.”',
          statDeltas: { jaxMood: +0.01, miraMood: +0.01 },
        },
      ],
    },
    {
      turn: 4,
      npcOpening: {
        dialogue:
          'Mira smiles faintly. “If I asked you to slow down and really talk, would you?”',
        action: 'She waits, patient and steady.',
        subtext: 'She wants to know if you can meet her pace.',
      },
      playerChoices: [
        {
          id: 't4_choice_a',
          intent: 'Choose Mira’s pace',
          tone: 'Warm',
          riskLevel: 'Safe',
          display: '“Yes. I want to know you.”',
          statDeltas: { jaxMood: -0.01, miraMood: +0.03 },
        },
        {
          id: 't4_choice_b',
          intent: 'Prefer fast energy',
          tone: 'Playful',
          riskLevel: 'Moderate',
          display: '“I like sparks more than silence.”',
          statDeltas: { jaxMood: +0.03, miraMood: -0.02 },
        },
      ],
    },
    {
      turn: 5,
      npcOpening: {
        dialogue:
          'Jax and Mira exchange a glance. “Okay,” Jax says. “What would you do if one of us got jealous?”',
        action: 'They both watch for your answer.',
        subtext: 'They want to see if you can handle tension.',
      },
      playerChoices: [
        {
          id: 't5_choice_a',
          intent: 'Reassure both',
          tone: 'Calm',
          riskLevel: 'Safe',
          display: '“I’d be honest and reassure you both.”',
          statDeltas: { jaxMood: +0.01, miraMood: +0.02 },
        },
        {
          id: 't5_choice_b',
          intent: 'Pick one',
          tone: 'Direct',
          riskLevel: 'High',
          display: '“I’d choose the one who asked first.”',
          statDeltas: { jaxMood: +0.02, miraMood: -0.03 },
        },
      ],
    },
    {
      turn: 6,
      npcOpening: {
        dialogue:
          'Mira lifts her chin. “What’s one thing you actually want from me?”',
        action: 'Her expression softens.',
        subtext: 'She wants to feel seen.',
      },
      playerChoices: [
        {
          id: 't6_choice_a',
          intent: 'Be vulnerable',
          tone: 'Sincere',
          riskLevel: 'Safe',
          display: '“Your calm makes me feel steady.”',
          statDeltas: { jaxMood: -0.01, miraMood: +0.03 },
        },
        {
          id: 't6_choice_b',
          intent: 'Be bold',
          tone: 'Flirty',
          riskLevel: 'Moderate',
          display: '“I want the way you look at me.”',
          statDeltas: { jaxMood: +0.01, miraMood: +0.01 },
        },
      ],
    },
    {
      turn: 7,
      npcOpening: {
        dialogue:
          'Jax leans back. “And what do you want from me?”',
        action: 'He waits, eyebrow raised.',
        subtext: 'He wants clarity and excitement.',
      },
      playerChoices: [
        {
          id: 't7_choice_a',
          intent: 'Choose Jax',
          tone: 'Playful',
          riskLevel: 'Moderate',
          display: '“Your confidence. It’s magnetic.”',
          statDeltas: { jaxMood: +0.03, miraMood: -0.01 },
        },
        {
          id: 't7_choice_b',
          intent: 'Balance both',
          tone: 'Careful',
          riskLevel: 'Safe',
          display: '“I want honesty from both of you.”',
          statDeltas: { jaxMood: +0.01, miraMood: +0.01 },
        },
      ],
    },
    {
      turn: 8,
      npcOpening: {
        dialogue:
          'Mira takes a breath. “If it comes down to it, can you say no to one of us?”',
        action: 'She looks serious.',
        subtext: 'She wants to know if you can choose responsibly.',
      },
      playerChoices: [
        {
          id: 't8_choice_a',
          intent: 'Choose Mira',
          tone: 'Honest',
          riskLevel: 'High',
          display: '“Yes. I would choose you.”',
          statDeltas: { jaxMood: -0.03, miraMood: +0.04 },
        },
        {
          id: 't8_choice_b',
          intent: 'Avoid choosing',
          tone: 'Neutral',
          riskLevel: 'Moderate',
          display: '“I’d try to be fair to both.”',
          statDeltas: { jaxMood: -0.01, miraMood: -0.01 },
        },
      ],
    },
    {
      turn: 9,
      npcOpening: {
        dialogue:
          'Jax laughs softly. “Final question. If we both asked you out, what would you say?”',
        action: 'He watches your reaction.',
        subtext: 'He wants a decisive answer.',
      },
      playerChoices: [
        {
          id: 't9_choice_a',
          intent: 'Choose Jax',
          tone: 'Direct',
          riskLevel: 'High',
          display: '“I’d go with you, Jax.”',
          statDeltas: { jaxMood: +0.04, miraMood: -0.03 },
        },
        {
          id: 't9_choice_b',
          intent: 'Choose Mira',
          tone: 'Gentle',
          riskLevel: 'High',
          display: '“I’d choose Mira.”',
          statDeltas: { jaxMood: -0.03, miraMood: +0.04 },
        },
      ],
    },
    {
      turn: 10,
      npcOpening: {
        dialogue:
          'They both nod. “Then tell us what you want next,” Mira says.',
        action: 'Both wait for your decision.',
        subtext: 'This is the moment of choice.',
      },
      playerChoices: [
        {
          id: 't10_choice_a',
          intent: 'Choose Jax',
          tone: 'Committed',
          riskLevel: 'High',
          display: '“Jax, I want to go out with you.”',
          statDeltas: { jaxMood: +0.05, miraMood: -0.04 },
        },
        {
          id: 't10_choice_b',
          intent: 'Choose Mira',
          tone: 'Committed',
          riskLevel: 'High',
          display: '“Mira, I want to see you.”',
          statDeltas: { jaxMood: -0.04, miraMood: +0.05 },
        },
      ],
    },
  ],
}
