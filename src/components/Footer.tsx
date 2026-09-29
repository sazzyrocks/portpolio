import React, { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { scrollToTop } from "../lib/scroll"

export const Footer: React.FC = () => {
  const [localTime, setLocalTime] = useState<string>("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setLocalTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour12: true,
          hour: "2-digit",
          minute: "2-digit",
        }) + " IST"
      )
    }
    updateTime()
    const timer = setInterval(updateTime, 30000)
    return () => clearInterval(timer)
  }, [])

  return (
    <footer className="py-16 px-4 sm:px-6 border-t border-[#1e2129] bg-[#090a0c]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Brand Monogram & Philosophy */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
          <div className="flex items-center gap-2 font-serif text-lg text-[#f4efea]">
            <span className="text-[#c99558]">Sajal Porey</span>
            <span className="text-[#69655f]">/</span>
            <span className="font-mono text-xs text-[#9e9992]">Creative Technologist</span>
          </div>
          <p className="text-xs text-[#69655f] font-sans">
            Crafted with React, Framer Motion, and Tailwind CSS.
          </p>
        </div>

        {/* Center: Live Time Tracker */}
        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-[#121418] border border-[#232732] text-xs font-mono text-[#9e9992]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>India: {localTime || "Active"}</span>
        </div>

        {/* Right: Back to Top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#14161c] hover:bg-[#1f222a] border border-[#242834] text-xs font-mono text-[#9e9992] hover:text-[#f4efea] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#c99558]"
        >
          <span>Return to Summit</span>
          <ArrowUp className="w-3.5 h-3.5 text-[#c99558]" />
        </button>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-[#191b22] text-center text-[11px] font-mono text-[#54504b]">
        © {new Date().getFullYear()} Sajal Porey (@sazzyrocks). All rights reserved.
      </div>
    </footer>
  )
}
