export const characterProfiles = [
  {
    id: 'alex',
    name: 'Alex',
    personality: 'Quirky artist who draws in notebooks and sees beauty in small moments.',
    image: '/characters/cute_1.png',
  },
  {
    id: 'jax',
    name: 'Jax Rivera',
    personality: 'Competitive barista with a sharp wit and a soft spot for sincerity.',
    image: '/characters/cute_2.png',
  },
  {
    id: 'mira',
    name: 'Mira Sol',
    personality: 'Quiet astronomer who opens up when you ask thoughtful questions.',
    image: '/characters/cute_3.png',
  },
  {
    id: 'rome',
    name: 'Rome Kline',
    personality: 'Warmhearted athlete who prefers direct answers and honest energy.',
    image: '/characters/cute_4.png',
  },
]

export const dialogueScenes = {
  intro: {
    id: 'intro',
    characterId: 'alex',
    background: '/locations/park_bench.png',
    text: 'A breeze carries a hint of paint thinner. Alex looks up from their sketchbook. "Hey {playerName}, you made it. Do you like the way the light hits the fountain?"',
    choices: [
      {
        label: '“It looks like a scene from a dream.”',
        nextSceneId: 'alex_dream',
        affinityDelta: { alex: 2 },
      },
      {
        label: '“It’s neat. Do you draw here often?”',
        nextSceneId: 'alex_practice',
        affinityDelta: { alex: 1 },
      },
      {
        label: '“I prefer coffee shops.”',
        nextSceneId: 'jax_intro',
        affinityDelta: { alex: -1, jax: 1 },
      },
    ],
  },
  luna_dream: {
    id: 'luna_dream',
    characterId: 'luna',
    background: '/locations/park_bench.png',
    text: 'Luna smiles. “Then maybe we can dream up a second date. Will you sit with me while I sketch?”',
    choices: [
      {
        label: '“Absolutely. I’ll be your muse.”',
        nextSceneId: 'mira_intro',
        affinityDelta: { luna: 2 },
      },
      {
        label: '“Only if you draw me like one of your legends.”',
        nextSceneId: 'luna_tease',
        affinityDelta: { luna: 1 },
      },
    ],
  },
  luna_practice: {
    id: 'luna_practice',
    characterId: 'luna',
    background: '/locations/park_bench.png',
    text: '“Whenever the light is kind,” she says. “Today it feels generous. How’s your day going?”',
    choices: [
      {
        label: '“Better now.”',
        nextSceneId: 'mira_intro',
        affinityDelta: { luna: 1 },
      },
      {
        label: '“Busy. I need a good coffee.”',
        nextSceneId: 'jax_intro',
        affinityDelta: { jax: 1 },
      },
    ],
  },
  luna_tease: {
    id: 'luna_tease',
    characterId: 'luna',
    background: '/locations/park_bench.png',
    text: 'She laughs, the kind that sounds like a brush tapping a palette. “Deal. But only if you’ll share your secret ambitions with me.”',
    choices: [
      {
        label: '“Maybe. I’m still deciding.”',
        nextSceneId: 'rome_intro',
        affinityDelta: { luna: 1 },
      },
      {
        label: '“I want to build something unforgettable.”',
        nextSceneId: 'mira_intro',
        affinityDelta: { luna: 2 },
      },
    ],
  },
  jax_intro: {
    id: 'jax_intro',
    characterId: 'jax',
    background: '/locations/park_bench.png',
    text: 'The espresso bar hums with energy. Jax slides a latte your way. “So, {playerName}, what’s your usual?”',
    choices: [
      {
        label: '“Surprise me. I trust your taste.”',
        nextSceneId: 'jax_surprise',
        affinityDelta: { jax: 2 },
      },
      {
        label: '“Something bold. I can handle it.”',
        nextSceneId: 'jax_bold',
        affinityDelta: { jax: 1 },
      },
      {
        label: '“I’m here for the company.”',
        nextSceneId: 'mira_intro',
        affinityDelta: { jax: 1 },
      },
    ],
  },
  jax_surprise: {
    id: 'jax_surprise',
    characterId: 'jax',
    background: '/locations/park_bench.png',
    text: '“Brave,” Jax says, scribbling on a cup. “Let’s see if you can handle a mystery roast.”',
    choices: [
      {
        label: '“Only if you sit with me.”',
        nextSceneId: 'rome_intro',
        affinityDelta: { jax: 2 },
      },
      {
        label: '“Challenge accepted.”',
        nextSceneId: 'mira_intro',
        affinityDelta: { jax: 1 },
      },
    ],
  },
  jax_bold: {
    id: 'jax_bold',
    characterId: 'jax',
    background: '/locations/park_bench.png',
    text: '“Confidence. I like that.” Jax taps the counter. “Tell me something honest, {playerName}.”',
    choices: [
      {
        label: '“I’m nervous about making the right choice.”',
        nextSceneId: 'mira_intro',
        affinityDelta: { jax: 1 },
      },
      {
        label: '“I always go with my gut.”',
        nextSceneId: 'rome_intro',
        affinityDelta: { jax: 1 },
      },
    ],
  },
  mira_intro: {
    id: 'mira_intro',
    characterId: 'mira',
    background: '/locations/park_bench.png',
    text: 'The observatory is quiet. Mira points to a star chart. “If you could name a constellation after yourself, {playerName}, what would it be?”',
    choices: [
      {
        label: '“The Pathfinder.”',
        nextSceneId: 'mira_path',
        affinityDelta: { mira: 2 },
      },
      {
        label: '“The Comet.”',
        nextSceneId: 'mira_comet',
        affinityDelta: { mira: 1 },
      },
      {
        label: '“The Challenger.”',
        nextSceneId: 'rome_intro',
        affinityDelta: { mira: 1, rome: 1 },
      },
    ],
  },
  mira_path: {
    id: 'mira_path',
    characterId: 'mira',
    background: '/locations/park_bench.png',
    text: 'Mira nods thoughtfully. “That sounds like someone who doesn’t give up. I could use a partner like that.”',
    choices: [
      {
        label: '“I’ll be right here.”',
        nextSceneId: 'rome_intro',
        affinityDelta: { mira: 2 },
      },
      {
        label: '“Only if you keep the stars coming.”',
        nextSceneId: 'jax_intro',
        affinityDelta: { mira: 1 },
      },
    ],
  },
  mira_comet: {
    id: 'mira_comet',
    characterId: 'mira',
    background: '/locations/park_bench.png',
    text: '“A comet,” she repeats softly. “Bright, rare, and a little unpredictable.”',
    choices: [
      {
        label: '“That sounds like me.”',
        nextSceneId: 'rome_intro',
        affinityDelta: { mira: 1 },
      },
      {
        label: '“Or like someone I want to know.”',
        nextSceneId: 'jax_intro',
        affinityDelta: { mira: 2 },
      },
    ],
  },
  rome_intro: {
    id: 'rome_intro',
    characterId: 'rome',
    background: '/locations/park_bench.png',
    text: 'Rome tosses you a towel after practice. “You kept up, {playerName}. What’s your idea of a perfect break?”',
    choices: [
      {
        label: '“Something calm. Maybe a sunset walk.”',
        nextSceneId: 'rome_calm',
        affinityDelta: { rome: 2 },
      },
      {
        label: '“Competition keeps me energized.”',
        nextSceneId: 'rome_compete',
        affinityDelta: { rome: 1 },
      },
      {
        label: '“Depends on who I’m with.”',
        nextSceneId: 'luna_dream',
        affinityDelta: { rome: 1, luna: 1 },
      },
    ],
  },
  rome_calm: {
    id: 'rome_calm',
    characterId: 'rome',
    background: '/locations/park_bench.png',
    text: 'Rome grins. “I can do calm. Especially if you’re there to keep me grounded.”',
    choices: [
      {
        label: '“Deal.”',
        nextSceneId: 'luna_practice',
        affinityDelta: { rome: 2 },
      },
      {
        label: '“Let’s plan it.”',
        nextSceneId: 'mira_intro',
        affinityDelta: { rome: 1 },
      },
    ],
  },
  rome_compete: {
    id: 'rome_compete',
    characterId: 'rome',
    background: '/locations/park_bench.png',
    text: '“I like that fire.” Rome nudges your shoulder. “Show me what you’ve got next time.”',
    choices: [
      {
        label: '“You’re on.”',
        nextSceneId: 'jax_intro',
        affinityDelta: { rome: 1 },
      },
      {
        label: '“Only if there’s a prize.”',
        nextSceneId: 'luna_dream',
        affinityDelta: { rome: 1, luna: 1 },
      },
    ],
  },
}
