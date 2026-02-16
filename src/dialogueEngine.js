/**
 * Dialogue Engine - Converts intent-based scenes to app-compatible format
 */

import parkArtistScene from './scenes/parkArtist.js'
import { twoCharacterTestScene } from './scenes/twoCharacterTest.js'
import romeChapter1Scene from './scenes/rome_chapter1b.json'

export const intents = {
  COMPLIMENT: 'compliment',
  TEASE: 'tease',
  BE_CURIOUS: 'be_curious',
  ENGAGE: 'engage',
  VULNERABLE: 'vulnerable',
  DEFLECT: 'deflect',
  DIRECT: 'direct',
  MATCH_ENERGY: 'match_energy',
  PULL_BACK: 'pull_back',
  BOLD: 'bold',
}

/**
 * Converts intent-based dialogue exchange to legacy format
 * Handles multiple branching paths based on player choice history
 */
export function convertSceneToLegacy(sceneData, choiceHistory = []) {
  if (sceneData?.format === 'graph-v1') {
    return convertGraphSceneToLegacy(sceneData, choiceHistory)
  }

  const { npc, sceneContext, backdrop, background, exchanges } = sceneData
  
  // Find current exchange based on choice history
  let currentExchange = exchanges[0]
  let currentStats = { ...npc.initialStats }

  // Apply choices from history
  choiceHistory.forEach((choiceId, index) => {
    const exchange = exchanges[index]
    if (!exchange) return

    // Find the chosen option
    const chosenOption = exchange.playerChoices.find(c => c.id === choiceId)
    if (!chosenOption) return

    // Update stats
    Object.entries(chosenOption.statDeltas || {}).forEach(([stat, delta]) => {
      currentStats[stat] = (currentStats[stat] ?? 0) + delta
    })

    // Move to next exchange
    if (exchanges[index + 1]) {
      currentExchange = exchanges[index + 1]
      
      // Find NPC response for this choice
      if (currentExchange.playerChoiceRef === choiceId) {
        // Use the specific response for this choice
      }
    }
  })

  // Get NPC opening or current NPC response
  let npcDialogue = ''
  let npcAction = ''
  let npcSubtext = ''

  if (choiceHistory.length === 0) {
    // First turn - use opening
    npcDialogue = currentExchange.npcOpening.dialogue
    npcAction = currentExchange.npcOpening.action
    npcSubtext = currentExchange.npcOpening.subtext
  } else {
    // Find response that matches the last choice
    const lastChoiceId = choiceHistory[choiceHistory.length - 1]
    if (currentExchange.npcResponse && currentExchange.playerChoiceRef === lastChoiceId) {
      npcDialogue = currentExchange.npcResponse.dialogue
      npcAction = currentExchange.npcResponse.action
      npcSubtext = currentExchange.npcResponse.subtext
    } else if (currentExchange.npcOpening) {
      // Fallback to npcOpening if no matching response
      npcDialogue = currentExchange.npcOpening.dialogue
      npcAction = currentExchange.npcOpening.action
      npcSubtext = currentExchange.npcOpening.subtext
    }
  }

  // Build choices for current turn
  const currentChoices = currentExchange.playerChoices.map((choice) => ({
    id: choice.id,
    label: choice.display,
    intent: choice.intent,
    tone: choice.tone,
    riskLevel: choice.riskLevel,
    statDelta: choice.statDeltas,
    nextChoiceId: choice.id,
  }))

  return {
    turn: currentExchange.turn,
    npc: npc.name,
    npcDialogue,
    npcAction,
    npcSubtext,
    sceneContext,
    backdrop,
    background,
    currentStats,
    choices: currentChoices,
    isComplete: choiceHistory.length >= exchanges.length - 1,
  }
}

const ROME_TOPIC_BY_NODE = {
  ROME_01_START: 'the pressure after practice',
  ROME_01_SUPPORTED: 'how hard she is carrying the team',
  ROME_01_CHALLENGED: 'how she pushes teammates',
  ROME_01_FLUSTERED: 'the tension between you two',
  ROME_02_SUPPORTED_CONTINUED: 'her need to feel understood',
  ROME_02_ANNOYED: 'the advice that rubbed her wrong',
  ROME_02_DEFENSIVE: 'her competitive edge',
  ROME_02_CHARMED: 'the chemistry and the risk',
  ROME_02_VALIDATED: 'her standards and expectations',
  ROME_03_DATE_SETUP: 'where this goes next',
}

function getRomeBaseNodeId(nodeId = '') {
  const branchIndex = nodeId.indexOf('_BRANCH_')
  if (branchIndex === -1) return nodeId
  return nodeId.slice(0, branchIndex)
}

function hashValue(value = '') {
  return Array.from(value).reduce((sum, char) => sum + char.charCodeAt(0), 0)
}

function personalizeRomeChoiceLabel(label, nodeId) {
  if (!label) return label

  const baseNodeId = getRomeBaseNodeId(nodeId)
  const topic = ROME_TOPIC_BY_NODE[baseNodeId] || 'this situation'
  const variantIndex = hashValue(baseNodeId) % 4

  if (label.includes('I get your point, but I need you to meet me halfway.')) {
    const variants = [
      `"I hear you on ${topic}, but I need this to be a two-way conversation."`,
      `"I see your side on ${topic}; meet me halfway and we can make this work."`,
      `"You’re not wrong about ${topic}, but I need more balance from both of us."`,
      `"I respect your take on ${topic}, and I still need us to meet in the middle."`,
    ]
    return variants[variantIndex]
  }

  if (label.includes('You’re intense when you care this much. I kind of like that.')) {
    const variants = [
      '"You go all-in when you care. That intensity is honestly attractive."',
      '"You care hard, and it shows. I’m into that fire."',
      '"There’s something about your intensity that keeps pulling me in."',
      '"You’re fierce when it matters, and yeah—I like that about you."',
    ]
    return variants[variantIndex]
  }

  return label
}

function convertGraphSceneToLegacy(sceneData, choiceHistory = []) {
  const { npc, sceneContext, backdrop, background, nodes = {}, startSceneId } = sceneData

  let currentNodeId = startSceneId
  let currentStats = { ...(npc?.initialStats || {}) }
  let reachedMissingNode = false

  choiceHistory.forEach((choiceId) => {
    if (!currentNodeId || reachedMissingNode) return

    const node = nodes[currentNodeId]
    if (!node) {
      reachedMissingNode = true
      return
    }

    const chosenChoice = (node.choices || []).find((choice) => choice.id === choiceId)
    if (!chosenChoice) return

    const balancedChosenDeltas = rebalanceStatDeltas(chosenChoice.id, chosenChoice.statDeltas || {})
    Object.entries(balancedChosenDeltas).forEach(([stat, delta]) => {
      currentStats[stat] = (currentStats[stat] ?? 0) + delta
    })

    if (!chosenChoice.nextSceneId || !nodes[chosenChoice.nextSceneId]) {
      reachedMissingNode = true
      currentNodeId = null
      return
    }

    currentNodeId = chosenChoice.nextSceneId
  })

  const currentNode = currentNodeId ? nodes[currentNodeId] : null
  let currentChoices = (currentNode?.choices || []).map((choice) => {
    const balancedDeltas = rebalanceStatDeltas(choice.id, choice.statDeltas || {})

    return {
    id: choice.id,
    label: choice.display,
    intent: choice.intent,
    tone: choice.tone,
    riskLevel: choice.riskLevel,
    statDelta: balancedDeltas,
    nextSceneId: choice.nextSceneId,
    moodResponse: choice.moodResponse,
    }
  })

  const isRomeScene = sceneData?.id === 'romeChapter1' || npc?.id === 'rome'
  if (isRomeScene && currentNodeId) {
    currentChoices = currentChoices.map((choice) => ({
      ...choice,
      label: personalizeRomeChoiceLabel(choice.label, currentNodeId),
    }))
  }

  return {
    turn: choiceHistory.length + 1,
    npc: npc?.name || 'Unknown',
    npcDialogue: currentNode?.npcDialogue || 'The moment settles, and the conversation pauses here.',
    npcAction: currentNode?.npcAction || '',
    npcSubtext: currentNode?.npcSubtext || '',
    sceneContext,
    backdrop,
    background,
    currentStats,
    choices: currentChoices,
    isComplete: reachedMissingNode || !currentNode || currentChoices.length === 0,
  }
}

const CORE_RELATIONSHIP_STATS = ['affinity', 'trust', 'attraction', 'comfort', 'respect']

function hashChoiceId(choiceId = '') {
  return Array.from(choiceId).reduce((sum, char) => sum + char.charCodeAt(0), 0)
}

function rebalanceStatDeltas(choiceId, statDeltas = {}) {
  const normalized = { ...statDeltas }
  const positiveCoreStats = CORE_RELATIONSHIP_STATS.filter((stat) => (normalized[stat] ?? 0) > 0)

  if (positiveCoreStats.length <= 3) {
    return normalized
  }

  const isAllCoreStatsPositive = positiveCoreStats.length === CORE_RELATIONSHIP_STATS.length
  const allowAllPositiveRarely = isAllCoreStatsPositive && (hashChoiceId(choiceId) % 25 === 0)
  if (allowAllPositiveRarely) {
    return normalized
  }

  const sortedBySmallestGain = [...positiveCoreStats].sort(
    (a, b) => (normalized[a] ?? 0) - (normalized[b] ?? 0)
  )

  const maxPositiveCoreStats = 3
  const statsToFlatten = sortedBySmallestGain.slice(0, Math.max(0, positiveCoreStats.length - maxPositiveCoreStats))

  statsToFlatten.forEach((stat) => {
    normalized[stat] = 0
  })

  return normalized
}

/**
 * Load a scene by ID
 */
export function loadScene(sceneId) {
  const scenes = {
    parkArtist: parkArtistScene,
    twoCharacterTest: twoCharacterTestScene,
    romeChapter1: romeChapter1Scene,
  }

  return scenes[sceneId] || null
}

/**
 * Get all available scenes
 */
export function getAvailableScenes() {
  return ['parkArtist', 'twoCharacterTest', 'romeChapter1']
}

export default {
  convertSceneToLegacy,
  loadScene,
  getAvailableScenes,
  intents,
}
