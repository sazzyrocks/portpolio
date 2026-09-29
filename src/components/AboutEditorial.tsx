import React from "react"
import { motion } from "framer-motion"
import { Box, Server, Sparkles, Gauge } from "lucide-react"
import { SectionHeader } from "./SectionHeader"

const PILLARS = [
  {
    icon: Box,
    title: "Visual Computing & 3D",
    desc: "Transforming browsers from flat documents into spatial environments using WebGL, Three.js, and GLSL shaders.",
  },
  {
    icon: Server,
    title: "Full-Stack Durability",
    desc: "Architecting resilient asynchronous APIs, scalable data stores, and real-time duplex WebSockets without bloat.",
  },
  {
    icon: Sparkles,
    title: "Tactile Ergonomics",
    desc: "Rigorous attention to micro-interactions, spring physics, and intuitive feedback loops that feel natural under fingers.",
  },
  {
    icon: Gauge,
    title: "Performance Engineering",
    desc: "Obsession with 60fps frame budgets, zero layout shifts (CLS), and sub-100ms response latencies.",
  },
]

export const AboutEditorial: React.FC = () => {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 border-t border-[#1e2129] relative">
      <div className="max-w-6xl mx-auto">
        {/* Reusable Section Header */}
        <SectionHeader
          eyebrow="01 / Perspective & Philosophy"
          title="Bridging the realm of logic & human sensation"
          badge="The Artisan Manifesto"
        />

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Main Narrative */}
          <div className="lg:col-span-7 space-y-6 text-[#9e9992] text-base sm:text-lg leading-relaxed font-sans">
            <p className="text-xl sm:text-2xl font-serif text-[#f4efea] leading-snug">
              "The modern web should not be a sterile catalog of static rectangles. It is an interactive canvas where engineering precision meets visual poetry."
            </p>
            <p>
              My journey began with deep curiosity for algorithmic structures and computer science fundamentals. Over time, that technical foundation merged with a passion for creative technologies — from GPU shader pipelines and visual mathematics to distributed backend systems and developer tooling.
            </p>
            <p>
              I treat every design token, animation curve, and backend endpoint as an intentional decision. Software shouldn't just function smoothly under load; it should evoke a sense of tactile delight.
            </p>
          </div>

          {/* Editorial Pull Box */}
          <div className="lg:col-span-5 bg-[#121418] border border-[#242732] rounded-2xl p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 text-xs font-mono text-[#c99558] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Core Tenet</span>
              </span>
              <h3 className="font-serif text-2xl text-[#f4efea]">
                Restraint Over Superfluous Noise
              </h3>
              <p className="text-sm text-[#9e9992] leading-relaxed">
                Animations are never decorative fluff. Every spring easing communicates weight, every state change guides focus, and every line of code honors the user's attention.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-[#20232b] flex items-center justify-between">
              <span className="text-xs font-mono text-[#69655f]">WCAG 2.1 AA Compliant</span>
              <span className="text-xs font-mono text-[#c99558]">Reduced Motion Ready</span>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
                className="bg-[#121418] border border-[#222530] hover:border-[#c99558]/40 rounded-xl p-6 flex flex-col transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#181b22] border border-[#292d3a] group-hover:border-[#c99558]/50 flex items-center justify-center text-[#c99558] mb-5 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-sans font-semibold text-base text-[#f4efea] mb-2">
                  {pillar.title}
                </h4>
                <p className="text-xs text-[#9e9992] leading-relaxed">
                  {pillar.desc}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
