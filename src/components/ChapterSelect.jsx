import { characterProfiles } from '../dialogueData.js'

const normalizeAssetPath = (assetPath) =>
  assetPath?.startsWith('/') ? assetPath.slice(1) : assetPath

export default function ChapterSelect({ onCharacterSelect, finalStats = {} }) {
  return (
    <div className="space-y-4">
      {/* Chapter Complete Header */}
      <div className="rounded-lg border border-indigo-500/50 bg-gradient-to-r from-indigo-950/40 to-purple-950/40 p-6 text-center">
        <p className="text-3xl font-bold text-indigo-200 mb-2">Chapter Complete!</p>
        <p className="text-slate-300">Choose your next encounter...</p>
      </div>

      {/* Final Stats Summary */}
      <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-4">
        <p className="text-xs uppercase tracking-widest text-slate-400 mb-3">This Chapter's Impact</p>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(finalStats).map(([stat, value]) => (
            <div key={stat} className="flex justify-between items-center">
              <span className="text-slate-400 capitalize text-sm">{stat}</span>
              <span className={`font-bold ${value > 0 ? 'text-green-400' : value < 0 ? 'text-red-400' : 'text-slate-400'}`}>
                {value > 0 ? '+' : ''}{value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Character Selection */}
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-widest text-slate-400">Choose Your Next Encounter</p>
        <div className="grid grid-cols-2 gap-3">
          {characterProfiles.map((character) => (
            <button
              key={character.id}
              onClick={() => onCharacterSelect(character.id)}
              className="group relative overflow-hidden rounded-lg border border-slate-700 bg-slate-900/50 transition hover:border-indigo-400 hover:bg-slate-900"
            >
              <div className="aspect-square w-full overflow-hidden">
                <img
                  src={normalizeAssetPath(character.image)}
                  alt={character.name}
                  className="h-full w-full object-cover transition group-hover:scale-105 ring-2 ring-indigo-500/80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-end p-3 text-center">
                <p className="font-semibold text-white">{character.name}</p>
                <p className="text-xs text-slate-300 mt-1">{character.personality}</p>
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
  )
}
