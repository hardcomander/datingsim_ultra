import { characterProfiles } from '../dialogueData.js'
import { playSound } from '../utils/soundEffects.js'

const normalizeAssetPath = (assetPath) =>
  assetPath?.startsWith('/') ? assetPath.slice(1) : assetPath

export default function ChapterSelectModal({
  finalStats = {},
  onCharacterSelect,
  isOpen,
  impactedCharacterId,
}) {
  if (!isOpen) return null

  const impactedCharacter = characterProfiles.find(
    (character) => character.id === impactedCharacterId
  )

  const totalImpact = Object.values(finalStats).reduce(
    (acc, value) => acc + value,
    0
  )
  const attractionScore = Math.min(Math.max(finalStats.attraction ?? 0, 0), 1)
  const comfortScore = Math.min(Math.max(finalStats.comfort ?? 0, 0), 1)
  const attractionComfort = (attractionScore + comfortScore) / 2

  const relationshipTaglines = [
    { key: 'in_love', label: 'In Love', min: 1, requiresMax: true },
    { key: 'dating', label: 'Dating', min: 0.9 },
    { key: 'smitten', label: 'Smitten', min: 0.82 },
    { key: 'crushing', label: 'Crushing', min: 0.7 },
    { key: 'interested', label: 'Interested', min: 0.6 },
    { key: 'curious_looking', label: 'Curious but looking', min: 0.5 },
    { key: 'warming_up', label: 'Warming Up', min: 0.4 },
    { key: 'maybe', label: 'Maybe?', min: 0.28 },
    { key: 'just_met', label: 'Just met', min: 0.18 },
    { key: 'barely_knows', label: 'Barely knows you exist', min: 0.08 },
    { key: 'unsure', label: 'Unsure', min: 0.02 },
    { key: 'cooling_off', label: 'Cooling off', min: -0.05 },
    { key: 'not_feeling', label: 'Not feeling it', min: -0.15 },
    { key: 'dislikes_you', label: 'Dislikes you', min: -0.25 },
    { key: 'turned_off', label: 'Turned off', min: -0.35 },
    { key: 'nahh', label: 'Nahh', min: -1 },
  ]

  const currentTagline =
    (attractionScore === 1 && comfortScore === 1
      ? relationshipTaglines.find((tagline) => tagline.key === 'in_love')
      : relationshipTaglines.find((tagline) => attractionComfort >= tagline.min && !tagline.requiresMax)) ||
    relationshipTaglines[relationshipTaglines.length - 1]

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-indigo-500/50 bg-gradient-to-b from-indigo-950/90 to-slate-950/90 p-6 shadow-2xl">
          {/* Header */}
          <div className="mb-6">
            <p className="text-xs uppercase tracking-widest text-slate-400">Chapter Result</p>
          </div>

          {/* Relationship Status */}
          <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-4 mb-6">
            <div className="mb-3 flex items-center gap-3">
              {impactedCharacter && (
                <div className="h-12 w-12 overflow-hidden rounded-full border border-indigo-400/50">
                  <img
                    src={normalizeAssetPath(impactedCharacter.image)}
                    alt={impactedCharacter.name}
                    className="h-full w-full object-cover ring-2 ring-indigo-500/80"
                  />
                </div>
              )}
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-400">Relationship Status</p>
                {impactedCharacter && (
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm text-slate-300">{impactedCharacter.name}</p>
                    <span className="rounded-full border border-indigo-400/40 bg-indigo-500/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-indigo-200">
                      {currentTagline.label}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {Object.entries(finalStats).map(([stat, value]) => (
                <div key={stat} className="flex flex-col items-center p-1.5 rounded-md bg-slate-800/30 border border-slate-700/50">
                  <span className="text-slate-400 capitalize text-[10px] leading-tight">{stat}</span>
                  <span className={`font-bold text-sm ${value > 0 ? 'text-green-400' : value < 0 ? 'text-red-400' : 'text-slate-400'}`}>
                    {value > 0 ? '+' : value < 0 ? '−' : '○'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Character Selection */}
          <div className="mb-4">
            <p className="text-sm uppercase tracking-widest text-slate-400 mb-4">Choose Your Next Encounter</p>
            <div className="grid grid-cols-2 gap-3">
              {characterProfiles.map((character) => (
                <button
                  key={character.id}
                  onClick={() => {
                    playSound('click')
                    onCharacterSelect(character.id)
                  }}
                  className="group relative overflow-hidden rounded-lg border border-slate-700 bg-slate-900/50 transition hover:border-indigo-400 hover:bg-slate-900 h-24"
                >
                  <div className="h-full w-full overflow-hidden">
                    <img
                      src={normalizeAssetPath(character.image)}
                      alt={character.name}
                      className="h-full w-full object-cover transition group-hover:scale-105 ring-2 ring-indigo-500/80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-3 text-center">
                    <p className="font-semibold text-white">{character.name}</p>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-2">{character.personality}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Info Text */}
          <div className="rounded-lg border border-slate-700/50 bg-slate-950/50 p-3 text-center">
            <p className="text-xs text-slate-400">Each character has their own unique story. Will you follow your heart... or explore new connections?</p>
          </div>
        </div>
      </div>
    </>
  )
}
