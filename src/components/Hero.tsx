import React from "react"
import { motion } from "framer-motion"
import { ArrowDown, ArrowUpRight, Sparkles, Terminal, Orbit, ShieldCheck } from "lucide-react"
import { PORTFOLIO_DATA } from "../data/portfolioData"
import { scrollToElement } from "../lib/scroll"

export const Hero: React.FC = () => {
  const { profile } = PORTFOLIO_DATA

  return (
    <section id="hero" className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Editorial Headline & Narrative */}
        <div className="lg:col-span-7 flex flex-col items-start">
          {/* Metadata pill */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-[#15171d] border border-[#272b35] text-[#c99558] mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Vol. 2026 / Creative Computing & Systems</span>
          </motion.div>

          {/* Main Editorial Headline (Strict Roman typography, no italic header per Hallmark) */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-serif font-normal tracking-tight text-[#f4efea] leading-[1.08] mb-6"
          >
            Engineering digital realities with{" "}
            <span className="text-[#c99558] font-serif underline decoration-[#c99558]/40 underline-offset-8">
              artistic vision
            </span>
            .
          </motion.h1>

          {/* Lead Narrative */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.16 }}
            className="text-base sm:text-lg text-[#9e9992] max-w-xl font-sans leading-relaxed mb-8"
          >
            I am <strong className="text-[#f4efea] font-medium">Sajal Porey</strong> (
            <span className="font-mono text-xs text-[#c99558]">@sazzyrocks</span>). Crafting
            immersive 3D WebGL environments, resilient backend systems, and tactile human-centric
            interfaces with zero compromise on performance.
          </motion.p>

          {/* Actions with Spring Physics */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.22 }}
            className="flex flex-wrap items-center gap-4 mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              onClick={() => scrollToElement("projects")}
              className="cursor-pointer px-6 py-3 rounded-full bg-[#c99558] hover:bg-[#dfb27c] text-[#0b0c0e] font-sans font-semibold text-sm flex items-center gap-2 shadow-lg shadow-[#c99558]/10 focus-visible:outline-2 focus-visible:outline-[#c99558]"
            >
              <span>Explore Repertory</span>
              <ArrowDown className="w-4 h-4" />
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              href={profile.solarisDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer px-5 py-3 rounded-full bg-[#15171d] hover:bg-[#1f222b] text-[#f4efea] border border-[#272b35] hover:border-[#c99558]/50 font-sans font-medium text-sm flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-[#c99558]"
            >
              <Orbit className="w-4 h-4 text-[#c99558]" />
              <span>Launch SOLARIS 3D</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#9e9992]" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer px-4 py-3 rounded-full bg-[#15171d] hover:bg-[#1f222b] text-[#9e9992] hover:text-[#f4efea] border border-[#272b35] font-mono text-xs flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-[#c99558]"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.a>
          </motion.div>

          {/* Metrics Row (Honest data, no slop) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-3 gap-6 pt-6 border-t border-[#20232b] w-full max-w-lg"
          >
            {profile.stats.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span className="font-serif text-2xl sm:text-3xl font-normal text-[#f4efea]">
                    {stat.value}
                  </span>
                  {stat.suffix && (
                    <span className="font-mono text-xs text-[#c99558]">{stat.suffix}</span>
                  )}
                </div>
                <span className="text-[11px] font-sans text-[#9e9992] tracking-wide mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Column: High-Craft Asymmetric Terminal / Architecture Card */}
        <div className="lg:col-span-5 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="w-full max-w-md rounded-2xl bg-[#121418] border border-[#262933] shadow-2xl overflow-hidden p-6 relative group"
          >
            {/* Subtle glow accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#c99558]/5 rounded-full blur-3xl pointer-events-none" />

            {/* Header bar */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#20232b]">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#c99558]" />
                <span className="text-xs font-mono text-[#f4efea] font-medium">sajal_engine.ts</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-[10px] font-mono uppercase text-[#9e9992] tracking-wider">
                  Active
                </span>
              </div>
            </div>

            {/* Code Block with Editorial Syntax Highlighting */}
            <div className="font-mono text-[13px] leading-relaxed text-[#9e9992] space-y-2">
              <p>
                <span className="text-[#c99558]">const</span>{" "}
                <span className="text-[#f4efea]">artisan</span> = &#123;
              </p>
              <div className="pl-4 space-y-1">
                <p>
                  <span className="text-[#9e9992]">identity:</span>{" "}
                  <span className="text-[#e2c19a]">"Sajal Porey"</span>,
                </p>
                <p>
                  <span className="text-[#9e9992]">alias:</span>{" "}
                  <span className="text-[#e2c19a]">"sazzyrocks"</span>,
                </p>
                <p>
                  <span className="text-[#9e9992]">craft:</span> [
                  <span className="text-[#e2c19a]">"3D WebGL"</span>,{" "}
                  <span className="text-[#e2c19a]">"Full-Stack"</span>,{" "}
                  <span className="text-[#e2c19a]">"UI/UX"</span>],
                </p>
                <p>
                  <span className="text-[#9e9992]">philosophy:</span>{" "}
                  <span className="text-[#e2c19a]">"High tactile fidelity"</span>,
                </p>
                <p>
                  <span className="text-[#9e9992]">realTimeFPS:</span>{" "}
                  <span className="text-[#6bb5ff]">60</span>,
                </p>
              </div>
              <p>&#125;;</p>

              <div className="pt-2 text-[#69655f] text-xs">
                // Orchestrating visual shaders & event loops
              </div>
              <p>
                <span className="text-[#c99558]">await</span>{" "}
                <span className="text-[#f4efea]">artisan</span>.
                <span className="text-[#6bb5ff]">launchNextMilestone</span>();
              </p>
            </div>

            {/* Signature Card Footer */}
            <div className="mt-6 pt-4 border-t border-[#20232b] flex items-center justify-between text-xs font-mono text-[#9e9992]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#c99558]" />
                Zero Layout Shift · GPU Accelerated
              </span>
              <span className="text-[11px] text-[#69655f]">v2.6.4</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
