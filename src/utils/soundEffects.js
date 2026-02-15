// Sound effects utility
const audioCache = {}

export const playSound = (soundName) => {
  try {
    // Create audio element if not cached
    if (!audioCache[soundName]) {
      const audio = new Audio(`./sounds/${soundName}.mp3`)
      audio.volume = 0.3
      audioCache[soundName] = audio
    }

    // Clone and play the audio (allows overlapping)
    const audio = audioCache[soundName].cloneNode()
    audio.volume = 0.3
    audio.play().catch(() => {
      // Silently fail if audio can't play (e.g., autoplay policy)
    })
    return audio // Return the audio element so it can be stopped
  } catch (error) {
    // Silently fail if audio loading fails
    console.debug('Sound effect error:', error)
    return null
  }
}

export const preloadSounds = (soundNames) => {
  soundNames.forEach((soundName) => {
    try {
      const audio = new Audio(`./sounds/${soundName}.mp3`)
      audio.preload = 'auto'
      audioCache[soundName] = audio
    } catch (error) {
      console.debug('Sound preload error:', error)
    }
  })
}
