import { useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { characterProfiles } from './dialogueData.js'
import IntentDialogueScene from './components/IntentDialogueScene.jsx'
import StatsDisplay from './components/StatsDisplay.jsx'
import ChapterSelectModal from './components/ChapterSelectModal.jsx'
import { loadScene } from './dialogueEngine.js'

const initialAffinity = characterProfiles.reduce((acc, character) => {
  acc[character.id] = 0
  return acc
}, {})

const initialState = {
  playerName: 'Player',
  sceneId: 'intro',
  affinity: initialAffinity,
}

const baseStats = {
  affinity: 0,
  trust: 0,
  attraction: 0,
  comfort: 0,
  respect: 0,
}

const initialStatsByCharacter = characterProfiles.reduce((acc, character) => {
  acc[character.id] = { ...baseStats }
  return acc
}, {})

const STORAGE_KEY = 'datingsim_ultra_save_v1'

const PRIMARY_MOODS = ['Happy', 'Sad', 'Angry', 'Surprised', 'Scared', 'Disgusted']

const SECONDARY_MOODS = {
  Angry: [
    'frustrated',
    'irritated',
    'resentful',
    'jealous',
    'enraged',
    'contemptuous',
    'hateful',
    'annoyed',
    'bitter',
  ],
  Scared: [
    'anxious',
    'worried',
    'nervous',
    'insecure',
    'panicked',
    'dreading',
    'ashamed',
    'embarrassed',
    'helpless',
  ],
  Sad: [
    'devastated',
    'lonely',
    'hopeless',
    'disappointed',
    'regretful',
    'guilty',
    'ashamed',
    'depressed',
    'hurt',
  ],
  Happy: [
    'proud',
    'excited',
    'relieved',
    'grateful',
    'content',
    'loving',
    'hopeful',
    'confident',
  ],
  Disgusted: [
    'judgmental',
    'revolted',
    'disapproving',
    'averse',
    'outraged',
  ],
  Surprised: [
    'shocked',
    'confused',
    'amazed',
    'awed',
    'in disbelief',
  ],
}

function normalizeMoodValue(value) {
  if (!value) return value
  return value === 'Contentment' ? 'Content' : value
}

function normalizeMoodObject(mood) {
  if (!mood) return mood
  return {
    primary: normalizeMoodValue(mood.primary),
    secondary: normalizeMoodValue(mood.secondary),
  }
}

function loadSavedGame() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return null

    const savedState = parsed.state ?? {}
    const mergedAffinity = {
      ...initialAffinity,
      ...(savedState.affinity || {}),
    }
    const savedStatsByCharacter = parsed.statsByCharacter
      ? Object.fromEntries(
          Object.entries(parsed.statsByCharacter).map(([key, value]) => [
            key,
            { ...baseStats, ...(value || {}) },
          ])
        )
      : null
    const savedMood = normalizeMoodObject(parsed.mood)
    const savedMoodByCharacter = parsed.moodByCharacter
      ? Object.fromEntries(
          Object.entries(parsed.moodByCharacter).map(([key, value]) => [
            key,
            normalizeMoodObject(value),
          ])
        )
      : null

    return {
      state: {
        ...initialState,
        ...savedState,
        affinity: mergedAffinity,
      },
      statsByCharacter: savedStatsByCharacter ?? initialStatsByCharacter,
      mood: savedMood ?? null,
      activeSceneId: parsed.activeSceneId ?? 'parkArtist',
      moodByCharacter: savedMoodByCharacter ?? null,
    }
  } catch (error) {
    console.debug('Failed to load saved game:', error)
    return null
  }
}

function saveGame(state, statsByCharacter, mood, activeSceneId, moodByCharacter) {
  try {
    const payload = JSON.stringify({
      state,
      statsByCharacter,
      mood,
      activeSceneId,
      moodByCharacter,
    })
    localStorage.setItem(STORAGE_KEY, payload)
  } catch (error) {
    console.debug('Failed to save game:', error)
  }
}

function hashString(value) {
  return Array.from(value || '').reduce((acc, char) => acc + char.charCodeAt(0), 0)
}

function derivePrimaryMood(choice) {
  if (!choice) return 'Happy'
  const stats = choice.statDelta || {}
  const deltas = Object.values(stats)
  const totalDelta = deltas.reduce((sum, value) => sum + (value ?? 0), 0)
  const hasNegative = deltas.some((value) => (value ?? 0) < 0)
  const hasRespectNegative = (stats.respect ?? 0) < 0
  const hasComfortNegative = (stats.comfort ?? 0) < 0
  const intentText = `${choice.intent} ${choice.tone} ${choice.riskLevel}`.toLowerCase()

  if (intentText.includes('disgust') || intentText.includes('gross')) {
    return 'Disgusted'
  }

  if (intentText.includes('fear') || intentText.includes('scared')) {
    return 'Scared'
  }

  if (intentText.includes('tease') || intentText.includes('surprise')) {
    return 'Surprised'
  }

  if (hasRespectNegative || hasComfortNegative) {
    return 'Angry'
  }

  if (hasNegative || totalDelta < -0.01) {
    return 'Sad'
  }

  return 'Happy'
}

function deriveSecondaryMood(primary, choiceId) {
  const options = SECONDARY_MOODS[primary] || []
  if (!options.length) return ''
  const index = hashString(choiceId) % options.length
  return options[index]
}

function derivePrimaryFromDelta(delta) {
  if (delta > 0.01) return 'Happy'
  if (delta < -0.01) return 'Sad'
  return 'Surprised'
}

function formatSecondaryMood(value) {
  if (!value) return ''
  if (value.toLowerCase() === 'in disbelief') return 'In disbelief'
  return value.charAt(0).toUpperCase() + value.slice(1)
}

const STAT_LABELS = {
  affinity: 'Affinity',
  trust: 'Trust',
  attraction: 'Attraction',
  comfort: 'Comfort',
  respect: 'Respect',
  jaxMood: 'Jax Mood',
  miraMood: 'Mira Mood',
}

function getMoodTone(primary) {
  if (primary === 'Happy') return 'positive'
  if (primary === 'Sad' || primary === 'Angry' || primary === 'Scared' || primary === 'Disgusted') return 'negative'
  return 'neutral'
}

function getMoodTextClass(primary) {
  const tone = getMoodTone(primary)
  if (tone === 'positive') return 'text-green-300'
  if (tone === 'negative') return 'text-rose-300'
  return 'text-white'
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_PLAYER_NAME':
      return { ...state, playerName: action.value }
    case 'APPLY_CHOICE': {
      const updatedAffinity = { ...state.affinity }
      Object.entries(action.affinityDelta || {}).forEach(([key, delta]) => {
        updatedAffinity[key] = (updatedAffinity[key] ?? 0) + delta
      })
      return {
        ...state,
        sceneId: action.nextSceneId,
        affinity: updatedAffinity,
      }
    }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

function formatText(text, playerName) {
  return text.replaceAll('{playerName}', playerName || 'Player')
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState, (defaultState) => {
    const saved = loadSavedGame()
    return saved?.state ?? defaultState
  })
  const [statsByCharacter, setStatsByCharacter] = useState(() =>
    loadSavedGame()?.statsByCharacter ?? initialStatsByCharacter
  )
  const [currentMood, setCurrentMood] = useState(() =>
    loadSavedGame()?.mood ?? {
      primary: 'Happy',
      secondary: 'Content',
    }
  )
  const [moodByCharacter, setMoodByCharacter] = useState(() =>
    loadSavedGame()?.moodByCharacter ?? {
      alex: { primary: 'Happy', secondary: 'Content' },
      jax: { primary: 'Happy', secondary: 'Content' },
      mira: { primary: 'Happy', secondary: 'Content' },
      rome: { primary: 'Happy', secondary: 'Content' },
    }
  )
  const [sceneComplete, setSceneComplete] = useState(false)
  const [showChapterSelect, setShowChapterSelect] = useState(false)
  const [showProfilePanel, setShowProfilePanel] = useState(false)
  const [profileCharacterId, setProfileCharacterId] = useState('alex')
  const [showStartScreen, setShowStartScreen] = useState(true)
  const [activeSceneId, setActiveSceneId] = useState(() => loadSavedGame()?.activeSceneId ?? 'parkArtist')
  const [currentTurn, setCurrentTurn] = useState(1)
  const [statPopups, setStatPopups] = useState([])
  
  // Map character IDs to scene IDs
  const sceneMap = {
    alex: 'parkArtist',
    jax: 'jax',
    mira: 'mira',
    rome: 'romeChapter1'
  }
  
  // Get character from state or default to alex
  const currentCharacterId = state.sceneId === 'intro' ? 'alex' : state.sceneId.split('-')[0] || 'alex'
  const character = characterProfiles.find((entry) => entry.id === currentCharacterId)
  const isTwoCharacterTest = activeSceneId === 'twoCharacterTest'
  const rosterCharacters = isTwoCharacterTest
    ? characterProfiles.filter((entry) => ['jax', 'mira'].includes(entry.id))
    : characterProfiles.filter((entry) => entry.id === character.id)
  const speakingCharacterId = isTwoCharacterTest
    ? (currentTurn % 2 === 1 ? 'jax' : 'mira')
    : character?.id
  const displayCharacter = characterProfiles.find((entry) => entry.id === speakingCharacterId)
  const activeStatsCharacterId = displayCharacter?.id ?? currentCharacterId
  const activeStats = statsByCharacter[activeStatsCharacterId] ?? {}
  const currentSceneId = activeSceneId || sceneMap[currentCharacterId] || 'parkArtist'
  const intentScene = loadScene(currentSceneId)
  const backdrop = intentScene?.backdrop || 'Unknown Location'
  const normalizeAssetPath = (path) => (path?.startsWith('/') ? path.slice(1) : path)
  const sceneBackground = normalizeAssetPath(
    intentScene?.background || 'locations/park_bench.png'
  )
  const profileCharacter = characterProfiles.find(
    (entry) => entry.id === profileCharacterId
  )

  const fullText = useMemo(
    () => formatText('', state.playerName),
    [state.playerName]
  )

  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    saveGame(state, statsByCharacter, currentMood, activeSceneId, moodByCharacter)
  }, [state, statsByCharacter, currentMood, activeSceneId, moodByCharacter])

  useEffect(() => {
    setProfileCharacterId(currentCharacterId)
  }, [currentCharacterId])

  useEffect(() => {
    setDisplayedText('')
    setIsComplete(false)
    let index = 0

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    intervalRef.current = setInterval(() => {
      index += 1
      setDisplayedText(fullText.slice(0, index))
      if (index >= fullText.length) {
        clearInterval(intervalRef.current)
        setIsComplete(true)
      }
    }, 18)

    return () => {
      clearInterval(intervalRef.current)
    }
  }, [fullText])

  const handleAdvance = () => {
    if (!isComplete) {
      setDisplayedText(fullText)
      setIsComplete(true)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }

  const applyStatDelta = (statDelta = {}) => {
    if (!statDelta || Object.keys(statDelta).length === 0) return

    setStatsByCharacter((prev) => {
      const next = { ...prev }

      if (activeSceneId === 'twoCharacterTest') {
        const { jaxMood = 0, miraMood = 0, ...rest } = statDelta

        if (jaxMood !== 0) {
          next.jax = {
            ...(next.jax || { ...baseStats }),
            jaxMood: (next.jax?.jaxMood ?? 0) + jaxMood,
          }
        }

        if (miraMood !== 0) {
          next.mira = {
            ...(next.mira || { ...baseStats }),
            miraMood: (next.mira?.miraMood ?? 0) + miraMood,
          }
        }

        if (Object.keys(rest).length > 0) {
          next[currentCharacterId] = {
            ...(next[currentCharacterId] || { ...baseStats }),
            ...Object.fromEntries(
              Object.entries(rest).map(([key, delta]) => [
                key,
                (next[currentCharacterId]?.[key] ?? 0) + (delta ?? 0),
              ])
            ),
          }
        }
      } else {
        next[currentCharacterId] = {
          ...(next[currentCharacterId] || { ...baseStats }),
          ...Object.fromEntries(
            Object.entries(statDelta).map(([key, delta]) => [
              key,
              (next[currentCharacterId]?.[key] ?? 0) + (delta ?? 0),
            ])
          ),
        }
      }

      return next
    })
  }

  const pushStatPopups = (statDelta = {}) => {
    const entries = Object.entries(statDelta).filter(([, delta]) => (delta ?? 0) > 0)
    if (!entries.length) return

    const now = Date.now()
    const newPopups = entries.map(([key], index) => ({
      id: `${now}-${key}-${index}`,
      label: STAT_LABELS[key] || key,
    }))

    setStatPopups((prev) => [...prev, ...newPopups])

    newPopups.forEach((popup) => {
      setTimeout(() => {
        setStatPopups((prev) => prev.filter((item) => item.id !== popup.id))
      }, 1200)
    })
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.25),_transparent_55%)]" />

        <div className="relative z-10 flex min-h-screen flex-col">
          {showStartScreen && (
            <>
              <div className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm" />
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="w-full max-w-2xl rounded-2xl border border-indigo-500/50 bg-gradient-to-b from-indigo-950/90 to-slate-950/90 p-6 shadow-2xl">
                  <div className="mb-6">
                    <p className="text-xs uppercase tracking-widest text-slate-400">Start</p>
                    <h2 className="text-2xl font-semibold text-white">Select a Chapter</h2>
                    <p className="text-sm text-slate-300 mt-2">Choose where to begin your story.</p>
                  </div>

                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveSceneId('parkArtist')
                        setSceneComplete(false)
                        setShowChapterSelect(false)
                        setStatsByCharacter(initialStatsByCharacter)
                        setShowStartScreen(false)
                      }}
                      className="w-full rounded-xl border border-indigo-500/40 bg-indigo-950/40 p-4 text-left transition hover:border-indigo-400 hover:bg-indigo-950/60"
                    >
                      <p className="text-sm uppercase tracking-widest text-indigo-200">Chapter One</p>
                      <p className="text-lg font-semibold text-white">First Encounters</p>
                      <p className="text-xs text-slate-300 mt-1">Meet the cast and start building connections.</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveSceneId('twoCharacterTest')
                        setSceneComplete(false)
                        setShowChapterSelect(false)
                        setStatsByCharacter(initialStatsByCharacter)
                        setShowStartScreen(false)
                      }}
                      className="w-full rounded-xl border border-indigo-500/40 bg-slate-900/50 p-4 text-left transition hover:border-indigo-400 hover:bg-slate-900"
                    >
                      <p className="text-sm uppercase tracking-widest text-indigo-200">Chapter Two</p>
                      <p className="text-lg font-semibold text-white">Two Character Test</p>
                      <p className="text-xs text-slate-300 mt-1">Both want you—your choices tilt the balance.</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveSceneId('romeChapter1')
                        setSceneComplete(false)
                        setShowChapterSelect(false)
                        setStatsByCharacter(initialStatsByCharacter)
                        setShowStartScreen(false)
                      }}
                      className="w-full rounded-xl border border-indigo-500/40 bg-slate-900/50 p-4 text-left transition hover:border-indigo-400 hover:bg-slate-900"
                    >
                      <p className="text-sm uppercase tracking-widest text-indigo-200">Chapter Three</p>
                      <p className="text-lg font-semibold text-white">Rome Chapter 1</p>
                      <p className="text-xs text-slate-300 mt-1">Post-practice venting with branching outcomes.</p>
                    </button>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setShowStartScreen(false)}
                      className="rounded-full border border-slate-700/60 px-4 py-2 text-xs uppercase tracking-widest text-slate-300 hover:border-indigo-400 hover:text-indigo-200"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
          <header className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-4">
            <div className="space-y-0.5">
              <p className="text-[11px] uppercase tracking-[0.3em] text-indigo-300/80">Dating Sim Ultra</p>
              <h1 className="text-lg font-semibold">Chapter One: First Encounters</h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowStartScreen(true)}
                className="rounded-full border border-slate-700/60 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-slate-300 hover:border-indigo-400 hover:text-indigo-200"
              >
                Start Screen
              </button>
              <label className="flex items-center gap-2 text-[11px] text-slate-300">
                <span>Player name</span>
                <input
                  value={state.playerName}
                  onChange={(event) => dispatch({ type: 'SET_PLAYER_NAME', value: event.target.value })}
                  className="w-28 rounded-full border border-slate-700/80 bg-slate-900/70 px-2.5 py-1 text-[11px] text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none"
                  placeholder="Player"
                />
              </label>
            </div>
          </header>

          <main className="relative flex-1">
            <div className="mx-auto flex h-full w-full max-w-6xl flex-col gap-5 px-4 pb-8 pt-3 lg:flex-row">
              <div className="flex-1 space-y-4">
                <div className="rounded-xl border border-slate-800/70 bg-slate-900/50 p-3">
                  <div className="mt-2 grid grid-cols-4 gap-2">
                    {rosterCharacters.map((entry) => (
                      <div key={entry.id}>
                        <div className="mb-1 text-center text-[10px] font-semibold uppercase tracking-wider text-slate-300">
                          {entry.name}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setProfileCharacterId(entry.id)
                            setShowProfilePanel(true)
                          }}
                          className="relative aspect-square w-full overflow-hidden rounded-lg border-2 border-indigo-600 bg-slate-950/60"
                          aria-label={`View ${entry.name} profile`}
                        >
                          <img
                            src={normalizeAssetPath(entry.image)}
                            alt={entry.name}
                            className="h-full w-full object-cover ring-2 ring-indigo-500/80"
                          />
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2 translate-y-[6px]">
                            <div className="flex items-center gap-1">
                              <span className={`max-w-[86px] truncate rounded-full border border-indigo-500/40 bg-slate-900/70 px-2 py-0.5 text-[9px] font-semibold ${getMoodTextClass(moodByCharacter[entry.id]?.primary ?? currentMood.primary)}`}>
                                {moodByCharacter[entry.id]?.primary ?? currentMood.primary}
                              </span>
                              <span className={`max-w-[86px] truncate rounded-full border border-indigo-500/40 bg-slate-900/70 px-2 py-0.5 text-[9px] ${getMoodTextClass(moodByCharacter[entry.id]?.primary ?? currentMood.primary)}`}>
                                {formatSecondaryMood(moodByCharacter[entry.id]?.secondary ?? currentMood.secondary)}
                              </span>
                            </div>
                          </div>
                        </button>
                      </div>
                    ))}
                  </div>
                  {showProfilePanel && (
                    <>
                      <div
                        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                        onClick={() => setShowProfilePanel(false)}
                      />
                      <div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        onClick={() => setShowProfilePanel(false)}
                      >
                        <div className="w-full max-w-xl rounded-2xl border border-indigo-500/50 bg-gradient-to-b from-indigo-950/90 to-slate-950/90 p-6 shadow-2xl">
                          <div className="flex items-center justify-between gap-3">
                            <h3 className="text-[19px] uppercase tracking-[0.3em] text-slate-400 text-center w-[160px]">{profileCharacter?.name}</h3>
                            <div className="flex items-center gap-2">
                              <span className={`max-w-[140px] truncate rounded-full border border-indigo-500/40 bg-slate-900/70 px-2.5 py-1 text-xs font-semibold ${getMoodTextClass(moodByCharacter[profileCharacter?.id]?.primary ?? currentMood.primary)}`}>
                                {moodByCharacter[profileCharacter?.id]?.primary ?? currentMood.primary}
                              </span>
                              <span className={`max-w-[160px] truncate rounded-full border border-indigo-500/40 bg-slate-900/70 px-2.5 py-1 text-xs ${getMoodTextClass(moodByCharacter[profileCharacter?.id]?.primary ?? currentMood.primary)}`}>
                                {formatSecondaryMood(moodByCharacter[profileCharacter?.id]?.secondary ?? currentMood.secondary)}
                              </span>
                            </div>
                          </div>
                          <div className="mt-4 flex items-start gap-4">
                            <div className="w-[160px]">
                              <div className="h-[160px] w-[160px] overflow-hidden rounded-2xl border border-indigo-500/40">
                                <img
                                  src={normalizeAssetPath(profileCharacter?.image)}
                                  alt={profileCharacter?.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            </div>
                            <div className="flex-1 h-[160px]">
                              <StatsDisplay stats={statsByCharacter[profileCharacterId] ?? {}} showAllStats />
                            </div>
                          </div>
                          <p className="mt-3 min-h-[3.9rem] text-sm text-slate-300">
                            {profileCharacter?.personality}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                  {characterProfiles.length > 1 && (
                    <div className="mt-3">
                      <div className="font-semibold text-white">{isTwoCharacterTest ? 'Jax & Mira' : character.name}</div>
                      <div className="text-slate-400 text-xs italic mt-1">
                        {isTwoCharacterTest ? 'Both want to date you tonight.' : character.personality}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <IntentDialogueScene 
                    sceneId={currentSceneId}
                    onStatChange={(statDelta) => {
                      applyStatDelta(statDelta)
                      pushStatPopups(statDelta)
                    }}
                    onTurnChange={(turn) => setCurrentTurn(turn)}
                    onChoice={(choice) => {
                      const primary = normalizeMoodValue(choice?.moodResponse) || derivePrimaryMood(choice)
                      const secondary = deriveSecondaryMood(primary, choice.id)
                      setCurrentMood({ primary, secondary })

                      if (activeSceneId === 'twoCharacterTest') {
                        const jaxDelta = choice.statDelta?.jaxMood ?? 0
                        const miraDelta = choice.statDelta?.miraMood ?? 0
                        const jaxPrimary = derivePrimaryFromDelta(jaxDelta)
                        const miraPrimary = derivePrimaryFromDelta(miraDelta)
                        setMoodByCharacter((prev) => ({
                          ...prev,
                          jax: {
                            primary: jaxPrimary,
                            secondary: deriveSecondaryMood(jaxPrimary, `${choice.id}-jax`),
                          },
                          mira: {
                            primary: miraPrimary,
                            secondary: deriveSecondaryMood(miraPrimary, `${choice.id}-mira`),
                          },
                        }))
                      } else if (character?.id) {
                        setMoodByCharacter((prev) => ({
                          ...prev,
                          [character.id]: { primary, secondary },
                        }))
                      }
                    }}
                    onComplete={(choiceHistory, finalStats) => {
                      console.log('Scene complete:', choiceHistory, finalStats)
                      setSceneComplete(true)
                      // Show chapter select after a brief moment
                      setTimeout(() => setShowChapterSelect(true), 500)
                    }}
                  />
                  {sceneComplete && !showChapterSelect && (
                    <div className="space-y-3 animate-fadeIn">
                      <div className="rounded-lg border border-indigo-500/50 bg-indigo-950/30 p-4">
                        <p className="text-lg font-semibold text-indigo-200">Scene Complete!</p>
                        <p className="text-sm text-slate-300 mt-2">A moment of connection... but there are other stories waiting.</p>
                      </div>
                    </div>
                  )}
                  
                  <ChapterSelectModal
                    isOpen={showChapterSelect}
                    finalStats={statsByCharacter[currentCharacterId] ?? {}}
                    impactedCharacterId={character?.id}
                    onCharacterSelect={(characterId) => {
                      // Reset and start new scene
                      setSceneComplete(false)
                      setShowChapterSelect(false)
                      setStatsByCharacter(initialStatsByCharacter)
                      window.location.reload()
                    }}
                  />
                </div>
              </div>

              <div className="relative flex-1">
                <div className="rounded-xl border border-slate-800/70 bg-slate-900/50 p-3">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">{backdrop}</p>
                  <div className="mt-2 relative overflow-hidden rounded-lg border border-slate-800">
                    <img
                      src={sceneBackground}
                      alt="Scene background"
                      className="w-full object-cover ring-2 ring-indigo-500/80"
                      style={{ width: '480px', height: '270px', maxWidth: '100%' }}
                    />
                    <div className="pointer-events-none absolute inset-0">
                      {statPopups.map((popup, index) => (
                        <div
                          key={popup.id}
                          className="absolute left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-widest text-slate-900 text-outline-light animate-floatUp"
                          style={{ top: `${12 + index * 18}px` }}
                        >
                          {popup.label}
                        </div>
                      ))}
                    </div>
                    <div
                      className="absolute top-3 left-3 h-[160px] w-[160px] rounded-xl border border-slate-700/60 shadow-2xl ring-2 ring-indigo-500/80"
                      style={{ filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.5))' }}
                    >
                      <img
                        src={normalizeAssetPath(displayCharacter?.image)}
                        alt={displayCharacter?.name}
                        className="h-full w-full object-cover object-center rounded-xl"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <StatsDisplay stats={activeStats} />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
