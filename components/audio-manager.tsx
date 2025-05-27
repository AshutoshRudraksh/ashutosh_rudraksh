"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { useAudioEffects } from "@/hooks/use-audio-effects"

interface AudioContextType {
  isEnabled: boolean
  volume: number
  toggleAudio: () => void
  setVolume: (volume: number) => void
  playRocketSequence: () => Promise<void>
  playNotification: () => Promise<void>
  playSuccess: () => Promise<void>
  playError: () => Promise<void>
}

const AudioContext = createContext<AudioContextType | null>(null)

export function useAudio() {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error("useAudio must be used within AudioProvider")
  }
  return context
}

interface AudioProviderProps {
  children: ReactNode
}

export function AudioProvider({ children }: AudioProviderProps) {
  const [isEnabled, setIsEnabled] = useState(true)
  const [volume, setVolumeState] = useState(0.7)
  const { playAudio, setVolume: setAudioVolume } = useAudioEffects()

  const toggleAudio = useCallback(() => {
    setIsEnabled((prev) => !prev)
  }, [])

  const setVolume = useCallback(
    (newVolume: number) => {
      const clampedVolume = Math.max(0, Math.min(1, newVolume))
      setVolumeState(clampedVolume)

      // Update all audio elements
      const audioIds = ["ignition", "launch", "whoosh", "notification", "success", "error"]
      audioIds.forEach((id) => setAudioVolume(id, clampedVolume))
    },
    [setAudioVolume],
  )

  const playRocketSequence = useCallback(async () => {
    if (!isEnabled) return

    try {
      // Ignition sound (short burst)
      await playAudio("ignition", {
        src: "/audio/rocket-ignition.mp3",
        volume: volume * 0.8,
      })

      // Launch sound (main thrust) - delayed
      setTimeout(async () => {
        await playAudio("launch", {
          src: "/audio/rocket-launch.mp3",
          volume: volume,
        })
      }, 500)

      // Whoosh sound (flying through air) - delayed
      setTimeout(async () => {
        await playAudio("whoosh", {
          src: "/audio/rocket-whoosh.mp3",
          volume: volume * 0.6,
        })
      }, 1500)
    } catch (error) {
      console.warn("Rocket audio sequence failed:", error)
    }
  }, [isEnabled, volume, playAudio])

  const playNotification = useCallback(async () => {
    if (!isEnabled) return
    await playAudio("notification", {
      src: "/audio/notification.mp3",
      volume: volume * 0.5,
    })
  }, [isEnabled, volume, playAudio])

  const playSuccess = useCallback(async () => {
    if (!isEnabled) return
    await playAudio("success", {
      src: "/audio/success.mp3",
      volume: volume * 0.6,
    })
  }, [isEnabled, volume, playAudio])

  const playError = useCallback(async () => {
    if (!isEnabled) return
    await playAudio("error", {
      src: "/audio/error.mp3",
      volume: volume * 0.4,
    })
  }, [isEnabled, volume, playAudio])

  const value: AudioContextType = {
    isEnabled,
    volume,
    toggleAudio,
    setVolume,
    playRocketSequence,
    playNotification,
    playSuccess,
    playError,
  }

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
}
