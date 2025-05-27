"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Bot, X, Send, Minimize2, Maximize2 } from "lucide-react"

interface ChatMessage {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
}

const knowledgeBase = {
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Python",
    "TensorFlow",
    "PyTorch",
    "Node.js",
    "GraphQL",
    "Machine Learning",
    "AI Development",
  ],
  experience: [
    "Lead AI Engineer at Upstatement (2018-Present)",
    "Previously worked at Apple, Mullen, and Scout",
    "Specialized in AI-powered web applications",
    "10+ years of software engineering experience",
  ],
  projects: [
    "Neural Music Analyzer - AI-powered music analysis with real-time processing",
    "Quantum Code Theme - VS Code theme with ML-powered color suggestions",
    "AI-Powered Search Engine - Semantic search using transformer models",
    "Neural Network Visualizer - Interactive web app for NN visualization",
  ],
  education: [
    "Computer Science background with focus on AI/ML",
    "Self-taught machine learning since 2012",
    "Continuous learning in emerging AI technologies",
  ],
  interests: [
    "Artificial Intelligence and Machine Learning",
    "Web Development and User Experience",
    "Open Source Development",
    "Tech Innovation and Emerging Technologies",
  ],
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hi! I'm Brittany's AI assistant. I can tell you about her skills, experience, projects, and more. What would you like to know?",
      timestamp: new Date(),
    },
  ])
  const [currentInput, setCurrentInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messages])

  const generateResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("skill") || input.includes("technology") || input.includes("programming")) {
      return `Brittany's technical skills include: ${knowledgeBase.skills.join(", ")}. She's particularly strong in AI/ML technologies and modern web development.`
    }

    if (input.includes("experience") || input.includes("work") || input.includes("job")) {
      return `Here's Brittany's professional experience:\n${knowledgeBase.experience.join("\n")}\n\nShe focuses on building accessible, AI-powered products and mentoring junior developers.`
    }

    if (input.includes("project") || input.includes("built") || input.includes("created")) {
      return `Some of Brittany's notable projects:\n${knowledgeBase.projects.join("\n")}\n\nEach project demonstrates her expertise in combining AI with practical web applications.`
    }

    if (input.includes("education") || input.includes("learn") || input.includes("study")) {
      return `Brittany's educational background:\n${knowledgeBase.education.join("\n")}\n\nShe believes in continuous learning and staying updated with the latest AI developments.`
    }

    if (input.includes("interest") || input.includes("hobby") || input.includes("passion")) {
      return `Brittany is passionate about:\n${knowledgeBase.interests.join("\n")}\n\nShe's always exploring new ways to make technology more accessible and intelligent.`
    }

    if (input.includes("contact") || input.includes("reach") || input.includes("email")) {
      return "You can contact Brittany through the terminal form below! She typically responds within 24 hours and is always open to discussing AI projects, collaboration opportunities, or just saying hi."
    }

    if (input.includes("hello") || input.includes("hi") || input.includes("hey")) {
      return "Hello! I'm here to help you learn more about Brittany. You can ask me about her skills, experience, projects, or anything else you'd like to know!"
    }

    if (input.includes("help") || input.includes("what can you")) {
      return "I can help you learn about:\n• Brittany's technical skills and expertise\n• Her professional experience and career\n• Projects she's built\n• Her educational background\n• Her interests and passions\n• How to contact her\n\nJust ask me anything!"
    }

    // Default response with some personality
    const responses = [
      "That's an interesting question! Let me tell you more about Brittany's work in AI and web development. She's particularly passionate about making complex technologies accessible to everyone.",
      "I'd love to help you learn more about Brittany! She's been working in the intersection of AI and web development for over a decade. What specific aspect interests you most?",
      "Great question! Brittany combines her expertise in machine learning with modern web technologies to create innovative solutions. Would you like to know more about her specific projects or technical skills?",
    ]

    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleSendMessage = async () => {
    if (!currentInput.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: currentInput,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setCurrentInput("")
    setIsTyping(true)

    // Simulate AI thinking time
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000))

    const botResponse: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: "bot",
      content: generateResponse(currentInput),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, botResponse])
    setIsTyping(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="bg-gradient-to-r from-[#00ff88] to-[#0066ff] text-[#0a0a0f] p-4 rounded-full shadow-2xl hover:shadow-[#00ff88]/25 transition-all duration-300 hover:scale-110 ai-magical-glow"
        aria-label="Open AI Assistant"
      >
        <Bot size={24} />
      </button>
    )
  }

  return (
    <div
      className={`bg-[#0a0a0f] border border-[#00ff88]/30 rounded-lg shadow-2xl transition-all duration-300 ${
        isMinimized ? "h-16" : "h-96"
      } w-80 max-w-[calc(100vw-3rem)]`}
    >
      {/* Chatbot Header */}
      <div className="bg-[#1a1a2e] px-4 py-3 flex items-center justify-between border-b border-[#00ff88]/20 rounded-t-lg">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#00ff88] animate-pulse"></div>
          <span className="text-[#ccd6f6] font-mono text-sm flex items-center">
            <Bot size={16} className="mr-2 text-[#00ff88]" />
            AI Assistant
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-[#8892b0] hover:text-[#00ff88] transition-colors"
            aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
          >
            {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="text-[#8892b0] hover:text-red-400 transition-colors"
            aria-label="Close chat"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages Area */}
          <div
            ref={messagesRef}
            className="h-64 overflow-y-auto p-4 space-y-3 bg-[#0a0a0f] scrollbar-thin scrollbar-thumb-[#00ff88] scrollbar-track-transparent"
          >
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[70%] p-3 rounded-lg text-sm ${
                    message.type === "user"
                      ? "bg-[#00ff88] text-[#0a0a0f] ml-4"
                      : "bg-[#1a1a2e] text-[#ccd6f6] mr-4 border border-[#00ff88]/20"
                  }`}
                >
                  <div className="whitespace-pre-line">{message.content}</div>
                  <div
                    className={`text-xs mt-1 opacity-70 ${message.type === "user" ? "text-[#0a0a0f]" : "text-[#8892b0]"}`}
                  >
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-[#1a1a2e] text-[#ccd6f6] p-3 rounded-lg mr-4 border border-[#00ff88]/20">
                  <div className="flex items-center space-x-1">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-[#00ff88]/20 p-3">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about Brittany..."
                className="flex-1 bg-[#1a1a2e] text-[#ccd6f6] text-sm px-3 py-2 rounded border border-[#00ff88]/20 focus:outline-none focus:border-[#00ff88] placeholder-[#495670]"
              />
              <button
                onClick={handleSendMessage}
                disabled={!currentInput.trim() || isTyping}
                className="text-[#00ff88] hover:text-[#ccd6f6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
