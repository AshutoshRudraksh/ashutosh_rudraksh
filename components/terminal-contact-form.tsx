"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Send, Terminal, User, Mail, CheckCircle, AlertCircle, Rocket } from "lucide-react"

interface FormData {
  name: string
  email: string
  message: string
}

interface TerminalLine {
  id: string
  type: "command" | "output" | "input" | "success" | "error"
  content: string
  timestamp?: string
}

export default function TerminalContactForm() {
  const [currentStep, setCurrentStep] = useState<
    "idle" | "name" | "email" | "message" | "sending" | "success" | "error"
  >("idle")
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "" })
  const [currentInput, setCurrentInput] = useState("")
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([
    {
      id: "1",
      type: "output",
      content: "Contact Terminal v2.1.0 - AI Enhanced Communication Interface",
      timestamp: new Date().toLocaleTimeString(),
    },
    {
      id: "2",
      type: "output",
      content: 'Type "start" to begin contact form or "help" for available commands',
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [showRocketAnimation, setShowRocketAnimation] = useState(false)

  const [audioEnabled, setAudioEnabled] = useState(true)
  const ignitionAudioRef = useRef<HTMLAudioElement>(null)
  const launchAudioRef = useRef<HTMLAudioElement>(null)
  const whooshAudioRef = useRef<HTMLAudioElement>(null)

  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [terminalLines])

  useEffect(() => {
    if (inputRef.current && currentStep !== "idle") {
      inputRef.current.focus()
    }
  }, [currentStep])

  const addTerminalLine = (line: Omit<TerminalLine, "id">) => {
    setTerminalLines((prev) => [...prev, { ...line, id: Date.now().toString() }])
  }

  const typeMessage = async (message: string, type: TerminalLine["type"] = "output") => {
    setIsTyping(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    addTerminalLine({ type, content: message })
    setIsTyping(false)
  }

  const sendEmail = async (formData: FormData) => {
    try {
      // Simulate email sending - replace with your actual email service
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        return { success: true }
      } else {
        throw new Error("Failed to send email")
      }
    } catch (error) {
      // For demo purposes, we'll simulate a successful send
      await new Promise((resolve) => setTimeout(resolve, 2000))
      return { success: true }
    }
  }

  const triggerRocketAnimation = async () => {
    setShowRocketAnimation(true)

    if (audioEnabled) {
      try {
        // Play ignition sound first
        if (ignitionAudioRef.current) {
          ignitionAudioRef.current.currentTime = 0
          await ignitionAudioRef.current.play()
        }

        // Play launch sound after 500ms
        setTimeout(async () => {
          if (launchAudioRef.current) {
            launchAudioRef.current.currentTime = 0
            await launchAudioRef.current.play()
          }
        }, 500)

        // Play whoosh sound after 1500ms
        setTimeout(async () => {
          if (whooshAudioRef.current) {
            whooshAudioRef.current.currentTime = 0
            await whooshAudioRef.current.play()
          }
        }, 1500)
      } catch (error) {
        console.log("Audio playback failed:", error)
      }
    }

    setTimeout(() => setShowRocketAnimation(false), 4000)
  }

  const handleCommand = async (command: string) => {
    addTerminalLine({ type: "command", content: `$ ${command}` })

    switch (command.toLowerCase()) {
      case "start":
        await typeMessage("Initializing contact form...", "output")
        await typeMessage("Please enter your name:", "output")
        setCurrentStep("name")
        break

      case "help":
        await typeMessage("Available commands:", "output")
        await typeMessage("  start    - Begin contact form", "output")
        await typeMessage("  clear    - Clear terminal", "output")
        await typeMessage("  about    - About this terminal", "output")
        await typeMessage("  exit     - Return to idle state", "output")
        break

      case "clear":
        setTerminalLines([
          {
            id: Date.now().toString(),
            type: "output",
            content: 'Terminal cleared. Type "help" for available commands.',
          },
        ])
        break

      case "about":
        await typeMessage("AI-Enhanced Contact Terminal", "output")
        await typeMessage("Built with React, TypeScript, and lots of ☕", "output")
        await typeMessage("Designed to make contact forms less boring!", "output")
        break

      case "exit":
        setCurrentStep("idle")
        setFormData({ name: "", email: "", message: "" })
        await typeMessage("Contact form session ended.", "output")
        break

      default:
        await typeMessage(`Command not found: ${command}`, "error")
        await typeMessage('Type "help" for available commands', "output")
    }

    setCurrentInput("")
  }

  const handleFormInput = async (input: string) => {
    switch (currentStep) {
      case "name":
        addTerminalLine({ type: "input", content: input })
        setFormData((prev) => ({ ...prev, name: input }))
        await typeMessage(`Hello ${input}! Please enter your email address:`, "output")
        setCurrentStep("email")
        break

      case "email":
        addTerminalLine({ type: "input", content: input })
        if (!input.includes("@")) {
          await typeMessage("Invalid email format. Please try again:", "error")
          break
        }
        setFormData((prev) => ({ ...prev, email: input }))
        await typeMessage("Great! Now please enter your message:", "output")
        setCurrentStep("message")
        break

      case "message":
        addTerminalLine({ type: "input", content: input })
        const finalFormData = { ...formData, message: input }
        setFormData(finalFormData)

        await typeMessage("Processing your message...", "output")
        await typeMessage("Preparing rocket launch sequence...", "output")
        await typeMessage("🚀 Initiating message deployment...", "output")
        setCurrentStep("sending")

        // Trigger rocket animation
        triggerRocketAnimation()

        try {
          const result = await sendEmail(finalFormData)

          if (result.success) {
            await typeMessage("✓ Message launched successfully!", "success")
            await typeMessage("🌟 Your message is now traveling through cyberspace!", "success")
            await typeMessage("🛰️ Message delivered to destination!", "success")
            await typeMessage("Thank you for reaching out. I'll get back to you soon!", "success")
            await typeMessage('Type "start" to send another message or "exit" to close.', "output")
          }
        } catch (error) {
          await typeMessage("✗ Rocket launch failed. Please try again.", "error")
          await typeMessage('Type "start" to retry or "exit" to close.', "output")
        }

        setCurrentStep("idle")
        setFormData({ name: "", email: "", message: "" })
        break
    }

    setCurrentInput("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentInput.trim()) return

    if (currentStep === "idle") {
      handleCommand(currentInput.trim())
    } else {
      handleFormInput(currentInput.trim())
    }
  }

  const getPrompt = () => {
    switch (currentStep) {
      case "name":
        return "name@terminal:~$ "
      case "email":
        return "email@terminal:~$ "
      case "message":
        return "message@terminal:~$ "
      case "sending":
        return "sending@terminal:~$ "
      default:
        return "guest@terminal:~$ "
    }
  }

  const getPlaceholder = () => {
    switch (currentStep) {
      case "name":
        return "Enter your full name..."
      case "email":
        return "Enter your email address..."
      case "message":
        return "Enter your message..."
      default:
        return 'Type a command (try "start" or "help")...'
    }
  }

  return (
    <div className="terminal-container bg-[#0a0a0f] border border-[#00ff88]/30 rounded-lg overflow-hidden shadow-2xl shadow-[#00ff88]/10 relative">
      {/* Rocket Launch Animation */}
      {showRocketAnimation && (
        <div className="rocket-animation-container">
          <div className="rocket-ship">
            <Rocket size={32} className="text-[#00ff88]" />
          </div>
          <div className="rocket-flames">
            <div className="flame flame-1"></div>
            <div className="flame flame-2"></div>
            <div className="flame flame-3"></div>
          </div>
          <div className="rocket-trail"></div>
          <div className="rocket-smoke">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="smoke-particle" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
          <div className="stars-trail">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="star-particle" style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
        </div>
      )}

      {/* Terminal Header */}
      <div className="terminal-header bg-[#1a1a2e] px-4 py-3 flex items-center justify-between border-b border-[#00ff88]/20">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-[#8892b0] font-mono text-sm ml-4 flex items-center">
            <Terminal size={16} className="mr-2" />
            contact-terminal
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setAudioEnabled(!audioEnabled)}
            className="text-[#8892b0] hover:text-[#00ff88] transition-colors text-xs font-mono flex items-center space-x-1"
            title={audioEnabled ? "Disable sound effects" : "Enable sound effects"}
          >
            <span>{audioEnabled ? "🔊" : "🔇"}</span>
            <span className="hidden sm:inline">SFX</span>
          </button>
          <div className="flex items-center space-x-2 text-[#00ff88] font-mono text-xs">
            <span>●</span>
            <span>ONLINE</span>
          </div>
        </div>
      </div>

      {/* Terminal Body */}
      <div
        ref={terminalRef}
        className="terminal-body h-96 overflow-y-auto p-4 font-mono text-sm bg-[#0a0a0f] scrollbar-thin scrollbar-thumb-[#00ff88] scrollbar-track-transparent"
      >
        {terminalLines.map((line) => (
          <div key={line.id} className="terminal-line mb-1">
            {line.type === "command" && (
              <div className="flex items-center">
                <span className="text-[#00ff88] mr-2">guest@terminal:~$</span>
                <span className="text-[#ccd6f6]">{line.content.replace("$ ", "")}</span>
              </div>
            )}
            {line.type === "output" && (
              <div className="text-[#8892b0] flex items-start">
                <span className="text-[#00ff88] mr-2">→</span>
                <span>{line.content}</span>
              </div>
            )}
            {line.type === "input" && (
              <div className="flex items-center">
                <span className="text-[#0066ff] mr-2">←</span>
                <span className="text-[#ccd6f6]">{line.content}</span>
              </div>
            )}
            {line.type === "success" && (
              <div className="flex items-center text-[#00ff88]">
                <CheckCircle size={16} className="mr-2" />
                <span>{line.content}</span>
              </div>
            )}
            {line.type === "error" && (
              <div className="flex items-center text-red-400">
                <AlertCircle size={16} className="mr-2" />
                <span>{line.content}</span>
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center text-[#8892b0]">
            <span className="text-[#00ff88] mr-2">→</span>
            <span className="typing-indicator">
              <span className="typing-dot">.</span>
              <span className="typing-dot">.</span>
              <span className="typing-dot">.</span>
            </span>
          </div>
        )}
      </div>

      {/* Terminal Input */}
      <div className="terminal-input border-t border-[#00ff88]/20 bg-[#0a0a0f]">
        <form onSubmit={handleSubmit} className="flex items-center p-4">
          <span className="text-[#00ff88] font-mono text-sm mr-2 flex-shrink-0">{getPrompt()}</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            placeholder={getPlaceholder()}
            disabled={currentStep === "sending" || isTyping}
            className="flex-1 bg-transparent text-[#ccd6f6] font-mono text-sm outline-none placeholder-[#495670] disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!currentInput.trim() || currentStep === "sending" || isTyping}
            className="ml-2 text-[#00ff88] hover:text-[#ccd6f6] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={16} />
          </button>
        </form>
      </div>

      {/* Status Bar */}
      <div className="terminal-status bg-[#1a1a2e] px-4 py-2 border-t border-[#00ff88]/20 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center space-x-4">
          <span className="text-[#8892b0]">
            Step: <span className="text-[#00ff88]">{currentStep}</span>
          </span>
          {formData.name && (
            <span className="text-[#8892b0]">
              <User size={12} className="inline mr-1" />
              {formData.name}
            </span>
          )}
          {formData.email && (
            <span className="text-[#8892b0]">
              <Mail size={12} className="inline mr-1" />
              {formData.email}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse"></div>
          <span className="text-[#8892b0]">Ready</span>
        </div>
      </div>
      <audio ref={ignitionAudioRef} preload="auto">
        <source src="/audio/rocket-ignition.mp3" type="audio/mpeg" />
      </audio>
      <audio ref={launchAudioRef} preload="auto">
        <source src="/audio/rocket-launch.mp3" type="audio/mpeg" />
      </audio>
      <audio ref={whooshAudioRef} preload="auto">
        <source src="/audio/rocket-whoosh.mp3" type="audio/mpeg" />
      </audio>
    </div>
  )
}
