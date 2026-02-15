/**
 * Park Encounter - Quirky Artist (First Meeting)
 * All stats start at 0 (baseline)
 * Stats scale from 0 to 1, choices impact 0.01-0.09
 */

export const parkArtistScene = {
  npc: {
    name: "Alex",
    type: "artist",
    location: "Park bench, sketching",
    initialStats: {
      affinity: 0,
      trust: 0,
      attraction: 0,
      comfort: 0,
      respect: 0
    },
    traits: ["quirky", "creative", "introverted", "observant"],
    currentMood: "focused but approachable"
  },

  backdrop: "Cattails Park",

  background: "locations/park_bench.png",

  sceneContext: "Sunny afternoon in the park. Alex sits sketching on a worn wooden bench, completely absorbed. You notice them, intrigued.",

  exchanges: [
    {
      // Turn 1
      turn: 1,
      npcOpening: {
        dialogue: "...",
        action: "Focused on drawing",
        subtext: "Fully in their own world. Not rude—just genuinely unaware of your presence.",
      },

      playerChoices: [
        {
          id: "p1_choice_a",
          intent: "Compliment their art",
          tone: "Sincere, admiring",
          riskLevel: "Safe",
          display: "\"That's really good. Can I see?\"",
          statDeltas: {
            affinity: +0.02,
            trust: +0.01,
            attraction: +0.01,
            comfort: +0.01,
            respect: +0.01
          }
        },
        {
          id: "p1_choice_b",
          intent: "Make a playful observation",
          tone: "Teasing, light",
          riskLevel: "Moderate",
          display: "\"Are you drawing the whole park or just the weird trees?\"",
          statDeltas: {
            affinity: +0.01,
            trust: +0.01,
            attraction: +0.01,
            comfort: -0.01,
            respect: +0.01
          }
        },
        {
          id: "p1_choice_c",
          intent: "Be direct and curious",
          tone: "Earnest, genuine",
          riskLevel: "Moderate",
          display: "\"What are you working on? You look really focused.\"",
          statDeltas: {
            affinity: +0.01,
            trust: +0.01,
            attraction: +0.01,
            comfort: +0.01,
            respect: +0.01
          }
        }
      ]
    },

    {
      // Turn 2 - Response to player choice
      turn: 2,
      npcOpening: {
        dialogue: "...Oh. Hi.",
        action: "Glances up, closes notebook",
        subtext: "Caught off guard. Not sure what you want yet."
      },
      playerChoiceRef: "p1_choice_a", // If player complimented
      npcResponse: {
        dialogue: "Oh! Thanks. Most people don't actually... look. It's just sketches.",
        action: "Looks up with surprise, shows drawings",
        subtext: "Genuinely touched by the attention but downplaying the work. Shares something personal because the compliment felt real.",
        statDeltas: {
          affinity: +0.01,
          trust: +0.01,
          attraction: +0.01,
          comfort: +0.01,
          respect: +0.01
        }
      },

      playerChoices: [
        {
          id: "p2_choice_a",
          intent: "Engage with what they're showing",
          tone: "Interested, thoughtful",
          riskLevel: "Safe",
          display: "\"These details are beautiful. Why shadows specifically?\"",
          statDeltas: {
            affinity: +0.01,
            trust: +0.01,
            attraction: +0.01,
            comfort: +0.01,
            respect: +0.02
          }
        },
        {
          id: "p2_choice_b",
          intent: "Share a personal observation",
          tone: "Vulnerable, honest",
          riskLevel: "Moderate",
          display: "\"I get it. I do the same thing—notice small details nobody else cares about.\"",
          statDeltas: {
            affinity: +0.02,
            trust: +0.02,
            attraction: +0.01,
            comfort: +0.01,
            respect: +0.01
          }
        },
        {
          id: "p2_choice_c",
          intent: "Deflect with humor",
          tone: "Light, self-deprecating",
          riskLevel: "Low",
          display: "\"Better than my sketches. Mine look like stick figures with depression.\"",
          statDeltas: {
            affinity: +0.01,
            trust: +0.01,
            attraction: +0.01,
            comfort: +0.01,
            respect: -0.01
          }
        }
      ]
    },

    {
      // Turn 3 - After Turn 2 choice_b (deepest path)
      turn: 3,
      npcOpening: {
        dialogue: "Interesting. I don't usually talk about this stuff.",
        action: "Nods slightly, cautious",
        subtext: "Curious but not fully open yet. Testing the waters."
      },
      playerChoiceRef: "p2_choice_b",
      npcResponse: {
        dialogue: "Really? What kinds of things? ...I mean, if you don't mind saying.",
        action: "Eyes light up, sets notebook down",
        subtext: "Suddenly interested—maybe too interested. This person *gets it*. But also a little nervous about having revealed something.",
        statDeltas: {
          affinity: +0.01,
          trust: +0.01,
          attraction: +0.01,
          comfort: +0.01,
          respect: +0.01
        }
      },

      playerChoices: [
        {
          id: "p3_choice_a",
          intent: "Open up genuinely",
          tone: "Vulnerable, authentic",
          riskLevel: "High",
          display: "\"How people express themselves when they think no one's watching. Faces, tiny gestures. It feels real.\"",
          statDeltas: {
            affinity: +0.05,
            trust: +0.09,
            attraction: +0.05,
            comfort: +0.01,
            respect: +0.09
          }
        },
        {
          id: "p3_choice_b",
          intent: "Match their energy but stay guarded",
          tone: "Warm but measured",
          riskLevel: "Low",
          display: "\"The way light hits things at different times of day. Golden hour stuff, mostly.\"",
          statDeltas: {
            affinity: +0.01,
            trust: +0.01,
            attraction: +0.01,
            comfort: +0.01,
            respect: +0.01
          }
        },
        {
          id: "p3_choice_c",
          intent: "Turn it back on them",
          tone: "Playful, deflecting",
          riskLevel: "Low",
          display: "\"Anyway, you first. What's the deal with all the shadows?\"",
          statDeltas: {
            affinity: +0.01,
            trust: -0.01,
            attraction: +0.01,
            comfort: -0.01,
            respect: +0.01
          }
        }
      ]
    },

    {
      // Turn 4 - After Turn 3 choice_a (deepest connection)
      turn: 4,
      npcOpening: {
        dialogue: "That's fair. I get that.",
        action: "Looks thoughtful, taps pencil",
        subtext: "Building rapport, but still feeling things out."
      },
      playerChoiceRef: "p3_choice_a",
      npcResponse: {
        dialogue: "Yeah... yeah, exactly. That's when things feel true.",
        action: "Nods, looks back thoughtfully",
        subtext: "Genuinely moved. Recognizing something rare—a kindred observer. The awkwardness is real vulnerability, not fake shyness.",
        statDeltas: {
          affinity: +0.02,
          trust: +0.02,
          attraction: +0.02,
          comfort: +0.01,
          respect: +0.02
        }
      },

      playerChoices: [
        {
          id: "p4_choice_a",
          intent: "Accept warmly and share equally",
          tone: "Genuine, reciprocal",
          riskLevel: "Safe",
          display: "*shakes hand* I'm [Player]. And you're not bad at it. This is the most real conversation I've had in weeks.",
          statDeltas: {
            affinity: +0.02,
            trust: +0.01,
            attraction: +0.01,
            comfort: +0.01,
            respect: +0.01
          }
        },
        {
          id: "p4_choice_b",
          intent: "Be playful about the awkwardness",
          tone: "Teasing, warm",
          riskLevel: "Moderate",
          display: "*smiles* You're doing fine. I'd say you earned extra points for the nervous hand-shake.",
          statDeltas: {
            affinity: +0.01,
            trust: +0.01,
            attraction: +0.02,
            comfort: +0.01,
            respect: +0.01
          }
        },
        {
          id: "p4_choice_c",
          intent: "Pull back slightly",
          tone: "Reserved, cautious",
          riskLevel: "Low",
          display: "*shakes hand briefly* Nice to meet you, Alex. I should probably let you get back to drawing.",
          statDeltas: {
            affinity: -0.01,
            trust: -0.01,
            attraction: -0.01,
            comfort: -0.01,
            respect: +0.01
          }
        }
      ]
    },

    {
      // Turn 5 - Final exchange (after p4_choice_a - the ideal path)
      turn: 5,
      npcOpening: {
        dialogue: "So... this has been nice.",
        action: "Smiles, glances around",
        subtext: "Opening up to the possibility of connection, but leaving room for it to end naturally."
      },
      playerChoiceRef: "p4_choice_a",
      npcResponse: {
        dialogue: "Huh. Well, that's... nice. Do you come to the park a lot, or was this random?",
        action: "Laughs, opens notebook casually",
        subtext: "Relaxing into the conversation. Actually hoping you'll stick around but giving you an easy out. Testing whether this continues.",
        statDeltas: {
          affinity: +0.01,
          trust: +0.01,
          attraction: +0.01,
          comfort: +0.02,
          respect: +0.01
        }
      },

      playerChoices: [
        {
          id: "p5_choice_a",
          intent: "Express genuine interest in them",
          tone: "Sincere, forward",
          riskLevel: "Moderate",
          display: "\"Random today, but maybe I'll make it a habit now. If that's not weird.\"",
          statDeltas: {
            affinity: +0.02,
            trust: +0.01,
            attraction: +0.02,
            comfort: +0.01,
            respect: +0.01
          }
        },
        {
          id: "p5_choice_b",
          intent: "Keep it light but suggest continuation",
          tone: "Playful, open-ended",
          riskLevel: "Low",
          display: "\"Random. But I like this spot now. Especially on sketching days.\"",
          statDeltas: {
            affinity: +0.01,
            trust: +0.01,
            attraction: +0.01,
            comfort: +0.01,
            respect: +0.01
          }
        },
        {
          id: "p5_choice_c",
          intent: "Ask them out directly",
          tone: "Bold, direct",
          riskLevel: "High",
          display: "\"Actually... would you want to grab coffee after this? I could listen to you talk about art all day.\"",
          statDeltas: {
            affinity: +0.01,
            trust: +0.01,
            attraction: +0.09,
            comfort: -0.01,
            respect: +0.01
          }
        }
      ]
    }
  ],

  // Scene exit conditions
  sceneEnds: {
    onChoice: "p5_choice_a", // Or any final choice
    finalMessage: "Alex smiles, genuinely this time. Not the polite kind. The kind that means something shifted.",
    resultingState: {
      affinity: 0.17,
      trust: 0.13,
      attraction: 0.11,
      comfort: 0.07,
      respect: 0.13
    },
    nextScene: null // Can branch to coffee date, phone number exchange, etc.
  }
};

export default parkArtistScene;
