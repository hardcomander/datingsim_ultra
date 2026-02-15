export default function StatsDisplay({ stats = {}, showAllStats = false }) {
  const defaultStats = [
    { key: 'affinity', label: 'Affinity' },
    { key: 'trust', label: 'Trust' },
    { key: 'attraction', label: 'Attraction' },
    { key: 'comfort', label: 'Comfort' },
    { key: 'respect', label: 'Respect' },
    { key: 'jaxMood', label: 'Jax Mood' },
    { key: 'miraMood', label: 'Mira Mood' },
  ]

  const statsList = (() => {
    const presentKeys = new Set(Object.keys(stats || {}))
    const ordered = defaultStats.filter(({ key }) => presentKeys.has(key))

    if (!showAllStats) {
      return ordered
    }

    const extras = [...presentKeys]
      .filter((key) => !defaultStats.some((stat) => stat.key === key))
      .map((key) => ({ key, label: key }))
    return [...ordered, ...extras]
  })()

  const getBarValue = (stat) => {
    const value = stats[stat] || 0
    // Normalize to 0-1 scale for visual display
    return Math.min(Math.abs(value), 1)
  }

  const getStatTone = (stat) => {
    const value = stats[stat] || 0
    if (value > 0) return 'positive'
    if (value < 0) return 'negative'
    return 'neutral'
  }

  const getToneClasses = (tone) => {
    if (tone === 'positive') {
      return {
        label: 'text-green-300',
        bar: 'from-green-400 to-emerald-400',
      }
    }
    if (tone === 'negative') {
      return {
        label: 'text-rose-300',
        bar: 'from-rose-400 to-pink-400',
      }
    }
    return {
      label: 'text-slate-300',
      bar: 'from-slate-400 to-slate-500',
    }
  }

  return (
    <div className="h-full rounded-xl border border-indigo-500/30 bg-slate-900/70 p-3 shadow-[0_0_1.2rem_rgba(129,140,248,0.2)]">
      <div className="space-y-2">
        {statsList.map(({ key, label }) => {
          const displayValue = getBarValue(key)
          const percentage = displayValue * 100
          const toneClasses = getToneClasses(getStatTone(key))

          return (
            <div key={key} className="flex items-center gap-3">
              <span className={`w-20 shrink-0 text-[10px] font-medium capitalize ${toneClasses.label}`}>
                {label}
              </span>
              <div className="flex-1 bg-indigo-900/40 rounded-full h-[5px] overflow-hidden border border-indigo-500/40">
                <div
                  className={`h-full bg-gradient-to-r ${toneClasses.bar} transition-all duration-300`}
                  style={{ width: `${Math.max(percentage, 2)}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
