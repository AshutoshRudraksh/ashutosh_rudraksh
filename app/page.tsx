"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Github, Linkedin, Mail, Twitter, Instagram, ExternalLink, Code, Cpu, Folder } from "lucide-react"
import { Button } from "@/components/ui/button"
import AIChatbot from "@/components/ai-chatbot"
import { AudioProvider } from "@/components/audio-manager"
import TerminalContactFormEnhanced from "@/components/terminal-contact-form-enhanced"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Loading sequence
    const timer1 = setTimeout(() => {
      setIsLoading(false)
    }, 4000) // Extended for better bouncing effect

    const timer2 = setTimeout(() => {
      setShowContent(true)
    }, 4500)

    // Mouse tracking for interactive elements
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    // Scroll listener for parallax effects
    const handleScroll = () => setScrollY(window.scrollY)

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)

    // Intersection Observer for section animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")
          setActiveSection(entry.target.id)
        }
      })
    }, observerOptions)

    // Observe all sections after content loads
    if (showContent) {
      const sections = document.querySelectorAll("section[id]")
      sections.forEach((section) => observer.observe(section))
    }

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
      const sections = document.querySelectorAll("section[id]")
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [showContent])

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#0a0a0f] flex items-center justify-center overflow-hidden">
        {/* Binary Rain Background */}
        <div className="binary-rain">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="binary-column" style={{ left: `${i * 5}%`, animationDelay: `${i * 0.1}s` }}>
              {Array.from({ length: 20 }).map((_, j) => (
                <span key={j} className="binary-char">
                  {Math.random() > 0.5 ? "1" : "0"}
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* Neural Network Background */}
        <div className="neural-network">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="neural-node"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>

        {/* Enhanced Bouncing 'A' Animation */}
        <div className="bouncing-a-enhanced">
          <div className="ai-hexagon-logo">
            <div className="ai-hexagon-inner">
              <span className="ai-logo-letter">A</span>
              <div className="ai-glow-ring"></div>
              <div className="ai-pulse-ring"></div>
            </div>
          </div>
          <div className="loading-text">
            <span className="loading-char">I</span>
            <span className="loading-char">N</span>
            <span className="loading-char">I</span>
            <span className="loading-char">T</span>
            <span className="loading-char">I</span>
            <span className="loading-char">A</span>
            <span className="loading-char">L</span>
            <span className="loading-char">I</span>
            <span className="loading-char">Z</span>
            <span className="loading-char">I</span>
            <span className="loading-char">N</span>
            <span className="loading-char">G</span>
            <span className="loading-dots">...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <AudioProvider>
      <div className="min-h-screen bg-[#0a0a0f] text-[#8892b0] overflow-x-hidden relative">
        {/* Animated Grid Background */}
        <div className="fixed inset-0 opacity-20 pointer-events-none">
          <div className="grid-pattern"></div>
        </div>

        {/* Floating Particles */}
        <div className="floating-particles">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 20}s`,
                animationDuration: `${15 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>

        {/* Header */}
        <header
          className={`fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 py-6 transition-all duration-1000 ${showContent ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"} ${scrollY > 100 ? "bg-[#0a0a0f]/90 backdrop-blur-md shadow-lg border-b border-[#1a1a2e]/50" : ""}`}
        >
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            {/* Enhanced Logo */}
            <div className="ai-hexagon-logo-small animate-logo-appear magical-glow">
              <div className="ai-hexagon-inner-small">
                <span className="ai-logo-letter-small">A</span>
                <div className="ai-glow-ring-small"></div>
              </div>
            </div>

            {/* Navigation - Refined without icons */}
            <nav className="hidden md:block">
              <ul className="flex items-center space-x-8 text-sm font-mono">
                {[
                  { href: "#about", label: "About", number: "01" },
                  { href: "#experience", label: "Experience", number: "02" },
                  { href: "#work", label: "Projects", number: "03" },
                  { href: "#contact", label: "Contact", number: "04" },
                ].map((item, index) => (
                  <li key={item.href} className="animate-nav-item" style={{ animationDelay: `${1 + index * 0.1}s` }}>
                    <Link
                      href={item.href}
                      className={`text-[#ccd6f6] hover:text-[#00ff88] transition-all duration-300 ai-magical-glow ${activeSection === item.href.slice(1) ? "text-[#00ff88]" : ""}`}
                    >
                      <span className="text-[#00ff88] mr-1">{item.number}.</span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
                <li className="animate-nav-item" style={{ animationDelay: "1.4s" }}>
                  <Button
                    variant="outline"
                    className="border border-[#00ff88] text-[#00ff88] hover:bg-[#00ff88]/10 bg-transparent rounded-sm px-4 py-2 text-sm font-mono transition-all duration-300 ai-magical-glow"
                  >
                    Resume
                  </Button>
                </li>
              </ul>
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-[#00ff88] ai-magical-glow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </header>

        {/* Left Sidebar - Social Icons */}
        <div
          className={`fixed left-6 lg:left-12 bottom-0 z-40 transition-all duration-1000 delay-1000 ${showContent ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}
        >
          <div className="flex flex-col items-center space-y-6">
            <a
              href="#"
              className="text-[#a8b2d1] hover:text-[#00ff88] hover:-translate-y-1 transition-all duration-300 ai-magical-glow"
            >
              <Github size={20} />
            </a>
            <a
              href="#"
              className="text-[#a8b2d1] hover:text-[#00ff88] hover:-translate-y-1 transition-all duration-300 ai-magical-glow"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="text-[#a8b2d1] hover:text-[#00ff88] hover:-translate-y-1 transition-all duration-300 ai-magical-glow"
            >
              <Twitter size={20} />
            </a>
            <a
              href="#"
              className="text-[#a8b2d1] hover:text-[#00ff88] hover:-translate-y-1 transition-all duration-300 ai-magical-glow"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="#"
              className="text-[#a8b2d1] hover:text-[#00ff88] hover:-translate-y-1 transition-all duration-300 ai-magical-glow"
            >
              <Mail size={20} />
            </a>
            <div className="w-px h-24 bg-gradient-to-t from-[#00ff88] to-transparent"></div>
          </div>
        </div>

        {/* Right Sidebar - Email */}
        <div
          className={`fixed right-6 lg:right-12 bottom-0 z-40 transition-all duration-1000 delay-1200 ${showContent ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
        >
          <div className="flex flex-col items-center space-y-6">
            <a
              href="mailto:your.email@example.com"
              className="text-[#a8b2d1] hover:text-[#00ff88] hover:-translate-y-1 transition-all duration-300 font-mono text-sm tracking-widest vertical-text ai-magical-glow"
            >
              your.email@example.com
            </a>
            <div className="w-px h-24 bg-gradient-to-t from-[#00ff88] to-transparent"></div>
          </div>
        </div>

        {/* Main Content */}
        <main>
          {/* Hero Section */}
          <section className="min-h-screen flex items-center justify-start px-6 lg:px-32 max-w-7xl mx-auto relative">
            {/* Code Pattern Background */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <pre className="code-pattern text-xs leading-relaxed">
                {`function initializeAI() {
  const neuralNetwork = new NeuralNetwork();
  const dataProcessor = new DataProcessor();
  
  while (learning) {
    const input = dataProcessor.process(rawData);
    const output = neuralNetwork.forward(input);
    const loss = calculateLoss(output, target);
    neuralNetwork.backward(loss);
    
    if (convergence) break;
  }
  
  return optimizedModel;
}`}
              </pre>
            </div>

            <div
              className={`max-w-4xl transition-all duration-1000 delay-500 relative z-10 ${showContent ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              style={{ transform: `translateY(${scrollY * 0.1}px)` }}
            >
              <p
                className="text-[#00ff88] font-mono text-base lg:text-lg mb-6 animate-content-appear flex items-center"
                style={{ animationDelay: "0.6s" }}
              >
                <Code size={20} className="mr-2" />
                Hi, my name is
              </p>
              <h1
                className="text-4xl sm:text-6xl lg:text-7xl font-bold text-[#ccd6f6] mb-4 leading-tight animate-content-appear"
                style={{ animationDelay: "0.8s" }}
              >
                <span className="gradient-text">Brittany Chiang.</span>
              </h1>
              <h2
                className="text-3xl sm:text-5xl lg:text-6xl font-bold text-[#8892b0] mb-8 leading-tight animate-content-appear"
                style={{ animationDelay: "1s" }}
              >
                I build <span className="text-[#00ff88]">intelligent</span> things for the web.
              </h2>
              <p
                className="text-[#8892b0] text-lg leading-relaxed mb-12 max-w-2xl animate-content-appear"
                style={{ animationDelay: "1.2s" }}
              >
                I'm a software engineer specializing in building AI-powered applications and exceptional digital
                experiences. Currently, I'm focused on developing accessible, intelligent products at{" "}
                <a href="#" className="text-[#00ff88] hover:underline ai-magical-glow">
                  Upstatement
                </a>
                .
              </p>
              <div className="animate-content-appear flex items-center space-x-4" style={{ animationDelay: "1.4s" }}>
                <Button className="bg-transparent hover:bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88] rounded-sm px-8 py-4 font-mono text-sm transition-all duration-300 hover:-translate-y-1 ai-magical-glow">
                  <Folder size={16} className="mr-2" />
                  Explore Projects!
                </Button>
                <div className="hidden lg:flex items-center space-x-2 text-[#00ff88] font-mono text-sm">
                  <Cpu size={16} />
                  <span className="typing-animation">Neural Networks Active</span>
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section
            id="about"
            className="py-24 px-6 lg:px-32 max-w-7xl mx-auto opacity-0 translate-y-10 transition-all duration-1000 relative"
          >
            {/* Binary Pattern */}
            <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
              <div className="binary-pattern text-xs">
                {Array.from({ length: 100 }).map((_, i) => (
                  <span key={i} className={`binary-digit ${Math.random() > 0.5 ? "text-[#00ff88]" : "text-[#4a5568]"}`}>
                    {Math.random() > 0.5 ? "1" : "0"}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-[#ccd6f6] mr-6 font-mono whitespace-nowrap flex items-center">
                <span className="text-[#00ff88] mr-2">01.</span>
                About Me
              </h2>
              <div className="flex-grow h-px bg-gradient-to-r from-[#00ff88] to-transparent animate-expand-width"></div>
            </div>

            <div className="grid lg:grid-cols-3 gap-16">
              <div className="lg:col-span-2 space-y-4 text-[#8892b0]">
                <p className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                  Hello! My name is Brittany and I enjoy creating intelligent systems that live on the internet. My
                  journey into AI and web development started back in 2012 when I decided to experiment with machine
                  learning algorithms — turns out training my first neural network taught me a lot about data structures
                  and algorithms!
                </p>
                <p className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                  Fast-forward to today, and I've had the privilege of working at{" "}
                  <a href="#" className="text-[#00ff88] ai-magical-glow">
                    AI research labs
                  </a>
                  ,{" "}
                  <a href="#" className="text-[#00ff88] ai-magical-glow">
                    tech startups
                  </a>
                  ,{" "}
                  <a href="#" className="text-[#00ff88] ai-magical-glow">
                    Fortune 500 companies
                  </a>
                  , and{" "}
                  <a href="#" className="text-[#00ff88] ai-magical-glow">
                    innovative design studios
                  </a>
                  . My main focus these days is building accessible, AI-powered products and digital experiences at{" "}
                  <a href="#" className="text-[#00ff88] ai-magical-glow">
                    Upstatement
                  </a>{" "}
                  for a variety of clients.
                </p>
                <p className="animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
                  I also recently{" "}
                  <a href="#" className="text-[#00ff88] ai-magical-glow">
                    launched a course
                  </a>{" "}
                  that covers everything you need to build AI-powered web applications using modern frameworks and
                  machine learning APIs.
                </p>
                <p className="animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
                  Here are some technologies I've been working with recently:
                </p>
                <ul className="grid grid-cols-2 gap-2 mt-4 font-mono text-sm">
                  {[
                    "JavaScript (ES6+)",
                    "TypeScript",
                    "React",
                    "Python",
                    "TensorFlow",
                    "PyTorch",
                    "Node.js",
                    "GraphQL",
                  ].map((tech, index) => (
                    <li
                      key={tech}
                      className="flex items-center animate-fade-in-left ai-magical-glow"
                      style={{ animationDelay: `${1 + index * 0.1}s` }}
                    >
                      <span className="text-[#00ff88] mr-2">▹</span> {tech}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative group animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                <div className="relative aspect-square bg-gradient-to-br from-[#00ff88]/10 to-[#0066ff]/10 rounded overflow-hidden max-w-sm mx-auto">
                  <img
                    src="/placeholder.svg?height=400&width=400"
                    alt="Profile"
                    className="relative z-10 mix-blend-multiply grayscale contrast-100 brightness-90 hover:filter-none transition-all duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 border-2 border-[#00ff88] rounded translate-x-5 translate-y-5 group-hover:translate-x-4 group-hover:translate-y-4 transition-all duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/20 to-[#0066ff]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section
            id="experience"
            className="py-24 px-6 lg:px-32 max-w-7xl mx-auto opacity-0 translate-y-10 transition-all duration-1000 relative"
          >
            <div className="flex items-center mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-[#ccd6f6] mr-6 font-mono whitespace-nowrap flex items-center">
                <span className="text-[#00ff88] mr-2">02.</span>
                Where I've Worked
              </h2>
              <div className="flex-grow h-px bg-gradient-to-r from-[#00ff88] to-transparent animate-expand-width"></div>
            </div>

            <div className="grid lg:grid-cols-[250px_1fr] gap-8">
              <div className="border-l-2 border-[#233554] font-mono relative">
                <div className="absolute left-0 top-0 w-0.5 h-full bg-gradient-to-b from-[#00ff88] to-transparent"></div>
                {["Upstatement", "Apple", "Mullen", "Scout"].map((company, index) => (
                  <button
                    key={company}
                    className={`w-full px-5 py-3 text-left transition-all duration-300 hover:bg-[#172a45] hover:text-[#00ff88] hover:translate-x-2 animate-fade-in-left ai-magical-glow relative ${index === 0 ? "border-l-2 border-[#00ff88] -ml-0.5 text-[#00ff88] bg-[#172a45]" : ""}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {company}
                    {index === 0 && (
                      <div className="absolute left-0 top-1/2 w-2 h-2 bg-[#00ff88] rounded-full -translate-x-1 -translate-y-1/2"></div>
                    )}
                  </button>
                ))}
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                <h3 className="text-xl text-[#ccd6f6] font-medium mb-1 flex items-center">
                  Lead AI Engineer <span className="text-[#00ff88] ml-2">@ Upstatement</span>
                </h3>
                <p className="font-mono text-sm mb-6 text-[#a8b2d1]">May 2018 - Present</p>
                <ul className="space-y-4">
                  {[
                    "Develop and deploy machine learning models for client projects including Harvard Business School, Everytown for Gun Safety, and Vanderbilt University",
                    "Lead the architecture and implementation of AI-powered features using TensorFlow, PyTorch, and modern web technologies",
                    "Collaborate with data scientists and UX designers to create intelligent, accessible user experiences",
                    "Mentor junior developers in AI/ML best practices and provide technical leadership across engineering teams",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex animate-fade-in-left"
                      style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                    >
                      <span className="text-[#00ff88] mr-2 mt-1 flex-shrink-0">▹</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Projects Section - Updated with folder icons */}
          <section
            id="work"
            className="py-24 px-6 lg:px-32 max-w-7xl mx-auto opacity-0 translate-y-10 transition-all duration-1000"
          >
            <div className="flex items-center mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-[#ccd6f6] mr-6 font-mono whitespace-nowrap flex items-center">
                <span className="text-[#00ff88] mr-2">03.</span>
                Projects I've Built
              </h2>
              <div className="flex-grow h-px bg-gradient-to-r from-[#00ff88] to-transparent animate-expand-width"></div>
            </div>

            <div className="space-y-24">
              {/* Featured Projects - Removed "Featured AI Project" text */}
              {[
                {
                  title: "Neural Music Analyzer",
                  description:
                    "An AI-powered web application that analyzes music using deep learning models. Features real-time audio processing, mood detection, and personalized recommendations using TensorFlow.js and the Spotify API.",
                  tech: ["React", "TensorFlow.js", "Python", "Spotify API", "WebAudio API"],
                  reverse: false,
                },
                {
                  title: "Quantum Code Theme",
                  description:
                    "A futuristic, AI-inspired theme for VS Code featuring dynamic syntax highlighting that adapts to code complexity. Includes machine learning-powered color suggestions and neural network visualizations.",
                  tech: ["VS Code API", "TypeScript", "Machine Learning", "Color Theory", "WebGL"],
                  reverse: true,
                },
              ].map((project, index) => (
                <div
                  key={project.title}
                  className={`relative grid lg:grid-cols-12 gap-4 animate-fade-in-up`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div
                    className={`lg:col-span-7 ${project.reverse ? "lg:col-start-1" : "lg:col-start-6"} row-start-1 relative`}
                  >
                    <div className="relative h-full group">
                      <a href="#" className="block h-full ai-magical-glow">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/10 to-[#0066ff]/10 hover:from-[#00ff88]/20 hover:to-[#0066ff]/20 transition-all duration-500 rounded overflow-hidden group-hover:scale-105">
                          <img
                            src="/placeholder.svg?height=400&width=700"
                            alt="Project Screenshot"
                            className="w-full h-full object-cover mix-blend-multiply grayscale hover:grayscale-0 transition-all duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/5 to-[#0066ff]/5"></div>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div
                    className={`lg:col-span-6 ${project.reverse ? "lg:col-start-7" : "lg:col-start-1"} lg:row-start-1 flex flex-col justify-center z-10 ${project.reverse ? "lg:text-right" : "lg:text-left"}`}
                  >
                    <p
                      className="font-mono text-[#00ff88] mb-1 animate-fade-in-up flex items-center"
                      style={{ animationDelay: `${index * 0.2 + 0.1}s` }}
                    >
                      <Folder size={16} className="mr-2" />
                      Featured Project
                    </p>
                    <h3
                      className="text-2xl font-bold text-[#ccd6f6] mb-4 animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.2 + 0.2}s` }}
                    >
                      <a href="#" className="hover:text-[#00ff88] transition-colors duration-300 ai-magical-glow">
                        {project.title}
                      </a>
                    </h3>
                    <div
                      className="bg-[#112240] border border-[#00ff88]/20 p-6 rounded shadow-xl mb-4 hover:shadow-2xl hover:shadow-[#00ff88]/10 transition-all duration-500 hover:-translate-y-1 animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.2 + 0.3}s` }}
                    >
                      <p>{project.description}</p>
                    </div>
                    <ul
                      className={`flex flex-wrap font-mono text-sm mb-4 gap-x-4 ${project.reverse ? "lg:justify-end" : ""} animate-fade-in-up`}
                      style={{ animationDelay: `${index * 0.2 + 0.4}s` }}
                    >
                      {project.tech.map((tech) => (
                        <li key={tech} className="text-[#8892b0] hover:text-[#00ff88] transition-colors duration-300">
                          {tech}
                        </li>
                      ))}
                    </ul>
                    <div
                      className={`flex space-x-4 ${project.reverse ? "lg:justify-end" : ""} animate-fade-in-up`}
                      style={{ animationDelay: `${index * 0.2 + 0.5}s` }}
                    >
                      <a
                        href="#"
                        className="text-[#ccd6f6] hover:text-[#00ff88] transition-all duration-300 hover:-translate-y-1 ai-magical-glow"
                      >
                        <Github size={20} />
                      </a>
                      <a
                        href="#"
                        className="text-[#ccd6f6] hover:text-[#00ff88] transition-all duration-300 hover:-translate-y-1 ai-magical-glow"
                      >
                        <ExternalLink size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Other Projects Grid - Updated with folder icons */}
            <div className="mt-32">
              <h3 className="text-center text-2xl font-bold text-[#ccd6f6] mb-16 animate-fade-in-up flex items-center justify-center">
                <Folder size={24} className="mr-2" />
                Other Noteworthy Projects
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "AI-Powered Search Engine",
                    description:
                      "Building a semantic search engine using transformer models and vector databases for enhanced query understanding",
                    tech: ["Python", "Transformers", "Vector DB"],
                  },
                  {
                    title: "Neural Network Visualizer",
                    description:
                      "Interactive web app for visualizing neural network architectures and training processes in real-time",
                    tech: ["React", "D3.js", "TensorFlow.js"],
                  },
                  {
                    title: "Smart Code Completion",
                    description:
                      "VS Code extension that uses GPT models to provide intelligent code suggestions and documentation",
                    tech: ["TypeScript", "OpenAI API", "VS Code"],
                  },
                  {
                    title: "Computer Vision Dashboard",
                    description:
                      "Real-time object detection and analysis dashboard using modern computer vision models",
                    tech: ["Python", "OpenCV", "YOLO"],
                  },
                  {
                    title: "Quantum Algorithm Simulator",
                    description:
                      "Web-based quantum computing simulator with visual circuit builder and state visualization",
                    tech: ["JavaScript", "Quantum.js", "WebGL"],
                  },
                  {
                    title: "AI Ethics Analyzer",
                    description: "Tool for analyzing AI model bias and fairness across different demographic groups",
                    tech: ["Python", "Fairness ML", "React"],
                  },
                ].map((project, index) => (
                  <div
                    key={project.title}
                    className="bg-[#112240] border border-[#00ff88]/20 rounded p-6 flex flex-col h-full hover:translate-y-[-10px] transition-all duration-500 hover:shadow-xl hover:shadow-[#00ff88]/10 animate-fade-in-up ai-magical-glow"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex justify-between items-center mb-6">
                      <div className="text-[#00ff88] transition-transform duration-300 hover:scale-110">
                        <Folder size={40} />
                      </div>
                      <div className="flex space-x-4">
                        <a
                          href="#"
                          className="text-[#ccd6f6] hover:text-[#00ff88] transition-all duration-300 hover:-translate-y-1 ai-magical-glow"
                        >
                          <Github size={20} />
                        </a>
                        <a
                          href="#"
                          className="text-[#ccd6f6] hover:text-[#00ff88] transition-all duration-300 hover:-translate-y-1 ai-magical-glow"
                        >
                          <ExternalLink size={20} />
                        </a>
                      </div>
                    </div>
                    <h4 className="text-xl font-bold text-[#ccd6f6] mb-2">
                      <a href="#" className="hover:text-[#00ff88] transition-colors duration-300 ai-magical-glow">
                        {project.title}
                      </a>
                    </h4>
                    <p className="text-[#a8b2d1] mb-4 flex-grow">{project.description}</p>
                    <ul className="flex flex-wrap font-mono text-sm gap-x-3 text-[#8892b0]">
                      {project.tech.map((tech) => (
                        <li key={tech} className="hover:text-[#00ff88] transition-colors duration-300">
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section
            id="contact"
            className="py-24 px-6 lg:px-32 max-w-6xl mx-auto opacity-0 translate-y-10 transition-all duration-1000"
          >
            <div className="flex items-center mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-[#ccd6f6] mr-6 font-mono whitespace-nowrap flex items-center">
                <span className="text-[#00ff88] mr-2">04.</span>
                Get In Touch
              </h2>
              <div className="flex-grow h-px bg-gradient-to-r from-[#00ff88] to-transparent animate-expand-width"></div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left side - Description */}
              <div className="space-y-6">
                <p
                  className="text-[#00ff88] font-mono text-lg mb-4 animate-fade-in-up flex items-center"
                  style={{ animationDelay: "0.1s" }}
                >
                  <Code size={20} className="mr-2" />
                  ./contact --help
                </p>
                <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                  <h3 className="text-3xl md:text-4xl font-bold text-[#ccd6f6] mb-6">Let's Build Something Amazing</h3>
                  <p className="text-[#8892b0] text-lg leading-relaxed mb-6">
                    Whether you have a question about AI, want to collaborate on a project, or just want to say hi, I'm
                    always excited to connect with fellow developers and innovators.
                  </p>
                  <div className="space-y-3 text-[#a8b2d1]">
                    <div className="flex items-center font-mono text-sm">
                      <span className="text-[#00ff88] mr-2">$</span>
                      <span>response_time: &lt; 24 hours</span>
                    </div>
                    <div className="flex items-center font-mono text-sm">
                      <span className="text-[#00ff88] mr-2">$</span>
                      <span>availability: open to opportunities</span>
                    </div>
                    <div className="flex items-center font-mono text-sm">
                      <span className="text-[#00ff88] mr-2">$</span>
                      <span>interests: [AI, ML, Web Dev, Open Source]</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side - Terminal Contact Form */}
              <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                <TerminalContactFormEnhanced />
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-6 text-center font-mono text-sm animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
            <p className="text-[#a8b2d1]">
              <a
                href="#"
                className="ai-magical-glow hover:text-[#00ff88] transition-colors duration-300 flex items-center justify-center"
              >
                <Code size={16} className="mr-2" />
                Designed & Built by Brittany Chiang
              </a>
            </p>
          </footer>
        </main>

        {/* AI Chatbot - Properly positioned */}
        <div className="fixed bottom-6 right-6 z-[60]">
          <AIChatbot />
        </div>
      </div>
    </AudioProvider>
  )
}
