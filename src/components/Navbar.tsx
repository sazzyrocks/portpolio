import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ArrowUpRight, Compass, CodeXml, Layers, Sparkles, Send } from "lucide-react"
import { scrollToElement } from "../lib/scroll"

interface NavItem {
  id: string
  label: string
  icon: React.ElementType
}

const NAV_ITEMS: NavItem[] = [
  { id: "hero", label: "Top", icon: Sparkles },
  { id: "about", label: "About", icon: Compass },
  { id: "projects", label: "Projects", icon: CodeXml },
  { id: "skills", label: "Arsenal", icon: Layers },
  { id: "contact", label: "Contact", icon: Send },
]

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("hero")
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)

      const sections = NAV_ITEMS.map((item) => document.getElementById(item.id))
      const scrollPosition = window.scrollY + 180

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(NAV_ITEMS[i].id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    scrollToElement(id, () => setMobileMenuOpen(false))
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "py-3 bg-[#0b0c0e]/85 backdrop-blur-md border-b border-[#252830]" : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Monogram Brand */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              scrollTo("hero")
            }}
            className="group flex items-center gap-3 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#c99558] rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-lg bg-[#181a20] border border-[#2d313b] group-hover:border-[#c99558]/60 flex items-center justify-center transition-colors">
              <span className="font-serif text-lg font-semibold tracking-wider text-[#f4efea] group-hover:text-[#c99558] transition-colors">
                SP
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight text-[#f4efea] font-sans">
                Sajal Porey
              </span>
              <span className="text-[11px] font-mono text-[#9e9992] tracking-wider">
                @sazzyrocks
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 bg-[#131418]/90 border border-[#252830] rounded-full px-2 py-1.5 shadow-sm shadow-black/40">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id

              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`relative px-4 py-1.5 text-xs font-medium rounded-full cursor-pointer transition-colors duration-200 flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[#c99558] ${
                    isActive ? "text-[#f4efea]" : "text-[#9e9992] hover:text-[#f4efea]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-[#252830] rounded-full border border-[#3b404d]"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5" />
                    {item.label}
                  </span>
                </button>
              )
            })}
          </nav>

          {/* Availability / Contact CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                scrollTo("contact")
              }}
              className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#16181f] border border-[#2a2e39] text-[#f4efea] hover:border-[#c99558]/60 transition-colors focus-visible:outline-2 focus-visible:outline-[#c99558]"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Hire</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#9e9992] group-hover:text-[#c99558] transition-colors" />
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
            className="md:hidden w-11 h-11 flex items-center justify-center rounded-lg bg-[#14161b] border border-[#252830] text-[#f4efea] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#c99558]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[72px] z-40 bg-[#0e1014]/95 backdrop-blur-xl border-b border-[#252830] px-6 py-6 md:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon
                const isActive = activeSection === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-left transition-colors cursor-pointer ${
                      isActive ? "bg-[#1f222b] text-[#f4efea] font-semibold" : "text-[#9e9992] hover:bg-[#15171d] hover:text-[#f4efea]"
                    }`}
                  >
                    <Icon className="w-4 h-4 text-[#c99558]" />
                    {item.label}
                  </button>
                )
              })}
              <div className="pt-4 mt-2 border-t border-[#252830]">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollTo("contact")
                  }}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#c99558] text-[#0b0c0e] font-semibold text-sm hover:bg-[#dfb27c] transition-colors"
                >
                  <span>Initiate Dialogue</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
