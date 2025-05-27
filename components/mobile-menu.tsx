"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    document.body.style.overflow = isOpen ? "auto" : "hidden"
  }

  const closeMenu = () => {
    setIsOpen(false)
    document.body.style.overflow = "auto"
  }

  return (
    <div className="md:hidden">
      <button className="text-[#64ffda] z-50 relative" onClick={toggleMenu} aria-label="Toggle Menu">
        {isOpen ? (
          <X size={24} />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        )}
      </button>

      <div
        className={`fixed inset-0 z-40 bg-[#112240]/90 backdrop-blur-lg transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <nav className="w-full">
            <ul className="flex flex-col items-center space-y-6 font-mono text-lg">
              <li>
                <Link
                  href="#about"
                  className="text-[#ccd6f6] hover:text-[#64ffda] transition-colors"
                  onClick={closeMenu}
                >
                  <span className="text-[#64ffda]">01.</span> About
                </Link>
              </li>
              <li>
                <Link
                  href="#experience"
                  className="text-[#ccd6f6] hover:text-[#64ffda] transition-colors"
                  onClick={closeMenu}
                >
                  <span className="text-[#64ffda]">02.</span> Experience
                </Link>
              </li>
              <li>
                <Link
                  href="#work"
                  className="text-[#ccd6f6] hover:text-[#64ffda] transition-colors"
                  onClick={closeMenu}
                >
                  <span className="text-[#64ffda]">03.</span> Work
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-[#ccd6f6] hover:text-[#64ffda] transition-colors"
                  onClick={closeMenu}
                >
                  <span className="text-[#64ffda]">04.</span> Contact
                </Link>
              </li>
              <li className="pt-6">
                <Button
                  variant="outline"
                  className="border border-[#64ffda] text-[#64ffda] hover:bg-[#64ffda]/10 rounded px-8 py-4"
                  onClick={closeMenu}
                >
                  Resume
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}
