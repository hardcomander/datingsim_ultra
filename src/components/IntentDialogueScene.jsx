import { useEffect, useMemo, useState, useRef } from 'react'
import { convertSceneToLegacy, loadScene } from '../dialogueEngine.js'
import { playSound } from '../utils/soundEffects.js'

function hashSeed(value = '') {
  return Array.from(value).reduce((sum, char) => sum + char.charCodeAt(0), 0)
}

function shuffleChoicesDeterministic(choices = [], seedValue = '') {
  const shuffled = [...choices]
  let seed = hashSeed(seedValue)

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    seed = (seed * 1664525 + 1013904223) >>> 0
    const swapIndex = seed % (index + 1)
    const tmp = shuffled[index]
    shuffled[index] = shuffled[swapIndex]
    shuffled[swapIndex] = tmp
  }

  return shuffled
}

export default function IntentDialogueScene({ sceneId, onComplete, onStatChange, onChoice, onTurnChange }) {
  const [choiceHistory, setChoiceHistory] = useState([])
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const [sceneEnded, setSceneEnded] = useState(false)
  const intervalRef = useRef(null)
  const loopingSoundRef = useRef(null)

  const sceneData = loadScene(sceneId)
  
  if (!sceneData) {
    return <div className="rounded-lg border border-red-500/30 bg-red-950/20 p-3 text-red-200">Scene "{sceneId}" not found</div>
  }

  const currentState = useMemo(
    () => convertSceneToLegacy(sceneData, choiceHistory),
    [sceneData, choiceHistory]
  )

  const displayChoices = useMemo(() => {
    const seed = `${sceneId}|${currentState.turn}|${choiceHistory.join('|')}`
    return shuffleChoicesDeterministic(currentState.choices, seed)
  }, [currentState.choices, currentState.turn, choiceHistory, sceneId])

  useEffect(() => {
    if (onTurnChange) {
      onTurnChange(currentState.turn)
    }
  }, [currentState.turn, onTurnChange])

  const { npcDialogue } = currentState

  // Typewriter effect
  useEffect(() => {
    setDisplayedText('')
    setIsComplete(false)
    let index = 0

    // Stop any existing looping sound
    if (loopingSoundRef.current) {
      loopingSoundRef.current.pause()
      loopingSoundRef.current.currentTime = 0
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    // Start looping typewriter sound
    const audio = new Audio('sounds/typewriter.mp3')
    audio.loop = true
    audio.volume = 0.3
    audio.play().catch(() => {
      // Silently fail if audio can't play
    })
    loopingSoundRef.current = audio

    intervalRef.current = setInterval(() => {
      index += 1
      setDisplayedText(npcDialogue.slice(0, index))
      
      if (index >= npcDialogue.length) {
        clearInterval(intervalRef.current)
        setIsComplete(true)
        // Stop looping sound when text is complete
        if (loopingSoundRef.current) {
          loopingSoundRef.current.pause()
          loopingSoundRef.current.currentTime = 0
        }
      }
    }, 18)

    return () => {
      clearInterval(intervalRef.current)
      // Stop looping sound on cleanup
      if (loopingSoundRef.current) {
        loopingSoundRef.current.pause()
        loopingSoundRef.current.currentTime = 0
      }
    }
  }, [npcDialogue])

  const handleChoose = (choiceId) => {
    if (sceneEnded) return // Prevent clicking after scene ends
    
    playSound('click')
    console.log('Choice made:', choiceId)
    console.log('Current turn:', currentState.turn)
    
    const choice = currentState.choices.find(c => c.id === choiceId)
    if (choice && onStatChange) {
      onStatChange(choice.statDelta)
    }

    if (choice && onChoice) {
      onChoice(choice)
    }

    const nextChoiceHistory = [...choiceHistory, choiceId]
    const nextState = convertSceneToLegacy(sceneData, nextChoiceHistory)
    const isSceneComplete = nextState.isComplete
    console.log('Is scene complete?', isSceneComplete)
    
    if (isSceneComplete && onComplete) {
      const finalStats = { ...nextState.currentStats }
      console.log('Final stats for completion:', finalStats)
      console.log('Calling onComplete!')
      setSceneEnded(true)
      onComplete(nextChoiceHistory, finalStats)
    } else {
      setChoiceHistory(nextChoiceHistory)
    }
  }

  const handleAdvance = () => {
    if (!isComplete) {
      setDisplayedText(npcDialogue)
      setIsComplete(true)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }

  return (
    <div className="space-y-4">
      {/* NPC Info and Dialogue Combined */}
      <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/30 p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-white">{currentState.npc}</h2>
            {currentState.npcAction && (
              <p className="text-sm italic text-slate-400">{currentState.npcAction}</p>
            )}
          </div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400 whitespace-nowrap">Turn {currentState.turn}</p>
        </div>
        
        {/* NPC Dialogue */}
        <button
          type="button"
          onClick={handleAdvance}
          className="w-full rounded-lg bg-slate-900/50 py-2.5 text-left transition"
        >
          <p className="text-[11px] uppercase tracking-[0.3em] text-indigo-300">Dialogue</p>
          <p className="min-h-[2rem] text-lg">{displayedText}</p>
        </button>
      </div>

      {/* Player Choices */}
      <div className="space-y-2">
        {displayChoices.map((choice) => (
          <div key={choice.id} className="space-y-1">
            <button
              type="button"
              disabled={!isComplete || sceneEnded}
              onClick={() => handleChoose(choice.id)}
              className="w-full rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-2 text-left transition hover:border-indigo-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <p className="text-sm text-slate-200">{choice.label}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {choice.intent} • {choice.tone} • {choice.riskLevel}
              </p>
            </button>
          </div>
        ))}
      </div>

      {/* Subtext (for development) */}
      {currentState.npcSubtext && (
        <div className="rounded-lg border border-slate-700/50 bg-slate-950/50 p-2">
          <p className="text-[11px] text-slate-400 italic">{currentState.npcSubtext}</p>
        </div>
      )}

      {/* Scene Completion */}
      {currentState.isComplete && choiceHistory.length > 0 && (
        <div className="rounded-lg border border-indigo-500/30 bg-indigo-950/20 p-3">
          <p className="text-sm text-indigo-200">Scene complete! Final stats recorded.</p>
        </div>
      )}
    </div>
  )
}
