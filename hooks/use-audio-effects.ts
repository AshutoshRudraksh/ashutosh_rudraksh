"use client"

import { useRef, useCallback } from "react"

interface AudioEffect {
  src: string
  volume?: number
  loop?: boolean
}

export function useAudioEffects() {
  const audioRefs = useRef<Map<string, HTMLAudioElement>>(new Map())

  const createAudio = useCallback((id: string, effect: AudioEffect) => {
    if (!audioRefs.current.has(id)) {
      const audio = new Audio(effect.src)
      audio.volume = effect.volume ?? 0.5
      audio.loop = effect.loop ?? false
      audio.preload = "auto"
      audioRefs.current.set(id, audio)
    }
    return audioRefs.current.get(id)!
  }, [])

  const playAudio = useCallback(
    async (id: string, effect: AudioEffect) => {
      try {
        const audio = createAudio(id, effect)
        audio.currentTime = 0
        await audio.play()
        return true
      } catch (error) {
        console.warn(`Failed to play audio ${id}:`, error)
        return false
      }
    },
    [createAudio],
  )

  const stopAudio = useCallback((id: string) => {
    const audio = audioRefs.current.get(id)
    if (audio) {
      audio.pause()
      audio.currentTime = 0
    }
  }, [])

  const setVolume = useCallback((id: string, volume: number) => {
    const audio = audioRefs.current.get(id)
    if (audio) {
      audio.volume = Math.max(0, Math.min(1, volume))
    }
  }, [])

  return {
    playAudio,
    stopAudio,
    setVolume,
    createAudio,
  }
}
